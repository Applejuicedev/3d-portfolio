import { useEffect, useState } from 'react'

// in-page jump; the URL stays clean, so a reload starts at the top (see useDeepLink in App)
export const goTo = (id) => document.getElementById(id)?.scrollIntoView()

// which section holds the middle of the screen ('start' for the hero)
export function useCurrentSection(ids) {
  const [current, setCurrent] = useState('start')
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id) }), { rootMargin: '-50% 0px -50% 0px' })
    ;['start', ...ids].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return current
}

// "14:32" in Berlin, ticking on the minute
const fmt = () => new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }).format(new Date())
export function useBerlinTime() {
  const [t, setT] = useState(fmt)
  useEffect(() => {
    let id
    const tick = () => { setT(fmt()); id = setTimeout(tick, 60000 - (Date.now() % 60000)) }
    id = setTimeout(tick, 60000 - (Date.now() % 60000))
    return () => clearTimeout(id)
  }, [])
  return t
}
