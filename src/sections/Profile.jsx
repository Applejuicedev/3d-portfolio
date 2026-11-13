import { useRef } from 'react'
import { PERSON, STATIONS, CHAPTERS, LINKS } from '../data/content'
import { useMotion, gsap, SplitText, EASE } from '../lib/motion'
import SectionHead from '../ui/SectionHead'

const FACTS = [
  ['Rolle', PERSON.role],
  ['Fokus', 'Web-Apps · iOS-Apps · Interfaces'],
  ['Heute', 'Soldat auf Zeit · Leichter Späher'],
  ['Studium', 'Medieninformatik B.Sc. · IU · ab 2027'],
  ['Verfügbar', 'ab 2029'],
  ['Sucht', PERSON.looking],
]

// the axis of the timeline: whole years, and today as a fraction of the year
const Y0 = 2020, Y1 = 2031
const YEARS = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i)
const now = new Date()
const TODAY = now.getFullYear() + now.getMonth() / 12
const HATCH = 'border border-muted/70 bg-[repeating-linear-gradient(-45deg,rgb(141_140_134/.35)_0_2px,transparent_2px_6px)]'
const pos = (y) => `${((y - Y0) / (Y1 - Y0)) * 100}%`

const A = ({ href, children }) => <a className="link text-ink" href={href} target="_blank" rel="noopener noreferrer">{children}</a>

// The lead paragraph is read word by word: legible from the start in muted, the scroll decides
// how far the ink has reached (scrubbed both ways). Accent words end in lime.
function Statement() {
  const ref = useRef()
  useMotion(ref, (el) => {
    let split
    document.fonts.ready.then(() => {
      split = SplitText.create(el, { type: 'words' })
      const plain = split.words.filter((w) => !w.closest('[data-accent]')), accent = split.words.filter((w) => w.closest('[data-accent]'))
      gsap.set(split.words, { color: '#8d8c86' })
      const st = { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 }
      const order = new Map(split.words.map((w, i) => [w, i]))
      gsap.timeline({ scrollTrigger: st })
        .to(plain, { color: '#eeede8', ease: 'none', stagger: (i, w) => order.get(w) * 0.1 }, 0)
        .to(accent, { color: '#d4ff3a', ease: 'none', stagger: (i, w) => order.get(w) * 0.1 }, 0)
    })
    return () => split?.revert()
  })
  return (
    <p ref={ref} className="t-lead text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.18] text-ink">
      Ich gestalte und entwickle digitale Anwendungen, an der Schnittstelle von Design und Code. Nach
      Ausbildung, Fachabitur und zwei Semestern Medieninformatik an der <span data-accent>THM</span> bin
      ich heute Zeitsoldat bei der <span data-accent>Bundeswehr</span>. Ab 2027 studiere ich nebenbei im
      Fernstudium an der <span data-accent>IU</span> weiter.
    </p>
  )
}

// The stations as a Gantt chart: one row each, its bar on a shared year axis, today as a lime
// line. Paused ends in a stop mark, planned and open-ended bars are hatched. On phones the bar
// sits under the text, on the same axis.
function Timeline() {
  const ref = useRef()
  useMotion(ref, (el) => {
    gsap.from(el.querySelectorAll('[data-bar]'), { scaleX: 0, duration: 1.3, stagger: 0.08, ease: EASE.inOut, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
    gsap.from(el.querySelector('[data-today]'), { scaleY: 0, duration: 1.2, ease: EASE.inOut, delay: 0.9, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
  })
  return (
    <figure ref={ref} aria-label="Werdegang als Zeitleiste">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-8">
        <p className="t-label max-lg:hidden">Station</p>
        <div className="relative h-5 max-lg:hidden" aria-hidden>
          {YEARS.map((y) => <span key={y} className="absolute t-label text-faint -translate-x-1/2 tabular-nums" style={{ left: pos(y) }}>{y % 2 === 0 ? `’${String(y).slice(2)}` : ''}</span>)}
        </div>
      </div>
      <div className="relative">
        {/* year grid and today, behind the rows (track column only) */}
        <div aria-hidden className="absolute inset-0 hidden lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-8 pointer-events-none">
          <span className="max-lg:hidden" />
          <span className="relative">
            {YEARS.map((y) => <span key={y} className="absolute top-0 bottom-0 w-px bg-white/[0.04]" style={{ left: pos(y) }} />)}
            <span data-today className="absolute top-0 bottom-0 w-px bg-lime origin-top" style={{ left: pos(TODAY) }}>
              <span className="absolute -top-6 -translate-x-1/2 t-label text-lime whitespace-nowrap">heute</span>
            </span>
          </span>
        </div>
        <ol className="relative border-b border-line">
          {STATIONS.map((s) => {
            const planned = s.state === 'geplant' || s.from > TODAY
            // an open-ended station that is running: solid up to today, hatched from there on
            const split = s.open && !planned && s.to > TODAY
            return (
              <li key={s.title} className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-8 gap-y-3 items-center border-t border-line py-4">
                <div className="grid grid-cols-[6.5rem_1fr] gap-x-4">
                  <p className="t-label tabular-nums pt-0.5">{s.when}</p>
                  <div>
                    <p className="text-[16px] tracking-tight text-ink leading-snug">{s.title}</p>
                    <p className="text-[14px] text-muted mt-0.5">{s.href ? <A href={s.href}>{s.org}</A> : s.org}</p>
                    <p className="t-mono text-[11.5px] text-faint mt-1">{s.state && <span className="text-muted">{s.state} · </span>}{s.note}</p>
                  </div>
                </div>
                <div className="relative h-3" aria-hidden>
                  {/* phones: no shared grid behind the text, so each track carries its own today mark */}
                  <span className="lg:hidden absolute -top-1 -bottom-1 w-px bg-lime/80" style={{ left: pos(TODAY) }} />
                  <span className="lg:hidden absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
                  <span data-bar className={`absolute top-0 h-full origin-left rounded-[2px] overflow-visible ${planned || split ? HATCH : 'bg-ink/85'}`}
                    style={{ left: pos(s.from), width: `calc(${pos(s.to)} - ${pos(s.from)})` }}>
                    {split && <span className="absolute inset-y-0 left-0 bg-ink/85 rounded-l-[2px]" style={{ width: `${((TODAY - s.from) / (s.to - s.from)) * 100}%` }} />}
                    {s.state === 'pausiert' && <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-4 w-[3px] bg-lime" />}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
      <figcaption className="t-label text-faint mt-4 flex flex-wrap gap-x-6 gap-y-1">
        <span className="inline-flex items-center gap-2"><i className="w-4 h-2 bg-ink/85 rounded-[2px]" />abgeschlossen / läuft</span>
        <span className="inline-flex items-center gap-2"><i className="w-4 h-2 border border-muted/70 rounded-[2px]" />geplant / offen</span>
        <span className="inline-flex items-center gap-2"><i className="w-[3px] h-3 bg-lime" />pausiert</span>
      </figcaption>
    </figure>
  )
}

// the long version, as a commit log: one line each, opened on demand (native <details>)
function Chapters() {
  return (
    <ol className="border-b border-line">
      {CHAPTERS.map((c, i) => (
        <li key={c.hash} className="border-t border-line">
          <details className="group" open={i === CHAPTERS.length - 1}>
            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-4 py-4 hover:text-lime transition-colors">
              <span className="t-mono text-[12px] text-faint">{c.hash}</span>
              <span className="text-[17px] tracking-tight">
                {c.label}
                {c.head && <span className="t-label text-lime ml-3">(HEAD → main)</span>}
              </span>
              <span aria-hidden className="t-mono text-faint transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="t-body text-muted pb-6 pl-[calc(4.5rem+1rem)] max-w-[62ch] max-sm:pl-0">
              {c.label === 'Studium & Nachtschicht'
                ? <>Das Studium an der THM hat mir gefallen. Parallel habe ich nachts im Briefzentrum bei <A href={LINKS.DHL}>DHL in Langgöns</A> gearbeitet, und oft fehlte mir die Kraft für Prüfungen und Testate. Gelernt habe ich daraus Disziplin – und dass Erfolg erarbeitet werden muss.</>
                : c.text}
            </p>
          </details>
        </li>
      ))}
    </ol>
  )
}

export default function Profile() {
  return (
    <section id="profil" aria-labelledby="profil-title" className="frame section-y">
      <SectionHead n={4} label="Profil" id="profil-title"
        title={<>Mein <span className="t-serif">Weg</span></>}
        note={<>Design trifft Technik<span className="block text-faint">Werdegang · Geschichte</span></>} />

      <div className="grid12 gap-y-12 mt-16 lg:mt-24">
        <div className="col-span-4 lg:col-span-8"><Statement /></div>
        <dl className="col-span-4 lg:col-start-10 lg:col-span-3 self-end border-b border-line">
          {FACTS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-line py-2.5">
              <dt className="t-label pt-[2px]">{k}</dt><dd className="text-[14px] text-ink leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-28 lg:mt-40">
        <h3 className="t-label mb-10"><span className="text-ink">Werdegang</span> · 2020 – heute</h3>
        <Timeline />
      </div>

      <div className="grid12 gap-y-8 mt-28 lg:mt-40">
        <h3 className="col-span-4 lg:col-span-3 t-label"><span className="text-ink">Geschichte</span> · git log --reverse</h3>
        <div className="col-span-4 lg:col-span-9"><Chapters /></div>
      </div>
    </section>
  )
}
