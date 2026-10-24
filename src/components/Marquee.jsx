import { useEffect, useRef } from 'react'
import {
  SiTypescript, SiSwift, SiPython, SiHtml5, SiReact, SiNextdotjs, SiExpo, SiNodedotjs, SiFigma,
  SiGreensock, SiFramer, SiThreedotjs, SiBlender, SiGithub, SiVite, SiTailwindcss, SiXcode, SiDocker,
  SiAnthropic, SiClaude, SiPerplexity,
} from 'react-icons/si'
import { gsap, prefersReduced } from './motion'

// The tool slideshow from the first version of the site, back as a quiet band at the end of the
// stack: two rows of the same tools as the list above (that list stays the readable, accessible
// version — this is decoration, aria-hidden), drifting slowly in opposite directions.
// · It answers the scroll: the faster the page moves, the faster the rows run, and scrolling up
//   turns them around; afterwards they ease back to their slow drift.
// · Hovering the band brings both rows to a soft stop (to read a badge), leaving lets them go on.
// · It only runs while on screen; with reduced motion it stands still.
// Moved with transforms on one ticker, positions wrap seamlessly (each row is rendered three times).
const ICONS = {
  TypeScript: SiTypescript, Swift: SiSwift, Python: SiPython, 'HTML & CSS': SiHtml5, React: SiReact,
  'Next.js': SiNextdotjs, 'React Native · Expo': SiExpo, SwiftUI: SiSwift, 'Node.js': SiNodedotjs,
  Figma: SiFigma, GSAP: SiGreensock, 'Framer Motion': SiFramer, 'Three.js': SiThreedotjs, Blender: SiBlender,
  'Git · GitHub': SiGithub, Vite: SiVite, 'Tailwind CSS': SiTailwindcss, Xcode: SiXcode, Docker: SiDocker,
  'Claude Code': SiAnthropic, Claude: SiClaude, Perplexity: SiPerplexity,
}
const BASE = 22 // px/s at rest

function Row({ items, rowRef }) {
  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex w-max gap-3 will-change-transform">
        {[0, 1, 2].map((k) => (
          <div key={k} data-set={k} className="flex gap-3 pr-3">
            {items.map((t) => {
              const Icon = ICONS[t]
              return (
                <span key={t} className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-4 py-2 text-[13px] tracking-tight text-muted">
                  {Icon && <Icon size={15} className="opacity-70 shrink-0" />}{t}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee({ items }) {
  const ref = useRef(), a = useRef(), b = useRef()
  const half = Math.ceil(items.length / 2)
  const rowA = items.slice(0, half), rowB = items.slice(half)

  useEffect(() => {
    if (prefersReduced()) return
    const el = ref.current
    const rows = [{ el: a.current, dir: -1, x: 0 }, { el: b.current, dir: 1, x: 0 }]
    const width = (r) => r.el.querySelector('[data-set]').offsetWidth
    rows.forEach((r) => { r.w = width(r); r.x = r.dir > 0 ? -r.w : 0 })
    let running = false, hold = 1, holdTo = 1, boost = 0, lastY = window.scrollY, lastT = performance.now()
    const tick = () => {
      const now = performance.now(), dt = Math.min(0.05, (now - lastT) / 1000); lastT = now
      // the scroll's speed (px/s, signed) pushes the rows; it fades out over ~0.4 s
      const v = (window.scrollY - lastY) / Math.max(dt, 0.001); lastY = window.scrollY
      boost += (Math.max(-900, Math.min(900, v * 0.35)) - boost) * (1 - Math.exp(-dt / 0.12))
      boost *= Math.exp(-dt / 0.4)
      hold += (holdTo - hold) * (1 - Math.exp(-dt / 0.18)) // soft stop / start on hover
      for (const r of rows) {
        r.x += r.dir * (BASE + boost) * hold * dt
        if (r.x < -r.w) r.x += r.w
        if (r.x > 0) r.x -= r.w
        r.el.style.transform = `translate3d(${r.x}px,0,0)`
      }
    }
    const start = () => { if (!running) { running = true; lastT = performance.now(); lastY = window.scrollY; gsap.ticker.add(tick) } }
    const stop = () => { if (running) { running = false; gsap.ticker.remove(tick) } }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    io.observe(el)
    const enter = () => { holdTo = 0 }, leave = () => { holdTo = 1 }
    el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave)
    const onResize = () => rows.forEach((r) => { r.w = width(r) })
    window.addEventListener('resize', onResize)
    document.fonts.ready.then(onResize)
    return () => { stop(); io.disconnect(); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    // full width of the window, the ends fading into the page
    <div ref={ref} aria-hidden className="relative left-1/2 -translate-x-1/2 w-screen flex flex-col gap-3 py-2 select-none [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <Row items={rowA} rowRef={a} />
      <Row items={rowB} rowRef={b} />
    </div>
  )
}
