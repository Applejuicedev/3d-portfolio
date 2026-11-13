import { useState } from 'react'

// The break rule from the Dienstzeit app (src/lib/zeit/berechnung.ts), unchanged: in the
// Grundbetrieb, more than 6 h of duty cost 30 min, more than 9 h 30 cost 45 min — and the break
// never pushes the working time below the threshold it crossed.
export function arbeitszeitMitPause(minuten) {
  if (minuten <= 360) return minuten
  if (minuten <= 570) return Math.max(360, minuten - 30)
  return Math.max(540, minuten - 45)
}

const hm = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`
const W = 320, H = 170, MAX = 720 // chart: 0–12 h presence

// presence → working time, as a polyline sampled per minute (the plateaus are the "never below")
const CURVE = Array.from({ length: MAX / 5 + 1 }, (_, i) => i * 5).map((m) => `${(m / MAX) * W},${H - (arbeitszeitMitPause(m) / MAX) * H}`).join(' ')

const K = ({ children }) => <span className="text-ink">{children}</span>
const N = ({ children }) => <span className="text-lime">{children}</span>
const C = ({ children }) => <span className="text-faint">{children}</span>

export default function Pause() {
  const [start, setStart] = useState(7 * 60)
  const [end, setEnd] = useState(16 * 60 + 45)
  const dauer = Math.max(0, end - start)
  const ist = arbeitszeitMitPause(dauer)
  const pause = dauer - ist
  const x = (Math.min(dauer, MAX) / MAX) * W, y = H - (Math.min(ist, MAX) / MAX) * H

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <pre className="t-mono text-[12px] leading-[1.75] text-muted p-4 overflow-x-auto border-b lg:border-b-0 lg:border-r border-line">
        <C>{'// dienstzeit-app · src/lib/zeit/berechnung.ts'}</C>{'\n'}
        <K>export function</K> arbeitszeitMitPause(minuten) {'{\n'}
        {'  '}<K>if</K> (minuten {'<='} <N>360</N>) <K>return</K> minuten{'\n'}
        {'  '}<K>if</K> (minuten {'<='} <N>570</N>) <K>return</K> Math.max(<N>360</N>, minuten - <N>30</N>){'\n'}
        {'  '}<K>return</K> Math.max(<N>540</N>, minuten - <N>45</N>){'\n'}
        {'}'}
      </pre>
      <div className="p-4 grid sm:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] gap-6 items-center">
        <svg viewBox={`-8 -8 ${W + 16} ${H + 26}`} className="w-full" role="img" aria-label={`Kurve Anwesenheit zu Arbeitszeit; aktuell ${hm(dauer)} Anwesenheit, ${hm(ist)} Arbeitszeit`}>
          <line x1="0" y1={H} x2={W} y2={H} stroke="rgb(255 255 255 / .12)" />
          <line x1="0" y1={H} x2={W} y2="0" stroke="rgb(255 255 255 / .06)" strokeDasharray="3 4" />
          {[360, 570].map((m) => <line key={m} x1={(m / MAX) * W} x2={(m / MAX) * W} y1="0" y2={H} stroke="rgb(255 255 255 / .06)" />)}
          <polyline points={CURVE} fill="none" stroke="#eeede8" strokeWidth="1.5" />
          <line x1={x} y1={y} x2={x} y2={H} stroke="#d4ff3a" strokeDasharray="2 3" />
          <circle cx={x} cy={y} r="4.5" fill="#d4ff3a" />
          {[0, 6, 9.5, 12].map((h) => <text key={h} x={(h * 60 / MAX) * W} y={H + 16} fill="#54534e" fontSize="10" fontFamily="Geist Mono" textAnchor="middle">{String(h).replace('.5', ',5')} h</text>)}
        </svg>
        <div className="space-y-4">
          <label className="block">
            <span className="t-label flex justify-between">Dienstbeginn <span className="text-ink tabular-nums">{hm(start)}</span></span>
            <input type="range" className="range" min={300} max={660} step={15} value={start} onChange={(e) => setStart(+e.target.value)} />
          </label>
          <label className="block">
            <span className="t-label flex justify-between">Dienstende <span className="text-ink tabular-nums">{hm(end)}</span></span>
            <input type="range" className="range" min={600} max={1320} step={15} value={end} onChange={(e) => setEnd(+e.target.value)} />
          </label>
          <dl className="t-mono text-[12px] divide-y divide-line border-y border-line" aria-live="polite">
            <div className="flex justify-between py-1.5"><dt className="text-muted">Anwesenheit</dt><dd className="tabular-nums">{hm(dauer)} h</dd></div>
            <div className="flex justify-between py-1.5"><dt className="text-muted">Pause</dt><dd className="tabular-nums">−{pause} min</dd></div>
            <div className="flex justify-between py-1.5"><dt className="text-muted">Arbeitszeit</dt><dd className="tabular-nums text-lime">{hm(ist)} h</dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}
