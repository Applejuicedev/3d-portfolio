import { useRef } from 'react'
import pkg from '../../package.json'
import { ArrowLink, PillLink } from './ui'
import { useMotion } from './motion'
import { headingReveal } from './Section'
import Gyro from './Gyro'
import Accent from './Accent'

const EMAIL = 'vincent@fidanli.de'
const CHANNELS = [
  { label: 'Telefon', value: '0151 70801974', href: 'tel:+4915170801974' },
  { label: 'GitHub', value: '@applejuicedev', href: 'https://github.com/applejuicedev' },
  { label: 'Instagram', value: '@arcterxandapple', href: 'https://instagram.com/arcterxandapple' },
]

// the versions this build actually runs on, from package.json ("^18.2.0" → "18.2")
const ver = (name) => (pkg.dependencies[name] ?? '').replace(/^\D*/, '').split('.').slice(0, 2).join('.')
const BUILD = `v${pkg.version} · react ${ver('react')} · gsap ${ver('gsap')}`

// The close: one sentence in display size whose letters set themselves once as it scrolls in,
// the address as the page's main button, the other channels as a short list.
export default function Footer() {
  const ref = useRef(), mailRef = useRef()
  useMotion(ref, (el) => headingReveal(el, el.querySelector('h2'), [], { type: 'chars', start: 'top 75%', stagger: 0.035 }), [], { idle: true })

  return (
    <footer ref={ref} id="kontakt" aria-labelledby="kontakt-title" className="relative isolate frame section-y pb-10">
      {/* the finale: colour rising from the bottom edge, cut by a slanted line */}
      <Accent className="left-[calc(50%-50vw)] w-screen bottom-0 h-[72%]" strength={0.62} drift={30}
        shape="polygon(0 62%, 48% 34%, 100% 4%, 100% 100%, 0 100%)"
        gradient="linear-gradient(to top, #000 0%, rgba(0,0,0,.55) 38%, transparent 88%)" />
      <div className="grid12 gap-y-6">
        <p className="col-span-4 lg:col-span-2 t-meta pt-[1.4em] tabular-nums">(04) Kontakt<span className="block text-faint">kontakt.tsx</span></p>
        <div className="col-span-4 lg:col-span-7">
          <h2 id="kontakt-title" className="glow t-display text-ink">Schreib mir.</h2>
          <p className="t-lead text-muted mt-8 max-w-[32ch]">Praktikum, Werkstudentenstelle oder eine Projektidee? Ich freue mich über deine Nachricht.</p>
        </div>
        <div className="col-span-4 lg:col-span-3"><Gyro targetRef={mailRef} /></div>
      </div>

      <div className="grid12 gap-y-10 mt-14">
        <div ref={mailRef} className="col-span-4 lg:col-start-3 lg:col-span-10 justify-self-start">
          <PillLink href={`mailto:${EMAIL}`} className="text-[15px]">{EMAIL}</PillLink>
        </div>
        <ul className="col-span-4 lg:col-start-3 lg:col-span-6 border-b border-line">
          {CHANNELS.map((c) => (
            <li key={c.label} className="grid grid-cols-[8rem_1fr] items-center border-t border-line py-4">
              {/* the rows lie on the accent field: ink, so they keep ≥ 4.5:1 on the brightest grains */}
              <span className="t-meta text-ink">{c.label}</span>
              <ArrowLink href={c.href} className="justify-self-start text-[15px] text-ink">{c.value}</ArrowLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[var(--space-section)] pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 t-meta text-ink">
        <p>© {new Date().getFullYear()} Vincent Fidanli</p>
        <p className="tabular-nums">{BUILD}</p>
        <a href="#start" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }) }} className="group press inline-flex items-center gap-2">
          <span className="roll"><span>Nach oben</span><span aria-hidden>Nach oben</span></span>
          <span aria-hidden className="arrow arrow-s rotate-180"><span>↓</span><span>↓</span></span>
        </a>
      </div>
    </footer>
  )
}
