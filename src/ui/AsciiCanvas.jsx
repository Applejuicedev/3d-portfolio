import { useEffect, useRef } from 'react'
import { createRenderer, knot, RAMPS, stats } from '../lib/ascii'
import { prefersReduced } from '../lib/motion'

const MESH = knot()
const COLORS = { ink: '#eeede8', dim: '#5e5d58', accent: '#d4ff3a' }

// The knot, drawn by the ASCII rasterizer into a canvas that fills its parent.
// · turns by itself; the pointer tilts it (eased) and, where it touches the surface, the glyphs
//   turn into code in lime; scrolling adds a little spin
// · resolves out of noise once (boot) when it first appears
// · draws only while on screen and the tab is visible; with reduced motion one still frame
// `params` (a ref) lets the lab change ramp, light and font size live; `report` writes the hero's
// numbers into the shared stats.
export default function AsciiCanvas({ fontSize = 12, zoom = 0.92, boot = true, params, report = false, className = '', label }) {
  const ref = useRef(), wrapRef = useRef()

  useEffect(() => {
    const canvas = ref.current, wrap = wrapRef.current
    const r = createRenderer(canvas, MESH)
    const still = prefersReduced()
    let fs = params?.current.fontSize ?? fontSize
    let ready = false, visible = false, raf = 0, t0 = performance.now(), last = t0, frames = 0, fpsT = t0
    let ax = -0.5, ay = 0.3, az = 0, tiltX = 0, tiltY = 0, spin = 0, bootP = boot && !still ? 0 : 1
    let px = null, py = null, scrollY = window.scrollY

    const size = () => {
      const b = wrap.getBoundingClientRect()
      r.resize(b.width, b.height, fs)
      if (report) { const g = r.grid; stats.cols = g.cols; stats.rows = g.rows; stats.points = MESH.count }
    }
    const draw = (now) => {
      const t = (now - t0) / 1000
      const p = params?.current
      if (p && p.fontSize !== fs) { fs = p.fontSize; size() }
      const lit = r.frame({
        ax: ax + tiltX, ay: ay + tiltY, az,
        light: p?.light ?? [-0.6, 0.8, 0.9], ramp: RAMPS[p?.ramp ?? 'standard'], zoom,
        boot: bootP, px, py, radius: 7, t, ...COLORS,
      })
      if (report) stats.cells = lit
    }
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      ay += dt * (0.32 + spin); ax += dt * 0.11; az += dt * 0.05
      spin *= 0.94
      // the pointer tilts the whole knot a little towards itself
      const b = wrap.getBoundingClientRect()
      const tx = px == null ? 0 : ((px / b.width) - 0.5) * 0.9, ty = py == null ? 0 : ((py / b.height) - 0.5) * 0.6
      tiltY += (tx - tiltY) * 0.06; tiltX += (ty - tiltX) * 0.06
      if (bootP < 1) bootP = Math.min(1, bootP + dt / 1.6)
      draw(now)
      frames++
      if (report && now - fpsT > 500) { stats.fps = Math.round((frames * 1000) / (now - fpsT)); frames = 0; fpsT = now }
    }
    const start = () => { if (ready && !raf && visible && !document.hidden && !still) { last = performance.now(); raf = requestAnimationFrame(loop) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() })
    io.observe(wrap)
    const ro = new ResizeObserver(() => { size(); if (!raf) draw(performance.now()) })
    // nothing is drawn before the canvas has its size (the observer above may fire first)
    const onVis = () => (document.hidden ? stop() : start())
    const move = (e) => { const b = wrap.getBoundingClientRect(); px = e.clientX - b.left; py = e.clientY - b.top }
    const leave = () => { px = py = null }
    const onScroll = () => { const y = window.scrollY; spin = Math.min(3, spin + Math.abs(y - scrollY) * 0.004); scrollY = y }

    // with reduced motion there is no loop: a still frame, redrawn when the lab changes a parameter
    let poll, seen = JSON.stringify(params?.current)
    if (still && params) poll = setInterval(() => { const k = JSON.stringify(params.current); if (k !== seen) { seen = k; draw(performance.now()) } }, 150)
    document.fonts.ready.then(() => {
      size(); ready = true; ro.observe(wrap); draw(performance.now()); start()
    })
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      stop(); io.disconnect(); ro.disconnect(); clearInterval(poll)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [fontSize, zoom, boot, params, report])

  return (
    <div ref={wrapRef} className={/\babsolute\b/.test(className) ? className : `relative ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
