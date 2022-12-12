const cmd = require('../src/cmd.cjs');

const getAllVersions = async (packageName) =>
   JSON.parse(await cmd(`npm view ${packageName?.trim()?.toLowerCase()} versions --json`));

const getLatestPatch = async (packageName, currentVersion) => {
   const [major, minor] = currentVersion.split('.');
   const versions = await getAllVersions(packageName);
   const regex = new RegExp(`^${major}\\.${minor}`);

   let latestPatch = '';

   versions.forEach((version) => regex.test(version) && (latestPatch = version));

   return latestPatch || currentVersion;
};

const getLatestMinor = async (packageName, currentVersion) => {
   const [major] = currentVersion.split('.');
   const versions = await getAllVersions(packageName);
   const regex = new RegExp(`^${major}\\.`);

   let latestMinor = '';

   versions.forEach((version) => regex.test(version) && !/-/.test(version) && (latestMinor = version));

   return latestMinor || currentVersion;
};

const getLatestMajor = async (packageName, currentVersion) => {
   const versions = await getAllVersions(packageName);

   let latestMajor = '';

   versions.forEach((version) => !/-/.test(version) && (latestMajor = version));

   return latestMajor || currentVersion;
};

const getLatestVersion = async (packageName) =>
   JSON.parse(await cmd(`npm view ${packageName?.trim()?.toLowerCase()} version --json`));

module.exports = {
   latest: getLatestVersion,
   major: getLatestMajor,
   minor: getLatestMinor,
   patch: getLatestPatch,
   lock: true,
};
