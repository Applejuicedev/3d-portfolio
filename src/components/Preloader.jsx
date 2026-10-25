import { useEffect, useRef, useState } from 'react'
import { bustSettled, stage } from './hero/stage'
import { prefersReduced } from './motion'

// ── Preloader ───────────────────────────────────────────────────
// The first seconds are the heaviest: fonts, the bust's points (worker), its renderer and shader,
// the grain tiles, and every section preparing its reveals. Run under the hero's entrance, that
// work made it stutter. So the page waits, and loading is shown as what it is: a large percentage
// top left, and a console in the corner logs each step as it really finishes (fonts, points,
// shader). Behind it the particles are a sky of stars over the whole screen; at 100 % they fly
// together into the bust where it will stand (stage.emit → the bust's shader).
// While html[data-preloading] is set, everything else is hidden (index.css) but the cursor.
// At 100 % the console goes, the page appears around the finished bust.
// · All gsap motion waits: main.jsx pauses gsap's global timeline before anything mounts, and
//   this lets it go at the end — the hero's timeline, the typer, the workflow all start from
//   their beginning then. The console itself updates without gsap (rAF).
// · Two phases. Loading: the percentage runs with the work (fonts, points, shader, first frame),
//   at least MIN, at most MAX; the stars only twinkle. Forming, from 100 %: the console steps
//   aside, and the stars fly into the bust over FORM — slowly at first, then ever faster (ease-in),
//   so the shape doesn't appear at once; the page comes in once it stands.
// · With reduced motion it is not there at all (nothing is paused or hidden then).
const MIN = 1200, MAX = 5000, FORM = 2600, BAR = 22
export const preloading = () => !prefersReduced()
const pad = (s) => s.padEnd(8, ' ')

export default function Preloader({ onRelease }) {
  const [phase, setPhase] = useState(preloading() ? 'load' : 'gone')
  // the console's rows stand from the start (pending, dimmed) and turn done in place — it never
  // grows line by line, so nothing in it moves
  const [done, setDone] = useState({})
  const barRef = useRef(), doneRef = useRef(), pctRef = useRef(), stateRef = useRef()

  useEffect(() => {
    if (!preloading()) return
    const root = document.documentElement
    root.setAttribute('data-preloading', '')
    // the scroll is held by catching its inputs, not by overflow: hidden — that took the scrollbar
    // away and gave it back at the end, the page's width changed, and everything (the formed bust
    // too) jumped sideways
    const KEYS = new Set([' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp'])
    const hold = (e) => { if (e.type !== 'keydown' || KEYS.has(e.key)) e.preventDefault() }
    const opts = { passive: false }
    window.addEventListener('wheel', hold, opts); window.addEventListener('touchmove', hold, opts); window.addEventListener('keydown', hold)
    const unhold = () => { window.removeEventListener('wheel', hold, opts); window.removeEventListener('touchmove', hold, opts); window.removeEventListener('keydown', hold) }
    let raf = 0, alive = true, bust = false, shown = 0, formFrom = 0, released = false
    const t0 = performance.now(), seen = new Set()
    const add = (key, v = 'ok') => { if (!seen.has(key)) { seen.add(key); setDone((d) => ({ ...d, [key]: v })) } }
    document.fonts.ready.then(() => alive && add('fonts'))
    bustSettled.then(() => { bust = true })
    stage.emit = 0
    const release = () => {
      if (released) return
      released = true
      root.removeAttribute('data-preloading')
      unhold()
      onRelease?.()
    }
    const step = (now) => {
      const t = now - t0
      if (formFrom) {
        // ── forming: the stars fly into the bust, a few at first, then ever more (ease-in) ──
        const k = Math.min(1, (now - formFrom) / FORM)
        stage.emit = Math.pow(k, 1.8)
        // the page comes in once the bust stands — not while the points are still flying, where
        // the work of showing it would break their motion
        if (k < 1) raf = requestAnimationFrame(step); else setTimeout(release, 120)
        return
      }
      // ── loading: 0 → 100 % as the work really finishes (never ahead of the time) ──
      if (stage.sampled) add('points')
      if (stage.compiled) add('shader')
      const noGL = bust && !stage.compiled && !stage.ready
      if (noGL) add('shader', 'none')
      const work = 0.1 + (seen.has('fonts') ? 0.2 : 0) + (stage.sampled ? 0.25 : 0) + (stage.ready || stage.compiled || noGL ? 0.45 : 0)
      const target = t > MAX ? 1 : Math.min(work, t / MIN)
      shown += (target - shown) * 0.1
      if (target === 1 && shown > 0.995) shown = 1
      const pct = Math.floor(shown * 100)
      pctRef.current.textContent = String(pct)
      const n = Math.round(shown * BAR)
      barRef.current.textContent = `[${'█'.repeat(n)}${'░'.repeat(BAR - n)}] ${String(pct).padStart(3, '\u00a0')}%`
      if (shown < 1) { raf = requestAnimationFrame(step); return }
      // 100 %: the console says so, steps aside, and only then do the stars begin to move
      stateRef.current.textContent = 'bereit'
      doneRef.current.textContent = `bereit in ${(t / 1000).toFixed(2)} s`
      setTimeout(() => {
        if (!alive) return
        setPhase('out')
        // nothing to form without WebGL, or when the page opens further down (a deep link)
        if (!stage.compiled || window.scrollY > innerHeight * 0.5) { stage.emit = 1; release(); return }
        formFrom = performance.now(); raf = requestAnimationFrame(step)
      }, 500)
    }
    raf = requestAnimationFrame(step)
    // only stops this run's loop: React's StrictMode (dev) runs the effect twice, and releasing
    // here let the page's motion go under the preloader — the hero then stood there finished
    return () => { alive = false; cancelAnimationFrame(raf); unhold() }
  }, [onRelease])

  if (phase === 'gone') return null
  const out = phase === 'out'
  return (
    <div data-preloader role="status" aria-label="Seite lädt" className="fixed inset-0 z-[200] pointer-events-none select-none"
      onTransitionEnd={(e) => { if (out && e.propertyName === 'opacity' && e.target === e.currentTarget) setPhase('gone') }}
      style={{ opacity: out ? 0 : 1, transition: 'opacity .6s ease' }}>
      {/* the plain answer to "is this loading?": a large percentage, top left */}
      <div className="absolute inset-x-0 top-0"><div className="frame pt-6 flex items-start gap-3">
        <span className="t-display text-ink tabular-nums leading-none"><span ref={pctRef}>0</span><span className="text-signal">%</span></span>
        <span ref={stateRef} className="t-meta mt-2">lädt</span>
      </div></div>
      {/* on phones the bust stands low, so the console sits under the percentage there */}
      <div className="frame h-full flex items-start pt-36 sm:pt-44 lg:items-end lg:justify-end lg:pt-0 pb-8">
        <div
          className="w-full max-w-[440px] rounded-lg border border-line bg-[#0c0c0b]/95 overflow-hidden font-mono text-[12px] leading-[1.75]"
          style={{ transform: out ? 'translateY(12px)' : 'none', transition: 'transform .6s ease' }}>
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line text-faint">
            <span className="w-2 h-2 rounded-full bg-white/10" /><span className="w-2 h-2 rounded-full bg-white/10" /><span className="w-2 h-2 rounded-full bg-signal/70" />
            <span className="ml-2">zsh — vincentfidanli.de</span>
          </div>
          <div className="px-4 py-3 text-muted">
            <div><span className="text-signal">~/portfolio</span> <span className="text-faint">$</span> <span className="text-ink">npm run start</span></div>
            {[
              ['fonts', 'fonts', 'Inter · Cascadia Code'],
              ['points', 'worker', `${(stage.count || 64000).toLocaleString('de-DE')} Punkte berechnet`],
              ['shader', 'webgl', done.shader === 'none' ? 'nicht verfügbar — ohne 3D' : 'Shader kompiliert'],
            ].map(([key, k, v]) => (
              <div key={key} className={`transition-colors duration-300 ${done[key] ? '' : 'text-faint'}`}>
                <span className={done[key] === 'ok' ? 'text-ink' : 'text-faint'}>{done[key] === 'ok' ? '✓' : done[key] ? '–' : '·'}</span> <span className="text-faint">{pad(k)}</span>{done[key] ? v : '…'}
              </div>
            ))}
            <div><span className="text-signal">▸</span> <span className="text-faint">{pad('load')}</span><span ref={barRef} className="text-ink">{`[${'░'.repeat(BAR)}]\u00a0\u00a0\u00a00%`}</span></div>
            <div><span ref={doneRef} className="text-signal" /><span className="inline-block w-[7px] h-[13px] bg-signal/80 align-[-2px] ml-1 animate-pulse" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
