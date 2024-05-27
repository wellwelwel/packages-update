import { request } from './request.js';
import { PackageData } from '../@types/packages.js';

const filterSemver = (version: string): boolean => !/[^0-9.]/gi.test(version);

const filterVersions = (version: string, group: string): boolean =>
  filterSemver(version) && version.startsWith(group);

export const getLatest = (packageData: PackageData): string =>
  packageData?.tags?.latest ||
  packageData.versions[packageData.versions.length - 1];

// TODO: Not currently in use
export const getLatestByTag = (
  tag: string,
  packageData: PackageData
): string | undefined => packageData?.tags[tag];

export const getLatestPatch = (
  currentVersion: string,
  packageData: PackageData
): string => {
  const versions = packageData.versions;
  const [major, minor] = currentVersion
    .trim()
    .replace(/[^0-9.]/gi, '')
    .split('.');

  if (!versions) currentVersion;

  const patchVersions = versions.filter((version) =>
    filterVersions(version, `${major}.${minor}`)
  );

  return patchVersions[patchVersions.length - 1] || currentVersion;
};

export const getLatestMinor = (
  currentVersion: string,
  packageData: PackageData
) => {
  const versions = packageData.versions;
  const [major] = currentVersion
    .trim()
    .replace(/[^0-9.]/gi, '')
    .split('.');

  if (!versions) return currentVersion;

  const minorVersions = versions.filter((version) =>
    filterVersions(version, `${major}.`)
  );

  return minorVersions[minorVersions.length - 1] || currentVersion;
};

export const getLatestMajor = (
  currentVersion: string,
  packageData: PackageData
) => {
  const versions = packageData.versions;

  if (!versions) return currentVersion;

  const majorVersions = versions.filter((version) => filterSemver(version));

  return majorVersions[majorVersions.length - 1] || currentVersion;
};

export const getVersions = async (
  pkg: string,
  registry: string
): Promise<PackageData | false> => {
  const packageSource = await request(pkg, registry);

  if (packageSource.statusCode !== 200) {
    return false;
  }

  return {
    versions: Object.keys(packageSource.body.versions),
    tags: packageSource.body['dist-tags'],
  };
};
