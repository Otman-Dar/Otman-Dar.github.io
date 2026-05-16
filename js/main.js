/* ═══════════════════════════════════
   CURSOR
═══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 5 + 'px';
  cursor.style.top = my - 5 + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a, button, .skill-card, .project-card, .lang-card, .edu-card, .timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width = '54px';
    cursorRing.style.height = '54px';
    cursorRing.style.borderColor = 'rgba(124,58,237,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,212,255,0.5)';
  });
});

/* ═══════════════════════════════════
   PARTICLES CANVAS
═══════════════════════════════════ */
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.3, 0.3);
      this.r = rand(1.5, 3);
      this.alpha = rand(0.2, 0.7);
      this.color = Math.random() > 0.5 ? '0,212,255' : '124,58,237';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    const count = Math.min(90, Math.floor(W * H / 14000));
    particles = Array.from({ length: count }, () => new Particle());
  }
  init();

  let mouseX = -9999, mouseY = -9999;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function drawLines() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      // Mouse connection
      const dx = particles[i].x - mouseX;
      const dy = particles[i].y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        const alpha = (1 - dist / 160) * 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ═══════════════════════════════════
   TYPING EFFECT
═══════════════════════════════════ */
(function() {
  const phrases = [
    'Ingénieur Électronicien',
    'Spécialiste Deep Learning',
    'Systèmes Embarqués & IoT',
    'Traitement du Signal'
  ];
  const el = document.getElementById('typing-text');
  let pi = 0, ci = 0, deleting = false, pause = 0;

  function type() {
    if (pause > 0) { pause--; setTimeout(type, 60); return; }
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.substring(0, ci + 1);
      ci++;
      if (ci === phrase.length) { deleting = true; pause = 28; }
      setTimeout(type, 75);
    } else {
      el.textContent = phrase.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; pause = 6; }
      setTimeout(type, 38);
    }
  }
  setTimeout(type, 800);
})();

/* ═══════════════════════════════════
   SCROLL NAV
═══════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ═══════════════════════════════════
   HAMBURGER
═══════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ═══════════════════════════════════
   INTERSECTION OBSERVER — FADE-IN
═══════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ═══════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════ */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(interval);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

/* ═══════════════════════════════════
   PROJECTS (data/projects.json)
═══════════════════════════════════ */
(function initProjects() {
  const grid = document.getElementById('projects-grid');
  const filtersEl = document.getElementById('projects-filters');
  const countEl = document.getElementById('projects-count');
  if (!grid) return;

  let allProjects = [];
  let categories = {};
  let activeFilter = 'all';

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function getCategoryMeta(key) {
    return categories[key] || { label: key, accent: 'cyan' };
  }

  function buildLink(label, url, icon) {
    if (!url || !String(url).trim()) return '';
    return `<a href="${escapeHtml(url)}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">${icon}<span>${escapeHtml(label)}</span></a>`;
  }

  function renderCard(project, index) {
    const cat = getCategoryMeta(project.category);
    const accent = cat.accent || 'cyan';
    const delayClass = index > 0 ? ` fade-in-delay-${Math.min(index % 4, 3)}` : '';
    const links = project.links || {};
    const linksHtml = [
      buildLink('GitHub', links.github, '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.203 8.203 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>'),
      buildLink('Démo', links.demo, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'),
      buildLink('Vidéo', links.video, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>')
    ].filter(Boolean).join('');
    const tagsHtml = (project.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');

    return [
      `<article class="project-card fade-in${delayClass}" data-category="${escapeHtml(project.category || '')}" data-accent="${escapeHtml(accent)}">`,
      '<div class="project-card-glow" aria-hidden="true"></div>',
      '<div class="project-card-inner">',
      '<header class="project-card-header">',
      '<div class="project-visual">',
      `<span class="project-emoji" aria-hidden="true">${project.emoji || '📁'}</span>`,
      `<span class="project-index">PRJ·${String(index + 1).padStart(2, '0')}</span>`,
      '</div>',
      '<div class="project-meta">',
      `<span class="project-category">${escapeHtml(cat.label)}</span>`,
      project.year ? `<span class="project-year">${escapeHtml(String(project.year))}</span>` : '',
      '</div></header>',
      `<h3 class="project-title">${escapeHtml(project.title)}</h3>`,
      `<p class="project-desc">${escapeHtml(project.description)}</p>`,
      `<div class="project-tags">${tagsHtml}</div>`,
      linksHtml ? `<div class="project-links">${linksHtml}</div>` : '',
      '</div></article>'
    ].join('');
  }

  function renderFilters() {
    if (!filtersEl) return;
    const used = [...new Set(allProjects.map(p => p.category).filter(Boolean))];
    filtersEl.innerHTML = [
      '<button type="button" class="project-filter is-active" data-filter="all">Tous</button>',
      ...used.map(key => {
        const meta = getCategoryMeta(key);
        return `<button type="button" class="project-filter" data-filter="${escapeHtml(key)}" data-accent="${escapeHtml(meta.accent)}">${escapeHtml(meta.label)}</button>`;
      })
    ].join('');
    filtersEl.querySelectorAll('.project-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        filtersEl.querySelectorAll('.project-filter').forEach(b => b.classList.toggle('is-active', b === btn));
        renderProjects();
      });
    });
  }

  function renderProjects() {
    const list = activeFilter === 'all' ? allProjects : allProjects.filter(p => p.category === activeFilter);
    if (countEl) countEl.textContent = list.length === 1 ? '1 projet' : `${list.length} projets`;
    if (!list.length) {
      grid.innerHTML = '<p class="projects-empty fade-in visible">Aucun projet dans cette catégorie.</p>';
      return;
    }
    grid.innerHTML = list.map((p, i) => renderCard(p, i)).join('');
    grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  fetch(new URL('data/projects.json', document.baseURI))
    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    .then(data => {
      categories = data.categories || {};
      allProjects = data.projects || [];
      renderFilters();
      renderProjects();
    })
    .catch(() => {
      grid.innerHTML = '<p class="projects-error fade-in visible">Impossible de charger les projets. Ouvrez le site avec <strong>Live Server</strong>.</p>';
    });
})();
