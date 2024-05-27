import { assert, describe } from 'poku';
import { getOperator, removeOperator } from '../../src/services/operator.js';

describe('Operator Services', { background: false, icon: '🔬' });

const versions = [
  '^1.9.2',
  '>1.9.2',
  '>=1.9.2',
  '<1.9.2',
  '<=1.9.2',
  '~1.9.2',
  '1.9.2',
];

assert.deepStrictEqual(getOperator(versions[0]), '^', 'Get ^ operator');
assert.deepStrictEqual(getOperator(versions[1]), '>', 'Get > operator');
assert.deepStrictEqual(getOperator(versions[2]), '>=', 'Get >= operator');
assert.deepStrictEqual(getOperator(versions[3]), '<', 'Get < operator');
assert.deepStrictEqual(getOperator(versions[4]), '<=', 'Get <= operator');
assert.deepStrictEqual(getOperator(versions[5]), '~', 'Get ~ operator');
assert.deepStrictEqual(getOperator(versions[6]), '', 'Get empty operator');

versions.forEach((version) => {
  const operator = getOperator(version);
  assert.deepStrictEqual(
    removeOperator(version),
    '1.9.2',
    `Remove ${operator || 'empty'} operator`
  );
});
