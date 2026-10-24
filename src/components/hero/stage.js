// What the hero's 3D bust and the hero's workflow sequence share. The workflow (Workflow.jsx)
// writes the "Blender" state — selected, turned, re-coloured — and where the demo pointer is; the
// bust (Bust3D.jsx) reads it every frame and writes back where it is on screen (its origin and the
// projected axes of its transform gizmo), so the overlays sit exactly on the object.
export const stage = {
  ready: false,   // the bust has drawn its first frame
  select: 0,      // 0..1 selection outline (Blender's orange rim)
  tint: 0,        // 0..1 material colour: ink → signal
  yaw: 0,         // extra turn around the vertical axis, radians (the workflow's "R Z")
  demo: null,     // { x, y } client px of the demo pointer while it acts, else null
  screen: null,   // { origin: {x,y}, axes: {x,y,z: {x,y}}, box: {l,t,r,b} } client px
}

// the bust calls this once it is on screen; the workflow waits for it before its 3D phase
let resolveReady
export const bustReady = new Promise((r) => { resolveReady = r })
export const markReady = () => { stage.ready = true; resolveReady() }

// dev only: lets the layout scripts turn and inspect the bust
if (import.meta.env.DEV) window.__stage = stage
