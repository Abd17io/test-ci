/*
 * Studio motion core — shared by every site in this repo.
 * Declarative attributes (data-split, data-reveal, data-marquee, …) are wired up here;
 * each site adds its own signature effects in assets/sites/<site>.js via Studio.onReady().
 *
 * Animations intentionally run on every device, including when the OS "reduce motion"
 * setting is on (requested by the project owner).
 */
(function () {
  'use strict';
  var gsap = window.gsap;
  if (!gsap) return;
  var ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText, Flip = window.Flip;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  ScrollTrigger.config({ ignoreMobileResize: true });
  window.__STUDIO_STARTED__ = true;

  var html = document.documentElement;
  var body = document.body;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isRTL = html.dir === 'rtl';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var readyQueue = [], introHooks = [], started = false;
  var Studio = window.Studio = {
    gsap: gsap, ScrollTrigger: ScrollTrigger, fine: fine, isRTL: isRTL, $: $, $$: $$, lenis: null, hTween: null,
    onReady: function (fn) { started ? fn(Studio) : readyQueue.push(fn); },
    onIntro: function (fn) { introHooks.push(fn); },
    preloaderOut: null,
    navigate: null
  };

  /* ---------------------------------------------------------------- images */
  var pool = window.__FALLBACK__ || [];
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function fallback(img) {
    var n = +(img.dataset.fb || 0);
    if (!img.dataset.orig) img.dataset.orig = img.currentSrc || img.src;
    if (n < 3 && pool.length) {
      img.dataset.fb = n + 1;
      img.removeAttribute('srcset');
      img.src = 'https://images.unsplash.com/photo-' + pool[(hash(img.dataset.orig) + n) % pool.length] + '?auto=format&fit=crop&w=1400&q=80';
    } else {
      img.classList.add('img-failed');
      if (img.parentElement && img.parentElement.classList.contains('media')) img.parentElement.classList.add('img-host-failed');
    }
  }
  window.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') fallback(e.target); }, true);
  $$('img').forEach(function (img) { if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fallback(img); });

  /* ---------------------------------------------------------------- smooth scroll */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, anchors: true, respectReducedMotion: false });
    Studio.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  var velocity = 0;
  if (lenis) lenis.on('scroll', function (l) { velocity = l.velocity || 0; });

  /* ---------------------------------------------------------------- page transitions */
  var pt = $('.pt');
  var panels = pt ? $$('.pt__panel', pt) : [];
  var ptLabel = pt ? $('.pt__label', pt) : null;
  var ptType = body.dataset.pt || 'fade';

  function ptHide() {
    if (!pt) return;
    gsap.set(panels, { scaleY: 0, yPercent: 0, xPercent: 0, opacity: 0, clipPath: 'none' });
    if (ptLabel) gsap.set(ptLabel, { opacity: 0 });
  }
  function ptIn() {
    var tl = gsap.timeline();
    if (!pt) return tl;
    if (ptLabel) tl.to(ptLabel, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 0);
    if (ptType === 'panels') {
      gsap.set(panels, { transformOrigin: 'top' });
      tl.to(panels, { scaleY: 0, duration: 0.9, ease: 'expo.inOut', stagger: { each: 0.06, from: isRTL ? 'end' : 'start' } }, 0.1);
    } else if (ptType === 'wipe') {
      tl.to(panels, { yPercent: -100, duration: 1, ease: 'expo.inOut', stagger: 0.08 }, 0.1);
    } else if (ptType === 'circle') {
      tl.fromTo(panels, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 1, ease: 'expo.inOut' }, 0.05);
    } else if (ptType === 'skew') {
      gsap.set(panels, { transformOrigin: 'top' });
      tl.to(panels, { yPercent: -110, skewY: -6, duration: 1, ease: 'expo.inOut', stagger: 0.08 }, 0.05);
    } else {
      tl.to(panels, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 0);
    }
    return tl;
  }
  function ptOut(href, x, y) {
    if (!pt) { location.href = href; return; }
    if (lenis) lenis.stop();
    var tl = gsap.timeline({ onComplete: function () { location.href = href; } });
    var px = ((x == null ? innerWidth / 2 : x) / innerWidth * 100).toFixed(1) + '%';
    var py = ((y == null ? innerHeight / 2 : y) / innerHeight * 100).toFixed(1) + '%';
    if (ptType === 'panels') {
      gsap.set(panels, { transformOrigin: 'bottom', opacity: 1 });
      tl.fromTo(panels, { scaleY: 0 }, { scaleY: 1, duration: 0.75, ease: 'expo.inOut', stagger: { each: 0.05, from: isRTL ? 'end' : 'start' } });
    } else if (ptType === 'wipe') {
      gsap.set(panels, { scaleY: 1, opacity: 1 });
      tl.fromTo(panels, { yPercent: 100 }, { yPercent: 0, duration: 0.85, ease: 'expo.inOut', stagger: 0.08 });
    } else if (ptType === 'circle') {
      gsap.set(panels, { scaleY: 1, opacity: 1 });
      tl.fromTo(panels, { clipPath: 'circle(0% at ' + px + ' ' + py + ')' }, { clipPath: 'circle(150% at ' + px + ' ' + py + ')', duration: 0.9, ease: 'expo.inOut' });
    } else if (ptType === 'skew') {
      gsap.set(panels, { scaleY: 1, opacity: 1, transformOrigin: 'bottom' });
      tl.fromTo(panels, { yPercent: 110, skewY: 6 }, { yPercent: 0, skewY: 0, duration: 0.8, ease: 'expo.inOut', stagger: 0.08 });
    } else {
      gsap.set(panels, { scaleY: 1 });
      tl.fromTo(panels, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    }
    if (ptLabel) tl.fromTo(ptLabel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.35');
    tl.to({}, { duration: 0.1 });
  }
  Studio.navigate = ptOut;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-no-pt')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    if (url.href === location.href) { e.preventDefault(); return; }
    e.preventDefault();
    ptOut(url.href, e.clientX, e.clientY);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { ptHide(); closeMenu(true); if (lenis) lenis.start(); }
  });

  /* ---------------------------------------------------------------- menu */
  var menuTl = null;
  function openMenu() {
    var menu = $('.menu'); if (!menu) return;
    html.classList.add('menu-open');
    $$('[data-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    if (lenis) lenis.stop();
    if (menuTl) menuTl.kill();
    menuTl = gsap.timeline();
    menuTl.fromTo(menu, { clipPath: isRTL ? 'inset(0 0 0 100%)' : 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
      .fromTo($$('[data-menu-item]', menu), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.35');
  }
  function closeMenu(instant) {
    if (!html.classList.contains('menu-open')) return;
    var menu = $('.menu');
    $$('[data-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (menuTl) menuTl.kill();
    var done = function () { html.classList.remove('menu-open'); if (lenis && !instant) lenis.start(); };
    if (instant) { done(); return; }
    menuTl = gsap.timeline({ onComplete: done });
    menuTl.to(menu, { clipPath: isRTL ? 'inset(0 100% 0 0)' : 'inset(100% 0 0% 0)', duration: 0.7, ease: 'expo.inOut' });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-menu-toggle]');
    if (!t) return;
    html.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------------------------------------------------------------- header state */
  function initHeader() {
    var header = $('[data-header]'); if (!header) return;
    var hide = header.dataset.header === 'hide', last = 0;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      if (hide && !html.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 240 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------- split text */
  var introSplits = [];
  function initSplits() {
    $$('[data-split]').forEach(function (el) {
      var kind = el.dataset.split || 'lines';
      var type = kind === 'chars' ? 'lines,words,chars' : kind === 'words' ? 'lines,words' : 'lines';
      var revealed = false;
      var inst = SplitText.create(el, {
        type: type, mask: 'lines', linesClass: 'line', autoSplit: true,
        onSplit: function (self) { if (!revealed) gsap.set(self[kind], { yPercent: 120, rotate: kind === 'chars' ? 6 : 0 }); }
      });
      el.style.visibility = 'visible';
      var play = function (delay) {
        revealed = true;
        return gsap.to(inst[kind], {
          yPercent: 0, rotate: 0, duration: kind === 'chars' ? 1 : 1.2, ease: 'expo.out', delay: delay || 0,
          stagger: kind === 'chars' ? 0.025 : kind === 'words' ? 0.04 : 0.09
        });
      };
      if (el.hasAttribute('data-split-load')) introSplits.push({ el: el, play: play });
      else ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { play(+(el.dataset.delay || 0)); } });
    });
  }

  /* ---------------------------------------------------------------- fill text */
  function initFill() {
    $$('[data-fill]').forEach(function (el) {
      var s = SplitText.create(el, { type: 'words' });
      gsap.fromTo(s.words, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true }
      });
    });
  }

  /* ---------------------------------------------------------------- reveals */
  var REVEAL_FROM = {
    up: { y: 70 }, down: { y: -70 }, left: { x: isRTL ? -70 : 70 }, right: { x: isRTL ? 70 : -70 },
    fade: {}, scale: { scale: 0.88 }, blur: { filter: 'blur(14px)', y: 30 }
  };
  function revealFrom(el) { return Object.assign({ opacity: 0 }, REVEAL_FROM[el.dataset.reveal || el.dataset.intro] || REVEAL_FROM.up); }
  function revealTo(extra) { return Object.assign({ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }, extra || {}); }

  function initReveals() {
    var items = $$('[data-reveal]');
    items.forEach(function (el) { gsap.set(el, revealFrom(el)); });
    ScrollTrigger.batch(items, {
      start: 'top 92%', once: true,
      onEnter: function (batch) { gsap.to(batch, revealTo({ stagger: 0.1 })); }
    });
    $$('[data-stagger]').forEach(function (el) {
      var kids = Array.prototype.slice.call(el.children);
      gsap.set(kids, { opacity: 0, y: 50 });
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
        gsap.to(kids, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: +(el.dataset.stagger || 0.08) });
      } });
    });
  }

  var introImgs = [];
  function imgRevealTween(el) {
    var dir = (el.dataset.imgReveal || 'up').split(' ')[0];
    var from = { up: 'inset(100% 0% 0% 0%)', down: 'inset(0% 0% 100% 0%)', left: 'inset(0% 0% 0% 100%)', right: 'inset(0% 100% 0% 0%)', center: 'inset(50% 50% 50% 50%)', mid: 'inset(0% 50% 0% 50%)' }[dir];
    var tl = gsap.timeline({ paused: true });
    tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
    var inner = el.querySelector('img');
    if (inner) tl.fromTo(inner, { scale: 1.4 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
    return tl;
  }
  function initImgReveals() {
    $$('[data-img-reveal]').forEach(function (el) {
      var tl = imgRevealTween(el);
      if (/load/.test(el.dataset.imgReveal)) introImgs.push({ el: el, tl: tl });
      else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { tl.play(); } });
    });
  }

  /* ---------------------------------------------------------------- parallax & scrub */
  function initParallax() {
    $$('[data-parallax]').forEach(function (el) {
      var amt = parseFloat(el.dataset.parallax) || 0.15;
      gsap.fromTo(el, { yPercent: -amt * 50 }, {
        yPercent: amt * 50, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    $$('[data-speed]').forEach(function (el) {
      var sp = parseFloat(el.dataset.speed) || 0.2;
      gsap.to(el, { y: function () { return -sp * innerHeight * 0.6; }, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    });
    $$('[data-scale-scroll]').forEach(function (el) {
      gsap.fromTo(el, { scale: parseFloat(el.dataset.scaleScroll) || 1.25 }, { scale: 1, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('[data-rotate-scroll]').forEach(function (el) {
      gsap.to(el, { rotate: parseFloat(el.dataset.rotateScroll) || 180, ease: 'none',
        scrollTrigger: { trigger: body, start: 'top top', end: 'bottom bottom', scrub: true } });
    });
    $$('[data-progress]').forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: isRTL ? 'right' : 'left',
        scrollTrigger: { trigger: body, start: 'top top', end: 'bottom bottom', scrub: true } });
    });
  }

  /* ---------------------------------------------------------------- horizontal pinned scroll */
  function initHScroll() {
    $$('[data-hscroll]').forEach(function (sec) {
      var track = $('[data-hscroll-track]', sec); if (!track) return;
      var dist = function () { return Math.max(0, track.scrollWidth - sec.clientWidth); };
      var tween = gsap.to(track, {
        x: function () { return (isRTL ? 1 : -1) * dist(); }, ease: 'none',
        scrollTrigger: { trigger: sec, pin: true, scrub: 0.8, start: 'top top', end: function () { return '+=' + dist(); }, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      Studio.hTween = tween;
      $$('[data-hscroll-parallax]', sec).forEach(function (img) {
        gsap.fromTo(img, { xPercent: -12 }, { xPercent: 12, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
  }

  /* ---------------------------------------------------------------- marquee */
  var marquees = [];
  function buildMarquee(el) {
    var track = $('.marquee__track', el); if (!track) return;
    if (!el._orig) el._orig = Array.prototype.slice.call(track.children).map(function (n) { return n.cloneNode(true); });
    track.innerHTML = '';
    el._orig.forEach(function (n) { track.appendChild(n.cloneNode(true)); });
    var guard = 0;
    while (track.scrollWidth < el.clientWidth * 1.1 && guard++ < 12) el._orig.forEach(function (n) { track.appendChild(n.cloneNode(true)); });
    Array.prototype.slice.call(track.children).forEach(function (n) { var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });
    var w = track.scrollWidth / 2, speed = parseFloat(el.dataset.mqSpeed) || 60, dir = +(el.dataset.dir || 1);
    if (el._tween) el._tween.kill();
    el._tween = gsap.fromTo(track, { x: dir > 0 ? 0 : -w }, { x: dir > 0 ? -w : 0, duration: w / speed, ease: 'none', repeat: -1 });
  }
  function initMarquees() {
    marquees = $$('[data-marquee]');
    marquees.forEach(buildMarquee);
    var lastW = innerWidth;
    window.addEventListener('resize', debounce(function () { if (innerWidth !== lastW) { lastW = innerWidth; marquees.forEach(buildMarquee); } }, 250));
    gsap.ticker.add(function () {
      var boost = 1 + Math.min(Math.abs(velocity) * 0.25, 6);
      marquees.forEach(function (m) {
        if (!m._tween || m.hasAttribute('data-no-boost')) return;
        var target = boost * (m.hasAttribute('data-scroll-dir') && velocity < -0.2 ? -1 : 1);
        m._ts = gsap.utils.interpolate(m._ts || 1, target, 0.1);
        m._tween.timeScale(m._ts);
      });
      velocity *= 0.9;
    });
  }

  /* ---------------------------------------------------------------- counters */
  function initCounters() {
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count), obj = { v: 0 }, suf = el.dataset.suffix || '';
      var fmt = function (v) { return Math.round(v).toLocaleString(html.lang === 'ar' ? 'ar-EG' : 'en-US') + suf; };
      el.textContent = fmt(0);
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () {
        gsap.to(obj, { v: end, duration: 2.2, ease: 'expo.out', onUpdate: function () { el.textContent = fmt(obj.v); } });
      } });
    });
  }

  /* ---------------------------------------------------------------- pointer effects */
  function initCursor() {
    var c = $('.cursor'); if (!c || !fine) return;
    var label = $('.cursor__label', c);
    var xTo = gsap.quickTo(c, 'x', { duration: 0.25, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: 0.25, ease: 'power3' });
    gsap.set(c, { opacity: 0 });
    var shown = false;
    window.addEventListener('pointermove', function (e) { xTo(e.clientX); yTo(e.clientY); if (!shown) { shown = true; gsap.to(c, { opacity: 1, duration: 0.4 }); } });
    document.addEventListener('pointerover', function (e) {
      var l = e.target.closest('[data-cursor-label]');
      if (l) { label.textContent = l.dataset.cursorLabel; c.classList.add('has-label'); c.classList.remove('is-hover'); return; }
      c.classList.remove('has-label');
      c.classList.toggle('is-hover', !!e.target.closest('a, button, [data-cursor-hover], input, textarea, select, label'));
    });
    document.addEventListener('pointerleave', function () { gsap.to(c, { opacity: 0 }); });
    document.addEventListener('pointerenter', function () { gsap.to(c, { opacity: 1 }); });
  }
  function initMagnetic() {
    if (!fine) return;
    $$('[data-magnetic]').forEach(function (el) {
      var s = parseFloat(el.dataset.magnetic) || 0.35;
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * s); yTo((e.clientY - r.top - r.height / 2) * s);
      });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: true });
      });
    });
  }
  function initTilt() {
    if (!fine) return;
    $$('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 8;
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: px * max * 2, rotateX: -py * max * 2, duration: 0.5, ease: 'power2.out' });
      });
      el.addEventListener('pointerleave', function () { gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' }); });
    });
  }
  function initPreviewLists() {
    $$('[data-preview-list]').forEach(function (list) {
      if (!fine) return;
      var box = document.createElement('div');
      box.className = 'hover-preview';
      box.innerHTML = '<img alt="">';
      document.body.appendChild(box);
      var im = box.firstChild;
      var xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' }), yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
      var rTo = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3' });
      var lastX = 0;
      list.addEventListener('pointermove', function (e) {
        var w = box.offsetWidth, h = box.offsetHeight;
        xTo(e.clientX - w / 2); yTo(e.clientY - h / 2);
        rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6)); lastX = e.clientX;
      });
      $$('[data-preview]', list).forEach(function (item) {
        item.addEventListener('pointerenter', function () {
          if (im.getAttribute('src') !== item.dataset.preview) {
            im.src = item.dataset.preview;
            gsap.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 0.8, ease: 'expo.out' });
          }
          gsap.to(box, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
        });
      });
      list.addEventListener('pointerleave', function () { gsap.to(box, { opacity: 0, scale: 0.8, duration: 0.4 }); });
    });
  }

  /* ---------------------------------------------------------------- accordion, filters, forms */
  function initAccordions() {
    $$('[data-acc]').forEach(function (group) {
      var items = $$('[data-acc-item]', group);
      items.forEach(function (item) {
        var btn = $('[data-acc-btn]', item), bodyEl = $('[data-acc-body]', item);
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', function () {
          var open = item.classList.contains('is-open');
          items.forEach(function (o) {
            if (o !== item && o.classList.contains('is-open')) {
              o.classList.remove('is-open'); $('[data-acc-btn]', o).setAttribute('aria-expanded', 'false');
              gsap.to($('[data-acc-body]', o), { height: 0, duration: 0.7, ease: 'expo.inOut' });
            }
          });
          item.classList.toggle('is-open', !open);
          btn.setAttribute('aria-expanded', String(!open));
          gsap.to(bodyEl, { height: open ? 0 : 'auto', duration: 0.8, ease: 'expo.inOut', onComplete: function () { ScrollTrigger.refresh(); } });
        });
      });
      if (group.hasAttribute('data-acc-open') && items[0]) $('[data-acc-btn]', items[0]).click();
    });
  }
  function initFilters() {
    $$('[data-filter-group]').forEach(function (group) {
      var grid = $('[data-filter-grid]', group);
      var btns = $$('[data-filter]', group);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var f = b.dataset.filter;
          btns.forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
          var items = $$('[data-cat]', grid);
          var state = Flip.getState(items);
          items.forEach(function (it) { it.style.display = f === 'all' || it.dataset.cat.split(' ').indexOf(f) > -1 ? '' : 'none'; });
          Flip.from(state, {
            duration: 0.8, ease: 'expo.inOut', absolute: true, scale: true, nested: true,
            onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out' }); },
            onLeave: function (els) { return gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.5 }); },
            onComplete: function () { ScrollTrigger.refresh(); }
          });
        });
      });
    });
  }
  function initForms() {
    $$('[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var wrap = form.closest('[data-form-wrap]') || form.parentElement;
        gsap.to(form, { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in', onComplete: function () {
          wrap.classList.add('form-sent');
          var ok = $('.form-success', wrap);
          if (ok) gsap.fromTo(ok.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 });
          ScrollTrigger.refresh();
        } });
      });
    });
  }
  function initClocks() {
    var clocks = $$('[data-clock]'); if (!clocks.length) return;
    var tick = function () {
      clocks.forEach(function (el) {
        try { el.textContent = new Date().toLocaleTimeString(el.dataset.locale || 'en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.clock }); } catch (e) { /* unknown zone */ }
      });
    };
    tick(); setInterval(tick, 15000);
  }
  function initBgSwitch() {
    $$('[data-bg]').forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onToggle: function (self) {
          if (!self.isActive) return;
          gsap.to(html, { '--bg': sec.dataset.bg, '--ink': sec.dataset.ink || null, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
        }
      });
    });
  }

  /* ---------------------------------------------------------------- intro / preloader */
  function playIntro() {
    var tl = gsap.timeline();
    var els = $$('[data-intro]');
    els.forEach(function (el) { gsap.set(el, revealFrom(el)); });
    var seq = [];
    els.forEach(function (el) { seq.push({ el: el, run: function () { return gsap.to(el, revealTo()); } }); });
    introSplits.forEach(function (s) { seq.push({ el: s.el, run: function () { return s.play(0); } }); });
    introImgs.forEach(function (s) { seq.push({ el: s.el, run: function () { return s.tl.play(); } }); });
    seq.sort(function (a, b) { return a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
    seq.forEach(function (s, i) {
      var d = parseFloat(s.el.dataset.introDelay);
      tl.add(function () { s.run(); }, isNaN(d) ? i * 0.09 : d);
    });
    introHooks.forEach(function (fn) { fn(tl); });
    return tl;
  }
  function runPreloader(done) {
    var pre = $('.preloader');
    if (!pre) return false;
    var key = 'pl-' + (body.className.match(/s-([\w-]+)/) || [0, 'site'])[1];
    var seen = false;
    try { seen = sessionStorage.getItem(key); sessionStorage.setItem(key, '1'); } catch (e) { /* storage blocked */ }
    if (seen) { pre.remove(); return false; }
    ptHide();
    if (lenis) lenis.stop();
    window.scrollTo(0, 0);
    var counter = $('[data-preloader-count]', pre), bar = $('[data-preloader-bar]', pre), obj = { v: 0 };
    var tl = gsap.timeline({ onComplete: function () { pre.remove(); if (lenis) lenis.start(); } });
    tl.from($$('[data-preloader-item]', pre), { yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 })
      .to(obj, { v: 100, duration: 2, ease: 'power3.inOut', onUpdate: function () {
        if (counter) counter.textContent = String(Math.round(obj.v)).padStart(3, '0');
        if (bar) gsap.set(bar, { scaleX: obj.v / 100 });
      } }, 0.2);
    if (Studio.preloaderOut) Studio.preloaderOut(tl, pre);
    else tl.to(pre, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '+=0.15');
    tl.add(done, '-=0.55');
    return true;
  }

  /* ---------------------------------------------------------------- utils */
  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }
  Studio.debounce = debounce;
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------------------------------------------------------------- boot */
  var booted = false;
  function boot() {
    if (booted) return; booted = true;
    initHeader();
    initSplits(); initFill(); initReveals(); initImgReveals(); initParallax(); initHScroll();
    initMarquees(); initCounters(); initCursor(); initMagnetic(); initTilt(); initPreviewLists();
    initAccordions(); initFilters(); initForms(); initClocks(); initBgSwitch();
    started = true;
    readyQueue.forEach(function (fn) { try { fn(Studio); } catch (err) { console.error(err); } });
    if (!runPreloader(function () { playIntro(); })) {
      ptIn();
      gsap.delayedCall(0.35, playIntro);
    }
    ScrollTrigger.refresh();
  }
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 1500); })]).then(boot);
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
