// shared/reveal-init.js
// Shared reveal.js bootstrap for every week: standard deck config, the
// bottom status bar, and the animated-background registry for divider
// slides.
//
// Usage (in a week's main.js):
//   import 'reveal.js/dist/reveal.css';
//   import 'reveal.js/dist/theme/black.css';
//   import '../shared/theme.css';
//   import { initDeck } from '../shared/reveal-init.js';
//   initDeck();
//
// IMPORTANT: theme.css must be imported LAST, after reveal's own CSS. In
// Vite's dev server, CSS is injected as <style> tags in the literal order
// imports execute, so importing theme.css first means reveal's own rules
// (e.g. .reveal h1-h4, .reveal .controls) load after it and win the
// cascade at equal specificity -- our overrides would silently do nothing
// in `npm run dev` even though a production `build` happens to reorder
// CSS into chunks that mask the bug.
//
// Structural conventions this reads from the markup:
//   - Top-level <section> elements carry data-movement="N" and
//     data-movement-name="Label". For vertical (nested) stacks the
//     attribute lives on the ancestor slide, not the child -- look it up
//     with slide.closest('[data-movement]').
//   - A divider slide opts into an animated background with
//     data-bg="voronoi|truchet|scanline" (defaults to DEFAULT_BG if
//     omitted/unrecognized) and optionally data-bg-rotate="n" to rotate
//     which palette color leads, so a group of slides sharing one texture
//     still look distinct from each other.

import Reveal from 'reveal.js';
import { createVoronoiBackground } from './bg-voronoi.js';
import { createTruchetBackground } from './bg-truchet.js';
import { createScanlineBackground } from './bg-scanline.js';

// Fixed cycle used both for the bottom-bar progress fill (colorForMovement)
// and, resolved to hex, for the animated backgrounds' palettes.
// --accent-neutral is deliberately excluded -- it's reserved for UI chrome,
// and a muted color in the background rotation would read as a dead cell.
const ACCENT_VARS = [
  '--accent-magenta',
  '--accent-cyan',
  '--accent-lime',
  '--accent-orange',
  '--accent-violet',
];

// Registry mapping a data-bg name to a factory returning
// { canvas, setVisible(bool), setColors(hexArray) }. Add new shader
// modules here.
const BACKGROUNDS = {
  voronoi: createVoronoiBackground,
  truchet: createTruchetBackground,
  scanline: createScanlineBackground,
};
const DEFAULT_BG = 'voronoi';

function getAccentHexes() {
  const styles = getComputedStyle(document.documentElement);
  return ACCENT_VARS.map((name) => styles.getPropertyValue(name).trim());
}

function rotate(arr, n) {
  const len = arr.length;
  const k = ((n % len) + len) % len;
  return arr.slice(k).concat(arr.slice(0, k));
}

// Indexes into the accent cycle by (n-1) % length -- used for the bottom
// bar's progress fill so movement colors stay consistent without being
// hand-set per slide. Returns a CSS custom property name (e.g.
// '--accent-cyan'), meant to be used inside var(...).
export function colorForMovement(n) {
  const i = Math.max(1, n) - 1;
  return ACCENT_VARS[i % ACCENT_VARS.length];
}

function setupStatusBar(deck) {
  const bar = document.createElement('div');
  bar.className = 'bottom-status-bar';
  bar.innerHTML = `
    <div class="status-progress"><div class="status-progress-fill"></div></div>
    <div class="status-count"></div>
  `;
  document.body.appendChild(bar);

  const fill = bar.querySelector('.status-progress-fill');
  const countEl = bar.querySelector('.status-count');

  function update() {
    const slide = deck.getCurrentSlide();
    if (!slide) return;

    const past = deck.getSlidePastCount();
    const total = deck.getTotalSlides();
    const current = past + 1;

    // Progress fill reflects slides *completed* (0% on the first slide,
    // 100% on the last) -- not the same as the 1-indexed count shown below.
    const pct = total > 1 ? (past / (total - 1)) * 100 : 100;

    fill.style.width = `${pct}%`;
    countEl.textContent = `${current}/${total}`;
  }

  // initDeck() attaches these listeners inside deck.initialize().then(...),
  // by which point reveal's 'ready' event may have already fired --
  // relying on it alone left the bar blank on first load (it only started
  // working after a slidechanged, e.g. navigating forward then back). Run
  // once immediately so the initial slide is always reflected.
  update();
  deck.on('ready', update);
  deck.on('slidechanged', update);
}

function setupBackgrounds(deck) {
  const palette = getAccentHexes();
  const instances = new Map();

  function ensureBackground(slide) {
    if (instances.has(slide)) return instances.get(slide);

    const name = slide.dataset.bg || DEFAULT_BG;
    const factory = BACKGROUNDS[name] || BACKGROUNDS[DEFAULT_BG];
    const instance = factory();

    const rotateBy = parseInt(slide.dataset.bgRotate || '0', 10);
    instance.setColors(rotate(palette, rotateBy));

    const bgElement = deck.getSlideBackground(slide);
    if (bgElement) {
      bgElement.appendChild(instance.canvas);
    }

    instances.set(slide, instance);
    return instance;
  }

  function refreshVisibility() {
    const current = deck.getCurrentSlide();
    document.querySelectorAll('[data-bg]').forEach((slide) => {
      const instance = ensureBackground(slide);
      instance.setVisible(slide === current);
    });
  }

  // Same "ready may have already fired" issue as setupStatusBar -- run
  // once immediately rather than relying solely on the 'ready' listener.
  refreshVisibility();
  deck.on('ready', refreshVisibility);
  deck.on('slidechanged', refreshVisibility);
}

export function initDeck(config = {}) {
  const deck = new Reveal({
    hash: true,
    controls: true,
    progress: false, // replaced by the custom bottom status bar
    center: false,
    transition: 'slide',
    ...config,
  });

  deck.initialize().then(() => {
    setupStatusBar(deck);
    setupBackgrounds(deck);
  });

  return deck;
}
