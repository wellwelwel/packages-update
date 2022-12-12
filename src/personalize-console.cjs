const log = console.log.bind(console);

const styles = {
   yellow: '\x1b[33m',
   green: '\x1b[32m',
   blue: '\x1b[34m',
   dim: '\x1b[2m',
   reset: '\x1b[0m',
   bold: '\x1b[1m',
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

   const formattedPackages = packages.map((currentPackage) => {
      return {
         ...currentPackage,
         packageName: currentPackage.packageName.padEnd(largestPackageName.length, ' '),
         previousVersion: currentPackage.previousVersion.padEnd(largestPackagePreviousVersion.length, ' '),
      };
   });

   formattedPackages.forEach((currentPackage) => {
      const { packageName, previousVersion, newVersion } = currentPackage;

      log(
         `${bold}${packageName}${reset}    ${reset}${yellow}${dim}^${reset}${yellow}${bold}${previousVersion}${reset}  ${dim}➜${reset}  ${green}${dim}^${reset}${green}${bold}${newVersion}${reset}`
      );
   });

   log(`\nRun ${bold}${blue}npm i${reset} to install new versions 🚀\n`);
};

module.exports = { log, styles, showUpdated };
