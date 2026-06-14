import tournamentsIndex from '../data/tournaments.json';
import teamsData from '../data/teams.json';
import allTimeScorers from '../data/allTimeScorers.json';
import { fullTournaments } from '../data/tournamentDetails.js';
import squadsData from '../data/squads.json';

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

/** All-time W/D/L/GF/GA record + biggest win & loss for a team slug. */
export function getTeamMatchStats(slug) {
  const team = getTeamBySlug(slug);
  if (!team) return null;
  const code = team.code;

  let played = 0, wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;
  let biggestWin = null, biggestLoss = null;

  tournaments.forEach((t) => {
    (t.matches || []).forEach((m) => {
      if (m.homeScore == null || m.awayScore == null) return;
      const isHome = m.homeCode === code;
      const isAway = m.awayCode === code;
      if (!isHome && !isAway) return;

      const gf = isHome ? m.homeScore : m.awayScore;
      const ga = isHome ? m.awayScore : m.homeScore;
      const oppCode = isHome ? m.awayCode : m.homeCode;
      const oppName = isHome ? m.awayTeam : m.homeTeam;
      const margin = gf - ga;

      played++;
      goalsFor += gf;
      goalsAgainst += ga;
      if (margin > 0) wins++;
      else if (margin === 0) draws++;
      else losses++;

      if (margin > 0 && (!biggestWin || margin > biggestWin.margin || (margin === biggestWin.margin && gf > biggestWin.gf))) {
        biggestWin = { year: t.year, stage: m.stage, gf, ga, margin, oppCode, oppName };
      }
      if (margin < 0 && (!biggestLoss || margin < biggestLoss.margin || (margin === biggestLoss.margin && ga > biggestLoss.ga))) {
        biggestLoss = { year: t.year, stage: m.stage, gf, ga, margin, oppCode, oppName };
      }
    });
  });

  return {
    played, wins, draws, losses,
    goalsFor, goalsAgainst, gd: goalsFor - goalsAgainst,
    winPct: played > 0 ? Math.round((wins / played) * 100) : 0,
    biggestWin, biggestLoss,
  };
}

/** Total goals per completed tournament edition, ascending by year. */
export function getGoalsTimeline() {
  return tournaments
    .filter((t) => t.detailLevel !== 'preview' && (t.matches || []).length > 0)
    .map((t) => {
      const played = t.matches.filter((m) => m.homeScore != null && m.awayScore != null);
      const totalGoals = played.reduce((sum, m) => sum + m.homeScore + m.awayScore, 0);
      return {
        year: t.year,
        host: t.host,
        totalGoals,
        matches: played.length,
        avgPerGame: played.length > 0 ? +(totalGoals / played.length).toFixed(2) : 0,
      };
    })
    .sort((a, b) => a.year - b.year);
}

/** Top 12 teams by penalty shootout appearances, with W/L record. */
export function getPenaltyRecords() {
  const records = {};

  tournaments.forEach((t) => {
    (t.matches || []).forEach((m) => {
      if (!m.pens) return;
      // pens format: "X-Y" where X is home pens, Y is away pens
      const parts = m.pens.split('-').map(Number);
      if (parts.length !== 2) return;
      const [homePens, awayPens] = parts;
      const homeWon = homePens > awayPens;

      [m.homeCode, m.awayCode].forEach((code, idx) => {
        if (!code) return;
        if (!records[code]) {
          records[code] = { code, name: idx === 0 ? m.homeTeam : m.awayTeam, won: 0, lost: 0 };
        }
        const won = idx === 0 ? homeWon : !homeWon;
        if (won) records[code].won++;
        else records[code].lost++;
      });
    });
  });

  return Object.values(records)
    .sort((a, b) => (b.won + b.lost) - (a.won + a.lost) || b.won - a.won)
    .slice(0, 12);
}

/** Players for a specific tournament edition and team code. Returns [] if no data. */
export function getSquad(year, code) {
  return squadsData[String(year)]?.[code] ?? [];
}

/** Years for which we have squad data for a given team code. */
export function getTeamSquadYears(code) {
  return Object.keys(squadsData)
    .filter((year) => squadsData[year][code]?.length > 0)
    .map(Number)
    .sort((a, b) => b - a);
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
