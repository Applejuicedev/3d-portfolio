import { useEffect, useRef, useState } from 'react'
import { THEMES, setTheme, useTheme } from '../lib/theme'
import { sfx } from '../lib/sound'

// a palette as a little disc: the page's colour, its highlight as a drop in the middle
const Swatch = ({ t, size = 18 }) => (
  <span aria-hidden className="relative grid place-items-center rounded-full shadow-[inset_0_0_0_1px_rgb(127_127_127/.35)]" style={{ width: size, height: size, background: t.swatch[0] }}>
    <i className="block rounded-full" style={{ width: size * 0.44, height: size * 0.44, background: t.swatch[1] }} />
  </span>
)

// The colour palette, at the left end of the navigation: a round glass button showing the current
// one; it opens a small glass menu with all four. The choice stays on this device (lib/theme.js).
export default function ThemeSwitch() {
  const id = useTheme(), [open, setOpen] = useState(false), ref = useRef()
  const cur = THEMES.find((t) => t.id === id) ?? THEMES[0]
  useEffect(() => {
    if (!open) return
    const away = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('pointerdown', away); window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('pointerdown', away); window.removeEventListener('keydown', esc) }
  }, [open])
  const pick = (t) => { if (t.id !== id) { setTheme(t.id); sfx('tick') } setOpen(false) }
  return (
    <div ref={ref} className="pointer-events-auto absolute left-[var(--gutter)]">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open} aria-label={`Farbpalette: ${cur.label}`} title="Farbpalette"
        className="glass grid place-items-center w-9 h-9 rounded-full">
        <Swatch t={cur} size={18} />
      </button>
      <div role="menu" aria-label="Farbpalette"
        className={`glass-strong absolute left-0 top-[calc(100%+10px)] w-[15.5rem] rounded-[20px] p-1.5 origin-top-left transition-[opacity,transform,filter] duration-300 ease-sys ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-[4px] pointer-events-none'}`}>
        <p className="px-3 pt-2 pb-1.5 t-cap">Farbpalette</p>
        {THEMES.map((t) => (
          <button key={t.id} type="button" role="menuitemradio" aria-checked={t.id === id} tabIndex={open ? 0 : -1} onClick={() => pick(t)}
            className={`w-full flex items-center gap-3 rounded-[14px] px-3 py-2 text-left transition-colors ${t.id === id ? 'bg-ink/[0.07]' : 'hover:bg-ink/[0.05]'}`}>
            <Swatch t={t} size={26} />
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] text-ink">{t.label}</span>
              <span className="block text-[12px] text-gray truncate">{t.note}</span>
            </span>
            {t.id === id && <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="text-blue"><path d="M2.5 7.5 5.5 10.5 11.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </button>
        ))}
      </div>
    </div>
  )
}
