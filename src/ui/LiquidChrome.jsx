import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion'

// A body of liquid chrome, drawn by a fragment shader into a canvas that sits behind its parent
// (and reaches a little past it, so the edge can breathe). The shape is a rounded box whose outline
// wobbles with slow noise; its surface is domed towards the edge and rippled inside, and reflects a
// made-up studio (a bright sky, a dark floor, soft bands that drift) — that is the chrome. Where the
// surface turns away, a thin-film rainbow appears, as on a soap bubble. The pointer moves the key
// light. Returns false through `onFail` when there is no WebGL (the parent keeps its CSS chrome).
const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uPad; uniform float uCalm;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
float sdBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float shape(vec2 p,vec2 hs,float r,float t){
  float ang=atan(p.y,p.x);
  float wob=(fbm(vec2(cos(ang),sin(ang))*1.6+vec2(t*.35,-t*.2))-.5)*min(hs.x,hs.y)*.10*uCalm; // cos/sin: no seam where the angle wraps
  return sdBox(p,hs,r)+wob;
}
vec3 spectrum(float x){return .5+.5*cos(6.2831*(vec3(0.,.33,.67)+x));}
void main(){
  vec2 frag=gl_FragCoord.xy, c=uRes*.5, p=frag-c;
  vec2 hs=c-uPad; float r=min(hs.x,hs.y)*.22;
  float t=uTime;
  float d=shape(p,hs,r,t);
  // surface normal: a dome over the outer band, a slow liquid ripple inside
  float e=1.5;
  vec2 g=vec2(shape(p+vec2(e,0),hs,r,t)-shape(p-vec2(e,0),hs,r,t),shape(p+vec2(0,e),hs,r,t)-shape(p-vec2(0,e),hs,r,t))/(2.*e);
  float bevel=min(hs.x,hs.y)*.38;
  float k=clamp(-d/bevel,0.,1.);
  float tilt=sqrt(max(0.,1.-k*k));
  vec2 rip=vec2(fbm(p/170.+vec2(t*.07,t*.05)),fbm(p/170.+vec2(-t*.05,t*.06)+7.))-.5;
  vec3 n=normalize(vec3(g*tilt*1.6+rip*.9*(1.-tilt*.6), 1.));
  // reflect into a studio: bright sky above, dark floor below, drifting soft bands
  vec3 v=vec3(0.,0.,-1.), rf=reflect(v,n);
  vec2 m=(uMouse-.5)*vec2(1.,-1.);
  float sky=smoothstep(-.35,.6,rf.y+m.y*.4);
  float bands=.5+.5*sin(rf.x*5.5+rf.y*2.+t*.35+fbm(rf.xy*2.+t*.1)*3.);
  vec3 col=mix(vec3(.05,.055,.07),vec3(.96,.97,.99),sky);
  col=mix(col,col*.55+vec3(.25),bands*.45);
  // the key light, where the pointer is
  float spot=pow(max(0.,dot(normalize(rf),normalize(vec3(m.x*1.2,m.y*1.2+.4,.6)))),28.);
  col+=vec3(1.)*spot*1.1;
  // thin film at the turning edge
  float fres=pow(1.-n.z,1.4);
  vec3 film=spectrum(fres*1.6+rf.x*.5+t*.05);
  col=mix(col,film*1.05,clamp(fres*1.25,0.,.75)*smoothstep(.05,.7,1.-k));
  // a soft, blurry edge and a faint halo outside it
  float a=smoothstep(2.5,-2.5,d);
  float halo=exp(-max(d,0.)/18.)*.22;
  vec3 haloCol=spectrum(atan(p.y,p.x)/6.2831+t*.04)*.6+.4;
  vec3 outc=col*a+haloCol*halo*(1.-a);
  gl_FragColor=vec4(outc,a+halo*(1.-a));
}`

export default function LiquidChrome({ pad = 26, className = '', onFail }) {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current
    const gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true })
    if (!gl) { onFail?.(); return }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : (console.warn(gl.getShaderInfoLog(s)), null) }
    const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) { onFail?.(); return }
    const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr); gl.useProgram(pr)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = Object.fromEntries(['uRes', 'uTime', 'uMouse', 'uPad', 'uCalm'].map((n) => [n, gl.getUniformLocation(pr, n)]))
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    const still = prefersReduced()
    let raf = 0, mx = 0.3, my = 0.25, tx = mx, ty = my, t0 = performance.now()
    const move = (e) => { const r = cv.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height }
    const frame = (now) => {
      const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr) }
      gl.viewport(0, 0, cv.width, cv.height)
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06
      gl.uniform2f(U.uRes, cv.width, cv.height); gl.uniform1f(U.uTime, still ? 4 : (now - t0) / 1000)
      gl.uniform2f(U.uMouse, mx, my); gl.uniform1f(U.uPad, pad * dpr); gl.uniform1f(U.uCalm, still ? 0.4 : 1)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!still) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); gl.getExtension('WEBGL_lose_context')?.loseContext() }
  }, [pad, onFail])
  // a canvas has an intrinsic size (300 × 150): it needs its width and height spelled out
  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} style={{ left: -pad, top: -pad, width: `calc(100% + ${pad * 2}px)`, height: `calc(100% + ${pad * 2}px)` }} />
}
