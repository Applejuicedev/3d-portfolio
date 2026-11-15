// only the marks below are imported, so the bundle carries 22 icons, not the whole set
import { siReact, siNextdotjs, siExpo, siSwift, siTypescript, siNodedotjs, siPython, siTailwindcss, siGreensock, siThreedotjs, siFramer, siFigma, siBlender, siSqlite, siPrisma, siVitest, siVite, siGit, siGithub, siXcode, siDocker, siClaude } from 'simple-icons'

// The second slide, top left, opposite the clocks: the stack as marks — frameworks, languages,
// tools — passing slowly the other way, in the quiet grey of the labels. A pointer over the strip
// holds it still; each mark names itself on hover. (Icons: Simple Icons, CC0; the marks belong to
// their owners.)
const icons = [siReact, siNextdotjs, siExpo, siSwift, siTypescript, siNodedotjs, siPython, siTailwindcss, siGreensock, siThreedotjs, siFramer, siFigma, siBlender, siSqlite, siPrisma, siVitest, siVite, siGit, siGithub, siXcode, siDocker, siClaude]
const one = icons.map((i) => `<span title="${i.title}" aria-label="${i.title}" role="img"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${i.path}"/></svg></span>`).join('')
document.getElementById('skills-track').innerHTML = one + one
