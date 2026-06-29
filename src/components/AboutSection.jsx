import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import gsap from 'gsap'

const NAME_SHADOW = '0 1px 4px rgba(0,0,0,0.45), 0 3px 12px rgba(0,0,0,0.25), 0 0 60px rgba(99,102,241,0.06)'

const FRAMEWORKS = [
  'React', 'Next.js', 'TypeScript', 'Three.js', 'Node.js',
  'Framer Motion', 'Tailwind CSS', 'GSAP', 'SwiftUI', 'Python',
  'Figma', 'Docker', 'MongoDB', 'Git',
]

const FRAMEWORK_COLORS = {
  'React':         '#61DAFB',
  'Next.js':       '#e2e2e2',
  'TypeScript':    '#4C8DCA',
  'Three.js':      '#c0c0c0',
  'Node.js':       '#74B260',
  'Framer Motion': '#9B7FEA',
  'Tailwind CSS':  '#38BDF8',
  'GSAP':          '#88CE02',
  'SwiftUI':       '#FA7343',
  'Python':        '#FFD43B',
  'Figma':         '#F24E1E',
  'Docker':        '#2496ED',
  'MongoDB':       '#47A248',
  'Git':           '#F05032',
}

function FrameworkTyper() {
  const [display, setDisplay]     = useState('')
  const [isDeleting, setDeleting] = useState(false)
  const [idx, setIdx]             = useState(0)

  useEffect(() => {
    const target = FRAMEWORKS[idx]

    if (!isDeleting && display === target) {
      const t = setTimeout(() => setDeleting(true), 2100)
      return () => clearTimeout(t)
    }
    if (isDeleting && display === '') {
      const t = setTimeout(() => {
        setDeleting(false)
        setIdx(i => (i + 1) % FRAMEWORKS.length)
      }, 380)
      return () => clearTimeout(t)
    }

    const base   = isDeleting ? 40 : 85
    const jitter = Math.random() * 22
    const t = setTimeout(() => {
      setDisplay(isDeleting
        ? target.slice(0, display.length - 1)
        : target.slice(0, display.length + 1)
      )
    }, base + jitter)
    return () => clearTimeout(t)
  }, [display, isDeleting, idx])

  const brandColor = FRAMEWORK_COLORS[FRAMEWORKS[idx]] || '#93c5fd'

  return (
    <div className="w-full border-t border-white/[0.06] pt-6">
      <p className="text-[10px] font-semibold text-zinc-500 tracking-[0.22em] uppercase mb-4">
        I build with
      </p>
      <div className="flex items-end gap-0" style={{ minHeight: '4.4rem' }}>
        <span
          className="font-light tracking-tight leading-none"
          style={{
            fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
            color: brandColor,
            minWidth: '1ch',
            transition: 'color 0.25s ease',
          }}
        >
          {display}
        </span>
        <span
          className="inline-block ml-1 mb-[4px] rounded-[1px] flex-shrink-0"
          style={{
            width: 3,
            height: 'clamp(1.9rem, 3.4vw, 2.8rem)',
            background: brandColor,
            animation: 'blink 1.1s ease-in-out infinite',
            transition: 'background 0.25s ease',
          }}
        />
      </div>
    </div>
  )
}

const CATEGORIES = {
  Education: { label: 'Education',  cls: 'bg-blue-500/10   border-blue-500/20   text-blue-400',   dot: 'bg-blue-400'    },
  Work:       { label: 'Work',       cls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', dot: 'bg-emerald-400' },
  Military:   { label: 'Military',   cls: 'bg-orange-500/10 border-orange-500/20 text-orange-400', dot: 'bg-orange-400'  },
  Freelance:  { label: 'Freelance',  cls: 'bg-violet-500/10 border-violet-500/20 text-violet-400', dot: 'bg-violet-400'  },
}

function IconGraduation() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
}
function IconBriefcase() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

const ICONS = { Education: <IconGraduation />, Work: <IconBriefcase />, Military: <IconShield />, Freelance: <IconBriefcase /> }

const TIMELINE = [
  { year: '2016 – 2020', title: 'Realschulabschluss', desc: 'Schulische Grundlage mit frühem Interesse an Technik und Design.', category: 'Education', side: 'right' },
  { year: '2020 – 2022', title: 'Medien- & Gestaltungstechnischer Assistent', desc: 'Fachliche Ausbildung in Design und Medienproduktion.', category: 'Education', side: 'left' },
  { year: '2022 – 2023', title: 'Fachabitur', desc: 'Erweiterung der schulischen Qualifikation parallel zur Ausbildung.', category: 'Education', side: 'right' },
  { year: '2023 – 2024', title: 'Praktikum als Webentwickler', desc: 'Sechsmonatiges Praktikum bei einem Tech-Startup. React, agile Methoden und kreative Problemlösung.', category: 'Work', side: 'left' },
  { year: '2024 – 2025', title: 'Medieninformatik Studium', desc: 'Studium an der Technischen Hochschule Mittelhessen (THM).', category: 'Education', side: 'right' },
  { year: '2025 – Jetzt', title: 'Soldat auf Zeit', desc: 'Dienst im Hochgebirgsspähzug. Disziplin, Teamfähigkeit und mentale Stärke.', category: 'Military', side: 'left' },
]

const SKILLS = ['React / Next.js', 'Three.js', 'SwiftUI', 'Python', 'Figma / UX/UI', 'GSAP', 'Tailwind CSS', 'CISCO Networking']

const STATS = [
  { value: '22',  label: 'Jahre alt' },
  { value: '6+',  label: 'Monate Praktikum' },
  { value: '3+',  label: 'Projekte' },
  { value: 'THM', label: 'Hochschule' },
]

function TimelineCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cat = CATEGORIES[item.category] || CATEGORIES.Education
  const fromLeft = item.side === 'left'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-xl border border-white/[0.07] bg-[#0d0d0d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-colors duration-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-md border ${cat.cls}`}>
          <span className={`w-1 h-1 rounded-full ${cat.dot}`} />
          {cat.label}
        </span>
      </div>
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-zinc-500">{ICONS[item.category]}</span>
        <span className="text-[11px] font-medium text-zinc-500 tracking-wide">{item.year}</span>
      </div>
      <h3 className="text-[14px] font-semibold text-white tracking-tight leading-snug mb-2">{item.title}</h3>
      <p className="text-[12.5px] text-zinc-400 leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

function TimelineDot({ index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.06 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-indigo-500 flex-shrink-0 z-10"
      style={{ boxShadow: '0 0 10px rgba(99,102,241,0.5)' }}
    />
  )
}

function Bio() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col h-full"
    >
      <h2 className="text-[15px] font-light text-zinc-500 mb-1">Mein Name ist</h2>
      <h3
        className="text-white leading-tight mb-8"
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          textShadow: NAME_SHADOW,
        }}
      >
        Vincent Fidanli
      </h3>

      <div className="space-y-5 text-[13.5px] leading-[1.75] text-zinc-400">
        <p>Ich bin 22 Jahre alt und studiere Medieninformatik an der Technischen Hochschule Mittelhessen (THM). Nach dem zweiten Semester entschied ich mich, als Zeitsoldat zur Bundeswehr zu gehen, um der Gesellschaft und meinem Vaterland etwas zurückzugeben.</p>
        <p>Meine Leidenschaft für Technik und Gestaltung entwickelte sich bereits während meiner schulischen Ausbildung — diese legte das Fundament für meine Fähigkeiten in Design und Medienproduktion.</p>
        <p>Nach einem sechsmonatigen Praktikum als Frontend-Entwickler bei einem Tech-Startup lernte ich moderne Technologien und agile Arbeitsmethoden kennen. Personen wie David Goggins und Arda Saatci haben mich tief inspiriert.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <span key={skill} className="text-[12px] font-medium px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400 transition-opacity duration-150 hover:opacity-55">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3">
        {STATS.map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[22px] font-bold tracking-tight text-white">{value}</div>
            <div className="text-[12px] text-zinc-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-center gap-3">
        <span
          className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"
          style={{ boxShadow: '0 0 8px rgba(52,211,153,0.75)' }}
        />
        <div>
          <div className="text-[13px] font-medium text-emerald-400 tracking-tight">Verfügbar ab 2027</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Offen für Praktika &amp; Werkstudentenstellen</div>
        </div>
      </div>

      <div className="flex-1 min-h-[6rem] flex items-center mt-8">
        <FrameworkTyper />
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const sectionRef  = useRef()
  const glowRef     = useRef()
  const timelineRef = useRef()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !glowRef.current) return

    const GLOW_RADIUS = 350

    gsap.set(glowRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: section.offsetWidth  * 0.5,
      y: section.offsetHeight * 0.35,
    })

    let lastClientX = window.innerWidth  * 0.5
    let lastClientY = window.innerHeight * 0.5

    const moveGlow = (clientX, clientY) => {
      const rect = section.getBoundingClientRect()
      // Clamp to ±GLOW_RADIUS beyond section edges so the glow peeks in
      // from the border when cursor is just outside, but never chases the
      // cursor across the entire page.
      const x = Math.max(-GLOW_RADIUS, Math.min(rect.width  + GLOW_RADIUS, clientX - rect.left))
      const y = Math.max(-GLOW_RADIUS, Math.min(rect.height + GLOW_RADIUS, clientY - rect.top))
      gsap.to(glowRef.current, { x, y, duration: 0.65, ease: 'power2.out', overwrite: 'auto' })
    }

    const handleMove = (e) => {
      lastClientX = e.clientX
      lastClientY = e.clientY
      moveGlow(e.clientX, e.clientY)
    }

    // Recalculate on scroll so the glow stays under the cursor even when
    // the user scrolls without moving the mouse.
    const handleScroll = () => moveGlow(lastClientX, lastClientY)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('scroll',    handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll',    handleScroll)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 55%'],
  })
  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineScaleY = useSpring(rawScaleY, { stiffness: 60, damping: 22 })

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div id="uber-mich" ref={sectionRef} className="relative bg-[#0a0a0a] py-28 overflow-hidden">

        {/* Cursor-following indigo spotlight */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: 700,
            height: 700,
            left: 0,
            top: 0,
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 62%)',
            zIndex: 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <p className="section-label mb-16">Über mich</p>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-stretch">

            {/* Left: bio */}
            <Bio />

            {/* Right: alternating timeline */}
            <div ref={timelineRef} className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06] origin-top" />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-400/30 to-transparent origin-top"
                style={{ scaleY: lineScaleY, height: '100%' }}
              />

              <div className="flex flex-col gap-10">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <div className="flex justify-end">
                      {item.side === 'left' && (
                        <div className="w-full max-w-[240px]">
                          <TimelineCard item={item} index={i} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center py-2">
                      <TimelineDot index={i} />
                    </div>
                    <div className="flex justify-start">
                      {item.side === 'right' && (
                        <div className="w-full max-w-[240px]">
                          <TimelineCard item={item} index={i} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
