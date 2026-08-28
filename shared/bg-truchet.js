// shared/bg-truchet.js
// Truchet tile weave: a grid of quarter-circle arcs, each cell randomly
// oriented one of two ways, forming an interlocking curve pattern. Motion
// comes from continuously scrolling the sampled coordinate by uTime (the
// `drift` term) -- the tiling itself never has to "settle", it's just
// always flowing across the canvas.

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

  float sdArc(vec2 p, vec2 center, float radius, float thickness) {
    return abs(length(p - center) - radius) - thickness;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.y;
    float scale = 8.0;
    vec2 drift = vec2(uTime * 0.06, -uTime * 0.04);
    vec2 p = uv * scale + drift;

    vec2 cell = floor(p);
    vec2 f = fract(p) - 0.5;

    float h = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
    vec2 c1 = h < 0.5 ? vec2(-0.5, -0.5) : vec2(-0.5, 0.5);
    vec2 c2 = h < 0.5 ? vec2(0.5, 0.5) : vec2(0.5, -0.5);

    float d1 = sdArc(f, c1, 0.5, 0.06);
    float d2 = sdArc(f, c2, 0.5, 0.06);
    float d = min(d1, d2);

    float line = smoothstep(0.02, 0.0, d);

    int idx = int(floor(mod(cell.x + cell.y, 5.0) + 0.5));

    // Dynamic array indexing is disallowed in GLSL ES 1.00 fragment
    // shaders -- resolve via an if/else chain of literal indices instead.
    vec3 color = uColors[0];
    if (idx == 1) color = uColors[1];
    else if (idx == 2) color = uColors[2];
    else if (idx == 3) color = uColors[3];
    else if (idx == 4) color = uColors[4];

    vec3 bg = vec3(0.02, 0.02, 0.03);
    vec3 finalColor = mix(bg, color, line);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createTruchetBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas bg-canvas-truchet';
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
