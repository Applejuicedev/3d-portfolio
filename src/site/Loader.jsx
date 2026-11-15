import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { emit } from '../lib/events'
import { holdScroll } from '../lib/scroll'
import { PROJECTS } from '../data/content'
import { shape } from '../body/shapes'

// Before anything moves, everything it needs is there: the type, every form the body will take
// (drawn and sampled now, not mid-scroll), the stills and the recordings. A terminal — Apple's, a
// few years on: dark glass over the sky, a hairline rim, SF Mono — writes each real step as it
// finishes, a thin line fills underneath. Behind it the points are still space: stars, a sun,
// planets and their moons, a galaxy far off (Body, form "cosmos"). At 100 the terminal closes and
// all of space falls together into the opening's form.
const next = () => new Promise((r) => setTimeout(r, 0))
// each step shows at least this long, so the log can be read even when everything is cached
const beat = (ms) => new Promise((r) => setTimeout(r, prefersReduced() ? 0 : ms))
const pad = (s, n) => (s + ' ').padEnd(n, '.')

export default function Loader() {
  const [gone, setGone] = useState(false)
  const [lines, setLines] = useState([])
  const [pct, setPct] = useState(0)
  const ref = useRef(), winRef = useRef()

  useEffect(() => {
    let alive = true
    holdScroll(true, 'load')
    setLines([]) // (StrictMode runs this twice: start clean)
    const add = (l) => alive && setLines((ls) => [...ls, l])
    const set = (k, l) => alive && setLines((ls) => ls.map((x) => (x.k === k ? { ...x, ...l } : x)))
    const run = async () => {
      const forms = [...new Set([...document.querySelectorAll('[data-form]')].map((el) => el.dataset.form))]
      const media = PROJECTS.filter((p) => p.video).flatMap((p) => [`/videos/${p.slug}.jpg`, `/videos/${p.slug}.webm`])
      const total = 1 + forms.length + media.length
      let done = 0
      const tick = () => { done++; alive && setPct(Math.round((done / total) * 100)) }
      add({ k: 'cmd', t: 'npm run universe' })
      await new Promise((r) => setTimeout(r, prefersReduced() ? 0 : 350))
      // the recordings load alongside; meanwhile the type, then every form, one by one
      let got = 0
      add({ k: 'media', t: pad('streaming recordings', 26), v: `0/${media.length}` })
      const loads = media.map((src) => fetch(src).then((r) => r.blob()).catch(() => {}).finally(() => { got++; set('media', { v: `${got}/${media.length}` }); tick() }))
      await beat(260)
      add({ k: 'fonts', t: pad('loading type', 26), v: '…' })
      await Promise.all([document.fonts.ready, beat(320)]); set('fonts', { v: 'SF Pro · Geist Mono' }); tick()
      await beat(200)
      add({ k: 'forms', t: pad('sampling forms', 26), v: `0/${forms.length}` })
      for (let i = 0; i < forms.length; i++) { shape(forms[i]); set('forms', { v: `${i + 1}/${forms.length}  ${forms[i].replace('text:', '')}` }); tick(); await next(); await beat(160) }
      set('forms', { v: `${forms.length}/${forms.length}  20,000 points` })
      await Promise.all(loads)
      if (!alive) return
      setPct(100)
      add({ k: 'done', t: `ready in ${Math.round(performance.now())} ms — welcome.` })
      await new Promise((r) => setTimeout(r, prefersReduced() ? 0 : 900))
      if (!alive) return
      const end = () => { holdScroll(false, 'load'); setGone(true) }
      if (prefersReduced()) { emit('loaded'); return end() }
      gsap.timeline({ onComplete: end })
        .to(winRef.current, { opacity: 0, scale: 0.96, filter: 'blur(10px)', duration: 0.6, ease: 'power2.in' })
        .call(() => emit('loaded'), [], 0.35)
        .to(ref.current, { opacity: 0, duration: 0.6 }, 0.4)
    }
    run()
    return () => { alive = false; holdScroll(false, 'load') }
  }, [])

  if (gone) return null
  const when = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date())
  return (
    <div ref={ref} role="status" aria-live="polite" aria-label="Loading" className="fixed inset-0 z-[100] grid place-items-center px-4 bg-gradient-to-b from-canvas/30 via-transparent to-canvas/30">
      <div ref={winRef} className="w-[min(34rem,100%)] rounded-[14px] overflow-hidden bg-[rgb(18_18_22/.55)] backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_0_0_.5px_rgb(255_255_255/.14),inset_0_1px_0_rgb(255_255_255/.08),0_30px_90px_-20px_rgb(0_0_0/.8)]">
        {/* the title bar */}
        <div className="relative flex items-center h-9 px-3.5 border-b border-white/[0.06]">
          <span className="flex gap-2" aria-hidden>{['#ff5f57', '#febc2e', '#28c840'].map((c) => <i key={c} className="block w-[11px] h-[11px] rounded-full opacity-80" style={{ background: c }} />)}</span>
          <p className="absolute left-1/2 -translate-x-1/2 t-cap !text-ink/50">vincent — zsh — universe</p>
          <p className="ml-auto t-cap tabular-nums !text-ink/70">{String(pct).padStart(3, '0')}%</p>
        </div>
        {/* the screen */}
        <div className="font-mono text-[12px] leading-[1.75] px-4 pt-3 pb-5 min-h-[12.5rem] text-ink/85">
          <p className="text-ink/40">Last login: {when} on ttys001</p>
          {lines.map((l) => (
            l.k === 'cmd'
              ? <p key={l.k} className="mt-1"><span className="text-ink/40">vincent@portfolio ~ %</span> {l.t}</p>
              : l.k === 'done'
                ? <p key={l.k} className="mt-2 text-ink">{l.t}</p>
                : <p key={l.k} className="flex gap-3 whitespace-pre"><span className="text-ink/40">›</span><span className="text-ink/60">{l.t}</span><span className="truncate">{l.v}</span></p>
          ))}
          {pct < 100 && <span aria-hidden className="inline-block w-[7px] h-[14px] align-[-2px] bg-ink/80 animate-[blink_1.06s_steps(1)_infinite]" />}
        </div>
        {/* progress */}
        <div className="h-px bg-white/[0.06]"><i className="block h-full bg-ink/80 origin-left transition-transform duration-500 ease-sys" style={{ transform: `scaleX(${pct / 100})` }} /></div>
      </div>
    </div>
  )
}
