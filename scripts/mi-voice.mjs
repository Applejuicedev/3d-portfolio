// Records Mi's voice: every line Mi can say (src/data/mi.js) becomes an mp3
// in public/mi/voice with the start of each word, listed in public/mi/voice/manifest.json — the
// page turns the words black on those times (lib/sound.js, ui/Buddy.jsx). Lines already recorded
// are kept; a changed line gets a new take, a line no longer used is dropped.
//
//   ELEVENLABS_API_KEY=… [ELEVENLABS_VOICE=<voice id>] node scripts/mi-voice.mjs   natural voice (ElevenLabs)
//   [MI_VOICE=<macOS voice identifier>] node scripts/mi-voice.mjs                  a macOS voice (Swift, AVSpeech)
//   … --force   records every line again
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SCENES, TIPS, SAY } from '../src/data/mi.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// the key may live in .env.local (never committed): ELEVENLABS_API_KEY=…, optionally ELEVENLABS_VOICE=…
const envFile = join(root, '.env.local')
if (existsSync(envFile)) for (const line of readFileSync(envFile, 'utf8').split('\n')) { const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '') }
const dir = join(root, 'public/mi/voice'), manifestPath = join(dir, 'manifest.json')
mkdirSync(dir, { recursive: true })
const force = process.argv.includes('--force')

const lines = [...new Set([
  ...Object.values(SCENES).flatMap((s) => s.spots.flatMap((sp) => [sp[3]].flat())),
  ...TIPS, ...Object.values(SAY).flat(),
])]
const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}
const engine = process.env.ELEVENLABS_API_KEY ? 'elevenlabs' : 'macos'
const id = (line) => createHash('sha1').update(`${engine}:${line}`).digest('hex').slice(0, 12)
// words as the page splits them (on spaces) → the character where each one starts
const starts = (line) => { const s = []; let at = 0; for (const w of line.split(' ')) { s.push(at); at += w.length + 1 } return s }
const ms = (file) => Math.round(parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString()) * 1000)

async function elevenlabs(line, mp3) {
  const voice = process.env.ELEVENLABS_VOICE || 'EXAVITQu4vr4xnSDxMaL' // Sarah: a soft, clear female voice; any voice id works
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ text: line, model_id: 'eleven_multilingual_v2', language_code: 'de', voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true } }),
  })
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${await r.text()}`)
  const j = await r.json()
  writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'))
  const t = j.alignment.character_start_times_seconds
  return starts(line).map((c) => Math.round((t[c] ?? t[t.length - 1]) * 1000))
}

function macos(line, mp3) {
  const wav = mp3.replace(/\.mp3$/, '.wav')
  const args = [join(root, 'scripts/mi-voice.swift'), line, wav, ...(process.env.MI_VOICE ? [process.env.MI_VOICE] : [])]
  const info = JSON.parse(execFileSync('swift', args).toString())
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-af', 'silenceremove=start_periods=1:start_threshold=-50dB', '-codec:a', 'libmp3lame', '-q:a', '3', mp3])
  rmSync(wav)
  // the voice's word marks, by character → the page's words; a word without a mark takes the one before
  const marks = info.words.map(([c, s]) => [c, (s / info.rate) * 1000])
  if (!marks.length) {
    // the compact voices give no marks: spread the words over the take by their length, a pause after punctuation
    const ws = line.split(' '), weight = ws.map((w) => w.length + 2 + (/[,.!?–:]$/.test(w) ? 4 : 0))
    const sum = weight.reduce((x, y) => x + y, 0), total = ms(mp3)
    let acc = 0
    return weight.map((w) => { const t = Math.round((acc / sum) * total); acc += w; return t })
  }
  const lead = marks[0][1] // silence trimmed from the start
  return starts(line).map((c) => { let t = 0; for (const [mc, mt] of marks) if (mc <= c) t = mt; return Math.max(0, Math.round(t - lead)) })
}

const manifest = {}
for (const line of lines) {
  const name = `${id(line)}.mp3`, file = join(dir, name)
  if (!force && old[line]?.src === `/mi/voice/${name}` && existsSync(file)) { manifest[line] = old[line]; continue }
  process.stdout.write(`${engine} · ${line}\n`)
  const words = engine === 'elevenlabs' ? await elevenlabs(line, file) : macos(line, file)
  manifest[line] = { src: `/mi/voice/${name}`, ms: ms(file), words }
}
const used = new Set(Object.values(manifest).map((t) => t.src.split('/').pop()))
for (const f of readdirSync(dir)) if (f.endsWith('.mp3') && !used.has(f)) rmSync(join(dir, f))
writeFileSync(manifestPath, JSON.stringify(manifest, null, '\t') + '\n')
console.log(`${Object.keys(manifest).length} Zeilen · ${engine}`)
