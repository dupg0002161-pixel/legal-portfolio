/* ============================================================
   U. MEHTA LEGAL PLATFORM - MAIN SCRIPT
   Disclaimer | Nav | Animations | Form | Theme
   ============================================================ */

(function () {
  'use strict';

  /* â”€â”€ DISCLAIMER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const DISCLAIMER_KEY = 'um_disclaimer_v2';
  const overlay = document.getElementById('disclaimer-overlay');

  if (overlay) {
    if (sessionStorage.getItem(DISCLAIMER_KEY)) {
      overlay.classList.add('hidden');
    }

    document.getElementById('btn-accept')?.addEventListener('click', () => {
      sessionStorage.setItem(DISCLAIMER_KEY, '1');
      overlay.style.animation = 'none';
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.classList.add('hidden'), 420);
    });

    document.getElementById('btn-decline')?.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  /* â”€â”€ THEME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const savedTheme = localStorage.getItem('um_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('um_theme', next);
  });

  /* â”€â”€ NAVIGATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const nav = document.getElementById('site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  // Scroll: glass nav
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile?.classList.toggle('open');
    document.body.style.overflow = navMobile?.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile on link click
  navMobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* â”€â”€ SMOOTH SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* â”€â”€ INTERSECTION OBSERVER â€” REVEAL ANIMATIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .stagger').forEach(el => {
    revealObs.observe(el);
  });

  /* â”€â”€ COUNT-UP (SLA PRICES) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const countEls = document.querySelectorAll('[data-countup]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.countup, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 4);
        el.textContent = prefix + Math.floor(ease * target).toLocaleString('en-IN') + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObs.observe(el));

  /* â”€â”€ MAGNETIC BUTTONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* â”€â”€ CONTACT FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Transmitting...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        formStatus.textContent = 'Received. Expect a response within 24 hours.';
        formStatus.style.color = '#6dbe8c';
        form.reset();
      } else throw new Error();
    } catch {
      formStatus.textContent = 'Transmission failed. Email: udbhavlegalservices@gmail.com or dupg0002161@lc1.du.ac.in';
      formStatus.style.color = '#e05a4e';
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Initiate Briefing';
    }
  });

  /* â”€â”€ NEWSLETTER LOADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  async function loadNewsletter() {
    const container = document.getElementById('newsletter-articles');
    if (!container) return;
    try {
      const data = await fetch('data/newsletter.json').then(r => r.json());
      container.innerHTML = data.articles.map(a => `
        <a href="${a.url}" target="_blank" rel="noopener" class="article-card" style="display:block;">
          <div class="article-cat">${a.category}</div>
          <div class="article-title">${a.title}</div>
          <div class="article-summary">${a.summary}</div>
        </a>
      `).join('');
    } catch {
      container.innerHTML = '<p style="font-family:var(--font-mono);font-size:0.72rem;color:var(--mute);">Visit the newsletter on LinkedIn.</p>';
    }
  }

  loadNewsletter();

})();
