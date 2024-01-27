const TEAMS = [
  'Boltaliðið',
  'Dripplararnir',
  'Skotföstu kempurnar',
  'Markaskorarnir',
  'Sigurliðið',
  'Risaeðlurnar',
  'Framherjarnir',
  'Fljótu fæturnir',
  'Vinningshópurinn',
  'Ósigrandi skotfólkið',
  'Óhemjurnar',
  'Hraðaliðið',
];

const GAMES_TO_GENERATE = 6;
const MATCH_DAYS_TO_GENERATE = 10;

/**
 * Generate a single game.
 * @param {Array<string>} teams
 * @returns {import("./lib/parse").Game}
 */
function generateGame(teams, minScore = 0, maxScore = 6) {
  const teamsCopy = Array.from(teams);

  const teamAIndex = Math.floor(Math.random() * teamsCopy.length);
  const teamA = teamsCopy[teamAIndex];
  // remove team A from copy so it can't be selected as team B
  teamsCopy.splice(teamAIndex, 1);

  const teamBIndex = Math.floor(Math.random() * teamsCopy.length);
  const teamB = teamsCopy[teamBIndex];

  return {
    home: {
      name: teamA,
      score: Math.floor(Math.random() * maxScore) + minScore,
    },
    away: {
      name: teamB,
      score: Math.floor(Math.random() * maxScore) + minScore,
    },
  };
}

/**
 * Generate a single match day.
 * @param {Array<string>} teams
 * @param {number} matchesToGenerate
 * @param {Date} date
 * @returns {import("./lib/parse").Gameday}
 */
function generateMatchDay(teams, matchesToGenerate, date) {
  const games = [];
  const teamsCopy = Array.from(teams);

  for (let i = 0; i < matchesToGenerate; i += 1) {
    const game = generateGame(teamsCopy);
    games.push(game);

    // remove teams from copy so they can't be selected again
    teamsCopy.splice(teamsCopy.indexOf(game.home.name), 1);
    teamsCopy.splice(teamsCopy.indexOf(game.away.name), 1);
  }

  return {
    date,
    games,
  };
}

const matchDays = [];
let lastDate = new Date();

for (let i = 0; i < MATCH_DAYS_TO_GENERATE; i += 1) {
  // add random number of days to last date
  const daysToAdd = Math.floor(Math.random() * 7) + 1;
  lastDate = new Date(lastDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  matchDays.push(generateMatchDay(TEAMS, GAMES_TO_GENERATE, lastDate));
}

console.info(JSON.stringify(matchDays));
