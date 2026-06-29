import { useState, useRef, useCallback, useEffect } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GitHubIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

const CATEGORY_STYLES = {
  'Mobile Development': 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  'Web Development':    'bg-sky-500/10    border-sky-500/20    text-sky-400',
  'UX/UI Design':       'bg-violet-500/10 border-violet-500/20 text-violet-400',
}

function CategoryBadge({ category }) {
  const cls = CATEGORY_STYLES[category] || 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-md border ${cls}`}>
      {category}
    </span>
  )
}

const STATUS_STYLES = {
  'Abgeschlossen': { cls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', dot: 'bg-emerald-400' },
  'Live':          { cls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', dot: 'bg-emerald-400 animate-pulse' },
  'In Arbeit':     { cls: 'bg-amber-500/10   border-amber-500/20   text-amber-400',   dot: 'bg-amber-400' },
  'Bald':          { cls: 'bg-zinc-800 border-zinc-700 text-zinc-500',                dot: 'bg-zinc-400' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['In Arbeit']
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function PlaceholderVisual({ accentRgb }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#090909] relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 60%, rgba(${accentRgb},0.06) 0%, transparent 65%)` }} />
      <div className="relative flex flex-col items-center gap-3 opacity-40">
        <div className="w-10 h-10 rounded-xl border flex items-center justify-center" style={{ borderColor: `rgba(${accentRgb},0.3)`, background: `rgba(${accentRgb},0.06)` }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: `rgb(${accentRgb})` }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-zinc-600">Bald</span>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    title: 'iOS Fitness App',
    category: 'Mobile Development',
    status: 'Abgeschlossen',
    desc: 'Native iOS Anwendung entwickelt mit SwiftUI. Fokus auf intuitive UX, native Animationen und saubere MVVM-Architektur.',
    tech: ['SwiftUI', 'Xcode', 'MVVM', 'CoreData'],
    github: '#', demo: null,
    accentRgb: '245,158,11',
    visual: (
      <div className="flex gap-3 justify-center items-end py-4 h-full">
        <div className="w-20 h-40 bg-[#111] rounded-[14px] overflow-hidden shadow-2xl flex flex-col border border-white/[0.07]">
          <div className="h-4 bg-[#1a1a1a] flex items-center justify-center"><div className="w-8 h-1 bg-[#2a2a2a] rounded-full" /></div>
          <div className="flex-1 bg-gradient-to-b from-blue-700/80 to-violet-700/80 p-2 flex flex-col gap-1.5">
            <div className="h-1.5 bg-white/25 rounded-full w-3/4" /><div className="h-1.5 bg-white/15 rounded-full w-1/2" />
            <div className="mt-1.5 h-12 bg-white/10 rounded-lg" /><div className="h-1.5 bg-white/15 rounded-full" /><div className="h-1.5 bg-white/15 rounded-full w-4/5" />
          </div>
        </div>
        <div className="w-20 h-40 bg-[#111] rounded-[14px] overflow-hidden shadow-2xl flex flex-col border border-white/[0.07] mb-4">
          <div className="h-4 bg-[#1a1a1a] flex items-center justify-center"><div className="w-8 h-1 bg-[#2a2a2a] rounded-full" /></div>
          <div className="flex-1 bg-gradient-to-b from-violet-700/80 to-pink-600/80 p-2 flex flex-col gap-1.5">
            <div className="h-9 bg-white/15 rounded-lg" /><div className="h-1.5 bg-white/25 rounded-full w-3/4 mt-1" /><div className="h-1.5 bg-white/15 rounded-full w-1/2" />
            <div className="mt-1 flex gap-1"><div className="h-7 flex-1 bg-white/10 rounded" /><div className="h-7 flex-1 bg-white/10 rounded" /></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '3D Portfolio Website',
    category: 'Web Development',
    status: 'Live',
    desc: 'Dieses Portfolio — React, Three.js und GSAP. Animierter Hintergrund, 3D-Orb und scroll-getriebene Animationen.',
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    github: '#', demo: '#',
    accentRgb: '59,130,246',
    visual: (
      <div className="w-full h-full bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute top-3 left-3 right-3 h-5 bg-[#1a1a1a] rounded-t-lg flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-yellow-400/70" /><div className="w-2 h-2 rounded-full bg-green-400/70" />
        </div>
        <div className="absolute top-11 left-3 right-3 bottom-3 flex gap-2">
          <div className="flex-1 space-y-1.5 py-1">
            <div className="h-2.5 bg-white/10 rounded w-1/2" /><div className="h-1.5 bg-white/06 rounded w-3/4" /><div className="h-1.5 bg-white/06 rounded w-2/3" />
          </div>
          <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-indigo-600/30 to-violet-800/30 flex items-center justify-center border border-white/[0.06]">
            <div className="w-6 h-6 rounded-full bg-indigo-400/40" style={{ boxShadow: '0 0 12px rgba(99,102,241,0.4)' }} />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {['#818cf8','#34d399','#60a5fa','#f87171','#a78bfa'].map((c, i) => (
            <div key={i} className="w-4 h-2 rounded-full opacity-60" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'UX/UI Design System',
    category: 'UX/UI Design',
    status: 'In Arbeit',
    desc: 'Umfassendes Design-System in Figma — Komponenten-Bibliothek, Styleguide und responsive Prototypen für Web und Mobile.',
    tech: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
    github: null, demo: '#',
    accentRgb: '139,92,246',
    visual: (
      <div className="w-full h-full bg-[#0d0d0d] p-3 flex flex-col gap-2">
        <div className="h-5 bg-[#1a1a1a] rounded-lg flex items-center px-2 gap-1.5 border border-white/[0.05]">
          <div className="w-2 h-2 rounded bg-violet-400/80" /><div className="h-1.5 bg-white/10 rounded w-16" />
        </div>
        <div className="flex gap-2 flex-1">
          <div className="w-16 space-y-1.5 py-1">
            {['#818cf8','#34d399','#fbbf24','#f87171','#a78bfa'].map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm opacity-80" style={{ backgroundColor: c }} /><div className="h-1 bg-white/10 rounded flex-1" />
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1.5">
            {[['#DBEAFE','20'],['#D1FAE5','20'],['#FEF3C7','20'],['#FCE7F3','20']].map(([c, o], i) => (
              <div key={i} className="rounded-lg p-1.5" style={{ backgroundColor: c + o }}>
                <div className="h-1 rounded mb-1 w-3/4 opacity-60" style={{ backgroundColor: c }} /><div className="h-1 rounded w-1/2 opacity-40" style={{ backgroundColor: c }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    status: 'Bald',
    desc: 'Vollständige E-Commerce-Lösung mit modernem Frontend, Warenkorb, Checkout-Flow und Admin-Dashboard.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    github: null, demo: null,
    accentRgb: '59,130,246',
    placeholder: true,
    visual: null,
  },
  {
    title: 'AI Chat Interface',
    category: 'Mobile Development',
    status: 'Bald',
    desc: 'KI-gestützte Chat-App für iOS mit SwiftUI. Natural Language Processing, Kontextgedächtnis und adaptives UI.',
    tech: ['SwiftUI', 'OpenAI API', 'CoreML', 'CloudKit'],
    github: null, demo: null,
    accentRgb: '168,85,247',
    placeholder: true,
    visual: null,
  },
  {
    title: 'Design Tokens CLI',
    category: 'Web Development',
    status: 'Bald',
    desc: 'Node.js CLI-Tool zur automatischen Generierung von Design Tokens aus Figma. Export in CSS, SCSS und JS.',
    tech: ['Node.js', 'Figma API', 'TypeScript', 'PostCSS'],
    github: null, demo: null,
    accentRgb: '52,211,153',
    placeholder: true,
    visual: null,
  },
]

function PortfolioCard({ project, onMount, index }) {
  const wrapperRef  = useRef()
  const tiltRef     = useRef()
  const sweepRef    = useRef()
  const [hovered, setHovered]   = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => { onMount?.(wrapperRef.current, index) }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = tiltRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
    const xN = (x / rect.width  - 0.5) * 2
    const yN = (y / rect.height - 0.5) * 2
    gsap.to(tiltRef.current, {
      rotateX: -yN * 3.5,
      rotateY:  xN * 3.5,
      transformPerspective: 900,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const handleEnter = useCallback(() => {
    setHovered(true)
    gsap.to(tiltRef.current, { y: -7, duration: 0.32, ease: 'power2.out' })
    const el = sweepRef.current
    if (el) {
      el.style.transition = 'none'; el.style.left = '-45%'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!sweepRef.current) return
        sweepRef.current.style.transition = 'left 700ms cubic-bezier(0.25,0.46,0.45,0.94)'
        sweepRef.current.style.left = '130%'
      }))
    }
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(false)
    gsap.to(tiltRef.current, { y: 0, rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' })
  }, [])

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`relative group card-noise rounded-2xl border flex flex-col overflow-hidden h-full
          border-white/[0.07] bg-[#0d0d0d]
          ${project.placeholder ? 'opacity-70 hover:opacity-100' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(${project.accentRgb},0.18)`
            : '0 2px 16px rgba(0,0,0,0.3)',
          transition: 'box-shadow 320ms ease, opacity 300ms ease',
        }}
      >
        <div className="card-corner tl" /><div className="card-corner tr" />
        <div className="card-corner bl" /><div className="card-corner br" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" style={{ zIndex: 8 }}>
          <div ref={sweepRef} className="absolute top-0 h-full pointer-events-none"
            style={{ width: '45%', left: '-45%', background: 'linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.05) 50%, transparent 85%)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
          zIndex: 9, opacity: hovered ? 1 : 0, transition: 'opacity 250ms ease',
          background: `radial-gradient(360px at ${mousePos.x}px ${mousePos.y}px, rgba(${project.accentRgb},0.10), transparent 65%)`,
        }} />

        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
          zIndex: 9, opacity: hovered ? 1 : 0, transition: 'opacity 320ms ease',
          boxShadow: `inset 0 0 0 1px rgba(${project.accentRgb},0.25)`,
        }} />

        <div className="relative h-48 overflow-hidden border-b border-white/[0.06] rounded-t-2xl bg-[#0a0a0a]">
          <div className="w-full h-full" style={{ transition: 'transform 400ms ease', transform: hovered ? 'scale(1.02)' : 'scale(1)' }}>
            {project.placeholder
              ? <PlaceholderVisual accentRgb={project.accentRgb} />
              : project.visual}
          </div>
        </div>

        <div className="relative p-5 flex flex-col gap-3 flex-1" style={{ zIndex: 10 }}>
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={project.category} />
            <StatusBadge status={project.status} />
          </div>

          <h3 className="text-[16px] font-semibold text-white tracking-tight leading-snug">
            {project.title}
          </h3>

          <p className="text-[13px] text-zinc-400 leading-relaxed flex-1">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400">
                {t}
              </span>
            ))}
          </div>

          {!project.placeholder && (
            <div className="flex items-center gap-2 pt-1">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-[12px] text-zinc-300 hover:border-white/[0.18] hover:text-white transition-all duration-150">
                  <GitHubIcon />GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white transition-all duration-150"
                  style={{ background: `rgba(${project.accentRgb},0.15)`, border: `1px solid rgba(${project.accentRgb},0.25)` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.27)` }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.15)` }}>
                  <ExternalLinkIcon />Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionHeader() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className="mb-16"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <p className="section-label mb-4">Portfolio</p>
      <h2 className="text-[28px] md:text-[36px] font-bold text-white tracking-tight mb-4 leading-tight">
        Ausgewählte Projekte
      </h2>
      <p className="text-[14px] text-zinc-400 max-w-md leading-relaxed">
        Eine Auswahl meiner Projekte — von Mobile Apps über Web-Entwicklung bis hin zu UX/UI Design.
      </p>
    </div>
  )
}

export default function PortfolioSection() {
  const gridRef  = useRef()
  const cardRefs = useRef([])

  const handleMount = useCallback((el, i) => {
    cardRefs.current[i] = el
  }, [])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { amount: 0.55, from: 'start' },
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div id="portfolio" className="bg-[#080808] py-32">
        <div className="max-w-6xl mx-auto px-8">
          <SectionHeader />

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {PROJECTS.map((p, i) => (
              <PortfolioCard key={p.title} project={p} index={i} onMount={handleMount} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
