// ↗ external, → in-page, ↓ further down. On hover/focus of the parent .group it leaves in its
// direction and a copy arrives from the opposite side.
const PATHS = {
  ne: 'M4 12 12 4M5.5 4H12v6.5',
  e: 'M2.5 8h11M9 3.5 13.5 8 9 12.5',
  s: 'M8 2.5v11M3.5 9 8 13.5 12.5 9',
}
const MOVE = {
  ne: ['group-hover:translate-x-[110%] group-hover:-translate-y-[110%]', '-translate-x-[110%] translate-y-[110%]'],
  e: ['group-hover:translate-x-[110%]', '-translate-x-[110%]'],
  s: ['group-hover:translate-y-[110%]', '-translate-y-[110%]'],
}
export function Arrow({ dir = 'ne', className = '' }) {
  const icon = (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"><path d={PATHS[dir]} /></svg>
  )
  const t = 'col-start-1 row-start-1 transition-transform duration-[420ms] ease-sys motion-reduce:transition-none'
  return (
    <span aria-hidden className={`inline-grid overflow-hidden w-[1em] h-[1em] flex-none ${className}`}>
      <span className={`${t} ${MOVE[dir][0]}`}>{icon}</span>
      <span className={`${t} ${MOVE[dir][1]} group-hover:translate-x-0 group-hover:translate-y-0`}>{icon}</span>
    </span>
  )
}
