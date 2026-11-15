import { useEffect, useState } from 'react'

// ── Sound ───────────────────────────────────────────────────────
// Two things share one switch: the interface's effects and Mi's voice. The effects are synthesised
// on the spot with WebAudio — no files: soft glassy sines, filtered noise for air, a short shimmer
// of reverb behind everything — quiet and short, the way a system UI sounds. Mi's voice is recorded
// (public/mi/voice, made by scripts/mi-voice.mjs): every line an mp3 plus when each word starts, so
// the words in the bubble can turn black exactly as they are spoken.
// Browsers only let a page make sound after a gesture: the boot's return / Run unlocks it.
const KEY = 'sound'
const read = () => { try { return localStorage.getItem(KEY) !== '0' } catch { return true } }
let enabled = read()
const subs = new Set()
export const soundOn = () => enabled
export function setSound(on) {
  enabled = on
  try { localStorage.setItem(KEY, on ? '1' : '0') } catch { /* private mode: for this visit only */ }
  if (!on) voiceStop()
  else unlock()
  subs.forEach((f) => f(on))
}
export function useSound() {
  const [on, set] = useState(enabled)
  useEffect(() => { subs.add(set); return () => subs.delete(set) }, [])
  return on
}

let ctx, out, dry, verb, fxMeter
function audio() {
  if (ctx) return ctx
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  // everything very quiet and soft: a low master level, the top end rolled off
  const soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 4200; soft.Q.value = 0.5
  soft.connect(ctx.destination)
  out = ctx.createGain(); out.gain.value = 0.16
  // a short, bright room: decaying noise as the impulse response
  verb = ctx.createConvolver()
  const len = ctx.sampleRate * 1.6, ir = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2) }
  verb.buffer = ir
  const wet = ctx.createGain(); wet.gain.value = 0.1
  verb.connect(wet).connect(soft)
  out.connect(soft); out.connect(verb)
  fxMeter = ctx.createAnalyser(); fxMeter.fftSize = 256; out.connect(fxMeter)
  // the keyboard plays dry: close, in the room only a little
  dry = ctx.createGain(); dry.gain.value = 0.13
  const send = ctx.createGain(); send.gain.value = 0.12
  dry.connect(soft); dry.connect(fxMeter); dry.connect(send).connect(verb)
  return ctx
}
// call from a user gesture
export function unlock() {
  const c = audio()
  if (c?.state === 'suspended') c.resume()
  voice.muted = false
}
const live = () => enabled && ctx && ctx.state === 'running'

// one voice: a sine (or other wave) gliding from f0 to f1 with an attack/decay envelope
function tone({ f0, f1 = f0, at = 0, dur = 0.12, gain = 0.2, type = 'sine', attack = 0.005, q, lp, to = out }) {
  const t = ctx.currentTime + at
  attack = Math.max(attack, 0.006)
  const o = ctx.createOscillator(), g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur)
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  let node = o.connect(g)
  if (lp) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp; if (q) f.Q.value = q; node = node.connect(f) }
  node.connect(to)
  o.start(t); o.stop(t + dur + 0.05)
}
let noiseBuf
function noise({ at = 0, dur = 0.3, gain = 0.12, type = 'bandpass', f0 = 400, f1 = 3000, q = 1.2, attack, to = out }) {
  if (!noiseBuf) { noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1 }
  const t = ctx.currentTime + at
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain()
  s.buffer = noiseBuf
  f.type = type; f.Q.value = q
  f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur)
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + Math.max(0.005, attack ?? dur * 0.35)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  s.connect(f).connect(g).connect(to)
  s.start(t, Math.random()); s.stop(t + dur + 0.05)
}

// ── The palette: physical, not electronic ──
// Every sound is a tiny impulse ringing a few tuned resonators — the way a fingertip sounds on felt,
// wood or glass — rather than an oscillator beeping. Soft, short and very quiet, closer to an
// iPhone's haptics than to a game: felt taps for clicks, a drop of water for things appearing,
// soft wood (a marimba bar) for the moments that matter, breath for movement.
// strike: a short burst of noise (the touch) into resonant band-passes (the body), each [freq, Q, gain]
function strike({ at = 0, modes, touch = 0.004, gain = 1, to = out, tone: tint = 1 }) {
  const t = ctx.currentTime + at
  if (!noiseBuf) { noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1 }
  const src = ctx.createBufferSource(); src.buffer = noiseBuf
  const env = ctx.createGain()
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(gain, t + 0.0008); env.gain.exponentialRampToValueAtTime(0.0001, t + touch)
  src.connect(env)
  for (const [f, q, g] of modes) {
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * tint; bp.Q.value = q
    const lvl = ctx.createGain(); lvl.gain.value = g
    env.connect(bp).connect(lvl).connect(to)
  }
  src.start(t, Math.random()); src.stop(t + touch + 0.02)
}
// felt: a dull, soft tap (clicks, keys)
const felt = (o = {}) => strike({ modes: [[620, 6, 2.2], [1450, 9, 1.1], [3100, 12, 0.35]], touch: 0.006, ...o })
// wood: a marimba bar — fundamental, the 4th and the 10th partial, ringing longer
const wood = (f, o = {}) => strike({ modes: [[f, 90, 3.2], [f * 3.99, 60, 0.9], [f * 9.2, 40, 0.25]], touch: 0.003, ...o })
// a drop of water: a sine whose pitch leaps up as it closes
const drop = ({ at = 0, f = 380, gain = 0.09, to = out } = {}) => {
  const t = ctx.currentTime + at, o = ctx.createOscillator(), g = ctx.createGain()
  o.type = 'sine'; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 2.6, t + 0.045)
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  o.connect(g).connect(to); o.start(t); o.stop(t + 0.12)
}
// breath: air through a slowly opening filter (movement, transitions)
const breath = ({ at = 0, dur = 0.6, from = 300, to: f1 = 1800, gain = 0.035 } = {}) => noise({ at, dur, gain, type: 'bandpass', f0: from, f1, q: 0.7, attack: dur * 0.45 })

const SFX = {
  // the boot (terminal): a key, a step done, ready, the window opening out to the page
  key: (kind) => felt({ gain: kind === 'space' || kind === 'enter' ? 0.8 : 0.55, tone: kind === 'space' || kind === 'enter' ? 0.8 : 0.95 + Math.random() * 0.1, to: dry }),
  ok: () => wood(784, { gain: 0.55 }),
  ready: () => { wood(523.25, { gain: 0.6 }); wood(784, { at: 0.11, gain: 0.5 }) },
  whoosh: () => breath({ dur: 0.9, from: 250, to: 1400, gain: 0.03 }),
  // Mi
  arrive: () => drop({ f: 360 }),
  spin: () => drop({ f: 460, gain: 0.07 }),
  // the page
  snap: () => felt({ gain: 0.6, to: dry }),
  open: () => breath({ dur: 0.45, from: 400, to: 1600 }),
  close: () => breath({ dur: 0.35, from: 1400, to: 380 }),
  chime: () => { wood(659.25, { gain: 0.45 }); wood(987.77, { at: 0.09, gain: 0.35 }) },
  // the process section: a click, a moment (n picks the note), a detent, a selection, the flow
  tick: () => felt({ gain: 0.5, to: dry }),
  tink: (n = 0) => wood([523.25, 587.33, 659.25, 783.99, 880, 1046.5][n % 6], { gain: 0.45 }),
  detent: () => felt({ gain: 0.18, tone: 1.6, to: dry }),
  pop: () => drop({ f: 420, gain: 0.07 }),
  swish: () => breath({ dur: 0.5, from: 500, to: 2200, gain: 0.025 }),
}
// the same effect at most every 30 ms (typing, ticks)
const last = {}
export function sfx(name, arg) {
  if (!live() || !SFX[name]) return
  const now = performance.now()
  if (now - (last[name] ?? 0) < 30) return
  last[name] = now
  SFX[name](arg)
}

// ── Mi's voice ──
// manifest: { [line]: { src, ms, words: [start ms of each word] } }
const voice = typeof Audio !== 'undefined' ? new Audio() : null
if (voice) voice.preload = 'auto'
const VOICE_GAIN = 0.15
let manifest = null
const ready = fetch('/mi/voice/manifest.json', { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({})).then((m) => { manifest = m; return m })
// a level meter on the voice (for Mi's mouth)
let analyser, levelBuf, wired = false
function wire() {
  if (wired || !ctx || !voice) return
  wired = true
  try {
    const src = ctx.createMediaElementSource(voice)
    analyser = ctx.createAnalyser(); analyser.fftSize = 512; levelBuf = new Uint8Array(analyser.fftSize)
    // quiet: about a seventh of its recorded loudness (the meter reads before the gain, so the mouth still moves fully)
    const gain = ctx.createGain(); gain.gain.value = VOICE_GAIN
    src.connect(analyser); analyser.connect(gain); gain.connect(ctx.destination)
  } catch { voice.volume = VOICE_GAIN /* no analyser: the mouth moves on the words instead */ }
}
export function voiceLevel() {
  if (!analyser || voice.paused) return 0
  analyser.getByteTimeDomainData(levelBuf)
  let s = 0
  for (let i = 0; i < levelBuf.length; i++) { const v = (levelBuf[i] - 128) / 128; s += v * v }
  return Math.min(1, Math.sqrt(s / levelBuf.length) * 4)
}
// how loud the page is right now, 0–1: Mi's voice or the effects, whichever is louder (the hero's drop trembles with it)
const rms = (an, buf) => { an.getByteTimeDomainData(buf); let s = 0; for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; s += v * v } return Math.sqrt(s / buf.length) }
let fxBuf
export function soundLevel() {
  if (!live()) return 0
  let fx = 0
  if (fxMeter) { fxBuf ??= new Uint8Array(fxMeter.fftSize); fx = Math.min(1, rms(fxMeter, fxBuf) * 8) }
  return Math.max(fx, voiceLevel())
}
export const voiceTake = (line) => manifest?.[line]
export function voiceStop() { if (voice && !voice.paused) voice.pause() }
// plays a line; resolves to its take ({ ms, words }) once it is really playing, or null (silent)
export async function voicePlay(line) {
  await ready
  const take = manifest?.[line]
  if (!take || !live() || !voice) return null
  wire()
  voice.src = take.src
  try {
    await Promise.race([voice.play(), new Promise((_, no) => setTimeout(no, 700))])
    return take
  } catch { voice.pause(); return null }
}
