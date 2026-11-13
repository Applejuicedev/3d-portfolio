import { useEffect } from 'react'
import { ScrollTrigger } from './lib/motion'
import Hero from './sections/Hero'
import Work from './sections/Work'
import System from './sections/System'
import Lab from './sections/Lab'
import Profile from './sections/Profile'
import Contact from './sections/Contact'
import Dock from './ui/Dock'

// Where a visit starts. A reload always starts at the top (scroll restoration is off in
// index.html, and a stale hash is dropped); only a fresh visit with an anchor (a shared link like
// /#kontakt) jumps to it — once the fonts are in, so the layout is final.
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

// One page: the opening, then the work, how it is built, the lab, who made it, and how to reach
// him. Numbered 01–05 everywhere (dock, hero index, section heads, terminal).
export default function App() {
  useDeepLink()
  return (
    <>
      <a href="#arbeiten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-lime focus:text-bg focus:px-3 focus:py-2 focus:rounded-[4px]">Zum Inhalt springen</a>
      <main>
        <section id="start" aria-label="Start"><Hero /></section>
        <Work />
        <System />
        <Lab />
        <Profile />
      </main>
      <Contact />
      <Dock />
    </>
  )
}
