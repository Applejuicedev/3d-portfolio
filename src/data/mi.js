// Everything Mi says, in one place: the voice script (scripts/mi-voice.mjs) records every line
// from here — a line changed here needs a new take.

export const IDS = ['start', 'idee', 'arbeiten', 'stack', 'weg', 'kontakt']

// Each section has one spot and one line: when the section arrives, Mi moves there and says it
// (once per visit) — one sentence per section, not one per thing in it. [x, y as share of the viewport, side
// the bubble opens to, line — a list is spoken one after another]. Phones: the lower corners only.
export const SCENES = {
  start: { spots: [
    [0.9, 0.8, 'left', ['Hi, ich bin Mi! Vincent hat mich mit Claude Code gebaut.', 'Scroll los, ich komm mit.']],
  ] },
  idee: { spots: [[0.9, 0.5, 'left', 'Die Bildchen im Satz sind echte Ausschnitte. Fahr mal drüber.']] },
  arbeiten: { spots: [[0.93, 0.84, 'left', 'Seine Projekte – echte Aufnahmen aus den Apps. Scroll weiter, die Galerie läuft seitwärts.']] },
  stack: { spots: [[0.88, 0.72, 'left', 'Sein Werkzeugkasten. Fahr über ein Projekt, dann leuchtet auf, was drinsteckt.']] },
  weg: { spots: [[0.92, 0.3, 'left', 'Hier steht, wer er ist. Die Stationen klappen beim Scrollen auf.']] },
  kontakt: { spots: [[0.9, 0.6, 'left', 'Schreib ihm! Er sucht Praktika und Werkstudentenstellen ab 2029.']] },
}
export const TIPS = [
  '⌘K findet alles auf dieser Seite.',
  'Vincent sucht Praktika und Werkstudentenstellen – ab 2029.',
  'Ich habe die Seite gestartet. Return war deine Idee.',
  'Die Fenster oben laufen mit echten Aufnahmen.',
  'Ich bin Mi – nur CSS, kein Three.js, keine Bilder.',
]

// reactions to the rest of the page
export const SAY = {
  // the very first thing: alone in the middle, before anything else
  intro: 'Hi, ich bin Mi.',
  go: 'Vincent hat mich mit Claude Code gebaut. Scroll los!',
  spotlight: 'Such ruhig – ich warte.',
  copied: 'Kopiert! Jetzt nur noch einfügen.',
  mailed: 'Ich drück die Daumen.',
  wake: 'Oh – hi! Ich war kurz weg.',
  sleep: 'zzz …',
}
