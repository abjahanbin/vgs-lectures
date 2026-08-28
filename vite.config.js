import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

// Bump this when adding/removing week folders. Every week##/index.html must
// be listed explicitly in rollupOptions.input below -- Vite's multi-page
// build only bundles HTML entry points it's told about.
const WEEK_COUNT = 15;

function weekInputs(count) {
  const inputs = {};
  for (let i = 1; i <= count; i++) {
    const week = `week${String(i).padStart(2, '0')}`;
    inputs[week] = resolve(root, `${week}/index.html`);
  }
  return inputs;
}

export default defineConfig({
  // Relative base is required for GitHub Pages project sites, which are
  // served from a subpath (https://<user>.github.io/<repo>/) rather than
  // domain root.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...weekInputs(WEEK_COUNT),
      },
    },
  },
});
