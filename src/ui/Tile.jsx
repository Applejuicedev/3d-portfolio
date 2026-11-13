import {
  SiFigma, SiGreensock, SiFramer, SiThreedotjs, SiBlender, SiReact, SiNextdotjs, SiExpo, SiSwift, SiHtml5,
  SiTailwindcss, SiTypescript, SiPython, SiNodedotjs, SiSqlite, SiPrisma, SiVitest, SiGithub, SiVite, SiXcode,
  SiDocker, SiClaude, SiAnthropic, SiPerplexity,
} from 'react-icons/si'

// The tools' own marks, in black. A tool without a mark of its own gets its short name in mono.
const MARKS = {
  Figma: SiFigma, GSAP: SiGreensock, 'Framer Motion': SiFramer, 'Three.js': SiThreedotjs, Blender: SiBlender,
  React: SiReact, 'Next.js': SiNextdotjs, 'React Native · Expo': SiExpo, SwiftUI: SiSwift, 'HTML & CSS': SiHtml5,
  'Tailwind CSS': SiTailwindcss, TypeScript: SiTypescript, Swift: SiSwift, Python: SiPython, 'Node.js': SiNodedotjs,
  SQLite: SiSqlite, Prisma: SiPrisma, Vitest: SiVitest, 'Git · GitHub': SiGithub, Vite: SiVite, Xcode: SiXcode,
  Docker: SiDocker, 'Claude Code': SiAnthropic, Claude: SiClaude, Perplexity: SiPerplexity,
}
const SHORT = { ChatGPT: 'GPT' }

export function Mark({ t, size = '1em' }) {
  const M = MARKS[t]
  return M ? <M size={size} /> : <span className="font-mono font-medium tracking-tight" style={{ fontSize: `calc(${typeof size === 'number' ? `${size}px` : size} * 0.62)` }}>{SHORT[t] ?? t.slice(0, 2)}</span>
}

// An app tile, cornered like an iOS icon (22.37 % of its size): white, softly lit from above, a hairline edge and a short shadow; the mark in black.
export default function Tile({ t, size = 48, className = '' }) {
  return (
    <span className={`grid place-items-center rounded-[22.37%] text-ink bg-[linear-gradient(180deg,#ffffff,#f1f1f1)] shadow-[inset_0_0_0_0.5px_rgb(0_0_0/.08),inset_0_1px_0_#fff,0_1px_2px_rgb(0_0_0/.06),0_6px_14px_-6px_rgb(0_0_0/.18)] ${className}`}
      style={{ width: size, height: size }}>
      <Mark t={t} size={Math.round(size * 0.46)} />
    </span>
  )
}
