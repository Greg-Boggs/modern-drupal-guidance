#!/usr/bin/env node
/**
 * Fetches drupal/core change records from the drupal.org D7 REST API
 * (https://www.drupal.org/api-d7/node.json) into cache/, slowly and once.
 * Cached pages are never requested again unless --refresh is given.
 *
 * Usage: node import/change-records/fetch.mjs [--refresh] [--delay <ms>]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const cacheDir = path.join(here, 'cache', 'pages');
const pinFile = path.join(here, 'pin.json');
const API = 'https://www.drupal.org/api-d7/node.json';
const PROJECT_NID = '3060'; // drupal/core
const PAGE_SIZE = 50;
// Records introduced in 11.x were created after the 11.x branch work started.
// Stop paging once a whole page is older than this date.
const CUTOFF = '2023-01-01';
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) change-record-import/1.0';

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const di = args.indexOf('--delay');
const delay = di === -1 ? 6000 : Number(args[di + 1]);

const pageUrl = (page) =>
  `${API}?type=changenotice&field_project=${PROJECT_NID}&limit=${PAGE_SIZE}&sort=created&direction=DESC&page=${page}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(cacheDir, { recursive: true });
if (refresh) for (const f of fs.readdirSync(cacheDir)) fs.rmSync(path.join(cacheDir, f));

const cutoff = Date.parse(`${CUTOFF}T00:00:00Z`) / 1000;
let requested = 0;
for (let page = 0; ; page++) {
  const file = path.join(cacheDir, `page-${String(page).padStart(4, '0')}.json`);
  let data;
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } else {
    if (requested > 0) await sleep(delay);
    requested++;
    const url = pageUrl(page);
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' } });
    const type = res.headers.get('content-type') ?? '';
    const text = await res.text();
    if (!res.ok || !type.includes('json')) {
      // A block or bot challenge answers with HTML or an error code. Stop; never retry around it.
      console.error(`Stopped at page ${page}: HTTP ${res.status} ${type}. Nothing more requested.`);
      process.exit(1);
    }
    data = JSON.parse(text);
    fs.writeFileSync(file, JSON.stringify(data));
    console.log(`page ${page}: ${data.list.length} records`);
  }
  const list = data.list ?? [];
  if (list.length === 0 || list.every((n) => Number(n.created) < cutoff)) break;
}

const pin = { api: API, query: pageUrl('N'), cutoff: CUTOFF, fetched: new Date().toISOString().slice(0, 10) };
if (requested > 0 || !fs.existsSync(pinFile)) fs.writeFileSync(pinFile, JSON.stringify(pin, null, 2) + '\n');
console.log(`Done. ${requested} page(s) requested, the rest read from cache.`);
