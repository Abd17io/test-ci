// دار — Arabic (RTL) luxury studio (references: Elite Design Studio floating-images hero, Gulf luxury residences).
import { img, linker, esc } from '../lib.mjs';
import { src } from '../images.mjs';

const ar = (n) => String(n).padStart(2, '0').replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

const site = {
  slug: 'dar', name: 'دار', lang: 'ar', dir: 'rtl', theme: '#0f2a24', ink: '#c9a45c', letter: 'د',
  fonts: 'https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap',
  pt: 'panels', ptPanels: 4, ptLabel: '<span class="pt-dar">دار</span>', cursor: true, js: true,
};

const projects = [
  { slug: 'villa-al-nakheel', name: 'فيلا النخيل', place: 'دبي، الإمارات', year: 2025, type: 'سكني', area: '1,200 م²', hero: 'E7', imgs: ['L15', 'K4', 'B2', 'T1', 'L13'],
    lede: 'فيلا عائلية على شاطئ جميرا، صمّمناها حول فناء داخلي تتوسطه نخلة، بخامات الحجر الجيري والجوز والنحاس المعتّق.' },
  { slug: 'qasr-al-yasmin', name: 'قصر الياسمين', place: 'الرياض، السعودية', year: 2024, type: 'سكني', area: '2,400 م²', hero: 'L3', imgs: ['L29', 'K9', 'B8', 'L16', 'L20'],
    lede: 'قصر معاصر يستلهم العمارة النجدية: أفنية ظليلة، ومشربيات حديثة، ومجالس واسعة تحتفي بالضيافة.' },
  { slug: 'marina-apartment', name: 'شقة المارينا', place: 'أبوظبي، الإمارات', year: 2024, type: 'شقق', area: '380 م²', hero: 'A7', imgs: ['A8', 'K5', 'B1', 'L28', 'A6'],
    lede: 'شقة بإطلالة بحرية كاملة، بألوان رملية هادئة وأثاث مفصّل بالكامل يناسب حياة عائلة شابة.' },
  { slug: 'majlis-diyafa', name: 'مجلس الضيافة', place: 'الدوحة، قطر', year: 2023, type: 'ضيافة', area: '650 م²', hero: 'O9', imgs: ['O16', 'L11', 'D10', 'O12', 'O10'],
    lede: 'مجلس وصالة استقبال لفندق بوتيك، يجمع بين دفء الخشب المنقوش وفخامة الرخام الأخضر.' },
  { slug: 'al-ofoq-office', name: 'مكتب الأفق', place: 'عمّان، الأردن', year: 2023, type: 'تجاري', area: '900 م²', hero: 'O3', imgs: ['O2', 'O1', 'O5', 'D6', 'O4'],
    lede: 'مقر رئيسي لشركة استثمار، بمساحات عمل مفتوحة وغرف اجتماعات هادئة ومكتبة تطل على المدينة.' },
];

const nav = [['', 'الرئيسية'], ['projects/', 'المشاريع'], ['about/', 'من نحن'], ['services/', 'الخدمات'], ['contact/', 'تواصل معنا']];

const header = (L) => `
<header class="hd" data-header="hide">
  <a href="${L('dar/')}" class="hd__logo"><span>دار</span><small>للتصميم الداخلي</small></a>
  <nav class="hd__nav" aria-label="القائمة الرئيسية">${nav.slice(1, 4).map(([h, t]) => `<a href="${L('dar/' + h)}">${t}</a>`).join('')}</nav>
  <a href="${L('dar/contact/')}" class="btn-gold hd__cta" data-magnetic>احجز استشارة</a>
  <button class="hd__burger" data-menu-toggle aria-expanded="false" aria-label="القائمة"><span></span><span></span></button>
</header>
<div class="menu">
  <div class="menu__pattern"></div>
  <nav>${nav.map(([h, t], i) => `<div class="line-mask"><a href="${L('dar/' + h)}" data-menu-item><small>${ar(i + 1)}</small>${t}</a></div>`).join('')}</nav>
  <p class="menu__foot" data-menu-item>دبي · الرياض · الدوحة — hello@dar.studio</p>
</div>`;

const footer = (L) => `
<footer class="ft">
  <div class="ft__cta wrap">
    <h2 class="ft__title" data-split="words">لنبنِ معاً <span class="gold">بيتاً</span> يشبهك</h2>
    <a href="${L('dar/contact/')}" class="btn-gold btn-lg" data-magnetic>ابدأ مشروعك ←</a>
  </div>
  <div class="ft__grid wrap">
    <div><h4>دبي</h4><p>برج الأعمال، الخليج التجاري<br><span data-clock="Asia/Dubai" data-locale="ar-AE"></span></p></div>
    <div><h4>الرياض</h4><p>طريق الملك فهد، العليا<br><span data-clock="Asia/Riyadh" data-locale="ar-SA"></span></p></div>
    <div><h4>تواصل</h4><p><a href="mailto:hello@dar.studio">hello@dar.studio</a><br><a href="tel:+97140000000" dir="ltr">+971 4 000 0000</a></p></div>
    <div><h4>تابعنا</h4><p><a href="#">إنستغرام</a> · <a href="#">بنترست</a> · <a href="#">لينكدإن</a></p></div>
  </div>
  <div class="ft__base wrap"><span>© <span data-year></span> دار للتصميم الداخلي — نموذج مرجعي</span><a href="${L('')}">كل الاستوديوهات →</a></div>
</footer>`;

const wrap = (L, inner) => `${header(L)}<main>${inner}</main>${footer(L)}`;

function home(path) {
  const L = linker(path);
  const floats = ['L3', 'K4', 'B8', 'E7', 'L15', 'O9', 'L29', 'A7'];
  return {
    path, title: 'دار — استوديو التصميم الداخلي الفاخر', desc: 'تصميم داخلي فاخر للفلل والقصور والمساحات التجارية في الخليج.',
    body: wrap(L, `
<section class="hero">
  <div class="hero__pin">
    <div class="hero__floats" aria-hidden="true">
      ${floats.map((k, i) => `<div class="float float--${i + 1} media">${img(k, '', { w: 700, sizes: '(max-width: 800px) 40vw, 20vw', eager: i < 4 })}</div>`).join('')}
    </div>
    <div class="hero__center">
      <p class="hero__kicker" data-intro>استوديو تصميم داخلي — منذ ٢٠٠٩</p>
      <h1 class="hero__word" data-intro="scale" data-intro-delay="0.2">دار</h1>
      <p class="hero__tag" data-split="words" data-split-load data-intro-delay="0.6">نصمّم البيوت كما تُروى الحكايات</p>
    </div>
    <div class="hero__scroll" data-intro data-intro-delay="1"><span>مرّر للأسفل</span><i></i></div>
  </div>
</section>

<section class="intro wrap">
  <p class="eyebrow" data-reveal>— فلسفتنا</p>
  <p class="intro__text" data-fill>نؤمن أن البيت ليس جدراناً وأثاثاً، بل ذاكرةٌ تُصنع كل يوم. لذلك نبدأ من طريقة عيشك، ثم نختار الضوء والخامة واللون حتى يصبح المكان امتداداً لك.</p>
</section>

<section class="stats wrap">
  ${[['15', 'عاماً من الخبرة'], ['320', 'مشروعاً منجزاً'], ['6', 'دول في الخليج'], ['48', 'مصمماً ومهندساً']].map(([n, t]) => `
  <div class="stat" data-reveal><strong data-count="${n}">${n}</strong><span>${t}</span></div>`).join('')}
</section>

<section class="ba wrap">
  <div class="ba__head"><p class="eyebrow" data-reveal>— قبل وبعد</p><h2 class="h-xl" data-split="words">التحوّل <span class="gold">الكامل</span></h2><p data-reveal>اسحب المؤشر لترى كيف تحوّلت شقة المارينا من مساحة فارغة إلى بيت دافئ.</p></div>
  <div class="ba__box" data-ba data-reveal>
    <div class="ba__img ba__after media">${img('A7', 'بعد التصميم', { w: 1600 })}</div>
    <div class="ba__img ba__before media">${img('A8', 'قبل التصميم', { w: 1600 })}</div>
    <span class="ba__lbl ba__lbl--b">قبل</span><span class="ba__lbl ba__lbl--a">بعد</span>
    <div class="ba__handle" role="slider" tabindex="0" aria-label="مقارنة قبل وبعد" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><span>⇆</span></div>
  </div>
</section>

<section class="services wrap">
  <div class="services__head"><p class="eyebrow" data-reveal>— خدماتنا</p><h2 class="h-xl" data-split="words">من الفكرة إلى <span class="gold">المفتاح</span></h2></div>
  <div class="services__grid">
    ${[['تصميم داخلي متكامل', 'مخططات، إضاءة، أثاث، وتفاصيل حتى آخر قطعة ديكور.', 'M4 20V9l8-5l8 5v11M9 20v-6h6v6'], ['عمارة داخلية', 'إعادة توزيع المساحات، أسقف، نجارة، وتفاصيل معمارية مخصصة.', 'M3 21h18M5 21V7l7-4l7 4v14M9 9h6M9 13h6M9 17h6'], ['تأثيث وتنسيق', 'اختيار القطع من أفضل العلامات العالمية وتنفيذ أثاث مفصّل.', 'M4 12h16v5H4zM6 17v3M18 17v3M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4'], ['إدارة التنفيذ', 'فريق إشراف يتابع كل مرحلة ويسلّمك بيتك جاهزاً للسكن.', 'M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z']].map(([t, d, ic], i) => `
    <article class="svc" data-tilt="7" data-reveal>
      <span class="svc__n">${ar(i + 1)}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ic}"/></svg>
      <h3>${t}</h3><p>${d}</p>
    </article>`).join('')}
  </div>
</section>

<section class="works" data-hscroll>
  <div class="works__track" data-hscroll-track>
    <div class="works__intro"><p class="eyebrow">— مشاريع مختارة</p><h2 class="h-xl">أماكن<br>تُعاش <span class="gold">بفخر</span></h2><a href="${L('dar/projects/')}" class="btn-line">كل المشاريع ←</a></div>
    ${projects.map((p, i) => `
    <a class="work" href="${L(`dar/projects/${p.slug}/`)}" data-cursor-label="شاهد">
      <div class="work__img media">${img(p.hero, p.name, { w: 1200, sizes: '(max-width: 800px) 80vw, 38vw', attrs: 'data-hscroll-parallax' })}</div>
      <div class="work__meta"><span>${ar(i + 1)}</span><h3>${p.name}</h3><small>${p.place} — ${p.year}</small></div>
    </a>`).join('')}
  </div>
</section>

<section class="testi wrap">
  <span class="testi__q" aria-hidden="true">”</span>
  <p class="testi__text" data-split="lines">تجربة استثنائية من أول اجتماع حتى استلام المفاتيح. فهموا ذوقنا أكثر مما توقعنا، وصار البيت أجمل من كل الصور التي جمعناها.</p>
  <p class="testi__by" data-reveal>— عائلة المنصوري، فيلا النخيل</p>
</section>

<section class="marquee-band" data-marquee data-mq-speed="50">
  <div class="marquee__track"><span>فخامة</span><i>✦</i><span>دفء</span><i>✦</i><span>هوية</span><i>✦</i><span>ضيافة</span><i>✦</i><span>إتقان</span><i>✦</i></div>
</section>
`),
  };
}

function projectsIndex(path) {
  const L = linker(path);
  return {
    path, title: 'المشاريع — دار', desc: 'مشاريع دار للتصميم الداخلي في الخليج.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>— أعمالنا</p>
  <h1 class="h-hero" data-split="words" data-split-load>مشاريع تحكي <span class="gold">قصص</span> أصحابها</h1>
</section>
<section class="pfilter wrap" data-filter-group>
  <div class="pfilter__bar" data-intro>
    ${[['all', 'الكل'], ['سكني', 'سكني'], ['شقق', 'شقق'], ['ضيافة', 'ضيافة'], ['تجاري', 'تجاري']].map(([f, t], i) => `<button data-filter="${f}" class="${i === 0 ? 'is-active' : ''}" aria-pressed="${i === 0}">${t}</button>`).join('')}
  </div>
  <div class="pgrid" data-filter-grid>
    ${projects.map((p) => `
    <a class="pcard" data-cat="${p.type}" href="${L(`dar/projects/${p.slug}/`)}" data-tilt="4" data-reveal data-cursor-label="شاهد">
      <div class="pcard__img media">${img(p.hero, p.name, { w: 1000, sizes: '(max-width: 800px) 100vw, 33vw' })}</div>
      <div class="pcard__body"><span class="pcard__type">${p.type}</span><h3>${p.name}</h3><p>${p.place} · ${p.year}</p></div>
    </a>`).join('')}
  </div>
</section>`),
  };
}

function projectPage(path, p, i) {
  const L = linker(path);
  const next = projects[(i + 1) % projects.length];
  const [a, b, c, d, e] = p.imgs;
  return {
    path, title: `${p.name} — دار`, desc: p.lede,
    body: wrap(L, `
<section class="pj-hero">
  <div class="pj-hero__img media" data-img-reveal="center load">${img(p.hero, p.name, { eager: true, attrs: 'data-parallax="0.2"' })}</div>
  <div class="pj-hero__txt wrap"><p class="eyebrow" data-intro>${p.type} — ${p.place}</p><h1 class="h-hero" data-split="words" data-split-load>${p.name}</h1></div>
</section>
<section class="pj-info wrap">
  <dl class="pj-facts" data-stagger>
    <div><dt>الموقع</dt><dd>${p.place}</dd></div><div><dt>السنة</dt><dd>${p.year}</dd></div>
    <div><dt>المساحة</dt><dd>${p.area}</dd></div><div><dt>النطاق</dt><dd>تصميم وتنفيذ متكامل</dd></div>
  </dl>
  <div><p class="pj-lede" data-split="lines">${esc(p.lede)}</p>
  <p class="pj-p" data-reveal>بدأنا بجلسات استماع مطوّلة مع العائلة لفهم يومهم: متى يجتمعون، أين يستقبلون الضيوف، وكيف يحبون الضوء في الصباح. ثم طوّرنا مخططاً يوازن بين الخصوصية والانفتاح، واخترنا خامات طبيعية تتقدّم في العمر بجمال.</p></div>
</section>
<section class="pj-gal wrap">
  <div class="pg pg--a media" data-img-reveal="right">${img(a, '', { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw', attrs: 'data-parallax="0.15"' })}</div>
  <div class="pg pg--b media" data-img-reveal="left">${img(b, '', { w: 900, sizes: '(max-width: 800px) 100vw, 35vw', attrs: 'data-parallax="0.15"' })}</div>
  <div class="pg pg--c media" data-img-reveal>${img(c, '', { w: 900, sizes: '(max-width: 800px) 100vw, 35vw', attrs: 'data-parallax="0.15"' })}</div>
  <div class="pg pg--d media" data-img-reveal>${img(d, '', { w: 1400, sizes: '(max-width: 800px) 100vw, 60vw', attrs: 'data-parallax="0.15"' })}</div>
  <div class="pg pg--e media" data-img-reveal="center">${img(e, '', { w: 2000, attrs: 'data-parallax="0.15"' })}</div>
</section>
<a class="pj-next" href="${L(`dar/projects/${next.slug}/`)}" data-cursor-label="التالي">
  <div class="pj-next__img media">${img(next.hero, '', { w: 1800, attrs: 'data-scale-scroll="1.3"' })}</div>
  <div class="pj-next__txt"><p class="eyebrow">المشروع التالي</p><h2 class="h-hero" data-split="words">${next.name}</h2></div>
</a>`),
  };
}

function about(path) {
  const L = linker(path);
  return {
    path, title: 'من نحن — دار', desc: 'تعرّف على فريق دار للتصميم الداخلي.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>— من نحن</p>
  <h1 class="h-hero" data-split="words" data-split-load>بيتٌ من <span class="gold">المصممين</span></h1>
</section>
<section class="ab wrap">
  <div class="ab__img media" data-img-reveal="up load">${img('L16', 'استوديو دار', { eager: true, w: 1400, attrs: 'data-parallax="0.2"' })}</div>
  <div class="ab__txt">
    <p class="intro__text" data-fill>تأسست دار في دبي عام ٢٠٠٩ على يد المهندسة ليلى الحسيني، بحلم بسيط: أن يكون للتصميم الداخلي في الخليج صوتٌ خاص يجمع بين الأصالة والمعاصرة.</p>
    <p data-reveal>اليوم يضم فريقنا ٤٨ مصمماً ومهندساً وحرفياً في دبي والرياض، ونعمل مع أفضل الورش في إيطاليا والمغرب وتركيا لتنفيذ قطع لا تشبه غيرها.</p>
  </div>
</section>
<section class="values wrap">
  ${[['الأصالة', 'نستلهم من تراث المنطقة دون أن نقلّده.'], ['الإتقان', 'التفاصيل الصغيرة هي ما يصنع الفخامة الحقيقية.'], ['الإصغاء', 'كل مشروع يبدأ بالسؤال: كيف تعيش؟']].map(([t, d], i) => `
  <div class="value" data-reveal><span>${ar(i + 1)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</section>
<section class="team wrap">
  <h2 class="h-xl" data-split="words">فريق <span class="gold">القيادة</span></h2>
  <div class="team__grid">
    ${[['P5', 'ليلى الحسيني', 'المؤسسة والمديرة الإبداعية'], ['P6', 'عمر الخطيب', 'مدير العمارة الداخلية'], ['P3', 'سارة العتيبي', 'رئيسة قسم الأثاث'], ['P4', 'خالد النعيمي', 'مدير المشاريع']].map(([k, n, r]) => `
    <figure class="member" data-reveal data-tilt="6"><div class="member__img media">${img(k, n, { w: 600, sizes: '(max-width: 800px) 50vw, 24vw' })}</div><figcaption><strong>${n}</strong><span>${r}</span></figcaption></figure>`).join('')}
  </div>
</section>`),
  };
}

function services(path) {
  const L = linker(path);
  return {
    path, title: 'الخدمات — دار', desc: 'خدمات التصميم الداخلي والعمارة والتأثيث وإدارة التنفيذ.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>— الخدمات</p>
  <h1 class="h-hero" data-split="words" data-split-load>كل ما يحتاجه <span class="gold">بيتك</span></h1>
</section>
<section class="srows wrap" data-preview-list>
  ${[['تصميم داخلي متكامل', 'من المخطط الأولي حتى آخر وسادة.', 'L15'], ['عمارة داخلية', 'إعادة تشكيل المساحات والتفاصيل المعمارية.', 'L3'], ['تأثيث مخصص', 'قطع تُصنع خصيصاً لبيتك في أفضل الورش.', 'D10'], ['تصميم الإضاءة', 'سيناريوهات إضاءة تغيّر المزاج على مدار اليوم.', 'L11'], ['الضيافة والفنادق', 'مجالس، لوبيهات، وأجنحة فندقية.', 'O9'], ['إدارة التنفيذ', 'إشراف كامل وتسليم على المفتاح.', 'K4']].map(([t, d, k], i) => `
  <a class="srow" href="${L('dar/contact/')}" data-preview="${src(k, 800)}" data-reveal>
    <span class="srow__n">${ar(i + 1)}</span><span class="srow__t">${t}</span><span class="srow__d">${d}</span><span class="srow__a">←</span>
  </a>`).join('')}
</section>
<section class="steps wrap">
  <h2 class="h-xl" data-split="words">رحلة المشروع</h2>
  <ol class="steps__list">
    ${[['الاستشارة', 'زيارة الموقع والاستماع لاحتياجاتك.'], ['المفهوم', 'لوحات إلهام ومخططات أولية وتصوّر ثلاثي الأبعاد.'], ['التصميم التفصيلي', 'مخططات تنفيذية، خامات، وجداول كميات.'], ['التنفيذ', 'إشراف يومي وتنسيق مع المقاولين والموردين.'], ['التسليم', 'تنسيق نهائي وتسليم البيت جاهزاً للسكن.']].map(([t, d], i) => `
    <li class="step" data-reveal><span class="step__dot">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}
  </ol>
</section>`),
  };
}

function contact(path) {
  const L = linker(path);
  return {
    path, title: 'تواصل معنا — دار', desc: 'احجز استشارة مع فريق دار.',
    body: wrap(L, `
<section class="phead wrap">
  <p class="eyebrow" data-intro>— تواصل معنا</p>
  <h1 class="h-hero" data-split="words" data-split-load>لنبدأ <span class="gold">الحكاية</span></h1>
</section>
<section class="ct wrap">
  <div class="ct__form" data-form-wrap>
    <form data-form data-reveal>
      <div class="ct__row"><label><span>الاسم الكامل</span><input required autocomplete="name"></label><label><span>رقم الجوال</span><input type="tel" dir="ltr" autocomplete="tel"></label></div>
      <label><span>البريد الإلكتروني</span><input required type="email" dir="ltr" autocomplete="email"></label>
      <div class="ct__row"><label><span>نوع المشروع</span><select><option>فيلا</option><option>شقة</option><option>قصر</option><option>مكتب</option><option>فندق / مطعم</option></select></label>
      <label><span>المدينة</span><select><option>دبي</option><option>أبوظبي</option><option>الرياض</option><option>جدة</option><option>الدوحة</option><option>الكويت</option><option>عمّان</option></select></label></div>
      <label><span>المساحة التقريبية: <output data-range-out>400</output> م²</span><input type="range" min="80" max="3000" step="20" value="400" data-range></label>
      <label><span>حدّثنا عن مشروعك</span><textarea rows="4"></textarea></label>
      <button class="btn-gold btn-lg" data-magnetic>أرسل الطلب</button>
    </form>
    <div class="form-success"><h2 class="h-xl">شكراً لك</h2><p>وصلنا طلبك، وسيتواصل معك أحد مستشارينا خلال ٢٤ ساعة.</p></div>
  </div>
  <aside class="ct__aside" data-stagger>
    <div class="ct__card"><h4>دبي</h4><p>برج الأعمال، الخليج التجاري<br>الأحد – الخميس · ٩ص – ٦م</p></div>
    <div class="ct__card"><h4>الرياض</h4><p>طريق الملك فهد، حي العليا<br>الأحد – الخميس · ٩ص – ٦م</p></div>
    <div class="ct__card"><h4>واتساب</h4><p><a href="#" dir="ltr">+971 50 000 0000</a></p></div>
  </aside>
</section>`),
  };
}

export default {
  site,
  card: { title: 'دار', style: 'عربي فاخر RTL — خليجي', ref: 'Elite Design Studio · Gulf luxury', img: 'E7', color: '#0f2a24', accent: '#c9a45c',
    motion: 'صور تطفو حول الاسم مع السكرول، مقارنة قبل/بعد بالسحب، كروت ثلاثية الأبعاد، معرض أفقي RTL، عدّادات' },
  pages: () => [
    home('dar/index.html'),
    projectsIndex('dar/projects/index.html'),
    ...projects.map((p, i) => projectPage(`dar/projects/${p.slug}/index.html`, p, i)),
    about('dar/about/index.html'),
    services('dar/services/index.html'),
    contact('dar/contact/index.html'),
  ],
};
