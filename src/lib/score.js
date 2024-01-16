/**
 * @typedef {Object} TeamStanding
 * @property {string} name Name of team.
 * @property {number} points Number of points.
 */

const POINTS_WIN = 3;
const POINTS_DRAW = 1;
const POINTS_LOSS = 0;

/**
 * Create an empty standing for a team.
 * @param {string} name Name of team to create standing for.
 * @returns Team standing.
 */
function setStanding(name) {
  return {
    name,
    points: 0,
  };
}

/**
 * Calculate team standings from games.
 * @param {Array<import('./parse').Game>} games
 * @returns {Array<TeamStanding>} Ordered array of team standings.
 */
export function calculateStandings(games) {
  if (games.length === 0) {
    return [];
  }

  const standings = {};

  for (const game of games) {
    const {
      home: { name: homeName, score: homeScore },
      away: { name: awayName, score: awayScore },
    } = game;

    if (!standings[homeName]) {
      standings[homeName] = setStanding(homeName);
    }

    if (!standings[awayName]) {
      standings[awayName] = setStanding(awayName);
    }

    if (homeScore > awayScore) {
      standings[homeName].points += POINTS_WIN;
      standings[awayName].points += POINTS_LOSS;
    } else if (homeScore < awayScore) {
      standings[homeName].points += POINTS_LOSS;
      standings[awayName].points += POINTS_WIN;
    } else {
      standings[homeName].points += POINTS_DRAW;
      standings[awayName].points += POINTS_DRAW;
    }
  }

  const sorted = Object.values(standings).sort((a, b) => b.points - a.points);

  return sorted;
}
