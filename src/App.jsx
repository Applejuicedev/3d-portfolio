import { Suspense, lazy, useEffect } from 'react'
import { ScrollTrigger } from './lib/motion'
import { startSmoothScroll, scrollToTarget } from './lib/scroll'
import { booted, notify } from './lib/events'
import Preloader from './ui/Preloader'
import Cursor from './ui/Cursor'
import Buddy from './ui/Buddy'
import Nav from './ui/Nav'
import Notifications from './ui/Notifications'
import Spotlight from './ui/Spotlight'
import ProjectSheet from './ui/ProjectSheet'
import Hero from './sections/Hero'
import Statement from './sections/Statement'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Path from './sections/Path'
import Contact from './sections/Contact'
// the particle objects (three.js) are their own chunk; the download starts as soon as this module runs
const particleChunk = import('./ui/ParticleField')
const ParticleField = lazy(() => particleChunk)

// Where a visit starts: a reload always at the top; only a fresh visit with an anchor (a shared
// link like /#kontakt) jumps to it, once the page has booted and the fonts are in.
function useDeepLink() {
  useEffect(() => {
    let alive = true
    const type = performance.getEntriesByType?.('navigation')[0]?.type
    const id = type === 'navigate' ? decodeURIComponent(location.hash.slice(1)) : ''
    if (!id && location.hash) history.replaceState(null, '', location.pathname + location.search)
    Promise.all([booted, document.fonts.ready]).then(() => {
      if (!alive) return
      ScrollTrigger.refresh()
      if (id) scrollToTarget(document.getElementById(id), { immediate: true })
    })
    return () => { alive = false }
  }, [])
}

// One hidden detail announces the others: a while after the page has booted, a single
// notification mentions Spotlight — once per visit, and only if it hasn't been used yet.
function useHint() {
  useEffect(() => {
    let used = false, id
    const k = (e) => { if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') used = true }
    window.addEventListener('keydown', k)
    booted.then(() => { id = setTimeout(() => { if (!used) notify({ app: 'Tipp', title: 'Spotlight', body: '⌘K (oder /) findet alles auf dieser Seite.', icon: '⌘' }) }, 14000) })
    return () => { clearTimeout(id); window.removeEventListener('keydown', k) }
  }, [])
}

export default function App() {
  useEffect(() => { startSmoothScroll() }, [])
  useDeepLink()
  useHint()
  return (
    <>
      <a href="#arbeiten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[210] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:rounded-full">Zum Inhalt springen</a>
      <Suspense fallback={null}><ParticleField /></Suspense>
      <Nav />
      <main className="relative z-[1]">
        <section id="start" aria-label="Start"><Hero /></section>
        <Statement />
        <Projects />
        <Stack />
        <Path />
      </main>
      <div className="relative z-[1]"><Contact /></div>
      <Notifications />
      <Spotlight />
      <ProjectSheet />
      <Buddy />
      <Preloader />
      <Cursor />
    </>
  )
}
