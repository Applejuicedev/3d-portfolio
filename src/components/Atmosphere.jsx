import { PROJECTS } from './projects'

// ── The page's ground ──────────────────────────────────────────
// One fixed layer behind everything (the body is transparent): the dark grey that dominates the
// whole page. A project in focus fades in a trace of its own colour: one pre-coloured layer per
// project whose opacity changes (PortfolioSection) — opacity is composited, whereas animating the
// colour of a full-screen layer repainted every pixel each frame and dropped scrolling to 30 fps.
// Colour and grain live in a few cut-out fields (Accent.jsx).
export default function Atmosphere() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none" style={{ background: 'var(--bg)' }}>
      {PROJECTS.map((p) => (
        <div key={p.slug} data-tint={p.slug} className="absolute inset-0 opacity-0 will-change-[opacity]" style={{ background: p.tint }} />
      ))}
    </div>
  )
}
