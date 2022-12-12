#! /usr/bin/env node

const https = require('https');
const { exec } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');

const [, , ...args] = process.argv;

const sh = (command) =>
   new Promise((resolve, reject) => exec(command, (error, stdout) => (!!error ? reject(error) : resolve(stdout))));

const shStyles = {
   yellow: '\x1b[33m',
   green: '\x1b[32m',
   blue: '\x1b[34m',
   dim: '\x1b[2m',
   reset: '\x1b[0m',
   bold: '\x1b[1m',
};

const getAllVersions = async (dependency) => {
   const versions = [];
   const registry = await new Promise((resolve, reject) => {
      let data = '';

      https
         .get(`https://registry.npmjs.org/${dependency?.trim()?.toLowerCase()}`, (resp) => {
            resp.on('data', (chunk) => (data += chunk));
            resp.on('end', () => resolve(JSON.parse(data)));
         })
         .on('error', (err) => reject(err.message));
   });

   for (const version in registry.versions) versions.push(version);

   return versions;
};

const getLatestPatch = async (dependency, currentVersion) => {
   const [major, minor] = currentVersion.split('.');
   const versions = await getAllVersions(dependency);
   const regex = new RegExp(`^${major}\\.${minor}`);

   let latestPatch = '';

   versions.forEach((version) => regex.test(version) && (latestPatch = version));

   return latestPatch || currentVersion;
};

const getLatestMinor = async (dependency, currentVersion) => {
   const [major] = currentVersion.split('.');
   const versions = await getAllVersions(dependency);
   const regex = new RegExp(`^${major}\\.`);

   let latestMinor = '';

   versions.forEach((version) => regex.test(version) && !/-/.test(version) && (latestMinor = version));

   return latestMinor || currentVersion;
};

const getLatestMajor = async (packageName) =>
   (await sh(`npm view ${packageName?.trim()?.toLowerCase()} version`))?.trim();

const updatePackages = async () => {
   const path = `${process.cwd()}/package.json`;
   const packageFile = readFileSync(path, 'utf-8');
   const packageJSON = JSON.parse(packageFile);
   const { dependencies, devDependencies } = packageJSON;
   const hasUpdate = [];

   const options = {
      major: getLatestMajor,
      minor: getLatestMinor,
      patch: getLatestPatch,
      lock: true,
   };

   const option =
      args?.[0] && options?.[args?.[0]?.replace(/^--/, '')] ? args?.[0]?.replace(/^--/, '') : 'major' || 'major';

   const compareVersions = async (dependency) => {
      const dependencyType = dependencies?.[dependency] ? dependencies : devDependencies;
      const currentVersion = dependencyType[dependency].replace(/[^a-z0-9.-]/gi, '');

      if (option === 'lock') {
         dependencyType[dependency] = currentVersion;
         return;
      }

      if (/-/g.test(currentVersion)) {
         console.log(
            `${shStyles.bold}${dependency}${shStyles.dim}:${shStyles.reset} \t${shStyles.dim}Ignoring tag version (${shStyles.yellow}${currentVersion}${shStyles.reset}${shStyles.dim})${shStyles.reset}`
         );
         return;
      }

      const latestVersion = await options[option](dependency, currentVersion);

      if (currentVersion !== latestVersion) {
         dependencyType[dependency] = `^${latestVersion}`;

         hasUpdate.push(dependency);
         console.log(
            `${shStyles.bold}${dependency}${shStyles.dim}:${shStyles.reset} \t${shStyles.reset}${shStyles.yellow}${currentVersion}${shStyles.reset} \t${shStyles.dim}➜${shStyles.reset}   ${shStyles.green}${latestVersion}${shStyles.reset}`
         );
      }
   };

   console.log(`\n🤹 Looking for new ${shStyles.bold}${option}${shStyles.reset} versions...\n`);

   for (const dependency in dependencies) await compareVersions(dependency);
   for (const dependency in devDependencies) await compareVersions(dependency);

   writeFileSync(path, `${JSON.stringify(packageJSON, null, 3)}${EOL}`);

   console.log(
      hasUpdate.length > 0
         ? `\nRun ${shStyles.bold}${shStyles.blue}npm i${shStyles.reset} to install new versions 🚀\n`
         : `\nNothing to be updated ✅\n`
   );
};

(async () => await updatePackages())();
