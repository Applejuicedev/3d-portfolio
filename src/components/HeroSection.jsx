import { useRef, useEffect, useLayoutEffect, useCallback, useState, Suspense, lazy } from 'react'
import gsap from 'gsap'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiThreedotjs, SiBlender, SiGreensock,
  SiSwift, SiPython, SiNodedotjs, SiFigma, SiFramer, SiClaude, SiAnthropic, SiOpenai,
} from 'react-icons/si'
import HeroGrid from './HeroGrid'
// three.js lives in its own chunk that only desktops load
const NetworkOrb3D = lazy(() => import('./NetworkOrb3D'))
import HeroTyper from './HeroTyper'
import { orbBuilt, headlineDone } from './heroStage'
import { GridPattern } from './BackgroundPatterns'

// The third headline line says what I build. `skills` is only used by the local labs now: the
// badge row under the headline is gone, the projects show the tools instead
export const TOPICS = [
  { word: 'Web-Apps',      tab: 'Web', color: '#93c5fd', skills: [['React', SiReact, '#61DAFB'], ['Next.js', SiNextdotjs, '#e2e2e2'], ['TypeScript', SiTypescript, '#4C8DCA'], ['Tailwind CSS', SiTailwindcss, '#38BDF8']] },
  { word: '3D-Erlebnisse', tab: '3D', color: '#c4b5fd', skills: [['Three.js', SiThreedotjs, '#c0c0c0'], ['Blender', SiBlender, '#F5792A'], ['GSAP', SiGreensock, '#88CE02']] },
  { word: 'iOS-Apps',      tab: 'iOS', color: '#fdba74', skills: [['SwiftUI', SiSwift, '#FA7343'], ['Python', SiPython, '#FFD43B'], ['Node.js', SiNodedotjs, '#74B260']] },
  { word: 'Interfaces',    tab: 'UI', color: '#f9a8d4', skills: [['Figma', SiFigma, '#F24E1E'], ['Framer Motion', SiFramer, '#9B7FEA'], ['GSAP', SiGreensock, '#88CE02']] },
  { word: 'mit KI',        tab: 'KI', color: '#fca5a5', skills: [['Claude', SiClaude, '#D97757'], ['Claude Code', SiAnthropic, '#D97757'], ['ChatGPT', SiOpenai, '#10A37F']] },
]
export const HOLD = 10000 // ms each topic stays

// the 3D object shows what line 3 says
const TOPIC_SHAPE = { 'Web-Apps': 'web', '3D-Erlebnisse': 'gem', 'iOS-Apps': 'phone', 'Interfaces': 'layers', 'mit KI': 'robot' }

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

// A headline line with a hanging line number: the number sits in the left margin on the same
// baseline, so the headline itself stays flush with everything above and below it
function Line({ n, active, clip = true, children }) {
  return (
    <span className="grid lg:grid-cols-[28px_1fr] lg:-ml-[52px] lg:gap-x-6 items-baseline">
      <span aria-hidden className={`hidden lg:block text-right text-[13px] font-normal tracking-normal tabular-nums select-none ${active ? 'text-zinc-400' : 'text-zinc-700'}`}
        style={{ fontFamily: MONO }}>{n}</span>
      {/* masks the rise-in animation vertically only, so nothing at the line end gets cut off */}
      {/* extra room below (taken back with a negative margin) so descenders like the p in "Apps"
          aren't cut off by the mask */}
      <span className="block pb-[0.22em] -mb-[0.14em]" style={{ overflowX: 'visible', overflowY: clip ? 'clip' : 'visible' }}>{children}</span>
    </span>
  )
}

export function Badge({ label, Icon, color }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-2 rounded-full border border-white/[0.09] bg-[#0b0b0d]/70 backdrop-blur-md text-[12.5px] font-medium text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <Icon style={{ color, width: 14, height: 14 }} />
      {label}
    </span>
  )
}

export default function HeroSection() {
  const mousePos  = useRef({ x: 0, y: 0 })
  const heroRef   = useRef()
  const textRef   = useRef()
  const patchRef  = useRef()
  // grid behind the text: one row per headline line, a column line on the text's left edge
  const [patchGrid, setPatchGrid] = useState({ cell: 48, x: 0, y: 0 })
  useLayoutEffect(() => {
    const measure = () => {
      const lines = textRef.current?.querySelectorAll('h1 > span')
      if (!patchRef.current || !lines || lines.length < 2) return
      const box = patchRef.current.getBoundingClientRect()
      const a = lines[0].getBoundingClientRect(), b = lines[1].getBoundingClientRect()
      const cell = b.top - a.top
      const left = lines[0].lastElementChild.getBoundingClientRect().left
      const next = { cell: Math.round(cell * 100) / 100, x: Math.round((left - box.left) * 10) / 10, y: Math.round((a.top - box.top) * 10) / 10 }
      setPatchGrid((g) => (g.cell === next.cell && g.x === next.x && g.y === next.y ? g : next))

    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(textRef.current)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  const wordRef   = useRef()
  const [heroVisible, setHeroVisible] = useState(true)
  const [idx, setIdx] = useState(0)
  // the 3D object only exists on desktop (lg and up)
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const glowRef = useRef()

  // The orb reports when it has finished building: the glow behind it swells in from its centre,
  // with a brief brighter flash that settles — the network "switches on"
  const glowOn = useCallback(() => {
    orbBuilt.resolve()
    const el = glowRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { '--glow': 0.08 }); return }
    gsap.timeline()
      .fromTo(el, { '--glow': 0, scale: 0.6 }, { '--glow': 0.15, scale: 1.04, duration: 0.9, ease: 'power3.out' })
      .to(el, { '--glow': 0.08, scale: 1, duration: 1.2, ease: 'power2.inOut' })
  }, [])
  const firstTopic = useRef(true)
  const timeBarRef = useRef()
  // the topics only start rotating once the headline has finished correcting itself
  const [rotating, setRotating] = useState(false)
  useEffect(() => { headlineDone.promise.then(() => setRotating(true)) }, [])

  // Pause the WebGL orb and the word rotation while the hero is scrolled out of view
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting))
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [])

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Intro: small lines fade up, the headline lines rise out of their masks
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.3 })
        .from('[data-intro="top"]', { opacity: 0, y: 10, duration: 0.6, stagger: 0.08, ease: 'power2.out' })
        .from('[data-intro="line"]', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12 }, 0.15)
        .from('[data-intro="bottom"]', { opacity: 0, y: 14, duration: 0.7, ease: 'power2.out' }, 0.8)
    }, textRef)
    return () => ctx.revert()
  }, [])

  // The word leaves, then the next topic comes in
  useEffect(() => {
    if (!heroVisible || !rotating) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const next = () => setIdx((i) => (i + 1) % TOPICS.length)
    // the active topic tab's underline fills up over the hold time
    const left = { t: HOLD / 1000 }
    const countdown = gsap.fromTo(left, { t: HOLD / 1000 }, {
      t: 0, duration: HOLD / 1000, ease: 'none',
      onUpdate: () => {
        if (timeBarRef.current) timeBarRef.current.style.transform = `scaleX(${1 - left.t / (HOLD / 1000)})`
      },
    })
    let tl
    const t = setTimeout(() => {
      if (reduced) return next()
      tl = gsap.timeline({ onComplete: next })
        .to(wordRef.current, { yPercent: -105, duration: 0.45, ease: 'power3.in' })
    }, HOLD)
    return () => {
      clearTimeout(t); countdown.kill()
      // interrupted mid-leave (tab click, scrolled away): put the word back instead of leaving it
      // half moved out
      if (tl?.isActive()) gsap.set(wordRef.current, { clearProps: 'transform' })
      tl?.kill()
    }
  }, [idx, heroVisible, rotating])

  useLayoutEffect(() => {
    if (firstTopic.current) { firstTopic.current = false; return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // the word comes up from below its mask; afterwards the transform is removed completely, so no
    // half-transformed layer can leave stray glyph pieces under the line
    gsap.killTweensOf(wordRef.current)
    gsap.fromTo(wordRef.current, { yPercent: 130 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', clearProps: 'transform' })
  }, [idx])

  const topic = TOPICS[idx]

  return (
    <div ref={heroRef} className="relative bg-[#0a0a0a] overflow-hidden" style={{ minHeight: '100svh' }}>

      {/* Layer 1: star field — fades in once, then stands still */}
      <HeroGrid stars particles={false} />

      {/* A small patch of the old grid only behind the text, fading out into the stars */}
      <div ref={patchRef} aria-hidden className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 w-[min(900px,100%)] h-[940px]"
        style={{
          zIndex: 1,
          WebkitMaskImage: 'radial-gradient(ellipse 60% 52% at 34% 51%, black 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 60% 52% at 34% 51%, black 40%, transparent 100%)',
        }}>
        {/* no crosses here: their arms landed under single letters and read as underlines */}
        <GridPattern {...patchGrid} id="hero-text-grid" line={0.09} marks={false} />
      </div>


      {/* Layer 2: Ambient glow behind the orb — switches on once the orb has built itself */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, transformOrigin: '72% 50%', '--glow': 0, background: 'radial-gradient(ellipse 50% 60% at 72% 50%, rgba(99,102,241,var(--glow)) 0%, transparent 65%)' }}
      />

      {/* Layer 3: 3D object, right half — desktop only; phones don't load WebGL at all */}
      {wide && (
        <div className="absolute inset-y-0 right-0 w-[58%]" style={{ zIndex: 3, paddingTop: '80px' }}>
          <Suspense fallback={null}>
            <NetworkOrb3D mouseRef={mousePos} active={heroVisible} onBuilt={glowOn} shape={TOPIC_SHAPE[TOPICS[idx].word]} />
          </Suspense>
        </div>
      )}

      {/* Layer 10: Text, left-aligned */}
      <div
        className="relative flex items-center px-6 sm:px-10 lg:px-16 pointer-events-none"
        style={{ zIndex: 10, minHeight: '100svh', paddingTop: '80px' }}
      >
        <div ref={textRef} className="max-w-[720px] w-full pointer-events-auto">
          {/* A tiny terminal session: the prompt carries the name (user@host), the output says
              what I do and from when I'm available — kept as quiet as a comment */}
          <div data-intro="top" className="mb-5 text-[13px] leading-[1.7] text-zinc-600" style={{ fontFamily: MONO }}>
            <p><span className="text-zinc-500">vincentfidanli@dev</span>:~$ <span className="text-zinc-400">cat ~/.plan</span></p>
            <p><span className="text-amber-300/60">●</span> Medieninformatik · verfügbar ab 2029</p>
          </div>

          {/* The rotating word always has its own line, so the layout never jumps when it changes */}
          <h1 className="text-white font-medium tracking-[-0.035em] leading-[1.06]" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)' }}>
            {/* typed once on load (HeroTyper); not masked, so the autocomplete popup can hang below */}
            <Line n="01" clip={false}>
              <span className="block"><HeroTyper /></span>
            </Line>
            <Line n="02"><span data-intro="line" className="block text-zinc-500">Ich baue</span></Line>
            <Line n="03" active>
              <span data-intro="line" className="block pb-[0.02em]">
                <span ref={wordRef} className="inline-block whitespace-nowrap" style={{ color: topic.color }}>{topic.word}</span>
              </span>
            </Line>
          </h1>

          {/* The topics as small tabs, each with its colour dot. The active tab's background fills
              up in its colour over the hold time, so it's clear how long it stays and what comes
              next; a click jumps to a topic. Quiet on purpose: the headline above is the focus. */}
          <div data-intro="bottom" role="tablist" aria-label="Themen"
            className="mt-12 -ml-3 flex flex-wrap gap-1" style={{ fontFamily: MONO }}>
            {TOPICS.map((t, i) => {
              const on = i === idx
              return (
                <button key={t.word} type="button" role="tab" aria-selected={on} onClick={() => setIdx(i)}
                  className={`relative overflow-hidden flex items-center gap-2 rounded-md px-3 py-1.5 text-[12px] transition-colors duration-200 ${
                    on ? 'text-zinc-100' : 'text-zinc-600 hover:text-zinc-300'}`}>
                  {on && <span ref={timeBarRef} aria-hidden className="absolute inset-0 origin-left" style={{ background: t.color, opacity: 0.1, transform: 'scaleX(0)' }} />}
                  <span aria-hidden className="relative w-1.5 h-1.5 rounded-full" style={{ background: t.color, opacity: on ? 1 : 0.4 }} />
                  <span className="relative">{t.tab}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 section-label">↓</div>
      </div>
    </div>
  )
}
