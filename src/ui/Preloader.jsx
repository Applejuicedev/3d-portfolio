import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { PROJECTS, PERSON } from '../data/content'
import { markBooted, on, emit } from '../lib/events'
import { holdScroll, scrollToTarget } from '../lib/scroll'
import LiquidChrome from './LiquidChrome'

// The boot steps are real: each line prints when its work has actually finished, so the sequence
// is as long as the page needs and no longer (typing only adds a few hundred milliseconds).
const STEPS = [
  ['fonts', () => document.fonts.ready.then(() => 'Inter Tight · JetBrains Mono')],
  ['projekte', () => Promise.all(PROJECTS.filter((p) => p.video).map((p) => {
    const img = new Image(); img.src = `/videos/${p.slug}.jpg`
    return img.decode().catch(() => {})
  })).then(() => `${PROJECTS.length} Fenster · ${PROJECTS.filter((p) => p.video).length} Aufnahmen`)],
  ['display', () => Promise.resolve(`${innerWidth}×${innerHeight} @${Math.min(3, devicePixelRatio || 1)}x`)],
  ['motion', () => Promise.resolve(prefersReduced() ? 'reduziert' : `GSAP ${gsap.version}`)],
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// the work starts as soon as the page loads, not when the visitor answers: return only shows it.
// `readyAt` is when the last step had really finished (ms since navigation start).
let work, readyAt
const startWork = () => {
  if (!work) {
    work = STEPS.map(([name, fn]) => fn().then((v) => [name, v]))
    Promise.all(work).then(() => { readyAt = Math.round(performance.now()) })
  }
  return work
}

// The opening: a terminal cast in liquid chrome, floating in space; its screen is frosted glass —
// light, the moving chrome showing through it blurred — waiting. Nothing happens until the visitor
// answers — return, a click on Run, or a tap on the window. Then the command runs, the real
// loading steps log themselves, and the terminal wakes up and becomes the companion (Buddy). "Intro überspringen" or Esc skip it at any time.
export default function Preloader() {
  const [run, setRun] = useState(0) // increments on every boot (Spotlight can restart it)
  const [phase, setPhase] = useState('idle') // idle → running → leaving → done
  const [lines, setLines] = useState([])
  const [nudge, setNudge] = useState(0)
  const [liquid, setLiquid] = useState(true)
  const noLiquid = useCallback(() => setLiquid(false), [])
  const rootRef = useRef(), winRef = useRef(), runBtn = useRef()

  useEffect(() => { startWork() }, [])
  // lock the page while booting; Spotlight's "Terminal neu starten" brings it back
  useEffect(() => on('reboot', () => { scrollToTarget(0, { immediate: true }); setLines([]); setPhase('idle'); setRun((r) => r + 1) }), [])
  useEffect(() => {
    const html = document.documentElement
    if (phase === 'done' || phase === 'handoff') { html.removeAttribute('data-booting'); holdScroll(false) }
    // handoff: the navigation (with Kontakt) fades in once the terminal has become the companion
    if (phase === 'handoff') { const t = setTimeout(() => setPhase('done'), 760); return () => clearTimeout(t) }
    if (phase === 'done') return
    html.setAttribute('data-booting', ''); holdScroll(true)
    if (phase === 'idle') requestAnimationFrame(() => runBtn.current?.focus({ preventScroll: true }))
  }, [phase])

  // the light on the chrome follows the pointer; the window leans a degree or two towards it
  useEffect(() => {
    if (phase === 'done' || phase === 'handoff' || prefersReduced()) return
    const w = winRef.current
    const move = (e) => {
      const r = w.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      w.style.setProperty('--lx', `${x * 100}%`); w.style.setProperty('--ly', `${y * 100}%`)
      gsap.to(w, { rotateY: (x - 0.5) * 6, rotateX: -(y - 0.5) * 6, duration: 0.8, ease: 'power3.out', overwrite: 'auto' })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [phase, run])

  // The end: the terminal becomes the companion. Its text clears and two eyes open on the empty
  // screen (it wakes up); then it shrinks and travels in an arc to where the companion lives (Buddy),
  // squaring off into its shape, while the ground fades and the page comes up. There it hands over.
  const finish = (skip = false) => {
    setPhase('leaving')
    const still = prefersReduced() || skip
    const w = winRef.current, done = () => {
      setPhase('handoff'); markBooted(); emit('buddy:arrive')
    }
    const target = document.querySelector('[data-buddy-body]')?.getBoundingClientRect()
    if (still || !target || !target.width) {
      gsap.timeline({ onComplete: done }).to(rootRef.current, { opacity: 0, duration: 0.35 })
      return
    }
    // pin the window where it stands, so its real size can change without moving anything
    const r = w.getBoundingClientRect(), screen = w.querySelector('[data-screen]')
    gsap.set(w, { position: 'fixed', left: r.left, top: r.top, width: r.width, height: r.height, margin: 0, padding: 0 })
    gsap.set(screen, { position: 'absolute', left: 10, top: 10, right: 10, bottom: 10 })
    // the companion's exact measures (Buddy): face 22.37 % corners, an 11 % chrome rim, a screen
    // with 16 % corners, eyes 8 × 12 px 9 px apart (28 × 44 / 32 here → × 0.2857), the caret mouth
    const S = target.width, rim = S * 0.11, inner = S - rim * 2
    const fly = { duration: 1.1, ease: 'power3.inOut' }
    gsap.timeline({ onComplete: done })
      .to(w.querySelectorAll('[data-log], [data-bar]'), { opacity: 0, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in' }, 0)
      .to(w, { rotateX: 0, rotateY: 0, duration: 0.4 }, 0)
      // the screen turns into the companion's own: its exact black and edge, no blur
      .set(screen, { backdropFilter: 'none', webkitBackdropFilter: 'none' }, 0.2)
      .to(screen, { backgroundColor: '#0e0e10', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(0,0,0,.6)', duration: 0.45, ease: 'power2.out' }, 0.2)
      .fromTo(w.querySelector('[data-wake]'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 0.3)
      .to(w.querySelector('[data-wake]'), { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, 0.95)
      .set(w.querySelector('[data-bar]'), { display: 'none' }, 1.15)
      .to(w, { left: target.left, ...fly }, 1.2)
      .to(w, { top: target.top, duration: 1.1, ease: 'back.inOut(1.3)' }, 1.2)
      .to(w, { width: S, height: S, borderRadius: S * 0.2237, ...fly }, 1.2)
      .to(w, { rotation: target.left > r.left ? 8 : -8, duration: 0.55, ease: 'power2.out' }, 1.2)
      .to(w, { rotation: 0, duration: 0.55, ease: 'power2.inOut' }, 1.75)
      .to(screen, { left: rim, top: rim, right: rim, bottom: rim, borderRadius: inner * 0.16, ...fly }, 1.2)
      .to(w.querySelector('[data-wake] > div'), { scale: 8 / 28, y: -4, ...fly }, 1.2)
      .to(w.querySelector('[data-wake-mouth]'), { opacity: 1, duration: 0.3 }, 2.05)
      // on the way the liquid chrome cools into the companion's polished chrome, so the swap shows nothing
      .to(w.querySelector('canvas'), { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 1.5)
      .to(w.querySelector('[data-cast]'), { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 1.5)
  }

  const start = async () => {
    if (phase !== 'idle') return
    setPhase('running')
    const add = (l) => setLines((ls) => [...ls, l])
    const typing = !prefersReduced()
    add({ k: 'cmd', text: 'npx start @vincentfidanli' })
    await sleep(typing ? 260 : 0)
    for (const step of startWork()) {
      const [name, v] = await step
      add({ k: 'ok', name, text: v })
      if (typing) await sleep(110)
    }
    await Promise.all(work)
    add({ k: 'done', text: `Seite bereit nach ${readyAt ?? Math.round(performance.now())} ms · hallo.` })
    await sleep(typing ? 700 : 0)
    finish()
  }

  useEffect(() => {
    if (phase !== 'idle' && phase !== 'running') return
    const key = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); finish(true) }
      else if (e.key === 'Enter' && phase === 'idle' && e.target === document.body) { e.preventDefault(); start() }
      else if (phase === 'idle' && e.key.length === 1 && !e.metaKey && !e.ctrlKey) setNudge((n) => n + 1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  })

  if (phase === 'done') return null
  const handoff = phase === 'handoff'
  const still = prefersReduced()
  return (
    <div ref={rootRef} role="dialog" aria-modal={!handoff} aria-label="Startbildschirm"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 px-4 [perspective:1400px] ${handoff ? 'pointer-events-none' : still ? 'bg-canvas' : ''}`}>
      <div ref={winRef} className={`${liquid ? '' : 'chrome'} relative isolate w-[min(36rem,100%)] rounded-[28px] p-[10px] [transform-style:preserve-3d] terminal-float`} style={{ willChange: 'transform', opacity: handoff ? 0 : undefined }}
        onClick={(e) => { if (phase === 'idle' && e.target.tagName !== 'BUTTON') start() }}>
        {/* the body: liquid chrome (WebGL), the CSS chrome only where there is no WebGL */}
        {liquid ? <LiquidChrome className="absolute -z-10" onFail={noLiquid} /> : <span aria-hidden className="chrome-rim absolute inset-0 rounded-[inherit] pointer-events-none" />}
        {/* the companion's chrome (Buddy), faded in during the flight */}
        {liquid && <span data-cast aria-hidden className="chrome absolute inset-0 -z-10 rounded-[inherit] opacity-0 pointer-events-none"><span className="chrome-rim absolute inset-0 rounded-[inherit]" /></span>}
        {/* the screen: frosted glass over the chrome — light, the metal behind it moving as a blur */}
        <div data-screen className="relative rounded-[18px] bg-white/[0.58] backdrop-blur-2xl backdrop-saturate-150 text-ink overflow-hidden shadow-[inset_0_1px_0_rgb(255_255_255/.9),inset_0_0_0_1px_rgb(255_255_255/.35),inset_0_0_50px_rgb(255_255_255/.35)]">
          {/* the companion's eyes, opening on the cleared screen at the end */}
          <div data-wake aria-hidden className="absolute inset-0 grid place-items-center opacity-0 pointer-events-none">
            <div className="flex gap-8"><i className="block w-7 h-11 rounded-[14px] bg-white shadow-[0_0_24px_rgb(255_255_255/.5)]" /><i className="block w-7 h-11 rounded-[14px] bg-white shadow-[0_0_24px_rgb(255_255_255/.5)]" /></div>
            <i data-wake-mouth className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[7px] h-[2.5px] rounded-full bg-[#28c840] opacity-0" />
          </div>
          <div data-log className="flex items-center h-10 px-4 border-b border-black/[0.06]">
            <span className="lights live flex gap-2" aria-hidden><i /><i /><i /></span>
            <p className="flex-1 min-w-0 truncate text-center t-mono text-ink/55 sm:-ml-14 max-sm:pl-3">{PERSON.name.split(' ')[0].toLowerCase()}@fidanli — zsh — 80×24</p>
          </div>
          <div data-log className="t-mono text-[13px] leading-[1.75] px-5 pt-4 pb-5 min-h-[15.5rem]" aria-live="polite">
            <p className="text-ink/55">Last login: {new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date())} on ttys001</p>
            <p className="text-ink/55"># Willkommen. Das hier ist eine Website – sie startet, wenn du willst.</p>
            <p className="mt-2"><span className="text-[#0a7d2c]">➜</span> <span className="text-blue">~</span>{' '}
              {lines.length ? <span>{lines[0].text}</span> : <span>npx start @vincentfidanli<span className="caret ml-0.5" /></span>}
            </p>
            {lines.slice(1).map((l, n) => (
              l.k === 'ok'
                ? <p key={n} className="grid grid-cols-[1.25rem_6.5rem_1fr] text-ink/85"><span className="text-[#0a7d2c]">✓</span><span className="text-ink/55">{l.name}</span><span className="truncate">{l.text}</span></p>
                : <p key={n} className="mt-2 text-ink">{l.text}<span className="caret ml-1" /></p>
            ))}
            {phase === 'running' && lines.length < STEPS.length + 2 && <p className="text-ink/55">…</p>}
          </div>
        </div>
        <div data-bar className="relative mt-[10px] flex items-center justify-between gap-3 rounded-[18px] bg-white/35 backdrop-blur-xl backdrop-saturate-150 px-4 py-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/.85),0_0_0_1px_rgb(255_255_255/.25)]">
          <p className="text-[14px] text-ink/70">
            <span className="max-sm:hidden">Drück </span>
            <span key={nudge} className="kbd mx-1 inline-block" style={{ animation: nudge ? 'nudge 420ms var(--ease)' : undefined }}>return ↵</span>
            <span className="max-sm:hidden"> zum Starten</span>
          </p>
          <button ref={runBtn} type="button" onClick={start} disabled={phase !== 'idle'}
            className="btn-chrome rounded-full px-4 py-1.5 text-[14px] font-medium disabled:opacity-60">
            {phase === 'idle' ? 'Run ↵' : 'läuft …'}
          </button>
        </div>
      </div>
      <button type="button" onClick={() => finish(true)} hidden={phase !== 'idle' && phase !== 'running'} className="fixed right-5 bottom-5 text-[13px] text-gray hover:text-ink transition-colors">Intro überspringen <span className="kbd ml-1">esc</span></button>
      <style>{'@keyframes nudge{30%{transform:translateY(-3px) scale(1.08)}}.terminal-float{animation:tfloat 7s ease-in-out infinite}@keyframes tfloat{50%{translate:0 -8px}}@media (prefers-reduced-motion:reduce){.terminal-float{animation:none}}'}</style>
    </div>
  )
}
