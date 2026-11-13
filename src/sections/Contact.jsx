import { useRef, useState } from 'react'
import pkg from '../../package.json'
import { PERSON, CHANNELS } from '../data/content'
import { useMotion, gsap, prefersReduced } from '../lib/motion'
import { notify, copyText } from '../lib/events'
import { goTo, useBerlinTime } from '../lib/nav'
import Window from '../ui/Window'

const TOPICS = ['Praktikum', 'Werkstudentenstelle', 'Projektidee', 'Einfach Hallo']
const ver = (name) => (pkg.dependencies[name] ?? '').replace(/^\D*/, '').split('.').slice(0, 2).join('.')

// A message, written right here: the topic sets the subject, "Senden" hands everything to the
// visitor's mail app (mailto — nothing is sent through this site). The address can be copied.
// Sending folds the message into a paper plane that takes off towards the top right; the window
// comes back empty-handed a moment later, and only then does the mail app open.
function Compose() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [text, setText] = useState('')
  const winRef = useRef(), planeRef = useRef()
  const send = (e) => {
    e.preventDefault()
    const href = `mailto:${PERSON.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(text)}`
    const go = () => { notify({ app: 'Mail', title: 'Mail-App wird geöffnet', body: `Betreff: ${topic}`, icon: '✉' }); window.location.href = href }
    if (prefersReduced()) return go()
    const w = winRef.current, plane = planeRef.current
    gsap.timeline({ onComplete: go })
      // the message folds: it squeezes into a sheet and tips forward
      .to(w, { scaleY: 0.08, scaleX: 0.5, rotationX: 50, opacity: 0, duration: 0.45, ease: 'power3.in', transformPerspective: 900, transformOrigin: '50% 50%' })
      // the plane takes off from where the window was, climbs in an arc and leaves the screen
      .fromTo(plane, { opacity: 0, scale: 0.4, x: 0, y: 0, rotation: -10 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.35)
      .to(plane, { x: () => innerWidth * 0.55, duration: 1.1, ease: 'power2.in' }, 0.5)
      .to(plane, { y: () => -innerHeight * 0.7, rotation: -28, duration: 1.1, ease: 'power1.in' }, 0.5)
      .to(plane, { opacity: 0, duration: 0.2 }, 1.45)
      .to(w, { scaleY: 1, scaleX: 1, rotationX: 0, opacity: 1, duration: 0.7, ease: 'expo.out', clearProps: 'transform' }, 1.3)
  }
  const copy = () => copyText(PERSON.email).then((ok) => ok && notify({ app: 'Zwischenablage', title: 'Adresse kopiert', body: PERSON.email, icon: '⌘' }))
  return (
    <div className="relative">
    {/* the paper plane (only seen while sending) */}
    <svg ref={planeRef} aria-hidden viewBox="0 0 48 48" className="pointer-events-none absolute left-1/2 top-1/2 -ml-8 -mt-8 w-16 h-16 opacity-0 z-10 drop-shadow-[0_10px_20px_rgb(0_0_0/.25)]">
      <path d="M4 22 44 6 32 42 22 28z" fill="#fff" stroke="#c9ccd2" strokeWidth="1" strokeLinejoin="round" />
      <path d="M22 28 44 6 18 25z" fill="#e7e9ee" />
      <path d="M22 28 24 38 28 32z" fill="#d6d9df" />
    </svg>
    <div ref={winRef}>
    <Window title="Neue E-Mail" className="w-full max-w-[44rem]">
      <form onSubmit={send}>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-line text-[15px]">
          <span className="text-gray w-16">An:</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/60 ring-1 ring-black/5 px-3 py-0.5">{PERSON.email}</span>
          <button type="button" onClick={copy} className="press ml-auto t-mono text-gray hover:text-ink rounded-full px-2.5 py-1 hover:bg-mist">kopieren</button>
        </div>
        <fieldset className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-line">
          <legend className="sr-only">Betreff</legend>
          <span aria-hidden className="text-gray w-16 text-[15px]">Betreff:</span>
          {TOPICS.map((t) => (
            <label key={t} className={`press cursor-pointer rounded-full px-3 py-1 text-[14px] ring-1 transition-colors ${topic === t ? 'bg-ink text-canvas ring-ink' : 'ring-line hover:bg-mist'}`}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />{t}
            </label>
          ))}
        </fieldset>
        <label className="block px-5 py-4">
          <span className="sr-only">Nachricht</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Hallo Vincent, …"
            className="w-full resize-none bg-transparent outline-none text-[16px] leading-relaxed placeholder:text-faint" />
        </label>
        <div className="flex items-center justify-between gap-4 px-5 pb-5">
          <p className="t-cap">öffnet dein Mailprogramm</p>
          <button type="submit" className="group btn-chrome inline-flex items-center gap-2 h-10 px-5 rounded-full text-[14px] font-medium">
            <span className="roll"><span>Senden</span><span aria-hidden>Senden</span></span>
            <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="transition-transform duration-500 ease-sys group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M15 1 1 7l5 2 2 6z" /></svg>
          </button>
        </div>
      </form>
    </Window>
    </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef()
  const time = useBerlinTime()
  useMotion(ref, (el) => {
    // the two words close in from either side, the mail window rises beside them
    const st = { trigger: el, start: 'top 85%', end: 'top 15%', scrub: 0.6 }
    gsap.timeline({ scrollTrigger: st })
      .fromTo(el.querySelector('[data-w1]'), { xPercent: -24, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0)
      .fromTo(el.querySelector('[data-w2]'), { xPercent: 60, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0.1)
      .fromTo(el.querySelector('[data-mail]'), { y: 160, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.15)
  })

  return (
    <footer ref={ref} id="kontakt" aria-labelledby="kontakt-title" className="frame pt-[var(--space-section)] pb-8 overflow-x-clip">
      <h2 id="kontakt-title" className="t-hero text-[clamp(3.4rem,13vw,12rem)] leading-[0.9]">
        <span data-w1 className="inline-block">Schreib</span> <span data-w2 className="inline-block text-gray">mir.</span>
      </h2>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-10 items-start">
        <p className="col-span-12 lg:col-span-4 t-lead text-gray max-w-[24ch]">Praktikum, Werkstudentenstelle oder eine Projektidee? Ich freue mich über deine Nachricht.</p>
        <div data-mail className="col-span-12 lg:col-start-6 lg:col-span-7"><Compose /></div>
      </div>

      <ul className="mt-12 flex flex-wrap gap-2">
        {CHANNELS.slice(1).map((c) => {
          const ext = c.href.startsWith('http')
          return (
            <li key={c.label}>
              <a href={c.href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
                className="group press inline-flex items-center gap-2 h-10 px-4 rounded-full glass text-[14px]">
                <span className="t-mono text-gray">{c.label}</span>
                <span className="roll"><span>{c.value}</span><span aria-hidden>{c.value}</span></span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* the menu bar's right end, at the bottom of the page */}
      <div className="mt-[var(--space-section)] flex flex-wrap items-center justify-between gap-3 t-cap border-t border-line pt-5">
        <p>© {new Date().getFullYear()} {PERSON.name}</p>
        <p className="tabular-nums">v{pkg.version} · react {ver('react')} · gsap {ver('gsap')}</p>
        <p className="flex items-center gap-4">
          <span className="tabular-nums">Ortszeit {time}</span>
          <a href="#start" onClick={(e) => { e.preventDefault(); goTo('start') }} className="text-ink hover:text-blue transition-colors">Nach oben ↑</a>
        </p>
      </div>
    </footer>
  )
}
