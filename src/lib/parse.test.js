import { describe, expect, it } from '@jest/globals';
import {
  parseGamedayFile,
  parseGamedayGames,
  parseTeam,
  parseTeamsJson,
} from './parse.js';

describe('parse', () => {
  describe('parseTeamsJson', () => {
    it('should return empty array if no data', () => {
      const result = parseTeamsJson('[]');

      expect(result).toEqual([]);
    });

    it('should throw if invalid JSON', () => {
      expect(() => {
        parseTeamsJson('asdf');
      }).toThrow();
    });

    it('should throw if data is not an array', () => {
      expect(() => {
        parseTeamsJson('{}');
      }).toThrow();
    });

    it('should parse valid JSON', () => {
      const result = parseTeamsJson('["asdf"]');

      expect(result).toEqual(['asdf']);
    });

    it('should parse and only return strings', () => {
      const result = parseTeamsJson('[1, "asdf", true, {}]');

      expect(result).toEqual(['asdf']);
    });
  });

  describe('parseTeam', () => {
    it('should throw if data is not an object', () => {
      expect(() => {
        parseTeam('');
      }).toThrow('team data is not an object');
    });

    it('should throw if data does not have name', () => {
      expect(() => {
        parseTeam({ score: 0 });
      }).toThrow();
    });

    it('should throw if data does not have score', () => {
      expect(() => {
        parseTeam({ name: 'asdf' });
      }).toThrow();
    });

    it('should throw if data name is not a string', () => {
      expect(() => {
        parseTeam({ name: 1, score: 0 });
      }).toThrow();
    });

    it('should throw if data score is not a number', () => {
      expect(() => {
        parseTeam({ name: 'asdf', score: '0' });
      }).toThrow();
    });

    it('should parse valid data', () => {
      const result = parseTeam({ name: 'asdf', score: 0 }, ['asdf']);

      expect(result).toEqual({ name: 'asdf', score: 0 });
    });

    it('should parse valid data with teams but skip if not allowed team name', () => {
      const result = parseTeam({ name: 'asdf', score: 0 }, ['foo']);

      expect(result).toEqual(null);
    });
  });

  describe('parseGamedayGames', () => {
    it('should throw if data is not an array of objects', () => {
      expect(() => {
        parseGamedayGames(['']);
      }).toThrow();
    });

    it('should throw if data is missing home or away', () => {
      expect(() => {
        parseGamedayGames([{ home: {} }]);
      }).toThrow('game data does not have home and away');
    });

    it('should throw if data is not an array of objects with home and away', () => {
      expect(() => {
        parseGamedayGames([{ home: {}, away: {} }]);
      }).toThrow();
    });

    it('should not return a game if home or away is not valid', () => {
      const result = parseGamedayGames(
        [{ home: { name: 'foo', score: 0 }, away: { name: 'bar', score: 0 } }],
        ['asdf'],
      );

      expect(result).toEqual([]);
    });

    it('should parse valid data', () => {
      const result = parseGamedayGames(
        [{ home: { name: 'foo', score: 0 }, away: { name: 'bar', score: 0 } }],
        ['foo', 'bar'],
      );

      expect(result).toEqual([
        { home: { name: 'foo', score: 0 }, away: { name: 'bar', score: 0 } },
      ]);
    });
  });

  describe('parseGamedayFile', () => {
    it('should throw if data is not an object', () => {
      expect(() => {
        parseGamedayFile('');
      }).toThrow('unable to parse gameday data');
    });

    it('should throw if data is not an object', () => {
      expect(() => {
        parseGamedayFile('1');
      }).toThrow('gameday data is not an object');
    });

    it('should throw if data is missing date', () => {
      expect(() => {
        parseGamedayFile('{}');
      }).toThrow('gameday data does not have date');
    });

    it('should throw if date is invalid', () => {
      expect(() => {
        parseGamedayFile('{ "date": "foo" }');
      }).toThrow('gameday data date is invalid');
    });

    it('should throw if games is not an array', () => {
      expect(() => {
        parseGamedayFile('{ "date": "2020-01-01", "games": {} }');
      }).toThrow('gameday data does not have games array');
    });

    it('should parse valid data', () => {
      const data = {
        date: new Date(),
        games: [
          {
            home: { name: 'foo', score: 0 },
            away: { name: 'bar', score: 0 },
          },
        ],
      };
      const result = parseGamedayFile(JSON.stringify(data), ['foo', 'bar']);

      expect(result).toStrictEqual(data);
    });
  });
});
