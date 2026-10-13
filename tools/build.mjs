// Generates every static page of the reference sites.
// Usage: node tools/build.mjs   (output is written next to the repo root folders)
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const load = async (n) => (existsSync(join(here, 'sites', n + '.mjs')) ? (await import(`./sites/${n}.mjs`)).default : null);

const sites = (await Promise.all(['noir', 'nord', 'terra', 'vanta', 'dar', 'lumen'].map(load))).filter(Boolean);
const hub = await load('hub');

let count = 0;
for (const mod of [...sites, hub].filter(Boolean)) {
  const out = join(root, mod.site.slug === 'hub' ? '' : mod.site.slug);
  if (mod.site.slug !== 'hub' && existsSync(out)) rmSync(out, { recursive: true });
  for (const p of mod.pages(sites)) {
    const file = join(root, p.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(mod.site, p));
    count++;
  }
}
console.log(`Built ${count} pages.`);
