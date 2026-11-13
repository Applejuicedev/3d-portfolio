// ── ASCII rasterizer ────────────────────────────────────────────
// A tiny software renderer: a (2,3) torus knot is sampled once into points with normals; every
// frame they are rotated, projected onto a grid of character cells, depth-tested per cell, lit by
// one directional light and written as glyphs from a brightness ramp. No WebGL, no library — a
// few typed arrays and fillText per row.

export const RAMPS = {
  standard: ' .,:;-=+*cxoO#%@',
  blocks: ' ░░▒▒▓▓█',
  binary: ' 0101011',
}
// glyphs the surface turns into under the pointer: it "decompiles" into code
const CODE = '{}[]()<>/=;:+*&|!?01$#'

// Samples the tube around a (2,3) torus knot. Returns interleaved position/normal arrays.
export function knot(segments = 560, sides = 30, tube = 0.42) {
  const n = segments * sides
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3)
  const curve = (t) => {
    const r = 2 + Math.cos(3 * t)
    return [r * Math.cos(2 * t), r * Math.sin(2 * t), Math.sin(3 * t)]
  }
  let k = 0
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const c = curve(t), c2 = curve(t + 1e-3)
    // tangent, and a frame around it: N ⟂ T built from the radial direction (never parallel to T
    // on this knot), B = T × N
    let tx = c2[0] - c[0], ty = c2[1] - c[1], tz = c2[2] - c[2]
    let l = Math.hypot(tx, ty, tz); tx /= l; ty /= l; tz /= l
    let nx = ty * c[2] - tz * c[1], ny = tz * c[0] - tx * c[2], nz = tx * c[1] - ty * c[0]
    l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l
    const bx = ty * nz - tz * ny, by = tz * nx - tx * nz, bz = tx * ny - ty * nx
    for (let j = 0; j < sides; j++) {
      const v = (j / sides) * Math.PI * 2, cv = Math.cos(v), sv = Math.sin(v)
      const ox = cv * nx + sv * bx, oy = cv * ny + sv * by, oz = cv * nz + sv * bz
      pos[k] = c[0] + tube * ox; pos[k + 1] = c[1] + tube * oy; pos[k + 2] = c[2] + tube * oz
      nor[k] = ox; nor[k + 1] = oy; nor[k + 2] = oz
      k += 3
    }
  }
  return { pos, nor, count: n, extent: 3.5 }
}

const hash = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

// A renderer bound to one canvas. `frame(state)` draws one image; returns the number of lit cells.
export function createRenderer(canvas, mesh) {
  const ctx = canvas.getContext('2d', { alpha: true })
  let cols = 0, rows = 0, cw = 0, ch = 0, fs = 0, zbuf, lum, w = 0, h = 0

  function resize(width, height, fontSize) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = width; h = height; fs = fontSize
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.font = `${fontSize}px "Geist Mono", ui-monospace, monospace`
    ctx.textBaseline = 'top'
    cw = ctx.measureText('M').width; ch = Math.round(fontSize * 1.18)
    cols = Math.max(8, Math.floor(width / cw)); rows = Math.max(6, Math.floor(height / ch))
    zbuf = new Float32Array(cols * rows); lum = new Float32Array(cols * rows)
  }

  // s: { ax, ay, az (radians), light: [x,y,z], ramp, zoom, boot (0–1), px, py (pointer in css px,
  // or null), radius (cells), ink, dim, accent, t (seconds) }
  function frame(s) {
    const { pos, nor, count, extent } = mesh
    zbuf.fill(0); lum.fill(-1)
    const ca = Math.cos(s.ax), sa = Math.sin(s.ax), cb = Math.cos(s.ay), sb = Math.sin(s.ay), cc = Math.cos(s.az), sc = Math.sin(s.az)
    // R = Rz · Ry · Rx
    const m00 = cc * cb, m01 = cc * sb * sa - sc * ca, m02 = cc * sb * ca + sc * sa
    const m10 = sc * cb, m11 = sc * sb * sa + cc * ca, m12 = sc * sb * ca - cc * sa
    const m20 = -sb, m21 = cb * sa, m22 = cb * ca
    let [lx, ly, lz] = s.light
    const ll = Math.hypot(lx, ly, lz); lx /= ll; ly /= ll; lz /= ll
    const dist = 9
    // fit: the knot's extent fills `zoom` of the smaller side; cells are taller than wide
    const aspect = cw / ch
    const K = Math.min(cols, rows / aspect) * 0.5 * s.zoom * dist / extent
    const ox = cols / 2, oy = rows / 2
    for (let i = 0, k = 0; i < count; i++, k += 3) {
      const x = pos[k], y = pos[k + 1], z = pos[k + 2]
      const rx = m00 * x + m01 * y + m02 * z, ry = m10 * x + m11 * y + m12 * z, rz = m20 * x + m21 * y + m22 * z
      const ooz = 1 / (rz + dist)
      const c = (ox + K * rx * ooz) | 0, r = (oy - K * ry * ooz * aspect) | 0
      if (c < 0 || c >= cols || r < 0 || r >= rows) continue
      const idx = r * cols + c
      if (ooz <= zbuf[idx]) continue
      zbuf[idx] = ooz
      const nx = nor[k], ny = nor[k + 1], nz = nor[k + 2]
      const nnx = m00 * nx + m01 * ny + m02 * nz, nny = m10 * nx + m11 * ny + m12 * nz, nnz = m20 * nx + m21 * ny + m22 * nz
      // facing the viewer (-z) and the light; a little ambient so the dark side still reads
      lum[idx] = Math.max(0, nnx * lx + nny * ly - nnz * lz) * 0.88 + 0.12
    }

    ctx.clearRect(0, 0, w, h)
    const ramp = s.ramp, rl = ramp.length - 1
    const pcx = s.px == null ? -1e4 : s.px / cw, pcy = s.py == null ? -1e4 : s.py / ch
    const R = s.radius
    const tick = Math.floor(s.t * 9)
    let lit = 0
    const hot = []
    // two tones per row (dim for the shadowed half of the ramp, ink for the lit half), so depth reads
    for (let r = 0; r < rows; r++) {
      let dimRow = '', inkRow = ''
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c, L = lum[idx]
        if (L < 0) { dimRow += ' '; inkRow += ' '; continue }
        lit++
        // boot: cells resolve from noise into the surface in a random order
        if (s.boot < 1 && hash(idx) > s.boot) { dimRow += CODE[(idx + tick) % CODE.length]; inkRow += ' '; continue }
        const dx = c - pcx, dy = (r - pcy) * (ch / cw) * 0.55
        const d = Math.hypot(dx, dy)
        if (d < R && hash(idx * 3.1) < 1 - d / R + 0.25) {
          hot.push(c, r, idx); dimRow += ' '; inkRow += ' '; continue
        }
        const g = ramp[Math.max(1, Math.min(rl, Math.round(L * rl)))]
        if (L > 0.55) { inkRow += g; dimRow += ' ' } else { dimRow += g; inkRow += ' ' }
      }
      const y = r * ch
      ctx.fillStyle = s.dim; ctx.fillText(dimRow, 0, y)
      ctx.fillStyle = s.ink; ctx.fillText(inkRow, 0, y)
    }
    if (hot.length) {
      ctx.fillStyle = s.accent
      for (let i = 0; i < hot.length; i += 3) {
        const idx = hot[i + 2]
        ctx.fillText(CODE[Math.floor(hash(idx + tick * 0.37) * CODE.length)], hot[i] * cw, hot[i + 1] * ch)
      }
    }
    return lit
  }

  return { resize, frame, get grid() { return { cols, rows, cw, ch, fs } } }
}

// shared live numbers (the hero renderer reports here; the portfolio entry shows them)
export const stats = { fps: 0, cells: 0, points: 0, cols: 0, rows: 0 }
