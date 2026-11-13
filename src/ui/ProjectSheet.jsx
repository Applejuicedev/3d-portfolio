import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/content'
import { on, emit } from '../lib/events'
import { gsap, prefersReduced } from '../lib/motion'
import { holdScroll } from '../lib/scroll'
import { Lights } from './Window'
import ProjectMedia, { PauseRule, LiveNumbers } from '../sections/ProjectMedia'

const Marked = ({ text }) => text.split('**').map((part, i) => (i % 2 ? <strong key={i} className="font-medium text-ink">{part}</strong> : part))
const LABEL = { problem: 'Problem', lösung: 'Lösung', ergebnis: 'Ergebnis' }

// A project, opened. The sheet grows out of the window that was clicked (from its rectangle to
// its own — the way a macOS window opens from the Dock), the page behind dims. Kept short and
// cheap: no live blur behind or inside it, transforms and opacity only. Closed by
// the red light, Esc or a click beside it; focus returns to where it was.
export default function ProjectSheet() {
  const [state, setState] = useState(null) // { p, from }
  const sheetRef = useRef(), backRef = useRef(), closeRef = useRef(), lastFocus = useRef()

  useEffect(() => on('open-project', (d) => {
    const slug = typeof d === 'string' ? d : d.slug
    lastFocus.current = document.activeElement
    setState({ p: PROJECTS.find((x) => x.slug === slug), from: d.from })
  }), [])

  useEffect(() => {
    if (!state) return
    document.documentElement.style.overflow = 'hidden'; holdScroll(true)
    const s = sheetRef.current, r = s.getBoundingClientRect(), f = state.from
    closeRef.current?.querySelector('button')?.focus({ preventScroll: true })
    if (!prefersReduced()) {
      gsap.fromTo(backRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      if (f) gsap.fromTo(s, { x: f.left + f.width / 2 - (r.left + r.width / 2), y: f.top + f.height / 2 - (r.top + r.height / 2), scaleX: f.width / r.width, scaleY: f.height / r.height, opacity: 0.6 },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.45, ease: 'expo.out', clearProps: 'transform' })
      else gsap.fromTo(s, { y: 60, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out', clearProps: 'transform' })
      gsap.from(s.querySelectorAll('[data-in]'), { opacity: 0, y: 10, duration: 0.4, stagger: 0.03, ease: 'power3.out', delay: 0.12 })
    }
    const key = (e) => {
      if (e.key === 'Escape') close()
      // keep Tab inside the sheet
      if (e.key === 'Tab') {
        const f = [...s.querySelectorAll('a[href], button, input, [tabindex="0"]')].filter((x) => !x.disabled)
        if (!f.length) return
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus() }
      }
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.documentElement.style.overflow = ''; holdScroll(false) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const close = () => {
    const done = () => { setState(null); emit('sheet:closed'); lastFocus.current?.focus?.({ preventScroll: true }) }
    if (prefersReduced()) return done()
    gsap.to(backRef.current, { opacity: 0, duration: 0.22 })
    gsap.to(sheetRef.current, { y: 24, scale: 0.97, opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: done })
  }

  if (!state) return null
  const { p } = state
  return (
    <div className="fixed inset-0 z-[140]">
      <div ref={backRef} data-cursor="Schließen" className="absolute inset-0 bg-ink/30" onClick={close} />
      <div data-lenis-prevent className="absolute inset-0 overflow-y-auto overscroll-contain pointer-events-none">
        <div className="min-h-full flex items-start justify-center p-3 sm:p-6 lg:p-10">
          <div ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="sheet-title"
            className="pointer-events-auto w-full max-w-[76rem] rounded-sheet glass-strong flat overflow-hidden will-change-transform">
            <div ref={closeRef} className="sticky top-0 z-10 flex items-center gap-3 h-12 px-5 border-b border-black/[0.06] bg-white/95">
              <Lights onClose={close} />
              <p className="absolute inset-x-24 text-center text-[13px] font-medium text-gray truncate">{p.title} — {p.repo}</p>
            </div>
            <div className="grid lg:grid-cols-[minmax(0,1.618fr)_minmax(0,1fr)]">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[34rem] bg-black/[0.04]"><ProjectMedia p={p} alongside /></div>
              <div className="p-6 sm:p-8 space-y-7">
                <div data-in>
                  <p className="t-cap">{p.kind} · {p.year} · {p.status}</p>
                  <h2 id="sheet-title" className="t-display mt-2">{p.title}</h2>
                  <p className="t-lead text-gray mt-3">{p.lede}</p>
                </div>
                {p.slug === 'dienstzeit' && <div data-in><PauseRule /></div>}
                {p.slug === 'portfolio' && <div data-in><LiveNumbers /></div>}
                <ul data-in className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => <li key={t} className="t-mono rounded-full bg-white/55 ring-1 ring-black/5 px-2.5 py-1">{t}</li>)}
                </ul>
                <div data-in className="flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group btn-chrome inline-flex items-center gap-2 h-10 px-4 rounded-full text-[14px] font-medium">
                      <span className="roll"><span>{l.label}</span><span aria-hidden>{l.label}</span></span><span aria-hidden>↗</span>
                    </a>
                  ))}
                  {!p.links.length && <p className="t-mono text-gray">Privates Repository · {p.repo}</p>}
                </div>
              </div>
            </div>
            <dl className="grid md:grid-cols-3 border-t border-line">
              {p.story.map(([k, v], i) => (
                <div key={k} data-in className={`p-6 sm:p-8 ${i ? 'md:border-l border-line max-md:border-t' : ''}`}>
                  <dt className="t-cap"><span className="tabular-nums">0{i + 1}</span> · {LABEL[k]}</dt>
                  <dd className="mt-3 t-body text-gray"><Marked text={v} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
