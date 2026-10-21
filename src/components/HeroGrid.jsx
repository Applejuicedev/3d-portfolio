import { useRef, useEffect } from 'react'

const CELL = 48
const PARTICLE_COUNT = 14

// Sequential build-up timing (ms)
const COL_START = 0,   COL_END = 900
const ROW_START = 100, ROW_END = 1050
const CROSS_START = 500, CROSS_FADE = 600
const RING_START  = 700, RING_FADE  = 600
const PARTICLE_START = 800, PARTICLE_FADE = 800
const LINE_FADE = 340 // each line fades in over this many ms
// After this the static grid is fully built and never needs redrawing
const INTRO_END = Math.max(COL_END, ROW_END) + LINE_FADE + 50

function easeOut2(t) { return 1 - (1 - t) * (1 - t) }

function makeParticle(W, H) {
  const col = Math.floor(Math.random() * Math.floor(W / CELL))
  const row = Math.floor(Math.random() * Math.floor(H / CELL))
  return {
    x: col * CELL + (Math.random() - 0.5) * 6,
    y: row * CELL + (Math.random() - 0.5) * 6,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    targetOpacity: 0.35 + Math.random() * 0.5,
    size: 1.5 + Math.random() * 2,
    life: 0,
    maxLife: 220 + Math.random() * 280,
    rgb: Math.random() > 0.35 ? '59,130,246' : '99,102,241',
  }
}

// Glow sprite per colour/size, rendered once with the same shadowBlur look and then
// stamped with globalAlpha — shadowBlur per particle per frame was the main cost
const spriteCache = new Map()
function glowSprite(rgb, size, dpr) {
  const key = `${rgb}|${size.toFixed(1)}|${dpr}`
  let sprite = spriteCache.get(key)
  if (sprite) return sprite
  const r = Math.ceil(Math.max(size * 5, size + 18) + 2) // CSS px
  const c = document.createElement('canvas')
  c.width = c.height = Math.ceil(r * 2 * dpr)
  const ctx = c.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.shadowBlur = 18
  ctx.shadowColor = `rgba(${rgb},0.75)`
  ctx.beginPath(); ctx.arc(r, r, size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${rgb},1)`; ctx.fill()
  ctx.shadowColor = 'transparent'
  ctx.beginPath(); ctx.arc(r, r, size * 5, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${rgb},0.06)`; ctx.fill()
  sprite = { canvas: c, r }
  spriteCache.set(key, sprite)
  return sprite
}

function drawStatic(ctx, W, H, elapsed, dark) {
  ctx.clearRect(0, 0, W, H)

  // ── Vertical lines (column by column, left → right) ──────
  const totalCols = Math.ceil(W / CELL) + 1
  const baseLineAlpha = dark ? 0.055 : 0.042
  ctx.lineWidth = 0.5

  for (let c = 0; c <= totalCols; c++) {
    const revealAt = COL_START + (c / totalCols) * (COL_END - COL_START)
    const p = easeOut2(Math.max(0, Math.min(1, (elapsed - revealAt) / LINE_FADE)))
    if (p <= 0) continue
    ctx.strokeStyle = dark
      ? `rgba(255,255,255,${baseLineAlpha * p})`
      : `rgba(0,0,0,${baseLineAlpha * p})`
    ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke()
  }

  // ── Horizontal lines (row by row, top → bottom) ──────────
  const totalRows = Math.ceil(H / CELL) + 1

  for (let r = 0; r <= totalRows; r++) {
    const revealAt = ROW_START + (r / totalRows) * (ROW_END - ROW_START)
    const p = easeOut2(Math.max(0, Math.min(1, (elapsed - revealAt) / LINE_FADE)))
    if (p <= 0) continue
    ctx.strokeStyle = dark
      ? `rgba(255,255,255,${baseLineAlpha * p})`
      : `rgba(0,0,0,${baseLineAlpha * p})`
    ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke()
  }

  if (!dark) return

  // ── Intersection crosses ──────────────────────────────────
  const crossP = easeOut2(Math.max(0, Math.min(1, (elapsed - CROSS_START) / CROSS_FADE)))
  if (crossP > 0) {
    ctx.strokeStyle = `rgba(148,163,184,${0.15 * crossP})`
    ctx.lineWidth = 0.75
    for (let x = CELL; x < W; x += CELL * 3) {
      for (let y = CELL; y < H; y += CELL * 3) {
        const s = 3.5
        ctx.beginPath()
        ctx.moveTo(x - s, y); ctx.lineTo(x + s, y)
        ctx.moveTo(x, y - s); ctx.lineTo(x, y + s)
        ctx.stroke()
      }
    }
  }

  // ── Concentric rings ──────────────────────────────────
  const ringP = easeOut2(Math.max(0, Math.min(1, (elapsed - RING_START) / RING_FADE)))
  if (ringP > 0) {
    ctx.lineWidth = 0.5
    for (let x = CELL * 3; x < W; x += CELL * 9) {
      for (let y = CELL * 3; y < H; y += CELL * 9) {
        ctx.strokeStyle = `rgba(99,102,241,${0.08 * ringP})`
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.stroke()
        ctx.strokeStyle = `rgba(99,102,241,${0.04 * ringP})`
        ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2); ctx.stroke()
      }
    }
  }
}

// The grid is static after its build-up, so it lives on its own canvas that is only
// redrawn during the intro, on resize or on theme change. Only the particles animate.
export default function HeroGrid() {
  const gridRef = useRef()
  const fxRef   = useRef()

  useEffect(() => {
    const grid = gridRef.current
    const fx = fxRef.current
    if (!grid || !fx) return
    const gctx = grid.getContext('2d')
    const fctx = fx.getContext('2d')
    let animId
    let W = 0, H = 0, dpr = 1
    let staticDone = false
    let lastDark = null
    let lastT = performance.now()
    const startTime = Date.now()

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const p = makeParticle(window.innerWidth, window.innerHeight)
      p.life = -i * 20
      p.prev = null // last drawn rect, cleared next frame
      return p
    })

    const resize = () => {
      W = grid.offsetWidth
      H = grid.offsetHeight
      dpr = window.devicePixelRatio || 1
      for (const [c, ctx] of [[grid, gctx], [fx, fctx]]) {
        c.width = W * dpr
        c.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      particles.forEach(p => { p.prev = null })
      staticDone = false
    }
    const ro = new ResizeObserver(resize)
    ro.observe(grid)
    resize()

    const draw = (now) => {
      // Frame-rate independent: one step = one 60 fps frame, same speed at 120 Hz
      const step = Math.min((now - lastT) / (1000 / 60), 6)
      lastT = now
      const elapsed = Date.now() - startTime
      const dark = document.documentElement.classList.contains('dark')

      if (dark !== lastDark) { lastDark = dark; staticDone = false }
      if (!staticDone) {
        drawStatic(gctx, W, H, elapsed, dark)
        staticDone = elapsed > INTRO_END
      }

      // Clear only where particles were drawn last frame
      for (const p of particles) {
        if (p.prev) fctx.clearRect(p.prev[0], p.prev[1], p.prev[2], p.prev[2])
        p.prev = null
      }

      // ── Animated glow particles ───────────────────────────────
      if (dark) {
        const particleScale = Math.max(0, Math.min(1, (elapsed - PARTICLE_START) / PARTICLE_FADE))

        for (const p of particles) {
          p.life += step
          if (p.life < 0) continue

          p.x += p.vx * step
          p.y += p.vy * step
          if (p.x < -16) p.x = W + 16
          if (p.x > W + 16) p.x = -16
          if (p.y < -16) p.y = H + 16
          if (p.y > H + 16) p.y = -16

          if (p.life >= p.maxLife) {
            Object.assign(p, makeParticle(W, H))
            p.life = 0
            continue
          }

          const ratio = p.life / p.maxLife
          let alpha = 0
          if (ratio < 0.18) {
            alpha = (ratio / 0.18) * p.targetOpacity
          } else if (ratio < 0.78) {
            alpha = p.targetOpacity * (0.65 + 0.35 * Math.sin(ratio * Math.PI * 3.5))
          } else {
            alpha = ((1 - ratio) / 0.22) * p.targetOpacity
          }
          alpha *= particleScale
          if (alpha <= 0.002) continue

          const { canvas, r } = glowSprite(p.rgb, p.size, dpr)
          fctx.globalAlpha = alpha
          fctx.drawImage(canvas, p.x - r, p.y - r, r * 2, r * 2)
          p.prev = [Math.floor(p.x - r) - 1, Math.floor(p.y - r) - 1, Math.ceil(r * 2) + 3]
        }
        fctx.globalAlpha = 1
      }

      animId = requestAnimationFrame(draw)
    }

    const start = () => { lastT = performance.now(); animId = requestAnimationFrame(draw) }
    start()

    // Stop drawing while the hero is scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animId)
      if (entry.isIntersecting) start()
    })
    io.observe(grid)

    return () => { cancelAnimationFrame(animId); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <>
      <canvas
        ref={gridRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <canvas
        ref={fxRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </>
  )
}
