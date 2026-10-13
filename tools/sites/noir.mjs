// MAISON NOIR — dark, editorial luxury (references: Joseph Dirand, Pierre Yovanovitch, Terraza Balear).
import { img, linker, esc } from '../lib.mjs';
import { src } from '../images.mjs';

const site = {
  slug: 'noir', name: 'Maison Noir', theme: '#0d0c0b', ink: '#e9e2d6', letter: 'N',
  fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@300;400;500;600&display=swap',
  pt: 'panels', ptPanels: 5, ptLabel: '<span class="pt-logo">Maison <em>Noir</em></span>', cursor: true, js: true,
};

const projects = [
  { slug: 'avenue-montaigne', name: 'Avenue Montaigne', place: 'Paris, France', year: 2025, type: 'Residential', area: '420 m²',
    hero: 'L20', imgs: ['L11', 'B2', 'K9', 'T1', 'L23'],
    lede: 'A Haussmannian apartment stripped back to its bones, then dressed in smoked oak, Arabescato marble and silk the colour of tobacco.',
    text: ['The brief was a home for a collector who wanted the art to speak first. We removed three partition walls, lowered nothing and raised everything — the ceilings regained their original mouldings and the enfilade now runs uninterrupted for twenty-six metres.', 'Every surface was chosen to absorb light rather than reflect it. The result is an apartment that feels lit from within, even on the greyest Parisian afternoon.'] },
  { slug: 'villa-ombra', name: 'Villa Ombra', place: 'Saint-Tropez, France', year: 2024, type: 'Residential', area: '900 m²',
    hero: 'E1', imgs: ['L3', 'L29', 'B6', 'K6', 'E6'],
    lede: 'A summer house that turns its back on the glare — deep loggias, lime-washed walls and rooms that slide open to the pines.',
    text: ['Ombra means shade. The entire plan is organised around the movement of the sun: mornings in the east pavilion, long lunches under the pergola, evenings in a library that catches the last amber light.', 'Furniture was drawn in-house and built by artisans in the Var, using chestnut, raw linen and hand-thrown terracotta.'] },
  { slug: 'chalet-gris', name: 'Chalet Gris', place: 'Gstaad, Switzerland', year: 2024, type: 'Residential', area: '640 m²',
    hero: 'L9', imgs: ['L21', 'B7', 'L22', 'T3', 'L10'],
    lede: 'Alpine heritage translated into a palette of charcoal, felted wool and burnished bronze.',
    text: ['We kept the old larch structure visible and wrapped it with contemporary volumes in blackened steel. Fireplaces in hand-chiselled Pietra Grey anchor each level.', 'The spa level is carved into the mountain — a sequence of dark, warm rooms that lead to a single window framing the glacier.'] },
  { slug: 'hotel-lumiere', name: 'Hôtel Lumière', place: 'Monaco', year: 2023, type: 'Hospitality', area: '68 keys',
    hero: 'O10', imgs: ['O12', 'O7', 'O9', 'O8', 'O11'],
    lede: 'A boutique hotel where each corridor is a gallery and each suite is a private apartment on the Riviera.',
    text: ['Lumière was conceived as a house rather than a hotel. Guests enter through a library, dine in a salon and sleep in rooms where every object was sourced or commissioned for its place.', 'Our team handled interior architecture, furniture, lighting, uniforms and the hotel’s permanent art collection.'] },
  { slug: 'galerie-sept', name: 'Galerie Sept', place: 'London, UK', year: 2023, type: 'Commercial', area: '310 m²',
    hero: 'L12', imgs: ['D8', 'L17', 'L18', 'D10', 'L11'],
    lede: 'A design gallery in Mayfair conceived as a sequence of seven rooms, each with its own light and its own silence.',
    text: ['Walls in polished plaster shift from bone to graphite as visitors move deeper into the space. Plinths were carved from single blocks of travertine.', 'The final room is a black box: one piece, one light, one bench.'] },
];

const services = [
  { n: '01', t: 'Interior Architecture', d: 'Spatial planning, joinery, lighting design and full technical documentation — from the first sketch to the last brass detail.', i: 'L3' },
  { n: '02', t: 'Furniture & Objects', d: 'Bespoke pieces drawn in our studio and crafted by a circle of European ateliers we have worked with for nearly two decades.', i: 'D1' },
  { n: '03', t: 'Art Curation', d: 'Building collections that belong to their rooms: sourcing, commissioning and placing works with galleries across the world.', i: 'L12' },
  { n: '04', t: 'Project Direction', d: 'One team from concept to keys. We coordinate architects, builders and artisans so our clients only see the finished home.', i: 'L9' },
];

const header = (L) => `
<header class="hd" data-header>
  <a href="${L('noir/')}" class="hd__logo" aria-label="Maison Noir home">Maison <em>Noir</em></a>
  <nav class="hd__nav" aria-label="Main">
    <a href="${L('noir/projects/')}" class="u-link">Projects</a>
    <a href="${L('noir/studio/')}" class="u-link">Studio</a>
    <a href="${L('noir/services/')}" class="u-link">Services</a>
    <a href="${L('noir/contact/')}" class="hd__cta" data-magnetic>Enquire</a>
  </nav>
  <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span></button>
</header>
<div class="menu">
  <nav class="menu__nav">
    ${[['', 'Home'], ['projects/', 'Projects'], ['studio/', 'Studio'], ['services/', 'Services'], ['contact/', 'Contact']].map(([h, t], i) =>
      `<div class="line-mask"><a href="${L('noir/' + h)}" data-menu-item><sup>0${i + 1}</sup>${t}</a></div>`).join('')}
  </nav>
  <div class="menu__foot" data-menu-item>12 Rue de Lille, Paris — hello@maisonnoir.studio</div>
</div>`;

const footer = (L) => `
<footer class="ft">
  <div class="ft__marquee" data-marquee data-mq-speed="50"><div class="marquee__track"><span>Paris</span><i>✦</i><span>Monaco</span><i>✦</i><span>Gstaad</span><i>✦</i><span>London</span><i>✦</i><span>Dubai</span><i>✦</i></div></div>
  <div class="ft__cta">
    <p class="eyebrow" data-reveal>Have a project in mind?</p>
    <a href="${L('noir/contact/')}" class="ft__big" data-cursor-label="Write"><span data-split="chars">Let’s talk.</span></a>
  </div>
  <div class="ft__grid">
    <div><p class="eyebrow">Paris</p><p>12 Rue de Lille<br>75007 Paris</p><p class="ft__clock"><span data-clock="Europe/Paris"></span> local</p></div>
    <div><p class="eyebrow">Monaco</p><p>7 Avenue de Grande-Bretagne<br>98000 Monaco</p><p class="ft__clock"><span data-clock="Europe/Monaco"></span> local</p></div>
    <div><p class="eyebrow">Contact</p><p><a class="u-link" href="mailto:hello@maisonnoir.studio">hello@maisonnoir.studio</a><br><a class="u-link" href="tel:+33100000000">+33 1 00 00 00 00</a></p></div>
    <div><p class="eyebrow">Follow</p><p><a class="u-link" href="#">Instagram</a><br><a class="u-link" href="#">Pinterest</a><br><a class="u-link" href="#">LinkedIn</a></p></div>
  </div>
  <div class="ft__base"><span>© <span data-year></span> Maison Noir — Reference concept</span><a href="${L('')}" class="u-link">← All studios</a></div>
</footer>`;

const wrap = (L, inner) => `${header(L)}<main>${inner}</main>${footer(L)}`;

function home(path) {
  const L = linker(path);
  return {
    path, title: 'Maison Noir — Interior Architecture, Paris', desc: 'Quiet, crafted interiors for private residences and hotels.',
    body: `
<div class="preloader">
  <div class="preloader__name"><div class="line-mask"><span data-preloader-item>Maison</span></div><div class="line-mask"><em data-preloader-item>Noir</em></div></div>
  <div class="preloader__count" data-preloader-count>000</div>
  <div class="preloader__bar"><i data-preloader-bar></i></div>
</div>
${wrap(L, `
<section class="hero">
  <div class="hero__media media" data-img-reveal="up load" data-intro-delay="0">${img('L20', 'Dark, softly lit living room with sculptural furniture', { eager: true, cls: 'hero__img' })}</div>
  <div class="hero__shade"></div>
  <div class="hero__content">
    <p class="eyebrow" data-intro data-intro-delay="0.6">Interior Architecture — Paris / Monaco</p>
    <h1 class="hero__title"><span data-split="chars" data-split-load data-intro-delay="0.5">Silence,</span><span class="hero__title-2" data-split="chars" data-split-load data-intro-delay="0.7"><em>crafted.</em></span></h1>
    <div class="hero__row" data-intro data-intro-delay="1">
      <p>Residences, hotels and galleries<br>composed with restraint since 2007.</p>
      <a href="#works" class="hero__scroll" data-magnetic><span>Scroll</span><i></i></a>
    </div>
  </div>
</section>

<section class="intro wrap">
  <p class="eyebrow" data-reveal>( The Studio )</p>
  <p class="intro__text" data-fill>We compose interiors the way a composer writes a score — with restraint, rhythm and the quiet confidence of materials that age beautifully. Nothing is loud. Everything is considered.</p>
  <div class="intro__aside" data-reveal>
    <div class="media intro__img" data-img-reveal>${img('D1', 'Sculptural lounge chair', { w: 900, sizes: '(max-width: 800px) 60vw, 25vw' })}</div>
    <a href="${L('noir/studio/')}" class="btn-line">About the studio <span>→</span></a>
  </div>
</section>

<section class="works" id="works" data-hscroll>
  <div class="works__track" data-hscroll-track>
    <div class="works__intro">
      <p class="eyebrow">Selected Works ( 2023 — 2025 )</p>
      <h2 class="h-xl">Rooms that<br><em>hold</em> their<br>breath.</h2>
      <a href="${L('noir/projects/')}" class="btn-line">All projects <span>→</span></a>
    </div>
    ${projects.map((p, i) => `
    <a class="work" href="${L(`noir/projects/${p.slug}/`)}" data-cursor-label="View">
      <div class="work__media media">${img(p.hero, p.name, { w: 1200, sizes: '(max-width: 800px) 80vw, 40vw', attrs: 'data-hscroll-parallax' })}</div>
      <div class="work__meta"><span>0${i + 1}</span><h3>${p.name}</h3><span>${p.place}</span></div>
    </a>`).join('')}
  </div>
</section>

<section class="svc wrap">
  <div class="svc__head">
    <p class="eyebrow" data-reveal>( Expertise )</p>
    <h2 class="h-lg" data-split="lines">A single hand, from the plan<br>to the last <em>object.</em></h2>
  </div>
  <ul class="svc__list" data-preview-list>
    ${services.map((s) => `
    <li data-preview="${src(s.i, 800)}" data-reveal>
      <a href="${L('noir/services/')}"><span class="svc__n">${s.n}</span><span class="svc__t">${s.t}</span><span class="svc__d">${s.d}</span><span class="svc__arrow">→</span></a>
    </li>`).join('')}
  </ul>
</section>

<section class="stats wrap">
  ${[['18', 'Years of practice'], ['140', 'Residences delivered'], ['12', 'Countries'], ['9', 'International awards']].map(([n, t]) =>
    `<div class="stat" data-reveal><span class="stat__n" data-count="${n}">${n}</span><span class="stat__t">${t}</span></div>`).join('')}
</section>

<section class="quote">
  <div class="quote__media media">${img('L11', 'Dark marble and oak interior', { attrs: 'data-scale-scroll="1.3"' })}</div>
  <blockquote class="quote__text">
    <p data-split="lines">“Luxury is not what you add.<br>It is what you have the courage<br>to leave <em>out.</em>”</p>
    <cite data-reveal>— Céline Moreau, Founder</cite>
  </blockquote>
</section>

<section class="journal wrap">
  <div class="journal__head"><p class="eyebrow" data-reveal>( Notes from the studio )</p><h2 class="h-lg" data-split="lines">Journal</h2></div>
  <div class="journal__grid">
    ${[['B2', 'On the colour of shadows', 'Material — 6 min'], ['K9', 'Why we draw every handle', 'Craft — 4 min'], ['L23', 'Living with a collection', 'Art — 8 min']].map(([k, t, m]) => `
    <article class="jcard" data-reveal>
      <div class="media jcard__media">${img(k, t, { w: 900, sizes: '(max-width: 800px) 90vw, 30vw' })}</div>
      <p class="jcard__meta">${m}</p><h3>${t}</h3>
    </article>`).join('')}
  </div>
</section>
`)}`,
  };
}

function projectsIndex(path) {
  const L = linker(path);
  return {
    path, title: 'Projects — Maison Noir', desc: 'Selected residences, hotels and galleries by Maison Noir.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>( Index — ${projects.length} projects )</p>
  <h1 class="h-hero"><span data-split="chars" data-split-load>Selected</span> <em data-split="chars" data-split-load>works</em></h1>
</section>
<section class="plist wrap" data-preview-list>
  <div class="plist__row plist__row--head" data-intro><span>No.</span><span>Project</span><span>Location</span><span>Type</span><span>Year</span></div>
  ${projects.map((p, i) => `
  <a class="plist__row" href="${L(`noir/projects/${p.slug}/`)}" data-preview="${src(p.hero, 800)}" data-reveal>
    <span>0${i + 1}</span><span class="plist__name">${p.name}</span><span>${p.place}</span><span>${p.type}</span><span>${p.year}</span>
    <span class="plist__thumb media">${img(p.hero, '', { w: 600, sizes: '40vw' })}</span>
  </a>`).join('')}
</section>
<section class="pgrid wrap">
  ${projects.map((p, i) => `
  <a class="pgrid__item ${i % 3 === 0 ? 'is-wide' : ''}" href="${L(`noir/projects/${p.slug}/`)}" data-cursor-label="View">
    <div class="media pgrid__media" data-img-reveal>${img(p.hero, p.name, { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw', attrs: 'data-parallax="0.2"' })}</div>
    <div class="pgrid__meta"><h3>${p.name}</h3><span>${p.place} — ${p.year}</span></div>
  </a>`).join('')}
</section>`),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  const [a, b, c, d, e] = p.imgs;
  return {
    path, title: `${p.name} — Maison Noir`, desc: p.lede,
    body: wrap(L, `
<section class="pj-hero">
  <div class="pj-hero__head wrap">
    <p class="eyebrow" data-intro>${p.type} — ${p.place}</p>
    <h1 class="h-hero" data-split="chars" data-split-load>${p.name}</h1>
  </div>
  <div class="pj-hero__media media" data-img-reveal="mid load">${img(p.hero, p.name, { eager: true, attrs: 'data-parallax="0.18"' })}</div>
</section>
<section class="pj-info wrap">
  <dl class="pj-meta" data-stagger>
    <div><dt>Location</dt><dd>${p.place}</dd></div><div><dt>Year</dt><dd>${p.year}</dd></div>
    <div><dt>Programme</dt><dd>${p.type}</dd></div><div><dt>Surface</dt><dd>${p.area}</dd></div>
  </dl>
  <div class="pj-text">
    <p class="pj-lede" data-split="lines">${esc(p.lede)}</p>
    ${p.text.map((t) => `<p data-reveal>${esc(t)}</p>`).join('')}
  </div>
</section>
<section class="pj-gallery wrap">
  <div class="g g--full media" data-img-reveal>${img(a, p.name + ' interior', { attrs: 'data-parallax="0.2"' })}</div>
  <div class="g g--left media" data-img-reveal="left">${img(b, p.name + ' detail', { w: 1200, sizes: '(max-width: 800px) 100vw, 45vw', attrs: 'data-parallax="0.2"' })}</div>
  <div class="g g--right media" data-img-reveal="right">${img(c, p.name + ' room', { w: 1200, sizes: '(max-width: 800px) 100vw, 35vw', attrs: 'data-parallax="0.2"' })}</div>
  <p class="g-caption" data-fill>Every material was sampled on site, at every hour of the day, before a single drawing was finalised.</p>
  <div class="g g--mid media" data-img-reveal>${img(d, p.name + ' space', { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw', attrs: 'data-parallax="0.2"' })}</div>
  <div class="g g--full media" data-img-reveal="center">${img(e, p.name + ' view', { attrs: 'data-parallax="0.2"' })}</div>
</section>
<a class="next" href="${L(`noir/projects/${next.slug}/`)}" data-cursor-label="Next">
  <div class="next__media media">${img(next.hero, next.name, { attrs: 'data-scale-scroll="1.25"' })}</div>
  <div class="next__txt"><p class="eyebrow">Next project</p><h2 class="h-hero" data-split="chars">${next.name}</h2></div>
</a>`),
  };
}

function studio(path) {
  const L = linker(path);
  const team = [['P2', 'Céline Moreau', 'Founder & Creative Director'], ['P1', 'Antoine Lefèvre', 'Head of Architecture'], ['P5', 'Inès Duval', 'Furniture & Objects'], ['P6', 'Marc Olivier', 'Project Director']];
  return {
    path, title: 'Studio — Maison Noir', desc: 'A Paris studio of 24 architects, designers and makers.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>( The Studio )</p>
  <h1 class="h-hero"><span data-split="chars" data-split-load>A house of</span><br><em data-split="chars" data-split-load>quiet things</em></h1>
</section>
<section class="st-hero wrap">
  <div class="media st-hero__img" data-img-reveal="up load">${img('L22', 'Studio interior', { eager: true, attrs: 'data-parallax="0.2"' })}</div>
  <p class="st-hero__txt" data-reveal>Founded in Paris in 2007, Maison Noir is a studio of twenty-four architects, designers and makers working across Europe and the Gulf.</p>
</section>
<section class="intro wrap"><p class="intro__text" data-fill>We believe a room should be felt before it is seen — in the weight of a door, the temperature of stone under bare feet, the way evening light settles on a linen wall.</p></section>
<section class="values wrap">
  ${[['Restraint', 'We remove until only the essential remains — then we make the essential exceptional.'], ['Craft', 'Every piece is drawn by hand and built by artisans whose names we know.'], ['Time', 'We design for decades, choosing materials that grow more beautiful with use.']].map(([t, d], i) => `
  <div class="value" data-reveal><span class="value__n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>
<section class="team wrap">
  <h2 class="h-lg" data-split="lines">The people</h2>
  <div class="team__grid">
    ${team.map(([k, n, r]) => `<figure class="member" data-reveal><div class="media member__img">${img(k, n, { w: 700, sizes: '(max-width: 800px) 50vw, 22vw' })}</div><figcaption><strong>${n}</strong><span>${r}</span></figcaption></figure>`).join('')}
  </div>
</section>
<section class="awards wrap">
  <h2 class="h-lg" data-split="lines">Recognition</h2>
  <ul>${[['AD100', 'Architectural Digest', '2025'], ['Best Residential Interior', 'Dezeen Awards', '2024'], ['Hotel Design of the Year', 'Prix Villégiature', '2023'], ['Designer of the Year', 'Maison & Objet', '2021']].map(([a, b, c]) => `<li data-reveal><span>${a}</span><span>${b}</span><span>${c}</span></li>`).join('')}</ul>
</section>`),
  };
}

function servicesPage(path) {
  const L = linker(path);
  return {
    path, title: 'Services — Maison Noir', desc: 'Interior architecture, bespoke furniture, art curation and project direction.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>( Services )</p>
  <h1 class="h-hero"><span data-split="chars" data-split-load>What we</span> <em data-split="chars" data-split-load>make</em></h1>
</section>
<section class="acc wrap" data-acc data-acc-open>
  ${services.map((s) => `
  <div class="acc__item" data-acc-item data-reveal>
    <button class="acc__btn" data-acc-btn><span>${s.n}</span><span>${s.t}</span><i></i></button>
    <div data-acc-body><div class="acc__body"><p>${s.d}</p><div class="media acc__img">${img(s.i, s.t, { w: 1000, sizes: '(max-width: 800px) 90vw, 40vw' })}</div></div></div>
  </div>`).join('')}
</section>
<section class="process wrap">
  <h2 class="h-lg" data-split="lines">How a project <em>unfolds</em></h2>
  <div class="process__grid" data-stagger="0.12">
    ${[['Listening', 'Weeks', 'We visit, observe and interview — the brief is written together.'], ['Concept', '6–8 weeks', 'Plans, mood, materials and a first walk-through in 3D.'], ['Design', '3–6 months', 'Every detail is drawn: joinery, lighting, furniture, art.'], ['Realisation', '6–18 months', 'Site direction, artisans, installation and styling to the last flower.']].map(([t, d, p], i) => `
    <div class="step"><span class="step__n">0${i + 1}</span><h3>${t}</h3><span class="step__d">${d}</span><p>${p}</p></div>`).join('')}
  </div>
</section>
<section class="quote">
  <div class="quote__media media">${img('L21', 'Moody living room', { attrs: 'data-scale-scroll="1.3"' })}</div>
  <blockquote class="quote__text"><p data-split="lines">We take on only<br><em>eight</em> projects a year.</p><a href="${L('noir/contact/')}" class="btn-line" data-reveal>Start yours <span>→</span></a></blockquote>
</section>`),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'Contact — Maison Noir', desc: 'Begin a conversation with Maison Noir.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>( Contact )</p>
  <h1 class="h-hero"><span data-split="chars" data-split-load>Begin a</span><br><em data-split="chars" data-split-load>conversation</em></h1>
</section>
<section class="ct wrap">
  <div class="ct__aside" data-stagger>
    <p>Tell us about the place, the people who will live in it and the feeling you hope to find there. We answer every message personally within two working days.</p>
    <div><p class="eyebrow">Paris</p><p>12 Rue de Lille, 75007</p><p class="ft__clock"><span data-clock="Europe/Paris"></span></p></div>
    <div><p class="eyebrow">Monaco</p><p>7 Av. de Grande-Bretagne</p><p class="ft__clock"><span data-clock="Europe/Monaco"></span></p></div>
    <div class="media ct__img">${img('B2', 'Bedroom by Maison Noir', { w: 800, sizes: '(max-width: 800px) 90vw, 30vw' })}</div>
  </div>
  <div class="ct__form" data-form-wrap>
    <form data-form data-reveal>
      <label class="f"><span>Your name</span><input required name="name" autocomplete="name"></label>
      <label class="f"><span>Email</span><input required type="email" name="email" autocomplete="email"></label>
      <fieldset class="f-chips"><legend>Project</legend>
        ${['Residence', 'Hotel', 'Gallery / Retail', 'Yacht', 'Other'].map((t, i) => `<label><input type="radio" name="type" value="${t}" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}
      </fieldset>
      <fieldset class="f-chips"><legend>Budget</legend>
        ${['€500k – 1M', '€1M – 3M', '€3M +'].map((t, i) => `<label><input type="radio" name="budget" value="${t}" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}
      </fieldset>
      <label class="f"><span>Tell us more</span><textarea name="msg" rows="4"></textarea></label>
      <button class="btn-solid" data-magnetic>Send enquiry <span>→</span></button>
    </form>
    <div class="form-success"><h2 class="h-lg">Merci.</h2><p>Your message has reached the studio. Céline or one of the directors will be in touch shortly.</p></div>
  </div>
</section>`),
  };
}

export default {
  site,
  card: { title: 'Maison Noir', style: 'فخامة داكنة — Editorial', ref: 'Joseph Dirand · Pierre Yovanovitch', img: 'L20', color: '#0d0c0b', accent: '#b89b72',
    motion: 'Preloader عداد، انتقال ستائر، معرض أفقي مثبّت، مؤشر مخصص، معاينة صور عند المرور' },
  pages: () => [
    home('noir/index.html'),
    projectsIndex('noir/projects/index.html'),
    ...projects.map((p, i) => projectPage(`noir/projects/${p.slug}/index.html`, p, i)),
    studio('noir/studio/index.html'),
    servicesPage('noir/services/index.html'),
    contact('noir/contact/index.html'),
  ],
};
