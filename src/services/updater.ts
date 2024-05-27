import { writeFile } from 'node:fs/promises';
import { getIndentation, getLargerString } from '../helpers/get-indentation.js';
import { checkProperty } from '../helpers/get-property.js';
import { styles } from '../helpers/log.js';
import { packageJSON } from '../services/packages.js';
import { results } from '../configs/index.js';
import { Configs } from '../@types/configs.js';

const { bold, dim, reset, yellow, green, blue } = styles;

export const updater = async (configs: Configs) => {
  if (results.length === 0) {
    !configs?.quiet && console.log('✅ Nothing to be updated');
    return;
  }

  // SKip line
  !configs?.quiet && console.log();

  const largestPackageName = getLargerString(results.map((pkg) => pkg.name));

  const largestPackageCurrentVersion = getLargerString(
    results.map((pkg) => pkg.currentVersion)
  );

  const largestPackageoperator = getLargerString(
    results.map((pkg) => pkg.operator)
  );

  const formattedResults = results.map((currentPackage) => {
    return {
      name: currentPackage.name.padEnd(largestPackageName.length, ' '),
      operator: currentPackage.operator.padStart(
        largestPackageoperator.length,
        ' '
      ),
      currentVersion: currentPackage.currentVersion.padEnd(
        largestPackageCurrentVersion.length,
        ' '
      ),
      newVersion: currentPackage.newVersion,
    };
  });

  formattedResults.forEach((result) => {
    const dependencyType = checkProperty(packageJSON.json, result.name.trim());
    if (!dependencyType) return;

    const { name, operator, currentVersion, newVersion } = result;

    !configs?.quiet &&
      console.log(
        `${bold}${name}${reset}   ${reset}${yellow}${dim}${operator}${reset}${yellow}${currentVersion}${reset} ${dim}➜${reset} ${green}${dim}${operator}${reset}${green}${bold}${newVersion}${reset}`
      );

    packageJSON.json[dependencyType][result.name.trim()] =
      `${result.operator.trim()}${result.newVersion.trim()}`;
  });

  if (!configs?.checkOnly) {
    await writeFile(
      packageJSON.path,
      JSON.stringify(
        packageJSON.json,
        null,
        configs?.indentation || getIndentation(packageJSON.path)
      ),
      'utf-8'
    );

    !configs?.quiet &&
      console.log(
        `\nRun ${bold}${blue}npm i${reset} to install new versions 🚀\n`
      );
  }
};
