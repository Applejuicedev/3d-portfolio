import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../lib/motion'

// cubic-bezier(x1, y1, x2, y2) as an easing function: solve x(t) = p for t (Newton, then
// bisection), return y(t) — the same curve CSS evaluates
const bez = (a1, a2) => (t) => 3 * a1 * t * (1 - t) ** 2 + 3 * a2 * t * t * (1 - t) + t ** 3
const dBez = (a1, a2) => (t) => 3 * a1 * (1 - t) ** 2 + 6 * (a2 - a1) * t * (1 - t) + 3 * (1 - a2) * t * t
function easing([x1, y1, x2, y2]) {
  const X = bez(x1, x2), dX = dBez(x1, x2), Y = bez(y1, y2)
  return (p) => {
    let t = p
    for (let i = 0; i < 6; i++) { const d = dX(t); if (Math.abs(d) < 1e-6) break; t -= (X(t) - p) / d }
    if (t < 0 || t > 1 || Math.abs(X(t) - p) > 1e-4) { let lo = 0, hi = 1; t = p; for (let i = 0; i < 30; i++) { X(t) < p ? (lo = t) : (hi = t); t = (lo + hi) / 2 } }
    return Y(t)
  }
}

const PRESETS = [
  ['diese Seite', [0.2, 0.7, 0, 1]],
  ['ease-in-out', [0.42, 0, 0.58, 1]],
  ['linear', [0, 0, 1, 1]],
  ['zurückfedern', [0.34, 1.56, 0.64, 1]],
]
const S = 220, PAD = 30 // plot size and room for overshoot
const f2 = (n) => n.toFixed(2)

// The easing curve of this site, editable: drag the two handles (or focus one and use the arrow
// keys); the block below runs the curve in a loop, the CSS line is ready to copy.
export default function Curve() {
  const [c, setC] = useState(PRESETS[0][1])
  const [copied, setCopied] = useState(false)
  const svgRef = useRef(), dotRef = useRef(), drag = useRef(null)
  const css = `cubic-bezier(${c.map(f2).join(', ')})`

  // the block runs 0 → 1 over 1.4 s, rests, and repeats
  useEffect(() => {
    if (prefersReduced()) { dotRef.current.style.left = '100%'; return }
    const ease = easing(c)
    let raf, t0 = performance.now()
    const loop = (now) => {
      const t = ((now - t0) / 1000) % 2.2
      const p = Math.min(1, t / 1.4)
      dotRef.current.style.left = `${ease(p) * 100}%`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [c])

  const toPt = (x, y) => [PAD + x * S, PAD + (1 - y) * S]
  const fromEvent = (e) => {
    const r = svgRef.current.getBoundingClientRect()
    const k = (S + PAD * 2) / r.width
    const x = Math.min(1, Math.max(0, ((e.clientX - r.left) * k - PAD) / S))
    const y = Math.min(1.6, Math.max(-0.6, 1 - ((e.clientY - r.top) * k - PAD) / S))
    return [x, y]
  }
  const move = (e) => {
    if (drag.current == null) return
    const [x, y] = fromEvent(e), i = drag.current
    setC((o) => { const n = [...o]; n[i * 2] = x; n[i * 2 + 1] = y; return n })
  }
  const key = (i) => (e) => {
    const step = e.shiftKey ? 0.1 : 0.01
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key]
    if (!d) return
    e.preventDefault()
    setC((o) => { const n = [...o]; n[i * 2] = Math.min(1, Math.max(0, n[i * 2] + d[0])); n[i * 2 + 1] = Math.min(1.6, Math.max(-0.6, n[i * 2 + 1] + d[1])); return n })
  }

  const [ax, ay] = toPt(0, 0), [bx, by] = toPt(1, 1), [h1x, h1y] = toPt(c[0], c[1]), [h2x, h2y] = toPt(c[2], c[3])
  return (
    <div className="p-4 grid gap-4">
      <svg ref={svgRef} viewBox={`0 0 ${S + PAD * 2} ${S + PAD * 2}`} className="w-full max-w-[19rem] mx-auto touch-none select-none"
        onPointerMove={move} onPointerUp={() => (drag.current = null)} onPointerLeave={() => (drag.current = null)}>
        <rect x={PAD} y={PAD} width={S} height={S} fill="none" stroke="rgb(255 255 255 / .09)" />
        {[0.25, 0.5, 0.75].map((g) => <line key={g} x1={PAD + g * S} x2={PAD + g * S} y1={PAD} y2={PAD + S} stroke="rgb(255 255 255 / .04)" />)}
        <line x1={ax} y1={ay} x2={h1x} y2={h1y} stroke="#54534e" />
        <line x1={bx} y1={by} x2={h2x} y2={h2y} stroke="#54534e" />
        <path d={`M${ax},${ay} C${h1x},${h1y} ${h2x},${h2y} ${bx},${by}`} fill="none" stroke="#eeede8" strokeWidth="1.6" />
        {[[h1x, h1y, 0], [h2x, h2y, 1]].map(([x, y, i]) => (
          <g key={i} tabIndex={0} role="slider" aria-label={`Anfasser ${i + 1}`} aria-valuetext={`x ${f2(c[i * 2])}, y ${f2(c[i * 2 + 1])}`}
            onPointerDown={(e) => { drag.current = i; e.currentTarget.ownerSVGElement.setPointerCapture?.(e.pointerId) }} onKeyDown={key(i)}
            className="cursor-grab active:cursor-grabbing outline-none [&:focus-visible>circle:last-child]:stroke-ink">
            <circle cx={x} cy={y} r="16" fill="transparent" />
            <circle cx={x} cy={y} r="6" fill="#d4ff3a" stroke="transparent" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="relative h-6 border-y border-line" aria-hidden>
        <span ref={dotRef} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-lime" style={{ left: 0 }} />
      </div>
      <div className="flex flex-wrap gap-1">
        {PRESETS.map(([n, v]) => (
          <button key={n} type="button" onClick={() => setC(v)} aria-pressed={css === `cubic-bezier(${v.map(f2).join(', ')})`}
            className="press t-mono text-[11px] px-2 py-1 rounded-[3px] border border-line text-muted hover:text-ink aria-pressed:border-lime aria-pressed:text-lime">{n}</button>
        ))}
      </div>
      <button type="button" onClick={() => navigator.clipboard?.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400) })}
        className="press group flex items-center justify-between gap-3 t-mono text-[12px] text-ink border border-line rounded-[3px] px-3 py-2 hover:border-lime">
        <code>{css}</code><span className={copied ? 'text-lime' : 'text-faint group-hover:text-lime'}>{copied ? 'kopiert' : 'kopieren'}</span>
      </button>
    </div>
  )
}
