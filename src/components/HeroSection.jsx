import { useRef, useEffect, useCallback, Suspense } from 'react'
import { motion } from 'framer-motion'
import NetworkOrb3D from './NetworkOrb3D'
import HeroGrid from './HeroGrid'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const NAME_GRADIENT = 'linear-gradient(135deg, #bfdbfe 0%, #a5b4fc 28%, #e0e7ff 52%, #818cf8 74%, #93c5fd 100%)'
const NAME_SHADOW   = '0 1px 4px rgba(0,0,0,0.35), 0 3px 14px rgba(0,0,0,0.18)'

export default function HeroSection() {
  const mousePos    = useRef({ x: 0, y: 0 })
  const projectedRef = useRef([])

  const handleMouseMove = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden" style={{ minHeight: '100svh' }}>

      {/* Layer 1: Animated grid */}
      <HeroGrid />

      {/* Layer 2: Ambient centered glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'radial-gradient(ellipse 72% 55% at 50% 42%, rgba(99,102,241,0.07) 0%, transparent 65%)' }}
      />

      {/* Layer 3: 3D Orb — full screen, behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3, paddingTop: '80px' }}
      >
        <Suspense fallback={null}>
          <NetworkOrb3D mouseRef={mousePos} projectedRef={projectedRef} />
        </Suspense>
      </div>

      {/* Layer 10: Centered hero content */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 10, minHeight: '100svh', paddingTop: '80px' }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-0"
        >
          {/* Status chip */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-transparent text-[11px] font-medium text-zinc-500 tracking-tight">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }}
              />
              Verfügbar ab 2027
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={item} className="text-[14px] font-medium text-zinc-500 tracking-tight mb-1">
            Hey! Ich bin
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="leading-none"
            style={{
              fontSize: 'clamp(5rem, 13vw, 11rem)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              textShadow: NAME_SHADOW,
              background: NAME_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vincent
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={item}
            className="w-8 h-px bg-white/[0.1] mt-7 mb-6"
          />

          {/* Tagline */}
          <motion.p variants={item} className="text-[11px] text-zinc-500 font-medium tracking-[0.22em] uppercase">
            Medieninformatik&ensp;·&ensp;Frontend&ensp;·&ensp;UX/UI
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="mt-9 flex items-center justify-center gap-2.5">
            <button
              onClick={() => document.getElementById('uber-mich')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-[9px] rounded-lg bg-white text-[#0a0a0a] text-[13px] font-medium tracking-tight hover:opacity-80 active:opacity-60 transition-opacity duration-150"
            >
              Mehr erfahren
            </button>
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-[9px] rounded-lg border border-white/[0.1] text-zinc-200 text-[13px] font-medium tracking-tight hover:bg-white/[0.05] active:opacity-60 transition-colors duration-150"
            >
              Portfolio
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 section-label">↓</div>
      </div>
    </div>
  )
}
