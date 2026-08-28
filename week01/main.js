import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import '../shared/theme.css';
import { initDeck } from '../shared/reveal-init.js';

initDeck();

// Slide 3: 3x2 grid of GIFs (see .gif-grid in this week's index.html).
// Each cell independently swaps to a different random GIF from the pool
// every few seconds -- a rough stand-in for "after a few loops", since the
// browser has no event for an animated GIF completing a loop.
//
// Every path uses new URL(..., import.meta.url).href rather than a plain
// string -- a plain relative path works in `npm run dev` but silently
// 404s in the production build, since Vite only bundles/hashes assets it
// can statically see.
const GIF_URLS = [
  new URL('./assets/03/Egg.gif', import.meta.url).href,
  new URL('./assets/03/Hugs.gif', import.meta.url).href,
  new URL('./assets/03/IRLFriends.gif', import.meta.url).href,
  new URL('./assets/03/LastChill.gif', import.meta.url).href,
  new URL('./assets/03/MindGarden.gif', import.meta.url).href,
  new URL('./assets/03/Nature.gif', import.meta.url).href,
  new URL('./assets/03/Oranges.gif', import.meta.url).href,
  new URL('./assets/03/WalkCycle.gif', import.meta.url).href,
  new URL('./assets/03/bestill.gif', import.meta.url).href,
  new URL('./assets/03/blobrunner.gif', import.meta.url).href,
  new URL('./assets/03/cuppasmall.gif', import.meta.url).href,
  new URL('./assets/03/daydreaming.gif', import.meta.url).href,
  new URL('./assets/03/exportgif.gif', import.meta.url).href,
  new URL('./assets/03/fuzzyppl.gif', import.meta.url).href,
  new URL('./assets/03/fuzzysquig.gif', import.meta.url).href,
  new URL('./assets/03/giraf.gif', import.meta.url).href,
  new URL('./assets/03/horse.gif', import.meta.url).href,
  new URL('./assets/03/hueman.gif', import.meta.url).href,
  new URL('./assets/03/importantdecision.gif', import.meta.url).href,
  new URL('./assets/03/jumptestdummy.gif', import.meta.url).href,
  new URL('./assets/03/longlegs.gif', import.meta.url).href,
  new URL('./assets/03/meh.gif', import.meta.url).href,
  new URL('./assets/03/mobile.gif', import.meta.url).href,
  new URL('./assets/03/newfriends.gif', import.meta.url).href,
  new URL('./assets/03/stayconnected.gif', import.meta.url).href,
];

const gifCells = document.querySelectorAll('.gif-cell');

// Tracks what every cell is currently showing (by index), so a swap can
// exclude every GIF already on screen -- not just its own previous pick --
// guaranteeing no two cells ever play the same GIF at once. There are far
// more GIFs (25) than cells, so candidates never run out.
const activeGifs = new Array(gifCells.length).fill(null);

function pickUnusedGif(cellIndex) {
  const inUse = new Set(activeGifs.filter((_, i) => i !== cellIndex));
  const candidates = GIF_URLS.filter((url) => !inUse.has(url));
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function scheduleSwap(cell, cellIndex) {
  // Randomized 4-9s hold per cell -- roughly a few loops of these short
  // clips, and staggered per-cell (via recursive setTimeout, not a shared
  // setInterval) so the whole grid doesn't flip in lockstep.
  const delay = 4000 + Math.random() * 5000;
  setTimeout(() => {
    const next = pickUnusedGif(cellIndex);
    activeGifs[cellIndex] = next;
    cell.style.backgroundImage = `url(${next})`;
    scheduleSwap(cell, cellIndex);
  }, delay);
}

gifCells.forEach((cell, cellIndex) => {
  const initial = pickUnusedGif(cellIndex);
  activeGifs[cellIndex] = initial;
  cell.style.backgroundImage = `url(${initial})`;
  scheduleSwap(cell, cellIndex);
});
