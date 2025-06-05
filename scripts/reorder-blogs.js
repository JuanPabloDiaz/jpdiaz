import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = './src/content/blog';
const desiredOrder = ['title', 'description', 'pubDate', 'lang', 'tags', 'draft'];

function formatYamlValue(key, value) {
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "''")}'`; // Escapa comillas simples
  }
  if (key === 'pubDate' && value instanceof Date) {
    return value.toISOString().split('T')[0]; // Solo fecha
  }
  if (Array.isArray(value)) {
    return value.length
      ? `\n  - ${value.join('\n  - ')}`
      : '[]';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value;
}

function reorderFrontmatter(frontmatter) {
  const ordered = {};
  for (const key of desiredOrder) {
    if (key in frontmatter) ordered[key] = frontmatter[key];
  }
  for (const key of Object.keys(frontmatter)) {
    if (!(key in ordered)) ordered[key] = frontmatter[key];
  }
  return ordered;
}

function buildYaml(ordered) {
  return Object.entries(ordered)
    .map(([key, value]) => `${key}: ${formatYamlValue(key, value)}`)
    .join('\n');
}

function processMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  const ordered = reorderFrontmatter(parsed.data);
  const yaml = buildYaml(ordered);
  const content = parsed.content.trimStart();

  const final = `---\n${yaml}\n---\n\n${content}`;
  fs.writeFileSync(filePath, final, 'utf-8');
  console.log(`✅ Formatted: ${filePath}`);
}

function run() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    processMarkdownFile(path.join(BLOG_DIR, file));
  }
}

run();