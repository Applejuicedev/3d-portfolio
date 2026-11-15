// Every fact on the desk lives here. Mine are carried over from the site's content.js; the five
// design studies are earlier versions of this portfolio, rebuilt for clearly fictional personas.
export const ME = {
  name: 'Vincent Fidanli', role: 'Full stack developer', city: 'Frankfurt, Germany',
  email: 'vincent@fidanli.de', phone: '+49 151 70801974', github: 'applejuicedev', instagram: 'arcterxandapple',
  photo: '/profile/vincent.jpg',
  available: 'Open to internships & working-student roles from 2029, alongside a part-time B.Sc. in media informatics (IU, from January 2027).',
  stack: [
    ['Interface', 'React · Next.js · React Native / Expo · SwiftUI · Tailwind CSS'],
    ['Design & motion', 'Figma · GSAP · Three.js · Framer Motion · Blender'],
    ['Logic & data', 'TypeScript · Node.js · Swift · Python · SQLite · Prisma'],
    ['Quality & tools', 'Vitest · Git · Vite · Xcode · Docker · Claude Code'],
  ],
}
export const RESUME = [
  ['2020 – 2022', 'Media & design technical assistant', 'Berufliche Schule Butzbach', 'EQF level 4 · school part of the advanced technical certificate'],
  ['2022 – 2023', 'Advanced technical certificate (Fachabitur)', 'Berufliche Schule Butzbach', 'Completed through training and internship'],
  ['2023 – 2024', 'Web developer intern', 'Mastercode Applications', '6 months · React, agile methods'],
  ['2024 – 2025', 'Media informatics studies', 'Technische Hochschule Mittelhessen', 'Paused after two semesters'],
  ['2024 – 2025', 'Night shift at a mail centre', 'DHL', 'Side job'],
  ['2025 – 2029', 'Soldier on a fixed-term contract', 'German Armed Forces · light reconnaissance', 'Discipline, teamwork and mental strength'],
  ['from 2027', 'Media informatics, distance learning (B.Sc.)', 'IU International University', 'Part-time · alongside service'],
]

// the work: three projects of mine and five design studies; skin = the tool its window looks like;
// the studies open as live miniature websites (apps.js browse)
export const PROJECTS = [
  { id: 'dienstzeit', skin: 'xcode', title: 'Dienstzeit', kind: 'iOS app', year: '2025 –', media: '/videos/dienstzeit.webm', phone: true,
    lede: 'Duty-time tracking for soldiers — the balances follow the actual regulations.',
    story: [['Problem', 'Soldiers mostly keep their **duty hours on paper**; whether the balances are right under SAZV and § 30c SG is **hard to check**.'],
            ['Solution', 'Daily entry and reminders; **18 booking types** worked out by the actual rules; a monthly PDF in the layout of the official booking list.'],
            ['Result', 'Balances **always up to date**; the calculation is **tested against a real booking list**; all data stays on the device.']],
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'], files: ['app/(tabs)/index.tsx', 'lib/zeit/berechnung.ts', 'lib/zeit/buchungsarten.ts', 'lib/pdf/monatsbericht.ts', 'tests/berechnung.test.ts'],
    link: ['dienstzeit-app.de', 'https://dienstzeit-app.de'] },
  { id: 'journal', skin: 'notion', title: "Creator's Journal", kind: 'Web app', year: '2025', media: '/videos/creators-journal.webm',
    lede: 'Plan, reflect, train — in one place, locally on my own machine.',
    story: [['Problem', 'Planning, reflection and training were **scattered across apps and notes**.'],
            ['Solution', 'A **local daily journal**: a schedule built by dragging, an evening check, weekly review; workouts arrive **through the Hevy API**.'],
            ['Result', 'A **system I use myself**: progress per exercise, a 30-day check history, calendar export. **All data stays local.**']],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Hevy API'], note: 'The repository is private — happy to walk you through the code.' },
  { id: 'site', skin: 'vscode', title: 'vincentfidanli.de', kind: 'Web', year: '2026', still: '/concepts/frames/site-1.jpg',
    lede: 'One body of 20,000 points that takes a new form for every part of the page.',
    story: [['Idea', 'The site should **be the work sample** — designed like a design project, built like an application.'],
            ['Build', 'Forms are **generated at runtime** from geometry, GeoJSON and type; a vertex shader moves 20,000 points between them.']],
    tech: ['React', 'GSAP', 'Three.js', 'Tailwind CSS', 'Vite'], link: ['Source code', 'https://github.com/Applejuicedev/3d-portfolio'] },
  ...[
    ['runtime', 'Runtime', 'Ada Lindqvist', 'Leipzig', 'Dark playground: an ASCII rasterizer hero, a terminal that drives the page, a lab of live experiments.', '#0b0b0c'],
    ['studio', 'Studio', 'Noor Haddad', 'Köln', 'Light, Apple-like: a liquid-chrome terminal that starts the site, windows, a dock and Spotlight as navigation.', '#f7f7f7'],
    ['glass', 'Liquid Glass', 'Elio Marchetti', 'München', 'Clear glass material after iOS 26, a 3D terminal, colour palettes and a companion called Mi.', '#e3e9ef'],
    ['bust', 'Bust', 'Mika Sander', 'Dresden', 'A bust of 64,000 points that turns toward the pointer, a live design-to-code workflow in the hero, a preloader of stars.', '#0e0e0d'],
    ['minimal', 'Minimal', 'Ines Okafor', 'Hamburg', 'One wandering body of points on charcoal, a pinned strip of work and very little else.', '#161618'],
  ].map(([id, name, persona, city, lede, bg]) => ({ id: 'study-' + id, skin: 'figma', study: id, title: name, kind: 'Design study', year: '2026', persona, city, lede, bg,
    url: `/versions/${id}/index.html` })),
]
export const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))

export const NUMBERS = [
  ['18', 'booking types the duty-hours app calculates by the rules', 'dienstzeit'],
  ['0', 'bytes of duty data leave the phone', 'dienstzeit'],
  ['1', 'API brings the workouts into the journal', 'journal'],
  ['20,000', 'points make up this site', 'site'],
  ['5', 'earlier versions of this portfolio, now design studies', 'study-runtime'],
  ['6', 'months as a web developer intern', null],
  ['2029', 'from: open to working-student roles', null],
]

export const ZONES = [['FRA', 'Europe/Berlin'], ['LON', 'Europe/London'], ['NYC', 'America/New_York'], ['SFO', 'America/Los_Angeles'], ['TYO', 'Asia/Tokyo'], ['SYD', 'Australia/Sydney'], ['DXB', 'Asia/Dubai']]

// rich text: **bold**
export const rich = (s) => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')

// ── story: what the résumé doesn't say ─────────────────────────
// Media slots: a video file under /public/story/ (video + poster), the link of an *official* YouTube
// upload (embedded through YouTube's own player), or your own photos (image). Third-party video files
// stay local — they are git-ignored, so they never go out with the site. Until a slot is filled it
// shows a coloured placeholder that says what goes there.
export const STORY = {
  music: { video: '/story/closed-on-sunday.mp4', poster: '/story/closed-on-sunday.jpg', youtube: '', title: 'listening.mov', label: 'Kanye West — Closed On Sunday (official video)', note: 'Paste the YouTube link of the official video here (data.js → STORY.music.youtube).' },
  discipline: { video: '/story/goggins-effect.mp4', poster: '/story/goggins-effect.jpg', youtube: '', title: 'discipline.mov', label: 'David Goggins', note: 'Paste the YouTube link of an official upload (data.js → STORY.discipline.youtube).' },
  service: { image: '/story/service.jpg', title: 'service.jpg', note: 'Add your own photo from service (public/story/service.jpg → data.js → STORY.service.image).' },
  // freely licensed photos from Wikimedia Commons, credited as their licences ask (page, credit,
  // license); the others are photos provided for local use only (git-ignored, see .gitignore)
  heroes: { title: 'heroes/', note: 'Photos via Wikimedia Commons.', images: [
    { name: 'Steve Jobs', src: '/story/heroes/steve-jobs.jpg', credit: 'Matthew Yohe', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Steve_Jobs_Headshot_2010-CROP.jpg' },
    { name: 'Kanye West', src: '/story/heroes/kanye-west.jpg', credit: 'robertcastro', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Kanye_West_at_SXSW_2009_2.jpg' },
    { name: 'David Goggins', src: '/story/heroes/david-goggins.jpg', credit: 'U.S. Navy / Paul D. Honnick', license: 'public domain', page: 'https://commons.wikimedia.org/wiki/File:U.S._Navy_Special_Warfare_Operator_1st_Class_(SEAL)_David_Goggins,_right,_assigned_to_Naval_Special_Warfare_Center,_embraces_Cmdr._Keith_Davids,_commanding_officer_of_SEAL_Team_One,_as_they_cross_the_finish_line_081011-N-BV344-004.jpg' },
    { name: 'Bryan Ruiz', src: '/story/heroes/bryan-ruiz.jpg' },
    { name: 'Arda Saatci', src: '/story/heroes/arda-saatci.jpg' },
  ] },
}
// a YouTube link (any common form) → its video id
export const ytId = (url) => (url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) ?? [])[1] ?? ''
