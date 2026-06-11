export const wc1930 = {
  year: 1930,
  host: "Uruguay",
  hosts: ["Uruguay"],
  winner: "Uruguay",
  winnerCode: "URU",
  runnerUp: "Argentina",
  runnerUpCode: "ARG",
  topScorer: "Guillermo Stabile (8 goals)",
  teamsCount: 13,
  format: "13 teams, 4 groups, semi-finals and final",
  cities: ["Montevideo"],
  attendance: "0.59 million",
  fact: "The inaugural FIFA World Cup, played entirely in Montevideo. France's Lucien Laurent scored the first ever World Cup goal, and hosts Uruguay beat Argentina 4-2 in the final at the brand-new Estadio Centenario. No third-place match was played.",
  detailLevel: "full",
  standings: {
    1: [
      { team: "Argentina", code: "ARG", played: 3, won: 3, drawn: 0, lost: 0, gf: 10, ga: 4, gd: 6, points: 6 },
      { team: "Chile", code: "CHI", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 4 },
      { team: "France", code: "FRA", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 3, gd: 1, points: 2 },
      { team: "Mexico", code: "MEX", played: 3, won: 0, drawn: 0, lost: 3, gf: 4, ga: 13, gd: -9, points: 0 }
    ],
    2: [
      { team: "Yugoslavia", code: "YUG", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 1, gd: 5, points: 4 },
      { team: "Brazil", code: "BRA", played: 2, won: 1, drawn: 0, lost: 1, gf: 5, ga: 2, gd: 3, points: 2 },
      { team: "Bolivia", code: "BOL", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 8, gd: -8, points: 0 }
    ],
    3: [
      { team: "Uruguay", code: "URU", played: 2, won: 2, drawn: 0, lost: 0, gf: 5, ga: 0, gd: 5, points: 4 },
      { team: "Romania", code: "ROU", played: 2, won: 1, drawn: 0, lost: 1, gf: 3, ga: 5, gd: -2, points: 2 },
      { team: "Peru", code: "PER", played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 4, gd: -3, points: 0 }
    ],
    4: [
      { team: "United States", code: "USA", played: 2, won: 2, drawn: 0, lost: 0, gf: 6, ga: 0, gd: 6, points: 4 },
      { team: "Paraguay", code: "PAR", played: 2, won: 1, drawn: 0, lost: 1, gf: 1, ga: 3, gd: -2, points: 2 },
      { team: "Belgium", code: "BEL", played: 2, won: 0, drawn: 0, lost: 2, gf: 0, ga: 4, gd: -4, points: 0 }
    ]
  },
  matches: [
    { id: "1930-g-1-1", stage: "Group", group: "1", date: "1930-07-13", homeTeam: "France", awayTeam: "Mexico", homeCode: "FRA", awayCode: "MEX", homeScore: 4, awayScore: 1 },
    { id: "1930-g-3-1", stage: "Group", group: "3", date: "1930-07-18", homeTeam: "Uruguay", awayTeam: "Peru", homeCode: "URU", awayCode: "PER", homeScore: 1, awayScore: 0 },
    { id: "1930-g-1-2", stage: "Group", group: "1", date: "1930-07-15", homeTeam: "Argentina", awayTeam: "France", homeCode: "ARG", awayCode: "FRA", homeScore: 1, awayScore: 0 },
    { id: "1930-sf-1", stage: "Semi-final", date: "1930-07-26", homeTeam: "Argentina", awayTeam: "United States", homeCode: "ARG", awayCode: "USA", homeScore: 6, awayScore: 1 },
    { id: "1930-sf-2", stage: "Semi-final", date: "1930-07-27", homeTeam: "Uruguay", awayTeam: "Yugoslavia", homeCode: "URU", awayCode: "YUG", homeScore: 6, awayScore: 1 },
    { id: "1930-final", stage: "Final", date: "1930-07-30", homeTeam: "Uruguay", awayTeam: "Argentina", homeCode: "URU", awayCode: "ARG", homeScore: 4, awayScore: 2 }
  ],
  bracket: [
    { round: "Semi-final", matches: ["1930-sf-1", "1930-sf-2"] },
    { round: "Final", matches: ["1930-final"] }
  ]
};
