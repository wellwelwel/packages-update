import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { Configs } from '../@types/configs.js';

export const getConfigs = async (
  relativePath: string = '.purc.json'
): Promise<Configs> => {
  const fullPath = path.join(process.cwd(), relativePath);

  try {
    await stat(fullPath);

    const configsFile = await readFile(fullPath, 'utf-8');
    const configs = JSON.parse(configsFile);

    return configs;
  } catch {
    return {};
  }
};
