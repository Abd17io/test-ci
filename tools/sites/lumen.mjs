// LUMEN — hospitality & workplace, bright and contemporary (references: Yabu Pushelberg, Rockwell Group, Studio Paolo Ferrari).
import { img, linker, esc } from '../lib.mjs';

const site = {
  slug: 'lumen', name: 'Lumen', theme: '#f7f6f2', ink: '#121212', letter: 'L',
  fonts: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@1,6..96,400;1,6..96,500&display=swap',
  pt: 'wipe', ptPanels: 1, ptLabel: '<span class="pt-l">Lumen<i>.</i></span>', cursor: true, js: true,
};

const projects = [
  { slug: 'the-linden-hotel', name: 'The Linden Hotel', place: 'London', year: 2025, cat: 'hotel', sector: 'Hotel', hero: 'O12', imgs: ['O10', 'O9', 'O11', 'O8', 'O16'],
    kpi: [['120', 'keys'], ['4', 'F&B venues'], ['92%', 'occupancy yr 1']],
    lede: 'A 120-key lifestyle hotel in a Victorian warehouse — lobby, lounge, four restaurants and a rooftop pool.' },
  { slug: 'mira-rooftop', name: 'Mira Rooftop', place: 'Dubai', year: 2024, cat: 'restaurant', sector: 'Restaurant', hero: 'O6', imgs: ['O7', 'O13', 'O15', 'O14', 'D5'],
    kpi: [['260', 'covers'], ['38', 'floor'], ['11', 'weeks fit-out']],
    lede: 'A sunset restaurant and bar thirty-eight floors above the Marina, in travertine, smoked glass and brass.' },
  { slug: 'northwind-hq', name: 'Northwind HQ', place: 'Stockholm', year: 2024, cat: 'workplace', sector: 'Workplace', hero: 'O1', imgs: ['O2', 'O3', 'O5', 'O4', 'D6'],
    kpi: [['650', 'people'], ['8,400', 'm²'], ['+34%', 'office attendance']],
    lede: 'A headquarters designed to win people back to the office: neighbourhoods, quiet rooms and a 200-seat canteen.' },
  { slug: 'salt-stone-spa', name: 'Salt & Stone Spa', place: 'Bodrum', year: 2023, cat: 'hotel', sector: 'Wellness', hero: 'T2', imgs: ['T3', 'T1', 'T4', 'B3', 'E1'],
    kpi: [['14', 'treatment rooms'], ['2', 'hammams'], ['1', 'salt cave']],
    lede: 'A wellness retreat carved into the hillside, with hammams, a salt cave and treatment rooms open to the sea.' },
  { slug: 'atelier-cafe', name: 'Atelier Café', place: 'Paris', year: 2023, cat: 'restaurant', sector: 'Café', hero: 'O14', imgs: ['O15', 'D5', 'O6', 'D3', 'O13'],
    kpi: [['48', 'seats'], ['6', 'locations'], ['1', 'design system']],
    lede: 'A café concept built as a design system — rolled out to six locations across Paris in eighteen months.' },
  { slug: 'halden-residences', name: 'Halden Residences', place: 'Copenhagen', year: 2023, cat: 'workplace residential', sector: 'Residential amenity', hero: 'L13', imgs: ['L16', 'L30', 'K1', 'A1', 'L28'],
    kpi: [['212', 'apartments'], ['1,600', 'm² amenity'], ['A', 'energy rating']],
    lede: 'Lobby, co-working lounge, library and residents’ kitchen for a new waterfront rental building.' },
];

const sectors = [
  ['Hotels', 'Lobbies people linger in. Rooms people photograph. Hotels that earn their rate.', 'O12'],
  ['Restaurants', 'Spaces that turn tables and turn heads — from bistro to rooftop.', 'O6'],
  ['Workplaces', 'Offices people choose to come to, designed around how teams really work.', 'O1'],
  ['Wellness', 'Spas and retreats with calm built into every material and every light.', 'T2'],
];

const nav = [['', 'Home'], ['work/', 'Work'], ['studio/', 'Studio'], ['services/', 'Services'], ['contact/', 'Contact']];

const header = (L, current) => `
<header class="hd" data-header>
  <a href="${L('lumen/')}" class="hd__logo">Lumen<i>.</i></a>
  <nav class="hd__nav" aria-label="Main">${nav.slice(1, 4).map(([h, t]) => `<a href="${L('lumen/' + h)}" class="${current === h ? 'is-cur' : ''}">${t}</a>`).join('')}</nav>
  <a href="${L('lumen/contact/')}" class="hd__cta" data-magnetic><span>Start a project</span><i>→</i></a>
  <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><span></span></button>
</header>
<div class="menu">
  <nav>${nav.map(([h, t], i) => `<div class="line-mask"><a href="${L('lumen/' + h)}" data-menu-item><i>0${i + 1}</i>${t}</a></div>`).join('')}</nav>
  <div class="menu__foot" data-menu-item><span>London · Dubai · Stockholm</span><span>studio@lumen.design</span></div>
</div>`;

const footer = (L) => `
<footer class="ft">
  <div class="ft__cta">
    <p class="kicker" data-reveal>Opening something soon?</p>
    <a href="${L('lumen/contact/')}" class="ft__big" data-cursor-label="Let’s go"><span data-split="words">Let’s design it <em>together</em></span></a>
  </div>
  <div class="ft__grid">
    <div><p class="kicker">London</p><p>41 Clerkenwell Road<br>EC1M 5RS</p></div>
    <div><p class="kicker">Dubai</p><p>Alserkal Avenue, Unit 52<br>Al Quoz</p></div>
    <div><p class="kicker">Stockholm</p><p>Hornsgatan 64<br>118 21</p></div>
    <div><p class="kicker">Newsletter</p><div data-form-wrap><form class="ft__nl" data-form><input type="email" required placeholder="Email address" aria-label="Email"><button aria-label="Subscribe">→</button></form><p class="form-success">Thanks — see you in the inbox.</p></div></div>
  </div>
  <div class="ft__base"><span>© <span data-year></span> Lumen Design Ltd — Reference concept</span><span><a href="#">Instagram</a> · <a href="#">LinkedIn</a></span><a href="${L('')}">← All studios</a></div>
</footer>`;

const wrap = (L, inner, cur) => `${header(L, cur)}<main>${inner}</main>${footer(L)}`;

function home(path) {
  const L = linker(path);
  return {
    path, title: 'Lumen — Hospitality & Workplace Interiors', desc: 'Interior design for hotels, restaurants, workplaces and wellness.',
    body: wrap(L, `
<section class="zoom">
  <div class="zoom__stage">
    <h1 class="zoom__title"><span class="zoom__l" data-split="chars" data-split-load>Spaces</span><span class="zoom__r" data-split="chars" data-split-load>that glow</span></h1>
    <div class="zoom__card media" data-intro="scale" data-intro-delay="0.4">${img('O12', 'Warmly lit hotel lobby', { eager: true })}</div>
    <p class="zoom__sub" data-intro data-intro-delay="0.8">Interior design for hotels, restaurants, workplaces & wellness — London · Dubai · Stockholm</p>
    <div class="zoom__over"><p data-zoom-text>We design the places where people meet, eat, rest and work — and want to come back to.</p></div>
  </div>
</section>

<section class="logos">
  <p class="kicker" data-reveal>Trusted by operators & brands</p>
  <div data-marquee data-mq-speed="40" class="logos__mq"><div class="marquee__track">${['Aurelia Hotels', 'NORTHWIND', 'Mira Group', 'kōen', 'Halden', 'SALT&STONE', 'Maison Verte', 'ORBIT', 'The Linden'].map((t) => `<span>${t}</span>`).join('')}</div></div>
</section>

<section class="sectors">
  <div class="sectors__head"><p class="kicker" data-reveal>What we design</p><h2 class="h-xl" data-split="words">Four worlds, <em>one</em> obsession: how a space feels.</h2></div>
  <div class="sectors__ui" data-tabs>
    <div class="sectors__tabs" role="tablist">
      ${sectors.map(([t], i) => `<button role="tab" aria-selected="${i === 0}" class="${i === 0 ? 'is-on' : ''}" data-tab="${i}"><span>0${i + 1}</span>${t}<i class="bar"></i></button>`).join('')}
    </div>
    <div class="sectors__panels">
      ${sectors.map(([t, d, k], i) => `
      <div class="sectors__panel ${i === 0 ? 'is-on' : ''}" role="tabpanel">
        <div class="sectors__img media">${img(k, t, { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw' })}</div>
        <p>${d}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="split">
  <div class="split__sticky">
    <p class="kicker">Featured work</p>
    ${projects.slice(0, 4).map((p, i) => `
    <div class="split__txt ${i === 0 ? 'is-on' : ''}" data-i="${i}">
      <span class="split__n">0${i + 1} / 04</span>
      <h3>${p.name}</h3>
      <p>${esc(p.lede)}</p>
      <dl>${p.kpi.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
      <a href="${L(`lumen/work/${p.slug}/`)}" class="link-arrow">View case study →</a>
    </div>`).join('')}
  </div>
  <div class="split__imgs">
    ${projects.slice(0, 4).map((p, i) => `<a href="${L(`lumen/work/${p.slug}/`)}" class="split__img media" data-i="${i}" data-cursor-label="View">${img(p.hero, p.name, { w: 1400, sizes: '(max-width: 800px) 100vw, 55vw', attrs: 'data-parallax="0.15"' })}<span class="split__cap">${p.name}</span></a>`).join('')}
  </div>
</section>

<section class="impact">
  <h2 class="h-xl" data-split="words">Design that <em>performs</em></h2>
  <div class="impact__grid">
    ${[['140', '+', 'venues opened'], ['27', '', 'cities'], ['18', '%', 'avg. uplift in ADR'], ['9', '', 'design awards in 2025']].map(([n, s, t]) => `<div class="impact__c" data-reveal><strong data-count="${n}" data-suffix="${s}">${n}${s}</strong><span>${t}</span></div>`).join('')}
  </div>
</section>

<section class="voices">
  <div data-marquee data-mq-speed="30" data-no-boost class="voices__mq"><div class="marquee__track">
    ${[['“Lumen gave us a lobby that sells rooms on Instagram before guests even arrive.”', 'GM, The Linden'], ['“Our team came back to the office — and stayed. That’s the brief, nailed.”', 'COO, Northwind'], ['“On time, on budget, and the most beautiful room in the city.”', 'Founder, Mira Group'], ['“They think like operators, not just designers.”', 'Director, Aurelia Hotels']].map(([q, a]) => `<figure class="voice"><blockquote>${q}</blockquote><figcaption>${a}</figcaption></figure>`).join('')}
  </div></div>
</section>
`, ''),
  };
}

function work(path) {
  const L = linker(path);
  return {
    path, title: 'Work — Lumen', desc: 'Hotels, restaurants, workplaces and wellness spaces by Lumen.',
    body: wrap(L, `
<section class="phead">
  <h1 class="h-hero" data-split="chars" data-split-load>Work</h1>
  <p class="phead__sub" data-intro>Selected hospitality, workplace and wellness projects, 2023–2025.</p>
</section>
<section class="work" data-filter-group>
  <div class="work__bar" data-intro>
    <div class="work__filters">${[['all', 'All'], ['hotel', 'Hotels'], ['restaurant', 'Restaurants'], ['workplace', 'Workplaces']].map(([f, t], i) => `<button data-filter="${f}" class="${i === 0 ? 'is-active' : ''}" aria-pressed="${i === 0}">${t}</button>`).join('')}</div>
    <div class="work__views" role="group" aria-label="Layout">
      <button data-view="grid" class="is-on" aria-pressed="true">Grid</button><button data-view="list" aria-pressed="false">List</button>
    </div>
  </div>
  <div class="work__grid" data-filter-grid data-layout="grid">
    ${projects.map((p) => `
    <a class="wcard" data-cat="${p.cat}" href="${L(`lumen/work/${p.slug}/`)}" data-cursor-label="View">
      <div class="wcard__img media">${img(p.hero, p.name, { w: 1000, sizes: '(max-width: 800px) 100vw, 33vw' })}</div>
      <div class="wcard__meta"><h3>${p.name}</h3><span>${p.sector}</span><span>${p.place}</span><span>${p.year}</span></div>
    </a>`).join('')}
  </div>
</section>`, 'work/'),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  const [a, b, c, d, e] = p.imgs;
  return {
    path, title: `${p.name} — Lumen`, desc: p.lede,
    body: wrap(L, `
<section class="cs-hero">
  <div class="cs-hero__txt">
    <p class="kicker" data-intro>${p.sector} · ${p.place} · ${p.year}</p>
    <h1 class="h-hero" data-split="words" data-split-load>${p.name}</h1>
  </div>
  <div class="cs-hero__img media" data-img-reveal="up load">${img(p.hero, p.name, { eager: true, attrs: 'data-parallax="0.2"' })}</div>
</section>
<section class="cs-intro">
  <p class="cs-lede" data-fill>${esc(p.lede)}</p>
  <dl class="cs-kpi">${p.kpi.map(([n, t]) => `<div data-reveal><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
</section>
<section class="cs-gal">
  <div class="cs-row">
    <div class="media cs-img" data-img-reveal>${img(a, '', { w: 1200, sizes: '(max-width: 800px) 100vw, 50vw', attrs: 'data-parallax="0.15"' })}</div>
    <div class="media cs-img" data-img-reveal>${img(b, '', { w: 1200, sizes: '(max-width: 800px) 100vw, 50vw', attrs: 'data-parallax="0.15"' })}</div>
  </div>
  <div class="cs-text"><h2 class="h-lg" data-split="words">The <em>challenge</em></h2><p data-reveal>Create a destination that works as hard commercially as it does emotionally — flexible enough for breakfast meetings and late-night crowds, and robust enough for thousands of guests a week.</p></div>
  <div class="media cs-wide" data-img-reveal="center">${img(c, '', { w: 2000, attrs: 'data-scale-scroll="1.2"' })}</div>
  <div class="cs-text"><h2 class="h-lg" data-split="words">Our <em>approach</em></h2><p data-reveal>We mapped every guest journey before drawing a single wall, then layered light, acoustics and materials so the space shifts mood across the day — bright and efficient in the morning, intimate and glowing at night.</p></div>
  <div class="cs-row cs-row--rev">
    <div class="media cs-img" data-img-reveal>${img(d, '', { w: 1200, sizes: '(max-width: 800px) 100vw, 50vw', attrs: 'data-parallax="0.15"' })}</div>
    <div class="media cs-img" data-img-reveal>${img(e, '', { w: 1200, sizes: '(max-width: 800px) 100vw, 50vw', attrs: 'data-parallax="0.15"' })}</div>
  </div>
</section>
<a class="cs-next" href="${L(`lumen/work/${next.slug}/`)}" data-cursor-label="Next">
  <span class="kicker">Next case study</span>
  <span class="cs-next__t" data-split="words">${next.name}</span>
  <span class="cs-next__img media">${img(next.hero, '', { w: 900, sizes: '30vw' })}</span>
</a>`, 'work/'),
  };
}

function studio(path) {
  const L = linker(path);
  return {
    path, title: 'Studio — Lumen', desc: 'Lumen is an interior design studio of 70 people across three cities.',
    body: wrap(L, `
<section class="phead">
  <h1 class="h-hero" data-split="chars" data-split-load>Studio</h1>
  <p class="phead__sub" data-intro>70 designers, architects, lighting specialists and strategists across London, Dubai and Stockholm.</p>
</section>
<section class="st-band">
  <div class="st-band__img media" data-img-reveal="mid load">${img('O3', 'Lumen studio', { eager: true, attrs: 'data-parallax="0.2"' })}</div>
</section>
<section class="st-cols">
  <p class="cs-lede" data-fill>We started Lumen in 2011 with a simple belief: hospitality and workplace design should be judged by how people feel — and by how the business performs.</p>
  <div class="st-points" data-stagger>
    ${[['Strategy first', 'Every project starts with operators, guests and numbers — not mood boards.'], ['Light as material', 'An in-house lighting team shapes atmosphere from the first sketch.'], ['Built to run', 'Durable, maintainable, beautiful on day one thousand.']].map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
</section>
<section class="people">
  <h2 class="h-xl" data-split="words">Partners</h2>
  <div class="people__grid">
    ${[['P8', 'James Okafor', 'Founding Partner'], ['P2', 'Elena Rossi', 'Design Partner'], ['P6', 'Karim Saleh', 'Partner, Dubai'], ['P7', 'Astrid Nilsson', 'Partner, Stockholm']].map(([k, n, r]) => `
    <figure class="person" data-reveal><div class="media person__img">${img(k, n, { w: 600, sizes: '(max-width: 800px) 50vw, 24vw' })}</div><figcaption><strong>${n}</strong><span>${r}</span></figcaption></figure>`).join('')}
  </div>
</section>`, 'studio/'),
  };
}

function services(path) {
  const L = linker(path);
  return {
    path, title: 'Services — Lumen', desc: 'Concept, interior architecture, lighting, FF&E and brand environments.',
    body: wrap(L, `
<section class="phead">
  <h1 class="h-hero" data-split="chars" data-split-load>Services</h1>
  <p class="phead__sub" data-intro>End-to-end design for spaces that need to perform — from feasibility to opening night.</p>
</section>
<section class="svc-cards">
  ${[['Concept & strategy', 'Positioning, guest journeys, operational planning and design narrative.', 'O9'], ['Interior architecture', 'Space planning, detailed design, specifications and tender packages.', 'O3'], ['Lighting design', 'Atmosphere, scenes and controls designed in-house alongside the interiors.', 'O7'], ['FF&E procurement', 'Custom furniture, sourcing, logistics and installation worldwide.', 'D5'], ['Brand environments', 'Roll-out systems for multi-site restaurants, cafés and retail.', 'O14'], ['Site & opening', 'Design supervision through construction, snagging and opening.', 'O16']].map(([t, d, k], i) => `
  <article class="svc-card" data-reveal>
    <span class="svc-card__n">0${i + 1}</span><h2>${t}</h2><p>${d}</p>
    <div class="svc-card__img media">${img(k, t, { w: 800, sizes: '(max-width: 800px) 90vw, 30vw' })}</div>
  </article>`).join('')}
</section>
<section class="faq">
  <h2 class="h-xl" data-split="words">Good to <em>know</em></h2>
  <div data-acc data-acc-open>
    ${[['Which sizes of project do you take on?', 'From a single 40-seat restaurant to 400-key hotels and 20,000 m² headquarters.'], ['Do you work internationally?', 'Yes. We have delivered projects in 27 cities across Europe, the Middle East and Asia.'], ['Can you work with our architect?', 'Of course — we regularly join teams as interior and lighting consultants.'], ['How are fees structured?', 'Usually as a fixed fee per stage, agreed after a short feasibility study.']].map(([q, a]) => `
    <div class="faq__item" data-acc-item><button data-acc-btn class="faq__q">${q}<span></span></button><div data-acc-body><p class="faq__a">${a}</p></div></div>`).join('')}
  </div>
</section>`, 'services/'),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'Contact — Lumen', desc: 'Start a project with Lumen.',
    body: wrap(L, `
<section class="phead">
  <h1 class="h-hero" data-split="chars" data-split-load>Contact</h1>
  <p class="phead__sub" data-intro>New project, collaboration or career — we would love to hear from you.</p>
</section>
<section class="ct">
  <div class="ct__steps" data-form-wrap>
    <form data-form class="ct__form" data-reveal>
      <fieldset class="ct__q"><legend>What are you opening?</legend>
        ${['Hotel', 'Restaurant / bar', 'Workplace', 'Spa / wellness', 'Other'].map((t, i) => `<label><input type="radio" name="kind" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}
      </fieldset>
      <fieldset class="ct__q"><legend>When do you plan to open?</legend>
        ${['< 12 months', '12–24 months', '24+ months'].map((t, i) => `<label><input type="radio" name="when" ${i === 1 ? 'checked' : ''}><span>${t}</span></label>`).join('')}
      </fieldset>
      <div class="ct__fields">
        <label><span>Name</span><input required autocomplete="name"></label>
        <label><span>Company</span><input autocomplete="organization"></label>
        <label><span>Email</span><input type="email" required autocomplete="email"></label>
        <label><span>City</span><input></label>
        <label class="wide"><span>Project details</span><textarea rows="4"></textarea></label>
      </div>
      <button class="hd__cta ct__send" data-magnetic><span>Send enquiry</span><i>→</i></button>
    </form>
    <div class="form-success"><h2 class="h-xl">Thank <em>you</em>.</h2><p>A partner will get back to you within two working days.</p></div>
  </div>
  <aside class="ct__side">
    ${[['London', '41 Clerkenwell Road, EC1M 5RS', 'Europe/London'], ['Dubai', 'Alserkal Avenue, Unit 52', 'Asia/Dubai'], ['Stockholm', 'Hornsgatan 64, 118 21', 'Europe/Stockholm']].map(([c, a, z]) => `
    <div class="ct__office" data-reveal><h3>${c}</h3><p>${a}</p><p class="ct__time"><span data-clock="${z}"></span> local time</p></div>`).join('')}
  </aside>
</section>`, 'contact/'),
  };
}

export default {
  site,
  card: { title: 'Lumen', style: 'فنادق ومطاعم ومكاتب — Contemporary', ref: 'Yabu Pushelberg · Rockwell Group', img: 'O12', color: '#f7f6f2', accent: '#e8a33d',
    motion: 'زووم سينمائي للهيرو، تبويبات متحركة، قسم مثبّت يتبدل نصه، تبديل Grid/List بحركة Flip، أرقام متحركة' },
  pages: () => [
    home('lumen/index.html'),
    work('lumen/work/index.html'),
    ...projects.map((p, i) => projectPage(`lumen/work/${p.slug}/index.html`, p, i)),
    studio('lumen/studio/index.html'),
    services('lumen/services/index.html'),
    contact('lumen/contact/index.html'),
  ],
};
