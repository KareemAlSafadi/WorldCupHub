export const wc1954 = {
  year: 1954,
  host: "Switzerland",
  hosts: ["Switzerland"],
  winner: "West Germany",
  winnerCode: "FRG",
  runnerUp: "Hungary",
  runnerUpCode: "HUN",
  topScorer: "Sandor Kocsis (11 goals)",
  teamsCount: 16,
  format: "16 teams, 4 groups of 4 (two matches each), knockout from quarter-finals",
  cities: ["Bern", "Basel", "Zurich", "Geneva", "Lausanne"],
  attendance: "0.77 million",
  fact: "The Miracle of Bern: West Germany came from 2-0 down to beat Mighty Magyars Hungary 3-2 — Hungary's first defeat in four years, after thrashing the same side 8-3 in the group. Each team played only two group matches.",
  detailLevel: "full",
  standings: {
    1: [
      { team: "Brazil", code: "BRA", played: 2, won: 1, drawn: 1, lost: 0, gf: 6, ga: 1, gd: 5, points: 3 },
      { team: "Yugoslavia", code: "YUG", played: 2, won: 1, drawn: 1, lost: 0, gf: 2, ga: 1, gd: 1, points: 3 },
      { team: "France", code: "FRA", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 3, gd: 0, points: 2 },
      { team: "Mexico", code: "MEX", played: 2, won: 0, drawn: 0, lost: 2, gf: 2, ga: 8, gd: -6, points: 0 }
    ],
    2: [
      { team: "Hungary", code: "HUN", played: 2, won: 2, drawn: 0, lost: 0, gf: 17, ga: 3, gd: 14, points: 4 },
      { team: "West Germany", code: "FRG", played: 2, won: 1, drawn: 0, lost: 1, gf: 7, ga: 9, gd: -2, points: 2 },
      { team: "Turkey", code: "TUR", played: 2, won: 1, drawn: 0, lost: 1, gf: 8, ga: 4, gd: 4, points: 2 },
      { team: "South Korea", code: "KOR", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 16, gd: -16, points: 0 }
    ],
    3: [
      { team: "Uruguay", code: "URU", played: 2, won: 2, drawn: 0, lost: 0, gf: 9, ga: 0, gd: 9, points: 4 },
      { team: "Austria", code: "AUT", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 0, gd: 6, points: 4 },
      { team: "Czechoslovakia", code: "TCH", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 7, gd: -7, points: 0 },
      { team: "Scotland", code: "SCO", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 8, gd: -8, points: 0 }
    ],
    4: [
      { team: "England", code: "ENG", played: 2, won: 1, drawn: 1, lost: 0, gf: 6, ga: 4, gd: 2, points: 3 },
      { team: "Switzerland", code: "SUI", played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 3, gd: -1, points: 2 },
      { team: "Italy", code: "ITA", played: 2, won: 1, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 2 },
      { team: "Belgium", code: "BEL", played: 2, won: 0, drawn: 1, lost: 1, gf: 5, ga: 8, gd: -3, points: 1 }
    ]
  },
  matches: [
    { id: "1954-g-2-1", stage: "Group", group: "2", date: "1954-06-20", homeTeam: "Hungary", awayTeam: "West Germany", homeCode: "HUN", awayCode: "FRG", homeScore: 8, awayScore: 3 },
    { id: "1954-g-2-2", stage: "Group", group: "2", date: "1954-06-17", homeTeam: "Hungary", awayTeam: "South Korea", homeCode: "HUN", awayCode: "KOR", homeScore: 9, awayScore: 0 },
    { id: "1954-qf-1", stage: "Quarter-final", date: "1954-06-27", homeTeam: "West Germany", awayTeam: "Yugoslavia", homeCode: "FRG", awayCode: "YUG", homeScore: 2, awayScore: 0 },
    { id: "1954-qf-2", stage: "Quarter-final", date: "1954-06-27", homeTeam: "Hungary", awayTeam: "Brazil", homeCode: "HUN", awayCode: "BRA", homeScore: 4, awayScore: 2 },
    { id: "1954-qf-3", stage: "Quarter-final", date: "1954-06-26", homeTeam: "Austria", awayTeam: "Switzerland", homeCode: "AUT", awayCode: "SUI", homeScore: 7, awayScore: 5 },
    { id: "1954-qf-4", stage: "Quarter-final", date: "1954-06-26", homeTeam: "Uruguay", awayTeam: "England", homeCode: "URU", awayCode: "ENG", homeScore: 4, awayScore: 2 },
    { id: "1954-sf-1", stage: "Semi-final", date: "1954-06-30", homeTeam: "West Germany", awayTeam: "Austria", homeCode: "FRG", awayCode: "AUT", homeScore: 6, awayScore: 1 },
    { id: "1954-sf-2", stage: "Semi-final", date: "1954-06-30", homeTeam: "Hungary", awayTeam: "Uruguay", homeCode: "HUN", awayCode: "URU", homeScore: 4, awayScore: 2, extra: "AET" },
    { id: "1954-3rd", stage: "Third place", date: "1954-07-03", homeTeam: "Austria", awayTeam: "Uruguay", homeCode: "AUT", awayCode: "URU", homeScore: 3, awayScore: 1 },
    { id: "1954-final", stage: "Final", date: "1954-07-04", homeTeam: "West Germany", awayTeam: "Hungary", homeCode: "FRG", awayCode: "HUN", homeScore: 3, awayScore: 2 }
  ],
  bracket: [
    { round: "Quarter-final", matches: ["1954-qf-1", "1954-qf-2", "1954-qf-3", "1954-qf-4"] },
    { round: "Semi-final", matches: ["1954-sf-1", "1954-sf-2"] },
    { round: "Final", matches: ["1954-final"] }
  ]
};
