import fs from "node:fs";
import crypto from "node:crypto";
import matter from "@11ty/gray-matter";
import { marked } from "marked";
import {
  scanAllGuides,
  getGuideMarkdownPath,
  extractH1Heading,
  stripAllComments,
  isDraftStub,
} from "./guide-validation.ts";
import { replaceMacros, formatDrupalStatus, type BuildTarget } from "./macros.ts";
import { describeConstraint } from "./drupal-version.ts";
import { config } from "./skills-config.ts";

/** Content hash of a chunk's embedded text; stable across builds. */
export function computeChunkHash(embeddedText: string): string {
  return crypto.createHash("sha256").update(embeddedText).digest("hex");
}

export interface GuideChunk {
  guideId: string;
  category: string;
  embeddedText: string;
  hash: string;
}

export interface ParsedGuideFile {
  title: string;
  description: string;
  frontmatter: Record<string, unknown>;
  /** The guide's `drupal-core` Composer constraint. */
  drupalCore: string;
  processedMarkdown: string;
  includedFiles: Set<string>;
}

export interface ParseGuideFileOptions {
  filePath: string;
  target?: BuildTarget;
  includedFiles?: Set<string>;
}

/**
 * Reads and parses a guide markdown file, validates frontmatter, expands macros,
 * and extracts normalized title, description, and drupal-core constraint.
 *
 * Returns null if the guide is empty or a draft stub.
 */
export function parseGuideFile(
  options: ParseGuideFileOptions
): ParsedGuideFile | null {
  const { filePath, target = "skills-cli", includedFiles = new Set<string>() } = options;

  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdownBody, matter: frontmatter } = matter(content, {});

  if (stripAllComments(markdownBody).trim().length === 0 || isDraftStub(data.draft)) {
    return null;
  }
  if (!data.description || !frontmatter) {
    throw new Error(`Missing frontmatter or description in ${filePath}`);
  }
  const drupalCore = typeof data["drupal-core"] === "string" ? data["drupal-core"].trim() : "";
  if (!drupalCore) {
    throw new Error(`Missing "drupal-core" in frontmatter of ${filePath}`);
  }

  const expanded = replaceMacros(markdownBody, filePath, {
    target,
    includedFiles,
    drupalCore,
  });
  const processedMarkdown = ensureDrupalStatusLine(expanded, drupalCore);

  const h1Title = extractH1Heading(processedMarkdown);
  const title = (
    (typeof data.title === "string" && data.title.trim()) ||
    h1Title ||
    ""
  ).trim();
  if (!title) {
    throw new Error(`Guide has no H1 heading or frontmatter title: ${filePath}`);
  }

  return {
    title,
    description: data.description,
    frontmatter: data,
    drupalCore,
    processedMarkdown,
    includedFiles,
  };
}

/**
 * Every served guide states its core range near the top. If the author did not place
 * `{{ DRUPAL_STATUS() }}` themselves, insert its output right after the H1 (or at the top).
 */
export function ensureDrupalStatusLine(markdown: string, drupalCore: string): string {
  if (markdown.includes("**Drupal core:**")) return markdown;
  const status = formatDrupalStatus(drupalCore);
  const h1 = markdown.match(/^(\s*#\s+[^\n]*\n)/);
  if (h1) return `${h1[1]}\n${status}\n${markdown.slice(h1[1].length)}`;
  return `${status}\n\n${markdown}`;
}

/**
 * Splits markdown content by headings, grouping consecutive headings without body text.
 */
export function chunkMarkdown(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let hasNonHeadingContent = false;

  for (const token of tokens) {
    if (token.type === "heading") {
      if (currentChunk.length > 0 && hasNonHeadingContent) {
        chunks.push(currentChunk.join("\n\n"));
        currentChunk = [];
        hasNonHeadingContent = false;
      }
      currentChunk.push(token.raw);
    } else {
      currentChunk.push(token.raw);
      if (token.type !== "space") {
        hasNonHeadingContent = true;
      }
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join("\n\n"));
  }

  return chunks.filter((chunk) => chunk.trim().length > 0);
}

/**
 * Formats a consistent header prepended to every guide chunk before indexing, so every chunk
 * of a guide matches on the guide's title, id, category and core range.
 */
export function formatChunkHeader(
  title: string,
  id: string,
  category: string,
  drupalCore?: string
): string {
  const words = id.replaceAll("-", " ");
  const header = `${title}\n${id} (${category})${words !== id ? `\n${words}` : ""}`;
  if (!drupalCore) return header;
  let range: string;
  try {
    range = describeConstraint(drupalCore);
  } catch {
    range = `Drupal core ${drupalCore}`;
  }
  return `${header}\n${range}`;
}

export interface ExtractedGuideData {
  title: string;
  description: string;
  drupalCore: string;
  processedMarkdown: string;
  embeddedChunks: Array<{
    chunk: string;
    embeddedText: string;
    hash: string;
  }>;
}

export interface ExtractGuideChunksOptions {
  filePath: string;
  category: string;
  id: string;
  target?: BuildTarget;
  noChunking?: boolean;
  includedFiles?: Set<string>;
}

/**
 * Parses a guide markdown file via `parseGuideFile`, chunks the markdown (or preserves
 * single chunk if noChunking is true), formats the header, and generates embedded texts
 * with their deterministic chunk hashes.
 *
 * Returns null if the guide is a draft or empty stub.
 */
export function extractGuideChunks(
  options: ExtractGuideChunksOptions
): ExtractedGuideData | null {
  const {
    filePath,
    category,
    id,
    target = "skills-cli",
    noChunking = false,
    includedFiles,
  } = options;

  const parsed = parseGuideFile({ filePath, target, includedFiles });
  if (!parsed) {
    return null;
  }

  const { title, description, drupalCore, processedMarkdown } = parsed;

  const header = formatChunkHeader(title, id, category, drupalCore);
  const summaryChunk = `# ${title}\n\n${description}`;

  const chunks = noChunking
    ? [`${summaryChunk}\n\n${processedMarkdown.trim().replace(/^#\s+[^\n]*\n?/, "")}`]
    : [...chunkMarkdown(processedMarkdown), summaryChunk];

  const embeddedChunks = chunks.map((chunk) => {
    const embeddedText = `${header}\n\n${chunk}`;
    const hash = computeChunkHash(embeddedText);
    return { chunk, embeddedText, hash };
  });

  return {
    title,
    description,
    drupalCore,
    processedMarkdown,
    embeddedChunks,
  };
}

/**
 * Scans all published guides in the corpus and generates the exact list of
 * chunks that the search index embeds.
 */
export function scanCorpusChunks(target: BuildTarget = "skills-cli"): GuideChunk[] {
  const readyGuides = scanAllGuides().filter((inv) => {
    const excluded = config.monoskill.excludeFromBundling || [];
    return inv.isPublished && !excluded.includes(inv.category) && !excluded.includes(inv.name);
  });

  const allChunks: GuideChunk[] = [];

  for (const inv of readyGuides) {
    const guidePath = getGuideMarkdownPath(inv);
    const extracted = extractGuideChunks({
      filePath: guidePath,
      category: inv.category,
      id: inv.name,
      target,
    });

    if (!extracted) {
      continue;
    }

    for (const ec of extracted.embeddedChunks) {
      allChunks.push({
        guideId: inv.name,
        category: inv.category,
        embeddedText: ec.embeddedText,
        hash: ec.hash,
      });
    }
  }

  return allChunks;
}
