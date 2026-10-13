// ATELIER TERRA — warm Mediterranean & organic (references: Studio KO, Cathie Hong, India Mahdavi).
import { img, linker, esc } from '../lib.mjs';

const site = {
  slug: 'terra', name: 'Atelier Terra', theme: '#efe4d6', ink: '#b65a36', letter: 'T',
  fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=Outfit:wght@300;400;500&display=swap',
  pt: 'circle', ptPanels: 1, ptLabel: '<svg class="pt-sun" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="18"/><g>' +
    Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="14" x2="50" y2="24" transform="rotate(${i * 30} 50 50)"/>`).join('') + '</g></svg>', cursor: true, js: true,
};

const projects = [
  { slug: 'casa-olivo', name: 'Casa Olivo', place: 'Mallorca, Spain', year: 2025, type: 'Finca', hero: 'E2', imgs: ['L1', 'K2', 'B8', 'L2', 'L6'],
    lede: 'A 17th-century finca among olive groves, softened with lime plaster, reclaimed terracotta and linen in every shade of sand.' },
  { slug: 'masseria-luce', name: 'Masseria Luce', place: 'Puglia, Italy', year: 2024, type: 'Country house', hero: 'E6', imgs: ['L4', 'K3', 'B5', 'L8', 'D4'],
    lede: 'A fortified farmhouse turned family retreat — vaulted stone rooms, hand-painted tiles and long tables under the fig tree.' },
  { slug: 'riad-zitoun', name: 'Riad Zitoun', place: 'Marrakech, Morocco', year: 2024, type: 'Guest house', hero: 'L25', imgs: ['L24', 'T2', 'B3', 'D7', 'L19'],
    lede: 'Seven rooms around a courtyard of orange trees, finished in tadelakt, cedar and zellige glazed the colour of pomegranate.' },
  { slug: 'villa-kalo', name: 'Villa Kalo', place: 'Paros, Greece', year: 2023, type: 'Summer villa', hero: 'E3', imgs: ['L5', 'K6', 'B4', 'L19', 'E1'],
    lede: 'Whitewashed volumes stepping toward the Aegean, with built-in benches, woven shade and furniture in sun-bleached oak.' },
  { slug: 'taverna-sol', name: 'Taverna Sol', place: 'Lisbon, Portugal', year: 2023, type: 'Restaurant', hero: 'O13', imgs: ['O6', 'O14', 'O15', 'O7', 'D4'],
    lede: 'A neighbourhood restaurant in Alfama with clay walls, a tiled bar and a terrace that catches the last sun over the Tagus.' },
];

const nav = [['', 'Home'], ['projects/', 'Projects'], ['studio/', 'Studio'], ['services/', 'Services'], ['contact/', 'Contact']];
const badge = (text) => `<svg class="badge__svg" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#circ">${text}</textPath></text></svg>`;

const header = (L) => `
<header class="hd" data-header>
  <a href="${L('terra/')}" class="hd__logo"><span class="hd__arch"></span>Atelier Terra</a>
  <nav class="hd__nav" aria-label="Main">${nav.slice(1).map(([h, t]) => `<a href="${L('terra/' + h)}">${t}</a>`).join('')}</nav>
  <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="Menu">Menu</button>
</header>
<div class="menu">
  <div class="menu__arch"></div>
  <nav>${nav.map(([h, t]) => `<div class="line-mask"><a href="${L('terra/' + h)}" data-menu-item>${t}</a></div>`).join('')}</nav>
  <p class="menu__foot" data-menu-item>Carrer de Sant Miquel 21, Palma</p>
</div>`;

const footer = (L) => `
<footer class="ft" data-bg="#3b2a20" data-ink="#f3e9dc">
  <div class="ft__strip" data-marquee data-mq-speed="35">
    <div class="marquee__track">${['L1', 'K2', 'L25', 'E2', 'L4', 'B8', 'D7', 'L24'].map((k) => `<div class="ft__ph media">${img(k, '', { w: 500, sizes: '220px' })}</div>`).join('')}</div>
  </div>
  <div class="ft__main wrap">
    <h2 class="ft__title" data-split="lines">Come in,<br><em>stay a while.</em></h2>
    <a href="${L('terra/contact/')}" class="ft__btn" data-magnetic><span>Start a project</span></a>
  </div>
  <div class="ft__cols wrap">
    <p>Carrer de Sant Miquel 21<br>07002 Palma de Mallorca</p>
    <p><a href="mailto:hola@atelierterra.studio">hola@atelierterra.studio</a><br>+34 900 000 000</p>
    <p><a href="#">Instagram</a> · <a href="#">Pinterest</a></p>
    <p>© <span data-year></span> Atelier Terra — concept<br><a href="${L('')}">← All studios</a></p>
  </div>
</footer>`;

const wrap = (L, inner) => `${header(L)}<main>${inner}</main>${footer(L)}`;

function home(path) {
  const L = linker(path);
  return {
    path, title: 'Atelier Terra — Mediterranean Interiors', desc: 'Warm, earthy interiors rooted in Mediterranean craft.',
    body: wrap(L, `
<section class="hero wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <h1 class="hero__title"><span data-split="words" data-split-load>Homes shaped</span><span data-split="words" data-split-load>by <em>sun</em> &amp; <em>earth</em></span></h1>
  <div class="hero__arches">
    <div class="arch arch--1 media" data-img-reveal="up load" data-intro-delay="0.3">${img('L1', 'Sunlit living room with plaster walls', { eager: true, w: 900, sizes: '(max-width: 800px) 45vw, 26vw' })}</div>
    <div class="arch arch--2 media" data-img-reveal="up load" data-intro-delay="0.45">${img('E2', 'Mediterranean stone house', { eager: true, w: 1100, sizes: '(max-width: 800px) 60vw, 34vw' })}</div>
    <div class="arch arch--3 media" data-img-reveal="up load" data-intro-delay="0.6">${img('K2', 'Rustic kitchen with clay tones', { eager: true, w: 900, sizes: '(max-width: 800px) 45vw, 26vw' })}</div>
    <a href="${L('terra/projects/')}" class="badge" data-intro="scale" data-intro-delay="1">${badge('Atelier Terra · Mediterranean living · Est. 2012 · ')}<span class="badge__c">↓</span></a>
  </div>
  <p class="hero__sub" data-intro data-intro-delay="0.9">Interior design studio in Palma de Mallorca — creating sun-warmed homes, hotels and restaurants around the Mediterranean.</p>
</section>

<section class="about wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <p class="about__text" data-fill>We work with what the land gives us — lime, clay, stone, olive wood and linen — and with the artisans who still know how to shape them by hand.</p>
  <div class="about__row">
    ${[['12', 'years by the sea'], ['86', 'homes & hotels'], ['40+', 'local artisans']].map(([n, t]) => `<div data-reveal><strong ${/\d+$/.test(n) ? `data-count="${n}"` : ''}>${n}</strong><span>${t}</span></div>`).join('')}
  </div>
</section>

<section class="stack" data-bg="#b65a36" data-ink="#f7efe4">
  <div class="stack__head wrap"><p class="tag" data-reveal>Selected projects</p><h2 class="h-xl" data-split="words">Places with a <em>pulse</em></h2></div>
  <div class="stack__cards wrap">
    ${projects.slice(0, 4).map((p, i) => `
    <a class="scard" href="${L(`terra/projects/${p.slug}/`)}" style="--i:${i}" data-cursor-label="Visit">
      <div class="scard__txt"><span class="tag">0${i + 1} — ${p.type}</span><h3>${p.name}</h3><p>${esc(p.lede)}</p><span class="scard__place">${p.place}</span></div>
      <div class="scard__img media">${img(p.hero, p.name, { w: 1200, sizes: '(max-width: 800px) 90vw, 50vw' })}</div>
    </a>`).join('')}
  </div>
</section>

<section class="process wrap" data-bg="#6b6b3a" data-ink="#f3eedd">
  <h2 class="h-xl" data-split="words">From soil <em>to</em> soul</h2>
  <div class="process__path">
    <svg class="process__line" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true"><path d="M0,200 C150,40 300,360 500,200 S850,40 1000,200"/></svg>
    ${[['Walk', 'We walk the land and the house with you, listening to how you want to live.'], ['Gather', 'Samples of stone, clay and cloth from local makers are laid out on our studio table.'], ['Draw', 'Plans, elevations and hand sketches of every niche, arch and bench.'], ['Build', 'We stay on site with masons and craftspeople until the last tile is laid.']].map(([t, d], i) => `
    <div class="pstep" data-reveal><span>${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
</section>

<section class="materials wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <div class="materials__head"><p class="tag" data-reveal>The palette</p><h2 class="h-xl" data-split="words">Made of <em>place</em></h2></div>
  <div class="materials__grid">
    ${[['Lime plaster', 'Breathable walls that glow in low sun.', 'L2'], ['Terracotta', 'Hand-fired tiles from Felanitx kilns.', 'L4'], ['Olive wood', 'Fallen trees turned into tables and bowls.', 'D7'], ['Marès stone', 'The golden sandstone of Mallorca.', 'E2']].map(([t, d, k]) => `
    <div class="mat" data-reveal><div class="mat__img media">${img(k, t, { w: 700, sizes: '(max-width: 800px) 45vw, 22vw' })}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
</section>

<section class="quote wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <div class="quote__arch media" data-img-reveal>${img('L24', 'Courtyard in Riad Zitoun', { w: 900, sizes: '(max-width: 800px) 70vw, 30vw', attrs: 'data-parallax="0.2"' })}</div>
  <blockquote><p data-split="lines">“They didn’t decorate our house. They gave it back its <em>memory</em>.”</p><cite data-reveal>— Lucía & Tomás, Casa Olivo</cite></blockquote>
</section>
`),
  };
}

function projectsIndex(path) {
  const L = linker(path);
  return {
    path, title: 'Projects — Atelier Terra', desc: 'Homes, villas, riads and restaurants by Atelier Terra.',
    body: wrap(L, `
<section class="phead wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <p class="tag" data-intro>Portfolio</p>
  <h1 class="h-hero"><span data-split="words" data-split-load>Our houses</span> <em data-split="words" data-split-load>under the sun</em></h1>
</section>
<section class="arches wrap">
  ${projects.map((p, i) => `
  <a class="arch-card" href="${L(`terra/projects/${p.slug}/`)}" data-cursor-label="Visit" data-speed="${[0.05, 0.18, 0.1, 0.22, 0.08][i]}">
    <div class="arch-card__img media" data-img-reveal>${img(p.hero, p.name, { w: 1000, sizes: '(max-width: 800px) 90vw, 32vw' })}</div>
    <div class="arch-card__meta"><span class="tag">${p.type} · ${p.year}</span><h3>${p.name}</h3><span>${p.place}</span></div>
  </a>`).join('')}
</section>`),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  return {
    path, title: `${p.name} — Atelier Terra`, desc: p.lede,
    body: wrap(L, `
<section class="pj wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <div class="pj__head">
    <p class="tag" data-intro>${p.type} · ${p.place} · ${p.year}</p>
    <h1 class="h-hero" data-split="words" data-split-load>${p.name}</h1>
    <p class="pj__lede" data-intro>${esc(p.lede)}</p>
  </div>
  <div class="pj__arch media" data-img-reveal="up load">${img(p.hero, p.name, { eager: true, w: 1200, sizes: '(max-width: 800px) 90vw, 42vw', attrs: 'data-parallax="0.15"' })}</div>
</section>
<section class="slider" data-bg="#3b2a20" data-ink="#f3e9dc">
  <div class="slider__head wrap"><p class="tag">Gallery — drag</p><span class="slider__count"><b>01</b> / 0${p.imgs.length}</span></div>
  <div class="slider__view" data-drag>
    <div class="slider__track">
      ${p.imgs.map((k, j) => `<figure class="slide"><div class="media slide__img">${img(k, `${p.name} — ${j + 1}`, { w: 1200, sizes: '(max-width: 800px) 80vw, 40vw' })}</div><figcaption>${['Living', 'Kitchen', 'Bedroom', 'Terrace', 'Detail'][j]}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>
<section class="pj-notes wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  ${[['Materials', 'Lime plaster, reclaimed terracotta, olive wood, raw linen, local stone.'], ['Artisans', 'Masons, a ceramicist, two carpenters and a weaver from the region.'], ['Scope', 'Interior architecture, furniture, lighting, textiles and styling.']].map(([t, d]) => `<div data-reveal><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>
<a class="pj-next wrap" href="${L(`terra/projects/${next.slug}/`)}" data-cursor-label="Next">
  <span class="tag">Next — ${next.place}</span>
  <span class="h-hero" data-split="words">${next.name}</span>
  <span class="pj-next__img media">${img(next.hero, '', { w: 600, sizes: '200px' })}</span>
</a>`),
  };
}

function studio(path) {
  const L = linker(path);
  return {
    path, title: 'Studio — Atelier Terra', desc: 'A Mediterranean interior studio rooted in craft.',
    body: wrap(L, `
<section class="phead wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <p class="tag" data-intro>The atelier</p>
  <h1 class="h-hero"><span data-split="words" data-split-load>Rooted in</span> <em data-split="words" data-split-load>craft</em></h1>
</section>
<section class="st wrap">
  <div class="st__arch media" data-img-reveal="up load">${img('P2', 'Founder portrait', { eager: true, w: 900, sizes: '(max-width: 800px) 80vw, 34vw' })}</div>
  <div class="st__txt">
    <p class="about__text" data-fill>Atelier Terra was founded in 2012 by Marta Vidal, an architect raised between Mallorca and Marrakech, who believed homes should smell of wax and wood and feel cool at noon.</p>
    <p data-reveal>Today we are a team of nine designers and architects working with more than forty craftspeople across the Balearics, Andalusia, Puglia and Morocco. We design fewer projects than we could — so we can be on site for every one.</p>
  </div>
</section>
<section class="values wrap" data-bg="#b65a36" data-ink="#f7efe4">
  ${[['Slow', 'Good things take seasons. We let materials cure and ideas settle.'], ['Local', 'We source within a day’s drive whenever we can.'], ['Lasting', 'Repairable, natural, honest — never disposable.']].map(([t, d], i) => `
  <div class="val" data-reveal><span class="val__n">${['I', 'II', 'III'][i]}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>
<section class="team wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <h2 class="h-xl" data-split="words">The <em>hands</em></h2>
  <div class="team__grid">
    ${[['P2', 'Marta Vidal', 'Founder'], ['P6', 'Joan Ferrer', 'Architect'], ['P3', 'Amina El Idrissi', 'Textiles & colour'], ['P4', 'Luca Bianchi', 'Site director']].map(([k, n, r]) => `
    <figure class="tm" data-reveal><div class="tm__img media">${img(k, n, { w: 600, sizes: '(max-width: 800px) 45vw, 22vw' })}</div><figcaption><strong>${n}</strong>${r}</figcaption></figure>`).join('')}
  </div>
</section>`),
  };
}

function servicesPage(path) {
  const L = linker(path);
  return {
    path, title: 'Services — Atelier Terra', desc: 'Interior architecture, restoration, furniture and hospitality design.',
    body: wrap(L, `
<section class="phead wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <p class="tag" data-intro>Services</p>
  <h1 class="h-hero"><span data-split="words" data-split-load>How we</span> <em data-split="words" data-split-load>can help</em></h1>
</section>
<section class="svc wrap">
  ${[['Restoration', 'Bringing old fincas, masserias and riads back to life with respect for their history and modern comfort.', 'E2'], ['Interior architecture', 'Layouts, arches, niches, built-in benches and joinery that make a house feel inevitable.', 'L2'], ['Furniture & textiles', 'Custom pieces in olive wood, rattan, linen and wool, made with local workshops.', 'D7'], ['Hospitality', 'Boutique hotels, guest houses and restaurants that feel like someone’s home.', 'O13']].map(([t, d, k], i) => `
  <article class="svc__row ${i % 2 ? 'is-rev' : ''}">
    <div class="svc__img media" data-img-reveal>${img(k, t, { w: 1000, sizes: '(max-width: 800px) 90vw, 40vw', attrs: 'data-parallax="0.15"' })}</div>
    <div class="svc__txt"><span class="tag" data-reveal>0${i + 1}</span><h2 class="h-lg" data-split="words">${t}</h2><p data-reveal>${d}</p></div>
  </article>`).join('')}
</section>
<section class="cta wrap" data-bg="#6b6b3a" data-ink="#f3eedd">
  <h2 class="h-xl" data-split="words">Have a house with a <em>story?</em></h2>
  <a href="${L('terra/contact/')}" class="ft__btn" data-magnetic><span>Tell us about it</span></a>
</section>`),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'Contact — Atelier Terra', desc: 'Start a project with Atelier Terra.',
    body: wrap(L, `
<section class="phead wrap" data-bg="#efe4d6" data-ink="#3b2a20">
  <p class="tag" data-intro>Contact</p>
  <h1 class="h-hero"><span data-split="words" data-split-load>Hola,</span> <em data-split="words" data-split-load>let’s begin</em></h1>
</section>
<section class="ct wrap">
  <div class="ct__form" data-form-wrap>
    <form data-form data-reveal>
      <label><span>Your name</span><input required autocomplete="name"></label>
      <label><span>Email</span><input required type="email" autocomplete="email"></label>
      <label><span>Where is the house?</span><input placeholder="Mallorca, Ibiza, Puglia…"></label>
      <div class="ct__chips"><span>I need help with</span>
        ${['Restoration', 'New build', 'Interiors only', 'Hotel / restaurant'].map((t) => `<label><input type="checkbox"><i>${t}</i></label>`).join('')}
      </div>
      <label><span>Tell us the story</span><textarea rows="4"></textarea></label>
      <button class="ft__btn" data-magnetic><span>Send</span></button>
    </form>
    <div class="form-success"><h2 class="h-lg">¡Gracias!</h2><p>We will write back within two days — usually with a few questions and a photo of our studio table.</p></div>
  </div>
  <aside class="ct__aside">
    <div class="ct__arch media" data-img-reveal>${img('L2', 'Atelier Terra studio', { w: 800, sizes: '(max-width: 800px) 80vw, 30vw' })}</div>
    <p data-reveal>Carrer de Sant Miquel 21, Palma<br>Mon–Fri · 9:00–17:00 · <span data-clock="Europe/Madrid"></span> in Palma</p>
  </aside>
</section>`),
  };
}

export default {
  site,
  card: { title: 'Atelier Terra', style: 'متوسطي دافئ — Organic', ref: 'Studio KO · Cathie Hong', img: 'L1', color: '#efe4d6', accent: '#b65a36',
    motion: 'أقواس تنكشف، ختم دوّار، تغيّر لون الخلفية مع السكرول، كروت مكدّسة، خط SVG يُرسم، سلايدر بالسحب' },
  pages: () => [
    home('terra/index.html'),
    projectsIndex('terra/projects/index.html'),
    ...projects.map((p, i) => projectPage(`terra/projects/${p.slug}/index.html`, p, i)),
    studio('terra/studio/index.html'),
    servicesPage('terra/services/index.html'),
    contact('terra/contact/index.html'),
  ],
};
