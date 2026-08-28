// shared/bg-scanline.js
// CRT/scanline background: a shifting color-band gradient overlaid with
// downward-drifting scanlines and a subtle flicker. Every visual element
// is driven directly by uTime (band position, scanline phase, flicker) --
// there's no simulation state to settle, so it stays visibly alive.

import {
  hexToRgb01,
  createProgram,
  createFullscreenQuad,
  resizeCanvasToDisplaySize,
  FULLSCREEN_VERTEX_SHADER,
} from './webgl-utils.js';

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColors[5];

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    float wave = 0.5 + 0.5 * sin(uv.x * 6.0 + uTime * 0.4);
    float bandF = wave * 4.0;
    int band = int(floor(bandF));
    float t = fract(bandF);

    int bandA = int(mod(float(band), 5.0));
    int bandB = int(mod(float(band + 1), 5.0));

    // Dynamic array indexing is disallowed in GLSL ES 1.00 fragment
    // shaders -- resolve each band's color via an if/else chain instead.
    vec3 colorA = uColors[0];
    if (bandA == 1) colorA = uColors[1];
    else if (bandA == 2) colorA = uColors[2];
    else if (bandA == 3) colorA = uColors[3];
    else if (bandA == 4) colorA = uColors[4];

    vec3 colorB = uColors[0];
    if (bandB == 1) colorB = uColors[1];
    else if (bandB == 2) colorB = uColors[2];
    else if (bandB == 3) colorB = uColors[3];
    else if (bandB == 4) colorB = uColors[4];

    vec3 base = mix(colorA, colorB, t);

    // Scanlines drifting continuously downward.
    float scan = sin((uv.y * uResolution.y * 0.9) - uTime * 40.0);
    float scanDark = 0.75 + 0.25 * scan;

    // Subtle flicker so it never reads as a static frame.
    float flicker = 0.9 + 0.1 * sin(uTime * 13.0);

    vec3 finalColor = base * scanDark * flicker;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createScanlineBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas bg-canvas-scanline';
  const gl = canvas.getContext('webgl');

  const program = createProgram(gl, FULLSCREEN_VERTEX_SHADER, FRAGMENT_SHADER);
  const quad = createFullscreenQuad(gl, program);

  const uResolution = gl.getUniformLocation(program, 'uResolution');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uColors = gl.getUniformLocation(program, 'uColors');

  let colors = new Float32Array(15);
  let visible = false;
  const start = performance.now();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;

    resizeCanvasToDisplaySize(canvas, gl);
    gl.useProgram(program);
    quad.bind();

    const t = ((performance.now() - start) / 1000) % 10000;

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform3fv(uColors, colors);

    quad.draw();
  }
  requestAnimationFrame(frame);

  return {
    canvas,
    setVisible(value) {
      visible = value;
    },
    setColors(hexArray) {
      const flat = [];
      for (let i = 0; i < 5; i++) {
        flat.push(...hexToRgb01(hexArray[i % hexArray.length]));
      }
      colors = new Float32Array(flat);
    },
  };
}
