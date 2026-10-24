import { SectionHeading } from './Section'
import { useRef, useCallback, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import { GridPattern } from './BackgroundPatterns'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

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

// Status as a coloured dot in the card's meta line, no pill
const STATUS_DOT = { 'Abgeschlossen': 'bg-emerald-400', 'Live': 'bg-emerald-400', 'In Arbeit': 'bg-amber-400', 'Bald': 'bg-zinc-500' }

// Miniature of the hero's Web-Apps object: a wire globe with an orbit ring and a browser window in
// front. Every stroke is a faint line with dots along it, like the nodes of the real network.
function MiniWeb({ className }) {
  const line = { fill: 'none', stroke: '#818cf8', strokeOpacity: 0.22, strokeWidth: 0.35 }
  const dots = { fill: 'none', stroke: '#a5b4fc', strokeOpacity: 0.45, strokeWidth: 0.9, strokeLinecap: 'round', strokeDasharray: '0 5.5' }
  const both = (el) => <>{el(line)}{el(dots)}</>
  const lats = [-26, -13, 0, 13, 26]
  const lons = [0, 36, 72, 108, 144]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden>
      <g transform="rotate(-18 40 40)">
        {both((st) => <circle cx="40" cy="40" r="30" {...st} />)}
        {lats.map((y) => { const rx = Math.sqrt(30 * 30 - y * y); return <g key={y}>{both((st) => <ellipse cx="40" cy={40 + y} rx={rx} ry={rx * 0.22} {...st} />)}</g> })}
        {lons.map((a) => <g key={a}>{both((st) => <ellipse cx="40" cy="40" rx={Math.abs(Math.cos((a * Math.PI) / 180)) * 30 + 0.5} ry="30" {...st} />)}</g>)}
        {both((st) => <ellipse cx="40" cy="40" rx="44" ry="12" transform="rotate(22 40 40)" {...st} />)}
      </g>
      {/* browser window in front */}
      <rect x="46" y="54" width="48" height="33" rx="2.5" fill="#0a0a0a" fillOpacity="0.85" />
      {both((st) => <rect x="46" y="54" width="48" height="33" rx="2.5" {...st} />)}
      {both((st) => <path d="M46 61 H94" {...st} />)}
      {[50, 53.5, 57].map((x) => <circle key={x} cx={x} cy="57.5" r="0.9" fill="#a5b4fc" fillOpacity="0.7" />)}
      {both((st) => <rect x="61" y="56.2" width="28" height="2.6" rx="1.3" {...st} />)}
      {both((st) => <path d="M64 69 L59.5 73.5 L64 78 M76 69 L80.5 73.5 L76 78 M71.5 67.5 L68.5 79.5" {...st} />)}
    </svg>
  )
}

// **wichtig** in a story text → highlighted in the project's accent colour
function Marked({ text, rgb }) {
  return text.split('**').map((part, i) => (i % 2
    ? <strong key={i} className="font-medium" style={{ color: `rgb(${rgb})`, filter: 'brightness(1.35)' }}>{part}</strong>
    : part))
}

const PROJECTS = [
  {
    title: '3D Portfolio Website',
    category: 'Web Development',
    status: 'Live',
    desc: 'Dieses Portfolio — React, Three.js und GSAP. Ein 3D-Netz, das sich selbst aufbaut, und scroll-getriebene Animationen in jeder Section.',
    story: [
      ['problem', 'Viele Portfolios **behaupten Design und Code nur** in einem Satz. Ich wollte eine Seite, die **selbst die Arbeitsprobe** ist – gestaltet wie ein Designprojekt und gebaut wie eine Web-App.'],
      ['lösung', 'Ein **durchgehendes IDE-Konzept**: Die Headline tippt sich selbst und korrigiert sich per Autocomplete, zu jedem Thema baut sich ein **3D-Objekt aus Knotenpunkten** auf. Der Werdegang erscheint als git log, der Tech Stack als Platine.'],
      ['ergebnis', 'Wirkt auf dem Desktop wie ein Editor und **bleibt auf dem Handy leicht**: Three.js lädt nur auf großen Bildschirmen (~215 KB gespart), der längste Ladeblock sank von **470 auf 190 ms**.'],
    ],
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    github: 'https://github.com/Applejuicedev/3d-portfolio', demo: 'https://vincentfidanli.de',
    repo: 'Applejuicedev/3d-portfolio',
    accentRgb: '59,130,246',
    // a miniature of the current hero: terminal status, numbered headline, badges, topic tabs and
    // path buttons on the left over a star field with a grid patch; the Web-Apps globe on the right
    visual: (
      <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.7px)', backgroundSize: '23px 19px', backgroundPosition: '3px 7px', opacity: 0.35 }} />
        <div className="absolute left-0 top-0 h-full w-[60%]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: '20px 2px',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 35% 50%, black 35%, transparent 100%)', maskImage: 'radial-gradient(ellipse 60% 55% at 35% 50%, black 35%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 60% at 76% 52%, rgba(99,102,241,0.1), transparent 70%)' }} />
        <MiniWeb className="absolute right-2 top-1/2 -translate-y-1/2 w-[44%] h-[92%]" />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col" style={{ fontFamily: MONO }}>
          <span className="text-[5.5px] text-zinc-500">vincentfidanli@dev:~$ <span className="text-zinc-300">cat ~/.plan</span></span>
          <span className="text-[5.5px] text-zinc-600 mb-2"><span className="text-amber-300/70">●</span> Medieninformatik · verfügbar ab 2029</span>
          {[['01', 'Design trifft Code.', 'text-white'], ['02', 'Ich baue', 'text-zinc-500'], ['03', 'Web-Apps', 'text-[#93c5fd]']].map(([n, t, c]) => (
            <span key={n} className="relative">
              <span className="absolute -left-3 top-[5px] text-[4px] text-zinc-700">{n}</span>
              <span className={`text-[15px] leading-[1.05] font-medium tracking-tight ${c}`} style={{ fontFamily: 'Inter, sans-serif' }}>{t}</span>
            </span>
          ))}
          <div className="flex gap-1 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {[['React', '#61DAFB'], ['Next.js', '#e2e2e2'], ['TypeScript', '#4C8DCA']].map(([l, c]) => (
              <span key={l} className="inline-flex items-center gap-[3px] px-1.5 py-[2px] rounded-full border border-white/[0.09] bg-[#0b0b0d] text-[5.5px] text-zinc-300">
                <span className="w-[4px] h-[4px] rounded-full" style={{ background: c }} />{l}
              </span>
            ))}
          </div>
          <div className="flex gap-[2px] mt-2 self-start rounded-[3px] border border-white/[0.07] p-[2px]">
            {[['Web', '#93c5fd'], ['3D', '#c4b5fd'], ['iOS', '#fdba74'], ['UI', '#f9a8d4'], ['KI', '#fca5a5']].map(([l, c], i) => (
              <span key={l} className={`inline-flex items-center gap-[2px] px-1 py-[1px] rounded-[2px] text-[4.5px] ${i === 0 ? 'bg-white/[0.06] text-zinc-200' : 'text-zinc-600'}`}>
                <span className="w-[2.5px] h-[2.5px] rounded-full" style={{ background: c, opacity: i === 0 ? 1 : 0.45 }} />{l}
              </span>
            ))}
          </div>
          <div className="flex gap-[2px] mt-1.5 self-start rounded-[3px] border border-white/[0.1] p-[2px]">
            <span className="px-1.5 py-[2px] rounded-[2px] bg-white/[0.06] text-[5px] text-zinc-200"><span className="text-zinc-600">~/</span>projekte</span>
            <span className="px-1.5 py-[2px] text-[5px] text-zinc-500"><span className="text-zinc-700">~/</span>über-mich</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Creator's Journal",
    category: 'Web Development',
    status: 'Live',
    desc: "Persönliches Tages-Journal mit Zeitplan, Garmin-Health-Dashboard (Schlaf, HRV, VO₂max, Body Battery), Hevy-Trainingsanalyse und Wochen-/Monatsplanung.",
    story: [
      ['problem', 'Tagesplanung, Reflexion und Training lagen bei mir **verteilt in verschiedenen Apps und Notizen**. Es fehlte ein Ort, an dem ich plane, reflektiere und sehe, **ob mein Training vorankommt**.'],
      ['lösung', 'Ein **lokales Tagesjournal** (Next.js, SQLite): morgens Zeitplan per Ziehen wie im Kalender, abends Tagescheck und Reflexion, dazu Wochen- und Monatsplanung. Workouts kommen **automatisch über die Hevy-API**.'],
      ['ergebnis', 'Ein **System, das ich selbst nutze**: Fortschrittsdiagramme pro Übung mit Bestleistungen, Tagescheck-Verlauf über 30 Tage und Zeitplan-Export für den Kalender. **Alle Daten bleiben lokal.**'],
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Garmin API'],
    github: 'https://github.com/Applejuicedev/creators-journal',
    repo: 'Applejuicedev/creators-journal',
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
    desc: 'App für Soldaten: tägliche Dienstzeiterfassung mit Erinnerung, Stunden-, FvD- und Urlaubskonto nach SAZV und Monatsübersicht als PDF wie die Buchungsliste. Alle Daten bleiben auf dem Gerät.',
    story: [
      ['problem', 'Soldaten führen ihre **Dienstzeit meist auf Papier**, das Geschäftszimmer überträgt sie in die Buchungsliste. Ob Stunden-, FvD- und Urlaubskonto stimmen, ist nach SAZV und § 30c SG **kaum nachzurechnen**.'],
      ['lösung', 'Eine iOS-App mit **täglicher Erfassung und Erinnerung**. 18 Buchungsarten vom Grundbetrieb bis zur Übung rechnen Pausen, Mehrarbeit und FvD-Tage **nach den echten Regeln**. Am Monatsende entsteht ein PDF im Layout der Buchungsliste.'],
      ['ergebnis', 'Die **Konten sind jederzeit aktuell**, der Stundenzettel wird nur noch abgeschrieben. Die Rechenlogik ist **per Test gegen eine echte Buchungsliste** geprüft, alle Daten bleiben auf dem Gerät.'],
    ],
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'],
    github: null, demo: 'https://dienstzeit-app.de', demoLabel: 'Landingpage',
    repo: 'Applejuicedev/dienstzeit-app',
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

// Background: the hero's grid at a much larger cell size; the glowing particles live on a
// screen-sized canvas that stays in view while the section scrolls
const PORTFOLIO_CELL = 120

// Hover only lifts the card a little and zooms the preview, via transform/opacity, so mouse
// movement never re-renders the card or triggers layout/paint.
function PortfolioCard({ project, onMount, index }) {
  const wrapperRef = useRef()
  useEffect(() => { onMount?.(wrapperRef.current, index) }, [])

  return (
    <div ref={wrapperRef} className="h-full" style={{ opacity: 0 }}>
      <div className="relative group h-full transition-transform duration-300 ease-out hover:-translate-y-1.5">
        <div className="relative card-noise rounded-2xl border border-white/[0.07] bg-[#0d0d0d] flex flex-col overflow-hidden h-full transition-colors duration-300 group-hover:border-white/[0.14]"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>

          <div className="relative h-60 overflow-hidden border-b border-white/[0.06] rounded-t-2xl bg-[#0a0a0a]">
            <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              {project.visual}
            </div>
          </div>

          <div className="relative p-6 flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-[18px] font-medium text-white tracking-tight leading-snug">{project.title}</h3>
              {/* repo, branch and status in one meta line, like the header of a repository */}
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11.5px] text-zinc-600" style={{ fontFamily: MONO }}>
                {project.repo && <><span className="text-zinc-500">{project.repo}</span><span className="text-zinc-700">·</span><span>⎇ {project.branch ?? 'main'}</span><span className="text-zinc-700">·</span></>}
                <span className="inline-flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status] ?? 'bg-zinc-500'}`} />{project.status}</span>
              </p>
            </div>

            {/* problem → solution → result, labelled like code comments */}
            {/* phones/tablets: the story sits in the card; on desktop it stands in the left column */}
            {project.story ? (
              <dl className="flex-1 space-y-3 text-[13.5px] leading-relaxed lg:hidden">
                {project.story.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mb-0.5 text-[11px] text-zinc-600" style={{ fontFamily: MONO }}>// {k}</dt>
                    <dd className="text-zinc-400"><Marked text={v} rgb={project.accentRgb} /></dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-[13.5px] text-zinc-400 leading-relaxed flex-1">{project.desc}</p>
            )}
            {project.story && <div className="hidden lg:block flex-1" />}

            {/* the tools as a quiet list instead of a row of chips */}
            <p className="text-[12px] text-zinc-500 leading-relaxed" style={{ fontFamily: MONO }}>
              {project.tech.join(' · ')}
            </p>

            {!project.placeholder && (
              <div className="flex items-center gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] text-[12px] text-zinc-300 hover:border-white/[0.2] hover:text-white transition-colors duration-150">
                    <GitHubIcon />GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.05] text-[12px] text-white hover:bg-white/[0.1] transition-colors duration-150">
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
      className="max-w-6xl mx-auto gutter pt-[var(--space-section)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <SectionHeading path="projekte" title="Ausgewählte Projekte" />
      <p className="mt-6 text-[15px] text-zinc-400 max-w-md leading-relaxed">
        Eine Auswahl meiner Projekte — von Mobile Apps bis zur Web-Entwicklung.
      </p>
    </div>
  )
}

// Desktop: which project is currently on top of the stack; click jumps to it
function ProjectIndex({ active, onSelect }) {
  // compact rail to the right of the stack: numbers only, the active one with a longer bar
  return (
    <ol className="flex flex-col items-start gap-1" style={{ fontFamily: MONO }}>
      {PROJECTS.map((p, i) => (
        <li key={p.title}>
          <button onClick={() => onSelect(i)} title={p.title} aria-label={p.title} aria-current={active === i}
            className={`flex items-center gap-2 py-1.5 text-[10.5px] tabular-nums transition-colors duration-300 ${active === i ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <span className="h-px bg-current transition-all duration-500 ease-out" style={{ width: active === i ? 18 : 8, opacity: active === i ? 0.8 : 0.5 }} />
            0{i + 1}
          </button>
        </li>
      ))}
    </ol>
  )
}

// Desktop: problem → solution → result of the card currently on top, next to the stack
function ProjectStory({ active }) {
  const ref = useRef()
  useEffect(() => {
    const shown = ref.current?.children[active]
    if (!shown || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(shown.children, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', overwrite: true })
  }, [active])
  // all stories share one grid cell, so the block always has the tallest one's height and the
  // heading above never shifts when the project changes
  return (
    <div ref={ref} data-project-story className="hidden lg:grid max-w-[30rem]">
      {PROJECTS.map((project, i) => project.story && (
        <dl key={project.title} aria-hidden={i !== active} className={`[grid-area:1/1] self-center space-y-6 ${i === active ? '' : 'invisible'}`}>
          <div>
            <p className="text-[11.5px] text-zinc-600" style={{ fontFamily: MONO }}>0{i + 1} / 0{PROJECTS.length}</p>
            <p className="mt-2 text-[24px] font-medium tracking-tight text-white">{project.title}</p>
          </div>
          {project.story.map(([k, v]) => (
            <div key={k}>
              <dt className="mb-1.5 text-[11.5px] text-zinc-600" style={{ fontFamily: MONO }}>// {k}</dt>
              <dd className="text-[15px] leading-[1.7] text-zinc-400"><Marked text={v} rgb={project.accentRgb} /></dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  )
}

// The stack, desktop: text, cards and number rail form one stage. It scrolls in as a whole, then
// stays put (sticky) while the scroll moves the cards: each next card slides up over the previous
// one, covered cards shrink and darken a little. Phones/small screens: a plain list.
const STACK_STEP = 16    // later cards settle a bit lower, so the edges of the ones below peek out
const STACK_SLIDE = 0.9  // scroll distance per card change (share of the viewport)
const STACK_REST = 0.6   // scroll distance a settled card stays untouched (share of the viewport):
                         // long enough to read its story before the next card comes

export default function PortfolioSection() {
  const sectionRef = useRef()
  const stageRef = useRef()
  const deckRef  = useRef()
  const cardRefs = useRef([])
  const layoutRef = useRef({ stacked: false, unit: 0 })
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  const handleMount = useCallback((el, i) => {
    cardRefs.current[i] = el
  }, [])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const items = [...deckRef.current.children]
    const section = sectionRef.current, stage = stageRef.current, deck = deckRef.current
    if (!cards.length) return
    const n = items.length
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tl, fadeCtx

    const setActiveIdx = (i) => { if (i !== activeRef.current) { activeRef.current = i; setActive(i) } }

    const fit = () => {
      tl?.scrollTrigger?.kill(); tl?.kill(); tl = null
      fadeCtx?.revert(); fadeCtx = null
      items.forEach((item) => gsap.set(item, { clearProps: 'all' }))
      items.forEach((item) => { item.style.height = '' })
      const h = Math.max(...items.map((item) => item.offsetHeight))
      const vh = window.innerHeight
      const spread = (n - 1) * STACK_STEP
      const stacked = !reduced && window.matchMedia('(min-width: 1024px)').matches && h + spread + 140 < vh
      layoutRef.current.stacked = stacked
      section.dataset.stacked = stacked ? '1' : ''

      if (!stacked) {
        // plain list: every card fades up as it scrolls in
        section.style.height = ''; section.style.position = ''; section.style.top = ''
        deck.style.height = ''
        fadeCtx = gsap.context(() => cards.forEach((card) => gsap.fromTo(card,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } })))
        return
      }

      // the cards themselves are visible; the first one fades up as the stage scrolls in
      gsap.set(cards, { opacity: 1 })
      fadeCtx = gsap.context(() => gsap.fromTo(cards[0], { opacity: 0, y: 48, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } }))

      // stage geometry: all cards stacked absolutely in a deck of card height + spread
      items.forEach((item) => { item.style.height = `${h}px` })
      deck.style.height = `${h + spread}px`
      const unit = vh * STACK_SLIDE, rest = vh * STACK_REST
      layoutRef.current.unit = unit + rest
      const scrollLen = (n - 1) * (unit + rest) + rest
      section.style.height = `${vh + scrollLen}px`
      // at the end the section holds still and the contact section slides over it
      section.style.position = 'sticky'
      section.style.top = `${-scrollLen}px`

      const below = vh - deck.getBoundingClientRect().top + stage.getBoundingClientRect().top + 40
      // explicit start values: tweening a filter from 'none' would start at brightness(0) (black)
      items.forEach((item, i) => gsap.set(item, { y: i ? below : 0, scale: 1, filter: 'brightness(1)', transformOrigin: 'top center' }))

      tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${scrollLen}`, scrub: true,
          onUpdate: (self) => {
            const t = self.progress * scrollLen
            setActiveIdx(Math.min(n - 1, Math.floor((t + unit * 0.5) / (unit + rest))))
          },
        },
      })
      tl.to({}, { duration: rest / 2 })
      for (let i = 1; i < n; i++) {
        const at = (i - 1) * (unit + rest) + rest / 2
        tl.to(items[i], { y: i * STACK_STEP, duration: unit, ease: 'power1.out' }, at)
        // everything already on the stack shrinks and darkens one step
        for (let j = 0; j < i; j++) {
          const depth = i - j
          tl.to(items[j], { scale: 1 - depth * 0.05, filter: `brightness(${1 - Math.min(depth, 2) * 0.25})`, duration: unit }, at)
        }
      }
      tl.to({}, { duration: rest / 2 })
      setActiveIdx(0)
    }
    fit()
    document.fonts?.ready.then(fit)
    let rt
    const onResize = () => { clearTimeout(rt); rt = setTimeout(fit, 120) }
    window.addEventListener('resize', onResize)

    // Stopper: when the last card has arrived, scrolling stops right there — leftover momentum from
    // the trackpad/mouse wheel can't carry on into the contact section. A new gesture moves on:
    // momentum only ever slows down, so wheel deltas growing again mean a fresh swipe, and a
    // notched mouse wheel (even, non-shrinking steps) counts as new input after a moment. The hold
    // also ends after a short pause, after at most HOLD_MAX, or when scrolling back up. It re-arms
    // only once the user is back among the cards (a screen height above the stop).
    const stopY = () => section.offsetTop + section.offsetHeight - window.innerHeight
    const HOLD_PAUSE = 250, HOLD_MAX = 2000, NOTCH_AFTER = 350
    let held = false, passed = false, idle = 0, holdStart = 0, lastDelta = 0
    const release = () => { held = false; passed = true; clearTimeout(idle) }
    const wheel = (e) => {
      if (!layoutRef.current.stacked) return
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
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('scroll', rearm)
      clearTimeout(idle); clearTimeout(rt)
      tl?.scrollTrigger?.kill(); tl?.kill()
      fadeCtx?.revert()
    }
  }, [])

  // Scroll so that card i has just settled on the stack
  const scrollToCard = useCallback((i) => {
    const section = sectionRef.current
    const top = section.getBoundingClientRect().top + window.scrollY
    const { stacked, unit } = layoutRef.current
    if (!stacked) {
      const card = deckRef.current.children[i]
      window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' })
      return
    }
    const rest = window.innerHeight * STACK_REST
    window.scrollTo({ top: top + (i ? (i - 1) * unit + unit - rest / 2 : 0), behavior: 'smooth' })
  }, [])

  return (
    <div id="portfolio">
      {/* the heading has its own moment and scrolls away before the stack pins */}
      <SectionHeader />

      <div ref={sectionRef} className="group/stack relative bg-[#0a0a0a] overflow-clip">
        {/* only the static grid stays as background; nothing moves behind the cards */}
        <GridPattern cell={PORTFOLIO_CELL} id="portfolio-grid" line={0.035} marks={false} />

        {/* the stage: on desktop one sticky screen holding text, stack and rail together */}
        <div ref={stageRef} className="relative z-10 pt-20 pb-[var(--space-section)] group-data-[stacked=1]/stack:sticky group-data-[stacked=1]/stack:top-0 group-data-[stacked=1]/stack:h-[100svh] group-data-[stacked=1]/stack:py-0 group-data-[stacked=1]/stack:flex group-data-[stacked=1]/stack:items-center">
          <div className="max-w-6xl w-full mx-auto gutter">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-24 items-center">
              {/* desktop: the story of the card on top, centred on the deck */}
              <ProjectStory active={active} />

              <div className="relative">
                {/* desktop: the project index as a small rail right of the stack, centred on it */}
                <div aria-label="Projekte" className="hidden lg:flex items-center absolute inset-y-0 -right-16">
                  <ProjectIndex active={active} onSelect={scrollToCard} />
                </div>
                <div ref={deckRef} data-deck className="relative flex flex-col gap-24 max-w-[460px] w-full mx-auto group-data-[stacked=1]/stack:block">
                  {PROJECTS.map((p, i) => (
                    <div key={p.title} className="group-data-[stacked=1]/stack:absolute group-data-[stacked=1]/stack:inset-x-0 group-data-[stacked=1]/stack:top-0" style={{ zIndex: i + 1 }}>
                      <PortfolioCard project={p} index={i} onMount={handleMount} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
