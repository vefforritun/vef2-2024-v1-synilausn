# Vefforritun 2 2024, verkefni 1, sýnilausn

Sjá lýsingu á verkefni í [readme-v1.md](readme-v1.md) eða [á GitHub](https://github.com/vefforritun/vef2-2024-v1).

## `package.json`

Uppsetning á `package.json` skrá:

- `name`, `version`, `description`, `author` og `license` eru sett upp sjálfkrafa við að keyra `npm init`.
- [`"type": "module"`](https://nodejs.org/api/packages.html#type) skilgreinir að við notum ECMAScript modules.
- [`main`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main) skilgreinir inngang í forritið sem `"main": "src/generate.js"`, en það í raun er ekki notað þar sem þetta er ekki pakki fyrir aðra til að nota.
- [`engines`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) skilgreinir að við notum `node` útgáfu 20.
- [`scripts`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#scripts) skilgreinir skipanir sem við getum keyrt með `npm run`, sjá nánar að neðan.
  - `test` keyrir prófanir.
  - `test:coverage` keyrir prófanir og birtir _code coverage_.
  - `lint` keyrir bæði `eslint` og `stylelint` með `concurrently`.
  - `lint:eslint` keyrir `eslint`.
  - `lint:stylelint` keyrir `stylelint`.
- [`devDependencies`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devdependencies) skilgreinir hvaða pakka við notum í þróun (_development_)

## Linting

`eslint` er uppsett og er hægt að keyra með `npm run lint`. Dæmi um úttak:

```bash

```

## Prófanir

`jest` er uppsett og er keyrt með `npm run test` (eða `npm test` sem er [sérstaklega skilgreind skipun í NPM](https://docs.npmjs.com/cli/v9/commands/npm-test)). Dæmi um úttak:

```bash
> npm run test

> vef2-2024-v1-synilausn@1.0.0 test
> cross-env NODE_OPTIONS='--experimental-vm-modules' jest ./*.test.js

(node:24980) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/lib/file.test.js
  file
    direxists
      ✓ returns false if dir does not exist (3 ms)
      ✓ returns true if dir does exist (1 ms)
      ✓ returns false if no input
    readFilesFromDir
      ✓ should return empty array for dir that does not exist (1 ms)
      ✓ should return array of known files for dir that does exist
    readFile
      ✓ should return null for file that does not exist
      ✓ should return content of known file that does exist (1 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.258 s, estimated 1 s
Ran all test suites matching /.\/*.test.js/i.
```

Þar sjáum við að öll test fyrir `./src/lib/file.js` eru keyrð og í lagi.

Til að athuga hvernig _code coverage_ er þá er hægt að keyra
`npm run test:coverage` eða `npm run test -- --coverage` (sem [nýtir `--` til að senda skipanir í forrit sem er keyrt](https://docs.npmjs.com/cli/v9/commands/npm-run-script)). Dæmi um úttak sem sýnir _code coverage_ fyrir `file.js` út frá prófum skilgreindum í `file.test.js`:

```bash
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   92.85 |       80 |      80 |   92.85 |
 file.js  |   92.85 |       80 |      80 |   92.85 | 23-24
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.262 s, estimated 1 s
Ran all test suites matching /.\/*.test.js/i.
```

Línur `23–24` eru ekki prófaðar þar sem þær munu búa til skrár, betra væri að nota _mock_ til að koma í veg fyrir að það gerist en er ekki gert hér.
