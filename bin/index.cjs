#! /usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');
const { log, styles: sh, showUpdated } = require('../src/personalize-console.cjs');
const getVersionBy = require('../src/get-versions.cjs');

(async () => {
   const [, , ...args] = process.argv;
   const path = `${process.cwd()}/package.json`;
   const packageFile = readFileSync(path, 'utf-8');
   const packageJSON = JSON.parse(packageFile);
   const { dependencies, devDependencies } = packageJSON;
   const hasUpdate = [];
   const hasError = [];

   const option =
      args?.[0] && getVersionBy?.[args?.[0]?.replace(/^--/, '')] ? args?.[0]?.replace(/^--/, '') : 'latest' || 'latest';

   const compareVersions = async (dependency) => {
      const dependencyType = dependencies?.[dependency] ? dependencies : devDependencies;
      const currentVersion = dependencyType[dependency];
      const operators = currentVersion.replace(/[^^><=~]+/g, '');

      if (option === 'lock') {
         dependencyType[dependency] = currentVersion.replace(/[^a-z0-9.-]/gi, '');
         return;
      }

      if (/-/g.test(currentVersion)) {
         log(
            `${sh.bold}${dependency}${sh.dim}:${sh.reset} \t${sh.dim}Ignoring tag version (${sh.yellow}${currentVersion}${sh.reset}${sh.dim})${sh.reset}`
         );
         return;
      }

      const latestVersion = await getVersionBy[option](dependency, currentVersion);

      if (!latestVersion) {
         hasError.push(latestVersion);
         return;
      }

      const newVersion = `${operators}${latestVersion}`;

      if (currentVersion !== newVersion) {
         dependencyType[dependency] = newVersion;

         hasUpdate.push({
            packageName: dependency,
            previousVersion: currentVersion,
            newVersion: newVersion,
         });
      }
   };

   log(`\n📦 Looking for ${sh.bold}${option}${sh.reset} versions...\n`);

   for (const dependency in dependencies) await compareVersions(dependency);
   for (const dependency in devDependencies) await compareVersions(dependency);

   writeFileSync(path, `${JSON.stringify(packageJSON, null, 3)}${EOL}`);

   hasError.length > 0 && hasUpdate.length > 0 && log();
   hasUpdate.length > 0 ? showUpdated(hasUpdate) : log(`\nNothing to be updated ✅\n`);

   process.exit(hasError.length > 0 ? 1 : 0);
})();
