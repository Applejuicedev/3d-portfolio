import { useRef, useEffect, useLayoutEffect, useCallback, useState, Suspense } from 'react'
import gsap from 'gsap'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiThreedotjs, SiBlender, SiGreensock,
  SiSwift, SiPython, SiNodedotjs, SiFigma, SiFramer, SiClaude, SiAnthropic, SiOpenai,
} from 'react-icons/si'
import NetworkOrb3D from './NetworkOrb3D'
import HeroGrid from './HeroGrid'

// The second headline line says what I build; the badges below switch along with it
// and show the matching tools
const TOPICS = [
  { word: 'Web-Apps',      color: '#93c5fd', skills: [['React', SiReact, '#61DAFB'], ['Next.js', SiNextdotjs, '#e2e2e2'], ['TypeScript', SiTypescript, '#4C8DCA'], ['Tailwind CSS', SiTailwindcss, '#38BDF8']] },
  { word: '3D-Erlebnisse', color: '#c4b5fd', skills: [['Three.js', SiThreedotjs, '#c0c0c0'], ['Blender', SiBlender, '#F5792A'], ['GSAP', SiGreensock, '#88CE02']] },
  { word: 'iOS-Apps',      color: '#fdba74', skills: [['SwiftUI', SiSwift, '#FA7343'], ['Python', SiPython, '#FFD43B'], ['Node.js', SiNodedotjs, '#74B260']] },
  { word: 'Interfaces',    color: '#f9a8d4', skills: [['Figma', SiFigma, '#F24E1E'], ['Framer Motion', SiFramer, '#9B7FEA'], ['GSAP', SiGreensock, '#88CE02']] },
  { word: 'mit KI',        color: '#fca5a5', skills: [['Claude', SiClaude, '#D97757'], ['Claude Code', SiAnthropic, '#D97757'], ['ChatGPT', SiOpenai, '#10A37F']] },
]
const HOLD = 2800 // ms each topic stays

function Badge({ label, Icon, color }) {
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
  const wordRef   = useRef()
  const badgesRef = useRef()
  const [heroVisible, setHeroVisible] = useState(true)
  const glowRef = useRef()

  // The orb reports when it has finished building: the glow behind it swells in from its centre,
  // with a brief brighter flash that settles — the network "switches on"
  const glowOn = useCallback(() => {
    const el = glowRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { '--glow': 0.08 }); return }
    gsap.timeline()
      .fromTo(el, { '--glow': 0, scale: 0.6 }, { '--glow': 0.15, scale: 1.04, duration: 0.9, ease: 'power3.out' })
      .to(el, { '--glow': 0.08, scale: 1, duration: 1.2, ease: 'power2.inOut' })
  }, [])
  const [idx, setIdx] = useState(0)
  const firstTopic = useRef(true)

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
        .from('[data-intro="bottom"]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, 0.8)
    }, textRef)
    return () => ctx.revert()
  }, [])

  // Word + badges leave together, then the next topic comes in
  useEffect(() => {
    if (!heroVisible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const next = () => setIdx((i) => (i + 1) % TOPICS.length)
    let tl
    const t = setTimeout(() => {
      if (reduced) return next()
      tl = gsap.timeline({ onComplete: next })
        .to(wordRef.current, { yPercent: -105, duration: 0.45, ease: 'power3.in' })
        .to(badgesRef.current.children, { opacity: 0, y: -10, filter: 'blur(4px)', duration: 0.3, stagger: 0.05, ease: 'power2.in' }, 0)
    }, HOLD)
    return () => { clearTimeout(t); tl?.kill() }
  }, [idx, heroVisible])

  useLayoutEffect(() => {
    if (firstTopic.current) { firstTopic.current = false; return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(wordRef.current, { yPercent: 105 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' })
    gsap.fromTo(badgesRef.current.children,
      { opacity: 0, y: 12, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.07, delay: 0.15, ease: 'power2.out' })
  }, [idx])

  const topic = TOPICS[idx]

  return (
    <div ref={heroRef} className="relative bg-[#0a0a0a] overflow-hidden" style={{ minHeight: '100svh' }}>

      {/* Layer 1: Animated grid */}
      <HeroGrid />

      {/* Layer 2: Ambient glow behind the orb — switches on once the orb has built itself */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, transformOrigin: '72% 50%', '--glow': 0, background: 'radial-gradient(ellipse 50% 60% at 72% 50%, rgba(99,102,241,var(--glow)) 0%, transparent 65%)' }}
      />

      {/* Layer 3: 3D Orb — right half on desktop, behind the text on phones */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none opacity-50 lg:opacity-100"
        style={{ zIndex: 3, paddingTop: '80px' }}
      >
        <Suspense fallback={null}>
          <NetworkOrb3D mouseRef={mousePos} active={heroVisible} onBuilt={glowOn} />
        </Suspense>
      </div>

      {/* Layer 10: Text, left-aligned */}
      <div
        className="relative flex items-center px-6 sm:px-10 lg:px-16"
        style={{ zIndex: 10, minHeight: '100svh', paddingTop: '80px' }}
      >
        <div ref={textRef} className="max-w-[640px] w-full">
          {/* Status chip */}
          <div data-intro="top" className="mb-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] text-[11px] font-medium text-zinc-400 tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }} />
              Verfügbar ab 2029
            </span>
          </div>

          <p data-intro="top" className="text-[13px] font-medium text-zinc-500 tracking-tight mb-4">
            Hey, ich bin Vincent — Medieninformatiker
          </p>

          {/* The rotating word always has its own line, so the layout never jumps when it changes */}
          <h1 className="text-white font-medium tracking-[-0.035em] leading-[1.05]" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)' }}>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-intro="line" className="block sm:whitespace-nowrap">Design trifft Code.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-intro="line" className="block text-zinc-500">Ich baue</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-intro="line" className="block">
                <span ref={wordRef} className="inline-block whitespace-nowrap" style={{ color: topic.color }}>{topic.word}</span>
              </span>
            </span>
          </h1>

          {/* All badge sets sit invisibly in the same grid cell, so the row always has the height of
              the tallest set and the centred text block never shifts when the topic changes */}
          <div data-intro="bottom" className="grid mt-8">
            {TOPICS.map((t) => (
              <div key={t.word} aria-hidden className="invisible flex flex-wrap gap-2 [grid-area:1/1]">
                {t.skills.map(([label, Icon, color]) => <Badge key={label} label={label} Icon={Icon} color={color} />)}
              </div>
            ))}
            <div ref={badgesRef} className="flex flex-wrap content-start gap-2 [grid-area:1/1]">
              {topic.skills.map(([label, Icon, color]) => (
                <Badge key={`${idx}-${label}`} label={label} Icon={Icon} color={color} />
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div data-intro="bottom" className="mt-10 flex items-center gap-2.5">
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-[9px] rounded-lg border border-indigo-400/25 bg-indigo-500/15 text-indigo-100 text-[13px] font-medium tracking-tight hover:bg-indigo-500/25 active:opacity-60 transition-colors duration-150"
            >
              Projekte ansehen
            </button>
            <button
              onClick={() => document.getElementById('uber-mich')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-[9px] rounded-lg border border-white/[0.1] text-zinc-200 text-[13px] font-medium tracking-tight hover:bg-white/[0.05] active:opacity-60 transition-colors duration-150"
            >
              Über mich
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 section-label">↓</div>
      </div>
    </div>
  )
}
