import path from 'path';
import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';
import { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';
import { loadPageRuntime, type PageRuntime } from '../../../engine/src/grading/drupal/js-runtime.ts';

const M = 'bench_js';
let page: { html: string } | null = null;

async function articleHtml(ctx: GradeContext): Promise<string> {
  if (!page) {
    const nid = ctx.createNode('article', 'Bench badge article', "'body' => ['value' => '<p>Badge body</p>', 'format' => 'basic_html']");
    page = { html: (await ctx.http(`/node/${nid}`)).body };
  }
  return page.html;
}

async function runtime(ctx: GradeContext): Promise<PageRuntime | null> {
  if (!ctx.moduleEnabled(M)) return null;
  return loadPageRuntime(await articleHtml(ctx), path.join(ctx.site, 'web'));
}

function badgeCounts(doc: any): number[] {
  return [...doc.querySelectorAll('.node__content')].map((el: any) =>
    [...el.children].filter((c: any) => c.matches('span.bench-badge') && c.textContent.trim() === 'New').length
      + el.querySelectorAll('span.bench-badge').length - [...el.children].filter((c: any) => c.matches('span.bench-badge')).length);
}

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'library', kind: 'must', text: 'A module library depends on core/once and core/drupal.',
      run: async (ctx) => {
        page = null;
        if (!ctx.moduleEnabled(M)) return false;
        const r = ctx.phpEval(`print json_encode(\\Drupal::service('library.discovery')->getLibrariesByExtension('${M}'));`);
        const line = r.out.split('\n').pop() || '';
        const libs = line.startsWith('{') ? JSON.parse(line) : {};
        const ok = Object.values(libs).some((l: any) => (l.dependencies || []).includes('core/once') && (l.dependencies || []).includes('core/drupal'));
        return { pass: ok, detail: line.slice(0, 300) };
      },
    },
    {
      id: 'attached', kind: 'must', text: 'An article page loads a script from the module.',
      run: async (ctx) => ctx.moduleEnabled(M) && /<script[^>]+src="[^"]*modules\/custom\/bench_js\//.test(await articleHtml(ctx)),
    },
    {
      id: 'once-per-element', kind: 'must', text: 'Attaching behaviors twice leaves exactly one badge in every .node__content.',
      run: async (ctx) => {
        const rt = await runtime(ctx);
        if (!rt) return false;
        rt.attach();
        rt.attach();
        const counts = badgeCounts(rt.document);
        return { pass: counts.length > 0 && counts.every((c) => c === 1), detail: `counts=${JSON.stringify(counts)} scripts=${rt.scripts.join(',')} errors=${rt.errors.join('; ')}` };
      },
    },
    {
      id: 'ajax-content', kind: 'must', text: 'Content added later gets exactly one badge when behaviors are attached to it.',
      run: async (ctx) => {
        const rt = await runtime(ctx);
        if (!rt) return false;
        rt.attach();
        const wrapper = rt.document.createElement('div');
        wrapper.innerHTML = '<article><div class="node__content"><p>Loaded by AJAX</p></div></article>';
        rt.document.body.appendChild(wrapper);
        rt.attach(wrapper);
        rt.attach(rt.document);
        const counts = badgeCounts(rt.document);
        return { pass: counts.length > 1 && counts.every((c) => c === 1), detail: `counts=${JSON.stringify(counts)} errors=${rt.errors.join('; ')}` };
      },
    },
    noLegacyFindings(M, 'core-once-behaviors', 'No jQuery.once() or core/jquery.once (legacy-scan core-once-behaviors rules).'),
    {
      id: 'no-document-ready', kind: 'must_not', text: 'The module JavaScript does not use document ready handlers.',
      run: async (ctx) => {
        const js = ctx.readAll(moduleDir(M), '**/*.js');
        const bad = /\$\(\s*document\s*\)\.ready|jQuery\(\s*document\s*\)\.ready|\$\(\s*function|DOMContentLoaded/.exec(js);
        return { pass: !bad, detail: bad?.[0] };
      },
    },
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['library', 'no-legacy-pattern', 'no-document-ready', 'no-deprecated-api']);
