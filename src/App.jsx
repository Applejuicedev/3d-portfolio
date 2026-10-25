import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PortfolioSection from './components/PortfolioSection'
import AboutSection from './components/AboutSection'
import Stack from './components/Stack'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Atmosphere from './components/Atmosphere'
import StatusBar from './components/StatusBar'
import { useGlowPointer } from './components/ui'
import { useEffect } from 'react'
import { ScrollTrigger, gsap } from './components/motion'
import Preloader from './components/Preloader'

// One page, four numbered sections after the opening: the work first, then who made it, what it
// is made with, and how to reach me.
// Where a visit starts. A reload (or back/forward onto the page) always starts at the top of the
// hero — the browser's own scroll restoration is off (index.html), and a hash left in the URL is
// dropped, so an old #projekte can't pull the page down again. Only a fresh visit with an anchor
// (a shared link like /#kontakt) jumps to it — and only once the fonts are in (final layout), since
// the browser's own jump comes before React has rendered the sections. ScrollTrigger recalculates
// its positions for that final layout either way.
function useDeepLink() {
  useEffect(() => {
    let alive = true
    const type = performance.getEntriesByType?.('navigation')[0]?.type
    const id = type === 'navigate' ? decodeURIComponent(location.hash.slice(1)) : ''
    if (!id && location.hash) history.replaceState(null, '', location.pathname + location.search)
    document.fonts.ready.then(() => {
      if (!alive) return
      ScrollTrigger.refresh()
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
      else if (window.scrollY) window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => { alive = false }
  }, [])
}

// the preloader lets the page's motion go (main.jsx paused it)
const release = () => gsap.globalTimeline.resume()

export default function App() {
  useGlowPointer()
  useDeepLink()
  return (
    <>
      <Preloader onRelease={release} />
      <Atmosphere />
      <div data-enter style={{ '--enter': '1.5s' }}><Navbar /></div>
      <main>
        <section id="start" aria-label="Start"><HeroSection /></section>
        <PortfolioSection />
        <AboutSection />
        <Stack />
      </main>
      <Footer />
      <div data-enter style={{ '--enter': '2.3s' }}><StatusBar /></div>
      <Cursor />
    </>
  )
}
