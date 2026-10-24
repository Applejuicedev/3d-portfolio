// The hero's bust as a point cloud: an anonymous human head and shoulders in real proportions —
// no face, no hair, nothing that identifies anyone; only the build and the shape of a real head,
// after a classic base-mesh head: a round cranium, the face narrowing over the cheeks to the jaw
// and chin, the jaw running from the chin up to its angle below the ear with a clean underside,
// the neck rising from under the back of the skull and leaning forward, the throat running from
// under the chin down to the chest, broad sloping shoulders. One signed distance field of smooth
// forms, sampled on its surface (points pulled onto it along the gradient). Deterministic.
// Units: chin y −0.95, crown y 1.25, the face looking along +z.

const len = (x, y, z) => Math.sqrt(x * x + y * y + z * z)
const ellipsoid = (x, y, z, rx, ry, rz) => {
  const k0 = len(x / rx, y / ry, z / rz), k1 = len(x / (rx * rx), y / (ry * ry), z / (rz * rz))
  return (k0 * (k0 - 1)) / (k1 || 1e-6)
}
const capsule = (x, y, z, ax, ay, az, bx, by, bz, r) => {
  const pax = x - ax, pay = y - ay, paz = z - az, bax = bx - ax, bay = by - ay, baz = bz - az
  const h = Math.max(0, Math.min(1, (pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz)))
  return len(pax - bax * h, pay - bay * h, paz - baz * h) - r
}
const smin = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25 }
const smax = (a, b, k) => -smin(-a, -b, k)
const ss = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t) }

export function sdf(x, y, z) {
  const ax = Math.abs(x) // left/right symmetric
  // head: the large masses of a real head
  let d = ellipsoid(x, y - 0.4, z + 0.1, 0.74, 0.82, 0.88)                       // cranium, round, long towards the back
  d = smin(d, ellipsoid(x, y - 0.02, z - 0.28, 0.63, 0.6, 0.5), 0.26)            // the face, upright
  d = smin(d, ellipsoid(ax - 0.36, y - 0.02, z - 0.36, 0.22, 0.15, 0.24), 0.2)   // cheeks
  d = smin(d, ellipsoid(x, y + 0.4, z - 0.1, 0.61, 0.56, 0.6), 0.24)             // jaw mass, nearly as wide as the cranium
  d = smin(d, ellipsoid(x, y + 0.8, z - 0.38, 0.3, 0.17, 0.21), 0.22)            // chin, rounded square
  d = smax(d, -ellipsoid(x, y + 1.27, z - 0.24, 0.74, 0.34, 0.56), 0.1)          // clean underside of the jaw
  // neck: from under the back of the skull, leaning forward into the chest
  d = smin(d, capsule(x, y, z, 0, -0.3, -0.36, 0, -1.75, 0.0, 0.33), 0.1)
  // trapezius: from the neck sloping down to the shoulders
  d = smin(d, capsule(ax, y, z, 0.24, -1.45, -0.24, 1.32, -1.98, -0.12, 0.22), 0.3)
  // chest and shoulders: broad, a gentle slope, cut below
  let torso = ellipsoid(x, y + 2.52, z + 0.04, 1.62, 0.82, 0.62)
  torso = smin(torso, ellipsoid(ax - 1.2, y + 2.2, z + 0.06, 0.4, 0.34, 0.44), 0.35)   // deltoids
  d = smin(d, torso, 0.4)
  return Math.max(d, -2.85 - y)                                                   // cut flat below
}

// tiny seeded PRNG (mulberry32)
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// count points on the surface: positions, normals, and a random vec4 per point (xyz a random
// direction for scattering, w a 0..1 value for size, timing and flutter)
export function sampleBust(count, seed = 7) {
  const r = rng(seed), e = 0.004
  const pos = new Float32Array(count * 3), nor = new Float32Array(count * 3), rnd = new Float32Array(count * 4)
  let n = 0, guard = 0
  while (n < count && guard++ < count * 30) {
    let x = (r() * 2 - 1) * 2.0, y = -2.85 + r() * 4.15, z = (r() * 2 - 1) * 1.2
    let gx = 0, gy = 0, gz = 0, d = 0
    for (let i = 0; i < 4; i++) {
      d = sdf(x, y, z)
      gx = sdf(x + e, y, z) - sdf(x - e, y, z); gy = sdf(x, y + e, z) - sdf(x, y - e, z); gz = sdf(x, y, z + e) - sdf(x, y, z - e)
      const gl = len(gx, gy, gz) || 1
      gx /= gl; gy /= gl; gz /= gl
      x -= gx * d; y -= gy * d; z -= gz * d
    }
    if (Math.abs(d) > 0.012 || y < -2.83) continue
    // where the detail is, the points are: the face densest, the head, then neck and shoulders
    // the head gets most points, neck and shoulders fewer
    const keep = y > -0.95 ? 1 : y > -1.5 ? 0.42 : 0.24
    if (r() > keep) continue
    // a little depth below the skin, so the surface reads as a soft volume, not a shell
    const inset = -r() * r() * 0.05
    pos[n * 3] = x + gx * inset; pos[n * 3 + 1] = y + gy * inset; pos[n * 3 + 2] = z + gz * inset
    nor[n * 3] = gx; nor[n * 3 + 1] = gy; nor[n * 3 + 2] = gz
    const u = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - u * u)
    rnd[n * 4] = s * Math.cos(a); rnd[n * 4 + 1] = u; rnd[n * 4 + 2] = s * Math.sin(a); rnd[n * 4 + 3] = r()
    n++
  }
  return { pos: pos.subarray(0, n * 3), nor: nor.subarray(0, n * 3), rnd: rnd.subarray(0, n * 4), count: n }
}
