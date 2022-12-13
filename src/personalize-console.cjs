const log = console.log.bind(console);

const styles = {
   yellow: '\x1b[33m',
   green: '\x1b[32m',
   blue: '\x1b[34m',
   dim: '\x1b[2m',
   reset: '\x1b[0m',
   bold: '\x1b[1m',
};

const personalizeVersion = (fullVersion) => {
   const operators = fullVersion.replace(/[^^><=~\s]+/g, '');
   const version = fullVersion.replace(/[^a-z0-9.-]/gim, '');

   return [operators, version];
};

const showUpdated = (packages) => {
   const { bold, dim, reset, yellow, green, blue } = styles;

   const largestPackageName = packages.reduce(
      (acc, cur) => (acc?.length > cur?.packageName?.length ? acc : cur.packageName),
      ''
   );

   const largestPackagePreviousVersion = packages.reduce(
      (acc, cur) => (acc?.length > cur?.previousVersion?.length ? acc : cur.previousVersion),
      ''
   );

   const largestPackageNewVersion = packages.reduce(
      (acc, cur) => (acc?.length > cur?.newVersion?.length ? acc : cur.newVersion),
      ''
   );

   const formattedPackages = packages.map((currentPackage) => {
      return {
         packageName: currentPackage.packageName.padEnd(largestPackageName.length, ' '),
         previousVersion: currentPackage.previousVersion.padStart(largestPackagePreviousVersion.length, ' '),
         newVersion: currentPackage.newVersion.padStart(largestPackageNewVersion.length, ' '),
      };
   });

   formattedPackages.forEach((currentPackage) => {
      const { packageName, previousVersion: previousFullVersion, newVersion: newFullVersion } = currentPackage;
      const [previousOperator, previousVersion] = personalizeVersion(previousFullVersion);
      const [newOperator, newVersion] = personalizeVersion(newFullVersion);

      log(
         `${bold}${packageName}${reset}    ${reset}${yellow}${dim}${previousOperator}${reset}${yellow}${bold}${previousVersion}${reset}  ${dim}➜${reset}  ${green}${dim}${newOperator}${reset}${green}${bold}${newVersion}${reset}`
      );
   });

   log(`\nRun ${bold}${blue}npm i${reset} to install new versions 🚀\n`);
};

module.exports = { log, styles, showUpdated };
