import { useEffect, useRef } from 'react'
import { PERSON, PROJECTS } from '../data/content'
import { useMotion, gsap, finePointer, prefersReduced } from '../lib/motion'
import { booted, emit } from '../lib/events'
import { goTo } from '../lib/nav'
import Window from '../ui/Window'
import ProjectMedia from './ProjectMedia'

const journal = PROJECTS.find((p) => p.slug === 'creators-journal')
const HEAD = [['Design', ''], ['trifft', ''], ['Code.', 'text-faint']]
const TOOLS = 26 // the tiles in the Dock (Stack.jsx)

// The headline's letters answer the pointer quietly: those near it lift a few pixels, the nearest
// most, and settle back smoothly — no tilting, so the line keeps its shape. A click lifts the letter
// under the pointer a little higher. Mouse and trackpad only, never with reduced motion.
function usePlayfulLetters(ref) {
  useEffect(() => {
    if (!finePointer() || prefersReduced()) return
    const letters = [...ref.current.querySelectorAll('[data-ch]')]
    const lift = letters.map((l) => gsap.quickTo(l, 'y', { duration: 0.7, ease: 'power3.out' }))
    const move = (e) => letters.forEach((l, i) => {
      const r = l.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
      const f = Math.max(0, 1 - Math.hypot(dx, dy * 1.4) / 150)
      lift[i](-8 * f * f * (3 - 2 * f))
    })
    const hop = (e) => { const l = e.target.closest?.('[data-ch]'); if (l) gsap.fromTo(l, { y: gsap.getProperty(l, 'y') }, { y: -16, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }) }
    const el = ref.current
    window.addEventListener('pointermove', move, { passive: true })
    el.addEventListener('pointerdown', hop)
    return () => { window.removeEventListener('pointermove', move); el.removeEventListener('pointerdown', hop) }
  }, [ref])
}

// The opening, after adamperlis.com's idea of a hero: almost empty. A small hello at the top left,
// the availability small at the top right, then a lot of air, the headline set left, a short
// description offset to the right, three small numbers at the bottom right — and below all of it
// one composed stage: the Journal's window, the Dienstzeit phone standing in front of it. After the
// boot the pieces come into focus one by one out of a blur, then the stage rises; while scrolling,
// the stage grows and the phone drifts ahead of the window.
export default function Hero() {
  const ref = useRef(), headRef = useRef()
  usePlayfulLetters(headRef)

  useMotion(ref, (el) => {
    const words = el.querySelectorAll('[data-word]')
    gsap.set([...words, ...el.querySelectorAll('[data-in]')], { opacity: 0 })
    gsap.set(el.querySelector('[data-stage]'), { opacity: 0, y: 80 })
    booted.then(() => {
      gsap.timeline()
        .fromTo(el.querySelectorAll('[data-in]'), { opacity: 0, y: 12, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'expo.out', clearProps: 'filter,transform' }, 0.1)
        .fromTo(words, { opacity: 0, y: 24, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.1, ease: 'expo.out', clearProps: 'filter,transform' }, 0.35)
        .to(el.querySelector('[data-stage]'), { opacity: 1, y: 0, duration: 1.6, ease: 'expo.out' }, 0.9)
    })
    const st = { trigger: el.querySelector('[data-stage]'), start: 'top 85%', end: 'top 15%', scrub: 0.6 }
    gsap.timeline({ scrollTrigger: st })
      .fromTo(el.querySelector('[data-grow]'), { scale: 0.9 }, { scale: 1, ease: 'none' }, 0)
      .fromTo(el.querySelector('[data-phone]'), { yPercent: 18 }, { yPercent: -6, ease: 'none' }, 0)
      .fromTo(el.querySelector('[data-mainwin]'), { yPercent: 4 }, { yPercent: -2, ease: 'none' }, 0)
  })

  const small = 'text-[15px] leading-[1.45]'
  return (
    <div ref={ref} className="frame pt-28 sm:pt-32 pb-10">
      <div className="lg:min-h-[calc(100svh-8rem)] grid grid-cols-12 gap-x-6 gap-y-10 content-between">
        {/* the hello and the availability, small, at the top */}
        <div data-in className={`col-span-12 sm:col-span-7 lg:col-span-4 flex items-start gap-3 ${small}`}>
          <span aria-hidden className="flex-none w-9 h-9 rounded-full btn-chrome p-[2.5px]"><img src="/profile/vincent.jpg" alt="" width={560} height={560} decoding="async" className="relative z-[1] block w-full h-full rounded-full object-cover" /></span>
          <p><span className="text-ink">Hi, ich bin Vincent.</span><br /><span className="text-gray">Ich gestalte und entwickle Anwendungen.</span></p>
        </div>
        <p data-in className={`col-span-12 sm:col-span-5 lg:col-start-10 lg:col-span-3 sm:text-right ${small}`}>
          <span className="inline-flex items-center gap-2 text-ink"><span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-[#28c840] animate-ping opacity-60 motion-reduce:hidden" /><span className="relative w-1.5 h-1.5 rounded-full bg-[#28c840]" /></span>{PERSON.available[0].toUpperCase() + PERSON.available.slice(1)}</span>
          <br /><span className="text-gray">{PERSON.looking}</span>
        </p>

        {/* the headline: set left, lots of air above it */}
        <h1 ref={headRef} className="col-span-12 t-hero whitespace-nowrap text-[min(9vw,8.5rem)] max-sm:text-[13vw] leading-[0.95] lg:mt-[10vh] select-none">
          <span className="sr-only">{PERSON.name}, {PERSON.role}: </span>
          {HEAD.map(([w, tone], i) => (
            <span key={w} aria-hidden {...(w === 'Code.' ? { 'data-particles': 'text', 'data-particles-boot': '' } : {})} data-word className={`inline-block pb-[0.14em] -mb-[0.14em] ${tone}`}>
              {[...w].map((c, k) => <span key={k} data-ch className="inline-block will-change-transform">{c}</span>)}{i < HEAD.length - 1 ? '\u00a0' : ''}
            </span>
          ))}
          <span className="sr-only">Design trifft Code.</span>
        </h1>

        {/* the description, offset to the right; the numbers small at the bottom right */}
        <div data-in className={`col-span-12 sm:col-span-7 lg:col-start-6 lg:col-span-4 ${small}`}>
          <p className="text-ink">{PERSON.role} &amp; Medieninformatik.</p>
          <p className="text-gray">Web-Apps, iOS-Apps und Interfaces – vom Entwurf bis zur Datenbank.</p>
          <div className="mt-5 flex items-center gap-2">
            <a href="#arbeiten" onClick={(e) => { e.preventDefault(); goTo('arbeiten') }} className="group btn-chrome inline-flex items-center h-9 px-4 rounded-full text-[14px] font-medium">
              <span className="roll"><span>Arbeiten ansehen</span><span aria-hidden>Arbeiten ansehen</span></span>
            </a>
            <button type="button" onClick={() => emit('spotlight')} className="press inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[14px] text-gray hover:text-ink transition-colors">
              Suchen <span className="kbd">⌘K</span>
            </button>
          </div>
        </div>
        <dl data-in className={`col-span-12 sm:col-span-5 lg:col-start-10 lg:col-span-3 self-end grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 ${small}`}>
          {[['Projekte', String(PROJECTS.length).padStart(2, '0')], ['Werkzeuge', TOOLS], ['Seit', 2020]].map(([k, v]) => [
            <dt key={k} className="text-gray">{k}</dt>, <dd key={k + 'v'} className="text-ink tabular-nums text-right">{v}</dd>,
          ])}
        </dl>
      </div>

      {/* ── the stage ── */}
      <div data-stage className="mt-16 sm:mt-24">
        <div data-grow className="relative mx-auto max-w-[76rem] aspect-[4/5] sm:aspect-[16/10] rounded-sheet overflow-hidden glass flat will-change-transform">
          {/* a click on the window opens the project (the video's own pause button excepted); keyboard
              users get the same through the project list below */}
          <div data-mainwin data-cursor="Öffnen ↗" data-buddy="Das ist Creator's Journal. Echt, nicht gemockt." onClick={(e) => { if (!e.target.closest('button')) emit('open-project', journal.slug) }}
            className="absolute left-1/2 -translate-x-1/2 top-[9%] sm:top-[10%] w-[92%] sm:w-[72%] text-left cursor-pointer transition-transform duration-700 ease-sys hover:scale-[1.01]">
            <Window dark flat title={`${journal.title} — ${journal.kind}`} className="shadow-lift">
              <div className="relative aspect-[16/10]"><ProjectMedia p={journal} /></div>
            </Window>
          </div>
          <button type="button" data-phone onClick={() => emit('open-project', 'dienstzeit')} aria-label="Dienstzeit öffnen" data-cursor="Öffnen ↗" data-buddy="Dienstzeit – rechnet nach SAZV."
            className="absolute right-[8%] sm:right-[9%] bottom-[-4%] w-[42%] sm:w-[17%] aspect-[390/844] rounded-[16%/7.4%] overflow-hidden ring-[6px] ring-[#111] shadow-lift bg-[#06110B] transition-transform duration-700 ease-sys hover:-translate-y-2">
            <img src="/videos/dienstzeit.jpg" alt="" className="w-full h-full object-cover object-top" />
          </button>
        </div>
      </div>
    </div>
  )
}
