import { useEffect, useState } from 'react'
import { emit, on } from './events'

// The colour palettes. Each one is a set of CSS variables (index.css, html[data-theme]); the pages's
// WebGL points read the same colours from `palette` (kept in sync here), so nothing is defined twice.
// The choice is remembered on this device; index.html applies it before the first paint.
export const THEMES = [
  { id: 'hell', label: 'Hell', note: 'Weiß und Blau', swatch: ['#fafafa', '#0071e3'] },
  { id: 'graphit', label: 'Graphit', note: 'Grau und Orange', swatch: ['#dededc', '#ff6a00'] },
  { id: 'nacht', label: 'Nacht', note: 'Dunkelblau und Hellblau', swatch: ['#0a162c', '#6ec4ff'] },
  { id: 'onyx', label: 'Onyx', note: 'Schwarz und Gelb', swatch: ['#0e0e0f', '#ffd60a'] },
]
const KEY = 'vf-theme'

// the current colours as 0…1 triplets: ink (text, points), accent (highlights), canvas (the page)
export const palette = { ink: [0.06, 0.06, 0.06], accent: [0, 0.443, 0.89], canvas: [0.98, 0.98, 0.98], dark: false }
const read = () => {
  const cs = getComputedStyle(document.documentElement)
  const rgb = (v) => cs.getPropertyValue(v).trim().split(/\s+/).map((n) => Number(n) / 255)
  palette.ink = rgb('--c-ink'); palette.accent = rgb('--c-accent'); palette.canvas = rgb('--c-canvas')
  palette.dark = cs.getPropertyValue('--dark').trim() === '1'
}

export const currentTheme = () => document.documentElement.dataset.theme || 'hell'

export function setTheme(id) {
  const html = document.documentElement
  // a short cross-fade of every colour, then back to normal transitions
  html.classList.add('theme-fade')
  if (id === 'hell') delete html.dataset.theme; else html.dataset.theme = id
  try { localStorage.setItem(KEY, id) } catch { /* private mode: only for this visit */ }
  read()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `rgb(${palette.canvas.map((c) => Math.round(c * 255)).join(' ')})`)
  clearTimeout(setTheme.t); setTheme.t = setTimeout(() => html.classList.remove('theme-fade'), 700)
  emit('theme', id)
}

export function useTheme() {
  const [id, setId] = useState(currentTheme)
  useEffect(() => on('theme', setId), [])
  return id
}

// (read again once the styles are in — by whoever draws with them)
export const refreshPalette = read
