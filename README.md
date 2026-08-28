# vgs-lectures

Reveal.js/Vite lecture slide decks for **Video Game Studies**. One folder per
week, a shared theme/visual system, deployed to GitHub Pages.

## Structure

```
index.html          landing page linking to every week
week01/ ... week15/  one deck per week (index.html + main.js)
shared/
  theme.css          palette, layout patterns, bottom status bar, iframe fix
  reveal-init.js      deck bootstrap: status bar + animated-background registry
  webgl-utils.js       shared WebGL helpers (shader compile/link, fullscreen quad, hex->rgb, canvas resize)
  bg-voronoi.js         animated Worley/cell-noise background
  bg-truchet.js         drifting Truchet-tile weave background
  bg-scanline.js        CRT scanline/color-band background
.github/workflows/
  deploy.yml           builds with Vite and deploys dist/ to GitHub Pages on push to main
```

## Commands

```
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Adding a new week

1. Copy an existing `weekNN/` folder (index.html + main.js are boilerplate;
   only the slide content in index.html needs to change).
2. Bump `WEEK_COUNT` in `vite.config.js` if the new week extends past 15.
3. Add a link to it in the root `index.html`.

## Slide conventions

- Every top-level `<section>` should carry `data-movement="N"` and
  `data-movement-name="Label"` — `data-movement` drives the bottom status
  bar's progress-fill color and the slide count (`current/total`); slides
  aren't titled in the bar, so `data-movement-name` is currently unused
  there but kept on the markup for future use. For vertical stacks, put
  the attributes on the parent slide (nested slides inherit visually via
  `.closest('[data-movement]')` in `reveal-init.js`).
- `.impact-slide` / `.impact-inner` — full-bleed centered layout, good for
  title/closing slides.
- `.title-highlight` — highlighter-rectangle heading, usable standalone or
  on dividers. Set the color via inline `style="--divider-color: var(--accent-*);"`.
- Divider/section-break slides can opt into an animated WebGL background
  with `data-bg="voronoi|truchet|scanline"` and `data-bg-rotate="n"` (see
  `shared/reveal-init.js` for the registry).
- `.photo-caption`, `.media-pair` / `.media-trio`, `.quote-block` — documented
  reusable content patterns in `shared/theme.css`; see the comments there
  for expected markup.
- Utility classes `.text-*` / `.bg-*` for each accent: `magenta`, `cyan`,
  `lime`, `orange`, `violet`, plus `neutral` (UI-chrome only — kept out of
  the animated-background rotation on purpose).

## Deploying

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is in place but
has **not** been pushed/enabled yet. To go live:

1. Create the GitHub repo (e.g. `gh repo create vgs-lectures --public --source=. --remote=origin`).
2. Push to `main`.
3. In the repo's Settings → Pages, set the source to **GitHub Actions**.

After that, every push to `main` rebuilds and redeploys automatically.
