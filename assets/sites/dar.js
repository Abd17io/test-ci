/* دار — signature motion */
Studio.onReady(function (S) {
  var g = S.gsap;

  // Hero: the name stays pinned while photographs float up past it.
  var hero = S.$('.hero');
  if (hero) {
    var tl = g.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=160%', scrub: 0.8, pin: '.hero__pin' } });
    S.$$('.float').forEach(function (f, i) {
      var speed = [1.6, 1.1, 1.9, 1.3, 1.7, 1.2, 1.5, 1.8][i] || 1.4;
      tl.fromTo(f, { y: 0, rotate: (i % 2 ? 1 : -1) * 6 }, { y: function () { return -innerHeight * speed; }, rotate: (i % 2 ? -1 : 1) * 4, ease: 'none' }, 0);
    });
    tl.to('.hero__word', { scale: 0.75, opacity: 0.25, ease: 'none' }, 0.2)
      .to('.hero__tag, .hero__kicker', { opacity: 0, y: -40, ease: 'none' }, 0.1)
      .to('.hero__scroll', { opacity: 0, ease: 'none' }, 0);
    // Gentle floating idle motion.
    S.$$('.float img').forEach(function (im, i) {
      g.to(im, { y: i % 2 ? 10 : -10, duration: 2.6 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    g.from('.float', { opacity: 0, yPercent: 60, duration: 1.6, ease: 'expo.out', stagger: 0.08, delay: 0.5 });
  }

  // Before / after comparison (mouse, touch and keyboard).
  S.$$('[data-ba]').forEach(function (box) {
    var handle = S.$('.ba__handle', box), dragging = false;
    var set = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      box.style.setProperty('--pos', pct + '%');
      handle.setAttribute('aria-valuenow', Math.round(pct));
    };
    var fromEvent = function (e) { var r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
    box.addEventListener('pointerdown', function (e) { dragging = true; box.setPointerCapture(e.pointerId); fromEvent(e); });
    box.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    box.addEventListener('pointerup', function () { dragging = false; });
    box.addEventListener('pointercancel', function () { dragging = false; });
    handle.addEventListener('keydown', function (e) {
      var cur = parseFloat(box.style.getPropertyValue('--pos')) || 50;
      if (e.key === 'ArrowLeft') { set(cur - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(cur + 5); e.preventDefault(); }
    });
    // Teaser sweep when it first appears.
    var o = { v: 50 };
    S.ScrollTrigger.create({ trigger: box, start: 'top 70%', once: true, onEnter: function () {
      g.timeline().to(o, { v: 20, duration: 1, ease: 'power3.inOut', onUpdate: function () { set(o.v); } })
        .to(o, { v: 80, duration: 1.3, ease: 'power3.inOut', onUpdate: function () { set(o.v); } })
        .to(o, { v: 50, duration: 1, ease: 'power3.inOut', onUpdate: function () { set(o.v); } });
    } });
  });

  // Area slider readout on the contact form.
  S.$$('[data-range]').forEach(function (r) {
    var out = r.closest('label').querySelector('[data-range-out]');
    var fmt = function () { out.textContent = Number(r.value).toLocaleString('ar-EG'); };
    r.addEventListener('input', fmt); fmt();
  });
});
