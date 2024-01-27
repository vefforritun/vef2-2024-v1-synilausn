/**
 * Generate HTML for a page.
 * @param {string} title Title of the page.
 * @param {string} body HTML body of the page.
 * @returns Full HTML body for the page.
 */
export function template(title, body) {
  return /* HTML */ `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="styles.css" />
        <title>${title}</title>
      </head>
      <body>
        <main>${body}</main>
      </body>
    </html>`;
}

/**
 * Generate HTML for index.
 * @returns {string} HTML for index.
 */
export function indexTemplate() {
  const body = /* HTML */ `
    <h1>Boltadeildin</h1>
    <p>
      Velkomin í Boltadeildina! Hér er hægt að nálgast seinustu leiki og stöðuna
      í deildinni.
    </p>
    <ul>
      <li><a href="leikir.html">Leikir</a></li>
      <li><a href="stada.html">Staðan</a></li>
    </ul>
  `;

  return template('Boltadeildin', body);
}

/**
 * Format date using `is` locale.
 * @param {Date} date Date to format.
 * @returns Date formatted for `is` locale.
 */
export function formatDateIs(date) {
  // format using intl
  const formatter = new Intl.DateTimeFormat('is', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  return formatter.format(date);
}

/**
 * Generate HTML for games.
 * @param {Array<import('./parse').Gameday>} gamedays
 * @returns {string} HTML for games.
 */
export function gamesTemplate(gamedays) {
  const gameMapper = (/** @type import('./parse').Game */ g) => /* HTML */ `
    <li>${g.home.name} ${g.home.score} — ${g.away.score} ${g.away.name}</li>
  `;
  const games = gamedays.map(
    (gameday) => /* HTML */ `
      <section>
        <h2>${formatDateIs(gameday.date)}</h2>
        <ul>
          ${gameday.games.map(gameMapper).join('')}
        </ul>
      </section>
    `,
  );
  const body = /* HTML */ `
    <h1>Leikir</h1>
    ${games.join('')}
    <p><a href="index.html">Til baka á forsíðu</a>.</p>
  `;
  return template('Boltadeildin—leikir', body);
}

/**
 * Generate HTML for standings.
 * @param {Array<import('./score').TeamStanding>} standings
 * @returns {string} HTML for standings.
 */
export function standingsTemplate(standings) {
  const body = /* HTML */ `
    <section>
      <h1>Boltadeildin—staðan</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Lið</th>
            <th>Stig</th>
          </tr>
        </thead>
        <tbody>
          ${standings
            .map(
              (standing, i) => /* HTML */ `
                <tr>
                  <td>${i + 1}</td>
                  <td>${standing.name}</td>
                  <td>${standing.points}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </section>
    <p><a href="index.html">Til baka á forsíðu</a>.</p>
  `;
  return template('Boltadeildin—staðan', body);
}
