import React from 'react'
import ReactDOM from 'react-dom/client'
import { PERSON, STATIONS, CHAPTERS, CHANNELS } from '../data/content'
import '../index.css'

// The résumé, on a page of its own and away from the site's story: every station as a tile in a grid —
// years first, then what and where — the longer story below in the same grid. Plain, printable.
function Tile({ s }) {
  return (
    <li className="flex flex-col min-h-[13rem] p-6 border border-line rounded-[18px]">
      <p className="t-cap tabular-nums">{s.when}</p>
      <p className="t-title mt-auto pt-10">{s.title}</p>
      <p className="text-[14px] text-gray mt-2">{s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink underline-offset-4 hover:underline">{s.org} ↗</a> : s.org}</p>
      <p className="text-[13px] text-faint mt-1">{s.note}{s.state ? ` · ${s.state}` : ''}</p>
    </li>
  )
}

function CV() {
  return (
    <div className="frame pb-16">
      <header className="flex items-center justify-between h-16 text-[13px]">
        <a href="/" className="py-3 text-gray hover:text-ink">← Back to the site</a>
        <button type="button" onClick={() => window.print()} className="py-3 text-gray hover:text-ink print:hidden">Print</button>
      </header>
      <h1 className="t-display mt-16">Résumé</h1>
      <p className="t-lead text-gray mt-3">{PERSON.name} · {PERSON.role} · {PERSON.looking}, {PERSON.available}</p>

      <h2 className="t-cap mt-20">Experience & education</h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STATIONS.map((s) => <Tile key={s.title} s={s} />)}
      </ol>

      <h2 className="t-cap mt-20">The story behind it</h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((c) => (
          <li key={c.label} className="p-6 border border-line rounded-[18px]">
            <p className="t-title">{c.label}</p>
            <p className="text-[14px] leading-[1.618] text-gray mt-3">{c.text}</p>
          </li>
        ))}
      </ol>

      <footer className="mt-20 pt-5 border-t border-line flex flex-wrap gap-x-8 gap-y-2 text-[14px]">
        {CHANNELS.map((c) => <a key={c.label} href={c.href} className="py-1 text-gray hover:text-ink"><span className="t-cap mr-2">{c.label}</span>{c.value}</a>)}
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><CV /></React.StrictMode>)
