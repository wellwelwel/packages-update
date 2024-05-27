import { packageJSON } from '../services/packages.js';

export const checkProperty = (
  parsedPackageJSON: typeof packageJSON.json,
  packageName: string
): keyof typeof parsedPackageJSON | false => {
  const searchable = ['dependencies', 'devDependencies', 'peerDependencies'];

  for (const search of searchable) {
    const dependencyType = search as keyof typeof parsedPackageJSON;

    if (
      parsedPackageJSON[dependencyType] &&
      packageName in parsedPackageJSON[dependencyType]
    )
      return dependencyType;
  }

  return false;
};
