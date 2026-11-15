import { useEffect, useRef, useState } from 'react'
import { PERSON, CHANNELS } from '../data/content'
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion'
import { goTo, useBerlinTime } from '../lib/nav'
import { body } from '../body/Body'
import ProjectView from './ProjectView'
import Loader from './Loader'
import { on, emit, lastOf } from '../lib/events'
import Cursor from './Cursor'
import Work from './Work'
import { Chars, riseChars, scramble } from './textfx'

// The page: dark, light type in two families (a grotesk for words, a mono for labels), a lot of
// space — and the body of points behind it (Body.jsx), which takes the form each part names with
// data-form. No navigation: one path down. Some parts give the body a new form; others keep the
// form that is there and only let their lines fly up past it. Laid out with the laws of UX in mind:
// large targets (Fitts), little to read (Miller), one highlight only for the one thing to do —
// write (Von Restorff) — and the page ends on it (peak–end).

const ORB = { 'data-form': 'earth', 'data-at': 'left', 'data-tilt': '0.4', 'data-size': '1.25', 'data-alpha': '1.3' }

// as each line comes in: text rises out of a soft blur; a small label (a lone .t-cap) decodes
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-reveal]').forEach((n) => {
        const st = { trigger: n, start: 'top 88%', once: true }
        if (n.classList.contains('t-cap') && !n.children.length) { n.style.opacity = '0'; gsap.timeline({ scrollTrigger: st }).call(() => scramble(n)) }
        else gsap.from(n, { y: 24, opacity: 0, filter: 'blur(8px)', duration: 1.2, ease: 'expo.out', scrollTrigger: st })
      })
    }, el)
    return () => ctx.revert()
  }, [ref])
}

// the lines fly up from below, each a little later than the one before, tied to the scroll — while
// the form behind them stays where it is
function useFly(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-fly]').forEach((n, i) => {
        gsap.fromTo(n, { y: () => innerHeight * 0.55, opacity: 0 }, {
          y: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: `top+=${i * 6}% bottom`, end: `top+=${i * 6}% 25%`, scrub: 0.8, invalidateOnRefresh: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [ref])
}

function Hero() {
  const ref = useRef()
  // everything waits for the loader: then the points gather; the name builds from the left, the
  // trade from the right, letter by letter; the small lines in the corners decode one by one
  const time = useBerlinTime()
  useEffect(() => {
    const el = ref.current, small = [...el.querySelectorAll('[data-sc]')]
    if (!prefersReduced()) { gsap.set(el.querySelectorAll('[data-ch]'), { opacity: 0 }); small.forEach((n) => { n.style.opacity = '0' }) }
    // the form builds slowly out of space; the words come as it nears completion (at 70 %)
    const words = () => {
      emit('formed')
      riseChars(el.querySelector('[data-name]'), { delay: 0 })
      riseChars(el.querySelector('[data-trade]'), { delay: 0.2, from: 'end' })
      small.forEach((n, k) => scramble(n, { delay: 0.6 + k * 0.18 }))
    }
    let said = false
    const go = () => gsap.to(body, { gather: 1, duration: prefersReduced() ? 0 : 5.5, ease: 'power2.inOut', onUpdate() { if (!said && this.progress() >= 0.7) { said = true; words() } }, onComplete: () => { if (!said) { said = true; words() } } })
    if (lastOf('loaded')) { go(); return }
    const off = on('loaded', () => { off(); go() })
    return off
  }, [])
  return (
    <section ref={ref} id="start" data-form="render" data-spin="sway" data-size="1.15" data-tilt="0.12" data-alpha="1.2" data-solid className="relative h-[100svh]">
      <h1 className="sr-only">{PERSON.name}, {PERSON.role}</h1>
      <p data-name aria-hidden className="absolute left-[var(--gutter)] top-1/2 -translate-y-1/2 t-title max-md:top-[18%]"><Chars text={PERSON.name} /></p>
      <p data-trade aria-hidden className="absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 t-title text-right max-md:top-auto max-md:bottom-[18%]"><Chars text={PERSON.role} /></p>
      <p data-sc className="absolute left-[var(--gutter)] top-6 t-cap">{`VF — Portfolio ${new Date().getFullYear()}`}</p>
      <p data-sc className="absolute right-[var(--gutter)] top-6 t-cap tabular-nums">{`Frankfurt, Germany — ${time}`}</p>
      <p data-sc className="absolute left-[var(--gutter)] bottom-7 t-cap">{`${PERSON.looking}, ${PERSON.available}`}</p>
      <a data-sc href="/resume.html" className="absolute right-[var(--gutter)] bottom-5 py-2 t-cap text-ink hover:text-gray transition-colors">Résumé ↗</a>
    </section>
  )
}

// a cube of building blocks takes over from the galaxy, on the right, turning slowly; the sentence flies up on the
// left, line by line
function Statement() {
  const ref = useRef(); useFly(ref)
  return (
    <section ref={ref} id="idea" data-form="blocks" data-at="right" data-tilt="0.55" data-size="1.05" data-alpha="1.4"
      className="frame min-h-[130svh] flex items-center">
      <p className="t-display relative">
        <span data-fly className="block whitespace-nowrap">I design and build apps,</span>
        <span data-fly className="block text-gray">from the first sketch</span>
        <span data-fly className="block text-gray">to the database.</span>
      </p>
    </section>
  )
}

function Origin() {
  const ref = useRef(); useReveal(ref)
  return (
    <section ref={ref} id="origin" aria-labelledby="origin-title" data-form="germany" data-at="right" data-spin="sway" data-tilt="0" data-size="1.75"
      className="frame min-h-[100svh] flex items-center">
      <div className="relative">
        <h2 id="origin-title" data-reveal className="t-cap">Where I'm from</h2>
        <p data-reveal className="t-display mt-4">Frankfurt,<br /><span className="text-gray">Germany.</span></p>
        <p data-reveal className="t-cap mt-6 tabular-nums">50.11° N — 8.68° E</p>
      </div>
    </section>
  )
}

function Anywhere() {
  const ref = useRef(); useReveal(ref)
  return (
    <section ref={ref} id="remote" aria-labelledby="remote-title" {...ORB} className="frame min-h-[100svh] flex items-center">
      <div className="relative ml-auto max-w-[30rem]">
        <h2 id="remote-title" data-reveal className="t-cap">Remote</h2>
        <p data-reveal className="t-display mt-4">Working <span className="text-gray">from anywhere.</span></p>
      </div>
    </section>
  )
}

// the one way to reach me, always there: a small capsule at the top centre that takes you down to
// the contact; it steps aside once you are there
function ContactPill() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!prefersReduced()) gsap.set(el, { opacity: 0, y: -10 })
    const show = () => gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'expo.out' })
    const off = lastOf('formed') ? (show(), () => {}) : on('formed', show)
    const st = ScrollTrigger.create({ trigger: '#contact', start: 'top 60%', onToggle: (self) => gsap.to(el, { opacity: self.isActive ? 0 : 1, y: self.isActive ? -10 : 0, duration: 0.5, ease: 'power2.out', pointerEvents: self.isActive ? 'none' : 'auto' }) })
    return () => { off(); st.kill() }
  }, [])
  return (
    <a ref={ref} href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact') }}
      className="fixed z-50 left-1/2 -translate-x-1/2 top-4 inline-flex items-center gap-2 h-9 px-4 rounded-full border border-ink/15 bg-canvas/40 backdrop-blur-md text-[13px] hover:border-ink transition-colors">
      <i aria-hidden className="block w-1.5 h-1.5 rounded-full bg-ink" />Contact
    </a>
  )
}

function Contact() {
  const ref = useRef(), time = useBerlinTime()
  useEffect(() => {
    const el = ref.current
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: el.querySelector('h2'), start: 'top 78%', end: 'top 22%', scrub: 0.6, invalidateOnRefresh: true } })
        .fromTo('[data-w1]', { x: () => -innerWidth * 0.5, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('[data-w2]', { x: () => innerWidth * 0.5, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <footer ref={ref} id="contact" aria-labelledby="contact-title" data-form="text:@" data-at="center" data-spin="sway" data-tilt="0" data-size="2.6" data-alpha="0.28"
      className="frame min-h-[100svh] pt-[var(--space-section)] pb-8 flex flex-col overflow-x-clip">
      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        <h2 id="contact-title" className="t-hero">
          <span data-w1 className="inline-block">Say</span> <span data-w2 className="inline-block text-gray">hello.</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${PERSON.email}`} className="group inline-flex items-center gap-4 h-12 pl-5 pr-4 rounded-full bg-blue text-on-accent text-[14px] hover:brightness-110 transition">
            {PERSON.email} <span aria-hidden className="transition-transform duration-500 ease-sys group-hover:translate-x-1">→</span>
          </a>
          <a href="/resume.html" className="group inline-flex items-center gap-3 h-12 pl-5 pr-4 rounded-full border border-ink/15 hover:border-ink transition-colors text-[14px]">
            Résumé <span aria-hidden className="transition-transform duration-500 ease-sys group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-1 text-[14px]">
          {CHANNELS.slice(1).map((c) => {
            const ext = c.href.startsWith('http')
            return <li key={c.label}><a href={c.href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} className="inline-block py-2 text-gray hover:text-ink"><span className="t-cap mr-2">{c.label}</span>{c.value}</a></li>
          })}
        </ul>
      </div>
      <div className="flex flex-wrap justify-between gap-3 t-cap border-t border-line pt-5">
        <p>© {new Date().getFullYear()} {PERSON.name}</p>
        <p className="tabular-nums">Local time {time}</p>
        <a href="#start" onClick={(e) => { e.preventDefault(); goTo('start') }} className="text-ink">Back to top ↑</a>
      </div>
    </footer>
  )
}

export default function Site() {
  const [open, setOpen] = useState(null)
  useEffect(() => { document.fonts.ready.then(() => ScrollTrigger.refresh()) }, [])
  return (
    <>
      <main className="relative z-[1]">
        <Hero />
        <Work onOpen={setOpen} />
        <Statement />
        <Origin />
        <Anywhere />
      </main>
      <div className="relative z-[1]"><Contact /></div>
      <ProjectView p={open} onClose={() => setOpen(null)} />
      <ContactPill />
      <Loader />
      <Cursor />
    </>
  )
}
