// Root index: a showcase that links to every reference site.
import { img, esc } from '../lib.mjs';
import { src } from '../images.mjs';

const site = {
  slug: 'hub', name: 'Interior References', lang: 'ar', dir: 'rtl', theme: '#111110', ink: '#f1ede4', letter: '◐',
  fonts: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap',
  pt: 'panels', ptPanels: 6, ptLabel: '', cursor: true, js: false,
};

const pagesOf = (slug) => slug === 'vanta' ? ['work', 'about', 'services', 'contact'] : slug === 'lumen' ? ['work', 'studio', 'services', 'contact'] : slug === 'dar' ? ['projects', 'about', 'services', 'contact'] : ['projects', 'studio', 'services', 'contact'];

function index(sites) {
  return {
    path: 'index.html', title: 'مراجع تصميم داخلي — ٦ مواقع بحركة احترافية', desc: 'ستة مواقع كاملة لاستوديوهات تصميم داخلي، كل موقع بهوية وحركة مختلفة.',
    body: `
<header class="hub-hd">
  <span class="hub-hd__logo">Interior <em>References</em></span>
  <span class="hub-hd__count">${sites.length} مواقع · ${sites.reduce((n, s) => n + s.pages(sites).length, 0)} صفحة</span>
</header>
<main>
  <section class="hub-hero">
    <p class="hub-kicker" data-intro>مكتبة مرجعية — تصميم داخلي</p>
    <h1 class="hub-title"><span data-split="words" data-split-load>ستة استوديوهات،</span><span data-split="words" data-split-load>ستّ <em class="serif">هويات</em> مختلفة.</span></h1>
    <p class="hub-sub" data-intro>كل رابط تحت هو موقع متكامل بصفحاته (الرئيسية، المشاريع، صفحة مشروع، من نحن، الخدمات، تواصل) — مستوحى من أقوى مواقع التصميم الداخلي عالمياً، وبأسلوب حركة خاص فيه. الحركة شغالة على كل الأجهزة.</p>
  </section>

  <section class="hub-list" data-preview-list>
    ${sites.map((m, i) => {
      const c = m.card, s = m.site;
      return `
    <a class="hub-row" href="${s.slug}/" data-preview="${src(c.img, 900)}" style="--c:${c.color};--a:${c.accent}" data-reveal>
      <span class="hub-row__n">0${i + 1}</span>
      <span class="hub-row__name" ${s.dir === 'rtl' ? '' : 'dir="ltr"'}>${esc(c.title)}</span>
      <span class="hub-row__style">${esc(c.style)}<small>مستوحى من: <bdi>${esc(c.ref)}</bdi></small></span>
      <span class="hub-row__motion">${esc(c.motion)}</span>
      <span class="hub-row__route" dir="ltr">/${s.slug}</span>
      <span class="hub-row__img media">${img(c.img, c.title, { w: 800, sizes: '90vw' })}</span>
    </a>`;
    }).join('')}
  </section>

  <section class="hub-map">
    <h2 class="hub-h2" data-split="words">خريطة الصفحات</h2>
    <div class="hub-map__grid">
      ${sites.map((m) => `
      <div class="hub-map__col" data-reveal style="--a:${m.card.accent}">
        <h3><a href="${m.site.slug}/">${esc(m.card.title)}</a></h3>
        <ul><li><a href="${m.site.slug}/" dir="ltr">/${m.site.slug}</a></li>${pagesOf(m.site.slug).map((p) => `<li><a href="${m.site.slug}/${p}/" dir="ltr">/${m.site.slug}/${p}</a></li>`).join('')}<li class="muted">+ صفحات تفاصيل لكل مشروع</li></ul>
      </div>`).join('')}
    </div>
  </section>

  <section class="hub-tech">
    <h2 class="hub-h2" data-split="words">تحت الغطاء</h2>
    <ul class="hub-tech__list" data-stagger>
      <li><strong>GSAP + ScrollTrigger</strong><span>كل حركات السكرول، التثبيت، والمعارض الأفقية</span></li>
      <li><strong>SplitText</strong><span>كشف النصوص حرفاً حرفاً وسطراً سطراً</span></li>
      <li><strong>Flip</strong><span>فلترة المشاريع وتبديل العرض بحركة سلسة</span></li>
      <li><strong>Lenis</strong><span>سكرول ناعم على الديسكتوب</span></li>
      <li><strong>HTML ثابت</strong><span>بدون build — يرفع مباشرة على Hostinger</span></li>
      <li><strong>متجاوب بالكامل</strong><span>الحركة تعمل حتى لو "تقليل الحركة" مفعّل بالجهاز</span></li>
    </ul>
  </section>
</main>
<footer class="hub-ft"><span>Interior References · نماذج مرجعية — الصور من Unsplash</span><span data-year></span></footer>`,
  };
}

function notFound() {
  return {
    path: '404.html', absolute: true, title: 'الصفحة غير موجودة', desc: 'الصفحة المطلوبة غير موجودة.',
    body: `
<main class="nf">
  <p class="hub-kicker" data-intro>٤٠٤</p>
  <h1 class="hub-title"><span data-split="words" data-split-load>هذه الغرفة</span><span data-split="words" data-split-load><em class="serif">غير موجودة.</em></span></h1>
  <a class="nf__btn" href="/" data-magnetic>العودة لكل المواقع</a>
</main>`,
  };
}

export default { site, pages: (sites) => [index(sites), notFound()] };
