/**
 * 2026 FIFA World Cup — tournament in progress (kicked off 2026-06-11).
 * Groups from the final draw (2025-12-05, Washington D.C.); full 72-match
 * group-stage schedule. Dates are local to the host city.
 *
 * TO RECORD A RESULT: fill in homeScore/awayScore on the match below —
 * group standings are derived automatically. When the knockout rounds are
 * set, append their matches and add a `bracket` array (see wc2022 shape).
 */

export const GROUPS = {
  A: [["Mexico", "MEX"], ["Czechia", "CZE"], ["South Africa", "RSA"], ["South Korea", "KOR"]],
  B: [["Canada", "CAN"], ["Bosnia and Herzegovina", "BIH"], ["Qatar", "QAT"], ["Switzerland", "SUI"]],
  C: [["Brazil", "BRA"], ["Haiti", "HAI"], ["Morocco", "MAR"], ["Scotland", "SCO"]],
  D: [["United States", "USA"], ["Australia", "AUS"], ["Paraguay", "PAR"], ["Türkiye", "TUR"]],
  E: [["Germany", "GER"], ["Curaçao", "CUW"], ["Ecuador", "ECU"], ["Ivory Coast", "CIV"]],
  F: [["Netherlands", "NED"], ["Japan", "JPN"], ["Sweden", "SWE"], ["Tunisia", "TUN"]],
  G: [["Belgium", "BEL"], ["Egypt", "EGY"], ["Iran", "IRN"], ["New Zealand", "NZL"]],
  H: [["Spain", "ESP"], ["Cape Verde", "CPV"], ["Saudi Arabia", "KSA"], ["Uruguay", "URU"]],
  I: [["France", "FRA"], ["Iraq", "IRQ"], ["Norway", "NOR"], ["Senegal", "SEN"]],
  J: [["Argentina", "ARG"], ["Algeria", "ALG"], ["Austria", "AUT"], ["Jordan", "JOR"]],
  K: [["Portugal", "POR"], ["Colombia", "COL"], ["DR Congo", "COD"], ["Uzbekistan", "UZB"]],
  L: [["England", "ENG"], ["Croatia", "CRO"], ["Ghana", "GHA"], ["Panama", "PAN"]]
};

const matches = [
  // ── Matchday 1 ──
  { id: "2026-g-a-1", stage: "Group", group: "A", date: "2026-06-11", venue: "Mexico City", homeTeam: "Mexico", awayTeam: "South Africa", homeCode: "MEX", awayCode: "RSA", homeScore: 2, awayScore: 0 },
  { id: "2026-g-a-2", stage: "Group", group: "A", date: "2026-06-11", venue: "Guadalajara", homeTeam: "South Korea", awayTeam: "Czechia", homeCode: "KOR", awayCode: "CZE", homeScore: 2, awayScore: 1 },
  { id: "2026-g-b-1", stage: "Group", group: "B", date: "2026-06-12", venue: "Toronto", homeTeam: "Canada", awayTeam: "Bosnia and Herzegovina", homeCode: "CAN", awayCode: "BIH", homeScore: 1, awayScore: 1 },
  { id: "2026-g-d-1", stage: "Group", group: "D", date: "2026-06-12", venue: "Los Angeles", homeTeam: "United States", awayTeam: "Paraguay", homeCode: "USA", awayCode: "PAR", homeScore: 4, awayScore: 1 },
  { id: "2026-g-b-2", stage: "Group", group: "B", date: "2026-06-13", venue: "San Francisco Bay", homeTeam: "Qatar", awayTeam: "Switzerland", homeCode: "QAT", awayCode: "SUI", homeScore: 1, awayScore: 1 },
  { id: "2026-g-c-1", stage: "Group", group: "C", date: "2026-06-13", venue: "New York/New Jersey", homeTeam: "Brazil", awayTeam: "Morocco", homeCode: "BRA", awayCode: "MAR", homeScore: 1, awayScore: 1 },
  { id: "2026-g-c-2", stage: "Group", group: "C", date: "2026-06-13", venue: "Boston", homeTeam: "Haiti", awayTeam: "Scotland", homeCode: "HAI", awayCode: "SCO", homeScore: null, awayScore: null },
  { id: "2026-g-d-2", stage: "Group", group: "D", date: "2026-06-13", venue: "Vancouver", homeTeam: "Australia", awayTeam: "Türkiye", homeCode: "AUS", awayCode: "TUR", homeScore: null, awayScore: null },
  { id: "2026-g-e-1", stage: "Group", group: "E", date: "2026-06-14", venue: "Houston", homeTeam: "Germany", awayTeam: "Curaçao", homeCode: "GER", awayCode: "CUW", homeScore: null, awayScore: null },
  { id: "2026-g-e-2", stage: "Group", group: "E", date: "2026-06-14", venue: "Philadelphia", homeTeam: "Ivory Coast", awayTeam: "Ecuador", homeCode: "CIV", awayCode: "ECU", homeScore: null, awayScore: null },
  { id: "2026-g-f-1", stage: "Group", group: "F", date: "2026-06-14", venue: "Dallas", homeTeam: "Netherlands", awayTeam: "Japan", homeCode: "NED", awayCode: "JPN", homeScore: null, awayScore: null },
  { id: "2026-g-f-2", stage: "Group", group: "F", date: "2026-06-14", venue: "Monterrey", homeTeam: "Sweden", awayTeam: "Tunisia", homeCode: "SWE", awayCode: "TUN", homeScore: null, awayScore: null },
  { id: "2026-g-h-1", stage: "Group", group: "H", date: "2026-06-15", venue: "Atlanta", homeTeam: "Spain", awayTeam: "Cape Verde", homeCode: "ESP", awayCode: "CPV", homeScore: null, awayScore: null },
  { id: "2026-g-g-1", stage: "Group", group: "G", date: "2026-06-15", venue: "Seattle", homeTeam: "Belgium", awayTeam: "Egypt", homeCode: "BEL", awayCode: "EGY", homeScore: null, awayScore: null },
  { id: "2026-g-h-2", stage: "Group", group: "H", date: "2026-06-15", venue: "Miami", homeTeam: "Saudi Arabia", awayTeam: "Uruguay", homeCode: "KSA", awayCode: "URU", homeScore: null, awayScore: null },
  { id: "2026-g-g-2", stage: "Group", group: "G", date: "2026-06-15", venue: "Los Angeles", homeTeam: "Iran", awayTeam: "New Zealand", homeCode: "IRN", awayCode: "NZL", homeScore: null, awayScore: null },
  { id: "2026-g-i-1", stage: "Group", group: "I", date: "2026-06-16", venue: "New York/New Jersey", homeTeam: "France", awayTeam: "Senegal", homeCode: "FRA", awayCode: "SEN", homeScore: null, awayScore: null },
  { id: "2026-g-i-2", stage: "Group", group: "I", date: "2026-06-16", venue: "Boston", homeTeam: "Iraq", awayTeam: "Norway", homeCode: "IRQ", awayCode: "NOR", homeScore: null, awayScore: null },
  { id: "2026-g-j-1", stage: "Group", group: "J", date: "2026-06-16", venue: "Kansas City", homeTeam: "Argentina", awayTeam: "Algeria", homeCode: "ARG", awayCode: "ALG", homeScore: null, awayScore: null },
  { id: "2026-g-j-2", stage: "Group", group: "J", date: "2026-06-16", venue: "San Francisco Bay", homeTeam: "Austria", awayTeam: "Jordan", homeCode: "AUT", awayCode: "JOR", homeScore: null, awayScore: null },
  { id: "2026-g-k-1", stage: "Group", group: "K", date: "2026-06-17", venue: "Houston", homeTeam: "Portugal", awayTeam: "DR Congo", homeCode: "POR", awayCode: "COD", homeScore: null, awayScore: null },
  { id: "2026-g-k-2", stage: "Group", group: "K", date: "2026-06-17", venue: "Mexico City", homeTeam: "Uzbekistan", awayTeam: "Colombia", homeCode: "UZB", awayCode: "COL", homeScore: null, awayScore: null },
  { id: "2026-g-l-1", stage: "Group", group: "L", date: "2026-06-17", venue: "Dallas", homeTeam: "England", awayTeam: "Croatia", homeCode: "ENG", awayCode: "CRO", homeScore: null, awayScore: null },
  { id: "2026-g-l-2", stage: "Group", group: "L", date: "2026-06-17", venue: "Toronto", homeTeam: "Ghana", awayTeam: "Panama", homeCode: "GHA", awayCode: "PAN", homeScore: null, awayScore: null },

  // ── Matchday 2 ──
  { id: "2026-g-a-3", stage: "Group", group: "A", date: "2026-06-18", venue: "Atlanta", homeTeam: "Czechia", awayTeam: "South Africa", homeCode: "CZE", awayCode: "RSA", homeScore: null, awayScore: null },
  { id: "2026-g-b-3", stage: "Group", group: "B", date: "2026-06-18", venue: "Los Angeles", homeTeam: "Switzerland", awayTeam: "Bosnia and Herzegovina", homeCode: "SUI", awayCode: "BIH", homeScore: null, awayScore: null },
  { id: "2026-g-b-4", stage: "Group", group: "B", date: "2026-06-18", venue: "Vancouver", homeTeam: "Canada", awayTeam: "Qatar", homeCode: "CAN", awayCode: "QAT", homeScore: null, awayScore: null },
  { id: "2026-g-a-4", stage: "Group", group: "A", date: "2026-06-18", venue: "Guadalajara", homeTeam: "Mexico", awayTeam: "South Korea", homeCode: "MEX", awayCode: "KOR", homeScore: null, awayScore: null },
  { id: "2026-g-d-3", stage: "Group", group: "D", date: "2026-06-19", venue: "Seattle", homeTeam: "United States", awayTeam: "Australia", homeCode: "USA", awayCode: "AUS", homeScore: null, awayScore: null },
  { id: "2026-g-c-3", stage: "Group", group: "C", date: "2026-06-19", venue: "Boston", homeTeam: "Scotland", awayTeam: "Morocco", homeCode: "SCO", awayCode: "MAR", homeScore: null, awayScore: null },
  { id: "2026-g-c-4", stage: "Group", group: "C", date: "2026-06-19", venue: "Philadelphia", homeTeam: "Brazil", awayTeam: "Haiti", homeCode: "BRA", awayCode: "HAI", homeScore: null, awayScore: null },
  { id: "2026-g-d-4", stage: "Group", group: "D", date: "2026-06-19", venue: "San Francisco Bay", homeTeam: "Türkiye", awayTeam: "Paraguay", homeCode: "TUR", awayCode: "PAR", homeScore: null, awayScore: null },
  { id: "2026-g-f-3", stage: "Group", group: "F", date: "2026-06-20", venue: "Houston", homeTeam: "Netherlands", awayTeam: "Sweden", homeCode: "NED", awayCode: "SWE", homeScore: null, awayScore: null },
  { id: "2026-g-e-3", stage: "Group", group: "E", date: "2026-06-20", venue: "Toronto", homeTeam: "Germany", awayTeam: "Ivory Coast", homeCode: "GER", awayCode: "CIV", homeScore: null, awayScore: null },
  { id: "2026-g-e-4", stage: "Group", group: "E", date: "2026-06-20", venue: "Kansas City", homeTeam: "Ecuador", awayTeam: "Curaçao", homeCode: "ECU", awayCode: "CUW", homeScore: null, awayScore: null },
  { id: "2026-g-f-4", stage: "Group", group: "F", date: "2026-06-20", venue: "Monterrey", homeTeam: "Tunisia", awayTeam: "Japan", homeCode: "TUN", awayCode: "JPN", homeScore: null, awayScore: null },
  { id: "2026-g-h-3", stage: "Group", group: "H", date: "2026-06-21", venue: "Atlanta", homeTeam: "Spain", awayTeam: "Saudi Arabia", homeCode: "ESP", awayCode: "KSA", homeScore: null, awayScore: null },
  { id: "2026-g-g-3", stage: "Group", group: "G", date: "2026-06-21", venue: "Los Angeles", homeTeam: "Belgium", awayTeam: "Iran", homeCode: "BEL", awayCode: "IRN", homeScore: null, awayScore: null },
  { id: "2026-g-h-4", stage: "Group", group: "H", date: "2026-06-21", venue: "Miami", homeTeam: "Uruguay", awayTeam: "Cape Verde", homeCode: "URU", awayCode: "CPV", homeScore: null, awayScore: null },
  { id: "2026-g-g-4", stage: "Group", group: "G", date: "2026-06-21", venue: "Vancouver", homeTeam: "New Zealand", awayTeam: "Egypt", homeCode: "NZL", awayCode: "EGY", homeScore: null, awayScore: null },
  { id: "2026-g-j-3", stage: "Group", group: "J", date: "2026-06-22", venue: "Dallas", homeTeam: "Argentina", awayTeam: "Austria", homeCode: "ARG", awayCode: "AUT", homeScore: null, awayScore: null },
  { id: "2026-g-i-3", stage: "Group", group: "I", date: "2026-06-22", venue: "Philadelphia", homeTeam: "France", awayTeam: "Iraq", homeCode: "FRA", awayCode: "IRQ", homeScore: null, awayScore: null },
  { id: "2026-g-i-4", stage: "Group", group: "I", date: "2026-06-22", venue: "Toronto", homeTeam: "Norway", awayTeam: "Senegal", homeCode: "NOR", awayCode: "SEN", homeScore: null, awayScore: null },
  { id: "2026-g-j-4", stage: "Group", group: "J", date: "2026-06-22", venue: "San Francisco Bay", homeTeam: "Jordan", awayTeam: "Algeria", homeCode: "JOR", awayCode: "ALG", homeScore: null, awayScore: null },
  { id: "2026-g-k-3", stage: "Group", group: "K", date: "2026-06-23", venue: "Houston", homeTeam: "Portugal", awayTeam: "Uzbekistan", homeCode: "POR", awayCode: "UZB", homeScore: null, awayScore: null },
  { id: "2026-g-l-3", stage: "Group", group: "L", date: "2026-06-23", venue: "Boston", homeTeam: "England", awayTeam: "Ghana", homeCode: "ENG", awayCode: "GHA", homeScore: null, awayScore: null },
  { id: "2026-g-l-4", stage: "Group", group: "L", date: "2026-06-23", venue: "Boston", homeTeam: "Panama", awayTeam: "Croatia", homeCode: "PAN", awayCode: "CRO", homeScore: null, awayScore: null },
  { id: "2026-g-k-4", stage: "Group", group: "K", date: "2026-06-23", venue: "Guadalajara", homeTeam: "Colombia", awayTeam: "DR Congo", homeCode: "COL", awayCode: "COD", homeScore: null, awayScore: null },

  // ── Matchday 3 (simultaneous kick-offs per group) ──
  { id: "2026-g-b-5", stage: "Group", group: "B", date: "2026-06-24", venue: "Vancouver", homeTeam: "Switzerland", awayTeam: "Canada", homeCode: "SUI", awayCode: "CAN", homeScore: null, awayScore: null },
  { id: "2026-g-b-6", stage: "Group", group: "B", date: "2026-06-24", venue: "Seattle", homeTeam: "Bosnia and Herzegovina", awayTeam: "Qatar", homeCode: "BIH", awayCode: "QAT", homeScore: null, awayScore: null },
  { id: "2026-g-c-5", stage: "Group", group: "C", date: "2026-06-24", venue: "Atlanta", homeTeam: "Morocco", awayTeam: "Haiti", homeCode: "MAR", awayCode: "HAI", homeScore: null, awayScore: null },
  { id: "2026-g-c-6", stage: "Group", group: "C", date: "2026-06-24", venue: "Miami", homeTeam: "Scotland", awayTeam: "Brazil", homeCode: "SCO", awayCode: "BRA", homeScore: null, awayScore: null },
  { id: "2026-g-a-5", stage: "Group", group: "A", date: "2026-06-24", venue: "Monterrey", homeTeam: "South Africa", awayTeam: "South Korea", homeCode: "RSA", awayCode: "KOR", homeScore: null, awayScore: null },
  { id: "2026-g-a-6", stage: "Group", group: "A", date: "2026-06-24", venue: "Mexico City", homeTeam: "Czechia", awayTeam: "Mexico", homeCode: "CZE", awayCode: "MEX", homeScore: null, awayScore: null },
  { id: "2026-g-e-5", stage: "Group", group: "E", date: "2026-06-25", venue: "Philadelphia", homeTeam: "Curaçao", awayTeam: "Ivory Coast", homeCode: "CUW", awayCode: "CIV", homeScore: null, awayScore: null },
  { id: "2026-g-e-6", stage: "Group", group: "E", date: "2026-06-25", venue: "New York/New Jersey", homeTeam: "Ecuador", awayTeam: "Germany", homeCode: "ECU", awayCode: "GER", homeScore: null, awayScore: null },
  { id: "2026-g-f-5", stage: "Group", group: "F", date: "2026-06-25", venue: "Kansas City", homeTeam: "Tunisia", awayTeam: "Netherlands", homeCode: "TUN", awayCode: "NED", homeScore: null, awayScore: null },
  { id: "2026-g-f-6", stage: "Group", group: "F", date: "2026-06-25", venue: "Dallas", homeTeam: "Japan", awayTeam: "Sweden", homeCode: "JPN", awayCode: "SWE", homeScore: null, awayScore: null },
  { id: "2026-g-d-5", stage: "Group", group: "D", date: "2026-06-25", venue: "Los Angeles", homeTeam: "Türkiye", awayTeam: "United States", homeCode: "TUR", awayCode: "USA", homeScore: null, awayScore: null },
  { id: "2026-g-d-6", stage: "Group", group: "D", date: "2026-06-25", venue: "San Francisco Bay", homeTeam: "Paraguay", awayTeam: "Australia", homeCode: "PAR", awayCode: "AUS", homeScore: null, awayScore: null },
  { id: "2026-g-i-5", stage: "Group", group: "I", date: "2026-06-26", venue: "Boston", homeTeam: "Norway", awayTeam: "France", homeCode: "NOR", awayCode: "FRA", homeScore: null, awayScore: null },
  { id: "2026-g-i-6", stage: "Group", group: "I", date: "2026-06-26", venue: "Toronto", homeTeam: "Senegal", awayTeam: "Iraq", homeCode: "SEN", awayCode: "IRQ", homeScore: null, awayScore: null },
  { id: "2026-g-h-5", stage: "Group", group: "H", date: "2026-06-26", venue: "Houston", homeTeam: "Cape Verde", awayTeam: "Saudi Arabia", homeCode: "CPV", awayCode: "KSA", homeScore: null, awayScore: null },
  { id: "2026-g-h-6", stage: "Group", group: "H", date: "2026-06-26", venue: "Guadalajara", homeTeam: "Uruguay", awayTeam: "Spain", homeCode: "URU", awayCode: "ESP", homeScore: null, awayScore: null },
  { id: "2026-g-g-5", stage: "Group", group: "G", date: "2026-06-26", venue: "Vancouver", homeTeam: "New Zealand", awayTeam: "Belgium", homeCode: "NZL", awayCode: "BEL", homeScore: null, awayScore: null },
  { id: "2026-g-g-6", stage: "Group", group: "G", date: "2026-06-26", venue: "Seattle", homeTeam: "Egypt", awayTeam: "Iran", homeCode: "EGY", awayCode: "IRN", homeScore: null, awayScore: null },
  { id: "2026-g-k-5", stage: "Group", group: "K", date: "2026-06-27", venue: "Miami", homeTeam: "Colombia", awayTeam: "Portugal", homeCode: "COL", awayCode: "POR", homeScore: null, awayScore: null },
  { id: "2026-g-k-6", stage: "Group", group: "K", date: "2026-06-27", venue: "Atlanta", homeTeam: "DR Congo", awayTeam: "Uzbekistan", homeCode: "COD", awayCode: "UZB", homeScore: null, awayScore: null },
  { id: "2026-g-j-5", stage: "Group", group: "J", date: "2026-06-27", venue: "Kansas City", homeTeam: "Algeria", awayTeam: "Austria", homeCode: "ALG", awayCode: "AUT", homeScore: null, awayScore: null },
  { id: "2026-g-j-6", stage: "Group", group: "J", date: "2026-06-27", venue: "Dallas", homeTeam: "Jordan", awayTeam: "Argentina", homeCode: "JOR", awayCode: "ARG", homeScore: null, awayScore: null },
  { id: "2026-g-l-5", stage: "Group", group: "L", date: "2026-06-27", venue: "New York/New Jersey", homeTeam: "Panama", awayTeam: "England", homeCode: "PAN", awayCode: "ENG", homeScore: null, awayScore: null },
  { id: "2026-g-l-6", stage: "Group", group: "L", date: "2026-06-27", venue: "Philadelphia", homeTeam: "Croatia", awayTeam: "Ghana", homeCode: "CRO", awayCode: "GHA", homeScore: null, awayScore: null }
];

/** Derive group tables from played matches (3pts/win; points → GD → GF). */
export function computeStandings(groups, allMatches) {
  const standings = {};
  for (const [group, teams] of Object.entries(groups)) {
    const rows = teams.map(([team, code]) => ({
      team, code, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0,
    }));
    const byCode = Object.fromEntries(rows.map((r) => [r.code, r]));
    for (const m of allMatches) {
      if (m.group !== group || m.homeScore == null || m.awayScore == null) continue;
      const home = byCode[m.homeCode];
      const away = byCode[m.awayCode];
      if (!home || !away) continue;
      home.played += 1;
      away.played += 1;
      home.gf += m.homeScore;
      home.ga += m.awayScore;
      away.gf += m.awayScore;
      away.ga += m.homeScore;
      if (m.homeScore > m.awayScore) {
        home.won += 1;
        away.lost += 1;
        home.points += 3;
      } else if (m.homeScore < m.awayScore) {
        away.won += 1;
        home.lost += 1;
        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    }
    rows.forEach((r) => {
      r.gd = r.gf - r.ga;
    });
    rows.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
    standings[group] = rows;
  }
  return standings;
}

export const wc2026 = {
  year: 2026,
  host: "USA, Canada, Mexico",
  hosts: ["United States", "Canada", "Mexico"],
  winner: null,
  runnerUp: null,
  topScorer: null,
  teamsCount: 48,
  format: "48 teams, 12 groups of 4, round of 32 knockout",
  cities: [
    "Mexico City", "Guadalajara", "Monterrey",
    "Toronto", "Vancouver",
    "Los Angeles", "New York/New Jersey", "Dallas", "Atlanta", "Houston",
    "Boston", "Philadelphia", "Miami", "Seattle", "San Francisco Bay", "Kansas City"
  ],
  attendance: null,
  fact: "The first 48-team World Cup, hosted across three nations and sixteen cities. The tournament kicked off on June 11, 2026 at the Estadio Azteca — the first stadium to host matches at three World Cups.",
  detailLevel: "preview",
  standings: computeStandings(GROUPS, matches),
  matches,
};
