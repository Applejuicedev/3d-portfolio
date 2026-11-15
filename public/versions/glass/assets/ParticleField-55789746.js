import{r as X,p as Q,f as Z,j as ee,W as te,S as ae,P as oe,a as re,V as _,b as D,c as V,d as ne,o as Y,B as ie,e as q,g as se,h as L,l as ce,i as le,k as B,M as ue}from"./index-7f3916fb.js";const de=`
uniform float uTime, uMorph, uSpread, uScatter, uSize, uAspect, uHover, uFade, uWide;
uniform vec2 uMouse, uTilt;
uniform vec4 uShock;
uniform vec3 uInk, uAccent, uCanvas;
attribute vec3 aNormal, aFrom, aFromN;
attribute vec4 aRand;
attribute float aOrbit;
varying vec4 vColor;
mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
void main() {
  // the morph from the previous word, staggered per point, each on a little arc of its own
  float mk = smoothstep(0., 1., clamp(uMorph * 1.6 - aRand.x * 0.6, 0., 1.));
  vec3 p = mix(aFrom, position, mk) + (aRand.yzx - 0.5) * sin(mk * 3.14159) * 0.35;
  vec3 n = normalize(mix(aFromN, aNormal, mk) + 1e-4);
  if (aOrbit > 0.5) {
    // the swarm: an elliptic orbit around the word, each point at its own speed and height
    float ang = aRand.w * 6.2831 + uTime * (0.12 + aRand.x * 0.22) * (aRand.y > 0.5 ? 1. : -1.);
    float rad = 0.62 + aRand.y * 0.55;
    p = vec3(cos(ang) * rad * uWide, (aRand.z - 0.5) * 1.1 + sin(ang * 2. + aRand.w * 9.) * 0.07, sin(ang) * rad * 0.9);
    n = normalize(vec3(cos(ang), 0., sin(ang)));
  }
  mat3 R = rotY(uTilt.x) * rotX(uTilt.y);
  p = R * p; n = R * n;
  // alive: every point breathes a little
  p += n * sin(uTime * 1.1 + aRand.w * 40.) * 0.005;
  // scattered ↔ assembled (the boot), blown apart (the scroll); staggered per point
  float k = max(uSpread, uScatter);
  float s = smoothstep(0., 1., clamp(k * 1.25 - aRand.w * 0.25, 0., 1.));
  vec3 away = normalize(n * 0.5 + (aRand.xyz - 0.5) * 2.) * (1.2 + aRand.w * 3.5) * (1. + uScatter * 3.);
  p = mix(p, p + away, s);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  vec4 cp = projectionMatrix * mv;
  vec2 ndc = cp.xy / cp.w;
  vec3 nv = normalize(normalMatrix * n);
  // the pointer: a soft swelling towards the viewer around it
  vec2 dm = ndc - uMouse; dm.x *= uAspect;
  float m = exp(-dot(dm, dm) / 0.007) * uHover * (1. - s);
  // the shockwave: a ring running out from the click, fading
  float st = uTime - uShock.z;
  vec2 ds = ndc - uShock.xy; ds.x *= uAspect;
  float ring = st > 0. ? exp(-pow(length(ds) - st * 0.8, 2.) / 0.002) * exp(-st * 1.6) * uShock.w : 0.;
  mv.xyz += nv * (m * 0.045 + ring * 0.14) + vec3(0., 0., m * 0.05);
  gl_Position = projectionMatrix * mv;
  // a key light from the upper left front: faces towards it read darker on the white page
  float key = max(dot(nv, normalize(vec3(-0.5, 0.5, 0.75))), 0.);
  gl_PointSize = uSize * (0.65 + aRand.w * 0.7) * (10. / -mv.z) * (1. + m * 0.45 + ring * 0.7);
  vec3 ink = mix(mix(uInk, uCanvas, 0.6), uInk, pow(key, 0.8));
  vec3 col = mix(ink, uAccent, clamp(m * 0.9 + ring * 0.8, 0., 1.));
  float a = (aOrbit > 0.5 ? 0.42 : mix(0.45, 1., key)) * (1. - s * 0.92) * uFade; // scattered points all but vanish: no dust left on the page
  a = min(1., a + m * 0.3);
  vColor = vec4(col, a);
}`,pe=`
varying vec4 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.2, d) * vColor.a;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor.rgb, a);
}`;function G(x,b,R){const M=document.createElement("canvas"),o=M.getContext("2d");o.font=`${b.weight} 240px ${b.family}`,"letterSpacing"in o&&(o.letterSpacing=b.spacing);const t=Math.ceil(o.measureText(x).width)+20,c=Math.ceil(240*1.25);M.width=t,M.height=c,o.font=`${b.weight} 240px ${b.family}`,"letterSpacing"in o&&(o.letterSpacing=b.spacing),o.fillStyle="#000",o.textBaseline="alphabetic",o.fillText(x,10,240*.98);const l=o.getImageData(0,0,t,c).data,z=(r,d)=>r>=0&&d>=0&&r<t&&d<c&&l[(d*t+r)*4+3]>128;let O=0;for(let r=0;r<c;r++)for(let d=0;d<t;d++)z(d,r)&&O++;const P=Math.max(1,Math.sqrt(O/(R*.42))),a=[],T=[],u=1/240,h=.13;for(let r=0;r<c;r+=P)for(let d=0;d<t;d+=P){const A=Math.round(d),S=Math.round(r);if(!z(A,S))continue;const f=(d+(Math.random()-.5)*P-t/2)*u,k=-(r+(Math.random()-.5)*P-c/2)*u;a.push(f,k,h),T.push(0,0,1),Math.random()<.45&&(a.push(f,k,-h),T.push(0,0,-1));const F=Math.ceil(P),w=(z(A-F,S)?1:0)-(z(A+F,S)?1:0),n=(z(A,S-F)?1:0)-(z(A,S+F)?1:0);if(w||n){const p=Math.hypot(w,n);for(let i=0;i<4;i++)a.push(f,k,-h+Math.random()*2*h),T.push(w/p,-n/p,0)}}return{pos:a,nor:T,width:t*u,height:c*u}}function me(x,b,R,C){const M=x.pos.length/3,o=Array.from({length:M},(t,c)=>c);for(let t=0;t<b;t++){let c;if(t<M){const l=t+Math.floor(Math.random()*(M-t));c=o[l],o[l]=o[t],o[t]=c}else c=Math.floor(Math.random()*M);for(let l=0;l<3;l++)R[t*3+l]=x.pos[c*3+l],C[t*3+l]=x.nor[c*3+l]}}const U=(x,b,R)=>{const C=Math.min(1,Math.max(0,(R-x)/(b-x)));return C*C*(3-2*C)};function ve(){const x=X.useRef();return X.useEffect(()=>{const b=x.current;if(Q())return;const R=!window.matchMedia("(min-width: 1024px)").matches,C=!Z();let M=!0,o,t=0,c;const l=[],z=[],O=(a,T)=>{const u=a.hasAttribute("data-particles-boot"),h=a.hasAttribute("data-particles-live"),r=getComputedStyle(a),d={family:r.fontFamily,weight:r.fontWeight,spacing:r.letterSpacing==="normal"?"0px":`${parseFloat(r.letterSpacing)/parseFloat(r.fontSize)*240}px`},A=(R?.4:1)*(u?2e4:14e3);let S=a.textContent.trim(),f=G(S,d,A);const k=f.pos.length/3,F=Math.round((R?.4:1)*(u?1600:800)),w=k+F,n=new Float32Array(w*3),p=new Float32Array(w*3),i=new Float32Array(w*4),$=new Float32Array(w);n.set(f.pos),p.set(f.nor);for(let s=0;s<w;s++){for(let E=0;E<4;E++)i[s*4+E]=Math.random();$[s]=s>=k?1:0}const g=new ie;g.setAttribute("position",new q(n,3)),g.setAttribute("aNormal",new q(p,3)),g.setAttribute("aFrom",new q(n.slice(),3)),g.setAttribute("aFromN",new q(p.slice(),3)),g.setAttribute("aRand",new q(i,4)),g.setAttribute("aOrbit",new q($,1));const W=c.clone(),e=W.uniforms;e.uWide.value=f.width/2,e.uSpread.value=u?1:0,e.uFade.value=u?0:1,e.uScatter.value=1;const m=new se(g,W);m.frustumCulled=!1,T.add(m),a.style.color="transparent",l.push(()=>{a.style.color="",g.dispose(),W.dispose()});const v={el:a,boot:u,stay:a.hasAttribute("data-particles-stay"),w:f,pts:m,u:e,tilt:{x:0,y:0},hover:0},N=()=>{L.to(e.uFade,{value:1,duration:.6,ease:"power2.out",overwrite:!0}),L.to(e.uSpread,{value:0,duration:2.6,ease:"power3.out",delay:.15,overwrite:!0})};if(u&&a.hasAttribute("data-particles-wait")?l.push(Y("hero:code",s=>{s?N():(L.to(e.uFade,{value:0,duration:.4,overwrite:!0}),L.to(e.uSpread,{value:1,duration:.6,ease:"power2.in",overwrite:!0}))}),ce("hero:code")?(N(),()=>{}):()=>{}):u&&le.then(()=>{M&&N()}),h){const s=g.attributes,E=new MutationObserver(()=>{const j=a.textContent.trim();if(!j||j===S)return;S=j;const I=e.uMorph.value;for(let y=0;y<k*3;y++)s.aFrom.array[y]+=(s.position.array[y]-s.aFrom.array[y])*I,s.aFromN.array[y]+=(s.aNormal.array[y]-s.aFromN.array[y])*I;v.w=f=G(j,d,A),me(f,k,s.position.array,s.aNormal.array);for(const y of["position","aNormal","aFrom","aFromN"])s[y].needsUpdate=!0;e.uWide.value=f.width/2,L.fromTo(e.uMorph,{value:0},{value:1,duration:.45,ease:"power2.out",overwrite:!0})});E.observe(a,{childList:!0,subtree:!0,characterData:!0}),l.push(()=>E.disconnect())}return v},P=()=>{if(!M)return;try{o=new te({antialias:!1,alpha:!0,powerPreference:"high-performance"})}catch{return}o.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const a=o.domElement;a.style.width="100%",a.style.height="100%",a.style.display="block",b.appendChild(a);const T=new ae,u=new oe(30,1,.1,60);u.position.set(0,0,10),c=new re({vertexShader:de,fragmentShader:pe,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uMorph:{value:1},uSpread:{value:0},uScatter:{value:0},uSize:{value:1},uAspect:{value:1},uHover:{value:0},uFade:{value:1},uWide:{value:1},uMouse:{value:new _(9,9)},uTilt:{value:new _},uShock:{value:new D(0,0,-99,0)},uInk:{value:new V},uAccent:{value:new V},uCanvas:{value:new V}}}),ne(),document.querySelectorAll("[data-particles]").forEach(n=>{n.getClientRects().length&&z.push(O(n,T))});const h={x:-1e4,y:-1e4},r=new D(0,0,-99,0),d=n=>{n.pointerType!=="touch"&&(h.x=n.clientX,h.y=n.clientY)},A=n=>{var p,i;n.pointerType==="touch"||(i=(p=n.target).closest)!=null&&i.call(p,"a, button, input, textarea, label")||r.set(n.clientX/innerWidth*2-1,-(n.clientY/innerHeight)*2+1,(performance.now()-f)/1e3,1)};window.addEventListener("pointermove",d,{passive:!0}),window.addEventListener("pointerdown",A,{passive:!0}),l.push(()=>{window.removeEventListener("pointermove",d),window.removeEventListener("pointerdown",A)});let S="";const f=performance.now(),k=n=>{t=requestAnimationFrame(k);const p=innerWidth,i=innerHeight;S!==`${p}x${i}`&&(S=`${p}x${i}`,o.setSize(p,i,!1),u.aspect=p/i,u.updateProjectionMatrix());const $=2*Math.tan(ue.degToRad(15))*10/i,g=(n-f)/1e3;let W=!1;for(const e of z){const m=e.el.getBoundingClientRect(),v=e.u;v.uInk.value.fromArray(B.ink),v.uAccent.value.fromArray(B.accent),v.uCanvas.value.fromArray(B.canvas);let N;if(e.boot)N=Math.min(1,Math.max(0,scrollY/(i*.75)));else{const H=(m.top+m.height/2)/i;N=H<.22?e.stay?0:U(0,1,(.22-H)/.32):H>.84?U(0,1,(H-.84)/.3):0}v.uScatter.value+=(N-v.uScatter.value)*.1;const s=v.uScatter.value>.985&&(m.bottom<-i*.3||m.top>i*1.3);if(e.pts.visible=!s,s)continue;W=!0;const E=m.width*$/e.w.width;e.pts.scale.setScalar(E),e.pts.position.set((m.left+m.width/2-p/2)*$,(i/2-(m.top+m.height*.47))*$,0),v.uSize.value=(R?1:1.15)*o.getPixelRatio()*Math.sqrt(Math.max(.5,E)),v.uAspect.value=u.aspect,v.uTime.value=g,v.uMouse.value.set(h.x/p*2-1,-(h.y/i)*2+1),v.uShock.value.copy(r);const j=m.left+m.width/2,I=m.top+m.height/2,y=!C&&h.x>-1e3?Math.max(0,1-Math.hypot(h.x-j,h.y-I)/(p*.5)):0,J=y?(h.x-j)/p*1.1:Math.sin(g*.4+m.top*.001)*.18,K=y?(h.y-I)/i*.7:Math.sin(g*.3)*.06;e.tilt.x+=(J-e.tilt.x)*.06,e.tilt.y+=(K-e.tilt.y)*.06,v.uTilt.value.set(e.tilt.x,e.tilt.y),e.hover+=((C?0:1)-e.hover)*.08,v.uHover.value=e.hover}a.style.visibility=W?"":"hidden",W&&o.render(T,u)};t=requestAnimationFrame(k);let F=!1;const w=()=>{document.hidden||F?(cancelAnimationFrame(t),t=0):t||(t=requestAnimationFrame(k))};document.addEventListener("visibilitychange",w),l.push(Y("open-project",()=>{F=!0,w()}),Y("sheet:closed",()=>{F=!1,w()})),l.push(()=>document.removeEventListener("visibilitychange",w),()=>{c.dispose(),o.dispose(),a.remove()})};return document.fonts.ready.then(()=>window.requestIdleCallback?requestIdleCallback(P,{timeout:800}):setTimeout(P,50)),()=>{M=!1,cancelAnimationFrame(t),l.forEach(a=>a())}},[]),ee.jsx("div",{ref:x,"aria-hidden":!0,className:"fixed inset-0 z-0 pointer-events-none"})}export{ve as default};
