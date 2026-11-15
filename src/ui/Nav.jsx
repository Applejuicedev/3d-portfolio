import { useLayoutEffect, useRef } from 'react'
import { booted } from '../lib/events'
import { gsap, prefersReduced } from '../lib/motion'
import { SECTIONS } from '../data/content'
import { goTo, useCurrentSection } from '../lib/nav'
import ThemeSwitch from './ThemeSwitch'

const IDS = SECTIONS.map((s) => s.id)
const LINKS = SECTIONS.filter((s) => s.id !== 'kontakt')

// The navigation, as iOS 26 draws a tab bar: one floating capsule of Liquid Glass in the middle,
// the sections as plain words in it, a brighter drop of glass sliding under the current one. Kontakt,
// the one thing to do, stands apart on the right as a plain button in the accent colour — the one
// thing not in glass. On the left, the colour palette (ThemeSwitch).
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
    const pills = navRef.current.querySelectorAll(':scope > div, :scope > a'), parts = navRef.current.querySelectorAll(':scope > div > *')
    if (prefersReduced()) return
    gsap.set(pills, { opacity: 0, y: -18, scale: 0.94, filter: 'blur(10px)' }); gsap.set(parts, { opacity: 0, y: -6 })
    booted.then(() => gsap.timeline({ delay: 0.15 })
      .to(pills, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.14, ease: 'expo.out', clearProps: 'all' })
      .to(parts, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'expo.out', clearProps: 'all' }, 0.25))
  }, [])

  const jump = (id) => (e) => { e.preventDefault(); goTo(id) }
  return (
    <nav ref={navRef} data-nav aria-label="Hauptnavigation" className="fixed z-[100] inset-x-0 top-3 sm:top-4 frame flex items-center justify-center pointer-events-none">
      <div data-nav-pill className="glass pointer-events-auto rounded-full p-1 !bg-white/[0.28]">
        <ul ref={listRef} className="relative flex items-center">
          <li ref={plateRef} aria-hidden className="absolute left-0 top-0 h-8 rounded-full bg-paper/70 shadow-[inset_0_0_8px_-2px_rgb(255_255_255),inset_0_1px_0_rgb(255_255_255),0_0_0_.5px_rgb(0_0_0/.05),0_2px_8px_-2px_rgb(0_0_0/.14)] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.34,1.4,.5,1)]" />
          {LINKS.map((s) => (
            <li key={s.id} className="relative">
              <a href={`#${s.id}`} onClick={jump(s.id)} aria-current={current === s.id ? 'location' : undefined}
                className={`flex items-center h-8 px-4 rounded-full text-[13px] font-medium transition-colors duration-300 ${current === s.id ? 'text-ink' : 'text-ink/55 hover:text-ink'}`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ThemeSwitch />
      <a data-nav-kontakt href="#kontakt" onClick={jump('kontakt')} aria-current={current === 'kontakt' ? 'location' : undefined}
        className="pointer-events-auto absolute right-[var(--gutter)] inline-flex items-center h-9 px-4 rounded-full bg-blue hover:brightness-110 active:opacity-70 text-on-accent text-[13px] font-medium transition-colors max-sm:hidden">
        Kontakt
      </a>
    </nav>
  )
}
