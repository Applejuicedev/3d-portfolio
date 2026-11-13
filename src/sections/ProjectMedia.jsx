import { useEffect, useState } from 'react'
import ProjectVideo from '../ui/ProjectVideo'

// What a project shows inside its window: the recording of the real app, or — for this site — its
// own boot code (the preloader's real steps), since the site itself is already on screen.
const Tok = ({ c, children }) => <span style={{ color: c }}>{children}</span>
const K = (p) => <Tok c="#ff7ab2" {...p} />, S = (p) => <Tok c="#fc6a5d" {...p} />, F = (p) => <Tok c="#67b7a4" {...p} />, C = (p) => <Tok c="#7f8c98" {...p} />

export function SelfCode() {
  return (
    <div className="absolute inset-0 bg-[#1f1f24] text-white/85 overflow-hidden">
      <div className="flex h-full">
        <ul aria-hidden className="hidden sm:block w-40 flex-none border-r border-white/[0.06] bg-[#25252b] py-3 t-mono text-[11px] text-white/55">
          {['App.jsx', 'Hero.jsx', 'Projects.jsx', 'Preloader.jsx', 'Spotlight.jsx', 'Dock.jsx'].map((f) => (
            <li key={f} className={`px-3 py-1 ${f === 'Preloader.jsx' ? 'bg-[#3d5a98] text-white' : ''}`}>{f}</li>
          ))}
        </ul>
        <pre className="flex-1 t-mono text-[11px] sm:text-[12px] leading-[1.75] p-4 overflow-hidden">
          <C>{'// Jede Zeile erscheint erst, wenn ihr Schritt wirklich fertig ist.'}</C>{'\n'}
          <K>const</K> STEPS = [{'\n'}
          {'  '}[<S>'fonts'</S>, () =&gt; document.fonts.<F>ready</F>],{'\n'}
          {'  '}[<S>'projekte'</S>, () =&gt; Promise.<F>all</F>(posters.<F>map</F>(decode))],{'\n'}
          {'  '}[<S>'display'</S>, () =&gt; <S>`${'{'}innerWidth{'}'}×${'{'}innerHeight{'}'}`</S>],{'\n'}
          {'  '}[<S>'motion'</S>, () =&gt; reduced ? <S>'reduziert'</S> : gsap.version],{'\n'}
          ]{'\n\n'}
          <K>for</K> (<K>const</K> [name, work] <K>of</K> STEPS) {'{\n'}
          {'  '}<F>log</F>(name, <K>await</K> <F>work</F>()){'\n'}
          {'}\n'}
          <F>close</F>(terminal) <C>{'// das Fenster schließt sich, die Seite erscheint'}</C>
        </pre>
      </div>
    </div>
  )
}

export default function ProjectMedia({ p, alongside }) {
  if (!p.video) return <SelfCode />
  return <ProjectVideo src={`/videos/${p.slug}.webm`} poster={`/videos/${p.slug}.jpg`} label={p.video.label} frame={p.video.frame} surface={p.surface} alongside={alongside} />
}

// ── extras inside the sheets ──────────────────────────────────

// The break rule from the Dienstzeit app (src/lib/zeit/berechnung.ts), unchanged
export function arbeitszeitMitPause(minuten) {
  if (minuten <= 360) return minuten
  if (minuten <= 570) return Math.max(360, minuten - 30)
  return Math.max(540, minuten - 45)
}
const hm = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

export function PauseRule() {
  const [start, setStart] = useState(7 * 60)
  const [end, setEnd] = useState(16 * 60 + 45)
  const dauer = Math.max(0, end - start), ist = arbeitszeitMitPause(dauer), pause = dauer - ist
  return (
    <div className="rounded-card bg-white/45 ring-1 ring-black/5 p-4">
      <p className="t-cap">Probier's aus · Pausenregel aus der App (Grundbetrieb)</p>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-2 mt-3">
        <label className="block"><span className="flex justify-between text-[13px] text-gray">Dienstbeginn <b className="font-medium text-ink tabular-nums">{hm(start)}</b></span>
          <input type="range" className="range" min={300} max={660} step={15} value={start} onChange={(e) => setStart(+e.target.value)} /></label>
        <label className="block"><span className="flex justify-between text-[13px] text-gray">Dienstende <b className="font-medium text-ink tabular-nums">{hm(end)}</b></span>
          <input type="range" className="range" min={600} max={1320} step={15} value={end} onChange={(e) => setEnd(+e.target.value)} /></label>
      </div>
      <p className="mt-3 text-[15px]" aria-live="polite">
        {hm(dauer)} h anwesend <span className="text-gray">−</span> {pause} min Pause <span className="text-gray">=</span> <b className="font-semibold">{hm(ist)} h</b> Arbeitszeit
      </p>
    </div>
  )
}

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
