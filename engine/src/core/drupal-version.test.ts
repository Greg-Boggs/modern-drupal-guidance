import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCoreConstraint,
  describeConstraint,
  satisfies,
  parseVersion,
  minimumCoreVersion,
  DrupalConstraintError,
  type VersionInterval,
} from './drupal-version.ts';

const iv = (c: string): VersionInterval[] => parseCoreConstraint(c);

describe('parseCoreConstraint', () => {
  it('parses comparison operators', () => {
    assert.deepEqual(iv('>=11.1'), [{ min: [11, 1, 0], max: null }]);
    assert.deepEqual(iv('>= 11.1'), [{ min: [11, 1, 0], max: null }]);
    assert.deepEqual(iv('<11'), [{ min: [0, 0, 0], max: [11, 0, 0] }]);
    assert.deepEqual(iv('>10'), [{ min: [11, 0, 0], max: null }]);
    assert.deepEqual(iv('<=10.4'), [{ min: [0, 0, 0], max: [10, 5, 0] }]);
  });

  it('parses caret, tilde and wildcards', () => {
    assert.deepEqual(iv('^10.3'), [{ min: [10, 3, 0], max: [11, 0, 0] }]);
    assert.deepEqual(iv('~10.2'), [{ min: [10, 2, 0], max: [11, 0, 0] }]);
    assert.deepEqual(iv('~10.2.1'), [{ min: [10, 2, 1], max: [10, 3, 0] }]);
    assert.deepEqual(iv('11.x'), [{ min: [11, 0, 0], max: [12, 0, 0] }]);
    assert.deepEqual(iv('11.1.*'), [{ min: [11, 1, 0], max: [11, 2, 0] }]);
    assert.deepEqual(iv('*'), [{ min: [0, 0, 0], max: null }]);
  });

  it('intersects AND terms and merges OR alternatives', () => {
    assert.deepEqual(iv('>=10.3 <12'), [{ min: [10, 3, 0], max: [12, 0, 0] }]);
    assert.deepEqual(iv('>=10.3, <12'), [{ min: [10, 3, 0], max: [12, 0, 0] }]);
    assert.deepEqual(iv('^10.3 || ^11'), [{ min: [10, 3, 0], max: [12, 0, 0] }]);
    assert.deepEqual(iv('^10.3 | ^11'), [{ min: [10, 3, 0], max: [12, 0, 0] }]);
    assert.deepEqual(iv('~10.2.0 || >=11.2'), [
      { min: [10, 2, 0], max: [10, 3, 0] },
      { min: [11, 2, 0], max: null },
    ]);
  });

  it('parses hyphen ranges and strips stability flags', () => {
    assert.deepEqual(iv('10.3 - 11.1'), [{ min: [10, 3, 0], max: [11, 2, 0] }]);
    assert.deepEqual(iv('^11.1@beta'), [{ min: [11, 1, 0], max: [12, 0, 0] }]);
  });

  it('rejects malformed or empty constraints', () => {
    for (const bad of ['', '   ', 'eleven', '>=11 <10', '!=11', '11.1.2.3', '^10 ||']) {
      assert.throws(() => parseCoreConstraint(bad), DrupalConstraintError, bad);
    }
  });
});

describe('describeConstraint', () => {
  it('renders readable ranges', () => {
    assert.equal(describeConstraint('>=11.1'), 'Drupal core 11.1 and later');
    assert.equal(describeConstraint('^10.3 || ^11'), 'Drupal core 10.3 to 11.x');
    assert.equal(describeConstraint('^11'), 'Drupal core 11.x');
    assert.equal(describeConstraint('~10.2.0'), 'Drupal core 10.2');
    assert.equal(describeConstraint('<11'), 'Drupal core up to 10.x');
    assert.equal(describeConstraint('>=10.3 <11.2'), 'Drupal core 10.3 to 11.1');
    assert.equal(describeConstraint('^10 || >=11.2'), 'Drupal core 10.x or 11.2 and later');
  });
});

describe('satisfies / parseVersion / minimumCoreVersion', () => {
  it('checks versions against intervals', () => {
    assert.equal(satisfies(parseVersion('11.1.3'), iv('>=11.1')), true);
    assert.equal(satisfies(parseVersion('11.0'), iv('>=11.1')), false);
    assert.equal(satisfies(parseVersion('10.4'), iv('^10.3 || ^11')), true);
    assert.equal(satisfies(parseVersion('12.0'), iv('^10.3 || ^11')), false);
  });

  it('parses installed versions', () => {
    assert.deepEqual(parseVersion('v10.3.2'), [10, 3, 2]);
    assert.deepEqual(parseVersion('11.1.x-dev'), [11, 1, 0]);
    assert.deepEqual(minimumCoreVersion('^10.3 || ^11'), [10, 3, 0]);
  });
});
