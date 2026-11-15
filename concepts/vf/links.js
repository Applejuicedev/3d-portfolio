import { notify } from './notify.js'
import { play } from './sound.js'

// Links that leave the desk. An e-mail address never opens a mail app (one stray click and a window
// you didn't ask for takes over): the address goes to the clipboard and a note says so. Every link to
// another site opens in a new tab, never in this one, so the desk is still here when you come back.
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true } catch {}
  // older browsers, or no permission: the old way, through a hidden field
  const f = Object.assign(document.createElement('textarea'), { value: text }); f.style.cssText = 'position:fixed;opacity:0'
  document.body.appendChild(f); f.select()
  let ok = false; try { ok = document.execCommand('copy') } catch {}
  f.remove(); return ok
}
export async function copyAddress(address) {
  const ok = await copyText(address)
  play('select')
  notify(ok
    ? { from: 'clipboard', title: `${address} copied.`, body: 'Paste it into your mail — nothing else opened.', life: 5000 }
    : { from: 'clipboard', title: address, body: 'Copying wasn’t allowed here — select the address and copy it.', life: 8000 })
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]')
  if (!a || e.defaultPrevented) return
  const href = a.getAttribute('href')
  if (href.startsWith('mailto:')) {
    e.preventDefault()
    copyAddress(decodeURIComponent(href.slice(7).split('?')[0]))
    return
  }
  // another site (or another page of this one): always a new tab
  const url = new URL(href, location.href)
  if (/^https?:$/.test(url.protocol) && (url.origin !== location.origin || url.pathname !== location.pathname)) {
    a.target = '_blank'; a.rel = 'noopener'
  }
}, true)
