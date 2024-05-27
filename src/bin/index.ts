#! /usr/bin/env node

import { Configs } from '../@types/configs.js';
import { UpdaterManager } from '../@types/packages.js';
import { getArg, hasArg } from '../helpers/get-args.js';
import { checker } from '../services/checker.js';
import { getConfigs } from '../services/configs.js';
import { updater } from '../services/updater.js';

const configFile = getArg('config-file');
const packageFile = getArg('package-file');
const target = getArg<UpdaterManager>('target');
const filter = getArg('filter')?.split(',');
const exclude = getArg('exclude')?.split(',');
const indentation = getArg('indentation');
const registry = getArg('registry');

const followPrefix = hasArg('follow-prefix');
const peer = hasArg('peer');
const quiet = hasArg('quiet');
const checkOnly = hasArg('check-only');

(async () => {
  const defaultConfigs = await getConfigs(configFile);

  const configs: Configs = {
    ...defaultConfigs,
    packageFile: packageFile || defaultConfigs.packageFile,
    followPrefix: followPrefix || defaultConfigs.followPrefix,
    target: target || defaultConfigs.target,
    filter: filter || defaultConfigs.filter,
    exclude: exclude || defaultConfigs.exclude,
    peer: peer || defaultConfigs.peer,
    indentation:
      (indentation && parseInt(indentation)) || defaultConfigs.indentation,
    registry: registry || defaultConfigs.registry,
    quiet: quiet || defaultConfigs.quiet,
    checkOnly: checkOnly || defaultConfigs.checkOnly,
  };

  await checker(configs);
  await updater(configs);
})();
