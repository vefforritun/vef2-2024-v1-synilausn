import { writeFile } from 'fs/promises';
import { join } from 'path';
import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir,
} from './lib/file.js';
import { indexTemplate } from './lib/html.js';
import { parseGamedayFile, parseTeamsJson } from './lib/parse.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  console.info('starting to generate');
  // Búum til möppuna sem geymir unnin gögn ef ekki til
  await createDirIfNotExists(OUTPUT_DIR);

  // Sækjum heiti á liðum, ef gögnin eru spillt mun þetta
  // kasta villu og hætta keyrslu
  const teamsFileData = await readFile(join(INPUT_DIR, 'teams.json'));
  const teams = parseTeamsJson(teamsFileData);
  console.info('team names read, total', teams.length);

  // Finnum allar skrár sem byrja á `gameday-` í `INPUT_DIR`
  const files = await readFilesFromDir(INPUT_DIR);

  const gamedayFiles = files.filter((file) => file.indexOf('gameday-') > 0);
  console.info('gameday files found', gamedayFiles.length);

  const gamedays = [];
  console.info('starting to parse gameday files');
  for await (const gamedayFile of gamedayFiles) {
    const file = await readFile(gamedayFile, {
      encoding: 'utf8',
    });

    try {
      gamedays.push(parseGamedayFile(file, teams));
    } catch (e) {
      console.error(`unable to parse ${gamedayFile}`);
    }
  }
  console.info('gameday files parsed', gamedays.length);

  await writeFile(join(OUTPUT_DIR, 'index.html'), indexTemplate(), {
    flag: 'w+',
  });
}

main().catch((error) => {
  console.error('error generating', error);
});
