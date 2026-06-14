import tournamentsIndex from '../data/tournaments.json';
import teamsData from '../data/teams.json';
import allTimeScorers from '../data/allTimeScorers.json';
import { fullTournaments } from '../data/tournamentDetails.js';

const NAME_TO_SLUG = {
  'West Germany': 'west-germany',
  'United States': 'usa',
  'South Korea': 'south-korea',
  'Saudi Arabia': 'saudi-arabia',
  'Costa Rica': 'costa-rica',
  'Czech Republic': 'czech-republic',
  'Czechoslovakia': 'czechoslovakia',
  'Ivory Coast': 'ivory-coast',
  'South Africa': 'south-africa',
  'New Zealand': 'new-zealand',
  'North Korea': 'north-korea',
  'Trinidad and Tobago': 'trinidad-and-tobago',
  'Bosnia and Herzegovina': 'bosnia',
  Bosnia: 'bosnia',
  Czechia: 'czech-republic',
  'Türkiye': 'turkey',
  'Curaçao': 'curacao',
  'United Arab Emirates': 'uae',
  'Republic of Ireland': 'ireland',
  Zaire: 'dr-congo',
};

function nameToSlug(name) {
  if (NAME_TO_SLUG[name]) return NAME_TO_SLUG[name];
  return name.toLowerCase().replace(/\s+/g, '-');
}

function buildTeamResults(tournamentList) {
  const results = {};

  const addResult = (teamName, year, placement, stage) => {
    const slug = nameToSlug(teamName);
    if (!results[slug]) results[slug] = [];
    results[slug].push({ year, placement, stage });
  };

  tournamentList.forEach((t) => {
    if (t.winner) addResult(t.winner, t.year, 'Winners', 'Final');
    if (t.runnerUp) addResult(t.runnerUp, t.year, 'Runners-up', 'Final');

    if (t.standings) {
      Object.values(t.standings).forEach((group) => {
        group.forEach((row, idx) => {
          // skip unplayed groups (e.g. a tournament in progress)
          if (idx === 0 && row.played > 0) {
            addResult(row.team, t.year, 'Group winner', 'Group stage');
          }
        });
      });
    }
  });

  Object.values(results).forEach((arr) => arr.sort((a, b) => b.year - a.year));
  return results;
}

const fullByYear = Object.fromEntries(fullTournaments.map((t) => [t.year, t]));

const tournaments = tournamentsIndex
  .map((summary) => {
    const full = fullByYear[summary.year];
    if (full) {
      return { ...summary, ...full };
    }
    return summary;
  })
  .sort((a, b) => b.year - a.year);

const teams = [...teamsData].sort((a, b) => a.name.localeCompare(b.name));

const teamResults = buildTeamResults(tournaments);

teams.forEach((team) => {
  team.tournamentResults = teamResults[team.slug] || [];
});

export function getTeamSlugByName(name) {
  return nameToSlug(name);
}

export function getTeamByCode(code) {
  return teams.find((t) => t.code === code);
}

export function getAllTournaments() {
  return tournaments;
}

export function getTournamentByYear(year) {
  return tournaments.find((t) => t.year === Number(year));
}

export function getAllTeams() {
  return teams;
}

export function getTeamBySlug(slug) {
  return teams.find((t) => t.slug === slug);
}

export function getMatchesForTournament(year) {
  const tournament = getTournamentByYear(year);
  return tournament?.matches || [];
}

export function getTeamTournamentHistory(slug) {
  const team = getTeamBySlug(slug);
  return team?.tournamentResults || [];
}

export function filterTournaments({ decade, search }) {
  return tournaments.filter((t) => {
    const matchDecade = decade ? Math.floor(t.year / 10) * 10 === decade : true;
    const q = search?.toLowerCase() || '';
    const matchSearch =
      !q ||
      String(t.year).includes(q) ||
      t.host?.toLowerCase().includes(q) ||
      t.winner?.toLowerCase().includes(q) ||
      t.runnerUp?.toLowerCase().includes(q);
    return matchDecade && matchSearch;
  });
}

export function filterTeams({ search, confederation }) {
  return teams.filter((t) => {
    const q = search?.toLowerCase() || '';
    const matchSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.code.toLowerCase().includes(q);
    const matchConf = confederation ? t.confederation === confederation : true;
    return matchSearch && matchConf;
  });
}

export function getStats() {
  const editions = tournaments.filter((t) => t.detailLevel !== 'preview').length;
  const titleCounts = {};
  tournaments.forEach((t) => {
    if (t.winner) {
      titleCounts[t.winner] = (titleCounts[t.winner] || 0) + 1;
    }
  });
  const mostTitles = Object.entries(titleCounts).sort((a, b) => b[1] - a[1])[0];
  const latest = tournaments.find((t) => t.winner);

  return {
    editions,
    mostTitlesTeam: mostTitles?.[0] || 'Brazil',
    mostTitlesCount: mostTitles?.[1] || 5,
    latestChampion: latest?.winner || 'Argentina',
    latestYear: latest?.year || 2022,
  };
}

export function getDecades() {
  const decades = new Set();
  tournaments.forEach((t) => decades.add(Math.floor(t.year / 10) * 10));
  return [...decades].sort((a, b) => b - a);
}

export function getAllTimeScorers() {
  return allTimeScorers;
}

/** Golden Boot winner for every completed edition (excludes in-progress tournaments). */
export function getGoldenBootByYear() {
  return tournaments
    .filter((t) => t.topScorer && t.winner) // winner check excludes in-progress
    .map((t) => ({ year: t.year, host: t.host, topScorer: t.topScorer }))
    .sort((a, b) => b.year - a.year);
}

/** Returns the N largest-margin wins across all recorded matches. */
export function getBiggestWins(limit = 8) {
  const wins = [];
  tournaments.forEach((t) => {
    (t.matches || []).forEach((m) => {
      if (m.homeScore == null || m.awayScore == null) return;
      const margin = Math.abs(m.homeScore - m.awayScore);
      if (margin < 3) return; // only substantial wins
      const homeWin = m.homeScore > m.awayScore;
      wins.push({
        year: t.year,
        stage: m.stage,
        winner: homeWin ? m.homeTeam : m.awayTeam,
        winnerCode: homeWin ? m.homeCode : m.awayCode,
        loser: homeWin ? m.awayTeam : m.homeTeam,
        loserCode: homeWin ? m.awayCode : m.homeCode,
        winnerScore: homeWin ? m.homeScore : m.awayScore,
        loserScore: homeWin ? m.awayScore : m.homeScore,
        margin,
        total: m.homeScore + m.awayScore,
      });
    });
  });
  return wins
    .sort((a, b) => b.margin - a.margin || b.total - a.total)
    .slice(0, limit);
}

/** All recorded matches between two teams (match lists are curated, not exhaustive). */
export function getHeadToHead(slugA, slugB) {
  if (!slugA || !slugB || slugA === slugB) return [];
  const meetings = [];
  tournaments.forEach((t) => {
    (t.matches || []).forEach((m) => {
      const home = nameToSlug(m.homeTeam);
      const away = nameToSlug(m.awayTeam);
      if (
        (home === slugA && away === slugB) ||
        (home === slugB && away === slugA)
      ) {
        meetings.push(m);
      }
    });
  });
  return meetings;
}
