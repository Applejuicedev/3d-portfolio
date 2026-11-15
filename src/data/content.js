// Every fact on the site lives here — the sections only arrange it. Nothing in this file is made up:
// it is carried over from the previous version of the site and the projects' own repositories.

export const PERSON = {
  name: 'Vincent Fidanli',
  role: 'Fullstack Developer',
  email: 'vincent@fidanli.de',
  available: 'verfügbar ab 2029',
  looking: 'Praktika & Werkstudentenstellen',
}

export const CHANNELS = [
  { label: 'E-Mail', value: 'vincent@fidanli.de', href: 'mailto:vincent@fidanli.de' },
  { label: 'Telefon', value: '0151 70801974', href: 'tel:+4915170801974' },
  { label: 'GitHub', value: '@applejuicedev', href: 'https://github.com/applejuicedev' },
  { label: 'Instagram', value: '@arcterxandapple', href: 'https://instagram.com/arcterxandapple' },
]

// ── Projects ───────────────────────────────────────────────────
// Each project is shown as an app window (Projects.jsx) and opens into a sheet with its story.
// story: problem / lösung / ergebnis; **key phrases** are set in ink.
// video: loop recorded from the real application (public/videos/<slug>.webm + .jpg poster).
export const PROJECTS = [
  {
    slug: 'dienstzeit',
    title: 'Dienstzeit',
    kind: 'iOS-App',
    year: '2025 –',
    status: 'In Arbeit',
    lede: 'Dienstzeiterfassung für Soldaten – die Konten rechnen nach den echten Regeln.',
    story: [
      ['problem', 'Soldaten führen ihre **Dienstzeit meist auf Papier**, das Geschäftszimmer überträgt sie in die Buchungsliste. Ob Stunden-, FvD- und Urlaubskonto stimmen, ist nach SAZV und § 30c SG **kaum nachzurechnen**.'],
      ['lösung', 'Eine iOS-App mit **täglicher Erfassung und Erinnerung**. 18 Buchungsarten vom Grundbetrieb bis zur Übung rechnen Pausen, Mehrarbeit und FvD-Tage **nach den echten Regeln**. Am Monatsende entsteht ein PDF im Layout der Buchungsliste.'],
      ['ergebnis', 'Die **Konten sind jederzeit aktuell**, der Stundenzettel wird nur noch abgeschrieben. Die Rechenlogik ist **per Test gegen eine echte Buchungsliste** geprüft, alle Daten bleiben auf dem Gerät.'],
    ],
    // short facts pinned around the demo — each one is stated in the story above
    callouts: ['18 Buchungsarten', 'PDF im Layout der Buchungsliste', 'Daten bleiben auf dem Gerät'],
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'],
    links: [{ label: 'Landingpage', href: 'https://dienstzeit-app.de' }],
    repo: 'Applejuicedev/dienstzeit-app',
    video: { frame: 'phone', label: 'Demo der App Dienstzeit: Heute wird als Tätigkeit nach § 30c eingetragen und das FvD-Konto steigt auf 1; im Monatskalender werden die offenen Tage ausgefüllt, der PDF-Monatsbericht erscheint; der Montag wird zu Urlaub, das Urlaubskonto zeigt 29 Tage.' },
    surface: '#06110B',
  },
  {
    slug: 'creators-journal',
    title: "Creator's Journal",
    kind: 'Web-App',
    year: '2025',
    status: 'Live',
    lede: 'Planen, reflektieren, trainieren – an einem Ort, lokal auf dem eigenen Rechner.',
    story: [
      ['problem', 'Tagesplanung, Reflexion und Training lagen bei mir **verteilt in verschiedenen Apps und Notizen**. Es fehlte ein Ort, an dem ich plane, reflektiere und sehe, **ob mein Training vorankommt**.'],
      ['lösung', 'Ein **lokales Tagesjournal** (Next.js, SQLite): morgens Zeitplan per Ziehen wie im Kalender, abends Tagescheck und Reflexion, dazu Wochen- und Monatsplanung. Workouts kommen **automatisch über die Hevy-API**.'],
      ['ergebnis', 'Ein **System, das ich selbst nutze**: Fortschrittsdiagramme pro Übung mit Bestleistungen, Tagescheck-Verlauf über 30 Tage und Zeitplan-Export für den Kalender. **Alle Daten bleiben lokal.**'],
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Hevy API'],
    // the repository is private, so there is no public link to it
    links: [],
    repo: 'Applejuicedev/creators-journal',
    video: { frame: 'screen', label: "Demo von Creator's Journal: Im Zeitplan entsteht per Ziehen eine Timebox mit Titel, ein Tagesziel und ein To-do werden eingetragen und abgehakt, abends Tagescheck 8 und ein Tageserfolg, im Wochenrückblick füllt sich das Lebensrad." },
    surface: '#18181b',
  },
  {
    slug: 'portfolio',
    title: 'Diese Website',
    kind: 'Web',
    year: '2026',
    status: 'Live',
    lede: 'Kein Screenshot: Das Projekt läuft gerade in deinem Browser.',
    story: [
      ['problem', 'Viele Portfolios **behaupten Fullstack** in einem Satz. Ich wollte, dass die Seite **selbst die Arbeitsprobe** ist – gestaltet wie ein Designprojekt, gebaut wie eine Anwendung.'],
      ['lösung', 'Eine helle Oberfläche in **Liquid Glass**, wie Apple sie mit iOS 26 eingeführt hat: ein **Terminal, das die Seite startet**, Mi als Begleiter, Spotlight als Suche und für jeden Abschnitt **eine eigene Scroll-Choreografie**.'],
      ['ergebnis', 'Keine Effekt-Bibliothek außer GSAP: **React, GSAP und Tailwind**. Alles ist **per Tastatur bedienbar**, und mit reduzierter Bewegung steht die Seite still.'],
    ],
    tech: ['React', 'GSAP', 'Three.js', 'Tailwind CSS', 'Vite'],
    links: [{ label: 'Quellcode', href: 'https://github.com/Applejuicedev/3d-portfolio' }],
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

// from/to in years (fractions for months); open: the end is not fixed yet; state: pausiert / geplant
export const STATIONS = [
  { from: 2020, to: 2022, when: '2020 – 2022', title: 'Medien- & Gestaltungstechnischer Assistent', org: 'Berufliche Schule Butzbach', href: LINKS.BSB, note: 'DQR-Niveau 4 · schulischer Teil des Fachabiturs' },
  { from: 2022, to: 2023, when: '2022 – 2023', title: 'Fachabitur', org: 'Berufliche Schule Butzbach', href: LINKS.BSB, note: 'Abschluss aus Ausbildung und Praktikum' },
  { from: 2023, to: 2024, when: '2023 – 2024', title: 'Praktikum als Webentwickler', org: 'Mastercode Applications', note: '6 Monate · React, agile Methoden · praktischer Teil des Fachabiturs' },
  { from: 2024.17, to: 2025.67, when: '03/2024 – 08/2025', title: 'Nachtschicht im Briefzentrum', org: 'DHL', href: LINKS.DHL, note: 'Nebenjob' },
  { from: 2024, to: 2025, when: '2024 – 2025', title: 'Medieninformatik Studium', org: 'Technische Hochschule Mittelhessen', href: LINKS.THM, note: 'nach 2 Semestern pausiert', state: 'pausiert' },
  { from: 2025, to: 2029, open: true, when: '2025 – mind. 2029', title: 'Soldat auf Zeit', org: 'Bundeswehr · Leichter Späher', note: 'Disziplin, Teamfähigkeit und mentale Stärke' },
  { from: 2027, to: 2031, open: true, when: 'ab 2027', title: 'Medieninformatik Fernstudium (B.Sc.)', org: 'IU Internationale Hochschule', href: LINKS.IU, note: 'Teilzeit 1 Programm — 48 Monate · parallel zum Dienst', state: 'geplant' },
]

export const CHAPTERS = [
  { label: 'Die Anfänge', hash: 'a1c3f0e', text: 'Meine Leidenschaft für Technik und Gestaltung begann in der schulischen Ausbildung. Dort habe ich die Grundlagen in Design, Medienproduktion und Softwareentwicklung gelegt.' },
  { label: 'Praktikum', hash: '7be21d4', text: 'Im sechsmonatigen Praktikum als Webentwickler bei Mastercode Applications habe ich moderne Technologien und agiles Arbeiten in der Praxis kennengelernt. Seitdem weiß ich: Ich will Anwendungen bauen, die Menschen wirklich nützen.' },
  { label: 'Studium & Nachtschicht', hash: 'c94e0a2', text: 'Das Studium an der THM hat mir gefallen. Parallel habe ich nachts im Briefzentrum bei DHL in Langgöns gearbeitet, und oft fehlte mir die Kraft für Prüfungen und Testate. Gelernt habe ich daraus Disziplin – und dass Erfolg erarbeitet werden muss.' },
  { label: 'Die Entscheidung', hash: '3f8d6b1', text: 'Spätestens im zweiten Semester war klar: Nachtschicht und Studium ließen sich nicht in der Qualität vereinbaren, die ich von mir erwarte. Ich habe das Studium pausiert und meinen Dienst als Soldat angetreten, um mich finanziell und persönlich zu festigen. Weiterstudieren wollte ich eigentlich erst danach, mit dem Berufsförderungsdienst.' },
  { label: 'Heute', hash: 'e05c7f9', head: true, text: 'Im Dienst habe ich gemerkt, dass mir die Mannschaftslaufbahn genug Freiraum für ein Teilzeit-Fernstudium lässt. Zum 1. Januar 2027 nehme ich deshalb den Bachelor of Science in Medieninformatik an der IU wieder auf.' },
]

// the sections, in page order (navigation, Spotlight and the path bar all read this)
export const SECTIONS = [
  { id: 'arbeiten', label: 'Arbeiten', alias: ['projekte', 'work', 'projects'] },
  { id: 'stack', label: 'Skills', alias: ['system', 'skills', 'tech', 'dock'] },
  { id: 'weg', label: 'Über mich', alias: ['about', 'über', 'profil', 'lebenslauf'] },
  { id: 'kontakt', label: 'Kontakt', alias: ['contact', 'mail'] },
]
