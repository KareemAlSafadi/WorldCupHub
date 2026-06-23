#!/usr/bin/env node
/**
 * Reads matches.json from the `origin/data` branch and patches wc2026.js:
 *   1. Fills in null group-stage scores for FINISHED matches.
 *   2. Appends knockout-round matches + bracket when teams are known (post-June 27).
 *
 * Usage:
 *   git fetch origin data
 *   node scripts/sync-wc2026.mjs
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WC2026_PATH = join(__dirname, '../src/data/tournaments/wc2026.js');

// Must match liveScores.js TLA_MAP
const TLA_MAP = { SAU: 'KSA', IRI: 'IRN', URY: 'URU' };
const normTla = (tla) => TLA_MAP[tla] || tla;

// ── Load data from origin/data branch ──────────────────────────────────────

let rawJson;
try {
  rawJson = execSync('git show origin/data:matches.json', { encoding: 'utf-8' });
} catch {
  console.error('Could not read origin/data:matches.json — run: git fetch origin data');
  process.exit(1);
}

const { matches: apiMatches } = JSON.parse(rawJson);

// ── Build score map (GROUP_STAGE FINISHED) ─────────────────────────────────

const scoreMap = {};
for (const m of apiMatches) {
  if (m.status !== 'FINISHED' || m.stage !== 'GROUP_STAGE') continue;
  const home = normTla(m.homeTeam?.tla || '');
  const away = normTla(m.awayTeam?.tla || '');
  if (!home || !away) continue;
  const hs = m.score?.fullTime?.home;
  const as_ = m.score?.fullTime?.away;
  if (hs == null || as_ == null) continue;
  scoreMap[`${home}-${away}`] = { homeScore: hs, awayScore: as_ };
}

console.log(`FINISHED group-stage matches in data branch: ${Object.keys(scoreMap).length}`);

// ── Patch group-stage null scores ──────────────────────────────────────────

let source = readFileSync(WC2026_PATH, 'utf-8');
let patchCount = 0;

for (const [key, { homeScore, awayScore }] of Object.entries(scoreMap)) {
  const [home, away] = key.split('-');
  // Only replace lines where both scores are null to avoid overwriting existing data
  const re = new RegExp(
    String.raw`(homeCode:\s*"${home}",\s*awayCode:\s*"${away}",\s*homeScore:\s*)null(,\s*awayScore:\s*)null`,
    'g'
  );
  const updated = source.replace(re, `$1${homeScore}$2${awayScore}`);
  if (updated !== source) {
    patchCount++;
    source = updated;
  }
}

console.log(`Group-stage patches applied: ${patchCount}`);

// ── Handle knockout rounds (active once teams are determined) ──────────────

const STAGE_MAP = {
  LAST_32: { label: 'Round of 32', prefix: '2026-r32', total: 32 },
  QUARTER_FINALS: { label: 'Quarter-final', prefix: '2026-qf', total: 8 },
  SEMI_FINALS: { label: 'Semi-final', prefix: '2026-sf', total: 4 },
  THIRD_PLACE: { label: 'Third place', prefix: '2026-3p', total: 1 },
  FINAL: { label: 'Final', prefix: '2026-f', total: 1 },
};

// Collect knockout matches by round, skip those with unknown teams
const knockoutByRound = {};
for (const [apiStage, info] of Object.entries(STAGE_MAP)) {
  const roundMatches = apiMatches
    .filter((m) => m.stage === apiStage)
    .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

  const known = roundMatches.filter((m) => m.homeTeam?.tla && m.awayTeam?.tla);
  if (known.length === 0) continue;

  knockoutByRound[apiStage] = { ...info, matches: known };
}

if (Object.keys(knockoutByRound).length === 0) {
  console.log('No knockout teams determined yet — skipping bracket update');
} else {
  // Find existing match IDs in the file to avoid duplicates
  const existingIds = new Set(source.match(/id:\s*"(2026-[^"]+)"/g)?.map((s) => s.match(/"([^"]+)"/)[1]) || []);

  let newMatchLines = [];
  const bracketRounds = [];

  for (const [apiStage, { label, prefix, matches: roundMatches }] of Object.entries(knockoutByRound)) {
    const roundIds = [];
    roundMatches.forEach((m, idx) => {
      const id = `${prefix}-${idx + 1}`;
      roundIds.push(id);
      if (existingIds.has(id)) return; // already in file

      const home = normTla(m.homeTeam.tla);
      const away = normTla(m.awayTeam.tla);
      const homeName = m.homeTeam.shortName || m.homeTeam.name || home;
      const awayName = m.awayTeam.shortName || m.awayTeam.name || away;
      const date = m.utcDate.slice(0, 10);
      const venue = m.venue || '';

      const finished = m.status === 'FINISHED';
      const hs = finished ? (m.score?.fullTime?.home ?? null) : null;
      const as_ = finished ? (m.score?.fullTime?.away ?? null) : null;

      const venueStr = venue ? `, venue: "${venue}"` : '';
      newMatchLines.push(
        `  { id: "${id}", stage: "${label}", date: "${date}"${venueStr}, homeTeam: "${homeName}", awayTeam: "${awayName}", homeCode: "${home}", awayCode: "${away}", homeScore: ${hs}, awayScore: ${as_} },`
      );
    });
    bracketRounds.push({ round: label, matches: roundIds });
  }

  // Insert new match lines before the closing `];` of the matches array
  if (newMatchLines.length > 0) {
    source = source.replace(/^(\];)$/m, `${newMatchLines.join('\n')}\n$1`);
    console.log(`Added ${newMatchLines.length} knockout match lines`);
  }

  // Build bracket string and insert/replace in wc2026 export
  const bracketStr = JSON.stringify(bracketRounds, null, 2)
    .replace(/"([^"]+)":/g, '$1:')   // strip quotes from keys
    .replace(/"/g, "'");             // double → single quotes

  if (source.includes('bracket:')) {
    source = source.replace(/bracket:\s*\[[\s\S]*?\],?/, `bracket: ${bracketStr},`);
    console.log('Updated existing bracket in wc2026 export');
  } else {
    source = source.replace(/(detailLevel:\s*"preview",)/, `$1\n  bracket: ${bracketStr},`);
    console.log('Inserted bracket into wc2026 export');
  }
}

// ── Write back ─────────────────────────────────────────────────────────────

writeFileSync(WC2026_PATH, source, 'utf-8');
console.log('wc2026.js updated.');
