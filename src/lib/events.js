// A tiny event bus for the few things that cross the page: notifications, opening a project sheet,
// Spotlight, the boot sequence. on() returns its own unsubscribe.
const subs = new Map()
export const on = (name, fn) => {
  if (!subs.has(name)) subs.set(name, new Set())
  subs.get(name).add(fn)
  return () => subs.get(name).delete(fn)
}
export const emit = (name, data) => subs.get(name)?.forEach((fn) => fn(data))

// a system notification (Notifications.jsx): { app, title, body, icon? }
export const notify = (n) => emit('notify', n)

// the boot sequence (Preloader.jsx) resolves this once the page is revealed
let release
export const booted = new Promise((r) => { release = r })
export const markBooted = () => release()

export const copyText = (text) => navigator.clipboard?.writeText(text).then(() => true, () => false) ?? Promise.resolve(false)
