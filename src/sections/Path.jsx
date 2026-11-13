import { useRef, useState } from 'react'
import { PERSON, STATIONS, CHAPTERS, LINKS } from '../data/content'
import { useMotion, gsap, ScrollTrigger } from '../lib/motion'
import { scrollToTarget } from '../lib/scroll'
import Window from '../ui/Window'

const FACTS = [
  ['Rolle', PERSON.role],
  ['Fokus', 'Web-Apps · iOS-Apps · Interfaces'],
  ['Heute', 'Soldat auf Zeit · Leichter Späher'],
  ['Studium', 'Medieninformatik B.Sc. · IU · ab 2027'],
  ['Verfügbar', 'ab 2029'],
  ['Sucht', PERSON.looking],
]
const A = ({ href, children }) => <a className="underline decoration-line underline-offset-[0.2em] hover:decoration-ink transition-colors" href={href} target="_blank" rel="noopener noreferrer">{children}</a>

// ── 1 · "Über Vincent": the About-this-Mac panel, flipped up into place by the scroll ──
function About() {
  const ref = useRef()
  useMotion(ref, (el) => {
    gsap.fromTo(el.querySelector('[data-panel]'), { rotateX: -55, y: 80, opacity: 0, transformPerspective: 1400, transformOrigin: '50% 100%' },
      { rotateX: 0, y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 40%', scrub: 0.6 } })
  })
  return (
    <div ref={ref} className="flex justify-center">
      <Window data-panel title="Über Vincent" className="w-full max-w-[44rem]">
        <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-center p-7 sm:p-10">
          <img src="/profile/vincent.jpg" alt={`Porträt von ${PERSON.name}`} width={560} height={560} loading="lazy" decoding="async"
            className="mx-auto w-32 h-32 rounded-full object-cover shadow-lift ring-1 ring-black/5" />
          <div>
            <h3 className="t-title">{PERSON.name}</h3>
            <p className="text-gray mt-1">Medieninformatik · Version 2026</p>
            <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-[14px]">
              {FACTS.map(([k, v]) => [<dt key={k} className="font-semibold text-right pr-4">{k}</dt>, <dd key={k + 'v'} className="text-gray">{v}</dd>])}
            </dl>
          </div>
        </div>
      </Window>
    </div>
  )
}

// ── 2 · the stations as a time line ──
// The stations scroll by at the page's own pace, as a plain list — nothing pinned, nothing flying.
// Beside it, standing still, a time line runs with the scroll from left to right: a playhead moves
// through the years, and each station's bar fills as the playhead passes through it (bars in lanes
// where stations overlap — the night shift beside the study, the study beside the service; open-
// ended ones fade out to the right). Above it the playhead's year, large, in particles that fly from
// year to year (ParticleField, data-particles-live). A bar is a button: it scrolls to its station.
const Y0 = 2020, Y1 = 2031, NOW = 2026 + 10.5 / 12
const pct = (y) => `${((y - Y0) / (Y1 - Y0)) * 100}%`
// overlapping stations go to the next free lane
const LANES = (() => { const ends = []; return STATIONS.map((s) => { let l = ends.findIndex((e) => e <= s.from + 0.01); if (l < 0) l = ends.length; ends[l] = s.to; return l }) })()
// where the playhead is at each station's row (never backwards), and where it ends
const STOPS = STATIONS.reduce((a, s) => [...a, Math.max(a.at(-1) ?? Y0, s.from)], []).concat(2028)

function Scale({ jump }) {
  const lanes = Math.max(...LANES) + 1
  return (
    <div className="mt-10">
      <div className="relative" style={{ height: lanes * 16 - 6 }}>
        {STATIONS.map((s, k) => (
          <button key={s.title} type="button" onClick={() => jump(k)} aria-label={`${s.when}: ${s.title}`}
            className={`group absolute h-[10px] rounded-full overflow-hidden bg-black/[0.08] hover:bg-black/[0.16] transition-colors ${s.open ? '[mask-image:linear-gradient(90deg,#000_55%,transparent)]' : ''}`}
            style={{ left: pct(s.from), width: `calc(${pct(Y0 + s.to - s.from)} - 3px)`, top: LANES[k] * 16 }}>
            <span data-fill className="block h-full bg-ink origin-left scale-x-0" />
          </button>
        ))}
        {/* today */}
        <span aria-hidden className="absolute -top-3 -bottom-3 w-px bg-blue/50" style={{ left: pct(NOW) }}>
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 t-cap text-blue">heute</span>
        </span>
        {/* the playhead */}
        <span data-head aria-hidden className="absolute -top-2 -bottom-2 w-[2px] -ml-px rounded-full bg-ink" style={{ left: pct(Y0) }} />
      </div>
      <div aria-hidden className="relative h-5 mt-4 border-t border-line t-mono text-faint tabular-nums">
        {[2020, 2022, 2024, 2026, 2028, 2030].map((y) => <span key={y} className="absolute top-1.5 -translate-x-1/2" style={{ left: pct(y) }}>{y}</span>)}
      </div>
    </div>
  )
}

function TimeLine() {
  const ref = useRef()
  const [at, setAt] = useState(0)
  const [year, setYear] = useState(Y0)
  const n = STATIONS.length

  useMotion(ref, (el) => {
    const rows = [...el.querySelectorAll('[data-station]')]
    rows.forEach((row, k) => {
      ScrollTrigger.create({ trigger: row, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setAt(k) })
      gsap.from(row.querySelector('[data-row]'), { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 92%', once: true } })
    })
    // the playhead, scrubbed by the list's scroll: from stop to stop, one station row each
    const head = el.querySelector('[data-head]'), fills = [...el.querySelectorAll('[data-fill]')]
    if (!head) return
    const draw = (p) => {
      const f = Math.min(p * n, n - 1e-6), i = Math.floor(f), y = STOPS[i] + (STOPS[i + 1] - STOPS[i]) * (f - i)
      head.style.left = pct(y)
      fills.forEach((fl, k) => { const s = STATIONS[k]; fl.style.transform = `scaleX(${Math.min(1, Math.max(0, (y - s.from) / (s.to - s.from)))})` })
      setYear(Math.floor(y))
    }
    const proxy = { p: 0 }
    draw(0)
    gsap.to(proxy, { p: 1, ease: 'none', onUpdate: () => draw(proxy.p), scrollTrigger: { trigger: el.querySelector('ol[aria-label="Stationen"]'), start: 'top 55%', end: 'bottom 55%', scrub: 0.4 } })
  })

  const jump = (k) => scrollToTarget(ref.current.querySelectorAll('[data-station]')[k], { offset: -innerHeight * 0.4 })
  const s = STATIONS[at]

  return (
    <div ref={ref} className="grid grid-cols-12 gap-x-6">
      <div className="hidden lg:block col-span-6">
        <div className="sticky top-0 h-[100svh] flex flex-col justify-center pr-6">
          <p className="t-cap tabular-nums">Station {String(at + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {s.when}</p>
          <p aria-hidden className="t-hero text-[min(15vw,13rem)] leading-[1] mt-2"><span data-particles="text" data-particles-live className="inline-block">{String(year)}</span></p>
          <Scale jump={jump} />
        </div>
      </div>
      <ol aria-label="Stationen" className="col-span-12 lg:col-span-6 lg:py-[38svh]">
        {STATIONS.map((st, k) => (
          <li key={st.title} data-station aria-current={at === k ? 'step' : undefined} className="border-t border-line last:border-b py-8 sm:py-10">
            <div data-row>
              <div className="flex items-center justify-between gap-4">
                <p className="t-mono text-gray tabular-nums">{st.when}</p>
                {st.state && <span className={`t-cap rounded-full px-2.5 py-1 ${st.state === 'geplant' ? 'bg-[#e6f0ff] text-blue' : 'bg-mist'}`}>{st.state}</span>}
              </div>
              <h4 className="t-title mt-3">{st.title}</h4>
              <p className="mt-2 text-[16px]">{st.href ? <A href={st.href}>{st.org}</A> : st.org}</p>
              <p className="t-mono text-gray mt-3">{st.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── 3 · the story as a Notes window ──
function Notes() {
  const ref = useRef(), bodyRef = useRef()
  const [i, setI] = useState(CHAPTERS.length - 1)
  useMotion(ref, (el) => {
    // opens like a window from the Dock: from a narrow sliver at the bottom up to full size
    gsap.fromTo(el.querySelector('[data-notes]'), { clipPath: 'inset(70% 35% 0% 35% round 22px)', scale: 0.9, y: 60 },
      { clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: 0.6 } })
  })
  const pick = (k) => { setI(k); gsap.fromTo(bodyRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }) }
  const c = CHAPTERS[i]
  return (
    <div ref={ref}>
      <Window data-notes title="Notizen — Geschichte" className="max-w-[60rem] mx-auto" bodyClass="grid md:grid-cols-[17rem_1fr] min-h-[24rem]">
        <ul role="tablist" aria-label="Kapitel" className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible p-2 md:border-r border-black/[0.06] bg-white/25 max-md:border-b">
          {CHAPTERS.map((ch, k) => (
            <li key={ch.hash} className="flex-none">
              <button type="button" role="tab" aria-selected={i === k} onClick={() => pick(k)}
                className={`w-full text-left rounded-ctl px-3 py-2.5 transition-colors ${i === k ? 'bg-white/70 shadow-[inset_0_1px_0_#fff]' : 'hover:bg-white/40'}`}>
                <span className="block text-[14px] font-semibold whitespace-nowrap">{ch.label}{ch.head && <span className="t-cap ml-2">HEAD</span>}</span>
                <span className="hidden md:block t-mono text-gray truncate">{ch.hash} · {ch.text.slice(0, 26)}…</span>
              </button>
            </li>
          ))}
        </ul>
        <div role="tabpanel" className="p-7 sm:p-10">
          <div ref={bodyRef}>
            <p className="t-cap">{String(i + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · {c.hash}</p>
            <h4 className="t-title mt-3">{c.label}</h4>
            <p className="t-lead text-gray mt-5 max-w-[34em]">
              {c.label === 'Studium & Nachtschicht'
                ? <>Das Studium an der THM hat mir gefallen. Parallel habe ich nachts im Briefzentrum bei <A href={LINKS.DHL}>DHL in Langgöns</A> gearbeitet, und oft fehlte mir die Kraft für Prüfungen und Testate. Gelernt habe ich daraus Disziplin – und dass Erfolg erarbeitet werden muss.</>
                : c.text}
            </p>
          </div>
        </div>
      </Window>
    </div>
  )
}

export default function Path() {
  return (
    <section id="weg" aria-labelledby="weg-title" className="section-y">
      <div className="frame grid grid-cols-12 gap-x-6 gap-y-6 items-end mb-14 lg:mb-20">
        <div className="col-span-12 lg:col-span-5">
          <p className="t-cap">Werdegang</p>
          <h2 id="weg-title" className="t-hero mt-3">Mein Weg</h2>
        </div>
        <p className="col-span-12 lg:col-start-7 lg:col-span-5 t-lead text-gray max-w-[34ch] lg:pb-3">Nach Ausbildung, Fachabitur und zwei Semestern Medieninformatik an der THM bin ich heute Zeitsoldat bei der Bundeswehr. <span className="text-ink">Ab 2027 studiere ich nebenbei an der IU weiter.</span></p>
      </div>
      <div className="frame"><About /></div>
      <div className="frame mt-28 lg:mt-0"><TimeLine /></div>
      <div className="frame mt-24 lg:mt-10"><Notes /></div>
    </section>
  )
}
