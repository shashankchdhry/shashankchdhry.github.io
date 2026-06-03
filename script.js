/* ===========================================================
   Portfolio interactions. Vanilla JS, no dependencies.
   =========================================================== */
(function () {
  'use strict';

  /* ---- Year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Theme toggle (initial theme is set by the inline script in <head>) ---- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Nav: scroll state + mobile toggle ---- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const progress = document.getElementById('scrollProgress');

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  }
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 4) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Animated count-up stats ---- */
  const stats = document.querySelectorAll('.stat__num');
  let counted = false;
  function runCounts() {
    if (counted) return;
    counted = true;
    stats.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const dur = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  const hero = document.querySelector('.hero__stats');
  if (hero && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounts(); so.disconnect(); } });
    }, { threshold: 0.5 });
    so.observe(hero);
  } else {
    runCounts();
  }

  /* ---- Typewriter ---- */
  const tw = document.getElementById('typewriter');
  const words = ['distributed systems.', 'event-driven pipelines.', 'scalable microservices.', 'reliable backends.'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }
    tw.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 85;
    if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
    setTimeout(type, delay);
  }
  if (tw && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    type();
  } else if (tw) {
    tw.textContent = words[0];
  }

  /* ---- Card spotlight follow ---- */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
