/* ============================================================
   HEALII — App Logic
   ============================================================ */

/* ---------- STORAGE KEYS ---------- */
const STORAGE = {
  identity:  'healii_identity_v2',
  user:      'healii_user_v1',
  users:     'healii_users_v1',
  daily:     'healii_daily_v1',
  badges:    'healii_badges_v1',
  orders:    'healii_orders_v1',
  newsletter:'healii_newsletter_v1',
  tipDismiss:'healii_tip_dismissed_v1',
};

const ls = {
  get(k, fallback = null) {
    try {
      const raw = localStorage.getItem(k);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
  remove(k) {
    try { localStorage.removeItem(k); } catch {}
  },
};

/* ---------- TOAST ---------- */
const toastStack = document.getElementById('toastStack');
function toast(msg, type = 'info', ms = 3200) {
  const ico = { success: '✓', error: '✕', info: '✦' }[type] || '✦';
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-ico">${ico}</span><span>${msg}</span>`;
  toastStack.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, ms);
}

/* ---------- NAV ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- REVEAL ON SCROLL ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- STAT COUNTERS ---------- */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(easeOutCubic(progress) * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !statsAnimated) {
    statsAnimated = true;
    document.querySelectorAll('.stat-num').forEach(animateCounter);
  }
}, { threshold: 0.4 }).observe(statsSection);

/* ============================================================
   IDENTITIES — 16 archetypes
   ============================================================ */
const IDENTITIES = {
  night_owl: {
    emoji: '🦉', title: 'The Night Owl', cat: 'sleep',
    short: 'Thrives after midnight, struggles in the morning. Sleep optimization is the priority.',
    desc:  'You thrive after midnight and struggle with early mornings. Your body craves sleep optimization, recovery support, and calming nutrients.',
    sups:  ['Magnesium', 'Melatonin', 'L-Theanine'],
    pack:  ['Magnesium Glycinate', 'Melatonin 3mg', 'L-Theanine', 'Ashwagandha'],
    tags:  ['sleep','calm','recovery'],
  },
  insomniac: {
    emoji: '🌙', title: 'The Insomniac', cat: 'sleep',
    short: 'Severe sleep disruption. Mind races at bedtime, deep sleep is rare.',
    desc:  'Sleep is your white whale. Your body needs aggressive support for both falling asleep and staying asleep through the night.',
    sups:  ['Glycine', 'Valerian', 'Chamomile'],
    pack:  ['Glycine 3g', 'Valerian Root', 'Chamomile Extract', 'Magnesium L-Threonate'],
    tags:  ['sleep','anxiety'],
  },
  grinder: {
    emoji: '⚡', title: 'The Grinder', cat: 'performance',
    short: 'High output, high pressure. Fueled by ambition and way too much caffeine.',
    desc:  'High output, high pressure. You push hard daily and need premium support for sustained energy, stress resilience, and recovery.',
    sups:  ['Omega-3', 'Vitamin D', 'Ashwagandha'],
    pack:  ['Omega-3 Fish Oil', 'Vitamin D3+K2', 'Ashwagandha', 'B-Complex'],
    tags:  ['energy','focus','stress'],
  },
  scholar: {
    emoji: '🧠', title: 'The Scholar', cat: 'focus',
    short: 'Deep focus, long study sessions. Cognitive performance is everything.',
    desc:  'Deep work is your default. Your brain is your primary asset — give it the nootropic support it needs for peak cognitive performance.',
    sups:  ["Lion's Mane", 'Bacopa', 'B6'],
    pack:  ["Lion's Mane", 'Bacopa Monnieri', 'Vitamin B6', 'Alpha GPC'],
    tags:  ['focus','memory','clarity'],
  },
  athlete: {
    emoji: '💪', title: 'The Athlete', cat: 'performance',
    short: 'Performance-driven. Trains hard, recovers even harder. Body first.',
    desc:  'Performance is everything. Your body demands optimal muscle support, rapid recovery, and sustained endurance fuel.',
    sups:  ['Creatine', 'Vitamin D', 'Electrolytes'],
    pack:  ['Creatine Monohydrate', 'Vitamin D3', 'Electrolyte Blend', 'Whey Protein+'],
    tags:  ['strength','recovery','energy'],
  },
  cardio_king: {
    emoji: '🏃', title: 'The Cardio King', cat: 'performance',
    short: 'Endurance over everything. Long runs, big mileage, steady output.',
    desc:  'Your engine is your edge. You need iron, electrolytes, and joint support to keep the miles coming without burning out.',
    sups:  ['Iron', 'Electrolytes', 'Glucosamine'],
    pack:  ['Iron Bisglycinate', 'Electrolyte Mix', 'Glucosamine + MSM', 'Beetroot'],
    tags:  ['endurance','recovery'],
  },
  yogi: {
    emoji: '🕉️', title: 'The Yogi', cat: 'balance',
    short: 'Mind-body alignment. Flexibility, breath, and balance over volume.',
    desc:  'You move with intention. Your body needs mineral balance, joint care, and gentle adaptogens to support long-term mobility.',
    sups:  ['Magnesium', 'Collagen', 'Turmeric'],
    pack:  ['Magnesium Citrate', 'Marine Collagen', 'Turmeric + BioPerine', 'Ashwagandha'],
    tags:  ['balance','flexibility'],
  },
  zen_seeker: {
    emoji: '🧘', title: 'The Zen Seeker', cat: 'stress',
    short: 'Stress is the main enemy. Mental clarity and emotional balance above all.',
    desc:  'Stress is your main adversary. Your body needs adaptogenic support, mood balance, and calm energy to restore equilibrium.',
    sups:  ['Ashwagandha', 'Rhodiola', 'GABA'],
    pack:  ['Ashwagandha', 'Rhodiola Rosea', 'GABA', 'Magnesium Glycinate'],
    tags:  ['stress','calm'],
  },
  stress_cadet: {
    emoji: '😰', title: 'The Stress Cadet', cat: 'stress',
    short: 'Always on edge. Anxiety lives in the chest, sleep is collateral.',
    desc:  'Your nervous system is in overdrive. Calming nutrients, B-vitamins, and adaptogens can take you from survival to steady.',
    sups:  ['L-Theanine', 'Saffron', 'B-Complex'],
    pack:  ['L-Theanine', 'Saffron Extract', 'B-Complex', 'Magnesium Glycinate'],
    tags:  ['anxiety','calm'],
  },
  burnout: {
    emoji: '🔥', title: 'The Burnout', cat: 'stress',
    short: 'Running on fumes. Recovery is non-negotiable now.',
    desc:  'Your tank is empty. The path back is rest, mineral repletion, and adrenal support — done patiently, not aggressively.',
    sups:  ['Vitamin C', 'B-Complex', 'Holy Basil'],
    pack:  ['Liposomal Vitamin C', 'B-Complex', 'Holy Basil', 'Magnesium Glycinate'],
    tags:  ['recovery','adrenal'],
  },
  caffeine_dep: {
    emoji: '☕', title: 'Caffeine Dependent', cat: 'energy',
    short: 'Coffee-first lifestyle. Energy crashes and disrupted sleep are the norm.',
    desc:  'Coffee runs your life, but the crashes and disrupted sleep are real costs. Your body needs a sustainable energy reset.',
    sups:  ['B-Complex', 'Magnesium', 'CoQ10'],
    pack:  ['B-Complex', 'Magnesium Glycinate', 'CoQ10', 'L-Tyrosine'],
    tags:  ['energy','reset'],
  },
  naturalist: {
    emoji: '🌱', title: 'The Naturalist', cat: 'balance',
    short: 'Holistic approach, plant-based diet. Wellness is a whole-body philosophy.',
    desc:  'Plant-forward and holistic. You need targeted nutrients that plant diets often miss — B12, iron, and omega-3s top the list.',
    sups:  ['Spirulina', 'B12', 'Iron'],
    pack:  ['Spirulina', 'Methyl B12', 'Iron Bisglycinate', 'Algae Omega-3'],
    tags:  ['plant-based','balance'],
  },
  foodie: {
    emoji: '🍱', title: 'The Foodie', cat: 'balance',
    short: 'Food is medicine. Loves nutrition, but needs the targeted boosts.',
    desc:  'Your diet does heavy lifting already. A few precision boosts make a great baseline even better.',
    sups:  ['Probiotic', 'Omega-3', 'Vitamin D'],
    pack:  ['Multi-Strain Probiotic', 'Omega-3', 'Vitamin D3+K2', 'Digestive Enzymes'],
    tags:  ['nutrition','gut'],
  },
  social_butterfly: {
    emoji: '🦋', title: 'The Social Butterfly', cat: 'energy',
    short: 'High social load, late nights, weekend warrior. Energy is everything.',
    desc:  'Your calendar is full. Liver support, hydration, and B-vitamins help you keep the pace without paying for it Monday morning.',
    sups:  ['Milk Thistle', 'Electrolytes', 'B-Complex'],
    pack:  ['Milk Thistle', 'Electrolyte Mix', 'B-Complex', 'NAC'],
    tags:  ['energy','recovery'],
  },
  gamer: {
    emoji: '🎮', title: 'The Gamer', cat: 'focus',
    short: 'Long screens, late nights, sedentary marathon sessions.',
    desc:  'Eye strain, posture, and circadian disruption are your top three. Lutein, magnesium, and gentle stimulants beat caffeine.',
    sups:  ['Lutein', 'L-Theanine', 'Magnesium'],
    pack:  ['Lutein + Zeaxanthin', 'L-Theanine', 'Magnesium Glycinate', 'Vitamin D3'],
    tags:  ['focus','eye-health'],
  },
  comeback: {
    emoji: '🌅', title: 'The Comeback Kid', cat: 'balance',
    short: 'Building back up. Consistency beats intensity right now.',
    desc:  'You\'re rebuilding the foundation. A simple, complete stack supports steady progress without overwhelming your system.',
    sups:  ['Multivitamin', 'Omega-3', 'Vitamin D'],
    pack:  ['Daily Multivitamin', 'Omega-3', 'Vitamin D3+K2', 'Probiotic'],
    tags:  ['foundation','recovery'],
  },
};
const ID_LIST = Object.entries(IDENTITIES).map(([key, v]) => ({ key, ...v }));

/* ---------- IDENTITIES GRID ---------- */
const idGrid    = document.getElementById('idGrid');
const idEmpty   = document.getElementById('idEmpty');
const idSearch  = document.getElementById('idSearch');
const idFilters = document.getElementById('idFilters');
let activeCat   = 'all';
let searchTerm  = '';

function renderIdentityGrid() {
  const term = searchTerm.trim().toLowerCase();
  const filtered = ID_LIST.filter(id => {
    const catOk = activeCat === 'all' || id.cat === activeCat;
    const txtOk = !term ||
      id.title.toLowerCase().includes(term) ||
      id.short.toLowerCase().includes(term) ||
      id.tags.some(t => t.includes(term)) ||
      id.sups.some(s => s.toLowerCase().includes(term));
    return catOk && txtOk;
  });

  idGrid.innerHTML = filtered.map((id, i) => `
    <div class="idf-card" data-key="${id.key}" style="animation-delay:${i * 40}ms">
      <div class="idf-top">
        <span class="idf-emoji">${id.emoji}</span>
        <span class="idf-cat">${id.cat}</span>
      </div>
      <h3>${id.title}</h3>
      <p>${id.short}</p>
      <div class="idf-sups">
        ${id.sups.map(s => `<span>${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  idEmpty.hidden = filtered.length > 0;

  idGrid.querySelectorAll('.idf-card').forEach(card => {
    card.addEventListener('click', () => previewIdentity(card.dataset.key));
    card.addEventListener('mouseenter', () => {
      const colors = ['#8B5CF6','#06B6D4','#10B981','#F59E0B','#EC4899'];
      const c = colors[Math.floor(Math.random() * colors.length)];
      card.style.boxShadow = `0 16px 40px ${c}33`;
    });
    card.addEventListener('mouseleave', () => { card.style.boxShadow = ''; });
  });
}
renderIdentityGrid();

idSearch.addEventListener('input', e => {
  searchTerm = e.target.value;
  renderIdentityGrid();
});
idFilters.addEventListener('click', e => {
  const btn = e.target.closest('.id-filter');
  if (!btn) return;
  idFilters.querySelectorAll('.id-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCat = btn.dataset.cat;
  renderIdentityGrid();
});

function previewIdentity(key) {
  const id = IDENTITIES[key];
  if (!id) return;
  toast(`${id.emoji} ${id.title} — try the quiz to see if it's yours!`, 'info', 3000);
}

/* ============================================================
   QUIZ — 8 questions, weighted scoring
   ============================================================ */
const QUESTIONS = [
  {
    q: 'How many hours do you typically sleep per night?', emoji: '😴',
    opts: [
      { label: 'Less than 5 hours', scores: { insomniac: 4, night_owl: 3, burnout: 3, stress_cadet: 2 } },
      { label: '5–6 hours',         scores: { night_owl: 3, grinder: 2, gamer: 2, social_butterfly: 1 } },
      { label: '7–8 hours',         scores: { scholar: 2, athlete: 2, naturalist: 2, foodie: 2, comeback: 2, yogi: 2 } },
      { label: 'More than 8 hours', scores: { yogi: 2, comeback: 2, naturalist: 2 } },
    ],
  },
  {
    q: 'How would you describe your daily energy?', emoji: '⚡',
    opts: [
      { label: 'Caffeine-dependent — I run on coffee', scores: { caffeine_dep: 5, grinder: 2, gamer: 2 } },
      { label: 'Energy crashes in the afternoon',       scores: { burnout: 3, caffeine_dep: 2, stress_cadet: 2 } },
      { label: 'Mostly steady throughout the day',      scores: { scholar: 2, foodie: 2, comeback: 2, yogi: 2 } },
      { label: 'High energy from morning to night',     scores: { athlete: 3, cardio_king: 3, social_butterfly: 2 } },
    ],
  },
  {
    q: 'What\'s your biggest daily challenge?', emoji: '🎯',
    opts: [
      { label: 'Staying focused during work or study',  scores: { scholar: 4, gamer: 2, caffeine_dep: 1 } },
      { label: 'Managing stress and anxiety',           scores: { stress_cadet: 4, zen_seeker: 3, burnout: 2 } },
      { label: 'Falling asleep or staying asleep',      scores: { insomniac: 4, night_owl: 3 } },
      { label: 'Low energy and motivation',             scores: { burnout: 3, comeback: 2, caffeine_dep: 1 } },
    ],
  },
  {
    q: 'How often do you exercise?', emoji: '🏃',
    opts: [
      { label: 'Rarely or never',           scores: { gamer: 3, comeback: 3, scholar: 1, caffeine_dep: 1 } },
      { label: '1–2 times per week',        scores: { foodie: 2, naturalist: 2, comeback: 2, yogi: 2 } },
      { label: '3–4 times per week',        scores: { athlete: 3, yogi: 2, grinder: 1 } },
      { label: 'Daily or intense training', scores: { athlete: 4, cardio_king: 4, grinder: 2 } },
    ],
  },
  {
    q: 'How would you describe your diet?', emoji: '🥗',
    opts: [
      { label: 'Mostly takeout / convenience food',     scores: { gamer: 2, social_butterfly: 2, grinder: 1 } },
      { label: 'Plant-based or vegetarian',             scores: { naturalist: 5, yogi: 2, foodie: 1 } },
      { label: 'I plan and cook intentionally',         scores: { foodie: 4, athlete: 1, scholar: 1 } },
      { label: 'High protein, performance-focused',     scores: { athlete: 3, grinder: 2, cardio_king: 1 } },
    ],
  },
  {
    q: 'How does your social life look?', emoji: '🦋',
    opts: [
      { label: 'Late nights & weekend events are my norm', scores: { social_butterfly: 5, night_owl: 1 } },
      { label: 'Balanced — friends + alone time',          scores: { yogi: 2, foodie: 2, scholar: 1 } },
      { label: 'Mostly solo & focused',                    scores: { scholar: 3, gamer: 2, naturalist: 1 } },
      { label: 'Always on, always overbooked',             scores: { grinder: 3, social_butterfly: 2, burnout: 1 } },
    ],
  },
  {
    q: 'Screen time per day?', emoji: '📱',
    opts: [
      { label: 'Less than 4 hours',  scores: { yogi: 2, naturalist: 2, athlete: 1, cardio_king: 1 } },
      { label: '4–6 hours',          scores: { scholar: 2, foodie: 1, comeback: 1 } },
      { label: '6–10 hours',         scores: { gamer: 3, scholar: 1, grinder: 1 } },
      { label: 'More than 10 hours', scores: { gamer: 5, night_owl: 2, insomniac: 1 } },
    ],
  },
  {
    q: 'Right now, what matters most?', emoji: '🌟',
    opts: [
      { label: 'Better sleep & recovery',           scores: { night_owl: 3, insomniac: 3, burnout: 2 } },
      { label: 'Sharper focus & productivity',      scores: { scholar: 3, grinder: 2, gamer: 1 } },
      { label: 'Calm, balance, and mental health',  scores: { zen_seeker: 4, yogi: 2, stress_cadet: 2 } },
      { label: 'Performance & physical output',     scores: { athlete: 3, cardio_king: 3, grinder: 1 } },
    ],
  },
];

const quizModal = document.getElementById('quizModal');
const quizProgBar = document.getElementById('quizProgBar');
const quizContent = document.getElementById('quizContent');
let currentQ = 0;
let answers  = [];

function buildQuizSlides() {
  let html = '';
  QUESTIONS.forEach((q, i) => {
    html += `
      <div class="q-slide" data-q="${i}">
        <div class="q-emoji">${q.emoji}</div>
        <h3>${q.q}</h3>
        <div class="q-opts">
          ${q.opts.map((o, j) => `<button class="q-opt" data-i="${j}">${o.label}</button>`).join('')}
        </div>
      </div>
    `;
  });
  html += `
    <div class="q-slide q-result" data-q="result">
      <div class="result-burst" id="resultEmoji">🦉</div>
      <p class="result-label">Your Health Identity is...</p>
      <h2 class="result-title" id="resultTitle">The Night Owl</h2>
      <p class="result-desc" id="resultDesc"></p>
      <div class="result-bars" id="resultBars"></div>
      <div class="result-pack">
        <p class="pack-label">Your Recommended Pack</p>
        <div class="result-pills" id="resultPills"></div>
      </div>
      <div class="result-share">
        <button class="btn btn-ghost btn-sm" id="resultCopy">🔗 Copy Link</button>
        <button class="btn btn-ghost btn-sm" id="resultDownload">📥 Save</button>
      </div>
      <button class="btn btn-primary btn-full result-cta" id="resultBuy">
        Get My Pack — $19.99/mo →
      </button>
      <button class="btn btn-ghost btn-full result-retake" id="resultRetake">
        Retake Quiz
      </button>
    </div>
  `;
  quizContent.innerHTML = html;
}
buildQuizSlides();

const quizSlides = quizContent.querySelectorAll('.q-slide');

function showSlide(idx) {
  quizSlides.forEach(s => s.classList.remove('active'));
  let target;
  if (idx === 'result') target = quizContent.querySelector('.q-result');
  else target = quizContent.querySelector(`.q-slide[data-q="${idx}"]`);
  if (target) target.classList.add('active');

  const pct = idx === 'result' ? 100 : (idx / QUESTIONS.length) * 100;
  quizProgBar.style.width = `${pct}%`;
}

function scoreAnswers() {
  const totals = {};
  Object.keys(IDENTITIES).forEach(k => totals[k] = 0);
  answers.forEach((optIdx, qIdx) => {
    const opt = QUESTIONS[qIdx].opts[optIdx];
    if (!opt) return;
    Object.entries(opt.scores).forEach(([k, v]) => {
      totals[k] = (totals[k] || 0) + v;
    });
  });
  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  return { winner: ranked[0][0], totals, ranked };
}

function renderResult() {
  const { winner, ranked } = scoreAnswers();
  const id = IDENTITIES[winner];

  document.getElementById('resultEmoji').textContent = id.emoji;
  document.getElementById('resultTitle').textContent = id.title;
  document.getElementById('resultDesc').textContent = id.desc;
  document.getElementById('resultPills').innerHTML =
    id.pack.map(p => `<span>${p}</span>`).join('');

  const top3 = ranked.slice(0, 3);
  const max = top3[0][1] || 1;
  document.getElementById('resultBars').innerHTML = top3.map(([k, v]) => {
    const pct = Math.round((v / max) * 100);
    return `
      <div class="result-bar">
        <span class="result-bar-name">${IDENTITIES[k].emoji} ${IDENTITIES[k].title}</span>
        <span class="result-bar-fill"><span style="width:0%"></span></span>
        <span class="result-bar-pct">${pct}%</span>
      </div>
    `;
  }).join('');
  setTimeout(() => {
    document.querySelectorAll('#resultBars .result-bar-fill > span').forEach((el, i) => {
      const pct = Math.round((top3[i][1] / max) * 100);
      el.style.width = `${pct}%`;
    });
  }, 60);

  saveIdentity(winner);
  applyIdentityToNav();
  fireConfetti();
  toast(`✨ Your identity: ${id.title}`, 'success');
  return winner;
}

function saveIdentity(key) {
  ls.set(STORAGE.identity, { key, answers: [...answers], savedAt: Date.now() });
}
function loadIdentity() {
  const raw = ls.get(STORAGE.identity);
  if (!raw || !IDENTITIES[raw.key]) return null;
  return raw;
}
function clearIdentity() { ls.remove(STORAGE.identity); }

function applyIdentityToNav() {
  const saved = loadIdentity();
  const navBtn = document.getElementById('navQuizBtn');
  const mobBtn = document.getElementById('mobileQuizBtn');
  if (saved) {
    const id = IDENTITIES[saved.key];
    if (navBtn) navBtn.textContent = `${id.emoji} View My Identity`;
    if (mobBtn) mobBtn.textContent = `${id.emoji} View My Identity →`;
  } else {
    if (navBtn) navBtn.textContent = 'Find My Identity';
    if (mobBtn) mobBtn.textContent = 'Find My Identity →';
  }
}

function openQuiz() {
  currentQ = 0;
  answers = [];
  quizContent.querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
  showSlide(0);
  openModal('quizModal');
}
function openQuizSmart() {
  const saved = loadIdentity();
  if (!saved) return openQuiz();
  answers = [...(saved.answers || [])];
  renderResult();
  showSlide('result');
  openModal('quizModal');
}

quizContent.addEventListener('click', e => {
  const opt = e.target.closest('.q-opt');
  if (!opt) return;
  const slide = opt.closest('.q-slide');
  slide.querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
  opt.classList.add('selected');
  answers[currentQ] = parseInt(opt.dataset.i, 10);
  setTimeout(() => {
    currentQ++;
    if (currentQ >= QUESTIONS.length) {
      renderResult();
      showSlide('result');
    } else {
      showSlide(currentQ);
    }
  }, 280);
});

/* result actions */
quizContent.addEventListener('click', e => {
  if (e.target.id === 'resultRetake') {
    clearIdentity();
    applyIdentityToNav();
    openQuiz();
  }
  if (e.target.id === 'resultBuy') {
    closeModal('quizModal');
    openCheckout('identity');
  }
  if (e.target.id === 'resultCopy') {
    const saved = loadIdentity();
    const id = saved ? IDENTITIES[saved.key] : null;
    const txt = id ? `I'm ${id.title} on Healii ${id.emoji} — discover yours: ${location.href}` : location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(
        () => toast('🔗 Link copied to clipboard', 'success'),
        () => toast('Could not copy link', 'error')
      );
    } else {
      toast('🔗 Link copied to clipboard', 'success');
    }
  }
  if (e.target.id === 'resultDownload') {
    const saved = loadIdentity();
    if (!saved) return;
    const id = IDENTITIES[saved.key];
    const data = {
      identity: id.title,
      taglineCategory: id.cat,
      pack: id.pack,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healii-identity-${saved.key}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('📥 Identity saved', 'success');
  }
});

/* ---------- HERO CARD ROTATION ---------- */
const heroIdentities = ['night_owl', 'grinder', 'scholar', 'naturalist', 'athlete', 'zen_seeker', 'gamer'];
const mainCard = document.getElementById('heroMainCard');
let idxId = 0;
if (mainCard) {
  mainCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  setInterval(() => {
    idxId = (idxId + 1) % heroIdentities.length;
    const id = IDENTITIES[heroIdentities[idxId]];
    const match = 86 + Math.floor(Math.random() * 10);

    mainCard.style.opacity = '0';
    mainCard.style.transform = 'translate(-50%, -50%) scale(0.95)';
    setTimeout(() => {
      mainCard.querySelector('.idc-emoji').textContent = id.emoji;
      mainCard.querySelector('.idc-name').textContent = id.title.replace(/^The\s+/, '');
      mainCard.querySelector('.idc-tagline').textContent = id.tags.map(t => t[0].toUpperCase() + t.slice(1)).join(' · ');
      mainCard.querySelector('.idc-match').textContent = `${match}% Match`;
      mainCard.querySelector('.idc-pills').innerHTML = id.sups.map(p => `<span>${p}</span>`).join('');
      mainCard.style.opacity = '1';
      mainCard.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 320);
  }, 3400);
}

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', e => {
  const closeId = e.target?.dataset?.close;
  if (closeId) closeModal(closeId);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => closeModal(m.id));
  }
});

/* ============================================================
   AUTH (localStorage-only, demo)
   ============================================================ */
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const profileMenu = document.getElementById('profileMenu');
const profileTrigger = document.getElementById('profileTrigger');
const profileDrop = document.getElementById('profileDrop');
const profileAv = document.getElementById('profileAv');
const profileName = document.getElementById('profileName');

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return h.toString(36);
}

function getUsers() { return ls.get(STORAGE.users, {}) || {}; }
function currentUser() { return ls.get(STORAGE.user); }

function setUser(user) {
  ls.set(STORAGE.user, user);
  applyUserToNav();
}
function clearUser() {
  ls.remove(STORAGE.user);
  applyUserToNav();
}

function applyUserToNav() {
  const u = currentUser();
  if (u) {
    loginBtn.hidden = true;
    profileMenu.hidden = false;
    profileAv.textContent = u.name.charAt(0).toUpperCase();
    profileName.textContent = u.name.split(' ')[0];
  } else {
    loginBtn.hidden = false;
    profileMenu.hidden = true;
    profileMenu.classList.remove('open');
  }
}
applyUserToNav();

function openLogin(e) {
  if (e) e.preventDefault();
  switchAuthTab('login');
  openModal('authModal');
}
loginBtn.addEventListener('click', openLogin);
document.getElementById('mobileLoginBtn')?.addEventListener('click', openLogin);

document.querySelectorAll('.auth-tab').forEach(t => {
  t.addEventListener('click', () => switchAuthTab(t.dataset.tab));
});
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(f => { f.hidden = f.dataset.form !== tab; });
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const email = data.get('email').toLowerCase().trim();
  const pwHash = hashStr(data.get('password'));
  const errEl = document.getElementById('loginErr');

  const users = getUsers();
  const user = users[email];
  if (!user || user.pwHash !== pwHash) {
    errEl.hidden = false;
    errEl.textContent = 'Email or password is incorrect.';
    return;
  }
  errEl.hidden = true;
  setUser({ email, name: user.name });
  closeModal('authModal');
  loginForm.reset();
  toast(`✦ Welcome back, ${user.name.split(' ')[0]}!`, 'success');
});

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(signupForm);
  const email = data.get('email').toLowerCase().trim();
  const name = data.get('name').trim();
  const pwHash = hashStr(data.get('password'));
  const errEl = document.getElementById('signupErr');

  const users = getUsers();
  if (users[email]) {
    errEl.hidden = false;
    errEl.textContent = 'An account already exists for this email.';
    return;
  }
  errEl.hidden = true;
  users[email] = { name, pwHash, createdAt: Date.now() };
  ls.set(STORAGE.users, users);
  setUser({ email, name });
  closeModal('authModal');
  signupForm.reset();
  toast(`✦ Welcome, ${name.split(' ')[0]}!`, 'success');
  setTimeout(() => openQuiz(), 600);
});

profileTrigger.addEventListener('click', e => {
  e.stopPropagation();
  profileMenu.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!profileMenu.contains(e.target)) profileMenu.classList.remove('open');
});
profileDrop.addEventListener('click', e => {
  const action = e.target?.dataset?.action;
  if (!action) return;
  profileMenu.classList.remove('open');
  if (action === 'logout') {
    clearUser();
    toast('Logged out — see you soon ✦', 'info');
  } else if (action === 'dashboard') {
    openDashboard();
  } else if (action === 'identity') {
    openQuizSmart();
  } else if (action === 'orders') {
    showOrders();
  }
});

function showOrders() {
  const orders = ls.get(STORAGE.orders, []);
  if (!orders.length) {
    toast('You haven\'t ordered yet — try the Identity Pack ✦', 'info', 3600);
    return;
  }
  const last = orders[orders.length - 1];
  toast(`📦 ${orders.length} order${orders.length > 1 ? 's' : ''}. Latest: ${last.id} — arrives ${last.eta}`, 'info', 4200);
}

/* ============================================================
   DASHBOARD
   ============================================================ */
const dashModal = document.getElementById('dashModal');
const todayKey = () => new Date().toISOString().slice(0, 10);

function getDailyAll() { return ls.get(STORAGE.daily, {}); }
function getToday() {
  const all = getDailyAll();
  return all[todayKey()] || { water: 0, sleep: 7, mood: 0, exercise: 0 };
}
function setToday(data) {
  const all = getDailyAll();
  all[todayKey()] = { ...getToday(), ...data, updated: Date.now() };
  ls.set(STORAGE.daily, all);
}

function openDashboard() {
  if (!currentUser()) {
    toast('Sign up or log in to track your wellness ✦', 'info');
    switchAuthTab('signup');
    openModal('authModal');
    return;
  }
  const u = currentUser();
  document.getElementById('dashName').textContent = u.name.split(' ')[0];
  document.getElementById('dashGreeting').textContent = greeting();
  hydrateDashboard();
  drawChart();
  renderBadges();
  renderStreak();
  openModal('dashModal');
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12)  return 'good morning ☀️';
  if (h < 17)  return 'good afternoon ✦';
  if (h < 21)  return 'good evening 🌙';
  return 'still up tonight? 🦉';
}

/* Water */
const waterRow = document.getElementById('waterRow');
function renderWater(count) {
  waterRow.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const cup = document.createElement('button');
    cup.className = 'water-cup' + (i < count ? ' filled' : '');
    cup.textContent = '💧';
    cup.dataset.i = i;
    cup.addEventListener('click', () => {
      const today = getToday();
      const newCount = (today.water === i + 1) ? i : i + 1;
      setToday({ water: newCount });
      renderWater(newCount);
      document.getElementById('waterCount').textContent = `${newCount} / 8`;
    });
    waterRow.appendChild(cup);
  }
  document.getElementById('waterCount').textContent = `${count} / 8`;
}

/* Sleep */
const sleepSlider = document.getElementById('sleepSlider');
const sleepVal = document.getElementById('sleepVal');
const sleepHelp = document.getElementById('sleepHelp');
sleepSlider.addEventListener('input', () => {
  const v = parseFloat(sleepSlider.value);
  sleepVal.textContent = v;
  setToday({ sleep: v });
  sleepHelp.textContent =
    v < 5 ? 'Way too little — your body is in survival mode.' :
    v < 7 ? 'Below recommended — try winding down 30 min earlier.' :
    v <= 9 ? 'Right in the sweet spot.' :
    'Solid recovery — make sure quality matches quantity.';
});

/* Mood */
const moodRow = document.getElementById('moodRow');
moodRow.addEventListener('click', e => {
  const opt = e.target.closest('.mood-opt');
  if (!opt) return;
  moodRow.querySelectorAll('.mood-opt').forEach(o => o.classList.remove('selected'));
  opt.classList.add('selected');
  const v = parseInt(opt.dataset.val, 10);
  setToday({ mood: v });
});

/* Exercise */
const exerciseSlider = document.getElementById('exerciseSlider');
const exerciseVal = document.getElementById('exerciseVal');
const exerciseHelp = document.getElementById('exerciseHelp');
exerciseSlider.addEventListener('input', () => {
  const v = parseInt(exerciseSlider.value, 10);
  exerciseVal.textContent = v;
  setToday({ exercise: v });
  exerciseHelp.textContent =
    v === 0   ? 'Every step counts.' :
    v < 20    ? 'A start — even a walk pays off.' :
    v < 45    ? 'Solid moderate session.' :
    v < 90    ? 'Strong — recover well today.' :
    'Heavy training — prioritize sleep tonight.';
});

function hydrateDashboard() {
  const t = getToday();
  renderWater(t.water || 0);
  sleepSlider.value = t.sleep ?? 7;
  sleepVal.textContent = t.sleep ?? 7;
  exerciseSlider.value = t.exercise ?? 0;
  exerciseVal.textContent = t.exercise ?? 0;
  moodRow.querySelectorAll('.mood-opt').forEach(o => {
    o.classList.toggle('selected', parseInt(o.dataset.val, 10) === (t.mood || 0));
  });
  sleepSlider.dispatchEvent(new Event('input'));
  exerciseSlider.dispatchEvent(new Event('input'));
}

/* ---------- STREAK ---------- */
function renderStreak() {
  const all = getDailyAll();
  const dates = Object.keys(all).sort();
  let streak = 0;
  const day = 86400000;
  let cursor = new Date(); cursor.setHours(0,0,0,0);
  for (let i = 0; i < 365; i++) {
    const k = cursor.toISOString().slice(0, 10);
    if (all[k] && (all[k].water || all[k].mood || all[k].exercise || all[k].sleep !== 7)) streak++;
    else if (i > 0) break;
    cursor = new Date(cursor.getTime() - day);
  }
  document.getElementById('streakDays').textContent = streak;
}

/* ---------- BADGES ---------- */
const BADGES = [
  { id: 'first_step',   icon: '👟', name: 'First Step',     test: () => !!loadIdentity() },
  { id: 'three_day',    icon: '🔥', name: '3-Day Streak',   test: () => streakCount() >= 3 },
  { id: 'week_warrior', icon: '🏆', name: 'Week Warrior',   test: () => streakCount() >= 7 },
  { id: 'hydrated',     icon: '💧', name: 'Hydration Hero', test: () => (getToday().water || 0) >= 8 },
  { id: 'rested',       icon: '😴', name: 'Well Rested',    test: () => (getToday().sleep || 0) >= 8 },
  { id: 'active',       icon: '💪', name: 'Active Day',     test: () => (getToday().exercise || 0) >= 30 },
  { id: 'perfect_day',  icon: '✨', name: 'Perfect Day',
    test: () => {
      const t = getToday();
      return (t.water||0) >= 8 && (t.sleep||0) >= 7 && (t.mood||0) >= 4 && (t.exercise||0) >= 20;
    }},
  { id: 'subscribed',   icon: '📦', name: 'Subscriber',     test: () => (ls.get(STORAGE.orders, []) || []).length > 0 },
];

function streakCount() {
  const all = getDailyAll();
  let streak = 0;
  const day = 86400000;
  let cursor = new Date(); cursor.setHours(0,0,0,0);
  for (let i = 0; i < 365; i++) {
    const k = cursor.toISOString().slice(0, 10);
    if (all[k]) streak++;
    else if (i > 0) break;
    cursor = new Date(cursor.getTime() - day);
  }
  return streak;
}

function renderBadges() {
  const row = document.getElementById('badgeRow');
  const unlocked = ls.get(STORAGE.badges, []) || [];
  let html = '';
  let count = 0;
  BADGES.forEach(b => {
    const isUnlocked = unlocked.includes(b.id) || b.test();
    if (isUnlocked && !unlocked.includes(b.id)) {
      unlocked.push(b.id);
      toast(`🎖 Badge unlocked: ${b.name}`, 'success', 3200);
    }
    if (isUnlocked) count++;
    html += `
      <div class="badge ${isUnlocked ? 'unlocked' : ''}">
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-name">${b.name}</span>
      </div>
    `;
  });
  ls.set(STORAGE.badges, unlocked);
  row.innerHTML = html;
  document.getElementById('badgeCount').textContent = `${count} / ${BADGES.length} unlocked`;
}

/* ---------- WEEKLY CHART (canvas) ---------- */
function drawChart() {
  const canvas = document.getElementById('dashChart');
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 720;
  const cssH = canvas.clientHeight || 200;
  canvas.width = cssW * ratio;
  canvas.height = cssH * ratio;
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, cssW, cssH);

  const all = getDailyAll();
  const days = [];
  const day = 86400000;
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * day);
    const k = d.toISOString().slice(0, 10);
    days.push({ k, label: d.toLocaleDateString(undefined, { weekday: 'short' }), data: all[k] || {} });
  }

  const padL = 36, padR = 12, padT = 10, padB = 30;
  const W = cssW - padL - padR;
  const H = cssH - padT - padB;
  const stepX = W / 6;

  /* grid */
  const grid = getCss('--border');
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = padT + (H / 4) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + W, y); ctx.stroke();
  }

  const labelColor = getCss('--txt-3');
  ctx.fillStyle = labelColor;
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  days.forEach((d, i) => {
    ctx.fillText(d.label, padL + i * stepX, padT + H + 18);
  });

  /* bars: water (cyan), exercise (green) */
  const barW = stepX * 0.22;
  days.forEach((d, i) => {
    const cx = padL + i * stepX;
    const water = d.data.water || 0;     // 0-8
    const ex    = d.data.exercise || 0;  // 0-120
    const hWater = (water / 8) * H;
    const hEx    = Math.min(ex / 90, 1) * H;

    /* water bar */
    ctx.fillStyle = '#06B6D4';
    roundRect(ctx, cx - barW - 1, padT + H - hWater, barW, hWater, 4);
    /* exercise bar */
    ctx.fillStyle = '#10B981';
    roundRect(ctx, cx + 1, padT + H - hEx, barW, hEx, 4);
  });

  /* sleep line (purple) */
  ctx.strokeStyle = '#8B5CF6';
  ctx.fillStyle = '#8B5CF6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  days.forEach((d, i) => {
    const sleep = d.data.sleep ?? null;
    const y = sleep == null ? padT + H : padT + H - (Math.min(sleep, 12) / 12) * H;
    const x = padL + i * stepX;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  days.forEach((d, i) => {
    const sleep = d.data.sleep ?? null;
    if (sleep == null) return;
    const y = padT + H - (Math.min(sleep, 12) / 12) * H;
    const x = padL + i * stepX;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function roundRect(ctx, x, y, w, h, r) {
  if (h <= 0) return;
  r = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function getCss(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#444';
}

/* dashboard footer */
document.getElementById('dashSave').addEventListener('click', () => {
  const t = getToday();
  setToday(t);
  renderBadges();
  renderStreak();
  drawChart();
  toast('✓ Today\'s check-in saved', 'success');

  const lbYou = document.getElementById('lbYouPts');
  if (lbYou) {
    const pts = 7450 + ((t.water || 0) * 5) + Math.round((t.sleep || 0) * 8) + ((t.mood || 0) * 12) + Math.round((t.exercise || 0) * 1.4);
    lbYou.textContent = `${pts.toLocaleString()} pts`;
  }
});
document.getElementById('dashReset').addEventListener('click', () => {
  const all = getDailyAll();
  delete all[todayKey()];
  ls.set(STORAGE.daily, all);
  hydrateDashboard();
  drawChart();
  renderBadges();
  toast('Today cleared', 'info');
});

window.addEventListener('resize', () => {
  if (dashModal.classList.contains('open')) drawChart();
});

/* ============================================================
   CHECKOUT
   ============================================================ */
const PLANS = {
  identity: { title: 'Identity Pack',  price: 19.99 },
  pro:      { title: 'Campus Pro',     price: 24.99 },
};

function openCheckout(planKey) {
  const plan = PLANS[planKey] || PLANS.identity;
  document.getElementById('coPlanTitle').textContent = plan.title;

  const id = loadIdentity() ? IDENTITIES[loadIdentity().key] : null;
  const pillsHtml = id
    ? `<p style="font-size:0.82rem;color:var(--txt-3);margin-bottom:8px">For ${id.emoji} ${id.title}</p>
       <div class="co-pills">${id.pack.map(p => `<span>${p}</span>`).join('')}</div>`
    : `<p style="font-size:0.82rem;color:var(--txt-3);margin-bottom:8px">Take the quiz first for a personalized pack — or proceed with our starter mix.</p>`;

  document.getElementById('coSummary').innerHTML = `
    ${pillsHtml}
    <div class="co-line"><span>Plan</span><span>${plan.title}</span></div>
    <div class="co-line"><span>Subscription</span><span>Monthly</span></div>
    <div class="co-line"><span>Shipping</span><span>Free</span></div>
    <div class="co-line co-total"><span>Total</span><span>$${plan.price.toFixed(2)} / month</span></div>
  `;

  goCheckoutStep(1);
  openModal('checkoutModal');
}

function goCheckoutStep(step) {
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.checkout-step[data-step="${step}"]`);
  if (target) target.classList.add('active');
}

document.querySelectorAll('[data-checkout]').forEach(btn => {
  btn.addEventListener('click', () => openCheckout(btn.dataset.checkout));
});
document.getElementById('getStartedFreeBtn')?.addEventListener('click', () => openQuiz());

document.querySelectorAll('[data-co-next]').forEach(b => {
  b.addEventListener('click', () => goCheckoutStep(parseInt(b.dataset.coNext, 10)));
});
document.querySelectorAll('[data-co-prev]').forEach(b => {
  b.addEventListener('click', () => goCheckoutStep(parseInt(b.dataset.coPrev, 10)));
});

document.getElementById('shippingForm').addEventListener('submit', e => {
  e.preventDefault();
  goCheckoutStep(3);
});

document.getElementById('paymentForm').addEventListener('submit', e => {
  e.preventDefault();
  const id = `#HEA-${Math.floor(10000 + Math.random() * 89999)}`;
  const eta = new Date(Date.now() + 8 * 86400000)
    .toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  document.getElementById('orderId').textContent = id;
  document.getElementById('orderEta').textContent = eta;
  goCheckoutStep(4);

  const orders = ls.get(STORAGE.orders, []) || [];
  orders.push({ id, eta, ts: Date.now(), plan: document.getElementById('coPlanTitle').textContent });
  ls.set(STORAGE.orders, orders);

  fireConfetti(140);
  toast('🎉 Order placed!', 'success');
  document.getElementById('shippingForm').reset();
  document.getElementById('paymentForm').reset();
});

/* card formatting */
const cardInput = document.querySelector('#paymentForm input[name="card"]');
cardInput.addEventListener('input', () => {
  const digits = cardInput.value.replace(/\D/g, '').slice(0, 16);
  cardInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
});
const expInput = document.querySelector('#paymentForm input[name="exp"]');
expInput.addEventListener('input', () => {
  let v = expInput.value.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
  expInput.value = v;
});

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
const testiTrack = document.getElementById('testiTrack');
const testiDots = document.getElementById('testiDots');
const testiCards = testiTrack.children.length;
let testiIdx = 0;
let testiTimer;

function visibleCount() {
  if (window.innerWidth <= 768)  return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}
function totalDots() {
  return Math.max(1, testiCards - visibleCount() + 1);
}
function renderTestiDots() {
  testiDots.innerHTML = '';
  for (let i = 0; i < totalDots(); i++) {
    const d = document.createElement('button');
    d.className = 'testi-dot' + (i === testiIdx ? ' active' : '');
    d.addEventListener('click', () => goTesti(i));
    testiDots.appendChild(d);
  }
}
function goTesti(i) {
  testiIdx = (i + totalDots()) % totalDots();
  const card = testiTrack.firstElementChild;
  if (!card) return;
  const cardW = card.getBoundingClientRect().width + 20;
  testiTrack.style.transform = `translateX(${-testiIdx * cardW}px)`;
  testiDots.querySelectorAll('.testi-dot').forEach((d, j) => d.classList.toggle('active', j === testiIdx));
  resetTestiTimer();
}
function resetTestiTimer() {
  clearInterval(testiTimer);
  testiTimer = setInterval(() => goTesti(testiIdx + 1), 5000);
}
document.getElementById('testiPrev').addEventListener('click', () => goTesti(testiIdx - 1));
document.getElementById('testiNext').addEventListener('click', () => goTesti(testiIdx + 1));
window.addEventListener('resize', () => { renderTestiDots(); goTesti(0); });
renderTestiDots();
goTesti(0);
resetTestiTimer();

/* ============================================================
   FAQ — single-open behavior
   ============================================================ */
document.querySelectorAll('#faqList .faq-item').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('#faqList .faq-item').forEach(o => {
        if (o !== d) o.open = false;
      });
    }
  });
});

/* ============================================================
   NEWSLETTER
   ============================================================ */
document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim().toLowerCase();
  if (!email) return;
  const subs = ls.get(STORAGE.newsletter, []) || [];
  if (subs.includes(email)) {
    toast('You\'re already subscribed ✦', 'info');
  } else {
    subs.push(email);
    ls.set(STORAGE.newsletter, subs);
    toast('🎉 Subscribed — check your inbox!', 'success');
  }
  document.getElementById('newsletterEmail').value = '';
});

/* ============================================================
   QUIZ TRIGGERS
   ============================================================ */
['heroQuizBtn', 'ctaQuizBtn'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', openQuiz);
});
['navQuizBtn', 'mobileQuizBtn'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', openQuizSmart);
});

/* ============================================================
   CONFETTI
   ============================================================ */
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiRunning = false;

function sizeConfetti() {
  const ratio = window.devicePixelRatio || 1;
  confettiCanvas.width = window.innerWidth * ratio;
  confettiCanvas.height = window.innerHeight * ratio;
  confettiCanvas.style.width = window.innerWidth + 'px';
  confettiCanvas.style.height = window.innerHeight + 'px';
  confettiCtx.scale(ratio, ratio);
}
sizeConfetti();
window.addEventListener('resize', sizeConfetti);

function fireConfetti(count = 90) {
  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 14 - 4,
      g: 0.32,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 0,
      max: 140 + Math.random() * 60,
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(confettiTick);
  }
}

function confettiTick() {
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confettiPieces.forEach(p => {
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = Math.max(0, 1 - p.life / p.max);
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
    confettiCtx.restore();
  });
  confettiPieces = confettiPieces.filter(p => p.life < p.max && p.y < window.innerHeight + 40);
  if (confettiPieces.length) {
    requestAnimationFrame(confettiTick);
  } else {
    confettiRunning = false;
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

/* ============================================================
   DAILY TIP
   ============================================================ */
const TIPS = [
  'Stay hydrated — most students drink 30% less than they think.',
  '15 min of morning sunlight can reset your circadian rhythm.',
  'Magnesium glycinate before bed can deepen sleep quality.',
  'A 90-second cold rinse at the end of a shower boosts mood.',
  'Caffeine has a 6-hour half-life — cut off by 2pm for better sleep.',
  'Eat a protein-forward breakfast to flatten the 3pm energy crash.',
  'Walk 10 minutes after meals — it improves blood sugar response.',
  'Box-breathe (4-4-4-4) for 60 seconds to drop stress fast.',
];
const tipCard = document.getElementById('tipCard');
const tipText = document.getElementById('tipText');
const tipClose = document.getElementById('tipClose');

function showRandomTip() {
  if (ls.get(STORAGE.tipDismiss)) return;
  tipText.textContent = TIPS[Math.floor(Math.random() * TIPS.length)];
  tipCard.hidden = false;
}
tipClose.addEventListener('click', () => {
  tipCard.hidden = true;
  ls.set(STORAGE.tipDismiss, Date.now());
});
setTimeout(showRandomTip, 6000);

/* ============================================================
   INIT
   ============================================================ */
applyIdentityToNav();
document.querySelectorAll('.step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 80}ms`;
});

/* Welcome message for first visit */
if (!ls.get('healii_visited_v1')) {
  setTimeout(() => {
    toast('Welcome to Healii ✦ — try the quiz to find your identity!', 'info', 4500);
    ls.set('healii_visited_v1', Date.now());
  }, 1200);
}
