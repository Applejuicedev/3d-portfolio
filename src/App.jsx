import { useEffect } from 'react'
import { ScrollTrigger } from './lib/motion'
import { startSmoothScroll, scrollToTarget } from './lib/scroll'
import Body from './body/Body'
import Site from './site/Site'

// Where a visit starts: a reload always at the top; only a fresh visit with an anchor (a shared
// link like /#kontakt) jumps to it, once the fonts are in.
function useDeepLink() {
  useEffect(() => {
    let alive = true
    const type = performance.getEntriesByType?.('navigation')[0]?.type
    const id = type === 'navigate' ? decodeURIComponent(location.hash.slice(1)) : ''
    if (!id && location.hash) history.replaceState(null, '', location.pathname + location.search)
    document.fonts.ready.then(() => {
      if (!alive) return
      ScrollTrigger.refresh()
      if (id) scrollToTarget(document.getElementById(id), { immediate: true })
    })
    return () => { alive = false }
  }, [])
}

export default function App() {
  useEffect(() => { startSmoothScroll() }, [])
  useDeepLink()
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[210] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <Body />
      <Site />
    </>
  )
}
