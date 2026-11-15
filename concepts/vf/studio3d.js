import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { open } from './wm.js'
import { play } from './sound.js'

// A small 3D studio in a window, dressed like a DCC tool: a shelf to add primitives, an outliner,
// a viewport (orbit with the right button or two fingers, click to select, drag a selected object to
// move it over the ground), and a channel box for exact translate / rotate / scale and a colour.
const SHAPES = {
  cube: () => new THREE.BoxGeometry(1, 1, 1),
  sphere: () => new THREE.SphereGeometry(0.6, 48, 32),
  torus: () => new THREE.TorusGeometry(0.5, 0.18, 32, 96),
  cone: () => new THREE.ConeGeometry(0.55, 1.1, 48),
  cylinder: () => new THREE.CylinderGeometry(0.45, 0.45, 1, 48),
  knot: () => new THREE.TorusKnotGeometry(0.42, 0.13, 160, 24),
}
// new objects come in the desk's own metals; the palette is there to paint them
const STEEL = ['#b9bec2', '#80868b', '#eef0f1']
const COLORS = ['#d9d9d6', '#e0603f', '#e8b04a', '#5aa37a', '#4f86c6', '#8c6bd1', '#222222']

export function studio3d(from) {
  return open('studio3d', from, { title: '3d studio — untitled.scene', width: 860, height: 560, skin: 'maya', place: [0.5, 0.45], minW: 640, minH: 440, build: (b, it) => {
    b.innerHTML = `<div class="my"><div class="menu"><span>File</span><span>Edit</span><span>Create</span><span>Display</span><span>Render</span></div>
      <div class="shelf">${Object.keys(SHAPES).map((k) => `<button data-add="${k}">+ ${k}</button>`).join('')}<span style="flex:1"></span><button data-act="wire">wireframe</button><button data-act="dup">duplicate</button><button data-act="del">delete</button></div>
      <div class="outl"><p style="color:var(--text-tertiary);cursor:default">Outliner</p><div id="o-list"></div></div>
      <div class="vp"><canvas></canvas><p class="hud">LMB select / drag to move · RMB or two fingers orbit · wheel zoom</p></div>
      <div class="cb"><h6>Channel box</h6><div id="cb-fields"></div><h6>Colour</h6><div class="sw">${COLORS.map((c) => `<button data-col="${c}" style="background:${c}" aria-label="Colour ${c}"></button>`).join('')}</div></div></div>`
    const cv = b.querySelector('canvas'), vp = b.querySelector('.vp')
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.shadowMap.enabled = true
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#1a1d1f')
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100); camera.position.set(4.5, 3.6, 5.5)
    const controls = new OrbitControls(camera, cv)
    controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE }
    controls.touches = { ONE: null, TWO: THREE.TOUCH.DOLLY_ROTATE }
    controls.enableDamping = true; controls.target.set(0, 0.4, 0)
    scene.add(new THREE.HemisphereLight('#eef0f1', '#2a2e31', 0.9))
    const sun = new THREE.DirectionalLight('#ffffff', 1.6); sun.position.set(4, 7, 3); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); scene.add(sun)
    const grid = new THREE.GridHelper(12, 24, '#4b5054', '#2a2e31'); scene.add(grid)
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.25 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground)
    const objs = [], counts = {}
    let selected = null, wire = false
    const helper = new THREE.BoxHelper(undefined, '#eef0f1'); helper.visible = false; scene.add(helper)

    const outline = () => {
      b.querySelector('#o-list').innerHTML = objs.map((o, i) => `<p data-i="${i}" class="${o === selected ? 'on' : ''}">${o.name}</p>`).join('')
      b.querySelectorAll('#o-list p').forEach((p) => (p.onclick = () => select(objs[+p.dataset.i])))
    }
    const F = [['translate', 'position', 1], ['rotate', 'rotation', 180 / Math.PI], ['scale', 'scale', 1]]
    const channels = () => {
      const box = b.querySelector('#cb-fields')
      if (!selected) { box.innerHTML = '<p style="color:var(--text-tertiary)">Nothing selected</p>'; return }
      box.innerHTML = `<p style="margin-bottom:6px">${selected.name}</p>` + F.map(([n, k, f]) => ['x', 'y', 'z'].map((a) => `<label>${n} ${a.toUpperCase()}<input type="number" step="${n === 'rotate' ? 5 : 0.1}" data-k="${k}" data-a="${a}" data-f="${f}" value="${(selected[k][a] * f).toFixed(2)}"></label>`).join('')).join('')
      box.querySelectorAll('input').forEach((inp) => (inp.oninput = () => { selected[inp.dataset.k][inp.dataset.a] = +inp.value / +inp.dataset.f; helper.update() }))
    }
    const select = (o) => { selected = o; helper.visible = !!o; if (o) { helper.setFromObject(o); play('select') } outline(); channels() }
    const add = (kind) => {
      counts[kind] = (counts[kind] ?? 0) + 1
      const m = new THREE.Mesh(SHAPES[kind](), new THREE.MeshStandardMaterial({ color: STEEL[objs.length % STEEL.length], roughness: 0.38, metalness: 0.45, wireframe: wire }))
      m.name = `${kind}${counts[kind]}`; m.castShadow = true
      m.geometry.computeBoundingBox(); m.position.set((Math.random() - 0.5) * 3, -m.geometry.boundingBox.min.y, (Math.random() - 0.5) * 3)
      scene.add(m); objs.push(m); select(m); play('open')
    }
    b.querySelectorAll('[data-add]').forEach((x) => (x.onclick = () => add(x.dataset.add)))
    b.querySelector('[data-act=del]').onclick = () => { if (!selected) return; scene.remove(selected); objs.splice(objs.indexOf(selected), 1); select(null); play('close') }
    b.querySelector('[data-act=dup]').onclick = () => { if (!selected) return; const c = selected.clone(); c.material = selected.material.clone(); c.position.x += 1.2; const k = selected.name.replace(/\d+$/, ''); counts[k]++; c.name = k + counts[k]; scene.add(c); objs.push(c); select(c) }
    b.querySelector('[data-act=wire]').onclick = (e) => { wire = !wire; e.currentTarget.classList.toggle('on', wire); objs.forEach((o) => (o.material.wireframe = wire)); play('toggle') }
    b.querySelectorAll('[data-col]').forEach((x) => (x.onclick = () => { if (selected) { selected.material.color.set(x.dataset.col); play('click') } }))
    add('knot'); objs[0].position.set(0, 0.7, 0); add('cube'); objs[1].position.set(-1.8, 0.5, 0.6); select(objs[0])

    // select with a click, move by dragging over the ground plane
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3()
    let dragging = null, offset = new THREE.Vector3()
    const toPtr = (e) => { const r = cv.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, camera) }
    cv.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return
      toPtr(e); const h = ray.intersectObjects(objs)[0]
      select(h ? h.object : null)
      if (h) { dragging = h.object; plane.constant = -dragging.position.y; ray.ray.intersectPlane(plane, hit); offset.copy(dragging.position).sub(hit); cv.setPointerCapture(e.pointerId); play('grab') }
    })
    cv.addEventListener('pointermove', (e) => { if (!dragging) return; toPtr(e); if (ray.ray.intersectPlane(plane, hit)) { dragging.position.x = hit.x + offset.x; dragging.position.z = hit.z + offset.z; helper.update(); channels() } })
    cv.addEventListener('pointerup', () => { if (dragging) play('drop'); dragging = null })

    let alive = true
    const size = () => { const w = vp.clientWidth, h = vp.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix() }
    new ResizeObserver(size).observe(vp); size()
    const loop = () => { if (!alive) return; controls.update(); if (selected) helper.update(); renderer.render(scene, camera); requestAnimationFrame(loop) }
    loop()
    it.onClose = () => { alive = false; controls.dispose(); renderer.dispose(); objs.forEach((o) => { o.geometry.dispose(); o.material.dispose() }) }
  } })
}
