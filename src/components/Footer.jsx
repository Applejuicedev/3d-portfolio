import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { SectionPath } from './AboutSection'

gsap.registerPlugin(ScrollTrigger, SplitText)

const SOCIALS = [
  {
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
    label: '@arcterxandapple',
    href: 'https://instagram.com/arcterxandapple',
  },
  {
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'vincent@fidanli.de',
    href: 'mailto:vincent@fidanli.de',
  },
  {
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: '015170801974',
    href: 'tel:+4915170801974',
  },
  {
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    label: '@applejuicedev',
    href: 'https://github.com/applejuicedev',
  },
]

const DIM = '#3f3f46'

// Closing statement above the footer bar: the letters flip in once, and on desktop the ones
// near the cursor lift and light up.
function ContactStatement() {
  const rootRef = useRef()

  useEffect(() => {
    const root = rootRef.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(root.querySelector('[data-statement]'), { type: 'chars,words' })
      const color = gsap.utils.interpolate(DIM, '#c7d2fe')
      gsap.from(split.chars, {
        yPercent: 80, opacity: 0, rotateX: -90, stagger: 0.03, duration: 0.9, ease: 'back.out(2)',
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      })
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

      let frame = 0
      let pointer = { x: 0, y: 0 }
      const update = () => {
        frame = 0
        split.chars.forEach((c) => {
          const r = c.getBoundingClientRect()
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2))
          const k = Math.max(0, 1 - d / 220)
          gsap.to(c, { y: -k * 22, scale: 1 + k * 0.12, color: color(k), duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
        })
      }
      const move = (e) => {
        pointer = { x: e.clientX, y: e.clientY }
        if (!frame) frame = requestAnimationFrame(update)
      }
      const leave = () => {
        cancelAnimationFrame(frame)
        frame = 0
        gsap.to(split.chars, { y: 0, scale: 1, color: DIM, duration: 0.8, ease: 'elastic.out(1, 0.4)', stagger: 0.01, overwrite: 'auto' })
      }
      root.addEventListener('pointermove', move)
      root.addEventListener('pointerleave', leave)
      return () => {
        cancelAnimationFrame(frame)
        root.removeEventListener('pointermove', move)
        root.removeEventListener('pointerleave', leave)
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={rootRef} className="bg-[#0a0a0a] pt-28 pb-24 px-6 text-center cursor-default" style={{ perspective: 600 }}>
      <SectionPath path="kontakt" className="mb-6" />
      <p
        data-statement
        className="font-bold tracking-tight leading-none select-none"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: DIM }}
      >
        Schreib mir.
      </p>
      <p className="mt-8 text-[14px] text-zinc-500 max-w-md mx-auto leading-relaxed">
        Praktikum, Werkstudentenstelle oder eine Projektidee? Ich freue mich über deine Nachricht.
      </p>
      <a
        href="mailto:vincent@fidanli.de"
        className="inline-block mt-4 text-[14px] text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white"
      >
        vincent@fidanli.de
      </a>
    </div>
  )
}

export default function Footer() {
  return (
    // Slides over the (sticky) portfolio section, so it needs its own layer and background
    <div className="relative z-10 bg-[#0a0a0a] shadow-[0_-24px_60px_rgba(0,0,0,0.55)]">
      <div className="h-px bg-white/[0.05]" />
      <ContactStatement />
      <div className="h-px bg-white/[0.05]" />

      <footer className="bg-[#0a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex flex-wrap justify-center md:justify-start gap-0.5">
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-3 py-2 rounded-lg
                    text-[12px] font-medium
                    text-zinc-500
                    hover:text-white
                    hover:bg-white/[0.04]
                    transition-all duration-150
                  "
                >
                  <span className="opacity-55">{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <p className="text-[11px] text-zinc-600 tracking-tight">
              © {new Date().getFullYear()} Vincent Fidanli
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
