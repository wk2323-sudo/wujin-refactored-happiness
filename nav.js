/* ============================================
   nav.js — Léa Moreau Portfolio
   Shared across all pages:
   - Custom cursor
   - Nav scroll behaviour
   - Mobile hamburger menu
   - Scroll reveal (.reveal)
   - Project modal (openModal / closeModal)
   - Skill bar animation (about.html only)
   - FAQ accordion (services.html only)
   - Contact form (contact.html only)
   ============================================ */

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

function bindCursor() {
  document.querySelectorAll(
    'a, button, .home-proj, .featured-project, .project-row, ' +
    '.service-full-card, .award-card, .faq-q, .sfc-dl-item, ' +
    '.portrait-frame, .filter-btn, .process-step, .timeline-item'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px'; cursor.style.height = '18px';
      ring.style.width    = '56px'; ring.style.height   = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px'; cursor.style.height = '10px';
      ring.style.width    = '36px'; ring.style.height   = '36px';
    });
  });
}
bindCursor();

/* ── NAV SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE HAMBURGER ── */
function toggleMobile() {
  const nav   = document.getElementById('mainNav');
  const links = document.getElementById('navLinks');
  nav.classList.toggle('menu-open');
  links.classList.toggle('open');
}
// expose to inline onclick
window.toggleMobile = toggleMobile;

/* ── SCROLL REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

/* ── SKILL BARS (about.html) ── */
function initSkillBars() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
          b.style.width = b.dataset.width + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(grid);
}
document.addEventListener('DOMContentLoaded', initSkillBars);

/* ── FAQ ACCORDION (services.html) ── */
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.getElementById('faqItems');
  if (!faqItems) return;
  faqItems.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item    = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── FILTER BAR (work.html) ── */
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-row').forEach(r => {
      r.style.display = (f === 'all' || (r.dataset.category || '').includes(f)) ? 'grid' : 'none';
    });
    const fp = document.querySelector('.featured-project');
    if (fp) fp.style.display = (f === 'all' || (fp.dataset.category || '').includes(f)) ? 'grid' : 'none';
  });
});

/* ── PROJECT DATA ── */
const projects = {
  maison: {
    cat: 'Brand Identity · 2024',
    title: 'Maison Duval — Luxury Rebranding',
    desc: 'A complete visual identity overhaul for a century-old Parisian patisserie entering a new era. The project encompassed logo redesign, packaging, in-store experience, and digital touchpoints — all unified by a restrained, elegant visual language rooted in the brand\'s heritage.',
    challenge: 'The central challenge was honouring 100 years of history without becoming a museum piece. We needed a system that felt genuinely contemporary while making clear that this was a brand with deep roots and serious craft.',
    tags: ['Brand Strategy','Logo Design','Packaging','Typography','Brand Guidelines','Store Design'],
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=85&auto=format&fit=crop'
  },
  echo: {
    cat: 'Digital Experience · 2024',
    title: 'Echo Studio — Web Design',
    desc: 'A portfolio and booking platform for an independent music studio in Lyon. The design balances the raw energy of the recording environment with a refined, editorial aesthetic — featuring full-screen audio visualisations, seamless session booking, and an immersive soundscape.',
    challenge: 'Echo had an incredible physical space but no digital presence worth the rooms. The brief was to create a site that felt like walking into the studio — warm, analogue, serious about sound.',
    tags: ['Web Design','UI/UX','Interaction Design','Figma','Art Direction','Webflow'],
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85&auto=format&fit=crop'
  },
  verde: {
    cat: 'Editorial Design · 2023',
    title: 'Verde Magazine — Issue 12',
    desc: 'Art direction for Verde\'s annual sustainability issue. The brief called for a tension between the urgency of ecological messaging and the timeless beauty of long-form editorial. The result was a 128-page issue that felt both politically charged and visually meditative.',
    challenge: 'Issue 12 was Verde\'s highest-profile issue to date. We had to make design choices that felt urgent without tipping into alarmism — a tonal tightrope that informed every typographic and compositional decision.',
    tags: ['Editorial','Art Direction','Print Design','Typography','Photography Direction','InDesign'],
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85&auto=format&fit=crop'
  },
  kira: {
    cat: 'Packaging Design · 2023',
    title: 'Kira Botanicals — Packaging System',
    desc: 'A complete packaging overhaul for a sustainable skincare brand rooted in botanical science. The system needed to communicate purity and efficacy without clinical coldness — so we developed an organic illustration language, earthy palette, and typography that felt handcrafted yet precise.',
    challenge: 'Kira\'s original packaging looked like every other "natural" skincare brand — beige, generic, forgettable. The rebrand needed to signal scientific credibility and sensory richness simultaneously.',
    tags: ['Packaging','Brand Identity','Illustration Direction','Print Production','Colour Systems'],
    img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=85&auto=format&fit=crop'
  },
  arc: {
    cat: 'Motion Design · 2022',
    title: 'Arc Systems — Kinetic Brand Identity',
    desc: 'A kinetic brand identity for an architecture software company. The motion system — comprising animated logos, UI transitions, and a full suite of video assets — translates the brand\'s core idea of "structures in motion" into a living, breathing visual language.',
    challenge: 'Arc had a strong static identity but no motion language. We built a motion system from scratch that could scale from a two-second logo sting to a five-minute brand film.',
    tags: ['Motion Design','Brand Identity','After Effects','Cinema 4D','Brand System'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop'
  },
  soleil: {
    cat: 'Brand Identity · 2022',
    title: 'Soleil Collective — Brand &amp; Campaign',
    desc: 'A complete brand identity and launch campaign for a Marseille-based creative collective spanning fashion, photography, and music. The visual language draws on Mediterranean light, raw concrete, and the energy of the city\'s emerging cultural scene.',
    challenge: 'Soleil needed to feel rooted in Marseille — not generic "Southern France" — and to speak to a young, culturally literate audience without alienating the wider collaborators they needed.',
    tags: ['Brand Identity','Campaign Design','Art Direction','Poster Design','Social Media System'],
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85&auto=format&fit=crop'
  },
  haus: {
    cat: 'Digital + Editorial · 2021',
    title: 'Haus Gallery — Exhibition Identity &amp; Web',
    desc: 'Exhibition identity and digital presence for a contemporary art gallery in Vienna, covering a three-season programme of international artists. The visual system needed to recede enough to foreground the art, while asserting enough presence to position the gallery as a serious institution.',
    challenge: 'The tension between institution and artwork is one of the fundamental problems of gallery design. We resolved it by building a deliberately quiet system — a white space of a brand — that comes alive in the spaces between the work.',
    tags: ['Exhibition Identity','Web Design','Editorial','Print','Wayfinding','Figma'],
    img: 'https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?w=1200&q=85&auto=format&fit=crop'
  }
};

/* ── MODAL ── */
function openModal(key) {
  const p = projects[key];
  if (!p) return;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = p.title;
  document.getElementById('modalVisualLabel').textContent = key.toUpperCase();
  document.getElementById('modalCat').textContent = p.cat;
  document.getElementById('modalTitle').innerHTML = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  const ch = document.getElementById('modalChallenge');
  ch.innerHTML = p.challenge ? `<h4>The Challenge</h4><p>${p.challenge}</p>` : '';
  document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });

// expose to inline HTML
window.openModal        = openModal;
window.closeModal       = closeModal;
window.closeModalDirect = closeModalDirect;

/* ── CONTACT FORM (contact.html) ── */
function submitForm() {
  const name    = document.getElementById('fName')?.value.trim();
  const email   = document.getElementById('fEmail')?.value.trim();
  const service = document.getElementById('fService')?.value;
  if (!name || !email || !service) { alert('Please fill in all required fields.'); return; }
  document.getElementById('successName').textContent = name;
  document.getElementById('formSuccess').classList.add('show');
  const btn = document.querySelector('.form-submit');
  if (btn) { btn.style.opacity = '.4'; btn.disabled = true; }
}
window.submitForm = submitForm;