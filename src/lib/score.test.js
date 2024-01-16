import { describe, expect, it } from '@jest/globals';
import { calculateStandings } from './score';

describe('score', () => {
  describe.only('calculateStandings', () => {
    it('should return empty array if no data', () => {
      const result = calculateStandings([]);

      expect(result).toEqual([]);
    });

    it('should return standing for multiple games', () => {
      const result = calculateStandings([
        {
          home: { name: 'a', score: 2 },
          away: { name: 'b', score: 1 },
        },
        {
          home: { name: 'a', score: 1 },
          away: { name: 'c', score: 1 },
        },
        {
          home: { name: 'c', score: 1 },
          away: { name: 'b', score: 2 },
        },
      ]);

      expect(result).toEqual([
        {
          name: 'a',
          points: 4,
        },
        {
          name: 'b',
          points: 3,
        },
        {
          name: 'c',
          points: 1,
        },
      ]);
    });
  });
});
