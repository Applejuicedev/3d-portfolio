import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

const navItems = [
  { id: 'portfolio', path: 'projekte' },
  { id: 'uber-mich', path: 'über-mich' },
  { id: 'stack', path: 'stack' },
]

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// Each entry is always readable as the section's path (~/projekte, …), the same labels the sections
// carry. On hover/focus the word decodes itself once more, random letters (darker) resolving into
// it — a small acknowledgement, not something you need to discover the navigation.
function NavItem({ id, path }) {
  const ref = useRef()
  useEffect(() => {
    const btn = ref.current
    const word = btn.querySelector('[data-word]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const enter = () => gsap.to(word, {
      duration: 0.5, overwrite: true,
      scrambleText: { text: path, chars: 'abcdefghijklmnopqrstuvwxyz', speed: 0.9, oldClass: 'text-zinc-600' },
    })
    btn.addEventListener('mouseenter', enter)
    btn.addEventListener('focus', enter)
    return () => { btn.removeEventListener('mouseenter', enter); btn.removeEventListener('focus', enter) }
  }, [path])

  return (
    <button ref={ref} onClick={() => go(id)}
      className="py-2 text-[12.5px] text-zinc-500 hover:text-white focus-visible:text-white focus-visible:outline-none transition-colors duration-150 whitespace-nowrap"
      style={{ fontFamily: MONO }}>
      <span className="hidden sm:inline text-zinc-700">~/</span><span data-word>{path}</span>
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
          ? 'bg-[#0a0a0a]/60 backdrop-blur-xl backdrop-saturate-150 border-white/[0.05]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="gutter h-14 flex items-center justify-between gap-4">
        <button onClick={() => go('start')} className="text-[13.5px] font-medium tracking-tight text-zinc-200 hover:text-white transition-colors duration-150 whitespace-nowrap">
          Vincent Fidanli
        </button>
        <div className="flex items-center gap-4 sm:gap-7">
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => <NavItem key={item.id} {...item} />)}
          </div>
          {/* phones: only the projects link next to contact; the rest is one scroll away */}
          <div className="md:hidden"><NavItem {...navItems[0]} /></div>
          <button onClick={() => go('kontakt')}
            className="rounded-full border border-white/[0.12] px-4 py-1.5 text-[12.5px] text-zinc-200 hover:border-white/30 hover:text-white transition-colors duration-150">
            Kontakt
          </button>
        </div>
      </div>
    </nav>
  )
}
