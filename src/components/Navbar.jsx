import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

const ICON = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

const navItems = [
  { id: 'start', label: 'Start', path: 'start', icon: <svg {...ICON}><path d="M3.5 10.5 12 3.5l8.5 7V20a.5.5 0 0 1-.5.5h-5v-6h-6v6H4a.5.5 0 0 1-.5-.5z" /></svg> },
  { id: 'uber-mich', label: 'Über mich', path: 'über-mich', icon: <svg {...ICON}><circle cx="12" cy="8" r="3.75" /><path d="M4.5 20.5c1.4-3.9 4.2-5.75 7.5-5.75s6.1 1.85 7.5 5.75" /></svg> },
  { id: 'portfolio', label: 'Portfolio', path: 'projekte', icon: <svg {...ICON}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg> },
]

// At rest each entry shows an icon. On hover/focus the icon gives way and the word builds itself up
// letter by letter, random letters (darker) resolving into the word; on leave the icon returns.
// Native listeners: React re-fires mouseenter when the letters under the cursor are swapped.
function NavItem({ id, label, path, icon }) {
  const ref = useRef()
  useEffect(() => {
    const btn = ref.current
    const iconEl = btn.querySelector('[data-icon]')
    const word = btn.querySelector('[data-word]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const enter = () => {
      gsap.to(iconEl, { opacity: 0, scale: 0.6, duration: 0.2, ease: 'power2.in', overwrite: true })
      gsap.set(word, { opacity: 1 })
      // the word is the section's path, like the labels on the page (~/über-mich, ~/projekte)
      const text = `~/${path}`
      if (reduced) { word.textContent = text; return }
      word.textContent = ''
      gsap.to(word, {
        duration: 0.55, overwrite: true,
        scrambleText: { text, chars: 'abcdefghijklmnopqrstuvwxyz', speed: 0.9, oldClass: 'text-zinc-600' },
      })
    }
    const leave = () => {
      gsap.to(word, { opacity: 0, duration: 0.18, ease: 'power2.out', overwrite: true })
      gsap.to(iconEl, { opacity: 1, scale: 1, duration: 0.35, delay: 0.08, ease: 'back.out(2)', overwrite: true })
    }
    const events = [['mouseenter', enter], ['mouseleave', leave], ['focus', enter], ['blur', leave]]
    events.forEach(([e, f]) => btn.addEventListener(e, f))
    return () => events.forEach(([e, f]) => btn.removeEventListener(e, f))
  }, [path])

  return (
    <button
      ref={ref}
      aria-label={label}
      onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
      className="grid place-items-center py-1 text-[12.5px] text-zinc-400 hover:text-white hover:bg-white/[0.05] focus-visible:text-white focus-visible:outline-none focus-visible:bg-white/[0.05] transition-colors duration-150"
    >
      <span data-icon className="[grid-area:1/1] flex">{icon}</span>
      <span data-word aria-hidden className="[grid-area:1/1] whitespace-nowrap opacity-0" style={{ fontFamily: MONO }} />
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      // Border is always present and only its color fades — toggling the border itself
      // briefly flashed Tailwind's light default border color while transitioning.
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        scrolled
          ? 'bg-[#0a0a0a]/45 backdrop-blur-xl backdrop-saturate-150 border-white/[0.05]'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Jeder Eintrag ist ein gleich breites Feld über die volle Breite und Höhe der Leiste */}
      <div className="grid grid-cols-3">
        {navItems.map((item) => <NavItem key={item.id} {...item} />)}
      </div>
    </nav>
  )
}
