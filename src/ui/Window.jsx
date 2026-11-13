import { forwardRef } from 'react'

// The traffic lights. Decorative unless `onClose` is given: then the red one is a real button.
export function Lights({ onClose, off = false, className = '' }) {
  return (
    <span className={`lights flex gap-2 ${off ? 'off' : ''} ${className}`}>
      {onClose
        ? <button type="button" onClick={onClose} aria-label="Schließen" className="rounded-full"><i /></button>
        : <i aria-hidden />}
      <i aria-hidden /><i aria-hidden />
    </span>
  )
}

// A window: rounded, a title bar with the traffic lights and a centred title (or any toolbar),
// the body below, all in Liquid Glass. `dark` for app windows (Xcode, Terminal), light for the rest. The lights stay
// grey until the window is hovered. A position class in
// `className` (absolute, fixed, sticky) replaces the default `relative`. `flat`: no live blur (.flat),
// for windows that move or turn.
const Window = forwardRef(function Window({ title, toolbar, dark = false, flat = false, onClose, className = '', bodyClass = '', children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative'} win overflow-hidden rounded-win ${dark ? 'win-dark glass-dark text-white' : 'glass-strong'} ${flat ? 'flat' : ''} ${className}`}>
      <div className={`relative flex items-center gap-3 h-11 px-4 ${dark ? 'border-b border-white/[0.07]' : 'border-b border-black/[0.06]'}`}>
        <Lights onClose={onClose} />
        {toolbar ?? <p className={`absolute inset-x-24 text-center truncate text-[12.5px] font-medium ${dark ? 'text-white/60' : 'text-gray'}`}>{title}</p>}
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  )
})
export default Window
