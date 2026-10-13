/* NORDHAUS — signature motion */
Studio.onReady(function (S) {
  var g = S.gsap, mm = g.matchMedia();

  // Hero photo grows from a framed picture to full-bleed while pinned.
  var frame = S.$('.hero__frame');
  if (frame) {
    mm.add({ wide: '(min-width: 901px)', narrow: '(max-width: 900px)' }, function (ctx) {
      var side = ctx.conditions.wide ? '22%' : '7%';
      var bottom = ctx.conditions.wide ? '18%' : '22%';
      g.timeline({ scrollTrigger: { trigger: frame, start: 'top top', end: '+=90%', scrub: 0.6, pin: true } })
        .fromTo('.hero__img', { clipPath: 'inset(0% ' + side + ' ' + bottom + ' ' + side + ' round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' })
        .fromTo('.hero__img img', { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);
    });
  }

  // Sticky services: the active line swaps the pinned image.
  var items = S.$$('.sticky__item'), imgs = S.$$('.sticky__img');
  items.forEach(function (it, i) {
    S.ScrollTrigger.create({
      trigger: it, start: 'top 62%', end: 'bottom 62%',
      onToggle: function (self) {
        if (!self.isActive) return;
        items.forEach(function (x, j) { x.classList.toggle('is-on', j === i); });
        imgs.forEach(function (x, j) { x.classList.toggle('is-on', j === i); });
      }
    });
  });

  // Testimonials rotate every 6s, dots jump.
  var slides = S.$$('.testi__slide'), dots = S.$$('[data-dot]'), cur = 0, timer;
  function show(n) {
    if (n === cur) return;
    var out = slides[cur], inn = slides[n];
    g.to(out, { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in', onComplete: function () { out.classList.remove('is-on'); } });
    inn.classList.add('is-on');
    g.fromTo(inn, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.4 });
    dots.forEach(function (d, j) { d.classList.toggle('is-on', j === n); });
    cur = n; loop();
  }
  function loop() { clearTimeout(timer); timer = setTimeout(function () { show((cur + 1) % slides.length); }, 6000); }
  if (slides.length) {
    dots.forEach(function (d) { d.addEventListener('click', function () { show(+d.dataset.dot); }); });
    loop();
  }

  // Giant footer word rises letter by letter as the footer arrives.
  var word = S.$('.ft__word');
  if (word) g.fromTo(word, { yPercent: 30 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.ft', start: 'top bottom', end: 'bottom bottom', scrub: true } });
});
