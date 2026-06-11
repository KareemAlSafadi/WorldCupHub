const standings = {
  A: [
    { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 3, gd: 3, points: 6 },
    { team: "Morocco", code: "MAR", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 5, gd: 0, points: 6 },
    { team: "Norway", code: "NOR", played: 3, won: 1, drawn: 1, lost: 1, gf: 5, ga: 5, gd: 0, points: 4 },
    { team: "Scotland", code: "SCO", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 6, gd: -4, points: 1 },
  ],
  B: [
    { team: "Italy", code: "ITA", played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 3, gd: 4, points: 7 },
    { team: "Chile", code: "CHI", played: 3, won: 0, drawn: 3, lost: 0, gf: 5, ga: 5, gd: 0, points: 3 },
    { team: "Austria", code: "AUT", played: 3, won: 0, drawn: 2, lost: 1, gf: 3, ga: 4, gd: -1, points: 2 },
    { team: "Cameroon", code: "CMR", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 4, gd: -2, points: 2 },
  ],
  C: [
    { team: "France", code: "FRA", played: 3, won: 3, drawn: 0, lost: 0, gf: 9, ga: 1, gd: 8, points: 9 },
    { team: "Denmark", code: "DEN", played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, gd: 0, points: 4 },
    { team: "South Africa", code: "RSA", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 4, gd: -2, points: 2 },
    { team: "Saudi Arabia", code: "KSA", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 8, gd: -6, points: 1 },
  ],
  D: [
    { team: "Nigeria", code: "NGA", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 5, gd: 0, points: 6 },
    { team: "Paraguay", code: "PAR", played: 3, won: 1, drawn: 2, lost: 0, gf: 3, ga: 1, gd: 2, points: 5 },
    { team: "Bulgaria", code: "BUL", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 5, gd: -1, points: 3 },
    { team: "Spain", code: "ESP", played: 3, won: 1, drawn: 0, lost: 2, gf: 8, ga: 4, gd: 4, points: 3 },
  ],
  E: [
    { team: "Germany", code: "GER", played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, gd: 4, points: 7 },
    { team: "Mexico", code: "MEX", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, points: 4 },
    { team: "United States", code: "USA", played: 3, won: 0, drawn: 2, lost: 1, gf: 1, ga: 2, gd: -1, points: 2 },
    { team: "Yugoslavia", code: "YUG", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 },
  ],
  F: [
    { team: "Netherlands", code: "NED", played: 3, won: 1, drawn: 2, lost: 0, gf: 7, ga: 3, gd: 4, points: 5 },
    { team: "Mexico", code: "MEX", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, points: 4 },
    { team: "Belgium", code: "BEL", played: 3, won: 0, drawn: 3, lost: 0, gf: 5, ga: 5, gd: 0, points: 3 },
    { team: "South Korea", code: "KOR", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 4, gd: -2, points: 2 },
  ],
  G: [
    { team: "Romania", code: "ROU", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 2, gd: 2, points: 7 },
    { team: "England", code: "ENG", played: 3, won: 0, drawn: 3, lost: 0, gf: 2, ga: 2, gd: 0, points: 3 },
    { team: "Colombia", code: "COL", played: 3, won: 1, drawn: 0, lost: 2, gf: 1, ga: 3, gd: -2, points: 3 },
    { team: "Tunisia", code: "TUN", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 4, gd: -2, points: 1 },
  ],
  H: [
    { team: "Argentina", code: "ARG", played: 3, won: 3, drawn: 0, lost: 0, gf: 7, ga: 0, gd: 7, points: 9 },
    { team: "Croatia", code: "CRO", played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 2, gd: 2, points: 6 },
    { team: "Jamaica", code: "JAM", played: 3, won: 0, drawn: 1, lost: 2, gf: 3, ga: 9, gd: -6, points: 1 },
    { team: "Japan", code: "JPN", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 },
  ],
};

// Fix Group F - Mexico shouldn't be duplicated from E. Correct 1998 Group F:
standings.F = [
  { team: "Netherlands", code: "NED", played: 3, won: 1, drawn: 2, lost: 0, gf: 7, ga: 3, gd: 4, points: 5 },
  { team: "Mexico", code: "MEX", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, points: 4 },
  { team: "Belgium", code: "BEL", played: 3, won: 0, drawn: 3, lost: 0, gf: 5, ga: 5, gd: 0, points: 3 },
  { team: "South Korea", code: "KOR", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 4, gd: -2, points: 2 },
];

const knockout = [
  { id: "1998-r16-1", stage: "Round of 16", date: "1998-06-27", homeTeam: "Brazil", awayTeam: "Chile", homeCode: "BRA", awayCode: "CHI", homeScore: 4, awayScore: 1 },
  { id: "1998-r16-2", stage: "Round of 16", date: "1998-06-28", homeTeam: "France", awayTeam: "Paraguay", homeCode: "FRA", awayCode: "PAR", homeScore: 1, awayScore: 0, extra: "ET" },
  { id: "1998-r16-3", stage: "Round of 16", date: "1998-06-28", homeTeam: "Denmark", awayTeam: "Nigeria", homeCode: "DEN", awayCode: "NGA", homeScore: 4, awayScore: 1 },
  { id: "1998-r16-4", stage: "Round of 16", date: "1998-06-29", homeTeam: "Germany", awayTeam: "Mexico", homeCode: "GER", awayCode: "MEX", homeScore: 2, awayScore: 1 },
  { id: "1998-r16-5", stage: "Round of 16", date: "1998-06-29", homeTeam: "Netherlands", awayTeam: "Yugoslavia", homeCode: "NED", awayCode: "YUG", homeScore: 2, awayScore: 1 },
  { id: "1998-r16-6", stage: "Round of 16", date: "1998-06-30", homeTeam: "Argentina", awayTeam: "England", homeCode: "ARG", awayCode: "ENG", homeScore: 2, awayScore: 2, pens: "4-3" },
  { id: "1998-r16-7", stage: "Round of 16", date: "1998-06-30", homeTeam: "Italy", awayTeam: "Norway", homeCode: "ITA", awayCode: "NOR", homeScore: 1, awayScore: 0 },
  { id: "1998-r16-8", stage: "Round of 16", date: "1998-06-30", homeTeam: "Croatia", awayTeam: "Romania", homeCode: "CRO", awayCode: "ROU", homeScore: 1, awayScore: 0 },
  { id: "1998-qf-1", stage: "Quarter-final", date: "1998-07-03", homeTeam: "France", awayTeam: "Italy", homeCode: "FRA", awayCode: "ITA", homeScore: 0, awayScore: 0, pens: "4-3" },
  { id: "1998-qf-2", stage: "Quarter-final", date: "1998-07-03", homeTeam: "Brazil", awayTeam: "Denmark", homeCode: "BRA", awayCode: "DEN", homeScore: 3, awayScore: 2 },
  { id: "1998-qf-3", stage: "Quarter-final", date: "1998-07-04", homeTeam: "Netherlands", awayTeam: "Argentina", homeCode: "NED", awayCode: "ARG", homeScore: 2, awayScore: 1 },
  { id: "1998-qf-4", stage: "Quarter-final", date: "1998-07-04", homeTeam: "Germany", awayTeam: "Croatia", homeCode: "GER", awayCode: "CRO", homeScore: 0, awayScore: 3 },
  { id: "1998-sf-1", stage: "Semi-final", date: "1998-07-07", homeTeam: "Brazil", awayTeam: "Netherlands", homeCode: "BRA", awayCode: "NED", homeScore: 1, awayScore: 1, pens: "4-2" },
  { id: "1998-sf-2", stage: "Semi-final", date: "1998-07-08", homeTeam: "France", awayTeam: "Croatia", homeCode: "FRA", awayCode: "CRO", homeScore: 2, awayScore: 1 },
  { id: "1998-3rd", stage: "Third place", date: "1998-07-11", homeTeam: "Netherlands", awayTeam: "Croatia", homeCode: "NED", awayCode: "CRO", homeScore: 2, awayScore: 1 },
  { id: "1998-final", stage: "Final", date: "1998-07-12", homeTeam: "France", awayTeam: "Brazil", homeCode: "FRA", awayCode: "BRA", homeScore: 3, awayScore: 0 },
];

const groupHighlights = [
  { id: "1998-g-a-1", stage: "Group", group: "A", date: "1998-06-10", homeTeam: "Brazil", awayTeam: "Scotland", homeCode: "BRA", awayCode: "SCO", homeScore: 2, awayScore: 1 },
  { id: "1998-g-b-1", stage: "Group", group: "B", date: "1998-06-11", homeTeam: "Cameroon", awayTeam: "Austria", homeCode: "CMR", awayCode: "AUT", homeScore: 1, awayScore: 1 },
  { id: "1998-g-c-1", stage: "Group", group: "C", date: "1998-06-11", homeTeam: "Saudi Arabia", awayTeam: "Denmark", homeCode: "KSA", awayCode: "DEN", homeScore: 0, awayScore: 1 },
  { id: "1998-g-d-1", stage: "Group", group: "D", date: "1998-06-12", homeTeam: "Spain", awayTeam: "Nigeria", homeCode: "ESP", awayCode: "NGA", homeScore: 2, awayScore: 3 },
  { id: "1998-g-e-1", stage: "Group", group: "E", date: "1998-06-15", homeTeam: "Germany", awayTeam: "United States", homeCode: "GER", awayCode: "USA", homeScore: 2, awayScore: 0 },
  { id: "1998-g-f-1", stage: "Group", group: "F", date: "1998-06-15", homeTeam: "Netherlands", awayTeam: "Belgium", homeCode: "NED", awayCode: "BEL", homeScore: 0, awayScore: 0 },
  { id: "1998-g-g-1", stage: "Group", group: "G", date: "1998-06-15", homeTeam: "Romania", awayTeam: "Colombia", homeCode: "ROU", awayCode: "COL", homeScore: 1, awayScore: 0 },
  { id: "1998-g-h-1", stage: "Group", group: "H", date: "1998-06-10", homeTeam: "Argentina", awayTeam: "Japan", homeCode: "ARG", awayCode: "JPN", homeScore: 1, awayScore: 0 },
];

export const wc1998 = {
  year: 1998,
  host: "France",
  hosts: ["France"],
  winner: "France",
  winnerCode: "FRA",
  runnerUp: "Brazil",
  runnerUpCode: "BRA",
  topScorer: "Davor Suker (6 goals)",
  teamsCount: 32,
  format: "32 teams, 8 groups of 4, knockout",
  cities: ["Paris", "Marseille", "Lyon", "Saint-Denis", "Bordeaux"],
  attendance: "2.78 million",
  fact: "Zinedine Zidane scored twice with his head in a 3-0 final win over Brazil on home soil.",
  detailLevel: "full",
  standings,
  matches: [...groupHighlights, ...knockout],
  bracket: [
    { round: "Round of 16", matches: knockout.slice(0, 8).map((m) => m.id) },
    { round: "Quarter-final", matches: knockout.slice(8, 12).map((m) => m.id) },
    { round: "Semi-final", matches: ["1998-sf-1", "1998-sf-2"] },
    { round: "Final", matches: ["1998-final"] },
  ],
};
