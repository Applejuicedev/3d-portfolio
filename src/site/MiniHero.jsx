import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion'
import { shape } from '../body/shapes'
import { PERSON } from '../data/content'

// This site, as its own project card: the opening in miniature and alive — the planet being
// rendered (every sixth point of the real form, drawn on a small canvas, rocking as it does on the
// page), the name and the trade either side, the labels in the corners.
export default function MiniHero() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current, x = cv.getContext('2d'), src = shape('render'), pts = []
    for (let i = 0; i < src.length / 3; i += 6) pts.push([src[i * 3], src[i * 3 + 1], src[i * 3 + 2]])
    const ink = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-ink')})`
    let raf = 0, visible = true
    const t0 = performance.now(), still = prefersReduced()
    const draw = (now) => {
      raf = 0
      const W = cv.clientWidth, H = cv.clientHeight, pr = Math.min(devicePixelRatio || 1, 2)
      if (cv.width !== Math.round(W * pr)) { cv.width = Math.round(W * pr); cv.height = Math.round(H * pr) }
      x.setTransform(pr, 0, 0, pr, 0, 0); x.clearRect(0, 0, W, H); x.fillStyle = ink
      const t = still ? 0 : (now - t0) / 1000, a = Math.sin(t * 0.3) * 0.25, c = Math.cos(a), s = Math.sin(a), R = H * 0.3
      for (const [px, py, pz] of pts) {
        const X = px * c - pz * s, Z = px * s + pz * c, k = 4 / (4 - Z)
        x.globalAlpha = 0.25 + 0.6 * (Z + 1) / 2
        x.fillRect(W / 2 + X * R * k, H / 2 - py * R * k, 1.1, 1.1)
      }
      if (visible && !still) raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(draw) })
    io.observe(cv); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])
  return (
    <span aria-hidden className="absolute inset-0 bg-canvas text-ink">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <span className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[clamp(9px,1.05vw,13px)]">{PERSON.name}</span>
      <span className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[clamp(9px,1.05vw,13px)]">{PERSON.role}</span>
      <span className="absolute left-[5%] top-[6%] font-mono text-[clamp(6px,0.6vw,8px)] text-gray">VF — Portfolio {new Date().getFullYear()}</span>
      <span className="absolute left-1/2 -translate-x-1/2 top-[5%] h-[6%] px-[2.5%] grid place-items-center rounded-full border border-ink/20 text-[clamp(6px,0.65vw,9px)]">● Contact</span>
      <span className="absolute right-[5%] top-[6%] font-mono text-[clamp(6px,0.6vw,8px)] text-gray">Frankfurt, Germany</span>
      <span className="absolute right-[5%] bottom-[6%] font-mono text-[clamp(6px,0.6vw,8px)]">Résumé ↗</span>
    </span>
  )
}
