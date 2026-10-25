import { useEffect, useRef, useState } from 'react'
import { Roll, Magnetic, Decode } from './ui'
import { useMotion, gsap, EASE, prefersReduced } from './motion'

const NAV = [
  { id: 'projekte', label: 'Projekte' },
  { id: 'uber-mich', label: 'Über mich' },
  { id: 'stack', label: 'Stack' },
  { id: 'kontakt', label: 'Kontakt' },
]

// in-page jump: smooth (html scroll-behavior), interrupted by any wheel/touch input; the URL stays
// clean, so a reload starts at the top again (see useDeepLink in App)
const go = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView()
}

// The name — the only place it stands on the page. Each letter sits in its own mask: on load the
// letters rise into place one after another (the surname a beat later); on hover or keyboard focus
// they roll through once, letter by letter, and come back. Letters are inline-blocks of fixed
// width, so nothing around them moves. Screen readers get the plain name (aria-label).
const NAME = 'Vincent Fidanli'
function NameMark({ onClick }) {
  const ref = useRef(), busy = useRef(false)
  const chars = () => ref.current.querySelectorAll('[data-ch]')
  useMotion(ref, () => {
    gsap.from(chars(), { yPercent: 115, duration: 0.9, ease: EASE.out, delay: 0.15, stagger: (i) => i * 0.035 + (i > 7 ? 0.08 : 0) })
  })
  const roll = () => {
    if (busy.current || prefersReduced()) return
    busy.current = true
    const tl = gsap.timeline({ onComplete: () => { busy.current = false } })
    // per letter: out at the top, back in from below — staggered, so a wave runs through the name
    chars().forEach((ch, i) => tl.add(gsap.timeline()
      .to(ch, { yPercent: -115, duration: 0.22, ease: 'power2.in' })
      .set(ch, { yPercent: 115 })
      .to(ch, { yPercent: 0, duration: 0.45, ease: EASE.out }), i * 0.025))
  }
  return (
    <a ref={ref} href="#start" onClick={onClick} onMouseEnter={roll} onFocus={roll} aria-label={`${NAME} – zum Anfang`}
      className="text-[14px] font-medium tracking-tight text-ink whitespace-nowrap">
      <span aria-hidden className="inline-flex">
        {[...NAME].map((c, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span data-ch className="inline-block">{c === ' ' ? '\u00a0' : c}</span>
          </span>
        ))}
      </span>
    </a>
  )
}

// Which section is under the middle of the screen — the nav marks it with the signal dot
function useCurrentSection() {
  const [current, setCurrent] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id) })
    }, { rootMargin: '-50% 0px -50% 0px' })
    // sections mount one after another (App), so look again until all are there
    // the hero too: back at the top, no link is marked (it has none)
    const observe = () => ['start', ...NAV.map((n) => n.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    observe()
    const t = setInterval(observe, 500)
    const stop = setTimeout(() => clearInterval(t), 4000)
    return () => { io.disconnect(); clearInterval(t); clearTimeout(stop) }
  }, [])
  return current
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // small screens: the section links fold into a menu
  const current = useCurrentSection()

  // the menu closes on Escape and as soon as the page is scrolled
  useEffect(() => {
    if (!open) return
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    const scroll = () => setOpen(false)
    window.addEventListener('keydown', key)
    window.addEventListener('scroll', scroll, { passive: true, once: true })
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('scroll', scroll) }
  }, [open])
  const jump = (id) => (e) => { setOpen(false); go(id)(e) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // solid surface and a hairline once the page moves under it — no blur, no glass
    // select-none: clicking (and double-clicking) a link must not select its text
    <nav aria-label="Hauptnavigation"
      className={`select-none fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${open ? 'bg-bg border-line' : scrolled ? 'nav-glass border-line' : 'bg-transparent border-transparent'}`}>
      <div className="frame h-14 flex items-center justify-between gap-6">
        <NameMark onClick={go('start')} />
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-7">
            {NAV.slice(0, 3).map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} aria-current={current === id ? 'location' : undefined}
                  className={`group flex items-center gap-2 text-[13px] transition-colors duration-150 ${current === id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  <span aria-hidden className={`w-1 h-1 rounded-full transition-[background-color,transform] duration-[420ms] ease-sys ${current === id ? 'bg-signal scale-100' : 'bg-muted scale-0'}`} />
                  <Decode>{label}</Decode>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="md:hidden press text-[13px] text-ink py-1.5" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
            {open ? 'Schließen' : 'Menü'}
          </button>
          {/* contact is the one button in the bar */}
          <Magnetic>
            <a href="#kontakt" onClick={go('kontakt')} aria-current={current === 'kontakt' ? 'location' : undefined}
              className="group press inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[13px] text-ink transition-colors duration-[420ms] ease-sys hover:border-signal">
              <span aria-hidden className={`w-1.5 h-1.5 rounded-full bg-signal transition-transform duration-[420ms] ease-sys ${current === 'kontakt' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`} />
              <Roll>Kontakt</Roll>
            </a>
          </Magnetic>
        </div>
      </div>
      {open && (
        <ul id="nav-menu" className="md:hidden frame pb-5 pt-1 flex flex-col">
          {NAV.slice(0, 3).map(({ id, label }) => (
            <li key={id} className="border-t border-line">
              <a href={`#${id}`} onClick={jump(id)} aria-current={current === id ? 'location' : undefined}
                className={`flex items-center justify-between py-3.5 text-[17px] ${current === id ? 'text-ink' : 'text-muted'}`}>
                {label}<span aria-hidden className="text-faint">↓</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
