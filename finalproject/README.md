Healii
AI-driven personalized wellness for college students. Discover your Health Identity with this quiz and get a custom-made vitamin pack just for you.

1. Concept and Structure
   The project began with defining a product concept, a wellness subscription for students that are too busy (or too broke) to navigate the supplement industry on their own. The main hook is the Health Identity, an archetype that gives the quiz result character, not just a list of vitamins.
   Then I drew the sections of the page in order:
   Navbar → Hero → Stats → How It Works → Identities Grid → Social Proof → Pricing → FAQ → Newsletter → CTA → Footer
   The modals (Quiz, Auth, Dashboard, Checkout) were designed in advance, because they had to be outside of the scroll flow.

2. Design the System First
   Before writing any component CSS I defined a full token system in :root. Each color, shadow, and surface is a reference to a CSS variable, making it super easy to control and adjust how the entire site looks from one place.

3. Architecture of JavaScript
   Instead of breaking JS into multiple files, I broke main.js into clearly delimited sections using banner comments:
   STORAGE → TOAST → THEME → NAV → SCROLL REVEAL → STAT COUNTERS → IDENTITIES DATA → QUIZ → AUTH → DASHBOARD → CHECKOUT → FAQ → NEWSLETTER → CONFETTI → DAILY TIP → INIT
   All localStorage access goes through a single ls helper (get, set, remove) with try/catch wrappers so a browser with storage disabled never crashes the app.

4. Sectional Construction
   We built and tested each feature separately and then wired the cross-feature interactions (e.g. when you finish the quiz, it saves your identity and auto-opens checkout; signing up immediately launches the quiz).

Interesting Technical Choices

1. Quizzes Scoring System
   The quiz employs a weighted additive scoring model instead of a simple branching decision tree. The test consists of 8 questions, each with 4 answer options. Each option is a dictionary of {identity_key:score_value} pairs. When the user is finished, all selected options are iterated and the scores are summed per identity. The one with the most wins overall.

function scoreAnswers() { const totals = {}; Object.keys(IDENTITIES).forEach(k => totals[k] = 0); answers.forEach((optIdx, qIdx) => { const opt = QUESTIONS[qIdx].opts[optIdx]; if (!opt) return; Object.entries(opt.scores).forEach(([k, v]) => { totals[k] = (totals[k] || 0) + v; }); const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]); return { winner: ranked[0][0], totals, ranked }; }

This means that a single answer can push multiple identities at once, and a user who, for example, exercises daily and sleeps well will not be railroaded into “Athlete” if their other answers push toward “Scholar.” The result screen also shows the top 3 near-matches in animated progress bars, which I thought was more honest and interesting than a single hard result.

2. Confetti using requestAnimationFrame
   The confetti burst on quiz completion is pure Canvas 2D animation - no library. Each particle is an object with position, velocity, gravity, rotation and a life/max counter for opacity fadeout. The render loop uses requestAnimationFrame, and cleans up automatically when the array is empty so there’s zero lingering cost after the animation ends.
   The hardest thing was to make it look natural: a little upward initial velocity (vy = random \* -14 - 4) plus per-frame gravity (p.vy += 0.32) gives a realistic arc. The canvas is also scaled by devicePixelRatio so confetti will look sharp on Retina displays.

3. Smooth Stat Counter Animation
   The animated stats (such as “0 → 94%”) are using a custom easeOutCubic function, instead of a linear tick. This gives the numbers a fast burst and then a slowdown as they get to the target, which looks more energetic and polished than a mechanical count.

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
The counters only fire once when the stats section scrolls into view, using IntersectionObserver with a threshold: 0.4 — so they always play out fully rather than starting off-screen.

4. Quiz “Smart” Button
   The navbar has a “Find My Identity” button, which reacts differently depending on state:
   Not logged in + no saved identity -> go straight to quiz
   logged in + identity exists → offers to see existing result or retake
   not logged in + identity from previous guest session exists → jumps right to the result
   This was a small UX detail but needed to track a few state branches cleanly.

Problems experienced

1. Modal Focus & Scroll-Lock
   In some browsers, opening a modal while the page is scrolled will cause overflow: hidden on <body> to jump the scroll position. The fix was to save window.scrollY before locking and restore it after closing — but getting the timing right (before vs. after the CSS transition) took some trial and error.

2. Change the canvas size
   The confetti canvas needs to resize with the window, as does the dashboard chart. The problem is that resizing <canvas> clears the content, so the chart had to be redrawn after every resize event. I debounced the resize handler so it doesn't redraw dozens of times a second during a drag.

3. Hashing Passwords Without a Back-end
   There is no server, so passwords are "hashed" on the client with a simple djb2 style string hash, and stored in localStorage. This is not cryptographically secure and would never be acceptable in production – it's purely for simulating the UX of a real auth flow without persisting plaintext. It was important for the project's scope to note this as a known limitation.
4. Mobile Nav + Body Scroll When the mobile menu is opened, document.body.style.overflow = 'hidden' works for most browsers, but in some cases, iOS Safari does not respect it on the body. The workaround is to apply the lock to a wrapper element. Something I discovered late and partially addressed.

5. <details> / FAQ Toggle Feature
   The FAQ uses native HTML <details> elements for zero-JS accordion behavior. Great for accessibility. The problem was that the browser by default allows multiple items open at once and it looks cluttered. I added a javascript listener on the toggle event to close all siblings items when one opens - effectively making it single-open - while still keeping the native keyboard and screen reader behaviour intact.

What I Learned

1. Intersection Observer is underutilized. I had used it for lazy loading, but this was new to me for scroll triggered animations and stat counters. It is much more performant than a scroll event listener and the API is clean once you understand thresholds and rootMargin.

2. Quiz scoring systems are interesting design problems in reality. The process of deciding which archetypes a given response should touch on, and to what degree, was a matter of thinking about the product persona as much as the code. The data design of the QUESTIONS array contained most of the product thinking.

3. Canvas 2D is better than I thought it would be. I had only used it for simple drawing before this project. The confetti system and the 7-day wellness chart were built from scratch and I learned to use transform, globalAlpha and animation loop pattern well.

4. localStorage as a database has real limitations. Okay for a demo, but the storage limits (~5MB), lack of indexing, and synchronous API quickly become issues. It made me realize why even simple apps need a real backend. Building around it.

What’s Next ?

1. Real Backend & Authentification
   Replace the localStorage auth simulation with a real backend (Node/Express or BaaS like Supabase). Passwords would be hashed server-side using bcrypt and sessions would be handled using either JWTs or cookies. It lets you sync between devices and actually recover your account.

2. Identity Engine by AI
   The quiz scoring is currently deterministic logic that I wrote by hand. The next step would be to send the quiz answers to a language model through API and generate a nuanced, personalized explanation of the result — one that references the user’s specific combination of answers rather than a fixed description per archetype.

3. Stripe Integration.
   The checkout flow is completely mocked. Adding Stripe's payment intents API (using test keys) would make the demo feel production-ready and is a natural portfolio piece.

4. Custom Dashboard with Live Data Synchronization
   The daily check-in dashboard only currently saves locally to the browser. If there were a backend, check-in history would sync across devices and could be used to generate a weekly email digest highlighting sleep trends, mood patterns, and streak milestones.

5. Push Notifications / Alerts
   A daily check-in is only helpful if people remember to do it. A PWA service worker could do scheduled push reminders (“Time to log today’s check-in”) without a native app.

Demo Link:
https://youtu.be/q_417vIBVig
