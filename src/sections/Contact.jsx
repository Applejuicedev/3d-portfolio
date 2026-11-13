import { useRef, useState } from 'react'
import pkg from '../../package.json'
import { PERSON, CHANNELS } from '../data/content'
import { useMotion, riseLines, gsap, EASE } from '../lib/motion'
import { goTo, useBerlinTime } from '../lib/nav'
import { Arrow } from '../ui/Arrow'

// the versions this build runs on, from package.json ("^18.2.0" → "18.2")
const ver = (name) => (pkg.dependencies[name] ?? '').replace(/^\D*/, '').split('.').slice(0, 2).join('.')
const BUILD = `v${pkg.version} · react ${ver('react')} · gsap ${ver('gsap')}`

// The address is the main button: one click copies it (and says so), the arrow beside it opens
// the mail app. The other channels are a plain list.
function Email() {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(PERSON.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }, () => { location.href = `mailto:${PERSON.email}` })
  return (
    <div className="flex items-stretch gap-2 max-w-full">
      <button type="button" onClick={copy} className="group press min-w-0 flex-1 sm:flex-none flex items-center justify-between gap-6 rounded-[4px] bg-lime text-bg px-5 py-4 sm:py-5">
        <span className="text-[clamp(1.1rem,2.6vw,2rem)] font-medium tracking-tight truncate">{PERSON.email}</span>
        <span className="t-label text-bg/70 whitespace-nowrap" aria-live="polite">{copied ? '✓ kopiert' : 'kopieren'}</span>
      </button>
      <a href={`mailto:${PERSON.email}`} aria-label="E-Mail schreiben" className="group press grid place-items-center w-14 sm:w-[4.75rem] flex-none rounded-[4px] border border-line text-ink text-[1.4rem] hover:border-lime hover:text-lime transition-colors">
        <Arrow />
      </a>
    </div>
  )
}

export default function Contact() {
  const ref = useRef()
  const time = useBerlinTime()
  useMotion(ref, (el) => {
    gsap.from(el.querySelectorAll('[data-in]'), { opacity: 0, y: 20, duration: 1, stagger: 0.08, ease: EASE.out, scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
    return riseLines(el.querySelector('h2'), { trigger: el, start: 'top 75%' })
  })

  return (
    <footer ref={ref} id="kontakt" aria-labelledby="kontakt-title" className="relative frame pt-[var(--space-section)] pb-24 sm:pb-20">
      <span aria-hidden className="absolute inset-x-[var(--gutter)] top-0 h-px bg-line" />
      <div className="grid12 gap-y-10">
        <p data-in className="col-span-4 lg:col-span-3 t-label"><span className="text-lime">(05)</span> Kontakt</p>
        <div className="col-span-4 lg:col-span-9">
          <h2 id="kontakt-title" className="t-mega">Schreib <span className="t-serif">mir.</span></h2>
          <p data-in className="t-lead text-muted mt-8 max-w-[30ch]">Praktikum, Werkstudentenstelle oder eine Projektidee? Ich freue mich über deine Nachricht.</p>
          <div data-in className="mt-12"><Email /></div>
          <ul data-in className="mt-14 border-b border-line max-w-[44rem]">
            {CHANNELS.slice(1).map((c) => {
              const ext = c.href.startsWith('http')
              return (
                <li key={c.label} className="border-t border-line">
                  <a href={c.href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
                    className="group grid grid-cols-[7rem_1fr_auto] items-center py-4 hover:text-lime transition-colors">
                    <span className="t-label">{c.label}</span>
                    <span className="text-[16px] tracking-tight"><span className="roll"><span>{c.value}</span><span aria-hidden>{c.value}</span></span></span>
                    <Arrow />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="mt-[var(--space-section)] grid12 gap-y-3 t-label items-end">
        <p className="col-span-2 lg:col-span-3">© {new Date().getFullYear()} {PERSON.name}</p>
        <p className="col-span-2 lg:col-span-3 max-lg:text-right">Ortszeit <span className="text-ink tabular-nums">{time}</span></p>
        <p className="col-span-2 lg:col-span-3 tabular-nums text-faint">{BUILD}</p>
        <p className="col-span-2 lg:col-span-3 text-right">
          <a href="#start" onClick={(e) => { e.preventDefault(); goTo('start') }} className="group inline-flex items-center gap-2 text-ink hover:text-lime transition-colors">
            Nach oben <Arrow dir="s" className="rotate-180" />
          </a>
        </p>
      </div>
    </footer>
  )
}
