import { describe, expect, it } from '@jest/globals';
import {
  gamesTemplate,
  indexTemplate,
  standingsTemplate,
  template,
} from './html.js';

describe('html', () => {
  it('should return template with given title and body', () => {
    const body = /* HTML */ ` <div>
      <p>body</p>
    </div>`;
    const result = template('title', body);

    expect(result).toContain('<title>title</title>');
    expect(result).toContain(body);
  });

  it('should return an index template', () => {
    const result = indexTemplate();

    expect(result).toContain('<title>Boltadeildin</title>');
    expect(result).toContain('<li><a href="leikir.html">Leikir</a></li>');
  });

  it('should return a games template', () => {
    const gamedays = [
      {
        date: new Date('2024-01-01T15:20:00.000Z'),
        games: [
          {
            home: {
              name: 'a',
              score: 1,
            },
            away: {
              name: 'b',
              score: 2,
            },
          },
        ],
      },
    ];
    const result = gamesTemplate(gamedays);

    expect(result).toContain('<title>Boltadeildin—leikir</title>');
    expect(result).toContain('<h1>Leikir</h1>');
    expect(result).toContain('<h2>mánudagur, 1. janúar 2024 kl. 15:20</h2>');
    expect(result).toContain('a 1 — 2 b');
  });

  it('should return a standings template', () => {
    /** @type Array<import('./score.js').TeamStanding> */
    const standings = [
      {
        name: 'a',
        points: 1,
      },
    ];
    const result = standingsTemplate(standings);

    expect(result).toContain('<title>Boltadeildin—staðan</title>');
    expect(result).toContain('<h1>Boltadeildin—staðan</h1>');
    expect(result).toContain('<th>#</th>');
    expect(result).toContain('<th>Lið</th>');
    expect(result).toContain('<th>Stig</th>');
    expect(result).toContain('<td>1</td>');
    expect(result).toContain('<td>a</td>');
    expect(result).toContain('<td>1</td>');
  });
});
