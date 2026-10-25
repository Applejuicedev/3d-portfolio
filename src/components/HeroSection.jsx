import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useMotion, gsap, EASE } from './motion'
import { ArrowLink } from './ui'
import Typer from './Typer'
import Accent from './Accent'
import Workflow from './Workflow'
import { PROJECTS } from './projects'
// the 3D bust is its own chunk; its download starts as soon as this module is evaluated, so it is
// there by the time the headline has risen (it only starts drawing after that, see Bust3D)
const bustChunk = import('./Bust3D')
const Bust3D = lazy(() => bustChunk)

export const HERO_TYPER = {
  word: 'Anwendungen.',
  typed: 'Anw',
  draft: 'Apps.',
  options: [['Anwendungen', 'noun'], ['Anweisungen', 'noun'], ['Anwesenheit', 'noun']],
}

// "14:32 MESZ" — the zone name comes from Intl, so summer/winter time is always right
const fmtTime = () => new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin', timeZoneName: 'short' }).format(new Date())
function useLocalTime() {
  const [t, setT] = useState(fmtTime)
  useEffect(() => {
    let id
    const tick = () => { setT(fmtTime()); id = setTimeout(tick, 60000 - (Date.now() % 60000)) }
    id = setTimeout(tick, 60000 - (Date.now() % 60000))
    return () => clearTimeout(id)
  }, [])
  return t
}

// The opening, after the preloader (which has built the bust), in a fixed order, so nothing
// competes for the first look:
//   0.45  the headline rises slowly line by line out of its masks; the last word is typed (Typer: a
//         first draft, reconsidered, then completed by autocomplete)
//   0.45  the orange field opens out of the top left corner
//   1.00  "Creative Fullstack Developer" decodes into place above it
//   1.50  the navigation fades in
//   1.70  the margins answer one by one, each its own way: the study line slides out of a mask,
//         the availability dot pops and its line slides in from the right
//   2.40  the base row rises item by item; the arrow nods towards the projects
//   then  the workflow (Workflow.jsx) begins a while after the word is complete
export default function HeroSection() {
  const ref = useRef(), stageRef = useRef()
  const time = useLocalTime()
  const [typed, setTyped] = useState(false)
  const [three, setThree] = useState(true)
  const fail = useCallback(() => setThree(false), [])

  useMotion(ref, (el) => {
    // the pointer glow stays on throughout: every word paints its own (.glow on each), so a word
    // rising with its line out of the mask, or moved by the workflow, carries its glow with it
    const masks = [...el.querySelectorAll('[data-mask]')]
    // after the preloader: the bust stands alone for a moment, then the headline rises slowly, and
    // only then the margins — paced so the page arrives rather than lands
    gsap.timeline({ delay: 0.45, onComplete: () => { masks.forEach((m) => { m.style.overflow = 'visible' }) } })
      // the orange field opens out of the top left corner as a widening round wave, under the
      // rising headline (on its inner field: the outer box's clip belongs to Accent)
      .fromTo('[data-hero-accent] > div', { clipPath: 'circle(0% at 0% 0%)' }, { clipPath: 'circle(150% at 0% 0%)', duration: 2.4, ease: 'power2.inOut', clearProps: 'clipPath' }, 0)
      .from('[data-line]', { yPercent: 135, duration: 1.3, stagger: 0.14, ease: EASE.out, clearProps: 'transform' }, 0)
      // the third line is the typer (not masked, its suggestions hang below): its caret comes in
      // with the line's turn instead of standing there before the words around it have risen
      .from('[data-word="anwendungen"]', { opacity: 0, y: 24, duration: 0.9, ease: EASE.out }, 0.28)
      .from('[data-kicker]', { duration: 1.1, scrambleText: { text: '', chars: 'lowerCase', speed: 0.6 }, ease: 'none' }, 1.0)
      .fromTo('[data-kicker-mark]', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: EASE.inOut }, 1.0)
      .from('[data-meta="study"]', { yPercent: 110, duration: 0.9, ease: EASE.out }, 1.7)
      .from('[data-dot]', { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 1.85)
      .from('[data-meta="r"]', { opacity: 0, x: 22, duration: 0.9, stagger: 0.16, ease: EASE.out }, 1.9)
      .from('[data-base] > *', { opacity: 0, y: 16, duration: 0.85, stagger: 0.14, ease: EASE.out }, 2.4)
      .fromTo('[data-base] a svg', { y: -5 }, { y: 0, duration: 0.9, ease: 'bounce.out' }, 2.9)
  })

  return (
    <div ref={ref} className="relative isolate frame min-h-[100svh] flex flex-col justify-between pt-24 pb-8">
      {/* a cut field of sand-grain colour falling from the top left, behind the headline — the
          bust on the right stands on the dark ground, so it reads on its own */}
      <Accent data-hero-accent className="left-[calc(50%-50vw)] w-screen top-0 h-[78%]" strength={0.45}
        shape="polygon(0 0, 56% 0, 30% 58%, 0 96%)"
        gradient="radial-gradient(90% 95% at 0% 0%, #000 0%, rgba(0,0,0,.55) 40%, transparent 78%)" />
      {three && <Suspense fallback={null}><Bust3D heroRef={ref} stageRef={stageRef} onFail={fail} /></Suspense>}
      <Workflow rootRef={ref} start={typed} />
      <div className="grid12 t-meta">
        {/* the name stands once on the page, in the navigation (Navbar) — not repeated here */}
        {/* the margins stay quiet (muted); only the local time is in the signal colour. These two
            lie on the orange field: a lighter grey there, the darkest that still holds 4.5:1 on its
            grain (measured 5.0:1) — muted would drop below it */}
        <p className="col-span-2 lg:col-span-6 text-[#a8a7a1]">
          <span className="relative inline-block">
            <span data-kicker>Creative Fullstack Developer</span>
            <span data-kicker-mark aria-hidden className="absolute left-0 -bottom-[3px] h-px w-full bg-signal origin-left" />
          </span>
          <span className="block overflow-hidden"><span data-meta="study" className="block">Medieninformatik</span></span>
        </p>
        <p className="col-span-2 lg:col-span-6 text-right">
          <span data-meta="r" className="flex justify-end items-center gap-2"><span data-dot className="w-1.5 h-1.5 rounded-full bg-signal" />verfügbar ab 2029</span>
          <span data-meta="r" className="block">Praktika &amp; Werkstudentenstellen</span>
        </p>
      </div>

      <div className="grid12 items-center gap-y-6 my-12">
        {/* a little below the global display size, so the sentence keeps its three lines beside the
            bust; the visible words may be edited by the workflow, the label is the real sentence */}
        {/* the glow (pointer light) is painted by each word itself, not by the headline:
            background-clip text isn't painted into moved (transformed) children */}
        <h1 aria-label="Ich gestalte und entwickle digitale Anwendungen." className="col-span-4 lg:col-span-8 t-display text-ink lg:text-[clamp(3rem,6vw,6rem)]">
          <span data-mask className="block overflow-hidden pb-[0.24em] -mb-[0.24em]"><span data-line className="block"><span className="glow inline-block">Ich</span> <span data-word="gestalte" className="glow inline-block">gestalte</span> <span data-w="und" className="glow inline-block">und</span></span></span>
          <span data-mask className="block overflow-hidden pb-[0.24em] -mb-[0.24em]"><span data-line className="block"><span data-word="entwickle" className="glow inline-block">entwickle</span> <span data-word="digitale" className="glow inline-block">digitale</span></span></span>
          {/* not masked: the suggestion list hangs below the line */}
          <span className="block"><span data-word="anwendungen"><Typer {...HERO_TYPER} delay={1.35} onDone={() => setTyped(true)} /></span></span>
        </h1>
        {/* the bust's stage: on desktop it stands here, beside the headline (drawn on the hero-wide
            canvas behind the text); below lg under it. Without WebGL the space stays calm. */}
        <div ref={stageRef} aria-hidden className="col-span-4 lg:col-span-4 h-[360px] sm:h-[440px] lg:h-[520px]" />
      </div>

      {/* lg:pb-12 keeps the row clear of the fixed status line (StatusBar) */}
      <div data-base className="grid12 t-meta items-end lg:pb-12">
        {/* wrapped: the intro moves this span — the link's own .press transition would swallow a
            GSAP transform on the link itself and leave it shifted */}
        <span className="col-span-2 lg:col-span-4 justify-self-start">
          <ArrowLink href="#projekte" dir="s">
            Projekte <span>({String(PROJECTS.length).padStart(2, '0')})</span>
          </ArrowLink>
        </span>
        <p className="hidden lg:block lg:col-span-4 text-center">Web · iOS · Interfaces</p>
        <p className="col-span-2 lg:col-span-4 text-right tabular-nums">lokal <span className="text-signal">{time}</span></p>
      </div>
    </div>
  )
}
