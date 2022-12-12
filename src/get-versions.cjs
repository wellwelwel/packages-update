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

const getLatestMajor = async (packageName) =>
   JSON.parse(await cmd(`npm view ${packageName?.trim()?.toLowerCase()} version --json`));

module.exports = {
   major: getLatestMajor,
   minor: getLatestMinor,
   patch: getLatestPatch,
   lock: true,
};
