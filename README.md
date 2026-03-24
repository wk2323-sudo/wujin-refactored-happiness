# Designer Portfolio

This is a multi-page portfolio website for a fictional Parisian designer. The site is built entirely with HTML and CSS.

## How to Run

Download all six files into the same folder on your computer, then open `index.html` in any modern browser. No server, no terminal, and no installation is required. Navigation between pages works through standard anchor links — clicking a nav item loads the corresponding HTML file directly.

## File Structure

```
portfolio/
├── index.html       → Home page
├── work.html        → Work / Portfolio page
├── about.html       → About page
├── services.html    → Services page
├── contact.html     → Contact page
└── style.css        → All shared styles (linked by every page)
```

The project is made up of six files. Five are HTML pages, one for each section of the site, and one is a shared CSS file that every page links to. This structure follows a real production pattern — each page lives in its own clean document and pulls in the same shared styles. Changing a colour variable or a nav item in `style.css` updates the entire site at once.

## Pages

### Home

The Home page is the landing experience for the site. It opens with a full-viewport split hero layout — text on the left and a photo on the right — where the photo uses a slow Ken Burns zoom animation to create a sense of movement without any JavaScript. The hero text fades and rises in using staggered CSS `@keyframes fadeUp` animations with different delay values on each element, so the headline, subheading, and call-to-action button each arrive one after another.

Below the hero is a CSS marquee strip — a continuously scrolling ticker of discipline names built entirely in CSS with no JavaScript involved. The project preview section shows four projects in a two-by-two grid, each card an anchor link to the Work page. Hovering a card scales the photo and reveals an overlay with the project name and category — all CSS transitions. Below the grid is a dark "about strip" with stats and a link through to the About page.

### Work

The Work page opens with a large typographic hero and the full project listing. At the top is a featured project card with a full-bleed photo and description. Below it are six further project rows, each showing a thumbnail, the project name, location, discipline tag, and year.

Each project row is an anchor link pointing to a corresponding case study section further down the same page. Rather than using a JavaScript modal pop-up, each project has its own full case study section built directly into the HTML — the photo, description, the creative challenge, and deliverable tags. The sections use alternating background colours to visually separate them, and `scroll-margin-top` ensures each section lands neatly below the fixed navigation bar.

### About

The About page gives a detailed picture of the designer's background. It opens with a split hero, followed by a portrait photograph paired with an editorial quote panel. Below that is a long-form biography section with an inline sidebar listing education history, clients, and publications.

The career timeline is laid out on a dark background, with each entry showing the year, role, employer, and a brief description. The skills section shows progress bars whose widths are set directly using inline `style="width: 98%"` attributes — no JavaScript needed. The page finishes with an awards and recognition grid showing six design awards.

### Services

The Services page begins with a large typographic hero and two key statistics. Below it is a full-bleed photo banner with a text overlay, followed by three expanded service cards covering Brand Identity, Art Direction, and Digital Design. Each card shows a description, a deliverable checklist, and a starting price. The deliverable items have a CSS hover highlight effect.

Below the service cards is a four-step process section on a dark background, and the page ends with a FAQ accordion. The accordion uses the pure CSS checkbox technique — each question is a `<label>` tied to a hidden `<input type="checkbox">`. When clicked, the CSS `:checked ~` sibling selector reveals the answer by animating `max-height`. No JavaScript is involved at any point.

### Contact

The Contact page opens with an availability banner showing a pulsing green dot. The main content is a split layout — on the left, a photograph of Paris behind a dark gradient overlay with the designer's contact details. On the right is a full enquiry form collecting name, email, company, service interest, budget range, project description, and referral source.

All required fields use the HTML `required` attribute, so the browser handles validation natively without JavaScript. The form `action` is set to `wk2323@nyu.edu`, which opens the visitor's default mail client. To connect the form to a real backend service like Formspree, changing the `action` attribute is the only thing that needs updating.

## Shared CSS File

All styling lives in `style.css`, organised into clearly labelled sections. The table below summarises every section in the file.

| Section                     | What it covers                                                            |
| --------------------------- | ------------------------------------------------------------------------- |
| CSS variables               | `--cream`, `--ink`, `--rust`, `--sage`, `--gold`, `--mist`                |
| Reset & base                | Box-sizing, body font, `cursor: auto`, noise texture overlay              |
| Keyframes                   | `fadeUp`, `fadeIn`, `marquee`, `scrollDrop`, `pulse`, `kenburns`          |
| Reveal                      | `.reveal` always visible — `opacity: 1`, `transform: none`                |
| Shared typography           | `.page-label`, `.page-h1`, `.sec-label`, `.sec-title`                     |
| Nav                         | Fixed nav, frosted glass background, active link underline, CSS hamburger |
| Marquee                     | Scrolling ticker strip                                                    |
| Footer                      | Dark footer shared by all pages                                           |
| Home                        | Hero, Ken Burns photo, project grid, hover overlays, about strip          |
| Work                        | Hero, featured card, project rows, thumbnails, case study sections        |
| About                       | Hero, portrait section, story, timeline, skill bars, awards               |
| Services                    | Hero, photo banner, service cards, process steps, CSS FAQ accordion       |
| Contact                     | Availability strip, split layout, form, pulsing dot                       |
| `@media (max-width: 768px)` | All responsive overrides for every section across all pages               |

## Key CSS Techniques

### Ken Burns zoom animation

The hero photo uses a CSS `@keyframes` animation called `kenburns` that scales the image from 100% to 108% over 14 seconds, running in an infinite loop that alternates direction. The result is a slow cinematic zoom with no JavaScript, no canvas, and no video.

```css
@keyframes kenburns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.08);
  }
}
.hero-photo {
  animation: kenburns 14s ease-out infinite alternate;
}
```

### CSS-only marquee

The scrolling ticker strip is built by duplicating the word list inside a flex container and applying a `@keyframes marquee` animation that translates from `0%` to `-50%`. Because the content is doubled, the second copy picks up exactly where the first ends — a perfectly seamless infinite loop with no JavaScript.

```css
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

### CSS checkbox accordion

The FAQ on the Services page uses hidden checkboxes to hold open/closed state. Each question is a `<label>` tied to a hidden `<input type="checkbox">`. When clicked, the CSS rule `.faq-item input:checked ~ .faq-a` applies `max-height: 300px` and the `transition` on `max-height` creates the smooth open and close. The `+` icon rotates using the same `:checked` state.

### CSS checkbox hamburger menu

The mobile navigation uses the same checkbox technique. A hidden `<input type="checkbox" id="nav-toggle">` sits before the `<nav>` in the HTML. The hamburger is a `<label for="nav-toggle">`, so clicking it toggles the checkbox. CSS then uses `#nav-toggle:checked ~ nav .nav-links` to show the full-screen nav overlay and `#nav-toggle:checked ~ nav .nav-hamburger span` rules to animate the icon into an X shape.

### Inline skill bar widths

The skill progress bars on the About page have their widths set directly as inline CSS — for example `style="width: 98%"`. This replaces the previous JavaScript approach that used an `IntersectionObserver` to animate bars from zero on scroll. The bars now display at their correct values immediately when the page loads.

### Responsive layout

Every two-column grid across the site collapses to a single column at 768 pixels. All five pages are covered by a single `@media (max-width: 768px)` block at the bottom of `style.css`. Section padding reduces from `48px` to `24px`, the hero stacks vertically with the photo on top, and project row thumbnails, tags, and year labels are hidden on mobile for a cleaner reading experience.

## Design Decisions

| Decision                            | Reasoning                                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Cormorant Garamond for display type | High contrast serif — reads as luxurious and editorial, borrowed from French print design                   |
| DM Mono for body text               | Monospaced gives a quiet, considered feel — like a designer's sketchbook rather than a polished brochure    |
| Cream `#F5F0E8` background          | Warm, paper-like; avoids the cold harshness of pure white on screen                                         |
| Rust `#C4562A` accent               | Terracotta warmth; feels Mediterranean and artisanal rather than corporate                                  |
| Gold `#C9A84C` highlight            | Reserved for dark-background sections — reads as subtle luxury against near-black                           |
| Noise texture overlay               | 0.4 opacity grain across the site adds print warmth and stops flat screens feeling like flat screens        |
| No JavaScript                       | HTML and CSS only — the site is lightweight, loads instantly, and works in any browser without dependencies |
| `cursor: auto` on body              | Default browser cursor; no custom cursor applied                                                            |

## Photos

All photographs are sourced from [Unsplash](https://unsplash.com), which provides free, high-resolution images for commercial use with no attribution required. Each image is loaded from Unsplash's CDN with URL parameters controlling width and compression quality.

```
https://images.unsplash.com/photo-{id}?w=900&q=80&auto=format&fit=crop
```

An internet connection is required to display photos. If the CDN is unavailable the images do not render, but the layout does not break — all text and structural elements remain fully visible.

## Browser Support

The site works in all modern browsers including Chrome, Firefox, Safari, and Edge. The CSS features used throughout — custom properties, `clamp()`, `grid`, `backdrop-filter`, `aspect-ratio`, and the `:checked ~` combinator — are all well supported in current browser versions. No polyfills are needed.

## Changes Made During Development

| Change                                                 | Reason                                                                                             |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Refactored from single HTML file to 6-file structure   | Easier to maintain — changing the nav or a CSS variable now updates all pages at once              |
| Removed JavaScript entirely                            | Replaced every JS feature with a CSS-only equivalent; site is simpler, faster, and more accessible |
| Removed custom cursor                                  | Restored the default browser cursor; more accessible and expected across all devices               |
| Added real Unsplash photos throughout                  | Replaced placeholder gradient backgrounds — makes the site feel inhabited and professional         |
| Replaced JS modals with inline case study sections     | Each project now has a full HTML section on `work.html`; anchor links replace click handlers       |
| Replaced JS FAQ accordion with CSS checkbox technique  | Click-to-expand now works via `:checked ~` CSS selector — zero JavaScript                          |
| Replaced JS skill bar animation with inline widths     | Bar widths set directly in HTML `style` attribute — always display correctly without scroll events |
| Replaced JS hamburger menu with CSS checkbox technique | Full-screen mobile nav opens and closes via `:checked ~` CSS selector — zero JavaScript            |
| Added real HTML form with `required` attributes        | Browser handles field validation natively; no JS validation needed                                 |

## Next Steps

The next steps below are grouped by priority — from most immediately impactful to longer-term improvements.

### High priority — functional improvements

| Feature              | What it would take                                                                                         | Why it matters                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Working contact form | Change the `<form action="">` to a Formspree or Netlify Forms endpoint — one line of HTML, no backend code | The current `mailto:` action is unreliable; many visitors have no mail client configured |
| Deploy to a live URL | Drag the folder onto Netlify, GitHub Pages, or Vercel — all free for static sites                          | A portfolio needs to be publicly accessible on the internet                              |
| Add more projects    | Add a new row to the project list and a new case study section in `work.html`                              | Seven projects is a start; a real portfolio grows over time                              |

### Medium priority — design and UX improvements

| Feature                                | What it would take                                                                                 | Why it matters                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Page transitions                       | ~20 lines of JavaScript to intercept link clicks, play a CSS fade-out, then navigate               | Currently navigating between pages feels like a hard reload; a transition makes it seamless |
| Dark mode                              | Add `@media (prefers-color-scheme: dark)` to `style.css` and override the six CSS colour variables | Many users browse in dark mode; supporting it is increasingly expected                      |
| Hero entrance animations on every page | Copy the `fadeUp` animation classes from the Home page hero to the other four page heroes          | Currently only the Home page has an entrance animation — other pages appear instantly       |
| Scroll reveal animations               | Add a small IntersectionObserver script to toggle a `.visible` class on `.reveal` elements         | Currently all content is visible on load; animated reveals add polish on scroll             |

### Lower priority — technical improvements

| Feature                    | What it would take                                                                          | Why it matters                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Lazy-load images           | Add `loading="lazy"` to every `<img>` tag below the fold — one attribute per image          | Defers off-screen images until needed; improves initial page load speed                               |
| Locally hosted images      | Download Unsplash photos, convert to WebP, place in an `images/` folder, update `src` paths | Removes the CDN dependency; site works fully offline                                                  |
| CMS-driven project content | Move project data into a headless CMS like Contentful or Sanity and fetch via API           | Currently editing a project means opening code files; a CMS lets a non-developer update the portfolio |
| Accessibility audit        | Run through Chrome Lighthouse or axe DevTools and fix flagged issues                        | Ensures the site works for screen reader users and meets basic WCAG standards                         |
| Social sharing meta tags   | Add `og:title`, `og:description`, `og:image` to the `<head>` of each page                   | Makes the site look correct when shared as a link on LinkedIn, iMessage, or social media              |
