#!/usr/bin/env python3
"""Build releases.json from the drupal.org release history feed plus curated support data.

Usage: build_releases.py [--out PATH] [--as-of YYYY-MM-DD] [--xml PATH]

Inputs
  https://updates.drupal.org/release-history/drupal/all   (or --xml for a saved copy)
  curated/releases-support.json                            (security end dates, minimum PHP)
Standard library only.
"""
import argparse
import datetime
import json
import os
import re
import urllib.request
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FEED = 'https://updates.drupal.org/release-history/drupal/all'
REL = 'https://www.drupal.org/project/drupal/releases/'
SCHEDULE = 'https://www.drupal.org/about/core/policies/core-release-cycles/schedule'
PLANNED = {'11.5': 'week of 2026-12-07', '12.0': '2026-12-09'}  # from the schedule page; update on refresh


def vkey(v):
    return tuple(int(x) for x in v.split('.'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=os.path.join(ROOT, 'releases.json'))
    ap.add_argument('--as-of', default=datetime.date.today().isoformat())
    ap.add_argument('--xml')
    a = ap.parse_args()
    as_of = datetime.date.fromisoformat(a.as_of)

    if a.xml:
        root = ET.parse(a.xml).getroot()
    else:
        req = urllib.request.Request(FEED, headers={'User-Agent': 'drupal-guidance-dataset/1.0'})
        root = ET.fromstring(urllib.request.urlopen(req, timeout=120).read())
    support = json.load(open(os.path.join(ROOT, 'curated', 'releases-support.json')))['minors']

    first, latest = {}, {}
    for r in root.find('releases'):
        v = r.findtext('version')
        m = re.match(r'^(\d+)\.(\d+)\.(\d+)$', v or '')
        if not m or int(m[1]) < 9:
            continue
        minor = f'{m[1]}.{m[2]}'
        date = datetime.datetime.fromtimestamp(int(r.findtext('date')), datetime.timezone.utc).date()
        if m[3] == '0':
            first[minor] = (v, date)
        if minor not in latest or vkey(v) > vkey(latest[minor]):
            latest[minor] = v

    current = max(first, key=vkey)
    releases = []
    for minor in sorted(support, key=vkey):
        s = support[minor]
        released = minor in first
        end = s['security_support_end']
        prec = s['security_support_end_precision']
        if not released:
            status = 'prerelease'
        elif minor == current:
            status = 'current'
        else:
            # a month-precision end date covers that whole month
            if prec == 'month':
                y, mo = map(int, end.split('-'))
                last = (datetime.date(y + mo // 12, mo % 12 + 1, 1) - datetime.timedelta(days=1))
            else:
                last = datetime.date.fromisoformat(end)
            status = 'supported' if last >= as_of else 'end-of-life'
        entry = {
            'minor': minor,
            'major': int(minor.split('.')[0]),
            'first_release': first[minor][0] if released else None,
            'release_date': first[minor][1].isoformat() if released else None,
            'planned_release': None if released else PLANNED.get(minor),
            'latest_patch': latest.get(minor) if released else None,
            'security_support_end': end,
            'security_support_end_precision': prec,
            'min_php': s['min_php'],
            'status': status,
            'supported': status in ('current', 'supported'),
            'source_urls': [REL + first[minor][0] if released else SCHEDULE, s['security_support_source'], FEED],
        }
        if s.get('note'):
            entry['notes'] = s['note']
        # de-duplicate sources, keep order
        entry['source_urls'] = list(dict.fromkeys(entry['source_urls']))
        releases.append(entry)

    doc = {
        '$schema': 'schemas/releases.schema.json',
        'generated': datetime.date.today().isoformat(),
        'as_of': as_of.isoformat(),
        'current_release': current,
        'sources': [FEED, SCHEDULE, 'https://www.drupal.org/project/drupal/releases',
                    'https://raw.githubusercontent.com/drupal/core/ (composer.json at each .0 tag)'],
        'releases': releases,
    }
    doc['sources'][3] = 'https://github.com/drupal/core'
    with open(a.out, 'w') as f:
        json.dump(doc, f, indent=2)
        f.write('\n')
    print(len(releases), 'releases; current', current)


if __name__ == '__main__':
    main()
