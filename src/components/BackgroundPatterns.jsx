// Subtile Hintergrundmuster für die Sektionen: unregelmäßige Gitterflächen und Höhenlinien.
// Beide liegen absolut positioniert hinter dem Inhalt (zIndex 0) und laufen über eine Maske weich aus.

function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// ---------- Gitter: große, gleich große Kacheln, Linien enden versetzt ----------
// Gleich große, quadratische Kacheln
const GRID_STEP = 170

function gridLines(w, h, seed) {
  const rnd = seeded(seed)
  const lines = []
  for (let x = rnd() * 90; x < w; x += GRID_STEP) {
    lines.push([x, h * rnd() * 0.3, x, h * (0.7 + rnd() * 0.3)])
  }
  for (let y = rnd() * 90; y < h; y += GRID_STEP) {
    lines.push([w * rnd() * 0.3, y, w * (0.7 + rnd() * 0.3), y])
  }
  return lines
}

export function GridPatches({ patches }) {
  return patches.map(({ style, w, h, seed, fade }, i) => {
    const lines = gridLines(w, h, seed)
    const mask = `radial-gradient(${fade}, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%)`
    return (
      <svg
        key={i}
        aria-hidden="true"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute pointer-events-none"
        style={{ ...style, zIndex: 0, maskImage: mask, WebkitMaskImage: mask }}
      >
        {lines.map(([x1, y1, x2, y2], j) => (
          <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        ))}
      </svg>
    )
  })
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
