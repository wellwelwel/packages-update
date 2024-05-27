#! /usr/bin/env node

import { checker } from '../services/checker.js';
import { getConfigs } from '../services/configs.js';
import { updater } from '../services/updater.js';

(async () => {
  const configs = await getConfigs();

  await checker(configs);
  await updater(configs);
})();
