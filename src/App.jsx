import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SkillSlider from './components/SkillSlider'
import AboutSection from './components/AboutSection'
import TechStackReveal from './components/TechStackReveal'
import PortfolioSection from './components/PortfolioSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

// Everything below the hero mounts one section per idle slot after the hero has painted, so the
// first load isn't one long blocking task while the hero intro is playing
const BELOW = [SkillSlider, AboutSection, TechStackReveal, PortfolioSection, Footer]

function useStaged(total) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count >= total) {
      // positions changed while sections were added; a deep link can only resolve now
      ScrollTrigger.refresh()
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
      return
    }
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 16))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = idle(() => setCount((c) => c + 1), { timeout: 400 })
    return () => cancel(id)
  }, [count, total])
  return count
}

export default function App() {
  const shown = useStaged(BELOW.length)
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <section id="start">
        <HeroSection />
      </section>
      {BELOW.slice(0, shown).map((Section) => <Section key={Section.name} />)}
    </div>
  )
}
