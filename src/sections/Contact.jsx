import { useRef, useState } from 'react'
import pkg from '../../package.json'
import { PERSON, CHANNELS } from '../data/content'
import { useMotion, gsap, prefersReduced } from '../lib/motion'
import { notify, copyText } from '../lib/events'
import { goTo, useBerlinTime } from '../lib/nav'
import { Lights } from '../ui/Window'

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
    {/* Apple Mail's compose window: the toolbar with Send, the header fields on white with grey labels
        and hairlines, the recipient as Mail's blue token, the message below */}
    <div ref={winRef} className="mac-window w-full max-w-[44rem] text-[13px] text-ink">
      <form onSubmit={send}>
        <div className="relative flex items-center gap-3 h-[52px] px-4 border-b border-black/[0.07]">
          <Lights />
          <button type="submit" aria-label="Senden" title="Senden" className="glass ml-3 grid place-items-center w-10 h-8 rounded-full text-gray hover:text-blue transition-colors">
            <svg aria-hidden width="17" height="16" viewBox="0 0 17 16"><path d="M1.5 7.3 15.6 1 11 14.8 8 9.2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 9.2 15.6 1" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-ink/85">{topic}</p>
          <span className="ml-auto flex items-center gap-4 text-faint">
            <svg aria-hidden width="15" height="15" viewBox="0 0 15 15"><path d="M9.5 3.5 4 9a1.6 1.6 0 0 0 2.3 2.3l6-6a2.8 2.8 0 0 0-4-4l-6 6a4 4 0 0 0 5.7 5.7l5-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            <span className="text-[14px] font-medium">Aa</span>
          </span>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 border-b border-black/[0.08] bg-paper">
          <span className="w-16 text-right text-faint">An:</span>
          <span className="inline-flex items-center rounded-[5px] bg-blue/[0.14] text-blue px-1.5 py-[1px]">{PERSON.name}</span>
          <button type="button" onClick={copy} className="ml-auto text-[12px] text-faint hover:text-blue transition-colors">Adresse kopieren</button>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 border-b border-black/[0.08] bg-paper">
          <span className="w-16 text-right text-faint">Kopie:</span>
        </div>
        <fieldset className="flex flex-wrap items-center gap-1.5 min-h-10 px-4 py-1.5 border-b border-black/[0.08] bg-paper">
          <legend className="sr-only">Betreff</legend>
          <span aria-hidden className="w-16 text-right text-faint mr-0.5">Betreff:</span>
          {TOPICS.map((t) => (
            <label key={t} className={`cursor-pointer rounded-full px-2.5 py-[3px] transition-colors ${topic === t ? 'bg-blue text-on-accent' : 'text-ink/80 hover:bg-black/[0.05]'}`}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />{t}
            </label>
          ))}
        </fieldset>
        <label className="block px-5 pt-4 pb-2 bg-paper">
          <span className="sr-only">Nachricht</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="Hallo Vincent, …"
            className="w-full resize-none bg-transparent outline-none text-[14px] leading-[1.55] placeholder:text-faint/70" />
        </label>
        <div className="flex items-center justify-between gap-4 px-5 pb-5 bg-paper">
          <p className="text-[12px] text-faint">Gesendet mit deinem Mailprogramm · {PERSON.email}</p>
          <button type="submit" className="group btn-primary gap-2 h-9 px-4 text-[14px]">
            <span className="roll"><span>Senden</span><span aria-hidden>Senden</span></span>
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef()
  const time = useBerlinTime()
  useMotion(ref, (el) => {
    // the two words close in from either side, the mail window rises beside them
    // (measured from the heading, so it plays wherever the page above ends)
    const st = { trigger: el.querySelector('h2'), start: 'top 78%', end: 'top 22%', scrub: 0.6, invalidateOnRefresh: true }
    gsap.timeline({ scrollTrigger: st })
      .fromTo(el.querySelector('[data-w1]'), { x: () => -innerWidth * 0.55, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
      .fromTo(el.querySelector('[data-w2]'), { x: () => innerWidth * 0.55, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
      .fromTo(el.querySelector('[data-mail]'), { y: 160, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.25)
  })

  return (
    <footer ref={ref} id="kontakt" aria-labelledby="kontakt-title" className="frame pt-[var(--space-section)] pb-8 overflow-x-clip">
      <h2 id="kontakt-title" className="t-hero text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9]">
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
                className="group btn gap-2 h-10 px-4 text-[14px]">
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
