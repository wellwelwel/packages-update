import { checker } from './services/checker.js';
import { getConfigs } from './services/configs.js';
import { updater } from './services/updater.js';
import { Configs } from './@types/configs.js';

export const pu = async (configs?: Configs) => {
  const defaultConfigs = await getConfigs(configs?.configFile);
  const finalConfigs = { ...defaultConfigs, ...configs };

  await checker(finalConfigs);
  await updater(finalConfigs);
};
