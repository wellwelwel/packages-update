import { UpdaterManager } from './packages.js';

export type Configs = {
  /**
   * Relative path to package.json file
   *
   * @default "./package.json"
   */
  packageFile?: string;
  /**
   * Update dependencies respecting version prefixes
   *
   * @default false
   */
  followPrefix?: boolean;
  /**
   * Type of update strategy (e.g., latest, major, minor, patch)
   *
   * @default "latest"
   */
  target?: UpdaterManager;
  /**
   * Filter the specified dependencies to include in the update
   *
   * @default []
   */
  filter?: string[];
  /**
   * Exclude the specified dependencies to exclude from the update
   *
   * @default []
   */
  exclude?: string[];
  /**
   * Update peer dependencies
   *
   * @default false
   */
  peer?: boolean;
  /**
   * JSON indentation level
   *
   * @default 2
   */
  indentation?: number;
  /**
   * Specify the registry URL
   *
   * @default "registry.npmjs.org"
   */
  registry?: string;
  /**
   * Suppress output messages
   *
   * @default false
   */
  quiet?: boolean;
  /**
   * Perform checks without applying updates
   *
   * @default false
   */
  checkOnly?: boolean;
  /**
   * Custom config path
   *
   * @default "./.purc.json"
   */
  configFile?: string;
  /**
   * Override update strategy for specific packages
   */
  overrides?: {
    [packageName: string]: {
      /**
       * Specific update strategy for this package (e.g., latest, major, minor, patch)
       */
      target?: UpdaterManager;
      /**
       * Specific registry URL for this package
       */
      registry?: string;
    };
  };
};

export type Result = {
  name: string;
  operator: string;
  currentVersion: string;
  newVersion: string;
};
