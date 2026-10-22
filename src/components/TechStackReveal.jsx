import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiReact, SiVite, SiThreedotjs, SiGreensock, SiFramer,
  SiTailwindcss, SiFigma, SiGithub, SiNodedotjs,
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

// ── Board switching on ──────────────────────────────────────────
// While scrolling down, fine PCB traces draw out of the chip across the background (a short piece
// of "current" glows at each tip) and the board's own traces draw from the cards to the chip. Once
// everything has arrived, the chip and its lettering light up and the current pulses start.
// Scrolling back up switches it all off again.
const GRID = 24          // routing grid of the background traces
const TRACES = 12
const TARGET_GRID = [7, 4] // columns × rows of the jittered grid the end points are picked from

// deterministic noise, so the pattern is the same on every visit
function seededRnd(seed) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
}

// Routed like a fan-out on a real board: end points are spread evenly over the free area (a
// jittered grid); side traces leave from the middle of the chip's left/right edge and branch off
// one by one — the one going furthest up or down turns closest to the chip — so they never cross
// or run on top of each other. Top traces leave upwards. The area right below the chip, as wide
// as the tech cards, stays clear. Returns paths as lists of grid cells, starting at the chip.
function routeTraces(w, h, chip, block, G, count) {
  const rnd = seededRnd(17)
  const cols = Math.ceil(w / G), rows = Math.ceil(h / G)
  const cell = (v) => Math.floor(v / G)
  const ch = { l: cell(chip.left), r: cell(chip.right), t: cell(chip.top), b: cell(chip.bottom) }
  const cx = (ch.l + ch.r) / 2, midRow = Math.round((ch.t + ch.b) / 2)
  const air = Math.max(1, Math.round(80 / G))
  // clear area: below the chip and within the card grid's width (plus a bit of air)
  const blocked = (c, r) => (r + 1) * G > block.top && (c + 1) * G > block.left - 14 && c * G < block.right + 14
  const blockL = cell(block.left - 14) - 1, blockR = cell(block.right + 14) + 1
  const nearChip = (c, r) => c >= ch.l - air && c <= ch.r + air && r >= ch.t - air && r <= ch.b + air

  // 1. end points, evenly spread
  const targets = []
  const [gx, gy] = TARGET_GRID
  for (let j = 0; j < gy; j++) {
    for (let i = 0; i < gx; i++) {
      const c = Math.round(((i + 0.2 + rnd() * 0.6) / gx) * (cols - 1))
      const r = Math.round(((j + 0.2 + rnd() * 0.6) / gy) * (rows - 1))
      if (!blocked(c, r) && !nearChip(c, r)) targets.push({ c, r, ang: Math.atan2(r - midRow, c - cx) })
    }
  }
  targets.sort((a, b) => a.ang - b.ang)
  const picked = targets.length <= count ? targets : Array.from({ length: count }, (_, k) => targets[Math.floor((k * targets.length) / count)])

  const paths = []
  const path = (c, r, legs) => {
    const pts = [[c, r]]
    for (const [tc, tr] of legs) {
      while (c !== tc) { c += Math.sign(tc - c); pts.push([c, r]) }
      while (r !== tr) { r += Math.sign(tr - r); pts.push([c, r]) }
    }
    // keep only the part that stays on the board and out of the clear area
    const bad = pts.findIndex(([pc, pr]) => pc < 0 || pr < 0 || pc >= cols || pr >= rows || blocked(pc, pr))
    const kept = bad < 0 ? pts : pts.slice(0, bad)
    if (kept.length > 1) paths.push(kept)
  }

  // 2. top traces: above the chip and roughly within its width
  const top = picked.filter((t) => t.r < ch.t && t.c >= ch.l - air && t.c <= ch.r + air).sort((a, b) => a.c - b.c)
  top.forEach((t, i) => {
    const sc = Math.round(ch.l + 1 + ((i + 0.5) / top.length) * (ch.r - ch.l - 2))
    path(sc, ch.t - 1, [[sc, t.r], [t.c, t.r]])
  })

  // 3. side traces: fan-out from the middle of the edge, one end row per trace
  for (const dir of [-1, 1]) {
    const side = picked.filter((t) => !top.includes(t) && (dir < 0 ? t.c < cx : t.c >= cx))
    const start = dir < 0 ? ch.l - 1 : ch.r + 1
    const seenRows = new Set()
    const uniq = side.filter((t) => !seenRows.has(t.r) && seenRows.add(t.r))
    const up = uniq.filter((t) => t.r <= midRow).sort((a, b) => a.r - b.r)   // furthest up first
    const down = uniq.filter((t) => t.r > midRow).sort((a, b) => b.r - a.r)  // furthest down first
    up.forEach((t, i) => {
      const turn = start + dir * (1 + i)
      if ((t.c - turn) * dir > 0) path(start, midRow, [[turn, midRow], [turn, t.r], [t.c, t.r]])
    })
    // downward traces turn only once they are out beside the cards
    const edge = dir < 0 ? Math.min(start, blockL) : Math.max(start, blockR)
    down.forEach((t, i) => {
      const turn = edge + dir * i
      if ((t.c - turn) * dir >= 0) path(start, midRow, [[turn, midRow], [turn, t.r], [t.c, t.r]])
    })
  }
  return paths
}

// Fine lines: corner points in px (cell centres), corners cut at 45°. Every trace grows at the same
// speed, so its drawn length is measured against the longest one.
function buildLines(w, h, chip, block) {
  const G = GRID
  const paths = routeTraces(w, h, chip, block, G, TRACES)
  const k = G * 0.55
  const lines = paths.map((pts) => {
    const px = pts.map(([c, r]) => [c * G + G / 2, r * G + G / 2])
    const corners = px.filter((p, i) => {
      if (i === 0 || i === px.length - 1) return true
      const [a, b] = [px[i - 1], px[i + 1]]
      return (p[0] - a[0]) * (b[1] - p[1]) !== (p[1] - a[1]) * (b[0] - p[0])
    })
    const out = [corners[0]]
    for (let i = 1; i < corners.length - 1; i++) {
      const [a, p, b] = [corners[i - 1], corners[i], corners[i + 1]]
      const din = Math.hypot(p[0] - a[0], p[1] - a[1]), dout = Math.hypot(b[0] - p[0], b[1] - p[1])
      const ki = Math.min(k, din / 2), ko = Math.min(k, dout / 2)
      out.push([p[0] - ((p[0] - a[0]) / din) * ki, p[1] - ((p[1] - a[1]) / din) * ki])
      out.push([p[0] + ((b[0] - p[0]) / dout) * ko, p[1] + ((b[1] - p[1]) / dout) * ko])
    }
    out.push(corners[corners.length - 1])
    const segs = []
    let len = 0
    for (let i = 1; i < out.length; i++) {
      const l = Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1])
      segs.push([out[i - 1], out[i], len, l]); len += l
    }
    return { segs, len, end: out[out.length - 1] }
  })
  return { lines, longest: Math.max(0, ...lines.map((l) => l.len)) }
}

// Drawn up to the current length; a short bright piece of "current" rides on the tip, and a via
// (small ring) appears once a trace has reached its end
function drawLines(ctx, { lines, longest }, w, h, p) {
  ctx.clearRect(0, 0, w, h)
  const HEAD = 42
  const strokeTo = (segs, from, to) => {
    ctx.beginPath()
    let moved = false
    for (const [a, b, start, l] of segs) {
      if (start + l < from || start > to) continue
      const t0 = Math.max(0, (from - start) / l), t1 = Math.min(1, (to - start) / l)
      const x0 = a[0] + (b[0] - a[0]) * t0, y0 = a[1] + (b[1] - a[1]) * t0
      if (!moved) { ctx.moveTo(x0, y0); moved = true }
      ctx.lineTo(a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1)
    }
    ctx.stroke()
  }
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  for (const line of lines) {
    const drawn = Math.min(line.len, (p / 0.97) * longest)
    if (drawn <= 0) continue
    ctx.strokeStyle = 'rgba(255,255,255,0.11)'
    ctx.lineWidth = 1.25
    strokeTo(line.segs, 0, drawn)
    if (drawn < line.len) {
      ctx.save()
      ctx.shadowColor = 'rgba(129,140,248,0.95)'
      ctx.shadowBlur = 10
      ctx.strokeStyle = 'rgba(199,210,254,0.9)'
      ctx.lineWidth = 1.75
      strokeTo(line.segs, Math.max(0, drawn - HEAD), drawn)
      ctx.restore()
    } else {
      ctx.strokeStyle = 'rgba(255,255,255,0.22)'
      ctx.lineWidth = 1.25
      ctx.beginPath(); ctx.arc(line.end[0], line.end[1], 3.5, 0, Math.PI * 2); ctx.stroke()
    }
  }
}

const TECH = [
  { name: 'React',         Icon: SiReact,      color: '#61DAFB', desc: 'UI Library'      },
  { name: 'Vite',          Icon: SiVite,        color: '#747BFF', desc: 'Build Tool'      },
  { name: 'Three.js',      Icon: SiThreedotjs,  color: '#c4c4c4', desc: '3D Engine'       },
  { name: 'GSAP',          Icon: SiGreensock,   color: '#88CE02', desc: 'Animations'      },
  { name: 'Framer Motion', Icon: SiFramer,      color: '#6366F1', desc: 'Motion Library'  },
  { name: 'Tailwind CSS',  Icon: SiTailwindcss, color: '#38BDF8', desc: 'Styling'         },
  { name: 'Figma',         Icon: SiFigma,       color: '#F24E1E', desc: 'Design Tool'     },
  { name: 'GitHub',        Icon: SiGithub,      color: '#e0e0e0', desc: 'Version Control' },
  { name: 'Node.js',       Icon: SiNodedotjs,   color: '#74B260', desc: 'Runtime'         },
]

// Per-card pin offset + junction ratio — each trace has its own routing character
const CARD_PIN_X = [-38,   4,  30,  -24,  14,  38,  -44,  -8,  22]
const CARD_RATIO = [0.42, 0.36, 0.62, 0.54, 0.46, 0.38, 0.70, 0.58, 0.76]

function makeCardTrace(cardX, cardY, chipX, chipBotY, i) {
  const pinX = chipX + (CARD_PIN_X[i] ?? 0)
  const jY   = cardY + (chipBotY - cardY) * (CARD_RATIO[i] ?? 0.5)
  return `M ${cardX} ${cardY} L ${cardX} ${jY} L ${pinX} ${jY} L ${pinX} ${chipBotY}`
}

// 3 individual side traces per side — mix of L-shape (2 corners) and Z-shape (3 corners)
// Each trace uses its badge's own color and has unique routing
function makeSideTraces(cardRects, cRect, chipX, chipHW, chipMidY) {
  const lx = chipX - chipHW  // chip left edge (side pin entry)
  const rx = chipX + chipHW  // chip right edge

  const get = i => cardRects[i]
  const traces = []

  // ── LEFT SIDE: cards 0, 3, 6 ──────────────────────────────────

  // Card 0 (React) — L-shape: exits card left, goes right → up into chip
  const r0 = get(0)
  if (r0) {
    const sx = r0.left - cRect.left
    const sy = r0.top  - cRect.top + r0.height * 0.38
    traces.push({ d: `M ${sx} ${sy} L ${lx} ${sy} L ${lx} ${chipMidY - 14}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[0].color })
  }

  // Card 3 (GSAP) — Z-shape: exits card, jogs to intermediate X, up, then right into chip
  const r3 = get(3)
  if (r3) {
    const sx = r3.left - cRect.left
    const sy = r3.top  - cRect.top + r3.height * 0.55
    const mx = lx - 42
    const my = chipMidY + 4
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${lx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // Card 6 (Figma) — Z-shape: exits higher on card, different intermediate
  const r6 = get(6)
  if (r6) {
    const sx = r6.left - cRect.left
    const sy = r6.top  - cRect.top + r6.height * 0.28
    const mx = lx - 20
    const my = chipMidY + 20
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${lx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // ── RIGHT SIDE: cards 2, 5, 8 ─────────────────────────────────

  // Card 2 (Three.js) — Z-shape: exits card right, jogs to intermediate, up, left into chip
  const r2 = get(2)
  if (r2) {
    const sx = r2.right - cRect.left
    const sy = r2.top   - cRect.top + r2.height * 0.45
    const mx = rx + 46
    const my = chipMidY - 8
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${rx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // Card 5 (Tailwind) — L-shape: exits card, goes left directly → up into chip
  const r5 = get(5)
  if (r5) {
    const sx = r5.right - cRect.left
    const sy = r5.top   - cRect.top + r5.height * 0.60
    traces.push({ d: `M ${sx} ${sy} L ${rx} ${sy} L ${rx} ${chipMidY + 10}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[5].color })
  }

  // Card 8 (Node.js) — Z-shape: exits lower on card, shallower intermediate
  const r8 = get(8)
  if (r8) {
    const sx = r8.right - cRect.left
    const sy = r8.top   - cRect.top + r8.height * 0.35
    const mx = rx + 26
    const my = chipMidY + 22
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${rx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[8].color })
  }

  return traces
}

// Asymmetric chip decorations — left and right intentionally differ
function makeDecorTraces(cx, topY, botY, midY, hw) {
  const lx = cx - hw
  const rx = cx + hw
  return [
    // Top stub — shifted slightly right of center
    { d: `M ${cx + 10} ${topY} L ${cx + 10} ${topY - 50}`,
      circles: [[cx + 10, topY - 50]], color: 'rgba(255,255,255,0.13)', anim: null },

    // Top-left: deep loop going further left
    { d: `M ${cx - 42} ${topY} L ${cx - 42} ${topY - 46} L ${lx - 86} ${topY - 46} L ${lx - 86} ${topY - 10}`,
      circles: [[lx - 86, topY - 10]], color: 'rgba(255,255,255,0.10)', anim: null },

    // Top-right: shorter, just a small horizontal shelf (no full loop)
    { d: `M ${cx + 28} ${topY} L ${cx + 28} ${topY - 28} L ${rx + 44} ${topY - 28}`,
      circles: [[rx + 44, topY - 28]], color: 'rgba(255,255,255,0.10)', anim: null },

    // Left stub: goes left then hooks down — L-shape
    { d: `M ${lx} ${midY - 20} L ${lx - 82} ${midY - 20} L ${lx - 82} ${midY + 14}`,
      circles: [[lx - 82, midY + 14]], color: 'rgba(255,255,255,0.13)', anim: '#818cf8' },

    // Right stub: simple horizontal, sits higher, shorter
    { d: `M ${rx} ${midY - 36} L ${rx + 52} ${midY - 36}`,
      circles: [[rx + 52, midY - 36]], color: 'rgba(255,255,255,0.13)', anim: null },
  ]
}

const PIN = ({ direction, count }) => {
  const isV = direction === 'top' || direction === 'bottom'
  const grad = { top: 'to bottom', bottom: 'to top', left: 'to right', right: 'to left' }[direction]
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} style={{
      width: isV ? 7 : 18, height: isV ? 20 : 7,
      borderRadius: 2, flexShrink: 0,
      background: `linear-gradient(${grad}, #242424, #4a4a4a)`,
    }} />
  ))
}

export default function TechStackReveal() {
  const containerRef  = useRef()
  const sectionRef    = useRef()
  const chipRef       = useRef()
  const canvasRef     = useRef()
  const chipBodyRef   = useRef()
  const chipTitleRef  = useRef()
  const chipLabelRef  = useRef()
  const svgRef        = useRef()
  const cardRefs      = useRef([])
  const pulseRefs     = useRef([])
  const decorAnimRefs = useRef([])
  const allTweens     = useRef([])

  const [paths,   setPaths]   = useState([])
  const [decor,   setDecor]   = useState([])
  const [svgDims, setSvgDims] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !chipRef.current) return
      const cRect    = containerRef.current.getBoundingClientRect()
      const chipRect = chipRef.current.getBoundingClientRect()

      const chipX    = chipRect.left   - cRect.left + chipRect.width  / 2
      const chipBotY = chipRect.bottom - cRect.top
      const chipTopY = chipRect.top    - cRect.top
      const chipMidY = (chipTopY + chipBotY) / 2
      const chipHW   = chipRect.width  / 2

      const newPaths = cardRefs.current.map((card, i) => {
        if (!card) return null
        const r = card.getBoundingClientRect()
        return {
          d:     makeCardTrace(r.left - cRect.left + r.width / 2, r.top - cRect.top, chipX, chipBotY, i),
          color: TECH[i].color,
        }
      }).filter(Boolean)

      const busDecor = makeSideTraces(
        cardRefs.current.map(el => el?.getBoundingClientRect()),
        cRect, chipX, chipHW, chipMidY,
      )

      setPaths(newPaths)
      setDecor([...makeDecorTraces(chipX, chipTopY, chipBotY, chipMidY, chipHW), ...busDecor])
      setSvgDims({ w: cRect.width, h: cRect.height })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Animate card → chip pulses.
  // Only every 3rd card (3 of 9) to reduce simultaneous tweens.
  // No SVG blur filter — feGaussianBlur on animated paths is the primary GPU cost.
  useEffect(() => {
    if (!paths.length) return
    const tweens = []
    pulseRefs.current.forEach((el, i) => {
      if (!el || i % 3 !== 0) return
      const len = el.getTotalLength()
      const dot = 40, gap = len + dot
      gsap.set(el, { strokeDasharray: `${dot} ${gap}`, strokeDashoffset: dot })
      tweens.push(gsap.to(el, {
        strokeDashoffset: -gap,
        duration: 3.2 + (i % 3) * 0.5,
        repeat: -1, ease: 'none', delay: i * 0.4,
      }))
    })
    allTweens.current.push(...tweens)
    return () => tweens.forEach(t => t?.kill())
  }, [paths])

  // Animate decorative side pulses (no blur filter).
  useEffect(() => {
    if (!decor.length) return
    const tweens = []
    decor.forEach((d, i) => {
      if (!d.anim) return
      const el = decorAnimRefs.current[i]
      if (!el) return
      const len = el.getTotalLength()
      const dot = 18, gap = len + dot
      gsap.set(el, { strokeDasharray: `${dot} ${gap}`, strokeDashoffset: dot })
      tweens.push(gsap.to(el, {
        strokeDashoffset: -gap,
        duration: 4.5 + i * 0.3,
        repeat: -1, ease: 'none', delay: i * 0.9,
      }))
    })
    allTweens.current.push(...tweens)
    return () => tweens.forEach(t => t?.kill())
  }, [decor])

  // Pixel substrate: progress comes from the scroll position (scrubbed both ways)
  useEffect(() => {
    const section = sectionRef.current, canvas = canvasRef.current
    if (!section || !canvas || !chipRef.current) return
    const ctx = canvas.getContext('2d')
    let board = null, w = 0, h = 0, progress = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = section.offsetWidth; h = section.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = section.getBoundingClientRect(), c = chipRef.current.getBoundingClientRect()
      const g = cardRefs.current[0]?.parentElement.getBoundingClientRect() ?? c
      board = buildLines(w, h,
        { left: c.left - s.left, right: c.right - s.left, top: c.top - s.top, bottom: c.bottom - s.top },
        { left: g.left - s.left, right: g.right - s.left, top: c.bottom - s.top })
      drawLines(ctx, board, w, h, reduced ? 1 : progress)
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(section)
    if (reduced) return () => ro.disconnect()

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      end: 'center 40%',
      onUpdate: (self) => {
        progress = self.progress
        drawLines(ctx, board, w, h, progress)
      },
    })
    return () => { st.kill(); ro.disconnect() }
  }, [])

  // The board itself switches on: its traces draw from the cards to the chip one after another, the
  // vias appear, and once everything has arrived the chip and its lettering light up and the current
  // pulses start running.
  useEffect(() => {
    if (!paths.length || !svgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const svg = svgRef.current
    const ctx = gsap.context(() => {
      const bases = gsap.utils.toArray(svg.querySelectorAll('[data-base]'))
      bases.forEach((el) => { const len = el.getTotalLength(); gsap.set(el, { strokeDasharray: len, strokeDashoffset: len }) })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'center 40%', scrub: 0.6 },
      })
      tl.to(bases, { strokeDashoffset: 0, ease: 'none', duration: 0.7, stagger: { each: 0.025, from: 'random' } }, 0)
        .from(svg.querySelectorAll('[data-via]'), { opacity: 0, scale: 0, transformOrigin: 'center', duration: 0.15, stagger: 0.01 }, 0.55)
        .fromTo(chipBodyRef.current, { boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 0 0px rgba(99,102,241,0), inset 0 1px 0 rgba(255,255,255,0.05)' },
          { boxShadow: '0 0 0 1px rgba(129,140,248,0.28), 0 0 120px rgba(99,102,241,0.22), inset 0 1px 0 rgba(255,255,255,0.08)', duration: 0.25, ease: 'power2.out' }, 0.85)
        .fromTo(chipTitleRef.current, { color: '#ffffff', textShadow: '0 0 0px rgba(129,140,248,0)' },
          { color: '#e0e7ff', textShadow: '0 0 18px rgba(129,140,248,0.75), 0 0 42px rgba(99,102,241,0.35)', duration: 0.25, ease: 'power2.out' }, 0.85)
        .fromTo(chipLabelRef.current, { color: '#3f3f46' }, { color: '#a5b4fc', duration: 0.25 }, 0.85)
        .from(svg.querySelectorAll('[data-pulse]'), { autoAlpha: 0, duration: 0.15 }, 0.95)
    })
    return () => ctx.revert()
  }, [paths, decor])

  // Pause all tweens when section is scrolled out of view — biggest energy saving.
  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        allTweens.current.forEach(t => entry.isIntersecting ? t.resume() : t.pause())
      },
      { threshold: 0.05 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] py-32">
        {/* Pixel substrate, faded towards the edges */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 58% 50% at 50% 52%, black 25%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 58% 50% at 50% 52%, black 25%, transparent 100%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">

          {/* PCB board — pt-20 gives vertical room for upward decorative traces */}
          <div ref={containerRef} className="relative pt-20">

            {(paths.length > 0 || decor.length > 0) && (
              <svg
                ref={svgRef}
                className="absolute inset-0 pointer-events-none"
                width={svgDims.w}
                height={svgDims.h}
                style={{ zIndex: 1, overflow: 'visible' }}
              >
                {/* ── Decorative static traces ── */}
                {decor.map(({ d, circles, color, anim }, i) => (
                  <g key={`decor-${i}`}>
                    <path data-base d={d} fill="none" stroke={color} strokeWidth="1" />
                    {anim && (
                      <path
                        data-pulse
                        ref={el => { decorAnimRefs.current[i] = el }}
                        d={d} fill="none" stroke={anim}
                        strokeWidth="1.5" strokeOpacity="0.7"
                        strokeLinecap="round"
                      />
                    )}
                    {circles.map(([cx, cy], j) => (
                      <circle data-via key={j} cx={cx} cy={cy} r="3.5"
                        fill="none" stroke={color} strokeWidth="1" />
                    ))}
                  </g>
                ))}

                {/* ── Card → chip animated traces ── */}
                {paths.map(({ d, color }, i) => (
                  <g key={`path-${i}`}>
                    <path data-base data-card d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.08" />
                    {i % 3 === 0 && (
                      <path
                        data-pulse
                        ref={el => { pulseRefs.current[i] = el }}
                        d={d} fill="none" stroke={color}
                        strokeWidth="2" strokeOpacity="0.9"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                ))}
              </svg>
            )}

            {/* Central chip */}
            <div className="flex justify-center mb-16 relative" style={{ zIndex: 10 }}>
              <div ref={chipRef} className="select-none">

                <div className="flex justify-center gap-2">
                  <PIN direction="top" count={7} />
                </div>

                <div
                  ref={chipBodyRef}
                  className="relative px-14 py-8 rounded-xl border"
                  style={{
                    background:  'linear-gradient(150deg, #161616 0%, #0d0d0d 100%)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow:   '0 0 0 1px rgba(255,255,255,0.03), 0 0 80px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-[#1c1c1c] border border-zinc-800`}>
                      <div className="absolute inset-[3px] rounded-full border border-zinc-700/40" />
                    </div>
                  ))}

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col gap-2.5 pr-px">
                    <PIN direction="left" count={4} />
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-2.5 pl-px">
                    <PIN direction="right" count={4} />
                  </div>

                  <div className="text-center relative z-10">
                    <p ref={chipLabelRef} className="text-[9px] tracking-[0.38em] uppercase text-zinc-700 mb-2.5">Core Unit</p>
                    <p ref={chipTitleRef} className="text-[22px] font-light text-white" style={{ letterSpacing: '-0.025em' }}>
                      Tech Stack
                    </p>
                    <p className="text-[9px] text-zinc-600 mt-2 max-w-[160px] mx-auto leading-relaxed">
                      Der verwendete Tech Stack für dieses Portfolio Projekt.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <PIN direction="bottom" count={7} />
                </div>
              </div>
            </div>

            {/* Tech cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 relative" style={{ zIndex: 10 }}>
              {TECH.map(({ name, Icon, color, desc }, i) => (
                <div
                  key={name}
                  ref={el => { cardRefs.current[i] = el }}
                  className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 sm:py-3.5 text-center sm:text-left rounded-xl border bg-[#0d0d0d] hover:bg-[#111] transition-colors duration-200"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icon style={{ width: 18, height: 18, color, flexShrink: 0, opacity: 0.85 }} />
                  <div className="min-w-0">
                    <div className="text-[12px] sm:text-[13px] font-medium text-white leading-tight">{name}</div>
                    <div className="text-[9px] sm:text-[10px] text-zinc-600 tracking-[0.06em] sm:tracking-[0.15em] uppercase mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
