#!/usr/bin/env node
/**
 * Hashes i18n JSON files in the build output and writes a manifest.
 *
 * Usage: node scripts/hash-i18n.mjs <i18n-dir>
 *
 * For every `<lang>.json` found, writes `<lang>.<sha256-prefix>.json`,
 * deletes the original, and emits a `manifest.json` of `{ <lang>: <hashed-filename> }`.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const i18nDir = process.argv[2];
if (!i18nDir) {
    console.error("[hash-i18n] missing target directory argument");
    process.exit(1);
}

const HASHED_RE = /\.[a-f0-9]{16}\.json$/;
const manifest = {};

for (const entry of readdirSync(i18nDir)) {
    if (!entry.endsWith(".json")) continue;
    if (entry === "manifest.json") continue;
    if (HASHED_RE.test(entry)) continue;

    const fullPath = join(i18nDir, entry);
    if (!statSync(fullPath).isFile()) continue;

    const lang = entry.slice(0, -".json".length);
    const content = readFileSync(fullPath);
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 16);
    const hashedName = `${lang}.${hash}.json`;
    renameSync(fullPath, join(i18nDir, hashedName));
    manifest[lang] = hashedName;
}

const manifestPath = join(i18nDir, "manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest));
console.log(`[hash-i18n] wrote ${manifestPath}`);
console.log(`[hash-i18n] manifest:`, manifest);
