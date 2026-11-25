#!/usr/bin/env python3
"""Extract deprecation notices from Drupal core source trees.

Usage: extract_deprecations.py OUT.json LABEL=PATH [LABEL=PATH ...]

LABEL is a git tag (e.g. 9.5.11) used for source links; PATH is a checkout of
https://github.com/drupal/core at that tag. Trees are processed in the order
given; a symbol seen in a later tree replaces the earlier entry.

Writes raw candidates, not the final dataset. build_deprecations.py merges
them with the curated entries. Standard library only.
"""
import json
import os
import re
import sys

DEPR_NEW = re.compile(
    r'@deprecated\s+in\s+drupal:(\d+\.\d+\.\d+(?:-\w+)?)\s+and\s+is\s+removed\s+from\s+drupal:(\d+\.\d+\.\d+)\.?\s*(.*)', re.S)
DEPR_OLD = re.compile(
    r'@deprecated\s+in\s+(?:drupal:|Drupal\s+)(\d+\.\d+\.\d+(?:-\w+)?)\s+(?:and\s+)?(?:will\s+be\s+)?(?:is\s+)?removed\s+(?:before|from|in)\s+(?:drupal:|Drupal\s+)(\d+\.\d+\.\d+)\.?\s*(.*)', re.S | re.I)
URL = re.compile(r'https://www\.drupal\.org/(?:node|project/drupal/issues)/\d+|https://www\.drupal\.org/node/\d+')
DOC = re.compile(r'/\*\*((?:(?!\*/).)*)\*/[ \t]*\n((?:[ \t]*#\[[^\n]*\n)*)(?=([^\n]*(?:\n[^\n]*){0,3}))', re.S)
CLASS_DECL = re.compile(r'^\s*(?:abstract\s+|final\s+|readonly\s+)*(class|interface|trait|enum)\s+(\w+)', re.M)
NS = re.compile(r'^namespace\s+([\w\\]+);', re.M)
FUNC = re.compile(r'^(\s*)(?:(?:public|protected|private|static|abstract|final)\s+)*function\s+&?(\w+)\s*\(')
CONST = re.compile(r'^\s*(?:(?:public|protected|private|final)\s+)*const\s+(?:\w+\s+)?(\w+)\s*=')
PROP = re.compile(r'^\s*(?:(?:public|protected|private|static|readonly)\s+)+(?:[\w\\?|]+\s+)?\$(\w+)')
GCONST = re.compile(r'^\s*const\s+(\w+)\s*=')
DEFINE = re.compile(r"^\s*define\(\s*'(\w+)'")


def clean(text):
    text = re.sub(r'^\s*\*\s?', '', text, flags=re.M)
    return re.sub(r'\s+', ' ', text).strip()


def classify(path, name, kind):
    if kind == 'func' and path.endswith('.api.php') and name.startswith('hook_'):
        return 'hook'
    return kind


def extract_file(label, root, rel):
    path = os.path.join(root, rel)
    try:
        src = open(path, encoding='utf-8', errors='replace').read()
    except OSError:
        return []
    if '@deprecated' not in src:
        return []
    ns = NS.search(src)
    ns = ns.group(1) if ns else ''
    classes = [(m.start(), m.group(2)) for m in CLASS_DECL.finditer(src)]
    out = []
    for m in DOC.finditer(src):
        doc = m.group(1)
        if '@deprecated' not in doc:
            continue
        flat = clean(doc)
        d = DEPR_NEW.search(flat) or DEPR_OLD.search(flat)
        if not d:
            continue
        dep_in, rem_in, tail = d.group(1), d.group(2), d.group(3)
        # the message ends at the next @tag
        msg = re.split(r'\s@\w+', tail)[0].strip()
        url = URL.search(flat)
        decl = m.group(3)
        first = decl.split('\n')[0] if decl else ''
        lines = decl.split('\n')
        sym = kind = None
        cls = None
        for ln in lines:
            cm = CLASS_DECL.match(ln)
            if cm and not ln.strip().startswith('*'):
                sym = (ns + '\\' if ns else '') + cm.group(2)
                kind = 'interface' if cm.group(1) == 'interface' else 'trait' if cm.group(1) == 'trait' else 'class'
                if 'Annotation' in ns:
                    kind = 'annotation'
                break
            fm = FUNC.match(ln)
            if fm:
                name = fm.group(2)
                if fm.group(1):  # indented -> method
                    prior = [c for c in classes if c[0] < m.start()]
                    cls = prior[-1][1] if prior else None
                    sym = ((ns + '\\' if ns else '') + cls + '::' + name + '()') if cls else name + '()'
                    kind = 'method'
                else:
                    sym = name + '()'
                    kind = classify(rel, name, 'function')
                    if kind == 'function' and name.startswith('hook_') and rel.endswith('.api.php'):
                        kind = 'hook'
                break
            km = CONST.match(ln)
            if km:
                prior = [c for c in classes if c[0] < m.start()]
                cls = prior[-1][1] if prior else ''
                if ln[:1].isspace() and cls:
                    sym = (ns + '\\' if ns else '') + cls + '::' + km.group(1)
                else:
                    sym = km.group(1)
                kind = 'constant'
                break
            gm = GCONST.match(ln) or DEFINE.match(ln)
            if gm:
                sym = gm.group(1)
                kind = 'constant'
                break
            pm = PROP.match(ln)
            if pm:
                prior = [c for c in classes if c[0] < m.start()]
                cls = prior[-1][1] if prior else ''
                sym = (ns + '\\' if ns else '') + cls + '::$' + pm.group(1)
                kind = 'property'
                break
        if not sym:
            continue
        out.append({
            'symbol': sym.lstrip('\\'),
            'type': kind,
            'deprecated_in': dep_in,
            'removed_in': rem_in,
            'replacement': msg,
            'change_record_url': url.group(0) if url else None,
            'source_file': rel,
            'source_tag': label,
        })
    return out


YAML_DEPR = re.compile(r'^\s{2}(\S+):\s*$|^\s+deprecated:\s*(.+)$', re.M)


def extract_services(label, root, rel):
    """services.yml entries with a `deprecated:` message."""
    src = open(os.path.join(root, rel), encoding='utf-8', errors='replace').read()
    if 'deprecated:' not in src:
        return []
    out = []
    current = None
    for line in src.splitlines():
        m = re.match(r'^  ([\w.\\:@-]+):\s*$', line)
        if m:
            current = m.group(1)
            continue
        m = re.match(r'^    deprecated:\s*(.+)$', line)
        if m and current:
            msg = m.group(1).strip().strip('"\'')
            d = re.search(r'deprecated in drupal:(\d+\.\d+\.\d+)\s+and\s+is\s+removed\s+from\s+drupal:(\d+\.\d+\.\d+)\.?\s*(.*)', msg) or \
                re.search(r'deprecated in Drupal\s+(\d+\.\d+\.\d+)\s+and\s+(?:will\s+be\s+)?removed\s+(?:before|from)\s+Drupal\s+(\d+\.\d+\.\d+)\.?\s*(.*)', msg)
            if not d:
                continue
            url = URL.search(msg)
            repl = re.sub(r'\s*See https://\S+', '', d.group(3)).strip()
            out.append({
                'symbol': current,
                'type': 'service',
                'deprecated_in': d.group(1),
                'removed_in': d.group(2),
                'replacement': repl,
                'change_record_url': url.group(0) if url else None,
                'source_file': rel,
                'source_tag': label,
            })
    return out


LIB_MSG = re.compile(
    r'deprecated in (?:drupal:|Drupal\s+)(\d+\.\d+\.\d+)\s+and\s+(?:is|will be)\s+removed\s+(?:from|in)\s+(?:drupal:|Drupal\s+)(\d+\.\d+\.\d+)\.?\s*(.*)', re.S)


def extract_libraries(label, root, rel):
    """*.libraries.yml entries with a top-level `deprecated:` message (anchors resolved)."""
    src = open(os.path.join(root, rel), encoding='utf-8', errors='replace').read()
    if 'deprecated:' not in src:
        return []
    ext = os.path.basename(rel).split('.libraries.yml')[0]
    anchors, out, current = {}, [], None
    for line in src.splitlines():
        m = re.match(r'^([\w.-]+):\s*$', line)
        if m:
            current = m.group(1)
            continue
        m = re.match(r'^  deprecated:\s*(?:&(\w+)\s+)?(?:\*(\w+)\s*)?(.*)$', line)
        if not (m and current):
            continue
        anchor, alias, msg = m.groups()
        msg = msg.strip().strip('"\'')
        if anchor:
            anchors[anchor] = msg
        if alias:
            msg = anchors.get(alias, '')
        d = LIB_MSG.search(msg)
        if not d:
            continue
        url = URL.search(msg)
        repl = re.sub(r'\s*See https://\S+', '', d.group(3)).strip()
        out.append({
            'symbol': ext + '/' + current,
            'type': 'library',
            'deprecated_in': d.group(1),
            'removed_in': d.group(2),
            'replacement': repl,
            'change_record_url': url.group(0).rstrip('.') if url else None,
            'source_file': rel,
            'source_tag': label,
        })
    return out


def main():
    out_path = sys.argv[1]
    found = {}
    for spec in sys.argv[2:]:
        label, root = spec.split('=', 1)
        for dp, dn, fn in os.walk(root):
            dn[:] = [d for d in dn if d not in ('tests', 'node_modules', 'vendor', '.git', 'assets')]
            for f in fn:
                rel = os.path.relpath(os.path.join(dp, f), root)
                if f.endswith(('.php', '.inc', '.module', '.theme', '.install', '.engine')):
                    items = extract_file(label, root, rel)
                elif f.endswith('.libraries.yml'):
                    items = extract_libraries(label, root, rel)
                elif f.endswith('.services.yml'):
                    items = extract_services(label, root, rel)
                else:
                    continue
                for it in items:
                    found[(it['type'], it['symbol'])] = it
    res = sorted(found.values(), key=lambda x: (x['removed_in'], x['symbol']))
    json.dump(res, open(out_path, 'w'), indent=1)
    print(len(res), 'candidates')


if __name__ == '__main__':
    main()
