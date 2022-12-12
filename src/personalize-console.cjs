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

   const largestPackageName = packages.reduce((acc, cur) =>
      acc?.packageName?.length > cur?.packageName?.length ? acc.packageName : cur.packageName
   );

   const formattedPackages = packages.map((currentPackage) => {
      return {
         ...currentPackage,
         packageName: currentPackage.packageName.padEnd(largestPackageName.length, ' '),
      };
   });

   formattedPackages.forEach((currentPackage) => {
      const { packageName, previousVersion, newVersion } = currentPackage;

      log(
         `${bold}${packageName}${reset} \t${reset}${yellow}${previousVersion}${reset} \t${dim}➜${reset}   ${green}${newVersion}${reset}`
      );
   });

   log(`\nRun ${bold}${blue}npm i${reset} to install new versions 🚀\n`);
};

module.exports = { log, styles, showUpdated };
