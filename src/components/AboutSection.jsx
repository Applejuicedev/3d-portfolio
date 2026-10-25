import { useRef } from 'react'
import { SectionHead, Reveal } from './Section'
import { useMotion, gsap, ScrollTrigger, SplitText } from './motion'
import Accent from './Accent'

const THM = 'https://www.thm.de/'
const BSB = 'https://berufsschule-butzbach.de/hoehere-berufsfachschule/gestaltungs-und-medientechnik/'
const IU = 'https://www.iu.de/bachelor/medieninformatik/fernstudium/'
const DHL = 'https://www.google.com/maps/search/?api=1&query=DHL+Briefzentrum+Langg%C3%B6ns'

// ── Scene 1: who ───────────────────────────────────────────────
// [data-accent] words end in the signal colour when the scroll reaches them
const SUMMARY = (
  <>
    Ich gestalte und entwickle digitale Anwendungen, an der Schnittstelle von Design und Code. Nach
    Ausbildung, Fachabitur und zwei Semestern Medieninformatik an der <span data-accent>THM</span> bin
    ich heute Zeitsoldat bei der <span data-accent>Bundeswehr</span>. Ab 2027 studiere ich nebenbei im
    Fernstudium an der <span data-accent>IU</span> weiter.
  </>
)

// The first paragraph of the page is read letter by letter: everything is legible from the start
// in the muted tone (5.5:1), and the scroll position decides how far the ink has reached. Where it
// is reading right now, a short band of signal colour runs ahead of the ink (muted → signal → ink,
// about a dozen letters wide), so the progress is plain to see without dimming anything; accent
// words end in the signal colour. One timeline on one ScrollTrigger, scrubbed, so it follows the
// scroll both ways and never sets the pace; the letters share one global stagger order (two tweens,
// because the two kinds of letters end in different colours). SplitText re-splits on resize and
// after the fonts load, so the lines always break correctly.
function ScrubText({ children }) {
  const ref = useRef()
  useMotion(ref, (el) => {
    const split = SplitText.create(el, {
      type: 'words,chars', autoSplit: true,
      // token values, because GSAP interpolates colours, not var() references (muted → ink / signal)
      onSplit: (self) => {
        const order = new Map(self.chars.map((c, i) => [c, i]))
        const at = (i, c) => order.get(c) * 0.04
        const accent = self.chars.filter((c) => c.closest('[data-accent]'))
        const plain = self.chars.filter((c) => !c.closest('[data-accent]'))
        gsap.set(self.chars, { color: '#8b8a85' })
        return gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.3 } })
          .to(plain, { keyframes: { color: ['#ff5b1f', '#ecebe6'] }, duration: 0.5, ease: 'none', stagger: at }, 0)
          .to(accent, { keyframes: { color: ['#ffb08f', '#ff5b1f'] }, duration: 0.5, ease: 'none', stagger: at }, 0)
      },
    })
    return () => split.revert()
  }, [], { idle: true })
  return <p ref={ref} className="t-lead text-ink">{children}</p>
}

// ── Scene 2: the long version ──────────────────────────────────
const CHAPTERS = [
  { label: 'Die Anfänge', hash: 'a1c3f0e', text: <>Meine Leidenschaft für Technik und Gestaltung begann in der schulischen Ausbildung. Dort habe ich die Grundlagen in Design, Medienproduktion und Softwareentwicklung gelegt.</> },
  { label: 'Praktikum', hash: '7be21d4', text: <>Im sechsmonatigen Praktikum als Webentwickler bei Mastercode Applications habe ich moderne Technologien und agiles Arbeiten in der Praxis kennengelernt. Seitdem weiß ich: Ich will Anwendungen bauen, die Menschen wirklich nützen.</> },
  { label: 'Studium & Nachtschicht', hash: 'c94e0a2', text: <>Das Studium an der THM hat mir gefallen. Parallel habe ich nachts im Briefzentrum bei <a className="link text-ink" href={DHL} target="_blank" rel="noopener noreferrer">DHL in Langgöns</a> gearbeitet, und oft fehlte mir die Kraft für Prüfungen und Testate. Gelernt habe ich daraus Disziplin – und dass Erfolg erarbeitet werden muss.</> },
  { label: 'Die Entscheidung', hash: '3f8d6b1', ref: 'pause', text: <>Spätestens im zweiten Semester war klar: Nachtschicht und Studium ließen sich nicht in der Qualität vereinbaren, die ich von mir erwarte. Ich habe das Studium pausiert und meinen Dienst als Soldat angetreten, um mich finanziell und persönlich zu festigen. Weiterstudieren wollte ich eigentlich erst danach, mit dem Berufsförderungsdienst.</> },
  { label: 'Heute', hash: 'e05c7f9', ref: 'HEAD → main', text: <>Im Dienst habe ich gemerkt, dass mir die Mannschaftslaufbahn genug Freiraum für ein Teilzeit-Fernstudium lässt. Zum 1. Januar 2027 nehme ich deshalb den Bachelor of Science in Medieninformatik an der IU wieder auf.</> },
]

// ── Scene 3: the stations ──────────────────────────────────────
// state: 'pausiert' / 'geplant' get a hollow dot; the note says what the station meant
const STATIONS = [
  { when: '2020 – 2022', title: 'Medien- & Gestaltungstechnischer Assistent', org: 'Berufliche Schule Butzbach', href: BSB, note: 'DQR-Niveau 4 · schulischer Teil des Fachabiturs' },
  { when: '2022 – 2023', title: 'Fachabitur', org: 'Berufliche Schule Butzbach', href: BSB, note: 'Abschluss aus Ausbildung und Praktikum' },
  { when: '2023 – 2024', title: 'Praktikum als Webentwickler', org: 'Mastercode Applications', note: '6 Monate · React, agile Methoden · praktischer Teil des Fachabiturs' },
  { when: '03/2024 – 08/2025', title: 'Nachtschicht im Briefzentrum', org: 'DHL', note: 'Nebenjob' },
  { when: '2024 – 2025', title: 'Medieninformatik Studium', org: 'Technische Hochschule Mittelhessen', href: THM, note: 'nach 2 Semestern pausiert', state: 'pausiert' },
  { when: '2025 – mind. 2029', title: 'Soldat auf Zeit', org: 'Bundeswehr · Leichter Späher', note: 'Disziplin, Teamfähigkeit und mentale Stärke' },
  { when: 'ab 2027', title: 'Medieninformatik Fernstudium (B.Sc.)', org: 'IU Internationale Hochschule', href: IU, note: 'Teilzeit 1 Programm — 48 Monate · parallel zum Dienst', state: 'geplant' },
]

// Werdegang rail: the commit line in the meta column fills with the scroll, and each station lights
// up when the line reaches it. The one scroll-driven sequence on the page — it tells the order of
// things. Without motion the rail is simply full and every station lit.
// Below lg there is no meta column: the rail and its dots run down the left edge of the list, the
// stations indented beside them — the same line, the same triggers.
function Stations() {
  const ref = useRef()
  useMotion(ref, (el) => {
    const rows = [...el.querySelectorAll('[data-station]')]
    rows.forEach((r) => r.classList.remove('is-reached'))
    gsap.fromTo(el.querySelectorAll('[data-rail]'), { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
    })
    rows.forEach((r) => ScrollTrigger.create({ trigger: r, start: 'top 65%', toggleClass: 'is-reached' }))
  }, [], { idle: true })
  return (
    <div ref={ref} className="relative">
      {/* the rail sits exactly where the dots are: right edge of the meta column (lg) */}
      <div aria-hidden className="hidden lg:grid grid12 absolute inset-0 pointer-events-none">
        <div className="col-span-2 relative">
          <span className="absolute right-[2.5px] top-8 bottom-8 w-px bg-line" />
          <span data-rail className="absolute right-[2.5px] top-8 bottom-8 w-px bg-signal origin-top" />
        </div>
      </div>
      <div aria-hidden className="lg:hidden absolute inset-0 pointer-events-none">
        <span className="absolute left-[2.5px] top-8 bottom-8 w-px bg-line" />
        <span data-rail className="absolute left-[2.5px] top-8 bottom-8 w-px bg-signal origin-top" />
      </div>
      <ol className="border-b border-line">
        {STATIONS.map((s) => (
          <li key={s.title} data-station className="is-reached group/row grid12 gap-y-1 border-t border-line py-6 max-lg:relative max-lg:pl-7">
            {/* the dot: in the meta column (lg), on the rail at the left edge below it */}
            <span aria-hidden className="flex max-lg:absolute max-lg:left-0 max-lg:top-6 col-span-2 justify-end pt-[0.45em]">
              <span className="w-1.5 h-1.5 rounded-full border border-faint bg-bg transition-colors duration-[420ms] group-[.is-reached]/row:bg-signal group-[.is-reached]/row:border-signal" />
            </span>
            <p className="col-span-4 lg:col-span-2 t-meta tabular-nums">{s.when}</p>
            <div className="col-span-4 lg:col-span-4">
              <p className="text-[17px] font-medium tracking-tight text-muted transition-colors duration-[420ms] group-[.is-reached]/row:text-ink">{s.title}</p>
              <p className="text-[14px] text-muted mt-0.5">{s.href ? <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">{s.org}</a> : s.org}</p>
            </div>
            <p className="col-span-4 lg:col-span-4 t-meta lg:pt-1">{s.state && <span className="text-ink">{s.state} · </span>}{s.note}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Three scenes, each with the meta column on the left and one thing to read on the right.
export default function AboutSection() {
  return (
    <section id="uber-mich" aria-labelledby="uber-mich-title" className="relative isolate frame section-y">
      {/* a narrow band at the left edge, cut on a slant */}
      <Accent className="left-[calc(50%-50vw)] w-[34vw] top-[6%] h-[34%]" strength={0.32} drift={40}
        shape="polygon(0 0, 100% 14%, 58% 100%, 0 100%)"
        gradient="linear-gradient(90deg, #000 0%, rgba(0,0,0,.5) 38%, transparent 85%)" />
      <div className="scene">
        <SectionHead n={2} label="Über mich" file="vincent.md" title={<span id="uber-mich-title">Mein Weg</span>} />
        <div className="grid12 mt-14">
          <div className="col-span-4 lg:col-start-3 lg:col-span-8"><ScrubText>{SUMMARY}</ScrubText></div>
        </div>
      </div>

      <div className="scene">
        <p className="t-meta mb-12">Geschichte</p>
        <ol className="grid12 gap-y-16">
          {CHAPTERS.map((c, i) => (
            <li key={c.hash} className="contents">
              <Reveal className="col-span-4 lg:col-start-3 lg:col-span-2 t-meta">
                {String(i + 1).padStart(2, '0')} · {c.label}
                <span className="block text-faint">{c.hash}{c.ref ? ` (${c.ref})` : ''}</span>
              </Reveal>
              <Reveal className="col-span-4 lg:col-span-6 t-body text-muted -mt-12 lg:mt-0">{c.text}</Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className="scene">
        <p className="t-meta mb-12">Werdegang <span className="text-faint">· git log --graph</span></p>
        <Stations />
      </div>
    </section>
  )
}
