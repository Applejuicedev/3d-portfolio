import { useRef, useCallback, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import { GridPatches } from './BackgroundPatterns'
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

const PROJECTS = [
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
    title: "Creator's Journal",
    category: 'Web Development',
    status: 'Live',
    desc: "Persönliches Tages-Journal mit Zeitplan, Garmin-Health-Dashboard (Schlaf, HRV, VO₂max, Body Battery), Hevy-Trainingsanalyse und Wochen-/Monatsplanung.",
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Garmin API'],
    github: 'https://github.com/Applejuicedev/creators-journal',
    demo: null,
    accentRgb: '16,185,129',
    visual: (
      <div className="w-full h-full bg-[#0d0d0d] relative overflow-hidden flex flex-col">
        {/* Mini navbar */}
        <div className="h-6 bg-[#111] border-b border-white/[0.06] flex items-center px-2 gap-2 shrink-0">
          <span className="text-[8px] font-bold text-white/60">Creator&apos;s Journal</span>
          <div className="flex gap-1 ml-auto">
            {['Journal','Training','Garmin'].map((l) => (
              <span key={l} className="text-[7px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/30">{l}</span>
            ))}
          </div>
        </div>
        {/* Content area */}
        <div className="flex flex-1 gap-2 p-2 overflow-hidden">
          {/* Zeitplan column */}
          <div className="flex flex-col gap-1 w-1/2">
            <div className="text-[7px] text-white/30 uppercase tracking-widest mb-0.5">Zeitplan</div>
            {[
              { color: '#3b82f6', w: '75%', label: 'Morgenroutine' },
              { color: '#10b981', w: '55%', label: 'Deep Work' },
              { color: '#8b5cf6', w: '85%', label: 'Training' },
              { color: '#f59e0b', w: '45%', label: 'Abendcheck' },
            ].map(({ color, w, label }) => (
              <div key={label} className="h-5 rounded relative overflow-hidden flex items-center px-1.5"
                style={{ background: `${color}12`, border: `1px solid ${color}28` }}>
                <div className="absolute left-0 top-0 h-full opacity-30 rounded-l" style={{ width: w, backgroundColor: color }} />
                <span className="relative text-[7px] text-white/50 truncate">{label}</span>
              </div>
            ))}
          </div>
          {/* Right column: Garmin stats */}
          <div className="flex flex-col gap-1 flex-1">
            <div className="text-[7px] text-white/30 uppercase tracking-widest mb-0.5">Garmin</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                { label: 'Schlaf', value: '87', unit: 'Pt', color: '#6366f1' },
                { label: 'HRV', value: '52', unit: 'ms', color: '#10b981' },
                { label: 'VO₂max', value: '48', unit: '', color: '#3b82f6' },
                { label: 'Stress', value: '32', unit: '', color: '#f59e0b' },
              ].map(({ label, value, unit, color }) => (
                <div key={label} className="rounded p-1 flex flex-col" style={{ background: `${color}0f`, border: `1px solid ${color}20` }}>
                  <span className="text-[6px] text-white/30">{label}</span>
                  <span className="text-[11px] font-bold leading-none" style={{ color }}>{value}<span className="text-[7px] opacity-60">{unit}</span></span>
                </div>
              ))}
            </div>
            {/* Tagescheck bar */}
            <div className="mt-auto pt-1 border-t border-white/[0.05]">
              <div className="text-[6px] text-white/25 mb-0.5">Tagescheck</div>
              <div className="flex gap-0.5">
                {Array.from({length: 10}, (_, i) => (
                  <div key={i} className="flex-1 h-2 rounded-sm" style={{ backgroundColor: i < 8 ? '#10b981' : '#10b98120' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Dienstzeit',
    category: 'Mobile Development',
    status: 'In Arbeit',
    desc: 'App für Soldaten: tägliche Dienstzeiterfassung mit Erinnerung, Stunden-, FvD- und Urlaubskonto nach SAZV, Monatsübersicht als PDF wie die Buchungsliste und Datenblatt für den Urlaubsantrag. Alle Daten bleiben auf dem Gerät.',
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'],
    github: null, demo: 'https://dienstzeit-app.de', demoLabel: 'Landingpage',
    accentRgb: '61,174,114',
    visual: (
      <div className="w-full h-full bg-[#0d0d0d] relative overflow-hidden flex items-center justify-center gap-6">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(61,174,114,0.10) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        {/* App-Icon „d1“: Kalenderblatt mit Monatsraster, letzte drei Tage offen (in der App auf Tarn, hier auf App-Grün) */}
        <svg viewBox="0 0 100 100" className="relative w-[72px] h-[72px] shrink-0" style={{ filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.5))' }} aria-label="App-Icon Dienstzeit">
          <defs>
            <linearGradient id="dz-grund" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#22915A" /><stop offset="1" stopColor="#0F5C36" /></linearGradient>
            <clipPath id="dz-ecken"><rect width="100" height="100" rx="22.4" /></clipPath>
            <mask id="dz-zeichen" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect width="100" height="100" fill="#000" />
              <rect x="18" y="23" width="64" height="60" rx="5" stroke="#fff" strokeWidth="5.5" fill="none" />
              <path d="M18 31V28A5 5 0 0 1 23 23H77A5 5 0 0 1 82 28V31Z" fill="#fff" stroke="#fff" strokeWidth="5.5" strokeLinejoin="round" />
              {[34, 50, 66].map((x) => (
                <g key={x}>
                  <path d={`M${x} 17.5V23.5`} stroke="#000" strokeWidth="7.7" strokeLinecap="round" />
                  <path d={`M${x} 17.5V23.5`} stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              ))}
              {[[43.56, 43.83], [56.44, 43.83], [69.31, 43.83], [30.69, 57], [43.56, 57], [56.44, 57], [69.31, 57], [30.69, 70.17], [43.56, 70.17], [56.44, 70.17]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4.38" fill={i < 7 ? '#fff' : '#8c8c8c'} />
              ))}
            </mask>
          </defs>
          <g clipPath="url(#dz-ecken)">
            <rect width="100" height="100" fill="url(#dz-grund)" />
            <rect width="100" height="100" fill="#fff" mask="url(#dz-zeichen)" />
          </g>
        </svg>
        {/* Ausschnitt der Übersicht: Heute zuerst, dann Konten */}
        <div className="relative w-[118px] h-[180px] mt-10 rounded-t-[22px] border-[3px] border-b-0 border-[#1b3025] bg-[#06110b] px-2 pt-3 flex flex-col gap-1.5 overflow-hidden">
          <span className="text-[6px] font-semibold tracking-wider text-[#8fa99a]">MONTAG, 12. OKTOBER</span>
          <span className="text-[12px] font-bold text-[#eaf4ee] leading-none -mt-0.5">Übersicht</span>
          <span className="text-[5px] font-semibold tracking-wider text-[#8fa99a] mt-0.5 -mb-1">HEUTE</span>
          <div className="rounded-lg bg-[#112019] px-1.5">
            <div className="flex items-center gap-1 py-1 border-b border-[#294035]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4dc285]" />
              <div className="flex-1 leading-none">
                <div className="text-[6.5px] text-[#eaf4ee]">Grundbetrieb</div>
                <div className="text-[5px] text-[#8fa99a]">07:00 – 16:30</div>
              </div>
              <span className="text-[6px] text-[#5bd394] tabular-nums">+0:00</span>
            </div>
            <div className="flex items-center gap-1 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0b341]" />
              <span className="flex-1 text-[6.5px] text-[#eaf4ee] leading-none">2 Tage offen</span>
              <span className="text-[6px] text-[#294035]">›</span>
            </div>
          </div>
          <div className="rounded-lg bg-[#112019] py-1.5 flex flex-col items-center">
            <span className="text-[5px] font-semibold tracking-wider text-[#8fa99a]">STUNDENKONTO ›</span>
            <span className="text-[19px] font-bold leading-tight text-[#5bd394] tabular-nums">+10:45</span>
            <span className="text-[5.5px] text-[#8fa99a]">10 Std. 45 Min. Guthaben</span>
          </div>
          <div className="flex gap-1">
            {[['FVD ›', '4'], ['URLAUB ›', '23']].map(([l, w]) => (
              <div key={l} className="flex-1 rounded-lg bg-[#112019] py-1 flex flex-col items-center">
                <span className="text-[5px] font-semibold tracking-wider text-[#8fa99a]">{l}</span>
                <span className="text-[12px] font-bold text-[#eaf4ee] leading-tight">{w}</span>
              </div>
            ))}
          </div>
          <div className="self-center rounded-md px-2 py-1 text-[6px] font-semibold text-[#4dc285] bg-[#14301f]">
            Urlaubsantrag ausfüllen
          </div>
        </div>
      </div>
    ),
  },
]

// Background: grid fragments (like the rest of the site) spread over the whole section, plus a few
// soft greyscale blurs that scroll with the content, so only one shows up here and there.
const PORTFOLIO_GRIDS = [
  { style: { top: '-6%', right: '-6%' },   w: 700, h: 560, seed: 7,  fade: 'ellipse 55% 50% at 50% 45%' },
  { style: { top: '2%', left: '24%' },     w: 400, h: 320, seed: 89, fade: 'ellipse 50% 48% at 50% 50%' },
  { style: { top: '22%', left: '-8%' },    w: 620, h: 520, seed: 23, fade: 'ellipse 52% 50% at 50% 55%' },
  { style: { top: '44%', right: '2%' },    w: 520, h: 440, seed: 41, fade: 'ellipse 50% 48% at 50% 50%' },
  { style: { top: '64%', left: '6%' },     w: 560, h: 460, seed: 57, fade: 'ellipse 52% 50% at 50% 50%' },
  { style: { bottom: '-10%', right: '-6%' }, w: 700, h: 560, seed: 71, fade: 'ellipse 55% 50% at 50% 55%' },
]

// greyscale only, as large as the grid fragments (px): light-grey hazes alternating with deep black
// pools down the section, so the field has depth
const BLOBS = [
  { rgb: '255,255,255', a: 0.04,  size: 760, x: 16, y: 12, dx: 12, dy: 8,   dur: 19 },
  { rgb: '0,0,0',       a: 0.5,   size: 700, x: 86, y: 36, dx: -10, dy: 12, dur: 23 },
  { rgb: '255,255,255', a: 0.035, size: 720, x: 18, y: 62, dx: 10, dy: -10, dur: 21 },
  { rgb: '0,0,0',       a: 0.45,  size: 680, x: 84, y: 88, dx: -8, dy: -8,  dur: 25 },
]

function BlurSpots() {
  const ref = useRef()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tweens = [...ref.current.children].map((el, i) => gsap.to(el, {
      xPercent: BLOBS[i].dx, yPercent: BLOBS[i].dy, duration: BLOBS[i].dur,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    }))
    // only drift while the section is on screen
    const io = new IntersectionObserver(([e]) => tweens.forEach((t) => (e.isIntersecting ? t.resume() : t.pause())))
    io.observe(ref.current)
    return () => { io.disconnect(); tweens.forEach((t) => t.kill()) }
  }, [])
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none">
      {BLOBS.map((b) => (
        <div key={`${b.x}-${b.y}`} className="absolute rounded-full" style={{
          left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size,
          marginLeft: -b.size / 2, marginTop: -b.size / 2,
          background: `radial-gradient(circle closest-side, rgba(${b.rgb},${b.a}), rgba(${b.rgb},${b.a / 3}) 55%, transparent)`,
          filter: 'blur(30px)',
        }} />
      ))}
    </div>
  )
}

// Hover effects avoid React state and only animate transform/opacity,
// so mouse movement never re-renders the card or triggers layout/paint.
function PortfolioCard({ project, onMount, index }) {
  const wrapperRef   = useRef()
  const liftRef      = useRef()
  const tiltRef      = useRef()
  const sweepRef     = useRef()
  const spotlightRef = useRef()
  const quickRef     = useRef(null)
  const frameRef     = useRef(0)
  const pointerRef   = useRef({ x: 0, y: 0 })

  useEffect(() => { onMount?.(wrapperRef.current, index) }, [])

  useEffect(() => {
    gsap.set(tiltRef.current, { transformPerspective: 900 })
    quickRef.current = {
      rx: gsap.quickTo(tiltRef.current, 'rotateX', { duration: 0.22, ease: 'power2.out' }),
      ry: gsap.quickTo(tiltRef.current, 'rotateY', { duration: 0.22, ease: 'power2.out' }),
    }
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const update = useCallback(() => {
    frameRef.current = 0
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect || !quickRef.current) return
    const x = pointerRef.current.x - rect.left
    const y = pointerRef.current.y - rect.top
    spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    quickRef.current.rx(-(y / rect.height - 0.5) * 2 * 3.5)
    quickRef.current.ry( (x / rect.width  - 0.5) * 2 * 3.5)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (e.pointerType !== 'mouse') return
    pointerRef.current = { x: e.clientX, y: e.clientY }
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update)
  }, [update])

  const handleEnter = useCallback((e) => {
    if (e.pointerType !== 'mouse') return
    handleMouseMove(e)
    gsap.to(liftRef.current, { y: -7, duration: 0.32, ease: 'power2.out', overwrite: 'auto' })
    const el = sweepRef.current
    if (el) {
      el.style.transition = 'none'; el.style.transform = 'translate3d(0, 0, 0)'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!sweepRef.current) return
        sweepRef.current.style.transition = 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)'
        sweepRef.current.style.transform = 'translate3d(390%, 0, 0)'
      }))
    }
  }, [handleMouseMove])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    gsap.to(liftRef.current, { y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    quickRef.current?.rx(0)
    quickRef.current?.ry(0)
  }, [])

  return (
    <div ref={wrapperRef} className="h-full" style={{ opacity: 0 }}>
      <div
        ref={liftRef}
        onPointerMove={handleMouseMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        className="relative group h-full"
        style={{ willChange: 'transform' }}
      >
      {/* Hover shadow lives outside the clipped card and fades via opacity instead of animating box-shadow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(${project.accentRgb},0.18)` }} />
      <div
        ref={tiltRef}
        className={`relative card-noise rounded-2xl border flex flex-col overflow-hidden h-full
          border-white/[0.07] bg-[#0d0d0d] transition-opacity duration-300
          ${project.placeholder ? 'opacity-70 group-hover:opacity-100' : ''}
        `}
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.3)', willChange: 'transform' }}
      >
        <div className="card-corner tl" /><div className="card-corner tr" />
        <div className="card-corner bl" /><div className="card-corner br" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" style={{ zIndex: 8 }}>
          <div ref={sweepRef} className="absolute top-0 h-full pointer-events-none"
            style={{ width: '45%', left: '-45%', background: 'linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.05) 50%, transparent 85%)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" style={{ zIndex: 9 }}>
          <div ref={spotlightRef} className="absolute pointer-events-none" style={{
            width: 720, height: 720, left: -360, top: -360, willChange: 'transform',
            background: `radial-gradient(circle closest-side, rgba(${project.accentRgb},0.10), transparent 65%)`,
          }} />
        </div>

        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
          zIndex: 9,
          boxShadow: `inset 0 0 0 1px rgba(${project.accentRgb},0.25)`,
        }} />

        <div className="relative h-48 overflow-hidden border-b border-white/[0.06] rounded-t-2xl bg-[#0a0a0a]">
          <div className="w-full h-full transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.02]">
            {project.visual}
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
                  <ExternalLinkIcon />{project.demoLabel ?? 'Live Demo'}
                </a>
              )}
            </div>
          )}
        </div>
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
        Eine Auswahl meiner Projekte — von Mobile Apps bis zur Web-Entwicklung.
      </p>
    </div>
  )
}

// Desktop: which project is currently on top of the stack; click jumps to it
function ProjectIndex({ active, onSelect }) {
  return (
    <ol className="hidden lg:flex flex-col gap-1 -ml-3">
      {PROJECTS.map((p, i) => (
        <li key={p.title}>
          <button
            onClick={() => onSelect(i)}
            className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-300 hover:bg-white/[0.03] ${
              active === i ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <span className="text-[11px] font-medium tabular-nums tracking-wide">0{i + 1}</span>
            <span
              className="h-px bg-current transition-all duration-500 ease-out"
              style={{ width: active === i ? 28 : 12, opacity: active === i ? 0.8 : 0.4 }}
            />
            <span className="text-[13px] font-medium tracking-tight">{p.title}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}

// Sticky offset of each card; later cards stop a bit lower so the edges of the ones below peek out
const STACK_TOP = 96
const STACK_STEP = 16
const STACK_REST = 0.3 // scroll distance (share of the viewport) a card rests fully visible on top

export default function PortfolioSection() {
  const sectionRef = useRef()
  const deckRef  = useRef()
  const cardRefs = useRef([])
  const stackedRef = useRef(false)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  const handleMount = useCallback((el, i) => {
    cardRefs.current[i] = el
  }, [])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const items = [...deckRef.current.children]
    if (!cards.length) return

    const ctx = gsap.context(() => {
      // Each card fades up on its own as it scrolls in
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true } },
        )
      })
    })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Stacking: the cards are position: sticky, so they move 1:1 with the scroll — no pinning.
    // We only scale + dim the cards that are being covered, based on how far the next one has come.
    const update = () => {
      if (!stackedRef.current) return
      const vh = window.innerHeight
      const progress = items.map((item, i) => {
        if (!i) return 1
        const stop = STACK_TOP + i * STACK_STEP
        const top = item.getBoundingClientRect().top
        return gsap.utils.clamp(0, 1, (vh - top) / (vh - stop))
      })
      items.forEach((item, i) => {
        // how many cards (fractionally) lie on top of this one
        const depth = progress.slice(i + 1).reduce((a, b) => a + b, 0)
        // brightness instead of opacity: covered cards get darker but stay solid
        gsap.set(item, { scale: 1 - depth * 0.05, filter: depth > 0.001 ? `brightness(${1 - Math.min(depth, 2) * 0.3})` : 'none' })
      })
      let next = 0
      progress.forEach((p, i) => { if (p > 0.5) next = i })
      if (next !== activeRef.current) { activeRef.current = next; setActive(next) }
    }

    // Equal card heights (like in the grid) — and only stack when a card fits on screen,
    // otherwise its lower part would end up hidden under the next card.
    const fit = () => {
      items.forEach((item) => { item.style.height = '' })
      const h = Math.max(...items.map((item) => item.offsetHeight))
      items.forEach((item) => { item.style.height = `${h}px` })
      stackedRef.current = !reduced && h + STACK_TOP + (items.length - 1) * STACK_STEP + 24 < window.innerHeight
      // While stacking, each card rests fully visible for a while before the next one slides over
      // it — otherwise the next card covers its buttons (at the bottom of the card) almost at once
      const rest = stackedRef.current ? `${Math.round(window.innerHeight * STACK_REST)}px` : ''
      deckRef.current.style.rowGap = rest
      // The section ends exactly when the last card has arrived: then its bottom edge sits on the
      // bottom of the screen. From there the whole section stays put (sticky) and the contact
      // section slides over it when scrolling on.
      const section = sectionRef.current
      if (stackedRef.current) {
        const lastTop = STACK_TOP + (items.length - 1) * STACK_STEP
        const padBottom = parseFloat(getComputedStyle(section).paddingBottom)
        deckRef.current.style.paddingBottom = `${Math.max(0, window.innerHeight - lastTop - h - padBottom)}px`
        section.style.position = 'sticky'
        section.style.top = `${Math.min(0, window.innerHeight - section.offsetHeight)}px`
      } else {
        deckRef.current.style.paddingBottom = ''
        section.style.position = ''
        section.style.top = ''
      }
      items.forEach((item, i) => {
        item.style.position = stackedRef.current ? 'sticky' : 'relative'
        item.style.top = `${STACK_TOP + i * STACK_STEP}px`
        if (!stackedRef.current) gsap.set(item, { clearProps: 'transform,filter' })
      })
      update()
    }
    fit()
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    const st = ScrollTrigger.create({ trigger: deckRef.current, start: 'top bottom', end: 'bottom top', onUpdate: update })

    // Stopper: when the last card has arrived, scrolling stops right there — leftover momentum from
    // the trackpad/mouse wheel can't carry on into the contact section. A new gesture moves on:
    // momentum only ever slows down, so wheel deltas growing again mean a fresh swipe, and a
    // notched mouse wheel (even, non-shrinking steps) counts as new input after a moment. The hold
    // also ends after a short pause, after at most HOLD_MAX, or when scrolling back up. It re-arms
    // only once the user is back among the cards (a screen height above the stop).
    const section = sectionRef.current
    const stopY = () => section.offsetTop + section.offsetHeight - window.innerHeight
    const HOLD_PAUSE = 250, HOLD_MAX = 2000, NOTCH_AFTER = 350
    let held = false, passed = false, idle = 0, holdStart = 0, lastDelta = 0
    const release = () => { held = false; passed = true; clearTimeout(idle) }
    const wheel = (e) => {
      if (!stackedRef.current) return
      if (e.deltaY <= 0) { if (held) release(); return }
      if (held) {
        const heldFor = performance.now() - holdStart
        const fresh = e.deltaY > lastDelta * 1.3 + 2 || (e.deltaY >= 50 && e.deltaY >= lastDelta && heldFor > NOTCH_AFTER)
        lastDelta = e.deltaY
        // past HOLD_MAX only real input gets through — the tiny tail of a long momentum is swallowed
        if (fresh || (heldFor > HOLD_MAX && e.deltaY >= 8)) { release(); return }
        e.preventDefault()
        clearTimeout(idle)
        idle = setTimeout(release, HOLD_PAUSE)
        return
      }
      const y = window.scrollY, target = stopY()
      if (!passed && y < target && y + e.deltaY >= target) {
        e.preventDefault()
        window.scrollTo({ top: target, behavior: 'instant' })
        held = true
        holdStart = performance.now()
        lastDelta = e.deltaY
        idle = setTimeout(release, HOLD_PAUSE)
      }
    }
    const rearm = () => { if (window.scrollY < stopY() - window.innerHeight) passed = false }
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('scroll', rearm, { passive: true })

    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('scroll', rearm)
      clearTimeout(idle)
      st.kill()
      ctx.revert()
    }
  }, [])

  // Scroll so that card i has just settled on the stack
  const scrollToCard = useCallback((i) => {
    const deck = deckRef.current
    const first = deck.children[0]
    const gap = parseFloat(getComputedStyle(deck).rowGap) || 0
    const deckTop = deck.getBoundingClientRect().top + window.scrollY
    const y = deckTop + i * (first.offsetHeight + gap) - (stackedRef.current ? STACK_TOP + i * STACK_STEP : STACK_TOP)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div id="portfolio" ref={sectionRef} className="relative bg-[#080808] py-32 overflow-clip">
        <GridPatches patches={PORTFOLIO_GRIDS} />
        <BlurSpots />

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader />
              <ProjectIndex active={active} onSelect={scrollToCard} />
            </div>

            <div ref={deckRef} className="flex flex-col gap-10 max-w-[440px] w-full mx-auto">
              {PROJECTS.map((p, i) => (
                <div key={p.title} className="origin-top">
                  <PortfolioCard project={p} index={i} onMount={handleMount} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
