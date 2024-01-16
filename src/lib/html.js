function template(body) {
  return /* HTML */ `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="/styles.css" />
        <title>Boltadeildin</title>
      </head>
      <body>
        ${body}
      </body>
    </html>`;
}

export function indexTemplate() {
  const body = /* HTML */ `
    <h1>Boltadeildin</h1>
    <p>
      Velkomin í Boltadeildina! Hér er hægt að nálgast seinustu leiki og stöðuna
      í deildinni.
    </p>
    <ul>
      <li><a href="/leikir.html">Leikir</a></li>
      <li><a href="/stada.html">Staðan</a></li>
    </ul>
  `;

  return template(body);
}

/**
 *
 * @param {Array<import('./parse').Gameday>} gamedays
 */
export function gamesTemplate(gamedays) {
  const body = JSON.stringify(gamedays, null, 2);
  return template(body);
}
