var Mp=Object.defineProperty;var Sp=(r,e,t)=>e in r?Mp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ne=(r,e,t)=>(Sp(r,typeof e!="symbol"?e+"":e,t),t);import{r as Ge,j as K,P as li,a as Lo,C as yp,c as Ep,R as Tp}from"./index-d165da0d.js";function Ai(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ld(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Xn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ba={duration:.5,overwrite:!1,delay:0},ru,rn,Rt,ti=1e8,St=1/ti,mc=Math.PI*2,bp=mc/4,wp=0,cd=Math.sqrt,Ap=Math.cos,Rp=Math.sin,en=function(e){return typeof e=="string"},Nt=function(e){return typeof e=="function"},Oi=function(e){return typeof e=="number"},su=function(e){return typeof e>"u"},Mi=function(e){return typeof e=="object"},wn=function(e){return e!==!1},au=function(){return typeof window<"u"},Xa=function(e){return Nt(e)||en(e)},ud=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},hn=Array.isArray,Cp=/random\([^)]+\)/g,Pp=/,\s*/g,zu=/(?:-?\.?\d|\.)+/gi,hd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,gs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,xl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,fd=/[+-]=-?[.\d]+/,Lp=/[^,'"\[\]\s]+/gi,Dp=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Lt,di,_c,ou,Yn={},Go={},dd,pd=function(e){return(Go=Ds(e,Yn))&&Dn},lu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},wa=function(e,t){return!t&&console.warn(e)},md=function(e,t){return e&&(Yn[e]=t)&&Go&&(Go[e]=t)||Yn},Aa=function(){return 0},Up={suppressEvents:!0,isStart:!0,kill:!1},Do={suppressEvents:!0,kill:!1},Np={suppressEvents:!0},cu={},tr=[],gc={},_d,zn={},Ml={},ku=30,Uo=[],uu="",hu=function(e){var t=e[0],n,i;if(Mi(t)||Nt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Uo.length;i--&&!Uo[i].targetTest(t););n=Uo[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Bd(e[i],n)))||e.splice(i,1);return e},Dr=function(e){return e._gsap||hu(ni(e))[0]._gsap},gd=function(e,t,n){return(n=e[t])&&Nt(n)?e[t]():su(n)&&e.getAttribute&&e.getAttribute(t)||n},An=function(e,t){return(e=e.split(",")).forEach(t)||e},It=function(e){return Math.round(e*1e5)/1e5||0},Pt=function(e){return Math.round(e*1e7)/1e7||0},ys=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Ip=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Vo=function(){var e=tr.length,t=tr.slice(0),n,i;for(gc={},tr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},fu=function(e){return!!(e._initted||e._startAt||e.add)},vd=function(e,t,n,i){tr.length&&!rn&&Vo(),e.render(t,n,i||!!(rn&&t<0&&fu(e))),tr.length&&!rn&&Vo()},xd=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Lp).length<2?t:en(e)?e.trim():e},Md=function(e){return e},jn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Op=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Ds=function(e,t){for(var n in t)e[n]=t[n];return e},Hu=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Mi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Wo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ua=function(e){var t=e.parent||Lt,n=e.keyframes?Op(hn(e.keyframes)):jn;if(wn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Fp=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Sd=function(e,t,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},al=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},or=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ur=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Bp=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},vc=function(e,t,n,i){return e._startAt&&(rn?e._startAt.revert(Do):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},zp=function r(e){return!e||e._ts&&r(e.parent)},Gu=function(e){return e._repeat?Us(e._tTime,e=e.duration()+e._rDelay)*e:0},Us=function(e,t){var n=Math.floor(e=Pt(e/t));return e&&n===e?n-1:n},Xo=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ol=function(e){return e._end=Pt(e._start+(e._tDur/Math.abs(e._ts||e._rts||St)||0))},ll=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Pt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ol(e),n._dirty||Ur(n,e)),e},yd=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Xo(e.rawTime(),t),(!t._dur||Ba(0,t.totalDuration(),n)-t._tTime>St)&&t.render(n,!0)),Ur(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-St}},_i=function(e,t,n,i){return t.parent&&or(t),t._start=Pt((Oi(n)?n:n||e!==Lt?Kn(e,n,t):e._time)+t._delay),t._end=Pt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Sd(e,t,"_first","_last",e._sort?"_start":0),xc(t)||(e._recent=t),i||yd(e,t),e._ts<0&&ll(e,e._tTime),e},Ed=function(e,t){return(Yn.ScrollTrigger||lu("scrollTrigger",t))&&Yn.ScrollTrigger.create(t,e)},Td=function(e,t,n,i,s){if(pu(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!rn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&_d!==Hn.frame)return tr.push(e),e._lazy=[s,i],1},kp=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},xc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Hp=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&kp(e)&&!(!e._initted&&xc(e))||(e._ts<0||e._dp._ts<0)&&!xc(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Ba(0,e._tDur,t),u=Us(l,a),e._yoyo&&u&1&&(o=1-o),u!==Us(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||rn||i||e._zTime===St||!t&&e._zTime){if(!e._initted&&Td(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?St:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&vc(e,t,n,!0),e._onUpdate&&!n&&Vn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Vn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&or(e,1),!n&&!rn&&(Vn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Gp=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ns=function(e,t,n,i){var s=e._repeat,o=Pt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Pt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&ll(e,e._tTime=e._tDur*a),e.parent&&ol(e),n||Ur(e.parent,e),e},Vu=function(e){return e instanceof bn?Ur(e):Ns(e,e._dur)},Vp={_start:0,endTime:Aa,totalDuration:Aa},Kn=function r(e,t,n){var i=e.labels,s=e._recent||Vp,o=e.duration()>=ti?s.endTime(!1):e._dur,a,l,c;return en(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(hn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},ha=function(e,t,n){var i=Oi(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=wn(l.vars.inherit)&&l.parent;o.immediateRender=wn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Ht(t[0],o,t[s+1])},dr=function(e,t){return e||e===0?t(e):t},Ba=function(e,t,n){return n<e?e:n>t?t:n},cn=function(e,t){return!en(e)||!(t=Dp.exec(e))?"":t[1]},Wp=function(e,t,n){return dr(n,function(i){return Ba(e,t,i)})},Mc=[].slice,bd=function(e,t){return e&&Mi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Mi(e[0]))&&!e.nodeType&&e!==di},Xp=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return en(i)&&!t||bd(i,1)?(s=n).push.apply(s,ni(i)):n.push(i)})||n},ni=function(e,t,n){return Rt&&!t&&Rt.selector?Rt.selector(e):en(e)&&!n&&(_c||!Is())?Mc.call((t||ou).querySelectorAll(e),0):hn(e)?Xp(e,n):bd(e)?Mc.call(e,0):e?[e]:[]},Sc=function(e){return e=ni(e)[0]||wa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ni(t,n.querySelectorAll?n:n===e?wa("Invalid scope")||ou.createElement("div"):e)}},wd=function(e){return e.sort(function(){return .5-Math.random()})},Ad=function(e){if(Nt(e))return e;var t=Mi(e)?e:{each:e},n=Nr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,h=i;return en(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||t).length,p=o[_],m,y,v,S,M,A,T,P,x;if(!p){if(x=t.grid==="auto"?0:(t.grid||[1,ti])[1],!x){for(T=-ti;T<(T=g[x++].getBoundingClientRect().left)&&x<_;);x<_&&x--}for(p=o[_]=[],m=l?Math.min(x,_)*u-.5:i%x,y=x===ti?0:l?_*h/x-.5:i/x|0,T=0,P=ti,A=0;A<_;A++)v=A%x-m,S=y-(A/x|0),p[A]=M=c?Math.abs(c==="y"?S:v):cd(v*v+S*S),M>T&&(T=M),M<P&&(P=M);i==="random"&&wd(p),p.max=T-P,p.min=P,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(x>_?_-1:c?c==="y"?_/x:x:Math.max(x,_/x))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=cn(t.amount||t.each)||0,n=n&&_<0?r0(n):n}return _=(p[f]-p.min)/p.max||0,Pt(p.b+(n?n(_):_)*p.v)+p.u}},yc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Pt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Oi(n)?0:cn(n))}},Rd=function(e,t){var n=hn(e),i,s;return!n&&Mi(e)&&(i=n=e.radius||ti,e.values?(e=ni(e.values),(s=!Oi(e[0]))&&(i*=i)):e=yc(e.increment)),dr(t,n?Nt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=ti,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-a,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?e[u]:o,s||u===o||Oi(o)?u:u+cn(o)}:yc(e))},Cd=function(e,t,n,i){return dr(hn(e)?!t:n===!0?!!(n=0):!i,function(){return hn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},qp=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},Yp=function(e,t){return function(n){return e(parseFloat(n))+(t||cn(n))}},jp=function(e,t,n){return Ld(e,t,0,1,n)},Pd=function(e,t,n){return dr(n,function(i){return e[~~t(i)]})},$p=function r(e,t,n){var i=t-e;return hn(e)?Pd(e,r(0,e.length),t):dr(n,function(s){return(i+(s-e)%i)%i+e})},Kp=function r(e,t,n){var i=t-e,s=i*2;return hn(e)?Pd(e,r(0,e.length-1),t):dr(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Ra=function(e){return e.replace(Cp,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Pp);return Cd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Ld=function(e,t,n,i,s){var o=t-e,a=i-n;return dr(s,function(l){return n+((l-e)/o*a||0)})},Zp=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=en(e),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(hn(e)&&!hn(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=Ds(hn(e)?[]:{},e));if(!u){for(l in t)du.call(a,e,l,"get",t[l]);s=function(g){return gu(g,a)||(o?e.p:e)}}}return dr(n,s)},Wu=function(e,t,n){var i=e.labels,s=ti,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Vn=function(e,t,n){var i=e.vars,s=i[t],o=Rt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&tr.length&&Vo(),a&&(Rt=a),u=l?s.apply(c,l):s.call(c),Rt=o,u},ta=function(e){return or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!rn),e.progress()<1&&Vn(e,"onInterrupt"),e},vs,Dd=[],Ud=function(e){if(e)if(e=!e.name&&e.default||e,au()||e.headless){var t=e.name,n=Nt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Aa,render:gu,add:du,kill:p0,modifier:d0,rawVars:0},o={targetTest:0,get:0,getSetter:_u,aliases:{},register:0};if(Is(),e!==i){if(zn[t])return;jn(i,jn(Wo(e,s),o)),Ds(i.prototype,Ds(s,Wo(e,o))),zn[i.prop=t]=i,e.targetTest&&(Uo.push(i),cu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}md(t,i),e.register&&e.register(Dn,i,Rn)}else Dd.push(e)},Mt=255,na={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},Sl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Mt+.5|0},Nd=function(e,t,n){var i=e?Oi(e)?[e>>16,e>>8&Mt,e&Mt]:0:na.black,s,o,a,l,c,u,h,f,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),na[e])i=na[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Mt,i&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(zu),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Sl(l+1/3,s,o),i[1]=Sl(l,s,o),i[2]=Sl(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(hd),n&&i.length<4&&(i[3]=1),i}else i=e.match(zu)||na.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Mt,o=i[1]/Mt,a=i[2]/Mt,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Id=function(e){var t=[],n=[],i=-1;return e.split(nr).forEach(function(s){var o=s.match(gs)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Xu=function(e,t,n){var i="",s=(e+i).match(nr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(f){return(f=Nd(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Id(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(nr,"1").split(gs),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(nr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},nr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in na)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),Jp=/hsl[a]?\(/,Od=function(e){var t=e.join(" "),n;if(nr.lastIndex=0,nr.test(t))return n=Jp.test(t),e[1]=Xu(e[1],n),e[0]=Xu(e[0],n,Id(e[1])),!0},Ca,Hn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,g=function _(p){var m=r()-i,y=p===!0,v,S,M,A;if((m>e||m<0)&&(n+=m-t),i+=m,M=i-n,v=M-o,(v>0||y)&&(A=++h.frame,f=M-h.time*1e3,h.time=M=M/1e3,o+=v+(v>=s?4:s-v),S=1),y||(l=c(_)),S)for(d=0;d<a.length;d++)a[d](M,f,A,p)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){dd&&(!_c&&au()&&(di=_c=window,ou=di.document||{},Yn.gsap=Dn,(di.gsapVersions||(di.gsapVersions=[])).push(Dn.version),pd(Go||di.GreenSockGlobals||!di.gsap&&di||{}),Dd.forEach(Ud)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(p){return setTimeout(p,o-h.time*1e3+1|0)},Ca=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ca=0,c=Aa},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),o=h.time*1e3+s},add:function(p,m,y){var v=m?function(S,M,A,T){p(S,M,A,T),h.remove(v)}:p;return h.remove(p),a[y?"unshift":"push"](v),Is(),v},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&d>=m&&d--},_listeners:a},h}(),Is=function(){return!Ca&&Hn.wake()},lt={},Qp=/^[\d.\-M][\d.\-,\s]/,e0=/["']/g,t0=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(e0,"").trim():+c,i=l.substr(a+1).trim();return t},n0=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},i0=function(e){var t=(e+"").split("("),n=lt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[t0(t[1])]:n0(e).split(",").map(xd)):lt._CE&&Qp.test(e)?lt._CE("",e):n},r0=function(e){return function(t){return 1-e(1-t)}},Nr=function(e,t){return e&&(Nt(e)?e:lt[e]||i0(e))||t},Yr=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return An(e,function(a){lt[a]=Yn[a]=s,lt[o=a.toLowerCase()]=n;for(var l in s)lt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=lt[a+"."+l]=s[l]}),s},Fd=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},yl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/mc*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*Rp((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Fd(a);return s=mc/s,l.config=function(c,u){return r(e,c,u)},l},El=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Fd(n);return i.config=function(s){return r(e,s)},i};An("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Yr(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});lt.Linear.easeNone=lt.none=lt.Linear.easeIn;Yr("Elastic",yl("in"),yl("out"),yl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Yr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Yr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Yr("Circ",function(r){return-(cd(1-r*r)-1)});Yr("Sine",function(r){return r===1?1:-Ap(r*bp)+1});Yr("Back",El("in"),El("out"),El());lt.SteppedEase=lt.steps=Yn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-St;return function(a){return((i*Ba(0,o,a)|0)+s)*n}}};ba.ease=lt["quad.out"];An("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return uu+=r+","+r+"Params,"});var Bd=function(e,t){this.id=wp++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:gd,this.set=t?t.getSetter:_u},Pa=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ns(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),Ca||Hn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ns(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Is(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ll(this,n),!s._dp||s.parent||yd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&_i(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===St||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),vd(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Gu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Gu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Us(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-St?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Xo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-St?0:this._rts,this.totalTime(Ba(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),ol(this),Bp(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Is(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==St&&(this._tTime-=St)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Pt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&_i(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(wn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Xo(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Np);var i=rn;return rn=n,fu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),rn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Vu(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Vu(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Kn(this,n),wn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,wn(i)),this._dur||(this._zTime=-St),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-St:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-St,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-St)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=Nt(n)?n:Md,l=function(){var u=i.then;i.then=null,s&&s(),Nt(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){ta(this)},r}();jn(Pa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-St,_prom:0,_ps:!1,_rts:1});var bn=function(r){ld(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=wn(n.sortChildren),Lt&&_i(n.parent||Lt,Ai(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ed(Ai(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return ha(0,arguments,this),this},t.from=function(i,s,o){return ha(1,arguments,this),this},t.fromTo=function(i,s,o,a){return ha(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,ua(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ht(i,s,Kn(this,o),1),this},t.call=function(i,s,o){return _i(this,Ht.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ht(i,o,Kn(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,ua(o).immediateRender=wn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,ua(a).immediateRender=wn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Pt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,_,p,m,y,v,S,M,A,T;if(this!==Lt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,S=this._start,v=this._ts,m=!v,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(f=Pt(u%p),u===l?(_=this._repeat,f=c):(M=Pt(u/p),_=~~M,_&&_===M&&(f=c,_--),f>c&&(f=c)),M=Us(this._tTime,p),!a&&this._tTime&&M!==_&&this._tTime-M*p-this._dur<=0&&(M=_),A&&_&1&&(f=c-f,T=1),_!==M&&!this._lock){var P=A&&M&1,x=P===(A&&_&1);if(_<M&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Pt(_*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Vn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,M=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Gp(this,Pt(a),Pt(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&c&&!s&&!M&&(Vn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=-St);break}}d=g}else{d=this._last;for(var E=i<0?i:f;d;){if(g=d._prev,(d._act||E<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(E-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(E-d._start)*d._ts,s,o||rn&&fu(d)),f!==this._time||!this._ts&&!m){y=0,g&&(u+=this._zTime=E?-St:St);break}}d=g}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-St)._zTime=f>=a?1:-1,this._ts))return this._start=S,ol(this),this.render(i,s,o);this._onUpdate&&!s&&Vn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(S===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&or(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Vn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Oi(s)||(s=Kn(this,s,i)),!(i instanceof Pa)){if(hn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(en(i))return this.addLabel(i,s);if(Nt(i))i=Ht.delayedCall(0,i);else return this}return this!==i?_i(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ti);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ht?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return en(i)?this.removeLabel(i):Nt(i)?this.killTweensOf(i):(i.parent===this&&al(this,i),i===this._recent&&(this._recent=this._last),Ur(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Pt(Hn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Kn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Ht.delayedCall(0,s||Aa,o);return a.data="isPause",this._hasPause=1,_i(this,a,Kn(this,i))},t.removePause=function(i){var s=this._first;for(i=Kn(this,i);s;)s._start===i&&s.data==="isPause"&&or(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Yi!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=ni(i),l=this._first,c=Oi(s),u;l;)l instanceof Ht?Ip(l._targets,a)&&(c?(!Yi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Kn(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=Ht.to(o,jn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||St,onStart:function(){if(o.pause(),!d){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==p&&Ns(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,jn({startAt:{time:Kn(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Wu(this,Kn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Wu(this,Kn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+St)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Pt(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ur(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ur(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=ti,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,_i(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=Pt(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Ns(o,o===Lt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Lt._ts&&(vd(Lt,Xo(i,Lt)),_d=Hn.frame),Hn.frame>=ku){ku+=Xn.autoSleep||120;var s=Lt._first;if((!s||!s._ts)&&Xn.autoSleep&&Hn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Hn.sleep()}}},e}(Pa);jn(bn.prototype,{_lock:0,_hasPause:0,_forcing:0});var s0=function(e,t,n,i,s,o,a){var l=new Rn(this._pt,e,t,0,1,Wd,null,s),c=0,u=0,h,f,d,g,_,p,m,y;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Ra(i)),o&&(y=[n,i],o(y,e,t),n=y[0],i=y[1]),f=n.match(xl)||[];h=xl.exec(i);)g=h[0],_=i.substring(c,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(p=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?ys(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=xl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(fd.test(i)||m)&&(l.e=0),this._pt=l,l},du=function(e,t,n,i,s,o,a,l,c,u){Nt(i)&&(i=i(s||0,e,o));var h=e[t],f=n!=="get"?n:Nt(h)?c?e[t.indexOf("set")||!Nt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Nt(h)?c?u0:Gd:mu,g;if(en(i)&&(~i.indexOf("random(")&&(i=Ra(i)),i.charAt(1)==="="&&(g=ys(f,i)+(cn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Ec)return!isNaN(f*i)&&i!==""?(g=new Rn(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?f0:Vd,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&lu(t,i),s0.call(this,e,t,f,i,d,l||Xn.stringFilter,c))},a0=function(e,t,n,i,s){if(Nt(e)&&(e=fa(e,s,t,n,i)),!Mi(e)||e.style&&e.nodeType||hn(e)||ud(e))return en(e)?fa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=fa(e[a],s,t,n,i);return o},zd=function(e,t,n,i,s,o){var a,l,c,u;if(zn[e]&&(a=new zn[e]).init(s,a.rawVars?t[e]:a0(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Rn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==vs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Yi,Ec,pu=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,p=e._targets,m=e.parent,y=m&&m.data==="nested"?m.vars.targets:p,v=e._overwrite==="auto"&&!ru,S=e.timeline,M=i.easeReverse||h,A,T,P,x,E,B,N,j,L,I,$,O,V;if(S&&(!f||!s)&&(s="none"),e._ease=Nr(s,ba.ease),e._rEase=M&&(Nr(M)||e._ease),e._from=!S&&!!i.runBackwards,e._from&&(e.ratio=1),!S||f&&!i.stagger){if(j=p[0]?Dr(p[0]).harness:0,O=j&&i[j.prop],A=Wo(i,cu),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Do:Up),_._lazy=0),o){if(or(e._startAt=Ht.set(p,jn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&wn(l),startAt:null,delay:0,onUpdate:c&&function(){return Vn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(rn||!a&&!d)&&e._startAt.revert(Do),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),P=jn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&wn(l),immediateRender:a,stagger:0,parent:m},A),O&&(P[j.prop]=O),or(e._startAt=Ht.set(p,P)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(rn?e._startAt.revert(Do):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,St,St);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&wn(l)||l&&!g,T=0;T<p.length;T++){if(E=p[T],N=E._gsap||hu(p)[T]._gsap,e._ptLookup[T]=I={},gc[N.id]&&tr.length&&Vo(),$=y===p?T:y.indexOf(E),j&&(L=new j).init(E,O||A,e,$,y)!==!1&&(e._pt=x=new Rn(e._pt,E,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(z){I[z]=x}),L.priority&&(B=1)),!j||O)for(P in A)zn[P]&&(L=zd(P,A,e,$,E,y))?L.priority&&(B=1):I[P]=x=du.call(e,E,P,"get",A[P],$,y,0,i.stringFilter);e._op&&e._op[T]&&e.kill(E,e._op[T]),v&&e._pt&&(Yi=e,Lt.killTweensOf(E,I,e.globalTime(t)),V=!e.parent,Yi=0),e._pt&&l&&(gc[N.id]=1)}B&&Xd(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!V,f&&t<=0&&S.render(ti,!0,!0)},o0=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Ec=1,e.vars[t]="+=0",pu(e,a),Ec=0,l?wa(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=It(n)+cn(h.e)),h.b&&(h.b=u.s+cn(h.b))},l0=function(e,t){var n=e[0]?Dr(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Ds({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},c0=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(hn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},fa=function(e,t,n,i,s){return Nt(e)?e.call(t,n,i,s):en(e)&&~e.indexOf("random(")?Ra(e):e},kd=uu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Hd={};An(kd+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Hd[r]=1});var Ht=function(r){ld(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:ua(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Lt,y=(hn(n)||ud(n)?Oi(n[0]):"length"in i)?[n]:ni(n),v,S,M,A,T,P,x,E;if(a._targets=y.length?hu(y):wa("GSAP target "+n+" not found. https://gsap.com",!Xn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||Xa(c)||Xa(u)){i=a.vars;var B=i.easeReverse||i.yoyoEase;if(v=a.timeline=new bn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:y}),v.kill(),v.parent=v._dp=Ai(a),v._start=0,f||Xa(c)||Xa(u)){if(A=y.length,x=f&&Ad(f),Mi(f))for(T in f)~kd.indexOf(T)&&(E||(E={}),E[T]=f[T]);for(S=0;S<A;S++)M=Wo(i,Hd),M.stagger=0,B&&(M.easeReverse=B),E&&Ds(M,E),P=y[S],M.duration=+fa(c,Ai(a),S,P,y),M.delay=(+fa(u,Ai(a),S,P,y)||0)-a._delay,!f&&A===1&&M.delay&&(a._delay=u=M.delay,a._start+=u,M.delay=0),v.to(P,M,x?x(S,P,y):0),v._ease=lt.none;v.duration()?c=u=0:a.timeline=0}else if(g){ua(jn(v.vars.defaults,{ease:"none"})),v._ease=Nr(g.ease||i.ease||"none");var N=0,j,L,I;if(hn(g))g.forEach(function($){return v.to(y,$,">")}),v.duration();else{M={};for(T in g)T==="ease"||T==="easeEach"||c0(T,g[T],M,g.easeEach);for(T in M)for(j=M[T].sort(function($,O){return $.t-O.t}),N=0,S=0;S<j.length;S++)L=j[S],I={ease:L.e,duration:(L.t-(S?j[S-1].t:0))/100*c},I[T]=L.v,v.to(y,I,N),N+=I.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!ru&&(Yi=Ai(a),Lt.killTweensOf(y),Yi=0),_i(m,Ai(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!g&&a._start===Pt(m._time)&&wn(h)&&zp(Ai(a))&&m.data!=="nested")&&(a._tTime=-St,a.render(Math.max(0,-u)||0)),p&&Ed(Ai(a),p),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-St&&!u?l:i<St?0:i,f,d,g,_,p,m,y,v;if(!c)Hp(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=Pt(h%_),h===l?(g=this._repeat,f=c):(p=Pt(h/_),g=~~p,g&&g===p?(f=c,g--):f>c&&(f=c)),m=this._yoyo&&g&1,m&&(f=c-f),p=Us(this._tTime,_),f===a&&!o&&this._initted&&g===p)return this._tTime=h,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Pt(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Td(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var S=f<a;if(S!==this._inv){var M=S?a:c-a;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=M?(S?-1:1)/M:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(f/c);if(this._from&&(this.ratio=y=1-y),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!p&&(Vn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&vc(this,i,s,o),Vn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&Vn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&vc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&or(this,1),!s&&!(u&&!a)&&(h||a||m)&&(Vn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Ca||Hn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||pu(this,c),u=this._ease(c/this._dur),o0(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(ll(this,0),this.parent||Sd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ta(this):this.scrollTrigger&&this.scrollTrigger.kill(!!rn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Yi&&Yi.vars.overwrite!==!0)._first||ta(this),this.parent&&o!==this.timeline.totalDuration()&&Ns(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ni(i):a,c=this._ptLookup,u=this._pt,h,f,d,g,_,p,m;if((!s||s==="all")&&Fp(a,l))return s==="all"&&(this._pt=0),ta(this);for(h=this._op=this._op||[],s!=="all"&&(en(s)&&(_={},An(s,function(y){return _[y]=1}),s=_),s=l0(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){f=c[m],s==="all"?(h[m]=s,g=f,d={}):(d=h[m]=h[m]||{},g=s);for(_ in g)p=f&&f[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&al(this,p,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&ta(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ha(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return ha(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Lt.killTweensOf(i,s,o)},e}(Pa);jn(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});An("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var e=new bn,t=Mc.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var mu=function(e,t,n){return e[t]=n},Gd=function(e,t,n){return e[t](n)},u0=function(e,t,n,i){return e[t](i.fp,n)},h0=function(e,t,n){return e.setAttribute(t,n)},_u=function(e,t){return Nt(e[t])?Gd:su(e[t])&&e.setAttribute?h0:mu},Vd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},f0=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Wd=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},gu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},d0=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},p0=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?al(this,t,"_pt"):t.dep||(n=1),t=i;return!n},m0=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Xd=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Rn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Vd,this.d=l||this,this.set=c||mu,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=m0,this.m=n,this.mt=s,this.tween=i},r}();An(uu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return cu[r]=1});Yn.TweenMax=Yn.TweenLite=Ht;Yn.TimelineLite=Yn.TimelineMax=bn;Lt=new bn({sortChildren:!1,defaults:ba,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Xn.stringFilter=Od;var Ir=[],No={},_0=[],qu=0,g0=0,Tl=function(e){return(No[e]||_0).map(function(t){return t()})},Tc=function(){var e=Date.now(),t=[];e-qu>2&&(Tl("matchMediaInit"),Ir.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=di.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Tl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),qu=e,Tl("matchMedia"))},qd=function(){function r(t,n){this.selector=n&&Sc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=g0++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Nt(n)&&(s=i,i=n,n=Nt);var o=this,a=function(){var c=Rt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Sc(s)),Rt=o,h=i.apply(o,arguments),Nt(h)&&o._r.push(h),Rt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Nt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Rt;Rt=null,n(this),Rt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ht&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof bn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ht)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Ir.length;o--;)Ir[o].id===this.id&&Ir.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),v0=function(){function r(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Mi(n)||(n={matches:n});var o=new qd(0,s||this.scope),a=o.conditions={},l,c,u;Rt&&!o.selector&&(o.selector=Rt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=di.matchMedia(n[c]),l&&(Ir.indexOf(o)<0&&Ir.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Tc):l.addEventListener("change",Tc)));return u&&i(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),qo={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Ud(i)})},timeline:function(e){return new bn(e)},getTweensOf:function(e,t){return Lt.getTweensOf(e,t)},getProperty:function(e,t,n,i){en(e)&&(e=ni(e)[0]);var s=Dr(e||{}).get,o=n?Md:xd;return n==="native"&&(n=""),e&&(t?o((zn[t]&&zn[t].get||s)(e,t,n,i)):function(a,l,c){return o((zn[a]&&zn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=ni(e),e.length>1){var i=e.map(function(u){return Dn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var o=zn[t],a=Dr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;vs._pt=0,h.init(e,n?u+n:u,vs,0,[e]),h.render(1,h),vs._pt&&gu(1,vs)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Dn.to(e,jn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Lt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Nr(e.ease,ba.ease)),Hu(ba,e||{})},config:function(e){return Hu(Xn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!zn[a]&&!Yn[a]&&wa(t+" effect requires "+a+" plugin.")}),Ml[t]=function(a,l,c){return n(ni(a),jn(l||{},s),c)},o&&(bn.prototype[t]=function(a,l,c){return this.add(Ml[t](a,Mi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){lt[e]=Nr(t)},parseEase:function(e,t){return arguments.length?Nr(e,t):lt},getById:function(e){return Lt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new bn(e),i,s;for(n.smoothChildTiming=wn(e.smoothChildTiming),Lt.remove(n),n._dp=0,n._time=n._tTime=Lt._time,i=Lt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ht&&i.vars.onComplete===i._targets[0]))&&_i(n,i,i._start-i._delay),i=s;return _i(Lt,n,0),n},context:function(e,t){return e?new qd(e,t):Rt},matchMedia:function(e){return new v0(e)},matchMediaRefresh:function(){return Ir.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Tc()},addEventListener:function(e,t){var n=No[e]||(No[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=No[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:$p,wrapYoyo:Kp,distribute:Ad,random:Cd,snap:Rd,normalize:jp,getUnit:cn,clamp:Wp,splitColor:Nd,toArray:ni,selector:Sc,mapRange:Ld,pipe:qp,unitize:Yp,interpolate:Zp,shuffle:wd},install:pd,effects:Ml,ticker:Hn,updateRoot:bn.updateRoot,plugins:zn,globalTimeline:Lt,core:{PropTween:Rn,globals:md,Tween:Ht,Timeline:bn,Animation:Pa,getCache:Dr,_removeLinkedListItem:al,reverting:function(){return rn},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return ru=e}}};An("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return qo[r]=Ht[r]});Hn.add(bn.updateRoot);vs=qo.to({},{duration:0});var x0=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},M0=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=x0(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},bl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(en(s)&&(l={},An(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}M0(a,s)}}}},Dn=qo.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)rn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},bl("roundProps",yc),bl("modifiers"),bl("snap",Rd))||qo;Ht.version=bn.version=Dn.version="3.15.0";dd=1;au()&&Is();lt.Power0;lt.Power1;lt.Power2;lt.Power3;lt.Power4;lt.Linear;lt.Quad;lt.Cubic;lt.Quart;lt.Quint;lt.Strong;lt.Elastic;lt.Back;lt.SteppedEase;lt.Bounce;lt.Sine;lt.Expo;lt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Yu,ji,Es,vu,Pr,ju,xu,S0=function(){return typeof window<"u"},Fi={},yr=180/Math.PI,Ts=Math.PI/180,jr=Math.atan2,$u=1e8,Mu=/([A-Z])/g,y0=/(left|right|width|margin|padding|x)/i,E0=/[\s,\(]\S/,gi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},T0=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},b0=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},w0=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},A0=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Yd=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},jd=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},R0=function(e,t,n){return e.style[t]=n},C0=function(e,t,n){return e.style.setProperty(t,n)},P0=function(e,t,n){return e._gsap[t]=n},L0=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},D0=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},U0=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Dt="transform",Cn=Dt+"Origin",N0=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Fi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=gi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Ri(i,a)}):this.tfm[e]=o.x?o[e]:Ri(i,e),e===Cn&&(this.tfm.zOrigin=o.zOrigin);else return gi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Dt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Cn,t,"")),e=Dt}(s||t)&&this.props.push(e,t,s[e])},$d=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},I0=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Mu,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=xu(),(!s||!s.isStart)&&!n[Dt]&&($d(n),i.zOrigin&&n[Cn]&&(n[Cn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Kd=function(e,t){var n={target:e,props:[],revert:I0,save:N0};return e._gsap||Dn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Zd,wc=function(e,t){var n=ji.createElementNS?ji.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ji.createElement(e);return n&&n.style?n:ji.createElement(e)},Wn=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Mu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Os(t)||t,1)||""},Ku="O,Moz,ms,Ms,Webkit".split(","),Os=function(e,t,n){var i=t||Pr,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Ku[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Ku[o]:"")+e},Ac=function(){S0()&&window.document&&(Yu=window,ji=Yu.document,Es=ji.documentElement,Pr=wc("div")||{style:{}},wc("div"),Dt=Os(Dt),Cn=Dt+"Origin",Pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zd=!!Os("perspective"),xu=Dn.core.reverting,vu=1)},Zu=function(e){var t=e.ownerSVGElement,n=wc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Es.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Es.removeChild(n),s},Ju=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Jd=function(e){var t,n;try{t=e.getBBox()}catch{t=Zu(e),n=1}return t&&(t.width||t.height)||n||(t=Zu(e)),t&&!t.width&&!t.x&&!t.y?{x:+Ju(e,["x","cx","x1"])||0,y:+Ju(e,["y","cy","y1"])||0,width:0,height:0}:t},Qd=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Jd(e))},lr=function(e,t){if(t){var n=e.style,i;t in Fi&&t!==Cn&&(t=Dt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Mu,"-$1").toLowerCase())):n.removeAttribute(t)}},$i=function(e,t,n,i,s,o){var a=new Rn(e._pt,t,n,0,1,o?jd:Yd);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Qu={deg:1,rad:1,turn:1},O0={grid:1,flex:1},cr=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Pr.style,l=y0.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,p,m;if(i===o||!s||Qu[i]||Qu[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),m=e.getCTM&&Qd(e),(d||o==="%")&&(Fi[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[u],It(d?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(f?o:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===ji||!_.appendChild)&&(_=ji.body),p=_._gsap,p&&d&&p.width&&l&&p.time===Hn.time&&!p.uncache)return It(s/p.width*h);if(d&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=h+i,g=e[u],y?e.style[t]=y:lr(e,t)}else(d||o==="%")&&!O0[Wn(_,"display")]&&(a.position=Wn(e,"position")),_===e&&(a.position="static"),_.appendChild(Pr),g=Pr[u],_.removeChild(Pr),a.position="absolute";return l&&d&&(p=Dr(_),p.time=Hn.time,p.width=_[u]),It(f?g*s/h:g&&s?h/g*s:0)},Ri=function(e,t,n,i){var s;return vu||Ac(),t in gi&&t!=="transform"&&(t=gi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Fi[t]&&t!=="transform"?(s=Da(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:jo(Wn(e,Cn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Yo[t]&&Yo[t](e,t,n)||Wn(e,t)||gd(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?cr(e,t,s,n)+n:s},F0=function(e,t,n,i){if(!n||n==="none"){var s=Os(t,e,1),o=s&&Wn(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Wn(e,"borderTopColor"))}var a=new Rn(this._pt,e.style,t,0,1,Wd),l=0,c=0,u,h,f,d,g,_,p,m,y,v,S,M;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Wn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=Wn(e,t)||i,_?e.style[t]=_:lr(e,t)),u=[n,i],Od(u),n=u[0],i=u[1],f=n.match(gs)||[],M=i.match(gs)||[],M.length){for(;h=gs.exec(i);)p=h[0],y=i.substring(l,h.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),p!==(_=f[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),p.charAt(1)==="="&&(p=ys(d,p)+S),m=parseFloat(p),v=p.substr((m+"").length),l=gs.lastIndex-v.length,v||(v=v||Xn.units[t]||S,l===i.length&&(i+=v,a.e+=v)),S!==v&&(d=cr(e,t,_,v)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:m-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?jd:Yd;return fd.test(i)&&(a.e=0),this._pt=a,a},eh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},B0=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=eh[n]||n,t[1]=eh[i]||i,t.join(" ")},z0=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Fi[a]&&(l=1,a=a==="transformOrigin"?Cn:Dt),lr(n,a);l&&(lr(n,Dt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Da(n,1),o.uncache=1,$d(i)))}},Yo={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Rn(e._pt,t,n,0,0,z0);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},La=[1,0,0,1,0,0],e1={},t1=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},th=function(e){var t=Wn(e,Dt);return t1(t)?La:t.substr(7).match(hd).map(It)},Su=function(e,t){var n=e._gsap||Dr(e),i=e.style,s=th(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?La:s):(s===La&&!e.offsetParent&&e!==Es&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Es.appendChild(e)),s=th(e),l?i.display=l:lr(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Es.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Rc=function(e,t,n,i,s,o){var a=e._gsap,l=s||Su(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],_=l[2],p=l[3],m=l[4],y=l[5],v=t.split(" "),S=parseFloat(v[0])||0,M=parseFloat(v[1])||0,A,T,P,x;n?l!==La&&(T=d*p-g*_)&&(P=S*(p/T)+M*(-_/T)+(_*y-p*m)/T,x=S*(-g/T)+M*(d/T)-(d*y-g*m)/T,S=P,M=x):(A=Jd(e),S=A.x+(~v[0].indexOf("%")?S/100*A.width:S),M=A.y+(~(v[1]||v[0]).indexOf("%")?M/100*A.height:M)),i||i!==!1&&a.smooth?(m=S-c,y=M-u,a.xOffset=h+(m*d+y*_)-m,a.yOffset=f+(m*g+y*p)-y):a.xOffset=a.yOffset=0,a.xOrigin=S,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Cn]="0px 0px",o&&($i(o,a,"xOrigin",c,S),$i(o,a,"yOrigin",u,M),$i(o,a,"xOffset",h,a.xOffset),$i(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",S+" "+M)},Da=function(e,t){var n=e._gsap||new Bd(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Wn(e,Cn)||"0",u,h,f,d,g,_,p,m,y,v,S,M,A,T,P,x,E,B,N,j,L,I,$,O,V,z,R,D,k,oe,te,ie;return u=h=f=_=p=m=y=v=S=0,d=g=1,n.svg=!!(e.getCTM&&Qd(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Dt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Dt]!=="none"?l[Dt]:"")),i.scale=i.rotate=i.translate="none"),T=Su(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),c=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),Rc(e,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,T)),M=n.xOrigin||0,A=n.yOrigin||0,T!==La&&(B=T[0],N=T[1],j=T[2],L=T[3],u=I=T[4],h=$=T[5],T.length===6?(d=Math.sqrt(B*B+N*N),g=Math.sqrt(L*L+j*j),_=B||N?jr(N,B)*yr:0,y=j||L?jr(j,L)*yr+_:0,y&&(g*=Math.abs(Math.cos(y*Ts))),n.svg&&(u-=M-(M*B+A*j),h-=A-(M*N+A*L))):(ie=T[6],oe=T[7],R=T[8],D=T[9],k=T[10],te=T[11],u=T[12],h=T[13],f=T[14],P=jr(ie,k),p=P*yr,P&&(x=Math.cos(-P),E=Math.sin(-P),O=I*x+R*E,V=$*x+D*E,z=ie*x+k*E,R=I*-E+R*x,D=$*-E+D*x,k=ie*-E+k*x,te=oe*-E+te*x,I=O,$=V,ie=z),P=jr(-j,k),m=P*yr,P&&(x=Math.cos(-P),E=Math.sin(-P),O=B*x-R*E,V=N*x-D*E,z=j*x-k*E,te=L*E+te*x,B=O,N=V,j=z),P=jr(N,B),_=P*yr,P&&(x=Math.cos(P),E=Math.sin(P),O=B*x+N*E,V=I*x+$*E,N=N*x-B*E,$=$*x-I*E,B=O,I=V),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=It(Math.sqrt(B*B+N*N+j*j)),g=It(Math.sqrt($*$+ie*ie)),P=jr(I,$),y=Math.abs(P)>2e-4?P*yr:0,S=te?1/(te<0?-te:te):0),n.svg&&(O=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!t1(Wn(e,Dt)),O&&e.setAttribute("transform",O))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=It(d),n.scaleY=It(g),n.rotation=It(_)+a,n.rotationX=It(p)+a,n.rotationY=It(m)+a,n.skewX=y+a,n.skewY=v+a,n.transformPerspective=S+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Cn]=jo(c)),n.xOffset=n.yOffset=0,n.force3D=Xn.force3D,n.renderTransform=n.svg?H0:Zd?n1:k0,n.uncache=0,n},jo=function(e){return(e=e.split(" "))[0]+" "+e[1]},wl=function(e,t,n){var i=cn(t);return It(parseFloat(t)+parseFloat(cr(e,"x",n+"px",i)))+i},k0=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,n1(e,t)},_r="0deg",Xs="0px",gr=") ",n1=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,y=n.target,v=n.zOrigin,S="",M=m==="auto"&&e&&e!==1||m===!0;if(v&&(h!==_r||u!==_r)){var A=parseFloat(u)*Ts,T=Math.sin(A),P=Math.cos(A),x;A=parseFloat(h)*Ts,x=Math.cos(A),o=wl(y,o,T*x*-v),a=wl(y,a,-Math.sin(A)*-v),l=wl(y,l,P*x*-v+v)}p!==Xs&&(S+="perspective("+p+gr),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(M||o!==Xs||a!==Xs||l!==Xs)&&(S+=l!==Xs||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+gr),c!==_r&&(S+="rotate("+c+gr),u!==_r&&(S+="rotateY("+u+gr),h!==_r&&(S+="rotateX("+h+gr),(f!==_r||d!==_r)&&(S+="skew("+f+", "+d+gr),(g!==1||_!==1)&&(S+="scale("+g+", "+_+gr),y.style[Dt]=S||"translate(0, 0)"},H0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,y=n.forceCSS,v=parseFloat(o),S=parseFloat(a),M,A,T,P,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ts,c*=Ts,M=Math.cos(l)*h,A=Math.sin(l)*h,T=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=Ts,x=Math.tan(c-u),x=Math.sqrt(1+x*x),T*=x,P*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),M*=x,A*=x)),M=It(M),A=It(A),T=It(T),P=It(P)):(M=h,P=f,A=T=0),(v&&!~(o+"").indexOf("px")||S&&!~(a+"").indexOf("px"))&&(v=cr(d,"x",o,"px"),S=cr(d,"y",a,"px")),(g||_||p||m)&&(v=It(v+g-(g*M+_*T)+p),S=It(S+_-(g*A+_*P)+m)),(i||s)&&(x=d.getBBox(),v=It(v+i/100*x.width),S=It(S+s/100*x.height)),x="matrix("+M+","+A+","+T+","+P+","+v+","+S+")",d.setAttribute("transform",x),y&&(d.style[Dt]=x)},G0=function(e,t,n,i,s){var o=360,a=en(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?yr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*$u)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*$u)%o-~~(c/o)*o)),e._pt=f=new Rn(e._pt,t,n,i,c,T0),f.e=u,f.u="deg",e._props.push(n),f},nh=function(e,t){for(var n in t)e[n]=t[n];return e},V0=function(e,t,n){var i=nh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Dt]=t,a=Da(n,1),lr(n,Dt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Dt],o[Dt]=t,a=Da(n,1),o[Dt]=c);for(l in Fi)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=cn(c),g=cn(u),h=d!==g?cr(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new Rn(e._pt,a,l,h,f-h,bc),e._pt.u=g||0,e._props.push(l));nh(a,i)};An("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Yo[e>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return Ri(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,h)}});var i1={name:"css",register:Ac,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,f,d,g,_,p,m,y,v,S,M,A,T,P,x;vu||Ac(),this.styles=this.styles||Kd(e),P=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(zn[_]&&zd(_,t,n,i,e,s)))){if(d=typeof u,g=Yo[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Ra(u)),g)g(this,e,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",nr.lastIndex=0,nr.test(c)||(p=cn(c),m=cn(u),m?p!==m&&(c=cr(e,_,c,m)+m):p&&(u+=p)),this.add(a,"setProperty",c,u,i,s,0,0,_),o.push(_),P.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],en(c)&&~c.indexOf("random(")&&(c=Ra(c)),cn(c+"")||c==="auto"||(c+=Xn.units[_]||cn(Ri(e,_))||""),(c+"").charAt(1)==="="&&(c=Ri(e,_))):c=Ri(e,_),f=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),h=parseFloat(u),_ in gi&&(_==="autoAlpha"&&(f===1&&Ri(e,"visibility")==="hidden"&&h&&(f=0),P.push("visibility",0,a.visibility),$i(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=gi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in Fi,v){if(this.styles.save(_),x=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Wn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var E=e.style.perspective;e.style.perspective=u,u=Wn(e,"perspective"),E?e.style.perspective=E:lr(e,"perspective")}h=parseFloat(u)}if(S||(M=e._gsap,M.renderTransform&&!t.parseTransform||Da(e,t.parseTransform),A=t.smoothOrigin!==!1&&M.smooth,S=this._pt=new Rn(this._pt,a,Dt,0,1,M.renderTransform,M,0,-1),S.dep=1),_==="scale")this._pt=new Rn(this._pt,M,"scaleY",M.scaleY,(y?ys(M.scaleY,y+h):h)-M.scaleY||0,bc),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){P.push(Cn,0,a[Cn]),u=B0(u),M.svg?Rc(e,u,0,A,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==M.zOrigin&&$i(this,M,"zOrigin",M.zOrigin,m),$i(this,a,_,jo(c),jo(u)));continue}else if(_==="svgOrigin"){Rc(e,u,1,A,0,this);continue}else if(_ in e1){G0(this,M,_,f,y?ys(f,y+u):u);continue}else if(_==="smoothOrigin"){$i(this,M,"smooth",M.smooth,u);continue}else if(_==="force3D"){M[_]=u;continue}else if(_==="transform"){V0(this,u,e);continue}}else _ in a||(_=Os(_)||_);if(v||(h||h===0)&&(f||f===0)&&!E0.test(u)&&_ in a)p=(c+"").substr((f+"").length),h||(h=0),m=cn(u)||(_ in Xn.units?Xn.units[_]:p),p!==m&&(f=cr(e,_,c,m)),this._pt=new Rn(this._pt,v?M:a,_,f,(y?ys(f,y+h):h)-f,!v&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?A0:bc),this._pt.u=m||0,v&&x!==u?(this._pt.b=c,this._pt.e=x,this._pt.r=w0):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=b0);else if(_ in a)F0.call(this,e,_,c,y?y+u:u);else if(_ in e)this.add(e,_,c||e[_],y?y+u:u,i,s);else if(_!=="parseTransform"){lu(_,u);continue}v||(_ in a?P.push(_,0,a[_]):typeof e[_]=="function"?P.push(_,2,e[_]()):P.push(_,1,c||e[_])),o.push(_)}}T&&Xd(this)},render:function(e,t){if(t.tween._time||!xu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ri,aliases:gi,getSetter:function(e,t,n){var i=gi[t];return i&&i.indexOf(",")<0&&(t=i),t in Fi&&t!==Cn&&(e._gsap.x||Ri(e,"x"))?n&&ju===n?t==="scale"?L0:P0:(ju=n||{})&&(t==="scale"?D0:U0):e.style&&!su(e.style[t])?R0:~t.indexOf("-")?C0:_u(e,t)},core:{_removeProperty:lr,_getMatrix:Su}};Dn.utils.checkPrefix=Os;Dn.core.getStyleSaver=Kd;(function(r,e,t,n){var i=An(r+","+e+","+t,function(s){Fi[s]=1});An(e,function(s){Xn.units[s]="deg",e1[s]=1}),gi[i[13]]=r+","+e,An(n,function(s){var o=s.split(":");gi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");An("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Xn.units[r]="px"});Dn.registerPlugin(i1);var ut=Dn.registerPlugin(i1)||Dn;ut.core.Tween;function ih(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function W0(r,e,t){return e&&ih(r.prototype,e),t&&ih(r,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var nn,Io,Gn,Ki,Zi,bs,r1,Er,ws,s1,Di,oi,a1,o1=function(){return nn||typeof window<"u"&&(nn=window.gsap)&&nn.registerPlugin&&nn},l1=1,xs=[],it=[],xi=[],da=Date.now,Cc=function(e,t){return t},X0=function(){var e=ws.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,it),i.push.apply(i,xi),it=n,xi=i,Cc=function(o,a){return t[o](a)}},ir=function(e,t){return~xi.indexOf(e)&&xi[xi.indexOf(e)+1][t]},pa=function(e){return!!~s1.indexOf(e)},mn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},pn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},qa="scrollLeft",Ya="scrollTop",Pc=function(){return Di&&Di.isPressed||it.cache++},$o=function(e,t){var n=function i(s){if(s||s===0){l1&&(Gn.history.scrollRestoration="manual");var o=Di&&Di.isPressed;s=i.v=Math.round(s)||(Di&&Di.iOS?1:0),e(s),i.cacheID=it.cache,o&&Cc("ss",s)}else(t||it.cache!==i.cacheID||Cc("ref"))&&(i.cacheID=it.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Sn={s:qa,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:$o(function(r){return arguments.length?Gn.scrollTo(r,Xt.sc()):Gn.pageXOffset||Ki[qa]||Zi[qa]||bs[qa]||0})},Xt={s:Ya,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:$o(function(r){return arguments.length?Gn.scrollTo(Sn.sc(),r):Gn.pageYOffset||Ki[Ya]||Zi[Ya]||bs[Ya]||0})},En=function(e,t){return(t&&t._ctx&&t._ctx.selector||nn.utils.toArray)(e)[0]||(typeof e=="string"&&nn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},q0=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},ur=function(e,t){var n=t.s,i=t.sc;pa(e)&&(e=Ki.scrollingElement||Zi);var s=it.indexOf(e),o=i===Xt.sc?1:2;!~s&&(s=it.push(e)-1),it[s+o]||mn(e,"scroll",Pc);var a=it[s+o],l=a||(it[s+o]=$o(ir(e,n),!0)||(pa(e)?i:$o(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=nn.getProperty(e,"scrollBehavior")==="smooth"),l},Lc=function(e,t,n){var i=e,s=e,o=da(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var p=da();_||p-o>l?(s=i,i=g,a=o,o=p):n?i+=g:i=s+(g-s)/(p-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(g){var _=a,p=s,m=da();return(g||g===0)&&g!==i&&u(g),o===a||m-a>c?0:(i+(n?p:-p))/((n?m:o)-_)*1e3};return{update:u,reset:h,getVelocity:f}},qs=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},rh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},c1=function(){ws=nn.core.globals().ScrollTrigger,ws&&ws.core&&X0()},u1=function(e){return nn=e||o1(),!Io&&nn&&typeof document<"u"&&document.body&&(Gn=window,Ki=document,Zi=Ki.documentElement,bs=Ki.body,s1=[Gn,Ki,Zi,bs],nn.utils.clamp,a1=nn.core.context||function(){},Er="onpointerenter"in bs?"pointer":"mouse",r1=Ot.isTouch=Gn.matchMedia&&Gn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Gn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,oi=Ot.eventTypes=("ontouchstart"in Zi?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Zi?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return l1=0},500),Io=1),ws||c1(),Io};Sn.op=Xt;it.cache=0;var Ot=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Io||u1(nn)||console.warn("Please gsap.registerPlugin(Observer)"),ws||c1();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,p=n.onDragStart,m=n.onDragEnd,y=n.onDrag,v=n.onPress,S=n.onRelease,M=n.onRight,A=n.onLeft,T=n.onUp,P=n.onDown,x=n.onChangeX,E=n.onChangeY,B=n.onChange,N=n.onToggleX,j=n.onToggleY,L=n.onHover,I=n.onHoverEnd,$=n.onMove,O=n.ignoreCheck,V=n.isNormalizer,z=n.onGestureStart,R=n.onGestureEnd,D=n.onWheel,k=n.onEnable,oe=n.onDisable,te=n.onClick,ie=n.scrollSpeed,pe=n.capture,Te=n.allowClicks,be=n.lockAxis,we=n.onLockAxis;this.target=a=En(a)||Zi,this.vars=n,d&&(d=nn.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,ie=ie||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Gn.getComputedStyle(bs).lineHeight)||22);var ct,Ue,H,Xe,_e,Re,Ce,W=this,He=0,We=0,st=n.passive||!u&&n.passive!==!1,Ze=ur(a,Sn),yt=ur(a,Xt),C=Ze(),b=yt(),G=~o.indexOf("touch")&&!~o.indexOf("pointer")&&oi[0]==="pointerdown",ae=pa(a),Q=a.ownerDocument||Ki,ne=[0,0,0],ge=[0,0,0],le=0,me=function(){return le=da()},ve=function(ye,Le){return(W.event=ye)&&d&&q0(ye.target,d)||Le&&G&&ye.pointerType!=="touch"||O&&O(ye,Le)},at=function(){W._vx.reset(),W._vy.reset(),Ue.pause(),h&&h(W)},re=function(){var ye=W.deltaX=rh(ne),Le=W.deltaY=rh(ge),ce=Math.abs(ye)>=i,Be=Math.abs(Le)>=i;B&&(ce||Be)&&B(W,ye,Le,ne,ge),ce&&(M&&W.deltaX>0&&M(W),A&&W.deltaX<0&&A(W),x&&x(W),N&&W.deltaX<0!=He<0&&N(W),He=W.deltaX,ne[0]=ne[1]=ne[2]=0),Be&&(P&&W.deltaY>0&&P(W),T&&W.deltaY<0&&T(W),E&&E(W),j&&W.deltaY<0!=We<0&&j(W),We=W.deltaY,ge[0]=ge[1]=ge[2]=0),(Xe||H)&&($&&$(W),H&&(p&&H===1&&p(W),y&&y(W),H=0),Xe=!1),Re&&!(Re=!1)&&we&&we(W),_e&&(D(W),_e=!1),ct=0},ot=function(ye,Le,ce){ne[ce]+=ye,ge[ce]+=Le,W._vx.update(ye),W._vy.update(Le),c?ct||(ct=requestAnimationFrame(re)):re()},Ve=function(ye,Le){be&&!Ce&&(W.axis=Ce=Math.abs(ye)>Math.abs(Le)?"x":"y",Re=!0),Ce!=="y"&&(ne[2]+=ye,W._vx.update(ye,!0)),Ce!=="x"&&(ge[2]+=Le,W._vy.update(Le,!0)),c?ct||(ct=requestAnimationFrame(re)):re()},Fe=function(ye){if(!ve(ye,1)){ye=qs(ye,u);var Le=ye.clientX,ce=ye.clientY,Be=Le-W.x,Ie=ce-W.y,qe=W.isDragging;W.x=Le,W.y=ce,(qe||(Be||Ie)&&(Math.abs(W.startX-Le)>=s||Math.abs(W.startY-ce)>=s))&&(H||(H=qe?2:1),qe||(W.isDragging=!0),Ve(Be,Ie))}},De=W.onPress=function(Me){ve(Me,1)||Me&&Me.button||(W.axis=Ce=null,Ue.pause(),W.isPressed=!0,Me=qs(Me),He=We=0,W.startX=W.x=Me.clientX,W.startY=W.y=Me.clientY,W._vx.reset(),W._vy.reset(),mn(V?a:Q,oi[1],Fe,st,!0),W.deltaX=W.deltaY=0,v&&v(W))},ee=W.onRelease=function(Me){if(!ve(Me,1)){pn(V?a:Q,oi[1],Fe,!0);var ye=!isNaN(W.y-W.startY),Le=W.isDragging,ce=Le&&(Math.abs(W.x-W.startX)>3||Math.abs(W.y-W.startY)>3),Be=qs(Me);!ce&&ye&&(W._vx.reset(),W._vy.reset(),u&&Te&&nn.delayedCall(.08,function(){if(da()-le>300&&!Me.defaultPrevented){if(Me.target.click)Me.target.click();else if(Q.createEvent){var Ie=Q.createEvent("MouseEvents");Ie.initMouseEvent("click",!0,!0,Gn,1,Be.screenX,Be.screenY,Be.clientX,Be.clientY,!1,!1,!1,!1,0,null),Me.target.dispatchEvent(Ie)}}})),W.isDragging=W.isGesturing=W.isPressed=!1,h&&Le&&!V&&Ue.restart(!0),H&&re(),m&&Le&&m(W),S&&S(W,ce)}},$e=function(ye){return ye.touches&&ye.touches.length>1&&(W.isGesturing=!0)&&z(ye,W.isDragging)},U=function(){return(W.isGesturing=!1)||R(W)},fe=function(ye){if(!ve(ye)){var Le=Ze(),ce=yt();ot((Le-C)*ie,(ce-b)*ie,1),C=Le,b=ce,h&&Ue.restart(!0)}},se=function(ye){if(!ve(ye)){ye=qs(ye,u),D&&(_e=!0);var Le=(ye.deltaMode===1?l:ye.deltaMode===2?Gn.innerHeight:1)*g;ot(ye.deltaX*Le,ye.deltaY*Le,0),h&&!V&&Ue.restart(!0)}},J=function(ye){if(!ve(ye)){var Le=ye.clientX,ce=ye.clientY,Be=Le-W.x,Ie=ce-W.y;W.x=Le,W.y=ce,Xe=!0,h&&Ue.restart(!0),(Be||Ie)&&Ve(Be,Ie)}},ue=function(ye){W.event=ye,L(W)},Pe=function(ye){W.event=ye,I(W)},rt=function(ye){return ve(ye)||qs(ye,u)&&te(W)};Ue=W._dc=nn.delayedCall(f||.25,at).pause(),W.deltaX=W.deltaY=0,W._vx=Lc(0,50,!0),W._vy=Lc(0,50,!0),W.scrollX=Ze,W.scrollY=yt,W.isDragging=W.isGesturing=W.isPressed=!1,a1(this),W.enable=function(Me){return W.isEnabled||(mn(ae?Q:a,"scroll",Pc),o.indexOf("scroll")>=0&&mn(ae?Q:a,"scroll",fe,st,pe),o.indexOf("wheel")>=0&&mn(a,"wheel",se,st,pe),(o.indexOf("touch")>=0&&r1||o.indexOf("pointer")>=0)&&(mn(a,oi[0],De,st,pe),mn(Q,oi[2],ee),mn(Q,oi[3],ee),Te&&mn(a,"click",me,!0,!0),te&&mn(a,"click",rt),z&&mn(Q,"gesturestart",$e),R&&mn(Q,"gestureend",U),L&&mn(a,Er+"enter",ue),I&&mn(a,Er+"leave",Pe),$&&mn(a,Er+"move",J)),W.isEnabled=!0,W.isDragging=W.isGesturing=W.isPressed=Xe=H=!1,W._vx.reset(),W._vy.reset(),C=Ze(),b=yt(),Me&&Me.type&&De(Me),k&&k(W)),W},W.disable=function(){W.isEnabled&&(xs.filter(function(Me){return Me!==W&&pa(Me.target)}).length||pn(ae?Q:a,"scroll",Pc),W.isPressed&&(W._vx.reset(),W._vy.reset(),pn(V?a:Q,oi[1],Fe,!0)),pn(ae?Q:a,"scroll",fe,pe),pn(a,"wheel",se,pe),pn(a,oi[0],De,pe),pn(Q,oi[2],ee),pn(Q,oi[3],ee),pn(a,"click",me,!0),pn(a,"click",rt),pn(Q,"gesturestart",$e),pn(Q,"gestureend",U),pn(a,Er+"enter",ue),pn(a,Er+"leave",Pe),pn(a,Er+"move",J),W.isEnabled=W.isPressed=W.isDragging=!1,oe&&oe(W))},W.kill=W.revert=function(){W.disable();var Me=xs.indexOf(W);Me>=0&&xs.splice(Me,1),Di===W&&(Di=0)},xs.push(W),V&&pa(a)&&(Di=W),W.enable(_)},W0(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ot.version="3.15.0";Ot.create=function(r){return new Ot(r)};Ot.register=u1;Ot.getAll=function(){return xs.slice()};Ot.getById=function(r){return xs.filter(function(e){return e.vars.id===r})[0]};o1()&&nn.registerPlugin(Ot);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xe,ms,tt,mt,kn,ft,yu,Ko,Ua,ma,ia,ja,on,cl,Dc,vn,sh,ah,_s,h1,Al,f1,gn,Uc,d1,p1,qi,Nc,Eu,As,Tu,_a,Ic,Rl,$a=1,ln=Date.now,Cl=ln(),ii=0,ra=0,oh=function(e,t,n){var i=Bn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},lh=function(e,t){return t&&(!Bn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Y0=function r(){return ra&&requestAnimationFrame(r)},ch=function(){return cl=1},uh=function(){return cl=0},pi=function(e){return e},sa=function(e){return Math.round(e*1e5)/1e5||0},m1=function(){return typeof window<"u"},_1=function(){return xe||m1()&&(xe=window.gsap)&&xe.registerPlugin&&xe},Vr=function(e){return!!~yu.indexOf(e)},g1=function(e){return(e==="Height"?Tu:tt["inner"+e])||kn["client"+e]||ft["client"+e]},v1=function(e){return ir(e,"getBoundingClientRect")||(Vr(e)?function(){return ko.width=tt.innerWidth,ko.height=Tu,ko}:function(){return Ci(e)})},j0=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=ir(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?g1(s):e["client"+s])||0}},$0=function(e,t){return!t||~xi.indexOf(e)?v1(e):function(){return ko}},vi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=ir(e,n))?o()-v1(e)()[s]:Vr(e)?(kn[n]||ft[n])-g1(i):e[n]-e["offset"+i])},Ka=function(e,t){for(var n=0;n<_s.length;n+=3)(!t||~t.indexOf(_s[n+1]))&&e(_s[n],_s[n+1],_s[n+2])},Bn=function(e){return typeof e=="string"},un=function(e){return typeof e=="function"},aa=function(e){return typeof e=="number"},Tr=function(e){return typeof e=="object"},Ys=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},$r=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},Kr=Math.abs,x1="left",M1="top",bu="right",wu="bottom",Or="width",Fr="height",ga="Right",va="Left",xa="Top",Ma="Bottom",kt="padding",Zn="margin",Fs="Width",Au="Height",Wt="px",Jn=function(e){return tt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},K0=function(e){var t=Jn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},hh=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ci=function(e,t){var n=t&&Jn(e)[Dc]!=="matrix(1, 0, 0, 1, 0, 0)"&&xe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Zo=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},S1=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},Z0=function(e){return function(t){return xe.utils.snap(S1(e),t)}},Ru=function(e){var t=xe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},J0=function(e){return function(t,n){return Ru(S1(e))(t,n.direction)}},Za=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Jt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Zt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ja=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},fh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Qa={toggleActions:"play",anticipatePin:0},Jo={top:0,left:0,center:.5,bottom:1,right:1},Oo=function(e,t){if(Bn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Jo?Jo[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},eo=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=mt.createElement("div"),_=Vr(n)||ir(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=_?ft:n.tagName==="IFRAME"?n.contentDocument.body:n,y=e.indexOf("start")!==-1,v=y?c:u,S="border-color:"+v+";font-size:"+h+";color:"+v+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(S+=(i===Xt?bu:wu)+":"+(o+parseFloat(f))+"px;"),a&&(S+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=y,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=S,g.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+i.op.d2],Fo(g,0,i,y),g},Fo=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Fs]=1,s["border"+a+Fs]=0,s[n.p]=t+"px",xe.set(e,s)},Qe=[],Oc={},Na,dh=function(){return ln()-ii>34&&(Na||(Na=requestAnimationFrame(Ii)))},Zr=function(){(!gn||!gn.isPressed||gn.startX>ft.clientWidth)&&(it.cache++,gn?Na||(Na=requestAnimationFrame(Ii)):Ii(),ii||Xr("scrollStart"),ii=ln())},Pl=function(){p1=tt.innerWidth,d1=tt.innerHeight},oa=function(e){it.cache++,(e===!0||!on&&!f1&&!mt.fullscreenElement&&!mt.webkitFullscreenElement&&(!Uc||p1!==tt.innerWidth||Math.abs(tt.innerHeight-d1)>tt.innerHeight*.25))&&Ko.restart(!0)},Wr={},Q0=[],y1=function r(){return Zt(Ke,"scrollEnd",r)||Lr(!0)},Xr=function(e){return Wr[e]&&Wr[e].map(function(t){return t()})||Q0},Fn=[],E1=function(e){for(var t=0;t<Fn.length;t+=5)(!e||Fn[t+4]&&Fn[t+4].query===e)&&(Fn[t].style.cssText=Fn[t+1],Fn[t].getBBox&&Fn[t].setAttribute("transform",Fn[t+2]||""),Fn[t+3].uncache=1)},T1=function(){return it.forEach(function(e){return un(e)&&++e.cacheID&&(e.rec=e())})},Cu=function(e,t){var n;for(vn=0;vn<Qe.length;vn++)n=Qe[vn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));_a=!0,t&&E1(t),t||Xr("revert")},b1=function(e,t){it.cache++,(t||!xn)&&it.forEach(function(n){return un(n)&&n.cacheID++&&(n.rec=0)}),Bn(e)&&(tt.history.scrollRestoration=Eu=e)},xn,Br=0,ph,em=function(){if(ph!==Br){var e=ph=Br;requestAnimationFrame(function(){return e===Br&&Lr(!0)})}},w1=function(){ft.appendChild(As),Tu=!gn&&As.offsetHeight||tt.innerHeight,ft.removeChild(As)},mh=function(e){return Ua(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Lr=function(e,t){if(kn=mt.documentElement,ft=mt.body,yu=[tt,mt,kn,ft],ii&&!e&&!_a){Jt(Ke,"scrollEnd",y1);return}w1(),xn=Ke.isRefreshing=!0,_a||T1();var n=Xr("refreshInit");h1&&Ke.sort(),t||Cu(),it.forEach(function(i){un(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Qe.slice(0).forEach(function(i){return i.refresh()}),_a=!1,Qe.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Ic=1,mh(!0),Qe.forEach(function(i){var s=vi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),mh(!1),Ic=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),it.forEach(function(i){un(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),b1(Eu,1),Ko.pause(),Br++,xn=2,Ii(2),Qe.forEach(function(i){return un(i.vars.onRefresh)&&i.vars.onRefresh(i)}),xn=Ke.isRefreshing=!1,Xr("refresh")},Fc=0,Bo=1,Sa,Ii=function(e){if(e===2||!xn&&!_a){Ke.isUpdating=!0,Sa&&Sa.update(0);var t=Qe.length,n=ln(),i=n-Cl>=50,s=t&&Qe[0].scroll();if(Bo=Fc>s?-1:1,xn||(Fc=s),i&&(ii&&!cl&&n-ii>200&&(ii=0,Xr("scrollEnd")),ia=Cl,Cl=n),Bo<0){for(vn=t;vn-- >0;)Qe[vn]&&Qe[vn].update(0,i);Bo=1}else for(vn=0;vn<t;vn++)Qe[vn]&&Qe[vn].update(0,i);Ke.isUpdating=!1}Na=0},Bc=[x1,M1,wu,bu,Zn+Ma,Zn+ga,Zn+xa,Zn+va,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],zo=Bc.concat([Or,Fr,"boxSizing","max"+Fs,"max"+Au,"position",Zn,kt,kt+xa,kt+ga,kt+Ma,kt+va]),tm=function(e,t,n){Rs(n);var i=e._gsap;if(i.spacerIsNative)Rs(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Ll=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Bc.length,o=t.style,a=e.style,l;s--;)l=Bc[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[wu]=a[bu]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Or]=Zo(e,Sn)+Wt,o[Fr]=Zo(e,Xt)+Wt,o[kt]=a[Zn]=a[M1]=a[x1]="0",Rs(i),a[Or]=a["max"+Fs]=n[Or],a[Fr]=a["max"+Au]=n[Fr],a[kt]=n[kt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},nm=/([A-Z])/g,Rs=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||xe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(nm,"-$1").toLowerCase())}},to=function(e){for(var t=zo.length,n=e.style,i=[],s=0;s<t;s++)i.push(zo[s],n[zo[s]]);return i.t=e,i},im=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},ko={left:0,top:0},_h=function(e,t,n,i,s,o,a,l,c,u,h,f,d,g){un(e)&&(e=e(l)),Bn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Oo("0"+e.substr(3),n):0));var _=d?d.time():0,p,m,y;if(d&&d.seek(0),isNaN(e)||(e=+e),aa(e))d&&(e=xe.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&Fo(a,n,i,!0);else{un(t)&&(t=t(l));var v=(e||"0").split(" "),S,M,A,T;y=En(t,l)||ft,S=Ci(y)||{},(!S||!S.left&&!S.top)&&Jn(y).display==="none"&&(T=y.style.display,y.style.display="block",S=Ci(y),T?y.style.display=T:y.style.removeProperty("display")),M=Oo(v[0],S[i.d]),A=Oo(v[1]||"0",n),e=S[i.p]-c[i.p]-u+M+s-A,a&&Fo(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var P=e+n,x=o._isStart;p="scroll"+i.d2,Fo(o,P,i,x&&P>20||!x&&(h?Math.max(ft[p],kn[p]):o.parentNode[p])<=P+1),h&&(c=Ci(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Wt))}return d&&y&&(p=Ci(y),d.seek(f),m=Ci(y),d._caScrollDist=p[i.p]-m[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},rm=/(webkit|moz|length|cssText|inset)/i,gh=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===ft){e._stOrig=s.cssText,a=Jn(e);for(o in a)!+o&&!rm.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;xe.core.getCache(e).uncache=1,t.appendChild(e)}},A1=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},no=function(e,t,n){var i={};i[t.p]="+="+n,xe.set(e,i)},vh=function(e,t){var n=ur(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,g={};c=c||n();var _=A1(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){it.cache++,o.tween&&Ii()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=xe.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Jt(e,"wheel",n.wheelHandler),Ke.isTouch&&Jt(e,"touchmove",n.wheelHandler),s},Ke=function(){function r(t,n){ms||r.register(xe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Nc(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ra){this.update=this.refresh=this.kill=pi;return}n=hh(Bn(n)||aa(n)||n.nodeType?{trigger:n}:n,Qa);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,y=s.onSnapComplete,v=s.once,S=s.snap,M=s.pinReparent,A=s.pinSpacer,T=s.containerAnimation,P=s.fastScrollEnd,x=s.preventOverlaps,E=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:Xt,B=!h&&h!==0,N=En(n.scroller||tt),j=xe.core.getCache(N),L=Vr(N),I=("pinType"in n?n.pinType:ir(N,"pinType")||L&&"fixed")==="fixed",$=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],O=B&&n.toggleActions.split(" "),V="markers"in n?n.markers:Qa.markers,z=L?0:parseFloat(Jn(N)["border"+E.p2+Fs])||0,R=this,D=n.onRefreshInit&&function(){return n.onRefreshInit(R)},k=j0(N,L,E),oe=$0(N,L),te=0,ie=0,pe=0,Te=ur(N,E),be,we,ct,Ue,H,Xe,_e,Re,Ce,W,He,We,st,Ze,yt,C,b,G,ae,Q,ne,ge,le,me,ve,at,re,ot,Ve,Fe,De,ee,$e,U,fe,se,J,ue,Pe;if(R._startClamp=R._endClamp=!1,R._dir=E,p*=45,R.scroller=N,R.scroll=T?T.time.bind(T):Te,Ue=Te(),R.vars=n,i=i||n.animation,"refreshPriority"in n&&(h1=1,n.refreshPriority===-9999&&(Sa=R)),j.tweenScroll=j.tweenScroll||{top:vh(N,Xt),left:vh(N,Sn)},R.tweenTo=be=j.tweenScroll[E.p],R.scrubDuration=function(ce){$e=aa(ce)&&ce,$e?ee?ee.duration(ce):ee=xe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:$e,paused:!0,onComplete:function(){return m&&m(R)}}):(ee&&ee.progress(1).kill(),ee=0)},i&&(i.vars.lazy=!1,i._initted&&!R.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),R.animation=i.pause(),i.scrollTrigger=R,R.scrubDuration(h),Fe=0,l||(l=i.vars.id)),S&&((!Tr(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in ft.style&&xe.set(L?[ft,kn]:N,{scrollBehavior:"auto"}),it.forEach(function(ce){return un(ce)&&ce.target===(L?mt.scrollingElement||kn:N)&&(ce.smooth=!1)}),ct=un(S.snapTo)?S.snapTo:S.snapTo==="labels"?Z0(i):S.snapTo==="labelsDirectional"?J0(i):S.directional!==!1?function(ce,Be){return Ru(S.snapTo)(ce,ln()-ie<500?0:Be.direction)}:xe.utils.snap(S.snapTo),U=S.duration||{min:.1,max:2},U=Tr(U)?ma(U.min,U.max):ma(U,U),fe=xe.delayedCall(S.delay||$e/2||.1,function(){var ce=Te(),Be=ln()-ie<500,Ie=be.tween;if((Be||Math.abs(R.getVelocity())<10)&&!Ie&&!cl&&te!==ce){var qe=(ce-Xe)/Ze,Ct=i&&!B?i.totalProgress():qe,et=Be?0:(Ct-De)/(ln()-ia)*1e3||0,Et=xe.utils.clamp(-qe,1-qe,Kr(et/2)*et/.185),Gt=qe+(S.inertia===!1?0:Et),bt,Tt,dt=S,Un=dt.onStart,w=dt.onInterrupt,F=dt.onComplete;if(bt=ct(Gt,R),aa(bt)||(bt=Gt),Tt=Math.max(0,Math.round(Xe+bt*Ze)),ce<=_e&&ce>=Xe&&Tt!==ce){if(Ie&&!Ie._initted&&Ie.data<=Kr(Tt-ce))return;S.inertia===!1&&(Et=bt-qe),be(Tt,{duration:U(Kr(Math.max(Kr(Gt-Ct),Kr(bt-Ct))*.185/et/.05||0)),ease:S.ease||"power3",data:Kr(Tt-ce),onInterrupt:function(){return fe.restart(!0)&&w&&$r(R,w)},onComplete:function(){R.update(),te=Te(),i&&!B&&(ee?ee.resetTo("totalProgress",bt,i._tTime/i._tDur):i.progress(bt)),Fe=De=i&&!B?i.totalProgress():R.progress,y&&y(R),F&&$r(R,F)}},ce,Et*Ze,Tt-ce-Et*Ze),Un&&$r(R,Un,be.tween)}}else R.isActive&&te!==ce&&fe.restart(!0)}).pause()),l&&(Oc[l]=R),f=R.trigger=En(f||d!==!0&&d),Pe=f&&f._gsap&&f._gsap.stRevert,Pe&&(Pe=Pe(R)),d=d===!0?f:En(d),Bn(a)&&(a={targets:f,className:a}),d&&(g===!1||g===Zn||(g=!g&&d.parentNode&&d.parentNode.style&&Jn(d.parentNode).display==="flex"?!1:kt),R.pin=d,we=xe.core.getCache(d),we.spacer?yt=we.pinState:(A&&(A=En(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),we.spacerIsNative=!!A,A&&(we.spacerState=to(A))),we.spacer=G=A||mt.createElement("div"),G.classList.add("pin-spacer"),l&&G.classList.add("pin-spacer-"+l),we.pinState=yt=to(d)),n.force3D!==!1&&xe.set(d,{force3D:!0}),R.spacer=G=we.spacer,Ve=Jn(d),me=Ve[g+E.os2],Q=xe.getProperty(d),ne=xe.quickSetter(d,E.a,Wt),Ll(d,G,Ve),b=to(d)),V){We=Tr(V)?hh(V,fh):fh,W=eo("scroller-start",l,N,E,We,0),He=eo("scroller-end",l,N,E,We,0,W),ae=W["offset"+E.op.d2];var rt=En(ir(N,"content")||N);Re=this.markerStart=eo("start",l,rt,E,We,ae,0,T),Ce=this.markerEnd=eo("end",l,rt,E,We,ae,0,T),T&&(ue=xe.quickSetter([Re,Ce],E.a,Wt)),!I&&!(xi.length&&ir(N,"fixedMarkers")===!0)&&(K0(L?ft:N),xe.set([W,He],{force3D:!0}),at=xe.quickSetter(W,E.a,Wt),ot=xe.quickSetter(He,E.a,Wt))}if(T){var Me=T.vars.onUpdate,ye=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){R.update(0,0,1),Me&&Me.apply(T,ye||[])})}if(R.previous=function(){return Qe[Qe.indexOf(R)-1]},R.next=function(){return Qe[Qe.indexOf(R)+1]},R.revert=function(ce,Be){if(!Be)return R.kill(!0);var Ie=ce!==!1||!R.enabled,qe=on;Ie!==R.isReverted&&(Ie&&(se=Math.max(Te(),R.scroll.rec||0),pe=R.progress,J=i&&i.progress()),Re&&[Re,Ce,W,He].forEach(function(Ct){return Ct.style.display=Ie?"none":"block"}),Ie&&(on=R,R.update(Ie)),d&&(!M||!R.isActive)&&(Ie?tm(d,G,yt):Ll(d,G,Jn(d),ve)),Ie||R.update(Ie),on=qe,R.isReverted=Ie)},R.refresh=function(ce,Be,Ie,qe){if(!((on||!R.enabled)&&!Be)){if(d&&ce&&ii){Jt(r,"scrollEnd",y1);return}!xn&&D&&D(R),on=R,be.tween&&!Ie&&(be.tween.kill(),be.tween=0),ee&&ee.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(je){return je.vars.immediateRender&&je.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var Ct=k(),et=oe(),Et=T?T.duration():vi(N,E),Gt=Ze<=.01||!Ze,bt=0,Tt=qe||0,dt=Tr(Ie)?Ie.end:n.end,Un=n.endTrigger||f,w=Tr(Ie)?Ie.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),F=R.pinnedContainer=n.pinnedContainer&&En(n.pinnedContainer,R),q=f&&Math.max(0,Qe.indexOf(R))||0,X=q,Y,he,Se,ze,Ee,Ae,ke,Ye,At,Vt,pt,fn,xt;for(V&&Tr(Ie)&&(fn=xe.getProperty(W,E.p),xt=xe.getProperty(He,E.p));X-- >0;)Ae=Qe[X],Ae.end||Ae.refresh(0,1)||(on=R),ke=Ae.pin,ke&&(ke===f||ke===d||ke===F)&&!Ae.isReverted&&(Vt||(Vt=[]),Vt.unshift(Ae),Ae.revert(!0,!0)),Ae!==Qe[X]&&(q--,X--);for(un(w)&&(w=w(R)),w=oh(w,"start",R),Xe=_h(w,f,Ct,E,Te(),Re,W,R,et,z,I,Et,T,R._startClamp&&"_startClamp")||(d?-.001:0),un(dt)&&(dt=dt(R)),Bn(dt)&&!dt.indexOf("+=")&&(~dt.indexOf(" ")?dt=(Bn(w)?w.split(" ")[0]:"")+dt:(bt=Oo(dt.substr(2),Ct),dt=Bn(w)?w:(T?xe.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Xe):Xe)+bt,Un=f)),dt=oh(dt,"end",R),_e=Math.max(Xe,_h(dt||(Un?"100% 0":Et),Un,Ct,E,Te()+bt,Ce,He,R,et,z,I,Et,T,R._endClamp&&"_endClamp"))||-.001,bt=0,X=q;X--;)Ae=Qe[X]||{},ke=Ae.pin,ke&&Ae.start-Ae._pinPush<=Xe&&!T&&Ae.end>0&&(Y=Ae.end-(R._startClamp?Math.max(0,Ae.start):Ae.start),(ke===f&&Ae.start-Ae._pinPush<Xe||ke===F)&&isNaN(w)&&(bt+=Y*(1-Ae.progress)),ke===d&&(Tt+=Y));if(Xe+=bt,_e+=bt,R._startClamp&&(R._startClamp+=bt),R._endClamp&&!xn&&(R._endClamp=_e||-.001,_e=Math.min(_e,vi(N,E))),Ze=_e-Xe||(Xe-=.01)&&.001,Gt&&(pe=xe.utils.clamp(0,1,xe.utils.normalize(Xe,_e,se))),R._pinPush=Tt,Re&&bt&&(Y={},Y[E.a]="+="+bt,F&&(Y[E.p]="-="+Te()),xe.set([Re,Ce],Y)),d&&!(Ic&&R.end>=vi(N,E)))Y=Jn(d),ze=E===Xt,Se=Te(),ge=parseFloat(Q(E.a))+Tt,!Et&&_e>1&&(pt=(L?mt.scrollingElement||kn:N).style,pt={style:pt,value:pt["overflow"+E.a.toUpperCase()]},L&&Jn(ft)["overflow"+E.a.toUpperCase()]!=="scroll"&&(pt.style["overflow"+E.a.toUpperCase()]="scroll")),Ll(d,G,Y),b=to(d),he=Ci(d,!0),Ye=I&&ur(N,ze?Sn:Xt)(),g?(ve=[g+E.os2,Ze+Tt+Wt],ve.t=G,X=g===kt?Zo(d,E)+Ze+Tt:0,X&&(ve.push(E.d,X+Wt),G.style.flexBasis!=="auto"&&(G.style.flexBasis=X+Wt)),Rs(ve),F&&Qe.forEach(function(je){je.pin===F&&je.vars.pinSpacing!==!1&&(je._subPinOffset=!0)}),I&&Te(se)):(X=Zo(d,E),X&&G.style.flexBasis!=="auto"&&(G.style.flexBasis=X+Wt)),I&&(Ee={top:he.top+(ze?Se-Xe:Ye)+Wt,left:he.left+(ze?Ye:Se-Xe)+Wt,boxSizing:"border-box",position:"fixed"},Ee[Or]=Ee["max"+Fs]=Math.ceil(he.width)+Wt,Ee[Fr]=Ee["max"+Au]=Math.ceil(he.height)+Wt,Ee[Zn]=Ee[Zn+xa]=Ee[Zn+ga]=Ee[Zn+Ma]=Ee[Zn+va]="0",Ee[kt]=Y[kt],Ee[kt+xa]=Y[kt+xa],Ee[kt+ga]=Y[kt+ga],Ee[kt+Ma]=Y[kt+Ma],Ee[kt+va]=Y[kt+va],C=im(yt,Ee,M),xn&&Te(0)),i?(At=i._initted,Al(1),i.render(i.duration(),!0,!0),le=Q(E.a)-ge+Ze+Tt,re=Math.abs(Ze-le)>1,I&&re&&C.splice(C.length-2,2),i.render(0,!0,!0),At||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Al(0)):le=Ze,pt&&(pt.value?pt.style["overflow"+E.a.toUpperCase()]=pt.value:pt.style.removeProperty("overflow-"+E.a));else if(f&&Te()&&!T)for(he=f.parentNode;he&&he!==ft;)he._pinOffset&&(Xe-=he._pinOffset,_e-=he._pinOffset),he=he.parentNode;Vt&&Vt.forEach(function(je){return je.revert(!1,!0)}),R.start=Xe,R.end=_e,Ue=H=xn?se:Te(),!T&&!xn&&(Ue<se&&Te(se),R.scroll.rec=0),R.revert(!1,!0),ie=ln(),fe&&(te=-1,fe.restart(!0)),on=0,i&&B&&(i._initted||J)&&i.progress()!==J&&i.progress(J||0,!0).render(i.time(),!0,!0),(Gt||pe!==R.progress||T||_||i&&!i._initted)&&(i&&!B&&(i._initted||pe||i.vars.immediateRender!==!1)&&i.totalProgress(T&&Xe<-.001&&!pe?xe.utils.normalize(Xe,_e,0):pe,!0),R.progress=Gt||(Ue-Xe)/Ze===pe?0:pe),d&&g&&(G._pinOffset=Math.round(R.progress*le)),ee&&ee.invalidate(),isNaN(fn)||(fn-=xe.getProperty(W,E.p),xt-=xe.getProperty(He,E.p),no(W,E,fn),no(Re,E,fn-(qe||0)),no(He,E,xt),no(Ce,E,xt-(qe||0))),Gt&&!xn&&R.update(),u&&!xn&&!st&&(st=!0,u(R),st=!1)}},R.getVelocity=function(){return(Te()-H)/(ln()-ia)*1e3||0},R.endAnimation=function(){Ys(R.callbackAnimation),i&&(ee?ee.progress(1):i.paused()?B||Ys(i,R.direction<0,1):Ys(i,i.reversed()))},R.labelToScroll=function(ce){return i&&i.labels&&(Xe||R.refresh()||Xe)+i.labels[ce]/i.duration()*Ze||0},R.getTrailing=function(ce){var Be=Qe.indexOf(R),Ie=R.direction>0?Qe.slice(0,Be).reverse():Qe.slice(Be+1);return(Bn(ce)?Ie.filter(function(qe){return qe.vars.preventOverlaps===ce}):Ie).filter(function(qe){return R.direction>0?qe.end<=Xe:qe.start>=_e})},R.update=function(ce,Be,Ie){if(!(T&&!Ie&&!ce)){var qe=xn===!0?se:R.scroll(),Ct=ce?0:(qe-Xe)/Ze,et=Ct<0?0:Ct>1?1:Ct||0,Et=R.progress,Gt,bt,Tt,dt,Un,w,F,q;if(Be&&(H=Ue,Ue=T?Te():qe,S&&(De=Fe,Fe=i&&!B?i.totalProgress():et)),p&&d&&!on&&!$a&&ii&&(!et&&Xe<qe+(qe-H)/(ln()-ia)*p?et=1e-4:et===1&&_e>qe+(qe-H)/(ln()-ia)*p&&(et=.9999)),et!==Et&&R.enabled){if(Gt=R.isActive=!!et&&et<1,bt=!!Et&&Et<1,w=Gt!==bt,Un=w||!!et!=!!Et,R.direction=et>Et?1:-1,R.progress=et,Un&&!on&&(Tt=et&&!Et?0:et===1?1:Et===1?2:3,B&&(dt=!w&&O[Tt+1]!=="none"&&O[Tt+1]||O[Tt],q=i&&(dt==="complete"||dt==="reset"||dt in i))),x&&(w||q)&&(q||h||!i)&&(un(x)?x(R):R.getTrailing(x).forEach(function(Se){return Se.endAnimation()})),B||(ee&&!on&&!$a?(ee._dp._time-ee._start!==ee._time&&ee.render(ee._dp._time-ee._start),ee.resetTo?ee.resetTo("totalProgress",et,i._tTime/i._tDur):(ee.vars.totalProgress=et,ee.invalidate().restart())):i&&i.totalProgress(et,!!(on&&(ie||ce)))),d){if(ce&&g&&(G.style[g+E.os2]=me),!I)ne(sa(ge+le*et));else if(Un){if(F=!ce&&et>Et&&_e+1>qe&&qe+1>=vi(N,E),M)if(!ce&&(Gt||F)){var X=Ci(d,!0),Y=qe-Xe;gh(d,ft,X.top+(E===Xt?Y:0)+Wt,X.left+(E===Xt?0:Y)+Wt)}else gh(d,G);Rs(Gt||F?C:b),re&&et<1&&Gt||ne(ge+(et===1&&!F?le:0))}}S&&!be.tween&&!on&&!$a&&fe.restart(!0),a&&(w||v&&et&&(et<1||!Rl))&&Ua(a.targets).forEach(function(Se){return Se.classList[Gt||v?"add":"remove"](a.className)}),o&&!B&&!ce&&o(R),Un&&!on?(B&&(q&&(dt==="complete"?i.pause().totalProgress(1):dt==="reset"?i.restart(!0).pause():dt==="restart"?i.restart(!0):i[dt]()),o&&o(R)),(w||!Rl)&&(c&&w&&$r(R,c),$[Tt]&&$r(R,$[Tt]),v&&(et===1?R.kill(!1,1):$[Tt]=0),w||(Tt=et===1?1:3,$[Tt]&&$r(R,$[Tt]))),P&&!Gt&&Math.abs(R.getVelocity())>(aa(P)?P:2500)&&(Ys(R.callbackAnimation),ee?ee.progress(1):Ys(i,dt==="reverse"?1:!et,1))):B&&o&&!on&&o(R)}if(ot){var he=T?qe/T.duration()*(T._caScrollDist||0):qe;at(he+(W._isFlipped?1:0)),ot(he)}ue&&ue(-qe/T.duration()*(T._caScrollDist||0))}},R.enable=function(ce,Be){R.enabled||(R.enabled=!0,Jt(N,"resize",oa),L||Jt(N,"scroll",Zr),D&&Jt(r,"refreshInit",D),ce!==!1&&(R.progress=pe=0,Ue=H=te=Te()),Be!==!1&&R.refresh())},R.getTween=function(ce){return ce&&be?be.tween:ee},R.setPositions=function(ce,Be,Ie,qe){if(T){var Ct=T.scrollTrigger,et=T.duration(),Et=Ct.end-Ct.start;ce=Ct.start+Et*ce/et,Be=Ct.start+Et*Be/et}R.refresh(!1,!1,{start:lh(ce,Ie&&!!R._startClamp),end:lh(Be,Ie&&!!R._endClamp)},qe),R.update()},R.adjustPinSpacing=function(ce){if(ve&&ce){var Be=ve.indexOf(E.d)+1;ve[Be]=parseFloat(ve[Be])+ce+Wt,ve[1]=parseFloat(ve[1])+ce+Wt,Rs(ve)}},R.disable=function(ce,Be){if(ce!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,Be||ee&&ee.pause(),se=0,we&&(we.uncache=1),D&&Zt(r,"refreshInit",D),fe&&(fe.pause(),be.tween&&be.tween.kill()&&(be.tween=0)),!L)){for(var Ie=Qe.length;Ie--;)if(Qe[Ie].scroller===N&&Qe[Ie]!==R)return;Zt(N,"resize",oa),L||Zt(N,"scroll",Zr)}},R.kill=function(ce,Be){R.disable(ce,Be),ee&&!Be&&ee.kill(),l&&delete Oc[l];var Ie=Qe.indexOf(R);Ie>=0&&Qe.splice(Ie,1),Ie===vn&&Bo>0&&vn--,Ie=0,Qe.forEach(function(qe){return qe.scroller===R.scroller&&(Ie=1)}),Ie||xn||(R.scroll.rec=0),i&&(i.scrollTrigger=null,ce&&i.revert({kill:!1}),Be||i.kill()),Re&&[Re,Ce,W,He].forEach(function(qe){return qe.parentNode&&qe.parentNode.removeChild(qe)}),Sa===R&&(Sa=0),d&&(we&&(we.uncache=1),Ie=0,Qe.forEach(function(qe){return qe.pin===d&&Ie++}),Ie||(we.spacer=0)),n.onKill&&n.onKill(R)},Qe.push(R),R.enable(!1,!1),Pe&&Pe(R),i&&i.add&&!Ze){var Le=R.update;R.update=function(){R.update=Le,it.cache++,Xe||_e||R.refresh()},xe.delayedCall(.01,R.update),Ze=.01,Xe=_e=0}else R.refresh();d&&em()},r.register=function(n){return ms||(xe=n||_1(),m1()&&window.document&&r.enable(),ms=ra),ms},r.defaults=function(n){if(n)for(var i in n)Qa[i]=n[i];return Qa},r.disable=function(n,i){ra=0,Qe.forEach(function(o){return o[i?"kill":"disable"](n)}),Zt(tt,"wheel",Zr),Zt(mt,"scroll",Zr),clearInterval(ja),Zt(mt,"touchcancel",pi),Zt(ft,"touchstart",pi),Za(Zt,mt,"pointerdown,touchstart,mousedown",ch),Za(Zt,mt,"pointerup,touchend,mouseup",uh),Ko.kill(),Ka(Zt);for(var s=0;s<it.length;s+=3)Ja(Zt,it[s],it[s+1]),Ja(Zt,it[s],it[s+2])},r.enable=function(){if(tt=window,mt=document,kn=mt.documentElement,ft=mt.body,xe){if(Ua=xe.utils.toArray,ma=xe.utils.clamp,Nc=xe.core.context||pi,Al=xe.core.suppressOverwrites||pi,Eu=tt.history.scrollRestoration||"auto",Fc=tt.pageYOffset||0,xe.core.globals("ScrollTrigger",r),ft){ra=1,As=document.createElement("div"),As.style.height="100vh",As.style.position="absolute",w1(),Y0(),Ot.register(xe),r.isTouch=Ot.isTouch,qi=Ot.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Uc=Ot.isTouch===1,Jt(tt,"wheel",Zr),yu=[tt,mt,kn,ft],xe.matchMedia?(r.matchMedia=function(u){var h=xe.matchMedia(),f;for(f in u)h.add(f,u[f]);return h},xe.addEventListener("matchMediaInit",function(){T1(),Cu()}),xe.addEventListener("matchMediaRevert",function(){return E1()}),xe.addEventListener("matchMedia",function(){Lr(0,1),Xr("matchMedia")}),xe.matchMedia().add("(orientation: portrait)",function(){return Pl(),Pl})):console.warn("Requires GSAP 3.11.0 or later"),Pl(),Jt(mt,"scroll",Zr);var n=ft.hasAttribute("style"),i=ft.style,s=i.borderTopStyle,o=xe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Ci(ft),Xt.m=Math.round(a.top+Xt.sc())||0,Sn.m=Math.round(a.left+Sn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(ft.setAttribute("style",""),ft.removeAttribute("style")),ja=setInterval(dh,250),xe.delayedCall(.5,function(){return $a=0}),Jt(mt,"touchcancel",pi),Jt(ft,"touchstart",pi),Za(Jt,mt,"pointerdown,touchstart,mousedown",ch),Za(Jt,mt,"pointerup,touchend,mouseup",uh),Dc=xe.utils.checkPrefix("transform"),zo.push(Dc),ms=ln(),Ko=xe.delayedCall(.2,Lr).pause(),_s=[mt,"visibilitychange",function(){var u=tt.innerWidth,h=tt.innerHeight;mt.hidden?(sh=u,ah=h):(sh!==u||ah!==h)&&oa()},mt,"DOMContentLoaded",Lr,tt,"load",Lr,tt,"resize",oa],Ka(Jt),Qe.forEach(function(u){return u.enable(0,1)}),l=0;l<it.length;l+=3)Ja(Zt,it[l],it[l+1]),Ja(Zt,it[l],it[l+2])}else if(mt){var c=function u(){r.enable(),mt.removeEventListener("DOMContentLoaded",u)};mt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Rl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ja)||(ja=i)&&setInterval(dh,i),"ignoreMobileResize"in n&&(Uc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ka(Zt)||Ka(Jt,n.autoRefreshEvents||"none"),f1=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=En(n),o=it.indexOf(s),a=Vr(s);~o&&it.splice(o,a?6:2),i&&(a?xi.unshift(tt,i,ft,i,kn,i):xi.unshift(s,i))},r.clearMatchMedia=function(n){Qe.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Bn(n)?En(n):n).getBoundingClientRect(),a=o[s?Or:Fr]*i||0;return s?o.right-a>0&&o.left+a<tt.innerWidth:o.bottom-a>0&&o.top+a<tt.innerHeight},r.positionInViewport=function(n,i,s){Bn(n)&&(n=En(n));var o=n.getBoundingClientRect(),a=o[s?Or:Fr],l=i==null?a/2:i in Jo?Jo[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/tt.innerWidth:(o.top+l)/tt.innerHeight},r.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Wr.killAll||[];Wr={},i.forEach(function(s){return s()})}},r}();Ke.version="3.15.0";Ke.saveStyles=function(r){return r?Ua(r).forEach(function(e){if(e&&e.style){var t=Fn.indexOf(e);t>=0&&Fn.splice(t,5),Fn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),xe.core.getCache(e),Nc())}}):Fn};Ke.revert=function(r,e){return Cu(!r,e)};Ke.create=function(r,e){return new Ke(r,e)};Ke.refresh=function(r){return r?oa(!0):(ms||Ke.register())&&Lr(!0)};Ke.update=function(r){return++it.cache&&Ii(r===!0?2:0)};Ke.clearScrollMemory=b1;Ke.maxScroll=function(r,e){return vi(r,e?Sn:Xt)};Ke.getScrollFunc=function(r,e){return ur(En(r),e?Sn:Xt)};Ke.getById=function(r){return Oc[r]};Ke.getAll=function(){return Qe.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ke.isScrolling=function(){return!!ii};Ke.snapDirectional=Ru;Ke.addEventListener=function(r,e){var t=Wr[r]||(Wr[r]=[]);~t.indexOf(e)||t.push(e)};Ke.removeEventListener=function(r,e){var t=Wr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ke.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],f=[],d=xe.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&un(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return un(s)&&(s=s(),Jt(Ke,"refresh",function(){return s=e.batchMax()})),Ua(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ke.create(c))}),t};var xh=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Dl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Ot.isTouch?" pinch-zoom":""):"none",e===kn&&r(ft,t)},io={auto:1,scroll:1},sm=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||xe.core.getCache(s),a=ln(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==ft&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(io[(l=Jn(s)).overflowY]||io[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Vr(s)&&(io[(l=Jn(s)).overflowY]||io[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},R1=function(e,t,n,i){return Ot.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&sm,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Jt(mt,Ot.eventTypes[0],Sh,!1,!0)},onDisable:function(){return Zt(mt,Ot.eventTypes[0],Sh,!0)}})},am=/(input|label|select|textarea)/i,Mh,Sh=function(e){var t=am.test(e.target.tagName);(t||Mh)&&(e._gsapAllow=!0,Mh=t)},om=function(e){Tr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=En(e.target)||kn,u=xe.core.globals().ScrollSmoother,h=u&&u.get(),f=qi&&(e.content&&En(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=ur(c,Xt),g=ur(c,Sn),_=1,p=(Ot.isTouch&&tt.visualViewport?tt.visualViewport.scale*tt.visualViewport.width:tt.outerWidth)/tt.innerWidth,m=0,y=un(i)?function(){return i(a)}:function(){return i||2.8},v,S,M=R1(c,e.type,!0,s),A=function(){return S=!1},T=pi,P=pi,x=function(){l=vi(c,Xt),P=ma(qi?1:0,l),n&&(T=ma(0,vi(c,Sn))),v=Br},E=function(){f._gsap.y=sa(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},B=function(){if(S){requestAnimationFrame(A);var V=sa(a.deltaY/2),z=P(d.v-V);if(f&&z!==d.v+d.offset){d.offset=z-d.v;var R=sa((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",f._gsap.y=R+"px",d.cacheID=it.cache,Ii()}return!0}d.offset&&E(),S=!0},N,j,L,I,$=function(){x(),N.isActive()&&N.vars.scrollY>l&&(d()>l?N.progress(1)&&d(l):N.resetTo("scrollY",l))};return f&&xe.set(f,{y:"+=0"}),e.ignoreCheck=function(O){return qi&&O.type==="touchmove"&&B()||_>1.05&&O.type!=="touchstart"||a.isGesturing||O.touches&&O.touches.length>1},e.onPress=function(){S=!1;var O=_;_=sa((tt.visualViewport&&tt.visualViewport.scale||1)/p),N.pause(),O!==_&&Dl(c,_>1.01?!0:n?!1:"x"),j=g(),L=d(),x(),v=Br},e.onRelease=e.onGestureStart=function(O,V){if(d.offset&&E(),!V)I.restart(!0);else{it.cache++;var z=y(),R,D;n&&(R=g(),D=R+z*.05*-O.velocityX/.227,z*=xh(g,R,D,vi(c,Sn)),N.vars.scrollX=T(D)),R=d(),D=R+z*.05*-O.velocityY/.227,z*=xh(d,R,D,vi(c,Xt)),N.vars.scrollY=P(D),N.invalidate().duration(z).play(.01),(qi&&N.vars.scrollY>=l||R>=l-1)&&xe.to({},{onUpdate:$,duration:z})}o&&o(O)},e.onWheel=function(){N._ts&&N.pause(),ln()-m>1e3&&(v=0,m=ln())},e.onChange=function(O,V,z,R,D){if(Br!==v&&x(),V&&n&&g(T(R[2]===V?j+(O.startX-O.x):g()+V-R[1])),z){d.offset&&E();var k=D[2]===z,oe=k?L+O.startY-O.y:d()+z-D[1],te=P(oe);k&&oe!==te&&(L+=te-oe),d(te)}(z||V)&&Ii()},e.onEnable=function(){Dl(c,n?!1:"x"),Ke.addEventListener("refresh",$),Jt(tt,"resize",$),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),M.enable()},e.onDisable=function(){Dl(c,!0),Zt(tt,"resize",$),Ke.removeEventListener("refresh",$),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ot(e),a.iOS=qi,qi&&!d()&&d(1),qi&&xe.ticker.add(pi),I=a._dc,N=xe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:A1(d,d(),function(){return N.pause()})},onUpdate:Ii,onComplete:I.vars.onComplete}),a};Ke.sort=function(r){if(un(r))return Qe.sort(r);var e=tt.pageYOffset||0;return Ke.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+tt.innerHeight}),Qe.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ke.observe=function(r){return new Ot(r)};Ke.normalizeScroll=function(r){if(typeof r>"u")return gn;if(r===!0&&gn)return gn.enable();if(r===!1){gn&&gn.kill(),gn=r;return}var e=r instanceof Ot?r:om(r);return gn&&gn.target===e.target&&gn.kill(),Vr(e.target)&&(gn=e),e};Ke.core={_getVelocityProp:Lc,_inputObserver:R1,_scrollers:it,_proxies:xi,bridge:{ss:function(){ii||Xr("scrollStart"),ii=ln()},ref:function(){return on}}};_1()&&xe.registerPlugin(Ke);/*!
 * SplitText 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2026, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */let js,$s,yh=typeof Symbol=="function"?Symbol():"_split",zc,lm=()=>zc||D1.register(window.gsap),Eh=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,Ia=r=>r?typeof r=="string"?Ia(document.querySelectorAll(r)):"length"in r?Array.from(r).reduce((e,t)=>(typeof t=="string"?e.push(...Ia(t)):e.push(t),e),[]):[r]:[],Th=r=>Ia(r).filter(e=>e&&e.nodeType===1),kc=[],Ul=function(){},cm={add:r=>r()},um=/\s+/g,bh=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),Qo={left:0,top:0,width:0,height:0},hm=(r,e)=>{for(;++e<r.length&&r[e]===Qo;);return r[e]||Qo},wh=({element:r,html:e,ariaL:t,ariaH:n})=>{r.innerHTML=e,t?r.setAttribute("aria-label",t):r.removeAttribute("aria-label"),n?r.setAttribute("aria-hidden",n):r.removeAttribute("aria-hidden")},Ah=(r,e)=>{if(e){let t=new Set(r.join("").match(e)||kc),n=r.length,i,s,o,a;if(t.size)for(;--n>-1;){s=r[n];for(o of t)if(o.startsWith(s)&&o.length>s.length){for(i=0,a=s;o.startsWith(a+=r[n+ ++i])&&a.length<o.length;);if(i&&a.length===o.length){r[n]=o,r.splice(n+1,i);break}}}}return r},Rh=r=>window.getComputedStyle(r).display==="inline"&&(r.style.display="inline-block"),Jr=(r,e,t)=>e.insertBefore(typeof r=="string"?document.createTextNode(r):r,t),Hc=(r,e,t)=>{let n=e[r+"sClass"]||"",{tag:i="div",aria:s="auto",propIndex:o=!1}=e,a=r==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=u=>{let h=document.createElement(i),f=t.length+1;return n&&(h.className=n+(l?" "+n+f:"")),o&&h.style.setProperty("--"+r,f+""),s!=="none"&&h.setAttribute("aria-hidden","true"),i!=="span"&&(h.style.position="relative",h.style.display=a),h.textContent=u,t.push(h),h};return l&&(n=n.replace("++","")),c.collection=t,c},fm=(r,e,t,n)=>{let i=Hc("line",t,n),s=window.getComputedStyle(r).textAlign||"left";return(o,a)=>{let l=i("");for(l.style.textAlign=s,r.insertBefore(l,e[o]);o<a;o++)l.appendChild(e[o]);l.normalize()}},C1=(r,e,t,n,i,s,o,a,l,c)=>{var u;let h=Array.from(r.childNodes),f=0,{wordDelimiter:d,reduceWhiteSpace:g=!0,prepareText:_}=e,p=r.getBoundingClientRect(),m=p,y=!g&&window.getComputedStyle(r).whiteSpace.substring(0,3)==="pre",v=0,S=t.collection,M,A,T,P,x,E,B,N,j,L,I,$,O,V,z,R,D,k;for(typeof d=="object"?(T=d.delimiter||d,A=d.replaceWith||""):A=d===""?"":d||" ",M=A!==" ";f<h.length;f++)if(P=h[f],P.nodeType===3){for(z=P.textContent||"",g?z=z.replace(um," "):y&&(z=z.replace(/\n/g,A+`
`)),_&&(z=_(z,r)),P.textContent=z,x=A||T?z.split(T||A):z.match(a)||kc,D=x[x.length-1],N=M?D.slice(-1)===" ":!D,D||x.pop(),m=p,B=M?x[0].charAt(0)===" ":!x[0],B&&Jr(" ",r,P),x[0]||x.shift(),Ah(x,l),s&&c||(P.textContent=""),j=1;j<=x.length;j++)if(R=x[j-1],!g&&y&&R.charAt(0)===`
`&&((u=P.previousSibling)==null||u.remove(),Jr(document.createElement("br"),r,P),R=R.slice(1)),!g&&R==="")Jr(A,r,P);else if(R===" ")r.insertBefore(document.createTextNode(" "),P);else{if(M&&R.charAt(0)===" "&&Jr(" ",r,P),v&&j===1&&!B&&S.indexOf(v.parentNode)>-1?(E=S[S.length-1],E.appendChild(document.createTextNode(n?"":R))):(E=t(n?"":R),Jr(E,r,P),v&&j===1&&!B&&E.insertBefore(v,E.firstChild)),n)for(I=Eh?Ah([...Eh.segment(R)].map(oe=>oe.segment),l):R.match(a)||kc,k=0;k<I.length;k++)E.appendChild(I[k]===" "?document.createTextNode(" "):n(I[k]));if(s&&c){if(z=P.textContent=z.substring(R.length+1,z.length),L=E.getBoundingClientRect(),L.top>m.top&&L.left<=m.left){for($=r.cloneNode(),O=r.childNodes[0];O&&O!==E;)V=O,O=O.nextSibling,$.appendChild(V);r.parentNode.insertBefore($,r),i&&Rh($)}m=L}(j<x.length||N)&&Jr(j>=x.length?" ":M&&R.slice(-1)===" "?" "+A:A,r,P)}r.removeChild(P),v=0}else P.nodeType===1&&(o&&o.indexOf(P)>-1?(S.indexOf(P.previousSibling)>-1&&S[S.length-1].appendChild(P),v=P):(C1(P,e,t,n,i,s,o,a,l,!0),v=0),i&&Rh(P))};const P1=class L1{constructor(e,t){this.isSplit=!1,lm(),this.elements=Th(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(o=>{var a;t.overwrite!==!1&&((a=o[yh])==null||a._data.orig.filter(({element:l})=>l===o).forEach(wh)),o[yh]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],i,s=()=>{let o=n.length,a;for(;o--;){a=n[o];let l=a.element.offsetWidth;if(l!==a.width){a.width=l,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(i),i=setTimeout(s,200)})},Ul(this),this.split(t)}split(e){return(this._ctx||cm).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:i=!0,smartWrap:s,onSplit:o,autoSplit:a=!1,specialChars:l,mask:c}=this.vars,u=t.indexOf("lines")>-1,h=t.indexOf("chars")>-1,f=t.indexOf("words")>-1,d=h&&!f&&!u,g=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),_=g?new RegExp(g.source+"|"+bh.source,"gu"):bh,p=!!e.ignore&&Th(e.ignore),{orig:m,animTime:y,obs:v}=this._data,S;(h||f||u)&&(this.elements.forEach((M,A)=>{m[A]={element:M,html:M.innerHTML,ariaL:M.getAttribute("aria-label"),ariaH:M.getAttribute("aria-hidden")},n==="auto"?M.setAttribute("aria-label",(M.textContent||"").trim()):n==="hidden"&&M.setAttribute("aria-hidden","true");let T=[],P=[],x=[],E=h?Hc("char",e,T):null,B=Hc("word",e,P),N,j,L,I;if(C1(M,e,B,E,d,i&&(u||d),p,_,g,!1),u){let $=Ia(M.childNodes),O=fm(M,$,e,x),V,z=[],R=0,D=$.map(te=>te.nodeType===1?te.getBoundingClientRect():Qo),k=Qo,oe;for(N=0;N<$.length;N++)V=$[N],V.nodeType===1&&(V.nodeName==="BR"?((!N||$[N-1].nodeName!=="BR")&&(z.push(V),O(R,N+1)),R=N+1,k=hm(D,N)):(oe=D[N],N&&oe.top>k.top&&oe.left<k.left+k.width-1&&(O(R,N),R=N),k=oe));R<N&&O(R,N),z.forEach(te=>{var ie;return(ie=te.parentNode)==null?void 0:ie.removeChild(te)})}if(!f){for(N=0;N<P.length;N++)if(j=P[N],h||!j.nextSibling||j.nextSibling.nodeType!==3)if(s&&!u){for(L=document.createElement("span"),L.style.whiteSpace="nowrap";j.firstChild;)L.appendChild(j.firstChild);j.replaceWith(L)}else j.replaceWith(...j.childNodes);else I=j.nextSibling,I&&I.nodeType===3&&(I.textContent=(j.textContent||"")+(I.textContent||""),j.remove());P.length=0,M.normalize()}this.lines.push(...x),this.words.push(...P),this.chars.push(...T)}),c&&this[c]&&this.masks.push(...this[c].map(M=>{let A=M.cloneNode();return M.replaceWith(A),A.appendChild(M),M.className&&(A.className=M.className.trim().split(" ").map(T=>T+"-mask").join(" ")),A.style.overflow="clip",A}))),this.isSplit=!0,$s&&u&&a&&$s.addEventListener("loadingdone",this._split),(S=o&&o(this))&&S.totalTime&&(this._data.anim=y?S.totalTime(y):S),u&&a&&this.elements.forEach((M,A)=>{m[A].width=M.offsetWidth,v&&v.observe(M)})}),this}kill(){let{obs:e}=this._data;e&&e.disconnect(),$s==null||$s.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:i}=this._data;this.kill(),n.forEach(wh),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,i&&(this._data.animTime=i.totalTime(),i.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new L1(e,t)}static register(e){js=js||e||window.gsap,js&&(Ia=js.utils.toArray,Ul=js.core.context||Ul),!zc&&window.innerWidth>0&&($s=document.fonts,zc=!0)}};P1.version="3.15.0";let D1=P1;ut.registerPlugin(Ke,D1);ut.config({nullTargetWarn:!1});const Ft=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,dm=()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches;var pm="1.1.20";function U1(r,e,t){return Math.max(r,Math.min(e,t))}function mm(r,e,t){return(1-t)*r+t*e}function _m(r,e,t,n){return mm(r,e,1-Math.exp(-t*n))}function gm(r,e){return(r%e+e)%e}var vm=class{constructor(){Ne(this,"isRunning",!1);Ne(this,"value",0);Ne(this,"from",0);Ne(this,"to",0);Ne(this,"currentTime",0);Ne(this,"lerp");Ne(this,"duration");Ne(this,"easing");Ne(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=U1(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=_m(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function xm(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Mm=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ne(this,"width",0);Ne(this,"height",0);Ne(this,"scrollHeight",0);Ne(this,"scrollWidth",0);Ne(this,"debouncedResize");Ne(this,"wrapperResizeObserver");Ne(this,"contentResizeObserver");Ne(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ne(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ne(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=xm(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},N1=class{constructor(){Ne(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Ch=100/6,ki={passive:!1},Sm=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ne(this,"touchStart",{x:0,y:0});Ne(this,"lastDelta",{x:0,y:0});Ne(this,"window",{width:0,height:0});Ne(this,"emitter",new N1);Ne(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ne(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ne(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ne(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Ch:n===2?this.window.width:1,s=n===1?Ch:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ne(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ki),this.element.addEventListener("touchstart",this.onTouchStart,ki),this.element.addEventListener("touchmove",this.onTouchMove,ki),this.element.addEventListener("touchend",this.onTouchEnd,ki)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,ki),this.element.removeEventListener("touchstart",this.onTouchStart,ki),this.element.removeEventListener("touchmove",this.onTouchMove,ki),this.element.removeEventListener("touchend",this.onTouchEnd,ki)}},ym=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=A=>Math.min(1,1.001-Math.pow(2,-10*A)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:p,virtualScroll:m,overscroll:y=!0,autoRaf:v=!1,anchors:S=!1,__experimental__naiveDimensions:M=!1}={}){Ne(this,"_isScrolling",!1);Ne(this,"_isStopped",!1);Ne(this,"_isLocked",!1);Ne(this,"_preventNextNativeScrollEvent",!1);Ne(this,"_resetVelocityTimeout",null);Ne(this,"__rafID",null);Ne(this,"isTouching");Ne(this,"time",0);Ne(this,"userData",{});Ne(this,"lastVelocity",0);Ne(this,"velocity",0);Ne(this,"direction",0);Ne(this,"options");Ne(this,"targetScroll");Ne(this,"animatedScroll");Ne(this,"animate",new vm);Ne(this,"emitter",new N1);Ne(this,"dimensions");Ne(this,"virtualScroll");Ne(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ne(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ne(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Ne(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ne(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(p=>{var m,y,v;return p instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(p))||((m=p.hasAttribute)==null?void 0:m.call(p,"data-lenis-prevent"))||i&&((y=p.hasAttribute)==null?void 0:y.call(p,"data-lenis-prevent-touch"))||s&&((v=p.hasAttribute)==null?void 0:v.call(p,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const d=i&&this.options.syncTouch,_=i&&n.type==="touchend"&&Math.abs(f)>5;_&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...d?{lerp:_?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ne(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ne(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=pm,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:p,virtualScroll:m,overscroll:y,autoRaf:v,anchors:S,__experimental__naiveDimensions:M},this.dimensions=new Mm(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Sm(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}const d=f.getBoundingClientRect();r=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=U1(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=h??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?gm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};let Ui=null;function Em(){Ui||Ft()||(Ui=new ym({duration:1.15,easing:r=>1-Math.pow(1-r,4),smoothWheel:!0,wheelMultiplier:.95,touchMultiplier:1}),Ui.on("scroll",Ke.update),ut.ticker.add(r=>Ui.raf(r*1e3)),ut.ticker.lagSmoothing(0))}const Nl=new Set,ya=(r,e="page")=>{r?Nl.add(e):Nl.delete(e),Ui&&(Nl.size?Ui.stop():Ui.start())};function I1(r,{immediate:e=!1,offset:t=0}={}){if(Ui)return Ui.scrollTo(r,{offset:t,immediate:e,duration:1.4,easing:n=>n<.5?8*n**4:1-Math.pow(-2*n+2,4)/2});if(typeof r=="number")return window.scrollTo({top:r,behavior:e?"instant":"smooth"});r==null||r.scrollIntoView({behavior:e?"instant":"smooth"})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pu="158",Tm=0,Ph=1,bm=2,O1=1,wm=2,wi=3,hr=0,Pn=1,Pi=2,rr=0,Cs=1,Lh=2,Dh=3,Uh=4,Am=5,Rr=100,Rm=101,Cm=102,Nh=103,Ih=104,Pm=200,Lm=201,Dm=202,Um=203,Gc=204,Vc=205,Nm=206,Im=207,Om=208,Fm=209,Bm=210,zm=211,km=212,Hm=213,Gm=214,Vm=0,Wm=1,Xm=2,el=3,qm=4,Ym=5,jm=6,$m=7,F1=0,Km=1,Zm=2,sr=0,Jm=1,Qm=2,e2=3,t2=4,n2=5,B1=300,Bs=301,zs=302,Wc=303,Xc=304,ul=306,qc=1e3,hi=1001,Yc=1002,Mn=1003,Oh=1004,Il=1005,Qn=1006,i2=1007,Oa=1008,ar=1009,r2=1010,s2=1011,Lu=1012,z1=1013,Ji=1014,Qi=1015,Fa=1016,k1=1017,H1=1018,zr=1020,a2=1021,fi=1023,o2=1024,l2=1025,kr=1026,ks=1027,c2=1028,G1=1029,u2=1030,V1=1031,W1=1033,Ol=33776,Fl=33777,Bl=33778,zl=33779,Fh=35840,Bh=35841,zh=35842,kh=35843,h2=36196,Hh=37492,Gh=37496,Vh=37808,Wh=37809,Xh=37810,qh=37811,Yh=37812,jh=37813,$h=37814,Kh=37815,Zh=37816,Jh=37817,Qh=37818,ef=37819,tf=37820,nf=37821,kl=36492,rf=36494,sf=36495,f2=36283,af=36284,of=36285,lf=36286,X1=3e3,Hr=3001,d2=3200,p2=3201,m2=0,_2=1,ei="",tn="srgb",Bi="srgb-linear",Du="display-p3",hl="display-p3-linear",tl="linear",wt="srgb",nl="rec709",il="p3",Qr=7680,cf=519,g2=512,v2=513,x2=514,M2=515,S2=516,y2=517,E2=518,T2=519,uf=35044,hf="300 es",jc=1035,Ni=2e3,rl=2001;class Gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hl=Math.PI/180,$c=180/Math.PI;function za(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[r&255]+sn[r>>8&255]+sn[r>>16&255]+sn[r>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Tn(r,e,t){return Math.max(e,Math.min(t,r))}function b2(r,e){return(r%e+e)%e}function Gl(r,e,t){return(1-t)*r+t*e}function ff(r){return(r&r-1)===0&&r!==0}function Kc(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ks(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function yn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class ht{constructor(e=0,t=0){ht.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,n,i,s,o,a,l,c){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],v=i[4],S=i[7],M=i[2],A=i[5],T=i[8];return s[0]=o*_+a*y+l*M,s[3]=o*p+a*v+l*A,s[6]=o*m+a*S+l*T,s[1]=c*_+u*y+h*M,s[4]=c*p+u*v+h*A,s[7]=c*m+u*S+h*T,s[2]=f*_+d*y+g*M,s[5]=f*p+d*v+g*A,s[8]=f*m+d*S+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vl.makeScale(e,t)),this}rotate(e){return this.premultiply(Vl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vl=new nt;function q1(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function sl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function w2(){const r=sl("canvas");return r.style.display="block",r}const df={};function Ea(r){r in df||(df[r]=!0,console.warn(r))}const pf=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),mf=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ro={[Bi]:{transfer:tl,primaries:nl,toReference:r=>r,fromReference:r=>r},[tn]:{transfer:wt,primaries:nl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[hl]:{transfer:tl,primaries:il,toReference:r=>r.applyMatrix3(mf),fromReference:r=>r.applyMatrix3(pf)},[Du]:{transfer:wt,primaries:il,toReference:r=>r.convertSRGBToLinear().applyMatrix3(mf),fromReference:r=>r.applyMatrix3(pf).convertLinearToSRGB()}},A2=new Set([Bi,hl]),vt={enabled:!0,_workingColorSpace:Bi,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!A2.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=ro[e].toReference,i=ro[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ro[r].primaries},getTransfer:function(r){return r===ei?tl:ro[r].transfer}};function Ps(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Wl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let es;class Y1{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{es===void 0&&(es=sl("canvas")),es.width=e.width,es.height=e.height;const n=es.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=es}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ps(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ps(t[n]/255)*255):t[n]=Ps(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let R2=0;class j1{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R2++}),this.uuid=za(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Xl(i[o].image)):s.push(Xl(i[o]))}else s=Xl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Xl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Y1.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let C2=0;class qn extends Gs{constructor(e=qn.DEFAULT_IMAGE,t=qn.DEFAULT_MAPPING,n=hi,i=hi,s=Qn,o=Oa,a=fi,l=ar,c=qn.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C2++}),this.uuid=za(),this.name="",this.source=new j1(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Hr?tn:ei),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==B1)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qc:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case Yc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qc:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case Yc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===tn?Hr:X1}set encoding(e){Ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Hr?tn:ei}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=B1;qn.DEFAULT_ANISOTROPY=1;class qt{constructor(e=0,t=0,n=0,i=1){qt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,M=(m+1)/2,A=(u+f)/4,T=(h+_)/4,P=(g+p)/4;return v>S&&v>M?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=A/n,s=T/n):S>M?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=A/i,s=P/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=T/s,i=P/s),this.set(n,i,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class P2 extends Gs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Ea("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Hr?tn:ei),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new qn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new j1(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qr extends P2{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $1 extends qn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class L2 extends qn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ka{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let p=1-a;const m=l*f+c*d+u*g+h*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const M=Math.sqrt(v),A=Math.atan2(M,m*y);p=Math.sin(p*A)/M,a=Math.sin(a*A)/M}const S=a*y;if(l=l*p+f*S,c=c*p+d*S,u=u*p+g*S,h=h*p+_*S,p===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=M,c*=M,u*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,n=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_f.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ql.copy(this).projectOnVector(e),this.sub(ql)}reflect(e){return this.sub(ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ql=new Z,_f=new ka;class Ha{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ri):ri.fromBufferAttribute(s,o),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),so.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),so.copy(n.boundingBox)),so.applyMatrix4(e.matrixWorld),this.union(so)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),ao.subVectors(this.max,Zs),ts.subVectors(e.a,Zs),ns.subVectors(e.b,Zs),is.subVectors(e.c,Zs),Hi.subVectors(ns,ts),Gi.subVectors(is,ns),vr.subVectors(ts,is);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-vr.z,vr.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,vr.z,0,-vr.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-vr.y,vr.x,0];return!Yl(t,ts,ns,is,ao)||(t=[1,0,0,0,1,0,0,0,1],!Yl(t,ts,ns,is,ao))?!1:(oo.crossVectors(Hi,Gi),t=[oo.x,oo.y,oo.z],Yl(t,ts,ns,is,ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Si=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],ri=new Z,so=new Ha,ts=new Z,ns=new Z,is=new Z,Hi=new Z,Gi=new Z,vr=new Z,Zs=new Z,ao=new Z,oo=new Z,xr=new Z;function Yl(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){xr.fromArray(r,s);const a=i.x*Math.abs(xr.x)+i.y*Math.abs(xr.y)+i.z*Math.abs(xr.z),l=e.dot(xr),c=t.dot(xr),u=n.dot(xr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const D2=new Ha,Js=new Z,jl=new Z;class fl{constructor(e=new Z,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):D2.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);const t=Js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Js,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(jl)),this.expandByPoint(Js.copy(e.center).sub(jl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new Z,$l=new Z,lo=new Z,Vi=new Z,Kl=new Z,co=new Z,Zl=new Z;class K1{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){$l.copy(e).add(t).multiplyScalar(.5),lo.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub($l);const s=e.distanceTo(t)*.5,o=-this.direction.dot(lo),a=Vi.dot(this.direction),l=-Vi.dot(lo),c=Vi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy($l).addScaledVector(lo,f),d}intersectSphere(e,t){yi.subVectors(e.center,this.origin);const n=yi.dot(this.direction),i=yi.dot(yi)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,n,i,s){Kl.subVectors(t,e),co.subVectors(n,e),Zl.crossVectors(Kl,co);let o=this.direction.dot(Zl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vi.subVectors(this.origin,e);const l=a*this.direction.dot(co.crossVectors(Vi,co));if(l<0)return null;const c=a*this.direction.dot(Kl.cross(Vi));if(c<0||l+c>o)return null;const u=-a*Vi.dot(Zl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,p){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,p)}set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),o=1/rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U2,e,N2)}lookAt(e,t,n){const i=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),Wi.crossVectors(n,In),Wi.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),Wi.crossVectors(n,In)),Wi.normalize(),uo.crossVectors(In,Wi),i[0]=Wi.x,i[4]=uo.x,i[8]=In.x,i[1]=Wi.y,i[5]=uo.y,i[9]=In.y,i[2]=Wi.z,i[6]=uo.z,i[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],v=n[7],S=n[11],M=n[15],A=i[0],T=i[4],P=i[8],x=i[12],E=i[1],B=i[5],N=i[9],j=i[13],L=i[2],I=i[6],$=i[10],O=i[14],V=i[3],z=i[7],R=i[11],D=i[15];return s[0]=o*A+a*E+l*L+c*V,s[4]=o*T+a*B+l*I+c*z,s[8]=o*P+a*N+l*$+c*R,s[12]=o*x+a*j+l*O+c*D,s[1]=u*A+h*E+f*L+d*V,s[5]=u*T+h*B+f*I+d*z,s[9]=u*P+h*N+f*$+d*R,s[13]=u*x+h*j+f*O+d*D,s[2]=g*A+_*E+p*L+m*V,s[6]=g*T+_*B+p*I+m*z,s[10]=g*P+_*N+p*$+m*R,s[14]=g*x+_*j+p*O+m*D,s[3]=y*A+v*E+S*L+M*V,s[7]=y*T+v*B+S*I+M*z,s[11]=y*P+v*N+S*$+M*R,s[15]=y*x+v*j+S*O+M*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+_*(+t*l*d-t*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+p*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+m*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],p=e[14],m=e[15],y=h*p*c-_*f*c+_*l*d-a*p*d-h*l*m+a*f*m,v=g*f*c-u*p*c-g*l*d+o*p*d+u*l*m-o*f*m,S=u*_*c-g*h*c+g*a*d-o*_*d-u*a*m+o*h*m,M=g*h*l-u*_*l-g*a*f+o*_*f+u*a*p-o*h*p,A=t*y+n*v+i*S+s*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=y*T,e[1]=(_*f*s-h*p*s-_*i*d+n*p*d+h*i*m-n*f*m)*T,e[2]=(a*p*s-_*l*s+_*i*c-n*p*c-a*i*m+n*l*m)*T,e[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*T,e[4]=v*T,e[5]=(u*p*s-g*f*s+g*i*d-t*p*d-u*i*m+t*f*m)*T,e[6]=(g*l*s-o*p*s-g*i*c+t*p*c+o*i*m-t*l*m)*T,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*d+t*l*d)*T,e[8]=S*T,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*m-t*h*m)*T,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*m+t*a*m)*T,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*T,e[12]=M*T,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*p+t*h*p)*T,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*p-t*a*p)*T,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,_=o*u,p=o*h,m=a*h,y=l*c,v=l*u,S=l*h,M=n.x,A=n.y,T=n.z;return i[0]=(1-(_+m))*M,i[1]=(d+S)*M,i[2]=(g-v)*M,i[3]=0,i[4]=(d-S)*A,i[5]=(1-(f+m))*A,i[6]=(p+y)*A,i[7]=0,i[8]=(g+v)*T,i[9]=(p-y)*T,i[10]=(1-(f+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=rs.set(i[0],i[1],i[2]).length();const o=rs.set(i[4],i[5],i[6]).length(),a=rs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],si.copy(this);const c=1/s,u=1/o,h=1/a;return si.elements[0]*=c,si.elements[1]*=c,si.elements[2]*=c,si.elements[4]*=u,si.elements[5]*=u,si.elements[6]*=u,si.elements[8]*=h,si.elements[9]*=h,si.elements[10]*=h,t.setFromRotationMatrix(si),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Ni){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(a===Ni)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===rl)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Ni){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-s),f=(t+e)*c,d=(n+i)*u;let g,_;if(a===Ni)g=(o+s)*h,_=-2*h;else if(a===rl)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const rs=new Z,si=new Qt,U2=new Z(0,0,0),N2=new Z(1,1,1),Wi=new Z,uo=new Z,In=new Z,gf=new Qt,vf=new ka;class dl{constructor(e=0,t=0,n=0,i=dl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Tn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Tn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Tn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vf.setFromEuler(this),this.setFromQuaternion(vf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dl.DEFAULT_ORDER="XYZ";class Z1{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let I2=0;const xf=new Z,ss=new ka,Ei=new Qt,ho=new Z,Qs=new Z,O2=new Z,F2=new ka,Mf=new Z(1,0,0),Sf=new Z(0,1,0),yf=new Z(0,0,1),B2={type:"added"},z2={type:"removed"};class Ln extends Gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I2++}),this.uuid=za(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new Z,t=new dl,n=new ka,i=new Z(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new nt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Z1,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Mf,e)}rotateY(e){return this.rotateOnAxis(Sf,e)}rotateZ(e){return this.rotateOnAxis(yf,e)}translateOnAxis(e,t){return xf.copy(e).applyQuaternion(this.quaternion),this.position.add(xf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mf,e)}translateY(e){return this.translateOnAxis(Sf,e)}translateZ(e){return this.translateOnAxis(yf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(Qs,ho,this.up):Ei.lookAt(ho,Qs,this.up),this.quaternion.setFromRotationMatrix(Ei),i&&(Ei.extractRotation(i.matrixWorld),ss.setFromRotationMatrix(Ei),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(B2)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(z2)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,O2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,F2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ln.DEFAULT_UP=new Z(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new Z,Ti=new Z,Jl=new Z,bi=new Z,as=new Z,os=new Z,Ef=new Z,Ql=new Z,ec=new Z,tc=new Z;let fo=!1;class ci{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ai.subVectors(e,t),i.cross(ai);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ai.subVectors(i,t),Ti.subVectors(n,t),Jl.subVectors(e,t);const o=ai.dot(ai),a=ai.dot(Ti),l=ai.dot(Jl),c=Ti.dot(Ti),u=Ti.dot(Jl),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,bi),bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getUV(e,t,n,i,s,o,a,l){return fo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fo=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,bi),l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l}static isFrontFacing(e,t,n,i){return ai.subVectors(n,t),Ti.subVectors(e,t),ai.cross(Ti).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),ai.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return fo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fo=!0),ci.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return ci.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;as.subVectors(i,n),os.subVectors(s,n),Ql.subVectors(e,n);const l=as.dot(Ql),c=os.dot(Ql);if(l<=0&&c<=0)return t.copy(n);ec.subVectors(e,i);const u=as.dot(ec),h=os.dot(ec);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(as,o);tc.subVectors(e,s);const d=as.dot(tc),g=os.dot(tc);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(os,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return Ef.subVectors(s,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Ef,a);const m=1/(p+_+f);return o=_*m,a=f*m,t.copy(n).addScaledVector(as,o).addScaledVector(os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const J1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},po={h:0,s:0,l:0};function nc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class gt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=vt.workingColorSpace){if(e=b2(e,1),t=Tn(t,0,1),n=Tn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=nc(o,s,e+1/3),this.g=nc(o,s,e),this.b=nc(o,s,e-1/3)}return vt.toWorkingColorSpace(this,i),this}setStyle(e,t=tn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tn){const n=J1[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}copyLinearToSRGB(e){return this.r=Wl(e.r),this.g=Wl(e.g),this.b=Wl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tn){return vt.fromWorkingColorSpace(an.copy(this),e),Math.round(Tn(an.r*255,0,255))*65536+Math.round(Tn(an.g*255,0,255))*256+Math.round(Tn(an.b*255,0,255))}getHexString(e=tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.fromWorkingColorSpace(an.copy(this),t);const n=an.r,i=an.g,s=an.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=tn){vt.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,i=an.b;return e!==tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(po);const n=Gl(Xi.h,po.h,t),i=Gl(Xi.s,po.s,t),s=Gl(Xi.l,po.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new gt;gt.NAMES=J1;let k2=0;class Ga extends Gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k2++}),this.uuid=za(),this.name="",this.type="Material",this.blending=Cs,this.side=hr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gc,this.blendDst=Vc,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=el,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(n.blending=this.blending),this.side!==hr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gc&&(n.blendSrc=this.blendSrc),this.blendDst!==Vc&&(n.blendDst=this.blendDst),this.blendEquation!==Rr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==el&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Q1 extends Ga{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=F1,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zt=new Z,mo=new ht;class Ut{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=uf,this.updateRange={offset:0,count:-1},this.gpuType=Qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mo.fromBufferAttribute(this,t),mo.applyMatrix3(e),this.setXY(t,mo.x,mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ks(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ks(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ks(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ks(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ks(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),i=yn(i,this.array),s=yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==uf&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class ep extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tp extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Gr extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let H2=0;const $n=new Qt,ic=new Ln,ls=new Z,On=new Ha,ea=new Ha,Kt=new Z;class zi extends Gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H2++}),this.uuid=za(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(q1(e)?tp:ep)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new nt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,t,n){return $n.makeTranslation(e,t,n),this.applyMatrix4($n),this}scale(e,t,n){return $n.makeScale(e,t,n),this.applyMatrix4($n),this}lookAt(e){return ic.lookAt(e),ic.updateMatrix(),this.applyMatrix4(ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Gr(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ha);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];On.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Z,1/0);return}if(e){const n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ea.setFromBufferAttribute(a),this.morphTargetsRelative?(Kt.addVectors(On.min,ea.min),On.expandByPoint(Kt),Kt.addVectors(On.max,ea.max),On.expandByPoint(Kt)):(On.expandByPoint(ea.min),On.expandByPoint(ea.max))}On.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Kt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Kt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Kt.fromBufferAttribute(a,c),l&&(ls.fromBufferAttribute(e,c),Kt.add(ls)),i=Math.max(i,n.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let E=0;E<a;E++)c[E]=new Z,u[E]=new Z;const h=new Z,f=new Z,d=new Z,g=new ht,_=new ht,p=new ht,m=new Z,y=new Z;function v(E,B,N){h.fromArray(i,E*3),f.fromArray(i,B*3),d.fromArray(i,N*3),g.fromArray(o,E*2),_.fromArray(o,B*2),p.fromArray(o,N*2),f.sub(h),d.sub(h),_.sub(g),p.sub(g);const j=1/(_.x*p.y-p.x*_.y);isFinite(j)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-_.y).multiplyScalar(j),y.copy(d).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(j),c[E].add(m),c[B].add(m),c[N].add(m),u[E].add(y),u[B].add(y),u[N].add(y))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let E=0,B=S.length;E<B;++E){const N=S[E],j=N.start,L=N.count;for(let I=j,$=j+L;I<$;I+=3)v(n[I+0],n[I+1],n[I+2])}const M=new Z,A=new Z,T=new Z,P=new Z;function x(E){T.fromArray(s,E*3),P.copy(T);const B=c[E];M.copy(B),M.sub(T.multiplyScalar(T.dot(B))).normalize(),A.crossVectors(P,B);const j=A.dot(u[E])<0?-1:1;l[E*4]=M.x,l[E*4+1]=M.y,l[E*4+2]=M.z,l[E*4+3]=j}for(let E=0,B=S.length;E<B;++E){const N=S[E],j=N.start,L=N.count;for(let I=j,$=j+L;I<$;I+=3)x(n[I+0]),x(n[I+1]),x(n[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new Z,s=new Z,o=new Z,a=new Z,l=new Z,c=new Z,u=new Z,h=new Z;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let m=0;m<u;m++)f[g++]=c[d++]}return new Ut(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tf=new Qt,Mr=new K1,_o=new fl,bf=new Z,cs=new Z,us=new Z,hs=new Z,rc=new Z,go=new Z,vo=new ht,xo=new ht,Mo=new ht,wf=new Z,Af=new Z,Rf=new Z,So=new Z,yo=new Z;class er extends Ln{constructor(e=new zi,t=new Q1){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){go.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(rc.fromBufferAttribute(h,e),o?go.addScaledVector(rc,u):go.addScaledVector(rc.sub(t),u))}t.add(go)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(s),Mr.copy(e.ray).recast(e.near),!(_o.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(_o,bf)===null||Mr.origin.distanceToSquared(bf)>(e.far-e.near)**2))&&(Tf.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(Tf),!(n.boundingBox!==null&&Mr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let S=y,M=v;S<M;S+=3){const A=a.getX(S),T=a.getX(S+1),P=a.getX(S+2);i=Eo(this,m,e,n,c,u,h,A,T,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),v=a.getX(p+1),S=a.getX(p+2);i=Eo(this,o,e,n,c,u,h,y,v,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let S=y,M=v;S<M;S+=3){const A=S,T=S+1,P=S+2;i=Eo(this,m,e,n,c,u,h,A,T,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=p,v=p+1,S=p+2;i=Eo(this,o,e,n,c,u,h,y,v,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function G2(r,e,t,n,i,s,o,a){let l;if(e.side===Pn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===hr,a),l===null)return null;yo.copy(a),yo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(yo);return c<t.near||c>t.far?null:{distance:c,point:yo.clone(),object:r}}function Eo(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,cs),r.getVertexPosition(l,us),r.getVertexPosition(c,hs);const u=G2(r,e,t,n,cs,us,hs,So);if(u){i&&(vo.fromBufferAttribute(i,a),xo.fromBufferAttribute(i,l),Mo.fromBufferAttribute(i,c),u.uv=ci.getInterpolation(So,cs,us,hs,vo,xo,Mo,new ht)),s&&(vo.fromBufferAttribute(s,a),xo.fromBufferAttribute(s,l),Mo.fromBufferAttribute(s,c),u.uv1=ci.getInterpolation(So,cs,us,hs,vo,xo,Mo,new ht),u.uv2=u.uv1),o&&(wf.fromBufferAttribute(o,a),Af.fromBufferAttribute(o,l),Rf.fromBufferAttribute(o,c),u.normal=ci.getInterpolation(So,cs,us,hs,wf,Af,Rf,new Z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new Z,materialIndex:0};ci.getNormal(cs,us,hs,h.normal),u.face=h}return u}class Va extends zi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Gr(c,3)),this.setAttribute("normal",new Gr(u,3)),this.setAttribute("uv",new Gr(h,2));function g(_,p,m,y,v,S,M,A,T,P,x){const E=S/T,B=M/P,N=S/2,j=M/2,L=A/2,I=T+1,$=P+1;let O=0,V=0;const z=new Z;for(let R=0;R<$;R++){const D=R*B-j;for(let k=0;k<I;k++){const oe=k*E-N;z[_]=oe*y,z[p]=D*v,z[m]=L,c.push(z.x,z.y,z.z),z[_]=0,z[p]=0,z[m]=A>0?1:-1,u.push(z.x,z.y,z.z),h.push(k/T),h.push(1-R/P),O+=1}}for(let R=0;R<P;R++)for(let D=0;D<T;D++){const k=f+D+I*R,oe=f+D+I*(R+1),te=f+(D+1)+I*(R+1),ie=f+(D+1)+I*R;l.push(k,oe,ie),l.push(oe,te,ie),V+=6}a.addGroup(d,V,x),d+=V,f+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Va(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function _n(r){const e={};for(let t=0;t<r.length;t++){const n=Hs(r[t]);for(const i in n)e[i]=n[i]}return e}function V2(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function np(r){return r.getRenderTarget()===null?r.outputColorSpace:vt.workingColorSpace}const W2={clone:Hs,merge:_n};var X2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,q2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fr extends Ga{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=X2,this.fragmentShader=q2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hs(e.uniforms),this.uniformsGroups=V2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uu extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Ni}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ui extends Uu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$c*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $c*2*Math.atan(Math.tan(Hl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fs=-90,ds=1;class Y2 extends Ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ui(fs,ds,e,t);i.layers=this.layers,this.add(i);const s=new ui(fs,ds,e,t);s.layers=this.layers,this.add(s);const o=new ui(fs,ds,e,t);o.layers=this.layers,this.add(o);const a=new ui(fs,ds,e,t);a.layers=this.layers,this.add(a);const l=new ui(fs,ds,e,t);l.layers=this.layers,this.add(l);const c=new ui(fs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ni)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ip extends qn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Bs,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class j2 extends qr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Ea("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Hr?tn:ei),this.texture=new ip(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Va(5,5,5),s=new fr({name:"CubemapFromEquirect",uniforms:Hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:rr});s.uniforms.tEquirect.value=t;const o=new er(i,s),a=t.minFilter;return t.minFilter===Oa&&(t.minFilter=Qn),new Y2(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const sc=new Z,$2=new Z,K2=new nt;class br{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=sc.subVectors(n,t).cross($2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(sc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||K2.getNormalMatrix(e),i=this.coplanarPoint(sc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new fl,To=new Z;class rp{constructor(e=new br,t=new br,n=new br,i=new br,s=new br,o=new br){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ni){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],v=i[14],S=i[15];if(n[0].setComponents(l-s,f-c,p-d,S-m).normalize(),n[1].setComponents(l+s,f+c,p+d,S+m).normalize(),n[2].setComponents(l+o,f+u,p+g,S+y).normalize(),n[3].setComponents(l-o,f-u,p-g,S-y).normalize(),n[4].setComponents(l-a,f-h,p-_,S-v).normalize(),t===Ni)n[5].setComponents(l+a,f+h,p+_,S+v).normalize();else if(t===rl)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(To.x=i.normal.x>0?e.max.x:e.min.x,To.y=i.normal.y>0?e.max.y:e.min.y,To.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(To)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sp(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Z2(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=r.createBuffer();r.bindBuffer(u,d),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=r.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=r.SHORT;else if(h instanceof Uint32Array)g=r.UNSIGNED_INT;else if(h instanceof Int32Array)g=r.INT;else if(h instanceof Int8Array)g=r.BYTE;else if(h instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,d=u.updateRange;r.bindBuffer(h,c),d.count===-1?r.bufferSubData(h,0,f):(t?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class Nu extends zi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const y=m*f-o;for(let v=0;v<c;v++){const S=v*h-s;g.push(S,-y,0),_.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){const v=y+c*m,S=y+c*(m+1),M=y+1+c*(m+1),A=y+1+c*m;d.push(v,S,A),d.push(S,M,A)}this.setIndex(d),this.setAttribute("position",new Gr(g,3)),this.setAttribute("normal",new Gr(_,3)),this.setAttribute("uv",new Gr(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nu(e.width,e.height,e.widthSegments,e.heightSegments)}}var J2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Q2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,e3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,t3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n3=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,i3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,r3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,s3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,a3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,o3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,l3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,c3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,u3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,h3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,f3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,p3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,m3=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_3=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,g3=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,v3=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,x3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,M3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,S3=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,y3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,T3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w3="gl_FragColor = linearToOutputTexel( gl_FragColor );",A3=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,R3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,C3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,P3=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,L3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,D3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,U3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,O3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,B3=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,z3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,H3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,G3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,V3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,W3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,X3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,q3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Y3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,j3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,$3=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,K3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Z3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,J3=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Q3=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,e4=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t4=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,n4=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,i4=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,r4=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s4=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,a4=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o4=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,l4=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,c4=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,u4=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,h4=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,f4=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,d4=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,p4=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,m4=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_4=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g4=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,v4=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,x4=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,M4=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,S4=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y4=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,E4=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,T4=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,b4=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w4=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A4=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R4=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C4=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P4=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,L4=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,D4=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,U4=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,N4=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,I4=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,O4=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,F4=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B4=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,z4=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k4=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,H4=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,G4=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,V4=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,W4=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,X4=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,q4=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Y4=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,j4=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $4=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,K4=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z4=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J4=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q4=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e5=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t5=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n5=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,i5=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,r5=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,s5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a5=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o5=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l5=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c5=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,u5=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h5=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f5=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d5=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p5=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m5=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_5=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,g5=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v5=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x5=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,M5=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S5=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y5=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E5=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,T5=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b5=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w5=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,A5=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R5=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:J2,alphahash_pars_fragment:Q2,alphamap_fragment:e3,alphamap_pars_fragment:t3,alphatest_fragment:n3,alphatest_pars_fragment:i3,aomap_fragment:r3,aomap_pars_fragment:s3,begin_vertex:a3,beginnormal_vertex:o3,bsdfs:l3,iridescence_fragment:c3,bumpmap_pars_fragment:u3,clipping_planes_fragment:h3,clipping_planes_pars_fragment:f3,clipping_planes_pars_vertex:d3,clipping_planes_vertex:p3,color_fragment:m3,color_pars_fragment:_3,color_pars_vertex:g3,color_vertex:v3,common:x3,cube_uv_reflection_fragment:M3,defaultnormal_vertex:S3,displacementmap_pars_vertex:y3,displacementmap_vertex:E3,emissivemap_fragment:T3,emissivemap_pars_fragment:b3,colorspace_fragment:w3,colorspace_pars_fragment:A3,envmap_fragment:R3,envmap_common_pars_fragment:C3,envmap_pars_fragment:P3,envmap_pars_vertex:L3,envmap_physical_pars_fragment:V3,envmap_vertex:D3,fog_vertex:U3,fog_pars_vertex:N3,fog_fragment:I3,fog_pars_fragment:O3,gradientmap_pars_fragment:F3,lightmap_fragment:B3,lightmap_pars_fragment:z3,lights_lambert_fragment:k3,lights_lambert_pars_fragment:H3,lights_pars_begin:G3,lights_toon_fragment:W3,lights_toon_pars_fragment:X3,lights_phong_fragment:q3,lights_phong_pars_fragment:Y3,lights_physical_fragment:j3,lights_physical_pars_fragment:$3,lights_fragment_begin:K3,lights_fragment_maps:Z3,lights_fragment_end:J3,logdepthbuf_fragment:Q3,logdepthbuf_pars_fragment:e4,logdepthbuf_pars_vertex:t4,logdepthbuf_vertex:n4,map_fragment:i4,map_pars_fragment:r4,map_particle_fragment:s4,map_particle_pars_fragment:a4,metalnessmap_fragment:o4,metalnessmap_pars_fragment:l4,morphcolor_vertex:c4,morphnormal_vertex:u4,morphtarget_pars_vertex:h4,morphtarget_vertex:f4,normal_fragment_begin:d4,normal_fragment_maps:p4,normal_pars_fragment:m4,normal_pars_vertex:_4,normal_vertex:g4,normalmap_pars_fragment:v4,clearcoat_normal_fragment_begin:x4,clearcoat_normal_fragment_maps:M4,clearcoat_pars_fragment:S4,iridescence_pars_fragment:y4,opaque_fragment:E4,packing:T4,premultiplied_alpha_fragment:b4,project_vertex:w4,dithering_fragment:A4,dithering_pars_fragment:R4,roughnessmap_fragment:C4,roughnessmap_pars_fragment:P4,shadowmap_pars_fragment:L4,shadowmap_pars_vertex:D4,shadowmap_vertex:U4,shadowmask_pars_fragment:N4,skinbase_vertex:I4,skinning_pars_vertex:O4,skinning_vertex:F4,skinnormal_vertex:B4,specularmap_fragment:z4,specularmap_pars_fragment:k4,tonemapping_fragment:H4,tonemapping_pars_fragment:G4,transmission_fragment:V4,transmission_pars_fragment:W4,uv_pars_fragment:X4,uv_pars_vertex:q4,uv_vertex:Y4,worldpos_vertex:j4,background_vert:$4,background_frag:K4,backgroundCube_vert:Z4,backgroundCube_frag:J4,cube_vert:Q4,cube_frag:e5,depth_vert:t5,depth_frag:n5,distanceRGBA_vert:i5,distanceRGBA_frag:r5,equirect_vert:s5,equirect_frag:a5,linedashed_vert:o5,linedashed_frag:l5,meshbasic_vert:c5,meshbasic_frag:u5,meshlambert_vert:h5,meshlambert_frag:f5,meshmatcap_vert:d5,meshmatcap_frag:p5,meshnormal_vert:m5,meshnormal_frag:_5,meshphong_vert:g5,meshphong_frag:v5,meshphysical_vert:x5,meshphysical_frag:M5,meshtoon_vert:S5,meshtoon_frag:y5,points_vert:E5,points_frag:T5,shadow_vert:b5,shadow_frag:w5,sprite_vert:A5,sprite_frag:R5},de={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},mi={basic:{uniforms:_n([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:_n([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new gt(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:_n([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:_n([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:_n([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new gt(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:_n([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:_n([de.points,de.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:_n([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:_n([de.common,de.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:_n([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:_n([de.sprite,de.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:_n([de.common,de.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:_n([de.lights,de.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};mi.physical={uniforms:_n([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const bo={r:0,b:0,g:0};function C5(r,e,t,n,i,s,o){const a=new gt(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(p,m){let y=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),y=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ul)?(u===void 0&&(u=new er(new Va(1,1,1),new fr({name:"BackgroundCubeMaterial",uniforms:Hs(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=vt.getTransfer(v.colorSpace)!==wt,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new er(new Nu(2,2),new fr({name:"BackgroundMaterial",uniforms:Hs(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:hr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=vt.getTransfer(v.colorSpace)!==wt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(bo,np(r)),n.buffers.color.setClear(bo.r,bo.g,bo.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function P5(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,u=!1;function h(L,I,$,O,V){let z=!1;if(o){const R=_(O,$,I);c!==R&&(c=R,d(c.object)),z=m(L,O,$,V),z&&y(L,O,$,V)}else{const R=I.wireframe===!0;(c.geometry!==O.id||c.program!==$.id||c.wireframe!==R)&&(c.geometry=O.id,c.program=$.id,c.wireframe=R,z=!0)}V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(z||u)&&(u=!1,P(L,I,$,O),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,I,$){const O=$.wireframe===!0;let V=a[L.id];V===void 0&&(V={},a[L.id]=V);let z=V[I.id];z===void 0&&(z={},V[I.id]=z);let R=z[O];return R===void 0&&(R=p(f()),z[O]=R),R}function p(L){const I=[],$=[],O=[];for(let V=0;V<i;V++)I[V]=0,$[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:$,attributeDivisors:O,object:L,attributes:{},index:null}}function m(L,I,$,O){const V=c.attributes,z=I.attributes;let R=0;const D=$.getAttributes();for(const k in D)if(D[k].location>=0){const te=V[k];let ie=z[k];if(ie===void 0&&(k==="instanceMatrix"&&L.instanceMatrix&&(ie=L.instanceMatrix),k==="instanceColor"&&L.instanceColor&&(ie=L.instanceColor)),te===void 0||te.attribute!==ie||ie&&te.data!==ie.data)return!0;R++}return c.attributesNum!==R||c.index!==O}function y(L,I,$,O){const V={},z=I.attributes;let R=0;const D=$.getAttributes();for(const k in D)if(D[k].location>=0){let te=z[k];te===void 0&&(k==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),k==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const ie={};ie.attribute=te,te&&te.data&&(ie.data=te.data),V[k]=ie,R++}c.attributes=V,c.attributesNum=R,c.index=O}function v(){const L=c.newAttributes;for(let I=0,$=L.length;I<$;I++)L[I]=0}function S(L){M(L,0)}function M(L,I){const $=c.newAttributes,O=c.enabledAttributes,V=c.attributeDivisors;$[L]=1,O[L]===0&&(r.enableVertexAttribArray(L),O[L]=1),V[L]!==I&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,I),V[L]=I)}function A(){const L=c.newAttributes,I=c.enabledAttributes;for(let $=0,O=I.length;$<O;$++)I[$]!==L[$]&&(r.disableVertexAttribArray($),I[$]=0)}function T(L,I,$,O,V,z,R){R===!0?r.vertexAttribIPointer(L,I,$,V,z):r.vertexAttribPointer(L,I,$,O,V,z)}function P(L,I,$,O){if(n.isWebGL2===!1&&(L.isInstancedMesh||O.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const V=O.attributes,z=$.getAttributes(),R=I.defaultAttributeValues;for(const D in z){const k=z[D];if(k.location>=0){let oe=V[D];if(oe===void 0&&(D==="instanceMatrix"&&L.instanceMatrix&&(oe=L.instanceMatrix),D==="instanceColor"&&L.instanceColor&&(oe=L.instanceColor)),oe!==void 0){const te=oe.normalized,ie=oe.itemSize,pe=t.get(oe);if(pe===void 0)continue;const Te=pe.buffer,be=pe.type,we=pe.bytesPerElement,ct=n.isWebGL2===!0&&(be===r.INT||be===r.UNSIGNED_INT||oe.gpuType===z1);if(oe.isInterleavedBufferAttribute){const Ue=oe.data,H=Ue.stride,Xe=oe.offset;if(Ue.isInstancedInterleavedBuffer){for(let _e=0;_e<k.locationSize;_e++)M(k.location+_e,Ue.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let _e=0;_e<k.locationSize;_e++)S(k.location+_e);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let _e=0;_e<k.locationSize;_e++)T(k.location+_e,ie/k.locationSize,be,te,H*we,(Xe+ie/k.locationSize*_e)*we,ct)}else{if(oe.isInstancedBufferAttribute){for(let Ue=0;Ue<k.locationSize;Ue++)M(k.location+Ue,oe.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ue=0;Ue<k.locationSize;Ue++)S(k.location+Ue);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let Ue=0;Ue<k.locationSize;Ue++)T(k.location+Ue,ie/k.locationSize,be,te,ie*we,ie/k.locationSize*Ue*we,ct)}}else if(R!==void 0){const te=R[D];if(te!==void 0)switch(te.length){case 2:r.vertexAttrib2fv(k.location,te);break;case 3:r.vertexAttrib3fv(k.location,te);break;case 4:r.vertexAttrib4fv(k.location,te);break;default:r.vertexAttrib1fv(k.location,te)}}}}A()}function x(){N();for(const L in a){const I=a[L];for(const $ in I){const O=I[$];for(const V in O)g(O[V].object),delete O[V];delete I[$]}delete a[L]}}function E(L){if(a[L.id]===void 0)return;const I=a[L.id];for(const $ in I){const O=I[$];for(const V in O)g(O[V].object),delete O[V];delete I[$]}delete a[L.id]}function B(L){for(const I in a){const $=a[I];if($[L.id]===void 0)continue;const O=$[L.id];for(const V in O)g(O[V].object),delete O[V];delete $[L.id]}}function N(){j(),u=!0,c!==l&&(c=l,d(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:N,resetDefaultState:j,dispose:x,releaseStatesOfGeometry:E,releaseStatesOfProgram:B,initAttributes:v,enableAttribute:S,disableUnusedAttributes:A}}function L5(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,u){r.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,d;if(i)f=r,d="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](s,c,u,h),t.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function D5(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=o||e.has("OES_texture_float"),M=v&&S,A=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:M,maxSamples:A}}function U5(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new br,a=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{const y=s?0:n,v=y*4;let S=m.clippingState||null;l.value=S,S=u(g,f,v,d);for(let M=0;M!==v;++M)S[M]=t[M];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,S=d;v!==_;++v,S+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function N5(r){let e=new WeakMap;function t(o,a){return a===Wc?o.mapping=Bs:a===Xc&&(o.mapping=zs),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Wc||a===Xc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new j2(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class I5 extends Uu{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,Cf=[.125,.215,.35,.446,.526,.582],Cr=20,ac=new I5,Pf=new gt;let oc=null,lc=0,cc=0;const wr=(1+Math.sqrt(5))/2,ps=1/wr,Lf=[new Z(1,1,1),new Z(-1,1,1),new Z(1,1,-1),new Z(-1,1,-1),new Z(0,wr,ps),new Z(0,wr,-ps),new Z(ps,0,wr),new Z(-ps,0,wr),new Z(wr,ps,0),new Z(-wr,ps,0)];class Df{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){oc=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=If(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oc,lc,cc),e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bs||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oc=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qn,minFilter:Qn,generateMipmaps:!1,type:Fa,format:fi,colorSpace:Bi,depthBuffer:!1},i=Uf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=O5(s)),this._blurMaterial=F5(s,e,t)}return i}_compileMaterial(e){const t=new er(this._lodPlanes[0],e);this._renderer.compile(t,ac)}_sceneToCubeUV(e,t,n,i){const a=new ui(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Pf),u.toneMapping=sr,u.autoClear=!1;const d=new Q1({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),g=new er(new Va,d);let _=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,_=!0):(d.color.copy(Pf),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;wo(i,y*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Bs||e.mapping===zs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=If()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new er(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;wo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ac)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Lf[(i-1)%Lf.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new er(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Cr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):Cr;p>Cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Cr}`);const m=[];let y=0;for(let T=0;T<Cr;++T){const P=T/_,x=Math.exp(-P*P/2);m.push(x),T===0?y+=x:T<p&&(y+=2*x)}for(let T=0;T<m.length;T++)m[T]=m[T]/y;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const S=this._sizeLods[i],M=3*S*(i>v-Ms?i-v+Ms:0),A=4*(this._cubeSize-S);wo(t,M,A,3*S,2*S),l.setRenderTarget(t),l.render(h,ac)}}function O5(r){const e=[],t=[],n=[];let i=r;const s=r-Ms+1+Cf.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Ms?l=Cf[o-r+Ms-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*d),v=new Float32Array(p*g*d),S=new Float32Array(m*g*d);for(let A=0;A<d;A++){const T=A%3*2/3-1,P=A>2?0:-1,x=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set(x,_*g*A),v.set(f,p*g*A);const E=[A,A,A,A,A,A];S.set(E,m*g*A)}const M=new zi;M.setAttribute("position",new Ut(y,_)),M.setAttribute("uv",new Ut(v,p)),M.setAttribute("faceIndex",new Ut(S,m)),e.push(M),i>Ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uf(r,e,t){const n=new qr(r,e,t);return n.texture.mapping=ul,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function F5(r,e,t){const n=new Float32Array(Cr),i=new Z(0,1,0);return new fr({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function Nf(){return new fr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function If(){return new fr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function Iu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function B5(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wc||l===Xc,u=l===Bs||l===zs;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Df(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new Df(r));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function z5(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function k5(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let v=0,S=y.length;v<S;v+=3){const M=y[v+0],A=y[v+1],T=y[v+2];f.push(M,A,A,T,T,M)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,S=y.length/3-1;v<S;v+=3){const M=v+0,A=v+1,T=v+2;f.push(M,A,A,T,T,M)}}else return;const p=new(q1(f)?tp:ep)(f,1);p.version=_;const m=s.get(h);m&&e.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function H5(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,d){r.drawElements(s,d,a,f*l),t.update(d,s,1)}function h(f,d,g){if(g===0)return;let _,p;if(i)_=r,p="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[p](s,d,a,f*l,g),t.update(d,s,g)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function G5(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function V5(r,e){return r[0]-e[0]}function W5(r,e){return Math.abs(e[1])-Math.abs(r[1])}function X5(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new qt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0;let _=s.get(u);if(_===void 0||_.count!==g){let L=function(){N.dispose(),s.delete(u),u.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,M=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let P=0;y===!0&&(P=1),v===!0&&(P=2),S===!0&&(P=3);let x=u.attributes.position.count*P,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const B=new Float32Array(x*E*4*g),N=new $1(B,x,E,g);N.type=Qi,N.needsUpdate=!0;const j=P*4;for(let I=0;I<g;I++){const $=M[I],O=A[I],V=T[I],z=x*E*4*I;for(let R=0;R<$.count;R++){const D=R*j;y===!0&&(o.fromBufferAttribute($,R),B[z+D+0]=o.x,B[z+D+1]=o.y,B[z+D+2]=o.z,B[z+D+3]=0),v===!0&&(o.fromBufferAttribute(O,R),B[z+D+4]=o.x,B[z+D+5]=o.y,B[z+D+6]=o.z,B[z+D+7]=0),S===!0&&(o.fromBufferAttribute(V,R),B[z+D+8]=o.x,B[z+D+9]=o.y,B[z+D+10]=o.z,B[z+D+11]=V.itemSize===4?o.w:1)}}_={count:g,texture:N,size:new ht(x,E)},s.set(u,_),u.addEventListener("dispose",L)}let p=0;for(let y=0;y<f.length;y++)p+=f[y];const m=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(r,"morphTargetBaseInfluence",m),h.getUniforms().setValue(r,"morphTargetInfluences",f),h.getUniforms().setValue(r,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}else{const d=f===void 0?0:f.length;let g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let v=0;v<d;v++)g[v]=[v,0];n[u.id]=g}for(let v=0;v<d;v++){const S=g[v];S[0]=v,S[1]=f[v]}g.sort(W5);for(let v=0;v<8;v++)v<d&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(V5);const _=u.morphAttributes.position,p=u.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const S=a[v],M=S[0],A=S[1];M!==Number.MAX_SAFE_INTEGER&&A?(_&&u.getAttribute("morphTarget"+v)!==_[M]&&u.setAttribute("morphTarget"+v,_[M]),p&&u.getAttribute("morphNormal"+v)!==p[M]&&u.setAttribute("morphNormal"+v,p[M]),i[v]=A,m+=A):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),p&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),i[v]=0)}const y=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(r,"morphTargetBaseInfluence",y),h.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function q5(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const ap=new qn,op=new $1,lp=new L2,cp=new ip,Of=[],Ff=[],Bf=new Float32Array(16),zf=new Float32Array(9),kf=new Float32Array(4);function Vs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Of[i];if(s===void 0&&(s=new Float32Array(i),Of[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Yt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function jt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function pl(r,e){let t=Ff[e];t===void 0&&(t=new Int32Array(e),Ff[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Y5(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function j5(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2fv(this.addr,e),jt(t,e)}}function $5(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;r.uniform3fv(this.addr,e),jt(t,e)}}function K5(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4fv(this.addr,e),jt(t,e)}}function Z5(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;kf.set(n),r.uniformMatrix2fv(this.addr,!1,kf),jt(t,n)}}function J5(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;zf.set(n),r.uniformMatrix3fv(this.addr,!1,zf),jt(t,n)}}function Q5(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;Bf.set(n),r.uniformMatrix4fv(this.addr,!1,Bf),jt(t,n)}}function e_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function t_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2iv(this.addr,e),jt(t,e)}}function n_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3iv(this.addr,e),jt(t,e)}}function i_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4iv(this.addr,e),jt(t,e)}}function r_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function s_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2uiv(this.addr,e),jt(t,e)}}function a_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3uiv(this.addr,e),jt(t,e)}}function o_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4uiv(this.addr,e),jt(t,e)}}function l_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||ap,i)}function c_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||lp,i)}function u_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||cp,i)}function h_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||op,i)}function f_(r){switch(r){case 5126:return Y5;case 35664:return j5;case 35665:return $5;case 35666:return K5;case 35674:return Z5;case 35675:return J5;case 35676:return Q5;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return r_;case 36294:return s_;case 36295:return a_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return h_}}function d_(r,e){r.uniform1fv(this.addr,e)}function p_(r,e){const t=Vs(e,this.size,2);r.uniform2fv(this.addr,t)}function m_(r,e){const t=Vs(e,this.size,3);r.uniform3fv(this.addr,t)}function __(r,e){const t=Vs(e,this.size,4);r.uniform4fv(this.addr,t)}function g_(r,e){const t=Vs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function v_(r,e){const t=Vs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function x_(r,e){const t=Vs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function M_(r,e){r.uniform1iv(this.addr,e)}function S_(r,e){r.uniform2iv(this.addr,e)}function y_(r,e){r.uniform3iv(this.addr,e)}function E_(r,e){r.uniform4iv(this.addr,e)}function T_(r,e){r.uniform1uiv(this.addr,e)}function b_(r,e){r.uniform2uiv(this.addr,e)}function w_(r,e){r.uniform3uiv(this.addr,e)}function A_(r,e){r.uniform4uiv(this.addr,e)}function R_(r,e,t){const n=this.cache,i=e.length,s=pl(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),jt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ap,s[o])}function C_(r,e,t){const n=this.cache,i=e.length,s=pl(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),jt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||lp,s[o])}function P_(r,e,t){const n=this.cache,i=e.length,s=pl(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),jt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||cp,s[o])}function L_(r,e,t){const n=this.cache,i=e.length,s=pl(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),jt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||op,s[o])}function D_(r){switch(r){case 5126:return d_;case 35664:return p_;case 35665:return m_;case 35666:return __;case 35674:return g_;case 35675:return v_;case 35676:return x_;case 5124:case 35670:return M_;case 35667:case 35671:return S_;case 35668:case 35672:return y_;case 35669:case 35673:return E_;case 5125:return T_;case 36294:return b_;case 36295:return w_;case 36296:return A_;case 35678:case 36198:case 36298:case 36306:case 35682:return R_;case 35679:case 36299:case 36307:return C_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return L_}}class U_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=f_(t.type)}}class N_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=D_(t.type)}}class I_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const uc=/(\w+)(\])?(\[|\.)?/g;function Hf(r,e){r.seq.push(e),r.map[e.id]=e}function O_(r,e,t){const n=r.name,i=n.length;for(uc.lastIndex=0;;){const s=uc.exec(n),o=uc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Hf(t,c===void 0?new U_(a,r,e):new N_(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new I_(a),Hf(t,h)),t=h}}}class Ho{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);O_(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Gf(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const F_=37297;let B_=0;function z_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function k_(r){const e=vt.getPrimaries(vt.workingColorSpace),t=vt.getPrimaries(r);let n;switch(e===t?n="":e===il&&t===nl?n="LinearDisplayP3ToLinearSRGB":e===nl&&t===il&&(n="LinearSRGBToLinearDisplayP3"),r){case Bi:case hl:return[n,"LinearTransferOETF"];case tn:case Du:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Vf(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+z_(r.getShaderSource(e),o)}else return i}function H_(r,e){const t=k_(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function G_(r,e){let t;switch(e){case Jm:t="Linear";break;case Qm:t="Reinhard";break;case e2:t="OptimizedCineon";break;case t2:t="ACESFilmic";break;case n2:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function V_(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(la).join(`
`)}function W_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function X_(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function la(r){return r!==""}function Wf(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xf(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(r){return r.replace(q_,j_)}const Y_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function j_(r,e){let t=Je[e];if(t===void 0){const n=Y_.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zc(t)}const $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qf(r){return r.replace($_,K_)}function K_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yf(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Z_(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===O1?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===wm?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function J_(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Bs:case zs:e="ENVMAP_TYPE_CUBE";break;case ul:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q_(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function eg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case F1:e="ENVMAP_BLENDING_MULTIPLY";break;case Km:e="ENVMAP_BLENDING_MIX";break;case Zm:e="ENVMAP_BLENDING_ADD";break}return e}function tg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ng(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Z_(t),c=J_(t),u=Q_(t),h=eg(t),f=tg(t),d=t.isWebGL2?"":V_(t),g=W_(s),_=i.createProgram();let p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(la).join(`
`),p.length>0&&(p+=`
`),m=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(la).join(`
`),m.length>0&&(m+=`
`)):(p=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(la).join(`
`),m=[d,Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==sr?"#define TONE_MAPPING":"",t.toneMapping!==sr?Je.tonemapping_pars_fragment:"",t.toneMapping!==sr?G_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,H_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(la).join(`
`)),o=Zc(o),o=Wf(o,t),o=Xf(o,t),a=Zc(a),a=Wf(a,t),a=Xf(a,t),o=qf(o),a=qf(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===hf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+p+o,S=y+m+a,M=Gf(i,i.VERTEX_SHADER,v),A=Gf(i,i.FRAGMENT_SHADER,S);i.attachShader(_,M),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(B){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(_).trim(),j=i.getShaderInfoLog(M).trim(),L=i.getShaderInfoLog(A).trim();let I=!0,$=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(I=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,M,A);else{const O=Vf(i,M,"vertex"),V=Vf(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+O+`
`+V)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(j===""||L==="")&&($=!1);$&&(B.diagnostics={runnable:I,programLog:N,vertexShader:{log:j,prefix:p},fragmentShader:{log:L,prefix:m}})}i.deleteShader(M),i.deleteShader(A),P=new Ho(i,_),x=X_(i,_)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let x;this.getAttributes=function(){return x===void 0&&T(this),x};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(_,F_)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=A,this}let ig=0;class rg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sg(e),t.set(e,n)),n}}class sg{constructor(e){this.id=ig++,this.code=e,this.usedTimes=0}}function ag(r,e,t,n,i,s,o){const a=new Z1,l=new rg,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===0?"uv":`uv${x}`}function p(x,E,B,N,j){const L=N.fog,I=j.geometry,$=x.isMeshStandardMaterial?N.environment:null,O=(x.isMeshStandardMaterial?t:e).get(x.envMap||$),V=O&&O.mapping===ul?O.image.height:null,z=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const R=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,D=R!==void 0?R.length:0;let k=0;I.morphAttributes.position!==void 0&&(k=1),I.morphAttributes.normal!==void 0&&(k=2),I.morphAttributes.color!==void 0&&(k=3);let oe,te,ie,pe;if(z){const Me=mi[z];oe=Me.vertexShader,te=Me.fragmentShader}else oe=x.vertexShader,te=x.fragmentShader,l.update(x),ie=l.getVertexShaderID(x),pe=l.getFragmentShaderID(x);const Te=r.getRenderTarget(),be=j.isInstancedMesh===!0,we=!!x.map,ct=!!x.matcap,Ue=!!O,H=!!x.aoMap,Xe=!!x.lightMap,_e=!!x.bumpMap,Re=!!x.normalMap,Ce=!!x.displacementMap,W=!!x.emissiveMap,He=!!x.metalnessMap,We=!!x.roughnessMap,st=x.anisotropy>0,Ze=x.clearcoat>0,yt=x.iridescence>0,C=x.sheen>0,b=x.transmission>0,G=st&&!!x.anisotropyMap,ae=Ze&&!!x.clearcoatMap,Q=Ze&&!!x.clearcoatNormalMap,ne=Ze&&!!x.clearcoatRoughnessMap,ge=yt&&!!x.iridescenceMap,le=yt&&!!x.iridescenceThicknessMap,me=C&&!!x.sheenColorMap,ve=C&&!!x.sheenRoughnessMap,at=!!x.specularMap,re=!!x.specularColorMap,ot=!!x.specularIntensityMap,Ve=b&&!!x.transmissionMap,Fe=b&&!!x.thicknessMap,De=!!x.gradientMap,ee=!!x.alphaMap,$e=x.alphaTest>0,U=!!x.alphaHash,fe=!!x.extensions,se=!!I.attributes.uv1,J=!!I.attributes.uv2,ue=!!I.attributes.uv3;let Pe=sr;return x.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(Pe=r.toneMapping),{isWebGL2:u,shaderID:z,shaderType:x.type,shaderName:x.name,vertexShader:oe,fragmentShader:te,defines:x.defines,customVertexShaderID:ie,customFragmentShaderID:pe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,instancing:be,instancingColor:be&&j.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:Te===null?r.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Bi,map:we,matcap:ct,envMap:Ue,envMapMode:Ue&&O.mapping,envMapCubeUVHeight:V,aoMap:H,lightMap:Xe,bumpMap:_e,normalMap:Re,displacementMap:f&&Ce,emissiveMap:W,normalMapObjectSpace:Re&&x.normalMapType===_2,normalMapTangentSpace:Re&&x.normalMapType===m2,metalnessMap:He,roughnessMap:We,anisotropy:st,anisotropyMap:G,clearcoat:Ze,clearcoatMap:ae,clearcoatNormalMap:Q,clearcoatRoughnessMap:ne,iridescence:yt,iridescenceMap:ge,iridescenceThicknessMap:le,sheen:C,sheenColorMap:me,sheenRoughnessMap:ve,specularMap:at,specularColorMap:re,specularIntensityMap:ot,transmission:b,transmissionMap:Ve,thicknessMap:Fe,gradientMap:De,opaque:x.transparent===!1&&x.blending===Cs,alphaMap:ee,alphaTest:$e,alphaHash:U,combine:x.combine,mapUv:we&&_(x.map.channel),aoMapUv:H&&_(x.aoMap.channel),lightMapUv:Xe&&_(x.lightMap.channel),bumpMapUv:_e&&_(x.bumpMap.channel),normalMapUv:Re&&_(x.normalMap.channel),displacementMapUv:Ce&&_(x.displacementMap.channel),emissiveMapUv:W&&_(x.emissiveMap.channel),metalnessMapUv:He&&_(x.metalnessMap.channel),roughnessMapUv:We&&_(x.roughnessMap.channel),anisotropyMapUv:G&&_(x.anisotropyMap.channel),clearcoatMapUv:ae&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Q&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&_(x.sheenRoughnessMap.channel),specularMapUv:at&&_(x.specularMap.channel),specularColorMapUv:re&&_(x.specularColorMap.channel),specularIntensityMapUv:ot&&_(x.specularIntensityMap.channel),transmissionMapUv:Ve&&_(x.transmissionMap.channel),thicknessMapUv:Fe&&_(x.thicknessMap.channel),alphaMapUv:ee&&_(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Re||st),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:se,vertexUv2s:J,vertexUv3s:ue,pointsUvs:j.isPoints===!0&&!!I.attributes.uv&&(we||ee),fog:!!L,useFog:x.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:j.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:k,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Pe,useLegacyLights:r._useLegacyLights,decodeVideoTexture:we&&x.map.isVideoTexture===!0&&vt.getTransfer(x.map.colorSpace)===wt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pi,flipSided:x.side===Pn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:fe&&x.extensions.derivatives===!0,extensionFragDepth:fe&&x.extensions.fragDepth===!0,extensionDrawBuffers:fe&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:fe&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function m(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const B in x.defines)E.push(B),E.push(x.defines[B]);return x.isRawShaderMaterial===!1&&(y(E,x),v(E,x),E.push(r.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function y(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function v(x,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),x.push(a.mask)}function S(x){const E=g[x.type];let B;if(E){const N=mi[E];B=W2.clone(N.uniforms)}else B=x.uniforms;return B}function M(x,E){let B;for(let N=0,j=c.length;N<j;N++){const L=c[N];if(L.cacheKey===E){B=L,++B.usedTimes;break}}return B===void 0&&(B=new ng(r,E,x,s),c.push(B)),B}function A(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),x.destroy()}}function T(x){l.remove(x)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:M,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:P}}function og(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function lg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function jf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function $f(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,p){let m=r[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},r[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=p),e++,m}function a(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||lg),n.length>1&&n.sort(f||jf),i.length>1&&i.sort(f||jf)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function cg(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new $f,r.set(n,[o])):i>=s.length?(o=new $f,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function ug(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new gt};break;case"SpotLight":t={position:new Z,direction:new Z,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new gt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":t={color:new gt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[e.id]=t,t}}}function hg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let fg=0;function dg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function pg(r,e){const t=new ug,n=hg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new Z);const s=new Z,o=new Qt,a=new Qt;function l(u,h){let f=0,d=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let _=0,p=0,m=0,y=0,v=0,S=0,M=0,A=0,T=0,P=0,x=0;u.sort(dg);const E=h===!0?Math.PI:1;for(let N=0,j=u.length;N<j;N++){const L=u[N],I=L.color,$=L.intensity,O=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=I.r*$*E,d+=I.g*$*E,g+=I.b*$*E;else if(L.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(L.sh.coefficients[z],$);x++}else if(L.isDirectionalLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){const R=L.shadow,D=n.get(L);D.shadowBias=R.bias,D.shadowNormalBias=R.normalBias,D.shadowRadius=R.radius,D.shadowMapSize=R.mapSize,i.directionalShadow[_]=D,i.directionalShadowMap[_]=V,i.directionalShadowMatrix[_]=L.shadow.matrix,S++}i.directional[_]=z,_++}else if(L.isSpotLight){const z=t.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(I).multiplyScalar($*E),z.distance=O,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,i.spot[m]=z;const R=L.shadow;if(L.map&&(i.spotLightMap[T]=L.map,T++,R.updateMatrices(L),L.castShadow&&P++),i.spotLightMatrix[m]=R.matrix,L.castShadow){const D=n.get(L);D.shadowBias=R.bias,D.shadowNormalBias=R.normalBias,D.shadowRadius=R.radius,D.shadowMapSize=R.mapSize,i.spotShadow[m]=D,i.spotShadowMap[m]=V,A++}m++}else if(L.isRectAreaLight){const z=t.get(L);z.color.copy(I).multiplyScalar($),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),i.rectArea[y]=z,y++}else if(L.isPointLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*E),z.distance=L.distance,z.decay=L.decay,L.castShadow){const R=L.shadow,D=n.get(L);D.shadowBias=R.bias,D.shadowNormalBias=R.normalBias,D.shadowRadius=R.radius,D.shadowMapSize=R.mapSize,D.shadowCameraNear=R.camera.near,D.shadowCameraFar=R.camera.far,i.pointShadow[p]=D,i.pointShadowMap[p]=V,i.pointShadowMatrix[p]=L.shadow.matrix,M++}i.point[p]=z,p++}else if(L.isHemisphereLight){const z=t.get(L);z.skyColor.copy(L.color).multiplyScalar($*E),z.groundColor.copy(L.groundColor).multiplyScalar($*E),i.hemi[v]=z,v++}}y>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;const B=i.hash;(B.directionalLength!==_||B.pointLength!==p||B.spotLength!==m||B.rectAreaLength!==y||B.hemiLength!==v||B.numDirectionalShadows!==S||B.numPointShadows!==M||B.numSpotShadows!==A||B.numSpotMaps!==T||B.numLightProbes!==x)&&(i.directional.length=_,i.spot.length=m,i.rectArea.length=y,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=A+T-P,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=x,B.directionalLength=_,B.pointLength=p,B.spotLength=m,B.rectAreaLength=y,B.hemiLength=v,B.numDirectionalShadows=S,B.numPointShadows=M,B.numSpotShadows=A,B.numSpotMaps=T,B.numLightProbes=x,i.version=fg++)}function c(u,h){let f=0,d=0,g=0,_=0,p=0;const m=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const S=u[y];if(S.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(S.isSpotLight){const M=i.spot[g];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),a.identity(),o.copy(S.matrixWorld),o.premultiply(m),a.extractRotation(o),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const M=i.hemi[p];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function Kf(r,e){const t=new pg(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function mg(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Kf(r,e),t.set(s,[l])):o>=a.length?(l=new Kf(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class _g extends Ga{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=d2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gg extends Ga{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mg(r,e,t){let n=new rp;const i=new ht,s=new ht,o=new qt,a=new _g({depthPacking:p2}),l=new gg,c={},u=t.maxTextureSize,h={[hr]:Pn,[Pn]:hr,[Pi]:Pi},f=new fr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:vg,fragmentShader:xg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new zi;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new er(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=O1;let m=this.type;this.render=function(M,A,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;const P=r.getRenderTarget(),x=r.getActiveCubeFace(),E=r.getActiveMipmapLevel(),B=r.state;B.setBlending(rr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const N=m!==wi&&this.type===wi,j=m===wi&&this.type!==wi;for(let L=0,I=M.length;L<I;L++){const $=M[L],O=$.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const V=O.getFrameExtents();if(i.multiply(V),s.copy(O.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/V.x),i.x=s.x*V.x,O.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/V.y),i.y=s.y*V.y,O.mapSize.y=s.y)),O.map===null||N===!0||j===!0){const R=this.type!==wi?{minFilter:Mn,magFilter:Mn}:{};O.map!==null&&O.map.dispose(),O.map=new qr(i.x,i.y,R),O.map.texture.name=$.name+".shadowMap",O.camera.updateProjectionMatrix()}r.setRenderTarget(O.map),r.clear();const z=O.getViewportCount();for(let R=0;R<z;R++){const D=O.getViewport(R);o.set(s.x*D.x,s.y*D.y,s.x*D.z,s.y*D.w),B.viewport(o),O.updateMatrices($,R),n=O.getFrustum(),S(A,T,O.camera,$,this.type)}O.isPointLightShadow!==!0&&this.type===wi&&y(O,T),O.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(P,x,E)};function y(M,A){const T=e.update(_);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new qr(i.x,i.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(A,null,T,f,_,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(A,null,T,d,_,null)}function v(M,A,T,P){let x=null;const E=T.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(E!==void 0)x=E;else if(x=T.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,N=A.uuid;let j=c[B];j===void 0&&(j={},c[B]=j);let L=j[N];L===void 0&&(L=x.clone(),j[N]=L),x=L}if(x.visible=A.visible,x.wireframe=A.wireframe,P===wi?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:h[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=r.properties.get(x);B.light=T}return x}function S(M,A,T,P,x){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&x===wi)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,M.matrixWorld);const N=e.update(M),j=M.material;if(Array.isArray(j)){const L=N.groups;for(let I=0,$=L.length;I<$;I++){const O=L[I],V=j[O.materialIndex];if(V&&V.visible){const z=v(M,V,P,x);r.renderBufferDirect(T,null,N,z,M,O)}}}else if(j.visible){const L=v(M,j,P,x);r.renderBufferDirect(T,null,N,L,M,null)}}const B=M.children;for(let N=0,j=B.length;N<j;N++)S(B[N],A,T,P,x)}}function Sg(r,e,t){const n=t.isWebGL2;function i(){let U=!1;const fe=new qt;let se=null;const J=new qt(0,0,0,0);return{setMask:function(ue){se!==ue&&!U&&(r.colorMask(ue,ue,ue,ue),se=ue)},setLocked:function(ue){U=ue},setClear:function(ue,Pe,rt,Me,ye){ye===!0&&(ue*=Me,Pe*=Me,rt*=Me),fe.set(ue,Pe,rt,Me),J.equals(fe)===!1&&(r.clearColor(ue,Pe,rt,Me),J.copy(fe))},reset:function(){U=!1,se=null,J.set(-1,0,0,0)}}}function s(){let U=!1,fe=null,se=null,J=null;return{setTest:function(ue){ue?we(r.DEPTH_TEST):ct(r.DEPTH_TEST)},setMask:function(ue){fe!==ue&&!U&&(r.depthMask(ue),fe=ue)},setFunc:function(ue){if(se!==ue){switch(ue){case Vm:r.depthFunc(r.NEVER);break;case Wm:r.depthFunc(r.ALWAYS);break;case Xm:r.depthFunc(r.LESS);break;case el:r.depthFunc(r.LEQUAL);break;case qm:r.depthFunc(r.EQUAL);break;case Ym:r.depthFunc(r.GEQUAL);break;case jm:r.depthFunc(r.GREATER);break;case $m:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}se=ue}},setLocked:function(ue){U=ue},setClear:function(ue){J!==ue&&(r.clearDepth(ue),J=ue)},reset:function(){U=!1,fe=null,se=null,J=null}}}function o(){let U=!1,fe=null,se=null,J=null,ue=null,Pe=null,rt=null,Me=null,ye=null;return{setTest:function(Le){U||(Le?we(r.STENCIL_TEST):ct(r.STENCIL_TEST))},setMask:function(Le){fe!==Le&&!U&&(r.stencilMask(Le),fe=Le)},setFunc:function(Le,ce,Be){(se!==Le||J!==ce||ue!==Be)&&(r.stencilFunc(Le,ce,Be),se=Le,J=ce,ue=Be)},setOp:function(Le,ce,Be){(Pe!==Le||rt!==ce||Me!==Be)&&(r.stencilOp(Le,ce,Be),Pe=Le,rt=ce,Me=Be)},setLocked:function(Le){U=Le},setClear:function(Le){ye!==Le&&(r.clearStencil(Le),ye=Le)},reset:function(){U=!1,fe=null,se=null,J=null,ue=null,Pe=null,rt=null,Me=null,ye=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,S=null,M=null,A=null,T=null,P=null,x=new gt(0,0,0),E=0,B=!1,N=null,j=null,L=null,I=null,$=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,z=0;const R=r.getParameter(r.VERSION);R.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(R)[1]),V=z>=1):R.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),V=z>=2);let D=null,k={};const oe=r.getParameter(r.SCISSOR_BOX),te=r.getParameter(r.VIEWPORT),ie=new qt().fromArray(oe),pe=new qt().fromArray(te);function Te(U,fe,se,J){const ue=new Uint8Array(4),Pe=r.createTexture();r.bindTexture(U,Pe),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let rt=0;rt<se;rt++)n&&(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)?r.texImage3D(fe,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ue):r.texImage2D(fe+rt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ue);return Pe}const be={};be[r.TEXTURE_2D]=Te(r.TEXTURE_2D,r.TEXTURE_2D,1),be[r.TEXTURE_CUBE_MAP]=Te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(be[r.TEXTURE_2D_ARRAY]=Te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),be[r.TEXTURE_3D]=Te(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),we(r.DEPTH_TEST),l.setFunc(el),He(!1),We(Ph),we(r.CULL_FACE),Ce(rr);function we(U){f[U]!==!0&&(r.enable(U),f[U]=!0)}function ct(U){f[U]!==!1&&(r.disable(U),f[U]=!1)}function Ue(U,fe){return d[U]!==fe?(r.bindFramebuffer(U,fe),d[U]=fe,n&&(U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=fe),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=fe)),!0):!1}function H(U,fe){let se=_,J=!1;if(U)if(se=g.get(fe),se===void 0&&(se=[],g.set(fe,se)),U.isWebGLMultipleRenderTargets){const ue=U.texture;if(se.length!==ue.length||se[0]!==r.COLOR_ATTACHMENT0){for(let Pe=0,rt=ue.length;Pe<rt;Pe++)se[Pe]=r.COLOR_ATTACHMENT0+Pe;se.length=ue.length,J=!0}}else se[0]!==r.COLOR_ATTACHMENT0&&(se[0]=r.COLOR_ATTACHMENT0,J=!0);else se[0]!==r.BACK&&(se[0]=r.BACK,J=!0);J&&(t.isWebGL2?r.drawBuffers(se):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(se))}function Xe(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const _e={[Rr]:r.FUNC_ADD,[Rm]:r.FUNC_SUBTRACT,[Cm]:r.FUNC_REVERSE_SUBTRACT};if(n)_e[Nh]=r.MIN,_e[Ih]=r.MAX;else{const U=e.get("EXT_blend_minmax");U!==null&&(_e[Nh]=U.MIN_EXT,_e[Ih]=U.MAX_EXT)}const Re={[Pm]:r.ZERO,[Lm]:r.ONE,[Dm]:r.SRC_COLOR,[Gc]:r.SRC_ALPHA,[Bm]:r.SRC_ALPHA_SATURATE,[Om]:r.DST_COLOR,[Nm]:r.DST_ALPHA,[Um]:r.ONE_MINUS_SRC_COLOR,[Vc]:r.ONE_MINUS_SRC_ALPHA,[Fm]:r.ONE_MINUS_DST_COLOR,[Im]:r.ONE_MINUS_DST_ALPHA,[zm]:r.CONSTANT_COLOR,[km]:r.ONE_MINUS_CONSTANT_COLOR,[Hm]:r.CONSTANT_ALPHA,[Gm]:r.ONE_MINUS_CONSTANT_ALPHA};function Ce(U,fe,se,J,ue,Pe,rt,Me,ye,Le){if(U===rr){m===!0&&(ct(r.BLEND),m=!1);return}if(m===!1&&(we(r.BLEND),m=!0),U!==Am){if(U!==y||Le!==B){if((v!==Rr||A!==Rr)&&(r.blendEquation(r.FUNC_ADD),v=Rr,A=Rr),Le)switch(U){case Cs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lh:r.blendFunc(r.ONE,r.ONE);break;case Dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Cs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}S=null,M=null,T=null,P=null,x.set(0,0,0),E=0,y=U,B=Le}return}ue=ue||fe,Pe=Pe||se,rt=rt||J,(fe!==v||ue!==A)&&(r.blendEquationSeparate(_e[fe],_e[ue]),v=fe,A=ue),(se!==S||J!==M||Pe!==T||rt!==P)&&(r.blendFuncSeparate(Re[se],Re[J],Re[Pe],Re[rt]),S=se,M=J,T=Pe,P=rt),(Me.equals(x)===!1||ye!==E)&&(r.blendColor(Me.r,Me.g,Me.b,ye),x.copy(Me),E=ye),y=U,B=!1}function W(U,fe){U.side===Pi?ct(r.CULL_FACE):we(r.CULL_FACE);let se=U.side===Pn;fe&&(se=!se),He(se),U.blending===Cs&&U.transparent===!1?Ce(rr):Ce(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const J=U.stencilWrite;c.setTest(J),J&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ze(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?we(r.SAMPLE_ALPHA_TO_COVERAGE):ct(r.SAMPLE_ALPHA_TO_COVERAGE)}function He(U){N!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),N=U)}function We(U){U!==Tm?(we(r.CULL_FACE),U!==j&&(U===Ph?r.cullFace(r.BACK):U===bm?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ct(r.CULL_FACE),j=U}function st(U){U!==L&&(V&&r.lineWidth(U),L=U)}function Ze(U,fe,se){U?(we(r.POLYGON_OFFSET_FILL),(I!==fe||$!==se)&&(r.polygonOffset(fe,se),I=fe,$=se)):ct(r.POLYGON_OFFSET_FILL)}function yt(U){U?we(r.SCISSOR_TEST):ct(r.SCISSOR_TEST)}function C(U){U===void 0&&(U=r.TEXTURE0+O-1),D!==U&&(r.activeTexture(U),D=U)}function b(U,fe,se){se===void 0&&(D===null?se=r.TEXTURE0+O-1:se=D);let J=k[se];J===void 0&&(J={type:void 0,texture:void 0},k[se]=J),(J.type!==U||J.texture!==fe)&&(D!==se&&(r.activeTexture(se),D=se),r.bindTexture(U,fe||be[U]),J.type=U,J.texture=fe)}function G(){const U=k[D];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ae(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function at(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ve(U){ie.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),ie.copy(U))}function Fe(U){pe.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),pe.copy(U))}function De(U,fe){let se=h.get(fe);se===void 0&&(se=new WeakMap,h.set(fe,se));let J=se.get(U);J===void 0&&(J=r.getUniformBlockIndex(fe,U.name),se.set(U,J))}function ee(U,fe){const J=h.get(fe).get(U);u.get(fe)!==J&&(r.uniformBlockBinding(fe,J,U.__bindingPointIndex),u.set(fe,J))}function $e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},D=null,k={},d={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,S=null,M=null,A=null,T=null,P=null,x=new gt(0,0,0),E=0,B=!1,N=null,j=null,L=null,I=null,$=null,ie.set(0,0,r.canvas.width,r.canvas.height),pe.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:we,disable:ct,bindFramebuffer:Ue,drawBuffers:H,useProgram:Xe,setBlending:Ce,setMaterial:W,setFlipSided:He,setCullFace:We,setLineWidth:st,setPolygonOffset:Ze,setScissorTest:yt,activeTexture:C,bindTexture:b,unbindTexture:G,compressedTexImage2D:ae,compressedTexImage3D:Q,texImage2D:re,texImage3D:ot,updateUBOMapping:De,uniformBlockBinding:ee,texStorage2D:ve,texStorage3D:at,texSubImage2D:ne,texSubImage3D:ge,compressedTexSubImage2D:le,compressedTexSubImage3D:me,scissor:Ve,viewport:Fe,reset:$e}}function yg(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,b){return m?new OffscreenCanvas(C,b):sl("canvas")}function v(C,b,G,ae){let Q=1;if((C.width>ae||C.height>ae)&&(Q=ae/Math.max(C.width,C.height)),Q<1||b===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const ne=b?Kc:Math.floor,ge=ne(Q*C.width),le=ne(Q*C.height);_===void 0&&(_=y(ge,le));const me=G?y(ge,le):_;return me.width=ge,me.height=le,me.getContext("2d").drawImage(C,0,0,ge,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+ge+"x"+le+")."),me}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function S(C){return ff(C.width)&&ff(C.height)}function M(C){return a?!1:C.wrapS!==hi||C.wrapT!==hi||C.minFilter!==Mn&&C.minFilter!==Qn}function A(C,b){return C.generateMipmaps&&b&&C.minFilter!==Mn&&C.minFilter!==Qn}function T(C){r.generateMipmap(C)}function P(C,b,G,ae,Q=!1){if(a===!1)return b;if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ne=b;if(b===r.RED&&(G===r.FLOAT&&(ne=r.R32F),G===r.HALF_FLOAT&&(ne=r.R16F),G===r.UNSIGNED_BYTE&&(ne=r.R8)),b===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(ne=r.R8UI),G===r.UNSIGNED_SHORT&&(ne=r.R16UI),G===r.UNSIGNED_INT&&(ne=r.R32UI),G===r.BYTE&&(ne=r.R8I),G===r.SHORT&&(ne=r.R16I),G===r.INT&&(ne=r.R32I)),b===r.RG&&(G===r.FLOAT&&(ne=r.RG32F),G===r.HALF_FLOAT&&(ne=r.RG16F),G===r.UNSIGNED_BYTE&&(ne=r.RG8)),b===r.RGBA){const ge=Q?tl:vt.getTransfer(ae);G===r.FLOAT&&(ne=r.RGBA32F),G===r.HALF_FLOAT&&(ne=r.RGBA16F),G===r.UNSIGNED_BYTE&&(ne=ge===wt?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&(ne=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(ne=r.RGB5_A1)}return(ne===r.R16F||ne===r.R32F||ne===r.RG16F||ne===r.RG32F||ne===r.RGBA16F||ne===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function x(C,b,G){return A(C,G)===!0||C.isFramebufferTexture&&C.minFilter!==Mn&&C.minFilter!==Qn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function E(C){return C===Mn||C===Oh||C===Il?r.NEAREST:r.LINEAR}function B(C){const b=C.target;b.removeEventListener("dispose",B),j(b),b.isVideoTexture&&g.delete(b)}function N(C){const b=C.target;b.removeEventListener("dispose",N),I(b)}function j(C){const b=n.get(C);if(b.__webglInit===void 0)return;const G=C.source,ae=p.get(G);if(ae){const Q=ae[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(C),Object.keys(ae).length===0&&p.delete(G)}n.remove(C)}function L(C){const b=n.get(C);r.deleteTexture(b.__webglTexture);const G=C.source,ae=p.get(G);delete ae[b.__cacheKey],o.memory.textures--}function I(C){const b=C.texture,G=n.get(C),ae=n.get(b);if(ae.__webglTexture!==void 0&&(r.deleteTexture(ae.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(G.__webglFramebuffer[Q]))for(let ne=0;ne<G.__webglFramebuffer[Q].length;ne++)r.deleteFramebuffer(G.__webglFramebuffer[Q][ne]);else r.deleteFramebuffer(G.__webglFramebuffer[Q]);G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer[Q])}else{if(Array.isArray(G.__webglFramebuffer))for(let Q=0;Q<G.__webglFramebuffer.length;Q++)r.deleteFramebuffer(G.__webglFramebuffer[Q]);else r.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&r.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let Q=0;Q<G.__webglColorRenderbuffer.length;Q++)G.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(G.__webglColorRenderbuffer[Q]);G.__webglDepthRenderbuffer&&r.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let Q=0,ne=b.length;Q<ne;Q++){const ge=n.get(b[Q]);ge.__webglTexture&&(r.deleteTexture(ge.__webglTexture),o.memory.textures--),n.remove(b[Q])}n.remove(b),n.remove(C)}let $=0;function O(){$=0}function V(){const C=$;return C>=l&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+l),$+=1,C}function z(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function R(C,b){const G=n.get(C);if(C.isVideoTexture&&Ze(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){const ae=C.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we(G,C,b);return}}t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+b)}function D(C,b){const G=n.get(C);if(C.version>0&&G.__version!==C.version){we(G,C,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+b)}function k(C,b){const G=n.get(C);if(C.version>0&&G.__version!==C.version){we(G,C,b);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+b)}function oe(C,b){const G=n.get(C);if(C.version>0&&G.__version!==C.version){ct(G,C,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+b)}const te={[qc]:r.REPEAT,[hi]:r.CLAMP_TO_EDGE,[Yc]:r.MIRRORED_REPEAT},ie={[Mn]:r.NEAREST,[Oh]:r.NEAREST_MIPMAP_NEAREST,[Il]:r.NEAREST_MIPMAP_LINEAR,[Qn]:r.LINEAR,[i2]:r.LINEAR_MIPMAP_NEAREST,[Oa]:r.LINEAR_MIPMAP_LINEAR},pe={[g2]:r.NEVER,[T2]:r.ALWAYS,[v2]:r.LESS,[M2]:r.LEQUAL,[x2]:r.EQUAL,[E2]:r.GEQUAL,[S2]:r.GREATER,[y2]:r.NOTEQUAL};function Te(C,b,G){if(G?(r.texParameteri(C,r.TEXTURE_WRAP_S,te[b.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,te[b.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,te[b.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,ie[b.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,ie[b.minFilter])):(r.texParameteri(C,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(C,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(b.wrapS!==hi||b.wrapT!==hi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(C,r.TEXTURE_MAG_FILTER,E(b.magFilter)),r.texParameteri(C,r.TEXTURE_MIN_FILTER,E(b.minFilter)),b.minFilter!==Mn&&b.minFilter!==Qn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ae=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===Mn||b.minFilter!==Il&&b.minFilter!==Oa||b.type===Qi&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===Fa&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(r.texParameterf(C,ae.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function be(C,b){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",B));const ae=b.source;let Q=p.get(ae);Q===void 0&&(Q={},p.set(ae,Q));const ne=z(b);if(ne!==C.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,G=!0),Q[ne].usedTimes++;const ge=Q[C.__cacheKey];ge!==void 0&&(Q[C.__cacheKey].usedTimes--,ge.usedTimes===0&&L(b)),C.__cacheKey=ne,C.__webglTexture=Q[ne].texture}return G}function we(C,b,G){let ae=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ae=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ae=r.TEXTURE_3D);const Q=be(C,b),ne=b.source;t.bindTexture(ae,C.__webglTexture,r.TEXTURE0+G);const ge=n.get(ne);if(ne.version!==ge.__version||Q===!0){t.activeTexture(r.TEXTURE0+G);const le=vt.getPrimaries(vt.workingColorSpace),me=b.colorSpace===ei?null:vt.getPrimaries(b.colorSpace),ve=b.colorSpace===ei||le===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const at=M(b)&&S(b.image)===!1;let re=v(b.image,at,!1,u);re=yt(b,re);const ot=S(re)||a,Ve=s.convert(b.format,b.colorSpace);let Fe=s.convert(b.type),De=P(b.internalFormat,Ve,Fe,b.colorSpace,b.isVideoTexture);Te(ae,b,ot);let ee;const $e=b.mipmaps,U=a&&b.isVideoTexture!==!0,fe=ge.__version===void 0||Q===!0,se=x(b,re,ot);if(b.isDepthTexture)De=r.DEPTH_COMPONENT,a?b.type===Qi?De=r.DEPTH_COMPONENT32F:b.type===Ji?De=r.DEPTH_COMPONENT24:b.type===zr?De=r.DEPTH24_STENCIL8:De=r.DEPTH_COMPONENT16:b.type===Qi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===kr&&De===r.DEPTH_COMPONENT&&b.type!==Lu&&b.type!==Ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Ji,Fe=s.convert(b.type)),b.format===ks&&De===r.DEPTH_COMPONENT&&(De=r.DEPTH_STENCIL,b.type!==zr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=zr,Fe=s.convert(b.type))),fe&&(U?t.texStorage2D(r.TEXTURE_2D,1,De,re.width,re.height):t.texImage2D(r.TEXTURE_2D,0,De,re.width,re.height,0,Ve,Fe,null));else if(b.isDataTexture)if($e.length>0&&ot){U&&fe&&t.texStorage2D(r.TEXTURE_2D,se,De,$e[0].width,$e[0].height);for(let J=0,ue=$e.length;J<ue;J++)ee=$e[J],U?t.texSubImage2D(r.TEXTURE_2D,J,0,0,ee.width,ee.height,Ve,Fe,ee.data):t.texImage2D(r.TEXTURE_2D,J,De,ee.width,ee.height,0,Ve,Fe,ee.data);b.generateMipmaps=!1}else U?(fe&&t.texStorage2D(r.TEXTURE_2D,se,De,re.width,re.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,re.width,re.height,Ve,Fe,re.data)):t.texImage2D(r.TEXTURE_2D,0,De,re.width,re.height,0,Ve,Fe,re.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){U&&fe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,se,De,$e[0].width,$e[0].height,re.depth);for(let J=0,ue=$e.length;J<ue;J++)ee=$e[J],b.format!==fi?Ve!==null?U?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ee.width,ee.height,re.depth,Ve,ee.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,De,ee.width,ee.height,re.depth,0,ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ee.width,ee.height,re.depth,Ve,Fe,ee.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,De,ee.width,ee.height,re.depth,0,Ve,Fe,ee.data)}else{U&&fe&&t.texStorage2D(r.TEXTURE_2D,se,De,$e[0].width,$e[0].height);for(let J=0,ue=$e.length;J<ue;J++)ee=$e[J],b.format!==fi?Ve!==null?U?t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ee.width,ee.height,Ve,ee.data):t.compressedTexImage2D(r.TEXTURE_2D,J,De,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?t.texSubImage2D(r.TEXTURE_2D,J,0,0,ee.width,ee.height,Ve,Fe,ee.data):t.texImage2D(r.TEXTURE_2D,J,De,ee.width,ee.height,0,Ve,Fe,ee.data)}else if(b.isDataArrayTexture)U?(fe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,se,De,re.width,re.height,re.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Ve,Fe,re.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,De,re.width,re.height,re.depth,0,Ve,Fe,re.data);else if(b.isData3DTexture)U?(fe&&t.texStorage3D(r.TEXTURE_3D,se,De,re.width,re.height,re.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Ve,Fe,re.data)):t.texImage3D(r.TEXTURE_3D,0,De,re.width,re.height,re.depth,0,Ve,Fe,re.data);else if(b.isFramebufferTexture){if(fe)if(U)t.texStorage2D(r.TEXTURE_2D,se,De,re.width,re.height);else{let J=re.width,ue=re.height;for(let Pe=0;Pe<se;Pe++)t.texImage2D(r.TEXTURE_2D,Pe,De,J,ue,0,Ve,Fe,null),J>>=1,ue>>=1}}else if($e.length>0&&ot){U&&fe&&t.texStorage2D(r.TEXTURE_2D,se,De,$e[0].width,$e[0].height);for(let J=0,ue=$e.length;J<ue;J++)ee=$e[J],U?t.texSubImage2D(r.TEXTURE_2D,J,0,0,Ve,Fe,ee):t.texImage2D(r.TEXTURE_2D,J,De,Ve,Fe,ee);b.generateMipmaps=!1}else U?(fe&&t.texStorage2D(r.TEXTURE_2D,se,De,re.width,re.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ve,Fe,re)):t.texImage2D(r.TEXTURE_2D,0,De,Ve,Fe,re);A(b,ot)&&T(ae),ge.__version=ne.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ct(C,b,G){if(b.image.length!==6)return;const ae=be(C,b),Q=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+G);const ne=n.get(Q);if(Q.version!==ne.__version||ae===!0){t.activeTexture(r.TEXTURE0+G);const ge=vt.getPrimaries(vt.workingColorSpace),le=b.colorSpace===ei?null:vt.getPrimaries(b.colorSpace),me=b.colorSpace===ei||ge===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const ve=b.isCompressedTexture||b.image[0].isCompressedTexture,at=b.image[0]&&b.image[0].isDataTexture,re=[];for(let J=0;J<6;J++)!ve&&!at?re[J]=v(b.image[J],!1,!0,c):re[J]=at?b.image[J].image:b.image[J],re[J]=yt(b,re[J]);const ot=re[0],Ve=S(ot)||a,Fe=s.convert(b.format,b.colorSpace),De=s.convert(b.type),ee=P(b.internalFormat,Fe,De,b.colorSpace),$e=a&&b.isVideoTexture!==!0,U=ne.__version===void 0||ae===!0;let fe=x(b,ot,Ve);Te(r.TEXTURE_CUBE_MAP,b,Ve);let se;if(ve){$e&&U&&t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,ee,ot.width,ot.height);for(let J=0;J<6;J++){se=re[J].mipmaps;for(let ue=0;ue<se.length;ue++){const Pe=se[ue];b.format!==fi?Fe!==null?$e?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,Pe.width,Pe.height,Fe,Pe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,ee,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,Pe.width,Pe.height,Fe,De,Pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,ee,Pe.width,Pe.height,0,Fe,De,Pe.data)}}}else{se=b.mipmaps,$e&&U&&(se.length>0&&fe++,t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,ee,re[0].width,re[0].height));for(let J=0;J<6;J++)if(at){$e?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,re[J].width,re[J].height,Fe,De,re[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ee,re[J].width,re[J].height,0,Fe,De,re[J].data);for(let ue=0;ue<se.length;ue++){const rt=se[ue].image[J].image;$e?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,rt.width,rt.height,Fe,De,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,ee,rt.width,rt.height,0,Fe,De,rt.data)}}else{$e?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Fe,De,re[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ee,Fe,De,re[J]);for(let ue=0;ue<se.length;ue++){const Pe=se[ue];$e?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Fe,De,Pe.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,ee,Fe,De,Pe.image[J])}}}A(b,Ve)&&T(r.TEXTURE_CUBE_MAP),ne.__version=Q.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Ue(C,b,G,ae,Q,ne){const ge=s.convert(G.format,G.colorSpace),le=s.convert(G.type),me=P(G.internalFormat,ge,le,G.colorSpace);if(!n.get(b).__hasExternalTextures){const at=Math.max(1,b.width>>ne),re=Math.max(1,b.height>>ne);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,me,at,re,b.depth,0,ge,le,null):t.texImage2D(Q,ne,me,at,re,0,ge,le,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),st(b)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ae,Q,n.get(G).__webglTexture,0,We(b)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ae,Q,n.get(G).__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function H(C,b,G){if(r.bindRenderbuffer(r.RENDERBUFFER,C),b.depthBuffer&&!b.stencilBuffer){let ae=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(G||st(b)){const Q=b.depthTexture;Q&&Q.isDepthTexture&&(Q.type===Qi?ae=r.DEPTH_COMPONENT32F:Q.type===Ji&&(ae=r.DEPTH_COMPONENT24));const ne=We(b);st(b)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,ae,b.width,b.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,ae,b.width,b.height)}else r.renderbufferStorage(r.RENDERBUFFER,ae,b.width,b.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(b.depthBuffer&&b.stencilBuffer){const ae=We(b);G&&st(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,r.DEPTH24_STENCIL8,b.width,b.height):st(b)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,r.DEPTH24_STENCIL8,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const ae=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let Q=0;Q<ae.length;Q++){const ne=ae[Q],ge=s.convert(ne.format,ne.colorSpace),le=s.convert(ne.type),me=P(ne.internalFormat,ge,le,ne.colorSpace),ve=We(b);G&&st(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,me,b.width,b.height):st(b)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,me,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,me,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Xe(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),R(b.depthTexture,0);const ae=n.get(b.depthTexture).__webglTexture,Q=We(b);if(b.depthTexture.format===kr)st(b)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ae,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ae,0);else if(b.depthTexture.format===ks)st(b)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ae,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function _e(C){const b=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Xe(b.__webglFramebuffer,C)}else if(G){b.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ae]),b.__webglDepthbuffer[ae]=r.createRenderbuffer(),H(b.__webglDepthbuffer[ae],C,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),H(b.__webglDepthbuffer,C,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Re(C,b,G){const ae=n.get(C);b!==void 0&&Ue(ae.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&_e(C)}function Ce(C){const b=C.texture,G=n.get(C),ae=n.get(b);C.addEventListener("dispose",N),C.isWebGLMultipleRenderTargets!==!0&&(ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture()),ae.__version=b.version,o.memory.textures++);const Q=C.isWebGLCubeRenderTarget===!0,ne=C.isWebGLMultipleRenderTargets===!0,ge=S(C)||a;if(Q){G.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[le]=[];for(let me=0;me<b.mipmaps.length;me++)G.__webglFramebuffer[le][me]=r.createFramebuffer()}else G.__webglFramebuffer[le]=r.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let le=0;le<b.mipmaps.length;le++)G.__webglFramebuffer[le]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(ne)if(i.drawBuffers){const le=C.texture;for(let me=0,ve=le.length;me<ve;me++){const at=n.get(le[me]);at.__webglTexture===void 0&&(at.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&st(C)===!1){const le=ne?b:[b];G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let me=0;me<le.length;me++){const ve=le[me];G.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[me]);const at=s.convert(ve.format,ve.colorSpace),re=s.convert(ve.type),ot=P(ve.internalFormat,at,re,ve.colorSpace,C.isXRRenderTarget===!0),Ve=We(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,ot,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,G.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),H(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ae.__webglTexture),Te(r.TEXTURE_CUBE_MAP,b,ge);for(let le=0;le<6;le++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)Ue(G.__webglFramebuffer[le][me],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,me);else Ue(G.__webglFramebuffer[le],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);A(b,ge)&&T(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const le=C.texture;for(let me=0,ve=le.length;me<ve;me++){const at=le[me],re=n.get(at);t.bindTexture(r.TEXTURE_2D,re.__webglTexture),Te(r.TEXTURE_2D,at,ge),Ue(G.__webglFramebuffer,C,at,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,0),A(at,ge)&&T(r.TEXTURE_2D)}t.unbindTexture()}else{let le=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?le=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,ae.__webglTexture),Te(le,b,ge),a&&b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)Ue(G.__webglFramebuffer[me],C,b,r.COLOR_ATTACHMENT0,le,me);else Ue(G.__webglFramebuffer,C,b,r.COLOR_ATTACHMENT0,le,0);A(b,ge)&&T(le),t.unbindTexture()}C.depthBuffer&&_e(C)}function W(C){const b=S(C)||a,G=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ae=0,Q=G.length;ae<Q;ae++){const ne=G[ae];if(A(ne,b)){const ge=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,le=n.get(ne).__webglTexture;t.bindTexture(ge,le),T(ge),t.unbindTexture()}}}function He(C){if(a&&C.samples>0&&st(C)===!1){const b=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],G=C.width,ae=C.height;let Q=r.COLOR_BUFFER_BIT;const ne=[],ge=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=n.get(C),me=C.isWebGLMultipleRenderTargets===!0;if(me)for(let ve=0;ve<b.length;ve++)t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ve=0;ve<b.length;ve++){ne.push(r.COLOR_ATTACHMENT0+ve),C.depthBuffer&&ne.push(ge);const at=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(at===!1&&(C.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),me&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,le.__webglColorRenderbuffer[ve]),at===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ge]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ge])),me){const re=n.get(b[ve]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,re,0)}r.blitFramebuffer(0,0,G,ae,0,0,G,ae,Q,r.NEAREST),d&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let ve=0;ve<b.length;ve++){t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,le.__webglColorRenderbuffer[ve]);const at=n.get(b[ve]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,at,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function We(C){return Math.min(h,C.samples)}function st(C){const b=n.get(C);return a&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ze(C){const b=o.render.frame;g.get(C)!==b&&(g.set(C,b),C.update())}function yt(C,b){const G=C.colorSpace,ae=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===jc||G!==Bi&&G!==ei&&(vt.getTransfer(G)===wt?a===!1?e.has("EXT_sRGB")===!0&&ae===fi?(C.format=jc,C.minFilter=Qn,C.generateMipmaps=!1):b=Y1.sRGBToLinear(b):(ae!==fi||Q!==ar)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.setTexture2D=R,this.setTexture2DArray=D,this.setTexture3D=k,this.setTextureCube=oe,this.rebindTextures=Re,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=st}function Eg(r,e,t){const n=t.isWebGL2;function i(s,o=ei){let a;const l=vt.getTransfer(o);if(s===ar)return r.UNSIGNED_BYTE;if(s===k1)return r.UNSIGNED_SHORT_4_4_4_4;if(s===H1)return r.UNSIGNED_SHORT_5_5_5_1;if(s===r2)return r.BYTE;if(s===s2)return r.SHORT;if(s===Lu)return r.UNSIGNED_SHORT;if(s===z1)return r.INT;if(s===Ji)return r.UNSIGNED_INT;if(s===Qi)return r.FLOAT;if(s===Fa)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===a2)return r.ALPHA;if(s===fi)return r.RGBA;if(s===o2)return r.LUMINANCE;if(s===l2)return r.LUMINANCE_ALPHA;if(s===kr)return r.DEPTH_COMPONENT;if(s===ks)return r.DEPTH_STENCIL;if(s===jc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===c2)return r.RED;if(s===G1)return r.RED_INTEGER;if(s===u2)return r.RG;if(s===V1)return r.RG_INTEGER;if(s===W1)return r.RGBA_INTEGER;if(s===Ol||s===Fl||s===Bl||s===zl)if(l===wt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Ol)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Fl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Bl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===zl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Ol)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Fl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Bl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===zl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Fh||s===Bh||s===zh||s===kh)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Fh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Bh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===zh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===kh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===h2)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Hh||s===Gh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Hh)return l===wt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Gh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Vh||s===Wh||s===Xh||s===qh||s===Yh||s===jh||s===$h||s===Kh||s===Zh||s===Jh||s===Qh||s===ef||s===tf||s===nf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Vh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Xh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Yh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===jh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===$h)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Kh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Jh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qh)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ef)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===tf)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nf)return l===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===kl||s===rf||s===sf)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===kl)return l===wt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===f2||s===af||s===of||s===lf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===kl)return a.COMPRESSED_RED_RGTC1_EXT;if(s===af)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===of)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===lf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===zr?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Tg extends ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ao extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bg={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ao,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ao,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ao,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ao;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class wg extends qn{constructor(e,t,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:kr,u!==kr&&u!==ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===kr&&(n=Ji),n===void 0&&u===ks&&(n=zr),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Mn,this.minFilter=l!==void 0?l:Mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ag extends Gs{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=t.getContextAttributes();let p=null,m=null;const y=[],v=[],S=new ui;S.layers.enable(1),S.viewport=new qt;const M=new ui;M.layers.enable(2),M.viewport=new qt;const A=[S,M],T=new Tg;T.layers.enable(1),T.layers.enable(2);let P=null,x=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let k=y[D];return k===void 0&&(k=new hc,y[D]=k),k.getTargetRaySpace()},this.getControllerGrip=function(D){let k=y[D];return k===void 0&&(k=new hc,y[D]=k),k.getGripSpace()},this.getHand=function(D){let k=y[D];return k===void 0&&(k=new hc,y[D]=k),k.getHandSpace()};function E(D){const k=v.indexOf(D.inputSource);if(k===-1)return;const oe=y[k];oe!==void 0&&(oe.update(D.inputSource,D.frame,c||o),oe.dispatchEvent({type:D.type,data:D.inputSource}))}function B(){i.removeEventListener("select",E),i.removeEventListener("selectstart",E),i.removeEventListener("selectend",E),i.removeEventListener("squeeze",E),i.removeEventListener("squeezestart",E),i.removeEventListener("squeezeend",E),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",N);for(let D=0;D<y.length;D++){const k=v[D];k!==null&&(v[D]=null,y[D].disconnect(k))}P=null,x=null,e.setRenderTarget(p),d=null,f=null,h=null,i=null,m=null,R.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){s=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){a=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(D){if(i=D,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",E),i.addEventListener("selectstart",E),i.addEventListener("selectend",E),i.addEventListener("squeeze",E),i.addEventListener("squeezestart",E),i.addEventListener("squeezeend",E),i.addEventListener("end",B),i.addEventListener("inputsourceschange",N),_.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const k={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,k),i.updateRenderState({baseLayer:d}),m=new qr(d.framebufferWidth,d.framebufferHeight,{format:fi,type:ar,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let k=null,oe=null,te=null;_.depth&&(te=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=_.stencil?ks:kr,oe=_.stencil?zr:Ji);const ie={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(ie),i.updateRenderState({layers:[f]}),m=new qr(f.textureWidth,f.textureHeight,{format:fi,type:ar,depthTexture:new wg(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const pe=e.properties.get(m);pe.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),R.setContext(i),R.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function N(D){for(let k=0;k<D.removed.length;k++){const oe=D.removed[k],te=v.indexOf(oe);te>=0&&(v[te]=null,y[te].disconnect(oe))}for(let k=0;k<D.added.length;k++){const oe=D.added[k];let te=v.indexOf(oe);if(te===-1){for(let pe=0;pe<y.length;pe++)if(pe>=v.length){v.push(oe),te=pe;break}else if(v[pe]===null){v[pe]=oe,te=pe;break}if(te===-1)break}const ie=y[te];ie&&ie.connect(oe)}}const j=new Z,L=new Z;function I(D,k,oe){j.setFromMatrixPosition(k.matrixWorld),L.setFromMatrixPosition(oe.matrixWorld);const te=j.distanceTo(L),ie=k.projectionMatrix.elements,pe=oe.projectionMatrix.elements,Te=ie[14]/(ie[10]-1),be=ie[14]/(ie[10]+1),we=(ie[9]+1)/ie[5],ct=(ie[9]-1)/ie[5],Ue=(ie[8]-1)/ie[0],H=(pe[8]+1)/pe[0],Xe=Te*Ue,_e=Te*H,Re=te/(-Ue+H),Ce=Re*-Ue;k.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Ce),D.translateZ(Re),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const W=Te+Re,He=be+Re,We=Xe-Ce,st=_e+(te-Ce),Ze=we*be/He*W,yt=ct*be/He*W;D.projectionMatrix.makePerspective(We,st,Ze,yt,W,He),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function $(D,k){k===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(k.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(i===null)return;T.near=M.near=S.near=D.near,T.far=M.far=S.far=D.far,(P!==T.near||x!==T.far)&&(i.updateRenderState({depthNear:T.near,depthFar:T.far}),P=T.near,x=T.far);const k=D.parent,oe=T.cameras;$(T,k);for(let te=0;te<oe.length;te++)$(oe[te],k);oe.length===2?I(T,S,M):T.projectionMatrix.copy(S.projectionMatrix),O(D,T,k)};function O(D,k,oe){oe===null?D.matrix.copy(k.matrixWorld):(D.matrix.copy(oe.matrixWorld),D.matrix.invert(),D.matrix.multiply(k.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(k.projectionMatrix),D.projectionMatrixInverse.copy(k.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=$c*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(D){l=D,f!==null&&(f.fixedFoveation=D),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=D)};let V=null;function z(D,k){if(u=k.getViewerPose(c||o),g=k,u!==null){const oe=u.views;d!==null&&(e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m));let te=!1;oe.length!==T.cameras.length&&(T.cameras.length=0,te=!0);for(let ie=0;ie<oe.length;ie++){const pe=oe[ie];let Te=null;if(d!==null)Te=d.getViewport(pe);else{const we=h.getViewSubImage(f,pe);Te=we.viewport,ie===0&&(e.setRenderTargetTextures(m,we.colorTexture,f.ignoreDepthValues?void 0:we.depthStencilTexture),e.setRenderTarget(m))}let be=A[ie];be===void 0&&(be=new ui,be.layers.enable(ie),be.viewport=new qt,A[ie]=be),be.matrix.fromArray(pe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(pe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Te.x,Te.y,Te.width,Te.height),ie===0&&(T.matrix.copy(be.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),te===!0&&T.cameras.push(be)}}for(let oe=0;oe<y.length;oe++){const te=v[oe],ie=y[oe];te!==null&&ie!==void 0&&ie.update(te,k,c||o)}V&&V(D,k),k.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:k}),g=null}const R=new sp;R.setAnimationLoop(z),this.setAnimationLoop=function(D){V=D},this.dispose=function(){}}}function Rg(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,np(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,v,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,y,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Pn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Pn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Pn&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Cg(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){const S=v.program;n.uniformBlockBinding(y,S)}function c(y,v){let S=i[y.id];S===void 0&&(g(y),S=u(y),i[y.id]=S,y.addEventListener("dispose",p));const M=v.program;n.updateUBOMapping(y,M);const A=e.render.frame;s[y.id]!==A&&(f(y),s[y.id]=A)}function u(y){const v=h();y.__bindingPointIndex=v;const S=r.createBuffer(),M=y.__size,A=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,M,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,S),S}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],S=y.uniforms,M=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let A=0,T=S.length;A<T;A++){const P=S[A];if(d(P,A,M)===!0){const x=P.__offset,E=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let N=0;N<E.length;N++){const j=E[N],L=_(j);typeof j=="number"?(P.__data[0]=j,r.bufferSubData(r.UNIFORM_BUFFER,x+B,P.__data)):j.isMatrix3?(P.__data[0]=j.elements[0],P.__data[1]=j.elements[1],P.__data[2]=j.elements[2],P.__data[3]=j.elements[0],P.__data[4]=j.elements[3],P.__data[5]=j.elements[4],P.__data[6]=j.elements[5],P.__data[7]=j.elements[0],P.__data[8]=j.elements[6],P.__data[9]=j.elements[7],P.__data[10]=j.elements[8],P.__data[11]=j.elements[0]):(j.toArray(P.__data,B),B+=L.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,x,P.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,v,S){const M=y.value;if(S[v]===void 0){if(typeof M=="number")S[v]=M;else{const A=Array.isArray(M)?M:[M],T=[];for(let P=0;P<A.length;P++)T.push(A[P].clone());S[v]=T}return!0}else if(typeof M=="number"){if(S[v]!==M)return S[v]=M,!0}else{const A=Array.isArray(S[v])?S[v]:[S[v]],T=Array.isArray(M)?M:[M];for(let P=0;P<A.length;P++){const x=A[P];if(x.equals(T[P])===!1)return x.copy(T[P]),!0}}return!1}function g(y){const v=y.uniforms;let S=0;const M=16;let A=0;for(let T=0,P=v.length;T<P;T++){const x=v[T],E={boundary:0,storage:0},B=Array.isArray(x.value)?x.value:[x.value];for(let N=0,j=B.length;N<j;N++){const L=B[N],I=_(L);E.boundary+=I.boundary,E.storage+=I.storage}if(x.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=S,T>0){A=S%M;const N=M-A;A!==0&&N-E.boundary<0&&(S+=M-A,x.__offset=S)}S+=E.storage}return A=S%M,A>0&&(S+=M-A),y.__size=S,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class up{constructor(e={}){const{canvas:t=w2(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=tn,this._useLegacyLights=!1,this.toneMapping=sr,this.toneMappingExposure=1;const v=this;let S=!1,M=0,A=0,T=null,P=-1,x=null;const E=new qt,B=new qt;let N=null;const j=new gt(0);let L=0,I=t.width,$=t.height,O=1,V=null,z=null;const R=new qt(0,0,I,$),D=new qt(0,0,I,$);let k=!1;const oe=new rp;let te=!1,ie=!1,pe=null;const Te=new Qt,be=new ht,we=new Z,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ue(){return T===null?O:1}let H=n;function Xe(w,F){for(let q=0;q<w.length;q++){const X=w[q],Y=t.getContext(X,F);if(Y!==null)return Y}return null}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pu}`),t.addEventListener("webglcontextlost",$e,!1),t.addEventListener("webglcontextrestored",U,!1),t.addEventListener("webglcontextcreationerror",fe,!1),H===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),H=Xe(F,w),H===null)throw Xe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let _e,Re,Ce,W,He,We,st,Ze,yt,C,b,G,ae,Q,ne,ge,le,me,ve,at,re,ot,Ve,Fe;function De(){_e=new z5(H),Re=new D5(H,_e,e),_e.init(Re),ot=new Eg(H,_e,Re),Ce=new Sg(H,_e,Re),W=new G5(H),He=new og,We=new yg(H,_e,Ce,He,Re,ot,W),st=new N5(v),Ze=new B5(v),yt=new Z2(H,Re),Ve=new P5(H,_e,yt,Re),C=new k5(H,yt,W,Ve),b=new q5(H,C,yt,W),ve=new X5(H,Re,We),ge=new U5(He),G=new ag(v,st,Ze,_e,Re,Ve,ge),ae=new Rg(v,He),Q=new cg,ne=new mg(_e,Re),me=new C5(v,st,Ze,Ce,b,f,l),le=new Mg(v,b,Re),Fe=new Cg(H,W,Re,Ce),at=new L5(H,_e,W,Re),re=new H5(H,_e,W,Re),W.programs=G.programs,v.capabilities=Re,v.extensions=_e,v.properties=He,v.renderLists=Q,v.shadowMap=le,v.state=Ce,v.info=W}De();const ee=new Ag(v,H);this.xr=ee,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const w=_e.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=_e.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(w){w!==void 0&&(O=w,this.setSize(I,$,!1))},this.getSize=function(w){return w.set(I,$)},this.setSize=function(w,F,q=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=w,$=F,t.width=Math.floor(w*O),t.height=Math.floor(F*O),q===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(I*O,$*O).floor()},this.setDrawingBufferSize=function(w,F,q){I=w,$=F,O=q,t.width=Math.floor(w*q),t.height=Math.floor(F*q),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(E)},this.getViewport=function(w){return w.copy(R)},this.setViewport=function(w,F,q,X){w.isVector4?R.set(w.x,w.y,w.z,w.w):R.set(w,F,q,X),Ce.viewport(E.copy(R).multiplyScalar(O).floor())},this.getScissor=function(w){return w.copy(D)},this.setScissor=function(w,F,q,X){w.isVector4?D.set(w.x,w.y,w.z,w.w):D.set(w,F,q,X),Ce.scissor(B.copy(D).multiplyScalar(O).floor())},this.getScissorTest=function(){return k},this.setScissorTest=function(w){Ce.setScissorTest(k=w)},this.setOpaqueSort=function(w){V=w},this.setTransparentSort=function(w){z=w},this.getClearColor=function(w){return w.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(w=!0,F=!0,q=!0){let X=0;if(w){let Y=!1;if(T!==null){const he=T.texture.format;Y=he===W1||he===V1||he===G1}if(Y){const he=T.texture.type,Se=he===ar||he===Ji||he===Lu||he===zr||he===k1||he===H1,ze=me.getClearColor(),Ee=me.getClearAlpha(),Ae=ze.r,ke=ze.g,Ye=ze.b;Se?(d[0]=Ae,d[1]=ke,d[2]=Ye,d[3]=Ee,H.clearBufferuiv(H.COLOR,0,d)):(g[0]=Ae,g[1]=ke,g[2]=Ye,g[3]=Ee,H.clearBufferiv(H.COLOR,0,g))}else X|=H.COLOR_BUFFER_BIT}F&&(X|=H.DEPTH_BUFFER_BIT),q&&(X|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$e,!1),t.removeEventListener("webglcontextrestored",U,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),Q.dispose(),ne.dispose(),He.dispose(),st.dispose(),Ze.dispose(),b.dispose(),Ve.dispose(),Fe.dispose(),G.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",ye),ee.removeEventListener("sessionend",Le),pe&&(pe.dispose(),pe=null),ce.stop()};function $e(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=W.autoReset,F=le.enabled,q=le.autoUpdate,X=le.needsUpdate,Y=le.type;De(),W.autoReset=w,le.enabled=F,le.autoUpdate=q,le.needsUpdate=X,le.type=Y}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function se(w){const F=w.target;F.removeEventListener("dispose",se),J(F)}function J(w){ue(w),He.remove(w)}function ue(w){const F=He.get(w).programs;F!==void 0&&(F.forEach(function(q){G.releaseProgram(q)}),w.isShaderMaterial&&G.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,q,X,Y,he){F===null&&(F=ct);const Se=Y.isMesh&&Y.matrixWorld.determinant()<0,ze=Tt(w,F,q,X,Y);Ce.setMaterial(X,Se);let Ee=q.index,Ae=1;if(X.wireframe===!0){if(Ee=C.getWireframeAttribute(q),Ee===void 0)return;Ae=2}const ke=q.drawRange,Ye=q.attributes.position;let At=ke.start*Ae,Vt=(ke.start+ke.count)*Ae;he!==null&&(At=Math.max(At,he.start*Ae),Vt=Math.min(Vt,(he.start+he.count)*Ae)),Ee!==null?(At=Math.max(At,0),Vt=Math.min(Vt,Ee.count)):Ye!=null&&(At=Math.max(At,0),Vt=Math.min(Vt,Ye.count));const pt=Vt-At;if(pt<0||pt===1/0)return;Ve.setup(Y,X,ze,q,Ee);let fn,xt=at;if(Ee!==null&&(fn=yt.get(Ee),xt=re,xt.setIndex(fn)),Y.isMesh)X.wireframe===!0?(Ce.setLineWidth(X.wireframeLinewidth*Ue()),xt.setMode(H.LINES)):xt.setMode(H.TRIANGLES);else if(Y.isLine){let je=X.linewidth;je===void 0&&(je=1),Ce.setLineWidth(je*Ue()),Y.isLineSegments?xt.setMode(H.LINES):Y.isLineLoop?xt.setMode(H.LINE_LOOP):xt.setMode(H.LINE_STRIP)}else Y.isPoints?xt.setMode(H.POINTS):Y.isSprite&&xt.setMode(H.TRIANGLES);if(Y.isInstancedMesh)xt.renderInstances(At,pt,Y.count);else if(q.isInstancedBufferGeometry){const je=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ml=Math.min(q.instanceCount,je);xt.renderInstances(At,pt,ml)}else xt.render(At,pt)};function Pe(w,F,q){w.transparent===!0&&w.side===Pi&&w.forceSinglePass===!1?(w.side=Pn,w.needsUpdate=!0,Et(w,F,q),w.side=hr,w.needsUpdate=!0,Et(w,F,q),w.side=Pi):Et(w,F,q)}this.compile=function(w,F,q=null){q===null&&(q=w),p=ne.get(q),p.init(),y.push(p),q.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),w!==q&&w.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights(v._useLegacyLights);const X=new Set;return w.traverse(function(Y){const he=Y.material;if(he)if(Array.isArray(he))for(let Se=0;Se<he.length;Se++){const ze=he[Se];Pe(ze,q,Y),X.add(ze)}else Pe(he,q,Y),X.add(he)}),y.pop(),p=null,X},this.compileAsync=function(w,F,q=null){const X=this.compile(w,F,q);return new Promise(Y=>{function he(){if(X.forEach(function(Se){He.get(Se).currentProgram.isReady()&&X.delete(Se)}),X.size===0){Y(w);return}setTimeout(he,10)}_e.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let rt=null;function Me(w){rt&&rt(w)}function ye(){ce.stop()}function Le(){ce.start()}const ce=new sp;ce.setAnimationLoop(Me),typeof self<"u"&&ce.setContext(self),this.setAnimationLoop=function(w){rt=w,ee.setAnimationLoop(w),w===null?ce.stop():ce.start()},ee.addEventListener("sessionstart",ye),ee.addEventListener("sessionend",Le),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(F),F=ee.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,F,T),p=ne.get(w,y.length),p.init(),y.push(p),Te.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),oe.setFromProjectionMatrix(Te),ie=this.localClippingEnabled,te=ge.init(this.clippingPlanes,ie),_=Q.get(w,m.length),_.init(),m.push(_),Be(w,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(V,z),this.info.render.frame++,te===!0&&ge.beginShadows();const q=p.state.shadowsArray;if(le.render(q,w,F),te===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),me.render(_,w),p.setupLights(v._useLegacyLights),F.isArrayCamera){const X=F.cameras;for(let Y=0,he=X.length;Y<he;Y++){const Se=X[Y];Ie(_,w,Se,Se.viewport)}}else Ie(_,w,F);T!==null&&(We.updateMultisampleRenderTarget(T),We.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(v,w,F),Ve.resetDefaultState(),P=-1,x=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Be(w,F,q,X){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||oe.intersectsSprite(w)){X&&we.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Te);const Se=b.update(w),ze=w.material;ze.visible&&_.push(w,Se,ze,q,we.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||oe.intersectsObject(w))){const Se=b.update(w),ze=w.material;if(X&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),we.copy(w.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),we.copy(Se.boundingSphere.center)),we.applyMatrix4(w.matrixWorld).applyMatrix4(Te)),Array.isArray(ze)){const Ee=Se.groups;for(let Ae=0,ke=Ee.length;Ae<ke;Ae++){const Ye=Ee[Ae],At=ze[Ye.materialIndex];At&&At.visible&&_.push(w,Se,At,q,we.z,Ye)}}else ze.visible&&_.push(w,Se,ze,q,we.z,null)}}const he=w.children;for(let Se=0,ze=he.length;Se<ze;Se++)Be(he[Se],F,q,X)}function Ie(w,F,q,X){const Y=w.opaque,he=w.transmissive,Se=w.transparent;p.setupLightsView(q),te===!0&&ge.setGlobalState(v.clippingPlanes,q),he.length>0&&qe(Y,he,F,q),X&&Ce.viewport(E.copy(X)),Y.length>0&&Ct(Y,F,q),he.length>0&&Ct(he,F,q),Se.length>0&&Ct(Se,F,q),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function qe(w,F,q,X){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const he=Re.isWebGL2;pe===null&&(pe=new qr(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?Fa:ar,minFilter:Oa,samples:he?4:0})),v.getDrawingBufferSize(be),he?pe.setSize(be.x,be.y):pe.setSize(Kc(be.x),Kc(be.y));const Se=v.getRenderTarget();v.setRenderTarget(pe),v.getClearColor(j),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const ze=v.toneMapping;v.toneMapping=sr,Ct(w,q,X),We.updateMultisampleRenderTarget(pe),We.updateRenderTargetMipmap(pe);let Ee=!1;for(let Ae=0,ke=F.length;Ae<ke;Ae++){const Ye=F[Ae],At=Ye.object,Vt=Ye.geometry,pt=Ye.material,fn=Ye.group;if(pt.side===Pi&&At.layers.test(X.layers)){const xt=pt.side;pt.side=Pn,pt.needsUpdate=!0,et(At,q,X,Vt,pt,fn),pt.side=xt,pt.needsUpdate=!0,Ee=!0}}Ee===!0&&(We.updateMultisampleRenderTarget(pe),We.updateRenderTargetMipmap(pe)),v.setRenderTarget(Se),v.setClearColor(j,L),v.toneMapping=ze}function Ct(w,F,q){const X=F.isScene===!0?F.overrideMaterial:null;for(let Y=0,he=w.length;Y<he;Y++){const Se=w[Y],ze=Se.object,Ee=Se.geometry,Ae=X===null?Se.material:X,ke=Se.group;ze.layers.test(q.layers)&&et(ze,F,q,Ee,Ae,ke)}}function et(w,F,q,X,Y,he){w.onBeforeRender(v,F,q,X,Y,he),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Y.onBeforeRender(v,F,q,X,w,he),Y.transparent===!0&&Y.side===Pi&&Y.forceSinglePass===!1?(Y.side=Pn,Y.needsUpdate=!0,v.renderBufferDirect(q,F,X,Y,w,he),Y.side=hr,Y.needsUpdate=!0,v.renderBufferDirect(q,F,X,Y,w,he),Y.side=Pi):v.renderBufferDirect(q,F,X,Y,w,he),w.onAfterRender(v,F,q,X,Y,he)}function Et(w,F,q){F.isScene!==!0&&(F=ct);const X=He.get(w),Y=p.state.lights,he=p.state.shadowsArray,Se=Y.state.version,ze=G.getParameters(w,Y.state,he,F,q),Ee=G.getProgramCacheKey(ze);let Ae=X.programs;X.environment=w.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(w.isMeshStandardMaterial?Ze:st).get(w.envMap||X.environment),Ae===void 0&&(w.addEventListener("dispose",se),Ae=new Map,X.programs=Ae);let ke=Ae.get(Ee);if(ke!==void 0){if(X.currentProgram===ke&&X.lightsStateVersion===Se)return bt(w,ze),ke}else ze.uniforms=G.getUniforms(w),w.onBuild(q,ze,v),w.onBeforeCompile(ze,v),ke=G.acquireProgram(ze,Ee),Ae.set(Ee,ke),X.uniforms=ze.uniforms;const Ye=X.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ye.clippingPlanes=ge.uniform),bt(w,ze),X.needsLights=Un(w),X.lightsStateVersion=Se,X.needsLights&&(Ye.ambientLightColor.value=Y.state.ambient,Ye.lightProbe.value=Y.state.probe,Ye.directionalLights.value=Y.state.directional,Ye.directionalLightShadows.value=Y.state.directionalShadow,Ye.spotLights.value=Y.state.spot,Ye.spotLightShadows.value=Y.state.spotShadow,Ye.rectAreaLights.value=Y.state.rectArea,Ye.ltc_1.value=Y.state.rectAreaLTC1,Ye.ltc_2.value=Y.state.rectAreaLTC2,Ye.pointLights.value=Y.state.point,Ye.pointLightShadows.value=Y.state.pointShadow,Ye.hemisphereLights.value=Y.state.hemi,Ye.directionalShadowMap.value=Y.state.directionalShadowMap,Ye.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ye.spotShadowMap.value=Y.state.spotShadowMap,Ye.spotLightMatrix.value=Y.state.spotLightMatrix,Ye.spotLightMap.value=Y.state.spotLightMap,Ye.pointShadowMap.value=Y.state.pointShadowMap,Ye.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.currentProgram=ke,X.uniformsList=null,ke}function Gt(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Ho.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function bt(w,F){const q=He.get(w);q.outputColorSpace=F.outputColorSpace,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Tt(w,F,q,X,Y){F.isScene!==!0&&(F=ct),We.resetTextureUnits();const he=F.fog,Se=X.isMeshStandardMaterial?F.environment:null,ze=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Bi,Ee=(X.isMeshStandardMaterial?Ze:st).get(X.envMap||Se),Ae=X.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ke=!!q.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ye=!!q.morphAttributes.position,At=!!q.morphAttributes.normal,Vt=!!q.morphAttributes.color;let pt=sr;X.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(pt=v.toneMapping);const fn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,xt=fn!==void 0?fn.length:0,je=He.get(X),ml=p.state.lights;if(te===!0&&(ie===!0||w!==x)){const Nn=w===x&&X.id===P;ge.setState(X,w,Nn)}let Bt=!1;X.version===je.__version?(je.needsLights&&je.lightsStateVersion!==ml.state.version||je.outputColorSpace!==ze||Y.isInstancedMesh&&je.instancing===!1||!Y.isInstancedMesh&&je.instancing===!0||Y.isSkinnedMesh&&je.skinning===!1||!Y.isSkinnedMesh&&je.skinning===!0||Y.isInstancedMesh&&je.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&je.instancingColor===!1&&Y.instanceColor!==null||je.envMap!==Ee||X.fog===!0&&je.fog!==he||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ge.numPlanes||je.numIntersection!==ge.numIntersection)||je.vertexAlphas!==Ae||je.vertexTangents!==ke||je.morphTargets!==Ye||je.morphNormals!==At||je.morphColors!==Vt||je.toneMapping!==pt||Re.isWebGL2===!0&&je.morphTargetsCount!==xt)&&(Bt=!0):(Bt=!0,je.__version=X.version);let pr=je.currentProgram;Bt===!0&&(pr=Et(X,F,Y));let Fu=!1,Ws=!1,_l=!1;const dn=pr.getUniforms(),mr=je.uniforms;if(Ce.useProgram(pr.program)&&(Fu=!0,Ws=!0,_l=!0),X.id!==P&&(P=X.id,Ws=!0),Fu||x!==w){dn.setValue(H,"projectionMatrix",w.projectionMatrix),dn.setValue(H,"viewMatrix",w.matrixWorldInverse);const Nn=dn.map.cameraPosition;Nn!==void 0&&Nn.setValue(H,we.setFromMatrixPosition(w.matrixWorld)),Re.logarithmicDepthBuffer&&dn.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&dn.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),x!==w&&(x=w,Ws=!0,_l=!0)}if(Y.isSkinnedMesh){dn.setOptional(H,Y,"bindMatrix"),dn.setOptional(H,Y,"bindMatrixInverse");const Nn=Y.skeleton;Nn&&(Re.floatVertexTextures?(Nn.boneTexture===null&&Nn.computeBoneTexture(),dn.setValue(H,"boneTexture",Nn.boneTexture,We),dn.setValue(H,"boneTextureSize",Nn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const gl=q.morphAttributes;if((gl.position!==void 0||gl.normal!==void 0||gl.color!==void 0&&Re.isWebGL2===!0)&&ve.update(Y,q,pr),(Ws||je.receiveShadow!==Y.receiveShadow)&&(je.receiveShadow=Y.receiveShadow,dn.setValue(H,"receiveShadow",Y.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(mr.envMap.value=Ee,mr.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Ws&&(dn.setValue(H,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&dt(mr,_l),he&&X.fog===!0&&ae.refreshFogUniforms(mr,he),ae.refreshMaterialUniforms(mr,X,O,$,pe),Ho.upload(H,Gt(je),mr,We)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ho.upload(H,Gt(je),mr,We),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&dn.setValue(H,"center",Y.center),dn.setValue(H,"modelViewMatrix",Y.modelViewMatrix),dn.setValue(H,"normalMatrix",Y.normalMatrix),dn.setValue(H,"modelMatrix",Y.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Nn=X.uniformsGroups;for(let vl=0,xp=Nn.length;vl<xp;vl++)if(Re.isWebGL2){const Bu=Nn[vl];Fe.update(Bu,pr),Fe.bind(Bu,pr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return pr}function dt(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Un(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,F,q){He.get(w.texture).__webglTexture=F,He.get(w.depthTexture).__webglTexture=q;const X=He.get(w);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=q===void 0,X.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,F){const q=He.get(w);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,q=0){T=w,M=F,A=q;let X=!0,Y=null,he=!1,Se=!1;if(w){const Ee=He.get(w);Ee.__useDefaultFramebuffer!==void 0?(Ce.bindFramebuffer(H.FRAMEBUFFER,null),X=!1):Ee.__webglFramebuffer===void 0?We.setupRenderTarget(w):Ee.__hasExternalTextures&&We.rebindTextures(w,He.get(w.texture).__webglTexture,He.get(w.depthTexture).__webglTexture);const Ae=w.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(Se=!0);const ke=He.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?Y=ke[F][q]:Y=ke[F],he=!0):Re.isWebGL2&&w.samples>0&&We.useMultisampledRTT(w)===!1?Y=He.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?Y=ke[q]:Y=ke,E.copy(w.viewport),B.copy(w.scissor),N=w.scissorTest}else E.copy(R).multiplyScalar(O).floor(),B.copy(D).multiplyScalar(O).floor(),N=k;if(Ce.bindFramebuffer(H.FRAMEBUFFER,Y)&&Re.drawBuffers&&X&&Ce.drawBuffers(w,Y),Ce.viewport(E),Ce.scissor(B),Ce.setScissorTest(N),he){const Ee=He.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ee.__webglTexture,q)}else if(Se){const Ee=He.get(w.texture),Ae=F||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ee.__webglTexture,q||0,Ae)}P=-1},this.readRenderTargetPixels=function(w,F,q,X,Y,he,Se){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=He.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(ze=ze[Se]),ze){Ce.bindFramebuffer(H.FRAMEBUFFER,ze);try{const Ee=w.texture,Ae=Ee.format,ke=Ee.type;if(Ae!==fi&&ot.convert(Ae)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ye=ke===Fa&&(_e.has("EXT_color_buffer_half_float")||Re.isWebGL2&&_e.has("EXT_color_buffer_float"));if(ke!==ar&&ot.convert(ke)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Qi&&(Re.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Ye){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-X&&q>=0&&q<=w.height-Y&&H.readPixels(F,q,X,Y,ot.convert(Ae),ot.convert(ke),he)}finally{const Ee=T!==null?He.get(T).__webglFramebuffer:null;Ce.bindFramebuffer(H.FRAMEBUFFER,Ee)}}},this.copyFramebufferToTexture=function(w,F,q=0){const X=Math.pow(2,-q),Y=Math.floor(F.image.width*X),he=Math.floor(F.image.height*X);We.setTexture2D(F,0),H.copyTexSubImage2D(H.TEXTURE_2D,q,0,0,w.x,w.y,Y,he),Ce.unbindTexture()},this.copyTextureToTexture=function(w,F,q,X=0){const Y=F.image.width,he=F.image.height,Se=ot.convert(q.format),ze=ot.convert(q.type);We.setTexture2D(q,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment),F.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,X,w.x,w.y,Y,he,Se,ze,F.image.data):F.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,X,w.x,w.y,F.mipmaps[0].width,F.mipmaps[0].height,Se,F.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,X,w.x,w.y,Se,ze,F.image),X===0&&q.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),Ce.unbindTexture()},this.copyTextureToTexture3D=function(w,F,q,X,Y=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=w.max.x-w.min.x+1,Se=w.max.y-w.min.y+1,ze=w.max.z-w.min.z+1,Ee=ot.convert(X.format),Ae=ot.convert(X.type);let ke;if(X.isData3DTexture)We.setTexture3D(X,0),ke=H.TEXTURE_3D;else if(X.isDataArrayTexture)We.setTexture2DArray(X,0),ke=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const Ye=H.getParameter(H.UNPACK_ROW_LENGTH),At=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Vt=H.getParameter(H.UNPACK_SKIP_PIXELS),pt=H.getParameter(H.UNPACK_SKIP_ROWS),fn=H.getParameter(H.UNPACK_SKIP_IMAGES),xt=q.isCompressedTexture?q.mipmaps[0]:q.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,xt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,xt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,w.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,w.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,w.min.z),q.isDataTexture||q.isData3DTexture?H.texSubImage3D(ke,Y,F.x,F.y,F.z,he,Se,ze,Ee,Ae,xt.data):q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(ke,Y,F.x,F.y,F.z,he,Se,ze,Ee,xt.data)):H.texSubImage3D(ke,Y,F.x,F.y,F.z,he,Se,ze,Ee,Ae,xt),H.pixelStorei(H.UNPACK_ROW_LENGTH,Ye),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,At),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Vt),H.pixelStorei(H.UNPACK_SKIP_ROWS,pt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,fn),Y===0&&X.generateMipmaps&&H.generateMipmap(ke),Ce.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?We.setTextureCube(w,0):w.isData3DTexture?We.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?We.setTexture2DArray(w,0):We.setTexture2D(w,0),Ce.unbindTexture()},this.resetState=function(){M=0,A=0,T=null,Ce.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Du?"display-p3":"srgb",t.unpackColorSpace=vt.workingColorSpace===hl?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===tn?Hr:X1}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Hr?tn:Bi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Pg extends up{}Pg.prototype.isWebGL1Renderer=!0;class Lg extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Dg extends Ga{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zf=new Qt,Jc=new K1,Ro=new fl,Co=new Z;class Ug extends Ln{constructor(e=new zi,t=new Dg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(i),Ro.radius+=s,e.ray.intersectsSphere(Ro)===!1)return;Zf.copy(i).invert(),Jc.copy(e.ray).applyMatrix4(Zf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const p=c.getX(g);Co.fromBufferAttribute(h,p),Jf(Co,p,l,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Co.fromBufferAttribute(h,g),Jf(Co,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Jf(r,e,t,n,i,s,o){const a=Jc.distanceSqToPoint(r);if(a<t){const l=new Z;Jc.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pu);const ca=new Map,hp=(r,e)=>(ca.has(r)||ca.set(r,new Set),ca.get(r).add(e),()=>ca.get(r).delete(e)),fp=new Map,Qc=(r,e)=>{var t;fp.set(r,e),(t=ca.get(r))==null||t.forEach(n=>n(e))},dp=r=>fp.get(r);new Promise(r=>{});const Ss={ink:[.06,.06,.06],accent:[0,.443,.89],canvas:[.98,.98,.98],dark:!1},Ng=()=>{const r=getComputedStyle(document.documentElement),e=t=>r.getPropertyValue(t).trim().split(/\s+/).map(n=>Number(n)/255);Ss.ink=e("--c-ink"),Ss.accent=e("--c-accent"),Ss.canvas=e("--c-canvas"),Ss.dark=r.getPropertyValue("--dark").trim()==="1"},Ig=Ng,Og=[[[180,-16.1],[180,-16.6],[178.7,-17],[178.6,-16.6],[180,-16.1]],[[178.1,-17.5],[178.7,-17.6],[178.6,-18.2],[177.4,-18.2],[177.7,-17.4],[178.1,-17.5]],[[33.9,-.9],[37.7,-3.1],[37.8,-3.7],[39.2,-4.7],[38.7,-5.9],[38.8,-6.5],[39.4,-6.8],[39.2,-8.5],[40.3,-10.3],[39.5,-10.9],[36.5,-11.7],[34.6,-11.5],[33.7,-9.4],[30.7,-8.3],[29.6,-6.5],[29.3,-4.5],[30.8,-3.4],[30.5,-2.4],[30.8,-1.7],[30.4,-1.1],[33.9,-.9]],[[-8.7,27.7],[-8.7,25.9],[-12,25.9],[-11.9,23.4],[-12.9,23.3],[-12.9,21.3],[-16.8,21.3],[-17.1,21],[-17,21.4],[-14.8,21.5],[-13.9,23.7],[-12.5,24.8],[-11.4,26.9],[-8.8,27.1],[-8.7,27.7]],[[-122.8,49],[-125.6,50.4],[-127.4,50.8],[-128,51.7],[-127.9,52.3],[-129.1,52.8],[-129.3,53.6],[-130.5,54.3],[-130,55.9],[-131.7,56.6],[-133.4,58.4],[-135.5,59.8],[-137.5,58.9],[-139,60],[-141,60.3],[-141,69.7],[-136.5,68.9],[-134.4,69.6],[-132.9,69.5],[-129.8,70.2],[-129.1,69.8],[-128.1,70.5],[-125.8,69.5],[-124.4,70.2],[-124.3,69.4],[-121.5,69.8],[-115.2,68.9],[-113.9,68.4],[-115.3,67.9],[-109.9,68],[-108.9,67.4],[-107.8,67.9],[-108.8,68.3],[-108.2,68.7],[-106.2,68.8],[-104.3,68],[-101.5,67.6],[-98.4,67.8],[-98.6,68.4],[-97.7,68.6],[-96.1,68.2],[-96.1,67.3],[-95.5,68.1],[-94.7,68.1],[-94.2,69.1],[-96.5,70.1],[-96.4,71.2],[-95.2,71.9],[-92.9,71.3],[-91.5,70.2],[-92.4,69.7],[-90.5,69.5],[-90.6,68.5],[-89.2,69.3],[-88,68.6],[-88.3,67.9],[-87.4,67.2],[-85.6,68.8],[-85.5,69.9],[-82.6,69.7],[-81.3,69.2],[-81.2,68.7],[-82,68.1],[-81.3,67.6],[-81.4,67.1],[-83.3,66.4],[-85.8,66.6],[-87.3,64.8],[-88.5,64.1],[-90.7,63.6],[-90.8,63],[-91.9,62.8],[-94.2,60.9],[-94.7,58.9],[-93.2,58.8],[-92.3,57.1],[-90.9,57.3],[-85,55.3],[-82.3,55.1],[-82.1,53.3],[-81.4,52.2],[-79.9,51.2],[-79.1,51.5],[-78.6,52.6],[-79.1,54.1],[-79.8,54.7],[-78.2,55.1],[-76.5,56.5],[-77.3,58.1],[-78.5,58.8],[-77.3,59.9],[-78.1,62.3],[-73.8,62.4],[-71.4,61.1],[-69.6,61.1],[-69.3,59],[-67.6,58.2],[-66.2,58.8],[-64.6,60.3],[-61.4,57],[-61.8,56.3],[-59.6,55.2],[-57.3,54.6],[-56.9,53.8],[-55.8,53.3],[-55.7,52.1],[-60,50.2],[-66.4,50.2],[-68.5,49.1],[-71.1,46.8],[-70.3,47],[-68.7,48.3],[-66.6,49.1],[-65.1,49.2],[-64.2,48.7],[-65.1,48.1],[-64.5,46.2],[-63.2,45.7],[-61.5,45.9],[-60.5,47],[-60.4,46.3],[-59.8,45.9],[-65.4,43.5],[-66.1,43.6],[-66.2,44.5],[-64.4,45.3],[-67.1,45.1],[-67.8,45.7],[-67.8,47.1],[-69.2,47.4],[-70.7,45.5],[-71.5,45],[-74.9,45],[-76.8,43.6],[-78.7,43.6],[-79.2,43.5],[-78.9,42.9],[-82.4,41.7],[-83.1,42],[-82.1,43.6],[-82.6,45.3],[-84.9,46.9],[-88.4,48.3],[-91.6,48.1],[-94.3,48.7],[-94.8,49.4],[-95.2,49.4],[-95.2,49],[-122.8,49]],[[-84,62.5],[-83.3,62.9],[-81.9,62.9],[-83.1,62.2],[-84,62.5]],[[-79.8,72.8],[-80.9,73.3],[-80.8,73.7],[-80.4,73.8],[-78.1,73.7],[-76.3,72.8],[-79.8,72.8]],[[-80.3,62.1],[-79.9,62.4],[-79.3,62.2],[-79.7,61.6],[-80.3,62.1]],[[-93.6,75],[-94.2,74.6],[-96.8,74.9],[-94.9,75.6],[-93.6,75]],[[-96.8,78.8],[-95.6,78.4],[-95.8,78.1],[-97.3,77.9],[-98.1,78.1],[-98.6,78.9],[-96.8,78.8]],[[-88.2,74.4],[-92.4,74.8],[-92.9,75.9],[-93.9,76.3],[-97.1,76.8],[-96.7,77.2],[-91.6,76.8],[-90.7,76.4],[-91,76.1],[-89.2,75.6],[-81.1,75.7],[-80.1,75.3],[-79.8,74.9],[-80.5,74.7],[-88.2,74.4]],[[-111.3,78.2],[-109.9,78],[-110.2,77.7],[-112.1,77.4],[-113.5,77.7],[-111.3,78.2]],[[-111,78.8],[-109.7,78.6],[-112.5,78.4],[-111,78.8]],[[-55.6,51.3],[-56.8,49.8],[-56.1,50.2],[-55.5,49.9],[-55.8,49.6],[-53.5,49.2],[-53.8,48.5],[-53.1,48.7],[-52.6,47.5],[-53.1,46.7],[-54.2,46.8],[-54,47.6],[-54.2,47.8],[-55.4,46.9],[-56,46.9],[-55.3,47.4],[-56.3,47.6],[-59.3,47.6],[-59.4,47.9],[-58.8,48.3],[-59.2,48.5],[-57.4,50.7],[-55.9,51.6],[-55.4,51.6],[-55.6,51.3]],[[-83.9,65.1],[-81.6,64.5],[-81.6,64],[-80.1,63.7],[-81,63.4],[-82.5,63.7],[-83.1,64.1],[-85.5,63.1],[-85.9,63.6],[-87.2,63.5],[-86.4,64],[-85.9,65.7],[-83.9,65.1]],[[-78.8,72.4],[-77.8,72.7],[-74.2,71.8],[-74.1,71.3],[-72.2,71.6],[-71.2,70.9],[-68.8,70.5],[-67,69.2],[-68.8,68.7],[-64.9,67.8],[-63.4,66.9],[-61.9,66.9],[-62.2,66.2],[-63.9,65],[-66.7,66.4],[-68,66.3],[-68.1,65.7],[-65.3,64.4],[-64.7,63.4],[-65,62.7],[-68.8,63.7],[-66.2,61.9],[-71,62.9],[-72.2,63.4],[-71.9,63.7],[-74.8,64.7],[-74.8,64.4],[-77.7,64.2],[-78.6,64.6],[-77.9,65.3],[-74,65.5],[-74.3,65.8],[-73.9,66.3],[-72.7,67.3],[-73.3,68.1],[-76.9,68.9],[-76.2,69.1],[-79,70.2],[-81.3,69.7],[-88.7,70.4],[-89.5,70.8],[-88.5,71.2],[-89.9,71.2],[-90.2,72.2],[-89.4,73.1],[-88.4,73.5],[-85.8,73.8],[-86.6,73.2],[-85.8,72.5],[-84.9,73.3],[-82.3,73.8],[-80.6,72.7],[-80.7,72.1],[-78.8,72.4]],[[-94.5,74.1],[-90.5,73.9],[-94.3,72],[-95.4,72.1],[-96,73.4],[-94.5,74.1]],[[-122.9,76.1],[-119.1,77.5],[-116.2,77.6],[-116.3,76.9],[-117.1,76.5],[-121.5,75.9],[-122.9,76.1]],[[-132.7,54],[-131.7,54.1],[-132,53],[-131.2,52.2],[-133.1,53.4],[-133.2,54.2],[-132.7,54]],[[-105.5,79.3],[-100.8,78.8],[-99.7,77.9],[-105.2,78.4],[-104.2,78.7],[-105.4,78.9],[-105.5,79.3]],[[-123.5,48.5],[-125.7,48.8],[-127,49.8],[-128.1,50],[-128.4,50.8],[-125.8,50.3],[-123.5,48.5]],[[-121.5,74.4],[-117.6,74.2],[-115.5,73.5],[-119.2,72.5],[-120.5,71.8],[-120.5,71.4],[-123.1,70.9],[-125.9,71.9],[-123.9,73.7],[-124.9,74.3],[-121.5,74.4]],[[-107.8,75.8],[-105.9,76],[-105.7,75.5],[-106.3,75],[-112.2,74.4],[-113.7,74.4],[-113.9,74.7],[-111.8,75.2],[-117.7,75.2],[-115.4,76.5],[-109.1,75.5],[-110.5,76.4],[-109.6,76.8],[-108.5,76.7],[-107.8,75.8]],[[-106.5,73.1],[-105.4,72.7],[-104.5,71],[-101,70],[-101.1,69.6],[-102.7,69.5],[-102.1,69.1],[-102.4,68.8],[-106,69.2],[-113.3,68.5],[-113.9,69],[-116.1,69.2],[-117.3,70],[-112.4,70.4],[-117.9,70.5],[-118.4,70.9],[-116.1,71.3],[-119.4,71.6],[-117.9,72.7],[-115.2,73.3],[-114.2,73.1],[-114.7,72.7],[-112.4,73],[-111.1,72.5],[-109.9,73],[-109,72.6],[-108.2,71.7],[-107.7,72.1],[-108.4,73.1],[-106.5,73.1]],[[-100.4,72.7],[-101.5,73.4],[-100.4,73.8],[-97.4,73.8],[-97.1,73.5],[-98.1,73],[-96.5,72.6],[-96.7,71.7],[-98.4,71.3],[-102.5,72.5],[-102.5,72.8],[-100.4,72.7]],[[-106.6,73.6],[-104.5,73.4],[-105.4,72.8],[-106.9,73.5],[-106.6,73.6]],[[-98.5,76.7],[-97.7,76.3],[-98.2,75],[-99.8,74.9],[-100.9,75.1],[-100.9,75.6],[-102.5,75.6],[-102.6,76.3],[-98.5,76.7]],[[-96,80.6],[-94.3,81],[-94.7,81.2],[-92.4,81.3],[-91.1,80.7],[-87.8,80.3],[-85.8,79.3],[-89,78.3],[-92.9,78.3],[-94,78.8],[-93.9,79.1],[-93.1,79.4],[-95,79.4],[-96.7,80.2],[-96,80.6]],[[-91.6,81.9],[-85.5,82.7],[-83.2,82.3],[-82.4,82.9],[-79.3,83.1],[-72.8,83.2],[-61.9,82.6],[-61.9,82.4],[-67.7,81.5],[-65.5,81.5],[-69.5,80.6],[-71.2,79.8],[-76.9,79.3],[-75.5,79.2],[-76.2,79],[-75.4,78.5],[-79.8,77.2],[-77.9,76.8],[-80.6,76.2],[-89.5,76.5],[-89.6,77],[-87.8,77.2],[-88.3,77.9],[-85,77.5],[-86.3,78.2],[-88,78.4],[-85.1,79.3],[-86.5,79.7],[-86.9,80.3],[-83.4,80.1],[-81.8,80.5],[-87.6,80.5],[-89.4,80.9],[-91.6,81.9]],[[-75.2,67.4],[-77,67.1],[-77.2,67.6],[-76.8,68.1],[-75.9,68.3],[-75.1,68],[-75.2,67.4]],[[-96.3,69.5],[-95.6,69.1],[-96.3,68.8],[-99.8,69.4],[-98.2,70.1],[-96.3,69.5]],[[-64.5,49.9],[-62.9,49.7],[-61.8,49.1],[-64.5,49.9]],[[-64,47],[-63.7,46.6],[-62,46.4],[-62.9,46],[-64.1,46.4],[-64.4,46.7],[-64,47]],[[-122.8,49],[-95.2,49],[-95.2,49.4],[-94.8,49.4],[-94.3,48.7],[-91.6,48.1],[-88.4,48.3],[-84.9,46.9],[-82.6,45.3],[-82.1,43.6],[-83.1,42.1],[-82.7,41.7],[-78.9,42.9],[-79.2,43.5],[-78.7,43.6],[-76.8,43.6],[-74.9,45],[-71.5,45],[-70.7,45.5],[-69.2,47.4],[-67.8,47.1],[-67.8,45.7],[-67,44.8],[-70.1,43.7],[-70.8,42.3],[-70.5,41.8],[-70.1,41.8],[-70.2,42.1],[-69.9,41.9],[-70,41.6],[-73.7,40.9],[-71.9,40.9],[-74,40.8],[-74.2,39.7],[-74.9,38.9],[-75.5,39.5],[-75.1,38.4],[-75.9,37.2],[-75.7,37.9],[-76.2,38.3],[-76.3,39.1],[-76.3,38.1],[-77,38.2],[-76.3,37.9],[-75.7,35.6],[-76.4,34.8],[-79.1,33.5],[-81.3,31.4],[-81.3,30],[-80.1,26.9],[-80.4,25.2],[-81.2,25.2],[-81.7,25.9],[-82.9,27.9],[-82.7,28.6],[-83.7,29.9],[-85.1,29.6],[-86.4,30.4],[-89.6,30.2],[-89.4,29.2],[-93.2,29.8],[-94.7,29.5],[-97.1,27.8],[-97.1,25.9],[-97.5,25.8],[-99,26.4],[-101,29.4],[-102.5,29.8],[-103.1,29],[-103.9,29.3],[-106.5,31.8],[-108.2,31.8],[-108.2,31.3],[-111,31.3],[-114.7,32.7],[-117.1,32.5],[-118.5,34],[-120.6,34.6],[-124.4,40.3],[-124.2,42],[-124.5,42.8],[-123.9,45.5],[-124.7,48.2],[-123.1,48],[-122.6,47.1],[-122.3,47.4],[-122.8,49]],[[-155.4,20.1],[-154.8,19.5],[-155.7,18.9],[-156.1,19.7],[-155.9,20.3],[-155.4,20.1]],[[-156,20.8],[-156.4,20.6],[-156.7,20.9],[-156,20.8]],[[-158,21.7],[-157.7,21.3],[-158.1,21.3],[-158,21.7]],[[-159.4,22.2],[-159.5,21.9],[-159.8,22.1],[-159.4,22.2]],[[-166.5,60.4],[-165.7,60.3],[-165.6,59.9],[-166.2,59.8],[-167.5,60.2],[-166.5,60.4]],[[-153.2,58],[-152.1,57.6],[-154,56.7],[-154.5,57],[-154.7,57.5],[-153.2,58]],[[-141,69.7],[-141,60.3],[-139,60],[-137.5,58.9],[-135.5,59.8],[-133.4,58.4],[-131.7,56.6],[-130,55.9],[-130,55.3],[-130.5,54.8],[-132,55.5],[-132.3,56.4],[-133.5,57.2],[-134.1,58.1],[-136.6,58.2],[-139.9,59.5],[-144,60],[-147.1,60.9],[-148.2,60.7],[-148,60],[-151.7,59.2],[-151.9,59.7],[-151.4,60.7],[-150.3,61],[-150.6,61.3],[-154,59.4],[-153.3,58.9],[-154.2,58.1],[-156.3,57.4],[-158.4,56],[-163.1,54.7],[-164.9,54.6],[-161.8,55.9],[-160.6,56],[-158.7,57],[-157.7,57.6],[-157,58.9],[-159.1,58.4],[-159.7,58.9],[-160,58.6],[-160.4,59.1],[-162,58.7],[-161.9,59.6],[-162.5,60],[-163.8,59.8],[-165.3,60.5],[-165.4,61.1],[-166.1,61.5],[-165.7,62.1],[-164.6,63.1],[-163.1,63.1],[-160.8,63.8],[-161.5,64.4],[-160.8,64.8],[-162.8,64.3],[-165,64.4],[-166.4,64.7],[-168.1,65.7],[-164.5,66.6],[-163.7,66.6],[-163.8,66.1],[-161.7,66.1],[-165.4,68],[-166.8,68.4],[-166.2,68.9],[-164.4,68.9],[-161.9,70.3],[-156.6,71.4],[-154.3,70.7],[-152.2,70.8],[-150.7,70.4],[-141,69.7]],[[-171.7,63.8],[-168.7,63.3],[-169.5,63],[-171.6,63.3],[-171.7,63.8]],[[87.4,49.2],[86.6,48.5],[85.8,48.5],[85.7,47.5],[85.2,47],[83.2,47.3],[82.5,45.5],[80,44.9],[80.9,43.2],[80.2,42.9],[80.3,42.3],[79.1,42.9],[75.6,42.9],[74.2,43.3],[73.6,43.1],[73.5,42.5],[71.2,42.7],[71,42.3],[69.1,41.4],[68.6,40.7],[68,41.1],[66.7,41.2],[66.5,42],[66,42],[66.1,43],[64.9,43.7],[62,43.5],[61.1,44.4],[58.5,45.6],[55.9,45],[56,41.3],[55.5,41.3],[54.1,42.3],[52.5,41.8],[52.5,42.8],[51.3,43.1],[50.3,44.6],[51.3,44.5],[51.3,45.2],[53,45.3],[53,46.9],[51.2,47],[49.1,46.4],[48.6,46.6],[48.7,47.1],[48.1,47.7],[47.3,47.7],[46.5,48.4],[47.5,50.5],[48.6,49.9],[48.7,50.6],[50.8,51.7],[52.3,51.7],[55.7,50.6],[56.8,51],[58.4,51.1],[59.6,50.5],[59.9,50.8],[61.3,50.8],[61.6,51.3],[60,52],[60.9,52.4],[60.7,52.7],[61.7,53],[61,53.7],[61.4,54],[65.2,54.4],[69.1,55.4],[70.9,55.2],[71.2,54.1],[72.2,54.4],[73.5,54],[73.4,53.5],[76.9,54.5],[76.5,54.2],[77.8,53.4],[80,50.9],[80.6,51.4],[81.9,50.8],[83.4,51.1],[85.5,49.7],[86.8,49.8],[87.4,49.2]],[[56,41.3],[55.9,45],[58.5,45.6],[61.1,44.4],[62,43.5],[64.9,43.7],[66.1,43],[66,42],[66.5,42],[66.7,41.2],[68,41.1],[68.3,40.7],[71,42.3],[71.3,42.2],[70.4,41.5],[73.1,40.9],[71.8,40.1],[70.6,40.2],[70.7,41],[69.3,40.7],[68.5,39.5],[67.7,39.6],[67.4,39.1],[68.2,38.9],[68.4,38.2],[67.8,37.1],[66.5,37.4],[66.5,38],[64.2,38.9],[62.4,40.1],[61.9,41.1],[60.5,41.2],[60.1,41.4],[60,42.2],[58.6,42.8],[56.9,41.8],[57.1,41.3],[56,41.3]],[[141,-2.6],[144.6,-3.9],[145.8,-4.9],[146,-5.5],[147.6,-6.1],[147.9,-6.6],[147,-6.7],[147.2,-7.4],[148.7,-9.1],[149.3,-9.1],[149.3,-9.5],[150.8,-10.3],[150.7,-10.6],[147.9,-10.1],[146,-8.1],[144.7,-7.6],[143.3,-8.2],[143.4,-9],[142.6,-9.3],[141,-9.1],[141,-2.6]],[[152.6,-3.7],[153.1,-4.5],[152.8,-4.8],[152.4,-3.8],[150.7,-2.7],[150.9,-2.5],[152.6,-3.7]],[[151.3,-5.8],[149.7,-6.3],[148.3,-5.7],[148.4,-5.4],[149.8,-5.5],[150.1,-5],[150.2,-5.5],[150.8,-5.5],[151.6,-4.8],[151.5,-4.2],[152.1,-4.1],[152.3,-4.9],[151.3,-5.8]],[[154.8,-5.3],[156,-6.5],[155.9,-6.8],[155.2,-6.5],[154.8,-5.3]],[[141,-2.6],[141,-9.1],[140.1,-8.3],[137.6,-8.4],[138,-7.6],[138.7,-7.3],[137.9,-5.4],[133.7,-3.5],[133,-4.1],[132.8,-3.3],[132,-2.8],[133.8,-2.5],[133.7,-2.2],[132.2,-2.2],[130.5,-.9],[132.4,-.4],[134,-.8],[134.4,-2.8],[135.5,-3.4],[136.3,-2.3],[137.4,-1.7],[141,-2.6]],[[125,-8.9],[125.1,-9.4],[124.4,-10.1],[123.5,-10.2],[124,-9.3],[125,-8.9]],[[134.2,-6.9],[134.5,-5.4],[134.7,-6.2],[134.2,-6.9]],[[117.9,4.1],[117.3,3.2],[118,2.3],[117.9,1.8],[119,.9],[117.8,.8],[117.5,-.8],[116.6,-1.5],[116.1,-4],[116,-3.7],[114.9,-4.1],[114.5,-3.5],[113.3,-3.1],[112.1,-3.5],[111.7,-3],[110.2,-2.9],[110.1,-1.6],[109.1,-.5],[109,.4],[109.1,1.3],[109.7,2],[110.5,.8],[111.8,.9],[112.9,1.5],[113.8,1.2],[114.6,1.4],[115.9,4.3],[117.9,4.1]],[[129.4,-2.8],[130.5,-3.1],[130.8,-3.9],[130,-3.4],[127.9,-3.4],[128.1,-2.8],[129.4,-2.8]],[[126.9,-3.8],[126,-3.2],[127,-3.1],[127.2,-3.5],[126.9,-3.8]],[[127.9,2.2],[128,1.6],[128.6,1.5],[128.7,1.1],[128.6,.3],[128.1,.4],[128,-.3],[128.4,-.8],[128.1,-.9],[127.4,1],[127.9,2.2]],[[122.9,.9],[124.1,.9],[125.1,1.6],[125.2,1.4],[124.4,.4],[120.2,.2],[120,-.5],[120.9,-1.4],[121.5,-1],[123.3,-.6],[123.3,-1.1],[122.8,-.9],[121.5,-1.9],[122.5,-3.2],[122.3,-3.5],[123.2,-4.7],[123.2,-5.3],[122.6,-5.6],[122.2,-5.3],[122.7,-4.5],[121.7,-4.9],[121.5,-4.6],[121.6,-4.2],[120.9,-3.6],[121,-2.6],[120.3,-2.9],[120.4,-5.5],[119.8,-5.7],[119.4,-5.4],[119.5,-3.5],[119.1,-3.5],[118.8,-2.8],[119.8,.2],[120.9,1.3],[122.9,.9]],[[120.3,-10.3],[119,-9.6],[119.9,-9.4],[120.8,-10],[120.3,-10.3]],[[121.3,-8.5],[122.9,-8.1],[122.8,-8.6],[121.3,-8.9],[119.9,-8.8],[119.9,-8.4],[120.7,-8.2],[121.3,-8.5]],[[118.3,-8.4],[118.9,-8.3],[119.1,-8.7],[116.7,-9],[117.9,-8.1],[118.3,-8.4]],[[108.5,-6.4],[108.6,-6.8],[110.5,-6.9],[110.8,-6.5],[112.6,-6.9],[113,-7.6],[115.7,-8.4],[114.6,-8.8],[106.5,-7.4],[106.3,-6.9],[105.4,-6.9],[106.1,-5.9],[108.5,-6.4]],[[104.4,-1.1],[104.9,-2.3],[105.6,-2.4],[106.1,-3.1],[105.8,-5.9],[104.7,-5.9],[101.4,-2.8],[99.3,.2],[98.6,1.8],[95.4,5],[95.3,5.5],[97.5,5.2],[100.6,2.1],[101.7,2.1],[102.5,1.4],[103.8,.1],[103.4,-.7],[104.4,-1.1]],[[-68.6,-52.6],[-67.8,-53.9],[-65,-54.7],[-65.5,-55.2],[-66.5,-55.2],[-67,-54.9],[-68.6,-54.9],[-68.6,-52.6]],[[-57.6,-30.2],[-58.5,-34.4],[-57.2,-35.3],[-57.4,-36],[-56.7,-36.4],[-56.8,-36.9],[-57.7,-38.2],[-59.2,-38.7],[-62.3,-38.8],[-62.1,-40.7],[-62.7,-41],[-63.8,-41.2],[-64.7,-40.8],[-65.1,-41.1],[-65,-42.1],[-64.3,-42.4],[-63.8,-42],[-63.5,-42.6],[-65.2,-43.5],[-65.6,-45],[-66.5,-45],[-67.3,-45.6],[-67.6,-46.3],[-65.6,-47.2],[-66,-48.1],[-67.2,-48.7],[-67.8,-49.9],[-69.1,-50.7],[-68.8,-51.8],[-68.1,-52.3],[-71.9,-52],[-72.3,-50.7],[-73.3,-50.4],[-73.4,-49.3],[-72.3,-48.2],[-71.7,-45],[-71.2,-44.8],[-71.8,-44.2],[-71.5,-43.8],[-71.9,-43.4],[-72.1,-42.3],[-71.7,-42.1],[-71.9,-40.8],[-71.4,-38.9],[-70.8,-38.6],[-71.1,-36.7],[-70.4,-36],[-70.4,-35.2],[-69.8,-34.2],[-70.5,-31.4],[-69.9,-30.3],[-69.7,-28.5],[-68.3,-26.9],[-68.6,-26.5],[-68.4,-24.5],[-67.3,-24],[-67.1,-22.7],[-66.3,-21.8],[-65,-22.1],[-64.4,-22.8],[-64,-22],[-62.8,-22],[-60.8,-23.9],[-57.8,-25.2],[-57.6,-25.6],[-58.6,-27.1],[-55.7,-27.4],[-54.8,-26.6],[-54.6,-25.7],[-54.1,-25.5],[-53.6,-26.1],[-53.6,-26.9],[-57.6,-30.2]],[[-68.6,-52.6],[-68.6,-54.9],[-67,-54.9],[-68.1,-55.6],[-71,-55.1],[-74.7,-52.8],[-71.1,-54.1],[-70.3,-52.9],[-68.6,-52.6]],[[-69.6,-17.6],[-68.4,-19.4],[-68.8,-20.4],[-67.8,-22.9],[-67,-23],[-67.3,-24],[-68.4,-24.5],[-68.6,-26.5],[-68.3,-26.9],[-69.7,-28.5],[-69.9,-30.3],[-70.5,-31.4],[-69.8,-34.2],[-70.4,-35.2],[-70.4,-36],[-71.1,-36.7],[-70.8,-38.6],[-71.4,-38.9],[-71.9,-40.8],[-71.7,-42.1],[-72.1,-42.3],[-71.9,-43.4],[-71.5,-43.8],[-71.8,-44.2],[-71.2,-44.8],[-71.7,-45],[-72.3,-48.2],[-73.4,-49.3],[-73.3,-50.4],[-72.3,-50.7],[-71.9,-52],[-68.6,-52.3],[-70.8,-52.9],[-71,-53.8],[-71.4,-53.9],[-74.9,-52.3],[-75.6,-48.7],[-75.2,-47.7],[-74.1,-46.9],[-75.6,-46.6],[-74.7,-45.8],[-74.4,-44.1],[-73.2,-44.5],[-72.7,-42.4],[-73.4,-42.1],[-73.7,-43.4],[-74.3,-43.2],[-73.7,-39.9],[-73.2,-39.3],[-73.6,-37.2],[-73.2,-37.1],[-71.4,-32.4],[-71.5,-28.9],[-70.9,-27.6],[-70.1,-21.4],[-70.4,-18.3],[-69.6,-17.6]],[[29.3,-4.5],[29.6,-6.5],[30.7,-8.3],[28.7,-8.5],[28.4,-11.8],[29.3,-12.4],[29.6,-12.2],[29.7,-13.3],[28.9,-13.2],[27.2,-11.6],[26.6,-11.9],[24.3,-11.3],[24.3,-11],[22.2,-11.1],[21.7,-7.3],[20.5,-7.3],[20.6,-6.9],[20.1,-6.9],[19.4,-7.2],[19,-8],[17.5,-8.1],[16.3,-5.9],[12.3,-6.1],[12.2,-5.8],[12.6,-5],[13.6,-4.5],[14.6,-5],[16,-3.5],[16.4,-1.7],[17.6,-.4],[18.5,4.2],[19.5,5],[22.4,4],[22.8,4.7],[25.7,5.3],[27.4,5.2],[28.4,4.3],[29.7,4.6],[30.8,3.5],[30.8,2.3],[31.2,2.2],[29.9,.6],[29,-2.8],[29.3,-4.5]],[[41.6,-1.7],[41,-.9],[41,2.8],[42.1,4.2],[42.8,4.3],[43.7,5],[45,5],[48.9,9.5],[48.9,11.4],[51.1,12],[50.6,9.2],[48.6,5.3],[46.6,2.9],[43.1,.3],[41.6,-1.7]],[[39.2,-4.7],[37.8,-3.7],[37.7,-3.1],[33.9,-.9],[33.9,.1],[35,1.9],[34,4.2],[35.3,5.5],[35.8,5.3],[36.2,4.4],[36.9,4.4],[38.1,3.6],[39.6,3.4],[40.8,4.3],[41.9,3.9],[41,2.8],[41,-.9],[41.6,-1.7],[40.3,-2.6],[39.2,-4.7]],[[24.6,8.2],[23.5,9],[23.6,10.1],[22.3,12.6],[21.9,12.6],[23,15.7],[23.9,15.6],[23.9,20],[25,20],[25,22],[36.9,22],[37.5,18.6],[38.4,18],[36.9,17],[36.3,13.6],[34.3,10.6],[34,8.7],[33.7,10.3],[33.2,10.7],[33.2,12.2],[32.7,12.2],[32.1,12],[32.4,11.1],[31.4,9.8],[30.8,9.7],[30,10.3],[29,9.4],[26.8,9.5],[25.8,10.4],[25.1,10.3],[24.5,8.9],[23.9,8.6],[24.6,8.2]],[[23.8,19.6],[23.9,15.6],[23,15.7],[21.9,12.6],[22.3,12.6],[22.9,11.1],[21.7,10.6],[21,9.5],[18.8,9],[18.9,8.6],[18,7.9],[15.3,7.4],[15,8.8],[14,9.5],[14.2,10],[15.5,10],[14.9,10.9],[14.6,13.3],[14,13.4],[13.5,14.4],[14,15.7],[15.2,16.6],[15.9,20.4],[15.1,21.3],[14.9,22.9],[15.9,23.4],[23.8,19.6]],[[-71.7,19.7],[-71.7,18],[-73.9,18],[-74.5,18.3],[-74.4,18.7],[-72.3,18.7],[-72.8,19.5],[-73.4,19.6],[-73.2,19.9],[-71.7,19.7]],[[-71.7,18],[-71.9,18.6],[-71.6,19.9],[-70,19.6],[-68.3,18.6],[-68.7,18.2],[-70.7,18.4],[-71.4,17.6],[-71.7,18]],[[178.7,71.1],[180,71.5],[180,70.8],[178.9,70.8],[178.7,71.1]],[[49.1,46.4],[46.7,44.6],[48.6,41.8],[47.8,41.2],[45.5,42.5],[40,43.4],[36.7,45.2],[37.4,45.4],[38.2,46.2],[37.7,46.6],[39.1,47],[38.2,47.1],[38.3,47.5],[39.7,47.9],[40.1,49.6],[35.4,50.6],[35,51.2],[34.2,51.3],[34.4,51.8],[33.8,52.3],[31.8,52.1],[31.3,53.1],[32.7,53.4],[30.8,54.8],[30.9,55.6],[28.2,56.2],[27.8,57.2],[27.3,57.5],[27.7,57.8],[27.4,58.7],[28,59.5],[29.1,60],[28.1,60.5],[31.5,62.9],[30,63.6],[30.4,64.2],[29.5,64.9],[30.2,65.8],[29.1,66.9],[30,67.7],[28.4,68.4],[28.6,69.1],[32.1,69.9],[33.8,69.3],[36.5,69.1],[41.1,67.5],[41.1,66.8],[38.4,66],[33.2,66.6],[34.8,65.9],[34.9,64.4],[37,63.8],[37.1,64.3],[36.5,64.8],[37.2,65.1],[39.6,64.5],[40.4,64.8],[39.8,65.5],[42.1,66.5],[43.9,66.1],[44.5,66.8],[43.7,67.4],[44.2,68],[43.5,68.6],[46.2,68.2],[46.8,67.7],[45.6,67.6],[45.6,67],[46.3,66.7],[47.9,66.9],[48.1,67.5],[53.7,68.9],[54.5,68.8],[53.5,68.2],[54.7,68.1],[58.8,68.9],[59.9,68.3],[61.1,68.9],[60,69.5],[60.5,69.8],[63.5,69.5],[68.5,68.1],[69.2,68.6],[68.1,69.4],[66.9,69.5],[67.3,69.9],[66.7,71],[69.9,73],[72.6,72.8],[72.8,72.2],[71.8,71.4],[72.8,70.4],[72.6,69],[73.7,68.4],[71.3,66.3],[72.4,66.2],[75.1,67.8],[74.5,68.3],[74.9,69],[73.8,69.1],[73.6,69.6],[74.4,70.6],[73.1,71.4],[74.9,72.1],[74.7,72.8],[75.7,72.3],[75.3,71.3],[76.4,71.2],[75.9,71.9],[77.6,72.3],[79.7,72.3],[81.5,71.8],[80.6,72.6],[80.5,73.6],[86.8,73.9],[86,74.5],[87.2,75.1],[93.2,76],[96.7,75.9],[100.8,76.4],[102,77.3],[104.4,77.7],[106.1,77.4],[104.7,77.1],[107,77],[107.2,76.5],[111.1,76.7],[114.1,75.8],[113.9,75.3],[109.4,74.2],[113,74],[113.5,73.3],[115.6,73.8],[118.8,73.6],[119,73.1],[123.2,73],[123.3,73.7],[127,73.6],[128.6,73],[129.1,72.4],[128.5,72],[131.3,70.8],[132.3,71.8],[133.9,71.4],[139.9,71.5],[139.1,72.4],[140.5,72.8],[149.5,72.2],[153,70.8],[159,70.9],[159.8,70.5],[159.7,69.7],[160.9,69.4],[167.8,69.6],[169.6,68.7],[170.8,69],[170,69.7],[170.5,70.1],[175.7,69.9],[180,69],[180,65],[178.7,64.5],[177.4,64.6],[179.4,63],[179.2,62.3],[177.4,62.5],[173.7,61.7],[170.3,59.9],[168.9,60.6],[166.3,59.8],[165.8,60.2],[164.9,59.7],[163.5,59.9],[162,58.2],[162.1,57.8],[163.2,57.6],[163.1,56.2],[162.1,56.1],[161.7,55.3],[162.1,54.9],[160.4,54.3],[160,53.2],[158.5,53],[158.2,51.9],[156.8,51],[155.4,55.4],[155.9,56.8],[156.8,57.4],[156.8,57.8],[158.4,58.1],[163.7,61.1],[164.5,62.6],[163.3,62.5],[162.7,61.6],[160.1,60.5],[159.3,61.8],[156.7,61.4],[154.2,59.8],[155,59.1],[151.3,58.8],[151.3,59.5],[149.8,59.7],[148.5,59.2],[142.2,59],[135.1,54.7],[136.7,54.6],[137.2,54],[138.2,53.8],[138.8,54.3],[139.9,54.2],[141.3,53.1],[141.4,52.2],[140.6,51.2],[140.1,48.4],[134.9,43.4],[133.5,42.8],[132.3,43.3],[130.8,42.2],[130.6,42.9],[131.1,42.9],[131.3,44.1],[131,45],[131.9,45.3],[133.1,45.1],[135,48.5],[132.5,47.8],[131,47.8],[130.6,48.7],[129.4,49.4],[127.7,49.8],[125.9,52.8],[123.6,53.5],[121,53.3],[120.2,52.8],[120.7,52.5],[120.7,52],[119.3,50.6],[119.3,50.1],[117.9,49.5],[114.4,50.2],[112.9,49.5],[110.7,49.1],[108.5,49.3],[106.9,50.3],[103.7,50.1],[102.3,50.5],[102.1,51.3],[98.9,52],[97.8,51],[98.2,50.4],[97.3,49.7],[92.2,50.8],[87.4,49.2],[86.8,49.8],[85.5,49.7],[83.4,51.1],[81.9,50.8],[80.6,51.4],[80,50.9],[77.8,53.4],[76.5,54.2],[76.9,54.5],[73.4,53.5],[73.5,54],[72.2,54.4],[71.2,54.1],[70.9,55.2],[69.1,55.4],[65.2,54.4],[61.4,54],[61,53.7],[61.7,53],[60.7,52.7],[60.9,52.4],[60,52],[61.6,51.3],[61.3,50.8],[59.9,50.8],[59.6,50.5],[58.4,51.1],[56.8,51],[55.7,50.6],[52.3,51.7],[50.8,51.7],[48.7,50.6],[48.6,49.9],[47.5,50.5],[46.5,48.4],[47.3,47.7],[48.1,47.7],[48.7,47.1],[48.6,46.6],[49.1,46.4]],[[93.8,81],[95.9,81.3],[100.2,79.8],[99.9,78.9],[95,79],[93.3,79.4],[92.5,80.1],[91.2,80.3],[93.8,81]],[[102.8,79.3],[105.4,78.7],[105.1,78.3],[99.4,77.9],[101.3,79.2],[102.8,79.3]],[[138.8,76.1],[145.1,75.6],[144.3,74.8],[139,74.6],[137,75.3],[137.5,75.9],[138.8,76.1]],[[148.2,75.3],[150.7,75.1],[149.6,74.7],[148,74.8],[146.1,75.2],[146.4,75.5],[148.2,75.3]],[[139.9,73.4],[142.1,73.9],[143.6,73.2],[139.9,73.4]],[[44.8,80.6],[51.5,80.7],[47.6,80],[46.5,80.2],[47.1,80.6],[44.8,80.6]],[[22.7,54.3],[19.7,54.4],[19.9,54.9],[21.3,55.2],[22.8,54.9],[22.7,54.3]],[[53.5,73.7],[55.9,74.6],[55.6,75.1],[61.2,76.3],[68.2,76.9],[68.9,76.5],[61.6,75.3],[58.5,74.3],[55.4,72.4],[55.6,71.5],[57.5,70.7],[53.7,70.8],[53.4,71.2],[51.6,71.5],[51.5,72],[52.5,72.2],[52.4,72.8],[54.4,73.6],[53.5,73.7]],[[142.9,53.7],[143.2,51.8],[144.7,49],[143.2,49.3],[142.6,47.9],[143.5,46.8],[143.5,46.1],[142.7,46.7],[142.1,46],[142.2,51],[141.6,51.9],[141.7,53.3],[142.6,53.8],[142.2,54.2],[142.7,54.4],[142.9,53.7]],[[-174.9,67.2],[-175,66.6],[-174.3,66.3],[-174.6,67.1],[-171.9,66.9],[-169.9,66],[-172.5,65.4],[-172.6,64.5],[-173,64.3],[-176,64.9],[-176.2,65.4],[-178.4,65.4],[-178.9,65.7],[-178.7,66.1],[-179.9,65.9],[-179.4,65.4],[-180,65],[-180,69],[-174.9,67.2]],[[-178.7,70.9],[-180,70.8],[-180,71.5],[-177.6,71.3],[-178.7,70.9]],[[33.4,46],[33.7,46.2],[35.5,45.4],[36.5,45.5],[36.3,45.1],[33.9,44.4],[33.3,44.6],[33.5,45],[32.5,45.3],[33.4,46]],[[-79,26.8],[-77.8,26.8],[-77.8,26.6],[-78.9,26.4],[-79,26.8]],[[-77.8,27],[-77,26.6],[-77.2,25.9],[-77.8,27]],[[-78.2,25.2],[-77.9,25.2],[-77.5,23.8],[-78.4,24.6],[-78.2,25.2]],[[-61.2,-51.9],[-60,-51.2],[-59.1,-51.5],[-58.5,-51.1],[-57.8,-51.5],[-59.4,-52.2],[-59.9,-51.9],[-60.7,-52.3],[-61.2,-51.9]],[[15.1,79.7],[15.5,80],[17,80.1],[21.5,79],[19,78.6],[18.5,77.8],[17.6,77.6],[17.1,76.8],[15.9,76.8],[13.8,77.4],[14.7,77.7],[11.2,78.9],[10.4,79.7],[13.2,80],[13.7,79.7],[15.1,79.7]],[[31.1,69.6],[28.6,69.1],[29,69.8],[27.7,70.2],[26.2,69.8],[25.7,69.1],[24.7,68.6],[22.4,68.8],[21.2,69.4],[20,69.1],[19.9,68.4],[18,68.6],[17.7,68],[16.8,68],[13.6,64.8],[13.9,64.4],[13.6,64],[12.6,64.1],[11.9,63.1],[12,61.8],[12.6,61.3],[12.3,60.1],[11,58.9],[10.4,59.5],[8.4,58.3],[7,58.1],[5.7,58.6],[5,62],[10.5,64.5],[14.8,67.8],[19.2,69.8],[23,70.2],[24.5,71],[28.2,71.2],[31.3,70.5],[30,70.2],[31.1,69.6]],[[27.4,80.1],[25.9,79.5],[23,79.4],[20.1,79.6],[17.4,80.3],[22.9,80.7],[27.4,80.1]],[[24.7,77.9],[22.5,77.4],[20.7,77.7],[21.4,77.9],[20.8,78.3],[22.9,78.5],[24.7,77.9]],[[-46.8,82.6],[-38.6,83.5],[-27.1,83.5],[-20.8,82.7],[-22.7,82.3],[-31.4,82],[-24.8,81.8],[-22.9,82.1],[-22.1,81.7],[-23.2,81.2],[-15.8,81.9],[-12.8,81.7],[-12.2,81.3],[-16.9,80.3],[-20,80.2],[-17.7,80.1],[-19.7,78.8],[-19.7,77.6],[-18.5,77],[-21.7,76.6],[-19.8,76.1],[-19.6,75.2],[-20.7,75.2],[-19.4,74.3],[-21.6,74.2],[-20.4,73.8],[-20.8,73.5],[-23.6,73.3],[-22.3,72.6],[-22.3,72.2],[-24.3,72.6],[-24.8,72.3],[-22.1,71.5],[-21.8,70.7],[-23.5,70.5],[-25.5,71.4],[-25.2,70.8],[-26.4,70.2],[-22.3,70.1],[-27.7,68.5],[-31.8,68.1],[-34.2,66.7],[-39.8,65.5],[-40.7,64.8],[-41.2,63.5],[-42.8,62.7],[-42.4,61.9],[-43.4,60.1],[-44.8,60],[-46.3,60.9],[-48.3,60.9],[-51.6,63.6],[-52.3,65.2],[-53.7,66.1],[-53.3,66.8],[-54,67.2],[-53,68.4],[-51.5,68.7],[-50.9,69.9],[-53.5,69.3],[-54.7,69.6],[-54.4,70.8],[-51.4,70.6],[-54,71.5],[-55.8,71.7],[-54.7,72.6],[-57.3,74.7],[-58.6,75.1],[-58.6,75.5],[-61.3,76.1],[-68.5,76.1],[-71.4,77],[-66.8,77.4],[-73.3,78],[-73.2,78.4],[-65.7,79.4],[-65.3,79.8],[-68,80.1],[-62.2,81.3],[-62.7,81.8],[-57.2,82.2],[-53,81.9],[-50.4,82.4],[-44.5,81.7],[-46.9,82.2],[-46.8,82.6]],[[68.9,-48.6],[70.6,-49.3],[70.3,-49.7],[68.7,-49.8],[68.9,-48.6]],[[125,-8.9],[125.9,-8.4],[127.3,-8.4],[125.1,-9.4],[125,-8.9]],[[16.3,-28.6],[16.8,-28.1],[17.4,-28.8],[18.5,-29],[19.9,-28.5],[19.9,-24.8],[20.8,-25.9],[20.9,-26.8],[21.6,-26.7],[23.3,-25.3],[24.2,-25.7],[25.7,-25.5],[25.9,-24.7],[26.5,-24.6],[27.1,-23.6],[29.4,-22.1],[31.2,-22.3],[31.9,-24.4],[31.8,-25.8],[31,-25.7],[30.7,-26.7],[31.3,-27.3],[32.1,-26.7],[32.8,-26.7],[32.2,-28.8],[28.2,-32.8],[25.8,-33.9],[22.6,-33.9],[20.1,-34.8],[18.4,-34.1],[17.9,-32.6],[18.2,-32.4],[18.2,-31.7],[16.3,-28.6]],[[29,-29],[29.3,-29.3],[28.1,-30.5],[27.7,-30.6],[27,-29.9],[28.1,-28.9],[28.5,-28.6],[29,-29]],[[-117.1,32.5],[-114.7,32.7],[-111,31.3],[-108.2,31.3],[-108.2,31.8],[-106.5,31.8],[-103.9,29.3],[-103.1,29],[-102.5,29.8],[-101.7,29.8],[-99.5,27.5],[-99,26.4],[-97.1,25.9],[-97.9,22.4],[-97.2,20.6],[-95.9,18.8],[-94.4,18.1],[-91.4,18.9],[-90.8,19.3],[-90.3,21],[-87.1,21.5],[-86.8,20.8],[-87.6,19.6],[-87.8,18.3],[-88.5,18.5],[-88.8,17.9],[-91,17.8],[-91,17.3],[-91.5,17.3],[-90.5,16.1],[-91.7,16.1],[-92.2,14.5],[-93.9,15.9],[-94.7,16.2],[-96.6,15.7],[-103.5,18.3],[-105.5,19.9],[-105.7,20.4],[-105.4,20.5],[-105.3,21.4],[-106,22.8],[-108.4,25.2],[-109.3,25.6],[-109.3,26.4],[-110.4,27.2],[-110.6,27.9],[-112.2,29],[-113.1,31.2],[-114.8,31.8],[-114.7,30.2],[-111.6,26.7],[-110.7,24.3],[-110.2,24.3],[-109.4,23.4],[-110,22.8],[-110.3,23.4],[-112.2,24.7],[-112.3,26],[-115.1,27.7],[-114.6,27.7],[-114.2,28.6],[-115.5,29.6],[-117.1,32.5]],[[-57.6,-30.2],[-57,-30.1],[-53.8,-32],[-53.2,-32.7],[-53.7,-33.2],[-53.4,-33.8],[-53.8,-34.4],[-54.9,-35],[-56.2,-34.9],[-57.8,-34.5],[-58.4,-33.9],[-57.6,-30.2]],[[-53.4,-33.8],[-53.7,-33.2],[-53.2,-32.7],[-53.8,-32],[-57,-30.1],[-57.6,-30.2],[-53.6,-26.9],[-53.6,-26.1],[-54.1,-25.5],[-54.6,-25.7],[-54.3,-24],[-55.4,-24],[-55.8,-22.4],[-57.9,-22.1],[-58.2,-20.2],[-57.5,-18.2],[-58.3,-17.3],[-58.2,-16.3],[-60.2,-16.3],[-60.5,-13.8],[-64.3,-12.5],[-65.4,-11.6],[-65.3,-9.8],[-66.6,-9.9],[-68.3,-11],[-70.5,-11],[-70.5,-9.5],[-71.3,-10.1],[-72.2,-10.1],[-72.6,-9.5],[-73.2,-9.5],[-73,-9],[-74,-7.5],[-73.1,-6.6],[-72.9,-5.3],[-70.8,-4.3],[-69.9,-4.3],[-69.4,-1.1],[-70,.5],[-69.3,.6],[-69.2,1],[-69.8,1.1],[-69.8,1.7],[-67.9,1.7],[-67.5,2],[-67.1,1.1],[-65.5,.8],[-63.4,2.2],[-64.3,2.5],[-64.4,3.8],[-64.8,4.1],[-63.1,3.8],[-61,4.5],[-60.7,5.2],[-60,5],[-60.1,4.6],[-59.5,4],[-60,2.8],[-59.6,1.8],[-59,1.3],[-57.3,1.9],[-56,1.8],[-56,2.5],[-52.9,2.1],[-51.3,4.2],[-50.5,1.9],[-50,1.7],[-49.9,1],[-50.7,.2],[-50.4,-.1],[-48.6,-.2],[-48.6,-1.2],[-47.8,-.6],[-44.9,-1.6],[-44.4,-2.1],[-44.6,-2.7],[-43.4,-2.4],[-40,-2.9],[-37.2,-4.8],[-35.6,-5.1],[-34.7,-7.3],[-35.1,-9],[-38.7,-13.1],[-39.3,-17.9],[-40.9,-21.9],[-41.8,-22.4],[-42,-23],[-44.6,-23.4],[-47.6,-24.9],[-48.5,-25.9],[-48.9,-28.7],[-53.4,-33.8]],[[-69.5,-11],[-68.3,-11],[-66.6,-9.9],[-65.3,-9.8],[-65.4,-11.6],[-64.3,-12.5],[-60.5,-13.8],[-60.2,-16.3],[-58.2,-16.3],[-58.3,-17.3],[-57.5,-18.2],[-57.9,-20],[-58.2,-20.2],[-59.1,-19.4],[-61.8,-19.6],[-62.7,-22.2],[-64,-22],[-64.4,-22.8],[-65,-22.1],[-66.3,-21.8],[-67.1,-22.7],[-67.8,-22.9],[-68.8,-20.4],[-68.4,-19.4],[-69.6,-17.6],[-69,-16.5],[-69.3,-15],[-68.7,-12.6],[-69.5,-11]],[[-69.9,-4.3],[-70.8,-4.3],[-72.9,-5.3],[-73.1,-6.6],[-74,-7.5],[-73,-9],[-73.2,-9.5],[-72.6,-9.5],[-72.2,-10.1],[-71.3,-10.1],[-70.5,-9.5],[-70.5,-11],[-69.5,-11],[-68.7,-12.6],[-69.3,-15],[-69,-16.5],[-69.9,-18.1],[-70.4,-18.3],[-76,-14.6],[-76.3,-13.5],[-79.8,-7.2],[-81.2,-6.1],[-80.9,-5.7],[-81.4,-4.7],[-80.3,-3.4],[-80.4,-4.4],[-79.6,-4.5],[-79.2,-5],[-78.6,-4.5],[-77.8,-3],[-76.6,-2.6],[-75.5,-1.6],[-75.1,-.1],[-73.7,-1.3],[-73.1,-2.3],[-70.8,-2.3],[-70,-2.7],[-70.7,-3.7],[-69.9,-4.3]],[[-66.9,1.3],[-67.5,2],[-67.9,1.7],[-69.8,1.7],[-69.8,1.1],[-69.2,1],[-69.3,.6],[-70,.5],[-69.4,-1.1],[-69.9,-4.3],[-70.7,-3.7],[-70,-2.7],[-70.8,-2.3],[-73.1,-2.3],[-73.7,-1.3],[-75.1,-.1],[-77.4,.4],[-79,1.7],[-77.1,3.8],[-77.5,4.1],[-77.3,5.8],[-77.9,7.2],[-77.2,7.9],[-77.5,8.5],[-75.7,9.4],[-75.5,10.6],[-74.9,11.1],[-73.4,11.2],[-71.4,12.4],[-71.3,11.8],[-72,11.6],[-72.9,10.5],[-73.3,9.2],[-72.8,9.1],[-72.4,7.4],[-72,7],[-70.1,7],[-69.4,6.1],[-67.3,6.1],[-67.8,4.5],[-67.3,3.3],[-67.8,2.8],[-66.9,1.3]],[[-77.4,8.7],[-77.2,7.9],[-77.9,7.2],[-78.4,8.1],[-78.2,8.3],[-79.1,9],[-80.4,8.3],[-80,7.5],[-80.9,7.2],[-81.1,7.8],[-81.5,7.7],[-81.7,8.1],[-82.9,8.1],[-82.9,9.5],[-81.4,8.8],[-79,9.6],[-77.4,8.7]],[[-82.5,9.6],[-82.9,9.5],[-83,8.2],[-85,10.1],[-85.1,9.6],[-85.7,9.9],[-85.9,10.9],[-85.6,11.2],[-83.7,10.9],[-82.5,9.6]],[[-83.7,10.9],[-85.7,11.1],[-87.7,12.9],[-86.7,13.3],[-86.8,13.8],[-85.8,13.8],[-84.9,14.8],[-83.1,15],[-83.9,11.4],[-83.7,10.9]],[[-83.1,15],[-84.9,14.8],[-85.8,13.8],[-86.8,13.8],[-86.7,13.3],[-87.3,13],[-87.9,13.9],[-88.5,13.8],[-89.4,14.4],[-89.2,15.1],[-87.9,15.9],[-85,16],[-83.1,15]],[[-89.4,14.4],[-87.7,13.8],[-87.9,13.1],[-90.1,13.7],[-89.4,14.4]],[[-92.2,14.5],[-91.7,16.1],[-90.5,16.1],[-91.5,17.3],[-91,17.3],[-91,17.8],[-89.1,17.8],[-89.2,15.9],[-88.2,15.7],[-89.2,15.1],[-89.4,14.4],[-90.1,13.7],[-92.2,14.5]],[[-89.1,17.8],[-88.5,18.5],[-88.1,18.3],[-88.4,16.5],[-88.9,15.9],[-89.2,15.9],[-89.1,17.8]],[[-60.7,5.2],[-61,4.5],[-63.1,3.8],[-64.8,4.1],[-64.4,3.8],[-64.3,2.5],[-63.4,2.2],[-65.5,.8],[-66.3,.7],[-67.8,2.8],[-67.3,3.3],[-67.8,4.5],[-67.3,6.1],[-69.4,6.1],[-70.1,7],[-72,7],[-72.4,7.4],[-72.8,9.1],[-73.3,9.2],[-72.9,10.5],[-72,11.6],[-71.3,11.8],[-71.9,11.4],[-71.6,10.4],[-72.1,9.9],[-71.7,9.1],[-71.3,9.1],[-71,9.9],[-71.4,11],[-70.2,11.4],[-70.3,11.8],[-69.9,12.2],[-69.6,11.5],[-68.9,11.4],[-68.2,10.6],[-66.2,10.6],[-64.9,10.1],[-64.3,10.6],[-61.9,10.7],[-62.7,10.4],[-62.4,9.9],[-61.6,9.9],[-60.8,9.4],[-60.7,8.6],[-59.8,8.4],[-60.6,7.8],[-60.3,7],[-61.2,6.7],[-61.4,6],[-60.7,5.2]],[[-56.5,1.9],[-57.3,1.9],[-58.5,1.3],[-59.6,1.8],[-60,2.8],[-59.5,4],[-60.1,4.6],[-60,5],[-60.7,5.2],[-61.4,6],[-61.2,6.7],[-60.3,7],[-60.6,7.8],[-59.8,8.4],[-57.1,6],[-58,4.1],[-56.5,1.9]],[[-54.5,2.3],[-56,2.5],[-56,1.8],[-56.5,1.9],[-57.3,3.3],[-57.6,3.3],[-58,4.1],[-57.1,6],[-54,5.8],[-54.5,4.9],[-54,3.6],[-54.5,2.3]],[[-51.7,4.2],[-52.9,2.1],[-54.5,2.3],[-54,3.6],[-54.5,4.9],[-54,5.8],[-52.9,5.4],[-51.7,4.2]],[[6.2,49.5],[8.1,49],[7.5,47.6],[6.7,47.5],[6,46.7],[6,46.3],[6.5,46.4],[6.8,46],[7.1,45.3],[6.7,45],[7,44.3],[7.5,44.1],[7.4,43.7],[6.5,43.1],[4.6,43.4],[3.1,43.1],[3,42.5],[1.8,42.3],[-1.5,43],[-1.9,43.4],[-1.4,44],[-1.2,46],[-3,47.6],[-4.5,48],[-4.6,48.7],[-1.6,48.6],[-1.9,49.8],[-1,49.3],[1.3,50.1],[1.6,50.9],[2.5,51.1],[4.3,49.9],[6.2,49.5]],[[8.7,42.6],[9.4,43],[9.6,42.2],[9.2,41.4],[8.8,41.6],[8.7,42.6]],[[-75.4,-.2],[-75.5,-1.6],[-76.6,-2.6],[-77.8,-3],[-78.6,-4.5],[-79.2,-5],[-79.6,-4.5],[-80.4,-4.4],[-79.8,-2.7],[-80,-2.2],[-80.4,-2.7],[-81,-2.2],[-80.9,-1.1],[-80.6,-.9],[-80.1,.8],[-78.9,1.4],[-77.4,.4],[-76.3,.4],[-75.4,-.2]],[[-66.3,18.5],[-65.6,18.2],[-65.8,18],[-67.2,17.9],[-67.1,18.5],[-66.3,18.5]],[[-77.6,18.5],[-76.2,17.9],[-77.8,17.9],[-78.3,18.2],[-77.6,18.5]],[[-82.3,23.2],[-80.6,23.1],[-79.3,22.4],[-78.3,22.5],[-76.5,21.2],[-75.6,21],[-75.7,20.7],[-74.2,20.3],[-75,19.9],[-77.8,19.9],[-77.1,20.4],[-78.1,20.7],[-78.7,21.6],[-81.8,22.2],[-82.2,22.4],[-81.8,22.6],[-82.8,22.7],[-84.1,21.9],[-85,21.9],[-83.8,22.8],[-82.3,23.2]],[[31.2,-22.3],[29.4,-22.1],[28,-21.5],[27.7,-20.5],[26.2,-19.3],[25.3,-17.7],[27,-17.9],[28.9,-16],[30.3,-15.5],[30.3,-15.9],[31.2,-15.9],[32.8,-16.7],[32.7,-20.3],[31.2,-22.3]],[[29.4,-22.1],[27.1,-23.6],[26.5,-24.6],[25.9,-24.7],[25.7,-25.5],[24.2,-25.7],[23.3,-25.3],[21.6,-26.7],[20.9,-26.8],[20.8,-25.9],[19.9,-24.8],[19.9,-21.8],[20.9,-21.8],[20.9,-18.3],[23.2,-17.9],[23.6,-18.3],[25.3,-17.7],[26.2,-19.3],[27.7,-20.5],[28,-21.5],[29.4,-22.1]],[[19.9,-24.8],[19.9,-28.5],[18.5,-29],[17.4,-28.8],[16.8,-28.1],[16.3,-28.6],[15.2,-27.1],[14.3,-22.1],[11.8,-18.1],[11.7,-17.3],[13.5,-17],[14.1,-17.4],[18.3,-17.3],[19,-17.8],[21.4,-17.9],[24,-17.3],[25.1,-17.6],[23.6,-18.3],[23.2,-17.9],[20.9,-18.3],[20.9,-21.8],[19.9,-21.8],[19.9,-24.8]],[[-16.7,13.6],[-17.6,14.7],[-16.1,16.5],[-14.6,16.6],[-13.4,16],[-12.2,14.6],[-11.5,12.4],[-16.7,12.4],[-16.8,13.2],[-13.8,13.5],[-15.1,13.9],[-16.7,13.6]],[[-11.5,12.4],[-12.2,14.6],[-11.7,15.4],[-10.7,15.1],[-9.6,15.5],[-5.5,15.5],[-5.3,16.2],[-6.5,25],[-4.9,25],[3.1,19.7],[3.2,19.1],[4.3,19.2],[4.3,16.9],[3.6,15.6],[1.4,15.3],[1,15],[-1.1,15],[-3.1,13.5],[-4,13.5],[-5.2,11.7],[-5.4,10.4],[-8,10.2],[-9.1,12.3],[-10.2,11.8],[-11.5,12.1],[-11.5,12.4]],[[-17.1,21],[-16.8,21.3],[-12.9,21.3],[-12.9,23.3],[-11.9,23.4],[-12,25.9],[-8.7,25.9],[-8.7,27.4],[-4.9,25],[-6.5,25],[-5.3,16.2],[-5.5,15.5],[-9.6,15.5],[-10.7,15.1],[-11.7,15.4],[-12.2,14.6],[-13.4,16],[-14.6,16.6],[-16.5,16.1],[-16.3,20.1],[-17.1,21]],[[2.7,6.3],[1.9,6.1],[1.7,9.1],[.8,10.5],[1.4,11.5],[2.8,12.2],[3.6,11.7],[3.8,10.7],[2.7,8.5],[2.7,6.3]],[[14.9,22.9],[15.1,21.3],[15.9,20.4],[15.2,16.6],[14,15.7],[13.5,14.4],[14,13.4],[14.6,13.3],[14.2,12.5],[13.1,13.6],[12.3,13],[11,13.4],[9,12.8],[7.8,13.3],[6.8,13.1],[5.4,13.9],[4.1,13.5],[3.6,11.7],[2.8,12.2],[2.2,11.9],[2.2,12.6],[1,12.9],[.4,14.9],[3.6,15.6],[4.3,16.9],[4.3,19.2],[5.7,19.6],[12,23.5],[13.6,23],[14.1,22.5],[14.9,22.9]],[[2.7,6.3],[2.7,8.5],[3.7,10.1],[3.7,12.6],[4.4,13.7],[5.4,13.9],[6.8,13.1],[7.8,13.3],[9,12.8],[11,13.4],[12.3,13],[13.1,13.6],[14.6,12.1],[13.6,10.8],[11.7,7],[11.1,6.6],[10.1,7],[9.2,6.4],[8.5,4.8],[5.9,4.3],[4.3,6.3],[2.7,6.3]],[[14.5,12.9],[15.5,10],[14.2,10],[14,9.5],[15,8.8],[15.4,7.7],[14.5,6.2],[14.5,4.7],[15.9,3],[15.9,1.7],[14.3,2.2],[9.6,2.3],[9.8,3.1],[8.5,4.5],[8.8,5.5],[9.2,6.4],[10.1,7],[11.1,6.6],[11.7,7],[13.6,10.8],[14.4,11.6],[14.6,12.1],[14.2,12.5],[14.5,12.9]],[[.9,11],[.8,10.5],[1.7,9.1],[1.9,6.1],[1.1,5.9],[.6,6.9],[.4,10.2],[-0,10.7],[0,11],[.9,11]],[[0,11],[.7,8.3],[.6,6.9],[1.1,5.9],[-2,4.7],[-2.9,5],[-3.2,6.3],[-2.6,8.2],[-2.9,11],[0,11]],[[-8,10.2],[-6.9,10.1],[-6.2,10.5],[-6.1,10.1],[-5.4,10.4],[-4.3,9.6],[-3.5,9.9],[-2.8,9.6],[-2.6,8.2],[-3.2,6.3],[-2.9,5],[-4.6,5.2],[-7.7,4.4],[-7.6,5.7],[-8.6,6.5],[-8.3,8.3],[-7.8,8.6],[-8.3,9.8],[-8,10.2]],[[-13.7,12.6],[-11.5,12.4],[-11.5,12.1],[-10.2,11.8],[-9.1,12.3],[-8,10.2],[-8.3,9.8],[-7.8,8.6],[-8.3,8.3],[-8.3,7.7],[-9.2,7.3],[-9.8,8.5],[-10.5,8.3],[-11.1,10],[-12.4,9.8],[-13.2,8.9],[-15.1,11],[-13.7,11.8],[-13.7,12.6]],[[-16.7,12.4],[-13.7,12.6],[-13.7,11.8],[-15.1,11],[-16.1,11.5],[-16.7,12.4]],[[-8.4,7.7],[-8.6,6.5],[-7.6,5.7],[-7.7,4.4],[-9,4.8],[-11.4,6.8],[-10.2,8.4],[-9.8,8.5],[-9.2,7.3],[-8.4,7.7]],[[-13.2,8.9],[-12.4,9.8],[-11.1,10],[-10.5,8.3],[-10.2,8.4],[-11.4,6.8],[-12.9,7.8],[-13.2,8.9]],[[-5.4,10.4],[-5.2,11.7],[-4.3,13.2],[-3.1,13.5],[-1.1,15],[.4,14.9],[1,12.9],[2.2,12.6],[1.9,11.6],[.9,11],[-2.9,11],[-2.8,9.6],[-3.5,9.9],[-4.3,9.6],[-5.4,10.4]],[[27.4,5.2],[24.4,5.1],[22.8,4.7],[22.4,4],[19.5,5],[18.5,4.2],[18.5,3.5],[17.1,3.7],[16,2.3],[15.9,3],[14.5,4.7],[14.5,5.5],[15.3,7.4],[18,7.9],[18.9,8.6],[18.8,9],[21,9.5],[21.7,10.6],[22.9,11.1],[23.6,10.1],[23.5,9],[25.1,7.8],[27.4,5.2]],[[18.5,3.5],[17.6,-.4],[16.4,-1.7],[16,-3.5],[14.6,-5],[14.1,-4.5],[13.3,-4.9],[12.6,-4.4],[11.9,-5],[11.1,-4],[11.9,-3.4],[11.5,-2.8],[12.5,-2.4],[12.6,-1.9],[13.1,-2.4],[14,-2.5],[14.4,-1.3],[13.8,0],[14.3,1.2],[13.3,1.3],[13.1,2.3],[15.9,1.7],[17.1,3.7],[18.5,3.5]],[[11.3,2.3],[13,2.3],[13.3,1.3],[14.3,1.2],[13.8,0],[14.4,-1.3],[14,-2.5],[13.1,-2.4],[12.6,-1.9],[12.5,-2.4],[11.5,-2.8],[11.9,-3.4],[11.1,-4],[8.8,-1.1],[9.5,1],[11.3,1.1],[11.3,2.3]],[[9.6,2.3],[11.3,2.3],[11.3,1.1],[9.5,1],[9.6,2.3]],[[30.7,-8.3],[33.2,-9.7],[33.3,-12.4],[32.7,-13.7],[33.2,-14],[30.2,-14.8],[30.3,-15.5],[28.9,-16],[27,-17.9],[24.7,-17.4],[23.2,-17.5],[21.9,-16.1],[21.9,-12.9],[24,-12.9],[23.9,-10.9],[25.4,-11.3],[25.8,-11.8],[27.2,-11.6],[28.9,-13.2],[29.7,-13.3],[29.6,-12.2],[29.3,-12.4],[28.4,-11.8],[28.4,-9.2],[29,-8.4],[30.7,-8.3]],[[32.8,-9.2],[33.7,-9.4],[34.3,-10.2],[34.6,-13.6],[35.3,-13.9],[35.7,-14.6],[35.8,-15.9],[35,-16.8],[34.4,-16.2],[34.5,-14.6],[32.7,-13.7],[33.3,-12.4],[33.1,-11.6],[33.5,-10.5],[32.8,-9.2]],[[34.6,-11.5],[37.5,-11.6],[40.3,-10.3],[40.8,-14.7],[39.5,-16.7],[37.4,-17.6],[34.8,-19.8],[34.7,-20.5],[35.6,-22.1],[35.5,-24.1],[33,-25.4],[32.6,-25.7],[32.8,-26.7],[32.1,-26.7],[31.9,-24.4],[31.2,-22.3],[32.7,-20.3],[32.8,-16.7],[31.2,-15.9],[30.3,-15.9],[30.2,-14.8],[33.2,-14],[34.5,-14.6],[34.4,-16.2],[35,-16.8],[35.8,-15.9],[35.7,-14.6],[35.3,-13.9],[34.6,-13.6],[34.3,-12.3],[34.6,-11.5]],[[32.1,-26.7],[31.3,-27.3],[30.7,-26.7],[31,-25.7],[31.8,-25.8],[32.1,-26.7]],[[13,-4.8],[12.2,-5.8],[11.9,-5],[12.6,-4.4],[13,-4.8]],[[12.3,-6.1],[16.3,-5.9],[17.5,-8.1],[19,-8],[19.4,-7.2],[20.1,-6.9],[20.6,-6.9],[20.5,-7.3],[21.7,-7.3],[22.2,-11.1],[23.5,-10.9],[24,-11.2],[24,-12.9],[21.9,-12.9],[21.9,-16.1],[23.2,-17.5],[21.4,-17.9],[19,-17.8],[18.3,-17.3],[14.1,-17.4],[13.5,-17],[11.7,-17.3],[12.2,-14.4],[13.7,-11.3],[12.9,-9.2],[13.2,-8.6],[12.3,-6.1]],[[30.5,-2.4],[30.8,-3.4],[29.3,-4.5],[29,-2.8],[30.5,-2.4]],[[35.7,32.7],[35.2,32.5],[35,31.9],[35.2,31.8],[34.9,31.4],[35.4,31.5],[35.4,31.1],[34.9,29.5],[34.3,31.2],[35.1,33.1],[35.8,33.3],[35.7,32.7]],[[35.8,33.3],[35.1,33.1],[35.5,33.9],[36,34.6],[36.4,34.6],[36.6,34.2],[35.8,33.3]],[[49.5,-12.5],[50.4,-15.7],[50.2,-16],[49.9,-15.4],[49.7,-15.7],[49.8,-16.9],[47.1,-24.9],[45.4,-25.6],[44,-25],[43.3,-22.8],[43.4,-21.3],[43.9,-21.2],[44.5,-19.4],[44,-17.4],[44.4,-16.2],[46.3,-15.8],[47.7,-14.6],[47.9,-13.7],[48.3,-13.8],[49.2,-12],[49.5,-12.5]],[[35.4,31.5],[34.9,31.4],[35.2,32.5],[35.5,32.4],[35.4,31.5]],[[-16.7,13.6],[-15.1,13.9],[-13.8,13.5],[-16.8,13.2],[-16.7,13.6]],[[9.5,30.3],[9.1,32.1],[7.6,33.3],[7.5,34.1],[8.1,34.7],[8.4,36.9],[9.5,37.3],[10.2,37.2],[10.2,36.7],[11,37.1],[10.6,36.4],[10.8,34.8],[10.1,34.3],[10.3,33.8],[11.5,33.1],[11.4,32.4],[10,31.4],[10,30.5],[9.5,30.3]],[[-8.7,27.4],[-8.7,28.8],[-5.2,30],[-3.7,30.9],[-3.6,31.6],[-1.3,32.3],[-1.1,32.7],[-2.2,35.2],[-1.2,35.7],[1.5,36.6],[5.3,36.7],[6.3,37.1],[8.4,36.9],[8.1,34.7],[7.5,34.1],[7.6,33.3],[9.1,32.1],[9.8,29.4],[9.7,26.5],[9.3,26.1],[10.3,24.4],[10.8,24.6],[12,23.5],[5.7,19.6],[3.2,19.1],[3.1,19.7],[-8.7,27.4]],[[35.5,32.4],[35.7,32.7],[36.8,32.3],[38.8,33.4],[39.2,32.2],[37,31.5],[38,30.5],[36.1,29.2],[34.9,29.5],[35.5,32.4]],[[51.6,24.2],[54,24.1],[56.1,26.1],[56.3,25.7],[56.4,24.9],[55.9,24.9],[56,24.1],[55.5,23.9],[55,22.5],[52,23],[51.6,24.2]],[[50.8,24.8],[50.7,25.5],[51.3,26.1],[51.6,25.2],[51.4,24.6],[50.8,24.8]],[[48,30],[48.4,28.6],[46.6,29.1],[47.3,30.1],[48,30]],[[39.2,32.2],[38.8,33.4],[41,34.4],[41.3,36.4],[42.8,37.4],[44.8,37.2],[45.4,36],[46.1,35.7],[46.2,35.1],[45.4,34],[46.1,33],[47.3,32.5],[47.8,31.7],[47.7,31],[48.6,29.9],[47.3,30.1],[46.6,29.1],[44.7,29.2],[41.9,31.2],[39.2,32.2]],[[55.2,22.7],[55.5,23.9],[56,24.1],[55.9,24.9],[56.4,24.9],[57.4,23.9],[58.7,23.6],[59.8,22.3],[58.5,20.4],[57.8,20.2],[57.7,18.9],[56.6,18.6],[56.3,17.9],[55.7,17.9],[54.8,17],[53.1,16.7],[52,19],[55,20],[55.7,22],[55.2,22.7]],[[167.2,-15.9],[167.8,-16.5],[167.5,-16.6],[167.2,-15.9]],[[166.8,-15.7],[166.6,-14.6],[167.1,-14.9],[167.3,-15.7],[166.8,-15.7]],[[102.6,12.2],[102.3,13.4],[103,14.2],[104.3,14.4],[106,13.9],[106.5,14.6],[107.4,14.2],[107.6,13.5],[107.5,12.3],[105.8,11.6],[106.2,11],[103.5,10.6],[102.6,12.2]],[[105.2,14.3],[103,14.2],[102.3,13.4],[102.6,12.2],[100.8,12.6],[101,13.4],[100.1,13.4],[99.2,9.2],[99.9,9.2],[100.5,7.4],[102.1,6.2],[101.2,5.7],[101.1,6.2],[100.1,6.5],[98.5,8.4],[98.3,7.8],[98.2,8.4],[99.6,11.9],[99.1,13.8],[98.2,15.1],[98.9,16.2],[97.4,18.4],[98.3,19.7],[100.1,20.4],[100.6,19.5],[101.3,19.5],[101.1,17.5],[102.1,18.1],[103,18],[103.2,18.3],[104,18.2],[104.7,17.4],[104.8,16.4],[105.6,15.6],[105.2,14.3]],[[107.4,14.2],[106.5,14.6],[106,13.9],[105.2,14.3],[105.6,15.6],[104,18.2],[102.1,18.1],[101.1,17.5],[101.3,19.5],[100.6,19.5],[100.1,20.4],[101.2,21.4],[101.8,21.2],[101.7,22.3],[102.2,22.5],[103.2,20.8],[104.4,20.8],[104.8,19.9],[103.9,19.3],[105.1,18.7],[107.3,15.9],[107.4,14.2]],[[100.1,20.4],[98.3,19.7],[97.4,18.4],[98.9,16.2],[98.2,15.1],[99.1,13.8],[99.6,11.9],[98.6,9.9],[98.5,13.1],[97.2,16.9],[95.4,15.7],[94.2,16],[94.5,17.3],[94.3,18.2],[93.5,19.4],[93.7,19.7],[92.4,20.7],[92.3,21.5],[92.7,21.3],[92.7,22],[93.2,22.3],[93.3,24.1],[94.1,23.9],[95.1,26.6],[96.4,27.3],[97.1,27.1],[97.3,28.3],[97.9,28.3],[98.7,27.5],[98.7,25.9],[97.7,25.1],[97.6,23.9],[98.7,24.1],[98.9,23.1],[99.5,22.9],[99.2,22.1],[100.4,21.6],[101.2,21.8],[101.2,21.4],[100.1,20.4]],[[104.3,10.5],[106.2,11],[105.8,11.6],[107.5,12.3],[107.6,15.2],[105.1,18.7],[103.9,19.3],[104.8,19.9],[104.4,20.8],[103.2,20.8],[102.2,22.5],[104.5,22.8],[105.3,23.4],[106.7,22.8],[106.6,22.2],[107,21.8],[108.1,21.6],[106.7,20.7],[105.7,19.1],[108.9,15.3],[109.3,13.4],[109.2,11.7],[105.2,8.6],[104.8,9.2],[105.1,9.9],[104.3,10.5]],[[130.6,42.4],[129.7,41.6],[129.7,40.9],[127.5,39.8],[127.4,39.2],[128.3,38.6],[128.2,38.4],[125.3,37.7],[124.7,38.1],[125.4,39.4],[124.3,39.9],[125.1,40.6],[126.9,41.8],[128.2,41.5],[128.1,42],[129.6,42.4],[130,43],[130.6,42.4]],[[126.2,37.7],[128.3,38.6],[129.5,36.8],[129.5,35.6],[129.1,35.1],[126.5,34.4],[126.6,35.7],[126.1,36.7],[126.9,36.9],[126.2,37.7]],[[87.8,49.3],[92.2,50.8],[97.3,49.7],[98.2,50.4],[97.8,51],[98.9,52],[102.1,51.3],[102.3,50.5],[103.7,50.1],[106.9,50.3],[108.5,49.3],[110.7,49.1],[112.9,49.5],[114.4,50.2],[115.5,49.8],[116.7,49.9],[115.5,48.1],[115.7,47.7],[117.3,47.7],[118.1,48.1],[119.8,47],[119.7,46.7],[117.4,46.7],[113.5,44.8],[111.9,45.1],[111.3,44.5],[111.8,43.7],[110.4,42.9],[106.1,42.1],[105,41.6],[100.8,42.7],[96.3,42.7],[95.3,44.2],[93.5,45],[90.9,45.3],[90.6,45.7],[91,46.9],[90.3,47.7],[88,48.6],[87.8,49.3]],[[97.3,28.3],[97.1,27.1],[96.4,27.3],[95.1,26.6],[94.1,23.9],[93.3,24.1],[93.2,22.3],[92.7,22],[92.1,23.6],[91.7,23],[91.2,23.5],[92.4,25],[89.9,25.3],[89.8,26],[88.6,26.4],[88.2,25.8],[88.9,25.2],[88.1,24.5],[88.7,24.2],[88.9,21.7],[87,21.5],[87,20.7],[86.5,20.2],[85.1,19.5],[82.2,17],[82.2,16.6],[80.3,15.9],[79.9,10.4],[79.3,10.3],[78.9,9.5],[79.2,9.2],[78.3,8.9],[77.5,8],[76.6,8.9],[74.9,12.7],[74.4,14.6],[73.5,16],[72.6,21.4],[71.2,20.8],[70.5,20.9],[69.2,22.1],[69.6,22.5],[69.3,22.8],[68.2,23.7],[68.8,24.4],[71,24.4],[70.2,26.5],[69.5,26.9],[70.6,28],[71.8,27.9],[74.4,31],[74.4,31.7],[75.3,32.3],[74.5,32.8],[73.7,34.3],[74.2,34.7],[76.9,34.7],[77.8,35.5],[78.9,34.3],[78.8,33.5],[79.2,33],[79.2,32.5],[78.5,32.6],[78.7,31.5],[81.1,30.2],[80.1,28.8],[83.3,27.4],[88.1,26.4],[88.1,27.9],[88.7,28.1],[88.8,27.1],[89.7,26.7],[92,26.8],[92.1,27.5],[91.7,27.8],[92.5,27.9],[94.6,29.3],[95.4,29],[96.1,29.5],[96.6,28.8],[96.2,28.4],[97.3,28.3]],[[92.7,22],[92.4,20.7],[91.4,22.8],[90.5,22.8],[90.3,21.8],[89,22.1],[88.5,23.6],[88.7,24.2],[88.1,24.5],[88.9,25.2],[88.2,25.8],[88.6,26.4],[89.8,26],[89.9,25.3],[92.4,25],[91.2,23.5],[91.7,23],[92.1,23.6],[92.7,22]],[[91.7,27.8],[92.1,27.5],[92,26.8],[89.7,26.7],[88.8,27.1],[90,28.3],[91.7,27.8]],[[88.1,27.9],[88.1,26.4],[87.2,26.4],[83.3,27.4],[80.1,28.8],[80.5,29.7],[81.5,30.4],[85.8,28.2],[88.1,27.9]],[[77.8,35.5],[76.9,34.7],[74.2,34.7],[73.7,34.3],[74.5,32.8],[75.3,32.3],[74.4,31.7],[74.4,31],[71.8,27.9],[70.6,28],[69.5,26.9],[70.2,26.5],[71,24.4],[68.8,24.4],[68.2,23.7],[67.4,23.9],[66.4,25.4],[61.5,25.1],[61.9,26.2],[63.3,26.8],[62.8,27.4],[62.7,28.3],[61.8,28.7],[60.9,29.8],[62.5,29.3],[66.3,29.9],[66.4,30.7],[66.9,31.3],[69.3,31.9],[69.3,32.5],[70.3,33.4],[69.9,34],[70.9,34],[71.6,35.2],[71.3,36.1],[71.8,36.5],[75.2,37.1],[75.9,36.7],[76.2,35.9],[77.8,35.5]],[[66.5,37.4],[69.2,37.2],[69.5,37.6],[70.1,37.6],[70.8,38.5],[71.3,38.3],[71.4,37.1],[71.8,36.7],[73.3,37.5],[75.2,37.1],[71.8,36.5],[71.3,36.1],[71.6,35.2],[70.9,34],[69.9,34],[70.3,33.4],[69.3,32.5],[69.3,31.9],[66.9,31.3],[66.4,30.7],[66.3,29.9],[62.5,29.3],[60.9,29.8],[61.8,30.7],[61.7,31.4],[60.9,31.5],[60.5,33],[61,33.5],[60.5,33.7],[61.2,35.7],[63,35.4],[63.2,35.9],[64.5,36.3],[64.7,37.1],[65.7,37.7],[66.5,37.4]],[[67.8,37.1],[68.4,38.2],[68.2,38.9],[67.4,39.1],[67.7,39.6],[68.5,39.5],[69.3,40.7],[70.7,41],[70.5,40.5],[71,40.2],[70.6,39.9],[69.6,40.1],[69.5,39.5],[73.7,39.4],[73.9,38.5],[74.9,38.4],[75,37.4],[73.3,37.5],[71.8,36.7],[71.4,37.1],[71.3,38.3],[70.8,38.5],[70.1,37.6],[69.5,37.6],[69.2,37.2],[67.8,37.1]],[[71,42.3],[71.8,42.8],[73.5,42.5],[73.6,43.1],[74.2,43.3],[75.6,42.9],[79.1,42.9],[80.3,42.3],[78.2,41.2],[76.9,41.1],[76.5,40.4],[75.5,40.6],[73.8,39.9],[73.7,39.4],[71.8,39.3],[69.5,39.5],[69.6,40.1],[71.8,40.1],[73.1,40.9],[70.4,41.5],[71.3,42.2],[71,42.3]],[[52.5,41.8],[54.1,42.3],[55.5,41.3],[57.1,41.3],[56.9,41.8],[58.6,42.8],[60,42.2],[60.1,41.4],[60.5,41.2],[61.9,41.1],[62.4,40.1],[64.2,38.9],[66.5,38],[66.5,37.4],[65.7,37.7],[64.7,37.1],[64.5,36.3],[62.2,35.3],[61.2,35.7],[61.1,36.5],[57.3,38],[55.5,38],[53.9,37.2],[53.9,39],[53.1,39.3],[53.4,40],[52.7,40],[52.9,40.9],[53.9,40.6],[54.7,41],[53.7,42.1],[52.9,41.9],[52.8,41.1],[52.5,41.8]],[[48.6,29.9],[47.7,31],[47.8,31.7],[47.3,32.5],[46.1,33],[45.4,34],[46.2,35.1],[46.1,35.7],[45.4,36],[44.2,38],[44.1,39.4],[44.8,39.7],[45.5,38.9],[46.1,38.7],[48.1,39.6],[48.4,39.3],[48,38.8],[48.9,38.3],[49.2,37.6],[52.3,36.7],[53.8,37],[55.5,38],[57.3,38],[61.1,36.5],[61.2,35.7],[60.5,33.7],[61,33.5],[60.5,33],[60.9,31.5],[61.7,31.4],[61.8,30.7],[60.9,29.8],[61.8,28.7],[62.7,28.3],[62.8,27.4],[63.3,26.8],[61.9,26.2],[61.5,25.1],[57.4,25.7],[57,27],[56.5,27.1],[54.7,26.5],[53.5,26.8],[51.5,27.9],[50.1,30.1],[48.9,30.3],[48.6,29.9]],[[35.7,32.7],[36.1,33.8],[36.6,34.2],[36,34.6],[35.9,35.4],[36.7,36.8],[39.5,36.7],[42.3,37.2],[41.3,36.4],[41,34.4],[36.8,32.3],[35.7,32.7]],[[46.5,38.8],[46.1,38.7],[45.7,39.5],[43.7,40.3],[43.6,41.1],[45,41.2],[45.6,40.8],[45.4,40.6],[45.9,40.2],[45.6,39.9],[46.5,39.5],[46.5,38.8]],[[11,58.9],[12.3,60.1],[12.6,61.3],[12,61.8],[11.9,63.1],[12.6,64.1],[13.6,64],[13.9,64.4],[13.6,64.8],[16.8,68],[17.7,68],[18,68.6],[19.9,68.4],[20,69.1],[20.6,69.1],[23.5,67.9],[23.6,66.4],[23.9,66],[22.2,65.7],[21.2,65],[21.4,64.4],[17.8,62.7],[17.1,61.3],[18.8,60.1],[17.9,59],[16.8,58.7],[15.9,56.1],[14.7,56.2],[14.1,55.4],[12.9,55.4],[11,58.9]],[[28.2,56.2],[30.9,55.6],[30.8,54.8],[32.7,53.4],[31.3,53.1],[31.8,52.1],[30.9,52],[30.6,51.3],[25.3,51.9],[23.5,51.6],[23.2,52.5],[23.8,52.7],[23.5,53.9],[25.5,54.3],[25.8,54.8],[26.6,55.2],[26.5,55.6],[28.2,56.2]],[[31.8,52.1],[33.8,52.3],[34.4,51.8],[34.2,51.3],[35,51.2],[35.4,50.6],[40.1,49.6],[39.7,47.9],[38.8,47.8],[38.2,47.1],[35,46.3],[35,45.7],[31.7,46.3],[31.7,46.7],[30.7,46.6],[29.6,45.3],[28.7,45.3],[28.2,45.5],[28.9,46.4],[30,46.4],[28.7,48.1],[27.5,48.5],[24.9,47.7],[22.7,47.9],[22.1,48.4],[22.8,49],[22.5,49.5],[23.9,50.4],[23.5,51.6],[25.3,51.9],[30.6,51.3],[30.9,52],[31.8,52.1]],[[23.5,53.9],[23.8,52.7],[23.2,52.5],[24,50.7],[22.5,49.5],[22.8,49],[21.6,49.5],[19.8,49.2],[17.6,50.4],[16.2,50.4],[16.2,50.7],[15,51.1],[14.1,53],[14.4,53.2],[14.1,53.8],[17.6,54.9],[18.7,54.4],[22.7,54.3],[23.5,53.9]],[[17,48.1],[16.9,47.7],[16.3,47.7],[16.5,47.5],[16,46.7],[14.6,46.4],[12.4,46.8],[12.2,47.1],[11,46.8],[9.5,47.1],[9.9,47.6],[10.4,47.3],[12.1,47.7],[12.9,47.5],[12.9,48.3],[13.6,48.9],[14.3,48.6],[15.3,49],[16.5,48.8],[17,48.6],[17,48.1]],[[22.1,48.4],[22.7,47.9],[22.1,47.7],[21,46.3],[18.5,45.8],[16.2,46.9],[16.3,47.7],[16.9,47.7],[17,48.1],[17.9,47.8],[20.8,48.6],[22.1,48.4]],[[26.6,48.2],[27.5,48.5],[28.7,48.1],[30,46.4],[28.9,46.4],[28.2,45.5],[28.1,46.8],[26.6,48.2]],[[28.2,45.5],[29.6,45.3],[28.8,44.9],[28.6,43.7],[27.2,44.2],[25.6,43.7],[22.9,43.8],[22.5,44.4],[22.7,44.6],[21.6,44.8],[20.2,46.1],[21,46.3],[22.1,47.7],[23.1,48.1],[24.9,47.7],[26.6,48.2],[28.1,46.8],[28.2,45.5]],[[26.5,55.6],[26.6,55.2],[25.8,54.8],[25.5,54.3],[23.5,53.9],[22.7,54.3],[22.8,54.9],[21.3,55.2],[21.1,56],[24.9,56.4],[26.5,55.6]],[[27.3,57.5],[27.8,57.2],[28.2,56.2],[26.5,55.6],[24.9,56.4],[21.1,56],[21.6,57.4],[22.5,57.8],[23.3,57],[24.1,57],[24.3,57.8],[25.2,58],[27.3,57.5]],[[28,59.5],[27.4,58.7],[27.7,57.8],[27.3,57.5],[25.2,58],[24.3,57.8],[24.4,58.4],[23.4,58.6],[23.3,59.2],[25.9,59.6],[28,59.5]],[[14.1,53.8],[14.4,53.2],[14.1,53],[15,51.1],[12.2,50.3],[12.5,49.5],[13.6,48.9],[12.9,48.3],[12.9,47.5],[7.5,47.6],[8.1,49],[6.7,49.2],[6,50.1],[6,51.9],[6.8,52.2],[7.1,53.7],[8.1,53.5],[8.8,54],[8.5,55],[9.9,55],[9.9,54.6],[11,54.4],[10.9,54],[12.5,54.5],[14.1,53.8]],[[22.7,44.2],[22.9,43.8],[25.6,43.7],[27.2,44.2],[28.6,43.7],[27.7,42.6],[28,42],[26.1,41.8],[26.1,41.3],[24.5,41.6],[23,41.3],[22.9,42],[22.4,42.3],[23,43.2],[22.5,43.6],[22.7,44.2]],[[26.3,35.3],[26.2,35],[24.7,34.9],[23.5,35.3],[23.7,35.7],[26.3,35.3]],[[23,41.3],[24.5,41.6],[26.1,41.3],[26.1,41.8],[26.6,41.6],[26.1,40.8],[23.7,40.7],[24.4,40.1],[22.6,40.3],[23.4,39.2],[23,39],[24,38.2],[24,37.7],[23.1,37.9],[23.4,37.4],[22.8,37.3],[23.2,36.4],[22.5,36.4],[21.7,36.8],[20.2,39.6],[21,40.8],[23,41.3]],[[44.8,37.2],[42.8,37.4],[39.5,36.7],[36.7,36.8],[36.1,35.8],[35.8,36.3],[36.2,36.7],[34.7,36.8],[34,36.2],[32.5,36.1],[31.7,36.6],[30.6,36.7],[29.7,36.1],[28.7,36.7],[27.6,36.7],[26.3,38.2],[26.8,39],[26.2,39.5],[27.3,40.4],[28.8,40.5],[29.2,41.2],[31.1,41.1],[33.5,42],[35.2,42],[38.3,40.9],[42.6,41.6],[43.6,41.1],[43.7,40.3],[44.8,39.7],[44.1,39.4],[44.2,38],[44.8,37.2]],[[26.1,41.8],[28,42],[29,41.3],[27.6,41],[26.4,40.2],[26.1,40.8],[26.6,41.6],[26.1,41.8]],[[21,40.8],[20.2,39.6],[19.4,40.3],[19.3,42.2],[19.7,42.7],[20.5,42.2],[20.6,41.1],[21,40.8]],[[16.6,46.5],[17.6,46],[18.8,45.9],[19.4,45.2],[19,44.9],[16,45.2],[15.8,44.8],[18.5,42.5],[16,43.5],[15.2,44.2],[14.9,45.1],[14.3,45.2],[14,44.8],[13.7,45.1],[13.7,45.5],[15.3,45.5],[15.8,46.2],[16.6,46.5]],[[9.6,47.5],[9.5,47.1],[10.4,46.9],[9.9,46.3],[9.2,46.4],[9,46],[7.3,45.8],[6.5,46.4],[6,46.3],[6.7,47.5],[8.5,47.8],[9.6,47.5]],[[6,50.1],[6.2,49.5],[5.7,49.5],[6,50.1]],[[6.2,50.8],[5.7,49.5],[4.3,49.9],[2.5,51.1],[5,51.5],[6.2,50.8]],[[6.9,53.5],[6.8,52.2],[6,51.9],[6.2,50.8],[5,51.5],[3.3,51.3],[4.7,53.1],[6.9,53.5]],[[-9,41.9],[-8.3,42.3],[-8,41.8],[-6.7,41.9],[-6.4,41.4],[-6.9,41.1],[-7.1,39.7],[-7.5,39.6],[-7,38.1],[-7.9,36.8],[-8.9,36.9],[-8.8,38.3],[-9.5,38.7],[-8.8,40.8],[-9,41.9]],[[-7.5,37.1],[-7,38.1],[-7.5,39.6],[-7.1,39.7],[-6.9,41.1],[-6.4,41.4],[-6.7,41.9],[-8,41.8],[-8.3,42.3],[-9,41.9],[-9,42.6],[-9.4,43],[-8,43.7],[-1.9,43.4],[.3,42.6],[3,42.5],[3,41.9],[2.1,41.2],[.8,41],[-.3,39.3],[.1,38.7],[-.7,37.6],[-1.4,37.4],[-2.1,36.7],[-4.4,36.7],[-5.4,35.9],[-5.9,36],[-6.5,36.9],[-7.5,37.1]],[[-6.2,53.9],[-6,53.2],[-6.8,52.3],[-8.6,51.7],[-10,51.8],[-9.2,52.9],[-9.7,53.9],[-7.6,55.1],[-7.6,54.1],[-6.2,53.9]],[[165.8,-21.1],[167.1,-22.2],[166.7,-22.4],[166.2,-22.1],[164,-20.1],[165.8,-21.1]],[[162.1,-10.5],[162.4,-10.8],[161.7,-10.8],[161.3,-10.2],[162.1,-10.5]],[[161.7,-9.6],[160.6,-8.3],[160.9,-8.3],[161.7,-9.6]],[[160.9,-9.9],[159.8,-9.8],[159.7,-9.2],[160.9,-9.9]],[[159.6,-8],[159.9,-8.5],[158.2,-7.4],[159.6,-8]],[[157.1,-7],[157.5,-7.3],[156.9,-7.2],[156.5,-6.6],[157.1,-7]],[[176.9,-40.1],[176,-41.3],[175.2,-41.7],[174.7,-41.3],[175.2,-40.5],[174.9,-39.9],[173.8,-39.5],[174.6,-38.8],[174.7,-37.4],[172.6,-34.5],[174.3,-35.3],[175.3,-37.2],[175.4,-36.5],[175.8,-36.8],[176,-37.6],[177.4,-38],[178.5,-37.7],[178,-39.2],[177.2,-39.1],[176.9,-40.1]],[[169.7,-43.6],[171.1,-42.5],[172.8,-40.5],[173.2,-41.3],[174,-40.9],[174.2,-41.3],[174.2,-41.8],[172.7,-43.4],[173.1,-43.9],[171.5,-44.2],[170.6,-45.9],[169.3,-46.6],[166.7,-46.2],[166.5,-45.9],[168.3,-44.1],[169.7,-43.6]],[[147.7,-40.8],[148.3,-40.9],[148.4,-42.1],[147.9,-43.2],[147.6,-42.9],[146.9,-43.6],[146,-43.5],[144.7,-40.7],[146.4,-41.1],[147.7,-40.8]],[[126.1,-32.2],[124.2,-33],[123.7,-33.9],[119.9,-34],[118,-35.1],[116.6,-35],[115,-34.2],[115,-33.6],[115.7,-33.3],[115.8,-32.2],[115,-29.5],[113.3,-26.1],[113.8,-26.5],[113.4,-25.6],[114.2,-26.3],[113.4,-24.4],[113.7,-22.5],[114.1,-21.8],[114.2,-22.5],[114.6,-21.8],[116.7,-20.7],[120.9,-19.7],[122.2,-18.2],[122.3,-17.3],[123,-16.4],[123.4,-17.3],[123.9,-17.1],[123.5,-16.6],[123.8,-16.1],[124.3,-16.3],[124.4,-15.6],[125.7,-14.2],[127.1,-13.8],[128.4,-14.9],[129.6,-15],[129.4,-14.4],[130.6,-12.5],[132.6,-12.1],[132.6,-11.6],[131.8,-11.3],[132.4,-11.1],[135.3,-12.2],[136.5,-11.9],[137,-12.4],[136,-13.3],[135.5,-15],[140.2,-17.7],[140.9,-17.4],[141.3,-16.4],[141.7,-15],[141.7,-12.4],[142.5,-10.7],[143.9,-14.5],[144.6,-14.2],[145.4,-15],[146.4,-19],[148.8,-20.4],[149.7,-22.3],[150.7,-22.4],[150.9,-23.5],[152.9,-25.3],[153.1,-27.3],[153.6,-28.1],[152.9,-31.6],[150.3,-35.7],[150,-37.4],[148.3,-37.8],[146.3,-39],[144.9,-38.4],[145,-37.9],[143.6,-38.8],[140.6,-38],[140,-37.4],[139.6,-36.1],[138.1,-35.6],[138.4,-35.1],[138.2,-34.4],[137.7,-35.1],[136.8,-35.3],[137.9,-33.6],[137.8,-32.9],[136.4,-34.1],[136,-34.9],[135.2,-34.5],[135.2,-33.9],[134.1,-32.8],[134.3,-32.6],[131.3,-31.5],[126.1,-32.2]],[[81.8,7.5],[81.6,6.5],[80.3,6],[79.7,8.2],[80.1,9.8],[81.8,7.5]],[[109.5,18.2],[108.7,18.5],[108.6,19.4],[109.1,19.8],[110.8,20.1],[111,19.7],[110.3,18.7],[109.5,18.2]],[[80.3,42.3],[80.2,42.9],[80.9,43.2],[80,44.9],[82.5,45.5],[83.2,47.3],[85.2,47],[85.7,47.5],[85.8,48.5],[87.8,49.3],[88,48.6],[90.3,47.7],[91,46.9],[90.6,45.7],[90.9,45.3],[93.5,45],[95.3,44.2],[96.3,42.7],[100.8,42.7],[105,41.6],[106.1,42.1],[109.2,42.5],[111.8,43.7],[111.3,44.5],[111.9,45.1],[113.5,44.8],[117.4,46.7],[119.7,46.7],[119.8,47],[118.1,48.1],[117.3,47.7],[115.7,47.7],[115.5,48.1],[116.7,49.9],[117.9,49.5],[119.3,50.1],[119.3,50.6],[120.7,52],[120.7,52.5],[120.2,52.8],[122.2,53.4],[123.6,53.5],[125.9,52.8],[127.7,49.8],[129.4,49.4],[130.6,48.7],[131,47.8],[132.5,47.8],[135,48.5],[133.1,45.1],[131.9,45.3],[131,45],[131.1,42.9],[130.6,42.9],[130.6,42.4],[130,43],[129.6,42.4],[128.1,42],[128.2,41.5],[126.9,41.8],[124.3,39.9],[121.1,38.9],[122.2,40.4],[121.6,40.9],[119,39.3],[118,39.2],[117.5,38.7],[119.7,37.2],[120.8,37.9],[122.4,37.5],[122.5,36.9],[121.1,36.7],[119.2,34.9],[120.2,34.4],[121.9,31.7],[121.9,30.9],[121.3,30.7],[122.1,29.8],[121.7,28.2],[121.1,28.1],[118.7,24.5],[115.9,22.8],[114.2,22.2],[113.8,22.5],[113.2,22.1],[110.8,21.4],[110.4,20.3],[109.9,20.3],[109.9,21.4],[107,21.8],[106.6,22.2],[106.7,22.8],[105.3,23.4],[104.5,22.8],[101.7,22.3],[101.8,21.2],[101.3,21.2],[101.2,21.8],[100.4,21.6],[99.2,22.1],[99.5,22.9],[98.9,23.1],[98.7,24.1],[97.6,23.9],[97.7,25.1],[98.7,25.9],[98.7,27.5],[97.9,28.3],[96.2,28.4],[96.6,28.8],[96.1,29.5],[95.4,29],[94.6,29.3],[92.5,27.9],[91.7,27.8],[90,28.3],[88.8,27.3],[88.7,28.1],[85.8,28.2],[82.3,30.1],[81.5,30.4],[81.1,30.2],[78.7,31.5],[78.5,32.6],[79.2,32.5],[79.2,33],[78.8,33.5],[78.9,34.3],[77.8,35.5],[76.2,35.9],[75,37.4],[74.9,38.4],[73.9,38.5],[73.7,39.4],[73.8,39.9],[74.8,40.4],[76.5,40.4],[76.9,41.1],[78.2,41.2],[80.3,42.3]],[[121.8,24.4],[120.7,22],[120.1,23.6],[121.5,25.3],[122,25],[121.8,24.4]],[[10.4,46.9],[12.2,47.1],[13.8,46.5],[13.9,45.6],[12.3,45.4],[12.6,44.1],[15.1,42],[15.9,42],[16.2,41.7],[15.9,41.5],[18.4,40.4],[18.3,39.8],[16.9,40.4],[16.4,39.8],[17.2,39.4],[17.1,38.9],[15.7,37.9],[16.1,39],[15.4,40],[11.2,42.4],[10.5,42.9],[10.2,43.9],[8.9,44.4],[7.4,43.7],[7.5,44.1],[7,44.3],[6.7,45],[7.1,45.3],[6.8,46],[9,46],[9.2,46.4],[10.4,46.5],[10.4,46.9]],[[14.8,38.1],[15.5,38.2],[15.1,36.6],[12.4,37.6],[12.6,38.1],[14.8,38.1]],[[8.7,40.9],[9.2,41.2],[9.8,40.5],[9.7,39.2],[8.8,38.9],[8.4,39.2],[8.2,41],[8.7,40.9]],[[9.9,55],[8.5,55],[8.1,56.5],[8.5,57.1],[10.6,57.7],[10.2,56.9],[10.9,56.5],[9.6,55.5],[9.9,55]],[[12.4,56.1],[12.7,55.6],[12.1,54.8],[11,55.4],[10.9,55.8],[12.4,56.1]],[[-6.2,53.9],[-7.6,54.1],[-7.6,55.1],[-6.7,55.2],[-5.7,54.6],[-6.2,53.9]],[[-3.1,53.4],[-2.9,54],[-3.6,54.6],[-5.1,55.1],[-4.7,55.5],[-5,55.8],[-5.6,55.3],[-5.6,56.3],[-6.1,56.8],[-5,58.6],[-3,58.6],[-4.1,57.6],[-2,57.7],[-3.1,56],[-2.1,55.9],[-1.1,54.6],[-.4,54.5],[.5,52.9],[1.7,52.7],[1.6,52.1],[1.1,51.8],[1.4,51.3],[.6,50.8],[-3,50.7],[-5.2,50],[-5.8,50.2],[-3.4,51.4],[-5,51.6],[-5.3,52],[-4.2,52.3],[-4.8,52.8],[-4.6,53.5],[-3.1,53.4]],[[-14.5,66.5],[-14.7,65.8],[-13.6,65.1],[-14.9,64.4],[-18.7,63.5],[-22.8,64],[-21.8,64.4],[-24,64.9],[-22.2,65.1],[-22.2,65.4],[-24.3,65.6],[-23.7,66.3],[-22.1,66.4],[-20.6,65.7],[-19.1,66.3],[-17.8,66],[-16.2,66.5],[-14.5,66.5]],[[46.4,41.9],[47.8,41.2],[48.6,41.8],[49.6,40.6],[50.4,40.3],[49.6,40.2],[48.9,38.3],[48,38.8],[48.4,39.3],[48.1,39.6],[46.5,38.8],[46.5,39.5],[45.6,39.9],[45.9,40.2],[45,41.2],[46.5,41.1],[46.1,41.7],[46.4,41.9]],[[46.1,38.7],[45.5,38.9],[44.8,39.7],[45.7,39.5],[46.1,38.7]],[[40,43.4],[45.5,42.5],[46.4,41.9],[46.1,41.7],[46.6,41.2],[45.2,41.4],[43.6,41.1],[42.6,41.6],[41.6,41.5],[41.5,42.6],[40,43.4]],[[120.8,12.7],[120.3,13.5],[121.5,13.1],[121.3,12.2],[120.8,12.7]],[[122.6,10],[122.9,10.9],[123.5,10.9],[123.3,10.3],[124.1,11.2],[124,10.3],[123,9],[122.4,9.7],[122.6,10]],[[126.4,8.4],[126.5,7.2],[126.2,6.3],[125.8,7.3],[125.4,6.8],[125.7,6],[125.4,5.6],[124.2,6.2],[123.9,6.9],[124.2,7.4],[123.6,7.8],[122.1,6.9],[121.9,7.2],[122.3,8],[123.5,8.7],[123.8,8.2],[124.6,8.5],[124.8,9],[125.5,9],[125.4,9.8],[126.2,9.3],[126.4,8.4]],[[118.5,9.3],[117.2,8.4],[119.5,11.4],[119.7,10.6],[118.5,9.3]],[[122.3,18.2],[122.5,17.1],[122.3,16.3],[121.7,15.9],[121.7,14.3],[124,13.8],[124.1,12.5],[122.9,13.6],[122.7,13.2],[122,13.8],[120.6,13.9],[121,14.5],[120.7,14.8],[120.6,14.4],[119.9,15.4],[119.9,16.4],[120.3,16],[120.7,18.5],[122.3,18.2]],[[122,11.4],[121.9,11.9],[123.1,11.6],[123.1,11.2],[122,10.4],[122,11.4]],[[125.5,12.2],[125.8,11],[125,11.3],[125.3,10.4],[124.8,10.1],[124.3,11.5],[124.9,11.4],[124.9,11.8],[124.3,12.6],[125.2,12.5],[125.5,12.2]],[[100.1,6.5],[101.1,6.2],[101.2,5.7],[102.1,6.2],[103,5.5],[103.4,4.9],[103.5,2.8],[104.2,1.3],[103.5,1.2],[101.4,2.8],[100.2,5.3],[100.1,6.5]],[[117.9,4.1],[115.9,4.3],[114.6,1.4],[112.9,1.5],[111.8,.9],[110.5,.8],[109.8,1.3],[109.7,2],[110.4,1.7],[111.2,1.9],[111.4,2.7],[113,3.1],[114.2,4.5],[114.7,4],[115.3,4.3],[115.5,5.4],[116.7,6.9],[117.1,6.9],[117.7,6],[119.2,5.4],[119.1,5],[118.4,5],[118.6,4.5],[117.9,4.1]],[[115.5,5.4],[115.3,4.3],[114.7,4],[114.2,4.5],[115.5,5.4]],[[13.8,46.5],[16.2,46.9],[16.6,46.5],[15.8,46.2],[15.3,45.5],[13.7,45.5],[13.8,46.5]],[[28.6,69.1],[28.4,68.4],[30,67.7],[29.1,66.9],[30.2,65.8],[29.5,64.9],[30.4,64.2],[30,63.6],[31.5,62.9],[31.1,62.4],[28.1,60.5],[22.9,59.8],[21.3,60.7],[21.5,61.7],[21.1,62.6],[21.5,63.2],[25.4,65.1],[25.3,65.5],[23.6,66.4],[23.5,67.9],[20.6,69.1],[21.2,69.4],[22.4,68.8],[24.7,68.6],[25.7,69.1],[26.2,69.8],[27.7,70.2],[29,69.8],[28.6,69.1]],[[22.6,49.1],[21.9,48.3],[20.8,48.6],[17.9,47.8],[16.9,48.5],[18.6,49.5],[19.8,49.2],[21.6,49.5],[22.6,49.1]],[[15,51.1],[16.7,50.2],[17.6,50.4],[18.9,49.5],[17,48.6],[15.3,49],[14.3,48.6],[12.5,49.5],[12.2,50.3],[15,51.1]],[[36.4,14.4],[36.9,17],[38.4,18],[39.3,15.9],[43.1,12.7],[42.4,12.5],[40.9,14.1],[40,14.5],[38.5,14.5],[37.9,15],[37.6,14.2],[36.4,14.4]],[[141.9,39.2],[141,38.2],[140.8,35.8],[140.3,35.1],[137.2,34.6],[135.8,33.5],[135.1,33.8],[135.1,34.6],[131,33.9],[132,33.1],[131.3,31.5],[130.7,31],[130.2,31.4],[130.4,32.3],[129.4,33.3],[130.4,33.6],[132.6,35.4],[135.7,35.5],[136.7,37.3],[137.4,36.8],[139.4,38.2],[140.1,39.4],[139.9,40.6],[140.3,41.2],[141.4,41.4],[141.9,39.2]],[[144.6,44],[145.3,44.4],[145.5,43.3],[144.1,43],[143.2,42],[141.6,42.7],[141.1,41.6],[140,41.6],[139.8,42.6],[140.3,43.3],[141.4,43.4],[142,45.6],[143.1,44.5],[144.6,44]],[[132.4,33.5],[133.9,34.4],[134.8,33.8],[134.2,33.2],[133.8,33.5],[133.3,33.3],[133,32.7],[132.4,33],[132.4,33.5]],[[-58.2,-20.2],[-57.9,-22.1],[-55.8,-22.4],[-55.4,-24],[-54.3,-24],[-54.8,-26.6],[-55.7,-27.4],[-58.6,-27.1],[-57.6,-25.6],[-57.8,-25.2],[-60.8,-23.9],[-62.7,-22.2],[-61.8,-19.6],[-59.1,-19.4],[-58.2,-20.2]],[[52,19],[53.1,16.7],[52.4,16.4],[52.2,15.6],[49.6,14.7],[48.7,14],[45.6,13.3],[45,12.7],[43.5,12.6],[42.6,15.2],[43.4,17.6],[46.7,17.3],[47,16.9],[49.1,18.6],[52,19]],[[35,29.4],[36.1,29.2],[36.7,29.9],[37.5,30],[38,30.5],[37,31.5],[39.2,32.2],[41.9,31.2],[44.7,29.2],[47.5,29],[47.7,28.5],[48.4,28.6],[48.8,27.7],[50.2,26.7],[50.2,25.6],[50.8,24.8],[51.4,24.6],[52,23],[55.2,22.7],[55.7,22],[55,20],[52,19],[49.1,18.6],[47,16.9],[46.7,17.3],[43.4,17.6],[43.2,16.7],[42.8,16.3],[40.9,19.5],[39.1,21.3],[39.1,22.6],[38.5,23.7],[37.5,24.3],[35.1,28.1],[34.6,28.1],[35,29.4]],[[32.7,35.1],[34.6,35.7],[34,35.1],[32.7,35.1]],[[32.7,35.1],[34,35],[33,34.6],[32.3,35.1],[32.7,35.1]],[[-2.2,35.2],[-1.1,32.7],[-1.3,32.3],[-3.6,31.6],[-3.7,30.9],[-5.2,30],[-8.7,28.8],[-8.8,27.1],[-11.4,26.9],[-12.5,24.8],[-13.9,23.7],[-14.8,21.5],[-17,21.4],[-14.4,26.3],[-12.6,28],[-11.7,28.1],[-9.6,29.9],[-9.8,31.2],[-8.7,33.2],[-6.9,34.1],[-5.9,35.8],[-2.2,35.2]],[[36.9,22],[25,22],[25,29.2],[24.7,30],[25.2,31.6],[26.5,31.6],[28.9,30.9],[31,31.6],[31.7,31.4],[32,30.9],[32.2,31.3],[33.8,31],[34.3,31.2],[34.9,29.5],[34.2,27.8],[33.9,27.6],[33.1,28.4],[32.3,29.8],[34.1,26.1],[35.7,23.9],[35.5,23.1],[36.9,22]],[[25,22],[25,20],[23.9,20],[23.8,19.6],[15.9,23.4],[14.1,22.5],[13.6,23],[12,23.5],[10.8,24.6],[10.3,24.4],[9.3,26.1],[9.7,26.5],[9.9,29],[9.5,30.3],[10,30.5],[10,31.4],[11.4,32.4],[11.5,33.1],[15.2,32.3],[15.7,31.4],[19.1,30.3],[20.1,31],[19.8,31.8],[20.9,32.7],[22.9,32.6],[23.2,32.2],[24.9,31.9],[25,22]],[[47.8,8],[45,5],[43.7,5],[41.9,3.9],[40.8,4.3],[39.6,3.4],[36.2,4.4],[34.7,6.6],[33.6,7.7],[33,7.8],[33.3,8.4],[33.8,8.4],[34.3,10.6],[35.9,12.6],[36.4,14.4],[37.6,14.2],[37.9,15],[38.5,14.5],[40,14.5],[41.6,13.5],[42.4,12.5],[41.7,11.6],[41.8,11.1],[42.8,10.9],[42.6,10.6],[43.7,9.2],[47.8,8]],[[42.4,12.5],[43.1,12.7],[43.3,12.4],[43.3,12],[42.7,11.7],[43.1,11.5],[42.8,10.9],[41.8,11.1],[41.7,11.6],[42.4,12.5]],[[48.9,11.4],[48.9,9.5],[47.8,8],[43.7,9.2],[42.6,10.6],[43.1,11.5],[44.1,10.4],[48.9,11.4]],[[33.9,-.9],[29.6,-1.3],[29.9,.6],[31.2,2.2],[30.8,2.3],[30.8,3.5],[31.2,3.8],[33.4,3.8],[34,4.2],[34.5,3.6],[35,1.9],[33.9,.1],[33.9,-.9]],[[30.4,-1.1],[30.8,-2.3],[29.9,-2.3],[29.6,-2.9],[29,-2.8],[29.3,-1.6],[30.4,-1.1]],[[18.6,42.6],[16.5,44],[15.8,44.8],[16,45.2],[19.4,44.9],[19.1,44.4],[19.6,44],[19.5,43.6],[18.7,43.2],[18.6,42.6]],[[22.4,42.3],[22.9,42],[23,41.3],[21,40.8],[20.6,41.1],[20.8,42.1],[22.4,42.3]],[[18.8,45.9],[20.2,46.1],[21.6,44.8],[22.7,44.6],[22.4,44],[23,43.2],[22.5,42.5],[21.6,42.2],[21.8,42.7],[20.8,43.3],[20.3,42.8],[19.2,43.5],[19.6,44],[19.1,44.4],[19.4,45.2],[18.8,45.9]],[[20.1,42.6],[19.7,42.7],[19.4,41.9],[18.5,42.5],[19.2,43.5],[20.3,42.9],[20.1,42.6]],[[20.6,41.9],[20.1,42.6],[20.6,43.2],[21.8,42.7],[20.6,41.9]],[[-61.7,10.8],[-60.9,10.9],[-60.9,10.1],[-62,10.1],[-61.7,10.8]],[[30.8,3.5],[29.7,4.6],[28,4.4],[25.1,7.8],[23.9,8.6],[24.5,8.9],[25.1,10.3],[25.8,10.4],[26.8,9.5],[29,9.4],[30,10.3],[30.8,9.7],[31.4,9.8],[32.4,11.1],[32.1,12],[33.2,12.2],[33.2,10.7],[33.7,10.3],[34,8.7],[33,7.8],[34.1,7.2],[35.3,5.5],[33.4,3.8],[30.8,3.5]]],Fg=[[[8.417,55.057],[8.463,55.046],[8.396,55.046],[8.397,55.036],[8.423,55.034],[8.443,55.016],[8.379,54.997],[8.354,54.967],[8.362,54.957],[8.367,54.902],[8.43,54.878],[8.588,54.886],[8.624,54.896],[8.638,54.913],[8.694,54.914],[8.731,54.895],[8.762,54.898],[8.766,54.912],[8.812,54.917],[8.829,54.914],[8.85,54.893],[8.902,54.905],[8.975,54.901],[9.047,54.869],[9.143,54.871],[9.225,54.856],[9.273,54.824],[9.283,54.802],[9.316,54.81],[9.346,54.804],[9.388,54.838],[9.409,54.841],[9.44,54.808],[9.429,54.801],[9.435,54.788],[9.438,54.803],[9.465,54.823],[9.496,54.822],[9.516,54.838],[9.585,54.865],[9.589,54.876],[9.614,54.876],[9.59,54.852],[9.603,54.832],[9.792,54.797],[9.843,54.756],[9.876,54.752],[9.893,54.77],[9.906,54.764],[9.908,54.797],[9.955,54.78],[9.977,54.757],[9.989,54.717],[10.036,54.69],[10.035,54.672],[10.022,54.692],[9.991,54.682],[9.993,54.699],[9.983,54.701],[9.974,54.693],[9.977,54.683],[9.938,54.673],[9.933,54.628],[9.908,54.635],[9.859,54.602],[9.819,54.585],[9.813,54.588],[9.825,54.594],[9.805,54.588],[9.802,54.58],[9.81,54.587],[9.81,54.579],[9.785,54.573],[9.77,54.581],[9.769,54.565],[9.735,54.532],[9.715,54.533],[9.712,54.52],[9.695,54.527],[9.646,54.524],[9.633,54.514],[9.627,54.531],[9.604,54.527],[9.587,54.51],[9.545,54.509],[9.578,54.5],[9.567,54.495],[9.574,54.475],[9.583,54.478],[9.581,54.501],[9.624,54.512],[9.665,54.506],[9.692,54.49],[9.715,54.491],[9.7,54.515],[9.716,54.517],[9.721,54.529],[9.724,54.52],[9.737,54.525],[9.749,54.547],[9.771,54.558],[9.777,54.553],[9.842,54.591],[9.938,54.623],[9.945,54.637],[9.936,54.651],[9.948,54.674],[9.998,54.666],[10.002,54.674],[10.01,54.662],[10.034,54.67],[10.033,54.662],[10.015,54.661],[10.034,54.658],[10.028,54.55],[9.966,54.503],[9.865,54.47],[9.84,54.476],[9.84,54.467],[9.869,54.447],[9.914,54.452],[9.934,54.461],[9.925,54.462],[10.127,54.485],[10.199,54.456],[10.169,54.434],[10.19,54.41],[10.192,54.39],[10.161,54.386],[10.166,54.378],[10.148,54.369],[10.141,54.353],[10.157,54.337],[10.132,54.311],[10.151,54.324],[10.184,54.328],[10.17,54.333],[10.177,54.334],[10.178,54.361],[10.196,54.366],[10.194,54.379],[10.228,54.413],[10.279,54.418],[10.319,54.436],[10.391,54.426],[10.477,54.392],[10.604,54.363],[10.705,54.305],[10.789,54.312],[10.929,54.382],[11.023,54.381],[10.983,54.379],[11.026,54.368],[11.08,54.377],[11.096,54.394],[11.128,54.391],[11.126,54.374],[11.079,54.345],[11.073,54.357],[11.059,54.354],[11.063,54.344],[11.075,54.346],[11.081,54.247],[11.094,54.198],[10.954,54.14],[10.879,54.088],[10.805,54.096],[10.792,54.075],[10.754,54.055],[10.752,54.033],[10.785,53.997],[10.874,53.989],[10.891,53.956],[11.04,54.007],[11.179,54.016],[11.215,53.985],[11.259,53.985],[11.241,53.952],[11.259,53.934],[11.287,53.93],[11.335,53.958],[11.365,53.935],[11.405,53.935],[11.403,53.922],[11.438,53.911],[11.434,53.902],[11.455,53.9],[11.444,53.91],[11.481,53.927],[11.484,53.968],[11.444,53.96],[11.445,53.997],[11.428,53.987],[11.428,53.961],[11.395,53.975],[11.386,53.968],[11.411,53.966],[11.394,53.964],[11.378,53.975],[11.374,53.993],[11.445,54.021],[11.493,54.023],[11.493,54.004],[11.479,53.999],[11.48,53.982],[11.467,53.974],[11.49,53.968],[11.5,53.985],[11.491,53.993],[11.535,54.021],[11.518,54.025],[11.519,54.032],[11.566,54.03],[11.586,54.047],[11.581,54.063],[11.624,54.077],[11.626,54.09],[11.606,54.104],[11.531,54.049],[11.535,54.074],[11.525,54.072],[11.556,54.095],[11.607,54.106],[11.682,54.153],[11.854,54.145],[12.01,54.178],[12.087,54.183],[12.097,54.17],[12.092,54.152],[12.125,54.15],[12.121,54.158],[12.142,54.16],[12.142,54.172],[12.101,54.169],[12.095,54.181],[12.128,54.186],[12.196,54.243],[12.339,54.298],[12.408,54.378],[12.452,54.404],[12.496,54.47],[12.52,54.484],[12.53,54.482],[12.526,54.471],[12.548,54.456],[12.655,54.443],[12.92,54.445],[12.921,54.432],[12.929,54.443],[12.962,54.438],[12.938,54.438],[12.922,54.423],[12.876,54.413],[12.821,54.421],[12.802,54.408],[12.789,54.417],[12.762,54.413],[12.731,54.422],[12.729,54.415],[12.681,54.414],[12.675,54.42],[12.688,54.429],[12.671,54.423],[12.664,54.408],[12.647,54.419],[12.637,54.416],[12.637,54.425],[12.618,54.418],[12.611,54.412],[12.618,54.407],[12.577,54.403],[12.598,54.391],[12.593,54.383],[12.552,54.39],[12.522,54.377],[12.525,54.37],[12.496,54.382],[12.436,54.379],[12.415,54.365],[12.418,54.336],[12.389,54.343],[12.397,54.323],[12.359,54.303],[12.383,54.279],[12.364,54.266],[12.4,54.251],[12.46,54.248],[12.418,54.258],[12.409,54.28],[12.435,54.297],[12.479,54.304],[12.473,54.33],[12.535,54.339],[12.539,54.352],[12.553,54.359],[12.534,54.365],[12.554,54.372],[12.553,54.38],[12.583,54.374],[12.574,54.358],[12.592,54.357],[12.599,54.371],[12.67,54.391],[12.657,54.408],[12.706,54.412],[12.715,54.403],[12.689,54.4],[12.694,54.386],[12.676,54.371],[12.686,54.371],[12.7,54.399],[12.715,54.399],[12.72,54.373],[12.735,54.371],[12.744,54.384],[12.767,54.371],[12.787,54.396],[12.785,54.38],[12.804,54.372],[12.81,54.345],[12.879,54.365],[12.897,54.402],[13.02,54.439],[13.035,54.431],[13.023,54.417],[13.025,54.397],[13.05,54.38],[13.08,54.381],[13.094,54.367],[13.076,54.345],[13.088,54.32],[13.112,54.305],[13.106,54.282],[13.133,54.269],[13.165,54.278],[13.179,54.27],[13.143,54.254],[13.185,54.267],[13.216,54.25],[13.216,54.241],[13.286,54.235],[13.328,54.184],[13.346,54.18],[13.318,54.16],[13.377,54.177],[13.401,54.17],[13.395,54.181],[13.416,54.175],[13.422,54.166],[13.381,54.152],[13.382,54.142],[13.411,54.157],[13.406,54.147],[13.436,54.129],[13.438,54.111],[13.457,54.091],[13.501,54.085],[13.476,54.116],[13.489,54.124],[13.628,54.14],[13.696,54.172],[13.719,54.164],[13.695,54.158],[13.696,54.149],[13.75,54.139],[13.762,54.128],[13.757,54.119],[13.807,54.103],[13.79,54.064],[13.775,54.06],[13.785,54.049],[13.744,54.029],[13.759,54.028],[13.76,54.015],[13.796,53.995],[13.835,53.984],[13.855,53.964],[13.852,53.953],[13.88,53.951],[13.914,53.922],[13.901,53.91],[13.865,53.901],[13.846,53.877],[13.824,53.877],[13.825,53.866],[13.893,53.877],[13.922,53.888],[13.938,53.908],[13.923,53.95],[13.895,53.967],[13.906,53.99],[13.965,53.99],[13.964,53.973],[13.974,53.97],[13.95,53.959],[13.959,53.953],[13.953,53.935],[13.96,53.934],[13.971,53.95],[13.963,53.957],[13.984,53.963],[14.025,53.962],[14.012,53.949],[14.042,53.942],[14.035,53.95],[14.047,53.997],[14.03,54.018],[14.004,54.011],[13.997,54.041],[13.969,54.059],[13.974,54.064],[13.911,54.064],[13.917,54.06],[13.909,54.043],[13.915,54.047],[13.924,54.035],[13.9,54.012],[13.867,54.007],[13.863,53.999],[13.853,54.014],[13.879,54.04],[13.858,54.048],[13.82,54.037],[13.801,54.018],[13.769,54.019],[13.764,54.031],[13.79,54.049],[13.812,54.099],[13.806,54.11],[13.775,54.119],[13.774,54.132],[13.757,54.135],[13.749,54.159],[13.804,54.178],[13.812,54.177],[13.836,54.128],[13.871,54.102],[14.014,54.054],[14.221,53.93],[14.186,53.916],[14.21,53.903],[14.217,53.865],[14.039,53.873],[13.991,53.848],[13.899,53.84],[13.826,53.85],[13.822,53.857],[13.831,53.865],[13.806,53.858],[13.819,53.842],[13.868,53.836],[13.874,53.821],[13.901,53.803],[13.917,53.806],[13.972,53.772],[14.039,53.755],[14.176,53.735],[14.234,53.762],[14.283,53.739],[14.215,53.703],[14.245,53.694],[14.273,53.699],[14.285,53.673],[14.271,53.663],[14.292,53.659],[14.289,53.634],[14.325,53.619],[14.319,53.593],[14.311,53.593],[14.315,53.561],[14.308,53.561],[14.303,53.543],[14.318,53.539],[14.325,53.53],[14.318,53.523],[14.335,53.5],[14.36,53.489],[14.364,53.459],[14.376,53.459],[14.374,53.426],[14.401,53.378],[14.393,53.356],[14.411,53.348],[14.42,53.326],[14.414,53.311],[14.423,53.278],[14.444,53.277],[14.449,53.262],[14.407,53.223],[14.408,53.214],[14.379,53.204],[14.375,53.181],[14.367,53.18],[14.37,53.158],[14.386,53.15],[14.388,53.136],[14.381,53.136],[14.383,53.115],[14.369,53.108],[14.375,53.096],[14.364,53.09],[14.366,53.076],[14.346,53.053],[14.271,53.008],[14.142,52.961],[14.156,52.88],[14.123,52.855],[14.121,52.84],[14.139,52.825],[14.214,52.82],[14.273,52.778],[14.341,52.759],[14.382,52.725],[14.398,52.722],[14.421,52.687],[14.456,52.679],[14.466,52.657],[14.567,52.626],[14.606,52.606],[14.616,52.583],[14.639,52.58],[14.601,52.533],[14.611,52.511],[14.631,52.499],[14.622,52.484],[14.606,52.482],[14.605,52.467],[14.592,52.455],[14.543,52.437],[14.542,52.411],[14.529,52.396],[14.552,52.377],[14.55,52.35],[14.56,52.328],[14.584,52.311],[14.571,52.29],[14.642,52.263],[14.685,52.26],[14.7,52.241],[14.692,52.211],[14.675,52.204],[14.695,52.174],[14.671,52.151],[14.669,52.122],[14.689,52.099],[14.716,52.096],[14.741,52.073],[14.73,52.062],[14.734,52.047],[14.722,52.025],[14.699,52.01],[14.703,51.987],[14.692,51.984],[14.691,51.969],[14.706,51.958],[14.705,51.943],[14.688,51.935],[14.693,51.924],[14.652,51.886],[14.653,51.877],[14.605,51.856],[14.606,51.847],[14.585,51.837],[14.593,51.833],[14.587,51.824],[14.594,51.824],[14.596,51.806],[14.648,51.795],[14.655,51.741],[14.662,51.742],[14.656,51.732],[14.724,51.689],[14.718,51.682],[14.729,51.682],[14.739,51.667],[14.732,51.656],[14.746,51.611],[14.711,51.585],[14.716,51.581],[14.698,51.559],[14.729,51.551],[14.739,51.524],[14.787,51.522],[14.85,51.493],[14.91,51.493],[14.91,51.486],[14.934,51.482],[14.972,51.44],[14.959,51.431],[14.962,51.404],[14.969,51.403],[14.965,51.381],[14.98,51.378],[14.968,51.354],[14.999,51.331],[15.005,51.317],[15.028,51.31],[15.022,51.306],[15.034,51.295],[15.038,51.24],[15.005,51.212],[15.003,51.171],[14.99,51.16],[14.997,51.135],[14.986,51.13],[14.988,51.116],[14.974,51.111],[14.983,51.095],[14.951,51.057],[14.95,51.042],[14.938,51.038],[14.943,51.031],[14.933,51.028],[14.93,50.991],[14.916,50.986],[14.918,50.973],[14.904,50.972],[14.903,50.953],[14.878,50.945],[14.871,50.926],[14.853,50.922],[14.82,50.892],[14.826,50.873],[14.805,50.829],[14.711,50.827],[14.712,50.841],[14.612,50.855],[14.606,50.862],[14.625,50.884],[14.626,50.899],[14.654,50.915],[14.652,50.933],[14.63,50.936],[14.603,50.921],[14.56,50.923],[14.597,50.971],[14.595,50.989],[14.561,51.006],[14.53,51.002],[14.54,51.014],[14.502,51.017],[14.502,51.052],[14.492,51.046],[14.491,51.02],[14.449,51.031],[14.397,51.008],[14.367,51.015],[14.37,51.027],[14.353,51.034],[14.319,51.025],[14.303,51.04],[14.305,51.052],[14.294,51.054],[14.281,51.044],[14.277,51.017],[14.257,51.011],[14.265,50.998],[14.248,50.995],[14.247,50.973],[14.281,50.965],[14.311,50.972],[14.321,50.952],[14.401,50.942],[14.391,50.906],[14.372,50.889],[14.337,50.889],[14.295,50.875],[14.255,50.886],[14.242,50.876],[14.225,50.876],[14.212,50.847],[14.142,50.835],[14.077,50.815],[14.059,50.8],[14.041,50.805],[14.023,50.794],[13.984,50.81],[13.955,50.804],[13.948,50.785],[13.895,50.783],[13.882,50.762],[13.899,50.743],[13.865,50.741],[13.851,50.718],[13.822,50.715],[13.759,50.729],[13.69,50.717],[13.667,50.734],[13.62,50.713],[13.549,50.713],[13.536,50.702],[13.546,50.672],[13.514,50.657],[13.526,50.636],[13.49,50.625],[13.465,50.596],[13.414,50.613],[13.404,50.636],[13.375,50.644],[13.379,50.625],[13.324,50.602],[13.327,50.582],[13.292,50.575],[13.284,50.591],[13.249,50.592],[13.223,50.559],[13.227,50.539],[13.197,50.515],[13.196,50.501],[13.137,50.502],[13.134,50.515],[13.091,50.499],[13.033,50.509],[13.031,50.477],[13.024,50.476],[13.028,50.449],[12.977,50.414],[12.936,50.407],[12.829,50.459],[12.81,50.444],[12.812,50.433],[12.792,50.447],[12.761,50.44],[12.719,50.42],[12.705,50.398],[12.678,50.417],[12.655,50.411],[12.615,50.419],[12.603,50.408],[12.516,50.4],[12.485,50.368],[12.493,50.349],[12.458,50.347],[12.445,50.341],[12.441,50.323],[12.406,50.32],[12.401,50.311],[12.41,50.298],[12.364,50.276],[12.364,50.236],[12.335,50.238],[12.34,50.211],[12.327,50.206],[12.334,50.202],[12.328,50.195],[12.317,50.195],[12.328,50.18],[12.283,50.183],[12.283,50.194],[12.266,50.205],[12.278,50.209],[12.284,50.227],[12.234,50.253],[12.24,50.265],[12.258,50.257],[12.253,50.276],[12.195,50.279],[12.197,50.316],[12.188,50.318],[12.194,50.323],[12.131,50.318],[12.125,50.313],[12.137,50.282],[12.109,50.274],[12.086,50.255],[12.116,50.244],[12.117,50.236],[12.161,50.23],[12.163,50.218],[12.199,50.196],[12.21,50.165],[12.193,50.146],[12.199,50.112],[12.261,50.092],[12.273,50.078],[12.256,50.062],[12.316,50.06],[12.326,50.042],[12.347,50.04],[12.364,50.02],[12.437,50.005],[12.432,49.991],[12.468,49.996],[12.475,49.985],[12.489,49.986],[12.497,49.972],[12.487,49.959],[12.473,49.958],[12.476,49.94],[12.548,49.927],[12.551,49.905],[12.52,49.884],[12.519,49.864],[12.503,49.86],[12.502,49.839],[12.473,49.836],[12.472,49.79],[12.409,49.766],[12.403,49.755],[12.42,49.733],[12.431,49.733],[12.444,49.707],[12.499,49.688],[12.528,49.688],[12.534,49.668],[12.52,49.649],[12.532,49.643],[12.525,49.632],[12.537,49.629],[12.534,49.623],[12.565,49.624],[12.559,49.617],[12.58,49.591],[12.574,49.573],[12.588,49.544],[12.646,49.531],[12.646,49.485],[12.633,49.48],[12.654,49.463],[12.661,49.432],[12.71,49.427],[12.712,49.418],[12.76,49.4],[12.759,49.382],[12.782,49.364],[12.784,49.352],[12.848,49.347],[12.876,49.336],[12.883,49.34],[12.877,49.355],[12.953,49.348],[12.993,49.328],[13.01,49.309],[13.034,49.309],[13.038,49.268],[13.061,49.267],[13.061,49.256],[13.096,49.244],[13.093,49.226],[13.114,49.219],[13.118,49.196],[13.139,49.193],[13.162,49.172],[13.18,49.174],[13.18,49.144],[13.214,49.121],[13.244,49.114],[13.296,49.12],[13.404,49.052],[13.413,49.011],[13.407,48.989],[13.422,48.981],[13.402,48.984],[13.459,48.965],[13.468,48.952],[13.497,48.94],[13.51,48.946],[13.51,48.968],[13.589,48.969],[13.598,48.948],[13.631,48.951],[13.625,48.94],[13.653,48.896],[13.667,48.896],[13.671,48.883],[13.723,48.882],[13.733,48.889],[13.732,48.881],[13.751,48.875],[13.763,48.839],[13.79,48.832],[13.789,48.817],[13.81,48.802],[13.804,48.783],[13.836,48.775],[13.818,48.76],[13.804,48.728],[13.787,48.722],[13.814,48.703],[13.81,48.654],[13.826,48.641],[13.801,48.597],[13.81,48.591],[13.802,48.577],[13.763,48.557],[13.758,48.567],[13.751,48.562],[13.746,48.536],[13.721,48.517],[13.662,48.538],[13.648,48.554],[13.594,48.576],[13.567,48.566],[13.519,48.596],[13.503,48.597],[13.502,48.578],[13.485,48.567],[13.474,48.571],[13.457,48.561],[13.447,48.572],[13.436,48.565],[13.455,48.516],[13.424,48.461],[13.437,48.429],[13.411,48.378],[13.286,48.305],[13.091,48.281],[13.021,48.26],[12.963,48.217],[12.868,48.204],[12.839,48.162],[12.804,48.152],[12.787,48.128],[12.765,48.136],[12.753,48.117],[12.758,48.088],[12.86,48.02],[12.881,47.961],[12.911,47.959],[12.922,47.94],[12.939,47.943],[13.001,47.852],[12.966,47.803],[12.938,47.785],[12.949,47.775],[12.911,47.731],[12.957,47.714],[12.989,47.713],[13.01,47.73],[13.044,47.721],[13.082,47.691],[13.078,47.672],[13.106,47.639],[13.066,47.607],[13.076,47.587],[13.048,47.585],[13.053,47.566],[13.065,47.565],[13.036,47.537],[13.053,47.517],[13.054,47.495],[13.013,47.466],[12.979,47.489],[12.979,47.477],[12.97,47.477],[12.913,47.497],[12.885,47.524],[12.852,47.532],[12.846,47.552],[12.823,47.55],[12.8,47.561],[12.781,47.582],[12.799,47.607],[12.827,47.616],[12.771,47.645],[12.765,47.658],[12.779,47.662],[12.783,47.676],[12.761,47.665],[12.737,47.682],[12.674,47.685],[12.653,47.674],[12.628,47.683],[12.605,47.679],[12.577,47.634],[12.532,47.639],[12.506,47.629],[12.467,47.654],[12.44,47.681],[12.436,47.701],[12.365,47.686],[12.33,47.695],[12.259,47.676],[12.248,47.691],[12.271,47.729],[12.254,47.74],[12.232,47.714],[12.174,47.699],[12.217,47.625],[12.221,47.61],[12.209,47.601],[12.187,47.601],[12.188,47.609],[12.088,47.606],[12.072,47.614],[12.028,47.607],[12.017,47.622],[11.862,47.597],[11.857,47.579],[11.796,47.583],[11.777,47.595],[11.668,47.586],[11.636,47.598],[11.625,47.578],[11.614,47.578],[11.593,47.553],[11.598,47.523],[11.581,47.512],[11.515,47.501],[11.437,47.513],[11.388,47.472],[11.414,47.465],[11.424,47.446],[11.342,47.452],[11.324,47.436],[11.294,47.43],[11.291,47.399],[11.274,47.391],[11.224,47.391],[11.257,47.426],[11.246,47.435],[11.151,47.424],[11.11,47.397],[10.978,47.396],[10.965,47.406],[10.979,47.422],[10.922,47.462],[10.927,47.478],[10.863,47.478],[10.87,47.502],[10.919,47.516],[10.898,47.52],[10.883,47.538],[10.772,47.516],[10.746,47.539],[10.691,47.546],[10.686,47.56],[10.627,47.562],[10.6,47.574],[10.561,47.536],[10.491,47.545],[10.453,47.561],[10.478,47.589],[10.432,47.586],[10.433,47.572],[10.452,47.558],[10.433,47.498],[10.438,47.488],[10.463,47.487],[10.472,47.433],[10.436,47.415],[10.423,47.391],[10.434,47.379],[10.39,47.375],[10.384,47.356],[10.351,47.333],[10.345,47.314],[10.323,47.303],[10.285,47.295],[10.275,47.285],[10.263,47.288],[10.232,47.27],[10.198,47.277],[10.17,47.27],[10.171,47.292],[10.193,47.297],[10.209,47.312],[10.193,47.327],[10.232,47.372],[10.227,47.393],[10.21,47.38],[10.179,47.393],[10.161,47.367],[10.117,47.374],[10.096,47.355],[10.084,47.4],[10.069,47.412],[10.095,47.418],[10.101,47.432],[10.091,47.457],[10.067,47.456],[10.05,47.467],[10.044,47.489],[9.997,47.486],[9.992,47.507],[9.961,47.523],[9.971,47.55],[9.955,47.537],[9.921,47.532],[9.906,47.546],[9.881,47.549],[9.874,47.531],[9.813,47.551],[9.824,47.563],[9.818,47.589],[9.774,47.597],[9.747,47.574],[9.736,47.541],[9.715,47.552],[9.689,47.544],[9.689,47.557],[9.62,47.572],[9.606,47.588],[9.557,47.589],[9.537,47.606],[9.521,47.64],[9.499,47.653],[9.47,47.652],[9.418,47.67],[9.356,47.664],[9.315,47.677],[9.252,47.708],[9.224,47.748],[9.141,47.776],[9.067,47.82],[9.044,47.824],[9.032,47.813],[9.071,47.784],[9.177,47.738],[9.184,47.71],[9.213,47.69],[9.221,47.671],[9.188,47.669],[9.186,47.658],[9.167,47.662],[9.164,47.654],[9.13,47.669],[9.121,47.685],[9.104,47.69],[9.112,47.695],[9.104,47.705],[8.992,47.748],[8.986,47.743],[9.01,47.73],[8.961,47.742],[8.941,47.732],[9.009,47.698],[8.942,47.662],[8.879,47.659],[8.87,47.679],[8.854,47.684],[8.856,47.7],[8.876,47.697],[8.874,47.708],[8.823,47.716],[8.808,47.729],[8.808,47.742],[8.771,47.72],[8.773,47.711],[8.808,47.699],[8.798,47.68],[8.787,47.681],[8.728,47.697],[8.738,47.721],[8.713,47.736],[8.725,47.75],[8.742,47.753],[8.73,47.766],[8.69,47.763],[8.683,47.791],[8.656,47.806],[8.646,47.797],[8.649,47.771],[8.63,47.766],[8.617,47.789],[8.62,47.804],[8.568,47.814],[8.562,47.8],[8.576,47.789],[8.488,47.78],[8.473,47.77],[8.453,47.746],[8.454,47.73],[8.406,47.706],[8.42,47.689],[8.404,47.68],[8.446,47.659],[8.467,47.662],[8.474,47.643],[8.476,47.655],[8.492,47.647],[8.534,47.651],[8.529,47.665],[8.552,47.673],[8.579,47.668],[8.607,47.676],[8.629,47.652],[8.617,47.642],[8.604,47.643],[8.615,47.649],[8.609,47.657],[8.597,47.647],[8.606,47.617],[8.585,47.6],[8.561,47.604],[8.573,47.616],[8.559,47.628],[8.521,47.638],[8.506,47.621],[8.459,47.606],[8.469,47.588],[8.492,47.591],[8.489,47.581],[8.423,47.571],[8.397,47.58],[8.38,47.57],[8.325,47.576],[8.297,47.594],[8.29,47.614],[8.256,47.62],[8.225,47.611],[8.203,47.626],[8.166,47.6],[8.107,47.587],[8.099,47.566],[8.088,47.563],[8.069,47.571],[8.021,47.556],[7.958,47.564],[7.944,47.55],[7.912,47.556],[7.909,47.578],[7.891,47.594],[7.821,47.595],[7.793,47.564],[7.669,47.537],[7.632,47.562],[7.68,47.571],[7.664,47.588],[7.671,47.593],[7.639,47.597],[7.608,47.581],[7.567,47.632],[7.525,47.66],[7.512,47.696],[7.549,47.735],[7.53,47.783],[7.562,47.841],[7.558,47.881],[7.583,47.898],[7.583,47.93],[7.622,47.974],[7.609,48],[7.569,48.036],[7.578,48.121],[7.599,48.135],[7.599,48.156],[7.642,48.204],[7.666,48.221],[7.694,48.302],[7.745,48.33],[7.734,48.399],[7.766,48.464],[7.767,48.487],[7.805,48.514],[7.8,48.583],[7.836,48.634],[7.896,48.667],[7.962,48.72],[7.97,48.756],[8.017,48.763],[8.032,48.788],[8.062,48.789],[8.087,48.802],[8.142,48.896],[8.197,48.957],[8.229,48.971],[8.091,48.989],[8.051,49.013],[7.976,49.028],[7.937,49.056],[7.915,49.042],[7.885,49.047],[7.867,49.033],[7.8,49.064],[7.766,49.047],[7.732,49.044],[7.731,49.054],[7.696,49.056],[7.697,49.05],[7.671,49.046],[7.635,49.054],[7.627,49.073],[7.6,49.083],[7.568,49.08],[7.531,49.097],[7.518,49.119],[7.49,49.137],[7.504,49.151],[7.491,49.169],[7.437,49.165],[7.446,49.184],[7.366,49.172],[7.363,49.145],[7.326,49.143],[7.293,49.115],[7.245,49.13],[7.198,49.115],[7.185,49.13],[7.159,49.121],[7.125,49.141],[7.104,49.139],[7.111,49.15],[7.098,49.154],[7.083,49.151],[7.09,49.132],[7.058,49.113],[7.046,49.118],[7.046,49.139],[7.028,49.171],[7.034,49.188],[7.013,49.189],[6.977,49.209],[6.958,49.204],[6.924,49.223],[6.894,49.21],[6.858,49.222],[6.84,49.214],[6.861,49.179],[6.845,49.173],[6.848,49.157],[6.834,49.151],[6.784,49.168],[6.738,49.165],[6.713,49.19],[6.731,49.207],[6.722,49.219],[6.693,49.218],[6.684,49.252],[6.662,49.257],[6.668,49.28],[6.616,49.303],[6.589,49.322],[6.592,49.334],[6.565,49.349],[6.57,49.358],[6.587,49.352],[6.599,49.367],[6.586,49.371],[6.584,49.385],[6.541,49.401],[6.538,49.411],[6.555,49.419],[6.535,49.434],[6.432,49.474],[6.368,49.467],[6.369,49.46],[6.355,49.465],[6.366,49.468],[6.365,49.507],[6.373,49.509],[6.359,49.531],[6.379,49.559],[6.364,49.574],[6.381,49.574],[6.379,49.597],[6.417,49.617],[6.437,49.652],[6.424,49.666],[6.462,49.695],[6.49,49.704],[6.503,49.716],[6.501,49.729],[6.516,49.724],[6.498,49.735],[6.511,49.735],[6.502,49.748],[6.519,49.764],[6.518,49.785],[6.507,49.79],[6.528,49.809],[6.508,49.802],[6.472,49.822],[6.448,49.813],[6.405,49.82],[6.363,49.854],[6.312,49.835],[6.309,49.865],[6.286,49.864],[6.28,49.875],[6.237,49.892],[6.219,49.952],[6.198,49.956],[6.191,49.971],[6.179,49.96],[6.169,49.965],[6.176,49.954],[6.163,49.954],[6.155,49.983],[6.161,49.983],[6.129,49.994],[6.14,50.009],[6.121,50.016],[6.133,50.024],[6.119,50.031],[6.125,50.038],[6.111,50.06],[6.098,50.06],[6.116,50.071],[6.116,50.079],[6.103,50.075],[6.108,50.093],[6.126,50.101],[6.118,50.123],[6.15,50.137],[6.153,50.15],[6.135,50.155],[6.146,50.174],[6.157,50.171],[6.19,50.189],[6.17,50.236],[6.203,50.255],[6.276,50.265],[6.279,50.292],[6.291,50.296],[6.29,50.307],[6.302,50.307],[6.301,50.319],[6.341,50.323],[6.356,50.313],[6.403,50.322],[6.408,50.333],[6.34,50.38],[6.34,50.391],[6.362,50.405],[6.375,50.446],[6.342,50.464],[6.33,50.494],[6.315,50.503],[6.265,50.503],[6.253,50.495],[6.224,50.502],[6.181,50.533],[6.172,50.551],[6.197,50.574],[6.252,50.592],[6.278,50.616],[6.21,50.631],[6.173,50.621],[6.16,50.644],[6.178,50.645],[6.174,50.658],[6.119,50.709],[6.101,50.719],[6.029,50.725],[6.007,50.757],[6.012,50.775],[5.963,50.795],[5.975,50.814],[6,50.803],[6.027,50.815],[6.02,50.845],[6.074,50.847],[6.09,50.875],[6.076,50.895],[6.083,50.922],[6.015,50.933],[6.014,50.952],[6.002,50.959],[6.03,50.983],[5.967,50.983],[5.95,50.992],[5.904,50.978],[5.908,51.001],[5.896,51.004],[5.872,51.043],[5.872,51.051],[5.925,51.056],[5.946,51.035],[5.97,51.034],[5.966,51.042],[5.982,51.053],[5.978,51.063],[6.015,51.094],[6.039,51.096],[6.13,51.15],[6.172,51.153],[6.179,51.162],[6.145,51.174],[6.193,51.192],[6.168,51.198],[6.122,51.176],[6.092,51.175],[6.078,51.187],[6.074,51.224],[6.092,51.225],[6.078,51.245],[6.155,51.304],[6.175,51.338],[6.199,51.339],[6.232,51.366],[6.223,51.391],[6.234,51.403],[6.215,51.402],[6.214,51.41],[6.231,51.469],[6.22,51.509],[6.157,51.569],[6.091,51.605],[6.119,51.66],[6.039,51.678],[6.034,51.711],[6.051,51.717],[6.013,51.736],[5.964,51.742],[5.969,51.753],[6.005,51.768],[5.994,51.772],[6.001,51.782],[5.993,51.798],[5.965,51.813],[5.976,51.817],[5.965,51.824],[6.048,51.844],[6.068,51.865],[6.11,51.847],[6.169,51.845],[6.167,51.859],[6.145,51.871],[6.138,51.885],[6.107,51.889],[6.118,51.899],[6.159,51.905],[6.202,51.884],[6.213,51.869],[6.289,51.877],[6.305,51.871],[6.311,51.851],[6.353,51.854],[6.375,51.836],[6.387,51.841],[6.417,51.826],[6.411,51.836],[6.417,51.841],[6.399,51.86],[6.402,51.875],[6.433,51.872],[6.44,51.861],[6.463,51.869],[6.48,51.855],[6.587,51.895],[6.692,51.92],[6.731,51.895],[6.743,51.899],[6.805,51.935],[6.809,51.961],[6.838,51.966],[6.835,51.996],[6.817,51.995],[6.759,52.031],[6.698,52.04],[6.696,52.059],[6.707,52.07],[6.701,52.074],[6.743,52.075],[6.76,52.087],[6.753,52.098],[6.765,52.098],[6.768,52.121],[6.853,52.12],[6.876,52.128],[6.887,52.157],[6.916,52.178],[6.969,52.19],[6.988,52.225],[7.069,52.239],[7.031,52.276],[7.037,52.283],[7.03,52.294],[7.08,52.357],[7.079,52.383],[7.021,52.433],[7.006,52.47],[6.988,52.473],[6.951,52.437],[6.862,52.454],[6.854,52.463],[6.765,52.465],[6.714,52.484],[6.71,52.528],[6.684,52.556],[6.718,52.552],[6.73,52.567],[6.768,52.565],[6.724,52.591],[6.733,52.609],[6.719,52.63],[6.744,52.647],[6.883,52.657],[6.949,52.643],[6.988,52.65],[7.052,52.636],[7.063,52.647],[7.08,52.814],[7.1,52.836],[7.094,52.846],[7.212,52.933],[7.248,52.99],[7.261,52.998],[7.249,53.044],[7.257,53.098],[7.227,53.124],[7.263,53.16],[7.293,53.163],[7.27,53.174],[7.285,53.2],[7.272,53.234],[7.205,53.239],[7.234,53.27],[7.23,53.294],[7.249,53.33],[7.184,53.34],[7.027,53.336],[6.999,53.361],[7.011,53.384],[7.011,53.431],[7.025,53.483],[7.05,53.508],[7.034,53.533],[7.04,53.538],[7.061,53.525],[7.077,53.533],[7.095,53.519],[7.134,53.532],[7.142,53.542],[7.104,53.556],[7.09,53.577],[7.144,53.609],[7.158,53.628],[7.245,53.669],[7.317,53.683],[7.475,53.683],[7.53,53.672],[7.794,53.71],[7.911,53.718],[8.016,53.711],[8.031,53.705],[8.02,53.688],[8.045,53.642],[8.087,53.644],[8.096,53.633],[8.11,53.642],[8.115,53.637],[8.096,53.63],[8.111,53.617],[8.126,53.622],[8.113,53.615],[8.121,53.597],[8.132,53.582],[8.157,53.585],[8.14,53.577],[8.151,53.56],[8.172,53.555],[8.16,53.556],[8.17,53.541],[8.159,53.531],[8.172,53.537],[8.155,53.514],[8.094,53.502],[8.065,53.506],[8.063,53.483],[8.074,53.465],[8.099,53.446],[8.153,53.448],[8.203,53.404],[8.252,53.399],[8.292,53.423],[8.316,53.466],[8.316,53.522],[8.231,53.52],[8.241,53.579],[8.272,53.61],[8.333,53.616],[8.394,53.57],[8.465,53.553],[8.516,53.556],[8.557,53.526],[8.515,53.508],[8.52,53.501],[8.571,53.518],[8.577,53.539],[8.525,53.588],[8.521,53.607],[8.484,53.656],[8.484,53.694],[8.544,53.79],[8.54,53.802],[8.556,53.832],[8.608,53.879],[8.682,53.892],[8.689,53.878],[8.704,53.879],[8.7,53.873],[8.757,53.843],[8.884,53.828],[8.978,53.841],[9.016,53.836],[9.1,53.863],[9.096,53.888],[9.051,53.899],[8.964,53.895],[8.906,53.933],[8.875,53.967],[8.877,53.979],[8.844,54.003],[8.835,54.023],[8.82,54.022],[8.856,54.043],[8.96,54.034],[8.983,54.047],[8.983,54.066],[8.949,54.092],[8.927,54.132],[8.896,54.134],[8.859,54.123],[8.831,54.14],[8.807,54.173],[8.815,54.203],[8.835,54.218],[8.836,54.252],[8.903,54.26],[8.939,54.284],[8.952,54.313],[8.862,54.269],[8.86,54.281],[8.844,54.288],[8.86,54.278],[8.859,54.267],[8.846,54.263],[8.841,54.28],[8.823,54.292],[8.783,54.281],[8.71,54.288],[8.681,54.268],[8.657,54.278],[8.645,54.273],[8.603,54.31],[8.612,54.292],[8.592,54.3],[8.621,54.282],[8.593,54.29],[8.58,54.304],[8.587,54.338],[8.604,54.358],[8.638,54.34],[8.633,54.344],[8.649,54.351],[8.686,54.357],[8.673,54.36],[8.681,54.368],[8.646,54.367],[8.626,54.377],[8.624,54.37],[8.606,54.37],[8.609,54.386],[8.729,54.407],[8.815,54.413],[8.856,54.403],[8.894,54.412],[8.961,54.458],[9.024,54.473],[9.005,54.479],[9.012,54.49],[8.989,54.519],[8.967,54.516],[8.959,54.497],[8.904,54.461],[8.828,54.462],[8.806,54.47],[8.819,54.487],[8.805,54.498],[8.872,54.528],[8.879,54.543],[8.87,54.563],[8.89,54.593],[8.881,54.59],[8.879,54.606],[8.813,54.597],[8.809,54.603],[8.842,54.615],[8.823,54.646],[8.751,54.681],[8.745,54.708],[8.687,54.73],[8.706,54.74],[8.693,54.77],[8.605,54.841],[8.606,54.871],[8.59,54.885],[8.51,54.882],[8.416,54.847],[8.377,54.859],[8.366,54.875],[8.34,54.881],[8.329,54.867],[8.33,54.88],[8.31,54.874],[8.303,54.859],[8.333,54.863],[8.3,54.851],[8.292,54.788],[8.3,54.776],[8.299,54.742],[8.28,54.752],[8.298,54.909],[8.387,55.04],[8.417,55.057]],[[13.429,54.685],[13.438,54.677],[13.431,54.663],[13.387,54.65],[13.376,54.635],[13.389,54.601],[13.421,54.578],[13.462,54.57],[13.634,54.585],[13.68,54.563],[13.682,54.542],[13.669,54.521],[13.608,54.498],[13.574,54.477],[13.57,54.462],[13.581,54.433],[13.61,54.405],[13.674,54.401],[13.723,54.356],[13.767,54.342],[13.737,54.334],[13.717,54.31],[13.714,54.293],[13.725,54.273],[13.709,54.269],[13.686,54.282],[13.707,54.281],[13.702,54.295],[13.657,54.288],[13.646,54.297],[13.7,54.316],[13.704,54.326],[13.668,54.33],[13.611,54.316],[13.677,54.337],[13.683,54.349],[13.648,54.348],[13.614,54.331],[13.603,54.345],[13.581,54.353],[13.552,54.339],[13.506,54.344],[13.464,54.329],[13.455,54.336],[13.466,54.322],[13.421,54.303],[13.395,54.271],[13.385,54.267],[13.387,54.28],[13.352,54.27],[13.36,54.248],[13.37,54.254],[13.36,54.257],[13.366,54.264],[13.379,54.254],[13.395,54.265],[13.418,54.255],[13.424,54.238],[13.394,54.221],[13.29,54.251],[13.321,54.245],[13.324,54.266],[13.335,54.278],[13.31,54.266],[13.321,54.258],[13.27,54.254],[13.225,54.269],[13.218,54.279],[13.2,54.27],[13.196,54.284],[13.204,54.29],[13.194,54.297],[13.139,54.282],[13.14,54.297],[13.155,54.305],[13.185,54.301],[13.115,54.332],[13.127,54.371],[13.197,54.376],[13.22,54.368],[13.262,54.383],[13.237,54.388],[13.23,54.402],[13.238,54.41],[13.22,54.414],[13.211,54.43],[13.159,54.421],[13.15,54.429],[13.169,54.453],[13.193,54.455],[13.2,54.447],[13.205,54.46],[13.238,54.462],[13.231,54.468],[13.268,54.479],[13.227,54.486],[13.23,54.511],[13.159,54.504],[13.16,54.535],[13.14,54.54],[13.144,54.547],[13.255,54.552],[13.295,54.538],[13.288,54.522],[13.305,54.514],[13.312,54.523],[13.302,54.528],[13.307,54.539],[13.297,54.552],[13.354,54.581],[13.369,54.579],[13.355,54.552],[13.338,54.549],[13.356,54.545],[13.377,54.559],[13.38,54.547],[13.414,54.52],[13.407,54.507],[13.413,54.494],[13.442,54.487],[13.451,54.473],[13.506,54.481],[13.5,54.493],[13.515,54.516],[13.502,54.548],[13.447,54.551],[13.426,54.568],[13.396,54.573],[13.384,54.581],[13.37,54.615],[13.328,54.594],[13.335,54.583],[13.243,54.559],[13.289,54.627],[13.283,54.646],[13.227,54.625],[13.238,54.6],[13.229,54.587],[13.161,54.559],[13.166,54.573],[13.222,54.602],[13.227,54.613],[13.219,54.64],[13.25,54.66],[13.286,54.673],[13.429,54.685]],[[11.07,54.535],[11.234,54.507],[11.252,54.471],[11.276,54.456],[11.314,54.402],[11.245,54.412],[11.198,54.406],[11.194,54.412],[11.212,54.417],[11.186,54.42],[11.166,54.413],[11.178,54.402],[11.119,54.403],[11.095,54.41],[11.102,54.429],[11.095,54.446],[11.064,54.453],[11.025,54.445],[11.021,54.438],[11.046,54.428],[11.009,54.441],[11.004,54.45],[11.017,54.495],[11.038,54.519],[11.07,54.535]],[[8.54,54.756],[8.584,54.744],[8.581,54.73],[8.595,54.72],[8.58,54.71],[8.567,54.68],[8.48,54.681],[8.397,54.706],[8.4,54.724],[8.421,54.743],[8.54,54.756]],[[8.692,54.557],[8.707,54.554],[8.706,54.538],[8.672,54.495],[8.623,54.489],[8.589,54.512],[8.592,54.533],[8.692,54.557]],[[6.762,53.619],[6.811,53.603],[6.721,53.584],[6.756,53.569],[6.76,53.562],[6.75,53.557],[6.734,53.57],[6.722,53.558],[6.663,53.578],[6.656,53.6],[6.631,53.598],[6.636,53.613],[6.67,53.604],[6.762,53.619]],[[8.357,54.712],[8.339,54.689],[8.361,54.65],[8.382,54.641],[8.386,54.628],[8.404,54.626],[8.386,54.624],[8.4,54.618],[8.395,54.612],[8.363,54.608],[8.292,54.667],[8.357,54.712]]],Oe=2e4,$t=r=>()=>(r=r*16807%2147483647,(r-1)/2147483646);function pp(){const r=new Float32Array(Oe*3),e=$t(3);for(let t=0;t<Oe;t++){const n=e()*2-1,i=e()*Math.PI*2,s=Math.sqrt(1-n*n),o=e()<.12?Math.cbrt(e())*.95:1-Math.pow(e(),3)*.07;r.set([Math.cos(i)*s*o,n*o,Math.sin(i)*s*o],t*3)}return r}function Wa(r,{w:e=600,h:t=600,size:n=1.7,depth:i=.08,seed:s=7}={}){const o=document.createElement("canvas");o.width=e,o.height=t;const a=o.getContext("2d",{willReadFrequently:!0});a.fillStyle="#000",a.strokeStyle="#000",r(a,e,t);const l=a.getImageData(0,0,e,t).data,c=[];for(let d=0;d<e*t;d++)l[d*4+3]>8&&c.push(d);const u=new Float32Array(Oe*3),h=$t(s),f=n/Math.max(e,t);if(!c.length)return u;for(let d=0;d<Oe;d++){let g;do g=c[Math.floor(h()*c.length)];while(h()*255>l[g*4+3]);const _=g%e,p=Math.floor(g/e);u.set([(_+h()-e/2)*f,-(p+h()-t/2)*f,(h()-.5)*i],d*3)}return u}const eu='-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',Bg=(r,{weight:e=500}={})=>Wa((t,n,i)=>{let s=i*.62;t.font=`${e} ${s}px ${eu}`;const o=t.measureText(r).width;o>n*.94&&(s*=n*.94/o,t.font=`${e} ${s}px ${eu}`),t.textAlign="center",t.textBaseline="middle",t.fillText(r,n/2,i/2+s*.04)},{w:900,h:420,size:3.3,depth:.14,seed:r.length*31+5}),Li=(r,e,t,n,i,s)=>{r.beginPath(),r.roundRect(e,t,n,i,s)},zg=()=>Wa((r,e,t)=>{const n=e*.42,i=t*.86,s=(e-n)/2,o=(t-i)/2;r.lineWidth=9,Li(r,s,o,n,i,n*.16),r.stroke(),Li(r,s+n*.36,o+i*.025,n*.28,i*.03,20),r.fill(),r.font=`600 ${n*.2}px ${eu}`,r.textAlign="center",r.fillText("00:00",e/2,o+i*.3),Li(r,s+n*.1,o+i*.4,n*.37,i*.13,18),r.fill(),Li(r,s+n*.53,o+i*.4,n*.37,i*.13,18),r.fill(),r.lineWidth=4;for(let a=0;a<3;a++)r.beginPath(),r.moveTo(s+n*.1,o+i*(.62+a*.06)),r.lineTo(s+n*.9,o+i*(.62+a*.06)),r.stroke();Li(r,s+n*.1,o+i*.84,n*.8,i*.06,30),r.fill()},{size:1.9,depth:.12,seed:11}),kg=()=>Wa((r,e,t)=>{const n=e*.88,i=t*.6,s=(e-n)/2,o=(t-i)/2;r.lineWidth=7,Li(r,s,o,n/2-6,i,18),r.stroke(),Li(r,e/2+6,o,n/2-6,i,18),r.stroke(),r.lineWidth=3;for(let a=1;a<9;a++){const l=o+i*a/9;r.beginPath(),r.moveTo(e/2+30,l),r.lineTo(s+n-24,l),r.stroke()}for(let a=0;a<4;a++)Li(r,s+30,o+30+a*i*.22,(n/2-70)*[.9,.6,.75,.45][a],i*.13,10),r.fill()},{size:2.1,depth:.1,seed:13}),Hg=()=>Wa((r,e,t)=>{const n=e*.9,i=t*.58,s=(e-n)/2,o=(t-i)/2;r.lineWidth=6,Li(r,s,o,n,i,22),r.stroke(),r.beginPath(),r.arc(e/2,t/2,i*.3,0,Math.PI*2),r.fill(),r.fillRect(s+n*.06,t/2-6,n*.16,12),r.fillRect(s+n*.78,t/2-6,n*.16,12);for(let a=0;a<3;a++)r.fillRect(e/2-70+a*50,o+22,36,8)},{size:2.2,depth:.1,seed:17});function Gg(r=6){const e=new Float32Array(Oe*3),t=$t(23),n=Math.ceil(Oe/r);for(let i=0;i<Oe;i++){const s=Math.min(r-1,Math.floor(i/n)),o=t()*2-1,a=t()*2-1,l=t()<.35,c=l&&t()<.5?Math.sign(o):o,u=l?t()<.5?a:Math.sign(a):a;e.set([c*.78,.95-s*(1.9/(r-1)),u*.78],i*3)}return e}const Vg=(r,e=6)=>Math.min(e-1,Math.floor(r/Math.ceil(Oe/e)));function Wg(){const r=new Float32Array(Oe*3),e=$t(41),t=2,n=5,i=1,s=.42;for(let o=0;o<Oe;o++){const a=e()*Math.PI*2,l=[(i+s*Math.cos(n*a))*Math.cos(t*a),s*Math.sin(n*a),(i+s*Math.cos(n*a))*Math.sin(t*a)],c=e()<.32,u=c?.22*Math.pow(e(),.6):.035*Math.sqrt(e()),h=e()*Math.PI*2,f=Math.acos(2*e()-1);r.set([(l[0]+Math.cos(h)*Math.sin(f)*u)/1.45,(l[1]+Math.cos(f)*u)/1.45,(l[2]+Math.sin(h)*Math.sin(f)*u)/1.45],o*3)}return r}function Xg(){const r=new Float32Array(Oe*3),e=$t(43);for(let t=0;t<Oe;t++){const n=e();let i;if(n<.5){const s=e()*Math.PI*2,o=.92+(e()-.5)*.08;i=[Math.cos(s)*o,Math.sin(s)*o,(e()-.5)*.16]}else if(n<.66){const s=Math.floor(e()*12),o=s/12*Math.PI*2,a=.7+e()*(s%3?.1:.16);i=[Math.cos(o)*a+(e()-.5)*.02,Math.sin(o)*a+(e()-.5)*.02,(e()-.5)*.04]}else if(n<.78){const s=Math.PI/2-.8333333333333334*Math.PI*2,o=e()*.45;i=[Math.cos(s)*o+(e()-.5)*.04,Math.sin(s)*o+(e()-.5)*.04,.05]}else if(n<.92){const s=Math.PI/2-.16666666666666666*Math.PI*2,o=e()*.68;i=[Math.cos(s)*o+(e()-.5)*.025,Math.sin(s)*o+(e()-.5)*.025,.08]}else{const s=e()*Math.PI*2,o=Math.sqrt(e())*.88;i=[Math.cos(s)*o,Math.sin(s)*o,-.08]}r.set(i,t*3)}return r}function qg(){const r=new Float32Array(Oe*3),e=$t(47),t=2.6,n=1.9,i=.42;for(let s=0;s<Oe;s++){const o=e(),a=(e()-.5)*n,l=a/n*t*Math.PI*2;let c;if(o<.72){const u=e()<.5?0:Math.PI,h=.05;c=[Math.cos(l+u)*i+(e()-.5)*h,a+(e()-.5)*h,Math.sin(l+u)*i+(e()-.5)*h]}else{const u=Math.round(a/(n/26))*(n/26),h=u/n*t*Math.PI*2,f=e()*2-1;c=[Math.cos(h)*i*f,u+(e()-.5)*.015,Math.sin(h)*i*f]}r.set(c,s*3)}return r}function Yg(){const r=new Float32Array(Oe*3),e=$t(53);for(let t=0;t<Oe;t++){const n=e()*2-1,i=e()*2-1,s=Math.sin(n*4.2)*.12+Math.cos(i*3.4+n*1.5)*.1;r.set([n*1.15,s,i*.85],t*3)}return r}const _t=r=>Math.sqrt(-2*Math.log(r()+1e-9))*Math.cos(2*Math.PI*r());function jg(){const r=new Float32Array(Oe*3),e=$t(59),t=.32;for(let n=0;n<Oe;n++){const i=e();let s;if(i<.3){const o=.1*Math.pow(e(),.5)+.02;s=[_t(e)*o,_t(e)*o*.6,_t(e)*o]}else if(i<.45){const o=Math.min(1.1,-Math.log(e()+1e-9)*.28),a=e()*Math.PI*2;s=[Math.cos(a)*o,_t(e)*.015,Math.sin(a)*o]}else if(i<.97){const o=e()<.78,a=o?Math.floor(e()*2):Math.floor(e()*2)+.5,l=.1+Math.pow(e(),1.25)*1,c=a*Math.PI+Math.log(l/.1)/Math.tan(t)*.38,u=(o?.03:.022)+l*.035,h=_t(e)*u,f=_t(e)*u*.6;s=[Math.cos(c)*l-Math.sin(c)*h+Math.cos(c)*f,_t(e)*.012,Math.sin(c)*l+Math.cos(c)*h+Math.sin(c)*f]}else{const o=.2+e()*1.2,a=e()*Math.PI*2;s=[Math.cos(a)*o,_t(e)*.2,Math.sin(a)*o]}r.set(s,n*3)}return r}const Ls=[9.99,53.55],$g=()=>Wa((r,e,t)=>{const n=t/9.2,i=([l,c])=>[(l-10.45)*.63*n+e/2,-(c-51.15)*n+t/2];(()=>{r.beginPath();for(const l of Fg)l.forEach((c,u)=>{const[h,f]=i(c);u?r.lineTo(h,f):r.moveTo(h,f)})})(),r.fillStyle="rgba(0,0,0,0.03)",r.fill("evenodd"),r.lineWidth=3,r.lineJoin="round",r.strokeStyle="#000",r.stroke();const[o,a]=i(Ls);r.fillStyle="#000",r.beginPath(),r.arc(o,a,7,0,Math.PI*2),r.fill(),r.lineWidth=2,r.beginPath(),r.arc(o,a,22,0,Math.PI*2),r.stroke()},{w:900,h:900,size:2.4,depth:.05,seed:61}),Qf=[[-74,40.7],[-122.4,37.8],[139.7,35.7],[151.2,-33.9],[18.4,-33.9],[-46.6,-23.5],[55.3,25.2],[103.8,1.35],[-.1,51.5],[77.2,28.6]],Ar=(r,e,t=1)=>{const n=r*Math.PI/180,i=e*Math.PI/180;return[Math.cos(i)*Math.cos(n)*t,Math.sin(i)*t,-Math.cos(i)*Math.sin(n)*t]};function Kg(){const r=new Float32Array(Oe*3),e=$t(67);for(let t=0;t<Oe;t++){const n=e();let i;if(n<.46){const s=1+(e()-.5)*.012;if(e()<.5){const o=Math.floor(e()*8)*45,a=e()*180-90;i=Ar(o,a,s)}else{const o=(Math.floor(e()*5)-2)*30,a=e()*360;i=Ar(a,o,s)}}else if(n<.56){const s=e()*360,o=Math.asin(e()*2-1)*180/Math.PI;i=Ar(s,o)}else if(n<.6){const s=e()*Math.PI*2,o=Math.sqrt(e())*4;i=Ar(Ls[0]+Math.cos(s)*o,Ls[1]+Math.sin(s)*o,1.01)}else{const s=Qf[Math.floor(e()*Qf.length)],o=e(),a=Ar(...Ls),l=Ar(...s),c=[a[0]+(l[0]-a[0])*o,a[1]+(l[1]-a[1])*o,a[2]+(l[2]-a[2])*o],u=Math.hypot(...c)||1,h=1+Math.sin(o*Math.PI)*.22;i=[c[0]/u*h,c[1]/u*h,c[2]/u*h]}r.set(i,t*3)}return r}function Zg(){const r=new Float32Array(Oe*3),e=new Float32Array(Oe),t=$t(71),n=[[.26,.026,.4],[.36,.034,2.1],[.48,.038,4],[.68,.07,1.2],[.86,.058,3.3,!0],[1.04,.044,5.4]],i=s=>.045/Math.pow(s,1.5);for(let s=0;s<Oe;s++){const o=t();let a,l=0;if(o<.2){const c=.11*Math.cbrt(t()),u=t()*Math.PI*2,h=Math.acos(2*t()-1);a=[Math.sin(h)*Math.cos(u)*c,Math.cos(h)*c,Math.sin(h)*Math.sin(u)*c],l=.15}else if(o<.26){const c=.11+Math.pow(t(),2)*.12,u=t()*Math.PI*2,h=Math.acos(2*t()-1);a=[Math.sin(h)*Math.cos(u)*c,Math.cos(h)*c,Math.sin(h)*Math.sin(u)*c],l=.1}else if(o<.5){const c=n[Math.floor(t()*n.length)],u=t()*Math.PI*2,h=c[0]+_t(t)*.003;a=[Math.cos(u)*h,_t(t)*.002,Math.sin(u)*h],l=i(c[0])*.3}else if(o<.57){const c=.55+t()*.06,u=t()*Math.PI*2;a=[Math.cos(u)*c,_t(t)*.008,Math.sin(u)*c],l=i(c)}else{const c=n[Math.floor(t()*n.length)],u=[Math.cos(c[2])*c[0],0,Math.sin(c[2])*c[0]];if(c[3]&&t()<.4){const h=t()*Math.PI*2,f=c[1]*(1.5+t()*.8);a=[u[0]+Math.cos(h)*f,Math.sin(h)*f*.35,u[2]+Math.sin(h)*f*.9]}else{const h=c[1]*Math.cbrt(t()),f=t()*Math.PI*2,d=Math.acos(2*t()-1);a=[u[0]+Math.sin(d)*Math.cos(f)*h,Math.cos(d)*h,u[2]+Math.sin(d)*Math.sin(f)*h]}l=i(c[0])}r.set(a,s*3),e[s]=l}return r.spin=e,r}function Jg(){const r=new Float32Array(Oe*3),e=new Float32Array(Oe),t=new Float32Array(Oe*3),n=$t(73),i=[[-.18,.02,0,.36,.05,[[.58,.05,.32,.4],[.78,.032,-.2,2.6]],!1],[.92,.42,-.25,.17,.08,[[.32,.03,.5,1.1]],!0],[-.98,-.5,.3,.1,.1,[[.2,.02,.7,4.2]],!1]],s=i.map(l=>l[3]*l[3]+.02),o=s.reduce((l,c)=>l+c),a=(l,c,u)=>{const h=n()*Math.PI*2,f=n()*2-1,d=Math.sqrt(1-f*f),g=u?c*(1-Math.pow(n(),4)*.08):c*Math.cbrt(n());return[l[0]+Math.cos(h)*d*g,l[1]+f*g,l[2]+Math.sin(h)*d*g]};for(let l=0;l<Oe;l++){let c=n()*o,u=0;for(;c>s[u]&&u<i.length-1;)c-=s[u++];const[h,f,d,g,_,p,m]=i[u],y=[h,f,d],v=n();let S,M,A=y;if(v<.78-(m?.2:0)){do S=a(y,g,!0);while(n()>.55+.45*Math.abs(Math.sin((S[1]-f)/g*7)));M=_}else if(m&&v<.78){const T=n()*Math.PI*2,P=g*(1.45+n()*.7),x=.42;S=[h+Math.cos(T)*P,f+Math.sin(T)*P*Math.sin(x)*.5,d+Math.sin(T)*P*Math.cos(x)],M=_*1.5}else{const T=p[Math.floor(n()*p.length)],P=[h+Math.cos(T[3])*T[0],f+(n()-.5)*.004,d+Math.sin(T[3])*T[0]];S=a(P,T[1],!1),M=T[2]}r.set(S,l*3),e[l]=M,t.set(A,l*3)}return r.spin=e,r.center=t,r}const ed=.2;function Qg(){const r=new Float32Array(Oe*3),e=new Float32Array(Oe),t=$t(79),n=Math.cos(-ed),i=Math.sin(-ed),s=(o,a)=>[o,a*n,a*i];for(let o=0;o<Oe;o++){const a=t();let l,c=0;if(a<.6){const u=.34+Math.min(.8,-Math.log(t()+1e-9)*.15),h=t()*Math.PI*2;l=[Math.cos(h)*u,_t(t)*.006*(.5+u),Math.sin(h)*u],c=.11/Math.pow(u,1.5)}else if(a<.86){let u;do u=t()*Math.PI*2;while(t()>.25+.75*Math.abs(Math.sin(u)));const h=.355+Math.abs(_t(t))*.04;l=s(Math.cos(u)*h,Math.sin(u)*h*.92)}else if(a<.96){const u=t()*Math.PI*2,h=.3+_t(t)*.004;l=s(Math.cos(u)*h,Math.sin(u)*h)}else{const u=.5+t()*.9,h=t()*Math.PI*2;l=[Math.cos(h)*u,_t(t)*.08,Math.sin(h)*u],c=.11/Math.pow(u,1.5)}r.set(l,o*3),e[o]=c}return r.spin=e,r}const tu=(r,e,t)=>{const n=Math.sin(r*7+e*3)*Math.sin(e*6-t*4)+Math.sin(t*8+r*2)*.6+Math.sin((r+e+t)*11)*.3;return Math.pow(Math.min(1,Math.abs(n)/1.6),3)};function e6(){const r=new Float32Array(Oe*3),e=$t(83),t=()=>{const n=e()*Math.PI*2,i=e()*2-1,s=Math.sqrt(1-i*i);return[Math.cos(n)*s,i,Math.sin(n)*s]};for(let n=0;n<Oe;n++){const i=e();let s;if(i<.12){const o=.03+e()*.015;s=[_t(e)*o,_t(e)*o,_t(e)*o]}else if(i<.7){let o;do o=t();while(e()>tu(...o));const a=.72+_t(e)*.018+tu(o[1],o[2],o[0])*.1;s=o.map(l=>l*a)}else if(i<.86){const o=Math.floor(e()*26),a=$t(o*97+1),l=[a()*2-1,a()*2-1,a()*2-1],c=Math.hypot(...l)||1,u=.08+Math.pow(e(),.7)*.75;s=l.map(h=>h/c*u+_t(e)*.004)}else if(i<.93){const o=t(),a=.1+Math.pow(e(),.5)*.55;s=o.map(l=>l*a)}else{const o=t(),a=.85+Math.pow(e(),2)*.5;s=o.map(l=>l*a)}r.set(s,n*3)}return r}function t6(r=2){const e=(1+Math.sqrt(5))/2;let t=[[-1,e,0],[1,e,0],[-1,-e,0],[1,-e,0],[0,-1,e],[0,1,e],[0,-1,-e],[0,1,-e],[e,0,-1],[e,0,1],[-e,0,-1],[-e,0,1]].map(s=>{const o=Math.hypot(...s);return s.map(a=>a/o)}),n=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let s=0;s<r;s++){const o=new Map,a=(l,c)=>{const u=l<c?`${l}_${c}`:`${c}_${l}`;if(!o.has(u)){const h=t[l].map((d,g)=>(d+t[c][g])/2),f=Math.hypot(...h);t.push(h.map(d=>d/f)),o.set(u,t.length-1)}return o.get(u)};n=n.flatMap(([l,c,u])=>{const h=a(l,c),f=a(c,u),d=a(u,l);return[[l,h,d],[c,f,h],[u,d,f],[h,f,d]]})}const i=new Map;return n.forEach(([s,o,a])=>[[s,o],[o,a],[a,s]].forEach(([l,c])=>i.set(l<c?`${l}_${c}`:`${c}_${l}`,[l,c]))),{v:t,e:[...i.values()]}}function n6(){const r=new Float32Array(Oe*3),e=$t(89),{v:t,e:n}=t6(1),i=o=>o[0]+Math.sin(o[1]*9)*.08+Math.sin(o[2]*7+o[1]*3)*.06,s=[.55,.5,.67];for(let o=0;o<Oe;o++){let a;if(e()<.36)do if(e()<.14)a=t[Math.floor(e()*t.length)].map(c=>c*1.002+_t(e)*.01);else{const[l,c]=n[Math.floor(e()*n.length)],u=e();a=t[l].map((h,f)=>h+(t[c][f]-h)*u)}while(e()>1-td(-.12,.12,i(a)));else do{const l=e()*Math.PI*2,c=e()*2-1,u=Math.sqrt(1-c*c),h=.7+.3*tu(c*.9,Math.cos(l)*u*1.1,Math.sin(l)*u);a=[Math.cos(l)*u*(.995+h*.01),c,Math.sin(l)*u];const f=Math.max(.06,a[0]*s[0]+a[1]*s[1]+a[2]*s[2]);if(e()<td(-.12,.12,i(a))*h*Math.min(1,f*1.8))break}while(!0);r.set([-a[0],a[1],a[2]],o*3)}return r}const td=(r,e,t)=>{const n=Math.min(1,Math.max(0,(t-r)/(e-r)));return n*n*(3-2*n)};function i6(){const r=new Float32Array(Oe*3),e=$t(97),t=(i,s)=>{const o=e()*Math.PI*2,a=e()*2-1,l=Math.sqrt(1-a*a),c=s*Math.cbrt(e());return[i[0]+Math.cos(o)*l*c,i[1]+a*c,i[2]+Math.sin(o)*l*c]},n=[[-1.15,-.95,.2,.16,2],[1.55,.95,-.3,.11,1],[2.2,-.35,.4,.07,1],[-2.3,.35,-.2,.09,0]];for(let i=0;i<Oe;i++){const s=e();let o;if(s<.46)o=[(e()*2-1)*2.9,(e()*2-1)*1.75,(e()*2-1)*1.4];else if(s<.55)o=e()<.75?t([-2.05,1.15,-.6],.085):t([-2.05,1.15,-.6],.24);else if(s<.74){const a=n[Math.floor(e()*n.length)];if(a[4]&&e()<.18){const l=Math.floor(e()*a[4]),c=.9+l*2.3;o=t([a[0]+Math.cos(c)*a[3]*2.4,a[1]+Math.sin(c)*a[3]*1.2,a[2]],a[3]*.22)}else{const l=e()*Math.PI*2,c=e()*2-1,u=Math.sqrt(1-c*c);o=[a[0]+Math.cos(l)*u*a[3],a[1]+c*a[3],a[2]+Math.sin(l)*u*a[3]]}}else if(s<.88){const a=Math.pow(e(),1.2)*.5,l=Math.floor(e()*2),c=l*Math.PI+a*9+_t(e)*.25,u=Math.cos(c)*a,h=Math.sin(c)*a;o=[1.75+u,-1.05+h*.35+_t(e)*.01,-.8+h*.9]}else o=[.7+_t(e)*.45,.95+_t(e)*.22,-1.1+_t(e)*.3];r.set(o,i*3)}return r}function r6(){const r=new Float32Array(Oe*3),e=$t(101),t=3,n=.3,i=.56,s=(t-1)*i/2,o=[];for(let l=0;l<t;l++)for(let c=0;c<t;c++)for(let u=0;u<t;u++)o.push([l*i-s,c*i-s,u*i-s]);const a=n/2;for(let l=0;l<Oe;l++){const c=o[Math.floor(e()*o.length)];let u;if(e()<.93){const h=Math.floor(e()*3),f=[e()<.5?-a:a,e()<.5?-a:a,e()<.5?-a:a];f[h]=(e()*2-1)*a,u=f.map(d=>d+_t(e)*.002)}else{const h=Math.floor(e()*3),f=[(e()*2-1)*a,(e()*2-1)*a,(e()*2-1)*a];f[h]=e()<.5?-a:a,u=f}r.set([c[0]+u[0],c[1]+u[1],c[2]+u[2]],l*3)}return r}function s6(){const r=new Float32Array(Oe*3),e=new Float32Array(Oe),t=$t(103),n=[];for(let s=0;s<16;s++)n.push([s&1?1:-1,s&2?1:-1,s&4?1:-1,s&8?1:-1]);const i=[];for(let s=0;s<16;s++)for(let o=s+1;o<16;o++){const a=s^o;a&a-1||i.push([s,o])}for(let s=0;s<Oe;s++){let o;if(t()<.1)o=n[Math.floor(t()*16)].map(l=>l+_t(t)*.025);else{const[a,l]=i[Math.floor(t()*i.length)],c=t();o=n[a].map((u,h)=>u+(n[l][h]-u)*c+_t(t)*.004)}r.set([o[0],o[1],o[2]],s*3),e[s]=o[3]}return r.w=e,r}function a6(){const t=document.createElement("canvas");t.width=1440,t.height=720;const n=t.getContext("2d",{willReadFrequently:!0}),i=([c,u])=>[(c+180)/360*1440,(90-u)/180*720];n.beginPath();for(const c of Og)c.forEach((u,h)=>{const[f,d]=i(u);h?n.lineTo(f,d):n.moveTo(f,d)});n.fillStyle="rgba(0,0,0,0.07)",n.fill("evenodd"),n.lineWidth=2,n.lineJoin="round",n.strokeStyle="#000",n.stroke();const s=n.getImageData(0,0,1440,720).data,o=[];for(let c=0;c<1440*720;c++)s[c*4+3]>8&&o.push(c);const a=new Float32Array(Oe*3),l=$t(107);for(let c=0;c<Oe;c++){let u,h,f=1;const d=l();if(d<.06)u=l()*360-180,h=Math.asin(l()*2-1)*180/Math.PI;else if(d<.1){const g=l()*Math.PI*2,_=Math.sqrt(l())*2.2;u=Ls[0]+Math.cos(g)*_,h=Ls[1]+Math.sin(g)*_,f=1.01}else{let g;do g=o[Math.floor(l()*o.length)];while(l()*255>s[g*4+3]);u=(g%1440+l())/1440*360-180,h=90-(Math.floor(g/1440)+l())/720*180}a.set(Ar(u,h,f),c*3)}return a}const o6={sphere:pp,phone:zg,journal:kg,site:Hg,stack:Gg,knot:Wg,clock:Xg,dna:qg,wave:Yg,galaxy:jg,germany:$g,globe:Kg,solar:Zg,planets:Jg,blackhole:Qg,supernova:e6,render:n6,cosmos:i6,blocks:r6,tesseract:s6,earth:a6},fc=new Map;function Ta(r){if(fc.has(r))return fc.get(r);const e=r.startsWith("text:")?Bg(r.slice(5)):(o6[r]??pp)();return fc.set(r,e),e}const nu={gather:0,layer:-1},l6=`
attribute vec3 aA, aB; attribute vec4 aR; attribute float aL, aSA, aSB; attribute vec3 aCA, aCB, aSpace; attribute float aWA, aWB;
uniform float uTime, uMix, uGather, uPR, uR, uLayer, uAlpha;
uniform vec2 uRes, uMouse, uOff, uHyper;
uniform vec4 uRotA, uRotB; // per form: turn about y, tilt about x, sway (1) or free (0), breath
varying float vA; varying float vGlow;
mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
// a four-dimensional form (the tesseract): turned in the xw and yw planes, then projected to 3D
vec3 hyper(vec3 p, float w) {
  vec4 q = vec4(p, w);
  q.xw = rot(uTime * .23) * q.xw; q.yw = rot(uTime * .14) * q.yw;
  return q.xyz * (1.7 / (2.7 - q.w)) * .6;
}
vec3 turn(vec3 p, vec4 r) {
  float a = mix(uTime * .045, sin(uTime * .18) * .12, r.z) + r.x;
  p.xz = rot(a) * p.xz;
  p.yz = rot(r.y) * p.yz;
  return p;
}
void main() {
  float m = smoothstep(0., 1., clamp(uMix * 1.35 - aR.w * .35, 0., 1.)); // a little staggered
  // a form can move within itself: each point circles a vertical axis through its own centre
  // (a moon its planet, a planet the sun) at its own speed
  vec3 a0 = (uHyper.x > .5 ? hyper(aA, aWA) : aA) - aCA, b0 = (uHyper.y > .5 ? hyper(aB, aWB) : aB) - aCB;
  a0.xz = rot(uTime * aSA) * a0.xz; b0.xz = rot(uTime * aSB) * b0.xz;
  a0 += aCA; b0 += aCB;
  // breathing: slow waves running outwards from the centre (for forms that ask for it)
  a0 *= 1. + uRotA.w * .045 * sin(uTime * .9 - length(a0) * 5.);
  b0 *= 1. + uRotB.w * .045 * sin(uTime * .9 - length(b0) * 5.);
  vec3 a = turn(a0, uRotA), b = turn(b0, uRotB);
  // on the way from one form to the next the points do not travel straight: they wind round the
  // vertical axis like a vortex — angle, radius and height each blend on their own — the vortex
  // turning a little further and widening halfway, then settling into the new form
  float way = sin(m * 3.14159);
  float ra = length(a.xz), rb = length(b.xz), ta = atan(a.z, a.x), tb = atan(b.z, b.x);
  float dt = mod(tb - ta + 3.14159, 6.28318) - 3.14159;
  float ang = ta + dt * m + way * (1.1 + aR.x * 1.4);
  float rr = mix(ra, rb, m) * (1. + way * (.18 + aR.y * .2));
  vec3 p = vec3(cos(ang) * rr, mix(a.y, b.y, m) + way * (aR.z - .5) * .35, sin(ang) * rr);
  vec3 dir = normalize(aR.xyz - .5 + .001);
  p += dir * way * .03;
  // dust, not lines: every point sits a little off its form, for good
  p += dir * (aR.y - .5) * .018;
  // gathering: from space (the loader's sky of stars, planets and suns) into the form
  float g = smoothstep(0., 1., clamp(uGather * 1.5 - aR.z * .5, 0., 1.));
  vec3 sky = aSpace; sky.xz = rot(uTime * .01) * sky.xz;
  float flight = sin(g * 3.14159);
  p = mix(sky, p, g) + dir * flight * .25;
  // a breath
  p += vec3(sin(uTime * .25 + aR.x * 30.), cos(uTime * .2 + aR.y * 30.), sin(uTime * .22 + aR.z * 30.)) * .004;
  float persp = 4. / (4. - p.z);
  vec2 q = uRes * .5 + uOff + vec2(p.x, -p.y) * uR * persp;
  // the pointer only lights the points near it — nothing moves
  vec2 d = q - uMouse; float near = exp(-dot(d, d) / 9000.);
  gl_Position = vec4(q.x / uRes.x * 2. - 1., 1. - q.y / uRes.y * 2., 0., 1.);
  float lit = (uLayer >= 0. && abs(aL - uLayer) < .5) ? 1. : 0.;
  vGlow = max(near, lit * (1. - m) * (1. - m));
  // mostly fine dust, now and then a brighter grain; each one glimmers slowly on its own
  float grain = step(.975, aR.x);
  gl_PointSize = (.7 + aR.z * .9 + grain * 1.3) * uPR * persp * (1. + vGlow * .35);
  float twinkle = .7 + .3 * sin(uTime * (.4 + aR.w * .8) + aR.y * 40.);
  vA = (.22 + .6 * clamp(.5 + p.z * .5, 0., 1.)) * twinkle * (1. + grain * .8) * mix(.9, uAlpha, g);
}`,c6=`
uniform vec3 uInk, uAccent;
varying float vA; varying float vGlow;
void main() {
  float d = length(gl_PointCoord - .5);
  // the points a shade under the type; where they are lit, the highlight, brighter and fuller
  float k = clamp(vGlow * 1.3, 0., 1.);
  vec3 c = mix(uInk * .82, uAccent, k);
  gl_FragColor = vec4(c, smoothstep(.5, .12, d) * min(1., vA * (1. + k * 1.6) + k * .35));
}`,u6={left:-1,center:0,right:1};function h6(){const r=Ge.useRef();return Ge.useEffect(()=>{const e=r.current;let t;try{t=new up({canvas:e,antialias:!1,alpha:!0})}catch{return}const n=Math.min(devicePixelRatio||1,2);t.setPixelRatio(n),Ig();const i=new zi,s=new Ut(new Float32Array(Oe*3),3),o=new Ut(new Float32Array(Oe*3),3),a=new Ut(new Float32Array(Oe),1),l=new Ut(new Float32Array(Oe),1),c=new Ut(new Float32Array(Oe*3),3),u=new Ut(new Float32Array(Oe*3),3),h=new Ut(new Float32Array(Oe),1),f=new Ut(new Float32Array(Oe),1),d=new Float32Array(Oe*4),g=new Float32Array(Oe);for(let V=0;V<Oe;V++){for(let z=0;z<4;z++)d[V*4+z]=Math.random();g[V]=Vg(V)}i.setAttribute("position",new Ut(new Float32Array(Oe*3),3)),i.setAttribute("aA",s),i.setAttribute("aB",o),i.setAttribute("aSA",a),i.setAttribute("aSB",l),i.setAttribute("aCA",c),i.setAttribute("aCB",u),i.setAttribute("aWA",h),i.setAttribute("aWB",f),i.setAttribute("aSpace",new Ut(Ta("cosmos"),3)),i.setAttribute("aR",new Ut(d,4)),i.setAttribute("aL",new Ut(g,1));const _={uTime:{value:0},uMix:{value:0},uGather:{value:0},uPR:{value:n},uR:{value:200},uLayer:{value:-1},uAlpha:{value:1},uRes:{value:new ht},uHyper:{value:new ht},uMouse:{value:new ht(-1e4,-1e4)},uOff:{value:new ht},uRotA:{value:new qt},uRotB:{value:new qt},uInk:{value:new Z},uAccent:{value:new Z}},p=new fr({vertexShader:l6,fragmentShader:c6,uniforms:_,transparent:!0,depthWrite:!1,depthTest:!1}),m=new Lg,y=new Uu,v=new Ug(i,p);v.frustumCulled=!1,m.add(v);let S=[];const M=()=>{S=[...document.querySelectorAll("[data-form]")].map(V=>({el:V,form:V.dataset.form,at:u6[V.dataset.at??"center"]??0,size:parseFloat(V.dataset.size??"1"),sway:V.dataset.spin==="sway"?1:0,tilt:parseFloat(V.dataset.tilt??"0.3"),breath:V.hasAttribute("data-breath")?1:0,solid:V.hasAttribute("data-solid"),alpha:V.dataset.alpha?parseFloat(V.dataset.alpha):null}))};M();const A=new MutationObserver(M);A.observe(document.body,{childList:!0,subtree:!0});let T="";const P=(V,z)=>{const R=`${V.form}>${z.form}`;if(R===T)return;T=R;const D=Ta(V.form),k=Ta(z.form);s.array.set(D),s.needsUpdate=!0,o.array.set(k),o.needsUpdate=!0,D.spin?a.array.set(D.spin):a.array.fill(0),a.needsUpdate=!0,k.spin?l.array.set(k.spin):l.array.fill(0),l.needsUpdate=!0,D.center?c.array.set(D.center):c.array.fill(0),c.needsUpdate=!0,k.center?u.array.set(k.center):u.array.fill(0),u.needsUpdate=!0,D.w?h.array.set(D.w):h.array.fill(0),h.needsUpdate=!0,k.w?f.array.set(k.w):f.array.fill(0),f.needsUpdate=!0,_.uHyper.value.set(D.w?1:0,k.w?1:0)},x={x:-1e4,y:-1e4},E=V=>{V.pointerType!=="touch"&&(x.x=V.clientX,x.y=V.clientY)};window.addEventListener("pointermove",E,{passive:!0});const B=Ft(),N=performance.now();let j=0,L="",I=!0;const $=V=>V*V*(3-2*V),O=V=>{j=0;const z=innerWidth,R=innerHeight,D=z<900;L!==`${z}x${R}`&&(L=`${z}x${R}`,t.setSize(z,R,!1));let k=0,oe=0;const te=S.map(ie=>{const pe=ie.el.getBoundingClientRect();return pe.top+pe.height/2-R/2});if(S.length){k=te.findLastIndex(H=>H<=0),k<0?(k=0,oe=0):k>=S.length-1?(k=S.length-1,oe=0):oe=-te[k]/(te[k+1]-te[k]);const ie=S[k],pe=S[Math.min(k+1,S.length-1)];P(ie,pe);const Te=$(Math.min(1,Math.max(0,(oe-.25)/.5)));_.uMix.value=Te;const be=ie.at+(pe.at-ie.at)*Te,we=ie.size+(pe.size-ie.size)*Te;_.uOff.value.set(D?0:be*z*.191,0),_.uR.value=D?z*.36*Math.min(1.2,we*1.25):Math.min(z*.5,R)*.3*we;const ct=ie.alpha??(D&&!ie.solid?.3:1),Ue=pe.alpha??(D&&!pe.solid?.3:1);_.uAlpha.value=ct+(Ue-ct)*Te,_.uRotA.value.set(0,ie.tilt,ie.sway,ie.breath),_.uRotB.value.set(0,pe.tilt,pe.sway,pe.breath)}_.uTime.value=B?3:(V-N)/1e3,_.uRes.value.set(z,R),_.uMouse.value.set(x.x,x.y),_.uGather.value=nu.gather,_.uLayer.value=nu.layer,_.uInk.value.fromArray(Ss.ink),_.uAccent.value.fromArray(Ss.accent),t.render(m,y),I&&(j=requestAnimationFrame(O))};return j=requestAnimationFrame(O),()=>{I=!1,cancelAnimationFrame(j),A.disconnect(),window.removeEventListener("pointermove",E),i.dispose(),p.dispose(),t.dispose()}},[]),K.jsx("canvas",{ref:r,"aria-hidden":!0,className:"fixed inset-0 w-full h-full pointer-events-none z-0"})}const mp=r=>{const e=document.getElementById(r);e&&I1(e)},nd=()=>new Intl.DateTimeFormat("de-DE",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Berlin"}).format(new Date);function _p(){const[r,e]=Ge.useState(nd);return Ge.useEffect(()=>{let t;const n=()=>{e(nd()),t=setTimeout(n,6e4-Date.now()%6e4)};return t=setTimeout(n,6e4-Date.now()%6e4),()=>clearTimeout(t)},[]),r}const iu=new Set,f6=r=>{iu.forEach(e=>{e!==r&&!e.dataset.alongside&&e.pause()}),r.play().catch(()=>{})},dc=(r,e)=>e?r.play().catch(()=>{}):f6(r);function d6({src:r,poster:e,label:t,frame:n="screen",surface:i,alongside:s=!1}){const o=Ge.useRef(),a=Ge.useRef(),[l,c]=Ge.useState(s),[u,h]=Ge.useState(()=>Ft()),[f]=Ge.useState(()=>document.createElement("video").canPlayType("video/webm")!==""),d=Ge.useRef(Ft()),g=Ge.useRef(!1);Ge.useEffect(()=>{const v=a.current,S=new IntersectionObserver(([A])=>{A.isIntersecting&&(c(!0),S.disconnect())},{rootMargin:"250% 0px"}),M=new IntersectionObserver(([A])=>{const T=o.current;T&&(g.current=A.isIntersecting,A.isIntersecting&&!d.current?dc(T,s):T.pause())},{threshold:.35});return S.observe(v),M.observe(v),()=>{S.disconnect(),M.disconnect()}},[]),Ge.useEffect(()=>{var v;l&&((v=o.current)==null||v.load())},[l]);const _=v=>{const S=v.currentTarget;if(s&&!S.dataset.synced){S.dataset.synced="1";const M=[...document.querySelectorAll("video")].find(A=>A!==S&&A.currentSrc===S.currentSrc&&A.currentTime>0);M&&(S.currentTime=M.currentTime)}g.current&&!d.current&&S.paused&&dc(S,s)},p=()=>{const v=o.current;v&&(v.paused?(d.current=!1,dc(v,s)):(d.current=!0,v.pause()))},m=f?K.jsx("video",{ref:o,"data-alongside":s||void 0,muted:!0,loop:!0,playsInline:!0,preload:l?"auto":"none",poster:l?e:void 0,"aria-label":t,src:l?r:void 0,onCanPlay:_,onPlay:v=>{iu.add(v.currentTarget),h(!1)},onPause:v=>{iu.delete(v.currentTarget),h(!0)},className:"block w-full h-full object-cover"}):K.jsx("img",{src:e,alt:t,loading:"lazy",decoding:"async",className:"block w-full h-full object-cover"}),y=f&&K.jsxs("button",{type:"button",onClick:p,"aria-label":u?"Video abspielen":"Video pausieren",className:"btn-media absolute right-3 bottom-3 z-20 gap-1.5 h-8 px-3 text-[12px]",children:[K.jsx("span",{"aria-hidden":!0,className:"w-2.5 text-center",children:u?"▶":"❚❚"}),u?"Abspielen":"Pause"]});return n==="phone"?K.jsxs("div",{ref:a,className:"absolute inset-0 grid place-items-center",style:{background:i},children:[K.jsx("div",{className:"relative h-[88%] aspect-[390/844] overflow-hidden rounded-[9%/4.2%] ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]",children:m}),y]}):K.jsxs("div",{ref:a,className:"absolute inset-0",style:{background:i},children:[m,y]})}function gp(){const r=Ge.useRef();return Ge.useEffect(()=>{const e=r.current,t=e.getContext("2d"),n=Ta("render"),i=[];for(let f=0;f<n.length/3;f+=6)i.push([n[f*3],n[f*3+1],n[f*3+2]]);const s=`rgb(${getComputedStyle(document.documentElement).getPropertyValue("--c-ink")})`;let o=0,a=!0;const l=performance.now(),c=Ft(),u=f=>{o=0;const d=e.clientWidth,g=e.clientHeight,_=Math.min(devicePixelRatio||1,2);e.width!==Math.round(d*_)&&(e.width=Math.round(d*_),e.height=Math.round(g*_)),t.setTransform(_,0,0,_,0,0),t.clearRect(0,0,d,g),t.fillStyle=s;const p=c?0:(f-l)/1e3,m=Math.sin(p*.3)*.25,y=Math.cos(m),v=Math.sin(m),S=g*.3;for(const[M,A,T]of i){const P=M*y-T*v,x=M*v+T*y,E=4/(4-x);t.globalAlpha=.25+.6*(x+1)/2,t.fillRect(d/2+P*S*E,g/2-A*S*E,1.1,1.1)}a&&!c&&(o=requestAnimationFrame(u))},h=new IntersectionObserver(([f])=>{a=f.isIntersecting,a&&!o&&(o=requestAnimationFrame(u))});return h.observe(e),o=requestAnimationFrame(u),()=>{cancelAnimationFrame(o),h.disconnect()}},[]),K.jsxs("span",{"aria-hidden":!0,className:"absolute inset-0 bg-canvas text-ink",children:[K.jsx("canvas",{ref:r,className:"absolute inset-0 w-full h-full"}),K.jsx("span",{className:"absolute left-[5%] top-1/2 -translate-y-1/2 text-[clamp(9px,1.05vw,13px)]",children:li.name}),K.jsx("span",{className:"absolute right-[5%] top-1/2 -translate-y-1/2 text-[clamp(9px,1.05vw,13px)]",children:li.role}),K.jsxs("span",{className:"absolute left-[5%] top-[6%] font-mono text-[clamp(6px,0.6vw,8px)] text-gray",children:["VF — Portfolio ",new Date().getFullYear()]}),K.jsx("span",{className:"absolute left-1/2 -translate-x-1/2 top-[5%] h-[6%] px-[2.5%] grid place-items-center rounded-full border border-ink/20 text-[clamp(6px,0.65vw,9px)]",children:"● Contact"}),K.jsx("span",{className:"absolute right-[5%] top-[6%] font-mono text-[clamp(6px,0.6vw,8px)] text-gray",children:"Hamburg, Germany"}),K.jsx("span",{className:"absolute right-[5%] bottom-[6%] font-mono text-[clamp(6px,0.6vw,8px)]",children:"Résumé ↗"})]})}const p6=({s:r})=>r.split(/\*\*/).map((e,t)=>t%2?K.jsx("span",{className:"text-ink",children:e},t):e);function m6({p:r,onClose:e}){const t=Ge.useRef(),n=Ge.useRef(),i=Ge.useRef(null);return Ge.useEffect(()=>{var a;if(!r)return;i.current=document.activeElement,ya(!0,"project");const s=t.current;Ft()||ut.fromTo(s.querySelectorAll("[data-in]"),{opacity:0,y:20,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.9,stagger:.06,ease:"expo.out",clearProps:"all"}),(a=n.current)==null||a.focus({preventScroll:!0});const o=l=>{l.key==="Escape"&&e()};return window.addEventListener("keydown",o),()=>{var l,c;window.removeEventListener("keydown",o),ya(!1,"project"),(c=(l=i.current)==null?void 0:l.focus)==null||c.call(l,{preventScroll:!0})}},[r,e]),K.jsxs("div",{ref:t,role:"dialog","aria-modal":"true","aria-label":r==null?void 0:r.title,hidden:!r,onClick:s=>{s.target===s.currentTarget&&e()},className:"fixed inset-0 z-[80] bg-canvas overflow-y-auto overscroll-contain",children:[r&&K.jsxs("div",{className:"frame min-h-full py-20 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center",onClick:s=>{s.target===s.currentTarget&&e()},children:[K.jsx("div",{"data-in":!0,className:"relative aspect-[16/10] rounded-[20px] overflow-hidden bg-ink/[0.04]",style:{background:r.surface},children:r.video?K.jsx(d6,{src:`/versions/minimal/videos/${r.slug}.webm`,poster:`/versions/minimal/videos/${r.slug}.jpg`,label:r.video.label,frame:r.video.frame,surface:r.surface,alongside:!0}):K.jsx(gp,{})}),K.jsxs("div",{children:[K.jsxs("p",{"data-in":!0,className:"t-cap",children:[r.kind," · ",r.year," · ",r.status]}),K.jsx("h2",{"data-in":!0,className:"t-display mt-3",children:r.title}),K.jsx("dl",{className:"mt-8 grid gap-6",children:r.story.map(([s,o])=>K.jsxs("div",{"data-in":!0,className:"border-t border-line pt-4",children:[K.jsx("dt",{className:"t-cap capitalize",children:s}),K.jsx("dd",{className:"text-[14px] leading-[1.618] text-gray mt-2",children:K.jsx(p6,{s:o})})]},s))}),K.jsx("p",{"data-in":!0,className:"mt-8 text-[13px] text-gray",children:r.tech.join(" · ")}),r.links.length>0&&K.jsx("p",{"data-in":!0,className:"mt-4 flex gap-6 text-[14px]",children:r.links.map(s=>K.jsxs("a",{href:s.href,target:"_blank",rel:"noopener noreferrer",className:"py-2 hover:text-blue",children:[s.label," ↗"]},s.href))})]})]}),K.jsxs("button",{ref:n,type:"button",onClick:e,"aria-label":"Close",className:"fixed top-3 right-[var(--gutter)] h-11 px-5 rounded-full border border-ink/15 bg-canvas text-[13px] hover:border-ink transition-colors",children:["Close ",K.jsx("span",{"aria-hidden":!0,className:"ml-1",children:"✕"})]})]})}const _6=()=>new Promise(r=>setTimeout(r,0)),Po=r=>new Promise(e=>setTimeout(e,Ft()?0:r)),pc=(r,e)=>(r+" ").padEnd(e,".");function g6(){const[r,e]=Ge.useState(!1),[t,n]=Ge.useState([]),[i,s]=Ge.useState(0),o=Ge.useRef(),a=Ge.useRef();if(Ge.useEffect(()=>{let c=!0;ya(!0,"load"),n([]);const u=d=>c&&n(g=>[...g,d]),h=(d,g)=>c&&n(_=>_.map(p=>p.k===d?{...p,...g}:p));return(async()=>{const d=[...new Set([...document.querySelectorAll("[data-form]")].map(M=>M.dataset.form))],g=Lo.filter(M=>M.video).flatMap(M=>[`/versions/minimal/videos/${M.slug}.jpg`,`/versions/minimal/videos/${M.slug}.webm`]),_=1+d.length+g.length;let p=0;const m=()=>{p++,c&&s(Math.round(p/_*100))};u({k:"cmd",t:"npm run universe"}),await new Promise(M=>setTimeout(M,Ft()?0:350));let y=0;u({k:"media",t:pc("streaming recordings",26),v:`0/${g.length}`});const v=g.map(M=>fetch(M).then(A=>A.blob()).catch(()=>{}).finally(()=>{y++,h("media",{v:`${y}/${g.length}`}),m()}));await Po(260),u({k:"fonts",t:pc("loading type",26),v:"…"}),await Promise.all([document.fonts.ready,Po(320)]),h("fonts",{v:"SF Pro · Geist Mono"}),m(),await Po(200),u({k:"forms",t:pc("sampling forms",26),v:`0/${d.length}`});for(let M=0;M<d.length;M++)Ta(d[M]),h("forms",{v:`${M+1}/${d.length}  ${d[M].replace("text:","")}`}),m(),await _6(),await Po(160);if(h("forms",{v:`${d.length}/${d.length}  20,000 points`}),await Promise.all(v),!c||(s(100),u({k:"done",t:`ready in ${Math.round(performance.now())} ms — welcome.`}),await new Promise(M=>setTimeout(M,Ft()?0:900)),!c))return;const S=()=>{ya(!1,"load"),e(!0)};if(Ft())return Qc("loaded"),S();ut.timeline({onComplete:S}).to(a.current,{opacity:0,scale:.96,filter:"blur(10px)",duration:.6,ease:"power2.in"}).call(()=>Qc("loaded"),[],.35).to(o.current,{opacity:0,duration:.6},.4)})(),()=>{c=!1,ya(!1,"load")}},[]),r)return null;const l=new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date);return K.jsx("div",{ref:o,role:"status","aria-live":"polite","aria-label":"Loading",className:"fixed inset-0 z-[100] grid place-items-center px-4 bg-gradient-to-b from-canvas/30 via-transparent to-canvas/30",children:K.jsxs("div",{ref:a,className:"w-[min(34rem,100%)] rounded-[14px] overflow-hidden bg-[rgb(18_18_22/.55)] backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_0_0_.5px_rgb(255_255_255/.14),inset_0_1px_0_rgb(255_255_255/.08),0_30px_90px_-20px_rgb(0_0_0/.8)]",children:[K.jsxs("div",{className:"relative flex items-center h-9 px-3.5 border-b border-white/[0.06]",children:[K.jsx("span",{className:"flex gap-2","aria-hidden":!0,children:["#ff5f57","#febc2e","#28c840"].map(c=>K.jsx("i",{className:"block w-[11px] h-[11px] rounded-full opacity-80",style:{background:c}},c))}),K.jsx("p",{className:"absolute left-1/2 -translate-x-1/2 t-cap !text-ink/50",children:"ines — zsh — universe"}),K.jsxs("p",{className:"ml-auto t-cap tabular-nums !text-ink/70",children:[String(i).padStart(3,"0"),"%"]})]}),K.jsxs("div",{className:"font-mono text-[12px] leading-[1.75] px-4 pt-3 pb-5 min-h-[12.5rem] text-ink/85",children:[K.jsxs("p",{className:"text-ink/40",children:["Last login: ",l," on ttys001"]}),t.map(c=>c.k==="cmd"?K.jsxs("p",{className:"mt-1",children:[K.jsx("span",{className:"text-ink/40",children:"ines@portfolio ~ %"})," ",c.t]},c.k):c.k==="done"?K.jsx("p",{className:"mt-2 text-ink",children:c.t},c.k):K.jsxs("p",{className:"flex gap-3 whitespace-pre",children:[K.jsx("span",{className:"text-ink/40",children:"›"}),K.jsx("span",{className:"text-ink/60",children:c.t}),K.jsx("span",{className:"truncate",children:c.v})]},c.k)),i<100&&K.jsx("span",{"aria-hidden":!0,className:"inline-block w-[7px] h-[14px] align-[-2px] bg-ink/80 animate-[blink_1.06s_steps(1)_infinite]"})]}),K.jsx("div",{className:"h-px bg-white/[0.06]",children:K.jsx("i",{className:"block h-full bg-ink/80 origin-left transition-transform duration-500 ease-sys",style:{transform:`scaleX(${i/100})`}})})]})})}const id=420;function v6(){const r=Ge.useRef(),e=Ge.useRef(),t=Ge.useRef(),n=Ge.useRef();return Ge.useEffect(()=>{if(!dm())return;document.documentElement.classList.add("own-cursor");const i=r.current,s=e.current,o=t.current,a=n.current,l=a.getContext("2d"),c=Ft();ut.set(s,{xPercent:-50,yPercent:-50});const u=ut.quickTo(i,"x",{duration:.05}),h=ut.quickTo(i,"y",{duration:.05}),f=ut.quickTo(s,"x",{duration:c?0:.12,ease:"power3.out"}),d=ut.quickTo(s,"y",{duration:c?0:.12,ease:"power3.out"});let g="";const _=(x,E="")=>{x===g&&o.textContent===E||(g=x,o.textContent=E,ut.to(s,{width:x==="label"?o.scrollWidth+28:x==="link"?16:28,height:x==="label"?30:x==="link"?16:28,duration:.35,ease:"expo.out"}),ut.to(o,{opacity:x==="label"?1:0,duration:.2}),ut.to(i,{scale:x==="label"?0:1,duration:.25}))},p=[];let m=0;const y=Math.min(devicePixelRatio||1,2),v=()=>{a.width=innerWidth*y,a.height=innerHeight*y};v(),window.addEventListener("resize",v);const S=()=>{m=0;const x=performance.now();for(;p.length&&x-p[0].t>id;)p.shift();if(l.setTransform(y,0,0,y,0,0),l.clearRect(0,0,innerWidth,innerHeight),p.length>2){l.lineCap="round",l.lineJoin="round";for(const E of[0,1])for(let B=1;B<p.length;B++){const N=p[B-1],j=p[B],L=1-(x-j.t)/id;if(L<=0)continue;const I=L*L;l.beginPath(),l.moveTo((N.x+p[Math.max(0,B-2)].x)/2,(N.y+p[Math.max(0,B-2)].y)/2),l.quadraticCurveTo(N.x,N.y,(N.x+j.x)/2,(N.y+j.y)/2),E===0?(l.strokeStyle=`rgba(190,205,255,${.1*I})`,l.lineWidth=10*I+2):(l.strokeStyle=`rgba(255,255,255,${.75*I})`,l.lineWidth=2.2*I+.3),l.stroke()}}p.length&&(m=requestAnimationFrame(S))},M=x=>{var B,N;u(x.clientX),h(x.clientY),f(x.clientX),d(x.clientY),i.style.opacity=s.style.opacity="1",c||(p.push({x:x.clientX,y:x.clientY,t:performance.now()}),m||(m=requestAnimationFrame(S)));const E=(N=(B=x.target).closest)==null?void 0:N.call(B,"[data-cursor], a, button, [role=tab], label");E!=null&&E.dataset.cursor?_("label",E.dataset.cursor):_(E?"link":"")},A=()=>{i.style.opacity=s.style.opacity="0"},T=()=>ut.to(s,{scale:.8,duration:.12}),P=()=>ut.to(s,{scale:1,duration:.4,ease:"expo.out"});return window.addEventListener("pointermove",M,{passive:!0}),document.addEventListener("pointerleave",A),window.addEventListener("pointerdown",T),window.addEventListener("pointerup",P),()=>{cancelAnimationFrame(m),document.documentElement.classList.remove("own-cursor"),window.removeEventListener("resize",v),window.removeEventListener("pointermove",M),document.removeEventListener("pointerleave",A),window.removeEventListener("pointerdown",T),window.removeEventListener("pointerup",P)}},[]),K.jsxs("div",{"aria-hidden":!0,className:"pointer-events-none fixed inset-0 z-[200]",children:[K.jsx("canvas",{ref:n,className:"absolute inset-0 w-full h-full"}),K.jsxs("div",{className:"absolute inset-0 mix-blend-difference",children:[K.jsx("span",{ref:e,className:"absolute left-0 top-0 w-[28px] h-[28px] grid place-items-center rounded-full border border-white/60 opacity-0",children:K.jsx("span",{ref:t,className:"whitespace-nowrap text-[12px] text-white opacity-0"})}),K.jsx("span",{ref:r,className:"absolute left-0 top-0 w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full bg-white shadow-[0_0_8px_2px_rgb(255_255_255/.6)] opacity-0"})]})]})}function rd({text:r,className:e=""}){return K.jsx("span",{"aria-label":r,role:"text",className:e,children:[...r].map((t,n)=>K.jsx("span",{"aria-hidden":!0,"data-ch":!0,className:"inline-block whitespace-pre will-change-transform",children:t},n))})}function sd(r,{delay:e=0,from:t="start"}={}){const n=r.querySelectorAll("[data-ch]");return Ft()?ut.set(n,{opacity:1}):ut.fromTo(n,{opacity:0,yPercent:70,rotationX:-70,filter:"blur(10px)",transformPerspective:400},{opacity:1,yPercent:0,rotationX:0,filter:"blur(0px)",duration:1.1,delay:e,ease:"expo.out",stagger:{each:.035,from:t},clearProps:"filter,transform"})}const ad="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>·:";function Ou(r,{duration:e=.9,delay:t=0}={}){const n=r.dataset.text??(r.dataset.text=r.textContent),i=r.childNodes.length===1&&r.firstChild.nodeType===3?r.firstChild:null,s=a=>{i?i.nodeValue=a:r.textContent=a};if(Ft()){s(n);return}const o={p:0};return ut.to(o,{p:1,duration:e+n.length*.012,delay:t,ease:"none",onStart:()=>{r.setAttribute("aria-label",n),s(""),r.style.opacity="1"},onUpdate:()=>{let a="";for(let l=0;l<n.length;l++){const c=n[l];a+=c===" "||o.p>l/n.length*.75+.25?c:o.p>l/n.length*.75-.05?ad[Math.random()*ad.length|0]:" "}s(a)},onComplete:()=>s(n)})}const od=r=>String(r+1).padStart(2,"0");function x6({onOpen:r}){const e=Ge.useRef(),t=Ge.useRef(),n=Ge.useRef(),i=Ge.useRef(),[s,o]=Ge.useState(0);Ge.useEffect(()=>{const l=e.current,c=t.current,u=n.current,h=[...u.children],f=()=>{const _=h[0];return h[h.length-1].offsetLeft-_.offsetLeft},d=()=>{const _=innerWidth/2;let p=0,m=1/0;h.forEach((y,v)=>{const S=y.getBoundingClientRect(),M=(S.left+S.width/2-_)/innerWidth;Math.abs(M)<m&&(m=Math.abs(M),p=v);const A=Math.min(1,Math.abs(M)*1.6);y.style.transform=`scale(${1-A*.12})`,y.style.filter=`brightness(${1-A*.55})`}),o(y=>y===p?y:p)},g=ut.context(()=>{ut.to(u,{x:()=>-f(),ease:"none",scrollTrigger:{trigger:c,start:"top top",end:()=>`+=${f()*1.1}`,pin:!0,scrub:Ft()?!0:.9,invalidateOnRefresh:!0,onUpdate:d,onRefresh:d}})},l);return Ke.refresh(),()=>g.revert()},[]),Ge.useEffect(()=>{var l;(l=i.current)==null||l.querySelectorAll("[data-sc]").forEach((c,u)=>{c.dataset.text=c.dataset.sc,Ou(c,{duration:.5,delay:u*.06})})},[s]);const a=Lo[s];return K.jsx("section",{ref:e,id:"work","aria-label":"Work",className:"relative",children:K.jsxs("div",{ref:t,"data-form":"galaxy","data-size":"2","data-tilt":"1.05","data-alpha":"1.5","data-solid":!0,className:"relative h-[100svh] overflow-hidden flex flex-col justify-center",children:[K.jsxs("p",{className:"frame w-full t-cap tabular-nums mb-8","aria-live":"polite",children:["Work ",K.jsx("span",{className:"text-ink",children:od(s)})," / ",od(Lo.length-1)]}),K.jsx("ul",{ref:n,className:"flex items-center gap-[7vw] pl-[calc(50vw-min(22vw,20rem))] max-md:pl-[11vw] will-change-transform",children:Lo.map(l=>K.jsx("li",{className:"flex-none w-[min(44vw,40rem)] max-md:w-[78vw] origin-center",children:K.jsx("button",{type:"button",onClick:()=>r(l),"data-cursor":"View","aria-label":`View ${l.title}`,className:"block w-full aspect-[16/10] rounded-[14px] overflow-hidden relative bg-paper shadow-[0_40px_120px_-30px_rgb(0_0_0/.8)]",style:l.surface?{background:l.surface}:void 0,children:l.video?K.jsx("video",{src:`/versions/minimal/videos/${l.slug}.webm`,poster:`/versions/minimal/videos/${l.slug}.jpg`,muted:!0,loop:!0,playsInline:!0,autoPlay:!Ft(),preload:"auto",className:"absolute inset-0 w-full h-full object-contain pointer-events-none"}):K.jsx(gp,{})})},l.slug))}),K.jsxs("div",{ref:i,className:"frame w-full mt-8 flex justify-between gap-4 items-baseline",children:[K.jsx("p",{className:"t-title",children:K.jsx("span",{"data-sc":a.title,children:a.title})}),K.jsx("p",{className:"t-cap",children:K.jsxs("span",{"data-sc":`${a.kind} · ${a.year}`,children:[a.kind," · ",a.year]})})]})]})})}const M6={"data-form":"earth","data-at":"left","data-tilt":"0.4","data-size":"1.25","data-alpha":"1.3"};function vp(r){Ge.useEffect(()=>{const e=r.current;if(!e||Ft())return;const t=ut.context(()=>{e.querySelectorAll("[data-reveal]").forEach(n=>{const i={trigger:n,start:"top 88%",once:!0};n.classList.contains("t-cap")&&!n.children.length?(n.style.opacity="0",ut.timeline({scrollTrigger:i}).call(()=>Ou(n))):ut.from(n,{y:24,opacity:0,filter:"blur(8px)",duration:1.2,ease:"expo.out",scrollTrigger:i})})},e);return()=>t.revert()},[r])}function S6(r){Ge.useEffect(()=>{const e=r.current;if(!e||Ft())return;const t=ut.context(()=>{e.querySelectorAll("[data-fly]").forEach((n,i)=>{ut.fromTo(n,{y:()=>innerHeight*.55,opacity:0},{y:0,opacity:1,ease:"power3.out",scrollTrigger:{trigger:e,start:`top+=${i*6}% bottom`,end:`top+=${i*6}% 25%`,scrub:.8,invalidateOnRefresh:!0}})})},e);return()=>t.revert()},[r])}function y6(){const r=Ge.useRef(),e=_p();return Ge.useEffect(()=>{const t=r.current,n=[...t.querySelectorAll("[data-sc]")];Ft()||(ut.set(t.querySelectorAll("[data-ch]"),{opacity:0}),n.forEach(l=>{l.style.opacity="0"}));const i=()=>{Qc("formed"),sd(t.querySelector("[data-name]"),{delay:0}),sd(t.querySelector("[data-trade]"),{delay:.2,from:"end"}),n.forEach((l,c)=>Ou(l,{delay:.6+c*.18}))};let s=!1;const o=()=>ut.to(nu,{gather:1,duration:Ft()?0:5.5,ease:"power2.inOut",onUpdate(){!s&&this.progress()>=.7&&(s=!0,i())},onComplete:()=>{s||(s=!0,i())}});if(dp("loaded")){o();return}const a=hp("loaded",()=>{a(),o()});return a},[]),K.jsxs("section",{ref:r,id:"start","data-form":"render","data-spin":"sway","data-size":"1.15","data-tilt":"0.12","data-alpha":"1.2","data-solid":!0,className:"relative h-[100svh]",children:[K.jsxs("h1",{className:"sr-only",children:[li.name,", ",li.role]}),K.jsx("p",{"data-name":!0,"aria-hidden":!0,className:"absolute left-[var(--gutter)] top-1/2 -translate-y-1/2 t-title max-md:top-[18%]",children:K.jsx(rd,{text:li.name})}),K.jsx("p",{"data-trade":!0,"aria-hidden":!0,className:"absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 t-title text-right max-md:top-auto max-md:bottom-[18%]",children:K.jsx(rd,{text:li.role})}),K.jsx("p",{"data-sc":!0,className:"absolute left-[var(--gutter)] top-6 t-cap",children:`VF — Portfolio ${new Date().getFullYear()}`}),K.jsx("p",{"data-sc":!0,className:"absolute right-[var(--gutter)] top-6 t-cap tabular-nums",children:`Hamburg, Germany — ${e}`}),K.jsx("p",{"data-sc":!0,className:"absolute left-[var(--gutter)] bottom-7 t-cap",children:`${li.looking}, ${li.available}`}),K.jsx("a",{"data-sc":!0,href:"/versions/minimal/resume.html",className:"absolute right-[var(--gutter)] bottom-5 py-2 t-cap text-ink hover:text-gray transition-colors",children:"Résumé ↗"})]})}function E6(){const r=Ge.useRef();return S6(r),K.jsx("section",{ref:r,id:"idea","data-form":"blocks","data-at":"right","data-tilt":"0.55","data-size":"1.05","data-alpha":"1.4",className:"frame min-h-[130svh] flex items-center",children:K.jsxs("p",{className:"t-display relative",children:[K.jsx("span",{"data-fly":!0,className:"block whitespace-nowrap",children:"I design and build apps,"}),K.jsx("span",{"data-fly":!0,className:"block text-gray",children:"from the first sketch"}),K.jsx("span",{"data-fly":!0,className:"block text-gray",children:"to the database."})]})})}function T6(){const r=Ge.useRef();return vp(r),K.jsx("section",{ref:r,id:"origin","aria-labelledby":"origin-title","data-form":"germany","data-at":"right","data-spin":"sway","data-tilt":"0","data-size":"1.75",className:"frame min-h-[100svh] flex items-center",children:K.jsxs("div",{className:"relative",children:[K.jsx("h2",{id:"origin-title","data-reveal":!0,className:"t-cap",children:"Where I'm from"}),K.jsxs("p",{"data-reveal":!0,className:"t-display mt-4",children:["Hamburg,",K.jsx("br",{}),K.jsx("span",{className:"text-gray",children:"Germany."})]}),K.jsx("p",{"data-reveal":!0,className:"t-cap mt-6 tabular-nums",children:"50.11° N — 8.68° E"})]})})}function b6(){const r=Ge.useRef();return vp(r),K.jsx("section",{ref:r,id:"remote","aria-labelledby":"remote-title",...M6,className:"frame min-h-[100svh] flex items-center",children:K.jsxs("div",{className:"relative ml-auto max-w-[30rem]",children:[K.jsx("h2",{id:"remote-title","data-reveal":!0,className:"t-cap",children:"Remote"}),K.jsxs("p",{"data-reveal":!0,className:"t-display mt-4",children:["Working ",K.jsx("span",{className:"text-gray",children:"from anywhere."})]})]})})}function w6(){const r=Ge.useRef();return Ge.useEffect(()=>{const e=r.current;Ft()||ut.set(e,{opacity:0,y:-10});const t=()=>ut.to(e,{opacity:1,y:0,duration:1,delay:.9,ease:"expo.out"}),n=dp("formed")?(t(),()=>{}):hp("formed",t),i=Ke.create({trigger:"#contact",start:"top 60%",onToggle:s=>ut.to(e,{opacity:s.isActive?0:1,y:s.isActive?-10:0,duration:.5,ease:"power2.out",pointerEvents:s.isActive?"none":"auto"})});return()=>{n(),i.kill()}},[]),K.jsxs("a",{ref:r,href:"#contact",onClick:e=>{e.preventDefault(),mp("contact")},className:"fixed z-50 left-1/2 -translate-x-1/2 top-4 inline-flex items-center gap-2 h-9 px-4 rounded-full border border-ink/15 bg-canvas/40 backdrop-blur-md text-[13px] hover:border-ink transition-colors",children:[K.jsx("i",{"aria-hidden":!0,className:"block w-1.5 h-1.5 rounded-full bg-ink"}),"Contact"]})}function A6(){const r=Ge.useRef(),e=_p();return Ge.useEffect(()=>{const t=r.current;if(Ft())return;const n=ut.context(()=>{ut.timeline({scrollTrigger:{trigger:t.querySelector("h2"),start:"top 78%",end:"top 22%",scrub:.6,invalidateOnRefresh:!0}}).fromTo("[data-w1]",{x:()=>-innerWidth*.5,opacity:0},{x:0,opacity:1,ease:"power2.out"},0).fromTo("[data-w2]",{x:()=>innerWidth*.5,opacity:0},{x:0,opacity:1,ease:"power2.out"},0)},t);return()=>n.revert()},[]),K.jsxs("footer",{ref:r,id:"contact","aria-labelledby":"contact-title","data-form":"text:@","data-at":"center","data-spin":"sway","data-tilt":"0","data-size":"2.6","data-alpha":"0.28",className:"frame min-h-[100svh] pt-[var(--space-section)] pb-8 flex flex-col overflow-x-clip",children:[K.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center text-center relative",children:[K.jsxs("h2",{id:"contact-title",className:"t-hero",children:[K.jsx("span",{"data-w1":!0,className:"inline-block",children:"Say"})," ",K.jsx("span",{"data-w2":!0,className:"inline-block text-gray",children:"hello."})]}),K.jsxs("div",{className:"mt-10 flex flex-wrap justify-center gap-3",children:[K.jsxs("a",{href:`mailto:${li.email}`,className:"group inline-flex items-center gap-4 h-12 pl-5 pr-4 rounded-full bg-blue text-on-accent text-[14px] hover:brightness-110 transition",children:[li.email," ",K.jsx("span",{"aria-hidden":!0,className:"transition-transform duration-500 ease-sys group-hover:translate-x-1",children:"→"})]}),K.jsxs("a",{href:"/versions/minimal/resume.html",className:"group inline-flex items-center gap-3 h-12 pl-5 pr-4 rounded-full border border-ink/15 hover:border-ink transition-colors text-[14px]",children:["Résumé ",K.jsx("span",{"aria-hidden":!0,className:"transition-transform duration-500 ease-sys group-hover:translate-x-0.5 group-hover:-translate-y-0.5",children:"↗"})]})]}),K.jsx("ul",{className:"mt-8 flex flex-wrap justify-center gap-x-8 gap-y-1 text-[14px]",children:yp.slice(1).map(t=>{const n=t.href.startsWith("http");return K.jsx("li",{children:K.jsxs("a",{href:t.href,target:n?"_blank":void 0,rel:n?"noopener noreferrer":void 0,className:"inline-block py-2 text-gray hover:text-ink",children:[K.jsx("span",{className:"t-cap mr-2",children:t.label}),t.value]})},t.label)})})]}),K.jsxs("div",{className:"flex flex-wrap justify-between gap-3 t-cap border-t border-line pt-5",children:[K.jsxs("p",{children:["© ",new Date().getFullYear()," ",li.name]}),K.jsxs("p",{className:"tabular-nums",children:["Local time ",e]}),K.jsx("a",{href:"#start",onClick:t=>{t.preventDefault(),mp("start")},className:"text-ink",children:"Back to top ↑"})]})]})}function R6(){const[r,e]=Ge.useState(null);return Ge.useEffect(()=>{document.fonts.ready.then(()=>Ke.refresh())},[]),K.jsxs(K.Fragment,{children:[K.jsxs("main",{className:"relative z-[1]",children:[K.jsx(y6,{}),K.jsx(x6,{onOpen:e}),K.jsx(E6,{}),K.jsx(T6,{}),K.jsx(b6,{})]}),K.jsx("div",{className:"relative z-[1]",children:K.jsx(A6,{})}),K.jsx(m6,{p:r,onClose:()=>e(null)}),K.jsx(w6,{}),K.jsx(g6,{}),K.jsx(v6,{})]})}function C6(){Ge.useEffect(()=>{var n,i;let r=!0;const t=((i=(n=performance.getEntriesByType)==null?void 0:n.call(performance,"navigation")[0])==null?void 0:i.type)==="navigate"?decodeURIComponent(location.hash.slice(1)):"";return!t&&location.hash&&history.replaceState(null,"",location.pathname+location.search),document.fonts.ready.then(()=>{r&&(Ke.refresh(),t&&I1(document.getElementById(t),{immediate:!0}))}),()=>{r=!1}},[])}function P6(){return Ge.useEffect(()=>{Em()},[]),C6(),K.jsxs(K.Fragment,{children:[K.jsx("a",{href:"#work",className:"sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[210] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:rounded-full",children:"Skip to content"}),K.jsx(h6,{}),K.jsx(R6,{})]})}Ep.createRoot(document.getElementById("root")).render(K.jsx(Tp.StrictMode,{children:K.jsx(P6,{})}));
