
import { useEffect, useRef, useState } from 'react'
import ProjectVideo from '../ui/ProjectVideo'
import { prefersReduced } from '../lib/motion'
import { on } from '../lib/events'

// What a project shows inside its window: the recording of the real app, or — for this site — the
// site itself in miniature, live: the turning sphere of points on the white page
// with the name either side, the glass capsule of the navigation over it.
function MiniSphere() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current, x = cv.getContext('2d'), N = 900, pts = []
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.399963; pts.push([Math.cos(t) * r, y, Math.sin(t) * r]) }
    let raf = 0, visible = true
    const t0 = performance.now(), still = prefersReduced()
    let ink = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-ink')})`
    const offT = on('theme', () => { ink = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--c-ink')})`; if (still) draw(0) })
    const draw = (now) => {
      raf = 0
      const W = cv.clientWidth, H = cv.clientHeight, pr = Math.min(devicePixelRatio || 1, 2)
      if (cv.width !== W * pr) { cv.width = W * pr; cv.height = H * pr }
      x.setTransform(pr, 0, 0, pr, 0, 0); x.clearRect(0, 0, W, H)
      const a = still ? 1 : (now - t0) / 1000 * 0.25, R = Math.min(W, H) * 0.3, c = Math.cos(a), s = Math.sin(a), tc = Math.cos(0.35), ts = Math.sin(0.35)
      for (const [px, py, pz] of pts) {
        const X = px * c - pz * s, Z = px * s + pz * c, Y = py * tc - Z * ts, Z2 = py * ts + Z * tc
        x.globalAlpha = 0.18 + 0.6 * (Z2 + 1) / 2
        x.fillStyle = ink; x.fillRect(W / 2 + X * R, H / 2 - Y * R, 1.3, 1.3)
      }
      if (visible && !still) raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(draw) })
    io.observe(cv); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); io.disconnect(); offT() }
  }, [])
  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full" />
}

export function SelfPreview() {
  const [k, setK] = useState(0)
  useEffect(() => { if (prefersReduced()) return; const id = setInterval(() => setK((n) => (n + 1) % 3), 2600); return () => clearInterval(id) }, [])
  return (
    <div aria-label="Vorschau dieser Website" className="absolute inset-0 overflow-hidden bg-canvas text-ink">
      <MiniSphere />
      {/* the navigation's capsule, its drop of glass moving from item to item */}
      <div className="absolute left-1/2 top-[7%] -translate-x-1/2 glass rounded-full p-[3px] !bg-white/30 flex text-[clamp(8px,1vw,11px)] font-medium">
        <span aria-hidden className="absolute top-[3px] bottom-[3px] left-[3px] w-[calc((100%-6px)/3)] rounded-full bg-paper/75 shadow-[inset_0_0_6px_-1px_#fff,0_1px_4px_-1px_rgb(0_0_0/.15)] transition-transform duration-700 ease-[cubic-bezier(.34,1.4,.5,1)]" style={{ transform: `translateX(${k * 100}%)` }} />
        {['Arbeiten', 'Skills', 'Über mich'].map((t, i) => <span key={t} className={`relative w-[5.2em] py-[0.45em] text-center transition-colors duration-500 ${i === k ? 'text-ink' : 'text-ink/50'}`}>{t}</span>)}
      </div>
      <span className="absolute right-[4%] top-[7%] glass-tint rounded-full px-[0.9em] py-[0.45em] text-[clamp(8px,1vw,11px)] font-medium">Kontakt</span>
      <p className="absolute left-[6%] top-1/2 -translate-y-1/2 text-[clamp(10px,1.4vw,17px)] tracking-[-0.012em]">Vincent Fidanli</p>
      <p className="absolute right-[6%] top-1/2 -translate-y-1/2 text-[clamp(10px,1.4vw,17px)] tracking-[-0.012em]">Full Stack Developer</p>
      {/* Mi in his corner */}
      <span aria-hidden className="absolute right-[6%] bottom-[9%] w-[5%] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#c9cbd1_35%,#3b3c42_62%,#e4e4e8_80%,#9a9ba2)] shadow-[0_6px_14px_-4px_rgb(0_0_0/.3)]" />
      <span className="absolute left-[4%] bottom-[6%] glass rounded-full px-[0.9em] py-[0.4em] text-[clamp(8px,0.95vw,11px)] text-ink/70 flex items-center gap-[0.5em]"><i className="block w-[0.55em] h-[0.55em] rounded-full bg-[#28c840]" />läuft gerade in diesem Tab</span>
    </div>
  )
}

export default function ProjectMedia({ p, alongside }) {
  if (!p.video) return <SelfPreview />
  return <ProjectVideo src={`/videos/${p.slug}.webm`} poster={`/videos/${p.slug}.jpg`} label={p.video.label} frame={p.video.frame} surface={p.surface} alongside={alongside} />
}

// ── extras inside the sheets ──────────────────────────────────

// Measured while the sheet is open: frame rate, JavaScript transferred, DOM size, load time
export function LiveNumbers() {
  const [n, setN] = useState(null)
  useEffect(() => {
    let raf, frames = 0, t = performance.now(), fps = 0
    const loop = (now) => { frames++; if (now - t > 500) { fps = Math.round(frames * 1000 / (now - t)); frames = 0; t = now } raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const read = () => {
      const js = performance.getEntriesByType('resource').filter((r) => r.initiatorType === 'script' || /\.js(\?|$)/.test(r.name))
      const bytes = js.reduce((a, r) => a + (r.transferSize || r.encodedBodySize || 0), 0)
      const nav = performance.getEntriesByType('navigation')[0]
      setN({ fps, js: bytes ? `${Math.round(bytes / 1024)} KB` : 'Cache', dom: document.getElementsByTagName('*').length, load: nav ? `${Math.round(nav.domContentLoadedEventEnd)} ms` : '—' })
    }
    read(); const id = setInterval(read, 600)
    return () => { cancelAnimationFrame(raf); clearInterval(id) }
  }, [])
  const rows = n ? [['Bildrate', `${n.fps || '…'} fps`], ['JavaScript', n.js], ['DOM-Knoten', n.dom.toLocaleString('de-DE')], ['DOMContentLoaded', n.load]] : []
  return (
    <div className="rounded-card bg-white/45 ring-1 ring-black/5 p-4">
      <p className="t-cap flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />live gemessen, in diesem Tab</p>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-2 mt-3">
        {rows.map(([k, v]) => <div key={k}><dt className="text-[13px] text-gray">{k}</dt><dd className="text-[20px] font-medium tabular-nums tracking-tight">{v}</dd></div>)}
      </dl>
    </div>
  )
}
