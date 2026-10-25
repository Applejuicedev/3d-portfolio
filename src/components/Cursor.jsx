import { useEffect, useRef, useState } from 'react'
import { finePointer, prefersReduced } from './motion'

// The site's cursor. On a mouse/trackpad it replaces the system cursor and says what is under it:
// a fine signal crosshair by default, a ring over anything clickable, a text caret over running text,
// a "demo" tag over the product videos; it gives a little on press. It sits exactly on the pointer
// (no trailing). The system cursor is only hidden once this one is actually drawing (html
// .custom-cursor, see index.css), stays for text inputs, and comes back if anything goes wrong.
// Touch devices and reduced motion keep the native cursor and never mount this.
//
// The track: a short, thin signal line behind the pointer on its own canvas, drawn as a smooth
// Catmull-Rom curve through the recent pointer samples (as cubic Béziers), tapering and fading
// towards its tail. A point lives longer the faster the pointer moved when it was recorded, so a
// quick flick leaves a longer arc and slow movement only a short tick. Samples closer than 2 px
// are skipped and at most MAX_PTS are kept. Drawn in a rAF that only runs while there is a trail,
// so a resting pointer costs nothing; no React state is touched per frame.
const TRAIL_MS = 150, TRAIL_FAST_MS = 300, MAX_PTS = 48
const modeFor = (t) => (t.closest?.('input, textarea, select, [contenteditable="true"]') ? 'native'
  : t.closest?.('video, [data-cursor="demo"]') ? 'demo'
  : t.closest?.('a, button, [role="button"], label, summary') ? 'ring'
  : t.closest?.('p, dd, li, h1, h2, h3, span') ? 'text' : 'dot')

export default function Cursor() {
  const ref = useRef(), trailRef = useRef()
  const [on] = useState(() => finePointer() && !prefersReduced())
  const [mode, setMode] = useState('dot')
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!on) return
    const root = document.documentElement
    const el = ref.current
    let x = -100, y = -100, raf = 0, visible = false, trailing = true
    const draw = () => { raf = 0; el.style.transform = `translate3d(${x}px, ${y}px, 0)` }

    // track canvas, sized to the window at device resolution
    const cv = trailRef.current, g = cv.getContext('2d')
    let dpr = 1
    const size = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0) }
    size()
    const pts = []
    let traf = 0
    // life left of a point, 1 → 0 (ease-out, so the tail fades softly instead of snapping off)
    const life = (p, now) => { const k = Math.max(0, 1 - (now - p.t) / p.life); return k * k * (3 - 2 * k) }
    const trail = (now) => {
      traf = 0
      while (pts.length && now - pts[0].t > pts[0].life) pts.shift()
      g.clearRect(0, 0, innerWidth, innerHeight)
      g.lineCap = 'round'
      const n = pts.length
      for (let i = 1; i < n; i++) {
        // Catmull-Rom segment p1→p2 as a cubic Bézier (neighbours p0, p3 clamped at the ends)
        const p0 = pts[i - 2] || pts[i - 1], p1 = pts[i - 1], p2 = pts[i], p3 = pts[i + 1] || p2
        const k = Math.min(life(p1, now), life(p2, now)) * (i / n) // fades with age, tapers to the tail
        if (k < 0.02) continue
        g.strokeStyle = `rgba(255, 91, 31, ${0.6 * k})`
        g.lineWidth = 0.4 + 1.5 * k
        g.beginPath(); g.moveTo(p1.x, p1.y)
        g.bezierCurveTo(p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6, p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6, p2.x, p2.y)
        g.stroke()
      }
      if (pts.length) traf = requestAnimationFrame(trail)
    }
    // samples are eased towards the pointer by elapsed time (not per frame): the same smoothing at
    // 60 and 120 Hz, and the jitter of single pointer events disappears
    let sm = null
    const record = (rx, ry, t = performance.now()) => {
      if (!sm || t - sm.t > 120) sm = { x: rx, y: ry, t }
      const k = 1 - Math.exp(-Math.max(1, t - sm.t) / 4)
      sm = { x: sm.x + (rx - sm.x) * k, y: sm.y + (ry - sm.y) * k, t }
      const px = sm.x, py = sm.y
      const now = performance.now(), last = pts[pts.length - 1]
      if (last && Math.hypot(px - last.x, py - last.y) < 2) return
      // speed in px/ms → longer life for fast movement
      const v = last ? Math.hypot(px - last.x, py - last.y) / Math.max(8, now - last.t) : 0
      pts.push({ x: px, y: py, t: now, life: TRAIL_MS + Math.min(1, v / 3) * (TRAIL_FAST_MS - TRAIL_MS) })
      if (pts.length > MAX_PTS) pts.shift()
      if (!traf) traf = requestAnimationFrame(trail)
    }
    const show = (v) => { visible = v; el.style.opacity = v ? '1' : '0'; root.classList.toggle('custom-cursor', v) }
    // as close to the hardware pointer as a drawn cursor gets: written at once (not on the next
    // frame), from the browser's predicted position where it offers one (it estimates where the
    // pointer will be when the frame shows), and from pointerrawupdate where available — those
    // arrive as soon as the hardware reports, not batched to the frame
    const place = (e) => {
      const pr = e.getPredictedEvents?.()
      const p = pr && pr.length ? pr[pr.length - 1] : e
      x = p.clientX; y = p.clientY
      draw()
    }
    const raw = (e) => { if (visible) place(e) }
    const move = (e) => {
      try {
        place(e)
        if (!visible) show(true)
        const m = modeFor(e.target)
        setMode(m)
        trailing = m !== 'native'
        if (trailing) {
          // coalesced events: every sample the hardware delivered, so fast curves stay round
          const evs = e.getCoalescedEvents?.() || []
          if (evs.length > 1) evs.forEach((c) => record(c.clientX, c.clientY, c.timeStamp)); else record(x, y, e.timeStamp)
        } else pts.length = 0
      } catch { show(false) }
    }
    const leave = () => { show(false); pts.length = 0 }
    window.addEventListener('resize', size)
    const press = () => setDown(true), release = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    if ('onpointerrawupdate' in window) window.addEventListener('pointerrawupdate', raw, { passive: true })
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    root.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    return () => {
      cancelAnimationFrame(raf); cancelAnimationFrame(traf)
      window.removeEventListener('resize', size)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerrawupdate', raw)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      root.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
      root.classList.remove('custom-cursor')
    }
  }, [on])

  if (!on) return null
  const shape = {
    dot: 'w-[19px] h-[19px] cursor-cross',
    ring: 'w-10 h-10 rounded-full border-[1.5px] border-signal bg-signal/[0.08]',
    text: 'w-[2px] h-[1.35rem] bg-signal',
    demo: 'h-6 px-2.5 rounded-full bg-signal',
    native: 'w-0 h-0 opacity-0',
  }[mode]
  return (
    <>
    <canvas ref={trailRef} aria-hidden data-cursor-ui className="fixed inset-0 w-screen h-screen z-[209] pointer-events-none" />
    <div ref={ref} aria-hidden data-cursor-ui className="fixed left-0 top-0 z-[210] pointer-events-none opacity-0 transition-opacity duration-150">
      <div className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center transition-[width,height,background-color,border-color,transform] duration-200 ease-sys ${shape} ${down ? 'scale-75' : ''}`}>
        {mode === 'demo' && <span className="font-mono text-[10.5px] text-bg whitespace-nowrap">demo</span>}
      </div>
    </div>
    </>
  )
}
