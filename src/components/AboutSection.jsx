import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import gsap from 'gsap'
import { Contours } from './BackgroundPatterns'

const NAME_SHADOW = '0 1px 4px rgba(0,0,0,0.45), 0 3px 12px rgba(0,0,0,0.25), 0 0 60px rgba(99,102,241,0.06)'

const FRAMEWORKS = [
  'React', 'Claude Code', 'Next.js', 'TypeScript', 'ChatGPT', 'Three.js', 'Node.js',
  'Perplexity', 'Framer Motion', 'Tailwind CSS', 'Claude', 'GSAP', 'SwiftUI', 'Python',
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
  'Claude':        '#D97757',
  'Claude Code':   '#D97757',
  'ChatGPT':       '#10A37F',
  'Perplexity':    '#20B8CD',
}

// Scroll reveal for the bio: IntersectionObserver + a CSS transition on opacity/transform only,
// so each element fades in on its own as it scrolls into view (same feel as the timeline cards)
const REVEAL_EASE = 'cubic-bezier(0.25,0.46,0.45,0.94)'
function Reveal({ as: Tag = 'div', delay = 0, y = 18, extraTransition, className, style, children, ...rest }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <Tag
      ref={ref}
      {...rest}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 0.6s ${REVEAL_EASE} ${delay}s, transform 0.6s ${REVEAL_EASE} ${delay}s`
          + (extraTransition ? `, ${extraTransition}` : ''),
      }}
    >
      {children}
    </Tag>
  )
}

function FrameworkTyper() {
  const [display, setDisplay]     = useState('')
  const [isDeleting, setDeleting] = useState(false)
  const [idx, setIdx]             = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return // start typing only once the typer has been revealed
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
  }, [display, isDeleting, idx, inView])

  const brandColor = FRAMEWORK_COLORS[FRAMEWORKS[idx]] || '#93c5fd'

  return (
    <div
      ref={ref}
      className="w-full border-t border-white/[0.06] pt-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translate3d(0, 18px, 0)',
        transition: `opacity 0.6s ${REVEAL_EASE}, transform 0.6s ${REVEAL_EASE}`,
      }}
    >
      <p className="text-[10px] font-semibold text-zinc-500 tracking-[0.22em] uppercase mb-4">
        Ich arbeite mit
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
  Education: { label: 'Education',  cls: 'bg-blue-500/10   border-blue-500/20   text-blue-400',   dot: 'bg-blue-400', org: 'text-blue-300/80' },
  Work:       { label: 'Work',       cls: 'bg-red-500/10 border-red-500/20 text-red-400', dot: 'bg-red-400', org: 'text-red-300/80' },
  // Military: muted olive (#a5bd84) — reads as Bundeswehr and doesn't clash with the DHL yellow
  Military:   { label: 'Military',   cls: 'bg-[#a5bd84]/10 border-[#a5bd84]/20 text-[#a5bd84]', dot: 'bg-[#a5bd84]', org: 'text-[#a5bd84]/80' },
  Freelance:  { label: 'Freelance',  cls: 'bg-violet-500/10 border-violet-500/20 text-violet-400', dot: 'bg-violet-400', org: 'text-violet-300/80' },
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
  { year: '2016 – 2020', title: 'Realschulabschluss', org: 'Schrenzerschule Butzbach', desc: 'Schulische Grundlage mit frühem Interesse an Technik und Design.', category: 'Education', side: 'right' },
  {
    year: '2020 – 2022', title: 'Medien- & Gestaltungstechnischer Assistent', org: 'Berufliche Schule Butzbach',
    level: { label: 'DQR-Niveau 4', detail: 'Deutscher Qualifikationsrahmen', value: 4, max: 8 },
    desc: 'Schulische Ausbildung im Bereich Medien- und Gestaltungstechnik.',
    category: 'Education', side: 'left', track: 'fachabitur', partOf: 'Schulischer Teil des Fachabiturs',
  },
  {
    year: '2022 – 2023', title: 'Fachabitur', org: 'Berufliche Schule Butzbach',
    desc: 'Erweiterung der schulischen Qualifikation parallel zur Ausbildung.',
    category: 'Education', side: 'right', track: 'fachabitur', milestone: true, partOf: 'Abschluss aus Ausbildung + Praktikum',
  },
  {
    year: '2023 – 2024', title: 'Praktikum als Webentwickler', org: 'Mastercode Applications',
    desc: 'Sechsmonatiges Praktikum bei einem Tech-Startup. React, agile Methoden und kreative Problemlösung.',
    category: 'Work', side: 'left', track: 'fachabitur', partOf: 'Praktischer Teil des Fachabiturs',
  },
  {
    year: '2024 – 2025', title: 'Medieninformatik Studium', org: 'Technische Hochschule Mittelhessen',
    desc: 'Studium an der Technischen Hochschule Mittelhessen (THM).',
    category: 'Education', side: 'right', dropout: { semesters: 2 },
    roomy: true, // extra space above/below, so the DHL brace beside it gets more height
    // Y-fork: here the paused study path branches off the line (dashed) …
  },
  { year: '2025 – mind. 2029', title: 'Soldat auf Zeit', org: 'Bundeswehr', desc: 'Dienst als Leichter Späher. Disziplin, Teamfähigkeit und mentale Stärke.', category: 'Military', side: 'left', track: 'service' },
  {
    year: 'Ab 2027', title: 'Medieninformatik Fernstudium', org: 'IU Internationale Hochschule',
    desc: 'Fortsetzung meines Studiums berufsbegleitend neben dem Dienst.',
    tags: ['Fernstudium', 'Teilzeit II', '12 Semester'],
    category: 'Education', side: 'right', track: 'service', parallelToMilitary: true, planned: true,
    resumes: true, // … and merges back in here, where the studies continue
  },
]

// Side jobs: a yellow curly brace beside the line spanning their period, between two stations
// (`afterRow` / `beforeRow` = the gaps it starts and ends in). Desktop only — no room on phones.
const SIDE_JOBS = [
  { badge: 'Nebenjob', title: 'Nachtschicht im Briefzentrum', org: 'DHL', period: 'März 2024 – Aug. 2025', rgb: '250,204,21', startAfter: 3, endAfter: 4 },
]

// Tracks connect timeline entries that belong together (drawn as a colored rail beside the main line)
const TRACKS = {
  fachabitur: { rgb: '96,165,250', ring: 'rgba(96,165,250,0.75)', tail: false },
  service:    { rgb: '165,189,132', ring: 'rgba(165,189,132,0.7)', tail: true  },
}


// Stationen aus dem Text, chronologisch, jeweils mit Link zur Einrichtung
const STATIONEN = [
  { label: 'Berufliche Schule Butzbach', href: 'https://berufsschule-butzbach.de/hoehere-berufsfachschule/gestaltungs-und-medientechnik/' },
  { label: 'THM', href: 'https://www.thm.de/' },
  { label: 'Bundeswehr', href: 'https://www.bundeswehr.de/' },
  { label: 'IU Fernstudium', href: 'https://www.iu.de/bachelor/medieninformatik/fernstudium/' },
]

const STATS = [
  { value: '22',  label: 'Jahre alt' },
  { value: '6+',  label: 'Monate Praktikum' },
  { value: '3+',  label: 'Projekte' },
  { value: 'IU',  label: 'Hochschule' },
]

// Note that pops in just below the card once it has scrolled in (level meter + text).
// It sits in the flow, so the row grows and it never overlaps the next card.
function LevelHint({ level, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: delay + 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="mt-2.5 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 origin-top-left"
    >
      <LevelMeter value={level.value} max={level.max} />
      <span className="leading-tight">
        <span className="block text-[11.5px] font-medium text-zinc-300">{level.label}</span>
        <span className="block text-[10.5px] text-zinc-500 mt-0.5">{level.detail}</span>
      </span>
    </motion.div>
  )
}

// Ascending bars, the first `value` of `max` lit — e.g. DQR level 4 of 8
function LevelMeter({ value, max }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${max * 3 - 1} 12`} className="h-3 flex-shrink-0" style={{ width: max * 3 - 1 }}>
      {Array.from({ length: max }, (_, i) => {
        const h = 3 + (9 * i) / (max - 1)
        return <rect key={i} x={i * 3} y={12 - h} width="2" height={h} rx="0.5" fill={i < value ? 'rgba(212,212,216,0.75)' : 'rgba(255,255,255,0.12)'} />
      })}
    </svg>
  )
}

function TimelineCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cat = CATEGORIES[item.category] || CATEGORIES.Education
  const fromLeft = item.side === 'left'

  return (
    <>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative rounded-xl border bg-[#0d0d0d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-colors duration-200 ${
        item.planned ? 'border-dashed border-blue-500/30 hover:border-blue-500/50' : 'border-white/[0.07] hover:border-white/[0.12]'
      }`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-md border ${cat.cls}`}>
          <span className={`w-1 h-1 rounded-full ${cat.dot}`} />
          {cat.label}
        </span>
        {item.dropout && (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md border border-rose-500/25 bg-rose-500/[0.08] text-rose-400">
            Abgebrochen
          </span>
        )}
        {item.planned && (
          <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800/60 text-zinc-400">
            Geplant
          </span>
        )}
      </div>
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-zinc-500">{ICONS[item.category]}</span>
        <span className="text-[11px] font-medium text-zinc-500 tracking-wide">{item.year}</span>
      </div>
      <h3 className="text-[14px] font-semibold text-white tracking-tight leading-snug mb-2 hyphens-auto break-words">{item.title}</h3>
      {item.org && <p className={`text-[12px] font-medium mb-1.5 ${cat.org}`}>{item.org}</p>}
      <p className="text-[12.5px] text-zinc-400 leading-relaxed">{item.desc}</p>
      {item.dropout && <SemesterBar semesters={item.dropout.semesters} />}
      {item.partOf && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06] text-[11px] text-blue-300/90">
          <IconGraduation />
          <span>{item.partOf}</span>
        </div>
      )}
      {item.parallelToMilitary && (
        <div className="sm:hidden flex items-center gap-1.5 mt-3 text-[11px] text-[#a5bd84]/90">
          <IconShield />
          <span>Parallel zum Dienst</span>
        </div>
      )}
      {item.tags && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((t) => (
            <span key={t} className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400">{t}</span>
          ))}
        </div>
      )}
    </motion.div>
    {item.level && <LevelHint level={item.level} inView={inView} delay={index * 0.06} />}
    </>
  )
}

// inView comes from the row: the dot starts at scale(0), and Safari never reports
// a zero-size element as intersecting, so it can't observe itself.
function TimelineDot({ index, ring, inView }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.06 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-indigo-500 flex-shrink-0 z-10"
      style={{ boxShadow: ring
        ? `0 0 0 3px #0a0a0a, 0 0 0 4.5px ${ring}, 0 0 12px ${ring}`
        : '0 0 10px rgba(99,102,241,0.5)' }}
    />
  )
}

function SemesterBar({ semesters }) {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: semesters }, (_, i) => (
          <div key={i} className="h-1.5 w-6 rounded-full bg-blue-400/70" />
        ))}
        <div className="h-px flex-1 border-t border-dashed border-white/[0.12]" />
        <span className="text-rose-400/80 text-[11px] leading-none">✕</span>
      </div>
      <div className="text-[10.5px] text-zinc-500 mt-1.5">Nach {semesters} Semestern abgebrochen</div>
    </div>
  )
}

// One piece of a track rail. Rows in a group are separated by the gap-10 (40px) spacing,
// so the lower half reaches into the gap to meet the next row's upper half.
function RailSegment({ rgb, part, index, inView }) {
  const pos = {
    upper: { top: 0, height: '50%' },
    lower: { top: '50%', height: 'calc(50% + 40px)' },
    tail:  { top: '50%', height: 'calc(50% + 24px)' },
  }[part]
  const background = part === 'tail'
    ? `linear-gradient(to bottom, rgba(${rgb},0.55), transparent)`
    : `rgba(${rgb},0.55)`
  return (
    <motion.div
      aria-hidden
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 + (part === 'upper' ? 0 : 0.25), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute w-[2px] origin-top pointer-events-none"
      style={{ ...pos, left: 'calc(var(--tl-x) - 7px)', background }}
    />
  )
}

// ---------- Study fork ----------
// At the dropout a dashed path branches off to the right of the line, runs parallel past the
// Studium card, swings out into the free space beside the Bundeswehr card and merges back
// into the line at the Fernstudium — the studies are paused, not over.
const FORK_TRACK = 8 // px right of the line, mirrors the rails on the left
const FORK_SWING = 72

function useForkGeometry(containerRef) {
  const [geom, setGeom] = useState(null)
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const rows = [...el.querySelectorAll('[data-tl-row]')]
      const from = TIMELINE.findIndex(t => t.dropout)
      const to = TIMELINE.findIndex(t => t.resumes)
      if (!rows.length || from < 0 || to <= from) return
      const dot = (i) => {
        const d = rows[i].querySelector('[data-tl-dot]')
        return [rows[i].offsetLeft + d.offsetLeft + d.offsetWidth / 2, rows[i].offsetTop + d.offsetTop + d.offsetHeight / 2]
      }
      const [x0, ya] = dot(from)
      const [, yb] = dot(to)
      const phone = x0 < 40 // phones: cards on every row next to the line, so no swing
      const swing = phone ? FORK_TRACK : FORK_SWING
      const x1 = x0 + FORK_TRACK, x2 = x0 + swing
      const y1 = rows[from].offsetTop + rows[from].offsetHeight // below the Studium card
      const y4 = rows[to].offsetTop                             // above the Fernstudium card
      const ym = (y1 + y4) / 2
      const ease = 22
      const d = [
        `M${x0},${ya}`,
        `C${x0},${ya + ease} ${x1},${ya + ease} ${x1},${ya + ease * 2}`, // peel off the dot
        `L${x1},${y1}`,
        `C${x1},${y1 + (ym - y1) * 0.55} ${x2},${ym - (ym - y1) * 0.55} ${x2},${ym}`, // swing out …
        `C${x2},${ym + (y4 - ym) * 0.55} ${x1},${y4 - (y4 - ym) * 0.55} ${x1},${y4}`, // … and back
        `L${x1},${yb - ease * 2}`,
        `C${x1},${yb - ease} ${x0},${yb - ease} ${x0},${yb}`, // merge into the dot
      ].join(' ')
      // Curly brace "{" just left of the line: tip points left at the card
      const gapMid = (i) => (rows[i].offsetTop + rows[i].offsetHeight + rows[i + 1].offsetTop) / 2
      const braces = phone ? [] : SIDE_JOBS.map(job => {
        const top = gapMid(job.startAfter), bottom = gapMid(job.endAfter), mid = (top + bottom) / 2
        // Small gap to the timeline; top and bottom closures are mirror images
        const xb = x0 - 10, depth = 34, xm = xb - depth / 2, tip = xb - depth, r = 17
        const d = `M${xb},${top} Q${xm},${top} ${xm},${top + r} L${xm},${mid - r} Q${xm},${mid} ${tip},${mid}`
          + ` Q${xm},${mid} ${xm},${mid + r} L${xm},${bottom - r} Q${xm},${bottom} ${xb},${bottom}`
        return { ...job, d, top, bottom, mid, tip }
      })
      setGeom({ d, h: el.offsetHeight, w: el.offsetWidth, y0: ya, y1: yb, apex: phone ? null : [x2, ym], braces })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])
  return geom
}

// Drawn together with the main line: the clip grows with the same scroll progress
// (pathLength can't be used on a dashed stroke)
// Drawn as the main line passes, like the fork
function SideJobBrace({ brace, geom, progress }) {
  // The clip reaches a few px past both ends, otherwise it cuts the stroke at the bottom closure
  const pad = 6
  const clipH = useTransform(progress, v => Math.max(0, Math.min(brace.bottom + pad, v * geom.h + pad) - (brace.top - pad)))
  const id = `tl-brace-${brace.startAfter}`
  return (
    <>
      <clipPath id={id} clipPathUnits="userSpaceOnUse">
        <motion.rect x={-50} y={brace.top - pad} width={geom.w + 100} height={clipH} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {/* soft glow underneath, then the brace itself */}
        <path d={brace.d} fill="none" stroke={`rgba(${brace.rgb},0.07)`} strokeWidth="5"
          strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'blur(2px)' }} />
        <path d={brace.d} fill="none" stroke={`rgba(${brace.rgb},0.9)`} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  )
}

// Compact card at the brace tip — deliberately less detail than the main timeline cards
function SideJobLabel({ brace, geom, progress }) {
  const shown = useTransform(progress, v => (v * geom.h > brace.mid ? 1 : 0))
  const x = useTransform(shown, v => (v ? '-100%' : 'calc(-100% + 12px)'))
  const c = (a) => `rgba(${brace.rgb},${a})`
  return (
    <motion.div
      className="absolute w-[180px] rounded-lg px-3.5 py-3 bg-[#0d0d0d] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
      style={{
        left: brace.tip - 12, top: brace.mid, x, y: '-50%', opacity: shown,
        border: `1px solid ${c(0.22)}`,
        transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border"
        style={{ color: c(0.9), background: c(0.08), borderColor: c(0.2) }}>
        <span className="w-1 h-1 rounded-full" style={{ background: c(0.9) }} />
        {brace.badge}
      </span>
      <div className="mt-2 text-[13px] font-semibold text-white tracking-tight leading-snug">{brace.title}</div>
      <div className="text-[11.5px] font-medium mt-0.5" style={{ color: c(0.8) }}>{brace.org}</div>
      <div className="text-[10.5px] text-zinc-500 mt-1.5">{brace.period}</div>
    </motion.div>
  )
}

function StudyFork({ geom, progress }) {
  const clipH = useTransform(progress, v => Math.max(0, Math.min(geom.y1, v * geom.h) - geom.y0))
  const labelOpacity = useTransform(progress, v => (v * geom.h > (geom.apex?.[1] ?? Infinity) ? 1 : 0))
  return (
    <>
      <svg aria-hidden className="absolute inset-0 pointer-events-none overflow-visible" width={geom.w} height={geom.h}>
        <clipPath id="tl-fork-clip" clipPathUnits="userSpaceOnUse">
          <motion.rect x={-50} y={geom.y0} width={geom.w + 100} height={clipH} />
        </clipPath>
        <path d={geom.d} fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1.25"
          strokeDasharray="4 5" strokeLinecap="round" clipPath="url(#tl-fork-clip)" />
        {geom.braces.map((b, i) => <SideJobBrace key={i} brace={b} geom={geom} progress={progress} />)}
      </svg>
      {geom.braces.map((b, i) => <SideJobLabel key={i} brace={b} geom={geom} progress={progress} />)}
      {geom.apex && (
        <motion.span
          aria-hidden
          className="absolute pointer-events-none text-[10.5px] font-medium tracking-wide text-blue-300/70 whitespace-nowrap"
          style={{ left: geom.apex[0] + 10, top: geom.apex[1], y: '-50%', opacity: labelOpacity, transition: 'opacity 0.4s ease' }}
        >
          Studium pausiert
        </motion.span>
      )}
    </>
  )
}

function TimelineRow({ item, index }) {
  const track = item.track && TRACKS[item.track]
  const prev = TIMELINE[index - 1]
  const next = TIMELINE[index + 1]
  const joinsPrev = track && prev?.track === item.track
  const joinsNext = track && next?.track === item.track
  // A track's first entry anchors it; milestones and parallel entries get a ringed dot
  const ring = track && (item.milestone || item.parallelToMilitary) ? track.ring : null
  const rowRef = useRef()
  const inView = useInView(rowRef, { once: true, margin: '-40px' })

  return (
    // Phones: dot column + card column. From sm up: alternating left/right around the center line.
    <div ref={rowRef} data-tl-row className={`relative grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center ${item.roomy ? 'sm:py-12' : ''}`}>
      {joinsPrev && <RailSegment rgb={track.rgb} part="upper" index={index} inView={inView} />}
      {joinsNext && <RailSegment rgb={track.rgb} part="lower" index={index} inView={inView} />}
      {track && !joinsNext && track.tail && <RailSegment rgb={track.rgb} part="tail" index={index} inView={inView} />}

      <div className={`${item.side === 'left' ? 'flex' : 'hidden sm:flex'} col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-start sm:justify-end`}>
        {item.side === 'left' && (
          <div className="w-full sm:max-w-[240px]">
            <TimelineCard item={item} index={index} />
          </div>
        )}
        {item.parallelToMilitary && <ServiceContinues index={index} />}
      </div>
      <div data-tl-dot className="flex flex-col items-center py-2 col-start-1 row-start-1 sm:col-start-auto sm:row-start-auto">
        <TimelineDot index={index} ring={ring} inView={inView} />
      </div>
      <div className={`${item.side === 'right' ? 'flex' : 'hidden sm:flex'} col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-start`}>
        {item.side === 'right' && (
          <div className="w-full sm:max-w-[240px]">
            <TimelineCard item={item} index={index} />
          </div>
        )}
      </div>
    </div>
  )
}

// Compact marker on the opposite side showing that the service continues alongside the degree
function ServiceContinues({ index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden sm:flex items-center gap-2 rounded-lg border border-dashed border-[#a5bd84]/30 bg-[#a5bd84]/[0.04] px-3 py-2 text-[11px] text-[#a5bd84]/90"
    >
      <IconShield />
      <span className="leading-tight">Dienst läuft weiter</span>
    </motion.div>
  )
}

function Bio() {
  return (
    <div className="flex flex-col h-full">
      <Reveal as="h2" className="text-[15px] font-light text-zinc-500 mb-1">Mein Name ist</Reveal>
      <Reveal
        as="h3"
        delay={0.08}
        className="text-white leading-tight mb-8"
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          textShadow: NAME_SHADOW,
        }}
      >
        Vincent Fidanli
      </Reveal>

      <ul className="-mt-4 mb-8 space-y-1.5 text-[13px] text-zinc-400">
        {[
          '22 Jahre',
          'Medien- und Gestaltungstechnischer Assistent',
          <a key="mail" href="mailto:vincent@fidanli.de" className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white">vincent@fidanli.de</a>,
        ].map((item, i) => (
          <Reveal as="li" key={i} delay={0.12 + i * 0.07} className="flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-zinc-500 flex-shrink-0" />
            {item}
          </Reveal>
        ))}
      </ul>

      <div className="space-y-10 text-[13.5px] leading-[1.75] text-zinc-400">
        <Reveal as="p">Im Anschluss an mein Fachabitur und das dazugehörige Praktikum habe ich Medieninformatik an der <a href="https://www.thm.de/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white">Technischen Hochschule Mittelhessen (THM)</a> studiert. Nach dem zweiten Semester habe ich mich entschieden, als Zeitsoldat zur Bundeswehr zu gehen, um der Gesellschaft und meinem Vaterland etwas zurückzugeben. Ab 2027 möchte ich das Studium neben dem Dienst als Fernstudium an der <a href="https://www.iu.de/bachelor/medieninformatik/fernstudium/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white">IU Internationalen Hochschule</a> fortsetzen (Teilzeit II, 12 Semester).</Reveal>
        <Reveal as="p">Meine Leidenschaft für Technik und Gestaltung entstand während meiner schulischen Ausbildung. Dort habe ich das Fundament für Design, Medienproduktion und Softwareentwicklung gelegt.</Reveal>
        <Reveal as="p">In einem sechsmonatigen Praktikum als Webentwickler bei einem Tech-Startup habe ich moderne Technologien und agile Arbeitsmethoden kennengelernt und direkt in der Praxis angewendet. Seitdem weiß ich: Ich möchte Anwendungen entwerfen und entwickeln, die Menschen wirklich nützen.</Reveal>
        <Reveal as="p">Das Medieninformatikstudium an der THM hat mir grundsätzlich sehr gut gefallen. Parallel dazu habe ich jedoch in der Nachtschicht im Briefzentrum bei <a href="https://www.google.com/maps/search/?api=1&query=DHL+Briefzentrum+Langg%C3%B6ns" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white">DHL in Langgöns</a> gearbeitet, sodass mir oft die Kraft fehlte, mich so intensiv auf Prüfungen und Testate vorzubereiten, wie ich es mir gewünscht hätte. Gleichzeitig hat mich diese Zeit viel gelehrt, das mir heute im Dienst und darüber hinaus zugutekommt: Disziplin und die Erkenntnis, dass Erfolg nicht von allein kommt. Man muss ihn sich erarbeiten.</Reveal>
        <Reveal as="p">Im ersten Semester konnte ich noch stark auf die Vorkenntnisse aus meiner schulischen Ausbildung zurückgreifen. Spätestens im zweiten Semester wurde der Stoff jedoch neu und anspruchsvoller, und mir wurde klar, dass sich Nachtschicht, Vorlesungen, Prüfungen und Testate auf Dauer nicht in der Qualität vereinbaren ließen, die ich von mir selbst erwarte. Nach reiflicher Überlegung habe ich mich deshalb entschieden, das Studium zu pausieren und meinen Dienst als Soldat anzutreten. Ich wollte mich finanziell und persönlich festigen und ein stabiles Fundament für meinen weiteren Lebensweg schaffen. Ursprünglich hatte ich geplant, das Studium nach meiner Dienstzeit mit Unterstützung des Berufsförderungsdienstes wieder aufzunehmen.</Reveal>
        <Reveal as="p">Im Laufe meiner Dienstzeit habe ich jedoch festgestellt, dass mir meine Aufgaben in der Mannschaftslaufbahn genug zeitlichen Freiraum lassen, um ein Teilzeit-Fernstudium neben dem Dienst zu bewältigen. Deshalb nehme ich zum 1. Januar 2027 den Bachelor of Science in Medieninformatik wieder auf, um mein Ziel, das ich schon so lange verfolge, endlich zu erreichen.</Reveal>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {STATIONEN.map(({ label, href }, i) => (
          <Reveal
            as="a"
            key={label}
            delay={i * 0.07}
            y={10}
            extraTransition="color 150ms ease, border-color 150ms ease"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400 transition-colors duration-150 hover:text-white hover:border-white/20"
          >
            {label}
            <svg aria-hidden="true" viewBox="0 0 12 12" className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h6v6M10 2 3 9" /></svg>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3">
        {STATS.map(({ value, label }, i) => (
          <Reveal key={label} delay={(i % 2) * 0.08} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[22px] font-bold tracking-tight text-white">{value}</div>
            <div className="text-[12px] text-zinc-500 mt-0.5">{label}</div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-center gap-3">
        <span
          className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"
          style={{ boxShadow: '0 0 8px rgba(52,211,153,0.75)' }}
        />
        <div>
          <div className="text-[13px] font-medium text-emerald-400 tracking-tight">Verfügbar ab 2029</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Offen für Praktika &amp; Werkstudentenstellen</div>
        </div>
      </Reveal>

      <div className="flex-1 min-h-[6rem] flex items-center mt-8">
        <FrameworkTyper />
      </div>
    </div>
  )
}

const ABOUT_HILLS = [
  { style: { top: '-14%', left: '-22%' },  size: 1300, seed: 5,  rings: 16 },
  { style: { top: '22%', right: '-26%' },  size: 1400, seed: 17, rings: 17 },
  { style: { top: '58%', left: '-12%' },   size: 900,  seed: 31, rings: 11 },
  { style: { bottom: '-20%', right: '8%' }, size: 1100, seed: 47, rings: 13 },
]

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

    // Short follow time keeps the glow nearly in sync with the cursor while staying smooth
    const glowX = gsap.quickTo(glowRef.current, 'x', { duration: 0.12, ease: 'power2.out' })
    const glowY = gsap.quickTo(glowRef.current, 'y', { duration: 0.12, ease: 'power2.out' })

    const moveGlow = (clientX, clientY) => {
      const rect = section.getBoundingClientRect()
      // Clamp to ±GLOW_RADIUS beyond section edges so the glow peeks in
      // from the border when cursor is just outside, but never chases the
      // cursor across the entire page.
      const x = Math.max(-GLOW_RADIUS, Math.min(rect.width  + GLOW_RADIUS, clientX - rect.left))
      const y = Math.max(-GLOW_RADIUS, Math.min(rect.height + GLOW_RADIUS, clientY - rect.top))
      glowX(x)
      glowY(y)
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
  const forkGeom = useForkGeometry(timelineRef)

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div id="uber-mich" ref={sectionRef} className="relative bg-[#0a0a0a] py-28 overflow-hidden">

        <Contours hills={ABOUT_HILLS} />

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
            {/* --tl-x: position of the timeline line (left edge on phones, centered from sm up) */}
            <div ref={timelineRef} className="relative [--tl-x:6px] sm:[--tl-x:50%]">
              <div className="absolute left-[var(--tl-x)] -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06] origin-top" />
              <motion.div
                className="absolute left-[var(--tl-x)] -translate-x-1/2 top-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-400/30 to-transparent origin-top"
                style={{ scaleY: lineScaleY, height: '100%' }}
              />
              {forkGeom && <StudyFork geom={forkGeom} progress={lineScaleY} />}

              <div className="flex flex-col gap-10">
                {TIMELINE.map((item, i) => (
                  <TimelineRow key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
