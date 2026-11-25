import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadDrupalReleases, supportedReleasesIn, resetDrupalDataCache } from './drupal-data.ts';
import { parseCoreConstraint } from './drupal-version.ts';

function dataDir(t: import('node:test').TestContext, releases: unknown): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drupal-data-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'releases.json'), JSON.stringify(releases));
  return dir;
}

describe('drupal-data hook', () => {
  afterEach(() => resetDrupalDataCache());

  it('returns null when the dataset is absent', () => {
    assert.equal(loadDrupalReleases(path.join(os.tmpdir(), 'no-such-drupal-data')), null);
    assert.equal(supportedReleasesIn(parseCoreConstraint('>=10'), path.join(os.tmpdir(), 'no-such-drupal-data')), null);
  });

  it('reads the data/drupal releases.json shape ({ releases: [{ minor, supported }] })', (t) => {
    const dir = dataDir(t, {
      releases: [
        { minor: '10.5', supported: true, release_date: '2025-06-01' },
        { minor: '10.6', supported: true },
        { minor: '11.0', supported: false },
        { minor: '11.4', supported: true },
        { minor: '11.5', supported: false },
      ],
    });
    assert.equal(loadDrupalReleases(dir)?.length, 5);
    assert.deepEqual(supportedReleasesIn(parseCoreConstraint('>=11.1'), dir), ['11.4']);
    assert.deepEqual(supportedReleasesIn(parseCoreConstraint('^10.3 || ^11'), dir), ['10.5', '10.6', '11.4']);
  });

  it('accepts a bare array with version keys', (t) => {
    const dir = dataDir(t, [{ version: '11.1', currentlySupported: true }]);
    assert.deepEqual(supportedReleasesIn(parseCoreConstraint('^11'), dir), ['11.1']);
  });
});
