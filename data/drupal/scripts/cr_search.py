#!/usr/bin/env python3
"""Search drupal.org change records (https://www.drupal.org/list-changes/drupal).

Usage: cr_search.py KEYWORD [--title] [--pages N]
Prints: introduced-in-version<TAB>date<TAB>title<TAB>URL
Searches the description by default, or the title with --title.
Used to find change record URLs and "introduced in" versions when curating
deprecations.json and features.json. Standard library only; be polite and keep
page counts small.
"""
import html
import re
import sys
import time
import urllib.parse
import urllib.request

BASE = 'https://www.drupal.org/list-changes/drupal'
ROW = re.compile(
    r'<tr\s[^>]*class="(?:odd|even)[^>]*>\s*<td[^>]*>\s*(.*?)\s*</td>\s*<td[^>]*>\s*(.*?)\s*</td>\s*<td[^>]*>\s*(.*?)\s*</td>', re.S)


def fetch(keyword, title_only, page):
    field = 'title' if title_only else 'keywords_description'
    qs = urllib.parse.urlencode({field: keyword, 'page': page})
    req = urllib.request.Request(BASE + '?' + qs, headers={'User-Agent': 'drupal-guidance-dataset/1.0'})
    return urllib.request.urlopen(req, timeout=60).read().decode('utf-8', 'replace')


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    title_only = '--title' in args
    pages = 1
    if '--pages' in args:
        pages = int(args[args.index('--pages') + 1])
    keyword = args[0]
    for page in range(pages):
        s = fetch(keyword, title_only, page)
        found = 0
        for m in ROW.finditer(s):
            ver, date, cell = (re.sub(r'<[^>]+>', '', m.group(i)).strip() for i in (1, 2, 3))
            link = re.search(r'href="(?:https://www\.drupal\.org)?(/node/\d+)"', m.group(3))
            title = html.unescape(cell)
            url = 'https://www.drupal.org' + link.group(1) if link else ''
            print('\t'.join([ver, date, title, url]))
            found += 1
        if not found:
            break
        time.sleep(1)


if __name__ == '__main__':
    main()
