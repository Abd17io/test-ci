// VANTA — bold, maximalist, colour-driven (references: Kelly Wearstler, Faye Toogood, Dimorestudio).
import { img, linker, esc } from '../lib.mjs';
import { src } from '../images.mjs';

const site = {
  slug: 'vanta', name: 'VANTA', theme: '#0e0e0e', ink: '#d8ff3d', letter: 'V',
  fonts: 'https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Space+Grotesk:wght@300;400;500&display=swap',
  pt: 'skew', ptPanels: 3, ptLabel: '', cursor: true, js: true,
};

const projects = [
  { slug: 'casa-neon', name: 'Casa Neón', place: 'Mexico City', year: 2025, type: 'Residence', hero: 'L12', imgs: ['L18', 'L17', 'B6', 'K7', 'D9'], color: '#ff4d1f',
    lede: 'A 1950s modernist house rewired with tangerine lacquer, travertine and a living room that glows like a sunset.' },
  { slug: 'club-volta', name: 'Club Volta', place: 'Milan', year: 2024, type: 'Bar & lounge', hero: 'O7', imgs: ['O6', 'O13', 'O14', 'D9', 'O15'], color: '#2b3cff',
    lede: 'An aperitivo bar in cobalt velvet and mirror steel, designed to feel like the inside of a jazz record.' },
  { slug: 'pink-loft', name: 'Pink Loft', place: 'Berlin', year: 2024, type: 'Loft', hero: 'L10', imgs: ['L23', 'D2', 'B7', 'A4', 'L22'], color: '#ff7eb6',
    lede: 'A former factory floor with a blush steel kitchen, a sculptural stair and furniture you want to touch.' },
  { slug: 'studio-blok', name: 'Studio Blok', place: 'Amsterdam', year: 2023, type: 'Workplace', hero: 'O2', imgs: ['O1', 'O5', 'O3', 'D6', 'O4'], color: '#d8ff3d',
    lede: 'Headquarters for a creative agency — colour-blocked zones, modular furniture and a staircase that doubles as a stage.' },
  { slug: 'hotel-kaleido', name: 'Hotel Kaleido', place: 'Lisbon', year: 2023, type: 'Hotel', hero: 'O11', imgs: ['O10', 'O9', 'O12', 'O8', 'L18'], color: '#ffb200',
    lede: 'Forty rooms, forty palettes. A hotel where no two doors, rugs or lamps are the same.' },
];

const nav = [['', 'Home'], ['work/', 'Work'], ['about/', 'About'], ['services/', 'Services'], ['contact/', 'Contact']];

const header = (L) => `
<header class="hd">
  <a href="${L('vanta/')}" class="hd__logo">VANTA<sup>®</sup></a>
  <nav class="hd__nav" aria-label="Main">${nav.slice(1).map(([h, t]) => `<a href="${L('vanta/' + h)}" data-text="${t}"><span>${t}</span></a>`).join('')}</nav>
  <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><i></i><i></i><i></i></button>
</header>
<div class="menu">
  ${nav.map(([h, t], i) => `<div class="line-mask"><a href="${L('vanta/' + h)}" data-menu-item style="--c:${['#ff4d1f', '#2b3cff', '#d8ff3d', '#ff7eb6', '#ffb200'][i]}">${t}</a></div>`).join('')}
</div>`;

const footer = (L) => `
<footer class="ft">
  <div class="ft__rows">
    <div class="vrow" data-marquee data-mq-speed="90" data-scroll-dir><div class="marquee__track"><span>Let’s make it loud</span><b>✺</b><span>Let’s make it loud</span><b>✺</b></div></div>
  </div>
  <div class="ft__main">
    <a class="ft__mail" href="mailto:hey@vanta.studio" data-magnetic="0.2">hey@vanta.studio</a>
    <div class="ft__cols">
      <p>Rua da Boavista 84<br>Lisbon — PT</p><p>Kastanienallee 12<br>Berlin — DE</p>
      <p><a href="#">Instagram ↗</a><br><a href="#">TikTok ↗</a><br><a href="#">Are.na ↗</a></p>
      <p>© <span data-year></span> VANTA<br><a href="${L('')}">← All studios</a></p>
    </div>
  </div>
</footer>`;

const wrap = (L, inner) => `${header(L)}<main>${inner}</main>${footer(L)}`;

function home(path) {
  const L = linker(path);
  const trail = ['L12', 'O7', 'L10', 'O11', 'L18', 'D9', 'B6', 'O13', 'L23', 'D2'].map((k) => src(k, 500));
  return {
    path, title: 'VANTA — Interiors That Refuse To Whisper', desc: 'A bold interior studio for homes, bars, hotels and workplaces.',
    body: wrap(L, `
<section class="hero" data-trail='${JSON.stringify(trail)}'>
  <div class="hero__inner">
    <p class="hero__kicker" data-intro>( Interior design studio — Lisbon / Berlin )</p>
    <h1 class="hero__title" data-split="chars" data-split-load>VANTA</h1>
    <div class="hero__bottom">
      <p class="hero__claim" data-split="words" data-split-load>Interiors that <span class="hl hl--o">refuse</span> to <span class="hl hl--b">whisper.</span></p>
      <a href="${L('vanta/work/')}" class="blob-btn" data-magnetic data-intro="scale"><span>See the work</span></a>
    </div>
  </div>
  <p class="hero__hint" data-intro>Move your cursor ↘</p>
</section>

<section class="vrows">
  <div class="vrow vrow--o" data-marquee data-mq-speed="70" data-scroll-dir><div class="marquee__track"><span>Colour is a material</span><b>✺</b><span>Rooms with nerve</span><b>✺</b></div></div>
  <div class="vrow vrow--b" data-marquee data-mq-speed="70" data-dir="-1" data-scroll-dir><div class="marquee__track"><span>No beige allowed</span><b>●</b><span>Joy is functional</span><b>●</b></div></div>
</section>

<section class="manifesto">
  <p class="manifesto__label" data-reveal>( Manifesto )</p>
  <p class="manifesto__text" data-fill>We design spaces with a <span class="hl hl--o">point of view.</span> Homes, bars, hotels and offices that make people <span class="hl hl--l">feel something</span> the second they walk in — and remember it long after they leave.</p>
</section>

<section class="cases">
  ${projects.slice(0, 4).map((p, i) => `
  <a class="case" href="${L(`vanta/work/${p.slug}/`)}" style="--c:${p.color}" data-cursor-label="Open">
    <div class="case__media media">${img(p.hero, p.name, { w: 1800, attrs: 'data-parallax="0.2"' })}</div>
    <div class="case__info">
      <span class="case__n">0${i + 1}</span>
      <h2 class="case__title" data-split="chars">${p.name}</h2>
      <span class="case__tag">${p.type} — ${p.place}, ${p.year}</span>
    </div>
  </a>`).join('')}
</section>

<section class="numbers">
  ${[['64', 'Projects built'], ['11', 'Countries'], ['23', 'Awards'], ['∞', 'Colour samples']].map(([n, t], i) => `
  <div class="num" data-reveal="scale" style="--c:${['#ff4d1f', '#2b3cff', '#d8ff3d', '#ff7eb6'][i]}"><strong ${/^\d+$/.test(n) ? `data-count="${n}"` : ''}>${n}</strong><span>${t}</span></div>`).join('')}
</section>

<section class="svc-rows">
  <p class="manifesto__label" data-reveal>( What we do )</p>
  ${[['Residential', 'Homes with character', '#ff4d1f'], ['Hospitality', 'Bars, restaurants, hotels', '#2b3cff'], ['Workplace', 'Offices that people choose', '#d8ff3d'], ['Objects', 'Furniture, lighting, rugs', '#ff7eb6']].map(([t, d, c]) => `
  <a class="svc-row" href="${L('vanta/services/')}" style="--c:${c}"><span class="svc-row__t">${t}</span><span class="svc-row__d">${d}</span><span class="svc-row__a">↗</span></a>`).join('')}
</section>
`),
  };
}

function work(path) {
  const L = linker(path);
  return {
    path, title: 'Work — VANTA', desc: 'Selected projects by VANTA.',
    body: wrap(L, `
<section class="phead">
  <h1 class="phead__title" data-split="chars" data-split-load>WORK</h1>
  <p class="phead__sub" data-intro>( ${projects.length} projects, zero beige )</p>
</section>
<section class="wlist" data-preview-list>
  ${projects.map((p, i) => `
  <a class="wrow" href="${L(`vanta/work/${p.slug}/`)}" data-preview="${src(p.hero, 800)}" style="--c:${p.color}" data-reveal>
    <span class="wrow__n">0${i + 1}</span><span class="wrow__t">${p.name}</span><span class="wrow__m">${p.type}<br>${p.place} ${p.year}</span>
    <span class="wrow__img media">${img(p.hero, '', { w: 700, sizes: '90vw' })}</span>
  </a>`).join('')}
</section>`),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  const [a, b, c, d, e] = p.imgs;
  return {
    path, title: `${p.name} — VANTA`, desc: p.lede,
    body: wrap(L, `
<section class="pj-hero" style="--c:${p.color}">
  <p class="pj-hero__meta" data-intro>${p.type} / ${p.place} / ${p.year}</p>
  <h1 class="pj-hero__title" data-split="chars" data-split-load>${p.name}</h1>
  <div class="pj-hero__img media" data-img-reveal="center load">${img(p.hero, p.name, { eager: true, attrs: 'data-parallax="0.2"' })}</div>
</section>
<section class="pj-body" style="--c:${p.color}">
  <p class="pj-lede" data-split="words">${esc(p.lede)}</p>
  <ul class="pj-facts" data-stagger>
    <li><span>Client</span>Private / confidential</li><li><span>Scope</span>Interior architecture, furniture, colour, art direction</li>
    <li><span>Team</span>6 designers, 14 makers</li><li><span>Palette</span><i style="background:${p.color}"></i><i style="background:#0e0e0e"></i><i style="background:#f1ede4"></i></li>
  </ul>
</section>
<section class="collage" style="--c:${p.color}">
  <div class="cl cl--1 media" data-img-reveal="left">${img(a, '', { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw' })}</div>
  <div class="cl cl--2 media" data-img-reveal="right" data-speed="0.3">${img(b, '', { w: 900, sizes: '(max-width: 800px) 70vw, 32vw' })}</div>
  <div class="cl cl--word" data-speed="0.15">${p.type.toUpperCase()}</div>
  <div class="cl cl--3 media" data-img-reveal>${img(c, '', { w: 900, sizes: '(max-width: 800px) 70vw, 30vw' })}</div>
  <div class="cl cl--4 media" data-img-reveal="down" data-speed="0.2">${img(d, '', { w: 1400, sizes: '(max-width: 800px) 100vw, 55vw' })}</div>
  <div class="cl cl--5 media" data-img-reveal="center">${img(e, '', { w: 2000 })}</div>
</section>
<a class="pj-next" href="${L(`vanta/work/${next.slug}/`)}" style="--c:${next.color}" data-cursor-label="Next">
  <span>Next →</span><strong data-split="chars">${next.name}</strong>
</a>`),
  };
}

function about(path) {
  const L = linker(path);
  return {
    path, title: 'About — VANTA', desc: 'VANTA is a design studio of 18 people in Lisbon and Berlin.',
    body: wrap(L, `
<section class="phead"><h1 class="phead__title" data-split="chars" data-split-load>ABOUT</h1><p class="phead__sub" data-intro>( 18 humans, 2 cities, 1 rule: be brave )</p></section>
<section class="ab-hero">
  <div class="ab-hero__img media" data-img-reveal="mid load">${img('L18', 'Colourful VANTA interior', { eager: true, attrs: 'data-parallax="0.2"' })}</div>
  <p class="ab-hero__sticker" data-intro="scale">Since<br>2016</p>
</section>
<section class="manifesto"><p class="manifesto__text" data-fill>VANTA started as two friends who were bored of beautiful-but-boring. Today we are architects, set designers, colour nerds and furniture makers who believe <span class="hl hl--b">a room can change your mood</span> — so it might as well make it better.</p></section>
<section class="rules">
  ${[['01', 'Colour first, not last.'], ['02', 'Every room needs one weird thing.'], ['03', 'Comfort is non-negotiable.'], ['04', 'Make it last — make it fixable.']].map(([n, t], i) => `
  <div class="rule" data-reveal style="--c:${['#ff4d1f', '#2b3cff', '#d8ff3d', '#ff7eb6'][i]}"><span>${n}</span><p>${t}</p></div>`).join('')}
</section>
<section class="crew">
  ${[['P1', 'Theo Marx', 'Co-founder'], ['P7', 'Rita Calado', 'Co-founder'], ['P5', 'Noor Haddad', 'Colour lead'], ['P8', 'Felix Wagner', 'Workshop']].map(([k, n, r], i) => `
  <figure class="crew__m" data-reveal style="--c:${['#ff4d1f', '#2b3cff', '#d8ff3d', '#ff7eb6'][i]}"><div class="media crew__img">${img(k, n, { w: 600, sizes: '(max-width: 800px) 50vw, 25vw' })}</div><figcaption><strong>${n}</strong><span>${r}</span></figcaption></figure>`).join('')}
</section>`),
  };
}

function services(path) {
  const L = linker(path);
  return {
    path, title: 'Services — VANTA', desc: 'Residential, hospitality, workplace and object design.',
    body: wrap(L, `
<section class="phead"><h1 class="phead__title" data-split="chars" data-split-load>SERVICES</h1><p class="phead__sub" data-intro>( pick one, or all )</p></section>
<section class="tiles">
  ${[['Residential', 'Full renovations, apartments and family homes with a strong personality.', 'L12', '#ff4d1f'], ['Hospitality', 'Bars, restaurants and hotels designed to be talked about — and photographed.', 'O7', '#2b3cff'], ['Workplace', 'Offices that feel like a club, not a cubicle farm.', 'O2', '#d8ff3d'], ['Colour strategy', 'Full palette systems for brands, buildings and products.', 'L10', '#ff7eb6'], ['Furniture & objects', 'Limited editions and one-offs made in our Berlin workshop.', 'D2', '#ffb200'], ['Art direction', 'Shoots, sets and pop-ups for brands who want a world.', 'L23', '#ff4d1f']].map(([t, d, k, c], i) => `
  <article class="tile" style="--c:${c}" data-tilt="6" data-reveal>
    <div class="tile__img media">${img(k, t, { w: 800, sizes: '(max-width: 800px) 90vw, 30vw' })}</div>
    <span class="tile__n">0${i + 1}</span><h2>${t}</h2><p>${d}</p>
  </article>`).join('')}
</section>
<section class="cta-band"><a href="${L('vanta/contact/')}" class="blob-btn" data-magnetic><span>Book a call</span></a><p data-split="words">Free 30 minutes. Bring your mood boards, your problems, your weirdest ideas.</p></section>`),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'Contact — VANTA', desc: 'Start a project with VANTA.',
    body: wrap(L, `
<section class="phead"><h1 class="phead__title" data-split="chars" data-split-load>SAY HI</h1><p class="phead__sub" data-intro>( we reply fast )</p></section>
<section class="ct" data-form-wrap>
  <form class="ct__form" data-form>
    <p class="ct__sentence" data-reveal>Hi VANTA, my name is <input required placeholder="your name" aria-label="Name" size="10">
    and I’d love help with a <select aria-label="Project type"><option>home</option><option>bar</option><option>restaurant</option><option>hotel</option><option>office</option></select>
    in <input placeholder="city" aria-label="City" size="8">. My budget is around <select aria-label="Budget"><option>€50–150k</option><option>€150–500k</option><option>€500k+</option></select>.
    You can reach me at <input required type="email" placeholder="email" aria-label="Email" size="14">.</p>
    <button class="blob-btn" data-magnetic><span>Send it</span></button>
  </form>
  <div class="form-success"><h2 class="phead__title">YAY!</h2><p>Message received. Expect a reply (and probably a colour swatch) within 24h.</p></div>
</section>`),
  };
}

export default {
  site,
  card: { title: 'VANTA', style: 'جريء وملوّن — Maximalist', ref: 'Kelly Wearstler · Dimorestudio', img: 'L12', color: '#0e0e0e', accent: '#d8ff3d',
    motion: 'أثر صور يتبع الماوس، نصوص عملاقة تنحرف مع السرعة، انتقال مائل ملوّن، أزرار مغناطيسية، كروت ثلاثية الأبعاد' },
  pages: () => [
    home('vanta/index.html'),
    work('vanta/work/index.html'),
    ...projects.map((p, i) => projectPage(`vanta/work/${p.slug}/index.html`, p, i)),
    about('vanta/about/index.html'),
    services('vanta/services/index.html'),
    contact('vanta/contact/index.html'),
  ],
};
