// The desk's own sounds, synthesised on the spot (Web Audio) — no files. Each is a few
// milliseconds of oscillator or noise with a quick envelope: soft enough to stay out of the way,
// distinct enough to tell an opening from a closing with the eyes shut. Off is remembered.
let ctx = null, master = null
let muted = (() => { try { return localStorage.getItem('vf-desk-sound') === 'off' } catch { return false } })()
let volume = 0.6

const ac = () => {
  if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = volume; master.connect(ctx.destination) }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}
// one voice: an oscillator gliding from f to f2, shaped by a short attack and an exponential fall
function voice({ f = 600, f2 = f, dur = 0.08, type = 'sine', gain = 0.16, at = 0, attack = 0.004 }) {
  const c = ac(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain()
  o.type = type; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + dur)
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02)
}
// a breath of filtered noise — the "tick" in a click
function hiss({ dur = 0.018, freq = 3200, q = 1.2, gain = 0.12, at = 0 }) {
  const c = ac(), t = c.currentTime + at, len = Math.ceil(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
  const s = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain()
  s.buffer = buf; bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q; g.gain.value = gain
  s.connect(bp).connect(g).connect(master); s.start(t)
}

// the sounds, by name — with a line each for the sounds window, which plays them like a record
export const SOUNDS = [
  { id: 'click', title: 'Tick', note: 'any button', play: () => { hiss({}); voice({ f: 1900, f2: 1300, dur: 0.03, gain: 0.05 }) } },
  { id: 'open', title: 'Unfold', note: 'a window opens', play: () => { voice({ f: 523, f2: 540, dur: 0.16, type: 'triangle', gain: 0.12 }); voice({ f: 784, f2: 800, dur: 0.22, type: 'sine', gain: 0.09, at: 0.055 }) } },
  { id: 'close', title: 'Fold', note: 'a window closes', play: () => { voice({ f: 700, f2: 420, dur: 0.12, type: 'triangle', gain: 0.1 }); hiss({ dur: 0.03, freq: 1400, gain: 0.05 }) } },
  { id: 'toggle', title: 'Switch', note: 'theme, sound', play: () => { voice({ f: 880, dur: 0.035, type: 'square', gain: 0.035 }); voice({ f: 1320, dur: 0.05, type: 'square', gain: 0.03, at: 0.045 }) } },
  { id: 'grab', title: 'Lift', note: 'picking a window up', play: () => voice({ f: 180, f2: 240, dur: 0.06, gain: 0.12 }) },
  { id: 'drop', title: 'Set down', note: 'letting it go', play: () => voice({ f: 240, f2: 150, dur: 0.08, gain: 0.12 }) },
  { id: 'select', title: 'Bell', note: 'choosing in the ring', play: () => { voice({ f: 1046, dur: 0.5, gain: 0.08 }); voice({ f: 2093, dur: 0.3, gain: 0.02 }) } },
  { id: 'step', title: 'Detent', note: 'turning the ring', play: () => hiss({ dur: 0.012, freq: 5200, q: 3, gain: 0.08 }) },
  { id: 'key', title: 'Key', note: 'typing in the terminal', play: () => hiss({ dur: 0.01, freq: 2400 + Math.random() * 900, q: 2, gain: 0.06 }) },
  { id: 'notify', title: 'Ping', note: 'a notification arrives', play: () => { voice({ f: 1318, dur: 0.18, gain: 0.07 }); voice({ f: 1760, dur: 0.3, gain: 0.06, at: 0.09 }) } },
  { id: 'rise', title: 'Rise', note: 'a story window comes up', play: () => voice({ f: 330, f2: 660, dur: 0.22, type: 'triangle', gain: 0.07 }) },
  { id: 'glitch', title: 'Glitch', note: 'something is spreading', play: () => { for (let i = 0; i < 5; i++) voice({ f: 80 + Math.random() * 900, f2: 40 + Math.random() * 1600, dur: 0.06, type: 'sawtooth', gain: 0.05, at: i * 0.05 }) } },
  { id: 'tidy', title: 'Shuffle', note: 'tidying the desk', play: () => [0, 0.05, 0.1, 0.15].forEach((at, i) => voice({ f: 400 + i * 120, dur: 0.07, type: 'triangle', gain: 0.06, at })) },
]
const BY = Object.fromEntries(SOUNDS.map((s) => [s.id, s]))

export function play(id, force = false) {
  if ((muted && !force) || !BY[id]) return
  try { BY[id].play() } catch { /* no audio here */ }
}
export const isMuted = () => muted
export function setMuted(m) { muted = m; try { localStorage.setItem('vf-desk-sound', m ? 'off' : 'on') } catch {} }
export const getVolume = () => volume
export function setVolume(v) { volume = v; if (master) master.gain.value = v }
