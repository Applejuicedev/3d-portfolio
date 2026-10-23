import { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent, useMotionValue } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Contours } from './BackgroundPatterns'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Same gradient as the hero name, so both read as one brand
const NAME_GRADIENT = 'linear-gradient(135deg, #bfdbfe 0%, #a5b4fc 28%, #e0e7ff 52%, #818cf8 74%, #93c5fd 100%)'

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

// Short version of the bio in large type: the words are "read" while scrolling, brightening from
// dim to light; names in [data-accent] end in indigo.
function Summary({ children }) {
  const ref = useRef()
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(ref.current, { type: 'words' })
      gsap.fromTo(split.words, { color: '#3f3f46' }, {
        color: (i, el) => (el.closest('[data-accent]') ? '#a5b4fc' : '#e4e4e7'),
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', end: 'bottom 35%', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <p ref={ref} className="text-[20px] md:text-[24px] font-medium tracking-tight leading-[1.45] text-zinc-200 [&_[data-accent]]:text-indigo-300">
      {children}
    </p>
  )
}

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

// Section label as a path, like the prompt in the hero
export function SectionPath({ path, className = 'mb-16' }) {
  return (
    <p className={`text-[12.5px] text-zinc-600 ${className}`} style={{ fontFamily: MONO }}>
      ~/<span className="text-zinc-400">{path}</span>
    </p>
  )
}

// One paragraph of the full story, written like a commit: short hash (+ ref) and the chapter name,
// with a commit dot sitting on the reading rail
function Chapter({ label, hash, gitRef, children }) {
  return (
    <div data-chapter className="relative">
      <span aria-hidden className="absolute -left-[27px] top-[3px] w-[7px] h-[7px] rounded-full border border-indigo-300/70 bg-[#0a0a0a]" />
      <p data-kicker className="flex items-baseline gap-2.5 mb-2">
        <span className="text-[11.5px] text-zinc-600" style={{ fontFamily: MONO }}>{hash}</span>
        {gitRef && <span className="text-[11px] text-zinc-500" style={{ fontFamily: MONO }}>({gitRef})</span>}
        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-indigo-300/70">{label}</span>
      </p>
      <p data-text>{children}</p>
    </div>
  )
}

// The full story. Each chapter's lines rise out of a mask as it scrolls in; while reading, the
// chapter closest to the middle of the screen is fully lit, the others step back, and a thin rail
// on the left fills up with the reading progress.
function Story({ children }) {
  const rootRef = useRef()
  const railRef = useRef()

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const chapters = gsap.utils.toArray('[data-chapter]', rootRef.current)
      chapters.forEach((ch) => {
        let revealed = false
        const reveal = { trigger: ch, start: 'top 85%', once: true }
        gsap.from(ch.querySelector('[data-kicker]'), { opacity: 0, x: -10, duration: 0.6, ease: 'power2.out', scrollTrigger: reveal })
        SplitText.create(ch.querySelector('[data-text]'), {
          type: 'lines',
          mask: 'lines',
          autoSplit: true, // re-split on resize so the line breaks stay right
          onSplit(self) {
            if (revealed) return // a re-split after the reveal must not play it again
            return gsap.from(self.lines, {
              yPercent: 100, duration: 0.9, ease: 'expo.out', stagger: 0.03,
              scrollTrigger: reveal,
              onComplete: () => { revealed = true },
            })
          },
        })
      })

      // reading focus: the chapter closest to the middle of the screen is lit
      let focused = -1
      const focus = () => {
        const mid = window.innerHeight / 2
        let best = 0, bestD = Infinity
        chapters.forEach((ch, i) => {
          const r = ch.getBoundingClientRect()
          const d = r.top > mid ? r.top - mid : r.bottom < mid ? mid - r.bottom : 0
          if (d < bestD) { bestD = d; best = i }
        })
        if (best === focused) return
        focused = best
        chapters.forEach((ch, i) => gsap.to(ch, { opacity: i === best ? 1 : 0.4, duration: 0.45, overwrite: 'auto' }))
      }
      ScrollTrigger.create({ trigger: rootRef.current, start: 'top bottom', end: 'bottom top', onUpdate: focus, onRefresh: focus })

      gsap.fromTo(railRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top 62%', end: 'bottom 38%', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={rootRef} data-story className="relative mt-10 pl-6 py-2">
      <p aria-hidden className="mb-[33px] text-[12px] text-zinc-600" style={{ fontFamily: MONO }}>$ <span className="text-zinc-400">git log --reverse</span> <span className="text-zinc-700">story.md</span></p>
      {/* reading progress rail */}
      <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px">
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div ref={railRef} className="absolute inset-0 bg-gradient-to-b from-indigo-400/70 to-indigo-500/30 origin-top" style={{ transform: 'scaleY(0)' }} />
      </div>
      <div className="space-y-[48px] text-[14.5px] leading-[1.8] text-zinc-300">{children}</div>
    </div>
  )
}

// The name rises letter by letter out of a mask when it scrolls in. Every letter gets its own slice
// of the gradient, so the name still reads as one continuous gradient.
function Name({ children }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => SplitText.create(el, {
      type: 'chars,lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        const box = el.getBoundingClientRect()
        self.chars.forEach((c) => {
          const r = c.getBoundingClientRect()
          Object.assign(c.style, {
            backgroundImage: NAME_GRADIENT,
            backgroundSize: `${box.width}px ${box.height}px`,
            backgroundPosition: `${box.left - r.left}px ${box.top - r.top}px`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })
        })
        if (reduced) return
        return gsap.from(self.chars, {
          yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.035,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      },
    }))
    return () => ctx.revert()
  }, [])
  return (
    <h3
      ref={ref}
      className="leading-[1.1] mb-10 pb-1"
      style={{
        fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
        fontWeight: 300,
        letterSpacing: '-0.03em',
        color: '#c7d2fe',
        // soft indigo glow instead of a dark shadow, which would grey out the gradient
        filter: 'drop-shadow(0 0 22px rgba(99,102,241,0.28))',
      }}
    >
      {children}
    </h3>
  )
}

// Types the tools one after another (type, hold, delete, next), starting once `active`
function useToolTyper(active) {
  const [display, setDisplay]     = useState('')
  const [isDeleting, setDeleting] = useState(false)
  const [idx, setIdx]             = useState(0)

  useEffect(() => {
    if (!active) return
    const target = FRAMEWORKS[idx]
    if (!isDeleting && display === target) {
      const t = setTimeout(() => setDeleting(true), 2100)
      return () => clearTimeout(t)
    }
    if (isDeleting && display === '') {
      const t = setTimeout(() => { setDeleting(false); setIdx(i => (i + 1) % FRAMEWORKS.length) }, 380)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplay(isDeleting ? target.slice(0, display.length - 1) : target.slice(0, display.length + 1))
    }, (isDeleting ? 40 : 85) + Math.random() * 22)
    return () => clearTimeout(t)
  }, [display, isDeleting, idx, active])

  return { display, color: FRAMEWORK_COLORS[FRAMEWORKS[idx]] || '#93c5fd' }
}

// The story in short, as a source file: what the chapters say, as one object. Stations are links,
// the tools are typed into `arbeitetMit`.
const K = ({ children }) => <span className="text-sky-200/70">{children}</span>          // key
const S = ({ children }) => <span className="text-amber-100/60">'{children}'</span>      // string
const N = ({ children }) => <span className="text-emerald-200/70">{children}</span>      // number
const P = ({ children }) => <span className="text-zinc-600">{children}</span>             // punctuation
const C = ({ children }) => <span className="text-zinc-600">{'  // '}{children}</span>    // comment
const L = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-amber-100/60 underline decoration-white/15 underline-offset-[3px] transition-colors duration-150 hover:text-white hover:decoration-white/40">'{children}'</a>
)

// story.md: the same story as a compact record, with a few things the text doesn't say
const H = ({ level = 1, children }) => <><span className="text-zinc-600">{'#'.repeat(level)} </span><span className="text-indigo-300/80">{children}</span></>
const Li = ({ when, children }) => <><span className="text-zinc-600">- </span>{when && <span className="text-emerald-200/60">{when.padEnd(13)}</span>}<span className="text-zinc-400">{children}</span></>
const B = ({ children }) => <span className="text-zinc-200"><span className="text-zinc-600">**</span>{children}<span className="text-zinc-600">**</span></span>
const MD_LINES = [
  <H>Werdegang</H>,
  '',
  <Li when="2020 – 2022">MGTA · Berufliche Schule Butzbach</Li>,
  <Li when="2022 – 2023">Fachabitur</Li>,
  <Li when="2023 – 2024">Praktikum · Mastercode Applications</Li>,
  <Li when="2024 – 2025">Medieninformatik · THM, 2 Semester</Li>,
  <Li when="2024 – 2025">Nachtschicht · DHL Briefzentrum</Li>,
  <Li when="2025 – 2029">Soldat auf Zeit · Leichter Späher</Li>,
  <Li when="ab 2027">B.Sc. Medieninformatik · IU, Teilzeit</Li>,
  '',
  <H level={2}>Gerade in Arbeit</H>,
  <Li><B>Dienstzeit</B> – App für Soldaten</Li>,
  <Li><B>Creator's Journal</B> – Garmin-Dashboard</Li>,
  '',
  <H level={2}>Kontakt</H>,
  <><span className="text-zinc-600">&lt;</span><a href="mailto:vincent@fidanli.de" className="text-amber-100/60 underline decoration-white/15 underline-offset-[3px] transition-colors duration-150 hover:text-white">vincent@fidanli.de</a><span className="text-zinc-600">&gt;</span></>,
]

function ProfileFile() {
  const ref = useRef()
  const [tab, setTab] = useState('ts')
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const tool = useToolTyper(inView)
  const lines = [
    <><span className="text-violet-300/60">export const</span> <span className="text-zinc-200">vincent</span> <P>= {'{'}</P></>,
    <>  <K>alter</K><P>:</P> <N>22</N><P>,</P></>,
    <>  <K>rolle</K><P>:</P> <S>Zeitsoldat · Medieninformatik</S><P>,</P></>,
    <>  <K>ausbildung</K><P>: [</P><S>MGTA</S><P>, </P><S>Fachabitur</S><P>],</P><C>DQR-Niveau 4</C></>,
    <>  <K>praktikum</K><P>:</P> <S>6 Monate Webentwicklung</S><P>,</P></>,
    <>  <K>studium</K><P>: {'{'}</P> <K>thm</K><P>:</P> <S>pausiert</S><P>,</P> <K>iu</K><P>:</P> <S>ab 2027</S> <P>{'}'},</P></>,
    <>  <K>dienst</K><P>:</P> <S>2025 – mind. 2029</S><P>,</P></>,
    <>  <K>stationen</K><P>: [</P></>,
    ...STATIONEN.map(({ label, href }) => <>    <L href={href}>{label}</L><P>,</P></>),
    <>  <P>],</P></>,
    <>  <K>arbeitetMit</K><P>:</P> <span className="text-amber-100/60">'</span><span style={{ color: tool.color, transition: 'color .25s ease' }}>{tool.display}</span><span className="typer-blink"><span className="typer-caret" /></span><span className="text-amber-100/60">'</span><P>,</P></>,
    <>  <K>verfügbar</K><P>:</P> <N>2029</N><P>,</P><C><span className="text-amber-300/60">●</span> Praktika & Werkstudentenstellen</C></>,
    <P>{'}'}</P>,
  ]
  // Desktop: the file's bottom edge lines up with the bottom of the last timeline card. The space
  // that takes is shared out so the gap summary → story and the gap story → file are the same.
  // Re-checked whenever sizes change.
  const wrapRef = useRef()
  useEffect(() => {
    const wrap = wrapRef.current
    const section = wrap.closest('#uber-mich')
    const story = section.querySelector('[data-story]')
    const wide = window.matchMedia('(min-width: 1024px)')
    let raf = 0
    const align = () => {
      const card = [...section.querySelectorAll('[data-tl-row]')].pop()?.querySelector('.rounded-xl.p-5')
      if (!card || !wide.matches) { wrap.style.paddingTop = ''; story.style.marginTop = ''; return }
      const top = parseFloat(story.style.marginTop || 0) ? parseFloat(story.style.marginTop) - 40 : 0 // mt-10 base
      const bottom = parseFloat(wrap.style.paddingTop) || 0
      const extra = Math.max(0, top + bottom + card.getBoundingClientRect().bottom - wrap.getBoundingClientRect().bottom)
      // with no extra space the gap below the story is 8px larger than the one above it
      const t = Math.max(0, Math.round((extra + 8) / 2))
      const b = Math.max(0, Math.round(extra - t))
      if (Math.abs(t - top) < 1 && Math.abs(b - bottom) < 1) return
      story.style.marginTop = `${40 + t}px`
      wrap.style.paddingTop = `${b}px`
      ScrollTrigger.refresh()
    }
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(align) }
    const ro = new ResizeObserver(schedule)
    ro.observe(section.querySelector('[data-tl-row]').parentElement)
    ro.observe(wrap.parentElement)
    wide.addEventListener('change', schedule)
    document.fonts?.ready.then(schedule)
    schedule()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); wide.removeEventListener('change', schedule) }
  }, [])

  return (
    <div ref={wrapRef} className="mt-12">
    <Reveal>
      {/* heading for the summary: what follows is the story in short */}
      <p className="mb-2 text-[12px] text-zinc-600" style={{ fontFamily: MONO }}>$ <span className="text-zinc-400">cat</span> {tab === 'ts' ? 'vincent.ts' : 'story.md'}</p>
      <h3 className="mb-5 text-[24px] font-medium tracking-tight text-zinc-100">Auf einen Blick</h3>
      <div ref={ref} className="rounded-lg border border-white/[0.07] bg-[#0b0b0d]/80 overflow-hidden" style={{ fontFamily: MONO }}>
        <div className="flex items-stretch border-b border-white/[0.06] text-[11.5px]">
          {[['ts', 'vincent.ts'], ['md', 'story.md']].map(([id, name]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              className={`px-4 py-2 border-r border-white/[0.06] border-t transition-colors duration-150 ${tab === id
                ? 'bg-white/[0.03] text-zinc-300 border-t-indigo-400/50'
                : 'border-t-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.02]'}`}>
              {name}
            </button>
          ))}
        </div>
        {/* both files sit in the same grid cell, so the panel always has the taller one's height
            and switching tabs never moves anything */}
        <div className="grid py-4 overflow-x-auto text-[13px] leading-[1.85]">
          {[['ts', lines], ['md', MD_LINES]].map(([id, rows]) => (
            <div key={id} aria-hidden={tab !== id} className={`[grid-area:1/1] ${tab === id ? '' : 'invisible'}`}>
              {rows.map((line, i) => (
                <div key={i} className="grid grid-cols-[44px_1fr] pr-4 whitespace-pre">
                  <span className="text-right pr-4 text-zinc-700 tabular-nums select-none">{i + 1}</span>
                  <span className="text-zinc-400">{line}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* status bar, like the bottom of an editor window */}
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-4 py-1.5 text-[11px] text-zinc-600 whitespace-nowrap overflow-hidden">
          <span>⎇ main <span className="ml-3">✓ 0 Probleme</span></span>
          <span className="hidden sm:inline">{tab === 'ts' ? 'TypeScript' : 'Markdown'} · UTF-8 · LF</span>
        </div>
      </div>
    </Reveal>
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
  { badge: 'Nebenjob', title: 'Nachtschicht im Briefzentrum', org: 'DHL', period: 'März 2024 – Aug. 2025', rgb: '250,204,21', startAfter: 2, endAfter: 3 },
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

// Note that pops in just below the card once it has scrolled in (level meter + text).
// It sits in the flow, so the row grows and it never overlaps the next card.
function LevelHint({ level, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -6, scale: 0.96 }}
      transition={inView ? { duration: 0.4, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0.2 }}
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

// Pyramid of `max` tiers, the bottom `value` lit — e.g. DQR level 4 of 8
function LevelMeter({ value, max }) {
  const W = 16, H = 13, step = H / max, gap = 0.45
  const half = (y) => (W / 2) * (y / H) // sides run straight up to the apex
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="flex-shrink-0" style={{ width: W + 2, height: H + 1 }}>
      {Array.from({ length: max }, (_, i) => {
        const yb = H - i * step, yt = yb - step + gap
        const pts = [[W / 2 - half(yb), yb], [W / 2 + half(yb), yb], [W / 2 + half(yt), yt], [W / 2 - half(yt), yt]]
        return <polygon key={i} points={pts.map((p) => p.join(',')).join(' ')} fill={i < value ? 'rgba(212,212,216,0.75)' : 'rgba(255,255,255,0.12)'} />
      })}
    </svg>
  )
}

function TimelineCard({ item, inView }) {
  const cat = CATEGORIES[item.category] || CATEGORIES.Education
  const fromLeft = item.side === 'left'

  return (
    <>
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -32 : 32 }}
      transition={{ duration: inView ? 0.55 : 0.35, delay: inView ? 0.08 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
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
    {item.level && <LevelHint level={item.level} inView={inView} />}
    </>
  )
}

// inView comes from the row (set once the drawn line reaches this dot)
function TimelineDot({ ring, inView }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
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

// ---------- Study fork ----------
// At the dropout a dashed path branches off to the right of the line, runs parallel past the
// Studium card, swings out into the free space beside the Bundeswehr card and merges back
// into the line at the Fernstudium — the studies are paused, not over.
const FORK_TRACK = 8 // px right of the line, mirrors the rails on the left
const FORK_SWING = 72

// A parallel line `off` px to the left of the main line, cut to the y range [y0, y1]
function offsetPath(pts, off, y0, y1) {
  const out = pts.map(([x, y], i) => {
    const [ax, ay] = pts[Math.max(0, i - 1)], [bx, by] = pts[Math.min(pts.length - 1, i + 1)]
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1
    return [x - (dy / len) * off, y + (dx / len) * off]
  })
  const at = (y) => {
    const i = out.findIndex(([, py]) => py >= y)
    // beyond the end of the line (e.g. a fading tail): continue straight down from the last point
    if (i === -1) return [out[out.length - 1][0], y]
    if (i === 0) return [out[0][0], y]
    const [ax, ay] = out[i - 1], [bx, by] = out[i]
    const t = (y - ay) / (by - ay || 1)
    return [ax + (bx - ax) * t, y]
  }
  const mid = out.filter(([, y]) => y > y0 && y < y1)
  return [at(y0), ...mid, at(y1)].map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

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
      // Track rails: one continuous line per track from its first to its last dot (+ fading tail),
      // just left of the main line — drawn with the line's tip like the fork, never piecewise
      const h = el.offsetHeight
      const xLine = dot(0)[0]
      const pts = [[xLine, 0], [xLine, h]]
      const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
      const rails = []
      TIMELINE.forEach((t, i) => {
        if (!t.track || TIMELINE[i - 1]?.track === t.track) return
        let j = i
        while (TIMELINE[j + 1]?.track === t.track) j++
        const track = TRACKS[t.track]
        const y0 = dot(i)[1], y1 = dot(j)[1]
        const tail = track.tail ? rows[j].offsetTop + rows[j].offsetHeight + 24 : null
        rails.push({
          key: t.track, rgb: track.rgb, d: offsetPath(pts, 6, y0, y1),
          tail: tail && { d: offsetPath(pts, 6, y1, tail), y0: y1, y1: tail },
        })
      })
      setGeom({ line, rails, dots: rows.map((_, i) => dot(i)[1]), d, h, w: el.offsetWidth, y0: ya, y1: yb, apex: phone ? null : [x2, ym], braces })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])
  return geom
}

// Drawn together with the main line: the clip grows with the line's tip (px from the top)
// (pathLength can't be used on a dashed stroke)
// Drawn as the main line passes, like the fork
function SideJobBrace({ brace, geom, tip }) {
  // The clip reaches a few px past both ends, otherwise it cuts the stroke at the bottom closure
  const pad = 6
  const clipH = useTransform(tip, v => Math.max(0, Math.min(brace.bottom + pad, v + pad) - (brace.top - pad)))
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
function SideJobLabel({ brace, tip }) {
  const shown = useTransform(tip, v => (v > brace.mid ? 1 : 0))
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

function StudyFork({ geom, tip }) {
  const clipH = useTransform(tip, v => Math.max(0, Math.min(geom.y1, v) - geom.y0))
  const tipH = useTransform(tip, v => Math.max(0, Math.min(geom.h, v)))
  const labelOpacity = useTransform(tip, v => (v > (geom.apex?.[1] ?? Infinity) ? 1 : 0))
  return (
    <>
      <svg aria-hidden className="absolute inset-0 pointer-events-none overflow-visible" width={geom.w} height={geom.h}>
        <clipPath id="tl-fork-clip" clipPathUnits="userSpaceOnUse">
          <motion.rect x={-50} y={geom.y0} width={geom.w + 100} height={clipH} />
        </clipPath>
        <clipPath id="tl-rail-clip" clipPathUnits="userSpaceOnUse">
          <motion.rect x={-50} y={0} width={geom.w + 100} height={tipH} />
        </clipPath>
        {/* Main line: faint base, plus the indigo stroke drawn down to the tip (fading towards it) */}
        <motion.linearGradient id="tl-line-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={tipH}>
          <stop offset="0" stopColor="rgba(99,102,241,0.6)" />
          <stop offset="0.5" stopColor="rgba(129,140,248,0.3)" />
          <stop offset="1" stopColor="rgba(129,140,248,0)" />
        </motion.linearGradient>
        <path d={geom.line} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <g clipPath="url(#tl-rail-clip)">
          <path d={geom.line} fill="none" stroke="url(#tl-line-grad)" strokeWidth="1" />
          {geom.rails.map((r) => (
            <g key={r.key}>
              <path d={r.d} fill="none" stroke={`rgba(${r.rgb},0.55)`} strokeWidth="2" />
              {r.tail && (
                <>
                  <linearGradient id={`tl-rail-tail-${r.key}`} gradientUnits="userSpaceOnUse" x1="0" y1={r.tail.y0} x2="0" y2={r.tail.y1}>
                    <stop offset="0" stopColor={`rgba(${r.rgb},0.55)`} />
                    <stop offset="1" stopColor={`rgba(${r.rgb},0)`} />
                  </linearGradient>
                  <path d={r.tail.d} fill="none" stroke={`url(#tl-rail-tail-${r.key})`} strokeWidth="2" />
                </>
              )}
            </g>
          ))}
        </g>
        <path d={geom.d} fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1.25"
          strokeDasharray="4 5" strokeLinecap="round" clipPath="url(#tl-fork-clip)" />
        {geom.braces.map((b, i) => <SideJobBrace key={i} brace={b} geom={geom} tip={tip} />)}
      </svg>
      {geom.braces.map((b, i) => <SideJobLabel key={i} brace={b} tip={tip} />)}
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

function TimelineRow({ item, inView }) {
  const track = item.track && TRACKS[item.track]
  // A track's first entry anchors it; milestones and parallel entries get a ringed dot
  const ring = track && (item.milestone || item.parallelToMilitary) ? track.ring : null
  return (
    // Phones: dot column + card column. From sm up: alternating left/right around the center line.
    <div data-tl-row className={`relative grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center ${item.roomy ? 'sm:py-12' : ''}`}>
      <div className={`${item.side === 'left' ? 'flex' : 'hidden sm:flex'} col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-start sm:justify-end`}>
        {item.side === 'left' && (
          <div className="w-full sm:max-w-[240px]">
            <TimelineCard item={item} inView={inView} />
          </div>
        )}
        {item.parallelToMilitary && <ServiceContinues inView={inView} />}
      </div>
      <div data-tl-dot className="flex flex-col items-center py-2 col-start-1 row-start-1 sm:col-start-auto sm:row-start-auto">
        <TimelineDot ring={ring} inView={inView} />
      </div>
      <div className={`${item.side === 'right' ? 'flex' : 'hidden sm:flex'} col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-start`}>
        {item.side === 'right' && (
          <div className="w-full sm:max-w-[240px]">
            <TimelineCard item={item} inView={inView} />
          </div>
        )}
      </div>
    </div>
  )
}

// Compact marker on the opposite side showing that the service continues alongside the degree
function ServiceContinues({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: inView ? 0.55 : 0.3, delay: inView ? 0.15 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden sm:flex items-center gap-2 rounded-lg border border-dashed border-[#a5bd84]/30 bg-[#a5bd84]/[0.04] px-3 py-2 text-[11px] text-[#a5bd84]/90"
    >
      <IconShield />
      <span className="leading-tight">Dienst läuft weiter</span>
    </motion.div>
  )
}

function Bio() {
  return (
    <div className="flex flex-col h-full min-w-0">
      <Reveal as="h2" className="text-[15px] font-light text-zinc-500 mb-1">Mein Name ist</Reveal>
      <Name>Vincent Fidanli</Name>

      <Summary>
        Ich gestalte und entwickle digitale Anwendungen, an der Schnittstelle von Design und Code. Nach
        Ausbildung, Fachabitur und zwei Semestern Medieninformatik an der <span data-accent>THM</span> bin
        ich heute Zeitsoldat bei der <span data-accent>Bundeswehr</span>. Ab 2027 studiere ich nebenbei im
        Fernstudium an der <span data-accent>IU</span> weiter.
      </Summary>

      <Story>
        <Chapter label="Die Anfänge" hash="a1c3f0e">Meine Leidenschaft für Technik und Gestaltung entstand während meiner schulischen Ausbildung. Dort habe ich das Fundament für Design, Medienproduktion und Softwareentwicklung gelegt.</Chapter>
        <Chapter label="Praktikum" hash="7be21d4">In einem sechsmonatigen Praktikum als Webentwickler bei einem Tech-Startup habe ich moderne Technologien und agile Arbeitsmethoden kennengelernt und direkt in der Praxis angewendet. Seitdem weiß ich: Ich möchte Anwendungen entwerfen und entwickeln, die Menschen wirklich nützen.</Chapter>
        <Chapter label="Studium & Nachtschicht" hash="c94e0a2">Das Medieninformatikstudium an der THM hat mir grundsätzlich sehr gut gefallen. Parallel dazu habe ich jedoch in der Nachtschicht im Briefzentrum bei <a href="https://www.google.com/maps/search/?api=1&query=DHL+Briefzentrum+Langg%C3%B6ns" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white">DHL in Langgöns</a> gearbeitet, sodass mir oft die Kraft fehlte, mich so intensiv auf Prüfungen und Testate vorzubereiten, wie ich es mir gewünscht hätte. Gleichzeitig hat mich diese Zeit viel gelehrt, das mir heute im Dienst und darüber hinaus zugutekommt: Disziplin und die Erkenntnis, dass Erfolg nicht von allein kommt. Man muss ihn sich erarbeiten.</Chapter>
        <Chapter label="Die Entscheidung" hash="3f8d6b1" gitRef="pause">Im ersten Semester konnte ich noch stark auf die Vorkenntnisse aus meiner schulischen Ausbildung zurückgreifen. Spätestens im zweiten Semester wurde der Stoff jedoch neu und anspruchsvoller, und mir wurde klar, dass sich Nachtschicht, Vorlesungen, Prüfungen und Testate auf Dauer nicht in der Qualität vereinbaren ließen, die ich von mir selbst erwarte. Nach reiflicher Überlegung habe ich mich deshalb entschieden, das Studium zu pausieren und meinen Dienst als Soldat anzutreten. Ich wollte mich finanziell und persönlich festigen und ein stabiles Fundament für meinen weiteren Lebensweg schaffen. Ursprünglich hatte ich geplant, das Studium nach meiner Dienstzeit mit Unterstützung des Berufsförderungsdienstes wieder aufzunehmen.</Chapter>
        <Chapter label="Heute" hash="e05c7f9" gitRef="HEAD → main">Im Laufe meiner Dienstzeit habe ich jedoch festgestellt, dass mir meine Aufgaben in der Mannschaftslaufbahn genug zeitlichen Freiraum lassen, um ein Teilzeit-Fernstudium neben dem Dienst zu bewältigen. Deshalb nehme ich zum 1. Januar 2027 den Bachelor of Science in Medieninformatik wieder auf, um mein Ziel, das ich schon so lange verfolge, endlich zu erreichen.</Chapter>
      </Story>

      <ProfileFile />
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

  const forkGeom = useForkGeometry(timelineRef)
  const geomRef = useRef(null)
  geomRef.current = forkGeom

  // The line's tip follows a fixed height on screen (70 % down), measured in px from the top of the
  // timeline. Independent of the timeline's height, so switching the layout never re-draws it.
  // Folding the story shifts the page up like scrolling up, so the line retracts along with it
  const { scrollY } = useScroll()
  const tipTarget = useMotionValue(0)
  const updateTip = useCallback(() => {
    const el = timelineRef.current
    if (!el) return
    tipTarget.set(Math.max(0, Math.min(el.offsetHeight, window.innerHeight * 0.7 - el.getBoundingClientRect().top)))
  }, [tipTarget])
  useMotionValueEvent(scrollY, 'change', updateTip)
  useEffect(() => {
    updateTip()
    window.addEventListener('resize', updateTip)
    return () => window.removeEventListener('resize', updateTip)
  }, [updateTip, forkGeom])
  const tip = useSpring(tipTarget, { stiffness: 60, damping: 22 })

  // The timeline builds up with the line: a station appears once the drawn line reaches its dot,
  // and disappears again when scrolling back up past it
  const [reached, setReached] = useState(0)
  const updateReached = useCallback((v) => {
    const g = geomRef.current
    if (g) setReached(g.dots.filter((y) => v >= y - 8).length)
  }, [])
  useMotionValueEvent(tip, 'change', updateReached)
  useEffect(() => updateReached(tip.get()), [forkGeom, tip, updateReached])

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

        <div className="px-6 sm:px-10 lg:px-16 relative z-10">
          <SectionPath path="über-mich" />

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-start">

            {/* Left: bio */}
            <Bio />

            {/* Right: alternating timeline. The line itself is drawn as an SVG path through the measured dots. */}
            <div ref={timelineRef} className="relative">
              {forkGeom && <StudyFork geom={forkGeom} tip={tip} />}

              <div className="flex flex-col gap-10">
                {TIMELINE.map((item, i) => (
                  <TimelineRow key={i} item={item} inView={i < reached} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
