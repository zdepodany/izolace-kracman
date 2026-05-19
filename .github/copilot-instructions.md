# Copilot Instructions – izolacekracman.cz

## Project overview

Static single-page website for **Hydroizolace Petr Kráčman**, a Czech waterproofing/insulation contractor. The site is Czech-language only. There is no build step, no package manager, and no framework.

## Stack

- **HTML** – single file: `index.html` (≈29 KB, one page with anchor sections)
- **CSS** – Tailwind CSS via CDN (`https://cdn.tailwindcss.com`); no local stylesheet
- **JS** – two vanilla JS files: `script.js` (carousel, modal, form, smooth scroll, years-of-experience counter) and `cookie-consent.js` (GDPR banner + Google Analytics activation)
- **Icons** – Font Awesome 6 via CDN
- **Analytics** – Google Analytics `G-VL76XQV64S`, activated only after cookie acceptance
- **Structured data** – JSON-LD in `<head>` (`LocalBusiness` + `RoofingContractor`)

## Page sections (by `id`)

`#o-nas` → `#sluzby` → `#proc-izolovat` → `#kontakt`

Navigation links use anchor hrefs; smooth scrolling is handled in `script.js`.

## Key conventions

- All user-facing text is in **Czech** (cs_CZ). Keep this when editing copy.
- Images live in `img/` and are served as `.webp`. The carousel uses lazy loading via `data-src` attributes; `loadImage()` in `script.js` swaps them to `src` on demand.
- The years-of-experience counter (`#years-of-experience`) is calculated dynamically from `startYear = 2006` in `calculateYearsOfExperience()`.
- Cookie consent state is stored in `localStorage` under the key `cookieConsent`. Google Analytics is only initialised after the user accepts.
- The contact form submits natively (no JS fetch); after submit, the form container is replaced with a Czech success message in the DOM.
- `stitch-export/` contains a Figma/Stitch design export – treat as reference only, do not modify.

## Deployment

The site is deployed directly from the repository root (no `dist/` folder). `CNAME` sets the custom domain `izolacekracman.cz`. `robots.txt` and `sitemap.xml` are hand-maintained.

## Local preview

```bash
# Any static server works, e.g.:
npx serve .
# or
python3 -m http.server 8080
```

No build, lint, or test commands exist in this project.
