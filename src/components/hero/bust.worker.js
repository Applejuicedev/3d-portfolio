// Samples the bust off the main thread (~60 ms of maths that would otherwise stall the hero's
// first animations) and hands the arrays back without copying.
import { sampleBust } from './bustGeometry'

self.onmessage = (e) => {
  const b = sampleBust(e.data.count)
  const pos = b.pos.slice(), nor = b.nor.slice(), rnd = b.rnd.slice()
  self.postMessage({ pos, nor, rnd, count: b.count }, [pos.buffer, nor.buffer, rnd.buffer])
}
