import { useEffect, useState } from 'react';
import { GROUPS, computeStandings } from '../data/tournaments/wc2026.js';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const BASE = 'https://api.football-data.org/v4';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// football-data.org TLA → our FIFA code (where they differ)
const TLA_MAP = { SAU: 'KSA', IRI: 'IRN' };
const normTla = (tla) => TLA_MAP[tla] || tla;

let _cache = null;
let _cacheAt = 0;

function fetchApiMatches() {
  if (_cache && Date.now() - _cacheAt < CACHE_TTL) return Promise.resolve(_cache);
  return fetch(`${BASE}/competitions/WC/matches?season=2026`, {
    headers: { 'X-Auth-Token': API_KEY },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`football-data ${res.status}`);
      return res.json();
    })
    .then(({ matches }) => {
      _cache = matches;
      _cacheAt = Date.now();
      return matches;
    });
}

function buildScoreMap(apiMatches) {
  const map = {};
  for (const m of apiMatches) {
    const home = normTla(m.homeTeam?.tla || '');
    const away = normTla(m.awayTeam?.tla || '');
    if (!home || !away) continue;
    const finished = m.status === 'FINISHED';
    const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    map[`${home}-${away}`] = {
      homeScore: finished || live ? (m.score?.fullTime?.home ?? null) : null,
      awayScore: finished || live ? (m.score?.fullTime?.away ?? null) : null,
      liveNow: live,
    };
  }
  return map;
}

/**
 * Fetches live 2026 WC scores and patches the static tournament data.
 * Only fires when tournament.detailLevel === 'preview' and API key is set.
 * Falls back to static data silently on error.
 */
export function useLive2026(tournament) {
  const isPreview = tournament?.detailLevel === 'preview';
  const [liveMatches, setLiveMatches] = useState(null);
  const [liveStandings, setLiveStandings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPreview || !API_KEY) return;

    let cancelled = false;

    // All setState calls are inside .then/.catch/.finally — never synchronous
    Promise.resolve()
      .then(() => { if (!cancelled) setLoading(true); })
      .then(() => fetchApiMatches())
      .then((apiMatches) => {
        if (cancelled) return;
        const scoreMap = buildScoreMap(apiMatches);
        const patched = tournament.matches.map((m) => {
          const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
          return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow } : m;
        });
        setLiveMatches(patched);
        setLiveStandings(computeStandings(GROUPS, patched));
      })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [isPreview, tournament]);

  return { liveMatches, liveStandings, loading, error };
}
