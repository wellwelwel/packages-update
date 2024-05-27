import { assert, describe } from 'poku';
import {
  mapVersions,
  getLatest,
  getLatestMajor,
  getLatestMinor,
  getLatestPatch,
} from '../../src/services/versions.js';
import packageData from '../../fixtures/registry-responses/poku.json';

describe('Get Verions', { background: false, icon: '🔬' });

const mysql2RegistryData = mapVersions(packageData);

if (!mysql2RegistryData) {
  assert.fail('Failed to map fixture registry');
  process.exit(1);
}

assert.strictEqual(
  getLatest(mysql2RegistryData),
  '1.13.0',
  'Get latest version'
);

assert.strictEqual(
  getLatestMajor('0.0.1', mysql2RegistryData),
  '1.13.0',
  'Get major version'
);

assert.strictEqual(
  getLatestMinor('0.1.0', mysql2RegistryData),
  '0.2.0',
  'Get minor version'
);

assert.strictEqual(
  getLatestPatch('1.9.2', mysql2RegistryData),
  '1.9.4',
  'Get minor version'
);
