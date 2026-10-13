/* VANTA — signature motion */
Studio.onReady(function (S) {
  var g = S.gsap;

  // Image trail in the hero: follows the cursor, or plays by itself on touch screens.
  var hero = S.$('[data-trail]');
  if (hero) {
    var srcs = JSON.parse(hero.dataset.trail), pool = [], idx = 0, last = { x: -999, y: -999 }, z = 1;
    for (var i = 0; i < 10; i++) {
      var im = document.createElement('img');
      im.className = 'trail-img'; im.alt = ''; im.src = srcs[i % srcs.length]; im.decoding = 'async';
      g.set(im, { opacity: 0, scale: 0 });
      hero.appendChild(im); pool.push(im);
    }
    var spawn = function (x, y) {
      var im = pool[idx++ % pool.length], w = im.offsetWidth || 180, h = im.offsetHeight || 240;
      g.killTweensOf(im);
      g.set(im, { x: x - w / 2, y: y - h / 2, zIndex: z++, rotate: g.utils.random(-12, 12), opacity: 1, scale: 0.2 });
      g.timeline()
        .to(im, { scale: 1, duration: 0.5, ease: 'expo.out' })
        .to(im, { y: '+=' + 120, scale: 0.6, opacity: 0, duration: 0.9, ease: 'power3.in' }, 0.5);
    };
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (Math.hypot(x - last.x, y - last.y) > 90) { spawn(x, y); last = { x: x, y: y }; }
    });
    if (!S.fine) {
      var t = 0;
      setInterval(function () {
        var r = hero.getBoundingClientRect(); if (r.bottom < 0) return;
        t += 0.55;
        spawn(r.width / 2 + Math.sin(t) * r.width * 0.32, r.height * 0.42 + Math.sin(t * 1.7) * r.height * 0.2);
      }, 380);
    }
    g.to('.hero__title', { yPercent: 35, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Big type leans into the scroll direction (velocity skew).
  var skewTargets = S.$$('.case__title, .wrow__t, .phead__title, .svc-row__t, .vrows');
  if (skewTargets.length && S.lenis) {
    var skewTo = skewTargets.map(function (el) { return g.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' }); });
    S.lenis.on('scroll', function (l) {
      var s = g.utils.clamp(-8, 8, (l.velocity || 0) * -0.25);
      skewTo.forEach(function (fn) { fn(s); });
    });
    g.ticker.add(function () { if (S.lenis && Math.abs(S.lenis.velocity || 0) < 0.1) skewTo.forEach(function (fn) { fn(0); }); });
  }

  // Case studies open up from an inset frame.
  S.$$('.case').forEach(function (c) {
    g.fromTo(c, { clipPath: 'inset(12% 8% 12% 8% round 24px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: c, start: 'top bottom', end: 'top 15%', scrub: true }
    });
  });

  // Footer CTA rows tilt in.
  var ft = S.$('.ft .vrow');
  if (ft) g.fromTo(ft, { rotate: -6 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '.ft', start: 'top bottom', end: 'top 40%', scrub: true } });
});
