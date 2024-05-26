import process from 'node:process';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { PackageDependencies } from '../@types/packages.js';
import { Configs } from '../@types/configs.js';

export const packageJSON = {} as {
  path: string;
  text: string;
  json: {
    dependencies: PackageDependencies;
    devDependencies: PackageDependencies;
    peerDependencies: PackageDependencies;
  };
};

export const getPackages = async (configs: Configs) => {
  packageJSON.path = path.join(
    process.cwd(),
    configs?.packageFile || './package.json'
  );
  packageJSON.text = await readFile(packageJSON.path, 'utf-8');
  packageJSON.json = JSON.parse(packageJSON.text);

  const { dependencies, devDependencies, peerDependencies } = packageJSON.json;

  return {
    dependencies: dependencies || {},
    devDependencies: devDependencies || {},
    peerDependencies: peerDependencies || {},
  };
};
