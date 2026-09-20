#!/usr/bin/env node
/**
 * Data-file validator for the portfolio site.
 *
 * Run:  node scripts/validate.js
 *
 * What it checks (all data files in assets/js/*-data.js):
 *   1. Syntax      — every file parses (executed in a sandboxed vm context).
 *   2. Loading     — index.html references every data file via <script src>.
 *   3. Images      — every referenced img/cover path exists on disk.
 *   4. Git covers  — every local book cover is TRACKED in git (prevents the
 *                    "entry shipped, cover didn't" incident).
 *   5. Tags        — every tags[] slug exists in the section's *_TAGS list.
 *   6. Duplicates  — no repeated titles/names within a section.
 *   7. Fields      — required fields present and well-formed per section.
 *
 * Exit code 1 on any error; prints an OK summary otherwise. Zero dependencies.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'assets', 'js');

/** @type {{file: string, msg: string}[]} */
const errors = [];
const err = (file, msg) => errors.push({ file, msg });

const DATA_FILES = [
  'socials-data.js',
  'achievements-data.js',
  'projects-data.js',
  'blogs-data.js',
  'books-data.js',
  'skills-data.js',
  'certifications-data.js',
  'peer-mentorship-data.js',
  'testimonials-data.js',
  'stats-data.js'
];

// Global each data file is expected to define (order matters for vm execution).
const EXPECTED_GLOBALS = {
  'socials-data.js': 'SOCIAL_LINKS',
  'achievements-data.js': 'ACHIEVEMENTS',
  'projects-data.js': 'PROJECTS',
  'blogs-data.js': 'BLOGS',
  'books-data.js': 'BOOKS',
  'skills-data.js': 'SKILLS',
  'certifications-data.js': 'CERTIFICATIONS',
  'peer-mentorship-data.js': 'MENTEE_TESTIMONIALS',
  'testimonials-data.js': 'TESTIMONIALS',
  'stats-data.js': 'MENTORSHIP_STATS'
};

const TAG_LISTS = {
  PROJECTS: 'PROJECT_TAGS',
  BLOGS: 'BLOG_TAGS',
  BOOKS: 'BOOK_TAGS',
  SKILLS: 'SKILL_TAGS',
  CERTIFICATIONS: 'CERT_TAGS'
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve an image reference (tolerates a leading "/") to a repo path. */
const imgPath = (src) => path.join(ROOT, String(src).replace(/^\//, ''));

const isHttpUrl = (s) => typeof s === 'string' && /^https:\/\/\S+$/.test(s);

const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;

/** Image files that count as "a real image" (<1KB is essentially always a stub/404 text; well-compressed flat-color banner PNGs legitimately land at 3-5KB). */
const looksLikeRealImage = (p) => {
  try {
    return fs.statSync(p).size >= 1024;
  } catch {
    return false;
  }
};

function gitTracked(relPaths) {
  const res = spawnSync('git', ['ls-files', '--', ...relPaths], { cwd: ROOT, encoding: 'utf8' });
  if (res.status !== 0) return null; // git unavailable — skip the check
  return new Set(res.stdout.split('\n').filter(Boolean));
}

// ---------------------------------------------------------------------------
// 1+2. Execute data files in one sandboxed context (syntax + globals)
// ---------------------------------------------------------------------------

const context = vm.createContext({ console: { warn: () => {}, log: () => {} } });
const loaded = [];

for (const file of DATA_FILES) {
  const full = path.join(DATA_DIR, file);
  if (!fs.existsSync(full)) {
    err(file, 'data file is missing');
    continue;
  }
  try {
    vm.runInContext(fs.readFileSync(full, 'utf8'), context, { filename: file });
    loaded.push(file);
  } catch (e) {
    err(file, `syntax/exec error: ${e.message}`);
  }
}

// Export the top-level `const` bindings (they don't land on the context object
// by themselves, same as `const` not creating window properties in browsers).
const exportSrc = `
  __exports = {};
  const __names = ${JSON.stringify([...Object.values(EXPECTED_GLOBALS), ...Object.values(TAG_LISTS)])};
  for (const name of __names) {
    try { __exports[name] = eval(name); } catch (e) { __exports[name] = undefined; }
  }
`;
vm.runInContext(exportSrc, context, { filename: '<export>' });
const G = context.__exports;

for (const file of loaded) {
  const globalName = EXPECTED_GLOBALS[file];
  if (!Array.isArray(G[globalName])) {
    err(file, `expected top-level const ${globalName} = [...] (missing or not an array)`);
  }
}

// ---------------------------------------------------------------------------
// 3. index.html must load every data file before main.js
// ---------------------------------------------------------------------------

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const file of DATA_FILES) {
  if (!indexHtml.includes(`assets/js/${file}`)) {
    err('index.html', `data file not referenced with a <script src>: ${file}`);
  }
}
const mainIdx = indexHtml.indexOf('assets/js/main.js');
for (const file of loaded) {
  if (mainIdx !== -1 && indexHtml.indexOf(`assets/js/${file}`) > mainIdx) {
    err('index.html', `${file} must be loaded BEFORE main.js`);
  }
}

// ---------------------------------------------------------------------------
// Shared per-item validators
// ---------------------------------------------------------------------------

function checkCover(item, file, label, { localRequired = true, remoteField = null } = {}) {
  if (!nonEmpty(item.cover)) {
    err(file, `${label}: "cover" is missing`);
  } else if (/^https?:/.test(item.cover)) {
    if (localRequired) err(file, `${label}: "cover" should be a LOCAL path (local-first convention), got ${item.cover}`);
  } else if (!fs.existsSync(imgPath(item.cover))) {
    err(file, `${label}: cover path does not exist: ${item.cover}`);
  } else if (!looksLikeRealImage(imgPath(item.cover))) {
    err(file, `${label}: cover is missing or suspiciously small (<5KB): ${item.cover}`);
  }
  if (item.coverWebp && !fs.existsSync(imgPath(item.coverWebp))) {
    err(file, `${label}: coverWebp path does not exist: ${item.coverWebp}`);
  }
  if (remoteField && item[remoteField] && !isHttpUrl(item[remoteField])) {
    err(file, `${label}: ${remoteField} must be an https URL, got: ${item[remoteField]}`);
  }
}

function checkTags(item, file, label, tagList, tagListName) {
  const valid = new Set((tagList || []).map((t) => t.slug));
  const tags = item.tags || [];
  if (!Array.isArray(tags) || tags.length === 0) {
    err(file, `${label}: has no tags`);
    return;
  }
  for (const t of tags) {
    if (!valid.has(t)) {
      const known = (tagList || []).map((t2) => t2.slug).join(', ');
      err(file, `${label}: unknown tag "${t}" (${tagListName} has: ${known})`);
    }
  }
}

function checkDuplicates(items, file, key, label) {
  const seen = new Map();
  for (const item of items) {
    const k = String(item[key] || '').toLowerCase().trim();
    if (!k) continue;
    if (seen.has(k)) err(file, `duplicate ${key} in ${label}: "${item[key]}"`);
    seen.set(k, true);
  }
}

function checkTagList(tagList, file, listName) {
  if (!Array.isArray(tagList) || tagList.length === 0) {
    err(file, `${listName} is missing or empty`);
    return;
  }
  const slugs = new Set();
  for (const t of tagList) {
    if (!nonEmpty(t.slug) || !nonEmpty(t.label)) {
      err(file, `${listName}: every entry needs slug + label`);
    }
    if (slugs.has(t.slug)) err(file, `${listName}: duplicate slug "${t.slug}"`);
    slugs.add(t.slug);
  }
}

// ---------------------------------------------------------------------------
// Per-section validation
// ---------------------------------------------------------------------------

checkTagList(G.PROJECT_TAGS, 'projects-data.js', 'PROJECT_TAGS');
for (const [i, p] of (G.PROJECTS || []).entries()) {
  const label = `project[${i}] ${p.title || '(untitled)'}`;
  if (!nonEmpty(p.title)) err('projects-data.js', `${label}: "title" is missing`);
  checkCover(p, 'projects-data.js', label);
  checkTags(p, 'projects-data.js', label, G.PROJECT_TAGS, 'PROJECT_TAGS');
  for (const [j, l] of (p.links || []).entries()) {
    if (!isHttpUrl(l.url)) err('projects-data.js', `${label}: links[${j}] url must be https, got: ${l.url}`);
    if (!nonEmpty(l.icon)) err('projects-data.js', `${label}: links[${j}] icon is missing`);
  }
}
checkDuplicates(G.PROJECTS || [], 'projects-data.js', 'title', 'PROJECTS');

checkTagList(G.BLOG_TAGS, 'blogs-data.js', 'BLOG_TAGS');
for (const [i, b] of (G.BLOGS || []).entries()) {
  const label = `blog[${i}] ${b.title || '(untitled)'}`;
  if (!nonEmpty(b.title)) err('blogs-data.js', `${label}: "title" is missing`);
  checkCover(b, 'blogs-data.js', label);
  checkTags(b, 'blogs-data.js', label, G.BLOG_TAGS, 'BLOG_TAGS');
  if (b.url && !isHttpUrl(b.url)) err('blogs-data.js', `${label}: url must be https`);
}
checkDuplicates(G.BLOGS || [], 'blogs-data.js', 'title', 'BLOGS');

checkTagList(G.BOOK_TAGS, 'books-data.js', 'BOOK_TAGS');
for (const [i, b] of (G.BOOKS || []).entries()) {
  const label = `book[${i}] ${b.title || '(untitled)'}`;
  if (!nonEmpty(b.title)) err('books-data.js', `${label}: "title" is missing`);
  if (!nonEmpty(b.author)) err('books-data.js', `${label}: "author" is missing`);
  checkCover(b, 'books-data.js', label, { remoteField: 'coverFallback' });
  if (!isHttpUrl(b.goodreads || '')) err('books-data.js', `${label}: goodreads link must be https`);
  checkTags(b, 'books-data.js', label, G.BOOK_TAGS, 'BOOK_TAGS');
}
checkDuplicates(G.BOOKS || [], 'books-data.js', 'title', 'BOOKS');

// Every local book cover must be tracked in git (the d047135 lesson).
const bookCovers = (G.BOOKS || [])
  .map((b) => b.cover)
  .filter((c) => nonEmpty(c) && !/^https?:/.test(c))
  .map((c) => String(c).replace(/^\//, ''));
const tracked = gitTracked([...new Set(bookCovers)]);
if (tracked) {
  for (const c of bookCovers) {
    if (!fs.existsSync(imgPath(c))) continue; // already reported above
    if (!tracked.has(c)) err('books-data.js', `cover exists on disk but is NOT tracked in git (it would 404 on Pages): ${c}`);
  }
}

checkTagList(G.SKILL_TAGS, 'skills-data.js', 'SKILL_TAGS');
for (const [i, s] of (G.SKILLS || []).entries()) {
  const label = `skill[${i}] ${s.name || '(unnamed)'}`;
  if (!nonEmpty(s.name)) err('skills-data.js', `${label}: "name" is missing`);
  if (!nonEmpty(s.img)) err('skills-data.js', `${label}: "img" is missing`);
  else if (!fs.existsSync(imgPath(s.img))) err('skills-data.js', `${label}: img path does not exist: ${s.img}`);
  checkTags(s, 'skills-data.js', label, G.SKILL_TAGS, 'SKILL_TAGS');
}
checkDuplicates(G.SKILLS || [], 'skills-data.js', 'name', 'SKILLS');

checkTagList(G.CERT_TAGS, 'certifications-data.js', 'CERT_TAGS');
for (const [i, c] of (G.CERTIFICATIONS || []).entries()) {
  const label = `cert[${i}] ${c.title || '(untitled)'}`;
  if (!nonEmpty(c.title)) err('certifications-data.js', `${label}: "title" is missing`);
  if (!nonEmpty(c.issuer)) err('certifications-data.js', `${label}: "issuer" is missing`);
  if (!nonEmpty(c.img)) err('certifications-data.js', `${label}: "img" is missing`);
  else if (!fs.existsSync(imgPath(c.img))) err('certifications-data.js', `${label}: img path does not exist: ${c.img}`);
  checkTags(c, 'certifications-data.js', label, G.CERT_TAGS, 'CERT_TAGS');
}

for (const [file, listName] of [['testimonials-data.js', 'TESTIMONIALS'], ['peer-mentorship-data.js', 'MENTEE_TESTIMONIALS']]) {
  for (const [i, t] of (G[listName] || []).entries()) {
    const label = `${listName}[${i}] ${t.name || '(unnamed)'}`;
    if (!nonEmpty(t.name)) err(file, `${label}: "name" is missing`);
    if (!nonEmpty(t.role)) err(file, `${label}: "role" is missing`);
    if (!nonEmpty(t.quote)) err(file, `${label}: "quote" is missing`);
    if (!nonEmpty(t.img)) err(file, `${label}: "img" is missing`);
    else if (!fs.existsSync(imgPath(t.img))) err(file, `${label}: img path does not exist: ${t.img}`);
  }
}

for (const [i, s] of (G.MENTORSHIP_STATS || []).entries()) {
  const label = `stat[${i}] ${s.label || '(unlabeled)'}`;
  if (!nonEmpty(s.label)) err('stats-data.js', `${label}: "label" is missing`);
  if (!nonEmpty(s.icon)) err('stats-data.js', `${label}: "icon" is missing`);
  const hasCount = s.count != null;
  const hasRating = s.rating != null;
  if (hasCount === hasRating) {
    err('stats-data.js', `${label}: define exactly one of "count" (number) or "rating" (string)`);
  }
  if (hasCount && !Number.isFinite(parseInt(s.count, 10))) {
    err('stats-data.js', `${label}: "count" must be a number, got: ${s.count}`);
  }
}

for (const [i, s] of (G.SOCIAL_LINKS || []).entries()) {
  const label = `social[${i}] ${s.name || '(unnamed)'}`;
  if (!nonEmpty(s.name)) err('socials-data.js', `${label}: "name" is missing`);
  if (!isHttpUrl(s.url || '')) err('socials-data.js', `${label}: "url" must be https, got: ${s.url}`);
  const hasIcon = nonEmpty(s.icon);
  const hasImg = nonEmpty(s.img);
  if (hasIcon === hasImg) {
    err('socials-data.js', `${label}: define exactly one of "icon" or "img"`);
  }
  if (hasImg && !fs.existsSync(imgPath(s.img))) err('socials-data.js', `${label}: img path does not exist: ${s.img}`);
  if (s.imgFooter && !fs.existsSync(imgPath(s.imgFooter))) err('socials-data.js', `${label}: imgFooter path does not exist: ${s.imgFooter}`);
}
checkDuplicates(G.SOCIAL_LINKS || [], 'socials-data.js', 'cssClass', 'SOCIAL_LINKS');

for (const [i, a] of (G.ACHIEVEMENTS || []).entries()) {
  const label = `achievement[${i}]`;
  if (!Number.isInteger(a.year)) err('achievements-data.js', `${label}: "year" must be a number, got: ${a.year}`);
  if (!nonEmpty(a.html)) err('achievements-data.js', `${label}: "html" is missing`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const itemCounts = [
  `projects=${(G.PROJECTS || []).length}`,
  `blogs=${(G.BLOGS || []).length}`,
  `books=${(G.BOOKS || []).length}`,
  `skills=${(G.SKILLS || []).length}`,
  `certs=${(G.CERTIFICATIONS || []).length}`,
  `testimonials=${(G.TESTIMONIALS || []).length}`,
  `mentees=${(G.MENTEE_TESTIMONIALS || []).length}`,
  `stats=${(G.MENTORSHIP_STATS || []).length}`,
  `socials=${(G.SOCIAL_LINKS || []).length}`,
  `achievements=${(G.ACHIEVEMENTS || []).length}`
].join(' ');

if (errors.length) {
  console.error(`\n❌ Validation FAILED — ${errors.length} issue(s):\n`);
  for (const { file, msg } of errors) console.error(`  ✗ [${file}] ${msg}`);
  console.error(`\nChecked: ${itemCounts}\n`);
  process.exit(1);
} else {
  console.log(`\n✅ All data files valid — ${itemCounts}\n`);
}
