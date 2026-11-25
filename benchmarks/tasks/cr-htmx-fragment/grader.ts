import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, practice } from '../_cr/lib.ts';

const M = 'bench_quote';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-quote returns 200 with the #bench-quote box and a "Next quote" button.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-quote');
        const btn = (r.body.match(/<button[^>]*>[\s\S]*?<\/button>/g) || []).some((b) => b.replace(/<[^>]+>/g, '').trim() === 'Next quote') || /<input[^>]+value="Next quote"/.test(r.body);
        return { pass: r.status === 200 && /id="bench-quote"/.test(r.body) && btn, detail: `status ${r.status} button=${btn}` };
      },
    },
    {
      id: 'htmx-attributes', kind: 'must', text: 'The button is wired declaratively with core\'s htmx attributes: (data-)hx-get points to /bench-quote/next and (data-)hx-target is #bench-quote.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-quote');
        const btn = (r.body.match(/<button[^>]*>[\s\S]*?<\/button>/g) || []).find((b) => /hx-get="[^"]*\/bench-quote\/next/.test(b)) || '';
        return { pass: r.status === 200 && /id="bench-quote"/.test(r.body) && /hx-target="#bench-quote"/.test(btn), detail: btn.slice(0, 300) || `status ${r.status}` };
      },
    },
    {
      id: 'library', kind: 'must', text: 'The page loads core\'s htmx library and its Drupal integration (htmx.min.js and htmx-behaviors.js).',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-quote');
        return /htmx\.min\.js/.test(r.body) && /htmx-behaviors\.js/.test(r.body);
      },
    },
    {
      id: 'fragment', kind: 'must', text: 'GET /bench-quote/next, with or without an HX-Request header, returns the quote without the theme\'s page regions (no <header or <footer element).',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        await ctx.http('/robots.txt');
        const plain = await fetch(`${ctx.baseUrl()}/bench-quote/next`);
        const hx = await fetch(`${ctx.baseUrl()}/bench-quote/next`, { headers: { 'HX-Request': 'true' } });
        const a = await plain.text();
        const b = await hx.text();
        const ok = (s: string) => s.includes('Quote: Simplicity is a prerequisite for reliability.') && !/<header[\s>]/.test(s) && !/<footer[\s>]/.test(s);
        return { pass: plain.status === 200 && ok(a) && ok(b), detail: `plain=${plain.status} ${a.length}b hx=${hx.status} ${b.length}b` };
      },
    },
    noPattern('no-custom-js', 'The module ships no JavaScript of its own.', mod(M), /[\s\S]+/, /\.js$/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['htmx-attributes', 'library', 'no-deprecated-api']);
