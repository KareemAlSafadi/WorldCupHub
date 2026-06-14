/** Detailed tournament data (standings/matches/brackets) merged over the summary index */
import { wc1930 } from './tournaments/wc1930.js';
import { wc1934 } from './tournaments/wc1934.js';
import { wc1938 } from './tournaments/wc1938.js';
import { wc1950 } from './tournaments/wc1950.js';
import { wc1954 } from './tournaments/wc1954.js';
import { wc1958 } from './tournaments/wc1958.js';
import { wc1962 } from './tournaments/wc1962.js';
import { wc1966 } from './tournaments/wc1966.js';
import { wc1970 } from './tournaments/wc1970.js';
import { wc1974 } from './tournaments/wc1974.js';
import { wc1978 } from './tournaments/wc1978.js';
import { wc1982 } from './tournaments/wc1982.js';
import { wc1986 } from './tournaments/wc1986.js';
import { wc1990 } from './tournaments/wc1990.js';
import { wc1994 } from './tournaments/wc1994.js';
import { wc1998 } from './tournaments/wc1998.js';
import { wc2002 } from './tournaments/wc2002.js';
import { wc2006 } from './tournaments/wc2006.js';
import { wc2010 } from './tournaments/wc2010.js';
import { wc2014 } from './tournaments/wc2014.js';
import { wc2026 } from './tournaments/wc2026.js';

export const fullTournaments = [
  wc2026,
  {
    year: 2022,
    host: "Qatar",
    hosts: ["Qatar"],
    winner: "Argentina",
    winnerCode: "ARG",
    runnerUp: "France",
    runnerUpCode: "FRA",
    topScorer: "Kylian Mbappe (8 goals)",
    teamsCount: 32,
    format: "32 teams, 8 groups of 4, knockout",
    cities: ["Doha", "Lusail", "Al Khor", "Al Rayyan", "Al Wakrah"],
    attendance: "3.4 million",
    fact: "First World Cup held in the Middle East. Argentina won their third title on penalties after a 3-3 final.",
    detailLevel: "full",
    standings: {
      A: [
        { team: "Netherlands", code: "NED", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 2, gd: 3, points: 7 },
        { team: "Senegal", code: "SEN", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 4, gd: 1, points: 6 },
        { team: "Ecuador", code: "ECU", played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, gd: 0, points: 4 },
        { team: "Qatar", code: "QAT", played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 5, gd: -4, points: 0 }
      ],
      B: [
        { team: "England", code: "ENG", played: 3, won: 2, drawn: 1, lost: 0, gf: 9, ga: 2, gd: 7, points: 7 },
        { team: "United States", code: "USA", played: 3, won: 1, drawn: 2, lost: 0, gf: 2, ga: 1, gd: 1, points: 5 },
        { team: "Iran", code: "IRN", played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 7, gd: -3, points: 3 },
        { team: "Wales", code: "WAL", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 6, gd: -5, points: 1 }
      ],
      C: [
        { team: "Argentina", code: "ARG", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 2, gd: 3, points: 6 },
        { team: "Poland", code: "POL", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, points: 4 },
        { team: "Mexico", code: "MEX", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 3, gd: -1, points: 4 },
        { team: "Saudi Arabia", code: "KSA", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, gd: -2, points: 3 }
      ],
      D: [
        { team: "France", code: "FRA", played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 3, gd: 3, points: 6 },
        { team: "Australia", code: "AUS", played: 3, won: 2, drawn: 0, lost: 1, gf: 3, ga: 4, gd: -1, points: 6 },
        { team: "Tunisia", code: "TUN", played: 3, won: 1, drawn: 1, lost: 1, gf: 1, ga: 1, gd: 0, points: 4 },
        { team: "Denmark", code: "DEN", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 3, gd: -2, points: 1 }
      ],
      E: [
        { team: "Japan", code: "JPN", played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 3, gd: 1, points: 6 },
        { team: "Spain", code: "ESP", played: 3, won: 1, drawn: 1, lost: 1, gf: 9, ga: 3, gd: 6, points: 4 },
        { team: "Germany", code: "GER", played: 3, won: 1, drawn: 1, lost: 1, gf: 6, ga: 5, gd: 1, points: 4 },
        { team: "Costa Rica", code: "CRC", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 11, gd: -8, points: 3 }
      ],
      F: [
        { team: "Morocco", code: "MAR", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, gd: 3, points: 7 },
        { team: "Croatia", code: "CRO", played: 3, won: 1, drawn: 2, lost: 0, gf: 4, ga: 1, gd: 3, points: 5 },
        { team: "Belgium", code: "BEL", played: 3, won: 1, drawn: 1, lost: 1, gf: 1, ga: 2, gd: -1, points: 4 },
        { team: "Canada", code: "CAN", played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 7, gd: -5, points: 0 }
      ],
      G: [
        { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 0, lost: 1, gf: 3, ga: 1, gd: 2, points: 6 },
        { team: "Switzerland", code: "SUI", played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 3, gd: 1, points: 6 },
        { team: "Cameroon", code: "CMR", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
        { team: "Serbia", code: "SRB", played: 3, won: 0, drawn: 1, lost: 2, gf: 5, ga: 8, gd: -3, points: 1 }
      ],
      H: [
        { team: "Portugal", code: "POR", played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 4, gd: 2, points: 6 },
        { team: "South Korea", code: "KOR", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
        { team: "Uruguay", code: "URU", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, points: 4 },
        { team: "Ghana", code: "GHA", played: 3, won: 1, drawn: 0, lost: 2, gf: 5, ga: 7, gd: -2, points: 3 }
      ]
    },
    matches: [
      { id: "2022-g-a-1", stage: "Group", group: "A", date: "2022-11-20", homeTeam: "Qatar", awayTeam: "Ecuador", homeCode: "QAT", awayCode: "ECU", homeScore: 0, awayScore: 2 },
      { id: "2022-g-a-2", stage: "Group", group: "A", date: "2022-11-21", homeTeam: "Senegal", awayTeam: "Netherlands", homeCode: "SEN", awayCode: "NED", homeScore: 0, awayScore: 2 },
      { id: "2022-g-c-1", stage: "Group", group: "C", date: "2022-11-22", homeTeam: "Argentina", awayTeam: "Saudi Arabia", homeCode: "ARG", awayCode: "KSA", homeScore: 1, awayScore: 2 },
      { id: "2022-g-e-1", stage: "Group", group: "E", date: "2022-11-23", homeTeam: "Germany", awayTeam: "Japan", homeCode: "GER", awayCode: "JPN", homeScore: 1, awayScore: 2 },
      { id: "2022-g-f-1", stage: "Group", group: "F", date: "2022-11-23", homeTeam: "Morocco", awayTeam: "Croatia", homeCode: "MAR", awayCode: "CRO", homeScore: 0, awayScore: 0 },
      { id: "2022-r16-1", stage: "Round of 16", date: "2022-12-03", homeTeam: "Netherlands", awayTeam: "United States", homeCode: "NED", awayCode: "USA", homeScore: 3, awayScore: 1 },
      { id: "2022-r16-2", stage: "Round of 16", date: "2022-12-03", homeTeam: "Argentina", awayTeam: "Australia", homeCode: "ARG", awayCode: "AUS", homeScore: 2, awayScore: 1 },
      { id: "2022-r16-3", stage: "Round of 16", date: "2022-12-04", homeTeam: "France", awayTeam: "Poland", homeCode: "FRA", awayCode: "POL", homeScore: 3, awayScore: 1 },
      { id: "2022-r16-4", stage: "Round of 16", date: "2022-12-04", homeTeam: "England", awayTeam: "Senegal", homeCode: "ENG", awayCode: "SEN", homeScore: 3, awayScore: 0 },
      { id: "2022-r16-5", stage: "Round of 16", date: "2022-12-05", homeTeam: "Japan", awayTeam: "Croatia", homeCode: "JPN", awayCode: "CRO", homeScore: 1, awayScore: 1, pens: "1-3" },
      { id: "2022-r16-6", stage: "Round of 16", date: "2022-12-05", homeTeam: "Brazil", awayTeam: "South Korea", homeCode: "BRA", awayCode: "KOR", homeScore: 4, awayScore: 1 },
      { id: "2022-r16-7", stage: "Round of 16", date: "2022-12-06", homeTeam: "Morocco", awayTeam: "Spain", homeCode: "MAR", awayCode: "ESP", homeScore: 0, awayScore: 0, pens: "3-0" },
      { id: "2022-r16-8", stage: "Round of 16", date: "2022-12-06", homeTeam: "Portugal", awayTeam: "Switzerland", homeCode: "POR", awayCode: "SUI", homeScore: 6, awayScore: 1 },
      { id: "2022-qf-1", stage: "Quarter-final", date: "2022-12-09", homeTeam: "Croatia", awayTeam: "Brazil", homeCode: "CRO", awayCode: "BRA", homeScore: 1, awayScore: 1, pens: "4-2" },
      { id: "2022-qf-2", stage: "Quarter-final", date: "2022-12-09", homeTeam: "Argentina", awayTeam: "Netherlands", homeCode: "ARG", awayCode: "NED", homeScore: 2, awayScore: 2, pens: "4-3" },
      { id: "2022-qf-3", stage: "Quarter-final", date: "2022-12-10", homeTeam: "France", awayTeam: "England", homeCode: "FRA", awayCode: "ENG", homeScore: 2, awayScore: 1 },
      { id: "2022-qf-4", stage: "Quarter-final", date: "2022-12-10", homeTeam: "Morocco", awayTeam: "Portugal", homeCode: "MAR", awayCode: "POR", homeScore: 1, awayScore: 0 },
      { id: "2022-sf-1", stage: "Semi-final", date: "2022-12-13", homeTeam: "Argentina", awayTeam: "Croatia", homeCode: "ARG", awayCode: "CRO", homeScore: 3, awayScore: 0 },
      { id: "2022-sf-2", stage: "Semi-final", date: "2022-12-14", homeTeam: "France", awayTeam: "Morocco", homeCode: "FRA", awayCode: "MAR", homeScore: 2, awayScore: 0 },
      { id: "2022-3rd", stage: "Third place", date: "2022-12-17", homeTeam: "Croatia", awayTeam: "Morocco", homeCode: "CRO", awayCode: "MAR", homeScore: 2, awayScore: 1 },
      { id: "2022-final", stage: "Final", date: "2022-12-18", homeTeam: "Argentina", awayTeam: "France", homeCode: "ARG", awayCode: "FRA", homeScore: 3, awayScore: 3, pens: "4-2" }
    ],
    bracket: [
      { round: "Round of 16", matches: ["2022-r16-1", "2022-r16-2", "2022-r16-3", "2022-r16-4", "2022-r16-5", "2022-r16-6", "2022-r16-7", "2022-r16-8"] },
      { round: "Quarter-final", matches: ["2022-qf-1", "2022-qf-2", "2022-qf-3", "2022-qf-4"] },
      { round: "Semi-final", matches: ["2022-sf-1", "2022-sf-2"] },
      { round: "Final", matches: ["2022-final"] }
    ]
  },
  {
    year: 2018,
    host: "Russia",
    hosts: ["Russia"],
    winner: "France",
    winnerCode: "FRA",
    runnerUp: "Croatia",
    runnerUpCode: "CRO",
    topScorer: "Harry Kane (6 goals)",
    teamsCount: 32,
    format: "32 teams, 8 groups of 4, knockout",
    cities: ["Moscow", "Saint Petersburg", "Sochi", "Kazan", "Samara"],
    attendance: "3.03 million",
    fact: "France won their second title, defeating Croatia 4-2 in the final at Luzhniki Stadium.",
    detailLevel: "full",
    standings: {
      A: [
        { team: "Uruguay", code: "URU", played: 3, won: 3, drawn: 0, lost: 0, gf: 5, ga: 0, gd: 5, points: 9 },
        { team: "Russia", code: "RUS", played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 3, gd: 5, points: 6 },
        { team: "Saudi Arabia", code: "KSA", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 7, gd: -5, points: 3 },
        { team: "Egypt", code: "EGY", played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 6, gd: -5, points: 0 }
      ],
      B: [
        { team: "Spain", code: "ESP", played: 3, won: 1, drawn: 2, lost: 0, gf: 6, ga: 5, gd: 1, points: 5 },
        { team: "Portugal", code: "POR", played: 3, won: 1, drawn: 2, lost: 0, gf: 5, ga: 4, gd: 1, points: 5 },
        { team: "Iran", code: "IRN", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, points: 4 },
        { team: "Morocco", code: "MAR", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 4, gd: -2, points: 1 }
      ],
      C: [
        { team: "France", code: "FRA", played: 3, won: 2, drawn: 1, lost: 0, gf: 3, ga: 1, gd: 2, points: 7 },
        { team: "Denmark", code: "DEN", played: 3, won: 1, drawn: 2, lost: 0, gf: 2, ga: 1, gd: 1, points: 5 },
        { team: "Peru", code: "PER", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 2, gd: 0, points: 3 },
        { team: "Australia", code: "AUS", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 }
      ],
      D: [
        { team: "Croatia", code: "CRO", played: 3, won: 3, drawn: 0, lost: 0, gf: 7, ga: 0, gd: 7, points: 9 },
        { team: "Argentina", code: "ARG", played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 5, gd: -2, points: 4 },
        { team: "Nigeria", code: "NGA", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 4, gd: -1, points: 3 },
        { team: "Iceland", code: "ISL", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 }
      ],
      E: [
        { team: "Brazil", code: "BRA", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, gd: 4, points: 7 },
        { team: "Switzerland", code: "SUI", played: 3, won: 1, drawn: 2, lost: 0, gf: 5, ga: 4, gd: 1, points: 5 },
        { team: "Serbia", code: "SRB", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 4, gd: -2, points: 3 },
        { team: "Costa Rica", code: "CRC", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 }
      ],
      F: [
        { team: "Sweden", code: "SWE", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 2, gd: 3, points: 6 },
        { team: "Mexico", code: "MEX", played: 3, won: 2, drawn: 0, lost: 1, gf: 3, ga: 4, gd: -1, points: 6 },
        { team: "South Korea", code: "KOR", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 3, gd: 0, points: 3 },
        { team: "Germany", code: "GER", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 2, gd: 0, points: 3 }
      ],
      G: [
        { team: "Belgium", code: "BEL", played: 3, won: 3, drawn: 0, lost: 0, gf: 9, ga: 2, gd: 7, points: 9 },
        { team: "England", code: "ENG", played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 3, gd: 5, points: 6 },
        { team: "Tunisia", code: "TUN", played: 3, won: 1, drawn: 0, lost: 2, gf: 5, ga: 8, gd: -3, points: 3 },
        { team: "Panama", code: "PAN", played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 11, gd: -9, points: 0 }
      ],
      H: [
        { team: "Colombia", code: "COL", played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 2, gd: 3, points: 6 },
        { team: "Japan", code: "JPN", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
        { team: "Senegal", code: "SEN", played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, points: 4 },
        { team: "Poland", code: "POL", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 5, gd: -3, points: 3 }
      ]
    },
    matches: [
      // Group A
      { id: "2018-g-a-1", stage: "Group", group: "A", date: "2018-06-14", venue: "Moscow", homeTeam: "Russia", awayTeam: "Saudi Arabia", homeCode: "RUS", awayCode: "KSA", homeScore: 5, awayScore: 0 },
      { id: "2018-g-a-2", stage: "Group", group: "A", date: "2018-06-15", venue: "Yekaterinburg", homeTeam: "Egypt", awayTeam: "Uruguay", homeCode: "EGY", awayCode: "URU", homeScore: 0, awayScore: 1 },
      { id: "2018-g-a-3", stage: "Group", group: "A", date: "2018-06-19", venue: "Saint Petersburg", homeTeam: "Russia", awayTeam: "Egypt", homeCode: "RUS", awayCode: "EGY", homeScore: 3, awayScore: 0 },
      { id: "2018-g-a-4", stage: "Group", group: "A", date: "2018-06-20", venue: "Rostov-on-Don", homeTeam: "Uruguay", awayTeam: "Saudi Arabia", homeCode: "URU", awayCode: "KSA", homeScore: 1, awayScore: 0 },
      { id: "2018-g-a-5", stage: "Group", group: "A", date: "2018-06-25", venue: "Samara", homeTeam: "Uruguay", awayTeam: "Russia", homeCode: "URU", awayCode: "RUS", homeScore: 3, awayScore: 0 },
      { id: "2018-g-a-6", stage: "Group", group: "A", date: "2018-06-25", venue: "Volgograd", homeTeam: "Saudi Arabia", awayTeam: "Egypt", homeCode: "KSA", awayCode: "EGY", homeScore: 2, awayScore: 1 },
      // Group B
      { id: "2018-g-b-1", stage: "Group", group: "B", date: "2018-06-15", venue: "Sochi", homeTeam: "Morocco", awayTeam: "Iran", homeCode: "MAR", awayCode: "IRN", homeScore: 0, awayScore: 1 },
      { id: "2018-g-b-2", stage: "Group", group: "B", date: "2018-06-15", venue: "Sochi", homeTeam: "Portugal", awayTeam: "Spain", homeCode: "POR", awayCode: "ESP", homeScore: 3, awayScore: 3 },
      { id: "2018-g-b-3", stage: "Group", group: "B", date: "2018-06-20", venue: "Moscow", homeTeam: "Portugal", awayTeam: "Morocco", homeCode: "POR", awayCode: "MAR", homeScore: 1, awayScore: 0 },
      { id: "2018-g-b-4", stage: "Group", group: "B", date: "2018-06-20", venue: "Kazan", homeTeam: "Iran", awayTeam: "Spain", homeCode: "IRN", awayCode: "ESP", homeScore: 0, awayScore: 1 },
      { id: "2018-g-b-5", stage: "Group", group: "B", date: "2018-06-25", venue: "Saransk", homeTeam: "Iran", awayTeam: "Portugal", homeCode: "IRN", awayCode: "POR", homeScore: 1, awayScore: 1 },
      { id: "2018-g-b-6", stage: "Group", group: "B", date: "2018-06-25", venue: "Kaliningrad", homeTeam: "Spain", awayTeam: "Morocco", homeCode: "ESP", awayCode: "MAR", homeScore: 2, awayScore: 2 },
      // Group C
      { id: "2018-g-c-1", stage: "Group", group: "C", date: "2018-06-16", venue: "Kazan", homeTeam: "France", awayTeam: "Australia", homeCode: "FRA", awayCode: "AUS", homeScore: 2, awayScore: 1 },
      { id: "2018-g-c-2", stage: "Group", group: "C", date: "2018-06-16", venue: "Saransk", homeTeam: "Peru", awayTeam: "Denmark", homeCode: "PER", awayCode: "DEN", homeScore: 0, awayScore: 1 },
      { id: "2018-g-c-3", stage: "Group", group: "C", date: "2018-06-21", venue: "Yekaterinburg", homeTeam: "Denmark", awayTeam: "Australia", homeCode: "DEN", awayCode: "AUS", homeScore: 1, awayScore: 1 },
      { id: "2018-g-c-4", stage: "Group", group: "C", date: "2018-06-21", venue: "Yekaterinburg", homeTeam: "France", awayTeam: "Peru", homeCode: "FRA", awayCode: "PER", homeScore: 1, awayScore: 0 },
      { id: "2018-g-c-5", stage: "Group", group: "C", date: "2018-06-26", venue: "Moscow", homeTeam: "Denmark", awayTeam: "France", homeCode: "DEN", awayCode: "FRA", homeScore: 0, awayScore: 0 },
      { id: "2018-g-c-6", stage: "Group", group: "C", date: "2018-06-26", venue: "Sochi", homeTeam: "Australia", awayTeam: "Peru", homeCode: "AUS", awayCode: "PER", homeScore: 0, awayScore: 2 },
      // Group D
      { id: "2018-g-d-1", stage: "Group", group: "D", date: "2018-06-16", venue: "Moscow", homeTeam: "Argentina", awayTeam: "Iceland", homeCode: "ARG", awayCode: "ISL", homeScore: 1, awayScore: 1 },
      { id: "2018-g-d-2", stage: "Group", group: "D", date: "2018-06-16", venue: "Volgograd", homeTeam: "Croatia", awayTeam: "Nigeria", homeCode: "CRO", awayCode: "NGA", homeScore: 2, awayScore: 0 },
      { id: "2018-g-d-3", stage: "Group", group: "D", date: "2018-06-21", venue: "Nizhny Novgorod", homeTeam: "Argentina", awayTeam: "Croatia", homeCode: "ARG", awayCode: "CRO", homeScore: 0, awayScore: 3 },
      { id: "2018-g-d-4", stage: "Group", group: "D", date: "2018-06-22", venue: "Volgograd", homeTeam: "Nigeria", awayTeam: "Iceland", homeCode: "NGA", awayCode: "ISL", homeScore: 2, awayScore: 0 },
      { id: "2018-g-d-5", stage: "Group", group: "D", date: "2018-06-26", venue: "Rostov-on-Don", homeTeam: "Iceland", awayTeam: "Croatia", homeCode: "ISL", awayCode: "CRO", homeScore: 1, awayScore: 2 },
      { id: "2018-g-d-6", stage: "Group", group: "D", date: "2018-06-26", venue: "Saint Petersburg", homeTeam: "Nigeria", awayTeam: "Argentina", homeCode: "NGA", awayCode: "ARG", homeScore: 1, awayScore: 2 },
      // Group E
      { id: "2018-g-e-1", stage: "Group", group: "E", date: "2018-06-17", venue: "Samara", homeTeam: "Costa Rica", awayTeam: "Serbia", homeCode: "CRC", awayCode: "SRB", homeScore: 0, awayScore: 1 },
      { id: "2018-g-e-2", stage: "Group", group: "E", date: "2018-06-17", venue: "Rostov-on-Don", homeTeam: "Brazil", awayTeam: "Switzerland", homeCode: "BRA", awayCode: "SUI", homeScore: 1, awayScore: 1 },
      { id: "2018-g-e-3", stage: "Group", group: "E", date: "2018-06-22", venue: "Saint Petersburg", homeTeam: "Brazil", awayTeam: "Costa Rica", homeCode: "BRA", awayCode: "CRC", homeScore: 2, awayScore: 0 },
      { id: "2018-g-e-4", stage: "Group", group: "E", date: "2018-06-22", venue: "Kaliningrad", homeTeam: "Serbia", awayTeam: "Switzerland", homeCode: "SRB", awayCode: "SUI", homeScore: 1, awayScore: 2 },
      { id: "2018-g-e-5", stage: "Group", group: "E", date: "2018-06-27", venue: "Moscow", homeTeam: "Serbia", awayTeam: "Brazil", homeCode: "SRB", awayCode: "BRA", homeScore: 0, awayScore: 2 },
      { id: "2018-g-e-6", stage: "Group", group: "E", date: "2018-06-27", venue: "Nizhny Novgorod", homeTeam: "Switzerland", awayTeam: "Costa Rica", homeCode: "SUI", awayCode: "CRC", homeScore: 2, awayScore: 2 },
      // Group F
      { id: "2018-g-f-1", stage: "Group", group: "F", date: "2018-06-17", venue: "Moscow", homeTeam: "Germany", awayTeam: "Mexico", homeCode: "GER", awayCode: "MEX", homeScore: 0, awayScore: 1 },
      { id: "2018-g-f-2", stage: "Group", group: "F", date: "2018-06-18", venue: "Yekaterinburg", homeTeam: "Sweden", awayTeam: "South Korea", homeCode: "SWE", awayCode: "KOR", homeScore: 1, awayScore: 0 },
      { id: "2018-g-f-3", stage: "Group", group: "F", date: "2018-06-23", venue: "Sochi", homeTeam: "South Korea", awayTeam: "Mexico", homeCode: "KOR", awayCode: "MEX", homeScore: 1, awayScore: 2 },
      { id: "2018-g-f-4", stage: "Group", group: "F", date: "2018-06-23", venue: "Sochi", homeTeam: "Germany", awayTeam: "Sweden", homeCode: "GER", awayCode: "SWE", homeScore: 2, awayScore: 1 },
      { id: "2018-g-f-5", stage: "Group", group: "F", date: "2018-06-27", venue: "Kazan", homeTeam: "South Korea", awayTeam: "Germany", homeCode: "KOR", awayCode: "GER", homeScore: 2, awayScore: 0 },
      { id: "2018-g-f-6", stage: "Group", group: "F", date: "2018-06-27", venue: "Yekaterinburg", homeTeam: "Mexico", awayTeam: "Sweden", homeCode: "MEX", awayCode: "SWE", homeScore: 0, awayScore: 3 },
      // Group G
      { id: "2018-g-g-1", stage: "Group", group: "G", date: "2018-06-18", venue: "Sochi", homeTeam: "Belgium", awayTeam: "Panama", homeCode: "BEL", awayCode: "PAN", homeScore: 3, awayScore: 0 },
      { id: "2018-g-g-2", stage: "Group", group: "G", date: "2018-06-18", venue: "Volgograd", homeTeam: "Tunisia", awayTeam: "England", homeCode: "TUN", awayCode: "ENG", homeScore: 1, awayScore: 2 },
      { id: "2018-g-g-3", stage: "Group", group: "G", date: "2018-06-23", venue: "Moscow", homeTeam: "Belgium", awayTeam: "Tunisia", homeCode: "BEL", awayCode: "TUN", homeScore: 5, awayScore: 2 },
      { id: "2018-g-g-4", stage: "Group", group: "G", date: "2018-06-24", venue: "Nizhny Novgorod", homeTeam: "England", awayTeam: "Panama", homeCode: "ENG", awayCode: "PAN", homeScore: 6, awayScore: 1 },
      { id: "2018-g-g-5", stage: "Group", group: "G", date: "2018-06-28", venue: "Kaliningrad", homeTeam: "England", awayTeam: "Belgium", homeCode: "ENG", awayCode: "BEL", homeScore: 0, awayScore: 1 },
      { id: "2018-g-g-6", stage: "Group", group: "G", date: "2018-06-28", venue: "Saransk", homeTeam: "Panama", awayTeam: "Tunisia", homeCode: "PAN", awayCode: "TUN", homeScore: 1, awayScore: 2 },
      // Group H
      { id: "2018-g-h-1", stage: "Group", group: "H", date: "2018-06-19", venue: "Saransk", homeTeam: "Colombia", awayTeam: "Japan", homeCode: "COL", awayCode: "JPN", homeScore: 1, awayScore: 2 },
      { id: "2018-g-h-2", stage: "Group", group: "H", date: "2018-06-19", venue: "Volgograd", homeTeam: "Poland", awayTeam: "Senegal", homeCode: "POL", awayCode: "SEN", homeScore: 1, awayScore: 2 },
      { id: "2018-g-h-3", stage: "Group", group: "H", date: "2018-06-24", venue: "Kazan", homeTeam: "Japan", awayTeam: "Senegal", homeCode: "JPN", awayCode: "SEN", homeScore: 2, awayScore: 2 },
      { id: "2018-g-h-4", stage: "Group", group: "H", date: "2018-06-24", venue: "Kazan", homeTeam: "Poland", awayTeam: "Colombia", homeCode: "POL", awayCode: "COL", homeScore: 0, awayScore: 3 },
      { id: "2018-g-h-5", stage: "Group", group: "H", date: "2018-06-28", venue: "Rostov-on-Don", homeTeam: "Japan", awayTeam: "Poland", homeCode: "JPN", awayCode: "POL", homeScore: 0, awayScore: 1 },
      { id: "2018-g-h-6", stage: "Group", group: "H", date: "2018-06-28", venue: "Samara", homeTeam: "Senegal", awayTeam: "Colombia", homeCode: "SEN", awayCode: "COL", homeScore: 0, awayScore: 1 },
      // Knockout
      { id: "2018-r16-1", stage: "Round of 16", date: "2018-06-30", homeTeam: "France", awayTeam: "Argentina", homeCode: "FRA", awayCode: "ARG", homeScore: 4, awayScore: 3 },
      { id: "2018-r16-2", stage: "Round of 16", date: "2018-06-30", homeTeam: "Uruguay", awayTeam: "Portugal", homeCode: "URU", awayCode: "POR", homeScore: 2, awayScore: 1 },
      { id: "2018-r16-3", stage: "Round of 16", date: "2018-07-01", homeTeam: "Spain", awayTeam: "Russia", homeCode: "ESP", awayCode: "RUS", homeScore: 1, awayScore: 1, pens: "3-4" },
      { id: "2018-r16-4", stage: "Round of 16", date: "2018-07-01", homeTeam: "Croatia", awayTeam: "Denmark", homeCode: "CRO", awayCode: "DEN", homeScore: 1, awayScore: 1, pens: "3-2" },
      { id: "2018-r16-5", stage: "Round of 16", date: "2018-07-02", homeTeam: "Brazil", awayTeam: "Mexico", homeCode: "BRA", awayCode: "MEX", homeScore: 2, awayScore: 0 },
      { id: "2018-r16-6", stage: "Round of 16", date: "2018-07-02", homeTeam: "Belgium", awayTeam: "Japan", homeCode: "BEL", awayCode: "JPN", homeScore: 3, awayScore: 2 },
      { id: "2018-r16-7", stage: "Round of 16", date: "2018-07-03", homeTeam: "Sweden", awayTeam: "Switzerland", homeCode: "SWE", awayCode: "SUI", homeScore: 1, awayScore: 0 },
      { id: "2018-r16-8", stage: "Round of 16", date: "2018-07-03", homeTeam: "Colombia", awayTeam: "England", homeCode: "COL", awayCode: "ENG", homeScore: 1, awayScore: 1, pens: "3-4" },
      { id: "2018-qf-1", stage: "Quarter-final", date: "2018-07-06", homeTeam: "Uruguay", awayTeam: "France", homeCode: "URU", awayCode: "FRA", homeScore: 0, awayScore: 2 },
      { id: "2018-qf-2", stage: "Quarter-final", date: "2018-07-06", homeTeam: "Brazil", awayTeam: "Belgium", homeCode: "BRA", awayCode: "BEL", homeScore: 1, awayScore: 2 },
      { id: "2018-qf-3", stage: "Quarter-final", date: "2018-07-07", homeTeam: "Sweden", awayTeam: "England", homeCode: "SWE", awayCode: "ENG", homeScore: 0, awayScore: 2 },
      { id: "2018-qf-4", stage: "Quarter-final", date: "2018-07-07", homeTeam: "Russia", awayTeam: "Croatia", homeCode: "RUS", awayCode: "CRO", homeScore: 2, awayScore: 2, pens: "3-4" },
      { id: "2018-sf-1", stage: "Semi-final", date: "2018-07-10", homeTeam: "France", awayTeam: "Belgium", homeCode: "FRA", awayCode: "BEL", homeScore: 1, awayScore: 0 },
      { id: "2018-sf-2", stage: "Semi-final", date: "2018-07-11", homeTeam: "Croatia", awayTeam: "England", homeCode: "CRO", awayCode: "ENG", homeScore: 2, awayScore: 1 },
      { id: "2018-3rd", stage: "Third place", date: "2018-07-14", homeTeam: "Belgium", awayTeam: "England", homeCode: "BEL", awayCode: "ENG", homeScore: 2, awayScore: 0 },
      { id: "2018-final", stage: "Final", date: "2018-07-15", homeTeam: "France", awayTeam: "Croatia", homeCode: "FRA", awayCode: "CRO", homeScore: 4, awayScore: 2 }
    ],
    bracket: [
      { round: "Round of 16", matches: ["2018-r16-1", "2018-r16-2", "2018-r16-3", "2018-r16-4", "2018-r16-5", "2018-r16-6", "2018-r16-7", "2018-r16-8"] },
      { round: "Quarter-final", matches: ["2018-qf-1", "2018-qf-2", "2018-qf-3", "2018-qf-4"] },
      { round: "Semi-final", matches: ["2018-sf-1", "2018-sf-2"] },
      { round: "Final", matches: ["2018-final"] }
    ]
  },
  wc2014,
  wc2010,
  wc2006,
  wc2002,
  wc1998,
  wc1994,
  wc1990,
  wc1986,
  wc1982,
  wc1978,
  wc1974,
  wc1970,
  wc1966,
  wc1962,
  wc1958,
  wc1954,
  wc1950,
  wc1938,
  wc1934,
  wc1930,
];
