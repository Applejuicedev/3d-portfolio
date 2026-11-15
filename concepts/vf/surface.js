// The surface: a rough, monochrome material — graphite, ash, concrete — that a light glides over.
// Reusable: mountSurface(element) lays it into any element (the desk uses the whole page).
//
// Two passes. The first, at half resolution, draws the large form: a height field of slow, liquid
// folds (layered noise, warped by itself), displaced around the pointer and agitated by its speed.
// The second, at full resolution, lights it: a point light hangs a little above the surface where the
// pointer is (following it with some weight), rakes across the folds, catches on a fine roughness the
// first pass is too coarse to hold, and leaves a faint volume of light in the air around it. Over all
// of it lies grain, coarse and fine, stronger where the light falls — it belongs to the material.
// Without a pointer the light drifts on its own, slowly. Low frame rates step the resolution down, then
// stop the motion; reduced motion draws one still frame; without WebGL the element keeps its CSS ground.
const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0., 1.); }`
const COMMON = `
precision highp float;
uniform vec2 uRes, uLight;
uniform float uTime, uEnergy, uDark;
float hash(vec2 p) { vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= .5; }
  return v;
}
vec2 toWorld(vec2 px, vec2 res) { return (px - .5 * res) / res.y * 2.2; }
`
// pass 1: the form. rgb: the normal (packed), a: the height
const FORM = COMMON + `
uniform vec2 uMouse;
float form(vec2 p, float t) {
  vec2 q = vec2(fbm(p * .55 + vec2(0., t * .018)), fbm(p * .55 + vec2(4.7, 1.9 - t * .014)));
  vec2 r = vec2(fbm(p * .9 + 1.7 * q + vec2(1.3, 8.1) + t * .01), fbm(p * .9 + 1.7 * q + vec2(7.9, 2.6)));
  float f = fbm(p * 1.1 + 2.1 * r);
  float ridge = 1. - abs(2. * fbm(p * 1.6 + 1.2 * r) - 1.); // sharp folds, like poured metal set hard
  return f * .75 + ridge * ridge * .25;
}
void main() {
  vec2 p = toWorld(gl_FragCoord.xy, uRes), m = toWorld(uMouse, uRes);
  float t = uTime;
  // the pointer displaces the material: it yields around it, and speed makes it ring
  vec2 d = p - m; float r = length(d); vec2 dir = d / (r + 1e-4);
  p -= dir * exp(-r * r * 3.) * (.025 + .07 * uEnergy);
  p += dir * sin(r * 18. - t * 3.) * exp(-r * 3.5) * .008 * uEnergy;
  float e = 2.2 / uRes.y;
  float h = form(p, t), hx = form(p + vec2(e, 0.), t) - h, hy = form(p + vec2(0., e), t) - h;
  vec3 n = normalize(vec3(-hx / e * .06, -hy / e * .06, 1.));
  gl_FragColor = vec4(n * .5 + .5, h);
}`
// pass 2: the light, the fine roughness, the grain
const LIGHT = COMMON + `
uniform sampler2D uForm;
uniform float uScale;
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec4 f = texture2D(uForm, uv);
  vec3 n = normalize(f.rgb * 2. - 1.); float h = f.a;
  // fine roughness at full resolution: the grit the light catches on
  vec2 g = gl_FragCoord.xy / uScale; // in CSS pixels, so the roughness is the same on every screen
  // (two octaves, turned against the pixel grid so no lattice shows)
  vec2 ga = mat2(.8, -.6, .6, .8) * g * .62, gb = mat2(.28, .96, -.96, .28) * g * 1.3;
  float r0 = noise(ga) + .5 * noise(gb);
  float rx = noise(ga + vec2(.5, 0.)) + .5 * noise(gb + vec2(.5, 0.)), ry = noise(ga + vec2(0., .5)) + .5 * noise(gb + vec2(0., .5));
  n = normalize(n + vec3(r0 - rx, r0 - ry, 0.) * .32);
  vec2 p = toWorld(gl_FragCoord.xy, uRes), l = toWorld(uLight, uRes);
  vec3 P = vec3(p, h * .25), Lp = vec3(l, .3 + .08 * uEnergy); // low: it rakes across the surface
  vec3 L = Lp - P; float dist = length(L); L /= dist;
  float fall = 1. / (1. + dist * dist * 1.6);
  float diff = max(dot(n, L), 0.);
  float level = max(L.z, 0.);                   // what a perfectly flat surface would get
  float rake = max(diff - level * .86, 0.) * 1.6;       // the light only on what stands up to it
  float spec = pow(max(dot(n, normalize(L + vec3(0., 0., 1.))), 0.), 70.);
  float key = max(dot(n, normalize(vec3(-.5, .6, .7))), 0.); // a faint, constant light from the upper left
  float I = 1. + .25 * uEnergy;
  // material: deep black in the hollows to steel on the folds (by day: concrete to silver)
  vec3 lo = mix(vec3(.56, .575, .59), vec3(.028, .03, .034), uDark);
  vec3 hi = mix(vec3(.80, .815, .83), vec3(.15, .158, .168), uDark);
  vec3 col = mix(lo, hi, smoothstep(.2, .85, h));
  col *= mix(.78, .55, uDark) + key * mix(.3, .5, uDark);
  vec3 light = vec3(.93, .95, .97);
  // (held back, so text over the lit part still reads)
  col += light * (rake * fall * mix(.6, .78, uDark) + diff * fall * mix(.03, .035, uDark) + spec * fall * mix(.03, .05, uDark)) * I;
  col *= mix(1., .82, (1. - fall) * uDark);       // away from the light the material sinks back
  col += light * exp(-length(p - l) * 1.6) * mix(.008, .012, uDark) * I; // the light, hanging in the air
  col = mix(col, col * vec3(.97, .99, 1.02), .6);                     // a cold cast, barely
  // grain: a coarse one that sits in the material and a fine one that lives; both show more in light
  float lit = clamp(rake * fall * 3., 0., 1.);
  float coarse = noise(g * .38 + h * 30.) - .5, fine = hash(gl_FragCoord.xy + fract(uTime * 9.1) * 113.) - .5; // the fine grain: device pixels
  col += (coarse * mix(.045, .04, uDark) + fine * mix(.05, .045, uDark)) * (.6 + .6 * lit);
  // the edges fall away into the dark
  col *= 1. - .35 * pow(length(uv - .5) * 1.25, 2.4) * uDark;
  gl_FragColor = vec4(col, 1.);
}`

// Options for small, battery-powered screens: fps caps the frame rate, maxPR the pixel density of the
// light pass, and rest() — asked every frame — pauses the surface while something covers it.
export function mountSurface(host, { fixed = host === document.body, fps = 0, maxPR = 2, rest = () => false } = {}) {
  const cv = document.createElement('canvas')
  cv.className = 'surface'; cv.setAttribute('aria-hidden', 'true')
  if (fixed) cv.classList.add('fixed')
  host.prepend(cv)
  const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false })
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!gl) { cv.remove(); host.classList.add('no-surface'); return null }

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s }
  const program = (frag, names) => {
    const pr = gl.createProgram()
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, frag)); gl.linkProgram(pr)
    return { pr, u: Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(pr, n)])) }
  }
  const A = program(FORM, ['uRes', 'uLight', 'uMouse', 'uTime', 'uEnergy', 'uDark'])
  const B = program(LIGHT, ['uRes', 'uLight', 'uTime', 'uEnergy', 'uDark', 'uForm', 'uScale'])
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  ;[A, B].forEach(({ pr }) => { const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0) })
  // the half-resolution form lives in a texture
  const tex = gl.createTexture(), fb = gl.createFramebuffer()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  ;[[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]].forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v))
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)

  // full resolution for the light and the grain (device pixels, up to 2×); the form at half the CSS size
  let PR = Math.min(devicePixelRatio || 1, maxPR), FORM_SCALE = 0.5
  let W = 1, H = 1, fw = 1, fh = 1, box = host.getBoundingClientRect()
  function size() {
    box = fixed ? { left: 0, top: 0, width: innerWidth, height: innerHeight } : host.getBoundingClientRect()
    W = Math.max(1, Math.round(box.width * PR)); H = Math.max(1, Math.round(box.height * PR))
    fw = Math.max(1, Math.round(box.width * FORM_SCALE)); fh = Math.max(1, Math.round(box.height * FORM_SCALE))
    cv.width = W; cv.height = H
    gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fw, fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    if (still || frozen) draw(performance.now())
  }

  // the pointer (target), the light (eased after it) and the energy of the movement
  let tx = box.width * 0.62, ty = box.height * 0.38, lx = tx, ly = ty, mx = tx, my = ty, energy = 0, px = tx, py = ty, idle = 1e9
  const at = (e) => { const b = fixed ? box : host.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top; idle = 0 }
  addEventListener('pointermove', at, { passive: true }); addEventListener('pointerdown', at, { passive: true })
  const dark = () => (document.documentElement.dataset.theme === 'dark' ? 1 : 0)
  let darkNow = dark(), frozen = false
  new MutationObserver(() => { if (still || frozen) { darkNow = dark(); draw(performance.now()) } }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const t0 = performance.now()
  function draw(now) {
    const t = still ? 20 : (now - t0) / 1000
    // left alone for a few seconds, the light wanders by itself
    const wander = !still && (idle += 1) > 240
    if (wander) { tx = box.width * (0.5 + 0.28 * Math.sin(t * 0.11)); ty = box.height * (0.45 + 0.22 * Math.sin(t * 0.083 + 1.3)) }
    // infected (virus.js): the light jumps, the material rings
    const sick = document.documentElement.classList.contains('infected')
    if (sick && Math.random() < 0.3) { tx = Math.random() * box.width; ty = Math.random() * box.height; lx = tx; ly = ty; energy = 1 }
    lx += (tx - lx) * 0.045; ly += (ty - ly) * 0.045 // the light: heavy, it trails
    mx += (tx - mx) * 0.09; my += (ty - my) * 0.09   // the displacement: a little quicker
    const speed = Math.hypot(mx - px, my - py); px = mx; py = my
    energy = still ? 0 : Math.min(1, energy * 0.95 + (wander ? 0 : speed * 0.0035))
    darkNow += (dark() - darkNow) * (still || frozen ? 1 : 0.06)
    // pass 1 → texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.viewport(0, 0, fw, fh); gl.useProgram(A.pr)
    gl.uniform2f(A.u.uRes, fw, fh); gl.uniform2f(A.u.uMouse, mx * FORM_SCALE, fh - my * FORM_SCALE)
    gl.uniform2f(A.u.uLight, 0, 0); gl.uniform1f(A.u.uTime, t); gl.uniform1f(A.u.uEnergy, energy); gl.uniform1f(A.u.uDark, darkNow)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    // pass 2 → screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H); gl.useProgram(B.pr)
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(B.u.uForm, 0)
    gl.uniform2f(B.u.uRes, W, H); gl.uniform2f(B.u.uLight, lx * PR, H - ly * PR)
    gl.uniform1f(B.u.uTime, t); gl.uniform1f(B.u.uEnergy, energy); gl.uniform1f(B.u.uDark, darkNow); gl.uniform1f(B.u.uScale, PR)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  // slow frames: first fewer device pixels, then a coarser form, then a still picture
  let frames = 0, since = 0, last = 0
  function check(now) {
    if (last) { since += now - last; frames++ }
    last = now
    if (frames < 45) return
    const ms = since / frames; frames = 0; since = 0
    if (ms < 26) return
    if (PR > 1) { PR = 1; size() } else if (FORM_SCALE > 0.34) { FORM_SCALE = 0.33; size() } else frozen = true
  }
  if (fixed) addEventListener('resize', size); else new ResizeObserver(size).observe(host)
  size()
  let drawn = 0
  if (still) draw(performance.now())
  else (function loop(now) {
    const due = !fps || now - drawn >= 1000 / fps - 2
    if (!document.hidden && !frozen && !rest()) { if (due) { drawn = now; draw(now) } check(now) } else last = 0
    if (!frozen) requestAnimationFrame(loop)
  })(performance.now())
  return cv
}
