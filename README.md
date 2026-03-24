# Designer Portfolio

A multi-page portfolio website for a designer. Built with HTML, CSS, and JavaScript.

## File Structure

```
lea-portfolio/
├── index.html          → Home page
├── work.html           → Work / Portfolio page
├── about.html          → About page
├── services.html       → Services page
├── contact.html        → Contact page
├── style.css           → All shared styles (linked by every page)
└── nav.js              → All shared JavaScript (loaded by every page)
```

The architecture follows a real production pattern: shared CSS and JS live in one place each, and every HTML file simply links to them. Changing a colour variable or nav item updates all five pages at once.

---

## Pages

### `index.html` — Home

The landing page. Sets the tone for the entire site.

- Full-viewport hero split layout with a Ken Burns photo animation
- Animated hero text with staggered `fadeUp` keyframes
- Custom dual-ring cursor with lerp (linear interpolation) lag effect
- Continuous CSS marquee ticker strip
- 2×2 project preview grid with hover overlays
- Project modal pop-ups with full case study content
- Dark "about strip" section with animated stats

### `work.html` — Work

The full portfolio listing.

- Category filter bar (Brand / Digital / Editorial / Packaging / Motion) — filters projects with zero page reload
- Featured project card with full-bleed photo
- Seven project rows with thumbnail images, tags, and hover arrow
- Each row opens a detailed modal with project description, the brief challenge, and deliverable tags

### `about.html` — About

A deep-dive into the designer's background.

- Split hero with portrait photo and intro text
- Portrait + editorial quote panel
- Long-form biography with inline sidebar (education, clients, publications)
- Career timeline on a dark background (2014 → present)
- Animated skill bars that fill on scroll using IntersectionObserver
- Awards and recognition grid

### `services.html` — Services

What the designer offers and how she works.

- Full-bleed photo banner with text overlay
- Three expanded service cards (Brand Identity, Art Direction, Digital Design) — each with description, deliverable checklist, and starting price
- Hover highlight on every deliverable list item
- Four-step process section on a dark background
- FAQ accordion — click to expand/collapse, only one open at a time

### `contact.html` — Contact

The enquiry page.

- Availability banner with pulsing green dot
- Split layout: Paris photo with dark overlay on the left, enquiry form on the right
- Full form with name, email, company, service selector, budget range, project description, and referral source
- Client-side form validation — required fields checked before submit
- Success confirmation message on valid submission

---

## Shared Files

### `style.css`

Contains every CSS rule used across all five pages. Organised into sections:

| Section                            | What it covers                                                         |
| ---------------------------------- | ---------------------------------------------------------------------- |
| CSS variables                      | `--cream`, `--ink`, `--rust`, `--sage`, `--gold`, `--mist`             |
| Reset & base                       | box-sizing, body font, noise texture overlay                           |
| Cursor                             | `#cursor` dot and `#cursor-ring` styles                                |
| Nav                                | Fixed nav, scroll-blur effect, active link underline, mobile hamburger |
| Keyframes                          | `fadeUp`, `fadeIn`, `marquee`, `scrollDrop`, `pulse`, `kenburns`       |
| Reveal                             | `.reveal` / `.reveal.visible` scroll animation classes                 |
| Shared typography                  | `.page-label`, `.page-h1`, `.sec-label`, `.sec-title`                  |
| Marquee                            | Scrolling ticker strip                                                 |
| Footer                             | Dark footer shared by all pages                                        |
| Modal                              | Project pop-up overlay used on Home and Work                           |
| Home                               | Hero, project grid, about strip                                        |
| Work                               | Hero, filter bar, featured card, project rows, thumbnails              |
| About                              | Hero, portrait section, story, timeline, skill bars, awards            |
| Services                           | Hero, photo banner, service cards, process steps, FAQ                  |
| Contact                            | Availability strip, split layout, form, success state                  |
| Mobile `@media (max-width: 768px)` | All responsive overrides for every section                             |

### `nav.js`

All shared JavaScript. Each function checks whether the elements it needs exist before running — so the same file works safely across all five pages without errors.

| Function / Feature   | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| Custom cursor        | Dot tracks mouse exactly; ring uses `requestAnimationFrame` lerp loop     |
| `bindCursor()`       | Attaches expand/shrink hover effects to interactive elements              |
| Nav scroll           | Adds `.scrolled` class (frosted glass background) after 40px scroll       |
| `toggleMobile()`     | Opens/closes the full-screen mobile nav overlay                           |
| `initReveal()`       | IntersectionObserver that adds `.visible` to `.reveal` elements on scroll |
| `initSkillBars()`    | IntersectionObserver that triggers skill bar fill animations              |
| FAQ accordion        | Click handler on `#faqItems` — one item open at a time                    |
| Filter bar           | Click handler on `#filterBar` — shows/hides project rows by category      |
| `projects` object    | All project data (title, description, challenge, tags, photo URL)         |
| `openModal(key)`     | Populates and shows the project modal for a given project key             |
| `closeModal(e)`      | Closes modal when clicking the overlay background                         |
| `closeModalDirect()` | Closes modal from the ✕ button or Escape key                              |
| `submitForm()`       | Validates contact form fields and shows success confirmation              |

---
