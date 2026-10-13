// NORDHAUS — Scandinavian calm (references: Norm Architects, Menu Space, Studio David Thulstrup).
import { img, linker, esc } from '../lib.mjs';

const site = {
  slug: 'nord', name: 'Nordhaus', theme: '#efebe4', ink: '#1d1c19', letter: 'n',
  fonts: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap',
  pt: 'wipe', ptPanels: 2, ptLabel: '<span class="pt-word">Nordhaus</span>', cursor: false, js: true,
};

const projects = [
  { slug: 'osterbro-apartment', name: 'Østerbro Apartment', place: 'Copenhagen', year: 2025, cat: 'residential', type: 'Residential', area: '186 m²',
    hero: 'A6', imgs: ['L13', 'K4', 'B1', 'L28', 'T4'], palette: ['#d9cfc0', '#b9a58a', '#6d6253', '#e9e5dd', '#3b3a35'],
    lede: 'A turn-of-the-century apartment returned to light: whitewashed floors, oiled oak joinery and nothing that does not need to be there.' },
  { slug: 'sommerhus-tisvilde', name: 'Sommerhus Tisvilde', place: 'Tisvilde, Denmark', year: 2024, cat: 'summer', type: 'Summer house', area: '142 m²',
    hero: 'E4', imgs: ['L15', 'K5', 'B3', 'E7', 'L27'], palette: ['#e7e0d3', '#a49b85', '#5d6650', '#cbbfa8', '#2f302b'],
    lede: 'A black timber cabin among the pines, warm inside with Douglas fir, wool and a kitchen built around the hearth.' },
  { slug: 'villa-bjerk', name: 'Villa Bjerk', place: 'Oslo, Norway', year: 2024, cat: 'residential', type: 'Residential', area: '310 m²',
    hero: 'L16', imgs: ['L30', 'K1', 'B4', 'L26', 'D3'], palette: ['#efeae2', '#c8bba6', '#857862', '#d8d3ca', '#22211e'],
    lede: 'A family home in birch and limestone, where every room opens toward the forest and the long northern light.' },
  { slug: 'atelier-vesterbro', name: 'Atelier Vesterbro', place: 'Copenhagen', year: 2023, cat: 'workspace', type: 'Workspace', area: '420 m²',
    hero: 'O3', imgs: ['O2', 'O1', 'D6', 'O5', 'O4'], palette: ['#ece7df', '#b3aa9a', '#545a4b', '#dcd5c8', '#1d1c19'],
    lede: 'A former print works turned into a creative office with long shared tables, quiet rooms and a library of materials.' },
  { slug: 'fjord-house', name: 'Fjord House', place: 'Bergen, Norway', year: 2023, cat: 'summer residential', type: 'Residential', area: '220 m²',
    hero: 'E5', imgs: ['L14', 'K8', 'B5', 'L7', 'E3'], palette: ['#e6e2db', '#9ea39a', '#56604f', '#c9c2b5', '#2a2c28'],
    lede: 'Concrete, glass and pale ash on the edge of the water — a house tuned to weather, tide and season.' },
];

const materials = [['Oiled oak', '#b48e62'], ['Raw linen', '#d8cfbf'], ['Limestone', '#cfc6b6'], ['Bouclé wool', '#ece6da'], ['Brushed brass', '#b39258'], ['Smoked ash', '#6f6252'], ['Clay plaster', '#c4a58a'], ['Basalt', '#3d3c39']];

const header = (L) => `
<header class="hd" data-header="hide">
  <nav class="hd__nav" aria-label="Main">
    <a href="${L('nord/projects/')}">Projects</a><a href="${L('nord/studio/')}">Studio</a><a href="${L('nord/services/')}">Services</a>
  </nav>
  <a href="${L('nord/')}" class="hd__logo">Nordhaus</a>
  <div class="hd__right"><a href="${L('nord/contact/')}" class="pill">Book a consultation</a>
    <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span></button></div>
</header>
<div class="menu">
  ${[['', 'Home'], ['projects/', 'Projects'], ['studio/', 'Studio'], ['services/', 'Services'], ['contact/', 'Contact']].map(([h, t]) =>
    `<div class="line-mask"><a href="${L('nord/' + h)}" data-menu-item>${t}</a></div>`).join('')}
  <p class="menu__foot" data-menu-item>Jægersborggade 14, Copenhagen</p>
</div>`;

const footer = (L) => `
<footer class="ft">
  <div class="ft__top wrap">
    <div class="ft__news">
      <h2 class="h-md" data-split="lines">Letters from the studio,<br><em>four times a year.</em></h2>
      <div class="ft__form" data-form-wrap><form data-form><input type="email" required placeholder="Your email" aria-label="Email"><button class="pill pill--dark">Subscribe</button></form><p class="form-success">Tak! You are on the list.</p></div>
    </div>
    <div class="ft__cols">
      <div><p class="lbl">Studio</p><p>Jægersborggade 14<br>2200 Copenhagen N</p></div>
      <div><p class="lbl">Say hej</p><p><a href="mailto:hej@nordhaus.studio">hej@nordhaus.studio</a><br>+45 00 00 00 00</p></div>
      <div><p class="lbl">Elsewhere</p><p><a href="#">Instagram</a><br><a href="#">Pinterest</a></p></div>
    </div>
  </div>
  <div class="ft__word" aria-hidden="true"><span data-split="chars">Nordhaus</span></div>
  <div class="ft__base wrap"><span>© <span data-year></span> Nordhaus ApS — Reference concept</span><a href="${L('')}">← All studios</a></div>
</footer>`;

const wrap = (L, inner) => `${header(L)}<main>${inner}</main>${footer(L)}`;
const card = (L, p, sizes) => `
<a class="pcard" href="${L(`nord/projects/${p.slug}/`)}">
  <div class="pcard__media media">${img(p.hero, p.name, { w: 1200, sizes })}</div>
  <div class="pcard__meta"><h3>${p.name}</h3><span>${p.place} · ${p.year}</span></div>
</a>`;

function home(path) {
  const L = linker(path);
  return {
    path, title: 'Nordhaus — Calm Scandinavian Interiors', desc: 'Interior design studio in Copenhagen. Calm, natural homes built to last.',
    body: wrap(L, `
<section class="hero wrap">
  <div class="hero__top">
    <h1 class="hero__title" data-split="lines" data-split-load>Rooms that <em>breathe.</em></h1>
    <div class="hero__aside" data-intro>
      <p>A Copenhagen studio designing calm, honest homes — natural materials, soft northern light and furniture made to outlive us.</p>
      <a href="${L('nord/projects/')}" class="arrow-link">See our homes <span>↗</span></a>
    </div>
  </div>
  <div class="hero__frame" data-intro="fade"><div class="hero__img media">${img('A6', 'Bright Scandinavian living room with oak floors', { eager: true })}</div></div>
</section>

<section class="philo wrap">
  <p class="lbl" data-reveal>01 — Philosophy</p>
  <p class="philo__text" data-fill>We believe a home should quiet the mind. So we begin with light, add only honest materials, and leave room for life to fill the rest.</p>
</section>

<section class="pillars wrap" data-stagger="0.12">
  ${[['Light', 'We study how daylight moves through each room across a year before we place a single wall.', 'M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10z'],
    ['Material', 'Wood, stone, wool, linen, clay. Surfaces that soften with use and are kind to the planet.', 'M3 7l9-4l9 4l-9 4zM3 12l9 4l9-4M3 17l9 4l9-4'],
    ['Proportion', 'Calm comes from measure — ceiling heights, sightlines and the rhythm of things placed with care.', 'M3 3h18v18H3zM3 12h18M12 3v18']].map(([t, d, ic]) => `
  <div class="pillar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ic}"/></svg><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>

<section class="recent wrap">
  <div class="sec-head"><p class="lbl" data-reveal>02 — Recent homes</p><a href="${L('nord/projects/')}" class="arrow-link" data-reveal>All projects <span>↗</span></a></div>
  <div class="recent__grid">
    <div class="recent__a" data-speed="0.05">${card(L, projects[0], '(max-width: 800px) 100vw, 55vw')}</div>
    <div class="recent__b" data-speed="0.25">${card(L, projects[1], '(max-width: 800px) 100vw, 35vw')}</div>
    <div class="recent__c" data-speed="0.12">${card(L, projects[2], '(max-width: 800px) 100vw, 40vw')}</div>
  </div>
</section>

<section class="mat">
  <p class="lbl wrap" data-reveal>03 — Our palette</p>
  <div class="mat__marquee" data-marquee data-mq-speed="45" data-scroll-dir>
    <div class="marquee__track">${materials.map(([n, c]) => `<span class="swatch"><i style="background:${c}"></i>${n}</span>`).join('')}</div>
  </div>
</section>

<section class="sticky wrap">
  <div class="sticky__media">
    ${['K4', 'B1', 'D3', 'L13'].map((k, i) => `<div class="sticky__img media ${i === 0 ? 'is-on' : ''}">${img(k, '', { w: 1200, sizes: '(max-width: 800px) 100vw, 45vw' })}</div>`).join('')}
  </div>
  <div class="sticky__list">
    <p class="lbl">04 — What we do</p>
    ${[['Full interior design', 'From floor plans to the last cushion. A complete, calm home delivered turnkey.'], ['Furniture & styling', 'Pieces from Danish makers, vintage finds and custom joinery from our own workshop.'], ['Kitchens & joinery', 'Kitchens in solid oak and stone, drawn in-house and built to last generations.'], ['Colour & light', 'Paint palettes and lighting plans that make even dark rooms feel generous.']].map(([t, d], i) => `
    <div class="sticky__item" data-idx="${i}"><span>0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
</section>

<section class="testi wrap">
  <p class="lbl" data-reveal>05 — Kind words</p>
  <div class="testi__slides" data-testi>
    ${[['“They listened more than they talked. Our home finally feels like us — just calmer.”', 'Signe & Mads, Østerbro'], ['“Every morning the light in the kitchen still surprises me. That was all their doing.”', 'Ingrid H., Oslo'], ['“The most considered team we have ever worked with. Nothing was left to chance.”', 'Vesterbro Studios']].map(([q, a], i) => `
    <blockquote class="testi__slide ${i === 0 ? 'is-on' : ''}"><p>${q}</p><cite>${a}</cite></blockquote>`).join('')}
  </div>
  <div class="testi__dots">${[0, 1, 2].map((i) => `<button aria-label="Show testimonial ${i + 1}" data-dot="${i}" class="${i === 0 ? 'is-on' : ''}"></button>`).join('')}</div>
</section>
`),
  };
}

function projectsIndex(path) {
  const L = linker(path);
  return {
    path, title: 'Projects — Nordhaus', desc: 'Homes, summer houses and workspaces by Nordhaus.',
    body: wrap(L, `
<section class="phead wrap">
  <h1 class="h-xl" data-split="lines" data-split-load>Homes we have <em>made</em></h1>
  <p class="phead__sub" data-intro>Every project starts with a conversation and ends with a key. Here are a few of the homes in between.</p>
</section>
<section class="filters wrap" data-filter-group>
  <div class="filters__bar" data-intro>
    ${[['all', 'All'], ['residential', 'Residential'], ['summer', 'Summer houses'], ['workspace', 'Workspaces']].map(([f, t], i) => `<button data-filter="${f}" class="${i === 0 ? 'is-active' : ''}" aria-pressed="${i === 0}">${t}</button>`).join('')}
  </div>
  <div class="filters__grid" data-filter-grid>
    ${projects.map((p) => `<div class="filters__item" data-cat="${p.cat}" data-reveal>${card(L, p, '(max-width: 800px) 100vw, 45vw')}</div>`).join('')}
  </div>
</section>`),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  return {
    path, title: `${p.name} — Nordhaus`, desc: p.lede,
    body: wrap(L, `
<section class="pj-hero">
  <div class="pj-hero__img media" data-img-reveal="center load">${img(p.hero, p.name, { eager: true, attrs: 'data-parallax="0.15"' })}</div>
  <div class="pj-hero__title wrap"><p class="lbl" data-intro>${p.type} · ${p.place}</p><h1 class="h-xl" data-split="lines" data-split-load>${p.name}</h1></div>
</section>
<section class="pj-split wrap">
  <aside class="pj-split__info">
    <p class="pj-lede" data-reveal>${esc(p.lede)}</p>
    <dl data-stagger>
      <div><dt>Year</dt><dd>${p.year}</dd></div><div><dt>Size</dt><dd>${p.area}</dd></div>
      <div><dt>Scope</dt><dd>Interior design, joinery, styling</dd></div><div><dt>Photography</dt><dd>Unsplash contributors</dd></div>
    </dl>
    <div class="pj-palette" data-stagger>${p.palette.map((c) => `<i style="background:${c}" title="${c}"></i>`).join('')}</div>
  </aside>
  <div class="pj-split__imgs">
    ${p.imgs.map((k, j) => `<div class="pj-img media ${j % 3 === 1 ? 'is-narrow' : ''}" data-img-reveal>${img(k, `${p.name} — view ${j + 1}`, { w: 1400, sizes: '(max-width: 800px) 100vw, 55vw', attrs: 'data-parallax="0.12"' })}</div>`).join('')}
  </div>
</section>
<section class="next wrap">
  <a href="${L(`nord/projects/${next.slug}/`)}" class="next__link">
    <p class="lbl">Next home</p>
    <h2 class="h-xl" data-split="lines">${next.name} <span class="next__arrow">→</span></h2>
    <div class="next__img media" data-img-reveal="mid">${img(next.hero, next.name, { w: 1600, attrs: 'data-scale-scroll="1.2"' })}</div>
  </a>
</section>`),
  };
}

function studio(path) {
  const L = linker(path);
  return {
    path, title: 'Studio — Nordhaus', desc: 'Meet the Nordhaus studio in Copenhagen.',
    body: wrap(L, `
<section class="phead wrap">
  <h1 class="h-xl" data-split="lines" data-split-load>Seven people,<br>one <em>quiet</em> idea.</h1>
</section>
<section class="st-img wrap"><div class="media st-img__in" data-img-reveal="mid load">${img('L28', 'Nordhaus studio', { eager: true, attrs: 'data-parallax="0.2"' })}</div></section>
<section class="philo wrap"><p class="lbl" data-reveal>Since 2014</p><p class="philo__text" data-fill>Nordhaus began at a kitchen table in Nørrebro. Ten years later we are architects, designers and one cabinet maker who still believe the best rooms are the ones you forget you are in.</p></section>
<section class="team wrap">
  ${[['P3', 'Freja Lund', 'Founder, interior architect'], ['P4', 'Jonas Berg', 'Architect MAA'], ['P7', 'Ida Holm', 'Designer & stylist'], ['P8', 'Emil Sørensen', 'Cabinet maker']].map(([k, n, r]) => `
  <figure class="member" data-reveal><div class="media member__img">${img(k, n, { w: 700, sizes: '(max-width: 800px) 50vw, 24vw' })}</div><figcaption><strong>${n}</strong>${r}</figcaption></figure>`).join('')}
</section>
<section class="timeline wrap">
  <p class="lbl" data-reveal>Milestones</p>
  ${[['2014', 'Studio founded in Nørrebro'], ['2017', 'First furniture collection with Danish makers'], ['2020', 'Our own joinery workshop opens'], ['2023', 'Featured in Kinfolk & Wallpaper*'], ['2025', '100th home completed']].map(([y, t]) => `
  <div class="tl" data-reveal><span>${y}</span><p>${t}</p></div>`).join('')}
</section>`),
  };
}

function servicesPage(path) {
  const L = linker(path);
  return {
    path, title: 'Services — Nordhaus', desc: 'Consultations, full interior design and turnkey projects.',
    body: wrap(L, `
<section class="phead wrap">
  <h1 class="h-xl" data-split="lines" data-split-load>Ways to <em>work</em> together</h1>
  <p class="phead__sub" data-intro>Whether you need a second opinion or a complete home, we have a way of working that fits.</p>
</section>
<section class="plans wrap" data-stagger="0.12">
  ${[['Consultation', 'From DKK 4.500', ['Two-hour home visit', 'Layout & colour advice', 'Shopping list of pieces'], 'B1'],
    ['Interior design', 'From DKK 85.000', ['Concept & floor plans', 'Material & colour palette', 'Furniture & lighting plan', 'Joinery drawings'], 'L13'],
    ['Turnkey', 'On request', ['Everything in Interior design', 'Contractor management', 'Purchasing & installation', 'Final styling — move in'], 'K4']].map(([t, pr, li, k], i) => `
  <article class="plan ${i === 1 ? 'is-featured' : ''}">
    <div class="media plan__img">${img(k, t, { w: 800, sizes: '(max-width: 800px) 100vw, 30vw' })}</div>
    <h3>${t}</h3><p class="plan__price">${pr}</p>
    <ul>${li.map((x) => `<li>${x}</li>`).join('')}</ul>
    <a href="${L('nord/contact/')}" class="pill ${i === 1 ? '' : 'pill--ghost'}">Enquire</a>
  </article>`).join('')}
</section>
<section class="faq wrap">
  <h2 class="h-md" data-split="lines">Questions we hear often</h2>
  <div data-acc>
    ${[['Do you work outside Denmark?', 'Yes — we have completed homes across Scandinavia, Germany and the UK, and we work remotely for consultations.'], ['How long does a project take?', 'A consultation takes a week. Full interior projects usually run from four to ten months depending on construction.'], ['Can we keep our existing furniture?', 'Always. The best homes mix old and new — we love designing around pieces with a story.'], ['Do you make custom furniture?', 'Our own workshop builds kitchens, wardrobes, shelving and tables in solid wood.']].map(([q, a]) => `
    <div class="faq__item" data-acc-item data-reveal><button class="faq__q" data-acc-btn>${q}<i>+</i></button><div data-acc-body><p class="faq__a">${a}</p></div></div>`).join('')}
  </div>
</section>`),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'Contact — Nordhaus', desc: 'Book a consultation with Nordhaus.',
    body: wrap(L, `
<section class="phead wrap"><h1 class="h-xl" data-split="lines" data-split-load>Hej. Let’s <em>talk</em> about home.</h1></section>
<section class="ct wrap">
  <div class="ct__form" data-form-wrap>
    <form data-form data-reveal>
      <div class="row"><label><span>Name</span><input required autocomplete="name"></label><label><span>Email</span><input required type="email" autocomplete="email"></label></div>
      <label><span>Where is your home?</span><input placeholder="City, country"></label>
      <label><span>What can we help with?</span><select><option>Consultation</option><option>Interior design</option><option>Turnkey project</option><option>Something else</option></select></label>
      <label><span>Message</span><textarea rows="5" placeholder="Tell us a little about your home and how you live in it"></textarea></label>
      <button class="pill pill--dark">Send message</button>
    </form>
    <div class="form-success"><h2 class="h-md">Tak — we got it.</h2><p>We reply to every message within two working days.</p></div>
  </div>
  <aside class="ct__aside" data-stagger>
    <div class="media ct__img">${img('L15', 'Nordhaus studio', { w: 900, sizes: '(max-width: 800px) 100vw, 35vw' })}</div>
    <p><strong>Studio</strong><br>Jægersborggade 14, 2200 Copenhagen N</p>
    <p><strong>Hours</strong><br>Mon–Thu 9–17 · Fri 9–15 · <span data-clock="Europe/Copenhagen"></span> now</p>
    <p><strong>Direct</strong><br><a href="mailto:hej@nordhaus.studio">hej@nordhaus.studio</a></p>
  </aside>
</section>`),
  };
}

export default {
  site,
  card: { title: 'Nordhaus', style: 'اسكندنافي هادئ — Minimal', ref: 'Norm Architects · Menu Space', img: 'A6', color: '#efebe4', accent: '#5e6b52',
    motion: 'صورة تتوسع مع السكرول، قسم مثبّت تتبدل صوره، فلترة مشاريع متحركة (Flip)، شريط خامات' },
  pages: () => [
    home('nord/index.html'),
    projectsIndex('nord/projects/index.html'),
    ...projects.map((p, i) => projectPage(`nord/projects/${p.slug}/index.html`, p, i)),
    studio('nord/studio/index.html'),
    servicesPage('nord/services/index.html'),
    contact('nord/contact/index.html'),
  ],
};
