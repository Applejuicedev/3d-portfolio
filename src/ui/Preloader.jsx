import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced, finePointer } from '../lib/motion'
import { PROJECTS, PERSON } from '../data/content'
import { markBooted, on, emit } from '../lib/events'
import { holdScroll, scrollToTarget } from '../lib/scroll'
import { sfx, unlock, setSound, useSound } from '../lib/sound'

// The boot steps are real: each one reports when its work has actually finished, so the build is
// as long as the page needs and no longer.
const STEPS = [
  ['fonts', () => document.fonts.ready.then(() => /Mac|iPhone|iPad/.test(navigator.userAgent) ? 'SF Pro · Geist Mono' : 'Inter · Geist Mono')],
  ['projekte', () => Promise.all(PROJECTS.filter((p) => p.video).map((p) => {
    const img = new Image(); img.src = `/videos/${p.slug}.jpg`
    return img.decode().catch(() => {})
  })).then(() => `${PROJECTS.length} Fenster · ${PROJECTS.filter((p) => p.video).length} Aufnahmen`)],
  ['display', () => Promise.resolve(`${innerWidth}×${innerHeight} @${Math.min(3, devicePixelRatio || 1)}x`)],
  ['motion', () => Promise.resolve(prefersReduced() ? 'reduziert' : `GSAP ${gsap.version}`)],
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// the work starts as soon as the page loads, not when the visitor answers: Run only shows it.
let work, readyAt
const startWork = () => {
  if (!work) {
    work = STEPS.map(([name, fn]) => fn().then((v) => [name, v]))
    Promise.all(work).then(() => { readyAt = Math.round(performance.now()) })
  }
  return work
}

// The opening: a small terminal of Liquid Glass on the white page, turning towards the pointer. The
// title bar, a prompt, a command waiting. Nothing
// happens until the visitor answers: return, Run, or a click anywhere. Then it builds: the real
// loading steps log themselves as they finish, a progress line fills, "Build Succeeded" — and the
// terminal's screen grows until it is the page. Esc or "Intro überspringen" skip it at any time.
export default function Preloader() {
  const [phase, setPhase] = useState('idle') // idle → running → leaving → handoff → done
  const [lines, setLines] = useState([]) // the console
  const [nudge, setNudge] = useState(0)
  const rootRef = useRef(), winRef = useRef(), runBtn = useRef()
  const sound = useSound()

  useEffect(() => { startWork() }, [])
  useEffect(() => on('reboot', () => { scrollToTarget(0, { immediate: true }); setLines([]); setPhase('idle') }), [])
  useEffect(() => {
    const html = document.documentElement
    if (phase === 'done' || phase === 'handoff') { html.removeAttribute('data-booting'); holdScroll(false, 'boot') }
    if (phase === 'handoff') { const t = setTimeout(() => setPhase('done'), 700); return () => clearTimeout(t) }
    if (phase === 'done') return
    html.setAttribute('data-booting', ''); holdScroll(true, 'boot')
    if (phase === 'idle') requestAnimationFrame(() => runBtn.current?.focus({ preventScroll: true, focusVisible: false }))
  }, [phase])

  // The end: the whole terminal becomes the page — it turns to face the visitor, then the glass
  // itself grows from its place until it fills the screen, its contents fading, the glass clouding
  // over into the page's white.
  const finish = (skip = false) => {
    setPhase('leaving')
    const done = () => { setPhase('handoff'); markBooted(); emit('buddy:arrive') }
    const still = prefersReduced() || skip, win = winRef.current, tilt = tiltRef.current
    if (still || !win) { gsap.to(rootRef.current, { opacity: 0, duration: 0.35, onComplete: done }); return }
    sfx('whoosh')
    const root = rootRef.current
    gsap.killTweensOf(tilt)
    gsap.timeline({ onComplete: done })
      .to(tilt, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.35, ease: 'power2.out' }, 0)
      .to(root.querySelectorAll('[data-slab]'), { opacity: 0, duration: 0.3 }, 0)
      .add(() => {
        // from here the window is lifted out of the layout and grown in place
        const r = win.getBoundingClientRect()
        gsap.set(tilt, { clearProps: 'transform' }); Object.assign(tilt.style, { transformStyle: 'flat', willChange: 'auto' }) // (else they'd hold the fixed window inside them)
        Object.assign(win.style, { position: 'fixed', left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, margin: 0, zIndex: 5 })
      }, 0.36)
      .to(win.querySelectorAll(':scope > :not([data-fill])'), { opacity: 0, filter: 'blur(6px)', duration: 0.45, ease: 'power2.in' }, 0.38)
      .to(win, { left: 0, top: 0, width: () => innerWidth, height: () => innerHeight, borderRadius: 0, duration: 1.05, ease: 'power3.inOut' }, 0.4)
      .to(win.querySelector('[data-fill]'), { opacity: 1, duration: 0.9, ease: 'power2.inOut' }, 0.55)
      .to(root, { backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--canvas'), duration: 0.9, ease: 'power2.inOut' }, 0.5)
  }

  // the terminal is a slab of glass in 3D: it turns towards the pointer (or, on touch, sways
  // slowly by itself), the light on it following
  const tiltRef = useRef()
  useEffect(() => {
    const t = tiltRef.current
    if (!t || prefersReduced()) return
    gsap.set(t, { transformPerspective: 1100 })
    const rx = gsap.quickTo(t, 'rotationX', { duration: 0.9, ease: 'power3.out' }), ry = gsap.quickTo(t, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    const tx = gsap.quickTo(t, 'x', { duration: 1.1, ease: 'power3.out' }), ty = gsap.quickTo(t, 'y', { duration: 1.1, ease: 'power3.out' })
    const aim = (u, v) => { // u, v: -1 … 1 from the middle of the screen
      if (phase !== 'idle' && phase !== 'running') return
      rx(-v * 14); ry(u * 18); tx(u * 14); ty(v * 10)
      t.style.setProperty('--sx', `${50 + u * 45}%`); t.style.setProperty('--sy', `${30 + v * 40}%`)
    }
    if (!finePointer()) {
      const sway = gsap.to({ k: 0 }, { k: Math.PI * 2, duration: 9, repeat: -1, ease: 'none', onUpdate() { const k = this.targets()[0].k; aim(Math.sin(k) * 0.5, Math.cos(k * 0.7) * 0.4) } })
      return () => sway.kill()
    }
    const move = (e) => aim(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1)
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [phase])

  const start = async () => {
    if (phase !== 'idle') return
    unlock() // a gesture: from here on the page may make sound
    setPhase('running')
    const add = (l) => setLines((ls) => [...ls, l])
    const typing = !prefersReduced()
    add({ k: 'cmd', text: 'npx start @vincentfidanli' })
    await sleep(typing ? 280 : 0)
    for (const step of startWork()) {
      const [name, v] = await step
      add({ k: 'ok', name, text: v })
      sfx('ok')
      if (typing) await sleep(320)
    }
    await Promise.all(work)
    add({ k: 'done', text: `Build Succeeded · ${readyAt ?? Math.round(performance.now())} ms · hallo.` })
    sfx('ready')
    await sleep(typing ? 900 : 0)
    finish()
  }

  useEffect(() => {
    if (phase !== 'idle' && phase !== 'running') return
    const key = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); finish(true) }
      else if ((e.key === 'Enter' || (e.key === 'r' && e.metaKey)) && phase === 'idle' && (e.target === document.body || e.target === runBtn.current)) { e.preventDefault(); start() }
      else if (phase === 'idle' && e.key.length === 1 && !e.metaKey && !e.ctrlKey) setNudge((n) => n + 1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  })

  if (phase === 'done') return null
  const handoff = phase === 'handoff', running = phase === 'running'
  const built = lines.some((l) => l.k === 'done')
  const progress = (lines.filter((l) => l.k === 'ok').length + (built ? 1 : 0)) / (STEPS.length + 1)
  return (
    <div ref={rootRef} role="dialog" aria-modal={!handoff} aria-label="Startbildschirm" onClick={(e) => { if (phase === 'idle' && !e.target.closest('button, label, a')) start() }}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center px-4 bg-canvas text-ink/85 ${phase === 'idle' ? 'cursor-pointer' : ''} ${handoff ? 'pointer-events-none opacity-0' : ''}`}>
      <div ref={tiltRef} className="relative w-[min(34rem,100%)] [transform-style:preserve-3d] will-change-transform [--sx:30%] [--sy:10%]">
      {/* its thickness: a few layers of glass edge behind it, seen as it turns */}
      {[1, 2, 3, 4, 5, 6].map((d) => <i key={d} data-slab aria-hidden className="absolute inset-0 rounded-[22px] border border-white/60 bg-white/[0.07] pointer-events-none" style={{ transform: `translateZ(${-d * 3}px)`, boxShadow: d === 6 ? '0 30px 70px -20px rgb(0 0 0 / .28)' : undefined }} />)}
      <div ref={winRef} className="glass-strong relative w-full rounded-[22px] overflow-hidden [--lg-blur:26px] !bg-white/[0.32]">
        {/* the light on the glass, where the pointer is */}
        <i aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_80%_at_var(--sx)_var(--sy),rgb(255_255_255/.5),rgb(255_255_255/0)_60%)] mix-blend-soft-light" />
        {/* the title bar */}
        <div className="relative flex items-center h-11 px-4 border-b border-white/50">
          <span className="flex gap-2" aria-hidden>{[0, 1, 2].map((i) => <i key={i} className="block w-3 h-3 rounded-full bg-black/[0.12] shadow-[inset_0_0_0_.5px_rgb(0_0_0/.08)]" />)}</span>
          <p className="absolute left-1/2 -translate-x-1/2 text-[12px] text-ink/60 whitespace-nowrap">{PERSON.name.split(' ')[0].toLowerCase()} — zsh — 80×24</p>
          <button ref={runBtn} type="button" onClick={start} disabled={phase !== 'idle'} aria-label="Run" title="Run (return)"
            className="glass ml-auto grid place-items-center w-8 h-7 rounded-full text-ink/70 hover:text-ink disabled:opacity-30 transition-colors">
            <svg width="10" height="11" viewBox="0 0 12 13" aria-hidden><path d="M1.5 1.2v10.6c0 .6.6.9 1.1.6l8.6-5.3c.5-.3.5-1 0-1.3L2.6.6c-.5-.3-1.1 0-1.1.6z" fill="currentColor" /></svg>
          </button>
        </div>
        {/* the screen */}
        <div className="relative font-mono text-[12.5px] leading-[1.75] px-4 pt-3 pb-4 h-[15.5rem] text-ink/85" aria-live="polite">
          <p className="text-faint">Last login: {new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date())} on ttys001</p>
          <p className="text-faint"># Die volle Experience gibt es nur mit Ton.</p>
          <p className="mt-1.5"><span className="text-faint/70">~ %</span> {lines.length ? lines[0].text : <>npx start @vincentfidanli<span className="caret ml-0.5 text-ink/70" style={{ width: '0.55em' }} /></>}</p>
          {lines.slice(1).map((l, n) => (
            l.k === 'ok'
              ? <p key={n} className="grid grid-cols-[1.1rem_5.5rem_1fr]"><span className="text-faint">✓</span><span className="text-faint">{l.name}</span><span className="truncate">{l.text}</span></p>
              : <p key={n} className={l.k === 'done' ? 'mt-1.5 text-ink font-medium' : 'text-faint'}>{l.text}</p>
          ))}
          {running && !built && <p className="text-faint/70">…</p>}
          {/* the progress line */}
          <i aria-hidden className="absolute left-0 bottom-0 h-[2px] bg-[#8e8e93] transition-[width,opacity] duration-500 ease-sys" style={{ width: `${phase === 'idle' ? 0 : progress * 100}%`, opacity: built ? 0 : 1 }} />
          {phase === 'idle' && (
            <p className="absolute left-4 right-4 bottom-4 text-[12px] text-faint">
              Drück <span className="kbd mx-0.5 inline-block !bg-paper/70 !text-ink" key={nudge} style={{ animation: nudge ? 'nudge 420ms var(--ease)' : undefined }}>return ↵</span> oder {finePointer() ? 'klick' : 'tipp'} irgendwo.
            </p>
          )}
        </div>
        {/* the white the glass clouds over into, as it becomes the page */}
        <i data-fill aria-hidden className="absolute inset-0 z-10 bg-canvas opacity-0 pointer-events-none" />
      </div>
      </div>

      {/* sound: an iOS switch */}
      <label className={`glass fixed left-1/2 -translate-x-1/2 max-sm:left-5 max-sm:translate-x-0 bottom-8 flex items-center gap-3 rounded-full pl-4 pr-1.5 py-1.5 text-[13px] text-ink/80 cursor-pointer select-none transition-opacity duration-500 ${phase === 'idle' || running ? '' : 'opacity-0 pointer-events-none'}`}>
        Ton
        <button type="button" role="switch" aria-checked={sound} onClick={() => { setSound(!sound); if (!sound) { unlock(); sfx('snap') } }}
          className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${sound ? 'bg-[#34c759]' : 'bg-[rgb(120_120_128/0.16)]'}`}>
          <span className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-[0_3px_8px_rgb(0_0_0/.15),0_3px_1px_rgb(0_0_0/.06)] transition-transform duration-200 ease-sys ${sound ? 'translate-x-[20px]' : ''}`} />
        </button>
      </label>
      <button type="button" onClick={() => finish(true)} hidden={phase !== 'idle' && !running} className="fixed right-5 bottom-8 text-[13px] text-faint hover:text-ink transition-colors">Intro überspringen <span className="kbd ml-1 !bg-paper/70 !text-ink">esc</span></button>
      <style>{`@keyframes nudge{30%{transform:translateY(-3px) scale(1.08)}}`}</style>
    </div>
  )
}
