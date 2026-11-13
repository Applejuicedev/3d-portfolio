import { useRef, useState } from 'react'
import AsciiCanvas from '../ui/AsciiCanvas'
import { RAMPS } from '../lib/ascii'

// The hero's renderer with its parameters exposed: the glyph ramp, the cell size and where the
// light comes from. The canvas reads them every frame, so a change shows immediately.
export default function Raster() {
  const [ramp, setRamp] = useState('standard')
  const [fontSize, setFontSize] = useState(10)
  const [angle, setAngle] = useState(135)
  const a = (angle * Math.PI) / 180
  const params = useRef({})
  params.current = { ramp, fontSize, light: [Math.cos(a), 0.7, Math.sin(a)] }

  return (
    <div className="grid h-full grid-rows-[minmax(18rem,1fr)_auto]">
      <AsciiCanvas params={params} boot={false} zoom={0.86} className="min-h-[18rem]"
        label="Experiment Rasterizer: der Torusknoten aus Schriftzeichen, mit einstellbarem Zeichensatz, Rastergröße und Licht." />
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-line p-4">
        <fieldset>
          <legend className="t-label mb-2">Zeichensatz</legend>
          <div className="flex gap-1">
            {Object.keys(RAMPS).map((k) => (
              <button key={k} type="button" aria-pressed={ramp === k} onClick={() => setRamp(k)}
                className={`press t-mono text-[11px] px-2 py-1 rounded-[3px] border transition-colors ${ramp === k ? 'bg-lime border-lime text-bg' : 'border-line text-muted hover:text-ink'}`}>{k}</button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="t-label flex justify-between">Zelle <span className="text-ink tabular-nums">{fontSize} px</span></span>
          <input type="range" className="range" min={6} max={18} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} />
        </label>
        <label className="block">
          <span className="t-label flex justify-between">Licht <span className="text-ink tabular-nums">{angle}°</span></span>
          <input type="range" className="range" min={0} max={359} value={angle} onChange={(e) => setAngle(+e.target.value)} />
        </label>
      </div>
    </div>
  )
}
