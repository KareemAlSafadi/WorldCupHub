export const wc1950 = {
  year: 1950,
  host: "Brazil",
  hosts: ["Brazil"],
  winner: "Uruguay",
  winnerCode: "URU",
  runnerUp: "Brazil",
  runnerUpCode: "BRA",
  topScorer: "Ademir (8 goals)",
  teamsCount: 13,
  format: "13 teams, 4 first-round groups, final round-robin of 4 (no final match)",
  cities: ["Rio de Janeiro", "São Paulo", "Belo Horizonte", "Porto Alegre", "Recife"],
  attendance: "1.04 million",
  fact: "The Maracanazo: needing only a draw in the deciding match, Brazil lost 2-1 to Uruguay before ~200,000 at the Maracana — the only World Cup settled by a final group, not a final. The USA also stunned England 1-0.",
  detailLevel: "full",
  standings: {
    A: [
      { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 2, gd: 6, points: 5 },
      { team: "Yugoslavia", code: "YUG", played: 3, won: 2, drawn: 0, lost: 1, gf: 7, ga: 3, gd: 4, points: 4 },
      { team: "Switzerland", code: "SUI", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 6, gd: -2, points: 3 },
      { team: "Mexico", code: "MEX", played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 10, gd: -8, points: 0 }
    ],
    B: [
      { team: "Spain", code: "ESP", played: 3, won: 3, drawn: 0, lost: 0, gf: 6, ga: 1, gd: 5, points: 6 },
      { team: "England", code: "ENG", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 2, gd: 0, points: 2 },
      { team: "Chile", code: "CHI", played: 3, won: 1, drawn: 0, lost: 2, gf: 5, ga: 6, gd: -1, points: 2 },
      { team: "United States", code: "USA", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 8, gd: -4, points: 2 }
    ],
    C: [
      { team: "Sweden", code: "SWE", played: 2, won: 1, drawn: 1, lost: 0, gf: 5, ga: 4, gd: 1, points: 3 },
      { team: "Italy", code: "ITA", played: 2, won: 1, drawn: 0, lost: 1, gf: 4, ga: 3, gd: 1, points: 2 },
      { team: "Paraguay", code: "PAR", played: 2, won: 0, drawn: 1, lost: 1, gf: 2, ga: 4, gd: -2, points: 1 }
    ],
    D: [
      { team: "Uruguay", code: "URU", played: 1, won: 1, drawn: 0, lost: 0, gf: 8, ga: 0, gd: 8, points: 2 },
      { team: "Bolivia", code: "BOL", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 8, gd: -8, points: 0 }
    ],
    "Final Round": [
      { team: "Uruguay", code: "URU", played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 5, gd: 2, points: 5 },
      { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 0, lost: 1, gf: 14, ga: 4, gd: 10, points: 4 },
      { team: "Sweden", code: "SWE", played: 3, won: 1, drawn: 0, lost: 2, gf: 6, ga: 11, gd: -5, points: 2 },
      { team: "Spain", code: "ESP", played: 3, won: 0, drawn: 1, lost: 2, gf: 4, ga: 11, gd: -7, points: 1 }
    ]
  },
  matches: [
    { id: "1950-g-b-1", stage: "Group", group: "B", date: "1950-06-29", homeTeam: "United States", awayTeam: "England", homeCode: "USA", awayCode: "ENG", homeScore: 1, awayScore: 0 },
    { id: "1950-g-d-1", stage: "Group", group: "D", date: "1950-07-02", homeTeam: "Uruguay", awayTeam: "Bolivia", homeCode: "URU", awayCode: "BOL", homeScore: 8, awayScore: 0 },
    { id: "1950-fr-1", stage: "Second round", date: "1950-07-09", homeTeam: "Brazil", awayTeam: "Sweden", homeCode: "BRA", awayCode: "SWE", homeScore: 7, awayScore: 1 },
    { id: "1950-fr-2", stage: "Second round", date: "1950-07-09", homeTeam: "Uruguay", awayTeam: "Spain", homeCode: "URU", awayCode: "ESP", homeScore: 2, awayScore: 2 },
    { id: "1950-fr-3", stage: "Second round", date: "1950-07-13", homeTeam: "Brazil", awayTeam: "Spain", homeCode: "BRA", awayCode: "ESP", homeScore: 6, awayScore: 1 },
    { id: "1950-fr-4", stage: "Second round", date: "1950-07-13", homeTeam: "Uruguay", awayTeam: "Sweden", homeCode: "URU", awayCode: "SWE", homeScore: 3, awayScore: 2 },
    { id: "1950-fr-5", stage: "Second round", date: "1950-07-16", homeTeam: "Sweden", awayTeam: "Spain", homeCode: "SWE", awayCode: "ESP", homeScore: 3, awayScore: 1 },
    { id: "1950-fr-6", stage: "Second round", date: "1950-07-16", homeTeam: "Brazil", awayTeam: "Uruguay", homeCode: "BRA", awayCode: "URU", homeScore: 1, awayScore: 2 }
  ]
};
