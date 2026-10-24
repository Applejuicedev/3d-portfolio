// The projects. A new project is one entry: slug (deep link #projekt-<slug>), title, kind, status,
// story (problem / lösung / ergebnis, **key phrases** emphasised), tech, links, and its demo: a
// loop video recorded from the real application (public/videos/<slug>.webm + .jpg poster), the
// frame it is shown in, the product's surface colour and the page tint while it is in focus.
// `self: true` marks this portfolio: it is always listed last, whatever order the entries have.
const ENTRIES = [
  {
    slug: 'portfolio',
    self: true,
    title: 'Portfolio-Website',
    kind: 'Web',
    status: 'Live',
    story: [
      ['problem', 'Viele Portfolios **behaupten Design und Code nur** in einem Satz. Ich wollte eine Seite, die **selbst die Arbeitsprobe** ist – gestaltet wie ein Designprojekt und gebaut wie eine Web-App.'],
      ['lösung', 'Ein **ruhiges, typografisches System**, in dem die Headline **live bearbeitet** wird: Text, dann Figma, dann Code, dann Blender – an einer **Büste aus Partikeln**, die auf Cursor, Scrollen und Klicks reagiert. Die Projekte zeigen echte Aufnahmen der Apps.'],
      ['ergebnis', 'Ruhig auf den ersten Blick, lebendig beim Benutzen. Die 3D-Szene ist **ein einziger Draw-Call** und startet erst, wenn die Headline steht – der Einstieg läuft ohne Ruckeln. Alles ist per Tastatur bedienbar und funktioniert **auch mit reduzierter Bewegung**.'],
    ],
    tech: ['React', 'Three.js', 'GLSL', 'GSAP', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Applejuicedev/3d-portfolio', demo: 'https://vincentfidanli.de',
    repo: 'Applejuicedev/3d-portfolio',
    video: { frame: 'screen', label: 'Demo dieser Website: Die Headline wird bearbeitet – Autokorrektur, Figma-Auswahl, Code im Editor – und die Partikel-Büste daneben wird wie in Blender gedreht und eingefärbt.' },
    surface: '#161615', tint: '#121211',
  },
  {
    slug: 'dienstzeit',
    title: 'Dienstzeit',
    kind: 'iOS-App',
    status: 'In Arbeit',
    story: [
      ['problem', 'Soldaten führen ihre **Dienstzeit meist auf Papier**, das Geschäftszimmer überträgt sie in die Buchungsliste. Ob Stunden-, FvD- und Urlaubskonto stimmen, ist nach SAZV und § 30c SG **kaum nachzurechnen**.'],
      ['lösung', 'Eine iOS-App mit **täglicher Erfassung und Erinnerung**. 18 Buchungsarten vom Grundbetrieb bis zur Übung rechnen Pausen, Mehrarbeit und FvD-Tage **nach den echten Regeln**. Am Monatsende entsteht ein PDF im Layout der Buchungsliste.'],
      ['ergebnis', 'Die **Konten sind jederzeit aktuell**, der Stundenzettel wird nur noch abgeschrieben. Die Rechenlogik ist **per Test gegen eine echte Buchungsliste** geprüft, alle Daten bleiben auf dem Gerät.'],
    ],
    tech: ['React Native', 'Expo SDK 57', 'TypeScript', 'Expo Router', 'SQLite', 'Vitest'],
    demo: 'https://dienstzeit-app.de', demoLabel: 'Landingpage',
    repo: 'Applejuicedev/dienstzeit-app',
    video: { frame: 'phone', label: 'Demo der App Dienstzeit: Heute wird als Tätigkeit nach § 30c eingetragen und das FvD-Konto steigt auf 1; im Monatskalender werden die offenen Tage ausgefüllt, der PDF-Monatsbericht erscheint; der Montag wird zu Urlaub, das Urlaubskonto zeigt 29 Tage.' },
    surface: '#06110B', tint: '#0b120e',
  },
  {
    slug: 'creators-journal',
    title: "Creator's Journal",
    kind: 'Web-App',
    status: 'Live',
    story: [
      ['problem', 'Tagesplanung, Reflexion und Training lagen bei mir **verteilt in verschiedenen Apps und Notizen**. Es fehlte ein Ort, an dem ich plane, reflektiere und sehe, **ob mein Training vorankommt**.'],
      ['lösung', 'Ein **lokales Tagesjournal** (Next.js, SQLite): morgens Zeitplan per Ziehen wie im Kalender, abends Tagescheck und Reflexion, dazu Wochen- und Monatsplanung. Workouts kommen **automatisch über die Hevy-API**.'],
      ['ergebnis', 'Ein **System, das ich selbst nutze**: Fortschrittsdiagramme pro Übung mit Bestleistungen, Tagescheck-Verlauf über 30 Tage und Zeitplan-Export für den Kalender. **Alle Daten bleiben lokal.**'],
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Hevy API'],
    // the repository is private, so there is no public link to it
    repo: 'Applejuicedev/creators-journal',
    video: { frame: 'screen', label: "Demo von Creator's Journal: Im Zeitplan entsteht per Ziehen eine Timebox mit Titel, ein Tagesziel und ein To-do werden eingetragen und abgehakt, abends Tagescheck 8 und ein Tageserfolg, im Wochenrückblick füllt sich das Lebensrad." },
    surface: '#18181b', tint: '#121214',
  },
]

// work first, the portfolio itself always last
export const PROJECTS = [...ENTRIES.filter((p) => !p.self), ...ENTRIES.filter((p) => p.self)]
