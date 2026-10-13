/* ATELIER TERRA — signature motion */
Studio.onReady(function (S) {
  var g = S.gsap;

  // Hero arches drift apart at different speeds.
  [['.arch--1', -60], ['.arch--2', -140], ['.arch--3', -30]].forEach(function (a) {
    var el = S.$(a[0]); if (!el) return;
    g.to(el, { y: a[1], ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  });
  var badge = S.$('.badge');
  if (badge) g.to(badge, { rotate: 200, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Stacked cards: each card shrinks & dims as the next one slides over it.
  var cards = S.$$('.scard');
  cards.forEach(function (c, i) {
    var nextCard = cards[i + 1]; if (!nextCard) return;
    g.to(c, {
      scale: 0.9 + i * 0.02, filter: 'brightness(.82)', ease: 'none',
      scrollTrigger: { trigger: nextCard, start: 'top bottom', end: 'top 25%', scrub: true }
    });
  });

  // Process path draws itself.
  var path = S.$('.process__line path');
  if (path) {
    var len = path.getTotalLength();
    g.set(path, { strokeDasharray: len, strokeDashoffset: len });
    g.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.process__path', start: 'top 80%', end: 'bottom 50%', scrub: true } });
  }

  // Draggable gallery (mouse drag + native touch swipe), counter and slide scaling.
  S.$$('[data-drag]').forEach(function (view) {
    var slides = S.$$('.slide', view), count = S.$('.slider__count b');
    var down = false, startX = 0, startLeft = 0, vx = 0, lastX = 0, raf;
    view.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = lastX = e.clientX; startLeft = view.scrollLeft; vx = 0;
      view.classList.add('is-drag'); cancelAnimationFrame(raf);
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      view.scrollLeft = startLeft - (e.clientX - startX);
      vx = e.clientX - lastX; lastX = e.clientX;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return; down = false;
      (function glide() {
        vx *= 0.93; view.scrollLeft -= vx;
        if (Math.abs(vx) > 0.5) raf = requestAnimationFrame(glide);
        else view.classList.remove('is-drag');
      })();
    });
    function update() {
      var mid = view.getBoundingClientRect().left + view.clientWidth / 2, best = 0, bestD = 1e9;
      slides.forEach(function (s, i) {
        var r = s.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
        var k = Math.min(d / view.clientWidth, 1);
        s.firstElementChild.style.transform = 'scale(' + (1 - k * 0.12) + ')';
      });
      if (count) count.textContent = String(best + 1).padStart(2, '0');
    }
    view.addEventListener('scroll', update, { passive: true });
    update();
    g.from(slides, { x: 160, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: view, start: 'top 85%' } });
  });
});
