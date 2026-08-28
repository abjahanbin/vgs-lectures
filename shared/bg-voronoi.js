// shared/bg-voronoi.js
// Animated Worley/Voronoi cell noise, colored per-cell from the active
// palette. Motion comes from each cell's feature point continuously
// orbiting via uTime (see the sin() term below) -- there is no settling
// simulation state, so it never freezes once someone's actually looking.

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

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= 6.0;

    vec2 cell = floor(uv);
    vec2 f = fract(uv);

    float minDist = 8.0;
    vec2 minCell = vec2(0.0);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash2(cell + neighbor);
        // Continuous orbit -- each cell's feature point drifts in a circle
        // over time rather than settling, so the field is always in motion.
        point = 0.5 + 0.5 * sin(uTime * 0.3 + 6.2831 * point);
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        if (dist < minDist) {
          minDist = dist;
          minCell = cell + neighbor;
        }
      }
    }

    float h = fract(sin(dot(minCell, vec2(41.3, 289.1))) * 43758.5453);
    int idx = int(floor(h * 5.0));

    // Dynamic array indexing is disallowed in GLSL ES 1.00 fragment
    // shaders -- resolve via an if/else chain of literal indices instead.
    vec3 color = uColors[0];
    if (idx == 1) color = uColors[1];
    else if (idx == 2) color = uColors[2];
    else if (idx == 3) color = uColors[3];
    else if (idx == 4) color = uColors[4];

    float edge = smoothstep(0.0, 0.06, minDist);
    vec3 finalColor = mix(color * 0.25, color, edge);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createVoronoiBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas bg-canvas-voronoi';
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

    // Wrap elapsed time so a shader running for a full multi-hour lecture
    // doesn't feed sin()/cos() ever-growing arguments (precision loss).
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
