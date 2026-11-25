// Reads guides at build time using the guide contract in ../README.md.
// guides/<category>/<slug>/guide.md with frontmatter: name, description,
// drupal-core (Composer constraint), optional draft. Drafts are skipped.
// Falls back to site/fixtures/guides when ../guides has no publishable guide.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

loadLanguages(["markup", "markup-templating", "php", "twig", "yaml", "javascript", "json", "bash", "css", "diff"]);

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const realDir = process.env.GUIDES_DIR
  ? path.resolve(process.env.GUIDES_DIR)
  : path.resolve(siteRoot, "..", "guides");
const fixtureDir = path.join(siteRoot, "fixtures", "guides");

const ALIASES = { js: "javascript", yml: "yaml", html: "markup", "html.twig": "twig", sh: "bash", shell: "bash", console: "bash", module: "php", inc: "php", theme: "php" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const md = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, lang) {
    const l = ALIASES[lang] || lang;
    const grammar = l && Prism.languages[l];
    const inner = grammar ? Prism.highlight(code, grammar, l) : esc(code);
    return `<pre class="language-${esc(l || "text")}" tabindex="0"><code class="language-${esc(l || "text")}">${inner}</code></pre>`;
  },
});

// Heading ids for in-page anchors.
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const defaultHeadingOpen = md.renderer.rules.heading_open;
md.core.ruler.push("heading_ids", (state) => {
  const seen = new Set();
  state.tokens.forEach((t, i) => {
    if (t.type !== "heading_open") return;
    let id = slugify(state.tokens[i + 1].content) || "section";
    let n = id, k = 2;
    while (seen.has(n)) n = `${id}-${k++}`;
    seen.add(n);
    t.attrSet("id", n);
  });
});
void defaultHeadingOpen;

const titleCase = (s) => s.split("-").map((w) => (w.length <= 3 && /^(php|oop|di|ui|js|sdc|ajax|sql|url|api|css|yaml|cli|mcp)$/i.test(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(" ");

function describeRange(c) {
  if (!c) return "All supported Drupal core versions";
  const parts = String(c).split("||").map((p) => p.trim()).filter(Boolean);
  const out = parts.map((p) => {
    let m;
    if ((m = p.match(/^>=\s*([\d.]+)$/))) return `Drupal ${m[1]} and later`;
    if ((m = p.match(/^\^\s*([\d.]+)$/))) return `Drupal ${m[1]} up to the next major`;
    if ((m = p.match(/^~\s*([\d.]+)$/))) return `Drupal ${m[1]} patch releases`;
    if ((m = p.match(/^([\d.]+)\.\*$/)) || (m = p.match(/^([\d.]+)\.x$/))) return `Drupal ${m[1]}.x`;
    if ((m = p.match(/^>=\s*([\d.]+)\s*<\s*([\d.]+)$/)) || (m = p.match(/^>=\s*([\d.]+)\s+<\s*([\d.]+)$/))) return `Drupal ${m[1]} to before ${m[2]}`;
    return `Drupal core ${p}`;
  });
  return out.join(", or ");
}

function walk(root) {
  const found = [];
  if (!fs.existsSync(root)) return found;
  for (const cat of fs.readdirSync(root, { withFileTypes: true })) {
    if (!cat.isDirectory() || cat.name.startsWith(".")) continue;
    for (const g of fs.readdirSync(path.join(root, cat.name), { withFileTypes: true })) {
      if (!g.isDirectory()) continue;
      const file = path.join(root, cat.name, g.name, "guide.md");
      if (fs.existsSync(file)) found.push({ category: cat.name, slug: g.name, file });
    }
  }
  return found;
}

function load(root) {
  const guides = [];
  for (const { category, slug, file } of walk(root)) {
    let data, content;
    try {
      ({ data, content } = matter(fs.readFileSync(file, "utf8")));
    } catch (e) {
      console.warn(`[guides] skipping ${file}: invalid frontmatter (${e.reason || e.message})`);
      continue;
    }
    if (data.draft) continue;
    if (!data.name || !data.description) {
      console.warn(`[guides] skipping ${file}: missing name or description`);
      continue;
    }
    if (data.name !== slug) console.warn(`[guides] ${file}: name "${data.name}" differs from slug "${slug}"`);
    const range = data["drupal-core"] ? String(data["drupal-core"]) : "";
    guides.push({
      id: `${category}/${slug}`,
      category,
      categoryTitle: titleCase(category),
      slug,
      name: data.name,
      title: data.title || titleCase(slug),
      description: String(data.description).trim(),
      range,
      rangeText: describeRange(range),
      isRoot: category === slug,
      url: `/guides/${category}/${slug}/`,
      html: md.render(content),
    });
  }
  return guides;
}

export default function () {
  let guides = load(realDir);
  let source = "guides";
  if (guides.length === 0) {
    guides = load(fixtureDir);
    source = "fixtures";
    console.warn(`[guides] no publishable guides in ${realDir}; using fixtures (${guides.length})`);
  }
  guides.sort((a, b) => (b.isRoot - a.isRoot) || a.title.localeCompare(b.title));
  const byCat = new Map();
  for (const g of guides) {
    if (!byCat.has(g.category)) byCat.set(g.category, { slug: g.category, title: g.categoryTitle, guides: [] });
    byCat.get(g.category).guides.push(g);
  }
  const categories = [...byCat.values()].sort((a, b) => a.title.localeCompare(b.title));
  console.log(`[guides] ${guides.length} guides from ${source} in ${categories.length} categories`);
  return { all: guides, categories, source };
}
