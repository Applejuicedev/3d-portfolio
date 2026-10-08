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

export default function HeroGrid() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const startTime = Date.now()

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const p = makeParticle(window.innerWidth, window.innerHeight)
      p.life = -i * 20
      return p
    })

    const resize = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const elapsed = Date.now() - startTime
      const dark = document.documentElement.classList.contains('dark')

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

      // ── Intersection crosses ──────────────────────────────────
      if (dark) {
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

      // ── Animated glow particles ───────────────────────────────
      if (dark) {
        const particleScale = Math.max(0, Math.min(1, (elapsed - PARTICLE_START) / PARTICLE_FADE))

        particles.forEach((p) => {
          p.life++
          if (p.life < 0) return

          p.x += p.vx
          p.y += p.vy
          if (p.x < -16) p.x = W + 16
          if (p.x > W + 16) p.x = -16
          if (p.y < -16) p.y = H + 16
          if (p.y > H + 16) p.y = -16

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

          if (p.life >= p.maxLife) {
            Object.assign(p, makeParticle(W, H))
            p.life = 0
            return
          }

          ctx.save()
          ctx.shadowBlur = 18
          ctx.shadowColor = `rgba(${p.rgb},${alpha * 0.75})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.rgb},${alpha})`
          ctx.fill()
          ctx.restore()

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.rgb},${alpha * 0.06})`
          ctx.fill()
        })
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    // Stop drawing while the hero is scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animId)
      if (entry.isIntersecting) draw()
    })
    io.observe(canvas)

    return () => { cancelAnimationFrame(animId); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
