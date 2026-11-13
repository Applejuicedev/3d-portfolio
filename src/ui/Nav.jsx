import { useLayoutEffect, useRef } from 'react'
import { booted } from '../lib/events'
import { gsap, prefersReduced } from '../lib/motion'
import { SECTIONS, PERSON } from '../data/content'
import { goTo, useCurrentSection } from '../lib/nav'

const IDS = SECTIONS.map((s) => s.id)
const LINKS = SECTIONS.filter((s) => s.id !== 'kontakt')

// Two floating pills. Left: the mark, the name and the sections, a soft plate sliding under the
// current one. Right: the one dark button, Kontakt. On phones the section links fold away
// (⌘K / Spotlight still lists everything).
export default function Nav() {
  const current = useCurrentSection(IDS)
  const listRef = useRef(), plateRef = useRef()

  useLayoutEffect(() => {
    const a = listRef.current?.querySelector('[aria-current]')?.closest('li'), m = plateRef.current
    if (!m) return
    if (!a) { m.style.opacity = '0'; return }
    m.style.opacity = '1'; m.style.transform = `translateX(${a.offsetLeft}px)`; m.style.width = `${a.offsetWidth}px`
  }, [current])

  // the entrance, once the terminal is gone: the two pills come down out of a blur one after the
  // other, their contents a beat later
  const navRef = useRef()
  useLayoutEffect(() => {
    const pills = navRef.current.querySelectorAll(':scope > div'), parts = navRef.current.querySelectorAll(':scope > div > *')
    if (prefersReduced()) return
    gsap.set(pills, { opacity: 0, y: -18, scale: 0.94, filter: 'blur(10px)' }); gsap.set(parts, { opacity: 0, y: -6 })
    booted.then(() => gsap.timeline({ delay: 0.15 })
      .to(pills, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.14, ease: 'expo.out', clearProps: 'all' })
      .to(parts, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'expo.out', clearProps: 'all' }, 0.25))
  }, [])

  const jump = (id) => (e) => { e.preventDefault(); goTo(id) }
  return (
    <nav ref={navRef} data-nav aria-label="Hauptnavigation" className="fixed z-[100] inset-x-0 top-3 sm:top-4 frame flex items-start justify-between gap-3 pointer-events-none">
      <div data-nav-pill className="pointer-events-auto glass rounded-full flex items-center h-11 pl-1.5 pr-1.5">
        <a href="#start" onClick={jump('start')} className="group flex items-center px-3 h-8 rounded-full" aria-label={`${PERSON.name} – zum Anfang`}>
          <span className="text-[14px] font-medium tracking-tight whitespace-nowrap"><span className="roll"><span>{PERSON.name}</span><span aria-hidden>~/vincent</span></span></span>
        </a>
        <span aria-hidden className="hidden md:block w-px h-5 bg-line mx-1" />
        <ul ref={listRef} className="relative hidden md:flex items-center">
          <li ref={plateRef} aria-hidden className="absolute left-0 top-0 h-8 rounded-full bg-white/70 shadow-[inset_0_1px_0_#fff,0_1px_3px_rgb(0_0_0/.08)] transition-[transform,width,opacity] duration-500 ease-sys" />
          {LINKS.map((s) => (
            <li key={s.id} className="relative">
              <a href={`#${s.id}`} onClick={jump(s.id)} aria-current={current === s.id ? 'location' : undefined}
                className={`flex items-center h-8 px-3.5 rounded-full text-[14px] transition-colors duration-300 ${current === s.id ? 'text-ink' : 'text-gray hover:text-ink'}`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-auto glass rounded-full flex items-center h-11 p-1.5">
        <a data-nav-kontakt href="#kontakt" onClick={jump('kontakt')} aria-current={current === 'kontakt' ? 'location' : undefined}
          className="group btn-chrome flex items-center h-8 px-4 rounded-full text-[14px] font-medium">
          <span className="roll"><span>Kontakt</span><span aria-hidden>Schreib mir</span></span>
        </a>
      </div>
    </nav>
  )
}
