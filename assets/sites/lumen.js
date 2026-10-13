/* LUMEN — signature motion */
Studio.onReady(function (S) {
  var g = S.gsap, mm = g.matchMedia();

  // Cinematic zoom: the framed photo opens to full screen while the headline splits apart.
  var stage = S.$('.zoom__stage');
  if (stage) {
    mm.add({ wide: '(min-width: 901px)', narrow: '(max-width: 900px)' }, function (ctx) {
      var from = ctx.conditions.wide ? 'inset(30% 34% 30% 34% round 24px)' : 'inset(32% 18% 32% 18% round 20px)';
      g.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: '+=150%', scrub: 0.7, pin: true } })
        .fromTo('.zoom__card', { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut' }, 0)
        .fromTo('.zoom__card img', { scale: 1.3 }, { scale: 1, ease: 'none' }, 0)
        .to('.zoom__l', { xPercent: -60, opacity: 0, ease: 'power1.in' }, 0)
        .to('.zoom__r', { xPercent: 60, opacity: 0, ease: 'power1.in' }, 0)
        .to('.zoom__sub', { opacity: 0, ease: 'none' }, 0)
        .fromTo('.zoom__over p', { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 0.62)
        .to('.zoom__card img', { filter: 'brightness(.55)', ease: 'none', duration: 0.4 }, 0.6);
    });
  }

  // Sector tabs: autoplay with progress bar, click to jump.
  S.$$('[data-tabs]').forEach(function (box) {
    var tabs = S.$$('[data-tab]', box), panels = S.$$('.sectors__panel', box), cur = 0, bar;
    function go(n) {
      if (bar) bar.kill();
      tabs.forEach(function (t, i) { t.classList.toggle('is-on', i === n); t.setAttribute('aria-selected', String(i === n)); g.set(S.$('.bar', t), { scaleX: 0 }); });
      if (n !== cur) {
        var out = panels[cur], inn = panels[n];
        inn.classList.add('is-on');
        g.set(inn, { zIndex: 2 }); g.set(out, { zIndex: 1 });
        g.fromTo(S.$('.sectors__img', inn), { clipPath: 'inset(0 0 0 100% round 18px)' }, { clipPath: 'inset(0 0 0 0% round 18px)', duration: 1.1, ease: 'expo.inOut' });
        g.fromTo(S.$('img', inn), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
        g.fromTo(S.$('p', inn), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
        g.delayedCall(1.1, function () { if (cur !== panels.indexOf(out)) out.classList.remove('is-on'); });
        cur = n;
      }
      bar = g.to(S.$('.bar', tabs[n]), { scaleX: 1, duration: 5, ease: 'none', onComplete: function () { go((cur + 1) % tabs.length); } });
      bar.pause();
      if (box._visible) bar.play();
    }
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { go(i); }); });
    S.ScrollTrigger.create({ trigger: box, start: 'top 75%', end: 'bottom top',
      onToggle: function (self) { box._visible = self.isActive; if (bar) self.isActive ? bar.play() : bar.pause(); } });
    go(0);
  });

  // Sticky split: the text on the left follows the image in view.
  var txts = S.$$('.split__txt'), imgs = S.$$('.split__img');
  if (txts.length) {
    g.set(txts[0], { opacity: 1 });
    var active = 0;
    imgs.forEach(function (im, i) {
      S.ScrollTrigger.create({ trigger: im, start: 'top 55%', end: 'bottom 55%', onToggle: function (self) {
        if (!self.isActive || i === active) return;
        var prev = txts[active], next = txts[i], dir = i > active ? 1 : -1;
        g.to(prev, { opacity: 0, y: -40 * dir, duration: 0.5, ease: 'power2.in', onComplete: function () { prev.classList.remove('is-on'); } });
        next.classList.add('is-on');
        g.fromTo(next, { opacity: 0, y: 40 * dir }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'expo.out' });
        active = i;
      } });
    });
  }

  // Grid / list toggle on the work page, animated with Flip.
  var grid = S.$('[data-layout]');
  S.$$('[data-view]').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      if (grid.dataset.layout === b.dataset.view) return;
      var state = window.Flip.getState(S.$$('.wcard, .wcard__img, .wcard__meta', grid));
      grid.dataset.layout = b.dataset.view;
      all.forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      window.Flip.from(state, { duration: 0.9, ease: 'expo.inOut', nested: true, absolute: true, stagger: 0.03, onComplete: function () { S.ScrollTrigger.refresh(); } });
    });
  });

  // Impact panel grows into place.
  var impact = S.$('.impact');
  if (impact) g.fromTo(impact, { scale: 0.92, borderRadius: '64px' }, { scale: 1, borderRadius: '32px', ease: 'none', scrollTrigger: { trigger: impact, start: 'top bottom', end: 'top 30%', scrub: true } });
});
