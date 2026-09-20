#!/usr/bin/env node
/**
 * add-book.js — one-command bookshelf importer.
 *
 *   node scripts/add-book.js <goodreads-url-or-id> [options]
 *
 * What it does:
 *   1. Extracts the Goodreads work id (and title slug) from the URL.
 *   2. Searches Open Library for the book; picks the best edition.
 *   3. Tries cover URLs in a proven order (ISBN route first, then cover-ID,
 *      then sibling editions) until one returns a real, big-enough JPEG.
 *   4. Downloads it into assets/img/books/<slug>.jpg (local-first shelf).
 *   5. Appends a ready-made entry to the BOOKS array in books-data.js.
 *   6. Syntax-checks the data file and prints a summary.
 *
 * Options:
 *   --isbn=9780...     Try this ISBN's cover first (skips search for covers).
 *   --cover-id=123     Open Library cover-ID to try (e.g. when ISBNs 404).
 *   --tags=a,b         Tag slugs from BOOK_TAGS (default: tech).
 *   --title="..."      Override the title stored in books-data.js.
 *   --author="..."     Override the author stored in books-data.js.
 *
 * Requires Node 18+ (global fetch). No dependencies.
 *
 * Examples:
 *   node scripts/add-book.js https://www.goodreads.com/book/show/25744928-deep-work
 *   node scripts/add-book.js 59616977 --tags=mindset
 *   node scripts/add-book.js https://www.goodreads.com/book/show/3735293-clean-code \
 *     --isbn=9780136083221 --tags=tech --title="Clean Code"
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'assets', 'js', 'books-data.js');
const COVERS_DIR = path.join(ROOT, 'assets', 'img', 'books');
const COVER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

const args = process.argv.slice(2);
const opt = {};
const positional = [];
for (const a of args) {
  const m = a.match(/^--([a-z-]+)=(.*)$/i);
  if (m) opt[m[1]] = m[2];
  else positional.push(a);
}

const die = (msg) => { console.error(`\n✗ ${msg}\n`); process.exit(1); };
const log = (msg) => console.log(`  ${msg}`);

// ---------- helpers ----------

function parseGoodreads(input) {
  if (!input) die('Usage: node scripts/add-book.js <goodreads-url-or-id> [options]');
  // Both slug styles: /book/show/25744928-deep-work and /book/show/4099.The_Pragmatic_Programmer
  const m = String(input).match(/goodreads\.com\/(?:en\/)?book\/show\/(\d+)(?:\.([A-Za-z0-9_]+)|-([a-z0-9-]+))?/i)
    || String(input).match(/^(\d+)(?:\.([A-Za-z0-9_]+)|-([a-z0-9-]+))?$/);
  if (!m) die(`Not a Goodreads book URL/id: "${input}"`);
  const dotSlug = m[2] || '';
  return { id: m[1], slug: dotSlug || m[3] || '', dot: Boolean(dotSlug) };
}

function slugifyTitle(title) {
  const main = String(title).split(/[:(\u2013\u2014]/)[0]; // drop subtitles/editions
  return main.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function titleCaseSlug(slug) {
  return slug.split('-').filter(Boolean).map(w =>
    w.length <= 1 ? w : w[0].toUpperCase() + w.slice(1)).join(' ');
}

/** Parse JPEG SOF marker for pixel dimensions; null if not a plain JPEG. */
function jpegDimensions(buf) {
  if (buf.length < 4 || buf[0] !== 0xFF || buf[1] !== 0xD8) return null;
  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xFF) { off++; continue; }
    const marker = buf[off + 1];
    if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
    }
    off += 2 + buf.readUInt16BE(off + 2);
  }
  return null;
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': COVER_UA }, redirect: 'follow' });
  if (!res.ok) return { ok: false, status: res.status };
  const buf = Buffer.from(await res.arrayBuffer());
  const dims = jpegDimensions(buf);
  if (!dims) return { ok: false, status: res.status, reason: 'not a JPEG' };
  return { ok: true, buf, dims, bytes: buf.length };
}

/** Try a list of cover URLs in order; return the first valid, big-enough image. */
async function tryCoverUrls(urls) {
  for (const url of urls) {
    process.stdout.write(`  trying ${shortUrl(url)} ... `);
    let r;
    try { r = await fetchBuffer(url); }
    catch (e) { console.log(`network error (${e.message})`); continue; }
    if (!r.ok) { console.log(r.reason || `HTTP ${r.status}`); continue; }
    if (r.dims.width < 180) { console.log(`too small (${r.dims.width}px wide)`); continue; }
    if (r.bytes < 4000) { console.log(`suspiciously tiny (${r.bytes}B)`); continue; }
    console.log(`OK ${r.dims.width}x${r.dims.height}, ${(r.bytes / 1024).toFixed(0)}KB`);
    return { url, buf: r.buf, dims: r.dims };
  }
  return null;
}

const shortUrl = (u) => u.replace(/^https:\/\/covers\.openlibrary\.org\//, 'OL:').replace(/\?default=false$/, '');

// ---------- main ----------

(async () => {
  if (!fs.existsSync(DATA_FILE)) die(`data file not found: ${DATA_FILE}`);
  const gr = parseGoodreads(positional[0]);
  console.log(`\nAdding Goodreads book ${gr.id}${gr.slug ? ` (${gr.slug})` : ''}\n`);

  // 1. Validate tag slugs against BOOK_TAGS before any network work.
  const dataSrc = fs.readFileSync(DATA_FILE, 'utf8');
  const tagSlugs = [...dataSrc.matchAll(/\{\s*slug:\s*'([^']+)'/g)].map(m => m[1]);
  const requestedTags = (opt.tags || 'tech').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
  const bad = requestedTags.filter(t => !tagSlugs.includes(t));
  if (bad.length) die(`Unknown tag(s): ${bad.join(', ')}. BOOK_TAGS has: ${tagSlugs.join(', ')}`);

  // 2. Find the book on Open Library (slug makes a great query).
  const q = (opt.title || gr.slug.replace(/[-_]/g, ' ') || 'a').trim();
  log(`Searching Open Library for "${q}" ...`);
  const searchUrl = 'https://openlibrary.org/search.json?q=' + encodeURIComponent(q) +
    '&fields=key,title,author_name,isbn,cover_i&limit=8';
  const res = await fetch(searchUrl, { headers: { 'User-Agent': COVER_UA } });
  if (!res.ok) die(`Open Library search failed: HTTP ${res.status}`);
  const docs = (await res.json()).docs || [];
  if (docs.length === 0) die('No Open Library results — add the entry by hand or pass --title.');

  // Prefer a doc whose title matches the slug-ish query; fall back to first.
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const want = norm(q);
  const doc = docs.find(d => norm(d.title) === want)
    || docs.find(d => norm(d.title).includes(want) || want.includes(norm(d.title)))
    || docs[0];
  const title = opt.title || doc.title;
  const author = opt.author || (doc.author_name || []).join(', ') || 'Unknown';
  log(`Matched: "${doc.title}" by ${(doc.author_name || []).join(', ')}${doc.key ? ` (${doc.key})` : ''}`);

  // 2. Build the cover-URL ladder (ISBN route first, then cover-ID, then siblings).
  const isbns = [opt.isbn, ...(doc.isbn || []).filter(x => x.length === 13)].filter(Boolean);
  // English editions first (978-0 / 978-1 prefixes): Open Library work records
  // aggregate every edition's ISBNs, and without this the cover may come from
  // a foreign printing with different cover text.
  const isEnglish = (i) => /^97[89]0/.test(i) || /^97[89]1/.test(i);
  isbns.sort((a, b) => (isEnglish(b) ? 1 : 0) - (isEnglish(a) ? 1 : 0));
  const urls = isbns.map(i => `https://covers.openlibrary.org/b/isbn/${i}-L.jpg?default=false`);
  if (opt['cover-id']) urls.unshift(`https://covers.openlibrary.org/b/id/${opt['cover-id']}-L.jpg?default=false`);
  if (doc.cover_i) urls.push(`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`);
  // Sibling editions as a last resort (worked for Clean Code / BASB before).
  for (const d of docs.slice(0, 3)) {
    if (d === doc) continue;
    if (d.cover_i) urls.push(`https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg?default=false`);
  }

  console.log('\nLooking for a cover:');
  const cover = await tryCoverUrls(urls);
  if (!cover) die('No valid cover found on Open Library. Try --cover-id=<n> or add manually.');

  // 3. Save the file (never overwrite an existing cover silently).
  const fileSlug = slugifyTitle(title);
  const fileName = `${fileSlug}.jpg`;
  const filePath = path.join(COVERS_DIR, fileName);
  if (fs.existsSync(filePath)) die(`${fileName} already exists — remove it first if you intend to replace it.`);
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  fs.writeFileSync(filePath, cover.buf);
  log(`Saved assets/img/books/${fileName}`);

  // 4. Append the entry inside BOOKS = [ ... ].
  const entry =
`  {
    title: ${JSON.stringify(title)},
    author: ${JSON.stringify(author)},
    tags: [${requestedTags.map(t => `"${t}"`).join(', ')}],
    cover: "assets/img/books/${fileName}",
    coverFallback: ${JSON.stringify(cover.url)},
    goodreads: "https://www.goodreads.com/book/show/${gr.id}${gr.slug ? (gr.dot ? `.${gr.slug}` : `-${gr.slug}`) : ''}"
  }`;
  const insertAt = dataSrc.lastIndexOf('];');
  if (insertAt === -1) die('Could not find the end of the BOOKS array in books-data.js');
  const before = dataSrc.slice(0, insertAt).replace(/,\s*$/, '').trimEnd();
  const after = dataSrc.slice(insertAt);
  const eol = dataSrc.includes('\r\n') ? '\r\n' : '\n';
  fs.writeFileSync(DATA_FILE, before + ',' + eol + entry.replace(/\n/g, eol) + eol + after);

  // 5. Syntax-check and report.
  const { execFileSync } = require('child_process');
  try { execFileSync(process.execPath, ['--check', DATA_FILE], { stdio: 'pipe' }); }
  catch (e) {
    fs.writeFileSync(DATA_FILE, dataSrc); fs.unlinkSync(filePath);
    die('The generated entry broke books-data.js — reverted. Bug report welcome.');
  }

  console.log(`
✓ Done: ${title} — ${author}
    tags: ${requestedTags.join(', ')}   cover: assets/img/books/${fileName} (${cover.dims.width}x${cover.dims.height})
    goodreads: https://www.goodreads.com/book/show/${gr.id}
  Edit assets/js/books-data.js to tweak the title, author, or tags.
`);
})().catch(e => die(e.message));
