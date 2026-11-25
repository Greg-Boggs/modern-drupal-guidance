#!/usr/bin/env python3
"""Build features.json from curated/features-curated.json.

Usage: build_features.py [--as-of YYYY-MM-DD]
Each curated entry must have been checked with cr_info.py: its change record's
"Introduced in version" must match introduced_in. Standard library only.
"""
import argparse
import datetime
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--as-of', default=datetime.date.today().isoformat())
    a = ap.parse_args()
    entries = json.load(open(os.path.join(ROOT, 'curated', 'features-curated.json')))['entries']
    entries.sort(key=lambda e: (tuple(int(x) for x in e['introduced_in'].split('.')), e['id']))
    doc = {
        '$schema': 'schemas/features.schema.json',
        'generated': datetime.date.today().isoformat(),
        'as_of': a.as_of,
        'sources': ['https://www.drupal.org/list-changes/drupal', 'https://www.drupal.org/project/drupal/releases'],
        'features': entries,
    }
    with open(os.path.join(ROOT, 'features.json'), 'w') as f:
        json.dump(doc, f, indent=2)
        f.write('\n')
    print(len(entries), 'features')


if __name__ == '__main__':
    main()
