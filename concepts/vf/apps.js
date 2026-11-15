import { open, close, wins } from './wm.js'
import { play, SOUNDS, getVolume, setVolume, isMuted } from './sound.js'
import { ME, RESUME, PROJECTS, byId, NUMBERS, ZONES, rich } from './data.js'
import { copyText } from './links.js'
import { notify } from './notify.js'
import { tick } from './virus.js'

// What opens on the desk. Every opener takes the thing it was opened from (for the hairline) and
// returns the window. Each window is dressed as the tool it stands for (wm skins, apps.css).
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const time = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
const narrow = () => innerWidth < 700

// ── projects ───────────────────────────────────────────────────
export function project(id, from) {
  const p = byId[id]
  if (p.skin === 'xcode') return open(id, from, { title: `${p.title} — ${p.kind}`, width: 760, skin: 'xcode', minW: 560, minH: 420, build: (b) => {
    b.innerHTML = `<div class="xc"><div class="run"><i></i> ${esc(p.title)} › iPhone 16 Pro <span style="margin-left:auto">Running</span></div>
      <nav>${p.files.map((f, i) => `<p class="${i === 1 ? 'on' : ''}">${esc(f)}</p>`).join('')}</nav>
      <div class="canvas"><div class="device"><video src="${p.media}" autoplay muted loop playsinline></video></div></div>
      <div class="insp"><h4>${esc(p.kind)} · ${esc(p.year)}</h4><p>${esc(p.lede)}</p>${p.story.map(([k, s]) => `<h4>${k}</h4><p>${rich(s)}</p>`).join('')}
        <h4>Stack</h4><p>${p.tech.join(' · ')}</p><h4>Website</h4><p><a class="link" href="${p.link[1]}" data-web>${p.link[0]} — open here</a></p></div></div>`
    b.querySelector('[data-web]').onclick = (e) => { e.preventDefault(); play('select'); browse(id, e.currentTarget, { url: p.link[1], title: p.link[0] }) } } })
  if (p.skin === 'notion') return open(id, from, { title: p.title, width: 560, skin: 'notion', minW: 420, minH: 340, build: (b) => {
    b.innerHTML = `<div class="no"><div class="cover"></div><div class="page"><div class="icon">J</div><h2>${esc(p.title)}</h2>
      <dl class="props"><dt>Type</dt><dd>${esc(p.kind)}</dd><dt>Year</dt><dd>${esc(p.year)}</dd><dt>Stack</dt><dd>${p.tech.map((t) => `<span>${t}</span>`).join('')}</dd><dt>Status</dt><dd>In daily use</dd></dl>
      <video src="${p.media}" autoplay muted loop playsinline></video>
      ${p.story.map(([k, s], i) => `<details ${i === 0 ? 'open' : ''}><summary>${k}</summary><p>${rich(s)}</p></details>`).join('')}
      <div class="callout"><span>↳</span><span>${esc(p.note)} <a class="link" href="mailto:${ME.email}?subject=${encodeURIComponent("Creator's Journal — walkthrough")}">Ask for a walkthrough</a></span></div></div></div>`
    b.querySelectorAll('summary').forEach((s) => s.addEventListener('click', () => play('click'))) } })
  if (p.skin === 'vscode') return open(id, from, { title: 'Body.jsx — vincentfidanli.de', width: 760, skin: 'vscode', minW: 540, minH: 380, build: (b) => {
    // a real excerpt of the site's vertex shader (src/body/Body.jsx): the points gather from space into the form
    const code = [
      ['c', '// gathering: from space into the form'],
      ['', '<span class="k">float</span> g = <span class="f">smoothstep</span>(<span class="nmb">0.</span>, <span class="nmb">1.</span>, <span class="f">clamp</span>(uGather * <span class="nmb">1.5</span> - aR.z * <span class="nmb">.5</span>, <span class="nmb">0.</span>, <span class="nmb">1.</span>));'],
      ['', '<span class="k">vec3</span> sky = aSpace; sky.xz = <span class="f">rot</span>(uTime * <span class="nmb">.01</span>) * sky.xz;'],
      ['', '<span class="k">float</span> flight = <span class="f">sin</span>(g * <span class="nmb">3.14159</span>);'],
      ['', 'p = <span class="f">mix</span>(sky, p, g) + dir * flight * <span class="nmb">.25</span>;'],
      ['', ''],
      ['c', '// from one form to the next: straight, in the order both were dealt'],
      ['', '<span class="k">float</span> m = <span class="f">smoothstep</span>(<span class="nmb">0.</span>, <span class="nmb">1.</span>, <span class="f">clamp</span>((uMix - aO * <span class="nmb">.6</span>) / <span class="nmb">.4</span>, <span class="nmb">0.</span>, <span class="nmb">1.</span>));'],
      ['', '<span class="k">vec3</span> p = <span class="f">mix</span>(a, b, m);'],
      ['', ''],
      ['c', '// perspective, then onto the screen'],
      ['', '<span class="k">float</span> persp = <span class="nmb">4.</span> / (<span class="nmb">4.</span> - p.z);'],
      ['', '<span class="k">vec2</span> q = uRes * <span class="nmb">.5</span> + uOff + <span class="k">vec2</span>(p.x, -p.y) * uR * persp;'],
      ['', 'gl_PointSize = (<span class="nmb">.7</span> + rv.z * <span class="nmb">.9</span>) * uPR * persp;'],
    ]
    b.innerHTML = `<div class="vs"><div class="act"><i></i><i></i><i></i><i></i></div>
      <div class="tabs"><span class="on">Body.jsx</span><span>shapes.js</span><span>Site.jsx</span></div>
      <div class="ed"><pre>${code.map(([k, l]) => `<span class="l">${k === 'c' ? `<span class="c">${l}</span>` : l}</span>`).join('')}</pre>
        <div class="side"><img src="${p.still}" alt=""><h4>${esc(p.kind)} · ${p.year}</h4><p>${esc(p.lede)}</p>${p.story.map(([k, s]) => `<h4>${k}</h4><p>${rich(s)}</p>`).join('')}
          <h4>Stack</h4><p>${p.tech.join(' · ')}</p><p style="margin-top:8px"><a class="link" href="${p.link[1]}" target="_blank" rel="noopener">${p.link[0]} ↗</a></p></div></div>
      <div class="status"><span>main ✓</span><span>GLSL · UTF-8 · 20,000 points</span></div></div>` } })
  if (p.study) return browse(id, from, { url: p.url, title: `${p.title} — design study`,
    note: `Design study · fictional persona: ${p.persona}, ${p.city} — every name, project and fact in it is invented.` })
}

// ── a website in miniature: the real page, live, scaled into the window ──
// The page runs at a real screen size (desktop 1440 wide, or a 390 × 844 phone) and is scaled down
// to fit, so it lays itself out exactly as it would on that screen — and it can be used: scrolled,
// clicked, typed into. Back, forward and reload work on the page inside; ↗ opens it in a new tab.
const VIEWS = { desktop: [1440, 900], phone: [390, 844] }
// One preview at a time: each runs a whole site (WebGL, video, its own animation loop), so opening
// another closes the one before. A preview never starts a mail or phone app: the frame is sandboxed
// without the right to hand links to other programs, and on this site's own pages such a click is
// caught and answered with a note.
export function browse(id, from, { url, title, note = '' }) {
  ;[...wins.keys()].filter((k) => k.endsWith(':web') && k !== id + ':web').forEach(close)
  return open(id + ':web', from, { title, width: Math.min(1000, innerWidth - 60), height: Math.min(700, innerHeight - 110), skin: 'web', minW: 420, minH: 340, place: [0.5, 0.5], build: (b) => {
    const u = new URL(url, location.href), same = u.origin === location.origin
    b.innerHTML = `<div class="wb"><div class="wb-bar">
        <button class="wb-b" data-a="back" aria-label="Back">‹</button><button class="wb-b" data-a="fwd" aria-label="Forward">›</button><button class="wb-b" data-a="reload" aria-label="Reload">↻</button>
        <p class="wb-url mono"><span>${esc(same ? 'vincentfidanli.de' : u.host)}</span><i>${esc(u.pathname.replace(/index\.html$/, ''))}</i></p>
        <div class="wb-seg mono" role="group" aria-label="Screen"><button data-v="desktop" class="on">desktop</button><button data-v="phone">phone</button></div>
        <a class="wb-b" href="${esc(u.href)}" target="_blank" rel="noopener" aria-label="Open in a new tab">↗</a></div>
      <div class="wb-view"><div class="wb-frame"><iframe src="${esc(u.href)}" title="${esc(title)}" allow="autoplay; fullscreen; clipboard-write" sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-pointer-lock"></iframe></div></div>
      ${note ? `<p class="wb-note mono">${esc(note)}</p>` : ''}</div>`
    const view = b.querySelector('.wb-view'), frame = b.querySelector('.wb-frame'), fr = b.querySelector('iframe'), path = b.querySelector('.wb-url i')
    // on a phone the page opens as a phone would show it
    let mode = innerWidth < 700 ? 'phone' : 'desktop'
    b.querySelectorAll('.wb-seg button').forEach((y) => y.classList.toggle('on', y.dataset.v === mode))
    const fit = () => {
      const [vw, vh] = VIEWS[mode], W = view.clientWidth, H = view.clientHeight
      if (!W || !H) return
      // desktop fills the width (the page is as tall as the window allows); a phone fits whole
      const k = mode === 'desktop' ? Math.min(1, W / vw) : Math.min(1, (H - 24) / vh, (W - 24) / vw)
      const h = mode === 'desktop' ? H / k : vh
      fr.style.width = vw + 'px'; fr.style.height = h + 'px'; fr.style.transform = `scale(${k})`
      frame.style.width = vw * k + 'px'; frame.style.height = h * k + 'px'
      frame.classList.toggle('phone', mode === 'phone')
    }
    new ResizeObserver(fit).observe(view); fit()
    b.querySelectorAll('.wb-seg button').forEach((x) => (x.onclick = () => {
      mode = x.dataset.v; b.querySelectorAll('.wb-seg button').forEach((y) => y.classList.toggle('on', y === x)); play('toggle'); fit()
    }))
    // the page inside: its history, a reload, and its address while it is on this site
    const nav = (a) => { try { a === 'reload' ? fr.contentWindow.location.reload() : fr.contentWindow.history[a === 'back' ? 'back' : 'forward']() } catch { if (a === 'reload') fr.src = fr.src } play('click') }
    b.querySelectorAll('.wb-b[data-a]').forEach((x) => (x.onclick = () => nav(x.dataset.a)))
    fr.addEventListener('load', () => {
      try {
        const l = fr.contentWindow.location; path.textContent = (l.pathname + l.hash).replace(/index\.html/, '')
        // on touch screens the page's fields get 16 px type, so tapping one doesn't zoom the phone in
        if (matchMedia('(hover: none) and (pointer: coarse)').matches) {
          const st = fr.contentDocument.createElement('style'); st.textContent = 'input, textarea, select { font-size: 16px !important; }'
          fr.contentDocument.head.appendChild(st)
        }
        // clicks inside the preview count toward the virus as well
        fr.contentDocument.addEventListener('pointerdown', (e) => { if (e.isTrusted) tick() }, true)
        fr.contentDocument.addEventListener('click', (e) => {
          const a = e.target.closest?.('a[href^="mailto:"], a[href^="tel:"]'); if (!a) return
          e.preventDefault(); e.stopPropagation(); play('click')
          notify({ from: 'preview', title: 'Nothing opens from a preview.', body: 'Mail and phone links stay closed here — the contacts in the studies are invented anyway.', life: 5000 })
        }, true)
      } catch { /* another site: the sandbox alone keeps it in */ }
    })
  } })
}

// ── the ring: every project on a dial; turn it, the one at the top is chosen ──
export function projects(from) {
  return open('projects', from, { title: `projects — ${PROJECTS.length}`, width: 440, place: [0.5, 0.5], minW: 380, minH: 460, build: (b) => {
    const n = PROJECTS.length, step = 360 / n
    const thumb = (p) => p.study ? `/concepts/frames/study-${p.study}.jpg` : p.id === 'dienstzeit' ? '/concepts/frames/dienstzeit-2.jpg' : p.id === 'journal' ? '/concepts/frames/creators-journal-3.jpg' : '/concepts/frames/site-1.jpg'
    b.innerHTML = `<div class="pad" style="padding-bottom:10px"><p class="eyebrow">Turn the ring — drag, scroll or ← → · click a project to open it</p></div>
      <div class="ring" tabindex="0" aria-label="Projects ring"><i class="needle"></i>${PROJECTS.map((p, i) => `<button class="it" data-i="${i}" data-src="project"><img src="${thumb(p)}" alt=""><span>${esc(p.title)}</span></button>`).join('')}
      <div class="mid"><p class="eyebrow" id="r-kind"></p><p class="title" id="r-title"></p><button class="btn" id="r-open">open →</button></div></div>`
    const ring = b.querySelector('.ring'), items = [...ring.querySelectorAll('.it')]
    let rot = 0, want = 0, sel = -1
    const pick = () => ((Math.round(-want / step) % n) + n) % n
    const paint = () => {
      if (!ring.isConnected) return
      rot += (want - rot) * 0.18
      const R = Math.min(ring.clientWidth, ring.clientHeight) * 0.38, cx = ring.clientWidth / 2, cy = ring.clientHeight / 2
      items.forEach((el, i) => {
        const a = ((i * step + rot) * Math.PI) / 180, x = Math.sin(a) * R, y = -Math.cos(a) * R
        el.style.transform = `translate(${x - 46}px, ${y - 40}px)`; el.style.left = cx + 'px'; el.style.top = cy + 'px'
        el.style.opacity = 0.45 + 0.55 * ((Math.cos(a) + 1) / 2)
      })
      const s = pick()
      if (s !== sel) {
        sel = s; play('step'); items.forEach((el, i) => el.classList.toggle('sel', i === s))
        b.querySelector('#r-kind').textContent = `${PROJECTS[s].kind} · ${PROJECTS[s].year}`
        b.querySelector('#r-title').innerHTML = PROJECTS[s].study ? `${esc(PROJECTS[s].title)} <i>study</i>` : esc(PROJECTS[s].title)
      }
      requestAnimationFrame(paint)
    }
    paint()
    const snap = () => { want = Math.round(want / step) * step }
    let sx = null, base = 0, moved = false
    ring.addEventListener('pointerdown', (e) => { if (e.target.closest('#r-open')) return; e.preventDefault(); sx = e.clientX; base = want; moved = false; ring.setPointerCapture(e.pointerId); document.documentElement.classList.add('dragging') })
    ring.addEventListener('pointermove', (e) => { if (sx == null) return; const d = e.clientX - sx; if (Math.abs(d) > 4) moved = true; want = base + d * 0.6 })
    ring.addEventListener('pointerup', (e) => {
      document.documentElement.classList.remove('dragging')
      if (sx == null) return
      sx = null; snap()
      // a click on a project (no drag) turns it to the top and opens it
      if (!moved) {
        const it = document.elementFromPoint(e.clientX, e.clientY)?.closest('.it')
        if (it) { const i = +it.dataset.i, d = (((-i * step - rot) % 360) + 540) % 360 - 180; want = rot + d; snap(); play('select'); project(PROJECTS[i].id, it) }
      }
    })
    ring.addEventListener('pointercancel', () => { sx = null; document.documentElement.classList.remove('dragging') })
    ring.addEventListener('wheel', (e) => { e.preventDefault(); want -= e.deltaY * 0.35; clearTimeout(ring.t); ring.t = setTimeout(snap, 160) }, { passive: false })
    ring.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') want -= step; if (e.key === 'ArrowLeft') want += step; if (e.key === 'Enter') openSel() })
    const openSel = () => { play('select'); project(PROJECTS[sel].id, items[sel]) }
    b.querySelector('#r-open').onclick = openSel
  } })
}

// ── me.txt — résumé and photo, openable from anywhere ──
export function me(from) {
  return open('me', from, { title: 'me.txt', width: 520, skin: 'txt', place: [0.92, 0.2], minW: 400, minH: 320, build: (b) => {
    b.innerHTML = `<div class="txt"><h1>${ME.name}</h1>
      <p>${ME.role} · ${ME.city}<br><a class="link" href="mailto:${ME.email}">${ME.email}</a> · ${ME.phone}<br>github.com/${ME.github}</p>
      <p style="margin:14px 0 10px;clear:none">${esc(ME.available)}</p>
      ${RESUME.map(([w, t, o, n]) => `<div class="r"><span>${w}</span><span><b>${esc(t)}</b><small>${esc(o)} — ${esc(n)}</small></span></div>`).join('')}
      <div class="r"><span>stack</span><span>${ME.stack.map(([k, v]) => `<b>${k}</b><small>${v}</small>`).join('')}</span></div>
      <p style="margin-top:14px"><a class="btn" href="/resume.html" target="_blank" rel="noopener">print version ↗</a></p></div>` } })
}

// ── the role: a terminal that answers ──
export function role(from, actions) {
  return open('role', from, { title: 'vincent — ~ — zsh', width: 520, skin: 'term', minW: 400, minH: 280, build: (b) => {
    b.innerHTML = `<div class="tm"><div class="out"></div><form><span>›</span><input aria-label="Command" autocomplete="off" spellcheck="false" placeholder="try: help"></form></div>`
    const out = b.querySelector('.out'), input = b.querySelector('input')
    const say = (html) => { out.insertAdjacentHTML('beforeend', html + '\n'); out.scrollTop = out.scrollHeight }
    const C = {
      help: () => say('<span class="m">whoami · stack · projects · open &lt;name&gt; · contact · theme · sound · clear · me</span>'),
      whoami: () => say(`<span class="a">${ME.name}</span> — ${ME.role.toLowerCase()}, ${ME.city}\nI design and build apps — web, iOS and interfaces — from the first sketch to the database.`),
      stack: () => say(ME.stack.map(([k, v]) => `<span class="a">${k.padEnd(16)}</span>${v}`).join('\n')),
      projects: () => say(PROJECTS.map((p) => `${p.id.padEnd(15)}<span class="m">${p.kind} · ${p.year}</span>`).join('\n')),
      contact: () => { say(`${ME.email} · github.com/${ME.github}`); actions.hello(input) },
      me: () => actions.me(input), theme: () => { actions.theme(); say('<span class="m">theme switched</span>') },
      sound: () => { actions.sound(); say(`<span class="m">sound ${isMuted() ? 'off' : 'on'}</span>`) },
      clear: () => { out.innerHTML = '' },
    }
    say('<span class="m">Welcome. This is a real prompt — type help.</span>'); C.whoami()
    input.addEventListener('keydown', (e) => { if (e.key.length === 1 || e.key === 'Backspace') play('key') })
    b.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault(); const v = input.value.trim(); input.value = ''; if (!v) return
      say(`<span class="a">›</span> ${esc(v)}`)
      const [cmd, arg] = v.toLowerCase().split(/\s+/)
      if (cmd === 'open' && arg) { const p = PROJECTS.find((q) => q.id.includes(arg) || q.title.toLowerCase().includes(arg)); p ? project(p.id, input) : say('<span class="m">no such project — try projects</span>') }
      else if (v.toLowerCase() === 'sudo hire vincent') { say('<span class="a">permission granted.</span> opening a channel…'); actions.hello(input) }
      else (C[cmd] ?? (() => say(`<span class="m">command not found: ${esc(cmd)} — try help</span>`)))()
    })
    setTimeout(() => input.focus({ preventScroll: true }), 50)
  } })
}

// ── where: Frankfurt and the clocks around it ──
export function where(from) {
  return open('where', from, { title: 'Frankfurt, Germany', width: 320, minW: 300, minH: 300, build: (b) => {
    b.innerHTML = `<div class="pad wh"><p class="eyebrow">Local time · 50.1° N</p><p class="big" id="w-now"></p><p class="text" style="margin-top:6px">Based in Frankfurt, working remote — happy to overlap with any of these.</p><ul>${ZONES.slice(1).map(([c, tz]) => `<li><span>${c}</span><span data-tz="${tz}"></span></li>`).join('')}</ul></div>`
    const tick = () => { if (!b.isConnected) return; b.querySelector('#w-now').textContent = time('Europe/Berlin'); b.querySelectorAll('[data-tz]').forEach((el) => (el.textContent = time(el.dataset.tz))); setTimeout(tick, 15000) }
    tick() } })
}

export function availability(from, actions) {
  return open('open', from, { title: 'availability', width: 340, minW: 320, minH: 240, build: (b) => {
    b.innerHTML = `<div class="pad"><p class="eyebrow">Status</p><p class="title">Open to <i>working-student</i> roles</p><p class="lead text">${esc(ME.available)}</p>
      <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap"><button class="btn" id="a-me">résumé — me.txt</button><button class="btn" id="a-hi">say hello →</button></div></div>`
    b.querySelector('#a-me').onclick = (e) => actions.me(e.currentTarget); b.querySelector('#a-hi').onclick = (e) => actions.hello(e.currentTarget) } })
}

// ── say hello: channels, and a message that goes to the clipboard with the address beside it ──
export function hello(from) {
  return open('hello', from, { title: '# say-hello', width: 520, skin: 'chat', minW: 420, minH: 320, build: (b) => {
    const CH = { email: ['email', `Fastest way to reach me: <a class="link" href="mailto:${ME.email}">${ME.email}</a>. I answer within a day.`],
      github: ['github', `Code lives at <a class="link" href="https://github.com/${ME.github}" target="_blank" rel="noopener">github.com/${ME.github}</a>.`],
      instagram: ['instagram', `Pictures, mostly not of code: <a class="link" href="https://instagram.com/${ME.instagram}" target="_blank" rel="noopener">@${ME.instagram}</a>.`],
      phone: ['phone', `If it's urgent: ${ME.phone}.`] }
    b.innerHTML = `<div class="dc"><aside><h6>Channels</h6>${Object.keys(CH).map((k, i) => `<button data-c="${k}" class="${i ? '' : 'on'}"># ${k}</button>`).join('')}</aside>
      <main><div class="msgs"></div><form><input placeholder="Message #email" aria-label="Message"><button>send ↵</button></form></main></div>`
    const msgs = b.querySelector('.msgs'), input = b.querySelector('input')
    const show = (k) => {
      b.querySelectorAll('aside button').forEach((x) => x.classList.toggle('on', x.dataset.c === k)); input.placeholder = `Message #${k}`
      msgs.innerHTML = `<div class="msg"><img src="${ME.photo}" alt=""><div><b>Vincent</b><small>today</small><p>${CH[k][1]}</p></div></div>`
    }
    b.querySelectorAll('aside button').forEach((x) => (x.onclick = () => { play('click'); show(x.dataset.c) }))
    show('email')
    b.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault(); const v = input.value.trim(); if (!v) return
      msgs.insertAdjacentHTML('beforeend', `<div class="msg"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23999'/%3E%3C/svg%3E" alt=""><div><b>you</b><small>now</small><p>${esc(v)}</p><p style="color:var(--mute);font-size:12px">→ opening your mail app with this message…</p></div></div>`)
      input.value = ''; msgs.scrollTop = msgs.scrollHeight; play('select')
      // no mail app: the message goes to the clipboard, the address is right above it
      setTimeout(async () => {
        const ok = await copyText(v)
        msgs.insertAdjacentHTML('beforeend', `<div class="msg"><img src="${ME.photo}" alt=""><div><b>Vincent</b><small>now</small><p>${ok ? 'Your message is copied' : 'Copy your message'} — send it to <a class="link" href="mailto:${ME.email}">${ME.email}</a> (a click copies the address).</p></div></div>`)
        msgs.scrollTop = msgs.scrollHeight; play('notify')
      }, 700)
    })
  } })
}

// ── numbers: every claim with its measure ──
export function numbers(from) {
  return open('numbers', from, { title: 'numbers', width: 460, place: [0.04, 0.2], minW: 380, minH: 280, build: (b) => {
    b.innerHTML = `<div class="pad nm"><p class="eyebrow" style="margin-bottom:10px">The sentence, measured — a row opens what it measures</p><table>${NUMBERS.map(([v, d, k], i) => `<tr tabindex="0" data-i="${i}"><td class="v">${v}</td><td class="text">${d}</td></tr>`).join('')}</table></div>`
    b.querySelectorAll('tr').forEach((tr) => { const k = NUMBERS[tr.dataset.i][2]; const go = () => (k ? project(k, tr) : me(tr)); tr.onclick = go; tr.onkeydown = (e) => e.key === 'Enter' && go() }) } })
}

// ── scale: the same things in one plane, zoomed through ──
export function scale(from) {
  return open('scale', from, { title: 'scale', width: 540, place: [0.5, 0.2], minW: 420, minH: 380, build: (b, it) => {
    b.innerHTML = `<div class="sc"><div class="world">
      <p class="o" data-z="0" style="font-size:30px;letter-spacing:-.02em">Vincent Fidanli builds apps<span class="dot">.</span></p>
      <button class="card" data-k="dienstzeit" data-z="1" style="left:-430px;top:-10px"><img src="/concepts/frames/dienstzeit-2.jpg" alt="Dienstzeit"></button>
      <button class="card" data-k="journal" data-z="1" style="left:440px;top:-60px"><img src="/concepts/frames/creators-journal-3.jpg" alt="Creator's Journal"></button>
      <button class="card" data-k="site" data-z="1" style="left:60px;top:250px"><img src="/concepts/frames/site-1.jpg" alt="This website"></button>
      <button class="card" data-k="study-glass" data-z="1.6" style="left:-1100px;top:600px"><img src="/concepts/frames/study-glass.jpg" alt="Liquid Glass study" style="height:260px"></button>
      <button class="card" data-k="study-runtime" data-z="1.6" style="left:1200px;top:-700px"><img src="/concepts/frames/study-runtime.jpg" alt="Runtime study" style="height:260px"></button>
      <p class="o" data-z="2" style="left:-1700px;top:-900px;font-size:120px;color:var(--ash)">Frankfurt</p>
      <p class="o" data-z="2" style="left:1900px;top:1000px;font-size:90px;color:var(--ash)">open from 2029</p>
      <p class="o" data-z="3" style="left:0;top:-4600px;font-size:470px;letter-spacing:-.04em">say hello</p>
    </div><p class="hud"></p></div>`
    const box = b.querySelector('.sc'), world = box.querySelector('.world'), dot = box.querySelector('.dot'), hud = box.querySelector('.hud')
    let fx = 0, fy = 0, ready = false, at = 0, want = 0
    const measure = () => { world.style.transform = 'none'; const r = dot.getBoundingClientRect(), w = world.getBoundingClientRect(); fx = r.left + r.width / 2 - w.left; fy = r.top + r.height * 0.79 - w.top; ready = true }
    it.w.addEventListener('animationend', measure, { once: true }); setTimeout(() => ready || measure(), 650)
    const tick = () => {
      if (!box.isConnected) return
      if (ready) {
        at += (want - at) * 0.12
        const s = Math.pow(10, 2 - at * 0.95), k = Math.min(1, at)
        world.style.transform = `scale(${s}) translate(${-fx * (1 - k)}px, ${-fy * (1 - k)}px)`
        world.querySelectorAll('[data-z]').forEach((el) => { const o = Math.max(0, Math.min(1, (at - +el.dataset.z + 0.6) * 1.6)); el.style.opacity = o; el.style.pointerEvents = o > 0.5 ? '' : 'none' })
        hud.textContent = `×${s < 1 ? s.toFixed(3) : s.toFixed(1)} — scroll in here`
      }
      requestAnimationFrame(tick)
    }
    tick()
    box.addEventListener('wheel', (e) => { e.preventDefault(); want = Math.max(0, Math.min(3.6, want + e.deltaY / 700)) }, { passive: false })
    let ty = null
    box.addEventListener('touchstart', (e) => { ty = e.touches[0].clientY }, { passive: true })
    box.addEventListener('touchmove', (e) => { e.preventDefault(); want = Math.max(0, Math.min(3.6, want + (ty - e.touches[0].clientY) / 250)); ty = e.touches[0].clientY }, { passive: false })
    world.querySelectorAll('.card').forEach((c) => (c.onclick = () => project(c.dataset.k, c)))
  } })
}

// ── sounds: the desk's sounds, played like a record ──
export function sounds(from) {
  return open('sounds', from, { title: 'sounds', width: 380, skin: 'spot', place: [0.96, 0.62], minW: 340, minH: 320, build: (b) => {
    b.innerHTML = `<div class="sp"><div class="hero"><div class="art"></div><div><p class="eyebrow">Sound set</p><h3>Desk, vol. 1</h3><p style="color:var(--text-tertiary);font-size:12px">${SOUNDS.length} sounds · synthesised live, no files</p></div></div>
      ${SOUNDS.map((s, i) => `<div class="row" data-id="${s.id}" tabindex="0"><span class="i">${i + 1}</span><span><b>${s.title}</b><small>${s.note}</small></span><span class="mono" style="color:var(--text-tertiary)">▶</span></div>`).join('')}
      <div class="vol"><span>vol</span><input type="range" min="0" max="1" step="0.05" value="${getVolume()}" aria-label="Volume"><span id="sp-m">${isMuted() ? 'muted' : ''}</span></div></div>`
    b.querySelectorAll('.row').forEach((r) => { const go = () => { b.querySelectorAll('.row').forEach((x) => x.classList.toggle('on', x === r)); play(r.dataset.id, true) }; r.onclick = go; r.onkeydown = (e) => e.key === 'Enter' && go() })
    b.querySelector('input').oninput = (e) => { setVolume(+e.target.value); play('click', true) } } })
}

// ── ask: a chat that answers from the facts on this desk (a fixed list, not an AI) ──
export function ask(from, actions) {
  return open('ask', from, { title: 'ask about Vincent', width: 440, height: 500, skin: 'chat', minW: 380, minH: 420, build: (b) => {
    const QA = [
      ['What does he build?', `Apps — web, iOS and interfaces — from the first sketch to the database. Three projects of his own: Dienstzeit (iOS), Creator's Journal (web) and this site; plus five design studies — earlier versions of this portfolio, each live in its own small browser.`, () => actions.projects(b)],
      ['Which stack?', ME.stack.map(([k, v]) => `<b>${k}:</b> ${v}`).join('<br>')],
      ['When is he available?', ME.available],
      ['Where is he based?', 'Frankfurt, Germany — working remote.'],
      ["What's his background?", 'Media & design training, a web developer internship (React), two semesters of media informatics, now soldier — and a B.Sc. at IU from 2027. The full résumé is in me.txt.', () => actions.me(b)],
      ['How do I reach him?', `<a class="link" href="mailto:${ME.email}">${ME.email}</a> — or the say-hello window.`, () => actions.hello(b)],
    ]
    b.innerHTML = `<div class="ch"><div class="log"><div class="a"><span class="who">desk</span>Ask anything below — I answer from the facts on this desk. (A fixed list, not an AI.)</div></div><div class="chips">${QA.map(([q], i) => `<button data-i="${i}">${q}</button>`).join('')}</div><p class="foot">Message the desk…</p></div>`
    const log = b.querySelector('.log')
    b.querySelectorAll('.chips button').forEach((x) => (x.onclick = () => {
      const [q, a, then] = QA[x.dataset.i]; play('click')
      log.insertAdjacentHTML('beforeend', `<div class="q">${q}</div><div class="a"><span class="who">desk</span><span class="typing"></span></div>`)
      const t = log.lastElementChild.querySelector('.typing'), plain = a
      let i = 0; const step = () => { i += 3; t.innerHTML = plain.slice(0, i).replace(/<[^>]*$/, ''); log.scrollTop = log.scrollHeight; if (i < plain.length) setTimeout(step, 12); else { t.innerHTML = plain; then?.() } }
      step()
    }))
  } })
}
