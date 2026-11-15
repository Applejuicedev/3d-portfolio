// Speaks one line with a macOS voice into a WAV and prints when each word starts (JSON on stdout).
// usage: swift mi-voice.swift "<text>" out.wav [voice identifier]
import AVFoundation

let args = CommandLine.arguments
let text = args[1], out = URL(fileURLWithPath: args[2])
let voices = AVSpeechSynthesisVoice.speechVoices().filter { $0.language == "de-DE" }
let voice = args.count > 3 ? AVSpeechSynthesisVoice(identifier: args[3]) : voices.max { $0.quality.rawValue < $1.quality.rawValue }
let synth = AVSpeechSynthesizer()
let utt = AVSpeechUtterance(string: text)
utt.voice = voice
utt.rate = AVSpeechUtteranceDefaultSpeechRate * 1.02
var file: AVAudioFile?
var rate = 0.0
var words: [[Int]] = []
var finished = false
synth.write(utt, toBufferCallback: { buf in
  guard let pcm = buf as? AVAudioPCMBuffer, pcm.frameLength > 0 else { finished = true; return }
  if file == nil {
    rate = pcm.format.sampleRate
    file = try! AVAudioFile(forWriting: out, settings: pcm.format.settings, commonFormat: pcm.format.commonFormat, interleaved: pcm.format.isInterleaved)
  }
  try! file!.write(from: pcm)
}, toMarkerCallback: { markers in
  for m in markers where m.mark == .word { words.append([m.textRange.location, Int(m.byteSampleOffset)]) }
})
while !finished { RunLoop.current.run(until: Date().addingTimeInterval(0.05)) }
let json: [String: Any] = ["voice": voice?.identifier ?? "", "rate": rate, "words": words]
print(String(data: try! JSONSerialization.data(withJSONObject: json), encoding: .utf8)!)
