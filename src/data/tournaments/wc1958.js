export const wc1958 = {
  year: 1958,
  host: "Sweden",
  hosts: ["Sweden"],
  winner: "Brazil",
  winnerCode: "BRA",
  runnerUp: "Sweden",
  runnerUpCode: "SWE",
  topScorer: "Just Fontaine (13 goals)",
  teamsCount: 16,
  format: "16 teams, 4 groups of 4, knockout from quarter-finals",
  cities: ["Stockholm", "Gothenburg", "Malmö", "Norrköping"],
  attendance: "0.82 million",
  fact: "A 17-year-old Pele scored a semi-final hat-trick and twice in the final as Brazil won their first title. Just Fontaine's 13 goals remain the single-tournament record. Wins were worth 2 points; group ties were settled by playoffs.",
  detailLevel: "full",
  standings: {
    1: [
      { team: "West Germany", code: "FRG", played: 3, won: 1, drawn: 2, lost: 0, gf: 7, ga: 5, gd: 2, points: 4 },
      { team: "Northern Ireland", code: "NIR", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 5, gd: -1, points: 3 },
      { team: "Czechoslovakia", code: "TCH", played: 3, won: 1, drawn: 1, lost: 1, gf: 8, ga: 4, gd: 4, points: 3 },
      { team: "Argentina", code: "ARG", played: 3, won: 1, drawn: 0, lost: 2, gf: 5, ga: 10, gd: -5, points: 2 }
    ],
    2: [
      { team: "France", code: "FRA", played: 3, won: 2, drawn: 0, lost: 1, gf: 11, ga: 7, gd: 4, points: 4 },
      { team: "Yugoslavia", code: "YUG", played: 3, won: 1, drawn: 2, lost: 0, gf: 7, ga: 6, gd: 1, points: 4 },
      { team: "Paraguay", code: "PAR", played: 3, won: 1, drawn: 1, lost: 1, gf: 9, ga: 12, gd: -3, points: 3 },
      { team: "Scotland", code: "SCO", played: 3, won: 0, drawn: 1, lost: 2, gf: 4, ga: 6, gd: -2, points: 1 }
    ],
    3: [
      { team: "Sweden", code: "SWE", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, gd: 4, points: 5 },
      { team: "Wales", code: "WAL", played: 3, won: 0, drawn: 3, lost: 0, gf: 2, ga: 2, gd: 0, points: 3 },
      { team: "Hungary", code: "HUN", played: 3, won: 1, drawn: 1, lost: 1, gf: 6, ga: 3, gd: 3, points: 3 },
      { team: "Mexico", code: "MEX", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 8, gd: -7, points: 1 }
    ],
    4: [
      { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 0, gd: 5, points: 5 },
      { team: "Soviet Union", code: "URS", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 3 },
      { team: "England", code: "ENG", played: 3, won: 0, drawn: 3, lost: 0, gf: 4, ga: 4, gd: 0, points: 3 },
      { team: "Austria", code: "AUT", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 7, gd: -5, points: 1 }
    ]
  },
  matches: [
    { id: "1958-g-4-1", stage: "Group", group: "4", date: "1958-06-15", homeTeam: "Brazil", awayTeam: "Soviet Union", homeCode: "BRA", awayCode: "URS", homeScore: 2, awayScore: 0 },
    { id: "1958-g-2-1", stage: "Group", group: "2", date: "1958-06-08", homeTeam: "France", awayTeam: "Paraguay", homeCode: "FRA", awayCode: "PAR", homeScore: 7, awayScore: 3 },
    { id: "1958-qf-1", stage: "Quarter-final", date: "1958-06-19", homeTeam: "Brazil", awayTeam: "Wales", homeCode: "BRA", awayCode: "WAL", homeScore: 1, awayScore: 0 },
    { id: "1958-qf-2", stage: "Quarter-final", date: "1958-06-19", homeTeam: "France", awayTeam: "Northern Ireland", homeCode: "FRA", awayCode: "NIR", homeScore: 4, awayScore: 0 },
    { id: "1958-qf-3", stage: "Quarter-final", date: "1958-06-19", homeTeam: "Sweden", awayTeam: "Soviet Union", homeCode: "SWE", awayCode: "URS", homeScore: 2, awayScore: 0 },
    { id: "1958-qf-4", stage: "Quarter-final", date: "1958-06-19", homeTeam: "West Germany", awayTeam: "Yugoslavia", homeCode: "FRG", awayCode: "YUG", homeScore: 1, awayScore: 0 },
    { id: "1958-sf-1", stage: "Semi-final", date: "1958-06-24", homeTeam: "Brazil", awayTeam: "France", homeCode: "BRA", awayCode: "FRA", homeScore: 5, awayScore: 2 },
    { id: "1958-sf-2", stage: "Semi-final", date: "1958-06-24", homeTeam: "Sweden", awayTeam: "West Germany", homeCode: "SWE", awayCode: "FRG", homeScore: 3, awayScore: 1 },
    { id: "1958-3rd", stage: "Third place", date: "1958-06-28", homeTeam: "France", awayTeam: "West Germany", homeCode: "FRA", awayCode: "FRG", homeScore: 6, awayScore: 3 },
    { id: "1958-final", stage: "Final", date: "1958-06-29", homeTeam: "Brazil", awayTeam: "Sweden", homeCode: "BRA", awayCode: "SWE", homeScore: 5, awayScore: 2 }
  ],
  bracket: [
    { round: "Quarter-final", matches: ["1958-qf-1", "1958-qf-2", "1958-qf-3", "1958-qf-4"] },
    { round: "Semi-final", matches: ["1958-sf-1", "1958-sf-2"] },
    { round: "Final", matches: ["1958-final"] }
  ]
};
