import { useEffect, useRef } from 'react'
import { gsap, finePointer, prefersReduced } from '../lib/motion'

// The pointer: a point of light, a thin ring held close around it, and behind it a trail that
// glows and fades like a long exposure — thick and bright where the pointer is, thinning and
// cooling off along the way it came. Over anything that can be clicked the ring closes in; where an
// element names what a click or a drag does (data-cursor="…"), the ring opens into a small label.
// Only with a mouse or trackpad.
const LIFE = 420 // ms a point of the trail lasts

export default function Cursor() {
  const dot = useRef(), ring = useRef(), label = useRef(), trailRef = useRef()
  useEffect(() => {
    if (!finePointer()) return
    document.documentElement.classList.add('own-cursor')
    const d = dot.current, r = ring.current, l = label.current, cv = trailRef.current, x = cv.getContext('2d')
    const still = prefersReduced()
    gsap.set(r, { xPercent: -50, yPercent: -50 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.05 }), dy = gsap.quickTo(d, 'y', { duration: 0.05 })
    const rx = gsap.quickTo(r, 'x', { duration: still ? 0 : 0.12, ease: 'power3.out' }), ry = gsap.quickTo(r, 'y', { duration: still ? 0 : 0.12, ease: 'power3.out' })
    let mode = ''
    const set = (m, text = '') => {
      if (m === mode && l.textContent === text) return
      mode = m; l.textContent = text
      gsap.to(r, { width: m === 'label' ? l.scrollWidth + 28 : m === 'link' ? 16 : 28, height: m === 'label' ? 30 : m === 'link' ? 16 : 28, duration: 0.35, ease: 'expo.out' })
      gsap.to(l, { opacity: m === 'label' ? 1 : 0, duration: 0.2 })
      gsap.to(d, { scale: m === 'label' ? 0 : 1, duration: 0.25 })
    }

    // the trail: the last positions, each with its time
    const pts = []
    let raf = 0
    const pr = Math.min(devicePixelRatio || 1, 2)
    const size = () => { cv.width = innerWidth * pr; cv.height = innerHeight * pr }
    size(); window.addEventListener('resize', size)
    const draw = () => {
      raf = 0
      const now = performance.now()
      while (pts.length && now - pts[0].t > LIFE) pts.shift()
      x.setTransform(pr, 0, 0, pr, 0, 0); x.clearRect(0, 0, innerWidth, innerHeight)
      if (pts.length > 2) {
        x.lineCap = 'round'; x.lineJoin = 'round'
        // two passes: a wide soft glow, then the bright core; each segment by its age
        for (const pass of [0, 1]) {
          for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1], b = pts[i], k = 1 - (now - b.t) / LIFE // 1 = fresh, 0 = gone
            if (k <= 0) continue
            const e = k * k
            x.beginPath(); x.moveTo((a.x + pts[Math.max(0, i - 2)].x) / 2, (a.y + pts[Math.max(0, i - 2)].y) / 2)
            x.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2)
            if (pass === 0) { x.strokeStyle = `rgba(190,205,255,${0.1 * e})`; x.lineWidth = 10 * e + 2 }
            else { x.strokeStyle = `rgba(255,255,255,${0.75 * e})`; x.lineWidth = 2.2 * e + 0.3 }
            x.stroke()
          }
        }
      }
      if (pts.length) raf = requestAnimationFrame(draw)
    }

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      d.style.opacity = r.style.opacity = '1'
      if (!still) { pts.push({ x: e.clientX, y: e.clientY, t: performance.now() }); if (!raf) raf = requestAnimationFrame(draw) }
      const t = e.target.closest?.('[data-cursor], a, button, [role=tab], label')
      if (t?.dataset.cursor) set('label', t.dataset.cursor)
      else if (t) set('link')
      else set('')
    }
    const leave = () => { d.style.opacity = r.style.opacity = '0' }
    const down = () => gsap.to(r, { scale: 0.8, duration: 0.12 }), up = () => gsap.to(r, { scale: 1, duration: 0.4, ease: 'expo.out' })
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down); window.addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('own-cursor')
      window.removeEventListener('resize', size)
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up)
    }
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <canvas ref={trailRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 mix-blend-difference">
        <span ref={ring} className="absolute left-0 top-0 w-[28px] h-[28px] grid place-items-center rounded-full border border-white/60 opacity-0">
          <span ref={label} className="whitespace-nowrap text-[12px] text-white opacity-0" />
        </span>
        <span ref={dot} className="absolute left-0 top-0 w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full bg-white shadow-[0_0_8px_2px_rgb(255_255_255/.6)] opacity-0" />
      </div>
    </div>
  )
}
