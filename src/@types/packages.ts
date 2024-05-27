export type PackageSource = {
  ['dist-tags']: Record<string, string>;
  versions: Record<string, object>;
};

export type PackageData = {
  tags: PackageSource['dist-tags'];
  versions: string[];
};

export type PackageDependencies = Record<string, string>;

export type UpdaterManager = 'latest' | 'major' | 'minor' | 'patch';
