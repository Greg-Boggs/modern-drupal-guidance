#!/usr/bin/env python3
"""Validate releases.json, deprecations.json and features.json.

Usage: python3 scripts/validate.py
Runs from anywhere. Checks each file against schemas/*.schema.json (needs the
`jsonschema` package: pip install jsonschema), then runs cross-field checks the
schemas cannot express. Exits 1 on any failure.
"""
import datetime
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

try:
    from jsonschema import Draft202012Validator, FormatChecker
except ImportError:
    sys.exit('jsonschema is required: pip install jsonschema')

errors = []


def err(file, msg):
    errors.append(f'{file}: {msg}')


def vt(v):
    return tuple(int(x) for x in re.match(r'^(\d+)\.(\d+)\.(\d+)', v).groups())


def load(name):
    return json.load(open(os.path.join(ROOT, name + '.json'))), json.load(open(os.path.join(ROOT, 'schemas', name + '.schema.json')))


def schema_check(name, doc, schema):
    Draft202012Validator.check_schema(schema)
    v = Draft202012Validator(schema, format_checker=FormatChecker())
    for e in sorted(v.iter_errors(doc), key=lambda e: list(e.absolute_path)):
        path = '/'.join(str(p) for p in e.absolute_path)
        err(name, f'{path or "(root)"}: {e.message[:200]}')


def check_releases(doc):
    seen = set()
    cur = doc['current_release']
    for r in doc['releases']:
        m = r['minor']
        if m in seen:
            err('releases', f'duplicate minor {m}')
        seen.add(m)
        if int(m.split('.')[0]) != r['major']:
            err('releases', f'{m}: major mismatch')
        if r['status'] != 'prerelease':
            if not r.get('release_date') or not r.get('first_release'):
                err('releases', f'{m}: released minor needs first_release and release_date')
            elif r['first_release'] != m + '.0':
                err('releases', f'{m}: first_release {r["first_release"]} is not {m}.0')
            if not r.get('security_support_end'):
                err('releases', f'{m}: released minor needs security_support_end')
            elif r['release_date'] and r['security_support_end'] < r['release_date'][:len(r['security_support_end'])]:
                err('releases', f'{m}: security support ends before release')
        elif r.get('release_date'):
            err('releases', f'{m}: prerelease must not have a release_date')
        if (r['status'] == 'current') != (m == cur):
            err('releases', f'{m}: status {r["status"]} disagrees with current_release {cur}')
        if r['security_support_end'] and len(r['security_support_end']) != (10 if r['security_support_end_precision'] == 'day' else 7):
            err('releases', f'{m}: precision {r["security_support_end_precision"]} does not match date format')
    for needed in ['9.%d' % i for i in range(6)] + ['10.%d' % i for i in range(7)] + ['11.%d' % i for i in range(5)]:
        if needed not in seen:
            err('releases', f'missing minor {needed}')


def check_deprecations(doc, releases):
    latest = vt(doc['latest_stable'])
    ids = set()
    for d in doc['deprecations']:
        i = d['id']
        if i in ids:
            err('deprecations', f'duplicate id {i}')
        ids.add(i)
        dep, rem = vt(d['deprecated_in']), vt(d['removed_in'])
        if rem <= dep:
            err('deprecations', f'{i}: removed_in {d["removed_in"]} is not after deprecated_in {d["deprecated_in"]}')
        want = 'removed' if rem <= latest else 'deprecated'
        if d['status'] != want:
            err('deprecations', f'{i}: status {d["status"]} but removed_in {d["removed_in"]} vs latest stable {doc["latest_stable"]} implies {want}')
        if rem[2] != 0:
            err('deprecations', f'{i}: removed_in {d["removed_in"]} should be a .0 release')
        if d['type'] in ('function', 'method') and not d['symbol'].endswith('()') and d['origin'] == 'core-source':
            err('deprecations', f'{i}: callable symbol should end with ()')
        if d['change_record_url'] and d['source_url'] != d['change_record_url'] and d['origin'] == 'curated':
            err('deprecations', f'{i}: curated source_url should be the change record')
    return ids


def check_features(doc):
    ids = set()
    for f in doc['features']:
        if f['id'] in ids:
            err('features', f'duplicate id {f["id"]}')
        ids.add(f['id'])
        if f['source_url'] != f['change_record_url']:
            err('features', f'{f["id"]}: source_url should equal change_record_url')


def main():
    docs = {}
    for name in ('releases', 'deprecations', 'features'):
        doc, schema = load(name)
        docs[name] = doc
        schema_check(name, doc, schema)
    if not errors:
        check_releases(docs['releases'])
        dep_ids = check_deprecations(docs['deprecations'], docs['releases'])
        check_features(docs['features'])
        for f in docs['features']['features']:
            for r in f.get('replaces', []):
                if r.startswith('deprecation:') and r[len('deprecation:'):] not in dep_ids:
                    err('features', f'{f["id"]}: replaces unknown deprecation id {r}')
    for name, doc in docs.items():
        try:
            datetime.date.fromisoformat(doc['generated'])
        except ValueError:
            err(name, 'generated is not a date')
    counts = {
        'releases': len(docs['releases']['releases']),
        'deprecations': len(docs['deprecations']['deprecations']),
        'features': len(docs['features']['features']),
    }
    if errors:
        print('FAILED', len(errors), 'problem(s)')
        for e in errors[:50]:
            print(' -', e)
        if len(errors) > 50:
            print(f' ... and {len(errors) - 50} more')
        sys.exit(1)
    print('OK', ', '.join(f'{k}: {v}' for k, v in counts.items()))


if __name__ == '__main__':
    main()
