// Subtile Hintergrundmuster für die Sektionen: Höhenlinien und das Gitter der Hero als Muster.
// Beide liegen absolut positioniert hinter dem Inhalt (zIndex 0) und laufen über eine Maske weich aus.

function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// ---------- Höhenlinien: um jeden „Gipfel“ verschachtelte, wellige Ringe ----------
// Alle Ringe eines Gipfels teilen sich dieselbe Wellenform, darum kreuzen sie sich nie.
function contourPaths(size, seed, rings) {
  const rnd = seeded(seed)
  const c = size / 2
  const waves = Array.from({ length: 4 }, (_, k) => ({ f: k + 2, a: 0.05 + rnd() * 0.09, p: rnd() * Math.PI * 2 }))
  const paths = []
  for (let r = 0; r < rings; r++) {
    const radius = 40 + r * (size * 0.45 - 40) / rings
    const pts = []
    for (let i = 0; i < 48; i++) {
      const t = (i / 48) * Math.PI * 2
      // Wellen werden nach außen stärker, so wirken die inneren Ringe ruhiger
      const wob = waves.reduce((sum, w) => sum + w.a * Math.sin(w.f * t + w.p + r * 0.08), 0) * (0.4 + r / rings)
      const rr = radius * (1 + wob)
      pts.push([c + Math.cos(t) * rr, c + Math.sin(t) * rr * 0.78])
    }
    // Catmull-Rom → kubische Bézierkurven für weiche Linien
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[(i - 1 + pts.length) % pts.length], p1 = pts[i], p2 = pts[(i + 1) % pts.length], p3 = pts[(i + 2) % pts.length]
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
      d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
    }
    paths.push(d + 'Z')
  }
  return paths
}

export function Contours({ hills }) {
  const mask = 'radial-gradient(closest-side, #000 0%, rgba(0,0,0,0.6) 55%, transparent 100%)'
  return hills.map(({ style, size, seed, rings }, i) => (
    <svg
      key={i}
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none"
      style={{ ...style, zIndex: 0, maskImage: mask, WebkitMaskImage: mask }}
    >
      {contourPaths(size, seed, rings).map((d, j) => (
        <path key={j} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}
    </svg>
  ))
}

// The hero's grid as a repeating SVG pattern, for tall sections (a canvas that tall would be huge):
// fine lines every `cell`, small crosses every third intersection and the faint indigo double ring
// every ninth, exactly like HeroGrid, just at any cell size. One tile = 9 × 9 cells.
export function GridPattern({ cell = 120, id = 'grid-pattern', line = 0.055, x = 0, y = 0, marks = true }) {
  const T = cell * 9
  const s = 3.5 * Math.min(2, cell / 48) // cross arm
  const k = Math.min(2, cell / 48)        // ring scale
  const lines = []
  for (let i = 0; i < 9; i++) lines.push(`M${i * cell},0V${T}`, `M0,${i * cell}H${T}`)
  const crosses = []
  for (const x of [cell, cell * 4, cell * 7]) for (const y of [cell, cell * 4, cell * 7]) crosses.push(`M${x - s},${y}h${s * 2}M${x},${y - s}v${s * 2}`)
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={id} x={x} y={y} width={T} height={T} patternUnits="userSpaceOnUse">
          <path d={lines.join('')} stroke={`rgba(255,255,255,${line})`} strokeWidth="0.5" fill="none" />
          {marks && <path d={crosses.join('')} stroke="rgba(148,163,184,0.15)" strokeWidth="0.75" fill="none" />}
          <circle cx={cell * 3} cy={cell * 3} r={14 * k} stroke="rgba(99,102,241,0.08)" strokeWidth="0.5" fill="none" />
          <circle cx={cell * 3} cy={cell * 3} r={28 * k} stroke="rgba(99,102,241,0.04)" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
