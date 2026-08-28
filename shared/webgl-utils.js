// shared/webgl-utils.js
// Shared WebGL helpers for the animated generative backgrounds registry.
// See shared/reveal-init.js for how these compose into the `backgrounds` map,
// and shared/bg-*.js for the individual shader modules.

export function hexToRgb01(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const int = parseInt(full, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
}

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

export function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}

// A fullscreen quad made of two triangles, in clip space (-1..1). Every
// background shader samples this same quad and computes its own pattern in
// the fragment shader from gl_FragCoord / uResolution -- no varyings needed.
export function createFullscreenQuad(gl, program) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLoc = gl.getAttribLocation(program, 'aPosition');

  return {
    bind() {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    },
    draw() {
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  };
}

// Resizes a canvas's backing store to match its CSS-rendered size, capped at
// 2x devicePixelRatio. Uses offsetWidth/offsetHeight rather than
// getBoundingClientRect() -- reveal.js applies transform:scale() to the
// whole deck to fit the window, and getBoundingClientRect() reports
// post-transform values, which would size the canvas's backing store to the
// wrong (scaled) resolution.
export function resizeCanvasToDisplaySize(canvas, gl) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(canvas.offsetWidth * dpr);
  const height = Math.round(canvas.offsetHeight * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width || 1;
    canvas.height = height || 1;
    if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    return true;
  }
  return false;
}

export const FULLSCREEN_VERTEX_SHADER = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// NOTE on the fragment shaders in bg-*.js: GLSL ES 1.00 (WebGL1) disallows
// dynamic (non-constant) indexing into arrays in fragment shaders --
// `uColors[someRuntimeInt]` is a compile error on a chunk of hardware.
// Every shader here instead resolves a runtime index into a color via an
// if/else chain of *literal* indices (uColors[0], uColors[1], ...). Keep
// that pattern for any new background module.
