#!/usr/bin/env python3
"""Build deprecations.json from extract_deprecations.py output plus curated entries.

Usage: build_deprecations.py CANDIDATES.json [--latest-stable 11.4.13] [--out PATH]

Rules
  - Keep entries whose removed_in is 9.0.0 or later (the task scope).
  - Core-source entries: the change record URL is whatever the core notice cites. If it cites none,
    source_url is the file at the tag where the notice was found and change_record_url is null.
  - Curated entries (curated/deprecations-curated.json) override extracted ones with the same id and
    must carry a change record URL.
  - Entries flagged in curated/priority.json get priority "high" and tags.
Standard library only.
"""
import argparse
import datetime
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)


def vt(v):
    return tuple(int(x) for x in re.match(r'^(\d+)\.(\d+)\.(\d+)', v).groups())


def src_url(tag, path):
    return f'https://github.com/drupal/core/blob/{tag}/{path}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('candidates')
    ap.add_argument('--latest-stable', required=True)
    ap.add_argument('--out', default=os.path.join(ROOT, 'deprecations.json'))
    ap.add_argument('--as-of', default=datetime.date.today().isoformat())
    a = ap.parse_args()
    latest = vt(a.latest_stable)
    cands = json.load(open(a.candidates))
    curated = json.load(open(os.path.join(ROOT, 'curated', 'deprecations-curated.json')))['entries']
    prio = json.load(open(os.path.join(ROOT, 'curated', 'priority.json')))

    out = {}
    for c in cands:
        if vt(c['removed_in']) < (9, 0, 0):
            continue
        id_ = f"{c['type']}:{c['symbol']}".lower()
        cr = c['change_record_url']
        issue = None
        if cr and '/project/drupal/issues/' in cr:
            # an issue link, not a change record: keep it as the source only
            issue, cr = cr, None
        entry = {
            'id': id_,
            'symbol': c['symbol'],
            'type': c['type'],
            'status': 'removed' if vt(c['removed_in']) <= latest else 'deprecated',
            'deprecated_in': c['deprecated_in'],
            'removed_in': c['removed_in'],
            'replacement': c['replacement'].strip(),
            'change_record_url': cr,
            'source_url': cr or issue or src_url(c['source_tag'], c['source_file']),
            'origin': 'core-source',
        }
        out[id_] = entry
    for e in curated:
        e = dict(e)
        e['id'] = e.get('id') or f"{e['type']}:{e['symbol']}".lower()
        e['status'] = 'removed' if vt(e['removed_in']) <= latest else 'deprecated'
        e['source_url'] = e['change_record_url']
        e['origin'] = 'curated'
        out[e['id']] = {**out.get(e['id'], {}), **e}
    for pattern, meta in prio['rules']:
        rx = re.compile(pattern)
        for id_, e in out.items():
            if rx.search(e['symbol']):
                e['priority'] = 'high'
                tags = set(e.get('tags', [])) | set(meta['tags'])
                e['tags'] = sorted(tags)
    entries = sorted(out.values(), key=lambda e: (vt(e['removed_in']), e['type'], e['symbol']))
    doc = {
        '$schema': 'schemas/deprecations.schema.json',
        'generated': datetime.date.today().isoformat(),
        'as_of': a.as_of,
        'latest_stable': a.latest_stable,
        'sources': [
            'https://www.drupal.org/list-changes/drupal',
            'https://github.com/drupal/core (deprecation notices at tags 8.9.20, 9.5.11, 10.6.22, 11.4.13, 12.0.0-beta2)',
            'https://www.drupal.org/about/core/deprecation',
        ],
        'deprecations': entries,
    }
    with open(a.out, 'w') as f:
        json.dump(doc, f, indent=2)
        f.write('\n')
    print(len(entries), 'entries')


if __name__ == '__main__':
    main()
