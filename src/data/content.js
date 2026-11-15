// Every fact on the site lives here — the sections only arrange it. Nothing in this file is made up:
// it is carried over from the previous version of the site and the projects' own repositories.
// The site is in English.

export const PERSON = {
  name: 'Vincent Fidanli',
  role: 'Full Stack Developer',
  email: 'vincent@fidanli.de',
  available: 'from 2029',
  looking: 'Open to internships & working-student roles',
}

export const CHANNELS = [
  { label: 'Email', value: 'vincent@fidanli.de', href: 'mailto:vincent@fidanli.de' },
  { label: 'Phone', value: '+49 151 70801974', href: 'tel:+4915170801974' },
  { label: 'GitHub', value: '@applejuicedev', href: 'https://github.com/applejuicedev' },
  { label: 'Instagram', value: '@arcterxandapple', href: 'https://instagram.com/arcterxandapple' },
]

// ── Projects ───────────────────────────────────────────────────
// Each project opens into a view with its story (problem / solution / result; **key phrases** are
// set in the brighter ink). video: a loop recorded from the real application
// (public/videos/<slug>.webm + .jpg poster).
export const PROJECTS = [
  {
    slug: 'dienstzeit',
    title: 'Dienstzeit',
    kind: 'iOS app',
    year: '2025 –',
    status: 'In progress',
    lede: 'Duty-time tracking for German soldiers – the balances follow the actual regulations.',
    story: [
      ['problem', 'Soldiers mostly keep their **duty hours on paper**; the orderly room copies them into the booking list. Whether the hour, duty-day and leave balances are right under the regulations (SAZV, § 30c SG) is **hard to check**.'],
      ['solution', 'An iOS app with **daily entry and reminders**. 18 booking types, from regular duty to exercises, work out breaks, overtime and duty days **by the actual rules**. At the end of the month it produces a PDF in the layout of the official booking list.'],
      ['result', 'The **balances are always up to date**; the timesheet only has to be copied. The calculation is **tested against a real booking list**, and all data stays on the device.'],
    ],
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'],
    links: [{ label: 'Landing page', href: 'https://dienstzeit-app.de' }],
    repo: 'Applejuicedev/dienstzeit-app',
    video: { frame: 'phone', label: 'Demo of the Dienstzeit app: today is logged as an activity under § 30c and the duty-day balance rises to 1; in the month view the open days are filled in and the PDF report appears; Monday becomes leave and the leave balance shows 29 days.' },
    surface: '#06110B',
  },
  {
    slug: 'creators-journal',
    title: "Creator's Journal",
    kind: 'Web app',
    year: '2025',
    status: 'Live',
    lede: 'Plan, reflect, train – in one place, locally on my own machine.',
    story: [
      ['problem', 'Daily planning, reflection and training were **scattered across apps and notes**. There was no single place to plan, look back and see **whether my training was progressing**.'],
      ['solution', 'A **local daily journal** (Next.js, SQLite): a schedule built by dragging, like a calendar, in the morning; a daily check and reflection in the evening; weekly and monthly planning. Workouts come in **automatically through the Hevy API**.'],
      ['result', 'A **system I use myself**: progress charts per exercise with personal bests, a 30-day check history and a schedule export for the calendar. **All data stays local.**'],
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Hevy API'],
    // the repository is private, so there is no public link to it
    links: [],
    repo: 'Applejuicedev/creators-journal',
    video: { frame: 'screen', label: "Demo of Creator's Journal: a timebox with a title is dragged into the schedule, a daily goal and a to-do are added and checked off, the evening check gets an 8 and a daily win, and the wheel of life fills in the weekly review." },
    surface: '#18181b',
  },
  {
    slug: 'portfolio',
    title: 'This website',
    kind: 'Web',
    year: '2026',
    status: 'Live',
    lede: 'No screenshot – the project is running in your browser right now.',
    story: [
      ['problem', 'Most portfolios **claim full stack** in a single sentence. I wanted the site to **be the work sample** – designed like a design project, built like an application.'],
      ['solution', 'A **single body of 20,000 points** travels through the page and takes a new form for each part: a solar system, a galaxy, Germany, the world. Otherwise only **type, darkness and space**.'],
      ['result', 'The forms are **generated at runtime from geometry, map data and type**; a shader lets the points flow. Everything **works with the keyboard**, and with reduced motion the page stands still.'],
    ],
    tech: ['React', 'GSAP', 'Three.js', 'Tailwind CSS', 'Vite'],
    links: [{ label: 'Source code', href: 'https://github.com/Applejuicedev/3d-portfolio' }],
    repo: 'Applejuicedev/3d-portfolio',
  },
]

// ── Stack ──────────────────────────────────────────────────────
// What I work with, as layers of a system. `uses` links a tool to the project entries above
// (by the names in their tech lists), so the diagram only ever draws connections that exist.
export const LAYERS = [
  { id: 'design', label: 'Gestaltung & Motion', items: ['Figma', 'GSAP', 'Framer Motion', 'Three.js', 'Blender'] },
  { id: 'ui', label: 'Interface', items: ['React', 'Next.js', 'React Native · Expo', 'SwiftUI', 'HTML & CSS', 'Tailwind CSS'] },
  { id: 'logic', label: 'Sprachen & Laufzeit', items: ['TypeScript', 'Swift', 'Python', 'Node.js'] },
  { id: 'data', label: 'Daten & Tests', items: ['SQLite', 'Prisma', 'Vitest'] },
  { id: 'tools', label: 'Werkzeuge', items: ['Git · GitHub', 'Vite', 'Xcode', 'Docker'] },
  { id: 'ai', label: 'Mit KI', items: ['Claude Code', 'Claude', 'ChatGPT', 'Perplexity'] },
]

// a stack item may stand for several names in the project tech lists
const ALIASES = {
  'React Native · Expo': ['React Native', 'Expo SDK 57', 'Expo Router'],
  'Next.js': ['Next.js'],
  React: ['React', 'React Native'],
}
export const projectsUsing = (item) => {
  const names = ALIASES[item] ?? [item]
  return PROJECTS.filter((p) => p.tech.some((t) => names.includes(t))).map((p) => p.slug)
}

// ── About ──────────────────────────────────────────────────────
export const LINKS = {
  THM: 'https://www.thm.de/',
  BSB: 'https://berufsschule-butzbach.de/hoehere-berufsfachschule/gestaltungs-und-medientechnik/',
  IU: 'https://www.iu.de/bachelor/medieninformatik/fernstudium/',
  DHL: 'https://www.google.com/maps/search/?api=1&query=DHL+Briefzentrum+Langg%C3%B6ns',
}

// from/to in years (fractions for months); open: the end is not fixed yet; state: paused / planned
export const STATIONS = [
  { from: 2020, to: 2022, when: '2020 – 2022', title: 'Media & Design Technical Assistant', org: 'Berufliche Schule Butzbach', href: LINKS.BSB, note: 'EQF level 4 · school part of the advanced technical certificate' },
  { from: 2022, to: 2023, when: '2022 – 2023', title: 'Advanced technical certificate (Fachabitur)', org: 'Berufliche Schule Butzbach', href: LINKS.BSB, note: 'Completed through training and internship' },
  { from: 2023, to: 2024, when: '2023 – 2024', title: 'Web developer intern', org: 'Mastercode Applications', note: '6 months · React, agile methods · practical part of the certificate' },
  { from: 2024.17, to: 2025.67, when: '03/2024 – 08/2025', title: 'Night shift at a mail centre', org: 'DHL', href: LINKS.DHL, note: 'Side job' },
  { from: 2024, to: 2025, when: '2024 – 2025', title: 'Media informatics studies', org: 'Technische Hochschule Mittelhessen', href: LINKS.THM, note: 'paused after two semesters', state: 'paused' },
  { from: 2025, to: 2029, open: true, when: '2025 – at least 2029', title: 'Soldier on a fixed-term contract', org: 'German Armed Forces · light reconnaissance', note: 'Discipline, teamwork and mental strength' },
  { from: 2027, to: 2031, open: true, when: 'from 2027', title: 'Media informatics, distance learning (B.Sc.)', org: 'IU International University', href: LINKS.IU, note: 'Part-time · 48 months · alongside service', state: 'planned' },
]

export const CHAPTERS = [
  { label: 'The beginning', text: 'My passion for technology and design began during my vocational training, where I laid the foundations in design, media production and software development.' },
  { label: 'Internship', text: 'During six months as a web developer intern at Mastercode Applications I got to know modern technologies and agile work in practice. Since then I know: I want to build applications that genuinely help people.' },
  { label: 'Studies & night shifts', text: 'I enjoyed studying at THM. At the same time I worked night shifts at the DHL mail centre in Langgöns, and often lacked the energy for exams. What I took from it: discipline – and that success has to be earned.' },
  { label: 'The decision', text: 'By the second semester it was clear that night shifts and studying could not be combined at the standard I expect of myself. I paused my studies and began my service as a soldier, to settle myself financially and personally.' },
  { label: 'Today', head: true, text: 'In service I found that my career track leaves enough room for part-time distance learning. On 1 January 2027 I am resuming a Bachelor of Science in media informatics at IU.' },
]

// the sections, in page order (navigation, Spotlight and the path bar all read this)
export const SECTIONS = [
  { id: 'arbeiten', label: 'Arbeiten', alias: ['projekte', 'work', 'projects'] },
  { id: 'stack', label: 'Skills', alias: ['system', 'skills', 'tech', 'dock'] },
  { id: 'weg', label: 'Über mich', alias: ['about', 'über', 'profil', 'lebenslauf'] },
  { id: 'kontakt', label: 'Kontakt', alias: ['contact', 'mail'] },
]
