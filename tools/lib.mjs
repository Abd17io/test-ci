import { src, FALLBACK } from './images.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Relative prefix from a page path (e.g. "noir/projects/x/index.html" -> "../../../").
export const prefixFor = (path) => '../'.repeat(path.split('/').length - 1);

/** Responsive <img>. `key` is an IMG key or raw Unsplash id. */
export function img(key, alt = '', { cls = '', w = 1600, eager = false, sizes = '100vw', attrs = '' } = {}) {
  const widths = [480, 800, 1200, 1600, 2200].filter((x) => x <= Math.max(w, 800) * 1.4);
  const srcset = widths.map((x) => `${src(key, x)} ${x}w`).join(', ');
  return `<img src="${src(key, w)}" srcset="${srcset}" sizes="${sizes}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${attrs}>`;
}

const favicon = (letter, bg, fg) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${bg}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="38" fill="${fg}">${letter}</text></svg>`)}`;

/**
 * Full HTML document for one page.
 * site: { slug, name, lang, dir, fonts, theme, ink, letter, pt, ptPanels, ptLabel, cursor }
 */
export function page(site, { path, title, desc, body, bodyClass = '', absolute = false }) {
  const R = absolute ? '/' : prefixFor(path);
  const panels = Array.from({ length: site.ptPanels || 1 }, () => '<div class="pt__panel"></div>').join('');
  return `<!doctype html>
<html lang="${site.lang || 'en'}" dir="${site.dir || 'ltr'}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="${site.theme}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="${favicon(site.letter, site.theme, site.ink)}">
<script>
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
window.__FALLBACK__ = ${JSON.stringify(FALLBACK)};
setTimeout(function () { if (!window.__STUDIO_STARTED__) document.documentElement.classList.remove('js'); }, 5000);
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="${site.fonts}">
<link rel="stylesheet" href="${R}assets/core.css">
<link rel="stylesheet" href="${R}assets/sites/${site.slug}.css">
</head>
<body class="s-${site.slug} ${bodyClass}" data-pt="${site.pt || 'fade'}"${site.cursor ? ' data-cursor' : ''}>
<div class="pt" aria-hidden="true">${panels}${site.ptLabel ? `<div class="pt__label">${site.ptLabel}</div>` : ''}</div>
${site.cursor ? '<div class="cursor" aria-hidden="true"><div class="cursor__dot"></div><div class="cursor__label"></div></div>' : ''}
${body}
<script src="${R}assets/vendor/gsap.min.js"></script>
<script src="${R}assets/vendor/ScrollTrigger.min.js"></script>
<script src="${R}assets/vendor/SplitText.min.js"></script>
<script src="${R}assets/vendor/Flip.min.js"></script>
<script src="${R}assets/vendor/lenis.min.js"></script>
<script src="${R}assets/core.js"></script>
${site.js ? `<script src="${R}assets/sites/${site.slug}.js"></script>` : ''}
</body>
</html>
`;
}

/** Link helper bound to a page path: L('noir/projects/') -> relative URL. */
export const linker = (path) => (to = '') => prefixFor(path) + to;
