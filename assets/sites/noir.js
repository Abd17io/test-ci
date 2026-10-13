/* MAISON NOIR — signature motion */
Studio.preloaderOut = function (tl, el) {
  var g = Studio.gsap;
  tl.to(el.querySelectorAll('[data-preloader-item]'), { yPercent: -110, duration: 0.8, ease: 'expo.in', stagger: 0.06 }, '+=0.1')
    .to(el.querySelector('.preloader__count'), { opacity: 0, duration: 0.4 }, '<')
    .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.2');
  g.set(el, { clipPath: 'inset(0 0 0% 0)' });
};

Studio.onReady(function (S) {
  var g = S.gsap;
  var hero = S.$('.hero');
  if (hero) {
    // Hero drifts and darkens as you leave it.
    g.to('.hero__content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    g.to('.hero__media', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }
  // Header hides while scrolling down.
  var hd = S.$('.hd'), last = 0;
  window.addEventListener('scroll', function () {
    var y = scrollY;
    if (!document.documentElement.classList.contains('menu-open')) g.to(hd, { yPercent: y > 300 && y > last ? -110 : 0, duration: 0.6, ease: 'expo.out', overwrite: true });
    last = y;
  }, { passive: true });
  // Journal cards drift at different speeds.
  S.$$('.jcard').forEach(function (c, i) {
    g.to(c, { y: (i - 1) * -40, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
});
