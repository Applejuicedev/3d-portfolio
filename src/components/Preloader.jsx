import { useEffect, useRef, useState } from 'react'
import { bustSettled, stage } from './hero/stage'
import { prefersReduced } from './motion'

// ── Preloader ───────────────────────────────────────────────────
// The first seconds are the heaviest: fonts, the bust's points (worker), its renderer and shader,
// the grain tiles, and every section preparing its reveals. Run under the hero's entrance, that
// work made it stutter. So the page waits, and the particles are the loading screen: while
// html[data-preloading] is set, everything but the bust's canvas and this portal is hidden
// (index.css). The portal opens where the bust will stand and shows how far the page is; the
// points stream out of it as it fills (stage.emit → the bust's shader) and gather as a loose
// cloud. At 100 % the portal closes, the page appears, and the cloud condenses into the bust.
// · All gsap motion waits: main.jsx pauses gsap's global timeline before anything mounts, and
//   this lets it go at the end — the hero's timeline, the typer, the bust's assembly all start
//   from their beginning then. The portal itself moves without gsap (rAF + CSS).
// · It waits for the fonts and the bust (compiled, or given up), at least MIN, at most MAX; the
//   points come out at most RATE per second, so even a fast load shows them streaming.
// · With reduced motion it is not there at all (nothing is paused or hidden then).
const MIN = 1200, MAX = 5000, RATE = 0.75
export const preloading = () => !prefersReduced()

export default function Preloader({ onRelease }) {
  const [phase, setPhase] = useState(preloading() ? 'load' : 'gone')
  const portalRef = useRef(), pctRef = useRef(), countRef = useRef()

  useEffect(() => {
    if (phase !== 'load') return
    const root = document.documentElement
    root.setAttribute('data-preloading', '')
    root.style.overflow = 'hidden'
    let fonts = false, bust = false, raf = 0, alive = true, last = performance.now()
    const pos = { x: innerWidth * 0.72, y: innerHeight * 0.48 }
    document.fonts.ready.then(() => { fonts = true })
    bustSettled.then(() => { bust = true })
    const t0 = last
    stage.emit = 0
    const step = (now) => {
      const t = now - t0, dt = Math.min(0.05, (now - last) / 1000); last = now
      // how far the work allows, never ahead of the time
      const work = 0.2 + (fonts ? 0.3 : 0) + (bust ? 0.5 : 0)
      const target = t > MAX || (bust && !stage.ready) ? 1 : Math.min(work, t / MIN)
      // the points leave the portal once the bust can draw them (or at once without WebGL)
      if (stage.ready || (bust && t > 300)) stage.emit = Math.min(target, stage.emit + RATE * dt)
      const pct = Math.floor(stage.emit * 100)
      pctRef.current.textContent = `${pct}%`
      countRef.current.textContent = `${Math.round(stage.emit * (stage.count || 64000)).toLocaleString('de-DE')} Partikel`
      // the portal sits on the bust's origin once it is on screen
      const o = stage.screen?.origin
      if (o) { const k = 1 - Math.exp(-dt / 0.12); pos.x += (o.x - pos.x) * k; pos.y += (o.y - pos.y) * k }
      portalRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (stage.emit < 1) { raf = requestAnimationFrame(step); return }
      setTimeout(() => {
        if (!alive) return
        root.removeAttribute('data-preloading')
        root.style.overflow = ''
        setPhase('out')
        onRelease?.()
      }, 350)
    }
    raf = requestAnimationFrame(step)
    return () => { alive = false; cancelAnimationFrame(raf); stage.emit = 1; root.removeAttribute('data-preloading'); root.style.overflow = '' }
  }, [phase, onRelease])

  if (phase === 'gone') return null
  const out = phase === 'out'
  return (
    <div data-preloader role="status" aria-label="Seite lädt" className="fixed inset-0 z-[200] pointer-events-none select-none">
      <div ref={portalRef} className="absolute left-0 top-0 will-change-transform">
        <div onTransitionEnd={(e) => { if (out && e.propertyName === 'opacity') setPhase('gone') }}
          className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center"
          style={{ opacity: out ? 0 : 1, scale: out ? '0.15' : '1', transition: 'opacity .7s ease, scale .8s cubic-bezier(.7,0,.2,1)' }}>
          {/* the portal: a glowing ring with a slowly turning dashed ring around it */}
          <div className="relative w-[136px] h-[136px] rounded-full border border-signal/70 grid place-items-center"
            style={{ background: 'radial-gradient(circle, rgb(255 91 31 / .22) 0%, rgb(255 91 31 / .06) 45%, transparent 70%)', boxShadow: 'inset 0 0 28px rgb(255 91 31 / .35), 0 0 48px rgb(255 91 31 / .22)' }}>
            <div className="absolute inset-[-12px] rounded-full border border-dashed border-signal/35 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[10px] rounded-full border border-signal/20 animate-[spin_6s_linear_infinite_reverse]" style={{ borderTopColor: 'rgb(255 91 31 / .8)' }} />
            <span ref={pctRef} className="text-[28px] tracking-tight text-ink tabular-nums">0%</span>
          </div>
          <span ref={countRef} className="t-meta mt-6 whitespace-nowrap">0 Partikel</span>
        </div>
      </div>
    </div>
  )
}
