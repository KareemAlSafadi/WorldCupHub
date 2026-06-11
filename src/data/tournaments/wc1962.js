export const wc1962 = {
  year: 1962,
  host: "Chile",
  hosts: ["Chile"],
  winner: "Brazil",
  winnerCode: "BRA",
  runnerUp: "Czechoslovakia",
  runnerUpCode: "TCH",
  topScorer: "Multiple (4 goals)",
  teamsCount: 16,
  format: "16 teams, 4 groups of 4, knockout from quarter-finals",
  cities: ["Santiago", "Viña del Mar", "Rancagua", "Arica"],
  attendance: "0.89 million",
  fact: "Brazil retained the trophy despite losing Pele to injury in the second match — Garrincha took over. The group stage produced the infamous 'Battle of Santiago' between Chile and Italy. Wins were worth 2 points.",
  detailLevel: "full",
  standings: {
    1: [
      { team: "Soviet Union", code: "URS", played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 5, gd: 3, points: 5 },
      { team: "Yugoslavia", code: "YUG", played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 3, gd: 5, points: 4 },
      { team: "Uruguay", code: "URU", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 6, gd: -2, points: 2 },
      { team: "Colombia", code: "COL", played: 3, won: 0, drawn: 1, lost: 2, gf: 5, ga: 11, gd: -6, points: 1 }
    ],
    2: [
      { team: "West Germany", code: "FRG", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, gd: 3, points: 5 },
      { team: "Chile", code: "CHI", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 4 },
      { team: "Italy", code: "ITA", played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 2, gd: 1, points: 3 },
      { team: "Switzerland", code: "SUI", played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 8, gd: -6, points: 0 }
    ],
    3: [
      { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, gd: 3, points: 5 },
      { team: "Czechoslovakia", code: "TCH", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 3, gd: -1, points: 3 },
      { team: "Mexico", code: "MEX", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 4, gd: -1, points: 2 },
      { team: "Spain", code: "ESP", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 3, gd: -1, points: 2 }
    ],
    4: [
      { team: "Hungary", code: "HUN", played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 2, gd: 6, points: 5 },
      { team: "England", code: "ENG", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, points: 3 },
      { team: "Argentina", code: "ARG", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 3, gd: -1, points: 3 },
      { team: "Bulgaria", code: "BUL", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 7, gd: -6, points: 1 }
    ]
  },
  matches: [
    { id: "1962-g-2-1", stage: "Group", group: "2", date: "1962-06-02", homeTeam: "Chile", awayTeam: "Italy", homeCode: "CHI", awayCode: "ITA", homeScore: 2, awayScore: 0 },
    { id: "1962-g-3-1", stage: "Group", group: "3", date: "1962-06-06", homeTeam: "Brazil", awayTeam: "Spain", homeCode: "BRA", awayCode: "ESP", homeScore: 2, awayScore: 1 },
    { id: "1962-qf-1", stage: "Quarter-final", date: "1962-06-10", homeTeam: "Brazil", awayTeam: "England", homeCode: "BRA", awayCode: "ENG", homeScore: 3, awayScore: 1 },
    { id: "1962-qf-2", stage: "Quarter-final", date: "1962-06-10", homeTeam: "Chile", awayTeam: "Soviet Union", homeCode: "CHI", awayCode: "URS", homeScore: 2, awayScore: 1 },
    { id: "1962-qf-3", stage: "Quarter-final", date: "1962-06-10", homeTeam: "Yugoslavia", awayTeam: "West Germany", homeCode: "YUG", awayCode: "FRG", homeScore: 1, awayScore: 0 },
    { id: "1962-qf-4", stage: "Quarter-final", date: "1962-06-10", homeTeam: "Czechoslovakia", awayTeam: "Hungary", homeCode: "TCH", awayCode: "HUN", homeScore: 1, awayScore: 0 },
    { id: "1962-sf-1", stage: "Semi-final", date: "1962-06-13", homeTeam: "Brazil", awayTeam: "Chile", homeCode: "BRA", awayCode: "CHI", homeScore: 4, awayScore: 2 },
    { id: "1962-sf-2", stage: "Semi-final", date: "1962-06-13", homeTeam: "Czechoslovakia", awayTeam: "Yugoslavia", homeCode: "TCH", awayCode: "YUG", homeScore: 3, awayScore: 1 },
    { id: "1962-3rd", stage: "Third place", date: "1962-06-16", homeTeam: "Chile", awayTeam: "Yugoslavia", homeCode: "CHI", awayCode: "YUG", homeScore: 1, awayScore: 0 },
    { id: "1962-final", stage: "Final", date: "1962-06-17", homeTeam: "Brazil", awayTeam: "Czechoslovakia", homeCode: "BRA", awayCode: "TCH", homeScore: 3, awayScore: 1 }
  ],
  bracket: [
    { round: "Quarter-final", matches: ["1962-qf-1", "1962-qf-2", "1962-qf-3", "1962-qf-4"] },
    { round: "Semi-final", matches: ["1962-sf-1", "1962-sf-2"] },
    { round: "Final", matches: ["1962-final"] }
  ]
};
