import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const navItems = [
    { id: 'start',     label: 'Start'     },
    { id: 'uber-mich', label: 'Über mich' },
    { id: 'portfolio', label: 'Portfolio'  },
  ]

  return (
    <nav
      // Border is always present and only its color fades — toggling the border itself
      // briefly flashed Tailwind's light default border color while transitioning.
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-white/[0.05]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-[14px] flex items-center justify-between">

        <span className="text-[13px] font-semibold tracking-tight text-white select-none">
          VF
        </span>

        <div className="flex items-center gap-0.5">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="
                px-3 py-2.5 sm:py-1.5 rounded-md
                text-[13px] font-medium
                text-zinc-400
                hover:text-white
                hover:bg-white/[0.05]
                transition-all duration-150
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
