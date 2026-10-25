import { useEffect, useRef, useState } from 'react'
import { bustSettled, stage } from './hero/stage'
import { prefersReduced } from './motion'

// ── Preloader ───────────────────────────────────────────────────
// The first seconds are the heaviest: fonts, the bust's points (worker), its renderer and shader,
// the grain tiles, and every section preparing its reveals. Run under the hero's entrance, that
// work made it stutter. So the page waits, and loading is shown as what it is: a console in the
// corner logs each step as it really finishes (fonts, points, shader), and then the particles
// stream out of the bottom left corner as one strand and build the bust where it will stand —
// the progress bar is the share of points already in place (stage.emit → the bust's shader).
// While html[data-preloading] is set, everything else is hidden (index.css) but the cursor.
// At 100 % the console goes, the page appears around the finished bust.
// · All gsap motion waits: main.jsx pauses gsap's global timeline before anything mounts, and
//   this lets it go at the end — the hero's timeline, the typer, the workflow all start from
//   their beginning then. The console itself updates without gsap (rAF).
// · It waits for the fonts and the bust (compiled, or given up), at most MAX; the points come
//   out at most RATE per second, so the strand is always seen building the bust.
// · With reduced motion it is not there at all (nothing is paused or hidden then).
const MAX = 5000, RATE = 0.55, BAR = 22
export const preloading = () => !prefersReduced()
const pad = (s) => s.padEnd(8, ' ')

export default function Preloader({ onRelease }) {
  const [phase, setPhase] = useState(preloading() ? 'load' : 'gone')
  const [log, setLog] = useState([])
  const barRef = useRef(), doneRef = useRef()

  useEffect(() => {
    if (phase !== 'load') return
    const root = document.documentElement
    root.setAttribute('data-preloading', '')
    root.style.overflow = 'hidden'
    let raf = 0, alive = true, last = performance.now(), bust = false
    const t0 = last, seen = new Set()
    const add = (key, line) => { if (!seen.has(key)) { seen.add(key); setLog((l) => [...l, line]) } }
    document.fonts.ready.then(() => alive && add('fonts', ['ok', pad('fonts'), 'Inter · Cascadia Code']))
    bustSettled.then(() => { bust = true })
    stage.emit = 0
    const step = (now) => {
      const t = now - t0, dt = Math.min(0.05, (now - last) / 1000); last = now
      if (stage.sampled) add('points', ['ok', pad('worker'), `${(stage.count || 64000).toLocaleString('de-DE')} Punkte berechnet`])
      if (stage.compiled) add('shader', ['ok', pad('webgl'), 'Shader kompiliert'])
      if (bust && !stage.compiled && !stage.ready) add('shader', ['--', pad('webgl'), 'nicht verfügbar — ohne 3D'])
      // the strand runs once the bust can draw (or straight away without WebGL, or after MAX)
      const go = stage.ready || (bust && t > 300) || t > MAX
      if (go) { add('stream', null); stage.emit = Math.min(1, stage.emit + RATE * dt) }
      if (barRef.current) {
        const n = Math.round(stage.emit * BAR)
        barRef.current.textContent = `[${'█'.repeat(n)}${'░'.repeat(BAR - n)}] ${String(Math.floor(stage.emit * 100)).padStart(3, ' ')}%`
      }
      if (stage.emit < 1) { raf = requestAnimationFrame(step); return }
      if (doneRef.current) doneRef.current.textContent = `bereit in ${((now - t0) / 1000).toFixed(2)} s`
      setTimeout(() => {
        if (!alive) return
        root.removeAttribute('data-preloading')
        root.style.overflow = ''
        setPhase('out')
        onRelease?.()
      }, 450)
    }
    raf = requestAnimationFrame(step)
    return () => { alive = false; cancelAnimationFrame(raf); stage.emit = 1; root.removeAttribute('data-preloading'); root.style.overflow = '' }
  }, [phase, onRelease])

  if (phase === 'gone') return null
  const out = phase === 'out'
  const streaming = log.some((l) => l === null)
  return (
    <div data-preloader role="status" aria-label="Seite lädt" className="fixed inset-0 z-[200] pointer-events-none select-none">
      {/* on phones the bust stands low, so the console sits at the top there */}
      <div className="frame h-full flex items-start pt-6 lg:items-end lg:pt-0 pb-8">
        <div onTransitionEnd={(e) => { if (out && e.propertyName === 'opacity') setPhase('gone') }}
          className="w-full max-w-[440px] rounded-lg border border-line bg-[#0c0c0b]/85 backdrop-blur-sm overflow-hidden font-mono text-[12px] leading-[1.75]"
          style={{ opacity: out ? 0 : 1, transform: out ? 'translateY(12px)' : 'none', transition: 'opacity .5s ease, transform .5s ease' }}>
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line text-faint">
            <span className="w-2 h-2 rounded-full bg-white/10" /><span className="w-2 h-2 rounded-full bg-white/10" /><span className="w-2 h-2 rounded-full bg-signal/70" />
            <span className="ml-2">zsh — vincentfidanli.de</span>
          </div>
          <div className="px-4 py-3 text-muted">
            <div><span className="text-signal">~/portfolio</span> <span className="text-faint">$</span> <span className="text-ink">npm run start</span></div>
            {log.filter(Boolean).map(([s, k, v]) => (
              <div key={k}><span className={s === 'ok' ? 'text-ink' : 'text-faint'}>{s === 'ok' ? '✓' : '–'}</span> <span className="text-faint">{k}</span>{v}</div>
            ))}
            {streaming && <div><span className="text-signal">▸</span> <span className="text-faint">{pad('stream')}</span><span ref={barRef} className="text-ink" /></div>}
            {streaming && <div><span ref={doneRef} className="text-signal" /><span className="inline-block w-[7px] h-[13px] bg-signal/80 align-[-2px] ml-1 animate-pulse" /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
