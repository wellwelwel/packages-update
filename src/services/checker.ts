import { logProgress } from '../helpers/log.js';
import { getOperator, removeOperator } from '../services/operator.js';
import { getPackages } from '../services/packages.js';
import { Configs } from '../@types/configs.js';
import {
  getLatest,
  getLatestMajor,
  getLatestMinor,
  getLatestPatch,
  getVersions,
} from '../services/versions.js';
import { results } from '../configs/index.js';

const useUpdater = {
  latest: getLatest,
  major: getLatestMajor,
  minor: getLatestMinor,
  patch: getLatestPatch,
  '>': getLatest,
  '>=': getLatest,
  '^': getLatestMinor,
  '~': getLatestPatch,
  '<': (currentVersion: string) => currentVersion,
  '<=': (currentVersion: string) => currentVersion,
};

type UseUpdater = keyof typeof useUpdater;

export const checker = async (configs: Configs) => {
  !configs?.quiet &&
    console.log(`📦 Looking for ${configs?.target || 'latest'} versions`);

  const packages = await getPackages(configs);

  const packageEntries = [
    ...Object.entries(packages.dependencies),
    ...Object.entries(packages.devDependencies),
    ...(configs?.peer ? Object.entries(packages.peerDependencies) : []),
  ];

  const total = packageEntries.length;
  let count = 0;

  await Promise.all([
    ...packageEntries.map(async (entry) => {
      const name = entry[0];
      const version = entry[1];

      if (configs?.exclude?.includes(name)) {
        !configs?.quiet && logProgress(++count, total);
        return;
      }
      if (
        Array.isArray(configs?.filter) &&
        configs.filter.length > 0 &&
        !configs?.filter?.includes(name)
      ) {
        !configs?.quiet && logProgress(++count, total);
        return;
      }

      const versions = await getVersions(
        name,
        configs?.overrides?.[name]?.registry
          ? configs?.overrides?.[name]?.registry || 'registry.npmjs.org'
          : configs?.registry || 'registry.npmjs.org'
      );

      if (!versions) {
        !configs?.quiet && logProgress(++count, total);
        return;
      }

      const operator = getOperator(version) as UseUpdater;

      const target: UseUpdater | undefined =
        typeof configs?.overrides?.[name]?.target === 'string'
          ? (configs.overrides[name as keyof typeof configs.overrides]
              .target as UseUpdater) ||
            configs?.target ||
            'latest'
          : configs.followPrefix
            ? operator
            : configs?.target || 'latest';

      if (!target) {
        !configs?.quiet && logProgress(++count, total);
        return;
      }

      if (!(target in useUpdater)) {
        throw new Error(
          `${target} is not a valid target\nCurrent dependency: ${name}`
        );
      }

      const currentVersion = removeOperator(version);

      const newVersion =
        target === 'latest' || target === '>' || target === '>='
          ? useUpdater[target](versions)
          : useUpdater[target](currentVersion, versions);

      if (newVersion === currentVersion) {
        !configs?.quiet && logProgress(++count, total);
        return;
      }

      results.push({
        name,
        currentVersion,
        newVersion,
        operator,
      });

      !configs?.quiet && logProgress(++count, total);
    }),
  ]);
};
