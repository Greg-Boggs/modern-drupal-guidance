/**
 * Runs a rendered Drupal page's behaviors in a lightweight DOM (linkedom) so
 * graders can check what front-end JavaScript does without a browser.
 *
 * Only core's behavior plumbing (drupal.js, drupalSettingsLoader.js, once,
 * jQuery when present) and scripts from web/modules/custom/ are evaluated.
 * drupal.init.js is skipped; the grader calls Drupal.attachBehaviors itself.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { parseHTML } from 'linkedom';

const CORE_ALLOW = [
  /core\/assets\/vendor\/jquery\/jquery(\.min)?\.js$/,
  /core\/assets\/vendor\/once\/once(\.min)?\.js$/,
  /core\/misc\/drupalSettingsLoader\.js$/,
  /core\/misc\/drupal\.js$/,
];

export interface PageRuntime {
  document: any;
  window: any;
  scripts: string[];
  errors: string[];
  attach(context?: any): void;
}

export function loadPageRuntime(html: string, webRoot: string): PageRuntime {
  const { window, document } = parseHTML(html) as any;
  const errors: string[] = [];
  const scripts: string[] = [];

  const g: any = {
    window: null, document, console, navigator: { userAgent: 'bench' },
    setTimeout, clearTimeout, setInterval, clearInterval, queueMicrotask,
    location: { href: 'http://127.0.0.1/', pathname: '/', search: '', hash: '' },
    Proxy, Reflect, JSON, Math, Date, Object, Array, String, Number, Boolean, RegExp, Error, TypeError,
    Map, Set, WeakMap, WeakSet, Symbol, Promise, encodeURIComponent, decodeURIComponent, parseInt, parseFloat, isNaN,
  };
  for (const k of ['Node', 'Element', 'HTMLElement', 'NodeList', 'HTMLCollection', 'Event', 'CustomEvent', 'DocumentFragment', 'Text', 'MutationObserver', 'DOMParser', 'getComputedStyle']) {
    if (window[k]) g[k] = window[k];
  }
  g.window = g;
  g.self = g;
  g.globalThis = g;
  g.addEventListener = () => {};
  g.removeEventListener = () => {};
  g.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  vm.createContext(g);

  for (const el of document.querySelectorAll('script[src]')) {
    const src = String(el.getAttribute('src')).split('?')[0];
    const rel = src.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '');
    const allowed = CORE_ALLOW.some((re) => re.test(rel)) || rel.startsWith('modules/custom/');
    if (!allowed) continue;
    const file = path.join(webRoot, rel);
    if (!fs.existsSync(file)) {
      errors.push(`missing ${rel}`);
      continue;
    }
    scripts.push(rel);
    try {
      vm.runInContext(fs.readFileSync(file, 'utf8'), g, { filename: rel, timeout: 5000 });
    } catch (e: any) {
      errors.push(`${rel}: ${String(e?.message || e).slice(0, 300)}`);
    }
  }

  return {
    document, window: g, scripts, errors,
    attach(context = document) {
      if (!g.Drupal?.attachBehaviors) throw new Error('Drupal.attachBehaviors is not available');
      g.Drupal.attachBehaviors(context, g.drupalSettings || {});
    },
  };
}
