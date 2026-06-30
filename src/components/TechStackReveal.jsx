import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import {
  SiReact, SiVite, SiThreedotjs, SiGreensock, SiFramer,
  SiTailwindcss, SiFigma, SiGithub, SiNodedotjs,
} from 'react-icons/si'

const TECH = [
  { name: 'React',         Icon: SiReact,      color: '#61DAFB', desc: 'UI Library'      },
  { name: 'Vite',          Icon: SiVite,        color: '#747BFF', desc: 'Build Tool'      },
  { name: 'Three.js',      Icon: SiThreedotjs,  color: '#c4c4c4', desc: '3D Engine'       },
  { name: 'GSAP',          Icon: SiGreensock,   color: '#88CE02', desc: 'Animations'      },
  { name: 'Framer Motion', Icon: SiFramer,      color: '#6366F1', desc: 'Motion Library'  },
  { name: 'Tailwind CSS',  Icon: SiTailwindcss, color: '#38BDF8', desc: 'Styling'         },
  { name: 'Figma',         Icon: SiFigma,       color: '#F24E1E', desc: 'Design Tool'     },
  { name: 'GitHub',        Icon: SiGithub,      color: '#e0e0e0', desc: 'Version Control' },
  { name: 'Node.js',       Icon: SiNodedotjs,   color: '#74B260', desc: 'Runtime'         },
]

// Per-card pin offset + junction ratio — each trace has its own routing character
const CARD_PIN_X = [-38,   4,  30,  -24,  14,  38,  -44,  -8,  22]
const CARD_RATIO = [0.42, 0.36, 0.62, 0.54, 0.46, 0.38, 0.70, 0.58, 0.76]

function makeCardTrace(cardX, cardY, chipX, chipBotY, i) {
  const pinX = chipX + (CARD_PIN_X[i] ?? 0)
  const jY   = cardY + (chipBotY - cardY) * (CARD_RATIO[i] ?? 0.5)
  return `M ${cardX} ${cardY} L ${cardX} ${jY} L ${pinX} ${jY} L ${pinX} ${chipBotY}`
}

// 3 individual side traces per side — mix of L-shape (2 corners) and Z-shape (3 corners)
// Each trace uses its badge's own color and has unique routing
function makeSideTraces(cardRects, cRect, chipX, chipHW, chipMidY) {
  const lx = chipX - chipHW  // chip left edge (side pin entry)
  const rx = chipX + chipHW  // chip right edge

  const get = i => cardRects[i]
  const traces = []

  // ── LEFT SIDE: cards 0, 3, 6 ──────────────────────────────────

  // Card 0 (React) — L-shape: exits card left, goes right → up into chip
  const r0 = get(0)
  if (r0) {
    const sx = r0.left - cRect.left
    const sy = r0.top  - cRect.top + r0.height * 0.38
    traces.push({ d: `M ${sx} ${sy} L ${lx} ${sy} L ${lx} ${chipMidY - 14}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[0].color })
  }

  // Card 3 (GSAP) — Z-shape: exits card, jogs to intermediate X, up, then right into chip
  const r3 = get(3)
  if (r3) {
    const sx = r3.left - cRect.left
    const sy = r3.top  - cRect.top + r3.height * 0.55
    const mx = lx - 42
    const my = chipMidY + 4
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${lx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // Card 6 (Figma) — Z-shape: exits higher on card, different intermediate
  const r6 = get(6)
  if (r6) {
    const sx = r6.left - cRect.left
    const sy = r6.top  - cRect.top + r6.height * 0.28
    const mx = lx - 20
    const my = chipMidY + 20
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${lx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // ── RIGHT SIDE: cards 2, 5, 8 ─────────────────────────────────

  // Card 2 (Three.js) — Z-shape: exits card right, jogs to intermediate, up, left into chip
  const r2 = get(2)
  if (r2) {
    const sx = r2.right - cRect.left
    const sy = r2.top   - cRect.top + r2.height * 0.45
    const mx = rx + 46
    const my = chipMidY - 8
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${rx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: null })
  }

  // Card 5 (Tailwind) — L-shape: exits card, goes left directly → up into chip
  const r5 = get(5)
  if (r5) {
    const sx = r5.right - cRect.left
    const sy = r5.top   - cRect.top + r5.height * 0.60
    traces.push({ d: `M ${sx} ${sy} L ${rx} ${sy} L ${rx} ${chipMidY + 10}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[5].color })
  }

  // Card 8 (Node.js) — Z-shape: exits lower on card, shallower intermediate
  const r8 = get(8)
  if (r8) {
    const sx = r8.right - cRect.left
    const sy = r8.top   - cRect.top + r8.height * 0.35
    const mx = rx + 26
    const my = chipMidY + 22
    traces.push({ d: `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${my} L ${rx} ${my}`,
      circles: [[sx, sy]], color: 'rgba(255,255,255,0.09)', anim: TECH[8].color })
  }

  return traces
}

// Asymmetric chip decorations — left and right intentionally differ
function makeDecorTraces(cx, topY, botY, midY, hw) {
  const lx = cx - hw
  const rx = cx + hw
  return [
    // Top stub — shifted slightly right of center
    { d: `M ${cx + 10} ${topY} L ${cx + 10} ${topY - 50}`,
      circles: [[cx + 10, topY - 50]], color: 'rgba(255,255,255,0.13)', anim: null },

    // Top-left: deep loop going further left
    { d: `M ${cx - 42} ${topY} L ${cx - 42} ${topY - 46} L ${lx - 86} ${topY - 46} L ${lx - 86} ${topY - 10}`,
      circles: [[lx - 86, topY - 10]], color: 'rgba(255,255,255,0.10)', anim: null },

    // Top-right: shorter, just a small horizontal shelf (no full loop)
    { d: `M ${cx + 28} ${topY} L ${cx + 28} ${topY - 28} L ${rx + 44} ${topY - 28}`,
      circles: [[rx + 44, topY - 28]], color: 'rgba(255,255,255,0.10)', anim: null },

    // Left stub: goes left then hooks down — L-shape
    { d: `M ${lx} ${midY - 20} L ${lx - 82} ${midY - 20} L ${lx - 82} ${midY + 14}`,
      circles: [[lx - 82, midY + 14]], color: 'rgba(255,255,255,0.13)', anim: '#818cf8' },

    // Right stub: simple horizontal, sits higher, shorter
    { d: `M ${rx} ${midY - 36} L ${rx + 52} ${midY - 36}`,
      circles: [[rx + 52, midY - 36]], color: 'rgba(255,255,255,0.13)', anim: null },
  ]
}

const PIN = ({ direction, count }) => {
  const isV = direction === 'top' || direction === 'bottom'
  const grad = { top: 'to bottom', bottom: 'to top', left: 'to right', right: 'to left' }[direction]
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} style={{
      width: isV ? 7 : 18, height: isV ? 20 : 7,
      borderRadius: 2, flexShrink: 0,
      background: `linear-gradient(${grad}, #242424, #4a4a4a)`,
    }} />
  ))
}

export default function TechStackReveal() {
  const containerRef  = useRef()
  const sectionRef    = useRef()
  const chipRef       = useRef()
  const cardRefs      = useRef([])
  const pulseRefs     = useRef([])
  const decorAnimRefs = useRef([])
  const allTweens     = useRef([])

  const [paths,   setPaths]   = useState([])
  const [decor,   setDecor]   = useState([])
  const [svgDims, setSvgDims] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !chipRef.current) return
      const cRect    = containerRef.current.getBoundingClientRect()
      const chipRect = chipRef.current.getBoundingClientRect()

      const chipX    = chipRect.left   - cRect.left + chipRect.width  / 2
      const chipBotY = chipRect.bottom - cRect.top
      const chipTopY = chipRect.top    - cRect.top
      const chipMidY = (chipTopY + chipBotY) / 2
      const chipHW   = chipRect.width  / 2

      const newPaths = cardRefs.current.map((card, i) => {
        if (!card) return null
        const r = card.getBoundingClientRect()
        return {
          d:     makeCardTrace(r.left - cRect.left + r.width / 2, r.top - cRect.top, chipX, chipBotY, i),
          color: TECH[i].color,
        }
      }).filter(Boolean)

      const busDecor = makeSideTraces(
        cardRefs.current.map(el => el?.getBoundingClientRect()),
        cRect, chipX, chipHW, chipMidY,
      )

      setPaths(newPaths)
      setDecor([...makeDecorTraces(chipX, chipTopY, chipBotY, chipMidY, chipHW), ...busDecor])
      setSvgDims({ w: cRect.width, h: cRect.height })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Animate card → chip pulses.
  // Only every 3rd card (3 of 9) to reduce simultaneous tweens.
  // No SVG blur filter — feGaussianBlur on animated paths is the primary GPU cost.
  useEffect(() => {
    if (!paths.length) return
    const tweens = []
    pulseRefs.current.forEach((el, i) => {
      if (!el || i % 3 !== 0) return
      const len = el.getTotalLength()
      const dot = 40, gap = len + dot
      gsap.set(el, { strokeDasharray: `${dot} ${gap}`, strokeDashoffset: dot })
      tweens.push(gsap.to(el, {
        strokeDashoffset: -gap,
        duration: 3.2 + (i % 3) * 0.5,
        repeat: -1, ease: 'none', delay: i * 0.4,
      }))
    })
    allTweens.current.push(...tweens)
    return () => tweens.forEach(t => t?.kill())
  }, [paths])

  // Animate decorative side pulses (no blur filter).
  useEffect(() => {
    if (!decor.length) return
    const tweens = []
    decor.forEach((d, i) => {
      if (!d.anim) return
      const el = decorAnimRefs.current[i]
      if (!el) return
      const len = el.getTotalLength()
      const dot = 18, gap = len + dot
      gsap.set(el, { strokeDasharray: `${dot} ${gap}`, strokeDashoffset: dot })
      tweens.push(gsap.to(el, {
        strokeDashoffset: -gap,
        duration: 4.5 + i * 0.3,
        repeat: -1, ease: 'none', delay: i * 0.9,
      }))
    })
    allTweens.current.push(...tweens)
    return () => tweens.forEach(t => t?.kill())
  }, [decor])

  // Pause all tweens when section is scrolled out of view — biggest energy saving.
  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        allTweens.current.forEach(t => entry.isIntersecting ? t.resume() : t.pause())
      },
      { threshold: 0.05 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="h-px bg-white/[0.05]" />

      <div ref={sectionRef} className="bg-[#0a0a0a] py-32">
        <div className="max-w-5xl mx-auto px-8">

          {/* PCB board — pt-20 gives vertical room for upward decorative traces */}
          <div ref={containerRef} className="relative pt-20">

            {(paths.length > 0 || decor.length > 0) && (
              <svg
                className="absolute inset-0 pointer-events-none"
                width={svgDims.w}
                height={svgDims.h}
                style={{ zIndex: 1, overflow: 'visible' }}
              >
                {/* ── Decorative static traces ── */}
                {decor.map(({ d, circles, color, anim }, i) => (
                  <g key={`decor-${i}`}>
                    <path d={d} fill="none" stroke={color} strokeWidth="1" />
                    {anim && (
                      <path
                        ref={el => { decorAnimRefs.current[i] = el }}
                        d={d} fill="none" stroke={anim}
                        strokeWidth="1.5" strokeOpacity="0.7"
                        strokeLinecap="round"
                      />
                    )}
                    {circles.map(([cx, cy], j) => (
                      <circle key={j} cx={cx} cy={cy} r="3.5"
                        fill="none" stroke={color} strokeWidth="1" />
                    ))}
                  </g>
                ))}

                {/* ── Card → chip animated traces ── */}
                {paths.map(({ d, color }, i) => (
                  <g key={`path-${i}`}>
                    <path d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.08" />
                    {i % 3 === 0 && (
                      <path
                        ref={el => { pulseRefs.current[i] = el }}
                        d={d} fill="none" stroke={color}
                        strokeWidth="2" strokeOpacity="0.9"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                ))}
              </svg>
            )}

            {/* Central chip */}
            <div className="flex justify-center mb-16 relative" style={{ zIndex: 10 }}>
              <div ref={chipRef} className="select-none">

                <div className="flex justify-center gap-2">
                  <PIN direction="top" count={7} />
                </div>

                <div
                  className="relative px-14 py-8 rounded-xl border"
                  style={{
                    background:  'linear-gradient(150deg, #161616 0%, #0d0d0d 100%)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow:   '0 0 0 1px rgba(255,255,255,0.03), 0 0 80px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-[#1c1c1c] border border-zinc-800`}>
                      <div className="absolute inset-[3px] rounded-full border border-zinc-700/40" />
                    </div>
                  ))}

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col gap-2.5 pr-px">
                    <PIN direction="left" count={4} />
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-2.5 pl-px">
                    <PIN direction="right" count={4} />
                  </div>

                  <div className="text-center relative z-10">
                    <p className="text-[9px] tracking-[0.38em] uppercase text-zinc-700 mb-2.5">Core Unit</p>
                    <p className="text-[22px] font-light text-white" style={{ letterSpacing: '-0.025em' }}>
                      Tech Stack
                    </p>
                    <p className="text-[9px] text-zinc-600 mt-2 max-w-[160px] mx-auto leading-relaxed">
                      Der verwendete Tech Stack für dieses Portfolio Projekt.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <PIN direction="bottom" count={7} />
                </div>
              </div>
            </div>

            {/* Tech cards */}
            <div className="grid grid-cols-3 gap-4 relative" style={{ zIndex: 10 }}>
              {TECH.map(({ name, Icon, color, desc }, i) => (
                <div
                  key={name}
                  ref={el => { cardRefs.current[i] = el }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl border bg-[#0d0d0d] hover:bg-[#111] transition-colors duration-200"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icon style={{ width: 18, height: 18, color, flexShrink: 0, opacity: 0.85 }} />
                  <div>
                    <div className="text-[13px] font-medium text-white leading-tight">{name}</div>
                    <div className="text-[10px] text-zinc-600 tracking-[0.15em] uppercase mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
