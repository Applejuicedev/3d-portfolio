// The hero plays as one sequence instead of everything at once:
//   1. the text rises in while the 3D object builds itself
//   2. once the object stands, the headline corrects itself ("Technik" → "Code")
//   3. only after that do the topics start to rotate
// Each step waits on the one before through these two signals.
function signal() {
  let resolve
  const promise = new Promise((r) => { resolve = r })
  return { promise, resolve }
}

export const orbBuilt = signal()
export const headlineDone = signal()
