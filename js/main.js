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
