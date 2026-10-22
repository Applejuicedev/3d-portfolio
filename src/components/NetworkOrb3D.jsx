import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 62 // sphere
const MAX_EDGES = 110

// Load-in: the nodes shoot out of the core one after another (with a small overshoot), and each
// edge appears as soon as both of its nodes have arrived
const INTRO_DELAY = 0.35   // s, so it starts together with the hero text
const NODE_SPREAD = 1.1    // s over which the nodes start
const NODE_FLIGHT = 0.75   // s each node needs to reach its place
const nodeStart = (i, n) => INTRO_DELAY + (i / n) * NODE_SPREAD
const nodeArrive = (i, n) => nodeStart(i, n) + NODE_FLIGHT
const EDGE_GROW = 0.5 // s each edge needs to grow from one node to the other
// the last edge starts when the last node arrives and then still needs to grow
const introEnd = (n) => nodeArrive(n - 1, n) + EDGE_GROW

// ── Shapes ──────────────────────────────────────────────────────
// 'sphere' is a random network on a shell. The recognisable shapes are wireframes: each is a list
// of strokes (polylines); points are placed along them every STEP units and only neighbours along
// a stroke are linked, so the form reads clearly and builds itself stroke by stroke.
const STEP = 0.2
const V = (x, y, z) => new THREE.Vector3(x, y, z)
const box = (x0, y0, z0, x1, y1, z1) => {
  const c = (x, y, z) => V(x ? x1 : x0, y ? y1 : y0, z ? z1 : z0)
  return [
    [c(0, 0, 1), c(1, 0, 1), c(1, 1, 1), c(0, 1, 1), c(0, 0, 1)],
    [c(0, 0, 0), c(1, 0, 0), c(1, 1, 0), c(0, 1, 0), c(0, 0, 0)],
    [c(0, 0, 0), c(0, 0, 1)], [c(1, 0, 0), c(1, 0, 1)], [c(1, 1, 0), c(1, 1, 1)], [c(0, 1, 0), c(0, 1, 1)],
  ]
}
// rounded rectangle in the xy plane (corners as short arcs)
const roundRect = (cx, cy, w, h, r, z, n = 3) => {
  const pts = []
  const corner = (x, y, a0) => { for (let i = 0; i <= n; i++) { const a = a0 + (i / n) * (Math.PI / 2); pts.push(V(x + Math.cos(a) * r, y + Math.sin(a) * r, z)) } }
  corner(cx + w / 2 - r, cy + h / 2 - r, 0)
  corner(cx - w / 2 + r, cy + h / 2 - r, Math.PI / 2)
  corner(cx - w / 2 + r, cy - h / 2 + r, Math.PI)
  corner(cx + w / 2 - r, cy - h / 2 + r, Math.PI * 1.5)
  pts.push(pts[0].clone())
  return pts
}
const rect = (x0, y0, x1, y1, z = 0) => [V(x0, y0, z), V(x1, y0, z), V(x1, y1, z), V(x0, y1, z), V(x0, y0, z)]

// ── 3D building blocks ──
const TAU = Math.PI * 2
// circle around `c` in the plane perpendicular to axis 'x' | 'y' | 'z'
const circle = (c, axis, r, n = 12) => Array.from({ length: n + 1 }, (_, i) => {
  const a = (i / n) * TAU, u = Math.cos(a) * r, v = Math.sin(a) * r
  return axis === 'z' ? V(c[0] + u, c[1] + v, c[2]) : axis === 'y' ? V(c[0] + u, c[1], c[2] + v) : V(c[0], c[1] + u, c[2] + v)
})
// cylinder along an axis: both rims plus `k` straight sides
const cylinder = (c, axis, r, h, n = 10, k = 4) => {
  const d = axis === 'x' ? [1, 0, 0] : axis === 'y' ? [0, 1, 0] : [0, 0, 1]
  const at = (s) => [c[0] + d[0] * s, c[1] + d[1] * s, c[2] + d[2] * s]
  const top = circle(at(h / 2), axis, r, n), bot = circle(at(-h / 2), axis, r, n)
  const sides = Array.from({ length: k }, (_, i) => { const j = Math.round((i / k) * n); return [top[j], bot[j]] })
  return [top, bot, ...sides]
}
// wire sphere: latitude rings and meridians
const globe = (c, r, lats = 3, lons = 4, n = 14) => {
  const out = []
  for (let i = 1; i <= lats; i++) {
    const phi = (i / (lats + 1)) * Math.PI
    out.push(circle([c[0], c[1] + Math.cos(phi) * r, c[2]], 'y', Math.sin(phi) * r, n))
  }
  for (let j = 0; j < lons; j++) {
    const th = (j / lons) * Math.PI
    out.push(Array.from({ length: n + 1 }, (_, i) => {
      const a = (i / n) * TAU
      return V(c[0] + Math.cos(a) * r * Math.cos(th), c[1] + Math.sin(a) * r, c[2] + Math.cos(a) * r * Math.sin(th))
    }))
  }
  return out
}
// flat xy outline → solid: front and back copy plus straight edges at every k-th point
const extrude = (pts, z0, z1, k = 1) => {
  const f = pts.map((p) => V(p.x, p.y, z0)), b = pts.map((p) => V(p.x, p.y, z1))
  const sides = pts.filter((_, i) => i % k === 0).map((p) => [V(p.x, p.y, z0), V(p.x, p.y, z1)])
  return [f, b, ...sides]
}
const glyph = (lines, ox, oy, s, z0, z1) =>
  lines.flatMap((l) => extrude(l.map(([x, y]) => V(ox + x * s, oy + y * s, 0)), z0, z1))

// ── the five topic objects ──
const SHAPES = {
  // Web-Apps: a puffy 3D cloud (pillow-shaped slices of a bumpy outline) with code floating in front
  cloud: () => {
    const puffs = [[-0.72, -0.05, 0.5], [-0.2, 0.32, 0.62], [0.42, 0.22, 0.58], [0.86, -0.1, 0.44]]
    const floor = -0.48
    // outline: along the top of the puffs from left to right, then back along the flat base
    const top = (x) => Math.max(floor, ...puffs.map(([px, py, r]) => (Math.abs(x - px) < r ? py + Math.sqrt(r * r - (x - px) ** 2) : -9)))
    const x0 = Math.min(...puffs.map(([px, , r]) => px - r)) + 0.02, x1 = Math.max(...puffs.map(([px, , r]) => px + r)) - 0.02
    const outline = []
    for (let i = 0; i <= 36; i++) { const x = x0 + ((x1 - x0) * i) / 36; outline.push(V(x, top(x), 0)) }
    for (let i = 1; i < 6; i++) outline.push(V(x1 - ((x1 - x0) * i) / 6, floor, 0))
    outline.push(outline[0].clone())
    // a slim, icon-like cloud: the outline extruded to a thin slab, with </> set into its face
    const d = 0.13
    const g = (l, x, y, sc, z) => glyph(l, x, y, sc, z, z - 0.08)
    return [...extrude(outline, d, -d, 5),
      ...g([[[-0.6, 0.45], [-1, 0], [-0.6, -0.45]], [[0.6, 0.45], [1, 0], [0.6, -0.45]], [[0.22, 0.6], [-0.22, -0.6]]], 0.04, 0.12, 0.5, d + 0.22)]
  },
  // 3D-Erlebnisse: an icosahedron inside two tilted orbit rings, like a gyroscope
  gem: () => {
    const t = (1 + Math.sqrt(5)) / 2, k = 0.62
    const v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(([x, y, z]) => V(x * k, y * k, z * k))
    const edges = []
    for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) if (Math.abs(v[i].distanceTo(v[j]) - 2 * k) < 1e-3) edges.push([v[i], v[j]])
    const orbit = (tilt, spin, r) => circle([0, 0, 0], 'y', r, 28).map((p) => p.clone().applyAxisAngle(V(1, 0, 0), tilt).applyAxisAngle(V(0, 1, 0), spin))
    return [...edges, orbit(0.45, 0, 1.45), orbit(-0.6, 1.2, 1.38)]
  },
  // iOS-Apps: a phone with real thickness — rounded body, screen, island, app grid, dock,
  // camera bump with lenses on the back and side buttons
  phone: () => {
    const d = 0.1, W = 1.18, H = 2.36
    const icons = []
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) icons.push(roundRect(-0.32 + c * 0.32, 0.62 - r * 0.33, 0.2, 0.2, 0.05, d + 0.005, 1))
    const lens = (x, y) => cylinder([x, y, -d - 0.05], 'z', 0.08, 0.1, 8, 4)
    return [
      roundRect(0, 0, W, H, 0.2, d, 4), roundRect(0, 0, W, H, 0.2, -d, 4),
      ...[[W / 2, 0.7], [W / 2, -0.7], [-W / 2, 0.7], [-W / 2, -0.7], [0.3, H / 2], [-0.3, H / 2], [0.3, -H / 2], [-0.3, -H / 2]].map(([x, y]) => [V(x, y, d), V(x, y, -d)]),
      roundRect(0, 0, W - 0.12, H - 0.12, 0.16, d + 0.005, 3),          // screen
      roundRect(0, H / 2 - 0.16, 0.36, 0.09, 0.045, d + 0.005, 2),      // island
      ...icons,
      roundRect(0, -H / 2 + 0.25, 0.92, 0.26, 0.08, d + 0.005, 2),      // dock
      ...extrude(roundRect(-0.27, 0.78, 0.48, 0.48, 0.12, 0, 2), -d, -d - 0.04, 3), // camera bump
      ...lens(-0.38, 0.88), ...lens(-0.17, 0.68), ...lens(-0.38, 0.68),
      [V(W / 2 + 0.03, 0.45, 0), V(W / 2 + 0.03, 0.15, 0)], [V(-W / 2 - 0.03, 0.55, 0), V(-W / 2 - 0.03, 0.35, 0)], [V(-W / 2 - 0.03, 0.25, 0), V(-W / 2 - 0.03, 0.05, 0)],
    ]
  },
  // Interfaces: an exploded UI — window, layout and controls on three layers in depth
  layers: () => {
    // each layer steps forward and down-right, so the stack reads clearly as depth
    const L = (dx, dy, z) => (pts) => pts.map((p) => V(p.x + dx, p.y + dy, z))
    const back = L(-0.3, 0.3, -0.5), mid = L(0, 0, 0), front = L(0.3, -0.3, 0.5)
    return [
      back(roundRect(0, 0, 2.0, 1.4, 0.1, 0, 2)), back([V(-1, 0.45, 0), V(1, 0.45, 0)]),
      back(circle([-0.84, 0.57, 0], 'z', 0.045, 6)), back(circle([-0.7, 0.57, 0], 'z', 0.045, 6)), back(circle([-0.56, 0.57, 0], 'z', 0.045, 6)),
      mid(roundRect(0, 0, 2.0, 1.4, 0.1, 0, 2)), mid(rect(-0.85, 0.55, -0.35, -0.55)), mid(rect(-0.2, 0.55, 0.85, 0.05)), mid(rect(-0.2, -0.1, 0.85, -0.55)),
      front(roundRect(0, 0, 2.0, 1.4, 0.1, 0, 2)),
      front(roundRect(0.35, -0.38, 0.8, 0.26, 0.13, 0, 3)),                       // button
      front(roundRect(-0.55, 0.35, 0.46, 0.22, 0.11, 0, 3)), front(circle([-0.44, 0.35, 0], 'z', 0.075, 8)), // toggle
      front([V(0.25, 0.45, 0), V(0.25, 0.05, 0), V(0.35, 0.14, 0), V(0.43, -0.03, 0), V(0.48, 0, 0), V(0.4, 0.16, 0), V(0.53, 0.17, 0), V(0.25, 0.45, 0)]), // pointer
      ...[[-1, 0.7], [1, 0.7], [-1, -0.7], [1, -0.7]].map(([x, y]) => [V(x - 0.3, y + 0.3, -0.5), V(x, y, 0), V(x + 0.3, y - 0.3, 0.5)]),
    ]
  },
  // mit KI: a robot head built as a solid — head, visor, cylinder eyes, ears, antenna, neck, shoulders
  robot: () => [
    ...box(-0.82, -0.5, -0.55, 0.82, 0.72, 0.55),
    roundRect(0, 0.08, 1.36, 0.82, 0.16, 0.56, 3),                       // visor
    ...cylinder([-0.34, 0.16, 0.6], 'z', 0.17, 0.12, 10, 4), ...cylinder([0.34, 0.16, 0.6], 'z', 0.17, 0.12, 10, 4),
    circle([-0.34, 0.16, 0.66], 'z', 0.06, 6), circle([0.34, 0.16, 0.66], 'z', 0.06, 6),
    ...[-0.24, -0.08, 0.08, 0.24].map((x) => [V(x, -0.2, 0.56), V(x, -0.34, 0.56)]),
    ...cylinder([-0.92, 0.1, 0], 'x', 0.2, 0.2, 10, 4), ...cylinder([0.92, 0.1, 0], 'x', 0.2, 0.2, 10, 4),
    ...cylinder([0, 0.92, 0], 'y', 0.04, 0.4, 6, 2), ...globe([0, 1.2, 0], 0.11, 1, 2, 8),
    ...cylinder([0, -0.64, 0], 'y', 0.22, 0.28, 10, 4),
    ...box(-1.0, -1.15, -0.45, 1.0, -0.78, 0.45),
  ],
}

// Points along the strokes (shared corners merged) and the links between neighbours
function wireframe(strokes) {
  const vecs = [], pairs = new Set(), grid = new Map()
  // points closer than 0.01 are the same point (shared corners); a hash on a 0.01 grid finds them in O(1)
  const idx = (v) => {
    const key = `${Math.round(v.x * 100)},${Math.round(v.y * 100)},${Math.round(v.z * 100)}`
    const found = grid.get(key)
    if (found !== undefined) return found
    vecs.push(v.clone()); grid.set(key, vecs.length - 1); return vecs.length - 1
  }
  for (const pts of strokes) {
    let prev = idx(pts[0])
    for (let k = 1; k < pts.length; k++) {
      const a = pts[k - 1], b = pts[k], n = Math.max(1, Math.round(a.distanceTo(b) / STEP))
      for (let j = 1; j <= n; j++) {
        const cur = idx(a.clone().lerp(b, j / n))
        if (cur !== prev) pairs.add(prev < cur ? `${prev}-${cur}` : `${cur}-${prev}`)
        prev = cur
      }
    }
  }
  return { vecs, pairs: [...pairs].map((k) => k.split('-').map(Number)) }
}

function sphere() {
  const vecs = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 1.35 + (Math.random() - 0.5) * 0.55
    vecs.push(V(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)))
  }
  const seen = new Set(), pairs = []
  for (let i = 0; i < NODE_COUNT && pairs.length < MAX_EDGES; i++) {
    const sorted = vecs.map((v, j) => ({ j, d: j === i ? Infinity : vecs[i].distanceTo(v) })).sort((a, b) => a.d - b.d)
    const k = 2 + Math.floor(Math.random() * 3)
    for (let n = 0; n < k && pairs.length < MAX_EDGES; n++) {
      const j = sorted[n].j
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) { seen.add(key); pairs.push([i, j]) }
    }
  }
  return { vecs, pairs }
}
function easeOutBack(p) {
  const c1 = 1.4, c3 = c1 + 1
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2)
}
// Cursor interaction: the points behave like a liquid. Each node sits on a spring around its
// resting place; the cursor pushes nearby nodes away and drags them along with its movement, and
// every node pulls on its linked neighbours, so a disturbance travels through the shape as a
// ripple and wobbles out. Fast movement over the object also shakes the whole shape.
const TOUCH_R = 170       // px around the cursor that the points feel
const PUSH = 3.5          // radial push away from the cursor (gentle — the slice is the main effect)
const DRAG = 0.016        // how much of the cursor's velocity carries over
const SPRING = 34         // pull back to the resting place
const DAMP = 3.6          // lower = longer wobble
const COUPLE = 22         // pull towards the neighbours' displacement (the ripple)
const SHAKE_IN = 0.000035 // cursor speed → shake impulse
const SHAKE_MAX = 0.12    // rad, the shape never turns away further than this
const SHAKE_SPRING = 38, SHAKE_DAMP = 4.2
// Cutting: a link the cursor slices through opens exactly where the cursor crossed it. The gap is
// small and grows with the speed of the cut, the two loose ends are carried a little in the cut's
// direction, and the link closes again with a slight spring. A click sends a ring of cuts outwards.
const CUT_OPEN = 0.05   // s until fully open
const CUT_HEAL = 0.55   // s to close again
const CUT_GAP_MIN = 0.12, CUT_GAP_MAX = 0.4 // share of the link that opens (slow … fast slice)
const CUT_CARRY = 0.0011 // cursor speed → how far the cut ends are carried along
const RING_SPEED = 1400 // px/s of the click ring
// open → close with a little overshoot, like elastic thread snapping back
const cutGap = (t) => {
  if (t < 0) return 0
  if (t < CUT_OPEN) return t / CUT_OPEN
  const p = Math.min(1, (t - CUT_OPEN) / CUT_HEAL)
  return p >= 1 ? 0 : Math.max(0, Math.cos(p * Math.PI * 0.5) ** 2 - 0.12 * Math.sin(p * Math.PI))
}
const segHit = (ax, ay, bx, by, cx, cy, dx, dy) => {
  const d = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx)
  if (Math.abs(d) < 1e-6) return false
  const u = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / d
  const v = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / d
  return u > 0.04 && u < 0.96 && v >= 0 && v <= 1 ? u : -1
}

// Soft round sprite so nodes render as dots instead of squares
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(255,255,255,1)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(32, 32, 32, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export const SHAPE_KEYS = ['sphere', 'cloud', 'gem', 'phone', 'layers', 'robot']

// Morph between shapes: old links retract, every node flies to its nearest free spot in the new
// shape (greedy shortest-distance matching, so it reads as a rebuild, not a shuffle), then the new
// links grow node to node like in the intro.
const M_RETRACT = 0.35, M_FLY_START = 0.15, M_FLY = 0.85, M_STAGGER = 0.25, M_GROW_START = 1.0, M_GROW_SPREAD = 0.6
const M_END = M_GROW_START + M_GROW_SPREAD + EDGE_GROW
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

function BrainNet({ mouseRef, onBuilt, shape }) {
  const groupRef = useRef()
  const time = useRef(0)
  const mouseOffset = useRef({ x: 0, y: 0 })
  // liquid displacement per node (local space) and the whole-shape shake
  const fluid = useRef(null)
  const shake = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const lastMouse = useRef(null)
  const clickAt = useRef(null)
  // Scratch objects reused every frame (no per-frame allocations)
  const tmp = useMemo(() => ({ mvp: new THREE.Matrix4(), world: new THREE.Vector3(), ndc: new THREE.Vector3(), push: new THREE.Vector3(), inv: new THREE.Quaternion() }), [])

  // All shapes share one pool of N nodes. A shape with fewer points repeats its own points, so the
  // extra nodes simply sit on top of real ones.
  const pool = useMemo(() => {
    const shapes = {}
    for (const k of SHAPE_KEYS) {
      const { vecs, pairs } = SHAPES[k] ? wireframe(SHAPES[k]()) : sphere()
      shapes[k] = { vecs, pairs }
    }
    const N = Math.max(...SHAPE_KEYS.map((k) => shapes[k].vecs.length))
    const maxE = Math.max(...SHAPE_KEYS.map((k) => shapes[k].pairs.length))
    for (const k of SHAPE_KEYS) {
      const { vecs } = shapes[k]
      const slots = new Float32Array(N * 3)
      for (let j = 0; j < N; j++) { const v = vecs[j % vecs.length]; slots.set([v.x, v.y, v.z], j * 3) }
      shapes[k].slots = slots
    }
    return { shapes, N, maxE }
  }, [])
  const n = pool.N

  const { edgeGeo, nodeGeo, local, shown, net } = useMemo(() => {
    const first = pool.shapes[SHAPES[shape] || shape === 'sphere' ? shape : 'sphere']
    const local = new Float32Array(first.slots)               // resting position of every node
    const shown = new Float32Array(n * 3)                      // drawn position (animated)
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(shown, 3))
    nodeGeo.setDrawRange(0, 0)
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pool.maxE * 12), 3)) // room for two halves per link
    edgeGeo.setDrawRange(0, 0)
    // edges as node pairs, ordered by when their later node arrives; first node grows towards second
    const edges = first.pairs.map(([p, q]) => (p < q ? [p, q] : [q, p])).sort((x, y) => x[1] - y[1])
    return { edgeGeo, nodeGeo, local, shown, net: { key: shape, edges, morph: null } }
  }, [])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#818cf8', transparent: true, opacity: 0.12 }), [])
  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: '#a5b4fc', size: 0.06, transparent: true, opacity: 0.42,
    map: makeDotTexture(), alphaTest: 0.01, depthWrite: false,
  }), [])


  useEffect(() => () => {
    edgeGeo.dispose(); nodeGeo.dispose(); edgeMat.dispose(); nodeMat.map?.dispose(); nodeMat.dispose()
  }, [])

  // Canvas position in the viewport, cached so the frame loop never forces a layout read
  const rect = useRef({ left: 0, top: 0, width: 1, height: 1 })
  const gl = useThree(s => s.gl)
  useEffect(() => {
    const el = gl.domElement
    const measure = () => {
      const r = el.getBoundingClientRect()
      rect.current = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('scroll', measure); window.removeEventListener('resize', measure) }
  }, [gl])

  // A click on the object sends a ring of cuts through it
  useEffect(() => {
    const el = gl.domElement
    const click = (e) => { const r = el.getBoundingClientRect(); clickAt.current = { x: e.clientX - r.left, y: e.clientY - r.top } }
    el.addEventListener('click', click)
    return () => el.removeEventListener('click', click)
  }, [gl])

  const lastDark = useRef(null)
  const intro = useRef({ t: 0, done: false })
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  // Skip the build-up for people who prefer reduced motion
  useEffect(() => { if (reduced) intro.current.t = introEnd(n) }, [])

  // writes edge e (node pair) into the buffer; k = how far it has grown from its first node
  const writeEdge = (buf, e, a, b, k, src) => {
    const o = e * 6
    for (let d = 0; d < 3; d++) {
      buf[o + d] = src[a * 3 + d]
      buf[o + 3 + d] = src[a * 3 + d] + (src[b * 3 + d] - src[a * 3 + d]) * k
    }
  }

  function updateIntro(dt) {
    const it = intro.current
    it.t += dt
    const t = it.t
    let started = 0
    for (let i = 0; i < n; i++) {
      const p = Math.min(1, Math.max(0, (t - nodeStart(i, n)) / NODE_FLIGHT))
      if (t >= nodeStart(i, n)) started = i + 1
      const k = p >= 1 ? 1 : easeOutBack(p)
      shown[i * 3] = local[i * 3] * k
      shown[i * 3 + 1] = local[i * 3 + 1] * k
      shown[i * 3 + 2] = local[i * 3 + 2] * k
    }
    nodeGeo.attributes.position.needsUpdate = true
    nodeGeo.setDrawRange(0, started)
    const buf = edgeGeo.attributes.position.array
    let drawn = 0
    net.edges.forEach(([a, b]) => {
      const start = nodeArrive(b, n)
      if (t < start) return
      const p = Math.min(1, (t - start) / EDGE_GROW)
      writeEdge(buf, drawn++, a, b, 1 - (1 - p) * (1 - p), local)
    })
    edgeGeo.attributes.position.needsUpdate = true
    edgeGeo.setDrawRange(0, drawn * 2)
    if (t >= introEnd(n)) {
      it.done = true
      onBuilt?.()
      shown.set(local)
      nodeGeo.attributes.position.needsUpdate = true
      nodeGeo.setDrawRange(0, n)
    }
  }

  // ── morph to another shape ──
  useEffect(() => {
    if (shape === net.key || !pool.shapes[shape]) return
    const target = pool.shapes[shape]
    // greedy nearest matching of nodes to the new shape's slots
    // (only the 6 nearest slots per node are candidates, which keeps it fast; leftovers are paired up
    // in order afterwards)
    const K = 6, cand = [], dist = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const dx = shown[i * 3] - target.slots[j * 3], dy = shown[i * 3 + 1] - target.slots[j * 3 + 1], dz = shown[i * 3 + 2] - target.slots[j * 3 + 2]
        dist[j] = dx * dx + dy * dy + dz * dz
      }
      const best = []
      for (let j = 0; j < n; j++) {
        if (best.length < K) { best.push(j); best.sort((a, b) => dist[a] - dist[b]) }
        else if (dist[j] < dist[best[K - 1]]) { best[K - 1] = j; best.sort((a, b) => dist[a] - dist[b]) }
      }
      for (const j of best) cand.push([dist[j], i, j])
    }
    cand.sort((x, y) => x[0] - y[0])
    const nodeOf = new Int32Array(n).fill(-1), slotOf = new Int32Array(n).fill(-1)
    for (const [, i, j] of cand) { if (slotOf[i] < 0 && nodeOf[j] < 0) { slotOf[i] = j; nodeOf[j] = i } }
    let free = 0
    for (let i = 0; i < n; i++) {
      if (slotOf[i] >= 0) continue
      while (nodeOf[free] >= 0) free++
      slotOf[i] = free; nodeOf[free] = i
    }
    const to = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) to.set(target.slots.subarray(slotOf[i] * 3, slotOf[i] * 3 + 3), i * 3)
    // new edges in node indices, in the shape's stroke order so they grow like a drawing
    const newEdges = target.pairs.map(([p, q]) => [nodeOf[Math.min(p, q)], nodeOf[Math.max(p, q)], Math.max(p, q)]).sort((x, y) => x[2] - y[2]).map(([a, b]) => [a, b])
    // the liquid settles instantly while the shape rebuilds
    fluid.current = null
    if (!intro.current.done) { intro.current.done = true; onBuilt?.() }
    net.morph = { t: reduced ? M_END : 0, from: new Float32Array(shown), to, slotOf, old: net.edges, edges: newEdges }
    net.key = shape
    nodeGeo.setDrawRange(0, n)
  }, [shape])

  function updateMorph(dt) {
    const m = net.morph
    m.t += dt
    const t = m.t
    for (let i = 0; i < n; i++) {
      const delay = M_FLY_START + (m.slotOf[i] / n) * M_STAGGER
      const k = easeInOut(Math.min(1, Math.max(0, (t - delay) / M_FLY)))
      for (let d = 0; d < 3; d++) shown[i * 3 + d] = m.from[i * 3 + d] + (m.to[i * 3 + d] - m.from[i * 3 + d]) * k
    }
    nodeGeo.attributes.position.needsUpdate = true
    const buf = edgeGeo.attributes.position.array
    let drawn = 0
    if (t < M_RETRACT) {
      // old links shrink back into their first node (they ride along with the moving nodes)
      const k = 1 - Math.pow(t / M_RETRACT, 2)
      m.old.forEach(([a, b]) => writeEdge(buf, drawn++, a, b, k, shown))
    } else {
      m.edges.forEach(([a, b], e) => {
        const start = M_GROW_START + (e / Math.max(1, m.edges.length)) * M_GROW_SPREAD
        if (t < start) return
        const p = Math.min(1, (t - start) / EDGE_GROW)
        writeEdge(buf, drawn++, a, b, 1 - (1 - p) * (1 - p), shown)
      })
    }
    edgeGeo.attributes.position.needsUpdate = true
    edgeGeo.setDrawRange(0, drawn * 2)
    if (t >= M_END) {
      local.set(m.to)
      shown.set(m.to)
      net.edges = m.edges
      net.morph = null
    }
  }

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    // Theme colours only change when the theme does, not every frame
    const dark = document.documentElement.classList.contains('dark')
    if (dark !== lastDark.current) {
      lastDark.current = dark
      edgeMat.color.set(dark ? '#818cf8' : '#6366f1')
      edgeMat.opacity = dark ? 0.12 : 0.09
      nodeMat.color.set(dark ? '#a5b4fc' : '#4f46e5')
      nodeMat.opacity = dark ? 0.42 : 0.35
    }

    const dt = Math.min(delta, 0.1) // avoid a jump after resuming from pause
    time.current += dt
    if (net.morph) updateMorph(dt)
    else if (!intro.current.done) updateIntro(dt)
    // The cursor only takes effect once the orb has finished building itself; the lerp below then
    // eases the tilt in smoothly instead of snapping
    if (mouseRef?.current && intro.current.done) {
      const nx = (mouseRef.current.x / window.innerWidth) * 2 - 1
      const ny = -((mouseRef.current.y / window.innerHeight) * 2 - 1)
      // 0.04 per 60 fps frame, scaled so the follow speed is identical at 120 Hz
      const a = 1 - Math.pow(1 - 0.04, dt * 60)
      mouseOffset.current.x = THREE.MathUtils.lerp(mouseOffset.current.x, ny * 0.35, a)
      mouseOffset.current.y = THREE.MathUtils.lerp(mouseOffset.current.y, nx * 0.45, a)
    }
    // all shapes face the viewer and only sway, so they stay readable (and morphs never snap)
    const sh = shake.current
    group.rotation.y = Math.sin(time.current * 0.35) * 0.55 + mouseOffset.current.y + sh.y
    group.rotation.x = Math.sin(time.current * 0.23) * 0.12 + mouseOffset.current.x + sh.x

    updateFluid(state.camera, dt)
  })

  function updateFluid(camera, dt) {
    const sh = shake.current
    // the whole-shape shake always settles, even during intro/morph
    sh.vx += (-SHAKE_SPRING * sh.x - SHAKE_DAMP * sh.vx) * dt; sh.x += sh.vx * dt
    sh.vy += (-SHAKE_SPRING * sh.y - SHAKE_DAMP * sh.vy) * dt; sh.y += sh.vy * dt
    if (!intro.current.done || net.morph) { lastMouse.current = null; return }

    if (!fluid.current) {
      // neighbour lists from the current edges
      const nb = Array.from({ length: n }, () => [])
      for (const [a, b] of net.edges) { nb[a].push(b); nb[b].push(a) }
      fluid.current = {
        off: new Float32Array(n * 3), vel: new Float32Array(n * 3), nb, active: false,
        cut: new Float32Array(net.edges.length).fill(9), // age of each link's cut (9 = whole)
        cutU: new Float32Array(net.edges.length).fill(0.5), // where along the link it was cut
        cutW: new Float32Array(net.edges.length).fill(CUT_GAP_MIN), // how wide it opens
        sx: new Float32Array(n), sy: new Float32Array(n),
      }
    }
    const F = fluid.current
    const r = rect.current
    const m = mouseRef?.current
    const mx = m ? m.x - r.left : -1e4, my = m ? m.y - r.top : -1e4
    // cursor velocity in px/s
    let cvx = 0, cvy = 0
    const pmx = lastMouse.current ? lastMouse.current.x - r.left : mx, pmy = lastMouse.current ? lastMouse.current.y - r.top : my
    if (m && lastMouse.current && dt > 0) { cvx = (m.x - lastMouse.current.x) / dt; cvy = (m.y - lastMouse.current.y) / dt }
    lastMouse.current = m ? { x: m.x, y: m.y } : null
    const inside = mx >= -TOUCH_R && my >= -TOUCH_R && mx <= r.width + TOUCH_R && my <= r.height + TOUCH_R
    const moving = Math.abs(cvx) + Math.abs(cvy) > 1
    const click = clickAt.current
    clickAt.current = null

    if (!F.active && !(inside && moving) && !click) return // at rest and nothing touching it: skip all work

    const group = groupRef.current
    group.updateMatrixWorld()
    const { mvp, push, inv } = tmp
    mvp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).multiply(group.matrixWorld)
    const e = mvp.elements
    inv.copy(group.quaternion).invert()
    // px → world units at the object's depth (camera at z = 5, fov 36°)
    const unit = (2 * 5 * Math.tan(THREE.MathUtils.degToRad(18))) / r.height
    const { off, vel, nb } = F
    let touched = 0, energy = 0

    for (let i = 0; i < n; i++) {
      const o = i * 3
      let ax = 0, ay = 0, az = 0
      if ((inside && moving) || click) {
        const x = shown[o], y = shown[o + 1], z = shown[o + 2]
        const w = e[3] * x + e[7] * y + e[11] * z + e[15]
        const sx = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w * 0.5 + 0.5) * r.width
        const sy = (-(e[1] * x + e[5] * y + e[9] * z + e[13]) / w * 0.5 + 0.5) * r.height
        F.sx[i] = sx; F.sy[i] = sy
      }
      if (inside && moving) {
        const sx = F.sx[i], sy = F.sy[i]
        const dx = sx - mx, dy = sy - my, d = Math.hypot(dx, dy)
        if (d < TOUCH_R) {
          const f = (1 - d / TOUCH_R) ** 2
          const k = d > 1 ? PUSH / d : 0
          // screen direction → world (y flipped) → the shape's local space
          push.set((dx * k + cvx * DRAG) * f * unit * 60, -(dy * k + cvy * DRAG) * f * unit * 60, 0).applyQuaternion(inv)
          ax += push.x; ay += push.y; az += push.z
          touched++
        }
      }
      // spring home + ripple through the neighbours
      const list = nb[i]
      let nx = 0, ny = 0, nz = 0
      for (const j of list) { nx += off[j * 3]; ny += off[j * 3 + 1]; nz += off[j * 3 + 2] }
      const c = list.length ? COUPLE / list.length : 0
      ax += -SPRING * off[o] - DAMP * vel[o] + c * (nx - list.length * off[o])
      ay += -SPRING * off[o + 1] - DAMP * vel[o + 1] + c * (ny - list.length * off[o + 1])
      az += -SPRING * off[o + 2] - DAMP * vel[o + 2] + c * (nz - list.length * off[o + 2])
      vel[o] += ax * dt; vel[o + 1] += ay * dt; vel[o + 2] += az * dt
    }
    // cutting: links crossed by the cursor's path this frame snap; the click sends a ring of cuts
    const cut = F.cut
    let cutting = false
    const speed = Math.hypot(cvx, cvy)
    net.edges.forEach(([a, b], k) => {
      if (cut[k] < 9) cut[k] += dt
      if (inside && moving && cut[k] > CUT_OPEN + CUT_HEAL * 0.6) {
        const u = segHit(F.sx[a], F.sy[a], F.sx[b], F.sy[b], pmx, pmy, mx, my)
        if (u >= 0) {
          cut[k] = 0; F.cutU[k] = u
          F.cutW[k] = CUT_GAP_MIN + (CUT_GAP_MAX - CUT_GAP_MIN) * Math.min(1, speed / 2500)
          // the loose ends are carried a little in the direction of the slice (weighted by how close
          // each node was to the cut)
          push.set(cvx * CUT_CARRY * unit * 60, -cvy * CUT_CARRY * unit * 60, 0).applyQuaternion(inv)
          for (const [i, w] of [[a, 1 - u], [b, u]]) { vel[i * 3] += push.x * w; vel[i * 3 + 1] += push.y * w; vel[i * 3 + 2] += push.z * w }
        }
      }
      if (click) {
        const d = Math.hypot((F.sx[a] + F.sx[b]) / 2 - click.x, (F.sy[a] + F.sy[b]) / 2 - click.y)
        cut[k] = -d / RING_SPEED // waits until the ring arrives
        F.cutU[k] = 0.5; F.cutW[k] = CUT_GAP_MAX
      }
      // the click ring nudges the nodes outwards as it passes
      if (cut[k] < 0 && cut[k] + dt >= 0) {
        for (const i of [a, b]) for (let d = 0; d < 3; d++) vel[i * 3 + d] += shown[i * 3 + d] * 0.8
      }
      if (cut[k] < CUT_OPEN + CUT_HEAL) cutting = true
    })

    for (let i = 0; i < n * 3; i++) {
      off[i] += vel[i] * dt
      // keep a hard edge on how far a point can be pushed
      off[i] = Math.max(-0.5, Math.min(0.5, off[i]))
      shown[i] = local[i] + off[i]
      energy += Math.abs(off[i]) + Math.abs(vel[i]) * 0.1
    }
    // fast movement over the object shakes the whole shape
    if (touched) {
      const k = SHAKE_IN * Math.min(1, touched / 8)
      sh.vy += cvx * k; sh.vx += cvy * k
    }
    sh.x = Math.max(-SHAKE_MAX, Math.min(SHAKE_MAX, sh.x)); sh.y = Math.max(-SHAKE_MAX, Math.min(SHAKE_MAX, sh.y))

    nodeGeo.attributes.position.needsUpdate = true
    const buf = edgeGeo.attributes.position.array
    // every link as two halves meeting in the middle; a cut pulls them back towards their nodes
    const drawLinks = () => {
      net.edges.forEach(([a, b], k) => {
        const u = F.cutU[k], g = F.cutW[k] * cutGap(cut[k]) / 2
        writeEdge(buf, k * 2, a, b, Math.max(0, u - g), shown)
        writeEdge(buf, k * 2 + 1, b, a, Math.max(0, 1 - u - g), shown)
      })
      edgeGeo.attributes.position.needsUpdate = true
      edgeGeo.setDrawRange(0, net.edges.length * 4)
    }
    drawLinks()

    F.active = energy > 0.002 * n || cutting
    if (!F.active) { off.fill(0); vel.fill(0); shown.set(local); drawLinks() }
  }

  return (
    <>
      <group ref={groupRef}>
        <lineSegments geometry={edgeGeo} material={edgeMat} />
        <points geometry={nodeGeo} material={nodeMat} />
      </group>
    </>
  )
}

export default function NetworkOrb3D({ mouseRef, active = true, onBuilt, shape = 'sphere' }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <BrainNet mouseRef={mouseRef} onBuilt={onBuilt} shape={shape} />
    </Canvas>
  )
}
