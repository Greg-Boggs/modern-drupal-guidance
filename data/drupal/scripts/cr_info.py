#!/usr/bin/env python3
"""Print title, introduced-in branch/version and status for drupal.org change records.

Usage: cr_info.py NODE_ID_OR_URL [...]
Output (tab separated): node id, introduced-in branch, introduced-in version, title.
Used to verify the "introduced in" version of every change record the datasets cite.
Standard library only.
"""
import html
import re
import sys
import time
import urllib.request


def info(node):
    node = re.sub(r'\D', '', node.rsplit('/', 1)[-1])
    req = urllib.request.Request('https://www.drupal.org/node/' + node, headers={'User-Agent': 'drupal-guidance-dataset/1.0'})
    s = urllib.request.urlopen(req, timeout=60).read().decode('utf-8', 'replace')
    t = re.search(r'<title>(.*?)</title>', s, re.S)
    title = html.unescape(t.group(1)).split(' | ')[0].strip() if t else ''
    def field(label):
        m = re.search(label + r':(?:&nbsp;|\s)*</div><div class="field-items"><div class="field-item[^"]*">(.*?)</div>', s, re.S)
        return re.sub(r'<[^>]+>', '', m.group(1)).strip() if m else None
    br, ver = field('Introduced in branch'), field('Introduced in version')
    return node, (br or '?'), (ver or '?'), title


def main():
    for a in sys.argv[1:]:
        try:
            print('\t'.join(info(a)))
        except Exception as e:  # noqa: BLE001
            print(a, 'ERROR', e, sep='\t')
        time.sleep(0.5)


if __name__ == '__main__':
    main()
