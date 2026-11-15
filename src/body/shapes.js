import WORLD from '../data/world.json'
import DE from '../data/germany.json'

// The forms the body takes. Every form is the same number of points (N), as x y z in a unit
// space (about -1 … 1), so any form can flow into any other point by point. Flat forms (text, an
// outline) are drawn on a small canvas and sampled, then given a little depth so they still turn
// in 3D; solid forms are built directly.
export const N = 20000

const rand = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }

// a sphere of dust: points scattered at random over the surface — no pattern, no rows — the shell
// a little thick, and a fine haze of them inside
export function sphere() {
  const out = new Float32Array(N * 3), r = rand(3)
  for (let i = 0; i < N; i++) {
    const y = r() * 2 - 1, t = r() * Math.PI * 2, s = Math.sqrt(1 - y * y)
    const rad = r() < 0.12 ? Math.cbrt(r()) * 0.95 : 1 - Math.pow(r(), 3) * 0.07
    out.set([Math.cos(t) * s * rad, y * rad, Math.sin(t) * s * rad], i * 3)
  }
  return out
}

// whatever `draw` paints on a canvas, as points: filled pixels are picked at random (dense where
// the drawing is), centred and scaled to fit `size`, with `depth` of thickness
function sample(draw, { w = 600, h = 600, size = 1.7, depth = 0.08, seed = 7 } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const x = c.getContext('2d', { willReadFrequently: true })
  x.fillStyle = '#000'; x.strokeStyle = '#000'
  draw(x, w, h)
  // every painted pixel can be picked, the more opaque the more often — so a faint fill reads as
  // thin dust and a full stroke as a dense line
  const d = x.getImageData(0, 0, w, h).data, px = []
  for (let i = 0; i < w * h; i++) if (d[i * 4 + 3] > 8) px.push(i)
  const out = new Float32Array(N * 3), r = rand(seed), s = size / Math.max(w, h)
  if (!px.length) return out
  for (let i = 0; i < N; i++) {
    let p
    do p = px[Math.floor(r() * px.length)]; while (r() * 255 > d[p * 4 + 3])
    const X = p % w, Y = Math.floor(p / w)
    out.set([(X + r() - w / 2) * s, -(Y + r() - h / 2) * s, (r() - 0.5) * depth], i * 3)
  }
  return out
}

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif'

// a word or a number, set in the site's typeface
export const text = (str, { weight = 500 } = {}) => sample((x, w, h) => {
  let fs = h * 0.62
  x.font = `${weight} ${fs}px ${FONT}`
  const m = x.measureText(str).width
  if (m > w * 0.94) { fs *= (w * 0.94) / m; x.font = `${weight} ${fs}px ${FONT}` }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(str, w / 2, h / 2 + fs * 0.04)
}, { w: 900, h: 420, size: 3.3, depth: 0.14, seed: str.length * 31 + 5 })

const roundRect = (x, l, t, w, h, r) => { x.beginPath(); x.roundRect(l, t, w, h, r) }

// Dienstzeit: a phone — its outline and, faint inside, the app's screen (the hours, two tiles, a button)
export const phone = () => sample((x, w, h) => {
  const pw = w * 0.42, ph = h * 0.86, l = (w - pw) / 2, t = (h - ph) / 2
  x.lineWidth = 9; roundRect(x, l, t, pw, ph, pw * 0.16); x.stroke()
  roundRect(x, l + pw * 0.36, t + ph * 0.025, pw * 0.28, ph * 0.03, 20); x.fill() // the island
  x.font = `600 ${pw * 0.2}px ${FONT}`; x.textAlign = 'center'; x.fillText('00:00', w / 2, t + ph * 0.3)
  roundRect(x, l + pw * 0.1, t + ph * 0.4, pw * 0.37, ph * 0.13, 18); x.fill()
  roundRect(x, l + pw * 0.53, t + ph * 0.4, pw * 0.37, ph * 0.13, 18); x.fill()
  x.lineWidth = 4; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(l + pw * 0.1, t + ph * (0.62 + k * 0.06)); x.lineTo(l + pw * 0.9, t + ph * (0.62 + k * 0.06)); x.stroke() }
  roundRect(x, l + pw * 0.1, t + ph * 0.84, pw * 0.8, ph * 0.06, 30); x.fill()
}, { size: 1.9, depth: 0.12, seed: 11 })

// Creator's Journal: an open notebook seen from above — two pages, ruled, a day planned on the left
export const journal = () => sample((x, w, h) => {
  const bw = w * 0.88, bh = h * 0.6, l = (w - bw) / 2, t = (h - bh) / 2
  x.lineWidth = 7; roundRect(x, l, t, bw / 2 - 6, bh, 18); x.stroke(); roundRect(x, w / 2 + 6, t, bw / 2 - 6, bh, 18); x.stroke()
  x.lineWidth = 3
  for (let k = 1; k < 9; k++) { const y = t + (bh * k) / 9; x.beginPath(); x.moveTo(w / 2 + 30, y); x.lineTo(l + bw - 24, y); x.stroke() }
  for (let k = 0; k < 4; k++) { roundRect(x, l + 30, t + 30 + k * bh * 0.22, (bw / 2 - 70) * [0.9, 0.6, 0.75, 0.45][k], bh * 0.13, 10); x.fill() }
}, { size: 2.1, depth: 0.1, seed: 13 })

// this website: the page itself in small — the sphere, a line of text either side
export const site = () => sample((x, w, h) => {
  const bw = w * 0.9, bh = h * 0.58, l = (w - bw) / 2, t = (h - bh) / 2
  x.lineWidth = 6; roundRect(x, l, t, bw, bh, 22); x.stroke()
  x.beginPath(); x.arc(w / 2, h / 2, bh * 0.3, 0, Math.PI * 2); x.fill()
  x.fillRect(l + bw * 0.06, h / 2 - 6, bw * 0.16, 12); x.fillRect(l + bw * 0.78, h / 2 - 6, bw * 0.16, 12)
  for (let k = 0; k < 3; k++) x.fillRect(w / 2 - 70 + k * 50, t + 22, 36, 8)
}, { size: 2.2, depth: 0.1, seed: 17 })

// the stack: six thin plates one above the other, as the layers of an application are drawn
export function stack(layers = 6) {
  const out = new Float32Array(N * 3), r = rand(23), per = Math.ceil(N / layers)
  for (let i = 0; i < N; i++) {
    const k = Math.min(layers - 1, Math.floor(i / per))
    const u = r() * 2 - 1, v = r() * 2 - 1, edge = r() < 0.35
    // a square plate, its edge drawn a little denser
    const px = edge ? (r() < 0.5 ? Math.sign(u) : u) : u, pz = edge ? (r() < 0.5 ? v : Math.sign(v)) : v
    out.set([px * 0.78, 0.95 - k * (1.9 / (layers - 1)), pz * 0.78], i * 3)
  }
  return out
}

// which plate a point belongs to (for lighting one layer up), as the stack lays them out
export const stackLayerOf = (i, layers = 6) => Math.min(layers - 1, Math.floor(i / Math.ceil(N / layers)))

// ── the larger forms ──

// the opening: a torus knot — one line that winds twice round the ring and five times through it,
// woven into itself and never ending. Most points hug the line closely (a fine bright thread), the
// rest hang around it as a soft haze.
export function knot() {
  const out = new Float32Array(N * 3), r = rand(41), P = 2, Q = 5, R = 1, Rt = 0.42
  for (let i = 0; i < N; i++) {
    const t = r() * Math.PI * 2
    const c = [(R + Rt * Math.cos(Q * t)) * Math.cos(P * t), Rt * Math.sin(Q * t), (R + Rt * Math.cos(Q * t)) * Math.sin(P * t)]
    const haze = r() < 0.32, rad = haze ? 0.22 * Math.pow(r(), 0.6) : 0.035 * Math.sqrt(r())
    const a = r() * Math.PI * 2, b = Math.acos(2 * r() - 1)
    out.set([(c[0] + Math.cos(a) * Math.sin(b) * rad) / 1.45, (c[1] + Math.cos(b) * rad) / 1.45, (c[2] + Math.sin(a) * Math.sin(b) * rad) / 1.45], i * 3)
  }
  return out
}

// Dienstzeit: time — a clock face in depth: the ring, twelve marks, the two hands, the axis
export function clock() {
  const out = new Float32Array(N * 3), r = rand(43)
  for (let i = 0; i < N; i++) {
    const k = r()
    let p
    if (k < 0.5) { const a = r() * Math.PI * 2, rr = 0.92 + (r() - 0.5) * 0.08; p = [Math.cos(a) * rr, Math.sin(a) * rr, (r() - 0.5) * 0.16] } // the ring
    else if (k < 0.66) { const m = Math.floor(r() * 12), a = (m / 12) * Math.PI * 2, rr = 0.7 + r() * (m % 3 ? 0.1 : 0.16); p = [Math.cos(a) * rr + (r() - 0.5) * 0.02, Math.sin(a) * rr + (r() - 0.5) * 0.02, (r() - 0.5) * 0.04] } // the marks
    else if (k < 0.78) { const a = Math.PI / 2 - (10 / 12) * Math.PI * 2, l = r() * 0.45; p = [Math.cos(a) * l + (r() - 0.5) * 0.04, Math.sin(a) * l + (r() - 0.5) * 0.04, 0.05] } // the hour hand
    else if (k < 0.92) { const a = Math.PI / 2 - (2 / 12) * Math.PI * 2, l = r() * 0.68; p = [Math.cos(a) * l + (r() - 0.5) * 0.025, Math.sin(a) * l + (r() - 0.5) * 0.025, 0.08] } // the minute hand
    else { const a = r() * Math.PI * 2, rr = Math.sqrt(r()) * 0.88; p = [Math.cos(a) * rr, Math.sin(a) * rr, -0.08] } // a faint face behind
    out.set(p, i * 3)
  }
  return out
}

// Creator's Journal: growing every day — a DNA strand, two helices and the rungs between them
export function dna() {
  const out = new Float32Array(N * 3), r = rand(47), turns = 2.6, H = 1.9, R = 0.42
  for (let i = 0; i < N; i++) {
    const k = r()
    const y = (r() - 0.5) * H, a = (y / H) * turns * Math.PI * 2
    let p
    if (k < 0.72) { const s2 = r() < 0.5 ? 0 : Math.PI, j = 0.05; p = [Math.cos(a + s2) * R + (r() - 0.5) * j, y + (r() - 0.5) * j, Math.sin(a + s2) * R + (r() - 0.5) * j] }
    else { const yy = Math.round(y / (H / 26)) * (H / 26), aa = (yy / H) * turns * Math.PI * 2, t = r() * 2 - 1; p = [Math.cos(aa) * R * t, yy + (r() - 0.5) * 0.015, Math.sin(aa) * R * t] } // a rung
    out.set(p, i * 3)
  }
  return out
}

// this website: the web as a field — a sheet of points rising and falling in waves
export function wave() {
  const out = new Float32Array(N * 3), r = rand(53)
  for (let i = 0; i < N; i++) {
    const x = r() * 2 - 1, z = r() * 2 - 1
    const y = Math.sin(x * 4.2) * 0.12 + Math.cos(z * 3.4 + x * 1.5) * 0.1
    out.set([x * 1.15, y, z * 0.85], i * 3)
  }
  return out
}

// the projects: a spiral galaxy seen at an angle — a dense, bright bulge; a thin disk fading
// outwards; two main arms winding out as logarithmic spirals (and two fainter ones between them),
// each a gaussian band that widens with the distance; a scatter of stray stars in the halo
const gauss = (r) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r())
export function galaxy() {
  const out = new Float32Array(N * 3), r = rand(59), pitch = 0.32
  for (let i = 0; i < N; i++) {
    const k = r()
    let p
    if (k < 0.3) { // the bulge: dense and bright in the middle
      const s = 0.1 * Math.pow(r(), 0.5) + 0.02; p = [gauss(r) * s, gauss(r) * s * 0.6, gauss(r) * s]
    } else if (k < 0.45) { // the disk
      const d = Math.min(1.1, -Math.log(r() + 1e-9) * 0.28), a = r() * Math.PI * 2
      p = [Math.cos(a) * d, gauss(r) * 0.015, Math.sin(a) * d]
    } else if (k < 0.97) { // the arms: narrow, dense near their roots, thinning outwards
      const major = r() < 0.78, arm = major ? Math.floor(r() * 2) : Math.floor(r() * 2) + 0.5
      const d = 0.1 + Math.pow(r(), 1.25) * 1.0
      const a = arm * Math.PI + Math.log(d / 0.1) / Math.tan(pitch) * 0.38
      const w = (major ? 0.03 : 0.022) + d * 0.035
      const off = gauss(r) * w, along = gauss(r) * w * 0.6
      p = [Math.cos(a) * d - Math.sin(a) * off + Math.cos(a) * along, gauss(r) * 0.012, Math.sin(a) * d + Math.cos(a) * off + Math.sin(a) * along]
    } else { // a few stray stars around it
      const d = 0.2 + r() * 1.2, a = r() * Math.PI * 2
      p = [Math.cos(a) * d, gauss(r) * 0.2, Math.sin(a) * d]
    }
    out.set(p, i * 3)
  }
  return out
}

// Germany, as it really is: the border and coastline (with Rügen, Fehmarn, the North Frisian
// islands …) from src/data/germany.json — [longitude, latitude] rings, simplified to ~0.006° from
// the deutschlandGeoJSON project — drawn as a dense outline over a faint fill; home marked
export const HOME = [8.68, 50.11] // Frankfurt am Main
export const germany = () => sample((x, w, h) => {
  // longitude shrinks with latitude: cos 51° ≈ 0.63
  const S = h / 9.2, proj = ([lo, la]) => [(lo - 10.45) * 0.63 * S + w / 2, -(la - 51.15) * S + h / 2]
  const path = () => { x.beginPath(); for (const ring of DE) ring.forEach((p, i) => { const [X, Y] = proj(p); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }) }
  path(); x.fillStyle = 'rgba(0,0,0,0.03)'; x.fill('evenodd')
  x.lineWidth = 3; x.lineJoin = 'round'; x.strokeStyle = '#000'; x.stroke()
  // home: a point and a ring around it
  const [hx, hy] = proj(HOME)
  x.fillStyle = '#000'; x.beginPath(); x.arc(hx, hy, 7, 0, Math.PI * 2); x.fill()
  x.lineWidth = 2; x.beginPath(); x.arc(hx, hy, 22, 0, Math.PI * 2); x.stroke()
}, { w: 900, h: 900, size: 2.4, depth: 0.05, seed: 61 })

// working from anywhere: a globe — its meridians and parallels as fine dotted lines, a faint haze
// over the surface, and arcs of light rising from home to cities all over the world
const CITIES = [[-74, 40.7], [-122.4, 37.8], [139.7, 35.7], [151.2, -33.9], [18.4, -33.9], [-46.6, -23.5], [55.3, 25.2], [103.8, 1.35], [-0.1, 51.5], [77.2, 28.6]]
const onGlobe = (lo, la, rr = 1) => { const a = (lo * Math.PI) / 180, b = (la * Math.PI) / 180; return [Math.cos(b) * Math.cos(a) * rr, Math.sin(b) * rr, -Math.cos(b) * Math.sin(a) * rr] }
export function globe() {
  const out = new Float32Array(N * 3), r = rand(67)
  for (let i = 0; i < N; i++) {
    const k = r()
    let p
    if (k < 0.46) { // meridians and parallels, a few, drawn densely
      const j = 1 + (r() - 0.5) * 0.012
      if (r() < 0.5) { const lo = Math.floor(r() * 8) * 45, la = r() * 180 - 90; p = onGlobe(lo, la, j) }
      else { const la = (Math.floor(r() * 5) - 2) * 30, lo = r() * 360; p = onGlobe(lo, la, j) }
    } else if (k < 0.56) { const lo = r() * 360, la = (Math.asin(r() * 2 - 1) * 180) / Math.PI; p = onGlobe(lo, la) } // the haze
    else if (k < 0.6) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 4; p = onGlobe(HOME[0] + Math.cos(a) * d, HOME[1] + Math.sin(a) * d, 1.01) } // home
    else { // an arc home → a city, lifted off the surface in the middle
      const c = CITIES[Math.floor(r() * CITIES.length)], t = r()
      const A = onGlobe(...HOME), B = onGlobe(...c)
      const m = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t], len = Math.hypot(...m) || 1
      const lift = 1 + Math.sin(t * Math.PI) * 0.22
      p = [(m[0] / len) * lift, (m[1] / len) * lift, (m[2] / len) * lift]
    }
    out.set(p, i * 3)
  }
  return out
}

// the opening: a solar system — a sun of dense dust with a corona, the orbits as faint rings, six
// planets on them (one with a ring of its own), an asteroid belt. It moves: every point carries how
// fast it circles the sun (form.spin, radians per second), the inner planets faster than the
// outer ones, as Kepler has it.
export function solar() {
  const out = new Float32Array(N * 3), spin = new Float32Array(N), r = rand(71)
  const PL = [[0.26, 0.026, 0.4], [0.36, 0.034, 2.1], [0.48, 0.038, 4.0], [0.68, 0.07, 1.2], [0.86, 0.058, 3.3, true], [1.04, 0.044, 5.4]]
  const w = (d) => 0.045 / Math.pow(d, 1.5)
  for (let i = 0; i < N; i++) {
    const k = r()
    let p, s = 0
    if (k < 0.2) { const rad = 0.11 * Math.cbrt(r()), a = r() * Math.PI * 2, b = Math.acos(2 * r() - 1); p = [Math.sin(b) * Math.cos(a) * rad, Math.cos(b) * rad, Math.sin(b) * Math.sin(a) * rad]; s = 0.15 } // the sun
    else if (k < 0.26) { const rad = 0.11 + Math.pow(r(), 2) * 0.12, a = r() * Math.PI * 2, b = Math.acos(2 * r() - 1); p = [Math.sin(b) * Math.cos(a) * rad, Math.cos(b) * rad, Math.sin(b) * Math.sin(a) * rad]; s = 0.1 } // its corona
    else if (k < 0.5) { const o = PL[Math.floor(r() * PL.length)], a = r() * Math.PI * 2, d = o[0] + gauss(r) * 0.003; p = [Math.cos(a) * d, gauss(r) * 0.002, Math.sin(a) * d]; s = w(o[0]) * 0.3 } // the orbits
    else if (k < 0.57) { const d = 0.55 + r() * 0.06, a = r() * Math.PI * 2; p = [Math.cos(a) * d, gauss(r) * 0.008, Math.sin(a) * d]; s = w(d) } // the belt
    else { // a planet: a small sphere on its orbit, and the ringed one's ring
      const o = PL[Math.floor(r() * PL.length)], c = [Math.cos(o[2]) * o[0], 0, Math.sin(o[2]) * o[0]]
      if (o[3] && r() < 0.4) { const a = r() * Math.PI * 2, d = o[1] * (1.5 + r() * 0.8); p = [c[0] + Math.cos(a) * d, Math.sin(a) * d * 0.35, c[2] + Math.sin(a) * d * 0.9] }
      else { const rad = o[1] * Math.cbrt(r()), a = r() * Math.PI * 2, b = Math.acos(2 * r() - 1); p = [c[0] + Math.sin(b) * Math.cos(a) * rad, Math.cos(b) * rad, c[2] + Math.sin(b) * Math.sin(a) * rad] }
      s = w(o[0])
    }
    out.set(p, i * 3); spin[i] = s
  }
  out.spin = spin
  return out
}

// the opening: a few planets floating in space, each with its moons — no sun, no orbits drawn. A
// planet is a shell of dust with faint bands of latitude, turning slowly on itself; its moons
// circle it, each at its own distance and speed (form.spin round form.center). One wears a ring.
export function planets() {
  const out = new Float32Array(N * 3), spin = new Float32Array(N), center = new Float32Array(N * 3), r = rand(73)
  // [x, y, z, radius, turn, moons: [distance, size, speed, phase], ring]
  const PL = [
    [-0.18, 0.02, 0, 0.36, 0.05, [[0.58, 0.05, 0.32, 0.4], [0.78, 0.032, -0.2, 2.6]], false],
    [0.92, 0.42, -0.25, 0.17, 0.08, [[0.32, 0.03, 0.5, 1.1]], true],
    [-0.98, -0.5, 0.3, 0.1, 0.1, [[0.2, 0.02, 0.7, 4.2]], false],
  ]
  const weight = PL.map((p) => p[3] * p[3] + 0.02), total = weight.reduce((a, b) => a + b)
  const ball = (c, rad, shell) => { const a = r() * Math.PI * 2, u = r() * 2 - 1, s = Math.sqrt(1 - u * u), d = shell ? rad * (1 - Math.pow(r(), 4) * 0.08) : rad * Math.cbrt(r()); return [c[0] + Math.cos(a) * s * d, c[1] + u * d, c[2] + Math.sin(a) * s * d] }
  for (let i = 0; i < N; i++) {
    let pick = r() * total, j = 0
    while (pick > weight[j] && j < PL.length - 1) pick -= weight[j++]
    const [x, y, z, R, turn, moons, ring] = PL[j], c = [x, y, z], k = r()
    let p, s, cc = c
    if (k < 0.78 - (ring ? 0.2 : 0)) {
      // the planet: a shell, denser in bands of latitude
      do p = ball(c, R, true); while (r() > 0.55 + 0.45 * Math.abs(Math.sin((p[1] - y) / R * 7)))
      s = turn
    } else if (ring && k < 0.78) {
      const a = r() * Math.PI * 2, d = R * (1.45 + r() * 0.7), t = 0.42
      p = [x + Math.cos(a) * d, y + Math.sin(a) * d * Math.sin(t) * 0.5, z + Math.sin(a) * d * Math.cos(t)]; s = turn * 1.5
    } else {
      // a moon: a small ball on its circle round the planet
      const m = moons[Math.floor(r() * moons.length)], mc = [x + Math.cos(m[3]) * m[0], y + (r() - 0.5) * 0.004, z + Math.sin(m[3]) * m[0]]
      p = ball(mc, m[1], false); s = m[2]
    }
    out.set(p, i * 3); spin[i] = s; center.set(cc, i * 3)
  }
  out.spin = spin; out.center = center
  return out
}

// the opening: a black hole. A dark, empty middle; around it the accretion disk, a thin annulus of
// dust, densest at its inner edge, turning fast inside and slowly outside (form.spin, Kepler); the
// light of the disk's far side bent up over the hole and down under it into a ring that faces the
// viewer (built tilted back by the same angle the page tilts the form forward, BH_TILT, so it
// stands upright on screen); a thin, bright photon ring at the edge of the shadow; a faint haze.
export const BH_TILT = 0.2
export function blackhole() {
  const out = new Float32Array(N * 3), spin = new Float32Array(N), r = rand(79)
  const c = Math.cos(-BH_TILT), sn = Math.sin(-BH_TILT)
  const upright = (x, y) => [x, y * c, y * sn] // a point in the screen plane, tilted back
  for (let i = 0; i < N; i++) {
    const k = r()
    let p, s = 0
    if (k < 0.6) { // the disk
      const d = 0.34 + Math.min(0.8, -Math.log(r() + 1e-9) * 0.15), a = r() * Math.PI * 2
      p = [Math.cos(a) * d, gauss(r) * 0.006 * (0.5 + d), Math.sin(a) * d]; s = 0.11 / Math.pow(d, 1.5)
    } else if (k < 0.86) { // the lensed far side: a ring round the shadow, brightest above and below
      let a
      do a = r() * Math.PI * 2; while (r() > 0.25 + 0.75 * Math.abs(Math.sin(a)))
      const d = 0.355 + Math.abs(gauss(r)) * 0.04
      p = upright(Math.cos(a) * d, Math.sin(a) * d * 0.92)
    } else if (k < 0.96) { // the photon ring
      const a = r() * Math.PI * 2, d = 0.3 + gauss(r) * 0.004
      p = upright(Math.cos(a) * d, Math.sin(a) * d)
    } else { // haze
      const d = 0.5 + r() * 0.9, a = r() * Math.PI * 2
      p = [Math.cos(a) * d, gauss(r) * 0.08, Math.sin(a) * d]; s = 0.11 / Math.pow(d, 1.5)
    }
    out.set(p, i * 3); spin[i] = s
  }
  out.spin = spin
  return out
}

// the opening: a supernova — a bright, dense core; around it the blown-off shell, not smooth but
// torn into filaments and knots (its density follows a few interfering waves over the sphere, so
// bright veins run across it); fine rays shooting out of the core; a faint haze inside and out.
// The page lets it breathe (data-breath): slow waves run outwards through it.
const veins = (x, y, z) => {
  const v = Math.sin(x * 7 + y * 3) * Math.sin(y * 6 - z * 4) + Math.sin(z * 8 + x * 2) * 0.6 + Math.sin((x + y + z) * 11) * 0.3
  return Math.pow(Math.min(1, Math.abs(v) / 1.6), 3) // 0 … 1, high only along the veins
}
export function supernova() {
  const out = new Float32Array(N * 3), r = rand(83)
  const dirn = () => { const a = r() * Math.PI * 2, u = r() * 2 - 1, s = Math.sqrt(1 - u * u); return [Math.cos(a) * s, u, Math.sin(a) * s] }
  for (let i = 0; i < N; i++) {
    const k = r()
    let p
    if (k < 0.12) { const s = 0.03 + r() * 0.015; p = [gauss(r) * s, gauss(r) * s, gauss(r) * s] } // the core
    else if (k < 0.7) { // the shell, filaments and knots
      let d
      do d = dirn(); while (r() > veins(...d))
      const rad = 0.72 + gauss(r) * 0.018 + veins(d[1], d[2], d[0]) * 0.1
      p = d.map((c) => c * rad)
    } else if (k < 0.86) { // rays out of the core
      const ray = Math.floor(r() * 26), rr = rand(ray * 97 + 1), d = [rr() * 2 - 1, rr() * 2 - 1, rr() * 2 - 1], l = Math.hypot(...d) || 1
      const t = 0.08 + Math.pow(r(), 0.7) * 0.75
      p = d.map((c) => (c / l) * t + gauss(r) * 0.004)
    } else if (k < 0.93) { const d = dirn(), t = 0.1 + Math.pow(r(), 0.5) * 0.55; p = d.map((c) => c * t) } // haze inside
    else { const d = dirn(), t = 0.85 + Math.pow(r(), 2) * 0.5; p = d.map((c) => c * t) } // haze outside
    out.set(p, i * 3)
  }
  return out
}

// the opening: a planet being rendered. On one side (built on the left, mirrored to the right in the end) it is still the model — a geodesic polyhedron
// (an icosahedron divided twice), its straight edges and its vertices; towards the right the
// wireframe gives way, through a ragged seam, to the real thing: a dense surface of dust with
// structure on it, lit from the upper right and fading into its night side.
function geodesic(levels = 2) {
  const t = (1 + Math.sqrt(5)) / 2
  let v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]]
    .map((p) => { const l = Math.hypot(...p); return p.map((c) => c / l) })
  let f = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]]
  for (let l = 0; l < levels; l++) {
    const mid = new Map(), m = (a, b) => {
      const k = a < b ? `${a}_${b}` : `${b}_${a}`
      if (!mid.has(k)) { const p = v[a].map((c, i) => (c + v[b][i]) / 2), n = Math.hypot(...p); v.push(p.map((c) => c / n)); mid.set(k, v.length - 1) }
      return mid.get(k)
    }
    f = f.flatMap(([a, b, c]) => { const ab = m(a, b), bc = m(b, c), ca = m(c, a); return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]] })
  }
  const edges = new Map()
  f.forEach(([a, b, c]) => [[a, b], [b, c], [c, a]].forEach(([x, y]) => edges.set(x < y ? `${x}_${y}` : `${y}_${x}`, [x, y])))
  return { v, e: [...edges.values()] }
}
export function render() {
  const out = new Float32Array(N * 3), r = rand(89), { v, e } = geodesic(1)
  const seam = (p) => p[0] + Math.sin(p[1] * 9) * 0.08 + Math.sin(p[2] * 7 + p[1] * 3) * 0.06 // the ragged line between model and real
  const lit = [0.55, 0.5, 0.67] // the light, from the upper right, a little in front
  for (let i = 0; i < N; i++) {
    let p
    if (r() < 0.36) { // the model: edges and vertices, left of the seam
      do {
        if (r() < 0.14) { const q = v[Math.floor(r() * v.length)]; p = q.map((c) => c * 1.002 + gauss(r) * 0.01) }
        else { const [a, b] = e[Math.floor(r() * e.length)], t = r(); p = v[a].map((c, k) => c + (v[b][k] - c) * t) }
      } while (r() > 1 - smooth(-0.12, 0.12, seam(p)))
    } else { // the real planet: dense dust on the surface, right of the seam, lit and textured
      do {
        const a = r() * Math.PI * 2, u = r() * 2 - 1, sq = Math.sqrt(1 - u * u)
        const tex = 0.7 + 0.3 * veins(u * 0.9, Math.cos(a) * sq * 1.1, Math.sin(a) * sq)
        p = [Math.cos(a) * sq * (0.995 + tex * 0.01), u, Math.sin(a) * sq]
        const light = Math.max(0.06, p[0] * lit[0] + p[1] * lit[1] + p[2] * lit[2])
        if (r() < smooth(-0.12, 0.12, seam(p)) * tex * Math.min(1, light * 1.8)) break
      } while (true)
    }
    out.set([-p[0], p[1], p[2]], i * 3) // mirrored: the model on the right (beside the trade), the real planet on the left
  }
  return out
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

// before the page: space itself, filling the screen — a field of stars of every brightness, a sun
// with its corona in a corner, a few planets with their moons, a distant spiral galaxy, a faint
// nebula. Coordinates span the whole screen around the opening's form (about ±2.8 by ±1.7).
export function cosmos() {
  const out = new Float32Array(N * 3), r = rand(97)
  const ball = (c, rad) => { const a = r() * Math.PI * 2, u = r() * 2 - 1, s = Math.sqrt(1 - u * u), d = rad * Math.cbrt(r()); return [c[0] + Math.cos(a) * s * d, c[1] + u * d, c[2] + Math.sin(a) * s * d] }
  const PL = [[-1.15, -0.95, 0.2, 0.16, 2], [1.55, 0.95, -0.3, 0.11, 1], [2.2, -0.35, 0.4, 0.07, 1], [-2.3, 0.35, -0.2, 0.09, 0]]
  for (let i = 0; i < N; i++) {
    const k = r()
    let p
    if (k < 0.46) p = [(r() * 2 - 1) * 2.9, (r() * 2 - 1) * 1.75, (r() * 2 - 1) * 1.4] // stars
    else if (k < 0.55) p = r() < 0.75 ? ball([-2.05, 1.15, -0.6], 0.085) : ball([-2.05, 1.15, -0.6], 0.24) // the sun and its corona
    else if (k < 0.74) { // planets and their moons
      const pl = PL[Math.floor(r() * PL.length)]
      if (pl[4] && r() < 0.18) { const m = Math.floor(r() * pl[4]), a = 0.9 + m * 2.3; p = ball([pl[0] + Math.cos(a) * pl[3] * 2.4, pl[1] + Math.sin(a) * pl[3] * 1.2, pl[2]], pl[3] * 0.22) }
      else { const a = r() * Math.PI * 2, u = r() * 2 - 1, s = Math.sqrt(1 - u * u); p = [pl[0] + Math.cos(a) * s * pl[3], pl[1] + u * pl[3], pl[2] + Math.sin(a) * s * pl[3]] }
    } else if (k < 0.88) { // a distant galaxy, tilted
      const d = Math.pow(r(), 1.2) * 0.5, arm = Math.floor(r() * 2), a = arm * Math.PI + d * 9 + gauss(r) * 0.25
      const x = Math.cos(a) * d, z = Math.sin(a) * d
      p = [1.75 + x, -1.05 + z * 0.35 + gauss(r) * 0.01, -0.8 + z * 0.9]
    } else p = [0.7 + gauss(r) * 0.45, 0.95 + gauss(r) * 0.22, -1.1 + gauss(r) * 0.3] // a nebula
    out.set(p, i * 3)
  }
  return out
}

// "I design and build apps": a cube of building blocks — 3 × 3 × 3 small cubes, their edges drawn
// densely and their faces as a faint haze, held a little apart like an exploded drawing.
export function blocks() {
  const out = new Float32Array(N * 3), r = rand(101), n = 3, size = 0.3, step = 0.56, half = ((n - 1) * step) / 2
  const cells = []
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) cells.push([x * step - half, y * step - half, z * step - half])
  const h = size / 2
  for (let i = 0; i < N; i++) {
    const c = cells[Math.floor(r() * cells.length)]
    let p
    if (r() < 0.93) { // an edge: two coordinates at ±h, the third anywhere along it
      const axis = Math.floor(r() * 3), q = [r() < 0.5 ? -h : h, r() < 0.5 ? -h : h, r() < 0.5 ? -h : h]
      q[axis] = (r() * 2 - 1) * h; p = q.map((v) => v + gauss(r) * 0.002)
    } else { // a face
      const axis = Math.floor(r() * 3), q = [(r() * 2 - 1) * h, (r() * 2 - 1) * h, (r() * 2 - 1) * h]
      q[axis] = r() < 0.5 ? -h : h; p = q
    }
    out.set([c[0] + p[0], c[1] + p[1], c[2] + p[2]], i * 3)
  }
  return out
}

// "I design and build apps": a tesseract — the four-dimensional cube, its 32 edges drawn densely
// and its 16 corners a little brighter. The points carry a fourth coordinate (form.w); the page
// turns it in four dimensions and projects it (Body, uHyper), so the inner cube keeps turning
// itself inside out through the outer one.
export function tesseract() {
  const out = new Float32Array(N * 3), w = new Float32Array(N), r = rand(103)
  const V = []
  for (let i = 0; i < 16; i++) V.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1])
  const E = []
  for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) { const d = a ^ b; if ((d & (d - 1)) === 0) E.push([a, b]) }
  for (let i = 0; i < N; i++) {
    let q
    if (r() < 0.1) { const v = V[Math.floor(r() * 16)]; q = v.map((c) => c + gauss(r) * 0.025) }
    else { const [a, b] = E[Math.floor(r() * E.length)], t = r(); q = V[a].map((c, k) => c + (V[b][k] - c) * t + gauss(r) * 0.004) }
    out.set([q[0], q[1], q[2]], i * 3); w[i] = q[3]
  }
  out.w = w
  return out
}

// "Working from anywhere": a small globe — the countries of the world (Natural Earth, public
// domain, src/data/world.json) as their borders and coasts in dense dust, the land as a faint haze
// over it, the oceans almost empty; Frankfurt marked.
export function earth() {
  const W = 1440, H = 720, c = document.createElement('canvas'); c.width = W; c.height = H
  const x = c.getContext('2d', { willReadFrequently: true })
  const P = ([lo, la]) => [((lo + 180) / 360) * W, ((90 - la) / 180) * H]
  x.beginPath(); for (const ring of WORLD) ring.forEach((p, i) => { const [X, Y] = P(p); i ? x.lineTo(X, Y) : x.moveTo(X, Y) })
  x.fillStyle = 'rgba(0,0,0,0.07)'; x.fill('evenodd')
  x.lineWidth = 2; x.lineJoin = 'round'; x.strokeStyle = '#000'; x.stroke()
  const d = x.getImageData(0, 0, W, H).data, px = []
  for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 8) px.push(i)
  const out = new Float32Array(N * 3), r = rand(107)
  for (let i = 0; i < N; i++) {
    let lo, la, rr = 1
    const k = r()
    if (k < 0.06) { lo = r() * 360 - 180; la = (Math.asin(r() * 2 - 1) * 180) / Math.PI } // a faint sea
    else if (k < 0.1) { const a = r() * Math.PI * 2, dd = Math.sqrt(r()) * 2.2; lo = HOME[0] + Math.cos(a) * dd; la = HOME[1] + Math.sin(a) * dd; rr = 1.01 } // home
    else {
      let p
      do p = px[Math.floor(r() * px.length)]; while (r() * 255 > d[p * 4 + 3])
      lo = ((p % W) + r()) / W * 360 - 180; la = 90 - (Math.floor(p / W) + r()) / H * 180
    }
    out.set(onGlobe(lo, la, rr), i * 3)
  }
  return out
}

// the forms by name: any of the above, or 'text:…' for any word
const MAKERS = { sphere, phone, journal, site, stack, knot, clock, dna, wave, galaxy, germany, globe, solar, planets, blackhole, supernova, render, cosmos, blocks, tesseract, earth }
const cache = new Map()
export function shape(name) {
  if (cache.has(name)) return cache.get(name)
  const f = name.startsWith('text:') ? text(name.slice(5)) : (MAKERS[name] ?? sphere)()
  cache.set(name, f)
  return f
}
