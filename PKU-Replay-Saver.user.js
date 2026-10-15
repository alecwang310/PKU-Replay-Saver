// ==UserScript==
// @name         PKU-Replay-Saver
// @namespace    pku-replay-saver
// @version      1.8.3
// @description  使用当前登录态下载北大录播，支持普通 MP4、fMP4 和 TS，可另存 MP3 / AAC 音频，显示进度与剩余时间。
// @match        https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/*
// @match        https://onlineroomse.pku.edu.cn/player*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      self
// @connect      resourcese.pku.edu.cn
// @connect      sourcese.pku.edu.cn
// @license      MIT; mux.js 6.3.0 Apache-2.0; lamejs 1.2.1 LGPL-3.0
// ==/UserScript==

/*
PKU-Replay-Saver: MIT. See accompanying LICENSE.
Bundled mux.js 6.3.0: Copyright (c) Brightcove; Apache-2.0.
Source: https://github.com/videojs/mux.js/tree/6dd806f30a5db8eb9fa2c7325f6f9fada1f4f241
Bundled lamejs 1.2.1: Alex Zhukov; LGPL-3.0.
Source: https://github.com/zhuker/lamejs/tree/260ecf8a2cf15b97e65442986c5c9149b0be7764
Corresponding source: accompanying lamejs-1.2.1-source.tgz.
Encoder initialization is delayed; encoding code is unmodified.
Full third-party terms: accompanying THIRD-PARTY-LICENSES.txt.
License links: https://www.apache.org/licenses/LICENSE-2.0
*/

(() => {
'use strict';
const muxjs = (() => { const module = { exports: {} }; const exports = module.exports;
const require = name => { if (name === 'global/window') return window; throw new Error('Unknown bundled dependency'); };
/*! @name mux.js @version 6.3.0 @license Apache-2.0 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("global/window")):"function"==typeof define&&define.amd?define(["global/window"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).muxjs=e(t.window)}(this,(function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=e(t),n=function(){this.init=function(){var t={};this.on=function(e,i){t[e]||(t[e]=[]),t[e]=t[e].concat(i)},this.off=function(e,i){var n;return!!t[e]&&(n=t[e].indexOf(i),t[e]=t[e].slice(),t[e].splice(n,1),n>-1)},this.trigger=function(e){var i,n,a,r;if(i=t[e])if(2===arguments.length)for(a=i.length,n=0;n<a;++n)i[n].call(this,arguments[1]);else{for(r=[],n=arguments.length,n=1;n<arguments.length;++n)r.push(arguments[n]);for(a=i.length,n=0;n<a;++n)i[n].apply(this,r)}},this.dispose=function(){t={}}}};n.prototype.pipe=function(t){return this.on("data",(function(e){t.push(e)})),this.on("done",(function(e){t.flush(e)})),this.on("partialdone",(function(e){t.partialFlush(e)})),this.on("endedtimeline",(function(e){t.endTimeline(e)})),this.on("reset",(function(e){t.reset(e)})),t},n.prototype.push=function(t){this.trigger("data",t)},n.prototype.flush=function(t){this.trigger("done",t)},n.prototype.partialFlush=function(t){this.trigger("partialdone",t)},n.prototype.endTimeline=function(t){this.trigger("endedtimeline",t)},n.prototype.reset=function(t){this.trigger("reset",t)};var a,r,s,o,d,h,p,u=n,l=9e4;d=function(t,e){return a(o(t,e))},h=function(t,e){return r(s(t),e)},p=function(t,e,i){return s(i?t:t-e)};var c,f=l,g=(a=function(t){return t*l},r=function(t,e){return t*e},s=function(t){return t/l}),m=(o=function(t,e){return t/e},d),y=h,b=p,v=f,S=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];(c=function(t){var e,i=0;c.prototype.init.call(this),this.skipWarn_=function(t,e){this.trigger("log",{level:"warn",message:"adts skiping bytes "+t+" to "+e+" in frame "+i+" outside syncword"})},this.push=function(n){var a,r,s,o,d,h=0;if(t||(i=0),"audio"===n.type){var p;for(e&&e.length?(s=e,(e=new Uint8Array(s.byteLength+n.data.byteLength)).set(s),e.set(n.data,s.byteLength)):e=n.data;h+7<e.length;)if(255===e[h]&&240==(246&e[h+1])){if("number"==typeof p&&(this.skipWarn_(p,h),p=null),r=2*(1&~e[h+1]),a=(3&e[h+3])<<11|e[h+4]<<3|(224&e[h+5])>>5,d=(o=1024*(1+(3&e[h+6])))*v/S[(60&e[h+2])>>>2],e.byteLength-h<a)break;this.trigger("data",{pts:n.pts+i*d,dts:n.dts+i*d,sampleCount:o,audioobjecttype:1+(e[h+2]>>>6&3),channelcount:(1&e[h+2])<<2|(192&e[h+3])>>>6,samplerate:S[(60&e[h+2])>>>2],samplingfrequencyindex:(60&e[h+2])>>>2,samplesize:16,data:e.subarray(h+7+r,h+a)}),i++,h+=a}else"number"!=typeof p&&(p=h),h++;"number"==typeof p&&(this.skipWarn_(p,h),p=null),e=e.subarray(h)}},this.flush=function(){i=0,this.trigger("done")},this.reset=function(){e=void 0,this.trigger("reset")},this.endTimeline=function(){e=void 0,this.trigger("endedtimeline")}}).prototype=new u;var w,T,_,k=c,U=function(t){var e=t.byteLength,i=0,n=0;this.length=function(){return 8*e},this.bitsAvailable=function(){return 8*e+n},this.loadWord=function(){var a=t.byteLength-e,r=new Uint8Array(4),s=Math.min(4,e);if(0===s)throw new Error("no bytes available");r.set(t.subarray(a,a+s)),i=new DataView(r.buffer).getUint32(0),n=8*s,e-=s},this.skipBits=function(t){var a;n>t?(i<<=t,n-=t):(t-=n,t-=8*(a=Math.floor(t/8)),e-=a,this.loadWord(),i<<=t,n-=t)},this.readBits=function(t){var a=Math.min(n,t),r=i>>>32-a;return(n-=a)>0?i<<=a:e>0&&this.loadWord(),(a=t-a)>0?r<<a|this.readBits(a):r},this.skipLeadingZeros=function(){var t;for(t=0;t<n;++t)if(0!=(i&2147483648>>>t))return i<<=t,n-=t,t;return this.loadWord(),t+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var t=this.skipLeadingZeros();return this.readBits(t+1)-1},this.readExpGolomb=function(){var t=this.readUnsignedExpGolomb();return 1&t?1+t>>>1:-1*(t>>>1)},this.readBoolean=function(){return 1===this.readBits(1)},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()};(T=function(){var t,e,i=0;T.prototype.init.call(this),this.push=function(n){var a;e?((a=new Uint8Array(e.byteLength+n.data.byteLength)).set(e),a.set(n.data,e.byteLength),e=a):e=n.data;for(var r=e.byteLength;i<r-3;i++)if(1===e[i+2]){t=i+5;break}for(;t<r;)switch(e[t]){case 0:if(0!==e[t-1]){t+=2;break}if(0!==e[t-2]){t++;break}i+3!==t-2&&this.trigger("data",e.subarray(i+3,t-2));do{t++}while(1!==e[t]&&t<r);i=t-2,t+=3;break;case 1:if(0!==e[t-1]||0!==e[t-2]){t+=3;break}this.trigger("data",e.subarray(i+3,t-2)),i=t-2,t+=3;break;default:t+=3}e=e.subarray(i),t-=i,i=0},this.reset=function(){e=null,i=0,this.trigger("reset")},this.flush=function(){e&&e.byteLength>3&&this.trigger("data",e.subarray(i+3)),e=null,i=0,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")}}).prototype=new u,_={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0},(w=function(){var t,e,i,n,a,r,s,o=new T;w.prototype.init.call(this),t=this,this.push=function(t){"video"===t.type&&(e=t.trackId,i=t.pts,n=t.dts,o.push(t))},o.on("data",(function(s){var o={trackId:e,pts:i,dts:n,data:s,nalUnitTypeCode:31&s[0]};switch(o.nalUnitTypeCode){case 5:o.nalUnitType="slice_layer_without_partitioning_rbsp_idr";break;case 6:o.nalUnitType="sei_rbsp",o.escapedRBSP=a(s.subarray(1));break;case 7:o.nalUnitType="seq_parameter_set_rbsp",o.escapedRBSP=a(s.subarray(1)),o.config=r(o.escapedRBSP);break;case 8:o.nalUnitType="pic_parameter_set_rbsp";break;case 9:o.nalUnitType="access_unit_delimiter_rbsp"}t.trigger("data",o)})),o.on("done",(function(){t.trigger("done")})),o.on("partialdone",(function(){t.trigger("partialdone")})),o.on("reset",(function(){t.trigger("reset")})),o.on("endedtimeline",(function(){t.trigger("endedtimeline")})),this.flush=function(){o.flush()},this.partialFlush=function(){o.partialFlush()},this.reset=function(){o.reset()},this.endTimeline=function(){o.endTimeline()},s=function(t,e){var i,n=8,a=8;for(i=0;i<t;i++)0!==a&&(a=(n+e.readExpGolomb()+256)%256),n=0===a?n:a},a=function(t){for(var e,i,n=t.byteLength,a=[],r=1;r<n-2;)0===t[r]&&0===t[r+1]&&3===t[r+2]?(a.push(r+2),r+=2):r++;if(0===a.length)return t;e=n-a.length,i=new Uint8Array(e);var s=0;for(r=0;r<e;s++,r++)s===a[0]&&(s++,a.shift()),i[r]=t[s];return i},r=function(t){var e,i,n,a,r,o,d,h,p,u,l,c,f=0,g=0,m=0,y=0,b=[1,1];if(i=(e=new U(t)).readUnsignedByte(),a=e.readUnsignedByte(),n=e.readUnsignedByte(),e.skipUnsignedExpGolomb(),_[i]&&(3===(r=e.readUnsignedExpGolomb())&&e.skipBits(1),e.skipUnsignedExpGolomb(),e.skipUnsignedExpGolomb(),e.skipBits(1),e.readBoolean()))for(l=3!==r?8:12,c=0;c<l;c++)e.readBoolean()&&s(c<6?16:64,e);if(e.skipUnsignedExpGolomb(),0===(o=e.readUnsignedExpGolomb()))e.readUnsignedExpGolomb();else if(1===o)for(e.skipBits(1),e.skipExpGolomb(),e.skipExpGolomb(),d=e.readUnsignedExpGolomb(),c=0;c<d;c++)e.skipExpGolomb();if(e.skipUnsignedExpGolomb(),e.skipBits(1),h=e.readUnsignedExpGolomb(),p=e.readUnsignedExpGolomb(),0===(u=e.readBits(1))&&e.skipBits(1),e.skipBits(1),e.readBoolean()&&(f=e.readUnsignedExpGolomb(),g=e.readUnsignedExpGolomb(),m=e.readUnsignedExpGolomb(),y=e.readUnsignedExpGolomb()),e.readBoolean()&&e.readBoolean()){switch(e.readUnsignedByte()){case 1:b=[1,1];break;case 2:b=[12,11];break;case 3:b=[10,11];break;case 4:b=[16,11];break;case 5:b=[40,33];break;case 6:b=[24,11];break;case 7:b=[20,11];break;case 8:b=[32,11];break;case 9:b=[80,33];break;case 10:b=[18,11];break;case 11:b=[15,11];break;case 12:b=[64,33];break;case 13:b=[160,99];break;case 14:b=[4,3];break;case 15:b=[3,2];break;case 16:b=[2,1];break;case 255:b=[e.readUnsignedByte()<<8|e.readUnsignedByte(),e.readUnsignedByte()<<8|e.readUnsignedByte()]}b&&(b[0],b[1])}return{profileIdc:i,levelIdc:n,profileCompatibility:a,width:16*(h+1)-2*f-2*g,height:(2-u)*(p+1)*16-2*m-2*y,sarRatio:b}}}).prototype=new u;var A,C,D,P,I,L,O,x,E,M,R,B,N,F,z,V,G,W,j,q,Y,H,X,K,$,Z,J,Q,tt,et,it,nt,at,rt,st,ot,dt,ht,pt,ut,lt={H264Stream:w,NalByteStream:T},ct={Adts:k,h264:lt},ft=Math.pow(2,32),gt={getUint64:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength);return i.getBigUint64?(e=i.getBigUint64(0))<Number.MAX_SAFE_INTEGER?Number(e):e:i.getUint32(0)*ft+i.getUint32(4)},MAX_UINT32:ft},mt=gt.MAX_UINT32;!function(){var t;if(H={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]},"undefined"!=typeof Uint8Array){for(t in H)H.hasOwnProperty(t)&&(H[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)]);X=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)]),$=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)]),K=new Uint8Array([0,0,0,1]),Z=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),J=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),Q={video:Z,audio:J},it=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),et=new Uint8Array([0,0,0,0,0,0,0,0]),nt=new Uint8Array([0,0,0,0,0,0,0,0]),at=nt,rt=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),st=nt,tt=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}}(),A=function(t){var e,i,n=[],a=0;for(e=1;e<arguments.length;e++)n.push(arguments[e]);for(e=n.length;e--;)a+=n[e].byteLength;for(i=new Uint8Array(a+8),new DataView(i.buffer,i.byteOffset,i.byteLength).setUint32(0,i.byteLength),i.set(t,4),e=0,a=8;e<n.length;e++)i.set(n[e],a),a+=n[e].byteLength;return i},C=function(){return A(H.dinf,A(H.dref,it))},D=function(t){return A(H.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,t.audioobjecttype<<3|t.samplingfrequencyindex>>>1,t.samplingfrequencyindex<<7|t.channelcount<<3,6,1,2]))},z=function(t){return A(H.hdlr,Q[t])},F=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,t.duration>>>24&255,t.duration>>>16&255,t.duration>>>8&255,255&t.duration,85,196,0,0]);return t.samplerate&&(e[12]=t.samplerate>>>24&255,e[13]=t.samplerate>>>16&255,e[14]=t.samplerate>>>8&255,e[15]=255&t.samplerate),A(H.mdhd,e)},N=function(t){return A(H.mdia,F(t),z(t.type),L(t))},I=function(t){return A(H.mfhd,new Uint8Array([0,0,0,0,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t]))},L=function(t){return A(H.minf,"video"===t.type?A(H.vmhd,tt):A(H.smhd,et),C(),G(t))},O=function(t,e){for(var i=[],n=e.length;n--;)i[n]=j(e[n]);return A.apply(null,[H.moof,I(t)].concat(i))},x=function(t){for(var e=t.length,i=[];e--;)i[e]=R(t[e]);return A.apply(null,[H.moov,M(4294967295)].concat(i).concat(E(t)))},E=function(t){for(var e=t.length,i=[];e--;)i[e]=q(t[e]);return A.apply(null,[H.mvex].concat(i))},M=function(t){var e=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&t)>>24,(16711680&t)>>16,(65280&t)>>8,255&t,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return A(H.mvhd,e)},V=function(t){var e,i,n=t.samples||[],a=new Uint8Array(4+n.length);for(i=0;i<n.length;i++)e=n[i].flags,a[i+4]=e.dependsOn<<4|e.isDependedOn<<2|e.hasRedundancy;return A(H.sdtp,a)},G=function(t){return A(H.stbl,W(t),A(H.stts,st),A(H.stsc,at),A(H.stsz,rt),A(H.stco,nt))},W=function(t){return A(H.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),"video"===t.type?ot(t):dt(t))},ot=function(t){var e,i,n=t.sps||[],a=t.pps||[],r=[],s=[];for(e=0;e<n.length;e++)r.push((65280&n[e].byteLength)>>>8),r.push(255&n[e].byteLength),r=r.concat(Array.prototype.slice.call(n[e]));for(e=0;e<a.length;e++)s.push((65280&a[e].byteLength)>>>8),s.push(255&a[e].byteLength),s=s.concat(Array.prototype.slice.call(a[e]));if(i=[H.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&t.width)>>8,255&t.width,(65280&t.height)>>8,255&t.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),A(H.avcC,new Uint8Array([1,t.profileIdc,t.profileCompatibility,t.levelIdc,255].concat([n.length],r,[a.length],s))),A(H.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))],t.sarRatio){var o=t.sarRatio[0],d=t.sarRatio[1];i.push(A(H.pasp,new Uint8Array([(4278190080&o)>>24,(16711680&o)>>16,(65280&o)>>8,255&o,(4278190080&d)>>24,(16711680&d)>>16,(65280&d)>>8,255&d])))}return A.apply(null,i)},dt=function(t){return A(H.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&t.channelcount)>>8,255&t.channelcount,(65280&t.samplesize)>>8,255&t.samplesize,0,0,0,0,(65280&t.samplerate)>>8,255&t.samplerate,0,0]),D(t))},B=function(t){var e=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,0,(4278190080&t.duration)>>24,(16711680&t.duration)>>16,(65280&t.duration)>>8,255&t.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&t.width)>>8,255&t.width,0,0,(65280&t.height)>>8,255&t.height,0,0]);return A(H.tkhd,e)},j=function(t){var e,i,n,a,r,s;return e=A(H.tfhd,new Uint8Array([0,0,0,58,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),r=Math.floor(t.baseMediaDecodeTime/mt),s=Math.floor(t.baseMediaDecodeTime%mt),i=A(H.tfdt,new Uint8Array([1,0,0,0,r>>>24&255,r>>>16&255,r>>>8&255,255&r,s>>>24&255,s>>>16&255,s>>>8&255,255&s])),92,"audio"===t.type?(n=Y(t,92),A(H.traf,e,i,n)):(a=V(t),n=Y(t,a.length+92),A(H.traf,e,i,n,a))},R=function(t){return t.duration=t.duration||4294967295,A(H.trak,B(t),N(t))},q=function(t){var e=new Uint8Array([0,0,0,0,(4278190080&t.id)>>24,(16711680&t.id)>>16,(65280&t.id)>>8,255&t.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return"video"!==t.type&&(e[e.length-1]=0),A(H.trex,e)},ut=function(t,e){var i=0,n=0,a=0,r=0;return t.length&&(void 0!==t[0].duration&&(i=1),void 0!==t[0].size&&(n=2),void 0!==t[0].flags&&(a=4),void 0!==t[0].compositionTimeOffset&&(r=8)),[0,0,i|n|a|r,1,(4278190080&t.length)>>>24,(16711680&t.length)>>>16,(65280&t.length)>>>8,255&t.length,(4278190080&e)>>>24,(16711680&e)>>>16,(65280&e)>>>8,255&e]},pt=function(t,e){var i,n,a,r,s,o;for(e+=20+16*(r=t.samples||[]).length,a=ut(r,e),(n=new Uint8Array(a.length+16*r.length)).set(a),i=a.length,o=0;o<r.length;o++)s=r[o],n[i++]=(4278190080&s.duration)>>>24,n[i++]=(16711680&s.duration)>>>16,n[i++]=(65280&s.duration)>>>8,n[i++]=255&s.duration,n[i++]=(4278190080&s.size)>>>24,n[i++]=(16711680&s.size)>>>16,n[i++]=(65280&s.size)>>>8,n[i++]=255&s.size,n[i++]=s.flags.isLeading<<2|s.flags.dependsOn,n[i++]=s.flags.isDependedOn<<6|s.flags.hasRedundancy<<4|s.flags.paddingValue<<1|s.flags.isNonSyncSample,n[i++]=61440&s.flags.degradationPriority,n[i++]=15&s.flags.degradationPriority,n[i++]=(4278190080&s.compositionTimeOffset)>>>24,n[i++]=(16711680&s.compositionTimeOffset)>>>16,n[i++]=(65280&s.compositionTimeOffset)>>>8,n[i++]=255&s.compositionTimeOffset;return A(H.trun,n)},ht=function(t,e){var i,n,a,r,s,o;for(e+=20+8*(r=t.samples||[]).length,a=ut(r,e),(i=new Uint8Array(a.length+8*r.length)).set(a),n=a.length,o=0;o<r.length;o++)s=r[o],i[n++]=(4278190080&s.duration)>>>24,i[n++]=(16711680&s.duration)>>>16,i[n++]=(65280&s.duration)>>>8,i[n++]=255&s.duration,i[n++]=(4278190080&s.size)>>>24,i[n++]=(16711680&s.size)>>>16,i[n++]=(65280&s.size)>>>8,i[n++]=255&s.size;return A(H.trun,i)},Y=function(t,e){return"audio"===t.type?ht(t,e):pt(t,e)};var yt,bt,vt,St,wt,Tt,_t,kt={ftyp:P=function(){return A(H.ftyp,X,K,X,$)},mdat:function(t){return A(H.mdat,t)},moof:O,moov:x,initSegment:function(t){var e,i=P(),n=x(t);return(e=new Uint8Array(i.byteLength+n.byteLength)).set(i),e.set(n,i.byteLength),e}},Ut=function(t){return t>>>0},At=function(t){var e="";return e+=String.fromCharCode(t[0]),e+=String.fromCharCode(t[1]),e+=String.fromCharCode(t[2]),e+=String.fromCharCode(t[3])},Ct=Ut,Dt=function t(e,i){var n,a,r,s,o,d=[];if(!i.length)return null;for(n=0;n<e.byteLength;)a=Ct(e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3]),r=At(e.subarray(n+4,n+8)),s=a>1?n+a:e.byteLength,r===i[0]&&(1===i.length?d.push(e.subarray(n+8,s)):(o=t(e.subarray(n+8,s),i.slice(1))).length&&(d=d.concat(o))),n=s;return d},Pt=function(t){for(var e=0,i=String.fromCharCode(t[e]),n="";"\0"!==i;)n+=i,e++,i=String.fromCharCode(t[e]);return n+=i},It=gt.getUint64,Lt=function(t,e){var i="\0"!==e.scheme_id_uri,n=0===t&&Ot(e.presentation_time_delta)&&i,a=1===t&&Ot(e.presentation_time)&&i;return!(t>1)&&n||a},Ot=function(t){return void 0!==t||null!==t},xt=function(t){var e,i,n,a,r,s,o,d=4,h=t[0];if(0===h)d+=(e=Pt(t.subarray(d))).length,d+=(i=Pt(t.subarray(d))).length,n=(p=new DataView(t.buffer)).getUint32(d),d+=4,r=p.getUint32(d),d+=4,s=p.getUint32(d),d+=4,o=p.getUint32(d),d+=4;else if(1===h){var p;n=(p=new DataView(t.buffer)).getUint32(d),d+=4,a=It(t.subarray(d)),d+=8,s=p.getUint32(d),d+=4,o=p.getUint32(d),d+=4,d+=(e=Pt(t.subarray(d))).length,d+=(i=Pt(t.subarray(d))).length}var u={scheme_id_uri:e,value:i,timescale:n||1,presentation_time:a,presentation_time_delta:r,event_duration:s,id:o,message_data:new Uint8Array(t.subarray(d,t.byteLength))};return Lt(h,u)?u:void 0},Et=function(t,e,i,n){return t||0===t?t/e:n+i/e},Mt=function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:i.getUint32(4)},a=1&n.flags[2],r=2&n.flags[2],s=8&n.flags[2],o=16&n.flags[2],d=32&n.flags[2],h=65536&n.flags[0],p=131072&n.flags[0];return e=8,a&&(e+=4,n.baseDataOffset=i.getUint32(12),e+=4),r&&(n.sampleDescriptionIndex=i.getUint32(e),e+=4),s&&(n.defaultSampleDuration=i.getUint32(e),e+=4),o&&(n.defaultSampleSize=i.getUint32(e),e+=4),d&&(n.defaultSampleFlags=i.getUint32(e)),h&&(n.durationIsEmpty=!0),!a&&p&&(n.baseDataOffsetIsMoof=!0),n},Rt=function(t){return{isLeading:(12&t[0])>>>2,dependsOn:3&t[0],isDependedOn:(192&t[1])>>>6,hasRedundancy:(48&t[1])>>>4,paddingValue:(14&t[1])>>>1,isNonSyncSample:1&t[1],degradationPriority:t[2]<<8|t[3]}},Bt=function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]},n=new DataView(t.buffer,t.byteOffset,t.byteLength),a=1&i.flags[2],r=4&i.flags[2],s=1&i.flags[1],o=2&i.flags[1],d=4&i.flags[1],h=8&i.flags[1],p=n.getUint32(4),u=8;for(a&&(i.dataOffset=n.getInt32(u),u+=4),r&&p&&(e={flags:Rt(t.subarray(u,u+4))},u+=4,s&&(e.duration=n.getUint32(u),u+=4),o&&(e.size=n.getUint32(u),u+=4),h&&(1===i.version?e.compositionTimeOffset=n.getInt32(u):e.compositionTimeOffset=n.getUint32(u),u+=4),i.samples.push(e),p--);p--;)e={},s&&(e.duration=n.getUint32(u),u+=4),o&&(e.size=n.getUint32(u),u+=4),d&&(e.flags=Rt(t.subarray(u,u+4)),u+=4),h&&(1===i.version?e.compositionTimeOffset=n.getInt32(u):e.compositionTimeOffset=n.getUint32(u),u+=4),i.samples.push(e);return i},Nt=Ut,Ft=gt.getUint64,zt=function(t){var e={version:t[0],flags:new Uint8Array(t.subarray(1,4))};return 1===e.version?e.baseMediaDecodeTime=Ft(t.subarray(4)):e.baseMediaDecodeTime=Nt(t[4]<<24|t[5]<<16|t[6]<<8|t[7]),e},Vt=function(t,e,i){if(!t)return-1;for(var n=i;n<t.length;n++)if(t[n]===e)return n;return-1},Gt=3,Wt=function(t,e,i){var n,a="";for(n=e;n<i;n++)a+="%"+("00"+t[n].toString(16)).slice(-2);return a},jt=function(t,e,i){return decodeURIComponent(Wt(t,e,i))},qt=function(t,e,i){return unescape(Wt(t,e,i))},Yt=function(t){return t[0]<<21|t[1]<<14|t[2]<<7|t[3]},Ht={APIC:function(t){var e,i,n=1;t.data[0]===Gt&&((e=Vt(t.data,0,n))<0||(t.mimeType=qt(t.data,n,e),n=e+1,t.pictureType=t.data[n],n++,(i=Vt(t.data,0,n))<0||(t.description=jt(t.data,n,i),n=i+1,"--\x3e"===t.mimeType?t.url=qt(t.data,n,t.data.length):t.pictureData=t.data.subarray(n,t.data.length))))},"T*":function(t){t.data[0]===Gt&&(t.value=jt(t.data,1,t.data.length).replace(/\0*$/,""),t.values=t.value.split("\0"))},TXXX:function(t){var e;t.data[0]===Gt&&-1!==(e=Vt(t.data,0,1))&&(t.description=jt(t.data,1,e),t.value=jt(t.data,e+1,t.data.length).replace(/\0*$/,""),t.data=t.value)},"W*":function(t){t.url=qt(t.data,0,t.data.length).replace(/\0.*$/,"")},WXXX:function(t){var e;t.data[0]===Gt&&-1!==(e=Vt(t.data,0,1))&&(t.description=jt(t.data,1,e),t.url=qt(t.data,e+1,t.data.length).replace(/\0.*$/,""))},PRIV:function(t){var e;for(e=0;e<t.data.length;e++)if(0===t.data[e]){t.owner=qt(t.data,0,e);break}t.privateData=t.data.subarray(e+1),t.data=t.privateData}},Xt={parseId3Frames:function(t){var e,i=10,n=0,a=[];if(!(t.length<10||t[0]!=="I".charCodeAt(0)||t[1]!=="D".charCodeAt(0)||t[2]!=="3".charCodeAt(0))){n=Yt(t.subarray(6,10)),n+=10,64&t[5]&&(i+=4,i+=Yt(t.subarray(10,14)),n-=Yt(t.subarray(16,20)));do{if((e=Yt(t.subarray(i+4,i+8)))<1)break;var r={id:String.fromCharCode(t[i],t[i+1],t[i+2],t[i+3]),data:t.subarray(i+10,i+e+10)};r.key=r.id,Ht[r.id]?Ht[r.id](r):"T"===r.id[0]?Ht["T*"](r):"W"===r.id[0]&&Ht["W*"](r),a.push(r),i+=10,i+=e}while(i<n);return a}},parseSyncSafeInteger:Yt,frameParsers:Ht},Kt=Ut,$t=function(t){return("00"+t.toString(16)).slice(-2)},Zt=gt.getUint64,Jt=Xt.parseId3Frames;yt=function(t){return Dt(t,["moov","trak"]).reduce((function(t,e){var i,n,a,r,s;return(i=Dt(e,["tkhd"])[0])?(n=i[0],r=Kt(i[a=0===n?12:20]<<24|i[a+1]<<16|i[a+2]<<8|i[a+3]),(s=Dt(e,["mdia","mdhd"])[0])?(a=0===(n=s[0])?12:20,t[r]=Kt(s[a]<<24|s[a+1]<<16|s[a+2]<<8|s[a+3]),t):null):null}),{})},bt=function(t,e){var n=Dt(e,["moof","traf"]).reduce((function(e,n){var a,r,s=Dt(n,["tfhd"])[0],o=Kt(s[4]<<24|s[5]<<16|s[6]<<8|s[7]),d=t[o]||9e4,h=Dt(n,["tfdt"])[0],p=new DataView(h.buffer,h.byteOffset,h.byteLength);return"bigint"==typeof(a=1===h[0]?Zt(h.subarray(4,12)):p.getUint32(4))?r=a/i.default.BigInt(d):"number"!=typeof a||isNaN(a)||(r=a/d),r<Number.MAX_SAFE_INTEGER&&(r=Number(r)),r<e&&(e=r),e}),1/0);return"bigint"==typeof n||isFinite(n)?n:0},vt=function(t,e){var n,a=Dt(e,["moof","traf"]),r=0,s=0;if(a&&a.length){var o=Dt(a[0],["tfhd"])[0],d=Dt(a[0],["trun"])[0],h=Dt(a[0],["tfdt"])[0];if(o)n=Mt(o).trackId;if(h)r=zt(h).baseMediaDecodeTime;if(d){var p=Bt(d);p.samples&&p.samples.length&&(s=p.samples[0].compositionTimeOffset||0)}}var u=t[n]||9e4;"bigint"==typeof r&&(s=i.default.BigInt(s),u=i.default.BigInt(u));var l=(r+s)/u;return"bigint"==typeof l&&l<Number.MAX_SAFE_INTEGER&&(l=Number(l)),l},St=function(t){var e=Dt(t,["moov","trak"]),i=[];return e.forEach((function(t){var e=Dt(t,["mdia","hdlr"]),n=Dt(t,["tkhd"]);e.forEach((function(t,e){var a,r,s=At(t.subarray(8,12)),o=n[e];"vide"===s&&(r=0===(a=new DataView(o.buffer,o.byteOffset,o.byteLength)).getUint8(0)?a.getUint32(12):a.getUint32(20),i.push(r))}))})),i},wt=function(t){var e=Dt(t,["moov","trak"]),i=[];return e.forEach((function(t){var e,n,a={},r=Dt(t,["tkhd"])[0];r&&(n=(e=new DataView(r.buffer,r.byteOffset,r.byteLength)).getUint8(0),a.id=0===n?e.getUint32(12):e.getUint32(20));var s=Dt(t,["mdia","hdlr"])[0];if(s){var o=At(s.subarray(8,12));a.type="vide"===o?"video":"soun"===o?"audio":o}var d=Dt(t,["mdia","minf","stbl","stsd"])[0];if(d){var h=d.subarray(8);a.codec=At(h.subarray(4,8));var p,u=Dt(h,[a.codec])[0];u&&(/^[asm]vc[1-9]$/i.test(a.codec)?(p=u.subarray(78),"avcC"===At(p.subarray(4,8))&&p.length>11?(a.codec+=".",a.codec+=$t(p[9]),a.codec+=$t(p[10]),a.codec+=$t(p[11])):a.codec="avc1.4d400d"):/^mp4[a,v]$/i.test(a.codec)?(p=u.subarray(28),"esds"===At(p.subarray(4,8))&&p.length>20&&0!==p[19]?(a.codec+="."+$t(p[19]),a.codec+="."+$t(p[20]>>>2&63).replace(/^0/,"")):a.codec="mp4a.40.2"):a.codec=a.codec.toLowerCase())}var l=Dt(t,["mdia","mdhd"])[0];l&&(a.timescale=Tt(l)),i.push(a)})),i},_t=function(t,e){return void 0===e&&(e=0),Dt(t,["emsg"]).map((function(t){var i=xt(new Uint8Array(t)),n=Jt(i.message_data);return{cueTime:Et(i.presentation_time,i.timescale,i.presentation_time_delta,e),duration:Et(i.event_duration,i.timescale),frames:n}}))};var Qt,te={findBox:Dt,parseType:At,timescale:yt,startTime:bt,compositionStartTime:vt,videoTrackIds:St,tracks:wt,getTimescaleFromMediaHeader:Tt=function(t){var e=0===t[0]?12:20;return Kt(t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3])},getEmsgID3:_t},ee=function(t,e){var i={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}};return i.dataOffset=e,i.compositionTimeOffset=t.pts-t.dts,i.duration=t.duration,i.size=4*t.length,i.size+=t.byteLength,t.keyFrame&&(i.flags.dependsOn=2,i.flags.isNonSyncSample=0),i},ie=function(t){var e,i,n=[],a=[];for(a.byteLength=0,a.nalCount=0,a.duration=0,n.byteLength=0,e=0;e<t.length;e++)"access_unit_delimiter_rbsp"===(i=t[e]).nalUnitType?(n.length&&(n.duration=i.dts-n.dts,a.byteLength+=n.byteLength,a.nalCount+=n.length,a.duration+=n.duration,a.push(n)),(n=[i]).byteLength=i.data.byteLength,n.pts=i.pts,n.dts=i.dts):("slice_layer_without_partitioning_rbsp_idr"===i.nalUnitType&&(n.keyFrame=!0),n.duration=i.dts-n.dts,n.byteLength+=i.data.byteLength,n.push(i));return a.length&&(!n.duration||n.duration<=0)&&(n.duration=a[a.length-1].duration),a.byteLength+=n.byteLength,a.nalCount+=n.length,a.duration+=n.duration,a.push(n),a},ne=function(t){var e,i,n=[],a=[];for(n.byteLength=0,n.nalCount=0,n.duration=0,n.pts=t[0].pts,n.dts=t[0].dts,a.byteLength=0,a.nalCount=0,a.duration=0,a.pts=t[0].pts,a.dts=t[0].dts,e=0;e<t.length;e++)(i=t[e]).keyFrame?(n.length&&(a.push(n),a.byteLength+=n.byteLength,a.nalCount+=n.nalCount,a.duration+=n.duration),(n=[i]).nalCount=i.length,n.byteLength=i.byteLength,n.pts=i.pts,n.dts=i.dts,n.duration=i.duration):(n.duration+=i.duration,n.nalCount+=i.length,n.byteLength+=i.byteLength,n.push(i));return a.length&&n.duration<=0&&(n.duration=a[a.length-1].duration),a.byteLength+=n.byteLength,a.nalCount+=n.nalCount,a.duration+=n.duration,a.push(n),a},ae=function(t){var e;return!t[0][0].keyFrame&&t.length>1&&(e=t.shift(),t.byteLength-=e.byteLength,t.nalCount-=e.nalCount,t[0][0].dts=e.dts,t[0][0].pts=e.pts,t[0][0].duration+=e.duration),t},re=function(t,e){var i,n,a,r,s,o=e||0,d=[];for(i=0;i<t.length;i++)for(r=t[i],n=0;n<r.length;n++)s=r[n],o+=(a=ee(s,o)).size,d.push(a);return d},se=function(t){var e,i,n,a,r,s,o=0,d=t.byteLength,h=t.nalCount,p=new Uint8Array(d+4*h),u=new DataView(p.buffer);for(e=0;e<t.length;e++)for(a=t[e],i=0;i<a.length;i++)for(r=a[i],n=0;n<r.length;n++)s=r[n],u.setUint32(o,s.data.byteLength),o+=4,p.set(s.data,o),o+=s.data.byteLength;return p},oe=function(t,e){var i,n=[];return i=ee(t,e||0),n.push(i),n},de=function(t){var e,i,n=0,a=t.byteLength,r=t.length,s=new Uint8Array(a+4*r),o=new DataView(s.buffer);for(e=0;e<t.length;e++)i=t[e],o.setUint32(n,i.data.byteLength),n+=4,s.set(i.data,n),n+=i.data.byteLength;return s},he=[33,16,5,32,164,27],pe=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],ue=function(t){for(var e=[];t--;)e.push(0);return e},le=function(){if(!Qt){var t={96e3:[he,[227,64],ue(154),[56]],88200:[he,[231],ue(170),[56]],64e3:[he,[248,192],ue(240),[56]],48e3:[he,[255,192],ue(268),[55,148,128],ue(54),[112]],44100:[he,[255,192],ue(268),[55,163,128],ue(84),[112]],32e3:[he,[255,192],ue(268),[55,234],ue(226),[112]],24e3:[he,[255,192],ue(268),[55,255,128],ue(268),[111,112],ue(126),[224]],16e3:[he,[255,192],ue(268),[55,255,128],ue(268),[111,255],ue(269),[223,108],ue(195),[1,192]],12e3:[pe,ue(268),[3,127,248],ue(268),[6,255,240],ue(268),[13,255,224],ue(268),[27,253,128],ue(259),[56]],11025:[pe,ue(268),[3,127,248],ue(268),[6,255,240],ue(268),[13,255,224],ue(268),[27,255,192],ue(268),[55,175,128],ue(108),[112]],8e3:[pe,ue(268),[3,121,16],ue(47),[7]]};e=t,Qt=Object.keys(e).reduce((function(t,i){return t[i]=new Uint8Array(e[i].reduce((function(t,e){return t.concat(e)}),[])),t}),{})}var e;return Qt},ce=function(t,e,i,n){var a,r,s,o,d,h=0,p=0,u=0;if(e.length&&(a=m(t.baseMediaDecodeTime,t.samplerate),r=Math.ceil(f/(t.samplerate/1024)),i&&n&&(h=a-Math.max(i,n),u=(p=Math.floor(h/r))*r),!(p<1||u>f/2))){for((s=le()[t.samplerate])||(s=e[0].data),o=0;o<p;o++)d=e[0],e.splice(0,0,{data:s,dts:d.dts-r,pts:d.pts-r});return t.baseMediaDecodeTime-=Math.floor(y(u,t.samplerate)),u}},fe=function(t,e,i){return e.minSegmentDts>=i?t:(e.minSegmentDts=1/0,t.filter((function(t){return t.dts>=i&&(e.minSegmentDts=Math.min(e.minSegmentDts,t.dts),e.minSegmentPts=e.minSegmentDts,!0)})))},ge=function(t){var e,i,n=[];for(e=0;e<t.length;e++)i=t[e],n.push({size:i.data.byteLength,duration:1024});return n},me=function(t){var e,i,n=0,a=new Uint8Array(function(t){var e,i=0;for(e=0;e<t.length;e++)i+=t[e].data.byteLength;return i}(t));for(e=0;e<t.length;e++)i=t[e],a.set(i.data,n),n+=i.data.byteLength;return a},ye=f,be=function(t){delete t.minSegmentDts,delete t.maxSegmentDts,delete t.minSegmentPts,delete t.maxSegmentPts},ve=function(t,e){var i,n=t.minSegmentDts;return e||(n-=t.timelineStartInfo.dts),i=t.timelineStartInfo.baseMediaDecodeTime,i+=n,i=Math.max(0,i),"audio"===t.type&&(i*=t.samplerate/ye,i=Math.floor(i)),i},Se=function(t,e){"number"==typeof e.pts&&(void 0===t.timelineStartInfo.pts&&(t.timelineStartInfo.pts=e.pts),void 0===t.minSegmentPts?t.minSegmentPts=e.pts:t.minSegmentPts=Math.min(t.minSegmentPts,e.pts),void 0===t.maxSegmentPts?t.maxSegmentPts=e.pts:t.maxSegmentPts=Math.max(t.maxSegmentPts,e.pts)),"number"==typeof e.dts&&(void 0===t.timelineStartInfo.dts&&(t.timelineStartInfo.dts=e.dts),void 0===t.minSegmentDts?t.minSegmentDts=e.dts:t.minSegmentDts=Math.min(t.minSegmentDts,e.dts),void 0===t.maxSegmentDts?t.maxSegmentDts=e.dts:t.maxSegmentDts=Math.max(t.maxSegmentDts,e.dts))},we=function(t){for(var e=0,i={payloadType:-1,payloadSize:0},n=0,a=0;e<t.byteLength&&128!==t[e];){for(;255===t[e];)n+=255,e++;for(n+=t[e++];255===t[e];)a+=255,e++;if(a+=t[e++],!i.payload&&4===n){if("GA94"===String.fromCharCode(t[e+3],t[e+4],t[e+5],t[e+6])){i.payloadType=n,i.payloadSize=a,i.payload=t.subarray(e,e+a);break}i.payload=void 0}e+=a,n=0,a=0}return i},Te=function(t){return 181!==t.payload[0]||49!=(t.payload[1]<<8|t.payload[2])||"GA94"!==String.fromCharCode(t.payload[3],t.payload[4],t.payload[5],t.payload[6])||3!==t.payload[7]?null:t.payload.subarray(8,t.payload.length-1)},_e=function(t,e){var i,n,a,r,s=[];if(!(64&e[0]))return s;for(n=31&e[0],i=0;i<n;i++)r={type:3&e[(a=3*i)+2],pts:t},4&e[a+2]&&(r.ccData=e[a+3]<<8|e[a+4],s.push(r));return s},ke=function(t){for(var e,i,n=t.byteLength,a=[],r=1;r<n-2;)0===t[r]&&0===t[r+1]&&3===t[r+2]?(a.push(r+2),r+=2):r++;if(0===a.length)return t;e=n-a.length,i=new Uint8Array(e);var s=0;for(r=0;r<e;s++,r++)s===a[0]&&(s++,a.shift()),i[r]=t[s];return i},Ue=4,Ae=function t(e){e=e||{},t.prototype.init.call(this),this.parse708captions_="boolean"!=typeof e.parse708captions||e.parse708captions,this.captionPackets_=[],this.ccStreams_=[new Re(0,0),new Re(0,1),new Re(1,0),new Re(1,1)],this.parse708captions_&&(this.cc708Stream_=new Le({captionServices:e.captionServices})),this.reset(),this.ccStreams_.forEach((function(t){t.on("data",this.trigger.bind(this,"data")),t.on("partialdone",this.trigger.bind(this,"partialdone")),t.on("done",this.trigger.bind(this,"done"))}),this),this.parse708captions_&&(this.cc708Stream_.on("data",this.trigger.bind(this,"data")),this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone")),this.cc708Stream_.on("done",this.trigger.bind(this,"done")))};(Ae.prototype=new u).push=function(t){var e,i,n;if("sei_rbsp"===t.nalUnitType&&(e=we(t.escapedRBSP)).payload&&e.payloadType===Ue&&(i=Te(e)))if(t.dts<this.latestDts_)this.ignoreNextEqualDts_=!0;else{if(t.dts===this.latestDts_&&this.ignoreNextEqualDts_)return this.numSameDts_--,void(this.numSameDts_||(this.ignoreNextEqualDts_=!1));n=_e(t.pts,i),this.captionPackets_=this.captionPackets_.concat(n),this.latestDts_!==t.dts&&(this.numSameDts_=0),this.numSameDts_++,this.latestDts_=t.dts}},Ae.prototype.flushCCStreams=function(t){this.ccStreams_.forEach((function(e){return"flush"===t?e.flush():e.partialFlush()}),this)},Ae.prototype.flushStream=function(t){this.captionPackets_.length?(this.captionPackets_.forEach((function(t,e){t.presortIndex=e})),this.captionPackets_.sort((function(t,e){return t.pts===e.pts?t.presortIndex-e.presortIndex:t.pts-e.pts})),this.captionPackets_.forEach((function(t){t.type<2?this.dispatchCea608Packet(t):this.dispatchCea708Packet(t)}),this),this.captionPackets_.length=0,this.flushCCStreams(t)):this.flushCCStreams(t)},Ae.prototype.flush=function(){return this.flushStream("flush")},Ae.prototype.partialFlush=function(){return this.flushStream("partialFlush")},Ae.prototype.reset=function(){this.latestDts_=null,this.ignoreNextEqualDts_=!1,this.numSameDts_=0,this.activeCea608Channel_=[null,null],this.ccStreams_.forEach((function(t){t.reset()}))},Ae.prototype.dispatchCea608Packet=function(t){this.setsTextOrXDSActive(t)?this.activeCea608Channel_[t.type]=null:this.setsChannel1Active(t)?this.activeCea608Channel_[t.type]=0:this.setsChannel2Active(t)&&(this.activeCea608Channel_[t.type]=1),null!==this.activeCea608Channel_[t.type]&&this.ccStreams_[(t.type<<1)+this.activeCea608Channel_[t.type]].push(t)},Ae.prototype.setsChannel1Active=function(t){return 4096==(30720&t.ccData)},Ae.prototype.setsChannel2Active=function(t){return 6144==(30720&t.ccData)},Ae.prototype.setsTextOrXDSActive=function(t){return 256==(28928&t.ccData)||4138==(30974&t.ccData)||6186==(30974&t.ccData)},Ae.prototype.dispatchCea708Packet=function(t){this.parse708captions_&&this.cc708Stream_.push(t)};var Ce={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},De=function(t){return 32<=t&&t<=127||160<=t&&t<=255},Pe=function(t){this.windowNum=t,this.reset()};Pe.prototype.reset=function(){this.clearText(),this.pendingNewLine=!1,this.winAttr={},this.penAttr={},this.penLoc={},this.penColor={},this.visible=0,this.rowLock=0,this.columnLock=0,this.priority=0,this.relativePositioning=0,this.anchorVertical=0,this.anchorHorizontal=0,this.anchorPoint=0,this.rowCount=1,this.virtualRowCount=this.rowCount+1,this.columnCount=41,this.windowStyle=0,this.penStyle=0},Pe.prototype.getText=function(){return this.rows.join("\n")},Pe.prototype.clearText=function(){this.rows=[""],this.rowIdx=0},Pe.prototype.newLine=function(t){for(this.rows.length>=this.virtualRowCount&&"function"==typeof this.beforeRowOverflow&&this.beforeRowOverflow(t),this.rows.length>0&&(this.rows.push(""),this.rowIdx++);this.rows.length>this.virtualRowCount;)this.rows.shift(),this.rowIdx--},Pe.prototype.isEmpty=function(){return 0===this.rows.length||1===this.rows.length&&""===this.rows[0]},Pe.prototype.addText=function(t){this.rows[this.rowIdx]+=t},Pe.prototype.backspace=function(){if(!this.isEmpty()){var t=this.rows[this.rowIdx];this.rows[this.rowIdx]=t.substr(0,t.length-1)}};var Ie=function(t,e,i){this.serviceNum=t,this.text="",this.currentWindow=new Pe(-1),this.windows=[],this.stream=i,"string"==typeof e&&this.createTextDecoder(e)};Ie.prototype.init=function(t,e){this.startPts=t;for(var i=0;i<8;i++)this.windows[i]=new Pe(i),"function"==typeof e&&(this.windows[i].beforeRowOverflow=e)},Ie.prototype.setCurrentWindow=function(t){this.currentWindow=this.windows[t]},Ie.prototype.createTextDecoder=function(t){if("undefined"==typeof TextDecoder)this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"});else try{this.textDecoder_=new TextDecoder(t)}catch(e){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+t+" encoding. "+e})}};var Le=function t(e){e=e||{},t.prototype.init.call(this);var i,n=this,a=e.captionServices||{},r={};Object.keys(a).forEach((function(t){i=a[t],/^SERVICE/.test(t)&&(r[t]=i.encoding)})),this.serviceEncodings=r,this.current708Packet=null,this.services={},this.push=function(t){3===t.type?(n.new708Packet(),n.add708Bytes(t)):(null===n.current708Packet&&n.new708Packet(),n.add708Bytes(t))}};Le.prototype=new u,Le.prototype.new708Packet=function(){null!==this.current708Packet&&this.push708Packet(),this.current708Packet={data:[],ptsVals:[]}},Le.prototype.add708Bytes=function(t){var e=t.ccData,i=e>>>8,n=255&e;this.current708Packet.ptsVals.push(t.pts),this.current708Packet.data.push(i),this.current708Packet.data.push(n)},Le.prototype.push708Packet=function(){var t=this.current708Packet,e=t.data,i=null,n=null,a=0,r=e[a++];for(t.seq=r>>6,t.sizeCode=63&r;a<e.length;a++)n=31&(r=e[a++]),7===(i=r>>5)&&n>0&&(i=r=e[a++]),this.pushServiceBlock(i,a,n),n>0&&(a+=n-1)},Le.prototype.pushServiceBlock=function(t,e,i){var n,a=e,r=this.current708Packet.data,s=this.services[t];for(s||(s=this.initService(t,a));a<e+i&&a<r.length;a++)n=r[a],De(n)?a=this.handleText(a,s):24===n?a=this.multiByteCharacter(a,s):16===n?a=this.extendedCommands(a,s):128<=n&&n<=135?a=this.setCurrentWindow(a,s):152<=n&&n<=159?a=this.defineWindow(a,s):136===n?a=this.clearWindows(a,s):140===n?a=this.deleteWindows(a,s):137===n?a=this.displayWindows(a,s):138===n?a=this.hideWindows(a,s):139===n?a=this.toggleWindows(a,s):151===n?a=this.setWindowAttributes(a,s):144===n?a=this.setPenAttributes(a,s):145===n?a=this.setPenColor(a,s):146===n?a=this.setPenLocation(a,s):143===n?s=this.reset(a,s):8===n?s.currentWindow.backspace():12===n?s.currentWindow.clearText():13===n?s.currentWindow.pendingNewLine=!0:14===n?s.currentWindow.clearText():141===n&&a++},Le.prototype.extendedCommands=function(t,e){var i=this.current708Packet.data[++t];return De(i)&&(t=this.handleText(t,e,{isExtended:!0})),t},Le.prototype.getPts=function(t){return this.current708Packet.ptsVals[Math.floor(t/2)]},Le.prototype.initService=function(t,e){var i,n,a=this;return(i="SERVICE"+t)in this.serviceEncodings&&(n=this.serviceEncodings[i]),this.services[t]=new Ie(t,n,a),this.services[t].init(this.getPts(e),(function(e){a.flushDisplayed(e,a.services[t])})),this.services[t]},Le.prototype.handleText=function(t,e,i){var n,a,r,s,o=i&&i.isExtended,d=i&&i.isMultiByte,h=this.current708Packet.data,p=o?4096:0,u=h[t],l=h[t+1],c=e.currentWindow;return e.textDecoder_&&!o?(d?(a=[u,l],t++):a=[u],n=e.textDecoder_.decode(new Uint8Array(a))):(s=Ce[r=p|u]||r,n=4096&r&&r===s?"":String.fromCharCode(s)),c.pendingNewLine&&!c.isEmpty()&&c.newLine(this.getPts(t)),c.pendingNewLine=!1,c.addText(n),t},Le.prototype.multiByteCharacter=function(t,e){var i=this.current708Packet.data,n=i[t+1],a=i[t+2];return De(n)&&De(a)&&(t=this.handleText(++t,e,{isMultiByte:!0})),t},Le.prototype.setCurrentWindow=function(t,e){var i=7&this.current708Packet.data[t];return e.setCurrentWindow(i),t},Le.prototype.defineWindow=function(t,e){var i=this.current708Packet.data,n=i[t],a=7&n;e.setCurrentWindow(a);var r=e.currentWindow;return n=i[++t],r.visible=(32&n)>>5,r.rowLock=(16&n)>>4,r.columnLock=(8&n)>>3,r.priority=7&n,n=i[++t],r.relativePositioning=(128&n)>>7,r.anchorVertical=127&n,n=i[++t],r.anchorHorizontal=n,n=i[++t],r.anchorPoint=(240&n)>>4,r.rowCount=15&n,n=i[++t],r.columnCount=63&n,n=i[++t],r.windowStyle=(56&n)>>3,r.penStyle=7&n,r.virtualRowCount=r.rowCount+1,t},Le.prototype.setWindowAttributes=function(t,e){var i=this.current708Packet.data,n=i[t],a=e.currentWindow.winAttr;return n=i[++t],a.fillOpacity=(192&n)>>6,a.fillRed=(48&n)>>4,a.fillGreen=(12&n)>>2,a.fillBlue=3&n,n=i[++t],a.borderType=(192&n)>>6,a.borderRed=(48&n)>>4,a.borderGreen=(12&n)>>2,a.borderBlue=3&n,n=i[++t],a.borderType+=(128&n)>>5,a.wordWrap=(64&n)>>6,a.printDirection=(48&n)>>4,a.scrollDirection=(12&n)>>2,a.justify=3&n,n=i[++t],a.effectSpeed=(240&n)>>4,a.effectDirection=(12&n)>>2,a.displayEffect=3&n,t},Le.prototype.flushDisplayed=function(t,e){for(var i=[],n=0;n<8;n++)e.windows[n].visible&&!e.windows[n].isEmpty()&&i.push(e.windows[n].getText());e.endPts=t,e.text=i.join("\n\n"),this.pushCaption(e),e.startPts=t},Le.prototype.pushCaption=function(t){""!==t.text&&(this.trigger("data",{startPts:t.startPts,endPts:t.endPts,text:t.text,stream:"cc708_"+t.serviceNum}),t.text="",t.startPts=t.endPts)},Le.prototype.displayWindows=function(t,e){var i=this.current708Packet.data[++t],n=this.getPts(t);this.flushDisplayed(n,e);for(var a=0;a<8;a++)i&1<<a&&(e.windows[a].visible=1);return t},Le.prototype.hideWindows=function(t,e){var i=this.current708Packet.data[++t],n=this.getPts(t);this.flushDisplayed(n,e);for(var a=0;a<8;a++)i&1<<a&&(e.windows[a].visible=0);return t},Le.prototype.toggleWindows=function(t,e){var i=this.current708Packet.data[++t],n=this.getPts(t);this.flushDisplayed(n,e);for(var a=0;a<8;a++)i&1<<a&&(e.windows[a].visible^=1);return t},Le.prototype.clearWindows=function(t,e){var i=this.current708Packet.data[++t],n=this.getPts(t);this.flushDisplayed(n,e);for(var a=0;a<8;a++)i&1<<a&&e.windows[a].clearText();return t},Le.prototype.deleteWindows=function(t,e){var i=this.current708Packet.data[++t],n=this.getPts(t);this.flushDisplayed(n,e);for(var a=0;a<8;a++)i&1<<a&&e.windows[a].reset();return t},Le.prototype.setPenAttributes=function(t,e){var i=this.current708Packet.data,n=i[t],a=e.currentWindow.penAttr;return n=i[++t],a.textTag=(240&n)>>4,a.offset=(12&n)>>2,a.penSize=3&n,n=i[++t],a.italics=(128&n)>>7,a.underline=(64&n)>>6,a.edgeType=(56&n)>>3,a.fontStyle=7&n,t},Le.prototype.setPenColor=function(t,e){var i=this.current708Packet.data,n=i[t],a=e.currentWindow.penColor;return n=i[++t],a.fgOpacity=(192&n)>>6,a.fgRed=(48&n)>>4,a.fgGreen=(12&n)>>2,a.fgBlue=3&n,n=i[++t],a.bgOpacity=(192&n)>>6,a.bgRed=(48&n)>>4,a.bgGreen=(12&n)>>2,a.bgBlue=3&n,n=i[++t],a.edgeRed=(48&n)>>4,a.edgeGreen=(12&n)>>2,a.edgeBlue=3&n,t},Le.prototype.setPenLocation=function(t,e){var i=this.current708Packet.data,n=i[t],a=e.currentWindow.penLoc;return e.currentWindow.pendingNewLine=!0,n=i[++t],a.row=15&n,n=i[++t],a.column=63&n,t},Le.prototype.reset=function(t,e){var i=this.getPts(t);return this.flushDisplayed(i,e),this.initService(e.serviceNum,t)};var Oe={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},xe=function(t){return null===t?"":(t=Oe[t]||t,String.fromCharCode(t))},Ee=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],Me=function(){for(var t=[],e=15;e--;)t.push("");return t},Re=function t(e,i){t.prototype.init.call(this),this.field_=e||0,this.dataChannel_=i||0,this.name_="CC"+(1+(this.field_<<1|this.dataChannel_)),this.setConstants(),this.reset(),this.push=function(t){var e,i,n,a,r;if((e=32639&t.ccData)!==this.lastControlCode_){if(4096==(61440&e)?this.lastControlCode_=e:e!==this.PADDING_&&(this.lastControlCode_=null),n=e>>>8,a=255&e,e!==this.PADDING_)if(e===this.RESUME_CAPTION_LOADING_)this.mode_="popOn";else if(e===this.END_OF_CAPTION_)this.mode_="popOn",this.clearFormatting(t.pts),this.flushDisplayed(t.pts),i=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=i,this.startPts_=t.pts;else if(e===this.ROLL_UP_2_ROWS_)this.rollUpRows_=2,this.setRollUp(t.pts);else if(e===this.ROLL_UP_3_ROWS_)this.rollUpRows_=3,this.setRollUp(t.pts);else if(e===this.ROLL_UP_4_ROWS_)this.rollUpRows_=4,this.setRollUp(t.pts);else if(e===this.CARRIAGE_RETURN_)this.clearFormatting(t.pts),this.flushDisplayed(t.pts),this.shiftRowsUp_(),this.startPts_=t.pts;else if(e===this.BACKSPACE_)"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1);else if(e===this.ERASE_DISPLAYED_MEMORY_)this.flushDisplayed(t.pts),this.displayed_=Me();else if(e===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=Me();else if(e===this.RESUME_DIRECT_CAPTIONING_)"paintOn"!==this.mode_&&(this.flushDisplayed(t.pts),this.displayed_=Me()),this.mode_="paintOn",this.startPts_=t.pts;else if(this.isSpecialCharacter(n,a))r=xe((n=(3&n)<<8)|a),this[this.mode_](t.pts,r),this.column_++;else if(this.isExtCharacter(n,a))"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1),r=xe((n=(3&n)<<8)|a),this[this.mode_](t.pts,r),this.column_++;else if(this.isMidRowCode(n,a))this.clearFormatting(t.pts),this[this.mode_](t.pts," "),this.column_++,14==(14&a)&&this.addFormatting(t.pts,["i"]),1==(1&a)&&this.addFormatting(t.pts,["u"]);else if(this.isOffsetControlCode(n,a))this.column_+=3&a;else if(this.isPAC(n,a)){var s=Ee.indexOf(7968&e);"rollUp"===this.mode_&&(s-this.rollUpRows_+1<0&&(s=this.rollUpRows_-1),this.setRollUp(t.pts,s)),s!==this.row_&&(this.clearFormatting(t.pts),this.row_=s),1&a&&-1===this.formatting_.indexOf("u")&&this.addFormatting(t.pts,["u"]),16==(16&e)&&(this.column_=4*((14&e)>>1)),this.isColorPAC(a)&&14==(14&a)&&this.addFormatting(t.pts,["i"])}else this.isNormalChar(n)&&(0===a&&(a=null),r=xe(n),r+=xe(a),this[this.mode_](t.pts,r),this.column_+=r.length)}else this.lastControlCode_=null}};Re.prototype=new u,Re.prototype.flushDisplayed=function(t){var e=this.displayed_.map((function(t,e){try{return t.trim()}catch(t){return this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+e+"."}),""}}),this).join("\n").replace(/^\n+|\n+$/g,"");e.length&&this.trigger("data",{startPts:this.startPts_,endPts:t,text:e,stream:this.name_})},Re.prototype.reset=function(){this.mode_="popOn",this.topRow_=0,this.startPts_=0,this.displayed_=Me(),this.nonDisplayed_=Me(),this.lastControlCode_=null,this.column_=0,this.row_=14,this.rollUpRows_=2,this.formatting_=[]},Re.prototype.setConstants=function(){0===this.dataChannel_?(this.BASE_=16,this.EXT_=17,this.CONTROL_=(20|this.field_)<<8,this.OFFSET_=23):1===this.dataChannel_&&(this.BASE_=24,this.EXT_=25,this.CONTROL_=(28|this.field_)<<8,this.OFFSET_=31),this.PADDING_=0,this.RESUME_CAPTION_LOADING_=32|this.CONTROL_,this.END_OF_CAPTION_=47|this.CONTROL_,this.ROLL_UP_2_ROWS_=37|this.CONTROL_,this.ROLL_UP_3_ROWS_=38|this.CONTROL_,this.ROLL_UP_4_ROWS_=39|this.CONTROL_,this.CARRIAGE_RETURN_=45|this.CONTROL_,this.RESUME_DIRECT_CAPTIONING_=41|this.CONTROL_,this.BACKSPACE_=33|this.CONTROL_,this.ERASE_DISPLAYED_MEMORY_=44|this.CONTROL_,this.ERASE_NON_DISPLAYED_MEMORY_=46|this.CONTROL_},Re.prototype.isSpecialCharacter=function(t,e){return t===this.EXT_&&e>=48&&e<=63},Re.prototype.isExtCharacter=function(t,e){return(t===this.EXT_+1||t===this.EXT_+2)&&e>=32&&e<=63},Re.prototype.isMidRowCode=function(t,e){return t===this.EXT_&&e>=32&&e<=47},Re.prototype.isOffsetControlCode=function(t,e){return t===this.OFFSET_&&e>=33&&e<=35},Re.prototype.isPAC=function(t,e){return t>=this.BASE_&&t<this.BASE_+8&&e>=64&&e<=127},Re.prototype.isColorPAC=function(t){return t>=64&&t<=79||t>=96&&t<=127},Re.prototype.isNormalChar=function(t){return t>=32&&t<=127},Re.prototype.setRollUp=function(t,e){if("rollUp"!==this.mode_&&(this.row_=14,this.mode_="rollUp",this.flushDisplayed(t),this.nonDisplayed_=Me(),this.displayed_=Me()),void 0!==e&&e!==this.row_)for(var i=0;i<this.rollUpRows_;i++)this.displayed_[e-i]=this.displayed_[this.row_-i],this.displayed_[this.row_-i]="";void 0===e&&(e=this.row_),this.topRow_=e-this.rollUpRows_+1},Re.prototype.addFormatting=function(t,e){this.formatting_=this.formatting_.concat(e);var i=e.reduce((function(t,e){return t+"<"+e+">"}),"");this[this.mode_](t,i)},Re.prototype.clearFormatting=function(t){if(this.formatting_.length){var e=this.formatting_.reverse().reduce((function(t,e){return t+"</"+e+">"}),"");this.formatting_=[],this[this.mode_](t,e)}},Re.prototype.popOn=function(t,e){var i=this.nonDisplayed_[this.row_];i+=e,this.nonDisplayed_[this.row_]=i},Re.prototype.rollUp=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i},Re.prototype.shiftRowsUp_=function(){var t;for(t=0;t<this.topRow_;t++)this.displayed_[t]="";for(t=this.row_+1;t<15;t++)this.displayed_[t]="";for(t=this.topRow_;t<this.row_;t++)this.displayed_[t]=this.displayed_[t+1];this.displayed_[this.row_]=""},Re.prototype.paintOn=function(t,e){var i=this.displayed_[this.row_];i+=e,this.displayed_[this.row_]=i};var Be={CaptionStream:Ae,Cea608Stream:Re,Cea708Stream:Le},Ne={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},Fe="shared",ze=function(t,e){var i=1;for(t>e&&(i=-1);Math.abs(e-t)>4294967296;)t+=8589934592*i;return t},Ve=function t(e){var i,n;t.prototype.init.call(this),this.type_=e||Fe,this.push=function(t){this.type_!==Fe&&t.type!==this.type_||(void 0===n&&(n=t.dts),t.dts=ze(t.dts,n),t.pts=ze(t.pts,n),i=t.dts,this.trigger("data",t))},this.flush=function(){n=i,this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.discontinuity=function(){n=void 0,i=void 0},this.reset=function(){this.discontinuity(),this.trigger("reset")}};Ve.prototype=new u;var Ge,We=Ve,je=ze;(Ge=function(t){var e,i={descriptor:t&&t.descriptor},n=0,a=[],r=0;if(Ge.prototype.init.call(this),this.dispatchType=Ne.METADATA_STREAM_TYPE.toString(16),i.descriptor)for(e=0;e<i.descriptor.length;e++)this.dispatchType+=("00"+i.descriptor[e].toString(16)).slice(-2);this.push=function(t){var e,i,s,o,d;if("timed-metadata"===t.type)if(t.dataAlignmentIndicator&&(r=0,a.length=0),0===a.length&&(t.data.length<10||t.data[0]!=="I".charCodeAt(0)||t.data[1]!=="D".charCodeAt(0)||t.data[2]!=="3".charCodeAt(0)))this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"});else if(a.push(t),r+=t.data.byteLength,1===a.length&&(n=Xt.parseSyncSafeInteger(t.data.subarray(6,10)),n+=10),!(r<n)){for(e={data:new Uint8Array(n),frames:[],pts:a[0].pts,dts:a[0].dts},d=0;d<n;)e.data.set(a[0].data.subarray(0,n-d),d),d+=a[0].data.byteLength,r-=a[0].data.byteLength,a.shift();i=10,64&e.data[5]&&(i+=4,i+=Xt.parseSyncSafeInteger(e.data.subarray(10,14)),n-=Xt.parseSyncSafeInteger(e.data.subarray(16,20)));do{if((s=Xt.parseSyncSafeInteger(e.data.subarray(i+4,i+8)))<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping remaining metadata parsing."});break}if((o={id:String.fromCharCode(e.data[i],e.data[i+1],e.data[i+2],e.data[i+3]),data:e.data.subarray(i+10,i+s+10)}).key=o.id,Xt.frameParsers[o.id]?Xt.frameParsers[o.id](o):"T"===o.id[0]?Xt.frameParsers["T*"](o):"W"===o.id[0]&&Xt.frameParsers["W*"](o),"com.apple.streaming.transportStreamTimestamp"===o.owner){var h=o.data,p=(1&h[3])<<30|h[4]<<22|h[5]<<14|h[6]<<6|h[7]>>>2;p*=4,p+=3&h[7],o.timeStamp=p,void 0===e.pts&&void 0===e.dts&&(e.pts=o.timeStamp,e.dts=o.timeStamp),this.trigger("timestamp",o)}e.frames.push(o),i+=10,i+=s}while(i<n);this.trigger("data",e)}}}).prototype=new u;var qe,Ye,He,Xe=Ge,Ke=We,$e=188;(qe=function(){var t=new Uint8Array($e),e=0;qe.prototype.init.call(this),this.push=function(i){var n,a=0,r=$e;for(e?((n=new Uint8Array(i.byteLength+e)).set(t.subarray(0,e)),n.set(i,e),e=0):n=i;r<n.byteLength;)71!==n[a]||71!==n[r]?(a++,r++):(this.trigger("data",n.subarray(a,r)),a+=$e,r+=$e);a<n.byteLength&&(t.set(n.subarray(a),0),e=n.byteLength-a)},this.flush=function(){e===$e&&71===t[0]&&(this.trigger("data",t),e=0),this.trigger("done")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline")},this.reset=function(){e=0,this.trigger("reset")}}).prototype=new u,(Ye=function(){var t,e,i,n;Ye.prototype.init.call(this),n=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,t=function(t,n){var a=0;n.payloadUnitStartIndicator&&(a+=t[a]+1),"pat"===n.type?e(t.subarray(a),n):i(t.subarray(a),n)},e=function(t,e){e.section_number=t[7],e.last_section_number=t[8],n.pmtPid=(31&t[10])<<8|t[11],e.pmtPid=n.pmtPid},i=function(t,e){var i,a;if(1&t[5]){for(n.programMapTable={video:null,audio:null,"timed-metadata":{}},i=3+((15&t[1])<<8|t[2])-4,a=12+((15&t[10])<<8|t[11]);a<i;){var r=t[a],s=(31&t[a+1])<<8|t[a+2];r===Ne.H264_STREAM_TYPE&&null===n.programMapTable.video?n.programMapTable.video=s:r===Ne.ADTS_STREAM_TYPE&&null===n.programMapTable.audio?n.programMapTable.audio=s:r===Ne.METADATA_STREAM_TYPE&&(n.programMapTable["timed-metadata"][s]=r),a+=5+((15&t[a+3])<<8|t[a+4])}e.programMapTable=n.programMapTable}},this.push=function(e){var i={},n=4;if(i.payloadUnitStartIndicator=!!(64&e[1]),i.pid=31&e[1],i.pid<<=8,i.pid|=e[2],(48&e[3])>>>4>1&&(n+=e[n]+1),0===i.pid)i.type="pat",t(e.subarray(n),i),this.trigger("data",i);else if(i.pid===this.pmtPid)for(i.type="pmt",t(e.subarray(n),i),this.trigger("data",i);this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift());else void 0===this.programMapTable?this.packetsWaitingForPmt.push([e,n,i]):this.processPes_(e,n,i)},this.processPes_=function(t,e,i){i.pid===this.programMapTable.video?i.streamType=Ne.H264_STREAM_TYPE:i.pid===this.programMapTable.audio?i.streamType=Ne.ADTS_STREAM_TYPE:i.streamType=this.programMapTable["timed-metadata"][i.pid],i.type="pes",i.data=t.subarray(e),this.trigger("data",i)}}).prototype=new u,Ye.STREAM_TYPES={h264:27,adts:15},(He=function(){var t,e=this,i=!1,n={data:[],size:0},a={data:[],size:0},r={data:[],size:0},s=function(t,i,n){var a,r,s=new Uint8Array(t.size),o={type:i},d=0,h=0;if(t.data.length&&!(t.size<9)){for(o.trackId=t.data[0].pid,d=0;d<t.data.length;d++)r=t.data[d],s.set(r.data,h),h+=r.data.byteLength;var p,u,l,c;u=o,c=(p=s)[0]<<16|p[1]<<8|p[2],u.data=new Uint8Array,1===c&&(u.packetLength=6+(p[4]<<8|p[5]),u.dataAlignmentIndicator=0!=(4&p[6]),192&(l=p[7])&&(u.pts=(14&p[9])<<27|(255&p[10])<<20|(254&p[11])<<12|(255&p[12])<<5|(254&p[13])>>>3,u.pts*=4,u.pts+=(6&p[13])>>>1,u.dts=u.pts,64&l&&(u.dts=(14&p[14])<<27|(255&p[15])<<20|(254&p[16])<<12|(255&p[17])<<5|(254&p[18])>>>3,u.dts*=4,u.dts+=(6&p[18])>>>1)),u.data=p.subarray(9+p[8])),a="video"===i||o.packetLength<=t.size,(n||a)&&(t.size=0,t.data.length=0),a&&e.trigger("data",o)}};He.prototype.init.call(this),this.push=function(o){({pat:function(){},pes:function(){var t,e;switch(o.streamType){case Ne.H264_STREAM_TYPE:t=n,e="video";break;case Ne.ADTS_STREAM_TYPE:t=a,e="audio";break;case Ne.METADATA_STREAM_TYPE:t=r,e="timed-metadata";break;default:return}o.payloadUnitStartIndicator&&s(t,e,!0),t.data.push(o),t.size+=o.data.byteLength},pmt:function(){var n={type:"metadata",tracks:[]};null!==(t=o.programMapTable).video&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+t.video,codec:"avc",type:"video"}),null!==t.audio&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+t.audio,codec:"adts",type:"audio"}),i=!0,e.trigger("data",n)}})[o.type]()},this.reset=function(){n.size=0,n.data.length=0,a.size=0,a.data.length=0,this.trigger("reset")},this.flushStreams_=function(){s(n,"video"),s(a,"audio"),s(r,"timed-metadata")},this.flush=function(){if(!i&&t){var n={type:"metadata",tracks:[]};null!==t.video&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+t.video,codec:"avc",type:"video"}),null!==t.audio&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+t.audio,codec:"adts",type:"audio"}),e.trigger("data",n)}i=!1,this.flushStreams_(),this.trigger("done")}}).prototype=new u;var Ze={PAT_PID:0,MP2T_PACKET_LENGTH:$e,TransportPacketStream:qe,TransportParseStream:Ye,ElementaryStream:He,TimestampRolloverStream:Ke,CaptionStream:Be.CaptionStream,Cea608Stream:Be.Cea608Stream,Cea708Stream:Be.Cea708Stream,MetadataStream:Xe};for(var Je in Ne)Ne.hasOwnProperty(Je)&&(Ze[Je]=Ne[Je]);var Qe,ti=Ze,ei=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],ii=function(t,e){var i=t[e+6]<<21|t[e+7]<<14|t[e+8]<<7|t[e+9];return i=i>=0?i:0,(16&t[e+5])>>4?i+20:i+10},ni=function t(e,i){return e.length-i<10||e[i]!=="I".charCodeAt(0)||e[i+1]!=="D".charCodeAt(0)||e[i+2]!=="3".charCodeAt(0)?i:t(e,i+=ii(e,i))},ai=function(t){return t[0]<<21|t[1]<<14|t[2]<<7|t[3]},ri={isLikelyAacData:function(t){var e=ni(t,0);return t.length>=e+2&&255==(255&t[e])&&240==(240&t[e+1])&&16==(22&t[e+1])},parseId3TagSize:ii,parseAdtsSize:function(t,e){var i=(224&t[e+5])>>5,n=t[e+4]<<3;return 6144&t[e+3]|n|i},parseType:function(t,e){return t[e]==="I".charCodeAt(0)&&t[e+1]==="D".charCodeAt(0)&&t[e+2]==="3".charCodeAt(0)?"timed-metadata":!0&t[e]&&240==(240&t[e+1])?"audio":null},parseSampleRate:function(t){for(var e=0;e+5<t.length;){if(255===t[e]&&240==(246&t[e+1]))return ei[(60&t[e+2])>>>2];e++}return null},parseAacTimestamp:function(t){var e,i,n;e=10,64&t[5]&&(e+=4,e+=ai(t.subarray(10,14)));do{if((i=ai(t.subarray(e+4,e+8)))<1)return null;if("PRIV"===String.fromCharCode(t[e],t[e+1],t[e+2],t[e+3])){n=t.subarray(e+10,e+i+10);for(var a=0;a<n.byteLength;a++)if(0===n[a]){if("com.apple.streaming.transportStreamTimestamp"===unescape(function(t,e,i){var n,a="";for(n=e;n<i;n++)a+="%"+("00"+t[n].toString(16)).slice(-2);return a}(n,0,a))){var r=n.subarray(a+1),s=(1&r[3])<<30|r[4]<<22|r[5]<<14|r[6]<<6|r[7]>>>2;return s*=4,s+=3&r[7]}break}}e+=10,e+=i}while(e<t.byteLength);return null}};(Qe=function(){var t=new Uint8Array,e=0;Qe.prototype.init.call(this),this.setTimestamp=function(t){e=t},this.push=function(i){var n,a,r,s,o=0,d=0;for(t.length?(s=t.length,(t=new Uint8Array(i.byteLength+s)).set(t.subarray(0,s)),t.set(i,s)):t=i;t.length-d>=3;)if(t[d]!=="I".charCodeAt(0)||t[d+1]!=="D".charCodeAt(0)||t[d+2]!=="3".charCodeAt(0))if(255!=(255&t[d])||240!=(240&t[d+1]))d++;else{if(t.length-d<7)break;if(d+(o=ri.parseAdtsSize(t,d))>t.length)break;r={type:"audio",data:t.subarray(d,d+o),pts:e,dts:e},this.trigger("data",r),d+=o}else{if(t.length-d<10)break;if(d+(o=ri.parseId3TagSize(t,d))>t.length)break;a={type:"timed-metadata",data:t.subarray(d,d+o)},this.trigger("data",a),d+=o}n=t.length-d,t=n>0?t.subarray(d):new Uint8Array},this.reset=function(){t=new Uint8Array,this.trigger("reset")},this.endTimeline=function(){t=new Uint8Array,this.trigger("endedtimeline")}}).prototype=new u;var si,oi,di,hi,pi=Qe,ui=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],li=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],ci=lt.H264Stream,fi=ri.isLikelyAacData,gi=f,mi=function(t,e){e.stream=t,this.trigger("log",e)},yi=function(t,e){for(var i=Object.keys(e),n=0;n<i.length;n++){var a=i[n];"headOfPipeline"!==a&&e[a].on&&e[a].on("log",mi.bind(t,a))}},bi=function(t,e){var i;if(t.length!==e.length)return!1;for(i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0},vi=function(t,e,i,n,a,r){return{start:{dts:t,pts:t+(i-e)},end:{dts:t+(n-e),pts:t+(a-i)},prependedContentDuration:r,baseMediaDecodeTime:t}};(oi=function(t,e){var i,n=[],a=0,r=0,s=1/0;i=(e=e||{}).firstSequenceNumber||0,oi.prototype.init.call(this),this.push=function(e){Se(t,e),t&&ui.forEach((function(i){t[i]=e[i]})),n.push(e)},this.setEarliestDts=function(t){a=t},this.setVideoBaseMediaDecodeTime=function(t){s=t},this.setAudioAppendStart=function(t){r=t},this.flush=function(){var o,d,h,p,u,l,c;0!==n.length?(o=fe(n,t,a),t.baseMediaDecodeTime=ve(t,e.keepOriginalTimestamps),c=ce(t,o,r,s),t.samples=ge(o),h=kt.mdat(me(o)),n=[],d=kt.moof(i,[t]),p=new Uint8Array(d.byteLength+h.byteLength),i++,p.set(d),p.set(h,d.byteLength),be(t),u=Math.ceil(1024*gi/t.samplerate),o.length&&(l=o.length*u,this.trigger("segmentTimingInfo",vi(m(t.baseMediaDecodeTime,t.samplerate),o[0].dts,o[0].pts,o[0].dts+l,o[0].pts+l,c||0)),this.trigger("timingInfo",{start:o[0].pts,end:o[0].pts+l})),this.trigger("data",{track:t,boxes:p}),this.trigger("done","AudioSegmentStream")):this.trigger("done","AudioSegmentStream")},this.reset=function(){be(t),n=[],this.trigger("reset")}}).prototype=new u,(si=function(t,e){var i,n,a,r=[],s=[];i=(e=e||{}).firstSequenceNumber||0,si.prototype.init.call(this),delete t.minPTS,this.gopCache_=[],this.push=function(e){Se(t,e),"seq_parameter_set_rbsp"!==e.nalUnitType||n||(n=e.config,t.sps=[e.data],li.forEach((function(e){t[e]=n[e]}),this)),"pic_parameter_set_rbsp"!==e.nalUnitType||a||(a=e.data,t.pps=[e.data]),r.push(e)},this.flush=function(){for(var n,a,o,d,h,p,u,l,c=0;r.length&&"access_unit_delimiter_rbsp"!==r[0].nalUnitType;)r.shift();if(0===r.length)return this.resetStream_(),void this.trigger("done","VideoSegmentStream");if(n=ie(r),(o=ne(n))[0][0].keyFrame||((a=this.getGopForFusion_(r[0],t))?(c=a.duration,o.unshift(a),o.byteLength+=a.byteLength,o.nalCount+=a.nalCount,o.pts=a.pts,o.dts=a.dts,o.duration+=a.duration):o=ae(o)),s.length){var f;if(!(f=e.alignGopsAtEnd?this.alignGopsAtEnd_(o):this.alignGopsAtStart_(o)))return this.gopCache_.unshift({gop:o.pop(),pps:t.pps,sps:t.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),r=[],this.resetStream_(),void this.trigger("done","VideoSegmentStream");be(t),o=f}Se(t,o),t.samples=re(o),h=kt.mdat(se(o)),t.baseMediaDecodeTime=ve(t,e.keepOriginalTimestamps),this.trigger("processedGopsInfo",o.map((function(t){return{pts:t.pts,dts:t.dts,byteLength:t.byteLength}}))),u=o[0],l=o[o.length-1],this.trigger("segmentTimingInfo",vi(t.baseMediaDecodeTime,u.dts,u.pts,l.dts+l.duration,l.pts+l.duration,c)),this.trigger("timingInfo",{start:o[0].pts,end:o[o.length-1].pts+o[o.length-1].duration}),this.gopCache_.unshift({gop:o.pop(),pps:t.pps,sps:t.sps}),this.gopCache_.length=Math.min(6,this.gopCache_.length),r=[],this.trigger("baseMediaDecodeTime",t.baseMediaDecodeTime),this.trigger("timelineStartInfo",t.timelineStartInfo),d=kt.moof(i,[t]),p=new Uint8Array(d.byteLength+h.byteLength),i++,p.set(d),p.set(h,d.byteLength),this.trigger("data",{track:t,boxes:p}),this.resetStream_(),this.trigger("done","VideoSegmentStream")},this.reset=function(){this.resetStream_(),r=[],this.gopCache_.length=0,s.length=0,this.trigger("reset")},this.resetStream_=function(){be(t),n=void 0,a=void 0},this.getGopForFusion_=function(e){var i,n,a,r,s,o=1/0;for(s=0;s<this.gopCache_.length;s++)a=(r=this.gopCache_[s]).gop,t.pps&&bi(t.pps[0],r.pps[0])&&t.sps&&bi(t.sps[0],r.sps[0])&&(a.dts<t.timelineStartInfo.dts||(i=e.dts-a.dts-a.duration)>=-1e4&&i<=45e3&&(!n||o>i)&&(n=r,o=i));return n?n.gop:null},this.alignGopsAtStart_=function(t){var e,i,n,a,r,o,d,h;for(r=t.byteLength,o=t.nalCount,d=t.duration,e=i=0;e<s.length&&i<t.length&&(n=s[e],a=t[i],n.pts!==a.pts);)a.pts>n.pts?e++:(i++,r-=a.byteLength,o-=a.nalCount,d-=a.duration);return 0===i?t:i===t.length?null:((h=t.slice(i)).byteLength=r,h.duration=d,h.nalCount=o,h.pts=h[0].pts,h.dts=h[0].dts,h)},this.alignGopsAtEnd_=function(t){var e,i,n,a,r,o,d;for(e=s.length-1,i=t.length-1,r=null,o=!1;e>=0&&i>=0;){if(n=s[e],a=t[i],n.pts===a.pts){o=!0;break}n.pts>a.pts?e--:(e===s.length-1&&(r=i),i--)}if(!o&&null===r)return null;if(0===(d=o?i:r))return t;var h=t.slice(d),p=h.reduce((function(t,e){return t.byteLength+=e.byteLength,t.duration+=e.duration,t.nalCount+=e.nalCount,t}),{byteLength:0,duration:0,nalCount:0});return h.byteLength=p.byteLength,h.duration=p.duration,h.nalCount=p.nalCount,h.pts=h[0].pts,h.dts=h[0].dts,h},this.alignGopsWith=function(t){s=t}}).prototype=new u,(hi=function(t,e){this.numberOfTracks=0,this.metadataStream=e,void 0!==(t=t||{}).remux?this.remuxTracks=!!t.remux:this.remuxTracks=!0,"boolean"==typeof t.keepOriginalTimestamps?this.keepOriginalTimestamps=t.keepOriginalTimestamps:this.keepOriginalTimestamps=!1,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,hi.prototype.init.call(this),this.push=function(t){return t.text?this.pendingCaptions.push(t):t.frames?this.pendingMetadata.push(t):(this.pendingTracks.push(t.track),this.pendingBytes+=t.boxes.byteLength,"video"===t.track.type&&(this.videoTrack=t.track,this.pendingBoxes.push(t.boxes)),void("audio"===t.track.type&&(this.audioTrack=t.track,this.pendingBoxes.unshift(t.boxes))))}}).prototype=new u,hi.prototype.flush=function(t){var e,i,n,a,r=0,s={captions:[],captionStreams:{},metadata:[],info:{}},o=0;if(this.pendingTracks.length<this.numberOfTracks){if("VideoSegmentStream"!==t&&"AudioSegmentStream"!==t)return;if(this.remuxTracks)return;if(0===this.pendingTracks.length)return this.emittedTracks++,void(this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0))}if(this.videoTrack?(o=this.videoTrack.timelineStartInfo.pts,li.forEach((function(t){s.info[t]=this.videoTrack[t]}),this)):this.audioTrack&&(o=this.audioTrack.timelineStartInfo.pts,ui.forEach((function(t){s.info[t]=this.audioTrack[t]}),this)),this.videoTrack||this.audioTrack){for(1===this.pendingTracks.length?s.type=this.pendingTracks[0].type:s.type="combined",this.emittedTracks+=this.pendingTracks.length,n=kt.initSegment(this.pendingTracks),s.initSegment=new Uint8Array(n.byteLength),s.initSegment.set(n),s.data=new Uint8Array(this.pendingBytes),a=0;a<this.pendingBoxes.length;a++)s.data.set(this.pendingBoxes[a],r),r+=this.pendingBoxes[a].byteLength;for(a=0;a<this.pendingCaptions.length;a++)(e=this.pendingCaptions[a]).startTime=b(e.startPts,o,this.keepOriginalTimestamps),e.endTime=b(e.endPts,o,this.keepOriginalTimestamps),s.captionStreams[e.stream]=!0,s.captions.push(e);for(a=0;a<this.pendingMetadata.length;a++)(i=this.pendingMetadata[a]).cueTime=b(i.pts,o,this.keepOriginalTimestamps),s.metadata.push(i);for(s.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger("data",s),a=0;a<s.captions.length;a++)e=s.captions[a],this.trigger("caption",e);for(a=0;a<s.metadata.length;a++)i=s.metadata[a],this.trigger("id3Frame",i)}this.emittedTracks>=this.numberOfTracks&&(this.trigger("done"),this.emittedTracks=0)},hi.prototype.setRemux=function(t){this.remuxTracks=t},(di=function(t){var e,i,n=this,a=!0;di.prototype.init.call(this),t=t||{},this.baseMediaDecodeTime=t.baseMediaDecodeTime||0,this.transmuxPipeline_={},this.setupAacPipeline=function(){var a={};this.transmuxPipeline_=a,a.type="aac",a.metadataStream=new ti.MetadataStream,a.aacStream=new pi,a.audioTimestampRolloverStream=new ti.TimestampRolloverStream("audio"),a.timedMetadataTimestampRolloverStream=new ti.TimestampRolloverStream("timed-metadata"),a.adtsStream=new k,a.coalesceStream=new hi(t,a.metadataStream),a.headOfPipeline=a.aacStream,a.aacStream.pipe(a.audioTimestampRolloverStream).pipe(a.adtsStream),a.aacStream.pipe(a.timedMetadataTimestampRolloverStream).pipe(a.metadataStream).pipe(a.coalesceStream),a.metadataStream.on("timestamp",(function(t){a.aacStream.setTimestamp(t.timeStamp)})),a.aacStream.on("data",(function(r){"timed-metadata"!==r.type&&"audio"!==r.type||a.audioSegmentStream||(i=i||{timelineStartInfo:{baseMediaDecodeTime:n.baseMediaDecodeTime},codec:"adts",type:"audio"},a.coalesceStream.numberOfTracks++,a.audioSegmentStream=new oi(i,t),a.audioSegmentStream.on("log",n.getLogTrigger_("audioSegmentStream")),a.audioSegmentStream.on("timingInfo",n.trigger.bind(n,"audioTimingInfo")),a.adtsStream.pipe(a.audioSegmentStream).pipe(a.coalesceStream),n.trigger("trackinfo",{hasAudio:!!i,hasVideo:!!e}))})),a.coalesceStream.on("data",this.trigger.bind(this,"data")),a.coalesceStream.on("done",this.trigger.bind(this,"done")),yi(this,a)},this.setupTsPipeline=function(){var a={};this.transmuxPipeline_=a,a.type="ts",a.metadataStream=new ti.MetadataStream,a.packetStream=new ti.TransportPacketStream,a.parseStream=new ti.TransportParseStream,a.elementaryStream=new ti.ElementaryStream,a.timestampRolloverStream=new ti.TimestampRolloverStream,a.adtsStream=new k,a.h264Stream=new ci,a.captionStream=new ti.CaptionStream(t),a.coalesceStream=new hi(t,a.metadataStream),a.headOfPipeline=a.packetStream,a.packetStream.pipe(a.parseStream).pipe(a.elementaryStream).pipe(a.timestampRolloverStream),a.timestampRolloverStream.pipe(a.h264Stream),a.timestampRolloverStream.pipe(a.adtsStream),a.timestampRolloverStream.pipe(a.metadataStream).pipe(a.coalesceStream),a.h264Stream.pipe(a.captionStream).pipe(a.coalesceStream),a.elementaryStream.on("data",(function(r){var s;if("metadata"===r.type){for(s=r.tracks.length;s--;)e||"video"!==r.tracks[s].type?i||"audio"!==r.tracks[s].type||((i=r.tracks[s]).timelineStartInfo.baseMediaDecodeTime=n.baseMediaDecodeTime):(e=r.tracks[s]).timelineStartInfo.baseMediaDecodeTime=n.baseMediaDecodeTime;e&&!a.videoSegmentStream&&(a.coalesceStream.numberOfTracks++,a.videoSegmentStream=new si(e,t),a.videoSegmentStream.on("log",n.getLogTrigger_("videoSegmentStream")),a.videoSegmentStream.on("timelineStartInfo",(function(e){i&&!t.keepOriginalTimestamps&&(i.timelineStartInfo=e,a.audioSegmentStream.setEarliestDts(e.dts-n.baseMediaDecodeTime))})),a.videoSegmentStream.on("processedGopsInfo",n.trigger.bind(n,"gopInfo")),a.videoSegmentStream.on("segmentTimingInfo",n.trigger.bind(n,"videoSegmentTimingInfo")),a.videoSegmentStream.on("baseMediaDecodeTime",(function(t){i&&a.audioSegmentStream.setVideoBaseMediaDecodeTime(t)})),a.videoSegmentStream.on("timingInfo",n.trigger.bind(n,"videoTimingInfo")),a.h264Stream.pipe(a.videoSegmentStream).pipe(a.coalesceStream)),i&&!a.audioSegmentStream&&(a.coalesceStream.numberOfTracks++,a.audioSegmentStream=new oi(i,t),a.audioSegmentStream.on("log",n.getLogTrigger_("audioSegmentStream")),a.audioSegmentStream.on("timingInfo",n.trigger.bind(n,"audioTimingInfo")),a.audioSegmentStream.on("segmentTimingInfo",n.trigger.bind(n,"audioSegmentTimingInfo")),a.adtsStream.pipe(a.audioSegmentStream).pipe(a.coalesceStream)),n.trigger("trackinfo",{hasAudio:!!i,hasVideo:!!e})}})),a.coalesceStream.on("data",this.trigger.bind(this,"data")),a.coalesceStream.on("id3Frame",(function(t){t.dispatchType=a.metadataStream.dispatchType,n.trigger("id3Frame",t)})),a.coalesceStream.on("caption",this.trigger.bind(this,"caption")),a.coalesceStream.on("done",this.trigger.bind(this,"done")),yi(this,a)},this.setBaseMediaDecodeTime=function(n){var a=this.transmuxPipeline_;t.keepOriginalTimestamps||(this.baseMediaDecodeTime=n),i&&(i.timelineStartInfo.dts=void 0,i.timelineStartInfo.pts=void 0,be(i),a.audioTimestampRolloverStream&&a.audioTimestampRolloverStream.discontinuity()),e&&(a.videoSegmentStream&&(a.videoSegmentStream.gopCache_=[]),e.timelineStartInfo.dts=void 0,e.timelineStartInfo.pts=void 0,be(e),a.captionStream.reset()),a.timestampRolloverStream&&a.timestampRolloverStream.discontinuity()},this.setAudioAppendStart=function(t){i&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(t)},this.setRemux=function(e){var i=this.transmuxPipeline_;t.remux=e,i&&i.coalesceStream&&i.coalesceStream.setRemux(e)},this.alignGopsWith=function(t){e&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(t)},this.getLogTrigger_=function(t){var e=this;return function(i){i.stream=t,e.trigger("log",i)}},this.push=function(t){if(a){var e=fi(t);e&&"aac"!==this.transmuxPipeline_.type?this.setupAacPipeline():e||"ts"===this.transmuxPipeline_.type||this.setupTsPipeline(),a=!1}this.transmuxPipeline_.headOfPipeline.push(t)},this.flush=function(){a=!0,this.transmuxPipeline_.headOfPipeline.flush()},this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()},this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()},this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}}).prototype=new u;var Si,wi={Transmuxer:di,VideoSegmentStream:si,AudioSegmentStream:oi,AUDIO_PROPERTIES:ui,VIDEO_PROPERTIES:li,generateSegmentTimingInfo:vi},Ti=ke,_i=Be.CaptionStream,ki=function(t,e){for(var i=t,n=0;n<e.length;n++){var a=e[n];if(i<a.size)return a;i-=a.size}return null},Ui=function(t,e){var n=Dt(t,["moof","traf"]),a=Dt(t,["mdat"]),r={},s=[];return a.forEach((function(t,e){var i=n[e];s.push({mdat:t,traf:i})})),s.forEach((function(t){var n,a=t.mdat,s=t.traf,o=Dt(s,["tfhd"]),d=Mt(o[0]),h=d.trackId,p=Dt(s,["tfdt"]),u=p.length>0?zt(p[0]).baseMediaDecodeTime:0,l=Dt(s,["trun"]);e===h&&l.length>0&&(n=function(t,e,i){var n,a,r,s,o=new DataView(t.buffer,t.byteOffset,t.byteLength),d={logs:[],seiNals:[]};for(a=0;a+4<t.length;a+=r)if(r=o.getUint32(a),a+=4,!(r<=0))switch(31&t[a]){case 6:var h=t.subarray(a+1,a+1+r),p=ki(a,e);if(n={nalUnitType:"sei_rbsp",size:r,data:h,escapedRBSP:Ti(h),trackId:i},p)n.pts=p.pts,n.dts=p.dts,s=p;else{if(!s){d.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+a+" for trackId "+i+". See mux.js#223."});break}n.pts=s.pts,n.dts=s.dts}d.seiNals.push(n)}return d}(a,function(t,e,n){var a=e,r=n.defaultSampleDuration||0,s=n.defaultSampleSize||0,o=n.trackId,d=[];return t.forEach((function(t){var e=Bt(t).samples;e.forEach((function(t){void 0===t.duration&&(t.duration=r),void 0===t.size&&(t.size=s),t.trackId=o,t.dts=a,void 0===t.compositionTimeOffset&&(t.compositionTimeOffset=0),"bigint"==typeof a?(t.pts=a+i.default.BigInt(t.compositionTimeOffset),a+=i.default.BigInt(t.duration)):(t.pts=a+t.compositionTimeOffset,a+=t.duration)})),d=d.concat(e)})),d}(l,u,d),h),r[h]||(r[h]={seiNals:[],logs:[]}),r[h].seiNals=r[h].seiNals.concat(n.seiNals),r[h].logs=r[h].logs.concat(n.logs))})),r},Ai={generator:kt,probe:te,Transmuxer:wi.Transmuxer,AudioSegmentStream:wi.AudioSegmentStream,VideoSegmentStream:wi.VideoSegmentStream,CaptionParser:function(){var t,e,i,n,a,r,s=!1;this.isInitialized=function(){return s},this.init=function(e){t=new _i,s=!0,r=!!e&&e.isPartial,t.on("data",(function(t){t.startTime=t.startPts/n,t.endTime=t.endPts/n,a.captions.push(t),a.captionStreams[t.stream]=!0})),t.on("log",(function(t){a.logs.push(t)}))},this.isNewInit=function(t,e){return!(t&&0===t.length||e&&"object"==typeof e&&0===Object.keys(e).length)&&(i!==t[0]||n!==e[i])},this.parse=function(t,r,s){var o;if(!this.isInitialized())return null;if(!r||!s)return null;if(this.isNewInit(r,s))i=r[0],n=s[i];else if(null===i||!n)return e.push(t),null;for(;e.length>0;){var d=e.shift();this.parse(d,r,s)}return(o=function(t,e,i){if(null===e)return null;var n=Ui(t,e)[e]||{};return{seiNals:n.seiNals,logs:n.logs,timescale:i}}(t,i,n))&&o.logs&&(a.logs=a.logs.concat(o.logs)),null!==o&&o.seiNals?(this.pushNals(o.seiNals),this.flushStream(),a):a.logs.length?{logs:a.logs,captions:[],captionStreams:[]}:null},this.pushNals=function(e){if(!this.isInitialized()||!e||0===e.length)return null;e.forEach((function(e){t.push(e)}))},this.flushStream=function(){if(!this.isInitialized())return null;r?t.partialFlush():t.flush()},this.clearParsedCaptions=function(){a.captions=[],a.captionStreams={},a.logs=[]},this.resetCaptionStream=function(){if(!this.isInitialized())return null;t.reset()},this.clearAllCaptions=function(){this.clearParsedCaptions(),this.resetCaptionStream()},this.reset=function(){e=[],i=null,n=null,a?this.clearParsedCaptions():a={captions:[],captionStreams:{},logs:[]},this.resetCaptionStream()},this.reset()}};(Si=function(t,e){var i,n=0,a=16384,r=function(t,e){var i,n=t.position+e;n<t.bytes.byteLength||((i=new Uint8Array(2*n)).set(t.bytes.subarray(0,t.position),0),t.bytes=i,t.view=new DataView(t.bytes.buffer))},s=Si.widthBytes||new Uint8Array("width".length),o=Si.heightBytes||new Uint8Array("height".length),d=Si.videocodecidBytes||new Uint8Array("videocodecid".length);if(!Si.widthBytes){for(i=0;i<"width".length;i++)s[i]="width".charCodeAt(i);for(i=0;i<"height".length;i++)o[i]="height".charCodeAt(i);for(i=0;i<"videocodecid".length;i++)d[i]="videocodecid".charCodeAt(i);Si.widthBytes=s,Si.heightBytes=o,Si.videocodecidBytes=d}switch(this.keyFrame=!1,t){case Si.VIDEO_TAG:this.length=16,a*=6;break;case Si.AUDIO_TAG:this.length=13,this.keyFrame=!0;break;case Si.METADATA_TAG:this.length=29,this.keyFrame=!0;break;default:throw new Error("Unknown FLV tag type")}this.bytes=new Uint8Array(a),this.view=new DataView(this.bytes.buffer),this.bytes[0]=t,this.position=this.length,this.keyFrame=e,this.pts=0,this.dts=0,this.writeBytes=function(t,e,i){var n,a=e||0;n=a+(i=i||t.byteLength),r(this,i),this.bytes.set(t.subarray(a,n),this.position),this.position+=i,this.length=Math.max(this.length,this.position)},this.writeByte=function(t){r(this,1),this.bytes[this.position]=t,this.position++,this.length=Math.max(this.length,this.position)},this.writeShort=function(t){r(this,2),this.view.setUint16(this.position,t),this.position+=2,this.length=Math.max(this.length,this.position)},this.negIndex=function(t){return this.bytes[this.length-t]},this.nalUnitSize=function(){return 0===n?0:this.length-(n+4)},this.startNalUnit=function(){if(n>0)throw new Error("Attempted to create new NAL wihout closing the old one");n=this.length,this.length+=4,this.position=this.length},this.endNalUnit=function(t){var e,i;this.length===n+4?this.length-=4:n>0&&(e=n+4,i=this.length-e,this.position=n,this.view.setUint32(this.position,i),this.position=this.length,t&&t.push(this.bytes.subarray(e,e+i))),n=0},this.writeMetaDataDouble=function(t,e){var i;if(r(this,2+t.length+9),this.view.setUint16(this.position,t.length),this.position+=2,"width"===t)this.bytes.set(s,this.position),this.position+=5;else if("height"===t)this.bytes.set(o,this.position),this.position+=6;else if("videocodecid"===t)this.bytes.set(d,this.position),this.position+=12;else for(i=0;i<t.length;i++)this.bytes[this.position]=t.charCodeAt(i),this.position++;this.position++,this.view.setFloat64(this.position,e),this.position+=8,this.length=Math.max(this.length,this.position),++n},this.writeMetaDataBoolean=function(t,e){var i;for(r(this,2),this.view.setUint16(this.position,t.length),this.position+=2,i=0;i<t.length;i++)r(this,1),this.bytes[this.position]=t.charCodeAt(i),this.position++;r(this,2),this.view.setUint8(this.position,1),this.position++,this.view.setUint8(this.position,e?1:0),this.position++,this.length=Math.max(this.length,this.position),++n},this.finalize=function(){var t,i;switch(this.bytes[0]){case Si.VIDEO_TAG:this.bytes[11]=7|(this.keyFrame||e?16:32),this.bytes[12]=e?0:1,t=this.pts-this.dts,this.bytes[13]=(16711680&t)>>>16,this.bytes[14]=(65280&t)>>>8,this.bytes[15]=(255&t)>>>0;break;case Si.AUDIO_TAG:this.bytes[11]=175,this.bytes[12]=e?0:1;break;case Si.METADATA_TAG:this.position=11,this.view.setUint8(this.position,2),this.position++,this.view.setUint16(this.position,10),this.position+=2,this.bytes.set([111,110,77,101,116,97,68,97,116,97],this.position),this.position+=10,this.bytes[this.position]=8,this.position++,this.view.setUint32(this.position,n),this.position=this.length,this.bytes.set([0,0,9],this.position),this.position+=3,this.length=this.position}return i=this.length-11,this.bytes[1]=(16711680&i)>>>16,this.bytes[2]=(65280&i)>>>8,this.bytes[3]=(255&i)>>>0,this.bytes[4]=(16711680&this.dts)>>>16,this.bytes[5]=(65280&this.dts)>>>8,this.bytes[6]=(255&this.dts)>>>0,this.bytes[7]=(4278190080&this.dts)>>>24,this.bytes[8]=0,this.bytes[9]=0,this.bytes[10]=0,r(this,4),this.view.setUint32(this.length,this.length),this.length+=4,this.position+=4,this.bytes=this.bytes.subarray(0,this.length),this.frameTime=Si.frameTime(this.bytes),this}}).AUDIO_TAG=8,Si.VIDEO_TAG=9,Si.METADATA_TAG=18,Si.isAudioFrame=function(t){return Si.AUDIO_TAG===t[0]},Si.isVideoFrame=function(t){return Si.VIDEO_TAG===t[0]},Si.isMetaData=function(t){return Si.METADATA_TAG===t[0]},Si.isKeyFrame=function(t){return Si.isVideoFrame(t)?23===t[11]:!!Si.isAudioFrame(t)||!!Si.isMetaData(t)},Si.frameTime=function(t){var e=t[4]<<16;return e|=t[5]<<8,e|=t[6]<<0,e|=t[7]<<24};var Ci=Si,Di=function t(e){this.numberOfTracks=0,this.metadataStream=e.metadataStream,this.videoTags=[],this.audioTags=[],this.videoTrack=null,this.audioTrack=null,this.pendingCaptions=[],this.pendingMetadata=[],this.pendingTracks=0,this.processedTracks=0,t.prototype.init.call(this),this.push=function(t){return t.text?this.pendingCaptions.push(t):t.frames?this.pendingMetadata.push(t):("video"===t.track.type&&(this.videoTrack=t.track,this.videoTags=t.tags,this.pendingTracks++),void("audio"===t.track.type&&(this.audioTrack=t.track,this.audioTags=t.tags,this.pendingTracks++)))}};(Di.prototype=new u).flush=function(t){var e,i,n,a,r={tags:{},captions:[],captionStreams:{},metadata:[]};if(this.pendingTracks<this.numberOfTracks){if("VideoSegmentStream"!==t&&"AudioSegmentStream"!==t)return;if(0===this.pendingTracks&&(this.processedTracks++,this.processedTracks<this.numberOfTracks))return}if(this.processedTracks+=this.pendingTracks,this.pendingTracks=0,!(this.processedTracks<this.numberOfTracks)){for(this.videoTrack?a=this.videoTrack.timelineStartInfo.pts:this.audioTrack&&(a=this.audioTrack.timelineStartInfo.pts),r.tags.videoTags=this.videoTags,r.tags.audioTags=this.audioTags,n=0;n<this.pendingCaptions.length;n++)(i=this.pendingCaptions[n]).startTime=i.startPts-a,i.startTime/=9e4,i.endTime=i.endPts-a,i.endTime/=9e4,r.captionStreams[i.stream]=!0,r.captions.push(i);for(n=0;n<this.pendingMetadata.length;n++)(e=this.pendingMetadata[n]).cueTime=e.pts-a,e.cueTime/=9e4,r.metadata.push(e);r.metadata.dispatchType=this.metadataStream.dispatchType,this.videoTrack=null,this.audioTrack=null,this.videoTags=[],this.audioTags=[],this.pendingCaptions.length=0,this.pendingMetadata.length=0,this.pendingTracks=0,this.processedTracks=0,this.trigger("data",r),this.trigger("done")}};var Pi,Ii,Li,Oi,xi,Ei,Mi=Di,Ri=function(){var t=this;this.list=[],this.push=function(t){this.list.push({bytes:t.bytes,dts:t.dts,pts:t.pts,keyFrame:t.keyFrame,metaDataTag:t.metaDataTag})},Object.defineProperty(this,"length",{get:function(){return t.list.length}})},Bi=lt.H264Stream;Oi=function(t,e){"number"==typeof e.pts&&(void 0===t.timelineStartInfo.pts?t.timelineStartInfo.pts=e.pts:t.timelineStartInfo.pts=Math.min(t.timelineStartInfo.pts,e.pts)),"number"==typeof e.dts&&(void 0===t.timelineStartInfo.dts?t.timelineStartInfo.dts=e.dts:t.timelineStartInfo.dts=Math.min(t.timelineStartInfo.dts,e.dts))},xi=function(t,e){var i=new Ci(Ci.METADATA_TAG);return i.dts=e,i.pts=e,i.writeMetaDataDouble("videocodecid",7),i.writeMetaDataDouble("width",t.width),i.writeMetaDataDouble("height",t.height),i},Ei=function(t,e){var i,n=new Ci(Ci.VIDEO_TAG,!0);for(n.dts=e,n.pts=e,n.writeByte(1),n.writeByte(t.profileIdc),n.writeByte(t.profileCompatibility),n.writeByte(t.levelIdc),n.writeByte(255),n.writeByte(225),n.writeShort(t.sps[0].length),n.writeBytes(t.sps[0]),n.writeByte(t.pps.length),i=0;i<t.pps.length;++i)n.writeShort(t.pps[i].length),n.writeBytes(t.pps[i]);return n},(Li=function(t){var e,i=[],n=[];Li.prototype.init.call(this),this.push=function(e){Oi(t,e),t&&(t.audioobjecttype=e.audioobjecttype,t.channelcount=e.channelcount,t.samplerate=e.samplerate,t.samplingfrequencyindex=e.samplingfrequencyindex,t.samplesize=e.samplesize,t.extraData=t.audioobjecttype<<11|t.samplingfrequencyindex<<7|t.channelcount<<3),e.pts=Math.round(e.pts/90),e.dts=Math.round(e.dts/90),i.push(e)},this.flush=function(){var a,r,s,o=new Ri;if(0!==i.length){for(s=-1/0;i.length;)a=i.shift(),n.length&&a.pts>=n[0]&&(s=n.shift(),this.writeMetaDataTags(o,s)),(t.extraData!==e||a.pts-s>=1e3)&&(this.writeMetaDataTags(o,a.pts),e=t.extraData,s=a.pts),(r=new Ci(Ci.AUDIO_TAG)).pts=a.pts,r.dts=a.dts,r.writeBytes(a.data),o.push(r.finalize());n.length=0,e=null,this.trigger("data",{track:t,tags:o.list}),this.trigger("done","AudioSegmentStream")}else this.trigger("done","AudioSegmentStream")},this.writeMetaDataTags=function(e,i){var n;(n=new Ci(Ci.METADATA_TAG)).pts=i,n.dts=i,n.writeMetaDataDouble("audiocodecid",10),n.writeMetaDataBoolean("stereo",2===t.channelcount),n.writeMetaDataDouble("audiosamplerate",t.samplerate),n.writeMetaDataDouble("audiosamplesize",16),e.push(n.finalize()),(n=new Ci(Ci.AUDIO_TAG,!0)).pts=i,n.dts=i,n.view.setUint16(n.position,t.extraData),n.position+=2,n.length=Math.max(n.length,n.position),e.push(n.finalize())},this.onVideoKeyFrame=function(t){n.push(t)}}).prototype=new u,(Ii=function(t){var e,i,n=[];Ii.prototype.init.call(this),this.finishFrame=function(n,a){if(a){if(e&&t&&t.newMetadata&&(a.keyFrame||0===n.length)){var r=xi(e,a.dts).finalize(),s=Ei(t,a.dts).finalize();r.metaDataTag=s.metaDataTag=!0,n.push(r),n.push(s),t.newMetadata=!1,this.trigger("keyframe",a.dts)}a.endNalUnit(),n.push(a.finalize()),i=null}},this.push=function(e){Oi(t,e),e.pts=Math.round(e.pts/90),e.dts=Math.round(e.dts/90),n.push(e)},this.flush=function(){for(var a,r=new Ri;n.length&&"access_unit_delimiter_rbsp"!==n[0].nalUnitType;)n.shift();if(0!==n.length){for(;n.length;)"seq_parameter_set_rbsp"===(a=n.shift()).nalUnitType?(t.newMetadata=!0,e=a.config,t.width=e.width,t.height=e.height,t.sps=[a.data],t.profileIdc=e.profileIdc,t.levelIdc=e.levelIdc,t.profileCompatibility=e.profileCompatibility,i.endNalUnit()):"pic_parameter_set_rbsp"===a.nalUnitType?(t.newMetadata=!0,t.pps=[a.data],i.endNalUnit()):"access_unit_delimiter_rbsp"===a.nalUnitType?(i&&this.finishFrame(r,i),(i=new Ci(Ci.VIDEO_TAG)).pts=a.pts,i.dts=a.dts):("slice_layer_without_partitioning_rbsp_idr"===a.nalUnitType&&(i.keyFrame=!0),i.endNalUnit()),i.startNalUnit(),i.writeBytes(a.data);i&&this.finishFrame(r,i),this.trigger("data",{track:t,tags:r.list}),this.trigger("done","VideoSegmentStream")}else this.trigger("done","VideoSegmentStream")}}).prototype=new u,(Pi=function(t){var e,i,n,a,r,s,o,d,h,p,u,l,c=this;Pi.prototype.init.call(this),t=t||{},this.metadataStream=new ti.MetadataStream,t.metadataStream=this.metadataStream,e=new ti.TransportPacketStream,i=new ti.TransportParseStream,n=new ti.ElementaryStream,a=new ti.TimestampRolloverStream("video"),r=new ti.TimestampRolloverStream("audio"),s=new ti.TimestampRolloverStream("timed-metadata"),o=new k,d=new Bi,l=new Mi(t),e.pipe(i).pipe(n),n.pipe(a).pipe(d),n.pipe(r).pipe(o),n.pipe(s).pipe(this.metadataStream).pipe(l),u=new ti.CaptionStream(t),d.pipe(u).pipe(l),n.on("data",(function(t){var e,i,n;if("metadata"===t.type){for(e=t.tracks.length;e--;)"video"===t.tracks[e].type?i=t.tracks[e]:"audio"===t.tracks[e].type&&(n=t.tracks[e]);i&&!h&&(l.numberOfTracks++,h=new Ii(i),d.pipe(h).pipe(l)),n&&!p&&(l.numberOfTracks++,p=new Li(n),o.pipe(p).pipe(l),h&&h.on("keyframe",p.onVideoKeyFrame))}})),this.push=function(t){e.push(t)},this.flush=function(){e.flush()},this.resetCaptions=function(){u.reset()},l.on("data",(function(t){c.trigger("data",t)})),l.on("done",(function(){c.trigger("done")}))}).prototype=new u;var Ni=function(t,e,i){var n,a,r,s=new Uint8Array(9),o=new DataView(s.buffer);return t=t||0,e=void 0===e||e,i=void 0===i||i,o.setUint8(0,70),o.setUint8(1,76),o.setUint8(2,86),o.setUint8(3,1),o.setUint8(4,(e?4:0)|(i?1:0)),o.setUint32(5,s.byteLength),t<=0?((a=new Uint8Array(s.byteLength+4)).set(s),a.set([0,0,0,0],s.byteLength),a):((n=new Ci(Ci.METADATA_TAG)).pts=n.dts=0,n.writeMetaDataDouble("duration",t),r=n.finalize().length,(a=new Uint8Array(s.byteLength+r)).set(s),a.set(o.byteLength,r),a)},Fi={tag:Ci,Transmuxer:Pi,getFlvHeader:Ni},zi=ti,Vi=f,Gi=function t(e,i){var n=[],a=0,r=0,s=0,o=1/0,d=null,h=null;i=i||{},t.prototype.init.call(this),this.push=function(t){Se(e,t),e&&ui.forEach((function(i){e[i]=t[i]})),n.push(t)},this.setEarliestDts=function(t){r=t},this.setVideoBaseMediaDecodeTime=function(t){o=t},this.setAudioAppendStart=function(t){s=t},this.processFrames_=function(){var t,p,u,l,c;0!==n.length&&0!==(t=fe(n,e,r)).length&&(e.baseMediaDecodeTime=ve(e,i.keepOriginalTimestamps),ce(e,t,s,o),e.samples=ge(t),u=kt.mdat(me(t)),n=[],p=kt.moof(a,[e]),a++,e.initSegment=kt.initSegment([e]),(l=new Uint8Array(p.byteLength+u.byteLength)).set(p),l.set(u,p.byteLength),be(e),null===d&&(h=d=t[0].pts),h+=t.length*(1024*Vi/e.samplerate),c={start:d},this.trigger("timingInfo",c),this.trigger("data",{track:e,boxes:l}))},this.flush=function(){this.processFrames_(),this.trigger("timingInfo",{start:d,end:h}),this.resetTiming_(),this.trigger("done","AudioSegmentStream")},this.partialFlush=function(){this.processFrames_(),this.trigger("partialdone","AudioSegmentStream")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline","AudioSegmentStream")},this.resetTiming_=function(){be(e),d=null,h=null},this.reset=function(){this.resetTiming_(),n=[],this.trigger("reset")}};Gi.prototype=new u;var Wi=Gi,ji=function t(e,i){var n,a,r,s=0,o=[],d=[],h=null,p=null,u=!0;i=i||{},t.prototype.init.call(this),this.push=function(t){Se(e,t),void 0===e.timelineStartInfo.dts&&(e.timelineStartInfo.dts=t.dts),"seq_parameter_set_rbsp"!==t.nalUnitType||n||(n=t.config,e.sps=[t.data],li.forEach((function(t){e[t]=n[t]}),this)),"pic_parameter_set_rbsp"!==t.nalUnitType||a||(a=t.data,e.pps=[t.data]),o.push(t)},this.processNals_=function(t){var n;for(o=d.concat(o);o.length&&"access_unit_delimiter_rbsp"!==o[0].nalUnitType;)o.shift();if(0!==o.length){var a=ie(o);if(a.length)if(d=a[a.length-1],t&&(a.pop(),a.duration-=d.duration,a.nalCount-=d.length,a.byteLength-=d.byteLength),a.length){if(this.trigger("timelineStartInfo",e.timelineStartInfo),u){if(!(r=ne(a))[0][0].keyFrame){if(!(r=ae(r))[0][0].keyFrame)return o=[].concat.apply([],a).concat(d),void(d=[]);(a=[].concat.apply([],r)).duration=r.duration}u=!1}for(null===h&&(h=a[0].pts,p=h),p+=a.duration,this.trigger("timingInfo",{start:h,end:p}),n=0;n<a.length;n++){var l=a[n];e.samples=oe(l);var c=kt.mdat(de(l));be(e),Se(e,l),e.baseMediaDecodeTime=ve(e,i.keepOriginalTimestamps);var f=kt.moof(s,[e]);s++,e.initSegment=kt.initSegment([e]);var g=new Uint8Array(f.byteLength+c.byteLength);g.set(f),g.set(c,f.byteLength),this.trigger("data",{track:e,boxes:g,sequence:s,videoFrameDts:l.dts,videoFramePts:l.pts})}o=[]}else o=[]}},this.resetTimingAndConfig_=function(){n=void 0,a=void 0,h=null,p=null},this.partialFlush=function(){this.processNals_(!0),this.trigger("partialdone","VideoSegmentStream")},this.flush=function(){this.processNals_(!1),this.resetTimingAndConfig_(),this.trigger("done","VideoSegmentStream")},this.endTimeline=function(){this.flush(),this.trigger("endedtimeline","VideoSegmentStream")},this.reset=function(){this.resetTimingAndConfig_(),d=[],o=[],u=!0,this.trigger("reset")}};ji.prototype=new u;var qi=ji,Yi=ri.isLikelyAacData,Hi=function(t){return t.prototype=new u,t.prototype.init.call(t),t},Xi=function(t,e){t.on("data",e.trigger.bind(e,"data")),t.on("done",e.trigger.bind(e,"done")),t.on("partialdone",e.trigger.bind(e,"partialdone")),t.on("endedtimeline",e.trigger.bind(e,"endedtimeline")),t.on("audioTimingInfo",e.trigger.bind(e,"audioTimingInfo")),t.on("videoTimingInfo",e.trigger.bind(e,"videoTimingInfo")),t.on("trackinfo",e.trigger.bind(e,"trackinfo")),t.on("id3Frame",(function(i){i.dispatchType=t.metadataStream.dispatchType,i.cueTime=g(i.pts),e.trigger("id3Frame",i)})),t.on("caption",(function(t){e.trigger("caption",t)}))},Ki=function t(e){var i=null,n=!0;e=e||{},t.prototype.init.call(this),e.baseMediaDecodeTime=e.baseMediaDecodeTime||0,this.push=function(t){if(n){var a=Yi(t);!a||i&&"aac"===i.type?a||i&&"ts"===i.type||(i=function(t){var e={type:"ts",tracks:{audio:null,video:null},packet:new ti.TransportPacketStream,parse:new ti.TransportParseStream,elementary:new ti.ElementaryStream,timestampRollover:new ti.TimestampRolloverStream,adts:new ct.Adts,h264:new ct.h264.H264Stream,captionStream:new ti.CaptionStream(t),metadataStream:new ti.MetadataStream};return e.headOfPipeline=e.packet,e.packet.pipe(e.parse).pipe(e.elementary).pipe(e.timestampRollover),e.timestampRollover.pipe(e.h264),e.h264.pipe(e.captionStream),e.timestampRollover.pipe(e.metadataStream),e.timestampRollover.pipe(e.adts),e.elementary.on("data",(function(i){if("metadata"===i.type){for(var n=0;n<i.tracks.length;n++)e.tracks[i.tracks[n].type]||(e.tracks[i.tracks[n].type]=i.tracks[n],e.tracks[i.tracks[n].type].timelineStartInfo.baseMediaDecodeTime=t.baseMediaDecodeTime);e.tracks.video&&!e.videoSegmentStream&&(e.videoSegmentStream=new qi(e.tracks.video,t),e.videoSegmentStream.on("timelineStartInfo",(function(i){e.tracks.audio&&!t.keepOriginalTimestamps&&e.audioSegmentStream.setEarliestDts(i.dts-t.baseMediaDecodeTime)})),e.videoSegmentStream.on("timingInfo",e.trigger.bind(e,"videoTimingInfo")),e.videoSegmentStream.on("data",(function(t){e.trigger("data",{type:"video",data:t})})),e.videoSegmentStream.on("done",e.trigger.bind(e,"done")),e.videoSegmentStream.on("partialdone",e.trigger.bind(e,"partialdone")),e.videoSegmentStream.on("endedtimeline",e.trigger.bind(e,"endedtimeline")),e.h264.pipe(e.videoSegmentStream)),e.tracks.audio&&!e.audioSegmentStream&&(e.audioSegmentStream=new Wi(e.tracks.audio,t),e.audioSegmentStream.on("data",(function(t){e.trigger("data",{type:"audio",data:t})})),e.audioSegmentStream.on("done",e.trigger.bind(e,"done")),e.audioSegmentStream.on("partialdone",e.trigger.bind(e,"partialdone")),e.audioSegmentStream.on("endedtimeline",e.trigger.bind(e,"endedtimeline")),e.audioSegmentStream.on("timingInfo",e.trigger.bind(e,"audioTimingInfo")),e.adts.pipe(e.audioSegmentStream)),e.trigger("trackinfo",{hasAudio:!!e.tracks.audio,hasVideo:!!e.tracks.video})}})),e.captionStream.on("data",(function(i){var n;n=e.tracks.video&&e.tracks.video.timelineStartInfo.pts||0,i.startTime=b(i.startPts,n,t.keepOriginalTimestamps),i.endTime=b(i.endPts,n,t.keepOriginalTimestamps),e.trigger("caption",i)})),(e=Hi(e)).metadataStream.on("data",e.trigger.bind(e,"id3Frame")),e}(e),Xi(i,this)):(i=function(t){var e={type:"aac",tracks:{audio:null},metadataStream:new ti.MetadataStream,aacStream:new pi,audioRollover:new ti.TimestampRolloverStream("audio"),timedMetadataRollover:new ti.TimestampRolloverStream("timed-metadata"),adtsStream:new k(!0)};return e.headOfPipeline=e.aacStream,e.aacStream.pipe(e.audioRollover).pipe(e.adtsStream),e.aacStream.pipe(e.timedMetadataRollover).pipe(e.metadataStream),e.metadataStream.on("timestamp",(function(t){e.aacStream.setTimestamp(t.timeStamp)})),e.aacStream.on("data",(function(i){"timed-metadata"!==i.type&&"audio"!==i.type||e.audioSegmentStream||(e.tracks.audio=e.tracks.audio||{timelineStartInfo:{baseMediaDecodeTime:t.baseMediaDecodeTime},codec:"adts",type:"audio"},e.audioSegmentStream=new Wi(e.tracks.audio,t),e.audioSegmentStream.on("data",(function(t){e.trigger("data",{type:"audio",data:t})})),e.audioSegmentStream.on("partialdone",e.trigger.bind(e,"partialdone")),e.audioSegmentStream.on("done",e.trigger.bind(e,"done")),e.audioSegmentStream.on("endedtimeline",e.trigger.bind(e,"endedtimeline")),e.audioSegmentStream.on("timingInfo",e.trigger.bind(e,"audioTimingInfo")),e.adtsStream.pipe(e.audioSegmentStream),e.trigger("trackinfo",{hasAudio:!!e.tracks.audio,hasVideo:!!e.tracks.video}))})),(e=Hi(e)).metadataStream.on("data",e.trigger.bind(e,"id3Frame")),e}(e),Xi(i,this)),n=!1}i.headOfPipeline.push(t)},this.flush=function(){i&&(n=!0,i.headOfPipeline.flush())},this.partialFlush=function(){i&&i.headOfPipeline.partialFlush()},this.endTimeline=function(){i&&i.headOfPipeline.endTimeline()},this.reset=function(){i&&i.headOfPipeline.reset()},this.setBaseMediaDecodeTime=function(t){e.keepOriginalTimestamps||(e.baseMediaDecodeTime=t),i&&(i.tracks.audio&&(i.tracks.audio.timelineStartInfo.dts=void 0,i.tracks.audio.timelineStartInfo.pts=void 0,be(i.tracks.audio),i.audioRollover&&i.audioRollover.discontinuity()),i.tracks.video&&(i.videoSegmentStream&&(i.videoSegmentStream.gopCache_=[]),i.tracks.video.timelineStartInfo.dts=void 0,i.tracks.video.timelineStartInfo.pts=void 0,be(i.tracks.video)),i.timestampRollover&&i.timestampRollover.discontinuity())},this.setRemux=function(t){e.remux=t,i&&i.coalesceStream&&i.coalesceStream.setRemux(t)},this.setAudioAppendStart=function(t){i&&i.tracks.audio&&i.audioSegmentStream&&i.audioSegmentStream.setAudioAppendStart(t)},this.alignGopsWith=function(t){}};Ki.prototype=new u;var $i,Zi,Ji={Transmuxer:Ki},Qi=gt.getUint64,tn=gt.getUint64,en=function(t){return new Date(1e3*t-20828448e5)},nn=function(t){var e,i,n=new DataView(t.buffer,t.byteOffset,t.byteLength),a=[];for(e=0;e+4<t.length;e+=i)if(i=n.getUint32(e),e+=4,i<=0)a.push("<span style='color:red;'>MALFORMED DATA</span>");else switch(31&t[e]){case 1:a.push("slice_layer_without_partitioning_rbsp");break;case 5:a.push("slice_layer_without_partitioning_rbsp_idr");break;case 6:a.push("sei_rbsp");break;case 7:a.push("seq_parameter_set_rbsp");break;case 8:a.push("pic_parameter_set_rbsp");break;case 9:a.push("access_unit_delimiter_rbsp");break;default:a.push("UNKNOWN NAL - "+t[e]&31)}return a},an={avc1:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{dataReferenceIndex:e.getUint16(6),width:e.getUint16(24),height:e.getUint16(26),horizresolution:e.getUint16(28)+e.getUint16(30)/16,vertresolution:e.getUint16(32)+e.getUint16(34)/16,frameCount:e.getUint16(40),depth:e.getUint16(74),config:$i(t.subarray(78,t.byteLength))}},avcC:function(t){var e,i,n,a,r=new DataView(t.buffer,t.byteOffset,t.byteLength),s={configurationVersion:t[0],avcProfileIndication:t[1],profileCompatibility:t[2],avcLevelIndication:t[3],lengthSizeMinusOne:3&t[4],sps:[],pps:[]},o=31&t[5];for(n=6,a=0;a<o;a++)i=r.getUint16(n),n+=2,s.sps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;for(e=t[n],n++,a=0;a<e;a++)i=r.getUint16(n),n+=2,s.pps.push(new Uint8Array(t.subarray(n,n+i))),n+=i;return s},btrt:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{bufferSizeDB:e.getUint32(0),maxBitrate:e.getUint32(4),avgBitrate:e.getUint32(8)}},edts:function(t){return{boxes:$i(t)}},elst:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),edits:[]},a=i.getUint32(4);for(e=8;a;a--)0===n.version?(n.edits.push({segmentDuration:i.getUint32(e),mediaTime:i.getInt32(e+4),mediaRate:i.getUint16(e+8)+i.getUint16(e+10)/65536}),e+=12):(n.edits.push({segmentDuration:tn(t.subarray(e)),mediaTime:tn(t.subarray(e+8)),mediaRate:i.getUint16(e+16)+i.getUint16(e+18)/65536}),e+=20);return n},esds:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),esId:t[6]<<8|t[7],streamPriority:31&t[8],decoderConfig:{objectProfileIndication:t[11],streamType:t[12]>>>2&63,bufferSize:t[13]<<16|t[14]<<8|t[15],maxBitrate:t[16]<<24|t[17]<<16|t[18]<<8|t[19],avgBitrate:t[20]<<24|t[21]<<16|t[22]<<8|t[23],decoderConfigDescriptor:{tag:t[24],length:t[25],audioObjectType:t[26]>>>3&31,samplingFrequencyIndex:(7&t[26])<<1|t[27]>>>7&1,channelConfiguration:t[27]>>>3&15}}}},ftyp:function(t){for(var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={majorBrand:At(t.subarray(0,4)),minorVersion:e.getUint32(4),compatibleBrands:[]},n=8;n<t.byteLength;)i.compatibleBrands.push(At(t.subarray(n,n+4))),n+=4;return i},dinf:function(t){return{boxes:$i(t)}},dref:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),dataReferences:$i(t.subarray(8))}},hdlr:function(t){var e={version:new DataView(t.buffer,t.byteOffset,t.byteLength).getUint8(0),flags:new Uint8Array(t.subarray(1,4)),handlerType:At(t.subarray(8,12)),name:""},i=8;for(i=24;i<t.byteLength;i++){if(0===t[i]){i++;break}e.name+=String.fromCharCode(t[i])}return e.name=decodeURIComponent(escape(e.name)),e},mdat:function(t){return{byteLength:t.byteLength,nals:nn(t)}},mdhd:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=4,a={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),language:""};return 1===a.version?(n+=4,a.creationTime=en(i.getUint32(n)),n+=8,a.modificationTime=en(i.getUint32(n)),n+=4,a.timescale=i.getUint32(n),n+=8,a.duration=i.getUint32(n)):(a.creationTime=en(i.getUint32(n)),n+=4,a.modificationTime=en(i.getUint32(n)),n+=4,a.timescale=i.getUint32(n),n+=4,a.duration=i.getUint32(n)),n+=4,e=i.getUint16(n),a.language+=String.fromCharCode(96+(e>>10)),a.language+=String.fromCharCode(96+((992&e)>>5)),a.language+=String.fromCharCode(96+(31&e)),a},mdia:function(t){return{boxes:$i(t)}},mfhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sequenceNumber:t[4]<<24|t[5]<<16|t[6]<<8|t[7]}},minf:function(t){return{boxes:$i(t)}},mp4a:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={dataReferenceIndex:e.getUint16(6),channelcount:e.getUint16(16),samplesize:e.getUint16(18),samplerate:e.getUint16(24)+e.getUint16(26)/65536};return t.byteLength>28&&(i.streamDescriptor=$i(t.subarray(28))[0]),i},moof:function(t){return{boxes:$i(t)}},moov:function(t){return{boxes:$i(t)}},mvex:function(t){return{boxes:$i(t)}},mvhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=en(e.getUint32(i)),i+=8,n.modificationTime=en(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=8,n.duration=e.getUint32(i)):(n.creationTime=en(e.getUint32(i)),i+=4,n.modificationTime=en(e.getUint32(i)),i+=4,n.timescale=e.getUint32(i),i+=4,n.duration=e.getUint32(i)),i+=4,n.rate=e.getUint16(i)+e.getUint16(i+2)/16,i+=4,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,i+=8,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,i+=24,n.nextTrackId=e.getUint32(i),n},pdin:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),rate:e.getUint32(4),initialDelay:e.getUint32(8)}},sdtp:function(t){var e,i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),samples:[]};for(e=4;e<t.byteLength;e++)i.samples.push({dependsOn:(48&t[e])>>4,isDependedOn:(12&t[e])>>2,hasRedundancy:3&t[e]});return i},sidx:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i={version:t[0],flags:new Uint8Array(t.subarray(1,4)),references:[],referenceId:e.getUint32(4),timescale:e.getUint32(8)},n=12;0===i.version?(i.earliestPresentationTime=e.getUint32(n),i.firstOffset=e.getUint32(n+4),n+=8):(i.earliestPresentationTime=Qi(t.subarray(n)),i.firstOffset=Qi(t.subarray(n+8)),n+=16),n+=2;var a=e.getUint16(n);for(n+=2;a>0;n+=12,a--)i.references.push({referenceType:(128&t[n])>>>7,referencedSize:2147483647&e.getUint32(n),subsegmentDuration:e.getUint32(n+4),startsWithSap:!!(128&t[n+8]),sapType:(112&t[n+8])>>>4,sapDeltaTime:268435455&e.getUint32(n+8)});return i},smhd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),balance:t[4]+t[5]/256}},stbl:function(t){return{boxes:$i(t)}},ctts:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),compositionOffsets:[]},a=i.getUint32(4);for(e=8;a;e+=8,a--)n.compositionOffsets.push({sampleCount:i.getUint32(e),sampleOffset:i[0===n.version?"getUint32":"getInt32"](e+4)});return n},stss:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:i.getUint8(0),flags:new Uint8Array(t.subarray(1,4)),syncSamples:[]},a=i.getUint32(4);for(e=8;a;e+=4,a--)n.syncSamples.push(i.getUint32(e));return n},stco:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),chunkOffsets:[]},a=i.getUint32(4);for(e=8;a;e+=4,a--)n.chunkOffsets.push(i.getUint32(e));return n},stsc:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n=i.getUint32(4),a={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleToChunks:[]};for(e=8;n;e+=12,n--)a.sampleToChunks.push({firstChunk:i.getUint32(e),samplesPerChunk:i.getUint32(e+4),sampleDescriptionIndex:i.getUint32(e+8)});return a},stsd:function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleDescriptions:$i(t.subarray(8))}},stsz:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),sampleSize:i.getUint32(4),entries:[]};for(e=12;e<t.byteLength;e+=4)n.entries.push(i.getUint32(e));return n},stts:function(t){var e,i=new DataView(t.buffer,t.byteOffset,t.byteLength),n={version:t[0],flags:new Uint8Array(t.subarray(1,4)),timeToSamples:[]},a=i.getUint32(4);for(e=8;a;e+=8,a--)n.timeToSamples.push({sampleCount:i.getUint32(e),sampleDelta:i.getUint32(e+4)});return n},styp:function(t){return an.ftyp(t)},tfdt:zt,tfhd:Mt,tkhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=4,n={version:e.getUint8(0),flags:new Uint8Array(t.subarray(1,4))};return 1===n.version?(i+=4,n.creationTime=en(e.getUint32(i)),i+=8,n.modificationTime=en(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=8,n.duration=e.getUint32(i)):(n.creationTime=en(e.getUint32(i)),i+=4,n.modificationTime=en(e.getUint32(i)),i+=4,n.trackId=e.getUint32(i),i+=4,i+=4,n.duration=e.getUint32(i)),i+=4,i+=8,n.layer=e.getUint16(i),i+=2,n.alternateGroup=e.getUint16(i),i+=2,n.volume=e.getUint8(i)+e.getUint8(i+1)/8,i+=2,i+=2,n.matrix=new Uint32Array(t.subarray(i,i+36)),i+=36,n.width=e.getUint16(i)+e.getUint16(i+2)/65536,i+=4,n.height=e.getUint16(i)+e.getUint16(i+2)/65536,n},traf:function(t){return{boxes:$i(t)}},trak:function(t){return{boxes:$i(t)}},trex:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),trackId:e.getUint32(4),defaultSampleDescriptionIndex:e.getUint32(8),defaultSampleDuration:e.getUint32(12),defaultSampleSize:e.getUint32(16),sampleDependsOn:3&t[20],sampleIsDependedOn:(192&t[21])>>6,sampleHasRedundancy:(48&t[21])>>4,samplePaddingValue:(14&t[21])>>1,sampleIsDifferenceSample:!!(1&t[21]),sampleDegradationPriority:e.getUint16(22)}},trun:Bt,"url ":function(t){return{version:t[0],flags:new Uint8Array(t.subarray(1,4))}},vmhd:function(t){var e=new DataView(t.buffer,t.byteOffset,t.byteLength);return{version:t[0],flags:new Uint8Array(t.subarray(1,4)),graphicsmode:e.getUint16(4),opcolor:new Uint16Array([e.getUint16(6),e.getUint16(8),e.getUint16(10)])}}},rn={inspect:$i=function(t){for(var e,i,n,a,r,s=0,o=[],d=new ArrayBuffer(t.length),h=new Uint8Array(d),p=0;p<t.length;++p)h[p]=t[p];for(e=new DataView(d);s<t.byteLength;)i=e.getUint32(s),n=At(t.subarray(s+4,s+8)),a=i>1?s+i:t.byteLength,(r=(an[n]||function(t){return{data:t}})(t.subarray(s+8,a))).size=i,r.type=n,o.push(r),s=a;return o},textify:Zi=function(t,e){var i;return e=e||0,i=new Array(2*e+1).join(" "),t.map((function(t,n){return i+t.type+"\n"+Object.keys(t).filter((function(t){return"type"!==t&&"boxes"!==t})).map((function(e){var n=i+"  "+e+": ",a=t[e];if(a instanceof Uint8Array||a instanceof Uint32Array){var r=Array.prototype.slice.call(new Uint8Array(a.buffer,a.byteOffset,a.byteLength)).map((function(t){return" "+("00"+t.toString(16)).slice(-2)})).join("").match(/.{1,24}/g);return r?1===r.length?n+"<"+r.join("").slice(1)+">":n+"<\n"+r.map((function(t){return i+"  "+t})).join("\n")+"\n"+i+"  >":n+"<>"}return n+JSON.stringify(a,null,2).split("\n").map((function(t,e){return 0===e?t:i+"  "+t})).join("\n")})).join("\n")+(t.boxes?"\n"+Zi(t.boxes,e+1):"")})).join("\n")},parseType:At,findBox:Dt,parseTraf:an.traf,parseTfdt:an.tfdt,parseHdlr:an.hdlr,parseTfhd:an.tfhd,parseTrun:an.trun,parseSidx:an.sidx},sn={8:"audio",9:"video",18:"metadata"},on=function(t){for(var e,i=[];t.byteLength>0;)e=0,i.push("0x"+("00"+t[e++].toString(16)).slice(-2).toUpperCase()),t=t.subarray(1);return i.join(" ")},dn=function(t,e){var i=t[0]&parseInt("00001111",2);return(e=e||{}).frameType=["Unknown","Keyframe (for AVC, a seekable frame)","Inter frame (for AVC, a nonseekable frame)","Disposable inter frame (H.263 only)","Generated keyframe (reserved for server use only)","Video info/command frame"][(t[0]&parseInt("11110000",2))>>>4],e.codecID=i,7===i?function(t,e){var i=t[1]&parseInt("01111111",2)<<16|t[2]<<8|t[3];return(e=e||{}).avcPacketType=["AVC Sequence Header","AVC NALU","AVC End-of-Sequence"][t[0]],e.CompositionTime=t[1]&parseInt("10000000",2)?-i:i,1===t[0]?e.nalUnitTypeRaw=on(t.subarray(4,100)):e.data=on(t.subarray(4)),e}(t.subarray(1),e):e},hn=function(t,e){var i=(t[0]&parseInt("11110000",2))>>>4;return(e=e||{}).soundFormat=["Linear PCM, platform endian","ADPCM","MP3","Linear PCM, little endian","Nellymoser 16-kHz mono","Nellymoser 8-kHz mono","Nellymoser","G.711 A-law logarithmic PCM","G.711 mu-law logarithmic PCM","reserved","AAC","Speex","MP3 8-Khz","Device-specific sound"][i],e.soundRate=["5.5-kHz","11-kHz","22-kHz","44-kHz"][(t[0]&parseInt("00001100",2))>>>2],e.soundSize=(t[0]&parseInt("00000010",2))>>>1?"16-bit":"8-bit",e.soundType=t[0]&parseInt("00000001",2)?"Stereo":"Mono",10===i?function(t,e){return(e=e||{}).aacPacketType=["AAC Sequence Header","AAC Raw"][t[0]],e.data=on(t.subarray(1)),e}(t.subarray(1),e):e},pn=function(t){var e=function(t){return{tagType:sn[t[0]],dataSize:t[1]<<16|t[2]<<8|t[3],timestamp:t[7]<<24|t[4]<<16|t[5]<<8|t[6],streamID:t[8]<<16|t[9]<<8|t[10]}}(t);switch(t[0]){case 8:hn(t.subarray(11),e);break;case 9:dn(t.subarray(11),e)}return e},un={inspectTag:pn,inspect:function(t){var e,i,n=9,a=[];for(n+=4;n<t.byteLength;)e=t[n+1]<<16,e|=t[n+2]<<8,e|=t[n+3],e+=11,i=t.subarray(n,n+e),a.push(pn(i)),n+=e+4;return a},textify:function(t){return JSON.stringify(t,null,2)}},ln=function(t){var e=31&t[1];return e<<=8,e|=t[2]},cn=function(t){return!!(64&t[1])},fn=function(t){var e=0;return(48&t[3])>>>4>1&&(e+=t[4]+1),e},gn=function(t){switch(t){case 5:return"slice_layer_without_partitioning_rbsp_idr";case 6:return"sei_rbsp";case 7:return"seq_parameter_set_rbsp";case 8:return"pic_parameter_set_rbsp";case 9:return"access_unit_delimiter_rbsp";default:return null}},mn={parseType:function(t,e){var i=ln(t);return 0===i?"pat":i===e?"pmt":e?"pes":null},parsePat:function(t){var e=cn(t),i=4+fn(t);return e&&(i+=t[i]+1),(31&t[i+10])<<8|t[i+11]},parsePmt:function(t){var e={},i=cn(t),n=4+fn(t);if(i&&(n+=t[n]+1),1&t[n+5]){var a;a=3+((15&t[n+1])<<8|t[n+2])-4;for(var r=12+((15&t[n+10])<<8|t[n+11]);r<a;){var s=n+r;e[(31&t[s+1])<<8|t[s+2]]=t[s],r+=5+((15&t[s+3])<<8|t[s+4])}return e}},parsePayloadUnitStartIndicator:cn,parsePesType:function(t,e){switch(e[ln(t)]){case Ne.H264_STREAM_TYPE:return"video";case Ne.ADTS_STREAM_TYPE:return"audio";case Ne.METADATA_STREAM_TYPE:return"timed-metadata";default:return null}},parsePesTime:function(t){if(!cn(t))return null;var e=4+fn(t);if(e>=t.byteLength)return null;var i,n=null;return 192&(i=t[e+7])&&((n={}).pts=(14&t[e+9])<<27|(255&t[e+10])<<20|(254&t[e+11])<<12|(255&t[e+12])<<5|(254&t[e+13])>>>3,n.pts*=4,n.pts+=(6&t[e+13])>>>1,n.dts=n.pts,64&i&&(n.dts=(14&t[e+14])<<27|(255&t[e+15])<<20|(254&t[e+16])<<12|(255&t[e+17])<<5|(254&t[e+18])>>>3,n.dts*=4,n.dts+=(6&t[e+18])>>>1)),n},videoPacketContainsKeyFrame:function(t){for(var e=4+fn(t),i=t.subarray(e),n=0,a=0,r=!1;a<i.byteLength-3;a++)if(1===i[a+2]){n=a+5;break}for(;n<i.byteLength;)switch(i[n]){case 0:if(0!==i[n-1]){n+=2;break}if(0!==i[n-2]){n++;break}a+3!==n-2&&"slice_layer_without_partitioning_rbsp_idr"===gn(31&i[a+3])&&(r=!0);do{n++}while(1!==i[n]&&n<i.length);a=n-2,n+=3;break;case 1:if(0!==i[n-1]||0!==i[n-2]){n+=3;break}"slice_layer_without_partitioning_rbsp_idr"===gn(31&i[a+3])&&(r=!0),a=n-2,n+=3;break;default:n+=3}return i=i.subarray(a),n-=a,a=0,i&&i.byteLength>3&&"slice_layer_without_partitioning_rbsp_idr"===gn(31&i[a+3])&&(r=!0),r}},yn=je,bn={};bn.ts=mn,bn.aac=ri;var vn=f,Sn=188,wn=71,Tn=function(t,e,i){for(var n,a,r,s,o=0,d=Sn,h=!1;d<=t.byteLength;)if(t[o]!==wn||t[d]!==wn&&d!==t.byteLength)o++,d++;else{switch(n=t.subarray(o,d),bn.ts.parseType(n,e.pid)){case"pes":a=bn.ts.parsePesType(n,e.table),r=bn.ts.parsePayloadUnitStartIndicator(n),"audio"===a&&r&&(s=bn.ts.parsePesTime(n))&&(s.type="audio",i.audio.push(s),h=!0)}if(h)break;o+=Sn,d+=Sn}for(o=(d=t.byteLength)-Sn,h=!1;o>=0;)if(t[o]!==wn||t[d]!==wn&&d!==t.byteLength)o--,d--;else{switch(n=t.subarray(o,d),bn.ts.parseType(n,e.pid)){case"pes":a=bn.ts.parsePesType(n,e.table),r=bn.ts.parsePayloadUnitStartIndicator(n),"audio"===a&&r&&(s=bn.ts.parsePesTime(n))&&(s.type="audio",i.audio.push(s),h=!0)}if(h)break;o-=Sn,d-=Sn}},_n=function(t,e,i){for(var n,a,r,s,o,d,h,p=0,u=Sn,l=!1,c={data:[],size:0};u<t.byteLength;)if(t[p]!==wn||t[u]!==wn)p++,u++;else{switch(n=t.subarray(p,u),bn.ts.parseType(n,e.pid)){case"pes":if(a=bn.ts.parsePesType(n,e.table),r=bn.ts.parsePayloadUnitStartIndicator(n),"video"===a&&(r&&!l&&(s=bn.ts.parsePesTime(n))&&(s.type="video",i.video.push(s),l=!0),!i.firstKeyFrame)){if(r&&0!==c.size){for(o=new Uint8Array(c.size),d=0;c.data.length;)h=c.data.shift(),o.set(h,d),d+=h.byteLength;if(bn.ts.videoPacketContainsKeyFrame(o)){var f=bn.ts.parsePesTime(o);f?(i.firstKeyFrame=f,i.firstKeyFrame.type="video"):console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}c.size=0}c.data.push(n),c.size+=n.byteLength}}if(l&&i.firstKeyFrame)break;p+=Sn,u+=Sn}for(p=(u=t.byteLength)-Sn,l=!1;p>=0;)if(t[p]!==wn||t[u]!==wn)p--,u--;else{switch(n=t.subarray(p,u),bn.ts.parseType(n,e.pid)){case"pes":a=bn.ts.parsePesType(n,e.table),r=bn.ts.parsePayloadUnitStartIndicator(n),"video"===a&&r&&(s=bn.ts.parsePesTime(n))&&(s.type="video",i.video.push(s),l=!0)}if(l)break;p-=Sn,u-=Sn}},kn=function(t){var e={pid:null,table:null},i={};for(var n in function(t,e){for(var i,n=0,a=Sn;a<t.byteLength;)if(t[n]!==wn||t[a]!==wn)n++,a++;else{switch(i=t.subarray(n,a),bn.ts.parseType(i,e.pid)){case"pat":e.pid=bn.ts.parsePat(i);break;case"pmt":var r=bn.ts.parsePmt(i);e.table=e.table||{},Object.keys(r).forEach((function(t){e.table[t]=r[t]}))}n+=Sn,a+=Sn}}(t,e),e.table){if(e.table.hasOwnProperty(n))switch(e.table[n]){case Ne.H264_STREAM_TYPE:i.video=[],_n(t,e,i),0===i.video.length&&delete i.video;break;case Ne.ADTS_STREAM_TYPE:i.audio=[],Tn(t,e,i),0===i.audio.length&&delete i.audio}}return i},Un={inspect:function(t,e){var i;return(i=bn.aac.isLikelyAacData(t)?function(t){for(var e,i=!1,n=0,a=null,r=null,s=0,o=0;t.length-o>=3;){switch(bn.aac.parseType(t,o)){case"timed-metadata":if(t.length-o<10){i=!0;break}if((s=bn.aac.parseId3TagSize(t,o))>t.length){i=!0;break}null===r&&(e=t.subarray(o,o+s),r=bn.aac.parseAacTimestamp(e)),o+=s;break;case"audio":if(t.length-o<7){i=!0;break}if((s=bn.aac.parseAdtsSize(t,o))>t.length){i=!0;break}null===a&&(e=t.subarray(o,o+s),a=bn.aac.parseSampleRate(e)),n++,o+=s;break;default:o++}if(i)return null}if(null===a||null===r)return null;var d=vn/a;return{audio:[{type:"audio",dts:r,pts:r},{type:"audio",dts:r+1024*n*d,pts:r+1024*n*d}]}}(t):kn(t))&&(i.audio||i.video)?(function(t,e){if(t.audio&&t.audio.length){var i=e;(void 0===i||isNaN(i))&&(i=t.audio[0].dts),t.audio.forEach((function(t){t.dts=yn(t.dts,i),t.pts=yn(t.pts,i),t.dtsTime=t.dts/vn,t.ptsTime=t.pts/vn}))}if(t.video&&t.video.length){var n=e;if((void 0===n||isNaN(n))&&(n=t.video[0].dts),t.video.forEach((function(t){t.dts=yn(t.dts,n),t.pts=yn(t.pts,n),t.dtsTime=t.dts/vn,t.ptsTime=t.pts/vn})),t.firstKeyFrame){var a=t.firstKeyFrame;a.dts=yn(a.dts,n),a.pts=yn(a.pts,n),a.dtsTime=a.dts/vn,a.ptsTime=a.pts/vn}}}(i,e),i):null},parseAudioPes_:Tn},An={codecs:ct,mp4:Ai,flv:Fi,mp2t:zi,partial:Ji};return An.mp4.tools=rn,An.flv.tools=un,An.mp2t.tools=Un,An}));

return module.exports; })();
const mp4Writer = (() => { const module = { exports: {} }; const exports = module.exports;
/* Lightweight ordinary MP4 writer shared with the PKU-Art integration. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayMP4Writer = factory();
})(globalThis, function () {
'use strict';
// Streaming mux.js fMP4 -> ordinary MP4 assembler. No media re-encoding.
// Only initialization boxes and compact sample tables survive a fragment write.
const MAX_U32 = 0xffffffff;
const BLOCK_WORDS = 1024;
const fail = message => { throw new Error(`MP4 封装失败：${message}`); };
const viewOf = bytes => new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
const text = (bytes, position) => String.fromCharCode(...bytes.subarray(position, position + 4));
const ascii = value => Uint8Array.from(value, char => char.charCodeAt(0));

function u32(...values) {
    const bytes = new Uint8Array(values.length * 4), view = viewOf(bytes);
    values.forEach((value, index) => {
        if (!Number.isInteger(value) || value < 0 || value > MAX_U32) fail('32 位字段超出范围');
        view.setUint32(index * 4, value);
    });
    return bytes;
}
function u64(value, signed = false) {
    if (!Number.isSafeInteger(value)) fail('64 位字段超过安全整数范围');
    const bytes = new Uint8Array(8);
    if (signed) viewOf(bytes).setBigInt64(0, BigInt(value));
    else viewOf(bytes).setBigUint64(0, BigInt(value));
    return bytes;
}
function read64(view, position) {
    const value = Number(view.getBigUint64(position));
    if (!Number.isSafeInteger(value)) fail('文件偏移或时间戳过大');
    return value;
}
function* boxes(bytes, start = 0, end = bytes.byteLength) {
    const view = viewOf(bytes);
    for (let position = start; position < end;) {
        if (position + 8 > end) fail('不完整的 box 头');
        let size = view.getUint32(position), header = 8;
        if (size === 1) {
            if (position + 16 > end) fail('不完整的扩展 box 头');
            size = read64(view, position + 8); header = 16;
        } else if (!size) size = end - position;
        if (size < header || position + size > end) fail('box 长度越界');
        yield { type: text(bytes, position + 4), start: position, body: position + header, end: position + size };
        position += size;
    }
}
function child(bytes, parent, type) {
    const found = [...boxes(bytes, parent.body, parent.end)].find(box => box.type === type);
    if (!found) fail(`缺少 ${type}`);
    return found;
}
const copy = (bytes, box) => bytes.slice(box.start, box.end);
const sizeOf = part => part.byteLength ?? part.size;
function box(type, ...parts) {
    const size = 8 + parts.reduce((sum, part) => sum + sizeOf(part), 0);
    if (size > MAX_U32) fail('样本索引过大');
    return { type, parts, size };
}
const full = (type, version, ...parts) => box(type, u32(version * 0x1000000), ...parts);
const header = (type, size) => {
    const bytes = new Uint8Array(8); bytes.set(u32(size)); bytes.set(ascii(type), 4); return bytes;
};

class Words {
    blocks = [];
    length = 0;
    add(...values) {
        for (const value of values) {
            if (this.length % BLOCK_WORDS === 0) this.blocks.push(new Uint32Array(BLOCK_WORDS));
            this.blocks.at(-1)[this.length++ % BLOCK_WORDS] = value;
        }
    }
    get(index) { return this.blocks[Math.floor(index / BLOCK_WORDS)][index % BLOCK_WORDS]; }
    set(index, value) { this.blocks[Math.floor(index / BLOCK_WORDS)][index % BLOCK_WORDS] = value; }
    get allocatedBytes() { return this.blocks.length * BLOCK_WORDS * 4; }
}
class Runs extends Words {
    addRun(value, count = 1) {
        if (this.length && this.get(this.length - 1) === (value >>> 0) && this.get(this.length - 2) <= MAX_U32 - count) {
            this.set(this.length - 2, this.get(this.length - 2) + count);
        } else this.add(count, value);
    }
    extendLastSample(gap) {
        const count = this.get(this.length - 2), duration = this.get(this.length - 1);
        if (duration + gap <= 0 || duration + gap > MAX_U32) fail('分片时间戳重叠或间隔过大');
        if (count === 1) this.set(this.length - 1, duration + gap);
        else { this.set(this.length - 2, count - 1); this.addRun(duration + gap); }
    }
}
class Sizes {
    count = 0;
    constant = 0;
    words = null;
    add(value) {
        if (!this.count) this.constant = value;
        if (!this.words && value !== this.constant) {
            this.words = new Words();
            for (let i = 0; i < this.count; i++) this.words.add(this.constant);
        }
        this.words?.add(value); this.count++;
    }
}
function wordSource(words, map = (_, value) => value) {
    return {
        byteLength: words.length * 4,
        *chunks() {
            for (let start = 0; start < words.length; start += BLOCK_WORDS) {
                const count = Math.min(BLOCK_WORDS, words.length - start), bytes = new Uint8Array(count * 4), view = viewOf(bytes);
                for (let i = 0; i < count; i++) view.setUint32(i * 4, map(start + i, words.get(start + i)));
                yield bytes;
            }
        },
    };
}
function durationBox(original, type, duration) {
    const view = viewOf(original), version = original[8];
    if (version > 1) fail('不支持的时间头版本');
    const track = type === 'tkhd', tail = (version ? 28 : 16) + (track ? 8 : 4);
    const creation = version ? original.subarray(12, 20) : u64(view.getUint32(12));
    const modified = version ? original.subarray(20, 28) : u64(view.getUint32(16));
    const idOrScale = view.getUint32(version ? 28 : 20);
    return box(type, u32(0x1000000 | (view.getUint32(8) & 0xffffff)), creation, modified,
        u32(idOrScale), ...(track ? [u32(0)] : []), u64(duration), original.subarray(tail + 8));
}

/** For mux.js H.264/AAC fragments; intentionally not a general ISO BMFF editor. */
function createStandardMP4Writer(sink) {
    if (typeof sink.writeAt !== 'function') fail('需要支持定位写入的文件输出');
    const tracks = new Map();
    let movieHeader, movieScale, position = 0, mdatPosition, mediaBytes = 0, state = 'writing', snapshot;
    const active = () => { if (state !== 'writing') fail('封装器已结束'); };
    async function append(bytes) {
        active(); await sink.writeAt(bytes, position); active(); position += bytes.byteLength;
        if (!Number.isSafeInteger(position)) fail('文件过大');
    }
    async function emit(part) {
        if (part instanceof Uint8Array) await append(part);
        else if (part.chunks) { for (const bytes of part.chunks()) await append(bytes); }
        else { await append(header(part.type, part.size)); for (const child of part.parts) await emit(child); }
    }
    function stats() {
        let used = 0, allocated = 0, samples = 0;
        for (const track of tracks.values()) {
            samples += track.count;
            for (const words of [track.durations, track.offsets, track.chunks, track.chunkMap, track.keys, track.sizes.words]) {
                if (words) { used += words.length * 4; allocated += words.allocatedBytes; }
            }
        }
        return { sampleCount: samples, indexBytes: used, allocatedIndexBytes: allocated, mediaBytes };
    }
    function initialize(bytes) {
        const roots = [...boxes(bytes)], moov = roots.find(box => box.type === 'moov');
        if (!moov) fail('缺少初始化 moov');
        if (!movieHeader) {
            const movie = copy(bytes, child(bytes, moov, 'mvhd'));
            movieHeader = movie;
            if (movie[8] > 1) fail('不支持的 mvhd 版本');
            movieScale = viewOf(movie).getUint32(movie[8] ? 28 : 20);
            if (!movieScale) fail('无效的电影时间基');
        }
        for (const definition of boxes(bytes, moov.body, moov.end)) {
            if (definition.type !== 'trak') continue;
            const tkhdBox = child(bytes, definition, 'tkhd'), mdia = child(bytes, definition, 'mdia');
            if (bytes[tkhdBox.body] > 1) fail('不支持的 tkhd 版本');
            const id = viewOf(bytes).getUint32(tkhdBox.body + (bytes[tkhdBox.body] ? 20 : 12));
            const hdlrBox = child(bytes, mdia, 'hdlr'), kind = text(bytes, hdlrBox.body + 8), minf = child(bytes, mdia, 'minf');
            if (!['vide', 'soun'].includes(kind)) fail('仅支持音视频轨道');
            const stbl = child(bytes, minf, 'stbl'), stsdBox = child(bytes, stbl, 'stsd'), stsd = bytes.subarray(stsdBox.start, stsdBox.end);
            if (viewOf(stsd).getUint32(12) !== 1 || !['avc1', 'mp4a'].includes(text(stsd, 20))) fail('不支持的编码描述');
            const previous = tracks.get(id);
            if (previous) {
                if (previous.stsd.length !== stsd.length || previous.stsd.some((value, index) => value !== stsd[index])) fail('录播编码参数发生变化');
                continue;
            }
            const tkhd = copy(bytes, tkhdBox), mdhd = copy(bytes, child(bytes, mdia, 'mdhd')), hdlr = copy(bytes, hdlrBox);
            if (mdhd[8] > 1) fail('不支持的 mdhd 版本');
            const scale = viewOf(mdhd).getUint32(mdhd[8] ? 28 : 20);
            if (!id || !scale) fail('无效的轨道标识或时间基');
            tracks.set(id, {
                id, kind, scale, tkhd, mdhd, hdlr, stsd: stsd.slice(),
                mediaHeader: copy(bytes, child(bytes, minf, kind === 'vide' ? 'vmhd' : 'smhd')),
                dinf: copy(bytes, child(bytes, minf, 'dinf')),
                durations: new Runs(), offsets: new Runs(), chunks: new Words(), chunkMap: new Words(),
                keys: null, sizes: new Sizes(), count: 0, chunkCount: 0, lastChunkSize: 0,
                decodeDuration: 0, minPresentation: Infinity, maxPresentation: -Infinity, minOffset: 0,
            });
        }
    }
    function trackBoxes(track, origin) {
        const shift = -track.minOffset, start = (track.firstDts + track.minPresentation) / track.scale - origin;
        const span = (track.maxPresentation - track.minPresentation) / track.scale;
        const emptyDuration = Math.max(0, Math.round(start * movieScale)), duration = Math.ceil(span * movieScale);
        const edits = [];
        if (emptyDuration) edits.push(u64(emptyDuration), u64(-1, true), u32(0x10000));
        edits.push(u64(duration), u64(track.minPresentation + shift, true), u32(0x10000));
        const tables = [track.stsd, full('stts', 0, u32(track.durations.length / 2), wordSource(track.durations))];
        if (track.offsets.length) tables.push(full('ctts', 0, u32(track.offsets.length / 2), wordSource(track.offsets,
            (index, value) => index % 2 ? (value | 0) + shift : value)));
        tables.push(full('stsc', 0, u32(track.chunkMap.length / 3), wordSource(track.chunkMap)),
            full('stsz', 0, u32(track.sizes.words ? 0 : track.sizes.constant, track.count),
                ...(track.sizes.words ? [wordSource(track.sizes.words)] : [])),
            full('co64', 0, u32(track.chunkCount), wordSource(track.chunks)));
        if (track.keys) tables.push(full('stss', 0, u32(track.keys.length), wordSource(track.keys)));
        return {
            duration: duration + emptyDuration,
            node: box('trak', durationBox(track.tkhd, 'tkhd', duration + emptyDuration),
                box('edts', full('elst', 1, u32(edits.length / 3), ...edits)),
                box('mdia', durationBox(track.mdhd, 'mdhd', Math.max(track.decodeDuration, track.maxPresentation + shift)), track.hdlr,
                    box('minf', track.mediaHeader, track.dinf, box('stbl', ...tables)))),
        };
    }
    return {
        async writeFragment(init, data) {
            active(); initialize(init);
            if (mdatPosition == null) {
                await emit(box('ftyp', ascii('isom'), u32(512), ascii('isom'), ascii('iso2'), ascii('avc1'), ascii('mp41')));
                mdatPosition = position;
                await append(new Uint8Array([...u32(1), ...ascii('mdat'), ...u64(16)]));
            }
            const top = [...boxes(data)], mdats = top.filter(box => box.type === 'mdat'), view = viewOf(data);
            for (const moof of top.filter(box => box.type === 'moof')) {
                for (const traf of boxes(data, moof.body, moof.end)) {
                    if (traf.type !== 'traf') continue;
                    const tfhd = child(data, traf, 'tfhd'), tfdt = child(data, traf, 'tfdt');
                    const flags = view.getUint32(tfhd.body) & 0xffffff, id = view.getUint32(tfhd.body + 4), track = tracks.get(id);
                    if (!track) fail('分片引用未知轨道');
                    if (flags & 1) fail('不支持绝对分片数据偏移');
                    let field = tfhd.body + 8;
                    const readDefault = flag => { if (!(flags & flag)) return 0; const value = view.getUint32(field); field += 4; return value; };
                    const description = readDefault(2), defaultDuration = readDefault(8), defaultSize = readDefault(16), defaultFlags = readDefault(32);
                    if (field > tfhd.end || description > 1) fail('无效的分片轨道头');
                    const version = data[tfdt.body];
                    if (version > 1 || tfdt.body + (version ? 12 : 8) > tfdt.end) fail('无效的分片时间头');
                    let dts = version ? read64(view, tfdt.body + 4) : view.getUint32(tfdt.body + 4);
                    if (track.firstDts == null) track.firstDts = dts;
                    const gap = dts - track.firstDts - track.decodeDuration;
                    if (track.count && gap) {
                        // HLS audio timestamps can round by a fraction of one AAC frame.
                        // Correct the previous duration rather than accumulating drift.
                        track.durations.extendLastSample(gap); track.decodeDuration += gap;
                        track.lastPresentationEnd += gap;
                        track.maxPresentation = Math.max(track.maxBeforeLast, track.lastPresentationEnd);
                    }
                    for (const run of boxes(data, traf.body, traf.end)) {
                        if (run.type !== 'trun') continue;
                        const runVersion = data[run.body], runFlags = view.getUint32(run.body) & 0xffffff;
                        if (runVersion > 1 || !(runFlags & 1)) fail('缺少分片相对数据偏移');
                        const count = view.getUint32(run.body + 4), dataStart = moof.start + view.getInt32(run.body + 8);
                        let cursor = run.body + 12, firstFlags;
                        if (runFlags & 4) { firstFlags = view.getUint32(cursor); cursor += 4; }
                        const fields = [0x100, 0x200, 0x400, 0x800].filter(flag => runFlags & flag).length;
                        if (cursor + count * fields * 4 !== run.end) fail('分片样本表长度不符');
                        if (!count) continue;
                        if (track.count + count > MAX_U32) fail('样本数过多');
                        let byteCount = 0;
                        for (let index = 0; index < count; index++) {
                            const read = (flag, fallback) => { if (!(runFlags & flag)) return fallback; const value = view.getUint32(cursor); cursor += 4; return value; };
                            const duration = read(0x100, defaultDuration), size = read(0x200, defaultSize);
                            const sampleFlags = read(0x400, index === 0 ? firstFlags ?? defaultFlags : defaultFlags);
                            let offset = read(0x800, 0); if (runVersion === 1) offset |= 0;
                            offset += dts - track.firstDts - track.decodeDuration;
                            if (!duration || !size || offset < -0x80000000 || offset > 0x7fffffff) fail('无效的样本尺寸或时间');
                            track.minOffset = Math.min(track.minOffset, offset);
                            if (offset || track.offsets.length) {
                                if (!track.offsets.length && track.count) track.offsets.addRun(0, track.count);
                                track.offsets.addRun(offset);
                            }
                            if (track.kind === 'vide') {
                                const sync = !(sampleFlags & 0x10000);
                                if (!sync && !track.keys) {
                                    track.keys = new Words(); for (let i = 1; i <= track.count; i++) track.keys.add(i);
                                }
                                if (sync && track.keys) track.keys.add(track.count + 1);
                            }
                            const presentation = track.decodeDuration + offset;
                            track.minPresentation = Math.min(track.minPresentation, presentation);
                            track.maxBeforeLast = track.maxPresentation;
                            track.maxPresentation = Math.max(track.maxPresentation, presentation + duration);
                            track.lastPresentationEnd = presentation + duration;
                            track.durations.addRun(duration); track.sizes.add(size); track.count++;
                            track.decodeDuration += duration; dts += duration; byteCount += size;
                        }
                        if (!mdats.some(mdat => dataStart >= mdat.body && dataStart + byteCount <= mdat.end)) fail('样本数据超出 mdat');
                        track.chunkCount++; track.chunks.add(Math.floor(position / 0x100000000), position >>> 0);
                        if (track.lastChunkSize !== count) { track.chunkMap.add(track.chunkCount, count, 1); track.lastChunkSize = count; }
                        // A view: no init+fragment concatenation or per-packet data copies.
                        await append(data.subarray(dataStart, dataStart + byteCount)); mediaBytes += byteCount;
                    }
                }
            }
        },
        async finish() {
            active();
            const populated = [...tracks.values()].filter(track => track.count);
            if (!populated.length) fail('没有有效音视频样本');
            const origin = Math.min(...populated.map(track => (track.firstDts + track.minPresentation) / track.scale));
            const definitions = populated.map(track => trackBoxes(track, origin));
            const movieDuration = Math.max(...definitions.map(track => track.duration));
            const movie = durationBox(movieHeader, 'mvhd', movieDuration), maxId = Math.max(...populated.map(track => track.id));
            movie.parts[movie.parts.length - 1] = movie.parts.at(-1).slice();
            viewOf(movie.parts.at(-1)).setUint32(movie.parts.at(-1).byteLength - 4, maxId + 1);
            const mdatSize = position - mdatPosition;
            await emit(box('moov', movie, ...definitions.map(track => track.node)));
            active(); await sink.writeAt(new Uint8Array([...u32(1), ...ascii('mdat'), ...u64(mdatSize)]), mdatPosition);
            snapshot = stats(); tracks.clear(); state = 'finished';
        },
        getStats() { return snapshot || stats(); },
        dispose() { if (!snapshot) snapshot = stats(); tracks.clear(); state = 'disposed'; },
    };
}

return { createStandardMP4Writer };
});

return module.exports; })();
const FileOutput = (() => { const module = { exports: {} }; const exports = module.exports;
/* Transactional browser output and crash recovery; no session data is persisted. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayOutput = factory();
})(globalThis, function () {
'use strict';
const TEMP_PREFIX = 'replay-hls-';
const RECORD_PREFIX = 'PKU_REPLAY_SAVER_TEMP:';
const HANDOFF_DELAY = 5 * 60 * 1000;
const LEGACY_MAX_AGE = 24 * 60 * 60 * 1000;
let recoveryStarted = false;
let recoveryTask = null;

const lockName = (name) => `${RECORD_PREFIX}${name}`;
const warn = (error) => console.warn('[PKU-Replay-Saver] 清理 HLS 临时文件失败，将在页面恢复时重试', error);

function writeBytes(data) {
    // WebKit can write the entire backing buffer instead of a typed-array
    // view (https://bugs.webkit.org/show_bug.cgi?id=302733). Only copy views
    // that do not cover their buffer; one awaited write bounds extra memory.
    if (ArrayBuffer.isView(data) && (data.byteOffset || data.byteLength !== data.buffer.byteLength)) {
        const bytes = new Uint8Array(data.byteLength);
        bytes.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
        return bytes;
    }
    return data;
}

function writeChunk(chunk) {
    if (chunk?.type === 'write') return {...chunk, data: writeBytes(chunk.data)};
    return writeBytes(chunk);
}

function withCleanupFailure(error, cleanupError, cleanupRecovery = false) {
    const failure = new Error(error?.message || String(error), { cause: error });
    failure.name = error?.name || 'Error';
    failure.cleanupFailed = true;
    failure.cleanupError = cleanupError;
    failure.cleanupRecovery = cleanupRecovery;
    return failure;
}

async function removeTempFile(root, name) {
    try {
        await root.removeEntry(name);
    } catch (error) {
        if (error.name !== 'NotFoundError') throw error;
    }
    // Keep the record until removal succeeds, including failures caused by locks.
    localStorage.removeItem(RECORD_PREFIX + name);
}

async function acquireTempLock(name, signal) {
    let release;
    let acquired;
    let rejected;
    const ready = new Promise((resolve, reject) => { acquired = resolve; rejected = reject; });
    const held = new Promise((resolve) => { release = resolve; });
    const request = navigator.locks.request(lockName(name), { signal }, async () => {
        acquired();
        await held;
    });
    request.catch(rejected);
    await ready;
    return async () => { release(); await request; };
}

async function recoverTempFiles(root) {
    const names = new Set();
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(RECORD_PREFIX + TEMP_PREFIX)) names.add(key.slice(RECORD_PREFIX.length));
    }
    for await (const [name, handle] of root.entries()) {
        if (name.startsWith(TEMP_PREFIX) && handle.kind === 'file') names.add(name);
    }
    for (const name of names) {
        try {
            await navigator.locks.request(lockName(name), { ifAvailable: true }, async (lock) => {
                if (!lock) return; // Another tab is writing or waiting for download handoff.
                const raw = localStorage.getItem(RECORD_PREFIX + name);
                let record;
                try { record = raw ? JSON.parse(raw) : null; } catch { record = null; }
                if (record?.state === 'handoff' && (record.keepForever || record.deleteAfter > Date.now())) return;
                if (!raw) {
                    // Older scripts did not own a Web Lock: retain their original age limit.
                    try {
                        const handle = await root.getFileHandle(name);
                        const file = await handle.getFile();
                        const createdAt = Number(name.slice(TEMP_PREFIX.length).split('-')[0]);
                        if (Math.max(file.lastModified, createdAt || 0) > Date.now() - LEGACY_MAX_AGE) return;
                    } catch (error) {
                        if (error.name !== 'NotFoundError') throw error;
                    }
                }
                await removeTempFile(root, name);
            });
        } catch (error) { warn(error); }
    }
}

function recover() {
    if (!navigator.storage?.getDirectory || !navigator.locks?.request) return;
    if (!recoveryTask) {
        recoveryTask = navigator.storage.getDirectory().then(recoverTempFiles).catch(warn)
            .finally(() => { recoveryTask = null; });
    }
    return recoveryTask;
}

function startHlsTempCleanup() {
    if (recoveryStarted) return;
    recoveryStarted = true;
    void recover();
    window.addEventListener('pageshow', recover);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') void recover();
    });
    setInterval(recover, 60 * 1000);
}

// Directory permissions are kept only for this page, shared by all download jobs.
let destination, selectingDestination;
const destinationListeners = new Set(), reservedNames = new Set();
const pageWindow = () => typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
function destinationInfo() {
    const page = pageWindow();
    return {supported: page.top === page.self && typeof page.showDirectoryPicker === 'function', selected: Boolean(destination), name: destination?.name || ''};
}
function watchDestination(callback) { destinationListeners.add(callback); callback(destinationInfo()); return () => destinationListeners.delete(callback); }
function prepareDestination(change = false) {
    if (!destinationInfo().supported) return Promise.resolve(null);
    if (selectingDestination) return selectingDestination;
    if (destination && !change) return Promise.resolve(destination);
    // Invoke synchronously from the click; queued jobs reuse the granted handle.
    const request = pageWindow().showDirectoryPicker({id:'pku-replay-saver', mode:'readwrite', startIn:'downloads'});
    selectingDestination = Promise.resolve(request).then(handle => {
        destination = handle;
        for (const callback of destinationListeners) callback(destinationInfo());
        return handle;
    }).finally(() => { selectingDestination = null; });
    return selectingDestination;
}
async function nativeOutput(handle, signal, {fileName, remove, finish = () => {}} = {}) {
    let writable, closed = false, missing = false, abortTask, closeTask;
    const abort = () => closed ? Promise.resolve() : (abortTask ||= (async () => {
        if (closeTask) await closeTask.catch(() => {});
        if (closed) return;
        let failure;
        try { if (writable) await writable.abort(); } catch (error) { failure = error; }
        try { if (remove) await remove(); } catch (error) { failure = error; }
        finally { finish(); }
        if (failure) throw failure;
    })());
    try { signal.throwIfAborted(); writable = await handle.createWritable(); signal.throwIfAborted(); }
    catch (error) { try { await abort(); } catch (cleanupError) { throw withCleanupFailure(error, cleanupError); } throw error; }
    const write = chunk => {
        signal.throwIfAborted();
        if (abortTask) throw new DOMException('下载已取消', 'AbortError');
        return writable.write(writeChunk(chunk));
    };
    return {
        type: remove ? 'directory' : 'file-picker', fileName,
        get fileAvailable() { return closed && !missing; }, setRetention() {},
        async withFile(callback) {
            if (!closed) throw new Error('文件尚未保存完成');
            let file;try{file=await handle.getFile();}catch(error){if(error.name==='NotFoundError')missing=true;throw error;}
            return callback(file);
        },
        write, writeAt: (chunk, position) => write({type:'write',position,data:chunk}),
        async close() {
            signal.throwIfAborted(); if (abortTask) throw new DOMException('下载已取消', 'AbortError');
            closeTask = writable.close().then(() => { closed = true; finish(); }); await closeTask;
        }, abort,
    };
}
async function directoryOutput(fileName, signal) {
    const folder = destination; // A later directory change must not redirect this transaction.
    const dot = fileName.lastIndexOf('.'), stem = dot > 0 ? fileName.slice(0,dot) : fileName, extension = dot > 0 ? fileName.slice(dot) : '';
    let allocated, created = false, delegated = false;
    const remove = async () => { if (created) try { await folder.removeEntry(allocated); } catch (error) { if (error.name !== 'NotFoundError') throw error; } };
    try {
        for (let index = 1; ; index++) {
            signal.throwIfAborted();
            const name = index === 1 ? fileName : `${stem} (${index})${extension}`;
            if (reservedNames.has(name)) continue;
            reservedNames.add(name); allocated = name;
            try { await folder.getFileHandle(name); }
            catch (error) { if (error.name === 'NotFoundError') break; throw error; }
            reservedNames.delete(name); allocated = undefined;
        }
        signal.throwIfAborted(); created = true;
        const handle = await folder.getFileHandle(allocated, {create:true});
        delegated=true;
        return await nativeOutput(handle, signal, {fileName:allocated, remove, finish:()=>reservedNames.delete(allocated)});
    } catch (error) {
        if(delegated)throw error;
        try { await remove(); } catch (cleanupError) { throw withCleanupFailure(error, cleanupError); }
        finally { reservedNames.delete(allocated); }
        throw error;
    }
}
async function saveFile(file, fileName, signal) {
    signal.throwIfAborted();
    if (destination) {
        const format = /\.mp3$/i.test(fileName) ? 'mp3' : /\.m4a$/i.test(fileName) ? 'aac' : /\.ts$/i.test(fileName) ? 'ts' : 'mp4';
        const output = await createHlsOutput(fileName, format, signal);
        try {
            for (let offset=0;offset<file.size;offset+=8*1024*1024) await output.write(new Uint8Array(await file.slice(offset,offset+8*1024*1024).arrayBuffer()));
            await output.close(); return output;
        } catch (error) { try { await output.abort(); } catch (cleanupError) { throw withCleanupFailure(error,cleanupError); } throw error; }
    }
    const url=URL.createObjectURL(file),link=document.createElement('a');
    try { link.href=url;link.download=fileName;link.hidden=true;document.body.append(link);link.click(); }
    finally { link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000); }
}

async function createHlsOutput(fileName, format, signal, onHandoff, { browserDownload = false, cacheOnly = false, retentionMs = HANDOFF_DELAY } = {}) {
    const validateRetention = value => {
        if (!Number.isSafeInteger(value) || value < 0 || value > 86400000) throw new Error('无效的缓存保留时间');
        return value;
    };
    validateRetention(retentionMs);
    signal.throwIfAborted();
    // Call the picker on the real page window: the sandboxed `window` proxy fails
    // its brand check and throws "Illegal invocation".
    const page = pageWindow();
    if (destination && !cacheOnly) return directoryOutput(fileName, signal);
    if (!browserDownload && !cacheOnly && page.top === page.self && typeof page.showSaveFilePicker === 'function') {
        const handle = await page.showSaveFilePicker({
            suggestedName: fileName,
            types: [{
                description: format === 'mp3' ? 'MP3 音频' : format === 'aac' ? 'AAC 音频' : format !== 'ts' ? 'MP4 视频' : 'MPEG-TS 视频',
                accept: format === 'mp3' ? { 'audio/mpeg': ['.mp3'] } : format === 'aac' ? { 'audio/mp4': ['.m4a'] } : format !== 'ts' ? { 'video/mp4': ['.mp4'] } : { 'video/mp2t': ['.ts'] },
            }],
        });
        return nativeOutput(handle, signal, {fileName});
    }

    if (!navigator.storage?.getDirectory || !navigator.locks?.request) {
        throw new Error('当前浏览器不支持安全的大文件流式保存，请使用最新版 Chrome/Edge/Safari');
    }
    const root = await navigator.storage.getDirectory();
    signal.throwIfAborted();
    void recover();
    const name = `${TEMP_PREFIX}${Date.now()}-${crypto.randomUUID?.() || Math.random()}.${format}`;
    const release = await acquireTempLock(name, signal);
    let writable;
    let closed = false;
    let handedOff = false;
    let objectUrl;
    let abortTask;
    let cleanupTimer;
    let closeTask;
    let readers = 0, cleanupDue = false, removed = false, discardRequested = false;
    const revokeUrl = () => {
        try { if (objectUrl) { URL.revokeObjectURL(objectUrl); onHandoff?.(null); } }
        catch (error) { console.warn('[PKU-Replay-Saver] 释放下载链接失败', error); }
    };

    const cleanupAfterHandoff = async () => {
        if (readers) { cleanupDue = true; return; }
        try {
            revokeUrl(); await removeTempFile(root, name); removed = true;
        } catch (error) { warn(error); }
        finally { await release(); }
    };
    const rememberHandoff = state => {
        localStorage.setItem(RECORD_PREFIX + name, JSON.stringify({state,
            deleteAfter: retentionMs ? Date.now() + retentionMs : null, keepForever: retentionMs === 0}));
    };
    const scheduleCleanup = (state = 'handoff') => {
        rememberHandoff(state);
        clearTimeout(cleanupTimer); cleanupDue = false;
        if (retentionMs) cleanupTimer = setTimeout(cleanupAfterHandoff, retentionMs);
    };
    const abort = () => {
        if (handedOff) return Promise.resolve(); // A complete file is already offered to the browser.
        return abortTask ||= (async () => {
            let abortError;
            clearTimeout(cleanupTimer);
            try {
                // Wait for a pending commit before removal: it must not recreate the file later.
                if (closeTask) await closeTask.catch(() => {});
                if (writable && !closed) await writable.abort();
            } catch (error) { abortError = error; }
            try {
                revokeUrl();
                await removeTempFile(root, name);
                if (abortError) throw abortError;
            } finally { await release(); }
        })();
    };

    try {
        // Record ownership BEFORE creating a file: a crash during setup remains recoverable.
        localStorage.setItem(RECORD_PREFIX + name, JSON.stringify({ state: 'writing' }));
        signal.throwIfAborted();
        const handle = await root.getFileHandle(name, { create: true });
        signal.throwIfAborted();
        writable = await handle.createWritable();
        signal.throwIfAborted();
        const write = (chunk) => {
            signal.throwIfAborted();
            if (abortTask) throw new DOMException('下载已取消', 'AbortError');
            return writable.write(writeChunk(chunk));
        };
        return {
            type: 'browser-download',
            get fileAvailable() { return handedOff && !removed; },
            setRetention(value) {
                retentionMs = validateRetention(value);
                if (handedOff && !removed) scheduleCleanup();
            },
            async dispose() {
                if (removed) return;
                clearTimeout(cleanupTimer);discardRequested=true;cleanupDue=true;
                // Clear an infinite retention preference before attempting deletion.
                try { localStorage.setItem(RECORD_PREFIX + name, JSON.stringify({state:'cleanup'})); }
                catch (error) { warn(error); }
                if(readers)return; // The last reader/lease completes this cleanup.
                try { revokeUrl(); await removeTempFile(root,name); removed=true; }
                catch (error) { throw withCleanupFailure(error,error,true); }
                finally { await release(); }
            },
            holdHandoff() {
                if (!handedOff || removed) throw new DOMException('视频临时副本已清理', 'NotFoundError');
                readers++;
                let released = false;
                return async () => {
                    if (released) return; released = true;
                    try {
                        // Restart the selected retention window after use.
                        if(!discardRequested)scheduleCleanup();
                    } finally {
                        readers--; if (!readers && cleanupDue) await cleanupAfterHandoff();
                    }
                };
            },
            async withFile(callback) {
                if (!handedOff || removed) throw new DOMException('视频临时副本已清理', 'NotFoundError');
                readers++;
                try { return await callback(await handle.getFile()); }
                finally { readers--; if (!readers && cleanupDue) await cleanupAfterHandoff(); }
            },
            write,
            writeAt: (chunk, position) => write({ type: 'write', position, data: chunk }),
            async close() {
                signal.throwIfAborted();
                if (abortTask) throw new DOMException('下载已取消', 'AbortError');
                closeTask = writable.close().then(() => { closed = true; });
                await closeTask;
                signal.throwIfAborted();
                if (cacheOnly) {
                    scheduleCleanup(); handedOff = true; return;
                }
                const file = await handle.getFile();
                signal.throwIfAborted();
                objectUrl = URL.createObjectURL(file);
                onHandoff?.(objectUrl);
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = fileName;
                link.style.display = 'none';
                // Arrange cleanup before touching the DOM so handoff errors cannot strand the lock.
                scheduleCleanup('prepared');
                try {
                    document.body.appendChild(link);
                    link.click();
                    // Only a successful handoff may opt out of crash cleanup.
                    // If this write fails, the prepared record remains reclaimable.
                    rememberHandoff('handoff');
                    handedOff = true;
                } finally {
                    try { link.remove(); }
                    catch (error) { console.warn('[PKU-Replay-Saver] 移除下载链接失败', error); }
                }
            },
            abort,
        };
    } catch (error) {
        try { await abort(); } catch (cleanupError) { throw withCleanupFailure(error, cleanupError, true); }
        throw error;
    }
}

return { createHlsOutput, startHlsTempCleanup, withCleanupFailure, prepareDestination, destinationInfo, watchDestination, saveFile };
});

return module.exports; })();
const mp3EncoderFactory = (() => {
function lamejs(){function X(c){return new Int32Array(c)}function K(c){return new Float32Array(c)}function ca(c){if(1==c.length)return K(c[0]);var k=c[0];c=c.slice(1);for(var n=[],u=0;u<k;u++)n.push(ca(c));return n}function Ia(c){if(1==c.length)return X(c[0]);var k=c[0];c=c.slice(1);for(var n=[],u=0;u<k;u++)n.push(Ia(c));return n}function dc(c){if(1==c.length)return new Int16Array(c[0]);var k=c[0];c=c.slice(1);for(var n=[],u=0;u<k;u++)n.push(dc(c));return n}function Ob(c){if(1==c.length)return Array(c[0]);
var k=c[0];c=c.slice(1);for(var n=[],u=0;u<k;u++)n.push(Ob(c));return n}function ra(c){this.ordinal=c}function G(c){this.ordinal=c}function la(c){this.ordinal=function(){return c}}function mc(){this.getLameVersion=function(){return"3.98.4"};this.getLameShortVersion=function(){return"3.98.4"};this.getLameVeryShortVersion=function(){return"LAME3.98r"};this.getPsyVersion=function(){return"0.93"};this.getLameUrl=function(){return"http://www.mp3dev.org/"};this.getLameOsBitness=function(){return"32bits"}}
function Y(){function c(f,b,c,a,m,k){for(;0!=m--;)c[a]=1E-10+f[b+0]*k[0]-c[a-1]*k[1]+f[b-1]*k[2]-c[a-2]*k[3]+f[b-2]*k[4]-c[a-3]*k[5]+f[b-3]*k[6]-c[a-4]*k[7]+f[b-4]*k[8]-c[a-5]*k[9]+f[b-5]*k[10]-c[a-6]*k[11]+f[b-6]*k[12]-c[a-7]*k[13]+f[b-7]*k[14]-c[a-8]*k[15]+f[b-8]*k[16]-c[a-9]*k[17]+f[b-9]*k[18]-c[a-10]*k[19]+f[b-10]*k[20],++a,++b}function k(f,b,c,a,m,k){for(;0!=m--;)c[a]=f[b+0]*k[0]-c[a-1]*k[1]+f[b-1]*k[2]-c[a-2]*k[3]+f[b-2]*k[4],++a,++b}function n(f){return f*f}var V=Y.RMS_WINDOW_TIME_NUMERATOR,
E=Y.RMS_WINDOW_TIME_DENOMINATOR,B=[[.038575994352,-3.84664617118067,-.02160367184185,7.81501653005538,-.00123395316851,-11.34170355132042,-9.291677959E-5,13.05504219327545,-.01655260341619,-12.28759895145294,.02161526843274,9.4829380631979,-.02074045215285,-5.87257861775999,.00594298065125,2.75465861874613,.00306428023191,-.86984376593551,1.2025322027E-4,.13919314567432,.00288463683916],[.0541865640643,-3.47845948550071,-.02911007808948,6.36317777566148,-.00848709379851,-8.54751527471874,-.00851165645469,
9.4769360780128,-.00834990904936,-8.81498681370155,.02245293253339,6.85401540936998,-.02596338512915,-4.39470996079559,.01624864962975,2.19611684890774,-.00240879051584,-.75104302451432,.00674613682247,.13149317958808,-.00187763777362],[.15457299681924,-2.37898834973084,-.09331049056315,2.84868151156327,-.06247880153653,-2.64577170229825,.02163541888798,2.23697657451713,-.05588393329856,-1.67148153367602,.04781476674921,1.00595954808547,.00222312597743,-.45953458054983,.03174092540049,.16378164858596,
-.01390589421898,-.05032077717131,.00651420667831,.0234789740702,-.00881362733839],[.30296907319327,-1.61273165137247,-.22613988682123,1.0797749225997,-.08587323730772,-.2565625775407,.03282930172664,-.1627671912044,-.00915702933434,-.22638893773906,-.02364141202522,.39120800788284,-.00584456039913,-.22138138954925,.06276101321749,.04500235387352,-8.28086748E-6,.02005851806501,.00205861885564,.00302439095741,-.02950134983287],[.33642304856132,-1.49858979367799,-.2557224142557,.87350271418188,-.11828570177555,
.12205022308084,.11921148675203,-.80774944671438,-.07834489609479,.47854794562326,-.0046997791438,-.12453458140019,-.0058950022444,-.04067510197014,.05724228140351,.08333755284107,.00832043980773,-.04237348025746,-.0163538138454,.02977207319925,-.0176017656815],[.4491525660845,-.62820619233671,-.14351757464547,.29661783706366,-.22784394429749,-.372563729424,-.01419140100551,.00213767857124,.04078262797139,-.42029820170918,-.12398163381748,.22199650564824,.04097565135648,.00613424350682,.10478503600251,
.06747620744683,-.01863887810927,.05784820375801,-.03193428438915,.03222754072173,.00541907748707],[.56619470757641,-1.04800335126349,-.75464456939302,.29156311971249,.1624213774223,-.26806001042947,.16744243493672,.00819999645858,-.18901604199609,.45054734505008,.3093178284183,-.33032403314006,-.27562961986224,.0673936833311,.00647310677246,-.04784254229033,.08647503780351,.01639907836189,-.0378898455484,.01807364323573,-.00588215443421],[.58100494960553,-.51035327095184,-.53174909058578,-.31863563325245,
-.14289799034253,-.20256413484477,.17520704835522,.1472815413433,.02377945217615,.38952639978999,.15558449135573,-.23313271880868,-.25344790059353,-.05246019024463,.01628462406333,-.02505961724053,.06920467763959,.02442357316099,-.03721611395801,.01818801111503,-.00749618797172],[.53648789255105,-.2504987195602,-.42163034350696,-.43193942311114,-.00275953611929,-.03424681017675,.04267842219415,-.04678328784242,-.10214864179676,.26408300200955,.14590772289388,.15113130533216,-.02459864859345,-.17556493366449,
-.11202315195388,-.18823009262115,-.04060034127,.05477720428674,.0478866554818,.0470440968812,-.02217936801134]],w=[[.98621192462708,-1.97223372919527,-1.97242384925416,.97261396931306,.98621192462708],[.98500175787242,-1.96977855582618,-1.97000351574484,.9702284756635,.98500175787242],[.97938932735214,-1.95835380975398,-1.95877865470428,.95920349965459,.97938932735214],[.97531843204928,-1.95002759149878,-1.95063686409857,.95124613669835,.97531843204928],[.97316523498161,-1.94561023566527,-1.94633046996323,
.94705070426118,.97316523498161],[.96454515552826,-1.92783286977036,-1.92909031105652,.93034775234268,.96454515552826],[.96009142950541,-1.91858953033784,-1.92018285901082,.92177618768381,.96009142950541],[.95856916599601,-1.9154210807478,-1.91713833199203,.91885558323625,.95856916599601],[.94597685600279,-1.88903307939452,-1.89195371200558,.89487434461664,.94597685600279]];this.InitGainAnalysis=function(f,b){a:{for(var c=0;c<MAX_ORDER;c++)f.linprebuf[c]=f.lstepbuf[c]=f.loutbuf[c]=f.rinprebuf[c]=
f.rstepbuf[c]=f.routbuf[c]=0;switch(0|b){case 48E3:f.reqindex=0;break;case 44100:f.reqindex=1;break;case 32E3:f.reqindex=2;break;case 24E3:f.reqindex=3;break;case 22050:f.reqindex=4;break;case 16E3:f.reqindex=5;break;case 12E3:f.reqindex=6;break;case 11025:f.reqindex=7;break;case 8E3:f.reqindex=8;break;default:b=INIT_GAIN_ANALYSIS_ERROR;break a}f.sampleWindow=0|(b*V+E-1)/E;f.lsum=0;f.rsum=0;f.totsamp=0;na.ill(f.A,0);b=INIT_GAIN_ANALYSIS_OK}if(b!=INIT_GAIN_ANALYSIS_OK)return INIT_GAIN_ANALYSIS_ERROR;
f.linpre=MAX_ORDER;f.rinpre=MAX_ORDER;f.lstep=MAX_ORDER;f.rstep=MAX_ORDER;f.lout=MAX_ORDER;f.rout=MAX_ORDER;na.fill(f.B,0);return INIT_GAIN_ANALYSIS_OK};this.AnalyzeSamples=function(f,b,v,a,m,u,e){if(0==u)return GAIN_ANALYSIS_OK;var l=0;var d=u;switch(e){case 1:a=b;m=v;break;case 2:break;default:return GAIN_ANALYSIS_ERROR}u<MAX_ORDER?(T.arraycopy(b,v,f.linprebuf,MAX_ORDER,u),T.arraycopy(a,m,f.rinprebuf,MAX_ORDER,u)):(T.arraycopy(b,v,f.linprebuf,MAX_ORDER,MAX_ORDER),T.arraycopy(a,m,f.rinprebuf,MAX_ORDER,
MAX_ORDER));for(;0<d;){var g=d>f.sampleWindow-f.totsamp?f.sampleWindow-f.totsamp:d;if(l<MAX_ORDER){e=f.linpre+l;var q=f.linprebuf;var D=f.rinpre+l;var p=f.rinprebuf;g>MAX_ORDER-l&&(g=MAX_ORDER-l)}else e=v+l,q=b,D=m+l,p=a;c(q,e,f.lstepbuf,f.lstep+f.totsamp,g,B[f.reqindex]);c(p,D,f.rstepbuf,f.rstep+f.totsamp,g,B[f.reqindex]);k(f.lstepbuf,f.lstep+f.totsamp,f.loutbuf,f.lout+f.totsamp,g,w[f.reqindex]);k(f.rstepbuf,f.rstep+f.totsamp,f.routbuf,f.rout+f.totsamp,g,w[f.reqindex]);e=f.lout+f.totsamp;q=f.loutbuf;
D=f.rout+f.totsamp;p=f.routbuf;for(var r=g%8;0!=r--;)f.lsum+=n(q[e++]),f.rsum+=n(p[D++]);for(r=g/8;0!=r--;)f.lsum+=n(q[e+0])+n(q[e+1])+n(q[e+2])+n(q[e+3])+n(q[e+4])+n(q[e+5])+n(q[e+6])+n(q[e+7]),e+=8,f.rsum+=n(p[D+0])+n(p[D+1])+n(p[D+2])+n(p[D+3])+n(p[D+4])+n(p[D+5])+n(p[D+6])+n(p[D+7]),D+=8;d-=g;l+=g;f.totsamp+=g;f.totsamp==f.sampleWindow&&(e=10*Y.STEPS_per_dB*Math.log10((f.lsum+f.rsum)/f.totsamp*.5+1E-37),e=0>=e?0:0|e,e>=f.A.length&&(e=f.A.length-1),f.A[e]++,f.lsum=f.rsum=0,T.arraycopy(f.loutbuf,
f.totsamp,f.loutbuf,0,MAX_ORDER),T.arraycopy(f.routbuf,f.totsamp,f.routbuf,0,MAX_ORDER),T.arraycopy(f.lstepbuf,f.totsamp,f.lstepbuf,0,MAX_ORDER),T.arraycopy(f.rstepbuf,f.totsamp,f.rstepbuf,0,MAX_ORDER),f.totsamp=0);if(f.totsamp>f.sampleWindow)return GAIN_ANALYSIS_ERROR}u<MAX_ORDER?(T.arraycopy(f.linprebuf,u,f.linprebuf,0,MAX_ORDER-u),T.arraycopy(f.rinprebuf,u,f.rinprebuf,0,MAX_ORDER-u),T.arraycopy(b,v,f.linprebuf,MAX_ORDER-u,u),T.arraycopy(a,m,f.rinprebuf,MAX_ORDER-u,u)):(T.arraycopy(b,v+u-MAX_ORDER,
f.linprebuf,0,MAX_ORDER),T.arraycopy(a,m+u-MAX_ORDER,f.rinprebuf,0,MAX_ORDER));return GAIN_ANALYSIS_OK};this.GetTitleGain=function(f){var b=f.A;var c=f.A.length,a,m=0;for(a=0;a<c;a++)m+=b[a];if(0==m)b=GAIN_NOT_ENOUGH_SAMPLES;else{m=0|Math.ceil(m*(1-.95));for(a=c;0<a--&&!(0>=(m-=b[a])););b=64.82-a/Y.STEPS_per_dB}for(c=0;c<f.A.length;c++)f.B[c]+=f.A[c],f.A[c]=0;for(c=0;c<MAX_ORDER;c++)f.linprebuf[c]=f.lstepbuf[c]=f.loutbuf[c]=f.rinprebuf[c]=f.rstepbuf[c]=f.routbuf[c]=0;f.totsamp=0;f.lsum=f.rsum=0;return b}}
function wc(){function c(b,c,a,f,k,e,l,d,g,q,D,p,r,t,J){this.vbr_q=b;this.quant_comp=c;this.quant_comp_s=a;this.expY=f;this.st_lrm=k;this.st_s=e;this.masking_adj=l;this.masking_adj_short=d;this.ath_lower=g;this.ath_curve=q;this.ath_sensitivity=D;this.interch=p;this.safejoint=r;this.sfb21mod=t;this.msfix=J}function k(b,c,a,f,k,e,l,d,g,q,D,p,r,t){this.quant_comp=c;this.quant_comp_s=a;this.safejoint=f;this.nsmsfix=k;this.st_lrm=e;this.st_s=l;this.nsbass=d;this.scale=g;this.masking_adj=q;this.ath_lower=
D;this.ath_curve=p;this.interch=r;this.sfscale=t}function n(b,c,a){var f=b.VBR==G.vbr_rh?B:w,k=b.VBR_q_frac,e=f[c];f=f[c+1];e.st_lrm+=k*(f.st_lrm-e.st_lrm);e.st_s+=k*(f.st_s-e.st_s);e.masking_adj+=k*(f.masking_adj-e.masking_adj);e.masking_adj_short+=k*(f.masking_adj_short-e.masking_adj_short);e.ath_lower+=k*(f.ath_lower-e.ath_lower);e.ath_curve+=k*(f.ath_curve-e.ath_curve);e.ath_sensitivity+=k*(f.ath_sensitivity-e.ath_sensitivity);e.interch+=k*(f.interch-e.interch);e.msfix+=k*(f.msfix-e.msfix);f=
e.vbr_q;0>f&&(f=0);9<f&&(f=9);b.VBR_q=f;b.VBR_q_frac=0;0!=a?b.quant_comp=e.quant_comp:0<Math.abs(b.quant_comp- -1)||(b.quant_comp=e.quant_comp);0!=a?b.quant_comp_short=e.quant_comp_s:0<Math.abs(b.quant_comp_short- -1)||(b.quant_comp_short=e.quant_comp_s);0!=e.expY&&(b.experimentalY=0!=e.expY);0!=a?b.internal_flags.nsPsy.attackthre=e.st_lrm:0<Math.abs(b.internal_flags.nsPsy.attackthre- -1)||(b.internal_flags.nsPsy.attackthre=e.st_lrm);0!=a?b.internal_flags.nsPsy.attackthre_s=e.st_s:0<Math.abs(b.internal_flags.nsPsy.attackthre_s-
-1)||(b.internal_flags.nsPsy.attackthre_s=e.st_s);0!=a?b.maskingadjust=e.masking_adj:0<Math.abs(b.maskingadjust-0)||(b.maskingadjust=e.masking_adj);0!=a?b.maskingadjust_short=e.masking_adj_short:0<Math.abs(b.maskingadjust_short-0)||(b.maskingadjust_short=e.masking_adj_short);0!=a?b.ATHlower=-e.ath_lower/10:0<Math.abs(10*-b.ATHlower)||(b.ATHlower=-e.ath_lower/10);0!=a?b.ATHcurve=e.ath_curve:0<Math.abs(b.ATHcurve- -1)||(b.ATHcurve=e.ath_curve);0!=a?b.athaa_sensitivity=e.ath_sensitivity:0<Math.abs(b.athaa_sensitivity-
-1)||(b.athaa_sensitivity=e.ath_sensitivity);0<e.interch&&(0!=a?b.interChRatio=e.interch:0<Math.abs(b.interChRatio- -1)||(b.interChRatio=e.interch));0<e.safejoint&&(b.exp_nspsytune|=e.safejoint);0<e.sfb21mod&&(b.exp_nspsytune|=e.sfb21mod<<20);0!=a?b.msfix=e.msfix:0<Math.abs(b.msfix- -1)||(b.msfix=e.msfix);0==a&&(b.VBR_q=c,b.VBR_q_frac=k)}function V(b,c,a){var m=E.nearestBitrateFullIndex(c);b.VBR=G.vbr_abr;b.VBR_mean_bitrate_kbps=c;b.VBR_mean_bitrate_kbps=Math.min(b.VBR_mean_bitrate_kbps,320);b.VBR_mean_bitrate_kbps=
Math.max(b.VBR_mean_bitrate_kbps,8);b.brate=b.VBR_mean_bitrate_kbps;320<b.VBR_mean_bitrate_kbps&&(b.disable_reservoir=!0);0<f[m].safejoint&&(b.exp_nspsytune|=2);0<f[m].sfscale&&(b.internal_flags.noise_shaping=2);if(0<Math.abs(f[m].nsbass)){var k=int(4*f[m].nsbass);0>k&&(k+=64);b.exp_nspsytune|=k<<2}0!=a?b.quant_comp=f[m].quant_comp:0<Math.abs(b.quant_comp- -1)||(b.quant_comp=f[m].quant_comp);0!=a?b.quant_comp_short=f[m].quant_comp_s:0<Math.abs(b.quant_comp_short- -1)||(b.quant_comp_short=f[m].quant_comp_s);
0!=a?b.msfix=f[m].nsmsfix:0<Math.abs(b.msfix- -1)||(b.msfix=f[m].nsmsfix);0!=a?b.internal_flags.nsPsy.attackthre=f[m].st_lrm:0<Math.abs(b.internal_flags.nsPsy.attackthre- -1)||(b.internal_flags.nsPsy.attackthre=f[m].st_lrm);0!=a?b.internal_flags.nsPsy.attackthre_s=f[m].st_s:0<Math.abs(b.internal_flags.nsPsy.attackthre_s- -1)||(b.internal_flags.nsPsy.attackthre_s=f[m].st_s);0!=a?b.scale=f[m].scale:0<Math.abs(b.scale- -1)||(b.scale=f[m].scale);0!=a?b.maskingadjust=f[m].masking_adj:0<Math.abs(b.maskingadjust-
0)||(b.maskingadjust=f[m].masking_adj);0<f[m].masking_adj?0!=a?b.maskingadjust_short=.9*f[m].masking_adj:0<Math.abs(b.maskingadjust_short-0)||(b.maskingadjust_short=.9*f[m].masking_adj):0!=a?b.maskingadjust_short=1.1*f[m].masking_adj:0<Math.abs(b.maskingadjust_short-0)||(b.maskingadjust_short=1.1*f[m].masking_adj);0!=a?b.ATHlower=-f[m].ath_lower/10:0<Math.abs(10*-b.ATHlower)||(b.ATHlower=-f[m].ath_lower/10);0!=a?b.ATHcurve=f[m].ath_curve:0<Math.abs(b.ATHcurve- -1)||(b.ATHcurve=f[m].ath_curve);0!=
a?b.interChRatio=f[m].interch:0<Math.abs(b.interChRatio- -1)||(b.interChRatio=f[m].interch);return c}var E;this.setModules=function(b){E=b};var B=[new c(0,9,9,0,5.2,125,-4.2,-6.3,4.8,1,0,0,2,21,.97),new c(1,9,9,0,5.3,125,-3.6,-5.6,4.5,1.5,0,0,2,21,1.35),new c(2,9,9,0,5.6,125,-2.2,-3.5,2.8,2,0,0,2,21,1.49),new c(3,9,9,1,5.8,130,-1.8,-2.8,2.6,3,-4,0,2,20,1.64),new c(4,9,9,1,6,135,-.7,-1.1,1.1,3.5,-8,0,2,0,1.79),new c(5,9,9,1,6.4,140,.5,.4,-7.5,4,-12,2E-4,0,0,1.95),new c(6,9,9,1,6.6,145,.67,.65,-14.7,
6.5,-19,4E-4,0,0,2.3),new c(7,9,9,1,6.6,145,.8,.75,-19.7,8,-22,6E-4,0,0,2.7),new c(8,9,9,1,6.6,145,1.2,1.15,-27.5,10,-23,7E-4,0,0,0),new c(9,9,9,1,6.6,145,1.6,1.6,-36,11,-25,8E-4,0,0,0),new c(10,9,9,1,6.6,145,2,2,-36,12,-25,8E-4,0,0,0)],w=[new c(0,9,9,0,4.2,25,-7,-4,7.5,1,0,0,2,26,.97),new c(1,9,9,0,4.2,25,-5.6,-3.6,4.5,1.5,0,0,2,21,1.35),new c(2,9,9,0,4.2,25,-4.4,-1.8,2,2,0,0,2,18,1.49),new c(3,9,9,1,4.2,25,-3.4,-1.25,1.1,3,-4,0,2,15,1.64),new c(4,9,9,1,4.2,25,-2.2,.1,0,3.5,-8,0,2,0,1.79),new c(5,
9,9,1,4.2,25,-1,1.65,-7.7,4,-12,2E-4,0,0,1.95),new c(6,9,9,1,4.2,25,-0,2.47,-7.7,6.5,-19,4E-4,0,0,2),new c(7,9,9,1,4.2,25,.5,2,-14.5,8,-22,6E-4,0,0,2),new c(8,9,9,1,4.2,25,1,2.4,-22,10,-23,7E-4,0,0,2),new c(9,9,9,1,4.2,25,1.5,2.95,-30,11,-25,8E-4,0,0,2),new c(10,9,9,1,4.2,25,2,2.95,-36,12,-30,8E-4,0,0,2)],f=[new k(8,9,9,0,0,6.6,145,0,.95,0,-30,11,.0012,1),new k(16,9,9,0,0,6.6,145,0,.95,0,-25,11,.001,1),new k(24,9,9,0,0,6.6,145,0,.95,0,-20,11,.001,1),new k(32,9,9,0,0,6.6,145,0,.95,0,-15,11,.001,1),
new k(40,9,9,0,0,6.6,145,0,.95,0,-10,11,9E-4,1),new k(48,9,9,0,0,6.6,145,0,.95,0,-10,11,9E-4,1),new k(56,9,9,0,0,6.6,145,0,.95,0,-6,11,8E-4,1),new k(64,9,9,0,0,6.6,145,0,.95,0,-2,11,8E-4,1),new k(80,9,9,0,0,6.6,145,0,.95,0,0,8,7E-4,1),new k(96,9,9,0,2.5,6.6,145,0,.95,0,1,5.5,6E-4,1),new k(112,9,9,0,2.25,6.6,145,0,.95,0,2,4.5,5E-4,1),new k(128,9,9,0,1.95,6.4,140,0,.95,0,3,4,2E-4,1),new k(160,9,9,1,1.79,6,135,0,.95,-2,5,3.5,0,1),new k(192,9,9,1,1.49,5.6,125,0,.97,-4,7,3,0,0),new k(224,9,9,1,1.25,5.2,
125,0,.98,-6,9,2,0,0),new k(256,9,9,1,.97,5.2,125,0,1,-8,10,1,0,0),new k(320,9,9,1,.9,5.2,125,0,1,-10,12,0,0,0)];this.apply_preset=function(b,c,a){switch(c){case W.R3MIX:c=W.V3;b.VBR=G.vbr_mtrh;break;case W.MEDIUM:c=W.V4;b.VBR=G.vbr_rh;break;case W.MEDIUM_FAST:c=W.V4;b.VBR=G.vbr_mtrh;break;case W.STANDARD:c=W.V2;b.VBR=G.vbr_rh;break;case W.STANDARD_FAST:c=W.V2;b.VBR=G.vbr_mtrh;break;case W.EXTREME:c=W.V0;b.VBR=G.vbr_rh;break;case W.EXTREME_FAST:c=W.V0;b.VBR=G.vbr_mtrh;break;case W.INSANE:return c=
320,b.preset=c,V(b,c,a),b.VBR=G.vbr_off,c}b.preset=c;switch(c){case W.V9:return n(b,9,a),c;case W.V8:return n(b,8,a),c;case W.V7:return n(b,7,a),c;case W.V6:return n(b,6,a),c;case W.V5:return n(b,5,a),c;case W.V4:return n(b,4,a),c;case W.V3:return n(b,3,a),c;case W.V2:return n(b,2,a),c;case W.V1:return n(b,1,a),c;case W.V0:return n(b,0,a),c}if(8<=c&&320>=c)return V(b,c,a);b.preset=0;return c}}function qb(){function u(a){this.bits=0|a}function k(a,d,p,b,e,c){d=.5946/d;for(a>>=1;0!=a--;)e[c++]=d>p[b++]?
0:1,e[c++]=d>p[b++]?0:1}function n(a,d,b,e,c,l){a>>=1;var h=a%2;for(a>>=1;0!=a--;){var p=b[e++]*d;var r=b[e++]*d;var t=0|p;var f=b[e++]*d;var g=0|r;var J=b[e++]*d;var D=0|f;p+=B.adj43[t];t=0|J;r+=B.adj43[g];c[l++]=0|p;f+=B.adj43[D];c[l++]=0|r;J+=B.adj43[t];c[l++]=0|f;c[l++]=0|J}0!=h&&(p=b[e++]*d,r=b[e++]*d,p+=B.adj43[0|p],r+=B.adj43[0|r],c[l++]=0|p,c[l++]=0|r)}function V(a,d,b,e){var p,c=d,h=p=0;do{var r=a[c++],l=a[c++];p<r&&(p=r);h<l&&(h=l)}while(c<b);p<h&&(p=h);switch(p){case 0:return p;case 1:c=
d;d=0;p=w.ht[1].hlen;do h=2*a[c+0]+a[c+1],c+=2,d+=p[h];while(c<b);e.bits+=d;return 1;case 2:case 3:c=d;d=f[p-1];p=0;h=w.ht[d].xlen;r=2==d?w.table23:w.table56;do l=a[c+0]*h+a[c+1],c+=2,p+=r[l];while(c<b);a=p&65535;p>>=16;p>a&&(p=a,d++);e.bits+=p;return d;case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:c=d;d=f[p-1];r=h=p=0;l=w.ht[d].xlen;var g=w.ht[d].hlen,D=w.ht[d+1].hlen,q=w.ht[d+2].hlen;do{var m=a[c+0]*l+a[c+1];c+=2;p+=g[m];h+=D[m];r+=q[m]}while(c<b);a=d;
p>h&&(p=h,a++);p>r&&(p=r,a=d+2);e.bits+=p;return a;default:if(p>ia.IXMAX_VAL)return e.bits=ia.LARGE_BITS,-1;p-=15;for(c=24;32>c&&!(w.ht[c].linmax>=p);c++);for(h=c-8;24>h&&!(w.ht[h].linmax>=p);h++);p=h;r=65536*w.ht[p].xlen+w.ht[c].xlen;h=0;do l=a[d++],g=a[d++],0!=l&&(14<l&&(l=15,h+=r),l*=16),0!=g&&(14<g&&(g=15,h+=r),l+=g),h+=w.largetbl[l];while(d<b);a=h&65535;h>>=16;h>a&&(h=a,p=c);e.bits+=h;return p}}function E(a,d,p,b,e,l,h,g){for(var r=d.big_values,f=2;f<c.SBMAX_l+1;f++){var x=a.scalefac_band.l[f];
if(x>=r)break;var t=e[f-2]+d.count1bits;if(p.part2_3_length<=t)break;t=new u(t);x=V(b,x,r,t);t=t.bits;p.part2_3_length<=t||(p.assign(d),p.part2_3_length=t,p.region0_count=l[f-2],p.region1_count=f-2-l[f-2],p.table_select[0]=h[f-2],p.table_select[1]=g[f-2],p.table_select[2]=x)}}var B=null;this.qupvt=null;this.setModules=function(a){B=this.qupvt=a};var ha=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,1],[1,1],[1,1],[1,2],[2,2],[2,3],[2,3],[3,4],[3,4],[3,4],[4,5],[4,5],[4,6],[5,6],[5,6],[5,7],[6,7],[6,7]],f=[1,2,
5,7,7,10,10,13,13,13,13,13,13,13,13];this.noquant_count_bits=function(a,d,p){var b=d.l3_enc,e=Math.min(576,d.max_nonzero_coeff+2>>1<<1);null!=p&&(p.sfb_count1=0);for(;1<e&&0==(b[e-1]|b[e-2]);e-=2);d.count1=e;for(var l=0,h=0;3<e&&!(1<((b[e-1]|b[e-2]|b[e-3]|b[e-4])&2147483647));e-=4){var f=2*(2*(2*b[e-4]+b[e-3])+b[e-2])+b[e-1];l+=w.t32l[f];h+=w.t33l[f]}f=l;d.count1table_select=0;l>h&&(f=h,d.count1table_select=1);d.count1bits=f;d.big_values=e;if(0==e)return f;d.block_type==c.SHORT_TYPE?(l=3*a.scalefac_band.s[3],
l>d.big_values&&(l=d.big_values),h=d.big_values):d.block_type==c.NORM_TYPE?(l=d.region0_count=a.bv_scf[e-2],h=d.region1_count=a.bv_scf[e-1],h=a.scalefac_band.l[l+h+2],l=a.scalefac_band.l[l+1],h<e&&(f=new u(f),d.table_select[2]=V(b,h,e,f),f=f.bits)):(d.region0_count=7,d.region1_count=c.SBMAX_l-1-7-1,l=a.scalefac_band.l[8],h=e,l>h&&(l=h));l=Math.min(l,e);h=Math.min(h,e);0<l&&(f=new u(f),d.table_select[0]=V(b,0,l,f),f=f.bits);l<h&&(f=new u(f),d.table_select[1]=V(b,l,h,f),f=f.bits);2==a.use_best_huffman&&
(d.part2_3_length=f,best_huffman_divide(a,d),f=d.part2_3_length);if(null!=p&&d.block_type==c.NORM_TYPE){for(b=0;a.scalefac_band.l[b]<d.big_values;)b++;p.sfb_count1=b}return f};this.count_bits=function(a,d,e,b){var p=e.l3_enc,l=ia.IXMAX_VAL/B.IPOW20(e.global_gain);if(e.xrpow_max>l)return ia.LARGE_BITS;l=B.IPOW20(e.global_gain);var h,f=0,g=0,r=0,D=0,m=0,q=p,v=0,C=d,I=0;var Q=null!=b&&e.global_gain==b.global_gain;var S=e.block_type==c.SHORT_TYPE?38:21;for(h=0;h<=S;h++){var u=-1;if(Q||e.block_type==c.NORM_TYPE)u=
e.global_gain-(e.scalefac[h]+(0!=e.preflag?B.pretab[h]:0)<<e.scalefac_scale+1)-8*e.subblock_gain[e.window[h]];if(Q&&b.step[h]==u)0!=g&&(n(g,l,C,I,q,v),g=0),0!=r&&(k(r,l,C,I,q,v),r=0);else{var Z=e.width[h];f+e.width[h]>e.max_nonzero_coeff&&(h=e.max_nonzero_coeff-f+1,na.fill(p,e.max_nonzero_coeff,576,0),Z=h,0>Z&&(Z=0),h=S+1);0==g&&0==r&&(q=p,v=m,C=d,I=D);null!=b&&0<b.sfb_count1&&h>=b.sfb_count1&&0<b.step[h]&&u>=b.step[h]?(0!=g&&(n(g,l,C,I,q,v),g=0,q=p,v=m,C=d,I=D),r+=Z):(0!=r&&(k(r,l,C,I,q,v),r=0,q=
p,v=m,C=d,I=D),g+=Z);if(0>=Z){0!=r&&(k(r,l,C,I,q,v),r=0);0!=g&&(n(g,l,C,I,q,v),g=0);break}}h<=S&&(m+=e.width[h],D+=e.width[h],f+=e.width[h])}0!=g&&n(g,l,C,I,q,v);0!=r&&k(r,l,C,I,q,v);if(0!=(a.substep_shaping&2))for(l=0,S=.634521682242439/B.IPOW20(e.global_gain+e.scalefac_scale),f=0;f<e.sfbmax;f++)if(Q=e.width[f],0==a.pseudohalf[f])l+=Q;else for(g=l,l+=Q;g<l;++g)p[g]=d[g]>=S?p[g]:0;return this.noquant_count_bits(a,e,b)};this.best_huffman_divide=function(a,d){var e=new rb,b=d.l3_enc,l=X(23),f=X(23),
h=X(23),g=X(23);if(d.block_type!=c.SHORT_TYPE||1!=a.mode_gr){e.assign(d);if(d.block_type==c.NORM_TYPE){for(var y=d.big_values,m=0;22>=m;m++)l[m]=ia.LARGE_BITS;for(m=0;16>m;m++){var D=a.scalefac_band.l[m+1];if(D>=y)break;var q=0,k=new u(q),v=V(b,0,D,k);q=k.bits;for(var C=0;8>C;C++){var I=a.scalefac_band.l[m+C+2];if(I>=y)break;k=q;k=new u(k);I=V(b,D,I,k);k=k.bits;l[m+C]>k&&(l[m+C]=k,f[m+C]=m,h[m+C]=v,g[m+C]=I)}}E(a,e,d,b,l,f,h,g)}y=e.big_values;if(!(0==y||1<(b[y-2]|b[y-1])||(y=d.count1+2,576<y))){e.assign(d);
e.count1=y;for(D=m=0;y>e.big_values;y-=4)q=2*(2*(2*b[y-4]+b[y-3])+b[y-2])+b[y-1],m+=w.t32l[q],D+=w.t33l[q];e.big_values=y;e.count1table_select=0;m>D&&(m=D,e.count1table_select=1);e.count1bits=m;e.block_type==c.NORM_TYPE?E(a,e,d,b,l,f,h,g):(e.part2_3_length=m,m=a.scalefac_band.l[8],m>y&&(m=y),0<m&&(a=new u(e.part2_3_length),e.table_select[0]=V(b,0,m,a),e.part2_3_length=a.bits),y>m&&(a=new u(e.part2_3_length),e.table_select[1]=V(b,m,y,a),e.part2_3_length=a.bits),d.part2_3_length>e.part2_3_length&&d.assign(e))}}};
var b=[1,1,1,1,8,2,2,2,4,4,4,8,8,8,16,16],v=[1,2,4,8,1,2,4,8,2,4,8,2,4,8,4,8],a=[0,0,0,0,3,1,1,1,2,2,2,3,3,3,4,4],m=[0,1,2,3,0,1,2,3,1,2,3,1,2,3,2,3];qb.slen1_tab=a;qb.slen2_tab=m;this.best_scalefac_store=function(d,e,p,l){var f=l.tt[e][p],g,h,r=0;for(g=h=0;g<f.sfbmax;g++){var y=f.width[g];h+=y;for(y=-y;0>y&&0==f.l3_enc[y+h];y++);0==y&&(f.scalefac[g]=r=-2)}if(0==f.scalefac_scale&&0==f.preflag){for(g=h=0;g<f.sfbmax;g++)0<f.scalefac[g]&&(h|=f.scalefac[g]);if(0==(h&1)&&0!=h){for(g=0;g<f.sfbmax;g++)0<
f.scalefac[g]&&(f.scalefac[g]>>=1);f.scalefac_scale=r=1}}if(0==f.preflag&&f.block_type!=c.SHORT_TYPE&&2==d.mode_gr){for(g=11;g<c.SBPSY_l&&!(f.scalefac[g]<B.pretab[g]&&-2!=f.scalefac[g]);g++);if(g==c.SBPSY_l){for(g=11;g<c.SBPSY_l;g++)0<f.scalefac[g]&&(f.scalefac[g]-=B.pretab[g]);f.preflag=r=1}}for(g=0;4>g;g++)l.scfsi[p][g]=0;if(2==d.mode_gr&&1==e&&l.tt[0][p].block_type!=c.SHORT_TYPE&&l.tt[1][p].block_type!=c.SHORT_TYPE){e=l.tt[1][p];h=l.tt[0][p];for(r=0;r<w.scfsi_band.length-1;r++){for(g=w.scfsi_band[r];g<
w.scfsi_band[r+1]&&!(h.scalefac[g]!=e.scalefac[g]&&0<=e.scalefac[g]);g++);if(g==w.scfsi_band[r+1]){for(g=w.scfsi_band[r];g<w.scfsi_band[r+1];g++)e.scalefac[g]=-1;l.scfsi[p][r]=1}}for(g=l=p=0;11>g;g++)-1!=e.scalefac[g]&&(l++,p<e.scalefac[g]&&(p=e.scalefac[g]));for(y=h=0;g<c.SBPSY_l;g++)-1!=e.scalefac[g]&&(y++,h<e.scalefac[g]&&(h=e.scalefac[g]));for(r=0;16>r;r++)p<b[r]&&h<v[r]&&(g=a[r]*l+m[r]*y,e.part2_length>g&&(e.part2_length=g,e.scalefac_compress=r));r=0}for(g=0;g<f.sfbmax;g++)-2==f.scalefac[g]&&
(f.scalefac[g]=0);0!=r&&(2==d.mode_gr?this.scale_bitcount(f):this.scale_bitcount_lsf(d,f))};var z=[0,18,36,54,54,36,54,72,54,72,90,72,90,108,108,126],e=[0,18,36,54,51,35,53,71,52,70,88,69,87,105,104,122],l=[0,10,20,30,33,21,31,41,32,42,52,43,53,63,64,74];this.scale_bitcount=function(a){var d,g=0,f=0,t=a.scalefac;if(a.block_type==c.SHORT_TYPE){var m=z;0!=a.mixed_block_flag&&(m=e)}else if(m=l,0==a.preflag){for(d=11;d<c.SBPSY_l&&!(t[d]<B.pretab[d]);d++);if(d==c.SBPSY_l)for(a.preflag=1,d=11;d<c.SBPSY_l;d++)t[d]-=
B.pretab[d]}for(d=0;d<a.sfbdivide;d++)g<t[d]&&(g=t[d]);for(;d<a.sfbmax;d++)f<t[d]&&(f=t[d]);a.part2_length=ia.LARGE_BITS;for(d=0;16>d;d++)g<b[d]&&f<v[d]&&a.part2_length>m[d]&&(a.part2_length=m[d],a.scalefac_compress=d);return a.part2_length==ia.LARGE_BITS};var d=[[15,15,7,7],[15,15,7,0],[7,3,0,0],[15,31,31,0],[7,7,7,0],[3,3,0,0]];this.scale_bitcount_lsf=function(a,e){var b,f,l,m,h=X(4),x=e.scalefac;a=0!=e.preflag?2:0;for(l=0;4>l;l++)h[l]=0;if(e.block_type==c.SHORT_TYPE){var y=1;var k=B.nr_of_sfb_block[a][y];
for(b=m=0;4>b;b++){var q=k[b]/3;for(l=0;l<q;l++,m++)for(f=0;3>f;f++)x[3*m+f]>h[b]&&(h[b]=x[3*m+f])}}else for(y=0,k=B.nr_of_sfb_block[a][y],b=m=0;4>b;b++)for(q=k[b],l=0;l<q;l++,m++)x[m]>h[b]&&(h[b]=x[m]);q=!1;for(b=0;4>b;b++)h[b]>d[a][b]&&(q=!0);if(!q){e.sfb_partition_table=B.nr_of_sfb_block[a][y];for(b=0;4>b;b++)e.slen[b]=g[h[b]];y=e.slen[0];b=e.slen[1];h=e.slen[2];f=e.slen[3];switch(a){case 0:e.scalefac_compress=(5*y+b<<4)+(h<<2)+f;break;case 1:e.scalefac_compress=400+(5*y+b<<2)+h;break;case 2:e.scalefac_compress=
500+3*y+b;break;default:T.err.printf("intensity stereo not implemented yet\n")}}if(!q)for(b=e.part2_length=0;4>b;b++)e.part2_length+=e.slen[b]*e.sfb_partition_table[b];return q};var g=[0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];this.huffman_init=function(a){for(var d=2;576>=d;d+=2){for(var e=0,b;a.scalefac_band.l[++e]<d;);for(b=ha[e][0];a.scalefac_band.l[b+1]>d;)b--;0>b&&(b=ha[e][0]);a.bv_scf[d-2]=b;for(b=ha[e][1];a.scalefac_band.l[b+a.bv_scf[d-2]+2]>d;)b--;0>b&&(b=ha[e][1]);a.bv_scf[d-1]=b}}}function xc(){var c;
this.setModules=function(k){c=k};this.ResvFrameBegin=function(k,n){var u=k.internal_flags,E=u.l3_side,B=c.getframebits(k);n.bits=(B-8*u.sideinfo_len)/u.mode_gr;var w=2048*u.mode_gr-8;if(320<k.brate)var f=8*int(1E3*k.brate/(k.out_samplerate/1152)/8+.5);else f=11520,k.strict_ISO&&(f=8*int(32E4/(k.out_samplerate/1152)/8+.5));u.ResvMax=f-B;u.ResvMax>w&&(u.ResvMax=w);if(0>u.ResvMax||k.disable_reservoir)u.ResvMax=0;k=n.bits*u.mode_gr+Math.min(u.ResvSize,u.ResvMax);k>f&&(k=f);E.resvDrain_pre=0;null!=u.pinfo&&
(u.pinfo.mean_bits=n.bits/2,u.pinfo.resvsize=u.ResvSize);return k};this.ResvMaxBits=function(c,n,u,E){var k=c.internal_flags,w=k.ResvSize,f=k.ResvMax;0!=E&&(w+=n);0!=(k.substep_shaping&1)&&(f*=.9);u.bits=n;10*w>9*f?(E=w-9*f/10,u.bits+=E,k.substep_shaping|=128):(E=0,k.substep_shaping&=127,c.disable_reservoir||0!=(k.substep_shaping&1)||(u.bits-=.1*n));c=w<6*k.ResvMax/10?w:6*k.ResvMax/10;c-=E;0>c&&(c=0);return c};this.ResvAdjust=function(c,n){c.ResvSize-=n.part2_3_length+n.part2_length};this.ResvFrameEnd=
function(c,n){var k,u=c.l3_side;c.ResvSize+=n*c.mode_gr;n=0;u.resvDrain_post=0;u.resvDrain_pre=0;0!=(k=c.ResvSize%8)&&(n+=k);k=c.ResvSize-n-c.ResvMax;0<k&&(n+=k);k=Math.min(8*u.main_data_begin,n)/8;u.resvDrain_pre+=8*k;n-=8*k;c.ResvSize-=8*k;u.main_data_begin-=k;u.resvDrain_post+=n;c.ResvSize-=n}}function qa(){function u(a,e,b){for(;0<b;){if(0==D){D=8;q++;if(a.header[a.w_ptr].write_timing==g){var c=a;T.arraycopy(c.header[c.w_ptr].buf,0,d,q,c.sideinfo_len);q+=c.sideinfo_len;g+=8*c.sideinfo_len;c.w_ptr=
c.w_ptr+1&da.MAX_HEADER_BUF-1}d[q]=0}c=Math.min(b,D);b-=c;D-=c;d[q]|=e>>b<<D;g+=c}}function k(a,d){var b=a.internal_flags,c;8<=d&&(u(b,76,8),d-=8);8<=d&&(u(b,65,8),d-=8);8<=d&&(u(b,77,8),d-=8);8<=d&&(u(b,69,8),d-=8);if(32<=d){var h=e.getLameShortVersion();if(32<=d)for(c=0;c<h.length&&8<=d;++c)d-=8,u(b,h.charAt(c),8)}for(;1<=d;--d)u(b,b.ancillary_flag,1),b.ancillary_flag^=a.disable_reservoir?0:1}function n(a,d,e){for(var b=a.header[a.h_ptr].ptr;0<e;){var h=Math.min(e,8-(b&7));e-=h;a.header[a.h_ptr].buf[b>>
3]|=d>>e<<8-(b&7)-h;b+=h}a.header[a.h_ptr].ptr=b}function V(a,d){a<<=8;for(var e=0;8>e;e++)a<<=1,d<<=1,0!=((d^a)&65536)&&(d^=32773);return d}function E(a,d){var e=w.ht[d.count1table_select+32],b,h=0,c=d.big_values,g=d.big_values;for(b=(d.count1-d.big_values)/4;0<b;--b){var l=0,f=0;var p=d.l3_enc[c+0];0!=p&&(f+=8,0>d.xr[g+0]&&l++);p=d.l3_enc[c+1];0!=p&&(f+=4,l*=2,0>d.xr[g+1]&&l++);p=d.l3_enc[c+2];0!=p&&(f+=2,l*=2,0>d.xr[g+2]&&l++);p=d.l3_enc[c+3];0!=p&&(f++,l*=2,0>d.xr[g+3]&&l++);c+=4;g+=4;u(a,l+e.table[f],
e.hlen[f]);h+=e.hlen[f]}return h}function B(a,d,e,b,h){var c=w.ht[d],g=0;if(0==d)return g;for(;e<b;e+=2){var l=0,f=0,p=c.xlen,r=c.xlen,m=0,C=h.l3_enc[e],k=h.l3_enc[e+1];0!=C&&(0>h.xr[e]&&m++,l--);15<d&&(14<C&&(m|=C-15<<1,f=p,C=15),14<k&&(r=k-15,m<<=p,m|=r,f+=p,k=15),r=16);0!=k&&(m<<=1,0>h.xr[e+1]&&m++,l--);C=C*r+k;f-=l;l+=c.hlen[C];u(a,c.table[C],l);u(a,m,f);g+=l+f}return g}function K(a,d){var e=3*a.scalefac_band.s[3];e>d.big_values&&(e=d.big_values);var b=B(a,d.table_select[0],0,e,d);return b+=B(a,
d.table_select[1],e,d.big_values,d)}function f(a,d){var e=d.big_values;var b=d.region0_count+1;var h=a.scalefac_band.l[b];b+=d.region1_count+1;var c=a.scalefac_band.l[b];h>e&&(h=e);c>e&&(c=e);b=B(a,d.table_select[0],0,h,d);b+=B(a,d.table_select[1],h,c,d);return b+=B(a,d.table_select[2],c,e,d)}function b(){this.total=0}function v(d,e){var b=d.internal_flags;var c=b.w_ptr;var h=b.h_ptr-1;-1==h&&(h=da.MAX_HEADER_BUF-1);var l=b.header[h].write_timing-g;e.total=l;if(0<=l){var f=1+h-c;h<c&&(f=1+h-c+da.MAX_HEADER_BUF);
l-=8*f*b.sideinfo_len}d=a.getframebits(d);l+=d;e.total+=d;e.total=0!=e.total%8?1+e.total/8:e.total/8;e.total+=q+1;0>l&&T.err.println("strange error flushing buffer ... \n");return l}var a=this,m=null,z=null,e=null,l=null;this.setModules=function(a,d,b,c){m=a;z=d;e=b;l=c};var d=null,g=0,q=0,D=0;this.getframebits=function(a){var d=a.internal_flags;return 8*(0|72E3*(a.version+1)*(0!=d.bitrate_index?w.bitrate_table[a.version][d.bitrate_index]:a.brate)/a.out_samplerate+d.padding)};this.CRC_writeheader=
function(a,d){var e=V(d[2]&255,65535);e=V(d[3]&255,e);for(var b=6;b<a.sideinfo_len;b++)e=V(d[b]&255,e);d[4]=byte(e>>8);d[5]=byte(e&255)};this.flush_bitstream=function(a){var d=a.internal_flags,e;var c=d.l3_side;0>(e=v(a,new b))||(k(a,e),d.ResvSize=0,c.main_data_begin=0,d.findReplayGain&&(c=m.GetTitleGain(d.rgdata),d.RadioGain=Math.floor(10*c+.5)|0),d.findPeakSample&&(d.noclipGainChange=Math.ceil(200*Math.log10(d.PeakSample/32767))|0,0<d.noclipGainChange?EQ(a.scale,1)||EQ(a.scale,0)?d.noclipScale=
Math.floor(32767/d.PeakSample*100)/100:d.noclipScale=-1:d.noclipScale=-1))};this.add_dummy_byte=function(a,e,b){a=a.internal_flags;for(var c;0<b--;){c=e;for(var h=8;0<h;){0==D&&(D=8,q++,d[q]=0);var l=Math.min(h,D);h-=l;D-=l;d[q]|=c>>h<<D;g+=l}for(c=0;c<da.MAX_HEADER_BUF;++c)a.header[c].write_timing+=8}};this.format_bitstream=function(a){var d=a.internal_flags;var e=d.l3_side;var l=this.getframebits(a);k(a,e.resvDrain_pre);var h=a.internal_flags,p,y;var m=h.l3_side;h.header[h.h_ptr].ptr=0;na.fill(h.header[h.h_ptr].buf,
0,h.sideinfo_len,0);16E3>a.out_samplerate?n(h,4094,12):n(h,4095,12);n(h,a.version,1);n(h,1,2);n(h,a.error_protection?0:1,1);n(h,h.bitrate_index,4);n(h,h.samplerate_index,2);n(h,h.padding,1);n(h,a.extension,1);n(h,a.mode.ordinal(),2);n(h,h.mode_ext,2);n(h,a.copyright,1);n(h,a.original,1);n(h,a.emphasis,2);a.error_protection&&n(h,0,16);if(1==a.version){n(h,m.main_data_begin,9);2==h.channels_out?n(h,m.private_bits,3):n(h,m.private_bits,5);for(y=0;y<h.channels_out;y++)for(p=0;4>p;p++)n(h,m.scfsi[y][p],
1);for(p=0;2>p;p++)for(y=0;y<h.channels_out;y++){var q=m.tt[p][y];n(h,q.part2_3_length+q.part2_length,12);n(h,q.big_values/2,9);n(h,q.global_gain,8);n(h,q.scalefac_compress,4);q.block_type!=c.NORM_TYPE?(n(h,1,1),n(h,q.block_type,2),n(h,q.mixed_block_flag,1),14==q.table_select[0]&&(q.table_select[0]=16),n(h,q.table_select[0],5),14==q.table_select[1]&&(q.table_select[1]=16),n(h,q.table_select[1],5),n(h,q.subblock_gain[0],3),n(h,q.subblock_gain[1],3),n(h,q.subblock_gain[2],3)):(n(h,0,1),14==q.table_select[0]&&
(q.table_select[0]=16),n(h,q.table_select[0],5),14==q.table_select[1]&&(q.table_select[1]=16),n(h,q.table_select[1],5),14==q.table_select[2]&&(q.table_select[2]=16),n(h,q.table_select[2],5),n(h,q.region0_count,4),n(h,q.region1_count,3));n(h,q.preflag,1);n(h,q.scalefac_scale,1);n(h,q.count1table_select,1)}}else for(n(h,m.main_data_begin,8),n(h,m.private_bits,h.channels_out),y=p=0;y<h.channels_out;y++)q=m.tt[p][y],n(h,q.part2_3_length+q.part2_length,12),n(h,q.big_values/2,9),n(h,q.global_gain,8),n(h,
q.scalefac_compress,9),q.block_type!=c.NORM_TYPE?(n(h,1,1),n(h,q.block_type,2),n(h,q.mixed_block_flag,1),14==q.table_select[0]&&(q.table_select[0]=16),n(h,q.table_select[0],5),14==q.table_select[1]&&(q.table_select[1]=16),n(h,q.table_select[1],5),n(h,q.subblock_gain[0],3),n(h,q.subblock_gain[1],3),n(h,q.subblock_gain[2],3)):(n(h,0,1),14==q.table_select[0]&&(q.table_select[0]=16),n(h,q.table_select[0],5),14==q.table_select[1]&&(q.table_select[1]=16),n(h,q.table_select[1],5),14==q.table_select[2]&&
(q.table_select[2]=16),n(h,q.table_select[2],5),n(h,q.region0_count,4),n(h,q.region1_count,3)),n(h,q.scalefac_scale,1),n(h,q.count1table_select,1);a.error_protection&&CRC_writeheader(h,h.header[h.h_ptr].buf);m=h.h_ptr;h.h_ptr=m+1&da.MAX_HEADER_BUF-1;h.header[h.h_ptr].write_timing=h.header[m].write_timing+l;h.h_ptr==h.w_ptr&&T.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n");h=8*d.sideinfo_len;var D=0,B=a.internal_flags,z=B.l3_side;if(1==a.version)for(m=0;2>m;m++)for(y=0;y<B.channels_out;y++){var C=
z.tt[m][y],I=qb.slen1_tab[C.scalefac_compress],Q=qb.slen2_tab[C.scalefac_compress];for(p=q=0;p<C.sfbdivide;p++)-1!=C.scalefac[p]&&(u(B,C.scalefac[p],I),q+=I);for(;p<C.sfbmax;p++)-1!=C.scalefac[p]&&(u(B,C.scalefac[p],Q),q+=Q);q=C.block_type==c.SHORT_TYPE?q+K(B,C):q+f(B,C);q+=E(B,C);D+=q}else for(y=m=0;y<B.channels_out;y++){C=z.tt[m][y];var S=0;Q=p=q=0;if(C.block_type==c.SHORT_TYPE){for(;4>Q;Q++){var w=C.sfb_partition_table[Q]/3,Z=C.slen[Q];for(I=0;I<w;I++,p++)u(B,Math.max(C.scalefac[3*p],0),Z),u(B,
Math.max(C.scalefac[3*p+1],0),Z),u(B,Math.max(C.scalefac[3*p+2],0),Z),S+=3*Z}q+=K(B,C)}else{for(;4>Q;Q++)for(w=C.sfb_partition_table[Q],Z=C.slen[Q],I=0;I<w;I++,p++)u(B,Math.max(C.scalefac[p],0),Z),S+=Z;q+=f(B,C)}q+=E(B,C);D+=S+q}h+=D;k(a,e.resvDrain_post);h+=e.resvDrain_post;e.main_data_begin+=(l-h)/8;v(a,new b)!=d.ResvSize&&T.err.println("Internal buffer inconsistency. flushbits <> ResvSize");8*e.main_data_begin!=d.ResvSize&&(T.err.printf("bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n",
8*e.main_data_begin,d.ResvSize,e.resvDrain_post,e.resvDrain_pre,8*d.sideinfo_len,h-e.resvDrain_post-8*d.sideinfo_len,h,h%8,l),T.err.println("This is a fatal error.  It has several possible causes:"),T.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"),T.err.println(" 9%%  Your system is overclocked"),T.err.println(" 1%%  bug in LAME encoding library"),d.ResvSize=8*e.main_data_begin);if(1E9<g){for(a=0;a<da.MAX_HEADER_BUF;++a)d.header[a].write_timing-=g;g=0}return 0};
this.copy_buffer=function(a,e,b,c,h){var g=q+1;if(0>=g)return 0;if(0!=c&&g>c)return-1;T.arraycopy(d,0,e,b,g);q=-1;D=0;if(0!=h&&(c=X(1),c[0]=a.nMusicCRC,l.updateMusicCRC(c,e,b,g),a.nMusicCRC=c[0],0<g&&(a.VBR_seek_table.nBytesWritten+=g),a.decode_on_the_fly)){c=ca([2,1152]);h=g;for(var f=-1,p;0!=f;)if(f=z.hip_decode1_unclipped(a.hip,e,b,h,c[0],c[1]),h=0,-1==f&&(f=0),0<f){if(a.findPeakSample){for(p=0;p<f;p++)c[0][p]>a.PeakSample?a.PeakSample=c[0][p]:-c[0][p]>a.PeakSample&&(a.PeakSample=-c[0][p]);if(1<
a.channels_out)for(p=0;p<f;p++)c[1][p]>a.PeakSample?a.PeakSample=c[1][p]:-c[1][p]>a.PeakSample&&(a.PeakSample=-c[1][p])}if(a.findReplayGain&&m.AnalyzeSamples(a.rgdata,c[0],0,c[1],0,f,a.channels_out)==Y.GAIN_ANALYSIS_ERROR)return-6}}return g};this.init_bit_stream_w=function(a){d=new Int8Array(W.LAME_MAXMP3BUFFER);a.h_ptr=a.w_ptr=0;a.header[a.h_ptr].write_timing=0;q=-1;g=D=0}}function zb(){function c(a,b){var d=a[b+0]&255;d=d<<8|a[b+1]&255;d=d<<8|a[b+2]&255;return d=d<<8|a[b+3]&255}function k(a,b,d){a[b+
0]=d>>24&255;a[b+1]=d>>16&255;a[b+2]=d>>8&255;a[b+3]=d&255}function n(a,b,d){a[b+0]=d>>8&255;a[b+1]=d&255}function V(a,b,d){return 255&(a<<b|d&~(-1<<b))}function E(a,b){var d=a.internal_flags;b[0]=V(b[0],8,255);b[1]=V(b[1],3,7);b[1]=V(b[1],1,16E3>a.out_samplerate?0:1);b[1]=V(b[1],1,a.version);b[1]=V(b[1],2,1);b[1]=V(b[1],1,a.error_protection?0:1);b[2]=V(b[2],4,d.bitrate_index);b[2]=V(b[2],2,d.samplerate_index);b[2]=V(b[2],1,0);b[2]=V(b[2],1,a.extension);b[3]=V(b[3],2,a.mode.ordinal());b[3]=V(b[3],
2,d.mode_ext);b[3]=V(b[3],1,a.copyright);b[3]=V(b[3],1,a.original);b[3]=V(b[3],2,a.emphasis);b[0]=255;d=b[1]&241;var e=1==a.version?128:16E3>a.out_samplerate?32:64;a.VBR==G.vbr_off&&(e=a.brate);e=a.free_format?0:255&16*K.BitrateIndex(e,a.version,a.out_samplerate);b[1]=1==a.version?255&(d|10):255&(d|2);d=b[2]&13;b[2]=255&(e|d)}function B(a,b){return b=b>>8^z[(b^a)&255]}var K,f,b;this.setModules=function(a,c,d){K=a;f=c;b=d};var v=zb.NUMTOCENTRIES,a=zb.MAXFRAMESIZE,m=v+4+4+4+4+4+9+1+1+8+1+1+3+1+1+2+
4+2+2,z=[0,49345,49537,320,49921,960,640,49729,50689,1728,1920,51009,1280,50625,50305,1088,52225,3264,3456,52545,3840,53185,52865,3648,2560,51905,52097,2880,51457,2496,2176,51265,55297,6336,6528,55617,6912,56257,55937,6720,7680,57025,57217,8E3,56577,7616,7296,56385,5120,54465,54657,5440,55041,6080,5760,54849,53761,4800,4992,54081,4352,53697,53377,4160,61441,12480,12672,61761,13056,62401,62081,12864,13824,63169,63361,14144,62721,13760,13440,62529,15360,64705,64897,15680,65281,16320,16E3,65089,64001,
15040,15232,64321,14592,63937,63617,14400,10240,59585,59777,10560,60161,11200,10880,59969,60929,11968,12160,61249,11520,60865,60545,11328,58369,9408,9600,58689,9984,59329,59009,9792,8704,58049,58241,9024,57601,8640,8320,57409,40961,24768,24960,41281,25344,41921,41601,25152,26112,42689,42881,26432,42241,26048,25728,42049,27648,44225,44417,27968,44801,28608,28288,44609,43521,27328,27520,43841,26880,43457,43137,26688,30720,47297,47489,31040,47873,31680,31360,47681,48641,32448,32640,48961,32E3,48577,
48257,31808,46081,29888,30080,46401,30464,47041,46721,30272,29184,45761,45953,29504,45313,29120,28800,45121,20480,37057,37249,20800,37633,21440,21120,37441,38401,22208,22400,38721,21760,38337,38017,21568,39937,23744,23936,40257,24320,40897,40577,24128,23040,39617,39809,23360,39169,22976,22656,38977,34817,18624,18816,35137,19200,35777,35457,19008,19968,36545,36737,20288,36097,19904,19584,35905,17408,33985,34177,17728,34561,18368,18048,34369,33281,17088,17280,33601,16640,33217,32897,16448];this.addVbrFrame=
function(a){var b=a.internal_flags;var d=b.VBR_seek_table;a=w.bitrate_table[a.version][b.bitrate_index];d.nVbrNumFrames++;d.sum+=a;d.seen++;if(!(d.seen<d.want)&&(d.pos<d.size&&(d.bag[d.pos]=d.sum,d.pos++,d.seen=0),d.pos==d.size)){for(a=1;a<d.size;a+=2)d.bag[a/2]=d.bag[a];d.want*=2;d.pos/=2}};this.getVbrTag=function(a){var b=new VBRTagData,d=0;b.flags=0;var e=a[d+1]>>3&1,f=a[d+2]>>2&3,m=a[d+3]>>6&3,p=a[d+2]>>4&15;p=w.bitrate_table[e][p];b.samprate=14==a[d+1]>>4?w.samplerate_table[2][f]:w.samplerate_table[e][f];
f=d=0!=e?3!=m?d+36:d+21:3!=m?d+21:d+13;if(!(new String(a,f,4(),null)).equals("Xing")&&!(new String(a,f,4(),null)).equals("Info"))return null;d+=4;b.hId=e;f=b.flags=c(a,d);d+=4;0!=(f&1)&&(b.frames=c(a,d),d+=4);0!=(f&2)&&(b.bytes=c(a,d),d+=4);if(0!=(f&4)){if(null!=b.toc)for(m=0;m<v;m++)b.toc[m]=a[d+m];d+=v}b.vbrScale=-1;0!=(f&8)&&(b.vbrScale=c(a,d),d+=4);b.headersize=72E3*(e+1)*p/b.samprate;d+=21;e=a[d+0]<<4;e+=a[d+1]>>4;p=(a[d+1]&15)<<8;p+=a[d+2]&255;if(0>e||3E3<e)e=-1;if(0>p||3E3<p)p=-1;b.encDelay=
e;b.encPadding=p;return b};this.InitVbrTag=function(b){var e=b.internal_flags;var d=1==b.version?128:16E3>b.out_samplerate?32:64;b.VBR==G.vbr_off&&(d=b.brate);d=72E3*(b.version+1)*d/b.out_samplerate;var c=e.sideinfo_len+m;e.VBR_seek_table.TotalFrameSize=d;if(d<c||d>a)b.bWriteVbrTag=!1;else for(e.VBR_seek_table.nVbrNumFrames=0,e.VBR_seek_table.nBytesWritten=0,e.VBR_seek_table.sum=0,e.VBR_seek_table.seen=0,e.VBR_seek_table.want=1,e.VBR_seek_table.pos=0,null==e.VBR_seek_table.bag&&(e.VBR_seek_table.bag=
new int[400],e.VBR_seek_table.size=400),d=new Int8Array(a),E(b,d),e=e.VBR_seek_table.TotalFrameSize,c=0;c<e;++c)f.add_dummy_byte(b,d[c]&255,1)};this.updateMusicCRC=function(a,b,d,c){for(var e=0;e<c;++e)a[0]=B(b[d+e],a[0])};this.getLameTagFrame=function(a,c){var d=a.internal_flags;if(!a.bWriteVbrTag||d.Class_ID!=W.LAME_ID||0>=d.VBR_seek_table.pos)return 0;if(c.length<d.VBR_seek_table.TotalFrameSize)return d.VBR_seek_table.TotalFrameSize;na.fill(c,0,d.VBR_seek_table.TotalFrameSize,0);E(a,c);var e=new Int8Array(v);
if(a.free_format)for(var l=1;l<v;++l)e[l]=255&255*l/100;else{var m=d.VBR_seek_table;if(!(0>=m.pos))for(l=1;l<v;++l){var p=0|Math.floor(l/v*m.pos);p>m.pos-1&&(p=m.pos-1);p=0|256*m.bag[p]/m.sum;255<p&&(p=255);e[l]=255&p}}p=d.sideinfo_len;a.error_protection&&(p-=2);c[p++]=0;c[p++]=0;c[p++]=0;c[p++]=0;k(c,p,15);p+=4;k(c,p,d.VBR_seek_table.nVbrNumFrames);p+=4;m=d.VBR_seek_table.nBytesWritten+d.VBR_seek_table.TotalFrameSize;k(c,p,0|m);p+=4;T.arraycopy(e,0,c,p,e.length);p+=e.length;a.error_protection&&f.CRC_writeheader(d,
c);var r=0;for(l=0;l<p;l++)r=B(c[l],r);e=p;l=r;var t=a.internal_flags;p=0;r=a.encoder_delay;var u=a.encoder_padding,h=100-10*a.VBR_q-a.quality,x=b.getLameVeryShortVersion();var y=[1,5,3,2,4,0,3];var A=0|(255<a.lowpassfreq/100+.5?255:a.lowpassfreq/100+.5),z=0,w=0,O=a.internal_flags.noise_shaping,F=0,C,I=0!=(a.exp_nspsytune&1);var Q=0!=(a.exp_nspsytune&2);var S=C=!1,ma=a.internal_flags.nogap_total,Z=a.internal_flags.nogap_current,L=a.ATHtype;switch(a.VBR){case vbr_abr:var V=a.VBR_mean_bitrate_kbps;
break;case vbr_off:V=a.brate;break;default:V=a.VBR_min_bitrate_kbps}y=0+(a.VBR.ordinal()<y.length?y[a.VBR.ordinal()]:0);t.findReplayGain&&(510<t.RadioGain&&(t.RadioGain=510),-510>t.RadioGain&&(t.RadioGain=-510),w=11264,w=0<=t.RadioGain?w|t.RadioGain:w|512|-t.RadioGain);t.findPeakSample&&(z=Math.abs(0|t.PeakSample/32767*Math.pow(2,23)+.5));-1!=ma&&(0<Z&&(S=!0),Z<ma-1&&(C=!0));I=L+((I?1:0)<<4)+((Q?1:0)<<5)+((C?1:0)<<6)+((S?1:0)<<7);0>h&&(h=0);switch(a.mode){case MONO:Q=0;break;case STEREO:Q=1;break;
case DUAL_CHANNEL:Q=2;break;case JOINT_STEREO:Q=a.force_ms?4:3;break;default:Q=7}C=32E3>=a.in_samplerate?0:48E3==a.in_samplerate?2:48E3<a.in_samplerate?3:1;if(a.short_blocks==ra.short_block_forced||a.short_blocks==ra.short_block_dispensed||-1==a.lowpassfreq&&-1==a.highpassfreq||a.scale_left<a.scale_right||a.scale_left>a.scale_right||a.disable_reservoir&&320>a.brate||a.noATH||a.ATHonly||0==L||32E3>=a.in_samplerate)F=1;O=O+(Q<<2)+(F<<5)+(C<<6);t=t.nMusicCRC;k(c,e+p,h);p+=4;for(h=0;9>h;h++)c[e+p+h]=
255&x.charAt(h);p+=9;c[e+p]=255&y;p++;c[e+p]=255&A;p++;k(c,e+p,z);p+=4;n(c,e+p,w);p+=2;n(c,e+p,0);p+=2;c[e+p]=255&I;p++;c[e+p]=255<=V?255:255&V;p++;c[e+p]=255&r>>4;c[e+p+1]=255&(r<<4)+(u>>8);c[e+p+2]=255&u;p+=3;c[e+p]=255&O;p++;c[e+p++]=0;n(c,e+p,a.preset);p+=2;k(c,e+p,m);p+=4;n(c,e+p,t);p+=2;for(a=0;a<p;a++)l=B(c[e+a],l);n(c,e+p,l);return d.VBR_seek_table.TotalFrameSize};this.putVbrTag=function(b,c){if(0>=b.internal_flags.VBR_seek_table.pos)return-1;c.seek(c.length());if(0==c.length())return-1;c.seek(0);
var d=new Int8Array(10);c.readFully(d);d=(new String(d,"ISO-8859-1")).startsWith("ID3")?0:((d[6]&127)<<21|(d[7]&127)<<14|(d[8]&127)<<7|d[9]&127)+d.length;c.seek(d);d=new Int8Array(a);b=getLameTagFrame(b,d);if(b>d.length)return-1;if(1>b)return 0;c.write(d,0,b);return 0}}function U(c,k,n,w){this.xlen=c;this.linmax=k;this.table=n;this.hlen=w}function xa(c){this.bits=c}function yc(){this.setModules=function(c,k){}}function sb(){this.bits=this.over_SSD=this.over_count=this.max_noise=this.tot_noise=this.over_noise=
0}function zc(){this.scale_right=this.scale_left=this.scale=this.out_samplerate=this.in_samplerate=this.num_channels=this.num_samples=this.class_id=0;this.decode_only=this.bWriteVbrTag=this.analysis=!1;this.quality=0;this.mode=la.STEREO;this.write_id3tag_automatic=this.decode_on_the_fly=this.findReplayGain=this.free_format=this.force_ms=!1;this.error_protection=this.emphasis=this.extension=this.original=this.copyright=this.compression_ratio=this.brate=0;this.disable_reservoir=this.strict_ISO=!1;this.quant_comp_short=
this.quant_comp=0;this.experimentalY=!1;this.preset=this.exp_nspsytune=this.experimentalZ=0;this.VBR=null;this.maskingadjust_short=this.maskingadjust=this.highpasswidth=this.lowpasswidth=this.highpassfreq=this.lowpassfreq=this.VBR_hard_min=this.VBR_max_bitrate_kbps=this.VBR_min_bitrate_kbps=this.VBR_mean_bitrate_kbps=this.VBR_q=this.VBR_q_frac=0;this.noATH=this.ATHshort=this.ATHonly=!1;this.athaa_sensitivity=this.athaa_loudapprox=this.athaa_type=this.ATHlower=this.ATHcurve=this.ATHtype=0;this.short_blocks=
null;this.useTemporal=!1;this.msfix=this.interChRatio=0;this.tune=!1;this.lame_allocated_gfp=this.frameNum=this.framesize=this.encoder_padding=this.encoder_delay=this.version=this.tune_value_a=0;this.internal_flags=null}function Ac(){this.linprebuf=K(2*Y.MAX_ORDER);this.linpre=0;this.lstepbuf=K(Y.MAX_SAMPLES_PER_WINDOW+Y.MAX_ORDER);this.lstep=0;this.loutbuf=K(Y.MAX_SAMPLES_PER_WINDOW+Y.MAX_ORDER);this.lout=0;this.rinprebuf=K(2*Y.MAX_ORDER);this.rinpre=0;this.rstepbuf=K(Y.MAX_SAMPLES_PER_WINDOW+Y.MAX_ORDER);
this.rstep=0;this.routbuf=K(Y.MAX_SAMPLES_PER_WINDOW+Y.MAX_ORDER);this.first=this.freqindex=this.rsum=this.lsum=this.totsamp=this.sampleWindow=this.rout=0;this.A=X(0|Y.STEPS_per_dB*Y.MAX_dB);this.B=X(0|Y.STEPS_per_dB*Y.MAX_dB)}function Bc(u){this.quantize=u;this.iteration_loop=function(k,n,u,w){var B=k.internal_flags,E=K(sa.SFBMAX),f=K(576),b=X(2),v=B.l3_side;var a=new xa(0);this.quantize.rv.ResvFrameBegin(k,a);a=a.bits;for(var m=0;m<B.mode_gr;m++){var z=this.quantize.qupvt.on_pe(k,n,b,a,m,m);B.mode_ext==
c.MPG_MD_MS_LR&&(this.quantize.ms_convert(B.l3_side,m),this.quantize.qupvt.reduce_side(b,u[m],a,z));for(z=0;z<B.channels_out;z++){var e=v.tt[m][z];if(e.block_type!=c.SHORT_TYPE){var l=0;l=B.PSY.mask_adjust-l}else l=0,l=B.PSY.mask_adjust_short-l;B.masking_lower=Math.pow(10,.1*l);this.quantize.init_outer_loop(B,e);this.quantize.init_xrpow(B,e,f)&&(this.quantize.qupvt.calc_xmin(k,w[m][z],e,E),this.quantize.outer_loop(k,e,E,f,z,b[z]));this.quantize.iteration_finish_one(B,m,z)}}this.quantize.rv.ResvFrameEnd(B,
a)}}function Cc(){this.floor=this.decay=this.adjustLimit=this.adjust=this.aaSensitivityP=this.useAdjust=0;this.l=K(c.SBMAX_l);this.s=K(c.SBMAX_s);this.psfb21=K(c.PSFB21);this.psfb12=K(c.PSFB12);this.cb_l=K(c.CBANDS);this.cb_s=K(c.CBANDS);this.eql_w=K(c.BLKSIZE/2)}function za(u,k,n,w){this.l=X(1+c.SBMAX_l);this.s=X(1+c.SBMAX_s);this.psfb21=X(1+c.PSFB21);this.psfb12=X(1+c.PSFB12);var E=this.l,B=this.s;4==arguments.length&&(this.arrL=arguments[0],this.arrS=arguments[1],this.arr21=arguments[2],this.arr12=
arguments[3],T.arraycopy(this.arrL,0,E,0,Math.min(this.arrL.length,this.l.length)),T.arraycopy(this.arrS,0,B,0,Math.min(this.arrS.length,this.s.length)),T.arraycopy(this.arr21,0,this.psfb21,0,Math.min(this.arr21.length,this.psfb21.length)),T.arraycopy(this.arr12,0,this.psfb12,0,Math.min(this.arr12.length,this.psfb12.length)))}function ia(){function u(a,b){b=E.ATHformula(b,a);return b=Math.pow(10,(b-100)/10+a.ATHlower)}function k(a){this.s=a}var n=null,w=null,E=null;this.setModules=function(a,b,d){n=
a;w=b;E=d};this.IPOW20=function(b){return a[b]};var B=ia.IXMAX_VAL+2,ha=ia.Q_MAX,f=ia.Q_MAX2;this.nr_of_sfb_block=[[[6,5,5,5],[9,9,9,9],[6,9,9,9]],[[6,5,7,3],[9,9,12,6],[6,9,12,6]],[[11,10,0,0],[18,18,0,0],[15,18,0,0]],[[7,7,7,0],[12,12,12,0],[6,15,12,0]],[[6,6,6,3],[12,9,9,6],[6,12,9,6]],[[8,8,5,0],[15,12,9,0],[6,18,9,0]]];var b=[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,3,2,0];this.pretab=b;this.sfBandIndex=[new za([0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],[0,4,
8,12,18,24,32,42,56,74,100,132,174,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,6,12,18,24,30,36,44,54,66,80,96,114,136,162,194,232,278,332,394,464,540,576],[0,4,8,12,18,26,36,48,62,80,104,136,180,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],[0,4,8,12,18,26,36,48,62,80,104,134,174,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,4,8,12,16,20,24,30,36,44,52,62,74,90,110,134,162,196,238,288,342,418,576],[0,4,8,12,16,22,
30,40,52,66,84,106,136,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,4,8,12,16,20,24,30,36,42,50,60,72,88,106,128,156,190,230,276,330,384,576],[0,4,8,12,16,22,28,38,50,64,80,100,126,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,4,8,12,16,20,24,30,36,44,54,66,82,102,126,156,194,240,296,364,448,550,576],[0,4,8,12,16,22,30,42,58,78,104,138,180,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],[0,4,8,12,18,26,36,48,62,80,104,
134,174,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],[0,4,8,12,18,26,36,48,62,80,104,134,174,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]),new za([0,12,24,36,48,60,72,88,108,132,160,192,232,280,336,400,476,566,568,570,572,574,576],[0,8,16,24,36,52,72,96,124,160,162,164,166,192],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0])];var v=K(ha+f+1),a=K(ha),m=K(B),z=K(B);this.adj43=z;this.iteration_init=function(b){var e=b.internal_flags,d=e.l3_side;
if(0==e.iteration_init_init){e.iteration_init_init=1;d.main_data_begin=0;d=b.internal_flags.ATH.l;for(var g=b.internal_flags.ATH.psfb21,q=b.internal_flags.ATH.s,k=b.internal_flags.ATH.psfb12,p=b.internal_flags,r=b.out_samplerate,t=0;t<c.SBMAX_l;t++){var J=p.scalefac_band.l[t],h=p.scalefac_band.l[t+1];for(d[t]=Ma.MAX_VALUE;J<h;J++){var x=J*r/1152;x=u(b,x);d[t]=Math.min(d[t],x)}}for(t=0;t<c.PSFB21;t++)for(J=p.scalefac_band.psfb21[t],h=p.scalefac_band.psfb21[t+1],g[t]=Ma.MAX_VALUE;J<h;J++)x=J*r/1152,
x=u(b,x),g[t]=Math.min(g[t],x);for(t=0;t<c.SBMAX_s;t++){J=p.scalefac_band.s[t];h=p.scalefac_band.s[t+1];for(q[t]=Ma.MAX_VALUE;J<h;J++)x=J*r/384,x=u(b,x),q[t]=Math.min(q[t],x);q[t]*=p.scalefac_band.s[t+1]-p.scalefac_band.s[t]}for(t=0;t<c.PSFB12;t++){J=p.scalefac_band.psfb12[t];h=p.scalefac_band.psfb12[t+1];for(k[t]=Ma.MAX_VALUE;J<h;J++)x=J*r/384,x=u(b,x),k[t]=Math.min(k[t],x);k[t]*=p.scalefac_band.s[13]-p.scalefac_band.s[12]}if(b.noATH){for(t=0;t<c.SBMAX_l;t++)d[t]=1E-20;for(t=0;t<c.PSFB21;t++)g[t]=
1E-20;for(t=0;t<c.SBMAX_s;t++)q[t]=1E-20;for(t=0;t<c.PSFB12;t++)k[t]=1E-20}p.ATH.floor=10*Math.log10(u(b,-1));m[0]=0;for(d=1;d<B;d++)m[d]=Math.pow(d,4/3);for(d=0;d<B-1;d++)z[d]=d+1-Math.pow(.5*(m[d]+m[d+1]),.75);z[d]=.5;for(d=0;d<ha;d++)a[d]=Math.pow(2,-.1875*(d-210));for(d=0;d<=ha+f;d++)v[d]=Math.pow(2,.25*(d-210-f));n.huffman_init(e);d=b.exp_nspsytune>>2&63;32<=d&&(d-=64);g=Math.pow(10,d/4/10);d=b.exp_nspsytune>>8&63;32<=d&&(d-=64);q=Math.pow(10,d/4/10);d=b.exp_nspsytune>>14&63;32<=d&&(d-=64);k=
Math.pow(10,d/4/10);d=b.exp_nspsytune>>20&63;32<=d&&(d-=64);b=k*Math.pow(10,d/4/10);for(d=0;d<c.SBMAX_l;d++)p=6>=d?g:13>=d?q:20>=d?k:b,e.nsPsy.longfact[d]=p;for(d=0;d<c.SBMAX_s;d++)p=5>=d?g:10>=d?q:11>=d?k:b,e.nsPsy.shortfact[d]=p}};this.on_pe=function(a,b,d,c,f,m){var e=a.internal_flags,g=0,l=X(2),q;g=new xa(g);a=w.ResvMaxBits(a,c,g,m);g=g.bits;var h=g+a;h>da.MAX_BITS_PER_GRANULE&&(h=da.MAX_BITS_PER_GRANULE);for(q=m=0;q<e.channels_out;++q)d[q]=Math.min(da.MAX_BITS_PER_CHANNEL,g/e.channels_out),l[q]=
0|d[q]*b[f][q]/700-d[q],l[q]>3*c/4&&(l[q]=3*c/4),0>l[q]&&(l[q]=0),l[q]+d[q]>da.MAX_BITS_PER_CHANNEL&&(l[q]=Math.max(0,da.MAX_BITS_PER_CHANNEL-d[q])),m+=l[q];if(m>a)for(q=0;q<e.channels_out;++q)l[q]=a*l[q]/m;for(q=0;q<e.channels_out;++q)d[q]+=l[q],a-=l[q];for(q=m=0;q<e.channels_out;++q)m+=d[q];if(m>da.MAX_BITS_PER_GRANULE)for(q=0;q<e.channels_out;++q)d[q]*=da.MAX_BITS_PER_GRANULE,d[q]/=m;return h};this.reduce_side=function(a,b,d,c){b=.33*(.5-b)/.5;0>b&&(b=0);.5<b&&(b=.5);b=0|.5*b*(a[0]+a[1]);b>da.MAX_BITS_PER_CHANNEL-
a[0]&&(b=da.MAX_BITS_PER_CHANNEL-a[0]);0>b&&(b=0);125<=a[1]&&(125<a[1]-b?(a[0]<d&&(a[0]+=b),a[1]-=b):(a[0]+=a[1]-125,a[1]=125));b=a[0]+a[1];b>c&&(a[0]=c*a[0]/b,a[1]=c*a[1]/b)};this.athAdjust=function(a,b,d){b=aa.FAST_LOG10_X(b,10);a*=a;var c=0;b-=d;1E-20<a&&(c=1+aa.FAST_LOG10_X(a,10/90.30873362));0>c&&(c=0);return Math.pow(10,.1*(b*c+(d+90.30873362-94.82444863)))};this.calc_xmin=function(a,b,d,f){var e=0,g=a.internal_flags,m,l=0,k=0,v=g.ATH,h=d.xr,x=a.VBR==G.vbr_mtrh?1:0,y=g.masking_lower;if(a.VBR==
G.vbr_mtrh||a.VBR==G.vbr_mt)y=1;for(m=0;m<d.psy_lmax;m++){var A=a.VBR==G.vbr_rh||a.VBR==G.vbr_mtrh?athAdjust(v.adjust,v.l[m],v.floor):v.adjust*v.l[m];var n=d.width[m];var u=A/n;var B=2.220446049250313E-16;var z=n>>1;var C=0;do{var I=h[l]*h[l];C+=I;B+=I<u?I:u;l++;I=h[l]*h[l];C+=I;B+=I<u?I:u;l++}while(0<--z);C>A&&k++;m==c.SBPSY_l&&(u=A*g.nsPsy.longfact[m],B<u&&(B=u));0!=x&&(A=B);a.ATHonly||(B=b.en.l[m],0<B&&(u=C*b.thm.l[m]*y/B,0!=x&&(u*=g.nsPsy.longfact[m]),A<u&&(A=u)));0!=x?f[e++]=A:f[e++]=A*g.nsPsy.longfact[m]}C=
575;if(d.block_type!=c.SHORT_TYPE)for(A=576;0!=A--&&qa.EQ(h[A],0);)C=A;d.max_nonzero_coeff=C;for(var Q=d.sfb_smin;m<d.psymax;Q++,m+=3){var S;var w=a.VBR==G.vbr_rh||a.VBR==G.vbr_mtrh?athAdjust(v.adjust,v.s[Q],v.floor):v.adjust*v.s[Q];n=d.width[m];for(S=0;3>S;S++){C=0;z=n>>1;u=w/n;B=2.220446049250313E-16;do I=h[l]*h[l],C+=I,B+=I<u?I:u,l++,I=h[l]*h[l],C+=I,B+=I<u?I:u,l++;while(0<--z);C>w&&k++;Q==c.SBPSY_s&&(u=w*g.nsPsy.shortfact[Q],B<u&&(B=u));A=0!=x?B:w;a.ATHonly||a.ATHshort||(B=b.en.s[Q][S],0<B&&(u=
C*b.thm.s[Q][S]*y/B,0!=x&&(u*=g.nsPsy.shortfact[Q]),A<u&&(A=u)));0!=x?f[e++]=A:f[e++]=A*g.nsPsy.shortfact[Q]}a.useTemporal&&(f[e-3]>f[e-3+1]&&(f[e-3+1]+=(f[e-3]-f[e-3+1])*g.decay),f[e-3+1]>f[e-3+2]&&(f[e-3+2]+=(f[e-3+1]-f[e-3+2])*g.decay))}return k};this.calc_noise_core=function(a,b,d,c){var e=0,f=b.s,g=a.l3_enc;if(f>a.count1)for(;0!=d--;){var l=a.xr[f];f++;e+=l*l;l=a.xr[f];f++;e+=l*l}else if(f>a.big_values){var k=K(2);k[0]=0;for(k[1]=c;0!=d--;)l=Math.abs(a.xr[f])-k[g[f]],f++,e+=l*l,l=Math.abs(a.xr[f])-
k[g[f]],f++,e+=l*l}else for(;0!=d--;)l=Math.abs(a.xr[f])-m[g[f]]*c,f++,e+=l*l,l=Math.abs(a.xr[f])-m[g[f]]*c,f++,e+=l*l;b.s=f;return e};this.calc_noise=function(a,c,d,f,m){var e=0,g=0,l,q=0,u=0,h=0,x=-20,y=0,A=a.scalefac,n=0;for(l=f.over_SSD=0;l<a.psymax;l++){var B=a.global_gain-(A[n++]+(0!=a.preflag?b[l]:0)<<a.scalefac_scale+1)-8*a.subblock_gain[a.window[l]];if(null!=m&&m.step[l]==B){var z=m.noise[l];y+=a.width[l];d[e++]=z/c[g++];z=m.noise_log[l]}else{z=v[B+ia.Q_MAX2];var w=a.width[l]>>1;y+a.width[l]>
a.max_nonzero_coeff&&(w=a.max_nonzero_coeff-y+1,w=0<w?w>>1:0);y=new k(y);z=this.calc_noise_core(a,y,w,z);y=y.s;null!=m&&(m.step[l]=B,m.noise[l]=z);z=d[e++]=z/c[g++];z=aa.FAST_LOG10(Math.max(z,1E-20));null!=m&&(m.noise_log[l]=z)}null!=m&&(m.global_gain=a.global_gain);h+=z;0<z&&(B=Math.max(0|10*z+.5,1),f.over_SSD+=B*B,q++,u+=z);x=Math.max(x,z)}f.over_count=q;f.tot_noise=h;f.over_noise=u;f.max_noise=x;return q};this.set_pinfo=function(a,f,d,g,m){var e=a.internal_flags,l,k,q=0==f.scalefac_scale?.5:1,
v=f.scalefac,h=K(sa.SFBMAX),x=K(sa.SFBMAX),y=new sb;calc_xmin(a,d,f,h);calc_noise(f,h,x,y,null);var u=0;var n=f.sfb_lmax;f.block_type!=c.SHORT_TYPE&&0==f.mixed_block_flag&&(n=22);for(l=0;l<n;l++){var B=e.scalefac_band.l[l],z=e.scalefac_band.l[l+1],w=z-B;for(k=0;u<z;u++)k+=f.xr[u]*f.xr[u];k/=w;var C=1E15;e.pinfo.en[g][m][l]=C*k;e.pinfo.xfsf[g][m][l]=C*h[l]*x[l]/w;k=0<d.en.l[l]&&!a.ATHonly?k/d.en.l[l]:0;e.pinfo.thr[g][m][l]=C*Math.max(k*d.thm.l[l],e.ATH.l[l]);e.pinfo.LAMEsfb[g][m][l]=0;0!=f.preflag&&
11<=l&&(e.pinfo.LAMEsfb[g][m][l]=-q*b[l]);l<c.SBPSY_l&&(e.pinfo.LAMEsfb[g][m][l]-=q*v[l])}if(f.block_type==c.SHORT_TYPE)for(n=l,l=f.sfb_smin;l<c.SBMAX_s;l++){B=e.scalefac_band.s[l];z=e.scalefac_band.s[l+1];w=z-B;for(var I=0;3>I;I++){k=0;for(C=B;C<z;C++)k+=f.xr[u]*f.xr[u],u++;k=Math.max(k/w,1E-20);C=1E15;e.pinfo.en_s[g][m][3*l+I]=C*k;e.pinfo.xfsf_s[g][m][3*l+I]=C*h[n]*x[n]/w;k=0<d.en.s[l][I]?k/d.en.s[l][I]:0;if(a.ATHonly||a.ATHshort)k=0;e.pinfo.thr_s[g][m][3*l+I]=C*Math.max(k*d.thm.s[l][I],e.ATH.s[l]);
e.pinfo.LAMEsfb_s[g][m][3*l+I]=-2*f.subblock_gain[I];l<c.SBPSY_s&&(e.pinfo.LAMEsfb_s[g][m][3*l+I]-=q*v[n]);n++}}e.pinfo.LAMEqss[g][m]=f.global_gain;e.pinfo.LAMEmainbits[g][m]=f.part2_3_length+f.part2_length;e.pinfo.LAMEsfbits[g][m]=f.part2_length;e.pinfo.over[g][m]=y.over_count;e.pinfo.max_noise[g][m]=10*y.max_noise;e.pinfo.over_noise[g][m]=10*y.over_noise;e.pinfo.tot_noise[g][m]=10*y.tot_noise;e.pinfo.over_SSD[g][m]=y.over_SSD}}function Dc(){this.sfb_count1=this.global_gain=0;this.step=X(39);this.noise=
K(39);this.noise_log=K(39)}function rb(){this.xr=K(576);this.l3_enc=X(576);this.scalefac=X(sa.SFBMAX);this.mixed_block_flag=this.block_type=this.scalefac_compress=this.global_gain=this.count1=this.big_values=this.part2_3_length=this.xrpow_max=0;this.table_select=X(3);this.subblock_gain=X(4);this.sfbdivide=this.psymax=this.sfbmax=this.psy_lmax=this.sfb_smin=this.sfb_lmax=this.part2_length=this.count1table_select=this.scalefac_scale=this.preflag=this.region1_count=this.region0_count=0;this.width=X(sa.SFBMAX);
this.window=X(sa.SFBMAX);this.count1bits=0;this.sfb_partition_table=null;this.slen=X(4);this.max_nonzero_coeff=0;var c=this;this.assign=function(k){c.xr=new Float32Array(k.xr);c.l3_enc=new Int32Array(k.l3_enc);c.scalefac=new Int32Array(k.scalefac);c.xrpow_max=k.xrpow_max;c.part2_3_length=k.part2_3_length;c.big_values=k.big_values;c.count1=k.count1;c.global_gain=k.global_gain;c.scalefac_compress=k.scalefac_compress;c.block_type=k.block_type;c.mixed_block_flag=k.mixed_block_flag;c.table_select=new Int32Array(k.table_select);
c.subblock_gain=new Int32Array(k.subblock_gain);c.region0_count=k.region0_count;c.region1_count=k.region1_count;c.preflag=k.preflag;c.scalefac_scale=k.scalefac_scale;c.count1table_select=k.count1table_select;c.part2_length=k.part2_length;c.sfb_lmax=k.sfb_lmax;c.sfb_smin=k.sfb_smin;c.psy_lmax=k.psy_lmax;c.sfbmax=k.sfbmax;c.psymax=k.psymax;c.sfbdivide=k.sfbdivide;c.width=new Int32Array(k.width);c.window=new Int32Array(k.window);c.count1bits=k.count1bits;c.sfb_partition_table=k.sfb_partition_table.slice(0);
c.slen=new Int32Array(k.slen);c.max_nonzero_coeff=k.max_nonzero_coeff}}function Ec(){function u(c){this.ordinal=c}function k(c){for(var b=0;b<c.sfbmax;b++)if(0==c.scalefac[b]+c.subblock_gain[c.window[b]])return!1;return!0}var n;this.rv=null;var w;this.qupvt=null;var E,B=new yc,ha;this.setModules=function(c,b,k,a){n=c;this.rv=w=b;this.qupvt=E=k;ha=a;B.setModules(E,ha)};this.ms_convert=function(c,b){for(var f=0;576>f;++f){var a=c.tt[b][0].xr[f],m=c.tt[b][1].xr[f];c.tt[b][0].xr[f]=.5*(a+m)*aa.SQRT2;
c.tt[b][1].xr[f]=.5*(a-m)*aa.SQRT2}};this.init_xrpow=function(c,b,k){var a=0|b.max_nonzero_coeff;b.xrpow_max=0;na.fill(k,a,576,0);for(var f,v=f=0;v<=a;++v){var e=Math.abs(b.xr[v]);f+=e;k[v]=Math.sqrt(e*Math.sqrt(e));k[v]>b.xrpow_max&&(b.xrpow_max=k[v])}if(1E-20<f){k=0;0!=(c.substep_shaping&2)&&(k=1);for(a=0;a<b.psymax;a++)c.pseudohalf[a]=k;return!0}na.fill(b.l3_enc,0,576,0);return!1};this.init_outer_loop=function(f,b){b.part2_3_length=0;b.big_values=0;b.count1=0;b.global_gain=210;b.scalefac_compress=
0;b.table_select[0]=0;b.table_select[1]=0;b.table_select[2]=0;b.subblock_gain[0]=0;b.subblock_gain[1]=0;b.subblock_gain[2]=0;b.subblock_gain[3]=0;b.region0_count=0;b.region1_count=0;b.preflag=0;b.scalefac_scale=0;b.count1table_select=0;b.part2_length=0;b.sfb_lmax=c.SBPSY_l;b.sfb_smin=c.SBPSY_s;b.psy_lmax=f.sfb21_extra?c.SBMAX_l:c.SBPSY_l;b.psymax=b.psy_lmax;b.sfbmax=b.sfb_lmax;b.sfbdivide=11;for(var k=0;k<c.SBMAX_l;k++)b.width[k]=f.scalefac_band.l[k+1]-f.scalefac_band.l[k],b.window[k]=3;if(b.block_type==
c.SHORT_TYPE){var a=K(576);b.sfb_smin=0;b.sfb_lmax=0;0!=b.mixed_block_flag&&(b.sfb_smin=3,b.sfb_lmax=2*f.mode_gr+4);b.psymax=b.sfb_lmax+3*((f.sfb21_extra?c.SBMAX_s:c.SBPSY_s)-b.sfb_smin);b.sfbmax=b.sfb_lmax+3*(c.SBPSY_s-b.sfb_smin);b.sfbdivide=b.sfbmax-18;b.psy_lmax=b.sfb_lmax;var m=f.scalefac_band.l[b.sfb_lmax];T.arraycopy(b.xr,0,a,0,576);for(k=b.sfb_smin;k<c.SBMAX_s;k++)for(var n=f.scalefac_band.s[k],e=f.scalefac_band.s[k+1],l=0;3>l;l++)for(var d=n;d<e;d++)b.xr[m++]=a[3*d+l];a=b.sfb_lmax;for(k=
b.sfb_smin;k<c.SBMAX_s;k++)b.width[a]=b.width[a+1]=b.width[a+2]=f.scalefac_band.s[k+1]-f.scalefac_band.s[k],b.window[a]=0,b.window[a+1]=1,b.window[a+2]=2,a+=3}b.count1bits=0;b.sfb_partition_table=E.nr_of_sfb_block[0][0];b.slen[0]=0;b.slen[1]=0;b.slen[2]=0;b.slen[3]=0;b.max_nonzero_coeff=575;na.fill(b.scalefac,0);k=f.ATH;a=b.xr;if(b.block_type!=c.SHORT_TYPE)for(b=!1,m=c.PSFB21-1;0<=m&&!b;m--)for(n=f.scalefac_band.psfb21[m],e=f.scalefac_band.psfb21[m+1],l=E.athAdjust(k.adjust,k.psfb21[m],k.floor),1E-12<
f.nsPsy.longfact[21]&&(l*=f.nsPsy.longfact[21]),--e;e>=n;e--)if(Math.abs(a[e])<l)a[e]=0;else{b=!0;break}else for(l=0;3>l;l++)for(b=!1,m=c.PSFB12-1;0<=m&&!b;m--)for(n=3*f.scalefac_band.s[12]+(f.scalefac_band.s[13]-f.scalefac_band.s[12])*l+(f.scalefac_band.psfb12[m]-f.scalefac_band.psfb12[0]),e=n+(f.scalefac_band.psfb12[m+1]-f.scalefac_band.psfb12[m]),d=E.athAdjust(k.adjust,k.psfb12[m],k.floor),1E-12<f.nsPsy.shortfact[12]&&(d*=f.nsPsy.shortfact[12]),--e;e>=n;e--)if(Math.abs(a[e])<d)a[e]=0;else{b=!0;
break}};u.BINSEARCH_NONE=new u(0);u.BINSEARCH_UP=new u(1);u.BINSEARCH_DOWN=new u(2);this.trancate_smallspectrums=function(f,b,k,a){var m=K(sa.SFBMAX);if((0!=(f.substep_shaping&4)||b.block_type!=c.SHORT_TYPE)&&0==(f.substep_shaping&128)){E.calc_noise(b,k,m,new sb,null);for(var n=0;576>n;n++){var e=0;0!=b.l3_enc[n]&&(e=Math.abs(b.xr[n]));a[n]=e}n=0;e=8;b.block_type==c.SHORT_TYPE&&(e=6);do{var l,d,g=b.width[e];n+=g;if(!(1<=m[e]||(na.sort(a,n-g,g),qa.EQ(a[n-1],0)))){var q=(1-m[e])*k[e];var v=l=0;do{for(d=
1;v+d<g&&!qa.NEQ(a[v+n-g],a[v+n+d-g]);d++);var p=a[v+n-g]*a[v+n-g]*d;if(q<p){0!=v&&(l=a[v+n-g-1]);break}q-=p;v+=d}while(v<g);if(!qa.EQ(l,0)){do Math.abs(b.xr[n-g])<=l&&(b.l3_enc[n-g]=0);while(0<--g)}}}while(++e<b.psymax);b.part2_3_length=ha.noquant_count_bits(f,b,null)}};this.outer_loop=function(f,b,n,a,m,B){var e=f.internal_flags,l=new rb,d=K(576),g=K(sa.SFBMAX),q=new sb,v=new Dc,p=9999999,r=!1,t=!1,w=0,h,x=e.CurrentStep[m],y=!1,A=e.OldValue[m];var z=u.BINSEARCH_NONE;b.global_gain=A;for(h=B-b.part2_length;;){var H=
ha.count_bits(e,a,b,null);if(1==x||H==h)break;H>h?(z==u.BINSEARCH_DOWN&&(y=!0),y&&(x/=2),z=u.BINSEARCH_UP,H=x):(z==u.BINSEARCH_UP&&(y=!0),y&&(x/=2),z=u.BINSEARCH_DOWN,H=-x);b.global_gain+=H;0>b.global_gain&&(b.global_gain=0,y=!0);255<b.global_gain&&(b.global_gain=255,y=!0)}for(;H>h&&255>b.global_gain;)b.global_gain++,H=ha.count_bits(e,a,b,null);e.CurrentStep[m]=4<=A-b.global_gain?4:2;e.OldValue[m]=b.global_gain;b.part2_3_length=H;if(0==e.noise_shaping)return 100;E.calc_noise(b,n,g,q,v);q.bits=b.part2_3_length;
l.assign(b);m=0;for(T.arraycopy(a,0,d,0,576);!r;){do{h=new sb;y=255;x=0!=(e.substep_shaping&2)?20:3;if(e.sfb21_extra){if(1<g[l.sfbmax])break;if(l.block_type==c.SHORT_TYPE&&(1<g[l.sfbmax+1]||1<g[l.sfbmax+2]))break}A=l;H=a;z=f.internal_flags;var O=A,F=g,C=H,I=f.internal_flags;var Q=0==O.scalefac_scale?1.2968395546510096:1.6817928305074292;for(var S=0,ma=0;ma<O.sfbmax;ma++)S<F[ma]&&(S=F[ma]);ma=I.noise_shaping_amp;3==ma&&(ma=t?2:1);switch(ma){case 2:break;case 1:S=1<S?Math.pow(S,.5):.95*S;break;default:S=
1<S?1:.95*S}var Z=0;for(ma=0;ma<O.sfbmax;ma++){var L=O.width[ma];Z+=L;if(!(F[ma]<S)){if(0!=(I.substep_shaping&2)&&(I.pseudohalf[ma]=0==I.pseudohalf[ma]?1:0,0==I.pseudohalf[ma]&&2==I.noise_shaping_amp))break;O.scalefac[ma]++;for(L=-L;0>L;L++)C[Z+L]*=Q,C[Z+L]>O.xrpow_max&&(O.xrpow_max=C[Z+L]);if(2==I.noise_shaping_amp)break}}if(Q=k(A))A=!1;else if(Q=2==z.mode_gr?ha.scale_bitcount(A):ha.scale_bitcount_lsf(z,A)){if(1<z.noise_shaping)if(na.fill(z.pseudohalf,0),0==A.scalefac_scale){Q=A;for(F=O=0;F<Q.sfbmax;F++){I=
Q.width[F];C=Q.scalefac[F];0!=Q.preflag&&(C+=E.pretab[F]);O+=I;if(0!=(C&1))for(C++,I=-I;0>I;I++)H[O+I]*=1.2968395546510096,H[O+I]>Q.xrpow_max&&(Q.xrpow_max=H[O+I]);Q.scalefac[F]=C>>1}Q.preflag=0;Q.scalefac_scale=1;Q=!1}else if(A.block_type==c.SHORT_TYPE&&0<z.subblock_gain){b:{Q=z;O=A;F=H;C=O.scalefac;for(H=0;H<O.sfb_lmax;H++)if(16<=C[H]){H=!0;break b}for(I=0;3>I;I++){ma=S=0;for(H=O.sfb_lmax+I;H<O.sfbdivide;H+=3)S<C[H]&&(S=C[H]);for(;H<O.sfbmax;H+=3)ma<C[H]&&(ma=C[H]);if(!(16>S&&8>ma)){if(7<=O.subblock_gain[I]){H=
!0;break b}O.subblock_gain[I]++;S=Q.scalefac_band.l[O.sfb_lmax];for(H=O.sfb_lmax+I;H<O.sfbmax;H+=3)if(ma=O.width[H],Z=C[H],Z-=4>>O.scalefac_scale,0<=Z)C[H]=Z,S+=3*ma;else{C[H]=0;Z=E.IPOW20(210+(Z<<O.scalefac_scale+1));S+=ma*(I+1);for(L=-ma;0>L;L++)F[S+L]*=Z,F[S+L]>O.xrpow_max&&(O.xrpow_max=F[S+L]);S+=ma*(3-I-1)}Z=E.IPOW20(202);S+=O.width[H]*(I+1);for(L=-O.width[H];0>L;L++)F[S+L]*=Z,F[S+L]>O.xrpow_max&&(O.xrpow_max=F[S+L])}}H=!1}Q=H||k(A)}Q||(Q=2==z.mode_gr?ha.scale_bitcount(A):ha.scale_bitcount_lsf(z,
A));A=!Q}else A=!0;if(!A)break;0!=l.scalefac_scale&&(y=254);A=B-l.part2_length;if(0>=A)break;for(;(l.part2_3_length=ha.count_bits(e,a,l,v))>A&&l.global_gain<=y;)l.global_gain++;if(l.global_gain>y)break;if(0==q.over_count){for(;(l.part2_3_length=ha.count_bits(e,a,l,v))>p&&l.global_gain<=y;)l.global_gain++;if(l.global_gain>y)break}E.calc_noise(l,n,g,h,v);h.bits=l.part2_3_length;z=b.block_type!=c.SHORT_TYPE?f.quant_comp:f.quant_comp_short;y=q;A=h;Q=l;H=g;switch(z){default:case 9:0<y.over_count?(z=A.over_SSD<=
y.over_SSD,A.over_SSD==y.over_SSD&&(z=A.bits<y.bits)):z=0>A.max_noise&&10*A.max_noise+A.bits<=10*y.max_noise+y.bits;break;case 0:z=A.over_count<y.over_count||A.over_count==y.over_count&&A.over_noise<y.over_noise||A.over_count==y.over_count&&qa.EQ(A.over_noise,y.over_noise)&&A.tot_noise<y.tot_noise;break;case 8:z=A;F=1E-37;for(O=0;O<Q.psymax;O++)C=H[O],C=aa.FAST_LOG10(.368+.632*C*C*C),F+=C;z.max_noise=Math.max(1E-20,F);case 1:z=A.max_noise<y.max_noise;break;case 2:z=A.tot_noise<y.tot_noise;break;case 3:z=
A.tot_noise<y.tot_noise&&A.max_noise<y.max_noise;break;case 4:z=0>=A.max_noise&&.2<y.max_noise||0>=A.max_noise&&0>y.max_noise&&y.max_noise>A.max_noise-.2&&A.tot_noise<y.tot_noise||0>=A.max_noise&&0<y.max_noise&&y.max_noise>A.max_noise-.2&&A.tot_noise<y.tot_noise+y.over_noise||0<A.max_noise&&-.05<y.max_noise&&y.max_noise>A.max_noise-.1&&A.tot_noise+A.over_noise<y.tot_noise+y.over_noise||0<A.max_noise&&-.1<y.max_noise&&y.max_noise>A.max_noise-.15&&A.tot_noise+A.over_noise+A.over_noise<y.tot_noise+y.over_noise+
y.over_noise;break;case 5:z=A.over_noise<y.over_noise||qa.EQ(A.over_noise,y.over_noise)&&A.tot_noise<y.tot_noise;break;case 6:z=A.over_noise<y.over_noise||qa.EQ(A.over_noise,y.over_noise)&&(A.max_noise<y.max_noise||qa.EQ(A.max_noise,y.max_noise)&&A.tot_noise<=y.tot_noise);break;case 7:z=A.over_count<y.over_count||A.over_noise<y.over_noise}0==y.over_count&&(z=z&&A.bits<y.bits);z=z?1:0;if(0!=z)p=b.part2_3_length,q=h,b.assign(l),m=0,T.arraycopy(a,0,d,0,576);else if(0==e.full_outer_loop){if(++m>x&&0==
q.over_count)break;if(3==e.noise_shaping_amp&&t&&30<m)break;if(3==e.noise_shaping_amp&&t&&15<l.global_gain-w)break}}while(255>l.global_gain+l.scalefac_scale);3==e.noise_shaping_amp?t?r=!0:(l.assign(b),T.arraycopy(d,0,a,0,576),m=0,w=l.global_gain,t=!0):r=!0}f.VBR==G.vbr_rh||f.VBR==G.vbr_mtrh?T.arraycopy(d,0,a,0,576):0!=(e.substep_shaping&1)&&trancate_smallspectrums(e,b,n,a);return q.over_count};this.iteration_finish_one=function(c,b,k){var a=c.l3_side,f=a.tt[b][k];ha.best_scalefac_store(c,b,k,a);1==
c.use_best_huffman&&ha.best_huffman_divide(c,f);w.ResvAdjust(c,f)};this.VBR_encode_granule=function(c,b,k,a,m,n,e){var f=c.internal_flags,d=new rb,g=K(576),q=e,v=(e+n)/2,p=0,r=f.sfb21_extra;na.fill(d.l3_enc,0);do{f.sfb21_extra=v>q-42?!1:r;var t=outer_loop(c,b,k,a,m,v);0>=t?(p=1,e=b.part2_3_length,d.assign(b),T.arraycopy(a,0,g,0,576),e-=32,t=e-n,v=(e+n)/2):(n=v+32,t=e-n,v=(e+n)/2,0!=p&&(p=2,b.assign(d),T.arraycopy(g,0,a,0,576)))}while(12<t);f.sfb21_extra=r;2==p&&T.arraycopy(d.l3_enc,0,b.l3_enc,0,576)};
this.get_framebits=function(c,b){var f=c.internal_flags;f.bitrate_index=f.VBR_min_bitrate;n.getframebits(c);f.bitrate_index=1;var a=n.getframebits(c);for(var m=1;m<=f.VBR_max_bitrate;m++)f.bitrate_index=m,a=new xa(a),b[m]=w.ResvFrameBegin(c,a),a=a.bits};this.VBR_old_prepare=function(f,b,k,a,m,n,e,l,d){var g=f.internal_flags,q=1,v=0;g.bitrate_index=g.VBR_max_bitrate;var p=w.ResvFrameBegin(f,new xa(0))/g.mode_gr;get_framebits(f,n);for(var r=0;r<g.mode_gr;r++){var t=E.on_pe(f,b,l[r],p,r,0);g.mode_ext==
c.MPG_MD_MS_LR&&(ms_convert(g.l3_side,r),E.reduce_side(l[r],k[r],p,t));for(t=0;t<g.channels_out;++t){var u=g.l3_side.tt[r][t];if(u.block_type!=c.SHORT_TYPE){var h=1.28/(1+Math.exp(3.5-b[r][t]/300))-.05;h=g.PSY.mask_adjust-h}else h=2.56/(1+Math.exp(3.5-b[r][t]/300))-.14,h=g.PSY.mask_adjust_short-h;g.masking_lower=Math.pow(10,.1*h);init_outer_loop(g,u);d[r][t]=E.calc_xmin(f,a[r][t],u,m[r][t]);0!=d[r][t]&&(q=0);e[r][t]=126;v+=l[r][t]}}for(r=0;r<g.mode_gr;r++)for(t=0;t<g.channels_out;t++)v>n[g.VBR_max_bitrate]&&
(l[r][t]*=n[g.VBR_max_bitrate],l[r][t]/=v),e[r][t]>l[r][t]&&(e[r][t]=l[r][t]);return q};this.bitpressure_strategy=function(f,b,k,a){for(var m=0;m<f.mode_gr;m++)for(var n=0;n<f.channels_out;n++){for(var e=f.l3_side.tt[m][n],l=b[m][n],d=0,g=0;g<e.psy_lmax;g++)l[d++]*=1+.029*g*g/c.SBMAX_l/c.SBMAX_l;if(e.block_type==c.SHORT_TYPE)for(g=e.sfb_smin;g<c.SBMAX_s;g++)l[d++]*=1+.029*g*g/c.SBMAX_s/c.SBMAX_s,l[d++]*=1+.029*g*g/c.SBMAX_s/c.SBMAX_s,l[d++]*=1+.029*g*g/c.SBMAX_s/c.SBMAX_s;a[m][n]=0|Math.max(k[m][n],
.9*a[m][n])}};this.VBR_new_prepare=function(f,b,k,a,m,n){var e=f.internal_flags,l=1,d=0,g=0;if(f.free_format){e.bitrate_index=0;d=new xa(d);var q=w.ResvFrameBegin(f,d);d=d.bits;m[0]=q}else e.bitrate_index=e.VBR_max_bitrate,d=new xa(d),w.ResvFrameBegin(f,d),d=d.bits,get_framebits(f,m),q=m[e.VBR_max_bitrate];for(m=0;m<e.mode_gr;m++){E.on_pe(f,b,n[m],d,m,0);e.mode_ext==c.MPG_MD_MS_LR&&ms_convert(e.l3_side,m);for(var v=0;v<e.channels_out;++v){var p=e.l3_side.tt[m][v];e.masking_lower=Math.pow(10,.1*e.PSY.mask_adjust);
init_outer_loop(e,p);0!=E.calc_xmin(f,k[m][v],p,a[m][v])&&(l=0);g+=n[m][v]}}for(m=0;m<e.mode_gr;m++)for(v=0;v<e.channels_out;v++)g>q&&(n[m][v]*=q,n[m][v]/=g);return l};this.calc_target_bits=function(f,b,k,a,m,u){var e=f.internal_flags,l=e.l3_side;e.bitrate_index=e.VBR_max_bitrate;var d=new xa(0);u[0]=w.ResvFrameBegin(f,d);e.bitrate_index=1;d=n.getframebits(f)-8*e.sideinfo_len;m[0]=d/(e.mode_gr*e.channels_out);d=f.VBR_mean_bitrate_kbps*f.framesize*1E3;0!=(e.substep_shaping&1)&&(d*=1.09);d/=f.out_samplerate;
d-=8*e.sideinfo_len;d/=e.mode_gr*e.channels_out;var g=.93+.07*(11-f.compression_ratio)/5.5;.9>g&&(g=.9);1<g&&(g=1);for(f=0;f<e.mode_gr;f++){var q=0;for(m=0;m<e.channels_out;m++){a[f][m]=int(g*d);if(700<b[f][m]){var v=int((b[f][m]-700)/1.4),p=l.tt[f][m];a[f][m]=int(g*d);p.block_type==c.SHORT_TYPE&&v<d/2&&(v=d/2);v>3*d/2?v=3*d/2:0>v&&(v=0);a[f][m]+=v}a[f][m]>da.MAX_BITS_PER_CHANNEL&&(a[f][m]=da.MAX_BITS_PER_CHANNEL);q+=a[f][m]}if(q>da.MAX_BITS_PER_GRANULE)for(m=0;m<e.channels_out;++m)a[f][m]*=da.MAX_BITS_PER_GRANULE,
a[f][m]/=q}if(e.mode_ext==c.MPG_MD_MS_LR)for(f=0;f<e.mode_gr;f++)E.reduce_side(a[f],k[f],d*e.channels_out,da.MAX_BITS_PER_GRANULE);for(f=b=0;f<e.mode_gr;f++)for(m=0;m<e.channels_out;m++)a[f][m]>da.MAX_BITS_PER_CHANNEL&&(a[f][m]=da.MAX_BITS_PER_CHANNEL),b+=a[f][m];if(b>u[0])for(f=0;f<e.mode_gr;f++)for(m=0;m<e.channels_out;m++)a[f][m]*=u[0],a[f][m]/=b}}function Fc(){function u(b,c,a){for(var f=10,n=c+238-14-286,e=-15;0>e;e++){var l=k[f+-10];var d=b[n+-224]*l;var g=b[c+224]*l;l=k[f+-9];d+=b[n+-160]*
l;g+=b[c+160]*l;l=k[f+-8];d+=b[n+-96]*l;g+=b[c+96]*l;l=k[f+-7];d+=b[n+-32]*l;g+=b[c+32]*l;l=k[f+-6];d+=b[n+32]*l;g+=b[c+-32]*l;l=k[f+-5];d+=b[n+96]*l;g+=b[c+-96]*l;l=k[f+-4];d+=b[n+160]*l;g+=b[c+-160]*l;l=k[f+-3];d+=b[n+224]*l;g+=b[c+-224]*l;l=k[f+-2];d+=b[c+-256]*l;g-=b[n+256]*l;l=k[f+-1];d+=b[c+-192]*l;g-=b[n+192]*l;l=k[f+0];d+=b[c+-128]*l;g-=b[n+128]*l;l=k[f+1];d+=b[c+-64]*l;g-=b[n+64]*l;l=k[f+2];d+=b[c+0]*l;g-=b[n+0]*l;l=k[f+3];d+=b[c+64]*l;g-=b[n+-64]*l;l=k[f+4];d+=b[c+128]*l;g-=b[n+-128]*l;
l=k[f+5];d+=b[c+192]*l;g-=b[n+-192]*l;d*=k[f+6];l=g-d;a[30+2*e]=g+d;a[31+2*e]=k[f+7]*l;f+=18;c--;n++}g=b[c+-16]*k[f+-10];d=b[c+-32]*k[f+-2];g+=(b[c+-48]-b[c+16])*k[f+-9];d+=b[c+-96]*k[f+-1];g+=(b[c+-80]+b[c+48])*k[f+-8];d+=b[c+-160]*k[f+0];g+=(b[c+-112]-b[c+80])*k[f+-7];d+=b[c+-224]*k[f+1];g+=(b[c+-144]+b[c+112])*k[f+-6];d-=b[c+32]*k[f+2];g+=(b[c+-176]-b[c+144])*k[f+-5];d-=b[c+96]*k[f+3];g+=(b[c+-208]+b[c+176])*k[f+-4];d-=b[c+160]*k[f+4];g+=(b[c+-240]-b[c+208])*k[f+-3];d-=b[c+224];b=d-g;c=d+g;g=a[14];
d=a[15]-g;a[31]=c+g;a[30]=b+d;a[15]=b-d;a[14]=c-g;d=a[28]-a[0];a[0]+=a[28];a[28]=d*k[f+-36+7];d=a[29]-a[1];a[1]+=a[29];a[29]=d*k[f+-36+7];d=a[26]-a[2];a[2]+=a[26];a[26]=d*k[f+-72+7];d=a[27]-a[3];a[3]+=a[27];a[27]=d*k[f+-72+7];d=a[24]-a[4];a[4]+=a[24];a[24]=d*k[f+-108+7];d=a[25]-a[5];a[5]+=a[25];a[25]=d*k[f+-108+7];d=a[22]-a[6];a[6]+=a[22];a[22]=d*aa.SQRT2;d=a[23]-a[7];a[7]+=a[23];a[23]=d*aa.SQRT2-a[7];a[7]-=a[6];a[22]-=a[7];a[23]-=a[22];d=a[6];a[6]=a[31]-d;a[31]+=d;d=a[7];a[7]=a[30]-d;a[30]+=d;d=
a[22];a[22]=a[15]-d;a[15]+=d;d=a[23];a[23]=a[14]-d;a[14]+=d;d=a[20]-a[8];a[8]+=a[20];a[20]=d*k[f+-180+7];d=a[21]-a[9];a[9]+=a[21];a[21]=d*k[f+-180+7];d=a[18]-a[10];a[10]+=a[18];a[18]=d*k[f+-216+7];d=a[19]-a[11];a[11]+=a[19];a[19]=d*k[f+-216+7];d=a[16]-a[12];a[12]+=a[16];a[16]=d*k[f+-252+7];d=a[17]-a[13];a[13]+=a[17];a[17]=d*k[f+-252+7];d=-a[20]+a[24];a[20]+=a[24];a[24]=d*k[f+-216+7];d=-a[21]+a[25];a[21]+=a[25];a[25]=d*k[f+-216+7];d=a[4]-a[8];a[4]+=a[8];a[8]=d*k[f+-216+7];d=a[5]-a[9];a[5]+=a[9];a[9]=
d*k[f+-216+7];d=a[0]-a[12];a[0]+=a[12];a[12]=d*k[f+-72+7];d=a[1]-a[13];a[1]+=a[13];a[13]=d*k[f+-72+7];d=a[16]-a[28];a[16]+=a[28];a[28]=d*k[f+-72+7];d=-a[17]+a[29];a[17]+=a[29];a[29]=d*k[f+-72+7];d=aa.SQRT2*(a[2]-a[10]);a[2]+=a[10];a[10]=d;d=aa.SQRT2*(a[3]-a[11]);a[3]+=a[11];a[11]=d;d=aa.SQRT2*(-a[18]+a[26]);a[18]+=a[26];a[26]=d-a[18];d=aa.SQRT2*(-a[19]+a[27]);a[19]+=a[27];a[27]=d-a[19];d=a[2];a[19]-=a[3];a[3]-=d;a[2]=a[31]-d;a[31]+=d;d=a[3];a[11]-=a[19];a[18]-=d;a[3]=a[30]-d;a[30]+=d;d=a[18];a[27]-=
a[11];a[19]-=d;a[18]=a[15]-d;a[15]+=d;d=a[19];a[10]-=d;a[19]=a[14]-d;a[14]+=d;d=a[10];a[11]-=d;a[10]=a[23]-d;a[23]+=d;d=a[11];a[26]-=d;a[11]=a[22]-d;a[22]+=d;d=a[26];a[27]-=d;a[26]=a[7]-d;a[7]+=d;d=a[27];a[27]=a[6]-d;a[6]+=d;d=aa.SQRT2*(a[0]-a[4]);a[0]+=a[4];a[4]=d;d=aa.SQRT2*(a[1]-a[5]);a[1]+=a[5];a[5]=d;d=aa.SQRT2*(a[16]-a[20]);a[16]+=a[20];a[20]=d;d=aa.SQRT2*(a[17]-a[21]);a[17]+=a[21];a[21]=d;d=-aa.SQRT2*(a[8]-a[12]);a[8]+=a[12];a[12]=d-a[8];d=-aa.SQRT2*(a[9]-a[13]);a[9]+=a[13];a[13]=d-a[9];d=
-aa.SQRT2*(a[25]-a[29]);a[25]+=a[29];a[29]=d-a[25];d=-aa.SQRT2*(a[24]+a[28]);a[24]-=a[28];a[28]=d-a[24];d=a[24]-a[16];a[24]=d;d=a[20]-d;a[20]=d;d=a[28]-d;a[28]=d;d=a[25]-a[17];a[25]=d;d=a[21]-d;a[21]=d;d=a[29]-d;a[29]=d;d=a[17]-a[1];a[17]=d;d=a[9]-d;a[9]=d;d=a[25]-d;a[25]=d;d=a[5]-d;a[5]=d;d=a[21]-d;a[21]=d;d=a[13]-d;a[13]=d;d=a[29]-d;a[29]=d;d=a[1]-a[0];a[1]=d;d=a[16]-d;a[16]=d;d=a[17]-d;a[17]=d;d=a[8]-d;a[8]=d;d=a[9]-d;a[9]=d;d=a[24]-d;a[24]=d;d=a[25]-d;a[25]=d;d=a[4]-d;a[4]=d;d=a[5]-d;a[5]=d;d=
a[20]-d;a[20]=d;d=a[21]-d;a[21]=d;d=a[12]-d;a[12]=d;d=a[13]-d;a[13]=d;d=a[28]-d;a[28]=d;d=a[29]-d;a[29]=d;d=a[0];a[0]+=a[31];a[31]-=d;d=a[1];a[1]+=a[30];a[30]-=d;d=a[16];a[16]+=a[15];a[15]-=d;d=a[17];a[17]+=a[14];a[14]-=d;d=a[8];a[8]+=a[23];a[23]-=d;d=a[9];a[9]+=a[22];a[22]-=d;d=a[24];a[24]+=a[7];a[7]-=d;d=a[25];a[25]+=a[6];a[6]-=d;d=a[4];a[4]+=a[27];a[27]-=d;d=a[5];a[5]+=a[26];a[26]-=d;d=a[20];a[20]+=a[11];a[11]-=d;d=a[21];a[21]+=a[10];a[10]-=d;d=a[12];a[12]+=a[19];a[19]-=d;d=a[13];a[13]+=a[18];
a[18]-=d;d=a[28];a[28]+=a[3];a[3]-=d;d=a[29];a[29]+=a[2];a[2]-=d}var k=[-.1482523854003001,32.308141959636465,296.40344946382766,883.1344870032432,11113.947376231741,1057.2713659324597,305.7402417275812,30.825928907280012,3.8533188138216365,59.42900443849514,709.5899960123345,5281.91112291017,-5829.66483675846,-817.6293103748613,-76.91656988279972,-4.594269939176596,.9063471690191471,.1960342806591213,-.15466694054279598,34.324387823855965,301.8067566458425,817.599602898885,11573.795901679885,1181.2520595540152,
321.59731579894424,31.232021761053772,3.7107095756221318,53.650946155329365,684.167428119626,5224.56624370173,-6366.391851890084,-908.9766368219582,-89.83068876699639,-5.411397422890401,.8206787908286602,.3901806440322567,-.16070888947830023,36.147034243915876,304.11815768187864,732.7429163887613,11989.60988270091,1300.012278487897,335.28490093152146,31.48816102859945,3.373875931311736,47.232241542899175,652.7371796173471,5132.414255594984,-6909.087078780055,-1001.9990371107289,-103.62185754286375,
-6.104916304710272,.7416505462720353,.5805693545089249,-.16636367662261495,37.751650073343995,303.01103387567713,627.9747488785183,12358.763425278165,1412.2779918482834,346.7496836825721,31.598286663170416,3.1598635433980946,40.57878626349686,616.1671130880391,5007.833007176154,-7454.040671756168,-1095.7960341867115,-118.24411666465777,-6.818469345853504,.6681786379192989,.7653668647301797,-.1716176790982088,39.11551877123304,298.3413246578966,503.5259106886539,12679.589408408976,1516.5821921214542,
355.9850766329023,31.395241710249053,2.9164211881972335,33.79716964664243,574.8943997801362,4853.234992253242,-7997.57021486075,-1189.7624067269965,-133.6444792601766,-7.7202770609839915,.5993769336819237,.9427934736519954,-.17645823955292173,40.21879108166477,289.9982036694474,359.3226160751053,12950.259102786438,1612.1013903507662,362.85067106591504,31.045922092242872,2.822222032597987,26.988862316190684,529.8996541764288,4671.371946949588,-8535.899136645805,-1282.5898586244496,-149.58553632943463,
-8.643494270763135,.5345111359507916,1.111140466039205,-.36174739330527045,41.04429910497807,277.5463268268618,195.6386023135583,13169.43812144731,1697.6433561479398,367.40983966190305,30.557037410382826,2.531473372857427,20.070154905927314,481.50208566532336,4464.970341588308,-9065.36882077239,-1373.62841526722,-166.1660487028118,-9.58289321133207,.4729647758913199,1.268786568327291,-.36970682634889585,41.393213350082036,261.2935935556502,12.935476055240873,13336.131683328815,1772.508612059496,369.76534388639965,
29.751323653701338,2.4023193045459172,13.304795348228817,430.5615775526625,4237.0568611071185,-9581.931701634761,-1461.6913552409758,-183.12733958476446,-10.718010163869403,.41421356237309503,1.414213562373095,-.37677560326535325,41.619486213528496,241.05423794991074,-187.94665032361226,13450.063605744153,1836.153896465782,369.4908799925761,29.001847876923147,2.0714759319987186,6.779591200894186,377.7767837205709,3990.386575512536,-10081.709459700915,-1545.947424837898,-200.3762958015653,-11.864482073055006,
.3578057213145241,1.546020906725474,-.3829366947518991,41.1516456456653,216.47684307105183,-406.1569483347166,13511.136535077321,1887.8076599260432,367.3025214564151,28.136213436723654,1.913880671464418,.3829366947518991,323.85365704338597,3728.1472257487526,-10561.233882199509,-1625.2025997821418,-217.62525175416,-13.015432208941645,.3033466836073424,1.66293922460509,-.5822628872992417,40.35639251440489,188.20071124269245,-640.2706748618148,13519.21490106562,1927.6022433578062,362.8197642637487,
26.968821921868447,1.7463817695935329,-5.62650678237171,269.3016715297017,3453.386536448852,-11016.145278780888,-1698.6569643425091,-234.7658734267683,-14.16351421663124,.2504869601913055,1.76384252869671,-.5887180101749253,39.23429103868072,155.76096234403798,-889.2492977967378,13475.470561874661,1955.0535223723712,356.4450994756727,25.894952980042156,1.5695032905781554,-11.181939564328772,214.80884394039484,3169.1640829158237,-11443.321309975563,-1765.1588461316153,-251.68908574481912,-15.49755935939164,
.198912367379658,1.847759065022573,-.7912582233652842,37.39369355329111,119.699486012458,-1151.0956593239027,13380.446257078214,1970.3952110853447,348.01959814116185,24.731487364283044,1.3850130831637748,-16.421408865300393,161.05030052864092,2878.3322807850063,-11838.991423510031,-1823.985884688674,-268.2854986386903,-16.81724543849939,.1483359875383474,1.913880671464418,-.7960642926861912,35.2322109610459,80.01928065061526,-1424.0212633405113,13235.794061869668,1973.804052543835,337.9908651258184,
23.289159354463873,1.3934255946442087,-21.099669467133474,108.48348407242611,2583.700758091299,-12199.726194855148,-1874.2780658979746,-284.2467154529415,-18.11369784385905,.09849140335716425,1.961570560806461,-.998795456205172,32.56307803611191,36.958364584370486,-1706.075448829146,13043.287458812016,1965.3831106103316,326.43182772364605,22.175018750622293,1.198638339011324,-25.371248002043963,57.53505923036915,2288.41886619975,-12522.674544337233,-1914.8400385312243,-299.26241273417224,-19.37805630698734,
.04912684976946725,1.990369453344394,.0178904535*aa.SQRT2/2.384E-6,.008938074*aa.SQRT2/2.384E-6,.0015673635*aa.SQRT2/2.384E-6,.001228571*aa.SQRT2/2.384E-6,4.856585E-4*aa.SQRT2/2.384E-6,1.09434E-4*aa.SQRT2/2.384E-6,5.0783E-5*aa.SQRT2/2.384E-6,6.914E-6*aa.SQRT2/2.384E-6,12804.797818791945,1945.5515939597317,313.4244966442953,20.801593959731544,1995.1556208053692,9.000838926174497,-29.20218120805369],n=[[2.382191739347913E-13,6.423305872147834E-13,9.400849094049688E-13,1.122435026096556E-12,1.183840321267481E-12,
1.122435026096556E-12,9.40084909404969E-13,6.423305872147839E-13,2.382191739347918E-13,5.456116108943412E-12,4.878985199565852E-12,4.240448995017367E-12,3.559909094758252E-12,2.858043359288075E-12,2.156177623817898E-12,1.475637723558783E-12,8.371015190102974E-13,2.599706096327376E-13,-5.456116108943412E-12,-4.878985199565852E-12,-4.240448995017367E-12,-3.559909094758252E-12,-2.858043359288076E-12,-2.156177623817898E-12,-1.475637723558783E-12,-8.371015190102975E-13,-2.599706096327376E-13,-2.382191739347923E-13,
-6.423305872147843E-13,-9.400849094049696E-13,-1.122435026096556E-12,-1.183840321267481E-12,-1.122435026096556E-12,-9.400849094049694E-13,-6.42330587214784E-13,-2.382191739347918E-13],[2.382191739347913E-13,6.423305872147834E-13,9.400849094049688E-13,1.122435026096556E-12,1.183840321267481E-12,1.122435026096556E-12,9.400849094049688E-13,6.423305872147841E-13,2.382191739347918E-13,5.456116108943413E-12,4.878985199565852E-12,4.240448995017367E-12,3.559909094758253E-12,2.858043359288075E-12,2.156177623817898E-12,
1.475637723558782E-12,8.371015190102975E-13,2.599706096327376E-13,-5.461314069809755E-12,-4.921085770524055E-12,-4.343405037091838E-12,-3.732668368707687E-12,-3.093523840190885E-12,-2.430835727329465E-12,-1.734679010007751E-12,-9.74825365660928E-13,-2.797435120168326E-13,0,0,0,0,0,0,-2.283748241799531E-13,-4.037858874020686E-13,-2.146547464825323E-13],[.1316524975873958,.414213562373095,.7673269879789602,1.091308501069271,1.303225372841206,1.56968557711749,1.920982126971166,2.414213562373094,3.171594802363212,
4.510708503662055,7.595754112725146,22.90376554843115,.984807753012208,.6427876096865394,.3420201433256688,.9396926207859084,-.1736481776669303,-.7660444431189779,.8660254037844387,.5,-.5144957554275265,-.4717319685649723,-.3133774542039019,-.1819131996109812,-.09457419252642064,-.04096558288530405,-.01419856857247115,-.003699974673760037,.8574929257125442,.8817419973177052,.9496286491027329,.9833145924917901,.9955178160675857,.9991605581781475,.999899195244447,.9999931550702802],[0,0,0,0,0,0,2.283748241799531E-13,
4.037858874020686E-13,2.146547464825323E-13,5.461314069809755E-12,4.921085770524055E-12,4.343405037091838E-12,3.732668368707687E-12,3.093523840190885E-12,2.430835727329466E-12,1.734679010007751E-12,9.74825365660928E-13,2.797435120168326E-13,-5.456116108943413E-12,-4.878985199565852E-12,-4.240448995017367E-12,-3.559909094758253E-12,-2.858043359288075E-12,-2.156177623817898E-12,-1.475637723558782E-12,-8.371015190102975E-13,-2.599706096327376E-13,-2.382191739347913E-13,-6.423305872147834E-13,-9.400849094049688E-13,
-1.122435026096556E-12,-1.183840321267481E-12,-1.122435026096556E-12,-9.400849094049688E-13,-6.423305872147841E-13,-2.382191739347918E-13]],w=n[c.SHORT_TYPE],E=n[c.SHORT_TYPE],B=n[c.SHORT_TYPE],G=n[c.SHORT_TYPE],f=[0,1,16,17,8,9,24,25,4,5,20,21,12,13,28,29,2,3,18,19,10,11,26,27,6,7,22,23,14,15,30,31];this.mdct_sub48=function(b,k,a){for(var m=286,v=0;v<b.channels_out;v++){for(var e=0;e<b.mode_gr;e++){for(var l,d=b.l3_side.tt[e][v],g=d.xr,q=0,D=b.sb_sample[v][1-e],p=0,r=0;9>r;r++)for(u(k,m,D[p]),u(k,
m+32,D[p+1]),p+=2,m+=64,l=1;32>l;l+=2)D[p-1][l]*=-1;for(l=0;32>l;l++,q+=18){D=d.block_type;p=b.sb_sample[v][e];var t=b.sb_sample[v][1-e];0!=d.mixed_block_flag&&2>l&&(D=0);if(1E-12>b.amp_filter[l])na.fill(g,q+0,q+18,0);else{if(1>b.amp_filter[l])for(r=0;18>r;r++)t[r][f[l]]*=b.amp_filter[l];if(D==c.SHORT_TYPE){for(r=-3;0>r;r++){var J=n[c.SHORT_TYPE][r+3];g[q+3*r+9]=p[9+r][f[l]]*J-p[8-r][f[l]];g[q+3*r+18]=p[14-r][f[l]]*J+p[15+r][f[l]];g[q+3*r+10]=p[15+r][f[l]]*J-p[14-r][f[l]];g[q+3*r+19]=t[2-r][f[l]]*
J+t[3+r][f[l]];g[q+3*r+11]=t[3+r][f[l]]*J-t[2-r][f[l]];g[q+3*r+20]=t[8-r][f[l]]*J+t[9+r][f[l]]}r=g;p=q;for(J=0;3>J;J++){var h=r[p+6]*n[c.SHORT_TYPE][0]-r[p+15];t=r[p+0]*n[c.SHORT_TYPE][2]-r[p+9];var x=h+t;var y=h-t;h=r[p+15]*n[c.SHORT_TYPE][0]+r[p+6];t=r[p+9]*n[c.SHORT_TYPE][2]+r[p+0];var A=h+t;var N=-h+t;t=2.069978111953089E-11*(r[p+3]*n[c.SHORT_TYPE][1]-r[p+12]);h=2.069978111953089E-11*(r[p+12]*n[c.SHORT_TYPE][1]+r[p+3]);r[p+0]=1.90752519173728E-11*x+t;r[p+15]=1.90752519173728E-11*-A+h;y*=1.6519652744032674E-11;
A=9.537625958686404E-12*A+h;r[p+3]=y-A;r[p+6]=y+A;x=9.537625958686404E-12*x-t;N*=1.6519652744032674E-11;r[p+9]=x+N;r[p+12]=x-N;p++}}else{J=K(18);for(r=-9;0>r;r++)x=n[D][r+27]*t[r+9][f[l]]+n[D][r+36]*t[8-r][f[l]],y=n[D][r+9]*p[r+9][f[l]]-n[D][r+18]*p[8-r][f[l]],J[r+9]=x-y*w[3+r+9],J[r+18]=x*w[3+r+9]+y;r=g;p=q;x=J;var H=x[17]-x[9];var O=x[15]-x[11];var F=x[14]-x[12];N=x[0]+x[8];A=x[1]+x[7];h=x[2]+x[6];y=x[3]+x[5];r[p+17]=N+h-y-(A-x[4]);J=(N+h-y)*E[19]+(A-x[4]);t=(H-O-F)*E[18];r[p+5]=t+J;r[p+6]=t-J;
var C=(x[16]-x[10])*E[18];A=A*E[19]+x[4];t=H*E[12]+C+O*E[13]+F*E[14];J=-N*E[16]+A-h*E[17]+y*E[15];r[p+1]=t+J;r[p+2]=t-J;t=H*E[13]-C-O*E[14]+F*E[12];J=-N*E[17]+A-h*E[15]+y*E[16];r[p+9]=t+J;r[p+10]=t-J;t=H*E[14]-C+O*E[12]-F*E[13];J=N*E[15]-A+h*E[16]-y*E[17];r[p+13]=t+J;r[p+14]=t-J;H=x[8]-x[0];O=x[6]-x[2];F=x[5]-x[3];N=x[17]+x[9];A=x[16]+x[10];h=x[15]+x[11];y=x[14]+x[12];r[p+0]=N+h+y+(A+x[13]);t=(N+h+y)*E[19]-(A+x[13]);J=(H-O+F)*E[18];r[p+11]=t+J;r[p+12]=t-J;C=(x[7]-x[1])*E[18];A=x[13]-A*E[19];t=N*E[15]-
A+h*E[16]+y*E[17];J=H*E[14]+C+O*E[12]+F*E[13];r[p+3]=t+J;r[p+4]=t-J;t=-N*E[17]+A-h*E[15]-y*E[16];J=H*E[13]+C-O*E[14]-F*E[12];r[p+7]=t+J;r[p+8]=t-J;t=-N*E[16]+A-h*E[17]-y*E[15];J=H*E[12]-C+O*E[13]-F*E[14];r[p+15]=t+J;r[p+16]=t-J}}if(D!=c.SHORT_TYPE&&0!=l)for(r=7;0<=r;--r)D=g[q+r]*B[20+r]+g[q+-1-r]*G[28+r],p=g[q+r]*G[28+r]-g[q+-1-r]*B[20+r],g[q+-1-r]=D,g[q+r]=p}}k=a;m=286;if(1==b.mode_gr)for(e=0;18>e;e++)T.arraycopy(b.sb_sample[v][1][e],0,b.sb_sample[v][0][e],0,32)}}}function Xa(){this.thm=new Xb;this.en=
new Xb}function c(){var u=c.FFTOFFSET,k=c.MPG_MD_MS_LR,n=null,w=this.psy=null,E=null,B=null;this.setModules=function(c,b,k,a){n=c;w=this.psy=b;E=a;B=k};var ha=new Fc;this.lame_encode_mp3_frame=function(f,b,v,a,m,z){var e=Ob([2,2]);e[0][0]=new Xa;e[0][1]=new Xa;e[1][0]=new Xa;e[1][1]=new Xa;var l=Ob([2,2]);l[0][0]=new Xa;l[0][1]=new Xa;l[1][0]=new Xa;l[1][1]=new Xa;var d=[null,null],g=f.internal_flags,q=ca([2,4]),D=[.5,.5],p=[[0,0],[0,0]],r=[[0,0],[0,0]];d[0]=b;d[1]=v;if(0==g.lame_encode_frame_init){b=
f.internal_flags;var t,J;if(0==b.lame_encode_frame_init){v=K(2014);var h=K(2014);b.lame_encode_frame_init=1;for(J=t=0;t<286+576*(1+b.mode_gr);++t)t<576*b.mode_gr?(v[t]=0,2==b.channels_out&&(h[t]=0)):(v[t]=d[0][J],2==b.channels_out&&(h[t]=d[1][J]),++J);for(J=0;J<b.mode_gr;J++)for(t=0;t<b.channels_out;t++)b.l3_side.tt[J][t].block_type=c.SHORT_TYPE;ha.mdct_sub48(b,v,h)}}g.padding=0;0>(g.slot_lag-=g.frac_SpF)&&(g.slot_lag+=f.out_samplerate,g.padding=1);if(0!=g.psymodel)for(h=[null,null],t=0,J=X(2),v=
0;v<g.mode_gr;v++){for(b=0;b<g.channels_out;b++)h[b]=d[b],t=576+576*v-c.FFTOFFSET;b=f.VBR==G.vbr_mtrh||f.VBR==G.vbr_mt?w.L3psycho_anal_vbr(f,h,t,v,e,l,p[v],r[v],q[v],J):w.L3psycho_anal_ns(f,h,t,v,e,l,p[v],r[v],q[v],J);if(0!=b)return-4;f.mode==la.JOINT_STEREO&&(D[v]=q[v][2]+q[v][3],0<D[v]&&(D[v]=q[v][3]/D[v]));for(b=0;b<g.channels_out;b++){var x=g.l3_side.tt[v][b];x.block_type=J[b];x.mixed_block_flag=0}}else for(v=0;v<g.mode_gr;v++)for(b=0;b<g.channels_out;b++)g.l3_side.tt[v][b].block_type=c.NORM_TYPE,
g.l3_side.tt[v][b].mixed_block_flag=0,r[v][b]=p[v][b]=700;0==g.ATH.useAdjust?g.ATH.adjust=1:(b=g.loudness_sq[0][0],q=g.loudness_sq[1][0],2==g.channels_out?(b+=g.loudness_sq[0][1],q+=g.loudness_sq[1][1]):(b+=b,q+=q),2==g.mode_gr&&(b=Math.max(b,q)),b=.5*b*g.ATH.aaSensitivityP,.03125<b?(1<=g.ATH.adjust?g.ATH.adjust=1:g.ATH.adjust<g.ATH.adjustLimit&&(g.ATH.adjust=g.ATH.adjustLimit),g.ATH.adjustLimit=1):(q=31.98*b+6.25E-4,g.ATH.adjust>=q?(g.ATH.adjust*=.075*q+.925,g.ATH.adjust<q&&(g.ATH.adjust=q)):g.ATH.adjustLimit>=
q?g.ATH.adjust=q:g.ATH.adjust<g.ATH.adjustLimit&&(g.ATH.adjust=g.ATH.adjustLimit),g.ATH.adjustLimit=q));ha.mdct_sub48(g,d[0],d[1]);g.mode_ext=c.MPG_MD_LR_LR;if(f.force_ms)g.mode_ext=c.MPG_MD_MS_LR;else if(f.mode==la.JOINT_STEREO){for(v=h=q=0;v<g.mode_gr;v++)for(b=0;b<g.channels_out;b++)q+=r[v][b],h+=p[v][b];q<=1*h&&(q=g.l3_side.tt[0],b=g.l3_side.tt[g.mode_gr-1],q[0].block_type==q[1].block_type&&b[0].block_type==b[1].block_type&&(g.mode_ext=c.MPG_MD_MS_LR))}g.mode_ext==k&&(e=l,p=r);if(f.analysis&&
null!=g.pinfo)for(v=0;v<g.mode_gr;v++)for(b=0;b<g.channels_out;b++)g.pinfo.ms_ratio[v]=g.ms_ratio[v],g.pinfo.ms_ener_ratio[v]=D[v],g.pinfo.blocktype[v][b]=g.l3_side.tt[v][b].block_type,g.pinfo.pe[v][b]=p[v][b],T.arraycopy(g.l3_side.tt[v][b].xr,0,g.pinfo.xr[v][b],0,576),g.mode_ext==k&&(g.pinfo.ers[v][b]=g.pinfo.ers[v][b+2],T.arraycopy(g.pinfo.energy[v][b+2],0,g.pinfo.energy[v][b],0,g.pinfo.energy[v][b].length));if(f.VBR==G.vbr_off||f.VBR==G.vbr_abr){for(l=0;18>l;l++)g.nsPsy.pefirbuf[l]=g.nsPsy.pefirbuf[l+
1];for(v=r=0;v<g.mode_gr;v++)for(b=0;b<g.channels_out;b++)r+=p[v][b];g.nsPsy.pefirbuf[18]=r;r=g.nsPsy.pefirbuf[9];for(l=0;9>l;l++)r+=(g.nsPsy.pefirbuf[l]+g.nsPsy.pefirbuf[18-l])*c.fircoef[l];r=3350*g.mode_gr*g.channels_out/r;for(v=0;v<g.mode_gr;v++)for(b=0;b<g.channels_out;b++)p[v][b]*=r}g.iteration_loop.iteration_loop(f,p,D,e);n.format_bitstream(f);a=n.copy_buffer(g,a,m,z,1);f.bWriteVbrTag&&E.addVbrFrame(f);if(f.analysis&&null!=g.pinfo){for(b=0;b<g.channels_out;b++){for(m=0;m<u;m++)g.pinfo.pcmdata[b][m]=
g.pinfo.pcmdata[b][m+f.framesize];for(m=u;1600>m;m++)g.pinfo.pcmdata[b][m]=d[b][m-u]}B.set_frame_pinfo(f,e)}g.bitrate_stereoMode_Hist[g.bitrate_index][4]++;g.bitrate_stereoMode_Hist[15][4]++;2==g.channels_out&&(g.bitrate_stereoMode_Hist[g.bitrate_index][g.mode_ext]++,g.bitrate_stereoMode_Hist[15][g.mode_ext]++);for(f=0;f<g.mode_gr;++f)for(d=0;d<g.channels_out;++d)m=g.l3_side.tt[f][d].block_type|0,0!=g.l3_side.tt[f][d].mixed_block_flag&&(m=4),g.bitrate_blockType_Hist[g.bitrate_index][m]++,g.bitrate_blockType_Hist[g.bitrate_index][5]++,
g.bitrate_blockType_Hist[15][m]++,g.bitrate_blockType_Hist[15][5]++;return a}}function Gc(){this.size=this.pos=this.want=this.seen=this.sum=0;this.bag=null;this.TotalFrameSize=this.nBytesWritten=this.nVbrNumFrames=0}function Hc(){this.tt=[[null,null],[null,null]];this.resvDrain_post=this.resvDrain_pre=this.private_bits=this.main_data_begin=0;this.scfsi=[X(4),X(4)];for(var c=0;2>c;c++)for(var k=0;2>k;k++)this.tt[c][k]=new rb}function Ic(){this.last_en_subshort=ca([4,9]);this.lastAttacks=X(4);this.pefirbuf=
K(19);this.longfact=K(c.SBMAX_l);this.shortfact=K(c.SBMAX_s);this.attackthre_s=this.attackthre=0}function Xb(){this.l=K(c.SBMAX_l);this.s=ca([c.SBMAX_s,3]);var u=this;this.assign=function(k){T.arraycopy(k.l,0,u.l,0,c.SBMAX_l);for(var n=0;n<c.SBMAX_s;n++)for(var w=0;3>w;w++)u.s[n][w]=k.s[n][w]}}function da(){function u(){this.ptr=this.write_timing=0;this.buf=new Int8Array(40)}this.fill_buffer_resample_init=this.iteration_init_init=this.lame_encode_frame_init=this.Class_ID=0;this.mfbuf=ca([2,da.MFSIZE]);
this.full_outer_loop=this.use_best_huffman=this.subblock_gain=this.noise_shaping_stop=this.psymodel=this.substep_shaping=this.noise_shaping_amp=this.noise_shaping=this.highpass2=this.highpass1=this.lowpass2=this.lowpass1=this.mode_ext=this.samplerate_index=this.bitrate_index=this.VBR_max_bitrate=this.VBR_min_bitrate=this.mf_size=this.mf_samples_to_encode=this.resample_ratio=this.channels_out=this.channels_in=this.mode_gr=0;this.l3_side=new Hc;this.ms_ratio=K(2);this.slot_lag=this.frac_SpF=this.padding=
0;this.tag_spec=null;this.nMusicCRC=0;this.OldValue=X(2);this.CurrentStep=X(2);this.masking_lower=0;this.bv_scf=X(576);this.pseudohalf=X(sa.SFBMAX);this.sfb21_extra=!1;this.inbuf_old=Array(2);this.blackfilt=Array(2*da.BPC+1);this.itime=new Float64Array(2);this.sideinfo_len=0;this.sb_sample=ca([2,2,18,c.SBLIMIT]);this.amp_filter=K(32);this.header=Array(da.MAX_HEADER_BUF);this.ResvMax=this.ResvSize=this.ancillary_flag=this.w_ptr=this.h_ptr=0;this.scalefac_band=new za;this.minval_l=K(c.CBANDS);this.minval_s=
K(c.CBANDS);this.nb_1=ca([4,c.CBANDS]);this.nb_2=ca([4,c.CBANDS]);this.nb_s1=ca([4,c.CBANDS]);this.nb_s2=ca([4,c.CBANDS]);this.s3_ll=this.s3_ss=null;this.decay=0;this.thm=Array(4);this.en=Array(4);this.tot_ener=K(4);this.loudness_sq=ca([2,2]);this.loudness_sq_save=K(2);this.mld_l=K(c.SBMAX_l);this.mld_s=K(c.SBMAX_s);this.bm_l=X(c.SBMAX_l);this.bo_l=X(c.SBMAX_l);this.bm_s=X(c.SBMAX_s);this.bo_s=X(c.SBMAX_s);this.npart_s=this.npart_l=0;this.s3ind=Ia([c.CBANDS,2]);this.s3ind_s=Ia([c.CBANDS,2]);this.numlines_s=
X(c.CBANDS);this.numlines_l=X(c.CBANDS);this.rnumlines_l=K(c.CBANDS);this.mld_cb_l=K(c.CBANDS);this.mld_cb_s=K(c.CBANDS);this.numlines_l_num1=this.numlines_s_num1=0;this.pe=K(4);this.ms_ener_ratio_old=this.ms_ratio_l_old=this.ms_ratio_s_old=0;this.blocktype_old=X(2);this.nsPsy=new Ic;this.VBR_seek_table=new Gc;this.PSY=this.ATH=null;this.nogap_current=this.nogap_total=0;this.findPeakSample=this.findReplayGain=this.decode_on_the_fly=!0;this.AudiophileGain=this.RadioGain=this.PeakSample=0;this.rgdata=
null;this.noclipScale=this.noclipGainChange=0;this.bitrate_stereoMode_Hist=Ia([16,5]);this.bitrate_blockType_Hist=Ia([16,6]);this.hip=this.pinfo=null;this.in_buffer_nsamples=0;this.iteration_loop=this.in_buffer_1=this.in_buffer_0=null;for(var k=0;k<this.en.length;k++)this.en[k]=new Xb;for(k=0;k<this.thm.length;k++)this.thm[k]=new Xb;for(k=0;k<this.header.length;k++)this.header[k]=new u}function Jc(){function u(c,k,f){var b=0;f<<=1;var n=k+f;var a=4;do{var m;var u=a>>1;var e=a;var l=a<<1;var d=l+e;
a=l<<1;var g=k;var q=g+u;do{var B=c[g+0]-c[g+e];var p=c[g+0]+c[g+e];var r=c[g+l]-c[g+d];var t=c[g+l]+c[g+d];c[g+l]=p-t;c[g+0]=p+t;c[g+d]=B-r;c[g+e]=B+r;B=c[q+0]-c[q+e];p=c[q+0]+c[q+e];r=aa.SQRT2*c[q+d];t=aa.SQRT2*c[q+l];c[q+l]=p-t;c[q+0]=p+t;c[q+d]=B-r;c[q+e]=B+r;q+=a;g+=a}while(g<n);var E=w[b+0];var h=w[b+1];for(m=1;m<u;m++){var x=1-2*h*h;var y=2*h*E;g=k+m;q=k+e-m;do{var A=y*c[g+e]-x*c[q+e];t=x*c[g+e]+y*c[q+e];B=c[g+0]-t;p=c[g+0]+t;var K=c[q+0]-A;var H=c[q+0]+A;A=y*c[g+d]-x*c[q+d];t=x*c[g+d]+y*c[q+
d];r=c[g+l]-t;t=c[g+l]+t;var O=c[q+l]-A;var F=c[q+l]+A;A=h*t-E*O;t=E*t+h*O;c[g+l]=p-t;c[g+0]=p+t;c[q+d]=K-A;c[q+e]=K+A;A=E*F-h*r;t=h*F+E*r;c[q+l]=H-t;c[q+0]=H+t;c[g+d]=B-A;c[g+e]=B+A;q+=a;g+=a}while(g<n);x=E;E=x*w[b+0]-h*w[b+1];h=x*w[b+1]+h*w[b+0]}b+=2}while(a<f)}var k=K(c.BLKSIZE),n=K(c.BLKSIZE_s/2),w=[.9238795325112867,.3826834323650898,.9951847266721969,.0980171403295606,.9996988186962042,.02454122852291229,.9999811752826011,.006135884649154475],E=[0,128,64,192,32,160,96,224,16,144,80,208,48,176,
112,240,8,136,72,200,40,168,104,232,24,152,88,216,56,184,120,248,4,132,68,196,36,164,100,228,20,148,84,212,52,180,116,244,12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254];this.fft_short=function(k,w,f,b,v){for(k=0;3>k;k++){var a=c.BLKSIZE_s/2,m=65535&192*(k+1),B=
c.BLKSIZE_s/8-1;do{var e=E[B<<2]&255;var l=n[e]*b[f][v+e+m];var d=n[127-e]*b[f][v+e+m+128];var g=l-d;l+=d;var q=n[e+64]*b[f][v+e+m+64];d=n[63-e]*b[f][v+e+m+192];var D=q-d;q+=d;a-=4;w[k][a+0]=l+q;w[k][a+2]=l-q;w[k][a+1]=g+D;w[k][a+3]=g-D;l=n[e+1]*b[f][v+e+m+1];d=n[126-e]*b[f][v+e+m+129];g=l-d;l+=d;q=n[e+65]*b[f][v+e+m+65];d=n[62-e]*b[f][v+e+m+193];D=q-d;q+=d;w[k][a+c.BLKSIZE_s/2+0]=l+q;w[k][a+c.BLKSIZE_s/2+2]=l-q;w[k][a+c.BLKSIZE_s/2+1]=g+D;w[k][a+c.BLKSIZE_s/2+3]=g-D}while(0<=--B);u(w[k],a,c.BLKSIZE_s/
2)}};this.fft_long=function(n,w,f,b,v){n=c.BLKSIZE/8-1;var a=c.BLKSIZE/2;do{var m=E[n]&255;var B=k[m]*b[f][v+m];var e=k[m+512]*b[f][v+m+512];var l=B-e;B+=e;var d=k[m+256]*b[f][v+m+256];e=k[m+768]*b[f][v+m+768];var g=d-e;d+=e;a-=4;w[a+0]=B+d;w[a+2]=B-d;w[a+1]=l+g;w[a+3]=l-g;B=k[m+1]*b[f][v+m+1];e=k[m+513]*b[f][v+m+513];l=B-e;B+=e;d=k[m+257]*b[f][v+m+257];e=k[m+769]*b[f][v+m+769];g=d-e;d+=e;w[a+c.BLKSIZE/2+0]=B+d;w[a+c.BLKSIZE/2+2]=B-d;w[a+c.BLKSIZE/2+1]=l+g;w[a+c.BLKSIZE/2+3]=l-g}while(0<=--n);u(w,
a,c.BLKSIZE/2)};this.init_fft=function(u){for(u=0;u<c.BLKSIZE;u++)k[u]=.42-.5*Math.cos(2*Math.PI*(u+.5)/c.BLKSIZE)+.08*Math.cos(4*Math.PI*(u+.5)/c.BLKSIZE);for(u=0;u<c.BLKSIZE_s/2;u++)n[u]=.5*(1-Math.cos(2*Math.PI*(u+.5)/c.BLKSIZE_s))}}function Pb(){function u(a,d){for(var b=0,h=0;h<c.BLKSIZE/2;++h)b+=a[h]*d.ATH.eql_w[h];return b*=D}function k(a,c,d,b,f,e){if(c>a)if(c<a*r)var g=c/a;else return a+c;else{if(a>=c*r)return a+c;g=a/c}a+=c;if(6>=b+3){if(g>=p)return a;b=0|aa.FAST_LOG10_X(g,16);return a*
x[b]}b=0|aa.FAST_LOG10_X(g,16);c=0!=e?f.ATH.cb_s[d]*f.ATH.adjust:f.ATH.cb_l[d]*f.ATH.adjust;return a<t*c?a>c?(d=1,13>=b&&(d=y[b]),c=aa.FAST_LOG10_X(a/c,10/15),a*((h[b]-d)*c+d)):13<b?a:a*y[b]:a*h[b]}function n(a,c,d){0>a&&(a=0);0>c&&(c=0);if(0>=a)return c;if(0>=c)return a;var b=c>a?c/a:a/c;if(-2<=d&&2>=d){if(b>=p)return a+c;d=0|aa.FAST_LOG10_X(b,16);return(a+c)*A[d]}if(b<r)return a+c;a<c&&(a=c);return a}function w(a,d,b,h,f){var e,g,l=0,k=0;for(e=g=0;e<c.SBMAX_s;++g,++e){var m=a.bo_s[e],y=a.npart_s;
for(m=m<y?m:y;g<m;)l+=d[g],k+=b[g],g++;a.en[h].s[e][f]=l;a.thm[h].s[e][f]=k;if(g>=y){++e;break}k=a.PSY.bo_s_weight[e];y=1-k;l=k*d[g];k*=b[g];a.en[h].s[e][f]+=l;a.thm[h].s[e][f]+=k;l=y*d[g];k=y*b[g]}for(;e<c.SBMAX_s;++e)a.en[h].s[e][f]=0,a.thm[h].s[e][f]=0}function E(a,d,b,h){var f,e,g=0,l=0;for(f=e=0;f<c.SBMAX_l;++e,++f){var k=a.bo_l[f],m=a.npart_l;for(k=k<m?k:m;e<k;)g+=d[e],l+=b[e],e++;a.en[h].l[f]=g;a.thm[h].l[f]=l;if(e>=m){++f;break}l=a.PSY.bo_l_weight[f];m=1-l;g=l*d[e];l*=b[e];a.en[h].l[f]+=g;
a.thm[h].l[f]+=l;g=m*d[e];l=m*b[e]}for(;f<c.SBMAX_l;++f)a.en[h].l[f]=0,a.thm[h].l[f]=0}function B(a,c,d){return 1<=d?a:0>=d?c:0<c?Math.pow(a/c,d)*c:0}function W(a,d){for(var b=309.07,h=0;h<c.SBMAX_s-1;h++)for(var f=0;3>f;f++){var e=a.thm.s[h][f];if(0<e){e*=d;var g=a.en.s[h][f];g>e&&(b=g>1E10*e?b+23.02585092994046*N[h]:b+N[h]*aa.FAST_LOG10(g/e))}}return b}function f(a,d){for(var b=281.0575,h=0;h<c.SBMAX_l-1;h++){var f=a.thm.l[h];if(0<f){f*=d;var e=a.en.l[h];e>f&&(b=e>1E10*f?b+23.02585092994046*H[h]:
b+H[h]*aa.FAST_LOG10(e/f))}}return b}function b(a,c,b,d,h){var f,e;for(f=e=0;f<a.npart_l;++f){var g=0,l=0,k;for(k=0;k<a.numlines_l[f];++k,++e){var m=c[e];g+=m;l<m&&(l=m)}b[f]=g;d[f]=l;h[f]=g*a.rnumlines_l[f]}}function v(a,c,b,d){var h=J.length-1,f=0,e=b[f]+b[f+1];if(0<e){var g=c[f];g<c[f+1]&&(g=c[f+1]);e=20*(2*g-e)/(e*(a.numlines_l[f]+a.numlines_l[f+1]-1));e|=0;e>h&&(e=h);d[f]=e}else d[f]=0;for(f=1;f<a.npart_l-1;f++)e=b[f-1]+b[f]+b[f+1],0<e?(g=c[f-1],g<c[f]&&(g=c[f]),g<c[f+1]&&(g=c[f+1]),e=20*(3*
g-e)/(e*(a.numlines_l[f-1]+a.numlines_l[f]+a.numlines_l[f+1]-1)),e|=0,e>h&&(e=h),d[f]=e):d[f]=0;e=b[f-1]+b[f];0<e?(g=c[f-1],g<c[f]&&(g=c[f]),e=20*(2*g-e)/(e*(a.numlines_l[f-1]+a.numlines_l[f]-1)),e|=0,e>h&&(e=h),d[f]=e):d[f]=0}function a(a,c,b,d,f,h,e){var g=2*h;f=0<h?Math.pow(10,f):1;for(var l,k,m=0;m<e;++m){var y=a[2][m],p=a[3][m],q=c[0][m],n=c[1][m],x=c[2][m],r=c[3][m];q<=1.58*n&&n<=1.58*q?(l=b[m]*y,k=Math.max(x,Math.min(r,b[m]*p)),l=Math.max(r,Math.min(x,l))):(k=x,l=r);0<h&&(r=d[m]*f,q=Math.min(Math.max(q,
r),Math.max(n,r)),x=Math.max(k,r),r=Math.max(l,r),n=x+r,0<n&&q*g<n&&(q=q*g/n,x*=q,r*=q),k=Math.min(x,k),l=Math.min(r,l));k>y&&(k=y);l>p&&(l=p);c[2][m]=k;c[3][m]=l}}function m(a,c){a=0<=a?27*-a:a*c;return-72>=a?0:Math.exp(.2302585093*a)}function z(a){0>a&&(a=0);a*=.001;return 13*Math.atan(.76*a)+3.5*Math.atan(a*a/56.25)}function e(a,b,d,f,h,e,g,l,k,m,y,p){var q=K(c.CBANDS+1),n=l/(15<p?1152:384),x=X(c.HBLKSIZE),r;l/=k;var u=0,C=0;for(r=0;r<c.CBANDS;r++){var t;var A=z(l*u);q[r]=l*u;for(t=u;.34>z(l*t)-
A&&t<=k/2;t++);a[r]=t-u;for(C=r+1;u<t;)x[u++]=r;if(u>k/2){u=k/2;++r;break}}q[r]=l*u;for(u=0;u<p;u++)r=m[u],A=m[u+1],r=0|Math.floor(.5+y*(r-.5)),0>r&&(r=0),t=0|Math.floor(.5+y*(A-.5)),t>k/2&&(t=k/2),d[u]=(x[r]+x[t])/2,b[u]=x[t],g[u]=(n*A-q[b[u]])/(q[b[u]+1]-q[b[u]]),0>g[u]?g[u]=0:1<g[u]&&(g[u]=1),A=z(l*m[u]*y),A=Math.min(A,15.5)/15.5,e[u]=Math.pow(10,1.25*(1-Math.cos(Math.PI*A))-2.5);for(b=u=0;b<C;b++)d=a[b],A=z(l*u),e=z(l*(u+d-1)),f[b]=.5*(A+e),A=z(l*(u-.5)),e=z(l*(u+d-.5)),h[b]=e-A,u+=d;return C}
function l(a,b,d,f,h,e){var g=ca([c.CBANDS,c.CBANDS]),l=0;if(e)for(var k=0;k<b;k++)for(e=0;e<b;e++){var y=d[k]-d[e];y=0<=y?3*y:1.5*y;if(.5<=y&&2.5>=y){var p=y-.5;p=8*(p*p-2*p)}else p=0;y+=.474;y=15.811389+7.5*y-17.5*Math.sqrt(1+y*y);-60>=y?p=0:(y=Math.exp(.2302585093*(p+y)),p=y/.6609193);y=p*f[e];g[k][e]=y*h[k]}else for(e=0;e<b;e++){p=15+Math.min(21/d[e],12);var q;var n;k=p;for(q=0;1E-20<m(q,k);--q);var x=q;for(n=0;1E-12<Math.abs(n-x);)q=(n+x)/2,0<m(q,k)?n=q:x=q;y=x;for(q=0;1E-20<m(q,k);q+=1);x=0;
for(n=q;1E-12<Math.abs(n-x);)q=(n+x)/2,0<m(q,k)?x=q:n=q;x=n;var r=0;for(n=0;1E3>=n;++n)q=y+n*(x-y)/1E3,q=m(q,k),r+=q;q=1001/(r*(x-y));for(k=0;k<b;k++)y=q*m(d[k]-d[e],p)*f[e],g[k][e]=y*h[k]}for(k=0;k<b;k++){for(e=0;e<b&&!(0<g[k][e]);e++);a[k][0]=e;for(e=b-1;0<e&&!(0<g[k][e]);e--);a[k][1]=e;l+=a[k][1]-a[k][0]+1}d=K(l);for(k=f=0;k<b;k++)for(e=a[k][0];e<=a[k][1];e++)d[f++]=g[k][e];return d}function d(a){a=z(a);a=Math.min(a,15.5)/15.5;return Math.pow(10,1.25*(1-Math.cos(Math.PI*a))-2.5)}function g(a,c){-.3>
a&&(a=3410);a=Math.max(.1,a/1E3);return 3.64*Math.pow(a,-.8)-6.8*Math.exp(-.6*Math.pow(a-3.4,2))+6*Math.exp(-.15*Math.pow(a-8.7,2))+.001*(.6+.04*c)*Math.pow(a,4)}var q=new Jc,D=1/217621504/(c.BLKSIZE/2),p,r,t,J=[1,.79433,.63096,.63096,.63096,.63096,.63096,.25119,.11749],h=[3.3246*3.3246,3.23837*3.23837,9.9500500969,9.0247369744,8.1854926609,7.0440875649,2.46209*2.46209,2.284*2.284,4.4892710641,1.96552*1.96552,1.82335*1.82335,1.69146*1.69146,2.4621061921,2.1508568964,1.37074*1.37074,1.31036*1.31036,
1.5691069696,1.4555939904,1.16203*1.16203,1.2715945225,1.09428*1.09428,1.0659*1.0659,1.0779838276,1.0382591025,1],x=[1.7782755904,1.35879*1.35879,1.38454*1.38454,1.39497*1.39497,1.40548*1.40548,1.3537*1.3537,1.6999465924,1.22321*1.22321,1.3169398564,1],y=[5.5396212496,2.29259*2.29259,4.9868695969,2.12675*2.12675,2.02545*2.02545,1.87894*1.87894,1.74303*1.74303,1.61695*1.61695,2.2499700001,1.39148*1.39148,1.29083*1.29083,1.19746*1.19746,1.2339655056,1.0779838276],A=[1.7782755904,1.35879*1.35879,1.38454*
1.38454,1.39497*1.39497,1.40548*1.40548,1.3537*1.3537,1.6999465924,1.22321*1.22321,1.3169398564,1],N=[11.8,13.6,17.2,32,46.5,51.3,57.5,67.1,71.5,84.6,97.6,130],H=[6.8,5.8,5.8,6.4,6.5,9.9,12.1,14.4,15,18.9,21.6,26.9,34.2,40.2,46.8,56.5,60.7,73.9,85.7,93.4,126.1],O=[-1.730326E-17,-.01703172,-1.349528E-17,.0418072,-6.73278E-17,-.0876324,-3.0835E-17,.1863476,-1.104424E-16,-.627638];this.L3psycho_anal_ns=function(a,d,h,e,g,l,m,y,p,n){var x=a.internal_flags,r=ca([2,c.BLKSIZE]),t=ca([2,3,c.BLKSIZE_s]),A=
K(c.CBANDS+1),I=K(c.CBANDS+1),C=K(c.CBANDS+2),Q=X(2),S=X(2),z,D,F,H,N,Z,L,V=ca([2,576]),ma=X(c.CBANDS+2),R=X(c.CBANDS+2);na.fill(R,0);var T=x.channels_out;a.mode==la.JOINT_STEREO&&(T=4);var M=a.VBR==G.vbr_off?0==x.ResvMax?0:x.ResvSize/x.ResvMax*.5:a.VBR==G.vbr_rh||a.VBR==G.vbr_mtrh||a.VBR==G.vbr_mt?.6:1;for(z=0;z<x.channels_out;z++){var Y=d[z],ha=h+576-350-21+192;for(F=0;576>F;F++){var U;var da=Y[ha+F+10];for(H=U=0;9>H;H+=2)da+=O[H]*(Y[ha+F+H]+Y[ha+F+21-H]),U+=O[H+1]*(Y[ha+F+H+1]+Y[ha+F+21-H-1]);
V[z][F]=da+U}g[e][z].en.assign(x.en[z]);g[e][z].thm.assign(x.thm[z]);2<T&&(l[e][z].en.assign(x.en[z+2]),l[e][z].thm.assign(x.thm[z+2]))}for(z=0;z<T;z++){var Qa=K(12),ya=[0,0,0,0],qa=K(12),ia=1,sa=K(c.CBANDS),Fa=K(c.CBANDS),ta=[0,0,0,0],za=K(c.HBLKSIZE),Wb=ca([3,c.HBLKSIZE_s]);for(F=0;3>F;F++)Qa[F]=x.nsPsy.last_en_subshort[z][F+6],qa[F]=Qa[F]/x.nsPsy.last_en_subshort[z][F+4],ya[0]+=Qa[F];if(2==z)for(F=0;576>F;F++){var Ya=V[0][F];var Xa=V[1][F];V[0][F]=Ya+Xa;V[1][F]=Ya-Xa}var Ia=V[z&1],ec=0;for(F=0;9>
F;F++){for(var xa=ec+64,Ga=1;ec<xa;ec++)Ga<Math.abs(Ia[ec])&&(Ga=Math.abs(Ia[ec]));x.nsPsy.last_en_subshort[z][F]=Qa[F+3]=Ga;ya[1+F/3]+=Ga;Ga=Ga>Qa[F+3-2]?Ga/Qa[F+3-2]:Qa[F+3-2]>10*Ga?Qa[F+3-2]/(10*Ga):0;qa[F+3]=Ga}if(a.analysis){var Qb=qa[0];for(F=1;12>F;F++)Qb<qa[F]&&(Qb=qa[F]);x.pinfo.ers[e][z]=x.pinfo.ers_save[z];x.pinfo.ers_save[z]=Qb}var Ma=3==z?x.nsPsy.attackthre_s:x.nsPsy.attackthre;for(F=0;12>F;F++)0==ta[F/3]&&qa[F]>Ma&&(ta[F/3]=F%3+1);for(F=1;4>F;F++)1.7>(ya[F-1]>ya[F]?ya[F-1]/ya[F]:ya[F]/
ya[F-1])&&(ta[F]=0,1==F&&(ta[0]=0));0!=ta[0]&&0!=x.nsPsy.lastAttacks[z]&&(ta[0]=0);if(3==x.nsPsy.lastAttacks[z]||0!=ta[0]+ta[1]+ta[2]+ta[3])ia=0,0!=ta[1]&&0!=ta[0]&&(ta[1]=0),0!=ta[2]&&0!=ta[1]&&(ta[2]=0),0!=ta[3]&&0!=ta[2]&&(ta[3]=0);2>z?S[z]=ia:0==ia&&(S[0]=S[1]=0);p[z]=x.tot_ener[z];var P=a,Ha=za,Gb=Wb,La=r,kb=z&1,Ra=t,Na=z&1,cb=e,Aa=z,va=d,qb=h,Va=P.internal_flags;if(2>Aa)q.fft_long(Va,La[kb],Aa,va,qb),q.fft_short(Va,Ra[Na],Aa,va,qb);else if(2==Aa){for(var ja=c.BLKSIZE-1;0<=ja;--ja){var Hb=La[kb+
0][ja],Ib=La[kb+1][ja];La[kb+0][ja]=(Hb+Ib)*aa.SQRT2*.5;La[kb+1][ja]=(Hb-Ib)*aa.SQRT2*.5}for(var Ba=2;0<=Ba;--Ba)for(ja=c.BLKSIZE_s-1;0<=ja;--ja)Hb=Ra[Na+0][Ba][ja],Ib=Ra[Na+1][Ba][ja],Ra[Na+0][Ba][ja]=(Hb+Ib)*aa.SQRT2*.5,Ra[Na+1][Ba][ja]=(Hb-Ib)*aa.SQRT2*.5}Ha[0]=La[kb+0][0];Ha[0]*=Ha[0];for(ja=c.BLKSIZE/2-1;0<=ja;--ja){var fc=La[kb+0][c.BLKSIZE/2-ja],tb=La[kb+0][c.BLKSIZE/2+ja];Ha[c.BLKSIZE/2-ja]=.5*(fc*fc+tb*tb)}for(Ba=2;0<=Ba;--Ba)for(Gb[Ba][0]=Ra[Na+0][Ba][0],Gb[Ba][0]*=Gb[Ba][0],ja=c.BLKSIZE_s/
2-1;0<=ja;--ja)fc=Ra[Na+0][Ba][c.BLKSIZE_s/2-ja],tb=Ra[Na+0][Ba][c.BLKSIZE_s/2+ja],Gb[Ba][c.BLKSIZE_s/2-ja]=.5*(fc*fc+tb*tb);var oa=0;for(ja=11;ja<c.HBLKSIZE;ja++)oa+=Ha[ja];Va.tot_ener[Aa]=oa;if(P.analysis){for(ja=0;ja<c.HBLKSIZE;ja++)Va.pinfo.energy[cb][Aa][ja]=Va.pinfo.energy_save[Aa][ja],Va.pinfo.energy_save[Aa][ja]=Ha[ja];Va.pinfo.pe[cb][Aa]=Va.pe[Aa]}2==P.athaa_loudapprox&&2>Aa&&(Va.loudness_sq[cb][Aa]=Va.loudness_sq_save[Aa],Va.loudness_sq_save[Aa]=u(Ha,Va));b(x,za,A,sa,Fa);v(x,sa,Fa,ma);for(L=
0;3>L;L++){var ea=void 0,Ab=void 0,Bb=Wb,Sa=I,Za=C,ub=z,zb=L,Ja=a.internal_flags;for(ea=Ab=0;ea<Ja.npart_s;++ea){for(var Rb=0,rb=0,db=Ja.numlines_s[ea],sb=0;sb<db;++sb,++Ab){var Cb=Bb[zb][Ab];Rb+=Cb;rb<Cb&&(rb=Cb)}Sa[ea]=Rb}for(Ab=ea=0;ea<Ja.npart_s;ea++){var Db=Ja.s3ind_s[ea][0],$a=Ja.s3_ss[Ab++]*Sa[Db];for(++Db;Db<=Ja.s3ind_s[ea][1];)$a+=Ja.s3_ss[Ab]*Sa[Db],++Ab,++Db;var vb=2*Ja.nb_s1[ub][ea];Za[ea]=Math.min($a,vb);Ja.blocktype_old[ub&1]==c.SHORT_TYPE&&(vb=16*Ja.nb_s2[ub][ea],Za[ea]=Math.min(vb,
Za[ea]));Ja.nb_s2[ub][ea]=Ja.nb_s1[ub][ea];Ja.nb_s1[ub][ea]=$a}for(;ea<=c.CBANDS;++ea)Sa[ea]=0,Za[ea]=0;w(x,I,C,z,L);for(Z=0;Z<c.SBMAX_s;Z++){var Ta=x.thm[z].s[Z][L];Ta*=.8;if(2<=ta[L]||1==ta[L+1]){var wb=0!=L?L-1:2;Ga=B(x.thm[z].s[Z][wb],Ta,.6*M);Ta=Math.min(Ta,Ga)}if(1==ta[L])wb=0!=L?L-1:2,Ga=B(x.thm[z].s[Z][wb],Ta,.3*M),Ta=Math.min(Ta,Ga);else if(0!=L&&3==ta[L-1]||0==L&&3==x.nsPsy.lastAttacks[z])wb=2!=L?L+1:0,Ga=B(x.thm[z].s[Z][wb],Ta,.3*M),Ta=Math.min(Ta,Ga);var Yb=Qa[3*L+3]+Qa[3*L+4]+Qa[3*L+
5];6*Qa[3*L+5]<Yb&&(Ta*=.5,6*Qa[3*L+4]<Yb&&(Ta*=.5));x.thm[z].s[Z][L]=Ta}}x.nsPsy.lastAttacks[z]=ta[2];for(D=N=0;D<x.npart_l;D++){for(var eb=x.s3ind[D][0],Jb=A[eb]*J[ma[eb]],lb=x.s3_ll[N++]*Jb;++eb<=x.s3ind[D][1];)Jb=A[eb]*J[ma[eb]],lb=k(lb,x.s3_ll[N++]*Jb,eb,eb-D,x,0);lb*=.158489319246111;C[D]=x.blocktype_old[z&1]==c.SHORT_TYPE?lb:B(Math.min(lb,Math.min(2*x.nb_1[z][D],16*x.nb_2[z][D])),lb,M);x.nb_2[z][D]=x.nb_1[z][D];x.nb_1[z][D]=lb}for(;D<=c.CBANDS;++D)A[D]=0,C[D]=0;E(x,A,C,z)}if((a.mode==la.STEREO||
a.mode==la.JOINT_STEREO)&&0<a.interChRatio){var xb=a.interChRatio,fa=a.internal_flags;if(1<fa.channels_out){for(var Ca=0;Ca<c.SBMAX_l;Ca++){var Sb=fa.thm[0].l[Ca],Eb=fa.thm[1].l[Ca];fa.thm[0].l[Ca]+=Eb*xb;fa.thm[1].l[Ca]+=Sb*xb}for(Ca=0;Ca<c.SBMAX_s;Ca++)for(var fb=0;3>fb;fb++)Sb=fa.thm[0].s[Ca][fb],Eb=fa.thm[1].s[Ca][fb],fa.thm[0].s[Ca][fb]+=Eb*xb,fa.thm[1].s[Ca][fb]+=Sb*xb}}if(a.mode==la.JOINT_STEREO){for(var Oa,ka=0;ka<c.SBMAX_l;ka++)if(!(x.thm[0].l[ka]>1.58*x.thm[1].l[ka]||x.thm[1].l[ka]>1.58*
x.thm[0].l[ka])){var Ua=x.mld_l[ka]*x.en[3].l[ka],gb=Math.max(x.thm[2].l[ka],Math.min(x.thm[3].l[ka],Ua));Ua=x.mld_l[ka]*x.en[2].l[ka];var gc=Math.max(x.thm[3].l[ka],Math.min(x.thm[2].l[ka],Ua));x.thm[2].l[ka]=gb;x.thm[3].l[ka]=gc}for(ka=0;ka<c.SBMAX_s;ka++)for(var ua=0;3>ua;ua++)x.thm[0].s[ka][ua]>1.58*x.thm[1].s[ka][ua]||x.thm[1].s[ka][ua]>1.58*x.thm[0].s[ka][ua]||(Ua=x.mld_s[ka]*x.en[3].s[ka][ua],gb=Math.max(x.thm[2].s[ka][ua],Math.min(x.thm[3].s[ka][ua],Ua)),Ua=x.mld_s[ka]*x.en[2].s[ka][ua],gc=
Math.max(x.thm[3].s[ka][ua],Math.min(x.thm[2].s[ka][ua],Ua)),x.thm[2].s[ka][ua]=gb,x.thm[3].s[ka][ua]=gc);Oa=a.msfix;if(0<Math.abs(Oa)){var Kb=Oa,hc=Kb,Zb=Math.pow(10,a.ATHlower*x.ATH.adjust);Kb*=2;hc*=2;for(var wa=0;wa<c.SBMAX_l;wa++){var ba=x.ATH.cb_l[x.bm_l[wa]]*Zb;var Wa=Math.min(Math.max(x.thm[0].l[wa],ba),Math.max(x.thm[1].l[wa],ba));var ab=Math.max(x.thm[2].l[wa],ba);var mb=Math.max(x.thm[3].l[wa],ba);if(Wa*Kb<ab+mb){var hb=Wa*hc/(ab+mb);ab*=hb;mb*=hb}x.thm[2].l[wa]=Math.min(ab,x.thm[2].l[wa]);
x.thm[3].l[wa]=Math.min(mb,x.thm[3].l[wa])}Zb*=c.BLKSIZE_s/c.BLKSIZE;for(wa=0;wa<c.SBMAX_s;wa++)for(var Da=0;3>Da;Da++)ba=x.ATH.cb_s[x.bm_s[wa]]*Zb,Wa=Math.min(Math.max(x.thm[0].s[wa][Da],ba),Math.max(x.thm[1].s[wa][Da],ba)),ab=Math.max(x.thm[2].s[wa][Da],ba),mb=Math.max(x.thm[3].s[wa][Da],ba),Wa*Kb<ab+mb&&(hb=Wa*Kb/(ab+mb),ab*=hb,mb*=hb),x.thm[2].s[wa][Da]=Math.min(x.thm[2].s[wa][Da],ab),x.thm[3].s[wa][Da]=Math.min(x.thm[3].s[wa][Da],mb)}}var ib=a.internal_flags;a.short_blocks!=ra.short_block_coupled||
0!=S[0]&&0!=S[1]||(S[0]=S[1]=0);for(var Ka=0;Ka<ib.channels_out;Ka++)Q[Ka]=c.NORM_TYPE,a.short_blocks==ra.short_block_dispensed&&(S[Ka]=1),a.short_blocks==ra.short_block_forced&&(S[Ka]=0),0!=S[Ka]?ib.blocktype_old[Ka]==c.SHORT_TYPE&&(Q[Ka]=c.STOP_TYPE):(Q[Ka]=c.SHORT_TYPE,ib.blocktype_old[Ka]==c.NORM_TYPE&&(ib.blocktype_old[Ka]=c.START_TYPE),ib.blocktype_old[Ka]==c.STOP_TYPE&&(ib.blocktype_old[Ka]=c.SHORT_TYPE)),n[Ka]=ib.blocktype_old[Ka],ib.blocktype_old[Ka]=Q[Ka];for(z=0;z<T;z++){var Ea=0;if(1<
z){var Lb=y;Ea=-2;var Tb=c.NORM_TYPE;if(n[0]==c.SHORT_TYPE||n[1]==c.SHORT_TYPE)Tb=c.SHORT_TYPE;var Fb=l[e][z-2]}else Lb=m,Ea=0,Tb=n[z],Fb=g[e][z];Lb[Ea+z]=Tb==c.SHORT_TYPE?W(Fb,x.masking_lower):f(Fb,x.masking_lower);a.analysis&&(x.pinfo.pe[e][z]=Lb[Ea+z])}return 0};var F=[-1.730326E-17,-.01703172,-1.349528E-17,.0418072,-6.73278E-17,-.0876324,-3.0835E-17,.1863476,-1.104424E-16,-.627638];this.L3psycho_anal_vbr=function(d,h,e,g,l,k,m,x,y,p){for(var r=d.internal_flags,A,t,I=K(c.HBLKSIZE),C=ca([3,c.HBLKSIZE_s]),
Q=ca([2,c.BLKSIZE]),z=ca([2,3,c.BLKSIZE_s]),S=ca([4,c.CBANDS]),D=ca([4,c.CBANDS]),O=ca([4,3]),L=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],H=X(2),N=d.mode==la.JOINT_STEREO?4:r.channels_out,Z=ca([2,576]),G=d.internal_flags,V=G.channels_out,ma=d.mode==la.JOINT_STEREO?4:V,R=0;R<V;R++){firbuf=h[R];for(var T=e+576-350-21+192,M=0;576>M;M++){var Y;var ha=firbuf[T+M+10];for(var U=Y=0;9>U;U+=2)ha+=F[U]*(firbuf[T+M+U]+firbuf[T+M+21-U]),Y+=F[U+1]*(firbuf[T+M+U+1]+firbuf[T+M+21-U-1]);Z[R][M]=ha+Y}l[g][R].en.assign(G.en[R]);
l[g][R].thm.assign(G.thm[R]);2<ma&&(k[g][R].en.assign(G.en[R+2]),k[g][R].thm.assign(G.thm[R+2]))}for(R=0;R<ma;R++){var da=K(12),ya=K(12),qa=[0,0,0,0],ia=Z[R&1],sa=0,Fa=3==R?G.nsPsy.attackthre_s:G.nsPsy.attackthre,na=1;if(2==R)for(M=0,U=576;0<U;++M,--U){var ta=Z[0][M],za=Z[1][M];Z[0][M]=ta+za;Z[1][M]=ta-za}for(M=0;3>M;M++)ya[M]=G.nsPsy.last_en_subshort[R][M+6],da[M]=ya[M]/G.nsPsy.last_en_subshort[R][M+4],qa[0]+=ya[M];for(M=0;9>M;M++){for(var Xa=sa+64,Ya=1;sa<Xa;sa++)Ya<Math.abs(ia[sa])&&(Ya=Math.abs(ia[sa]));
G.nsPsy.last_en_subshort[R][M]=ya[M+3]=Ya;qa[1+M/3]+=Ya;Ya=Ya>ya[M+3-2]?Ya/ya[M+3-2]:ya[M+3-2]>10*Ya?ya[M+3-2]/(10*Ya):0;da[M+3]=Ya}for(M=0;3>M;++M){var Ia=ya[3*M+3]+ya[3*M+4]+ya[3*M+5],Wb=1;6*ya[3*M+5]<Ia&&(Wb*=.5,6*ya[3*M+4]<Ia&&(Wb*=.5));O[R][M]=Wb}if(d.analysis){var xa=da[0];for(M=1;12>M;M++)xa<da[M]&&(xa=da[M]);G.pinfo.ers[g][R]=G.pinfo.ers_save[R];G.pinfo.ers_save[R]=xa}for(M=0;12>M;M++)0==L[R][M/3]&&da[M]>Fa&&(L[R][M/3]=M%3+1);for(M=1;4>M;M++){var Qb=qa[M-1],Ga=qa[M];4E4>Math.max(Qb,Ga)&&Qb<
1.7*Ga&&Ga<1.7*Qb&&(1==M&&L[R][0]<=L[R][M]&&(L[R][0]=0),L[R][M]=0)}L[R][0]<=G.nsPsy.lastAttacks[R]&&(L[R][0]=0);if(3==G.nsPsy.lastAttacks[R]||0!=L[R][0]+L[R][1]+L[R][2]+L[R][3])na=0,0!=L[R][1]&&0!=L[R][0]&&(L[R][1]=0),0!=L[R][2]&&0!=L[R][1]&&(L[R][2]=0),0!=L[R][3]&&0!=L[R][2]&&(L[R][3]=0);2>R?H[R]=na:0==na&&(H[0]=H[1]=0);y[R]=G.tot_ener[R]}var qb=d.internal_flags;d.short_blocks!=ra.short_block_coupled||0!=H[0]&&0!=H[1]||(H[0]=H[1]=0);for(var Ma=0;Ma<qb.channels_out;Ma++)d.short_blocks==ra.short_block_dispensed&&
(H[Ma]=1),d.short_blocks==ra.short_block_forced&&(H[Ma]=0);for(var P=0;P<N;P++){var Ha=P&1;A=Q;var Gb=d,La=P,kb=g,Ra=I,Na=A,cb=Ha,Aa=Gb.internal_flags;if(2>La)q.fft_long(Aa,Na[cb],La,h,e);else if(2==La)for(var va=c.BLKSIZE-1;0<=va;--va){var rb=Na[cb+0][va],Va=Na[cb+1][va];Na[cb+0][va]=(rb+Va)*aa.SQRT2*.5;Na[cb+1][va]=(rb-Va)*aa.SQRT2*.5}Ra[0]=Na[cb+0][0];Ra[0]*=Ra[0];for(va=c.BLKSIZE/2-1;0<=va;--va){var ja=Na[cb+0][c.BLKSIZE/2-va],Hb=Na[cb+0][c.BLKSIZE/2+va];Ra[c.BLKSIZE/2-va]=.5*(ja*ja+Hb*Hb)}var Ib=
0;for(va=11;va<c.HBLKSIZE;va++)Ib+=Ra[va];Aa.tot_ener[La]=Ib;if(Gb.analysis){for(va=0;va<c.HBLKSIZE;va++)Aa.pinfo.energy[kb][La][va]=Aa.pinfo.energy_save[La][va],Aa.pinfo.energy_save[La][va]=Ra[va];Aa.pinfo.pe[kb][La]=Aa.pe[La]}var Ba=P,zb=I,tb=d.internal_flags;2==d.athaa_loudapprox&&2>Ba&&(tb.loudness_sq[g][Ba]=tb.loudness_sq_save[Ba],tb.loudness_sq_save[Ba]=u(zb,tb));if(0!=H[Ha]){var oa=void 0,ea=r,Ab=I,Bb=S[P],Sa=D[P],Za=P,ub=K(c.CBANDS),sb=K(c.CBANDS),Ja=X(c.CBANDS+2);b(ea,Ab,Bb,ub,sb);v(ea,ub,
sb,Ja);var Rb=0;for(oa=0;oa<ea.npart_l;oa++){var Xb,db=ea.s3ind[oa][0],cc=ea.s3ind[oa][1],Cb=0,Db=0;Cb=Ja[db];Db+=1;var $a=ea.s3_ll[Rb]*Bb[db]*J[Ja[db]];++Rb;for(++db;db<=cc;){Cb+=Ja[db];Db+=1;var vb=ea.s3_ll[Rb]*Bb[db]*J[Ja[db]];$a=Xb=n($a,vb,db-oa);++Rb;++db}Cb=(1+2*Cb)/(2*Db);var Ta=.5*J[Cb];$a*=Ta;if(ea.blocktype_old[Za&1]==c.SHORT_TYPE){var wb=2*ea.nb_1[Za][oa];Sa[oa]=0<wb?Math.min($a,wb):Math.min($a,.3*Bb[oa])}else{var Yb=16*ea.nb_2[Za][oa],eb=2*ea.nb_1[Za][oa];0>=Yb&&(Yb=$a);0>=eb&&(eb=$a);
wb=ea.blocktype_old[Za&1]==c.NORM_TYPE?Math.min(eb,Yb):eb;Sa[oa]=Math.min($a,wb)}ea.nb_2[Za][oa]=ea.nb_1[Za][oa];ea.nb_1[Za][oa]=$a;vb=ub[oa];vb*=ea.minval_l[oa];vb*=Ta;Sa[oa]>vb&&(Sa[oa]=vb);1<ea.masking_lower&&(Sa[oa]*=ea.masking_lower);Sa[oa]>Bb[oa]&&(Sa[oa]=Bb[oa]);1>ea.masking_lower&&(Sa[oa]*=ea.masking_lower)}for(;oa<c.CBANDS;++oa)Bb[oa]=0,Sa[oa]=0}else for(var Jb=r,lb=P,xb=0;xb<Jb.npart_l;xb++)Jb.nb_2[lb][xb]=Jb.nb_1[lb][xb],Jb.nb_1[lb][xb]=0}2==H[0]+H[1]&&d.mode==la.JOINT_STEREO&&a(S,D,r.mld_cb_l,
r.ATH.cb_l,d.ATHlower*r.ATH.adjust,d.msfix,r.npart_l);for(P=0;P<N;P++)Ha=P&1,0!=H[Ha]&&E(r,S[P],D[P],P);for(var fa=0;3>fa;fa++){for(P=0;P<N;++P)if(Ha=P&1,0!=H[Ha]){var Ca=r,Sb=P;if(0==fa)for(var Eb=0;Eb<Ca.npart_s;Eb++)Ca.nb_s2[Sb][Eb]=Ca.nb_s1[Sb][Eb],Ca.nb_s1[Sb][Eb]=0}else{t=z;var fb=P,Oa=fa,ka=C,Ua=t,gb=Ha,gc=d.internal_flags;0==Oa&&2>fb&&q.fft_short(gc,Ua[gb],fb,h,e);if(2==fb)for(var ua=c.BLKSIZE_s-1;0<=ua;--ua){var Kb=Ua[gb+0][Oa][ua],hc=Ua[gb+1][Oa][ua];Ua[gb+0][Oa][ua]=(Kb+hc)*aa.SQRT2*.5;
Ua[gb+1][Oa][ua]=(Kb-hc)*aa.SQRT2*.5}ka[Oa][0]=Ua[gb+0][Oa][0];ka[Oa][0]*=ka[Oa][0];for(ua=c.BLKSIZE_s/2-1;0<=ua;--ua){var Zb=Ua[gb+0][Oa][c.BLKSIZE_s/2-ua],wa=Ua[gb+0][Oa][c.BLKSIZE_s/2+ua];ka[Oa][c.BLKSIZE_s/2-ua]=.5*(Zb*Zb+wa*wa)}var ba=void 0,Wa=void 0,ab=void 0,mb=C,hb=S[P],Da=D[P],ib=P,Ka=fa,Ea=d.internal_flags,Lb=new float[c.CBANDS],Tb=K(c.CBANDS),Fb=new int[c.CBANDS];for(ba=Wa=0;ba<Ea.npart_s;++ba){var Ob=0,Pb=0,dc=Ea.numlines_s[ba];for(ab=0;ab<dc;++ab,++Wa){var nc=mb[Ka][Wa];Ob+=nc;Pb<nc&&
(Pb=nc)}hb[ba]=Ob;Lb[ba]=Pb;Tb[ba]=Ob/dc}for(;ba<c.CBANDS;++ba)Lb[ba]=0,Tb[ba]=0;var Mb=Ea,nb=Lb,Ub=Tb,$b=Fb,ac=J.length-1,pa=0,Pa=Ub[pa]+Ub[pa+1];if(0<Pa){var bb=nb[pa];bb<nb[pa+1]&&(bb=nb[pa+1]);Pa=20*(2*bb-Pa)/(Pa*(Mb.numlines_s[pa]+Mb.numlines_s[pa+1]-1));var ob=0|Pa;ob>ac&&(ob=ac);$b[pa]=ob}else $b[pa]=0;for(pa=1;pa<Mb.npart_s-1;pa++)Pa=Ub[pa-1]+Ub[pa]+Ub[pa+1],0<Pa?(bb=nb[pa-1],bb<nb[pa]&&(bb=nb[pa]),bb<nb[pa+1]&&(bb=nb[pa+1]),Pa=20*(3*bb-Pa)/(Pa*(Mb.numlines_s[pa-1]+Mb.numlines_s[pa]+Mb.numlines_s[pa+
1]-1)),ob=0|Pa,ob>ac&&(ob=ac),$b[pa]=ob):$b[pa]=0;Pa=Ub[pa-1]+Ub[pa];0<Pa?(bb=nb[pa-1],bb<nb[pa]&&(bb=nb[pa]),Pa=20*(2*bb-Pa)/(Pa*(Mb.numlines_s[pa-1]+Mb.numlines_s[pa]-1)),ob=0|Pa,ob>ac&&(ob=ac),$b[pa]=ob):$b[pa]=0;for(Wa=ba=0;ba<Ea.npart_s;ba++){var yb=Ea.s3ind_s[ba][0],mc=Ea.s3ind_s[ba][1];var lc=Fb[yb];var tc=1;var ic=Ea.s3_ss[Wa]*hb[yb]*J[Fb[yb]];++Wa;for(++yb;yb<=mc;){lc+=Fb[yb];tc+=1;var bc=Ea.s3_ss[Wa]*hb[yb]*J[Fb[yb]];ic=n(ic,bc,yb-ba);++Wa;++yb}lc=(1+2*lc)/(2*tc);var uc=.5*J[lc];ic*=uc;
Da[ba]=ic;Ea.nb_s2[ib][ba]=Ea.nb_s1[ib][ba];Ea.nb_s1[ib][ba]=ic;bc=Lb[ba];bc*=Ea.minval_s[ba];bc*=uc;Da[ba]>bc&&(Da[ba]=bc);1<Ea.masking_lower&&(Da[ba]*=Ea.masking_lower);Da[ba]>hb[ba]&&(Da[ba]=hb[ba]);1>Ea.masking_lower&&(Da[ba]*=Ea.masking_lower)}for(;ba<c.CBANDS;++ba)hb[ba]=0,Da[ba]=0}0==H[0]+H[1]&&d.mode==la.JOINT_STEREO&&a(S,D,r.mld_cb_s,r.ATH.cb_s,d.ATHlower*r.ATH.adjust,d.msfix,r.npart_s);for(P=0;P<N;++P)Ha=P&1,0==H[Ha]&&w(r,S[P],D[P],P,fa)}for(P=0;P<N;P++)if(Ha=P&1,0==H[Ha])for(var Vb=0;Vb<
c.SBMAX_s;Vb++){var vc=K(3);for(fa=0;3>fa;fa++){var jb=r.thm[P].s[Vb][fa];jb*=.8;if(2<=L[P][fa]||1==L[P][fa+1]){var jc=0!=fa?fa-1:2,kc=B(r.thm[P].s[Vb][jc],jb,.36);jb=Math.min(jb,kc)}else if(1==L[P][fa])jc=0!=fa?fa-1:2,kc=B(r.thm[P].s[Vb][jc],jb,.18),jb=Math.min(jb,kc);else if(0!=fa&&3==L[P][fa-1]||0==fa&&3==r.nsPsy.lastAttacks[P])jc=2!=fa?fa+1:0,kc=B(r.thm[P].s[Vb][jc],jb,.18),jb=Math.min(jb,kc);jb*=O[P][fa];vc[fa]=jb}for(fa=0;3>fa;fa++)r.thm[P].s[Vb][fa]=vc[fa]}for(P=0;P<N;P++)r.nsPsy.lastAttacks[P]=
L[P][2];for(var Nb=d.internal_flags,pb=0;pb<Nb.channels_out;pb++){var oc=c.NORM_TYPE;0!=H[pb]?Nb.blocktype_old[pb]==c.SHORT_TYPE&&(oc=c.STOP_TYPE):(oc=c.SHORT_TYPE,Nb.blocktype_old[pb]==c.NORM_TYPE&&(Nb.blocktype_old[pb]=c.START_TYPE),Nb.blocktype_old[pb]==c.STOP_TYPE&&(Nb.blocktype_old[pb]=c.SHORT_TYPE));p[pb]=Nb.blocktype_old[pb];Nb.blocktype_old[pb]=oc}for(P=0;P<N;P++){if(1<P){var pc=x;var qc=-2;var rc=c.NORM_TYPE;if(p[0]==c.SHORT_TYPE||p[1]==c.SHORT_TYPE)rc=c.SHORT_TYPE;var sc=k[g][P-2]}else pc=
m,qc=0,rc=p[P],sc=l[g][P];pc[qc+P]=rc==c.SHORT_TYPE?W(sc,r.masking_lower):f(sc,r.masking_lower);d.analysis&&(r.pinfo.pe[g][P]=pc[qc+P])}return 0};this.psymodel_init=function(a){var b=a.internal_flags,f,h=!0,g=13,k=0,m=0,x=-8.25,y=-4.5,n=K(c.CBANDS),u=K(c.CBANDS),A=K(c.CBANDS),w=a.out_samplerate;switch(a.experimentalZ){default:case 0:h=!0;break;case 1:h=a.VBR==G.vbr_mtrh||a.VBR==G.vbr_mt?!1:!0;break;case 2:h=!1;break;case 3:g=8,k=-1.75,m=-.0125,x=-8.25,y=-2.25}b.ms_ener_ratio_old=.25;b.blocktype_old[0]=
b.blocktype_old[1]=c.NORM_TYPE;for(f=0;4>f;++f){for(var v=0;v<c.CBANDS;++v)b.nb_1[f][v]=1E20,b.nb_2[f][v]=1E20,b.nb_s1[f][v]=b.nb_s2[f][v]=1;for(var z=0;z<c.SBMAX_l;z++)b.en[f].l[z]=1E20,b.thm[f].l[z]=1E20;for(v=0;3>v;++v){for(z=0;z<c.SBMAX_s;z++)b.en[f].s[z][v]=1E20,b.thm[f].s[z][v]=1E20;b.nsPsy.lastAttacks[f]=0}for(v=0;9>v;v++)b.nsPsy.last_en_subshort[f][v]=10}b.loudness_sq_save[0]=b.loudness_sq_save[1]=0;b.npart_l=e(b.numlines_l,b.bo_l,b.bm_l,n,u,b.mld_l,b.PSY.bo_l_weight,w,c.BLKSIZE,b.scalefac_band.l,
c.BLKSIZE/1152,c.SBMAX_l);for(f=0;f<b.npart_l;f++)z=k,n[f]>=g&&(z=m*(n[f]-g)/(24-g)+k*(24-n[f])/(24-g)),A[f]=Math.pow(10,z/10),b.rnumlines_l[f]=0<b.numlines_l[f]?1/b.numlines_l[f]:0;b.s3_ll=l(b.s3ind,b.npart_l,n,u,A,h);for(f=v=0;f<b.npart_l;f++){m=Ma.MAX_VALUE;for(z=0;z<b.numlines_l[f];z++,v++)k=w*v/(1E3*c.BLKSIZE),k=this.ATHformula(1E3*k,a)-20,k=Math.pow(10,.1*k),k*=b.numlines_l[f],m>k&&(m=k);b.ATH.cb_l[f]=m;m=-20+20*n[f]/10;6<m&&(m=100);-15>m&&(m=-15);m-=8;b.minval_l[f]=Math.pow(10,m/10)*b.numlines_l[f]}b.npart_s=
e(b.numlines_s,b.bo_s,b.bm_s,n,u,b.mld_s,b.PSY.bo_s_weight,w,c.BLKSIZE_s,b.scalefac_band.s,c.BLKSIZE_s/384,c.SBMAX_s);for(f=v=0;f<b.npart_s;f++){z=x;n[f]>=g&&(z=y*(n[f]-g)/(24-g)+x*(24-n[f])/(24-g));A[f]=Math.pow(10,z/10);m=Ma.MAX_VALUE;for(z=0;z<b.numlines_s[f];z++,v++)k=w*v/(1E3*c.BLKSIZE_s),k=this.ATHformula(1E3*k,a)-20,k=Math.pow(10,.1*k),k*=b.numlines_s[f],m>k&&(m=k);b.ATH.cb_s[f]=m;m=-7+7*n[f]/12;12<n[f]&&(m*=1+3.1*Math.log(1+m));12>n[f]&&(m*=1+2.3*Math.log(1-m));-15>m&&(m=-15);m-=8;b.minval_s[f]=
Math.pow(10,m/10)*b.numlines_s[f]}b.s3_ss=l(b.s3ind_s,b.npart_s,n,u,A,h);p=Math.pow(10,.5625);r=Math.pow(10,1.5);t=Math.pow(10,1.5);q.init_fft(b);b.decay=Math.exp(-2.302585092994046/(.01*w/192));f=3.5;0!=(a.exp_nspsytune&2)&&(f=1);0<Math.abs(a.msfix)&&(f=a.msfix);a.msfix=f;for(h=0;h<b.npart_l;h++)b.s3ind[h][1]>b.npart_l-1&&(b.s3ind[h][1]=b.npart_l-1);b.ATH.decay=Math.pow(10,576*b.mode_gr/w*-1.2);b.ATH.adjust=.01;b.ATH.adjustLimit=1;if(-1!=a.ATHtype){v=a.out_samplerate/c.BLKSIZE;for(f=k=h=0;f<c.BLKSIZE/
2;++f)k+=v,b.ATH.eql_w[f]=1/Math.pow(10,this.ATHformula(k,a)/10),h+=b.ATH.eql_w[f];h=1/h;for(f=c.BLKSIZE/2;0<=--f;)b.ATH.eql_w[f]*=h}for(h=v=0;h<b.npart_s;++h)for(f=0;f<b.numlines_s[h];++f)++v;for(h=v=0;h<b.npart_l;++h)for(f=0;f<b.numlines_l[h];++f)++v;for(f=v=0;f<b.npart_l;f++)k=w*(v+b.numlines_l[f]/2)/(1*c.BLKSIZE),b.mld_cb_l[f]=d(k),v+=b.numlines_l[f];for(;f<c.CBANDS;++f)b.mld_cb_l[f]=1;for(f=v=0;f<b.npart_s;f++)k=w*(v+b.numlines_s[f]/2)/(1*c.BLKSIZE_s),b.mld_cb_s[f]=d(k),v+=b.numlines_s[f];for(;f<
c.CBANDS;++f)b.mld_cb_s[f]=1;return 0};this.ATHformula=function(a,b){switch(b.ATHtype){case 0:a=g(a,9);break;case 1:a=g(a,-1);break;case 2:a=g(a,0);break;case 3:a=g(a,1)+6;break;case 4:a=g(a,b.ATHcurve);break;default:a=g(a,0)}return a}}function W(){function u(){this.mask_adjust_short=this.mask_adjust=0;this.bo_l_weight=K(c.SBMAX_l);this.bo_s_weight=K(c.SBMAX_s)}function k(){this.lowerlimit=0}function n(a,b){this.lowpass=b}function V(a){return 1<a?0:0>=a?1:Math.cos(Math.PI/2*a)}function E(a,b){switch(a){case 44100:return b.version=
1,0;case 48E3:return b.version=1;case 32E3:return b.version=1,2;case 22050:return b.version=0;case 24E3:return b.version=0,1;case 16E3:return b.version=0,2;case 11025:return b.version=0;case 12E3:return b.version=0,1;case 8E3:return b.version=0,2;default:return b.version=0,-1}}function B(a,b,d){16E3>d&&(b=2);d=w.bitrate_table[b][1];for(var c=2;14>=c;c++)0<w.bitrate_table[b][c]&&Math.abs(w.bitrate_table[b][c]-a)<Math.abs(d-a)&&(d=w.bitrate_table[b][c]);return d}function U(a,b,d){16E3>d&&(b=2);for(d=
0;14>=d;d++)if(0<w.bitrate_table[b][d]&&w.bitrate_table[b][d]==a)return d;return-1}function f(a,b){var d=[new n(8,2E3),new n(16,3700),new n(24,3900),new n(32,5500),new n(40,7E3),new n(48,7500),new n(56,1E4),new n(64,11E3),new n(80,13500),new n(96,15100),new n(112,15600),new n(128,17E3),new n(160,17500),new n(192,18600),new n(224,19400),new n(256,19700),new n(320,20500)];b=e.nearestBitrateFullIndex(b);a.lowerlimit=d[b].lowpass}function b(a){var b=c.BLKSIZE+a.framesize-c.FFTOFFSET;return b=Math.max(b,
512+a.framesize-32)}function v(f,g,k,p,q,n,r){var h=f.internal_flags,x=0,y=[null,null],u=[null,null];if(4294479419!=h.Class_ID)return-3;if(0==p)return 0;var t=d.copy_buffer(h,q,n,r,0);if(0>t)return t;n+=t;x+=t;u[0]=g;u[1]=k;if(qa.NEQ(f.scale,0)&&qa.NEQ(f.scale,1))for(t=0;t<p;++t)u[0][t]*=f.scale,2==h.channels_out&&(u[1][t]*=f.scale);if(qa.NEQ(f.scale_left,0)&&qa.NEQ(f.scale_left,1))for(t=0;t<p;++t)u[0][t]*=f.scale_left;if(qa.NEQ(f.scale_right,0)&&qa.NEQ(f.scale_right,1))for(t=0;t<p;++t)u[1][t]*=f.scale_right;
if(2==f.num_channels&&1==h.channels_out)for(t=0;t<p;++t)u[0][t]=.5*(u[0][t]+u[1][t]),u[1][t]=0;g=b(f);y[0]=h.mfbuf[0];y[1]=h.mfbuf[1];for(k=0;0<p;){var v=[null,null];v[0]=u[0];v[1]=u[1];t=new a;var A=f;var w=y;var B=k,E=p,D=t,H=A.internal_flags;if(.9999>H.resample_ratio||1.0001<H.resample_ratio)for(var O=0;O<H.channels_out;O++){var G=new m,J=D,N,V=w[O],T=H.mf_size,U=A.framesize,W=v[O],X=B,aa=E,ha=G,la=O,ca=A.internal_flags,ia=0,sa=A.out_samplerate/z(A.out_samplerate,A.in_samplerate);sa>da.BPC&&(sa=
da.BPC);var ra=1E-4>Math.abs(ca.resample_ratio-Math.floor(.5+ca.resample_ratio))?1:0;var R=1/ca.resample_ratio;1<R&&(R=1);var na=31;0==na%2&&--na;na+=ra;ra=na+1;if(0==ca.fill_buffer_resample_init){ca.inbuf_old[0]=K(ra);ca.inbuf_old[1]=K(ra);for(N=0;N<=2*sa;++N)ca.blackfilt[N]=K(ra);ca.itime[0]=0;for(ia=ca.itime[1]=0;ia<=2*sa;ia++){var M=0,za=(ia-sa)/(2*sa);for(N=0;N<=na;N++){var Fa=ca.blackfilt[ia],Ia=N,xa=N-za,Qa=Math.PI*R;xa/=na;0>xa&&(xa=0);1<xa&&(xa=1);var Ma=xa-.5;xa=.42-.5*Math.cos(2*xa*Math.PI)+
.08*Math.cos(4*xa*Math.PI);M+=Fa[Ia]=1E-9>Math.abs(Ma)?Qa/Math.PI:xa*Math.sin(na*Qa*Ma)/(Math.PI*na*Ma)}for(N=0;N<=na;N++)ca.blackfilt[ia][N]/=M}ca.fill_buffer_resample_init=1}M=ca.inbuf_old[la];for(R=0;R<U;R++){N=R*ca.resample_ratio;ia=0|Math.floor(N-ca.itime[la]);if(na+ia-na/2>=aa)break;za=N-ca.itime[la]-(ia+na%2*.5);za=0|Math.floor(2*za*sa+sa+.5);for(N=Fa=0;N<=na;++N)Ia=0|N+ia-na/2,Fa+=(0>Ia?M[ra+Ia]:W[X+Ia])*ca.blackfilt[za][N];V[T+R]=Fa}ha.num_used=Math.min(aa,na+ia-na/2);ca.itime[la]+=ha.num_used-
R*ca.resample_ratio;if(ha.num_used>=ra)for(N=0;N<ra;N++)M[N]=W[X+ha.num_used+N-ra];else{V=ra-ha.num_used;for(N=0;N<V;++N)M[N]=M[N+ha.num_used];for(ia=0;N<ra;++N,++ia)M[N]=W[X+ia]}J.n_out=R;D.n_in=G.num_used}else for(D.n_out=Math.min(A.framesize,E),D.n_in=D.n_out,A=0;A<D.n_out;++A)w[0][H.mf_size+A]=v[0][B+A],2==H.channels_out&&(w[1][H.mf_size+A]=v[1][B+A]);w=t.n_in;t=t.n_out;if(h.findReplayGain&&!h.decode_on_the_fly&&l.AnalyzeSamples(h.rgdata,y[0],h.mf_size,y[1],h.mf_size,t,h.channels_out)==Y.GAIN_ANALYSIS_ERROR)return-6;
p-=w;k+=w;h.mf_size+=t;1>h.mf_samples_to_encode&&(h.mf_samples_to_encode=c.ENCDELAY+c.POSTDELAY);h.mf_samples_to_encode+=t;if(h.mf_size>=g){w=r-x;0==r&&(w=0);t=f;w=e.enc.lame_encode_mp3_frame(t,y[0],y[1],q,n,w);t.frameNum++;t=w;if(0>t)return t;n+=t;x+=t;h.mf_size-=f.framesize;h.mf_samples_to_encode-=f.framesize;for(w=0;w<h.channels_out;w++)for(t=0;t<h.mf_size;t++)y[w][t]=y[w][t+f.framesize]}}return x}function a(){this.n_out=this.n_in=0}function m(){this.num_used=0}function z(a,b){return 0!=b?z(b,
a%b):a}var e=this;W.V9=410;W.V8=420;W.V7=430;W.V6=440;W.V5=450;W.V4=460;W.V3=470;W.V2=480;W.V1=490;W.V0=500;W.R3MIX=1E3;W.STANDARD=1001;W.EXTREME=1002;W.INSANE=1003;W.STANDARD_FAST=1004;W.EXTREME_FAST=1005;W.MEDIUM=1006;W.MEDIUM_FAST=1007;W.LAME_MAXMP3BUFFER=147456;var l,d,g,q,D,p=new Pb,r,t,J;this.enc=new c;this.setModules=function(a,b,c,f,e,k,m,n,u){l=a;d=b;g=c;q=f;D=e;r=k;t=n;J=u;this.enc.setModules(d,p,q,r)};this.lame_init=function(){var a=new zc;a.class_id=4294479419;var b=a.internal_flags=new da;
a.mode=la.NOT_SET;a.original=1;a.in_samplerate=44100;a.num_channels=2;a.num_samples=-1;a.bWriteVbrTag=!0;a.quality=-1;a.short_blocks=null;b.subblock_gain=-1;a.lowpassfreq=0;a.highpassfreq=0;a.lowpasswidth=-1;a.highpasswidth=-1;a.VBR=G.vbr_off;a.VBR_q=4;a.ATHcurve=-1;a.VBR_mean_bitrate_kbps=128;a.VBR_min_bitrate_kbps=0;a.VBR_max_bitrate_kbps=0;a.VBR_hard_min=0;b.VBR_min_bitrate=1;b.VBR_max_bitrate=13;a.quant_comp=-1;a.quant_comp_short=-1;a.msfix=-1;b.resample_ratio=1;b.OldValue[0]=180;b.OldValue[1]=
180;b.CurrentStep[0]=4;b.CurrentStep[1]=4;b.masking_lower=1;b.nsPsy.attackthre=-1;b.nsPsy.attackthre_s=-1;a.scale=-1;a.athaa_type=-1;a.ATHtype=-1;a.athaa_loudapprox=-1;a.athaa_sensitivity=0;a.useTemporal=null;a.interChRatio=-1;b.mf_samples_to_encode=c.ENCDELAY+c.POSTDELAY;a.encoder_padding=0;b.mf_size=c.ENCDELAY-c.MDCTDELAY;a.findReplayGain=!1;a.decode_on_the_fly=!1;b.decode_on_the_fly=!1;b.findReplayGain=!1;b.findPeakSample=!1;b.RadioGain=0;b.AudiophileGain=0;b.noclipGainChange=0;b.noclipScale=-1;
a.preset=0;a.write_id3tag_automatic=!0;a.lame_allocated_gfp=1;return a};this.nearestBitrateFullIndex=function(a){var b=[8,16,24,32,40,48,56,64,80,96,112,128,160,192,224,256,320];var d=b[16];var c=16;var f=b[16];var e=16;for(var h=0;16>h;h++)if(Math.max(a,b[h+1])!=a){d=b[h+1];c=h+1;f=b[h];e=h;break}return d-a>a-f?e:c};this.lame_init_params=function(a){var b=a.internal_flags;b.Class_ID=0;null==b.ATH&&(b.ATH=new Cc);null==b.PSY&&(b.PSY=new u);null==b.rgdata&&(b.rgdata=new Ac);b.channels_in=a.num_channels;
1==b.channels_in&&(a.mode=la.MONO);b.channels_out=a.mode==la.MONO?1:2;b.mode_ext=c.MPG_MD_MS_LR;a.mode==la.MONO&&(a.force_ms=!1);a.VBR==G.vbr_off&&128!=a.VBR_mean_bitrate_kbps&&0==a.brate&&(a.brate=a.VBR_mean_bitrate_kbps);a.VBR!=G.vbr_off&&a.VBR!=G.vbr_mtrh&&a.VBR!=G.vbr_mt&&(a.free_format=!1);a.VBR==G.vbr_off&&0==a.brate&&qa.EQ(a.compression_ratio,0)&&(a.compression_ratio=11.025);a.VBR==G.vbr_off&&0<a.compression_ratio&&(0==a.out_samplerate&&(a.out_samplerate=map2MP3Frequency(int(.97*a.in_samplerate))),
a.brate=0|16*a.out_samplerate*b.channels_out/(1E3*a.compression_ratio),b.samplerate_index=E(a.out_samplerate,a),a.free_format||(a.brate=B(a.brate,a.version,a.out_samplerate)));0!=a.out_samplerate&&(16E3>a.out_samplerate?(a.VBR_mean_bitrate_kbps=Math.max(a.VBR_mean_bitrate_kbps,8),a.VBR_mean_bitrate_kbps=Math.min(a.VBR_mean_bitrate_kbps,64)):32E3>a.out_samplerate?(a.VBR_mean_bitrate_kbps=Math.max(a.VBR_mean_bitrate_kbps,8),a.VBR_mean_bitrate_kbps=Math.min(a.VBR_mean_bitrate_kbps,160)):(a.VBR_mean_bitrate_kbps=
Math.max(a.VBR_mean_bitrate_kbps,32),a.VBR_mean_bitrate_kbps=Math.min(a.VBR_mean_bitrate_kbps,320)));if(0==a.lowpassfreq){switch(a.VBR){case G.vbr_off:var e=new k;f(e,a.brate);e=e.lowerlimit;break;case G.vbr_abr:e=new k;f(e,a.VBR_mean_bitrate_kbps);e=e.lowerlimit;break;case G.vbr_rh:var h=[19500,19E3,18600,18E3,17500,16E3,15600,14900,12500,1E4,3950];if(0<=a.VBR_q&&9>=a.VBR_q){e=h[a.VBR_q];h=h[a.VBR_q+1];var m=a.VBR_q_frac;e=linear_int(e,h,m)}else e=19500;break;default:h=[19500,19E3,18500,18E3,17500,
16500,15500,14500,12500,9500,3950],0<=a.VBR_q&&9>=a.VBR_q?(e=h[a.VBR_q],h=h[a.VBR_q+1],m=a.VBR_q_frac,e=linear_int(e,h,m)):e=19500}a.mode!=la.MONO||a.VBR!=G.vbr_off&&a.VBR!=G.vbr_abr||(e*=1.5);a.lowpassfreq=e|0}0==a.out_samplerate&&(2*a.lowpassfreq>a.in_samplerate&&(a.lowpassfreq=a.in_samplerate/2),e=a.lowpassfreq|0,h=a.in_samplerate,m=44100,48E3<=h?m=48E3:44100<=h?m=44100:32E3<=h?m=32E3:24E3<=h?m=24E3:22050<=h?m=22050:16E3<=h?m=16E3:12E3<=h?m=12E3:11025<=h?m=11025:8E3<=h&&(m=8E3),-1==e?e=m:(15960>=
e&&(m=44100),15250>=e&&(m=32E3),11220>=e&&(m=24E3),9970>=e&&(m=22050),7230>=e&&(m=16E3),5420>=e&&(m=12E3),4510>=e&&(m=11025),3970>=e&&(m=8E3),e=h<m?44100<h?48E3:32E3<h?44100:24E3<h?32E3:22050<h?24E3:16E3<h?22050:12E3<h?16E3:11025<h?12E3:8E3<h?11025:8E3:m),a.out_samplerate=e);a.lowpassfreq=Math.min(20500,a.lowpassfreq);a.lowpassfreq=Math.min(a.out_samplerate/2,a.lowpassfreq);a.VBR==G.vbr_off&&(a.compression_ratio=16*a.out_samplerate*b.channels_out/(1E3*a.brate));a.VBR==G.vbr_abr&&(a.compression_ratio=
16*a.out_samplerate*b.channels_out/(1E3*a.VBR_mean_bitrate_kbps));a.bWriteVbrTag||(a.findReplayGain=!1,a.decode_on_the_fly=!1,b.findPeakSample=!1);b.findReplayGain=a.findReplayGain;b.decode_on_the_fly=a.decode_on_the_fly;b.decode_on_the_fly&&(b.findPeakSample=!0);if(b.findReplayGain&&l.InitGainAnalysis(b.rgdata,a.out_samplerate)==Y.INIT_GAIN_ANALYSIS_ERROR)return a.internal_flags=null,-6;b.decode_on_the_fly&&!a.decode_only&&(null!=b.hip&&J.hip_decode_exit(b.hip),b.hip=J.hip_decode_init());b.mode_gr=
24E3>=a.out_samplerate?1:2;a.framesize=576*b.mode_gr;a.encoder_delay=c.ENCDELAY;b.resample_ratio=a.in_samplerate/a.out_samplerate;switch(a.VBR){case G.vbr_mt:case G.vbr_rh:case G.vbr_mtrh:a.compression_ratio=[5.7,6.5,7.3,8.2,10,11.9,13,14,15,16.5][a.VBR_q];break;case G.vbr_abr:a.compression_ratio=16*a.out_samplerate*b.channels_out/(1E3*a.VBR_mean_bitrate_kbps);break;default:a.compression_ratio=16*a.out_samplerate*b.channels_out/(1E3*a.brate)}a.mode==la.NOT_SET&&(a.mode=la.JOINT_STEREO);0<a.highpassfreq?
(b.highpass1=2*a.highpassfreq,b.highpass2=0<=a.highpasswidth?2*(a.highpassfreq+a.highpasswidth):2*a.highpassfreq,b.highpass1/=a.out_samplerate,b.highpass2/=a.out_samplerate):(b.highpass1=0,b.highpass2=0);0<a.lowpassfreq?(b.lowpass2=2*a.lowpassfreq,0<=a.lowpasswidth?(b.lowpass1=2*(a.lowpassfreq-a.lowpasswidth),0>b.lowpass1&&(b.lowpass1=0)):b.lowpass1=2*a.lowpassfreq,b.lowpass1/=a.out_samplerate,b.lowpass2/=a.out_samplerate):(b.lowpass1=0,b.lowpass2=0);e=a.internal_flags;var n=32,v=-1;if(0<e.lowpass1){var z=
999;for(h=0;31>=h;h++)m=h/31,m>=e.lowpass2&&(n=Math.min(n,h)),e.lowpass1<m&&m<e.lowpass2&&(z=Math.min(z,h));e.lowpass1=999==z?(n-.75)/31:(z-.75)/31;e.lowpass2=n/31}0<e.highpass2&&e.highpass2<.75/31*.9&&(e.highpass1=0,e.highpass2=0,T.err.println("Warning: highpass filter disabled.  highpass frequency too small\n"));if(0<e.highpass2){n=-1;for(h=0;31>=h;h++)m=h/31,m<=e.highpass1&&(v=Math.max(v,h)),e.highpass1<m&&m<e.highpass2&&(n=Math.max(n,h));e.highpass1=v/31;e.highpass2=-1==n?(v+.75)/31:(n+.75)/31}for(h=
0;32>h;h++)m=h/31,v=e.highpass2>e.highpass1?V((e.highpass2-m)/(e.highpass2-e.highpass1+1E-20)):1,m=e.lowpass2>e.lowpass1?V((m-e.lowpass1)/(e.lowpass2-e.lowpass1+1E-20)):1,e.amp_filter[h]=v*m;b.samplerate_index=E(a.out_samplerate,a);if(0>b.samplerate_index)return a.internal_flags=null,-1;if(a.VBR==G.vbr_off)if(a.free_format)b.bitrate_index=0;else{if(a.brate=B(a.brate,a.version,a.out_samplerate),b.bitrate_index=U(a.brate,a.version,a.out_samplerate),0>=b.bitrate_index)return a.internal_flags=null,-1}else b.bitrate_index=
1;a.analysis&&(a.bWriteVbrTag=!1);null!=b.pinfo&&(a.bWriteVbrTag=!1);d.init_bit_stream_w(b);e=b.samplerate_index+3*a.version+6*(16E3>a.out_samplerate?1:0);for(h=0;h<c.SBMAX_l+1;h++)b.scalefac_band.l[h]=q.sfBandIndex[e].l[h];for(h=0;h<c.PSFB21+1;h++)m=(b.scalefac_band.l[22]-b.scalefac_band.l[21])/c.PSFB21,m=b.scalefac_band.l[21]+h*m,b.scalefac_band.psfb21[h]=m;b.scalefac_band.psfb21[c.PSFB21]=576;for(h=0;h<c.SBMAX_s+1;h++)b.scalefac_band.s[h]=q.sfBandIndex[e].s[h];for(h=0;h<c.PSFB12+1;h++)m=(b.scalefac_band.s[13]-
b.scalefac_band.s[12])/c.PSFB12,m=b.scalefac_band.s[12]+h*m,b.scalefac_band.psfb12[h]=m;b.scalefac_band.psfb12[c.PSFB12]=192;b.sideinfo_len=1==a.version?1==b.channels_out?21:36:1==b.channels_out?13:21;a.error_protection&&(b.sideinfo_len+=2);e=a.internal_flags;a.frameNum=0;a.write_id3tag_automatic&&t.id3tag_write_v2(a);e.bitrate_stereoMode_Hist=Ia([16,5]);e.bitrate_blockType_Hist=Ia([16,6]);e.PeakSample=0;a.bWriteVbrTag&&r.InitVbrTag(a);b.Class_ID=4294479419;for(e=0;19>e;e++)b.nsPsy.pefirbuf[e]=700*
b.mode_gr*b.channels_out;-1==a.ATHtype&&(a.ATHtype=4);switch(a.VBR){case G.vbr_mt:a.VBR=G.vbr_mtrh;case G.vbr_mtrh:null==a.useTemporal&&(a.useTemporal=!1);g.apply_preset(a,500-10*a.VBR_q,0);0>a.quality&&(a.quality=LAME_DEFAULT_QUALITY);5>a.quality&&(a.quality=0);5<a.quality&&(a.quality=5);b.PSY.mask_adjust=a.maskingadjust;b.PSY.mask_adjust_short=a.maskingadjust_short;b.sfb21_extra=a.experimentalY?!1:44E3<a.out_samplerate;b.iteration_loop=new VBRNewIterationLoop(D);break;case G.vbr_rh:g.apply_preset(a,
500-10*a.VBR_q,0);b.PSY.mask_adjust=a.maskingadjust;b.PSY.mask_adjust_short=a.maskingadjust_short;b.sfb21_extra=a.experimentalY?!1:44E3<a.out_samplerate;6<a.quality&&(a.quality=6);0>a.quality&&(a.quality=LAME_DEFAULT_QUALITY);b.iteration_loop=new VBROldIterationLoop(D);break;default:b.sfb21_extra=!1,0>a.quality&&(a.quality=LAME_DEFAULT_QUALITY),e=a.VBR,e==G.vbr_off&&(a.VBR_mean_bitrate_kbps=a.brate),g.apply_preset(a,a.VBR_mean_bitrate_kbps,0),a.VBR=e,b.PSY.mask_adjust=a.maskingadjust,b.PSY.mask_adjust_short=
a.maskingadjust_short,b.iteration_loop=e==G.vbr_off?new Bc(D):new ABRIterationLoop(D)}if(a.VBR!=G.vbr_off){b.VBR_min_bitrate=1;b.VBR_max_bitrate=14;16E3>a.out_samplerate&&(b.VBR_max_bitrate=8);if(0!=a.VBR_min_bitrate_kbps&&(a.VBR_min_bitrate_kbps=B(a.VBR_min_bitrate_kbps,a.version,a.out_samplerate),b.VBR_min_bitrate=U(a.VBR_min_bitrate_kbps,a.version,a.out_samplerate),0>b.VBR_min_bitrate)||0!=a.VBR_max_bitrate_kbps&&(a.VBR_max_bitrate_kbps=B(a.VBR_max_bitrate_kbps,a.version,a.out_samplerate),b.VBR_max_bitrate=
U(a.VBR_max_bitrate_kbps,a.version,a.out_samplerate),0>b.VBR_max_bitrate))return-1;a.VBR_min_bitrate_kbps=w.bitrate_table[a.version][b.VBR_min_bitrate];a.VBR_max_bitrate_kbps=w.bitrate_table[a.version][b.VBR_max_bitrate];a.VBR_mean_bitrate_kbps=Math.min(w.bitrate_table[a.version][b.VBR_max_bitrate],a.VBR_mean_bitrate_kbps);a.VBR_mean_bitrate_kbps=Math.max(w.bitrate_table[a.version][b.VBR_min_bitrate],a.VBR_mean_bitrate_kbps)}a.tune&&(b.PSY.mask_adjust+=a.tune_value_a,b.PSY.mask_adjust_short+=a.tune_value_a);
e=a.internal_flags;switch(a.quality){default:case 9:e.psymodel=0;e.noise_shaping=0;e.noise_shaping_amp=0;e.noise_shaping_stop=0;e.use_best_huffman=0;e.full_outer_loop=0;break;case 8:a.quality=7;case 7:e.psymodel=1;e.noise_shaping=0;e.noise_shaping_amp=0;e.noise_shaping_stop=0;e.use_best_huffman=0;e.full_outer_loop=0;break;case 6:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);e.noise_shaping_amp=0;e.noise_shaping_stop=0;-1==e.subblock_gain&&(e.subblock_gain=1);e.use_best_huffman=0;e.full_outer_loop=
0;break;case 5:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);e.noise_shaping_amp=0;e.noise_shaping_stop=0;-1==e.subblock_gain&&(e.subblock_gain=1);e.use_best_huffman=0;e.full_outer_loop=0;break;case 4:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);e.noise_shaping_amp=0;e.noise_shaping_stop=0;-1==e.subblock_gain&&(e.subblock_gain=1);e.use_best_huffman=1;e.full_outer_loop=0;break;case 3:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);e.noise_shaping_amp=1;e.noise_shaping_stop=1;-1==
e.subblock_gain&&(e.subblock_gain=1);e.use_best_huffman=1;e.full_outer_loop=0;break;case 2:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);0==e.substep_shaping&&(e.substep_shaping=2);e.noise_shaping_amp=1;e.noise_shaping_stop=1;-1==e.subblock_gain&&(e.subblock_gain=1);e.use_best_huffman=1;e.full_outer_loop=0;break;case 1:e.psymodel=1;0==e.noise_shaping&&(e.noise_shaping=1);0==e.substep_shaping&&(e.substep_shaping=2);e.noise_shaping_amp=2;e.noise_shaping_stop=1;-1==e.subblock_gain&&(e.subblock_gain=
1);e.use_best_huffman=1;e.full_outer_loop=0;break;case 0:e.psymodel=1,0==e.noise_shaping&&(e.noise_shaping=1),0==e.substep_shaping&&(e.substep_shaping=2),e.noise_shaping_amp=2,e.noise_shaping_stop=1,-1==e.subblock_gain&&(e.subblock_gain=1),e.use_best_huffman=1,e.full_outer_loop=0}b.ATH.useAdjust=0>a.athaa_type?3:a.athaa_type;b.ATH.aaSensitivityP=Math.pow(10,a.athaa_sensitivity/-10);null==a.short_blocks&&(a.short_blocks=ra.short_block_allowed);a.short_blocks!=ra.short_block_allowed||a.mode!=la.JOINT_STEREO&&
a.mode!=la.STEREO||(a.short_blocks=ra.short_block_coupled);0>a.quant_comp&&(a.quant_comp=1);0>a.quant_comp_short&&(a.quant_comp_short=0);0>a.msfix&&(a.msfix=0);a.exp_nspsytune|=1;0>a.internal_flags.nsPsy.attackthre&&(a.internal_flags.nsPsy.attackthre=Pb.NSATTACKTHRE);0>a.internal_flags.nsPsy.attackthre_s&&(a.internal_flags.nsPsy.attackthre_s=Pb.NSATTACKTHRE_S);0>a.scale&&(a.scale=1);0>a.ATHtype&&(a.ATHtype=4);0>a.ATHcurve&&(a.ATHcurve=4);0>a.athaa_loudapprox&&(a.athaa_loudapprox=2);0>a.interChRatio&&
(a.interChRatio=0);null==a.useTemporal&&(a.useTemporal=!0);b.slot_lag=b.frac_SpF=0;a.VBR==G.vbr_off&&(b.slot_lag=b.frac_SpF=72E3*(a.version+1)*a.brate%a.out_samplerate|0);q.iteration_init(a);p.psymodel_init(a);return 0};this.lame_encode_flush=function(a,e,f,g){var k=a.internal_flags,l=dc([2,1152]),h=0,m=k.mf_samples_to_encode-c.POSTDELAY,p=b(a);if(1>k.mf_samples_to_encode)return 0;var n=0;a.in_samplerate!=a.out_samplerate&&(m+=16*a.out_samplerate/a.in_samplerate);var q=a.framesize-m%a.framesize;576>
q&&(q+=a.framesize);a.encoder_padding=q;for(q=(m+q)/a.framesize;0<q&&0<=h;){var r=p-k.mf_size;m=a.frameNum;r*=a.in_samplerate;r/=a.out_samplerate;1152<r&&(r=1152);1>r&&(r=1);h=g-n;0==g&&(h=0);h=this.lame_encode_buffer(a,l[0],l[1],r,e,f,h);f+=h;n+=h;q-=m!=a.frameNum?1:0}k.mf_samples_to_encode=0;if(0>h)return h;h=g-n;0==g&&(h=0);d.flush_bitstream(a);h=d.copy_buffer(k,e,f,h,1);if(0>h)return h;f+=h;n+=h;h=g-n;0==g&&(h=0);if(a.write_id3tag_automatic){t.id3tag_write_v1(a);h=d.copy_buffer(k,e,f,h,0);if(0>
h)return h;n+=h}return n};this.lame_encode_buffer=function(a,b,d,c,e,f,g){var h=a.internal_flags,k=[null,null];if(4294479419!=h.Class_ID)return-3;if(0==c)return 0;if(null==h.in_buffer_0||h.in_buffer_nsamples<c)h.in_buffer_0=K(c),h.in_buffer_1=K(c),h.in_buffer_nsamples=c;k[0]=h.in_buffer_0;k[1]=h.in_buffer_1;for(var l=0;l<c;l++)k[0][l]=b[l],1<h.channels_in&&(k[1][l]=d[l]);return v(a,k[0],k[1],c,e,f,g)}}function Kc(){this.setModules=function(c,k){}}function Lc(){this.setModules=function(c,k,n){}}function Mc(){}
function Nc(){this.setModules=function(c,k){}}function Fa(){this.sampleRate=this.channels=this.dataLen=this.dataOffset=0}function cc(c){return c.charCodeAt(0)<<24|c.charCodeAt(1)<<16|c.charCodeAt(2)<<8|c.charCodeAt(3)}var na={fill:function(c,k,n,w){if(2==arguments.length)for(var u=0;u<c.length;u++)c[u]=arguments[1];else for(u=k;u<n;u++)c[u]=w}},T={arraycopy:function(c,k,n,w,E){for(E=k+E;k<E;)n[w++]=c[k++]}},aa={SQRT2:1.4142135623730951,FAST_LOG10:function(c){return Math.log10(c)},FAST_LOG10_X:function(c,
k){return Math.log10(c)*k}};ra.short_block_allowed=new ra(0);ra.short_block_coupled=new ra(1);ra.short_block_dispensed=new ra(2);ra.short_block_forced=new ra(3);var Ma={MAX_VALUE:3.4028235E38};G.vbr_off=new G(0);G.vbr_mt=new G(1);G.vbr_rh=new G(2);G.vbr_abr=new G(3);G.vbr_mtrh=new G(4);G.vbr_default=G.vbr_mtrh;la.STEREO=new la(0);la.JOINT_STEREO=new la(1);la.DUAL_CHANNEL=new la(2);la.MONO=new la(3);la.NOT_SET=new la(4);Y.STEPS_per_dB=100;Y.MAX_dB=120;Y.GAIN_NOT_ENOUGH_SAMPLES=-24601;Y.GAIN_ANALYSIS_ERROR=
0;Y.GAIN_ANALYSIS_OK=1;Y.INIT_GAIN_ANALYSIS_ERROR=0;Y.INIT_GAIN_ANALYSIS_OK=1;Y.YULE_ORDER=10;Y.MAX_ORDER=Y.YULE_ORDER;Y.MAX_SAMP_FREQ=48E3;Y.RMS_WINDOW_TIME_NUMERATOR=1;Y.RMS_WINDOW_TIME_DENOMINATOR=20;Y.MAX_SAMPLES_PER_WINDOW=Y.MAX_SAMP_FREQ*Y.RMS_WINDOW_TIME_NUMERATOR/Y.RMS_WINDOW_TIME_DENOMINATOR+1;qa.EQ=function(c,k){return Math.abs(c)>Math.abs(k)?Math.abs(c-k)<=1E-6*Math.abs(c):Math.abs(c-k)<=1E-6*Math.abs(k)};qa.NEQ=function(c,k){return!qa.EQ(c,k)};zb.NUMTOCENTRIES=100;zb.MAXFRAMESIZE=2880;
var w={t1HB:[1,1,1,0],t2HB:[1,2,1,3,1,1,3,2,0],t3HB:[3,2,1,1,1,1,3,2,0],t5HB:[1,2,6,5,3,1,4,4,7,5,7,1,6,1,1,0],t6HB:[7,3,5,1,6,2,3,2,5,4,4,1,3,3,2,0],t7HB:[1,2,10,19,16,10,3,3,7,10,5,3,11,4,13,17,8,4,12,11,18,15,11,2,7,6,9,14,3,1,6,4,5,3,2,0],t8HB:[3,4,6,18,12,5,5,1,2,16,9,3,7,3,5,14,7,3,19,17,15,13,10,4,13,5,8,11,5,1,12,4,4,1,1,0],t9HB:[7,5,9,14,15,7,6,4,5,5,6,7,7,6,8,8,8,5,15,6,9,10,5,1,11,7,9,6,4,1,14,4,6,2,6,0],t10HB:[1,2,10,23,35,30,12,17,3,3,8,12,18,21,12,7,11,9,15,21,32,40,19,6,14,13,22,34,
46,23,18,7,20,19,33,47,27,22,9,3,31,22,41,26,21,20,5,3,14,13,10,11,16,6,5,1,9,8,7,8,4,4,2,0],t11HB:[3,4,10,24,34,33,21,15,5,3,4,10,32,17,11,10,11,7,13,18,30,31,20,5,25,11,19,59,27,18,12,5,35,33,31,58,30,16,7,5,28,26,32,19,17,15,8,14,14,12,9,13,14,9,4,1,11,4,6,6,6,3,2,0],t12HB:[9,6,16,33,41,39,38,26,7,5,6,9,23,16,26,11,17,7,11,14,21,30,10,7,17,10,15,12,18,28,14,5,32,13,22,19,18,16,9,5,40,17,31,29,17,13,4,2,27,12,11,15,10,7,4,1,27,12,8,12,6,3,1,0],t13HB:[1,5,14,21,34,51,46,71,42,52,68,52,67,44,43,19,
3,4,12,19,31,26,44,33,31,24,32,24,31,35,22,14,15,13,23,36,59,49,77,65,29,40,30,40,27,33,42,16,22,20,37,61,56,79,73,64,43,76,56,37,26,31,25,14,35,16,60,57,97,75,114,91,54,73,55,41,48,53,23,24,58,27,50,96,76,70,93,84,77,58,79,29,74,49,41,17,47,45,78,74,115,94,90,79,69,83,71,50,59,38,36,15,72,34,56,95,92,85,91,90,86,73,77,65,51,44,43,42,43,20,30,44,55,78,72,87,78,61,46,54,37,30,20,16,53,25,41,37,44,59,54,81,66,76,57,54,37,18,39,11,35,33,31,57,42,82,72,80,47,58,55,21,22,26,38,22,53,25,23,38,70,60,51,
36,55,26,34,23,27,14,9,7,34,32,28,39,49,75,30,52,48,40,52,28,18,17,9,5,45,21,34,64,56,50,49,45,31,19,12,15,10,7,6,3,48,23,20,39,36,35,53,21,16,23,13,10,6,1,4,2,16,15,17,27,25,20,29,11,17,12,16,8,1,1,0,1],t15HB:[7,12,18,53,47,76,124,108,89,123,108,119,107,81,122,63,13,5,16,27,46,36,61,51,42,70,52,83,65,41,59,36,19,17,15,24,41,34,59,48,40,64,50,78,62,80,56,33,29,28,25,43,39,63,55,93,76,59,93,72,54,75,50,29,52,22,42,40,67,57,95,79,72,57,89,69,49,66,46,27,77,37,35,66,58,52,91,74,62,48,79,63,90,62,40,
38,125,32,60,56,50,92,78,65,55,87,71,51,73,51,70,30,109,53,49,94,88,75,66,122,91,73,56,42,64,44,21,25,90,43,41,77,73,63,56,92,77,66,47,67,48,53,36,20,71,34,67,60,58,49,88,76,67,106,71,54,38,39,23,15,109,53,51,47,90,82,58,57,48,72,57,41,23,27,62,9,86,42,40,37,70,64,52,43,70,55,42,25,29,18,11,11,118,68,30,55,50,46,74,65,49,39,24,16,22,13,14,7,91,44,39,38,34,63,52,45,31,52,28,19,14,8,9,3,123,60,58,53,47,43,32,22,37,24,17,12,15,10,2,1,71,37,34,30,28,20,17,26,21,16,10,6,8,6,2,0],t16HB:[1,5,14,44,74,63,
110,93,172,149,138,242,225,195,376,17,3,4,12,20,35,62,53,47,83,75,68,119,201,107,207,9,15,13,23,38,67,58,103,90,161,72,127,117,110,209,206,16,45,21,39,69,64,114,99,87,158,140,252,212,199,387,365,26,75,36,68,65,115,101,179,164,155,264,246,226,395,382,362,9,66,30,59,56,102,185,173,265,142,253,232,400,388,378,445,16,111,54,52,100,184,178,160,133,257,244,228,217,385,366,715,10,98,48,91,88,165,157,148,261,248,407,397,372,380,889,884,8,85,84,81,159,156,143,260,249,427,401,392,383,727,713,708,7,154,76,73,
141,131,256,245,426,406,394,384,735,359,710,352,11,139,129,67,125,247,233,229,219,393,743,737,720,885,882,439,4,243,120,118,115,227,223,396,746,742,736,721,712,706,223,436,6,202,224,222,218,216,389,386,381,364,888,443,707,440,437,1728,4,747,211,210,208,370,379,734,723,714,1735,883,877,876,3459,865,2,377,369,102,187,726,722,358,711,709,866,1734,871,3458,870,434,0,12,10,7,11,10,17,11,9,13,12,10,7,5,3,1,3],t24HB:[15,13,46,80,146,262,248,434,426,669,653,649,621,517,1032,88,14,12,21,38,71,130,122,216,
209,198,327,345,319,297,279,42,47,22,41,74,68,128,120,221,207,194,182,340,315,295,541,18,81,39,75,70,134,125,116,220,204,190,178,325,311,293,271,16,147,72,69,135,127,118,112,210,200,188,352,323,306,285,540,14,263,66,129,126,119,114,214,202,192,180,341,317,301,281,262,12,249,123,121,117,113,215,206,195,185,347,330,308,291,272,520,10,435,115,111,109,211,203,196,187,353,332,313,298,283,531,381,17,427,212,208,205,201,193,186,177,169,320,303,286,268,514,377,16,335,199,197,191,189,181,174,333,321,305,289,
275,521,379,371,11,668,184,183,179,175,344,331,314,304,290,277,530,383,373,366,10,652,346,171,168,164,318,309,299,287,276,263,513,375,368,362,6,648,322,316,312,307,302,292,284,269,261,512,376,370,364,359,4,620,300,296,294,288,282,273,266,515,380,374,369,365,361,357,2,1033,280,278,274,267,264,259,382,378,372,367,363,360,358,356,0,43,20,19,17,15,13,11,9,7,6,4,7,5,3,1,3],t32HB:[1,10,8,20,12,20,16,32,14,12,24,0,28,16,24,16],t33HB:[15,28,26,48,22,40,36,64,14,24,20,32,12,16,8,0],t1l:[1,4,3,5],t2l:[1,4,
7,4,5,7,6,7,8],t3l:[2,3,7,4,4,7,6,7,8],t5l:[1,4,7,8,4,5,8,9,7,8,9,10,8,8,9,10],t6l:[3,4,6,8,4,4,6,7,5,6,7,8,7,7,8,9],t7l:[1,4,7,9,9,10,4,6,8,9,9,10,7,7,9,10,10,11,8,9,10,11,11,11,8,9,10,11,11,12,9,10,11,12,12,12],t8l:[2,4,7,9,9,10,4,4,6,10,10,10,7,6,8,10,10,11,9,10,10,11,11,12,9,9,10,11,12,12,10,10,11,11,13,13],t9l:[3,4,6,7,9,10,4,5,6,7,8,10,5,6,7,8,9,10,7,7,8,9,9,10,8,8,9,9,10,11,9,9,10,10,11,11],t10l:[1,4,7,9,10,10,10,11,4,6,8,9,10,11,10,10,7,8,9,10,11,12,11,11,8,9,10,11,12,12,11,12,9,10,11,12,
12,12,12,12,10,11,12,12,13,13,12,13,9,10,11,12,12,12,13,13,10,10,11,12,12,13,13,13],t11l:[2,4,6,8,9,10,9,10,4,5,6,8,10,10,9,10,6,7,8,9,10,11,10,10,8,8,9,11,10,12,10,11,9,10,10,11,11,12,11,12,9,10,11,12,12,13,12,13,9,9,9,10,11,12,12,12,9,9,10,11,12,12,12,12],t12l:[4,4,6,8,9,10,10,10,4,5,6,7,9,9,10,10,6,6,7,8,9,10,9,10,7,7,8,8,9,10,10,10,8,8,9,9,10,10,10,11,9,9,10,10,10,11,10,11,9,9,9,10,10,11,11,12,10,10,10,11,11,11,11,12],t13l:[1,5,7,8,9,10,10,11,10,11,12,12,13,13,14,14,4,6,8,9,10,10,11,11,11,11,
12,12,13,14,14,14,7,8,9,10,11,11,12,12,11,12,12,13,13,14,15,15,8,9,10,11,11,12,12,12,12,13,13,13,13,14,15,15,9,9,11,11,12,12,13,13,12,13,13,14,14,15,15,16,10,10,11,12,12,12,13,13,13,13,14,13,15,15,16,16,10,11,12,12,13,13,13,13,13,14,14,14,15,15,16,16,11,11,12,13,13,13,14,14,14,14,15,15,15,16,18,18,10,10,11,12,12,13,13,14,14,14,14,15,15,16,17,17,11,11,12,12,13,13,13,15,14,15,15,16,16,16,18,17,11,12,12,13,13,14,14,15,14,15,16,15,16,17,18,19,12,12,12,13,14,14,14,14,15,15,15,16,17,17,17,18,12,13,13,14,
14,15,14,15,16,16,17,17,17,18,18,18,13,13,14,15,15,15,16,16,16,16,16,17,18,17,18,18,14,14,14,15,15,15,17,16,16,19,17,17,17,19,18,18,13,14,15,16,16,16,17,16,17,17,18,18,21,20,21,18],t15l:[3,5,6,8,8,9,10,10,10,11,11,12,12,12,13,14,5,5,7,8,9,9,10,10,10,11,11,12,12,12,13,13,6,7,7,8,9,9,10,10,10,11,11,12,12,13,13,13,7,8,8,9,9,10,10,11,11,11,12,12,12,13,13,13,8,8,9,9,10,10,11,11,11,11,12,12,12,13,13,13,9,9,9,10,10,10,11,11,11,11,12,12,13,13,13,14,10,9,10,10,10,11,11,11,11,12,12,12,13,13,14,14,10,10,10,
11,11,11,11,12,12,12,12,12,13,13,13,14,10,10,10,11,11,11,11,12,12,12,12,13,13,14,14,14,10,10,11,11,11,11,12,12,12,13,13,13,13,14,14,14,11,11,11,11,12,12,12,12,12,13,13,13,13,14,15,14,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,15,12,12,11,12,12,12,13,13,13,13,13,13,14,14,15,15,12,12,12,12,12,13,13,13,13,14,14,14,14,14,15,15,13,13,13,13,13,13,13,13,14,14,14,14,15,15,14,15,13,13,13,13,13,13,13,14,14,14,14,14,15,15,15,15],t16_5l:[1,5,7,9,10,10,11,11,12,12,12,13,13,13,14,11,4,6,8,9,10,11,11,11,12,12,
12,13,14,13,14,11,7,8,9,10,11,11,12,12,13,12,13,13,13,14,14,12,9,9,10,11,11,12,12,12,13,13,14,14,14,15,15,13,10,10,11,11,12,12,13,13,13,14,14,14,15,15,15,12,10,10,11,11,12,13,13,14,13,14,14,15,15,15,16,13,11,11,11,12,13,13,13,13,14,14,14,14,15,15,16,13,11,11,12,12,13,13,13,14,14,15,15,15,15,17,17,13,11,12,12,13,13,13,14,14,15,15,15,15,16,16,16,13,12,12,12,13,13,14,14,15,15,15,15,16,15,16,15,14,12,13,12,13,14,14,14,14,15,16,16,16,17,17,16,13,13,13,13,13,14,14,15,16,16,16,16,16,16,15,16,14,13,14,14,
14,14,15,15,15,15,17,16,16,16,16,18,14,15,14,14,14,15,15,16,16,16,18,17,17,17,19,17,14,14,15,13,14,16,16,15,16,16,17,18,17,19,17,16,14,11,11,11,12,12,13,13,13,14,14,14,14,14,14,14,12],t16l:[1,5,7,9,10,10,11,11,12,12,12,13,13,13,14,10,4,6,8,9,10,11,11,11,12,12,12,13,14,13,14,10,7,8,9,10,11,11,12,12,13,12,13,13,13,14,14,11,9,9,10,11,11,12,12,12,13,13,14,14,14,15,15,12,10,10,11,11,12,12,13,13,13,14,14,14,15,15,15,11,10,10,11,11,12,13,13,14,13,14,14,15,15,15,16,12,11,11,11,12,13,13,13,13,14,14,14,14,
15,15,16,12,11,11,12,12,13,13,13,14,14,15,15,15,15,17,17,12,11,12,12,13,13,13,14,14,15,15,15,15,16,16,16,12,12,12,12,13,13,14,14,15,15,15,15,16,15,16,15,13,12,13,12,13,14,14,14,14,15,16,16,16,17,17,16,12,13,13,13,13,14,14,15,16,16,16,16,16,16,15,16,13,13,14,14,14,14,15,15,15,15,17,16,16,16,16,18,13,15,14,14,14,15,15,16,16,16,18,17,17,17,19,17,13,14,15,13,14,16,16,15,16,16,17,18,17,19,17,16,13,10,10,10,11,11,12,12,12,13,13,13,13,13,13,13,10],t24l:[4,5,7,8,9,10,10,11,11,12,12,12,12,12,13,10,5,6,7,8,
9,10,10,11,11,11,12,12,12,12,12,10,7,7,8,9,9,10,10,11,11,11,11,12,12,12,13,9,8,8,9,9,10,10,10,11,11,11,11,12,12,12,12,9,9,9,9,10,10,10,10,11,11,11,12,12,12,12,13,9,10,9,10,10,10,10,11,11,11,11,12,12,12,12,12,9,10,10,10,10,10,11,11,11,11,12,12,12,12,12,13,9,11,10,10,10,11,11,11,11,12,12,12,12,12,13,13,10,11,11,11,11,11,11,11,11,11,12,12,12,12,13,13,10,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,10,12,11,11,11,11,12,12,12,12,12,12,13,13,13,13,10,12,12,11,11,11,12,12,12,12,12,12,13,13,13,13,10,12,12,
12,12,12,12,12,12,12,12,13,13,13,13,13,10,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,10,13,12,12,12,12,12,12,13,13,13,13,13,13,13,13,10,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,6],t32l:[1,5,5,7,5,8,7,9,5,7,7,9,7,9,9,10],t33l:[4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8]};w.ht=[new U(0,0,null,null),new U(2,0,w.t1HB,w.t1l),new U(3,0,w.t2HB,w.t2l),new U(3,0,w.t3HB,w.t3l),new U(0,0,null,null),new U(4,0,w.t5HB,w.t5l),new U(4,0,w.t6HB,w.t6l),new U(6,0,w.t7HB,w.t7l),new U(6,0,w.t8HB,w.t8l),new U(6,0,w.t9HB,w.t9l),new U(8,
0,w.t10HB,w.t10l),new U(8,0,w.t11HB,w.t11l),new U(8,0,w.t12HB,w.t12l),new U(16,0,w.t13HB,w.t13l),new U(0,0,null,w.t16_5l),new U(16,0,w.t15HB,w.t15l),new U(1,1,w.t16HB,w.t16l),new U(2,3,w.t16HB,w.t16l),new U(3,7,w.t16HB,w.t16l),new U(4,15,w.t16HB,w.t16l),new U(6,63,w.t16HB,w.t16l),new U(8,255,w.t16HB,w.t16l),new U(10,1023,w.t16HB,w.t16l),new U(13,8191,w.t16HB,w.t16l),new U(4,15,w.t24HB,w.t24l),new U(5,31,w.t24HB,w.t24l),new U(6,63,w.t24HB,w.t24l),new U(7,127,w.t24HB,w.t24l),new U(8,255,w.t24HB,w.t24l),
new U(9,511,w.t24HB,w.t24l),new U(11,2047,w.t24HB,w.t24l),new U(13,8191,w.t24HB,w.t24l),new U(0,0,w.t32HB,w.t32l),new U(0,0,w.t33HB,w.t33l)];w.largetbl=[65540,327685,458759,589832,655369,655370,720906,720907,786443,786444,786444,851980,851980,851980,917517,655370,262149,393222,524295,589832,655369,720906,720906,720907,786443,786443,786444,851980,917516,851980,917516,655370,458759,524295,589832,655369,720905,720906,786442,786443,851979,786443,851979,851980,851980,917516,917517,720905,589832,589832,
655369,720905,720906,786442,786442,786443,851979,851979,917515,917516,917516,983052,983052,786441,655369,655369,720905,720906,786442,786442,851978,851979,851979,917515,917516,917516,983052,983052,983053,720905,655370,655369,720906,720906,786442,851978,851979,917515,851979,917515,917516,983052,983052,983052,1048588,786441,720906,720906,720906,786442,851978,851979,851979,851979,917515,917516,917516,917516,983052,983052,1048589,786441,720907,720906,786442,786442,851979,851979,851979,917515,917516,983052,
983052,983052,983052,1114125,1114125,786442,720907,786443,786443,851979,851979,851979,917515,917515,983051,983052,983052,983052,1048588,1048589,1048589,786442,786443,786443,786443,851979,851979,917515,917515,983052,983052,983052,983052,1048588,983053,1048589,983053,851978,786444,851979,786443,851979,917515,917516,917516,917516,983052,1048588,1048588,1048589,1114125,1114125,1048589,786442,851980,851980,851979,851979,917515,917516,983052,1048588,1048588,1048588,1048588,1048589,1048589,983053,1048589,
851978,851980,917516,917516,917516,917516,983052,983052,983052,983052,1114124,1048589,1048589,1048589,1048589,1179661,851978,983052,917516,917516,917516,983052,983052,1048588,1048588,1048589,1179661,1114125,1114125,1114125,1245197,1114125,851978,917517,983052,851980,917516,1048588,1048588,983052,1048589,1048589,1114125,1179661,1114125,1245197,1114125,1048589,851978,655369,655369,655369,720905,720905,786441,786441,786441,851977,851977,851977,851978,851978,851978,851978,655366];w.table23=[65538,262147,
458759,262148,327684,458759,393222,458759,524296];w.table56=[65539,262148,458758,524296,262148,327684,524294,589831,458757,524294,589831,655368,524295,524295,589832,655369];w.bitrate_table=[[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1],[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],[0,8,16,24,32,40,48,56,64,-1,-1,-1,-1,-1,-1,-1]];w.samplerate_table=[[22050,24E3,16E3,-1],[44100,48E3,32E3,-1],[11025,12E3,8E3,-1]];w.scfsi_band=[0,6,11,16,21];ia.Q_MAX=257;ia.Q_MAX2=116;ia.LARGE_BITS=1E5;
ia.IXMAX_VAL=8206;var sa={};sa.SFBMAX=3*c.SBMAX_s;c.ENCDELAY=576;c.POSTDELAY=1152;c.MDCTDELAY=48;c.FFTOFFSET=224+c.MDCTDELAY;c.DECDELAY=528;c.SBLIMIT=32;c.CBANDS=64;c.SBPSY_l=21;c.SBPSY_s=12;c.SBMAX_l=22;c.SBMAX_s=13;c.PSFB21=6;c.PSFB12=6;c.BLKSIZE=1024;c.HBLKSIZE=c.BLKSIZE/2+1;c.BLKSIZE_s=256;c.HBLKSIZE_s=c.BLKSIZE_s/2+1;c.NORM_TYPE=0;c.START_TYPE=1;c.SHORT_TYPE=2;c.STOP_TYPE=3;c.MPG_MD_LR_LR=0;c.MPG_MD_LR_I=1;c.MPG_MD_MS_LR=2;c.MPG_MD_MS_I=3;c.fircoef=[-.1039435,-.1892065,-.0432472*5,-.155915,3.898045E-17,
.0467745*5,.50455,.756825,.187098*5];da.MFSIZE=3456+c.ENCDELAY-c.MDCTDELAY;da.MAX_HEADER_BUF=256;da.MAX_BITS_PER_CHANNEL=4095;da.MAX_BITS_PER_GRANULE=7680;da.BPC=320;Fa.RIFF=cc("RIFF");Fa.WAVE=cc("WAVE");Fa.fmt_=cc("fmt ");Fa.data=cc("data");Fa.readHeader=function(c){var k=new Fa,n=c.getUint32(0,!1);if(Fa.RIFF==n&&(c.getUint32(4,!0),Fa.WAVE==c.getUint32(8,!1)&&Fa.fmt_==c.getUint32(12,!1))){var u=c.getUint32(16,!0),w=20;switch(u){case 16:case 18:k.channels=c.getUint16(w+2,!0);k.sampleRate=c.getUint32(w+
4,!0);break;default:throw"extended fmt chunk not implemented";}w+=u;u=Fa.data;for(var B=0;u!=n;){n=c.getUint32(w,!1);B=c.getUint32(w+4,!0);if(u==n)break;w+=B+8}k.dataLen=B;k.dataOffset=w+8;return k}};sa.SFBMAX=3*c.SBMAX_s;lamejs.Mp3Encoder=function(c,k,n){3!=arguments.length&&(console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"),c=1,k=44100,n=128);var u=new W,w=new Kc,B=new Y,G=new qa,f=new wc,b=new ia,v=new Ec,a=new zb,m=new mc,z=new Nc,e=new xc,l=new qb,d=new Lc,g=new Mc;
u.setModules(B,G,f,b,v,a,m,z,g);G.setModules(B,g,m,a);z.setModules(G,m);f.setModules(u);v.setModules(G,e,b,l);b.setModules(l,e,u.enc.psy);e.setModules(G);l.setModules(b);a.setModules(u,G,m);w.setModules(d,g);d.setModules(m,z,f);var q=u.lame_init();q.num_channels=c;q.in_samplerate=k;q.brate=n;q.mode=la.STEREO;q.quality=3;q.bWriteVbrTag=!1;q.disable_reservoir=!0;q.write_id3tag_automatic=!1;u.lame_init_params(q);var D=1152,p=0|1.25*D+7200,r=new Int8Array(p);this.encodeBuffer=function(a,b){1==c&&(b=a);
a.length>D&&(D=a.length,p=0|1.25*D+7200,r=new Int8Array(p));a=u.lame_encode_buffer(q,a,b,a.length,r,0,p);return new Int8Array(r.subarray(0,a))};this.flush=function(){var a=u.lame_encode_flush(q,r,0,p);return new Int8Array(r.subarray(0,a))}};lamejs.WavHeader=Fa}
return lamejs; })();
const AudioReader = (() => { const module = { exports: {} }; const exports = module.exports;
/* Read AAC packets from saved MP4/fMP4/TS without loading the whole video. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayAudioReader = factory();
})(globalThis, function () {
  'use strict';
  const fail = text => { throw new Error(`音频提取失败：${text}`); };
  const view = bytes => new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const type = (bytes, offset) => String.fromCharCode(...bytes.subarray(offset, offset + 4));
  function number64(v, offset) { const result = Number(v.getBigUint64(offset)); if (!Number.isSafeInteger(result)) fail('文件偏移过大'); return result; }
  function* boxes(bytes, start = 0, end = bytes.length) {
    const v = view(bytes);
    for (let at = start; at < end;) {
      if (at + 8 > end) fail('文件头不完整');
      let size = v.getUint32(at), head = 8;
      if (size === 1) { if (at + 16 > end) fail('文件头不完整'); size = number64(v, at + 8); head = 16; }
      if (!size) size = end - at;
      if (size < head || at + size > end) fail('文件结构损坏');
      yield {type: type(bytes, at + 4), start: at, body: at + head, end: at + size}; at += size;
    }
  }
  function child(bytes, parent, name, optional = false) {
    const found = [...boxes(bytes, parent.body, parent.end)].find(box => box.type === name);
    if (!found && !optional) fail(`缺少 ${name}`); return found;
  }
  async function read(file, start, length, signal) {
    signal?.throwIfAborted();
    if (start < 0 || length < 0 || start + length > file.size) fail('音频数据超出文件范围');
    const bytes = new Uint8Array(await file.slice(start, start + length).arrayBuffer());
    signal?.throwIfAborted(); if (bytes.length !== length) fail('文件读取不完整'); return bytes;
  }
  async function* fileBoxes(file, signal) {
    for (let at = 0; at < file.size;) {
      const bytes = await read(file, at, Math.min(16, file.size - at), signal), v = view(bytes);
      if (bytes.length < 8) fail('文件被截断');
      let size = v.getUint32(0), head = 8;
      if (size === 1) { if (bytes.length < 16) fail('文件被截断'); size = number64(v, 8); head = 16; }
      if (!size) size = file.size - at;
      if (size < head || at + size > file.size) fail('文件被截断');
      yield {type: type(bytes, 4), start: at, body: at + head, end: at + size}; at += size;
    }
  }
  function descriptor(bytes, at, end) {
    if (at >= end) fail('AAC 编码描述损坏');
    const tag = bytes[at++]; let size = 0, value;
    for (let count = 0; count < 4; count++) {
      if (at >= end) fail('AAC 编码描述损坏');
      value = bytes[at++]; size = size * 128 + (value & 127); if (!(value & 128)) break;
    }
    if (value & 128 || at + size > end) fail('AAC 编码描述损坏');
    return {tag, body: at, end: at + size};
  }
  function audioConfig(bytes, track) {
    const v = view(bytes), tkhd = child(bytes, track, 'tkhd'), mdia = child(bytes, track, 'mdia');
    const mdhd = child(bytes, mdia, 'mdhd'), stbl = child(bytes, child(bytes, mdia, 'minf'), 'stbl');
    const stsd = child(bytes, stbl, 'stsd'), entry = [...boxes(bytes, stsd.body + 8, stsd.end)][0];
    if (!entry || entry.type !== 'mp4a' || v.getUint16(entry.body + 8)) fail('暂仅支持 AAC-LC 音频');
    const esds = [...boxes(bytes, entry.body + 28, entry.end)].find(box => box.type === 'esds');
    if (!esds) fail('缺少 AAC 编码描述');
    const es = descriptor(bytes, esds.body + 4, esds.end); let at = es.body;
    if (es.tag === 3) {
      const flags = bytes[at + 2]; at += 3;
      if (flags & 128) at += 2;
      if (flags & 64) at += 1 + bytes[at];
      if (flags & 32) at += 2;
    }
    const decoder = es.tag === 4 ? es : descriptor(bytes, at, es.end);
    if (decoder.tag !== 4) fail('AAC 编码描述损坏');
    const specific = descriptor(bytes, decoder.body + 13, decoder.end);
    if (specific.tag !== 5 || specific.end - specific.body < 2) fail('AAC 编码描述损坏');
    const description = bytes.slice(specific.body, specific.end), objectType = description[0] >> 3;
    if (objectType !== 2) fail('暂仅支持 AAC-LC 音频');
    const sampleRate = v.getUint32(entry.body + 24) >>> 16, channels = v.getUint16(entry.body + 16);
    if (!sampleRate || ![1, 2].includes(channels)) fail('暂仅支持单声道或双声道音频');
    return {id: v.getUint32(tkhd.body + (bytes[tkhd.body] ? 20 : 12)),
      scale: v.getUint32(mdhd.body + (bytes[mdhd.body] ? 20 : 12)), stbl,
      sampleRate, channels, description, audioobjecttype: objectType,
      samplingfrequencyindex: ((description[0] & 7) << 1) | (description[1] >> 7), codec: 'mp4a.40.2'};
  }
  async function* ordinaryPackets(file, bytes, config, signal) {
    const v = view(bytes), table = name => child(bytes, config.stbl, name);
    const stsz = table('stsz'), stsc = table('stsc'), offsets = child(bytes, config.stbl, 'co64', true) || table('stco');
    const constant = v.getUint32(stsz.body + 4), count = v.getUint32(stsz.body + 8);
    const chunks = v.getUint32(offsets.body + 4), mappings = v.getUint32(stsc.body + 4);
    if (!mappings || !count) fail('没有可提取的音频');
    let sample = 0, map = 0;
    for (let chunk = 1; chunk <= chunks; chunk++) {
      while (map + 1 < mappings && v.getUint32(stsc.body + 8 + (map + 1) * 12) <= chunk) map++;
      const inChunk = v.getUint32(stsc.body + 12 + map * 12);
      if (v.getUint32(stsc.body + 16 + map * 12) !== 1 || !inChunk || sample + inChunk > count) fail('音频样本索引损坏');
      let position = offsets.type === 'co64' ? number64(v, offsets.body + 8 + (chunk - 1) * 8) : v.getUint32(offsets.body + 8 + (chunk - 1) * 4);
      // Read at most 64 AAC packets together; video bytes are never decoded.
      for (let used = 0; used < inChunk;) {
        const batch = Math.min(64, inChunk - used), sizes = []; let length = 0;
        for (let i = 0; i < batch; i++) { const size = constant || v.getUint32(stsz.body + 12 + (sample + i) * 4); if (!size) fail('音频样本为空'); sizes.push(size); length += size; }
        if (length > 1024 * 1024) fail('音频样本尺寸异常');
        const data = await read(file, position, length, signal); let at = 0;
        for (const size of sizes) { sample++; yield {data: data.subarray(at, at + size), config, progress: sample / count}; at += size; }
        position += length; used += batch;
      }
    }
    if (sample !== count) fail('音频样本数量不符');
  }
  async function* fragmentedPackets(file, config, signal) {
    for await (const root of fileBoxes(file, signal)) {
      if (root.type !== 'moof') continue;
      if (root.end - root.start > 8 * 1024 * 1024) fail('分片索引尺寸异常');
      const bytes = await read(file, root.start, root.end - root.start, signal), v = view(bytes), moof = [...boxes(bytes)][0];
      for (const traf of boxes(bytes, moof.body, moof.end)) {
        if (traf.type !== 'traf') continue;
        const tfhd = child(bytes, traf, 'tfhd');
        if (v.getUint32(tfhd.body + 4) !== config.id) continue;
        const flags = v.getUint32(tfhd.body) & 0xffffff;
        if (flags & 1) fail('暂不支持绝对 fMP4 数据偏移');
        let field = tfhd.body + 8;
        const optional = flag => { if (!(flags & flag)) return 0; const value = v.getUint32(field); field += 4; return value; };
        if (optional(2) > 1) fail('音频编码发生变化');
        const defaultDuration = optional(8), defaultSize = optional(16); optional(32);
        for (const run of boxes(bytes, traf.body, traf.end)) {
          if (run.type !== 'trun') continue;
          const runFlags = v.getUint32(run.body) & 0xffffff, count = v.getUint32(run.body + 4);
          if (!(runFlags & 1)) fail('fMP4 音频数据偏移缺失');
          let position = root.start + v.getInt32(run.body + 8), cursor = run.body + 12;
          if (runFlags & 4) cursor += 4;
          for (let sample = 0; sample < count; sample++) {
            const value = (flag, fallback) => { if (!(runFlags & flag)) return fallback; const result = v.getUint32(cursor); cursor += 4; return result; };
            const duration = value(0x100, defaultDuration), size = value(0x200, defaultSize); value(0x400, 0); value(0x800, 0);
            if (!duration || !size || size > 1024 * 1024 || cursor > run.end) fail('fMP4 音频样本损坏');
            yield {data: await read(file, position, size, signal), config, progress: Math.min(1, (position + size) / file.size)};
            position += size;
          }
        }
      }
    }
  }
  async function* tsPackets(file, muxjs, signal) {
    const packet = new muxjs.mp2t.TransportPacketStream(), parse = new muxjs.mp2t.TransportParseStream();
    const elementary = new muxjs.mp2t.ElementaryStream(), adts = new muxjs.codecs.Adts(), pending = [];
    packet.pipe(parse).pipe(elementary).pipe(adts);
    let position = 0;
    adts.on('data', frame => {
      if (frame.audioobjecttype !== 2 || ![1, 2].includes(frame.channelcount)) fail('暂仅支持单声道或双声道 AAC-LC 音频');
      const description = new Uint8Array([(frame.audioobjecttype << 3) | (frame.samplingfrequencyindex >> 1), (frame.samplingfrequencyindex << 7) | (frame.channelcount << 3)]);
      pending.push({data: frame.data, progress: position / file.size, config: {
        sampleRate: frame.samplerate, channels: frame.channelcount, description, codec: 'mp4a.40.2',
        audioobjecttype: frame.audioobjecttype, samplingfrequencyindex: frame.samplingfrequencyindex,
      }});
    });
    try {
      while (position < file.size) {
        const length = Math.min(188 * 1024, file.size - position), bytes = await read(file, position, length, signal); position += length;
        packet.push(bytes);
        while (pending.length) yield pending.shift();
      }
      packet.flush(); while (pending.length) yield pending.shift();
    } finally {
      pending.length = 0;
      for (const stream of [packet, parse, elementary, adts]) stream.dispose();
    }
  }
  async function* scanPackets(file, muxjs, signal) {
    const prefix = await read(file, 0, Math.min(376, file.size), signal);
    if (prefix[0] === 0x47 && (prefix.length < 376 || prefix[188] === 0x47)) { yield* tsPackets(file, muxjs, signal); return; }
    let init;
    for await (const root of fileBoxes(file, signal)) if (root.type === 'moov') {
      if (root.end - root.start > 32 * 1024 * 1024) fail('MP4 索引过大');
      init = await read(file, root.start, root.end - root.start, signal); break;
    }
    if (!init) fail('缺少完整 MP4 索引');
    const moov = [...boxes(init)][0]; let config;
    for (const track of boxes(init, moov.body, moov.end)) {
      if (track.type !== 'trak') continue;
      const hdlr = child(init, child(init, track, 'mdia'), 'hdlr');
      if (type(init, hdlr.body + 8) === 'soun') { config = audioConfig(init, track); break; }
    }
    if (!config) fail('录播没有音轨');
    if (child(init, moov, 'mvex', true)) yield* fragmentedPackets(file, config, signal);
    else yield* ordinaryPackets(file, init, config, signal);
  }
  async function* packets(file, muxjs, signal) {
    try { yield* scanPackets(file, muxjs, signal); }
    catch (error) { if (error.name === 'RangeError') fail('音频索引或编码信息损坏'); throw error; }
  }
  return {packets};
});

return module.exports; })();
const AudioExport = (() => { const module = { exports: {} }; const exports = module.exports;
/* Local AAC copy / MP3 conversion. Media is processed in bounded batches. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayAudioExport = factory();
})(globalThis, function () {
  'use strict';
  const BATCH = 64;
  function errorDetails(error) {
    const result = [];
    for (let depth = 0; error && depth < 4; depth++, error = error.cause) {
      result.push({name: error.name || 'Error', message: String(error.message || error).replace(/https?:\/\/[^\s"']+/g, '[地址省略]'), code: error.code});
    }
    return result;
  }
  const tick = () => new Promise(resolve => setTimeout(resolve, 0));
  function fragment(frames, config, muxjs, decodeTime = 0) {
    const track = {id: 1, type: 'audio', channelcount: config.channels, samplerate: config.sampleRate,
      samplesize: 16, audioobjecttype: config.audioobjecttype, samplingfrequencyindex: config.samplingfrequencyindex,
      timescale: config.sampleRate, duration: 0, baseMediaDecodeTime: decodeTime,
      samples: frames.map(frame => ({size: frame.data.length, duration: 1024}))};
    const payload = new Uint8Array(frames.reduce((sum, frame) => sum + frame.data.length, 0));
    let at = 0; for (const frame of frames) { payload.set(frame.data, at); at += frame.data.length; }
    const moof = muxjs.mp4.generator.moof(1, [track]), mdat = muxjs.mp4.generator.mdat(payload);
    const data = new Uint8Array(moof.length + mdat.length); data.set(moof); data.set(mdat, moof.length);
    return {init: muxjs.mp4.generator.initSegment([track]), data};
  }
  async function batchMp4(frames, config, muxjs, mp4Writer) {
    const parts = []; let length = 0;
    const writer = mp4Writer.createStandardMP4Writer({async writeAt(data, position) {
      parts.push({data: data.slice(), position}); length = Math.max(length, position + data.length);
    }});
    try {
      const media = fragment(frames, config, muxjs);
      await writer.writeFragment(media.init, media.data); await writer.finish();
      const bytes = new Uint8Array(length); for (const part of parts) bytes.set(part.data, part.position); return bytes.buffer;
    } finally { writer.dispose(); }
  }
  function pcmToMp3(encoder, pcm) {
    const result = [];
    for (const frame of pcm) {
      if (!encoder.value) { encoder.rate = frame.rate; encoder.channels = frame.planes.length; encoder.value = new encoder.library.Mp3Encoder(encoder.channels, encoder.rate, 128); }
      if (frame.rate !== encoder.rate || frame.planes.length !== encoder.channels) throw new Error('音频编码参数发生变化');
      const planes = [];
      for (const plane of frame.planes) {
        const bytes = new Int16Array(plane.length);
        for (let i = 0; i < plane.length; i++) { const value = Math.max(-1, Math.min(1, plane[i])); bytes[i] = Math.round(value * (value < 0 ? 32768 : 32767)); }
        planes.push(bytes);
      }
      const bytes = encoder.value.encodeBuffer(planes[0], planes[1]); if (bytes.length) result.push(bytes);
    }
    return result;
  }
  function workerSource(factory) {
    return `const lamejs = (${factory.toString()}); lamejs();
const pcmToMp3 = ${pcmToMp3.toString()};
const encoder = {library: lamejs};
self.onmessage = event => {
  try {
    const chunks = event.data.finish ? (encoder.value ? [encoder.value.flush()] : []) : pcmToMp3(encoder, event.data.pcm);
    postMessage({chunks}, chunks.map(chunk => chunk.buffer));
  } catch (error) { postMessage({error: error.message}); }
};`;
  }
  function createEncoder({factory, sink, signal, WorkerClass = globalThis.Worker, URLAPI = URL}) {
    let worker, url, waiting, disposed = false, main, failure;
    const stop = () => {
      disposed = true; worker?.terminate();
      if (url) { URLAPI.revokeObjectURL(url); url = null; }
      waiting?.reject(signal?.reason || new DOMException('音频转换已取消', 'AbortError')); waiting = null;
    };
    try {
      if (WorkerClass) { url = URLAPI.createObjectURL(new Blob([workerSource(factory)], {type: 'text/javascript'})); worker = new WorkerClass(url); }
    } catch { if (url) URLAPI.revokeObjectURL(url); url = null; worker = null; }
    if (worker) {
      worker.onmessage = event => {
        const current = waiting; waiting = null;
        if (event.data.error) current?.reject(new Error(event.data.error)); else current?.resolve(event.data.chunks);
      };
      worker.onerror = event => { failure = new Error(event.message || 'MP3 编码线程失败'); waiting?.reject(failure); waiting = null; };
    } else { factory(); main = {library: factory}; }
    signal?.addEventListener('abort', stop, {once: true});
    async function run(message) {
      signal?.throwIfAborted(); if (failure) throw failure; if (disposed) throw new DOMException('音频转换已取消', 'AbortError');
      let chunks;
      if (worker) chunks = await new Promise((resolve, reject) => {
        waiting = {resolve, reject};
        try {
          const transfers = [];
          for (const frame of message.pcm || []) for (const plane of frame.planes) transfers.push(plane.buffer);
          worker.postMessage(message, transfers);
        }
        catch (error) { waiting = null; reject(error); }
      });
      else { chunks = message.finish ? (main.value ? [main.value.flush()] : []) : pcmToMp3(main, message.pcm); await tick(); }
      for (const bytes of chunks) { signal?.throwIfAborted(); if (bytes.length) await sink.write(bytes); }
    }
    return {encode: pcm => run({pcm}), finish: () => run({finish: true}), dispose() { signal?.removeEventListener('abort', stop); stop(); main = null; }};
  }
  async function createDecoder({config, muxjs, mp4Writer, signal, environment = globalThis, diagnostic = () => {}}) {
    const codec = {codec: config.codec, sampleRate: config.sampleRate, numberOfChannels: config.channels, description: new Uint8Array(config.description)};
    let decoder, failure, context, output = [], loggedOutput = false;
    diagnostic('decoder-capabilities', {AudioDecoder: Boolean(environment.AudioDecoder), EncodedAudioChunk: Boolean(environment.EncodedAudioChunk), AudioContext: Boolean(environment.AudioContext || environment.webkitAudioContext)});
    try {
      const probe = new Float32Array(1), mapped = Array.from({length: 1}, () => probe);
      diagnostic('array-helper-check', {fromPreservesChannel: mapped[0] === probe});
    } catch (error) { diagnostic('array-helper-check', {error: errorDetails(error)}); }
    if (environment.AudioDecoder && environment.EncodedAudioChunk) {
      try {
        const support = await environment.AudioDecoder.isConfigSupported(codec);
        diagnostic('webcodecs-support', {supported: support.supported});
        if (support.supported) {
          decoder = new environment.AudioDecoder({error(error) { diagnostic('webcodecs-error-callback', {error: errorDetails(error)}); failure = error; }, output(data) {
            try {
              if (!loggedOutput) { loggedOutput = true; diagnostic('webcodecs-audio-data', {format: data.format, frames: data.numberOfFrames, channels: data.numberOfChannels, sampleRate: data.sampleRate}); }
              // Ask for planar f32 explicitly: Safari hands back interleaved f32
              // AudioData but converts per plane when asked (its copyTo rejects
              // interleaved destinations outright).
              const channels = data.numberOfChannels, frames = data.numberOfFrames, rate = data.sampleRate, planes = [];
              if (![1, 2].includes(channels) || !frames || !rate) throw new Error('解码器返回无效的音频参数。');
              // Build dense channel arrays explicitly. Userscript environments
              // can replace Array.from/map helpers; do not let that turn PCM
              // channels into undefined values before worker transfer.
              for (let planeIndex = 0; planeIndex < channels; planeIndex++) {
                const values = new Float32Array(frames); data.copyTo(values, {planeIndex, format: 'f32-planar'}); planes.push(values);
              }
              output.push({planes, rate});
            } catch (error) { if (!failure) diagnostic('webcodecs-copy-failed', {format: data.format, requestedFormat: 'f32-planar', error: errorDetails(error)}); failure = error; } finally { data.close(); }
          }});
          decoder.configure(codec); diagnostic('webcodecs-configured', {state: decoder.state});
        }
      } catch (error) { diagnostic('webcodecs-setup-failed', {error: errorDetails(error)}); if (decoder?.state !== 'closed') decoder?.close(); decoder = null; }
    }
    const ensureContext = () => {
      if (context) return;
      const AudioContext = environment.AudioContext || environment.webkitAudioContext;
      if (!AudioContext) throw new Error('当前浏览器无法解码 AAC 音频，请选择 AAC 保存。');
      try { context = new AudioContext({sampleRate: config.sampleRate}); }
      catch (error) { diagnostic('web-audio-constructor-failed', {requestedSampleRate: config.sampleRate, error: errorDetails(error)}); throw error; }
      diagnostic('web-audio-created', {sampleRate: context.sampleRate, state: context.state});
    };
    if (!decoder) ensureContext();
    let timestamp = 0, preroll = [];
    const cancel = () => { if (decoder?.state !== 'closed') decoder?.close(); void context?.close().catch(() => {}); };
    signal?.addEventListener('abort', cancel, {once: true});
    // Supply a complete, small audio-only MP4 to Web Audio. Two overlapping
    // AAC frames warm the decoder without retaining the full recording.
    async function decodeContainer(frames) {
        const prefix = preroll.length;
        const bytes = await batchMp4([...preroll, ...frames], config, muxjs, mp4Writer);
        let audio;
        diagnostic('web-audio-decode-batch', {packets: frames.length, prerollPackets: prefix, bufferBytes: bytes.byteLength, bufferType: Object.prototype.toString.call(bytes), constructor: bytes.constructor?.name, sampleRate: context.sampleRate, state: context.state});
        try { audio = await context.decodeAudioData(bytes); } catch (error) { diagnostic('web-audio-decode-failed', {error: errorDetails(error)}); if (signal?.aborted) throw signal.reason; throw new Error('浏览器未能解码 AAC 音频，请选择 AAC 保存。', {cause: error}); }
        signal?.throwIfAborted();
        diagnostic('web-audio-decoded', {frames: audio.length, channels: audio.numberOfChannels, sampleRate: audio.sampleRate});
        const skipped = Math.round(prefix * 1024 * audio.sampleRate / config.sampleRate);
        const expected = Math.round(frames.length * 1024 * audio.sampleRate / config.sampleRate);
        const planes = [];
        for (let channel = 0; channel < audio.numberOfChannels; channel++) planes.push(audio.getChannelData(channel).slice(skipped, skipped + expected));
        if (!planes[0].length) throw new Error('浏览器未能解码音频，请选择 AAC 保存。');
        preroll = frames.slice(-2).map(frame => ({data: frame.data.slice()}));
        return [{planes, rate: audio.sampleRate}];
    }
    async function decodeWithWebCodecs(frames) {
        output = [];
        if (failure) throw failure;
        for (const frame of frames) {
          // Copy each packet into its own buffer: subarray views into a batch
          // read can be misinterpreted across a userscript sandbox boundary.
          const data = new Uint8Array(frame.data);
          decoder.decode(new environment.EncodedAudioChunk({type: 'key', timestamp: Math.round(timestamp), duration: Math.round(1024 / config.sampleRate * 1e6), data})); timestamp += 1024 / config.sampleRate * 1e6;
        }
        diagnostic('webcodecs-decode-batch', {packets: frames.length, firstPacketBytes: frames[0]?.data.length, firstFrameHex: [...frames[0]?.data.slice(0, 8) || []].map(value => value.toString(16).padStart(2, '0')).join(''), chunkDurationUs: Math.round(1024 / config.sampleRate * 1e6), state: decoder.state});
        try { await decoder.flush(); } catch (error) { diagnostic('webcodecs-flush-failed', {error: errorDetails(error), callbackError: errorDetails(failure)}); throw error ?? failure ?? new Error('flush failed'); }
        if (failure) throw failure;
        const result = output; output = []; return result;
    }
    return {
      async decode(frames) {
        signal?.throwIfAborted();
        if (decoder) {
          try { return await decodeWithWebCodecs(frames); }
          catch (error) {
            if (signal?.aborted) throw signal.reason;
            // Safari's WebCodecs AAC decoder rejects some valid streams that its
            // container decoder accepts; retry this batch and the rest there.
            diagnostic('webcodecs-fallback', {packets: frames.length, error: errorDetails(error)});
            try { if (decoder.state !== 'closed') decoder.close(); } catch {}
            decoder = null; failure = null; output = [];
            ensureContext();
          }
        }
        return decodeContainer(frames);
      },
      dispose() { signal?.removeEventListener('abort', cancel); cancel(); output.length = 0; preroll.length = 0; },
    };
  }
  async function convert({file, format = 'mp3', sink, muxjs, mp4Writer, reader, encoderFactory, signal, onProgress = () => {}, onDiagnostic = () => {}, environment = globalThis}) {
    if (!['mp3', 'aac'].includes(format)) throw new Error('请选择 MP3 或 AAC 音频格式。');
    const diagnostic = (stage, details = {}) => { try { onDiagnostic({stage, ...details}); } catch { /* Debug output must not affect conversion. */ } };
    diagnostic('conversion-start', {format, fileSize: file.size, fileType: file.type});
    let config, decoder, encoder, aacWriter, count = 0, pending = [], loggedPcm = false;
    async function process() {
      if (!pending.length) return;
      signal?.throwIfAborted();
      if (format === 'aac') {
        const media = fragment(pending, config, muxjs, count * 1024);
        await aacWriter.writeFragment(media.init, media.data);
      } else {
        const pcm = await decoder.decode(pending);
        if (!loggedPcm) {
          loggedPcm = true;
          const channelTypes = [], channelFrames = [];
          for (const plane of pcm[0]?.planes || []) { channelTypes.push(Object.prototype.toString.call(plane)); channelFrames.push(plane?.length ?? null); }
          diagnostic('mp3-pcm-batch', {frames: pcm.length, channels: pcm[0]?.planes.length, channelTypes, channelFrames});
        }
        // Validate every channel before transferring any buffer: a malformed
        // batch must never become silent, incomplete, or partly detached PCM.
        if (!pcm.length) throw new Error('解码器没有返回音频采样。');
        for (const frame of pcm) {
          if (!Number.isFinite(frame.rate) || frame.rate <= 0 || frame.planes.length !== config.channels) throw new Error('解码后的音频参数不一致。');
          let length;
          for (const plane of frame.planes) {
            if (!ArrayBuffer.isView(plane) || plane.BYTES_PER_ELEMENT !== 4 || !plane.length) throw new Error('解码器返回无效的 PCM 声道。');
            if (length !== undefined && plane.length !== length) throw new Error('解码后的音频声道长度不一致。');
            length = plane.length;
          }
        }
        await encoder.encode(pcm);
      }
      count += pending.length; onProgress({progress: pending.at(-1).progress, packets: count}); pending = [];
    }
    try {
      for await (const packet of reader.packets(file, muxjs, signal)) {
        if (!config) {
          config = packet.config;
          diagnostic('aac-config', {codec: config.codec, sampleRate: config.sampleRate, channels: config.channels, audioObjectType: config.audioobjecttype, samplingFrequencyIndex: config.samplingfrequencyindex, descriptionHex: [...config.description].map(value => value.toString(16).padStart(2, '0')).join('')});
          if (format === 'aac') aacWriter = mp4Writer.createStandardMP4Writer(sink);
          else {
            decoder = await createDecoder({config, muxjs, mp4Writer, signal, environment, diagnostic});
            encoder = createEncoder({factory: encoderFactory, sink, signal, WorkerClass: environment.Worker, URLAPI: environment.URL || URL});
          }
        } else if (config.sampleRate !== packet.config.sampleRate || config.channels !== packet.config.channels || config.description.some((value, index) => value !== packet.config.description[index])) throw new Error('录播音频编码参数发生变化。');
        pending.push(packet); if (pending.length === BATCH) await process();
      }
      await process(); if (!count) throw new Error('录播没有可提取的音频。');
      if (aacWriter) await aacWriter.finish(); else await encoder.finish();
      signal?.throwIfAborted(); onProgress({progress: 1, packets: count}); return {packets: count};
    } catch (error) { diagnostic('conversion-failed', {processedPackets: count, error: errorDetails(error)}); throw error; }
    finally { decoder?.dispose(); encoder?.dispose(); aacWriter?.dispose(); pending.length = 0; }
  }
  return {convert, fragment, createEncoder, workerSource, errorDetails};
});

return module.exports; })();
const Core = (() => { const module = { exports: {} }; const exports = module.exports;
/* Replay HLS downloader core. Own code: MIT; mux.js: Apache-2.0. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayHLSCore = factory();
})(globalThis, function () {
  'use strict';

  function attributes(line) {
    const result = {};
    const expression = /([A-Z0-9-]+)=(?:"([^"]*)"|([^,]*))(?:,|$)/g;
    const body = line.slice(line.indexOf(':') + 1);
    let match;
    while ((match = expression.exec(body))) result[match[1]] = match[2] ?? match[3];
    return result;
  }

  function networkURL(value, base) {
    const url = new URL(value, base);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
      throw new Error('视频地址必须为 HTTP 或 HTTPS，且不能包含账号密码。');
    }
    return url.href;
  }

  function parsePlaylist(text, base) {
    const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).map(line => line.trim());
    if (lines[0] !== '#EXTM3U') throw new Error('服务器未返回 HLS 播放列表，请重新登录并播放视频。');
    let sequence = 0n, duration, key = null, keyId = 0, map = null, range = null;
    let pendingVariant = null, discontinuity = false;
    const variants = [], audio = [], segments = [], ends = new Map();
    for (const line of lines.slice(1)) {
      if (line.startsWith('#EXT-X-STREAM-INF:')) pendingVariant = attributes(line);
      else if (line.startsWith('#EXT-X-MEDIA:')) {
        const entry = attributes(line);
        if (entry.TYPE === 'AUDIO') audio.push(entry);
      } else if (line.startsWith('#EXT-X-MEDIA-SEQUENCE:')) sequence = BigInt(line.split(':')[1]);
      else if (line.startsWith('#EXTINF:')) duration = Number(line.slice(8).split(',')[0]);
      else if (line.startsWith('#EXT-X-KEY:')) {
        const entry = attributes(line);
        if (entry.METHOD === 'NONE') key = null;
        else {
          if (entry.METHOD !== 'AES-128' || (entry.KEYFORMAT && entry.KEYFORMAT !== 'identity')) {
            throw new Error('暂不支持 SAMPLE-AES 或 DRM 加密。');
          }
          if (!entry.URI) throw new Error('播放列表缺少密钥地址。');
          key = { id: ++keyId, url: networkURL(entry.URI, base), iv: entry.IV };
        }
      } else if (line.startsWith('#EXT-X-MAP:')) {
        const entry = attributes(line);
        map = { url: networkURL(entry.URI, base), key, range: entry.BYTERANGE };
      } else if (line.startsWith('#EXT-X-BYTERANGE:')) range = line.split(':')[1];
      else if (line === '#EXT-X-DISCONTINUITY') discontinuity = true;
      else if (line && !line.startsWith('#')) {
        const url = networkURL(line, base);
        if (pendingVariant) {
          variants.push({ url, bandwidth: Number(pendingVariant.BANDWIDTH || 0), audio: pendingVariant.AUDIO });
          pendingVariant = null;
          continue;
        }
        if (!Number.isFinite(duration) || duration <= 0) throw new Error('视频分片时长缺失或无效。');
        let byteRange = null;
        if (range) {
          const [lengthText, offsetText] = range.split('@');
          const length = Number(lengthText);
          const start = offsetText === undefined ? ends.get(url) : Number(offsetText);
          if (!Number.isSafeInteger(length) || length <= 0 || !Number.isSafeInteger(start) || start < 0) {
            throw new Error('HLS 字节范围无效。');
          }
          byteRange = { start, end: start + length - 1 };
          ends.set(url, start + length);
        }
        segments.push({ url, sequence: sequence++, duration, key, map, range: byteRange, discontinuity });
        duration = undefined; range = null; discontinuity = false;
      }
    }
    return { variants, audio, segments, complete: lines.includes('#EXT-X-ENDLIST'),
      duration: segments.reduce((total, segment) => total + segment.duration, 0) };
  }

  function ivBytes(explicit, sequence) {
    let value;
    if (explicit) {
      if (!/^0x[0-9a-f]{1,32}$/i.test(explicit)) throw new Error('AES 初始化向量无效。');
      value = BigInt(explicit);
    } else value = BigInt(sequence);
    if (value < 0n || value >= (1n << 128n)) throw new Error('AES 初始化向量超出范围。');
    const bytes = new Uint8Array(16);
    for (let index = 15; index >= 0; index--) { bytes[index] = Number(value & 255n); value >>= 8n; }
    return bytes;
  }

  async function decrypt(bytes, key, sequence, getKey, cryptoAPI = globalThis.crypto) {
    if (!key) return new Uint8Array(bytes);
    const imported = await getKey(key);
    return new Uint8Array(await cryptoAPI.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes(key.iv, sequence) }, imported, bytes));
  }

  async function resolvePlaylist(url, request, signal) {
    for (let depth = 0; depth < 5; depth++) {
      const response = await request(url, 'text', null, signal);
      const playlist = parsePlaylist(response.data, response.url || url);
      if (!playlist.variants.length) {
        if (!playlist.complete) throw new Error('这是直播或未完成的播放列表；请等待录播生成完成后下载。');
        if (!playlist.segments.length) throw new Error('播放列表没有视频分片。');
        return playlist;
      }
      const variant = playlist.variants.sort((a, b) => b.bandwidth - a.bandwidth)[0];
      if (playlist.audio.some(track => track['GROUP-ID'] === variant.audio && track.URI)) {
        throw new Error('暂不支持音视频分离的播放列表。');
      }
      url = variant.url;
    }
    throw new Error('播放列表嵌套层数过多。');
  }

  function limitPlaylist(playlist, maxDuration) {
    if (maxDuration === undefined) return playlist;
    if (!Number.isFinite(maxDuration) || maxDuration <= 0) throw new Error('测试片段时长必须大于零。');
    let duration = 0, count = 0;
    while (count < playlist.segments.length && duration < maxDuration) duration += playlist.segments[count++].duration;
    return { ...playlist, segments: playlist.segments.slice(0, count), duration };
  }

  // Set durations in the initial MP4 headers so standalone players can seek.
  function patchDuration(original, seconds) {
    const bytes = new Uint8Array(original);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const string = offset => String.fromCharCode(...bytes.subarray(offset, offset + 4));
    let movieScale = 1000;
    function visit(start, end) {
      for (let offset = start; offset + 8 <= end;) {
        const size = view.getUint32(offset);
        if (size < 8 || offset + size > end) throw new Error('MP4 初始化分片损坏。');
        const type = string(offset + 4), p = offset + 8;
        if (type === 'mvhd' || type === 'mdhd' || type === 'tkhd') {
          const version = bytes[p];
          if (version > 1) throw new Error('不支持的 MP4 文件头版本。');
          const scale = type === 'tkhd' ? movieScale : view.getUint32(p + (version ? 20 : 12));
          if (type === 'mvhd') movieScale = scale;
          const durationOffset = p + (type === 'tkhd' ? (version ? 28 : 20) : (version ? 24 : 16));
          const value = Math.round(seconds * scale);
          if (version) view.setBigUint64(durationOffset, BigInt(value));
          else {
            if (value > 0xffffffff) throw new Error('录播超出 fMP4 文件头的时长范围，请选择普通 MP4。');
            view.setUint32(durationOffset, value);
          }
        } else if (['moov', 'trak', 'mdia', 'mvex'].includes(type)) visit(p, offset + size);
        offset += size;
      }
    }
    visit(0, bytes.length);
    return bytes;
  }

  function createMP4Writer(muxjs, sink, duration, standardWriter) {
    const transmuxer = new muxjs.mp4.Transmuxer({ remux: true, keepOriginalTimestamps: false });
    const chunks = [];
    let fragments = 0;
    transmuxer.on('data', event => chunks.push(event));
    async function drain() {
      while (chunks.length) {
        const event = chunks.shift();
        if (standardWriter) await standardWriter.writeFragment(event.initSegment, event.data);
        else {
          if (!fragments) await sink.write(patchDuration(event.initSegment, duration));
          await sink.write(event.data);
        }
        fragments++;
      }
    }
    return {
      async write(bytes) { transmuxer.push(bytes); transmuxer.flush(); await drain(); },
      async finish() {
        transmuxer.endTimeline(); await drain();
        if (!fragments) throw new Error('未找到 H.264 / AAC 媒体数据。');
        await standardWriter?.finish();
      },
      dispose() { try { transmuxer.dispose(); } finally { chunks.length = 0; } },
    };
  }

  async function download({ url, request, sink, muxjs, mp4Writer, format = 'mp4', maxDuration, signal, onProgress = () => {}, cryptoAPI = globalThis.crypto }) {
    if (!['mp4', 'fmp4', 'ts'].includes(format)) throw new Error('请选择 MP4、fMP4 或 TS 格式。');
    const playlist = limitPlaylist(await resolvePlaylist(url, request, signal), maxDuration);
    const keys = new Map();
    async function getKey(key) {
      if (!keys.has(key.id)) keys.set(key.id, (async () => {
        const response = await request(key.url, 'arraybuffer', null, signal);
        if (response.data.byteLength !== 16) throw new Error('密钥长度不是 16 字节，请重新登录并播放视频。');
        return cryptoAPI.subtle.importKey('raw', response.data, { name: 'AES-CBC' }, false, ['decrypt']);
      })());
      return keys.get(key.id);
    }
    const fragmented = Boolean(playlist.segments[0].map);
    if (playlist.segments.some(segment => Boolean(segment.map) !== fragmented)) throw new Error('暂不支持混合 TS 与 fMP4 分片。');
    if (playlist.segments.some(segment => segment.discontinuity)) throw new Error('视频时间线不连续，暂不支持此录播。');
    if (fragmented && format === 'ts') throw new Error('源视频为 fMP4 分片，请选择 MP4 或 fMP4 输出。');
    const standardWriter = format === 'mp4' ? mp4Writer.createStandardMP4Writer(sink) : null;
    const writer = format !== 'ts' && !fragmented ? createMP4Writer(muxjs, sink, playlist.duration, standardWriter) : null;
    let inputBytes = 0, currentMap = null;
    const pending = new Map(), controller = new AbortController();
    const abort = () => controller.abort(signal?.reason);
    if (signal?.aborted) controller.abort();
    signal?.addEventListener('abort', abort, { once: true });
    function schedule(index) {
      if (index >= playlist.segments.length) return;
      const segment = playlist.segments[index];
      // Wrap failures immediately so prefetched rejections are always handled.
      pending.set(index, request(segment.url, 'arraybuffer', segment.range, controller.signal)
        .then(response => ({ response }), error => ({ error })));
    }
    try {
      for (let index = 0; index < Math.min(3, playlist.segments.length); index++) schedule(index);
      for (let index = 0; index < playlist.segments.length; index++) {
        if (controller.signal.aborted) throw new DOMException('下载已取消', 'AbortError');
        const result = await pending.get(index); pending.delete(index);
        if (result.error) throw result.error;
        schedule(index + 3);
        const segment = playlist.segments[index];
        if (segment.map && segment.map !== currentMap) {
          if (currentMap) throw new Error('录播的编码初始化信息发生变化，暂不支持。');
          if (segment.map.key && !segment.map.key.iv) throw new Error('加密的 MP4 初始化分片需要明确的 IV。');
          let range = null;
          if (segment.map.range) {
            const [length, start = 0] = segment.map.range.split('@').map(Number);
            if (!Number.isSafeInteger(length) || length <= 0 || !Number.isSafeInteger(start) || start < 0) throw new Error('初始化分片字节范围无效。');
            range = { start, end: start + length - 1 };
          }
          const response = await request(segment.map.url, 'arraybuffer', range, controller.signal);
          const init = await decrypt(response.data, segment.map.key, segment.sequence, getKey, cryptoAPI);
          segment.map.init = format === 'fmp4' ? patchDuration(init, playlist.duration) : init;
          if (format === 'fmp4') await sink.write(segment.map.init);
          currentMap = segment.map;
        }
        const bytes = await decrypt(result.response.data, segment.key, segment.sequence, getKey, cryptoAPI);
        inputBytes += result.response.data.byteLength;
        if (!fragmented && (bytes.length < 188 || bytes[0] !== 0x47 || (bytes.length >= 376 && bytes[188] !== 0x47))) {
          throw new Error('解密后的 TS 分片无效，登录态或密钥可能已变化，请重新登录。');
        }
        if (writer) await writer.write(bytes);
        else if (standardWriter) await standardWriter.writeFragment(currentMap.init, bytes);
        else await sink.write(bytes);
        if (controller.signal.aborted) throw signal?.reason || new DOMException('下载已取消', 'AbortError');
        onProgress({ done: index + 1, total: playlist.segments.length, bytes: inputBytes, duration: playlist.duration });
      }
      if (writer) await writer.finish();
      else if (standardWriter) await standardWriter.finish();
      if (controller.signal.aborted) throw signal?.reason || new DOMException('下载已取消', 'AbortError');
      return { segments: playlist.segments.length, duration: playlist.duration, bytes: inputBytes };
    } finally {
      controller.abort(); signal?.removeEventListener('abort', abort); keys.clear(); pending.clear();
      // File rollback must not wait for a broken or stalled media disposer.
      for (const resource of [writer, standardWriter]) {
        void Promise.resolve().then(() => resource?.dispose()).catch(error => console.warn('[PKU-Replay-Saver] 释放封装器失败', error));
      }
    }
  }

  return { attributes, networkURL, parsePlaylist, ivBytes, decrypt, patchDuration, createMP4Writer, resolvePlaylist, limitPlaylist, download };
});

return module.exports; })();
const ListSource = (() => { const module = { exports: {} }; const exports = module.exports;
/* Discover each recording through its existing authenticated watch page. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayListSource = factory();
})(globalThis, function () {
  'use strict';
  function create({document, location, validateURL, timeout = 45000}) {
    let pending;
    const trusted = new Set(['course.pku.edu.cn', 'yjapise.pku.edu.cn', 'onlineroomse.pku.edu.cn']);
    function scan() {
      if (!pending) return;
      const visit = (frame, depth) => {
        if (depth > 4) return;
        let url;
        try { url = new URL(frame.getAttribute('src') || frame.src, location.href); } catch { return; }
        if (!trusted.has(url.hostname)) return;
        const child = frame.contentWindow;
        if (child) {
          pending.windows.add(child);
          try { child.postMessage({type: 'PKU_REPLAY_SAVER_SOURCE_V1_REQUEST', background: true}, 'https://onlineroomse.pku.edu.cn'); } catch {}
        }
        try { for (const nested of frame.contentDocument?.querySelectorAll('iframe') || []) visit(nested, depth + 1); } catch { /* Cross-origin player: the source window above is sufficient. */ }
      };
      visit(pending.frame, 0);
    }
    function accept(event) {
      if (!pending || event.origin !== 'https://onlineroomse.pku.edu.cn' || event.data?.type !== 'PKU_REPLAY_SAVER_SOURCE_V1') return false;
      scan();
      if (!pending.windows.has(event.source)) return false;
      try {
        const url = validateURL(event.data.url, location.href);
        const referrer = new URL(event.data.referrer || 'https://onlineroomse.pku.edu.cn/player');
        if (referrer.origin !== event.origin) return false;
        const headers = {};
        new Headers(event.data.headers || {}).forEach((value, name) => { if (name === 'authorization' || name.startsWith('x-')) headers[name] = value; });
        pending.finish(null, {url, kind: event.data.kind === 'mp4' ? 'mp4' : 'hls', referrer: referrer.href, origin: event.origin, headers,
          title: typeof event.data.title === 'string' ? event.data.title.slice(0, 200) : ''});
        return true;
      } catch { return false; }
    }
    function resolve(entry, signal) {
      signal.throwIfAborted();
      if (pending) throw new Error('另一个录播正在获取播放地址。');
      const watch = new URL(entry.watchURL, location.href);
      if (watch.origin !== location.origin || !watch.pathname.endsWith('/playVideo.action')) throw new Error('录播观看入口无效。');
      return new Promise((resolve, reject) => {
        const frame = document.createElement('iframe');
        frame.setAttribute('data-replay-source-frame', '');
        frame.setAttribute('aria-hidden', 'true'); frame.tabIndex = -1;
        // Keep a real browsing context so CAS and the player run their normal
        // cookie-based login flow; never persist or manufacture credentials.
        frame.style.cssText = 'position:fixed!important;left:-10000px!important;top:0!important;width:1px!important;height:1px!important;border:0!important;opacity:0!important;pointer-events:none!important;';
        let timer, poll, settled = false;
        const finish = (error, value) => {
          if (settled) return; settled = true;
          clearTimeout(timer); clearInterval(poll); signal.removeEventListener('abort', abort);
          pending = null;
          try { frame.src = 'about:blank'; frame.remove(); } catch { /* Detached by navigation. */ }
          if (error) reject(error); else resolve(value);
        };
        const abort = () => finish(signal.reason || new DOMException('下载已取消', 'AbortError'));
        pending = {frame, windows: new Set(), finish};
        signal.addEventListener('abort', abort, {once: true});
        frame.addEventListener('load', scan);
        timer = setTimeout(() => finish(new Error('无法获取播放地址，请检查登录状态及脚本是否允许在嵌套播放器运行。')), timeout);
        poll = setInterval(scan, 250);
        try { frame.src = watch.href; document.body.appendChild(frame); scan(); }
        catch (error) { finish(error); }
        if (signal.aborted) abort();
      });
    }
    return {resolve, accept};
  }
  return {create};
});

return module.exports; })();
const ProgressEstimate = (() => { const module = { exports: {} }; const exports = module.exports;
/* Time-based estimates shared by the player and recording-list interfaces. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReplayProgressEstimate = factory();
})(globalThis, function () {
  'use strict';
  const median = values => {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  };
  function createEstimate(now = () => performance.now()) {
    let anchor, latest, started, speed, rate;
    const samples = [];
    return {
      note(value, bytes = 0) {
        if (!Number.isFinite(value) || !Number.isFinite(bytes) || value < 0 || bytes < 0) return;
        const point = {time: now(), value: Math.min(1, value), bytes};
        if (latest && (point.value < latest.value || point.bytes < latest.bytes || point.time < latest.time)) return;
        if (latest && point.value === latest.value && point.bytes === latest.bytes) return;
        // Discard the initial cached/prefetched burst. After a long stall,
        // collect fresh evidence rather than reusing an obsolete fast rate.
        if (!anchor || point.time - latest.time >= 10000) {
          anchor = latest = point; started = point.time;
          samples.length = 0; speed = rate = undefined; return;
        }
        latest = point;
        const elapsed = (point.time - anchor.time) / 1000;
        if (elapsed < 1) return; // Packet callbacks are not independent time samples.
        samples.push({speed: (point.bytes - anchor.bytes) / elapsed, rate: (point.value - anchor.value) / elapsed});
        if (samples.length > 5) samples.shift();
        anchor = point;
        if (point.time - started < 4000 || samples.length < 3) return;
        const nextSpeed = median(samples.map(sample => sample.speed));
        const nextRate = median(samples.map(sample => sample.rate));
        const alpha = 1 - Math.exp(-elapsed / 4);
        speed = speed === undefined ? nextSpeed : speed + alpha * (nextSpeed - speed);
        rate = rate === undefined ? nextRate : rate + alpha * (nextRate - rate);
      },
      read() {
        if (!latest) return {speed: null, remaining: Infinity};
        const idle = Math.max(0, now() - latest.time);
        if (latest.value >= 1) return {speed: speed ?? null, remaining: 0};
        if (idle >= 10000) return {speed: 0, remaining: Infinity};
        if (rate === undefined) return {speed: null, remaining: Infinity};
        // Reads do not mutate the filter: rendering more often cannot change
        // the estimate. During a pause, fade the speed instead of freezing it.
        const decay = 1 / (1 + Math.max(0, idle - 2000) / 3000);
        return {speed: speed * decay, remaining: rate > 0 ? (1 - latest.value) / (rate * decay) : Infinity};
      },
    };
  }
  return {createEstimate};
});

return module.exports; })();
const ListPage = (() => { const module = { exports: {} }; const exports = module.exports;
const require = name => { if (name === './progress-estimate.js') return ProgressEstimate; throw new Error('Unknown bundled dependency'); };
/* Compact recording-list controls; one task at a time, bounded media memory. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./progress-estimate.js'));
  else root.ReplayListPage = factory(root.ReplayProgressEstimate);
})(globalThis, function (ProgressEstimate) {
  'use strict';
  const cleanName = value => String(value).replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim().slice(0, 100) || '录播';
  const {createEstimate} = ProgressEstimate;
  function remainingText(seconds) {
    if (!Number.isFinite(seconds)) return '剩余 —';
    seconds = Math.max(0, Math.ceil(seconds));
    if (seconds < 60) return `剩余 ${seconds} 秒`;
    if (seconds < 3600) return `剩余 ${Math.floor(seconds/60)}分${seconds%60}秒`;
    return `剩余 ${Math.floor(seconds/3600)}时${Math.floor(seconds%3600/60)}分`;
  }
  const css = `
    :host{display:inline-block;color-scheme:light;font:13px/1.4 system-ui,sans-serif;vertical-align:middle}
    [hidden]{display:none!important}*{box-sizing:border-box}.controls{display:grid;grid-template-columns:[primary] var(--primary-width,54px) [secondary] var(--secondary-width,94px) [warning] 14px;align-items:center;justify-content:start;column-gap:8px;height:34px}
    .controls[data-metrics=true]{grid-template-columns:[metrics] 120px [primary] var(--primary-width,54px) [secondary] var(--secondary-width,94px) [warning] 14px}
    .main,.ring{grid-column:primary;grid-row:1;justify-self:start}.audio,.cancel{grid-column:secondary;grid-row:1;justify-self:start}.warning{grid-column:warning;grid-row:1}
    .metrics{grid-column:metrics;grid-row:1;font-size:11px;line-height:15px;color:#667085;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;visibility:hidden}
    button,summary{font:inherit;cursor:pointer;border:1px solid #d6dde8;border-radius:7px;padding:5px 10px;background:#fff;color:#32445f;white-space:nowrap}
    .main{background:transparent;color:var(--watch-color,#006b8f);border:0;padding:5px 0;border-radius:0}.main:hover:not(:disabled){text-decoration:underline}.controls[data-batch=true] .main{background:#2563eb;color:white;border:1px solid #2563eb;border-radius:7px;padding:5px 10px;text-decoration:none}button:disabled{opacity:.45;cursor:default}
    .cancel{font-size:12px;padding:3px 7px;color:#a33838}details{position:relative}summary{list-style:none}summary::-webkit-details-marker{display:none}summary::after{content:' ▾';font-size:10px}
    .menu{position:absolute;right:0;top:calc(100% + 4px);z-index:100;min-width:110px;padding:4px;background:white;border:1px solid #d6dde8;border-radius:8px;box-shadow:0 4px 16px #0002}
    .menu button{display:block;width:100%;text-align:left;border:0}.ring{position:relative;width:34px;height:34px;flex:0 0 34px}.ring svg{width:34px;height:34px;transform:rotate(-90deg)}
    circle{fill:none;stroke-width:3}.track{stroke:#e4eaf4}.fill{stroke:#2563eb;stroke-linecap:round;stroke-dasharray:100;transition:stroke-dashoffset .15s}.percent{position:absolute;inset:0;display:grid;place-items:center;font-size:9px;color:#32445f}
    .ring[data-pending=true] .fill{stroke-dasharray:22 78;animation:spin 1s linear infinite;transform-origin:17px 17px}@keyframes spin{to{transform:rotate(360deg)}}
    .warning{color:#ae3636;font-weight:600;font-size:15px}.message{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  `;
  function create({document, location, Core, FileOutput, AudioExport, AudioReader, muxjs, mp4Writer, encoderFactory,
    resolveSource, request, errorMessage, onJob = () => {}}) {
    const entries = new Map(), controls = new Set(), pending = [], auxiliary = [];
    let active, auxiliaryActive, bottom, table, layoutObserver, observedContainer, choices, leaving = false;
    const notifyJobs = () => onJob(active?.controller || auxiliaryActive?.controller || null, active?.retry);
    const available = entry => Boolean(entry.localFile || (!entry.needsFile && entry.video?.sink.fileAvailable));
    const settings = () => ({content: choices?.querySelector('.replay-download-content').value || 'video', audioFormat: choices?.querySelector('.audioformat').value || 'aac', videoFormat: choices?.querySelector('.format').value || 'mp4'});
    const satisfied = (entry, options) => (options.content === 'audio' || entry.video?.saved) && (options.content === 'video' || entry.audio?.[options.audioFormat]);
    const reserved = entry => (active?.list.includes(entry) && !active.skipped.has(entry) && !active.finished.has(entry)) || pending.some(task => task.list.includes(entry)) || auxiliaryActive?.list.includes(entry) || auxiliary.some(task=>task.list.includes(entry));
    const downloadable = (control, options = settings()) => selectedEntries(control).filter(entry => !satisfied(entry, options) && !reserved(entry));
    const waitingTask = control => pending.find(task => task.control === control || (!control.batch && task.list.includes(control.entry)));
    const waitingInBatch = control => !control.batch && active?.control.batch && active.list.indexOf(control.entry) > active.index && !active.skipped.has(control.entry);
    function message(control, text, error = false) {
      control.message.textContent = text; control.warning.hidden = !error; control.warning.title = text;
      control.progressText = text;
      control.ring.title = text; control.host.title = error ? text : '';
    }
    function progress(control, value, text) {
      control.ring.dataset.pending = String(value === null);
      const percent = Math.round(Math.max(0, Math.min(1, value || 0)) * 100);
      control.fill.style.strokeDashoffset = String(100 - percent);
      control.percent.textContent = value === null ? '' : `${percent}%`;
      control.ring.setAttribute('aria-valuenow', String(percent));
      if (text) { control.progressText = text; control.ring.title = text; control.message.textContent = text; }
    }
    function estimate(control, value) {
      control.speed.textContent = value.speed === null ? '— MB/s' : `${(value.speed/1048576).toFixed(1)} MB/s`;
      control.remaining.textContent = remainingText(value.remaining);
      control.metrics.title = `${control.speed.textContent} · ${control.remaining.textContent}`;
      control.ring.title = `${control.progressText || ''} · ${control.metrics.title}`;
    }
    function render(control) {
      const owner = auxiliaryActive?.control === control ? auxiliaryActive : active;
      const busy = owner && (owner.control === control || owner.current?.control === control || (control.batch && !owner.control.host.isConnected));
      const queued = waitingTask(control) || waitingInBatch(control) || auxiliary.some(task=>task.control===control);
      const occupied = busy || queued;
      const done = control.batch ? control.complete : Boolean(control.entry.video);
      control.main.hidden = Boolean(occupied); control.ring.hidden = !occupied; control.cancel.hidden = !occupied;
      control.audio.hidden = !done || Boolean(occupied);
      control.metrics.style.visibility = busy ? 'visible' : 'hidden';
      const videoSaved = control.batch ? selectedEntries(control).every(entry => entry.video?.saved) : control.entry.video?.saved;
      const audioSaved = selectedEntries(control).every(entry => entry.audio?.[settings().audioFormat]);
      control.main.textContent = done ? (control.batch ? (videoSaved ? '重存全部' : '保存全部') : (videoSaved ? '再次保存' : '保存视频')) : (control.batch ? '下载全部' : '下载');
      control.audio.textContent = control.batch ? (audioSaved ? '重存全部音频' : '保存全部音频') : (audioSaved ? '再次保存' : '保存音频');
      control.main.title = done ? (videoSaved ? '再次保存视频' : '保存缓存中的视频') : '按所选内容下载';
      control.audio.title = `${settings().audioFormat.toUpperCase()} · ${audioSaved ? '再次保存音频' : '保存音频'}`;
      control.main.disabled = leaving || Boolean(occupied) || Boolean(active && !done && !downloadable(control).length) || Boolean(control.batch && done && (active || auxiliaryActive));
      control.audio.disabled = leaving || Boolean(occupied) || Boolean(control.batch && (active || auxiliaryActive));
      const cancelling = busy && (owner.cancelling || (!control.batch && owner.rowCancelling));
      control.cancel.disabled = Boolean(cancelling);
      control.cancel.textContent = cancelling ? '取消中' : '取消';
      if (queued && !busy) { progress(control, null, '排队中'); control.percent.textContent = '排队'; }
    }
    function renderAll() {
      const visible = [...entries.values()].filter(entry => entry.row.isConnected);
      if (bottom) bottom.complete = Boolean(visible.length && visible.every(entry => entry.video));
      for (const control of controls) render(control);
      if (choices) {
        choices.querySelector('.directory').disabled = Boolean(active || auxiliaryActive);
        choices.querySelector('.audioformat').disabled = settings().content === 'video';
        choices.querySelector('.format').disabled = settings().content === 'audio';
        for (const select of choices.querySelectorAll('select')) {
          select.style.opacity = select.disabled ? '.45' : '1';
          select.style.backgroundColor = select.disabled ? '#f1f3f5' : 'white';
        }
      }
    }
    function clearPending(text) {
      for (const task of pending) message(task.control, text);
      pending.length = 0;
    }
    function drain() {
      if (active || leaving) return;
      while (pending.length) {
        const task = pending.shift();
        task.list = task.list.filter(entry => entry.row.isConnected && !satisfied(entry, task.options));
        if (!task.control.host.isConnected || !task.list.length) continue;
        void start(task.control, task.mode, task); return;
      }
      renderAll();
    }
    function drainAuxiliary() {
      if (auxiliaryActive || leaving) return;
      const task=auxiliary.shift();
      if(task) void start(task.control,task.mode,task);
    }
    function releaseQueuedAux(task){void task.prepared.catch(()=>{}).then(async()=>{for(const release of task.holds)try{await release();}catch(error){message(task.control,'缓存保护更新失败，清理将在页面恢复后重试。',true);}});}
    function makeControl(parent, entry, batch = false) {
      const host = document.createElement('span'); host.setAttribute('data-replay-list-control', batch ? 'all' : 'row');
      const shadow = host.attachShadow({mode: 'closed'}), style = document.createElement('style'); style.textContent = css; shadow.append(style);
      const wrap = document.createElement('div'); wrap.className = 'controls'; wrap.dataset.batch = String(batch);
      wrap.innerHTML = `<span class="metrics" hidden><span class="speed">— MB/s</span><br><span class="remaining">剩余 —</span></span>
        <button class="main" type="button">${batch ? '下载全部' : '下载'}</button>
        <span class="ring" hidden role="progressbar" aria-label="${batch ? '全部录播进度' : '录播进度'}" aria-valuemin="0" aria-valuemax="100"><svg viewBox="0 0 34 34" aria-hidden="true"><circle class="track" cx="17" cy="17" r="12"/><circle class="fill" cx="17" cy="17" r="12" pathLength="100"/></svg><span class="percent"></span></span>
        <button class="audio" type="button" hidden>保存音频</button>
        <button class="cancel" type="button" hidden>取消</button><span class="warning" hidden aria-label="任务失败">!</span><span class="message" role="status" aria-live="polite"></span>`;
      shadow.append(wrap); parent.append(host);
      const control = {host, wrap, batch, entry, complete: false};
      for (const name of ['main','ring','fill','percent','audio','cancel','warning','message','metrics','speed','remaining']) control[name] = shadow.querySelector(`.${name}`);
      host.style.setProperty('--primary-width', batch ? '90px' : '78px'); host.style.setProperty('--secondary-width', batch ? '130px' : '82px');
      control.main.onclick = () => start(control, (batch ? selectedEntries(control).every(item => satisfied(item, settings())) : entry.video) ? 'resave' : 'video');
      control.audio.onclick = () => start(control, settings().audioFormat);
      control.cancel.onclick = () => {
        const queuedAux=auxiliary.findIndex(task=>task.control===control);
        if(queuedAux!==-1){const task=auxiliary.splice(queuedAux,1)[0];task.controller.abort();releaseQueuedAux(task);message(control,'已取消排队。');renderAll();return;}
        if(auxiliaryActive?.control===control){auxiliaryActive.cancelling=true;auxiliaryActive.controller.abort();renderAll();return;}
        const task = waitingTask(control);
        if (task) {
          if (task.control === control) pending.splice(pending.indexOf(task), 1);
          else { task.list = task.list.filter(entry => entry !== control.entry); if (!task.list.length) pending.splice(pending.indexOf(task), 1); }
          message(control, '已取消排队。');
        } else if (waitingInBatch(control)) { active.skipped.add(control.entry); message(control, '已取消排队。'); }
        else if (active) {
          if (!control.batch && active.control.batch) { active.rowCancelling = true; active.currentController.abort(); }
          else { active.cancelling = true; active.controller.abort(); }
        }
        renderAll();
      };
      controls.add(control); render(control); return control;
    }
    function rowTitle(row) {
      const course = document.title.replace(/^.*?[–—]\s*/, '').replace(/[（(][^()（）]*学期[^()（）]*[）)]\s*$/, '').trim();
      return cleanName(`${course}${row.querySelector('th[scope="row"]')?.textContent.trim() || ''}`);
    }
    function matchWatchColor(entry,link){const color=document.defaultView?.getComputedStyle?.(link).color;if(color)entry.control.host.style.setProperty('--watch-color',color);}
    function reserveLayout() {
      if (!table) return;
      const container = table.parentElement;
      const availableWidth = container.clientWidth || container.getBoundingClientRect?.().width || 0;
      let measurement;
      try { measurement = document.createElement('canvas').getContext?.('2d'); } catch {}
      const rows = [...table.querySelectorAll('tr')]; let contentWidth = 0;
      const originalCount = table.querySelector('thead tr')?.querySelectorAll('th:not([data-replay-list-heading])').length || 4;
      for (let column = 0; column < originalCount; column++) {
        let required = 0;
        for (const row of rows) {
          const cell = row.children[column]; if (!cell) continue;
          const text = (cell.querySelector('.table-data-cell-value') || cell).textContent.replace(/\s+/g, ' ').trim();
          const style = document.defaultView?.getComputedStyle?.(cell);
          let width = 0;
          if (measurement) { measurement.font = style?.font || '13px system-ui'; width = measurement.measureText(text).width; }
          else for (const char of text) width += char.charCodeAt(0) > 255 ? 13 : 7;
          required = Math.max(required, width + (parseFloat(style?.paddingLeft) || 10) + (parseFloat(style?.paddingRight) || 10) + 16);
        }
        contentWidth += required;
      }
      // Decide from the table's content and containing width, never from an
      // active button's size. All row states use the same reserved grid tracks.
      const showMetrics = availableWidth - contentWidth >= 338;
      for (const entry of entries.values()) {
        entry.control.wrap.dataset.metrics = String(showMetrics);
        entry.control.metrics.hidden = !showMetrics;
        entry.control.host.style.width = `${showMetrics ? 318 : 190}px`;
        const cell = entry.control.host.parentElement;
        cell.style.width = cell.style.minWidth = `${(showMetrics ? 318 : 190) + 20}px`;
      }
      const heading = table.querySelector('[data-replay-list-heading]');
      if (heading) {
        heading.style.cssText = `box-sizing:border-box;text-align:left;padding:8px 10px;width:${showMetrics ? 338 : 210}px;`;
        heading.style.paddingLeft = `${showMetrics ? 138 : 10}px`;
      }
      if (bottom) {
        const optionWidth=choices?[...choices.children].filter(item=>!item.hidden).reduce((sum,item)=>sum+(item.getBoundingClientRect?.().width||parseFloat(item.style.minWidth)||(item.tagName==='BUTTON'?90:Math.min(96,item.textContent.length*13)))+8,0):0;
        const wide = (bottom.host.parentElement.clientWidth || availableWidth)-optionWidth >= 406;
        bottom.wrap.dataset.metrics = String(wide); bottom.metrics.hidden = !wide;
        bottom.host.style.width = `${wide ? 378 : 250}px`;
      }
      const ResizeObserver = document.defaultView?.ResizeObserver || globalThis.ResizeObserver;
      if (ResizeObserver && observedContainer !== container) {
        layoutObserver?.disconnect(); observedContainer = container;
        layoutObserver = new ResizeObserver(() => reserveLayout()); layoutObserver.observe(container);
      }
    }
    function refresh() {
      table = document.querySelector('#listContainer_datatable');
      if (!table) return;
      for (const row of table.querySelectorAll('tbody tr')) {
        const link = row.querySelector('a[href*="playVideo.action"]'); if (!link) continue;
        const watch = new URL(link.getAttribute('href'), location.href);
        if (watch.origin !== location.origin || !watch.pathname.endsWith('/playVideo.action')) continue;
        const previous = [...entries.values()].find(entry => entry.row === row && entry.control.host.isConnected);
        if (previous) {
          if (previous.watchURL !== watch.href) { entries.delete(previous.watchURL); previous.watchURL = watch.href; entries.set(watch.href, previous); }
          matchWatchColor(previous,link);
          continue;
        }
        let entry = entries.get(watch.href);
        if (entry?.control.host.isConnected) continue;
        const cell = document.createElement('td'); cell.setAttribute('data-replay-list-cell', '');
        cell.style.cssText = 'box-sizing:border-box;text-align:left;vertical-align:middle;white-space:nowrap;padding:8px 10px;';
        row.append(cell);
        if (!entry) { entry = {watchURL: watch.href, title: rowTitle(row), row}; entries.set(watch.href, entry); }
        else { controls.delete(entry.control); entry.row = row; }
        entry.control = makeControl(cell, entry);
        matchWatchColor(entry,link);
      }
      const header = table.querySelector('thead tr');
      if (header && !header.querySelector('[data-replay-list-heading]')) {
        const cell = document.createElement('th'); cell.setAttribute('data-replay-list-heading', ''); cell.setAttribute('scope', 'col');
        cell.textContent = '下载'; cell.style.textAlign = 'left'; header.append(cell);
      }
      const container = document.querySelector('#listContainer') || table.parentElement;
      if (!bottom?.host.isConnected) {
        if (bottom) controls.delete(bottom);
        const bar = document.createElement('div'); bar.setAttribute('data-replay-list-bar', '');
        bar.style.cssText = 'display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:8px;border-top:1px solid #e4eaf4;padding:12px 10px;margin-top:10px;';
        choices = document.createElement('span'); choices.setAttribute('data-replay-list-options', '');
        choices.style.cssText = 'display:inline-flex;align-items:center;flex-wrap:wrap;gap:8px;margin-right:auto;';
        choices.innerHTML = '<span>下载设置：</span><select class="replay-download-content" aria-label="下载内容"><option value="video">仅视频（有声音）</option><option value="audio">仅音频</option><option value="both">视频和音频</option></select><select class="format" aria-label="视频格式" title="HLS 输出格式；直接提供 MP4 的录播请选择 MP4"><option value="mp4">MP4（推荐）</option><option value="fmp4">fMP4（分片 MP4）</option><option value="ts">TS（原始分片）</option></select><select class="audioformat" aria-label="音频格式" title="AAC 无需重新编码；MP3 兼容性更好"><option value="aac">AAC (.m4a)</option><option value="mp3">MP3 (.mp3)</option></select><button class="directory" type="button" hidden>选择保存目录</button><span class="directory-name"></span>';
        for (const select of choices.querySelectorAll('select')) { select.style.cssText = 'font:13px system-ui;padding:6px 8px;min-width:132px;box-sizing:border-box;height:34px!important;min-height:34px!important;max-height:34px!important;line-height:20px;align-self:center;border:1px solid #d6dde8;border-radius:6px;background:white;color:#32445f;'; select.setAttribute('size', '1'); select.onchange = () => { renderAll(); reserveLayout(); }; }
        choices.querySelector('.replay-download-content').style.minWidth='180px';
        const folderButton=choices.querySelector('.directory');folderButton.style.cssText='font:12px system-ui;padding:5px 8px;background:none;border:1px solid #d6dde8;border-radius:6px;color:#32445f;';
        folderButton.onclick=async()=>{try{await FileOutput.prepareDestination(true);}catch(error){if(error.name!=='AbortError')message(bottom,errorMessage(error),true);}};
        const folderName=choices.querySelector('.directory-name');folderName.style.cssText='max-width:96px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;';
        FileOutput.watchDestination(info=>{folderButton.hidden=!info.supported;folderButton.textContent=info.selected?'更改目录':'选择保存目录';folderName.textContent=folderName.title=info.name;});
        bar.append(choices);
        container.append(bar); bottom = makeControl(bar, null, true);
      }
      const visible = [...entries.values()].filter(entry => entry.row.isConnected);
      bottom.complete = Boolean(visible.length && visible.every(entry => entry.video));
      for (let index = pending.length - 1; index >= 0; index--) {
        const task = pending[index]; task.list = task.list.filter(entry => entry.row.isConnected);
        if (!task.control.host.isConnected || !task.list.length) pending.splice(index, 1);
      }
      if (active?.current && !active.current.row.isConnected) { active.cancelling = true; active.controller.abort(); }
      if(auxiliaryActive && !auxiliaryActive.control.host.isConnected)auxiliaryActive.controller.abort();
      for(let index=auxiliary.length-1;index>=0;index--)if(!auxiliary[index].control.host.isConnected){const task=auxiliary.splice(index,1)[0];task.controller.abort();releaseQueuedAux(task);}
      // Also handle sorting/pagination without duplicating buttons or headers.
      renderAll();
      reserveLayout();
    }
    const selectedEntries = control => control.batch ? [...entries.values()].filter(entry => entry.row.isConnected) : [control.entry];
    async function browserSave(file, filename, signal) {
      return FileOutput.saveFile(file,filename,signal);
    }
    function pickFiles(signal, multiple) {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input'); input.type = 'file'; input.accept = '.mp4,.m4a,.ts'; input.multiple = multiple; input.hidden = true;
        let settled = false;
        const finish = (error, files) => { if (settled) return; settled = true; signal.removeEventListener('abort', abort); input.remove(); error ? reject(error) : resolve(files); };
        const abort = () => finish(signal.reason || new DOMException('已取消', 'AbortError'));
        input.onchange = () => input.files?.length ? finish(null, [...input.files]) : abort();
        input.addEventListener('cancel', abort); signal.addEventListener('abort', abort, {once: true});
        document.body.append(input); input.click(); if (signal.aborted) abort();
      });
    }
    async function rollback(sink, error) {
      if (sink) try { await sink.abort(); } catch (cleanupError) { throw FileOutput.withCleanupFailure(error, cleanupError, sink.type === 'browser-download'); }
      throw error;
    }
    async function download(entry, job, update, saveVideo = true) {
      const signal = job.currentController.signal;
      const format = saveVideo ? job.options.videoFormat : 'mp4';
      const filename = `${entry.title}${format === 'fmp4' ? '-fMP4' : ''}.${format === 'ts' ? 'ts' : 'mp4'}`;
      let sink, committed = false;
      try {
        // Allocate the output before source resolution so cancellation follows
        // the same rollback path; an audio-only intermediate always uses MP4.
        sink = await FileOutput.createHlsOutput(filename, format, signal, () => {}, {browserDownload: job.browserDownload, cacheOnly: !saveVideo});
        const source = await resolveSource(entry, signal); signal.throwIfAborted();
        if (source.kind === 'mp4' && format !== 'mp4') throw new Error('此录播直接提供 MP4 文件，请选择 MP4 视频格式。');
        const report = ({done,total,bytes}) => {
          update(done/total, `${(bytes/1048576).toFixed(1)} MB`, bytes);
        };
        if (source.kind === 'mp4') {
          // Older recordings can already be ordinary MP4. Read bounded ranges
          // through the same authenticated/retrying transport, never a full
          // recording-sized response or an opaque browser download request.
          const probe = await job.request(source.url, 'arraybuffer', {start:0,end:0}, signal);
          const total = probe.rangeTotal;
          if (!Number.isSafeInteger(total) || total <= 0) throw new Error('服务器未提供 MP4 字节范围信息。');
          for (let start = 0; start < total; start += 8 * 1024 * 1024) {
            signal.throwIfAborted();
            const end = Math.min(total - 1, start + 8 * 1024 * 1024 - 1);
            const part = await job.request(source.url, 'arraybuffer', {start,end}, signal), bytes = new Uint8Array(part.data);
            if (bytes.length !== end - start + 1 || (part.rangeTotal && part.rangeTotal !== total)) throw new Error('MP4 分段响应不完整或文件已变化。');
            if (!start && !['ftyp','moov','free','wide'].includes(String.fromCharCode(...bytes.subarray(4,8)))) throw new Error('服务器返回的内容不是 MP4。');
            await sink.write(bytes); report({done:end+1,total,bytes:end+1});
          }
        } else await Core.download({url: source.url, format, sink, request: job.request, muxjs, mp4Writer, signal, onProgress: report});
        signal.throwIfAborted(); await sink.close(); committed = true;
        entry.video = {sink, filename, saved: saveVideo}; entry.localFile = null; entry.needsFile = false;
      } catch (error) { if (!committed) await rollback(sink, error); throw error; }
    }
    async function extract(entry, format, job, update) {
      const signal = job.currentController.signal, filename = entry.video.filename.replace(/(?:-fMP4)?\.(?:mp4|ts)$/i, '') + (format === 'aac' ? '.m4a' : '.mp3');
      const cached = entry.audio?.[format];
      if (cached?.sink.fileAvailable) {
        try{await cached.sink.withFile(file => browserSave(file, filename, signal)); update(1, '音频已再次保存。'); return;}
        catch(error){if(error.name!=='NotFoundError')throw error;delete entry.audio[format];}
      }
      let sink, committed = false;
      try {
        sink = await FileOutput.createHlsOutput(filename, format, signal, () => {}, {browserDownload: job.browserDownload});
        let written = 0;
        const output = {
          async write(bytes) { await sink.write(bytes); written += bytes.byteLength; },
          async writeAt(bytes, position) { await sink.writeAt(bytes, position); written = Math.max(written, position + bytes.byteLength); },
        };
        const convert = file => AudioExport.convert({file, format, sink: output, muxjs, mp4Writer, reader: AudioReader, encoderFactory, signal,
          onProgress({progress: value,packets}) {
            update(value, `${format.toUpperCase()} · ${packets} 个音频包`, written);
          }});
        if (entry.localFile) await convert(entry.localFile); else await entry.video.sink.withFile(convert);
        signal.throwIfAborted(); await sink.close(); committed = true;
        (entry.audio ||= {})[format] = {sink, filename};
      } catch (error) { if (!committed) await rollback(sink, error); throw error; }
    }
    async function start(control, mode, queuedTask) {
      if (leaving || pending.some(task => task.control === control) || auxiliary.some(task=>task.control===control)) return;
      let options = queuedTask?.options || settings();
      if(!control.batch && mode!=='video' && !available(control.entry) && !control.entry.video?.saved && !control.entry.audio?.[mode]?.sink.fileAvailable){
        options={...options,content:mode==='resave'?'video':'audio',audioFormat:mode==='resave'?options.audioFormat:mode};mode='video';
      }
      const aux = !control.batch && mode!=='video';
      const list = queuedTask?.list || (mode === 'video' ? downloadable(control, options) : selectedEntries(control));
      if (!list.length) return;
      if(aux && auxiliaryActive){
        if(auxiliaryActive.control===control)return;
        const controller=new AbortController(),holds=[];
        if(available(control.entry) && control.entry.video.sink.holdHandoff)holds.push(control.entry.video.sink.holdHandoff());
        const needsFile=!available(control.entry)&&control.entry.video?.saved&&!control.entry.audio?.[mode]?.sink.fileAvailable;
        const prepared=needsFile?pickFiles(controller.signal,false).then(files=>{control.entry.localFile=files[0];}):Promise.resolve();
        prepared.catch(()=>{});auxiliary.push({control,mode,list,options,controller,holds,prepared});renderAll();return;
      }
      if (!aux && active) {
        if (mode !== 'video' || active.control === control) return;
        pending.push({control, mode, list, options}); renderAll(); return;
      }
      const job = {control, list, options, controller: queuedTask?.controller || new AbortController(), request,
        browserDownload: control.batch || Boolean(queuedTask) || (mode === 'video' && options.content !== 'video'),
        index: -1, current: null, cancelling: false, skipped: new Set(), finished:new Set(), holds: queuedTask?.holds || [], heldSources: new Set(), temporarySources:new Set()};
      if(aux)auxiliaryActive=job;else active=job;
      const holdSource = entry => {
        if (!entry.localFile && available(entry) && entry.video?.sink.holdHandoff && !job.heldSources.has(entry.video.sink)) {
          job.holds.push(entry.video.sink.holdHandoff()); job.heldSources.add(entry.video.sink);
        }
      };
      job.batchEstimate = createEstimate(); job.completedBytes = 0;
      const updateEstimates = () => {
        if (job.current) estimate(job.current.control, job.currentEstimate?.read() || {speed:null,remaining:Infinity});
        if (control.batch) estimate(control, job.batchEstimate.read());
      };
      job.estimateTimer = setInterval(updateEstimates, 1000);
      job.retry = ({attempt,delay}) => {
        const text = `${Math.ceil(delay/1000)} 秒后重试（${attempt}/8）`;
        message(control, text); if (job.current) message(job.current.control, text);
      };notifyJobs();
      message(control, ''); renderAll(); progress(control, null, '正在准备…');
      let wakeLock;
      try {
        for(const entry of list)if(available(entry))holdSource(entry);
        await FileOutput.prepareDestination();job.controller.signal.throwIfAborted();
        if(queuedTask?.prepared)await queuedTask.prepared;
        if (mode !== 'video' || options.content !== 'video') {
          const missing = list.filter(entry => !available(entry) && entry.video?.saved && !entry.audio?.[mode]?.sink.fileAvailable);
          if (missing.length) job.browserDownload = true;
          const files = missing.length ? await pickFiles(job.controller.signal, control.batch) : [];
          for (const entry of missing) {
            const file = control.batch ? files.find(file => file.name === entry.video?.filename) : files[0];
            if (!file) throw new Error('未选择全部待处理的视频。'); entry.localFile = file;
          }
          for (const entry of list) if (available(entry)) holdSource(entry);
        }
        try { void navigator.wakeLock?.request('screen').then(lock => {
          if ((active === job || auxiliaryActive === job) && !job.controller.signal.aborted) wakeLock = lock;
          else void lock.release().catch(() => {});
        }).catch(() => {}); } catch { /* Optional. */ }
        for (let index = 0; index < list.length; index++) {
          const entry = list[index]; job.controller.signal.throwIfAborted(); job.index = index;
          if (job.skipped.has(entry)) continue;
          job.current = entry; job.rowCancelling = false; job.entryBytes = 0; job.currentEstimate = createEstimate();job.rowHolds=[];
          job.currentController = new AbortController();
          const abortRow = () => job.currentController.abort(job.controller.signal.reason);
          job.controller.signal.addEventListener('abort', abortRow, {once:true});
          message(entry.control, ''); renderAll();
          let stage = 0, baseBytes = 0, stageBytes = 0;
          const wantsAudio = mode === 'video' ? options.content !== 'video' : !['resave'].includes(mode);
          const cachedAudio = !['video','resave'].includes(mode) && entry.audio?.[mode]?.sink.fileAvailable;
          const needsSource = !cachedAudio && (!entry.video || (!available(entry) && !entry.video.saved));
          const stageCount = needsSource && wantsAudio ? 2 : 1;
          const update = (value, text, bytes) => {
            const mapped = value === null ? null : (stage + value) / stageCount;
            if (bytes !== undefined) {
              stageBytes = bytes; job.entryBytes = baseBytes + bytes;
              job.currentEstimate.note(mapped, job.entryBytes);
              job.batchEstimate.note((index + mapped)/list.length, job.completedBytes + job.entryBytes);
            }
            progress(entry.control, mapped, text);
            if (control.batch) progress(control, mapped === null ? index/list.length : (index+mapped)/list.length, `${index+1}/${list.length} · ${text}`);
            updateEstimates();
          };
          update(null, '正在准备…');
          let settled = false;
          try {
            if (needsSource) {
              await download(entry, job, update, mode === 'resave' || (mode === 'video' && options.content !== 'audio'));
              if(FileOutput.destinationInfo().selected && !entry.video.saved)job.temporarySources.add(entry.video.sink);
              if(FileOutput.destinationInfo().selected){if(wantsAudio && entry.video.sink.holdHandoff)job.rowHolds.push(entry.video.sink.holdHandoff());}
              else if (control.batch || wantsAudio) holdSource(entry);
              if (wantsAudio) { stage++; baseBytes += stageBytes; }
            } else if (mode === 'resave' || (mode === 'video' && options.content !== 'audio' && !entry.video.saved)) {
              const save = async file => {const output=await browserSave(file, entry.video.filename, job.currentController.signal);if(output?.type==='directory')entry.video.sink=output;};
              if (entry.localFile) await save(entry.localFile); else await entry.video.sink.withFile(save);
              entry.video.saved = true;
            }
            if (wantsAudio) {
              if(!FileOutput.destinationInfo().selected || !needsSource)holdSource(entry);
              await extract(entry, mode === 'video' ? options.audioFormat : mode, job, update);
            }
            progress(entry.control, 1, FileOutput.destinationInfo().selected?'已保存至所选目录。':'已保存；临时副本将在 5 分钟后清理。');
            if (control.batch) progress(control, (index+1)/list.length, `${index+1}/${list.length}`);
            job.completedBytes += job.entryBytes; settled = true;job.finished.add(entry);
          } catch (error) {
            if (!job.controller.signal.aborted && job.currentController.signal.aborted && !error.cleanupFailed) {
              settled = true; job.skipped.add(entry); message(entry.control, '已取消；未完成的临时文件已清理。');
            } else throw error;
          } finally {
            job.controller.signal.removeEventListener('abort', abortRow);
            for(const release of job.rowHolds)await release();
            if(FileOutput.destinationInfo().selected && !entry.video?.saved && entry.video?.sink.dispose){await entry.video.sink.dispose();job.temporarySources.delete(entry.video.sink);}
            if (control.batch && settled) { job.current = null; renderAll(); }
          }
        }
        message(control, '已完成。');
      } catch (caught) {
        if (caught.name === 'NotFoundError' && job.current) job.current.needsFile = true;
        const error = caught.cleanupFailed ? caught : job.controller.signal.aborted ? job.controller.signal.reason || caught : caught;
        const cancelled = error.name === 'AbortError';
        if(FileOutput.destinationInfo().supported&&!FileOutput.destinationInfo().selected)clearPending('未选择保存目录，队列已取消。');
        if ((!cancelled || error.cleanupFailed) && !aux) clearPending('队列已停止，请重试。');
        const cleanup = error.cleanupFailed ? (error.cleanupRecovery ? '临时文件待清理，页面恢复后重试。' : '撤销写入失败，请检查目标文件。') : '未完成的临时文件已清理。';
        const text = cancelled ? `已取消；${cleanup}` : `${errorMessage(error)} ${cleanup}`;
        message(control, text, !cancelled || error.cleanupFailed); if (job.current) message(job.current.control, text, !cancelled || error.cleanupFailed);
      } finally {
        clearInterval(job.estimateTimer);
        for (const release of job.holds) try { await release(); } catch (error) { message(control, '临时副本未能继续保留；重存时请选择已保存的视频。', true); }
        for(const sink of job.temporarySources)try{await sink.dispose();}catch(error){message(control,'临时源文件待清理，页面恢复后重试。',true);}
        void wakeLock?.release().catch(() => {});
        job.current = null;if(aux)auxiliaryActive=null;else active=null;notifyJobs();renderAll();drain();drainAuxiliary();
      }
    }
    for (const event of ['pagehide', 'beforeunload']) window.addEventListener(event, () => {
      leaving = true; clearPending('页面已离开，排队已取消。');active?.controller.abort();auxiliaryActive?.controller.abort();
      for(const task of auxiliary.splice(0)){task.controller.abort();releaseQueuedAux(task);}
      renderAll();
    });
    window.addEventListener('pageshow', () => { leaving = false; renderAll(); });
    return {refresh};
  }
  return {create, createEstimate, remainingText};
});

return module.exports; })();
/* Browser adapter and player UI. The build supplies Core and muxjs. */
(() => {
  'use strict';
  const page = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const discovered = new Map(), observedHeaders = new Map(), observedContexts = new Map(), observedTitles = new Map(), preferGM = new Set();
  const fileSources = new Set();
  const injected = new WeakMap(), anchorPanels = new WeakMap();
  const panels = new Set();
  let activeJob;
  let onRetry = () => {};
  const courseOrigin = 'https://course.pku.edu.cn';
  const outerCourse = location.origin === courseOrigin;
  const listPage = outerCourse && location.pathname.endsWith('/videoList.action');
  let listUI, listSource, backgroundProbe = false;
  let embeddedInCourse = !outerCourse && window.top !== window.self && (Array.from(location.ancestorOrigins || []).includes(courseOrigin) || document.referrer?.startsWith(courseOrigin + '/'));
  const bridgeType = 'PKU_REPLAY_SAVER_SOURCE_V1';

  function remember(url, text) {
    try {
      url = Core.networkURL(url, location.href);
      if (text && !text.replace(/^\uFEFF/, '').trimStart().startsWith('#EXTM3U')) return;
      discovered.delete(url); discovered.set(url, true);
      if (discovered.size > 50) discovered.delete(discovered.keys().next().value);
      updateSources();
      if (!outerCourse && window.top !== window.self) sendSources();
    } catch { /* Ignore unrelated requests. */ }
  }

  function captureHeaders(url, values) {
    try {
      const result = observedHeaders.get(new URL(url, location.href).origin) || {};
      new Headers(values || {}).forEach((value, name) => {
        if (name === 'authorization' || name.startsWith('x-')) result[name] = value;
      });
      observedHeaders.set(new URL(url, location.href).origin, result);
      if (!outerCourse && window.top !== window.self && discovered.size) sendSources();
    } catch { /* Observation must not affect playback. */ }
  }


  function sendSources() {
    for (const url of [...discovered.keys(), ...fileSources]) {
      window.top.postMessage({ type: bridgeType, url, kind: fileSources.has(url) ? 'mp4' : 'hls', headers: observedHeaders.get(new URL(url).origin) || {}, referrer: location.href, title: document.title || document.querySelector('.course-info__header')?.textContent }, courseOrigin);
    }
  }
  window.addEventListener('message', event => {
    if (listPage) { listSource?.accept(event); return; }
    if (outerCourse && event.origin === 'https://onlineroomse.pku.edu.cn' && event.data?.type === bridgeType) {
      const frame = [...document.querySelectorAll('iframe')].find(frame => frame.contentWindow === event.source);
      if (!frame) return;
      if (event.data.kind === 'mp4') return; // The compact list handles direct files separately.
      try {
        const url = Core.networkURL(event.data.url, location.href);
        // Only reuse the same-origin Authorization/x-* headers observed by the player.
        const referrer = new URL(event.data.referrer || 'https://onlineroomse.pku.edu.cn/player');
        if (referrer.origin !== event.origin) return;
        observedContexts.set(new URL(url).origin, { referer: referrer.href, origin: referrer.origin });
        if (typeof event.data.title === 'string') observedTitles.set(url, event.data.title.slice(0, 200));
        captureHeaders(url, event.data.headers); remember(url);
      } catch { /* Ignore unrelated or invalid frame messages. */ }
    } else if (!outerCourse && event.origin === courseOrigin && event.source === window.top && event.data?.type === bridgeType + '_REQUEST') {
      embeddedInCourse = true;
      backgroundProbe ||= Boolean(event.data.background);
      if (backgroundProbe) for (const video of document.querySelectorAll('video')) { video.muted = true; video.pause?.(); }
      for (const panel of panels) { panel.host.remove(); panels.delete(panel); }
      sendSources();
    }
  });

  function looksLikePlaylist(url, contentType = '') {
    return /\.m3u8(?:[?#]|$)/i.test(url) || /(?:mpegurl|vnd\.apple\.mpegurl)/i.test(contentType);
  }

  function captureVideoInfo(url, value) {
    if (!/get-sub-info-by-auth-data/.test(url || '')) return;
    try {
      const info = typeof value === 'string' ? JSON.parse(value) : value;
      const content = JSON.parse(info.list[0].sub_content), playback = content.save_playback;
      const source = Array.isArray(playback.contents) ? playback.contents[0]?.preview || playback.contents[0] : playback.contents;
      if (typeof source === 'string' && looksLikePlaylist(source)) remember(source);
      else if (typeof source === 'string' && /\.mp4(?:[?#]|$)/i.test(source)) {
        fileSources.add(Core.networkURL(source, location.href));
        if (fileSources.size > 50) fileSources.delete(fileSources.values().next().value);
        if (window.top !== window.self) sendSources();
      }
    } catch { /* Playback observation must not interfere with the school page. */ }
  }

  // Observe requests in the page realm, including playlists behind blob video URLs.
  try {
    const originalFetch = page.fetch;
    if (originalFetch) page.fetch = function (...args) {
      const url = typeof args[0] === 'string' || args[0] instanceof URL ? String(args[0]) : args[0]?.url;
      captureHeaders(url, args[1]?.headers || args[0]?.headers);
      const promise = originalFetch.apply(this, args);
      promise.then(response => {
        if (/get-sub-info-by-auth-data/.test(response.url || url || '')) response.clone().json().then(value => captureVideoInfo(response.url || url, value)).catch(() => {});
        if (looksLikePlaylist(response.url || url, response.headers.get('content-type') || '')) {
          response.clone().text().then(text => remember(response.url || url, text)).catch(() => {});
        }
      }).catch(() => {});
      return promise;
    };
    const prototype = page.XMLHttpRequest.prototype;
    const open = prototype.open, send = prototype.send, setHeader = prototype.setRequestHeader;
    const requests = new WeakMap();
    prototype.open = function (method, url, ...rest) {
      requests.set(this, { url: String(url), headers: {} });
      return open.call(this, method, url, ...rest);
    };
    prototype.setRequestHeader = function (name, value) {
      const request = requests.get(this);
      if (request) request.headers[name] = value;
      return setHeader.call(this, name, value);
    };
    prototype.send = function (...args) {
      const request = requests.get(this);
      if (request) captureHeaders(request.url, request.headers);
      this.addEventListener('load', () => {
        try {
          const url = this.responseURL || request?.url;
          if (/get-sub-info-by-auth-data/.test(url || '')) {
            captureVideoInfo(url, this.responseType === 'json' ? this.response : this.responseText); return;
          }
          if (!looksLikePlaylist(url, this.getResponseHeader('Content-Type') || '')) return;
          if (!this.responseType || this.responseType === 'text') remember(url, this.responseText);
          else if (this.responseType === 'arraybuffer') remember(url, new TextDecoder().decode(this.response));
        } catch { /* Ignore inaccessible response bodies. */ }
      }, { once: true });
      return send.apply(this, args);
    };
  } catch { /* Resource timing and manual URL entry still work. */ }

  try {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (looksLikePlaylist(entry.name)) remember(entry.name);
    });
    observer.observe({ type: 'resource', buffered: true });
  } catch { /* Older userscript hosts may lack buffered observations. */ }

  function httpError(status) {
    const error = new Error(status === 401 || status === 403
      ? `登录验证失败（HTTP ${status}），请重新登录并播放视频。`
      : `服务器返回 HTTP ${status}。`);
    error.status = status;
    return error;
  }

  function gmRequest(url, type, range, signal, anonymous = false) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new DOMException('下载已取消', 'AbortError'));
      const context = observedContexts.get(new URL(url).origin);
      const headers = { ...observedHeaders.get(new URL(url).origin), Referer: context?.referer || location.href, Origin: context?.origin || location.origin };
      if (range) headers.Range = `bytes=${range.start}-${range.end}`;
      let handle, settled = false;
      function finish(callback, value) {
        if (settled) return;
        settled = true; signal?.removeEventListener('abort', abort); callback(value);
      }
      function abort() {
        try { handle?.abort(); } catch (error) { console.warn('[PKU-Replay-Saver] 中止请求失败', error); }
        finish(reject, new DOMException('下载已取消', 'AbortError'));
      }
      signal?.addEventListener('abort', abort, { once: true });
      handle = GM_xmlhttpRequest({
        method: 'GET', url, headers, responseType: type, anonymous, timeout: 45000,
        onload(response) {
          if (response.status !== (range ? 206 : 200)) return finish(reject, httpError(response.status));
        const total = /content-range:\s*bytes\s+\d+-\d+\/(\d+)/i.exec(response.responseHeaders || '')?.[1];
        finish(resolve, { data: type === 'text' ? response.responseText : response.response, url: response.finalUrl || url, rangeTotal: total ? Number(total) : undefined });
        },
        onreadystatechange(response) {
          // Stop a server that ignores Range before buffering an entire MP4.
          if (range && response.readyState === 2 && response.status && response.status !== 206) {
            finish(reject, httpError(response.status)); try { handle?.abort(); } catch {}
          }
        },
        onprogress(response) {
          if (range && response.loaded > range.end - range.start + 1) {
            finish(reject, new Error('服务器返回的字节范围过大。')); try { handle?.abort(); } catch {}
          }
        },
        onerror() { finish(reject, new Error('网络请求失败，请检查校园网 / VPN 和脚本的跨域访问权限。')); },
        ontimeout() { finish(reject, new Error('视频服务器响应超时。')); },
        onabort() { finish(reject, new DOMException('下载已取消', 'AbortError')); },
      });
      if (signal?.aborted) abort();
    });
  }

  async function requestOnce(url, type, range, signal, omitCookies = false) {
    const origin = new URL(url).origin;
    if (!preferGM.has(origin)) {
      try {
        const headers = { ...observedHeaders.get(origin) };
        if (range) headers.Range = `bytes=${range.start}-${range.end}`;
        const response = await page.fetch(url, { credentials: omitCookies ? 'omit' : 'include', headers, referrer: location.href, signal });
        if (response.status !== (range ? 206 : 200)) throw httpError(response.status);
        const total = /bytes\s+\d+-\d+\/(\d+)/i.exec(response.headers.get('content-range') || '')?.[1];
        return { data: type === 'text' ? await response.text() : await response.arrayBuffer(), url: response.url, rangeTotal: total ? Number(total) : undefined };
      } catch (error) {
        if (signal?.aborted || error.name === 'AbortError') throw error;
        // GM requests carry the browser's cookies and bypass page CORS restrictions.
        preferGM.add(origin);
      }
    }
    if (typeof GM_xmlhttpRequest !== 'function') throw new Error('当前脚本管理器未提供跨域请求功能，请使用 Tampermonkey 并允许资源域名访问。');
    return gmRequest(url, type, range, signal, omitCookies);
  }

  async function request(url, type, range, signal) {
    url = Core.networkURL(url, location.href);
    const publicResource = new URL(url).hostname === 'resourcese.pku.edu.cn' && /\/(?:play|.*\.ts)(?:\/|$)/.test(new URL(url).pathname);
    for (let attempt = 1; attempt <= 8; attempt++) {
      if (signal?.aborted) throw signal.reason;
      const controller = new AbortController();
      const abort = () => controller.abort(signal.reason);
      signal?.addEventListener('abort', abort, { once: true });
      const timeout = setTimeout(() => controller.abort(new DOMException('视频服务器响应超时', 'TimeoutError')), 45000);
      let failure;
      try { return await requestOnce(url, type, range, controller.signal, publicResource && attempt > 1); }
      catch (error) {
        if (signal?.aborted) throw signal.reason;
        failure = controller.signal.aborted ? controller.signal.reason : error;
      } finally { clearTimeout(timeout); signal?.removeEventListener('abort', abort); }
      if (attempt === 8 || (attempt >= 3 && [400, 401, 403, 404].includes(failure.status))) throw failure;
      const delay = Math.min(1000 * 2 ** (attempt - 1), 30000) + Math.floor(Math.random() * 500);
      onRetry({ attempt, delay });
      await new Promise((resolve, reject) => {
        const abort = () => { clearTimeout(timer); signal?.removeEventListener('abort', abort); reject(signal.reason); };
        const timer = setTimeout(() => { signal?.removeEventListener('abort', abort); resolve(); }, delay);
        signal?.addEventListener('abort', abort, { once: true });
        if (signal?.aborted) abort();
      });
    }
  }

  const css = `
    :host { display: block !important; color-scheme: light; font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.5; }
    button, select, input, a { font: inherit; box-sizing: border-box; }
    button, .save { border: 0; border-radius: 6px; padding: 8px 12px; background: #1268cf; color: white; cursor: pointer; text-decoration: none; }
    button:disabled { opacity: .5; cursor: wait; } select:disabled { opacity: .45; background: #f1f3f5; cursor: default; }
    .panel { background: #f6f8fb; color: #18212d; border: 1px solid #dce2ea; border-radius: 10px; padding: 14px 16px; box-sizing: border-box; width: 100%; }
    p { line-height: 1.5; margin: 8px 0 0; }
    label { display: block; margin: 12px 0; } input, select { width: 100%; margin-top: 5px; padding: 8px; border: 1px solid #b4bdc8; border-radius: 6px; color: #18212d; background: #fff; }
    .toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
    .toolbar select { width: auto; margin: 0; height: 40px; min-height: 40px; max-height: 40px; align-self: center; }
    .progress-label { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px; }
    progress { display: block; width: 100%; height: 12px; accent-color: #1268cf; }
    .secondary { background: #e7edf4; color: #18212d; } .status { overflow-wrap: anywhere; font-size: 13px; }
    .metrics, .notice { font-size: 12px; color: #58687b; } .status[data-state="error"] { color: #b42318; }
    details { margin-top: 10px; font-size: 13px; } summary { cursor: pointer; color: #426080; }
    .save { display: inline-block; margin-top: 10px; } [hidden] { display: none !important; }
  `;

  function shadowHost() {
    const host = document.createElement('span');
    const shadow = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style'); style.textContent = css; shadow.append(style);
    return { host, shadow };
  }

  function updateSources() {
    for (const panel of panels) {
      const selected = panel.sources.value;
      panel.sources.replaceChildren();
      const placeholder = document.createElement('option');
      placeholder.value = ''; placeholder.textContent = discovered.size ? '选择已检测到的视频' : '请先播放视频以检测播放地址';
      panel.sources.append(placeholder);
      for (const url of [...discovered.keys()].reverse()) {
        const parsed = new URL(url), option = document.createElement('option');
        option.value = url; option.textContent = `${parsed.hostname} …/${parsed.pathname.split('/').slice(-2).join('/')}`;
        panel.sources.append(option);
      }
      if (selected && discovered.has(selected)) panel.sources.value = selected;
      else if (discovered.size && !panel.url.value) {
        panel.sources.value = [...discovered.keys()].at(-1); panel.url.value = panel.sources.value;
      }
    }
  }

  function positionHost(host, anchor) {
    if (anchor?.parentNode) {
      const parent = anchor.parentElement;
      const layout = parent && getComputedStyle(parent);
      // A block's width does not make a new row in a nowrap flex container.
      if (layout && /flex/.test(layout.display) && !layout.flexDirection.startsWith('column')) {
        parent.style.setProperty('flex-wrap', 'wrap', 'important');
      }
      if (anchor.nextSibling !== host) anchor.parentNode.insertBefore(host, anchor.nextSibling);
    }
    else if (!host.isConnected) (document.body || document.documentElement).append(host);
  }

  function createPanel(anchor) {
    const { host, shadow } = shadowHost();
    host.setAttribute('data-replay-hls-panel', '');
    host.style.cssText = 'display:block!important;width:100%!important;max-width:100%;min-width:0;box-sizing:border-box;margin:12px 0!important;position:relative!important;inset:auto!important;clear:both;flex:0 0 100%!important;grid-column:1 / -1!important;align-self:stretch;';
    // This static markup contains no page content or request credentials.
    const container = document.createElement('section'); container.className = 'panel';
    container.setAttribute('aria-label', '下载完整视频');
    container.innerHTML = `
      <div class="toolbar"><button class="start">下载完整视频</button>
        <button class="sample secondary">下载前 5 分钟测试</button>
        <span>下载设置：</span><select class="content" aria-label="下载内容"><option value="video">仅视频（有声音）</option><option value="audio">仅音频</option><option value="both">视频和音频</option></select>
        <select class="format" aria-label="视频格式"><option value="mp4">MP4（推荐）</option><option value="fmp4">fMP4（分片 MP4）</option><option value="ts">TS（原始分片）</option></select>
        <select class="audioformat" aria-label="音频格式"><option value="aac">AAC (.m4a，无需重新编码)</option><option value="mp3">MP3 (.mp3，兼容性更好)</option></select>
        <button class="cancel secondary" hidden>取消</button></div>
      <div class="progress-label"><span>下载进度</span><span class="percent">0%</span></div>
      <progress value="0" max="1" aria-label="下载进度"></progress>
      <p class="status" aria-live="polite">请先播放视频，检测到地址后即可下载。</p>
      <p class="metrics">0 MB · 速度 — · 剩余时间 —</p>
      <p class="notice">MP4 兼容性较好；TS / fMP4 在 QuickTime 等播放器中可能无法正常播放。下载过程中请保持页面打开。</p>
      <div class="directory-tools toolbar" hidden style="margin:10px 0 0"><button class="directory secondary">选择保存目录</button><span class="directory-name"></span></div>
      <div class="cache-controls toolbar" style="margin:10px 0 0"><span>缓存保留</span><select class="retention" aria-label="缓存保留时间"><option value="300000">5 分钟</option><option value="600000">10 分钟</option><option value="1800000">30 分钟</option><option value="3600000">60 分钟</option><option value="43200000">12 小时</option><option value="86400000">24 小时</option><option value="0">永不删除</option></select></div>
      <p class="cache-note notice"></p>
      <div class="toolbar" style="margin:10px 0 0"><button class="copy secondary">复制播放地址</button><label style="margin:0"><input class="rename" type="checkbox" checked style="width:auto;margin:0"> 使用课程信息命名</label></div>
      <div class="audio-tools toolbar" hidden style="margin:10px 0 0">
        <button class="video">保存视频</button>
        <button class="audio">保存音频</button>
      </div>
      <p class="audio-note notice" hidden>MP3 兼容性更好，需要重新编码；AAC 保存为 .m4a，保留原始音频编码。</p>
      <details class="audio-debug" hidden><summary>音频调试信息（临时）</summary>
        <button class="audio-debug-copy secondary" style="margin:8px 0">复制调试信息</button>
        <textarea class="audio-debug-text" readonly rows="12" aria-label="音频调试信息" style="width:100%;box-sizing:border-box;font:12px monospace;white-space:pre;resize:vertical"></textarea>
      </details>
      <input class="audio-input" type="file" accept=".mp4,.m4a,.ts,video/*,audio/mp4" hidden>
      <a class="audiosave save" hidden>再次保存已完成的音频</a>
      <a class="videosave save" hidden>再次保存已完成的视频</a>
      <details class="settings"><summary>播放地址设置</summary>
        <label>已检测的视频<select class="sources"></select></label>
        <label>播放列表地址<input class="url" type="url" placeholder="https://…/playlist.m3u8"></label>
      </details>`;
    shadow.append(container);
    positionHost(host, anchor);
    const panel = { host };
    for (const name of ['sources', 'url', 'format', 'status', 'start', 'sample', 'cancel', 'percent', 'settings', 'metrics', 'notice', 'copy', 'rename', 'audio', 'audioformat', 'content', 'retention', 'video']) panel[name] = shadow.querySelector(`.${name}`);
    panel.cacheNote = shadow.querySelector('.cache-note');
    panel.directory=shadow.querySelector('.directory');
    panel.directory.onclick=async()=>{if(activeJob)return;try{await FileOutput.prepareDestination(true);}catch(error){if(error.name!=='AbortError')panel.status.textContent=errorMessage(error);}};
    FileOutput.watchDestination(info=>{shadow.querySelector('.directory-tools').hidden=!info.supported;shadow.querySelector('.cache-controls').hidden=info.supported;panel.cacheNote.hidden=info.supported;panel.directory.textContent=info.selected?'更改保存目录':'选择保存目录';shadow.querySelector('.directory-name').textContent=info.name;});
    // The two re-save links share the .save style class; bind each explicitly.
    panel.audiosave = shadow.querySelector('.audiosave');
    panel.save = shadow.querySelector('.videosave');
    panel.progress = shadow.querySelector('progress');
    panel.audioTools = shadow.querySelector('.audio-tools');
    panel.audioNote = shadow.querySelector('.audio-note');
    panel.audioInput = shadow.querySelector('.audio-input');
    panel.audioDebug = shadow.querySelector('.audio-debug');
    panel.audioDebugText = shadow.querySelector('.audio-debug-text');
    shadow.querySelector('.audio-debug-copy').onclick = async () => {
      try { await navigator.clipboard.writeText(panel.audioDebugText.value); shadow.querySelector('.audio-debug-copy').textContent = '已复制'; }
      catch { panel.audioDebugText.focus(); panel.audioDebugText.select(); shadow.querySelector('.audio-debug-copy').textContent = '请手动复制下方信息'; }
    };
    panel.sources.onchange = () => { if (panel.sources.value) panel.url.value = panel.sources.value; };
    panel.start.onclick = () => startDownload(panel);
    panel.sample.onclick = () => startDownload(panel, 300);
    panel.audio.onclick = () => saveAudio(panel);
    panel.video.onclick = () => saveVideo(panel);
    panel.audioformat.onchange = () => updateSavedButtons(panel);
    panel.content.onchange = () => { updateStartLabel(panel); updateFormatControls(panel); };
    panel.retention.onchange = () => {
      try {
        for (const output of [panel.completed?.sink, ...Object.values(panel.completed?.audio || {}).map(item => item.sink)]) output?.setRetention(Number(panel.retention.value));
        updateCacheNote(panel);
        panel.status.textContent = panel.status.textContent.replace(/临时副本将在 \d+ (?:分钟|小时)后清理|浏览器缓存不会自动删除/g, cacheText(panel));
      } catch (error) { panel.status.textContent = errorMessage(error); }
    };
    updateCacheNote(panel);
    panel.audioInput.onchange = () => {
      const file = panel.audioInput.files?.[0];
      if (file && panel.completed) { panel.localAudioFile = file; panel.status.textContent = '已选择视频，请点击“保存视频”或“保存音频”。'; }
      panel.audioInput.value = '';
    };
    panel.cancel.onclick = () => activeJob?.abort();
    panel.copy.onclick = async () => {
      try { await navigator.clipboard.writeText(panel.url.value); panel.status.textContent = '播放地址已复制。'; }
      catch { panel.settings.open = true; panel.url.select?.(); panel.status.textContent = '无法自动复制，请在播放地址栏中手动复制。'; }
    };
    panel.start.disabled = panel.sample.disabled = panel.audio.disabled = panel.video.disabled = Boolean(activeJob);
    panel.content.disabled = Boolean(activeJob); updateFormatControls(panel);
    panels.add(panel); updateSources();
    return panel;
  }

  function showPanel() {
    injectPanels();
    const panel = [...panels].find(item => item.host.isConnected) || createPanel();
    panel.settings.open = true;
    panel.host.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    panel.start.focus();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '—';
    if (seconds < 60) return `${Math.ceil(seconds)} 秒`;
    return `${Math.floor(seconds / 60)} 分 ${Math.ceil(seconds % 60)} 秒`;
  }
  function cacheText(panel) {
    const value = Number(panel.retention.value);
    return value === 0 ? '浏览器缓存不会自动删除' : `临时副本将在 ${value >= 3600000 * 12 ? value / 3600000 + ' 小时' : value / 60000 + ' 分钟'}后清理`;
  }
  function updateCacheNote(panel) { panel.cacheNote.textContent = `下载完成后，${cacheText(panel)}；已保存的文件不受影响。`; }
  function updateSavedButtons(panel) {
    panel.video.textContent = panel.completed?.saved ? '再次保存视频' : '保存视频';
    panel.audio.textContent = panel.completed?.audio?.[panel.audioformat.value] ? '再次保存音频' : '保存音频';
  }
  function updateFormatControls(panel) {
    panel.format.disabled = panel.content.disabled || panel.content.value === 'audio';
    panel.audioformat.disabled = panel.content.disabled || panel.content.value === 'video';
  }
  function updateStartLabel(panel) {
    panel.start.textContent = `${panel.completed ? '重新下载' : '下载'}${panel.content.value === 'audio' ? '音频' : panel.content.value === 'both' ? '视频和音频' : '完整视频'}`;
  }
  async function offerFile(file, filename, signal) {
    return FileOutput.saveFile(file,filename,signal);
  }
  async function saveVideo(panel) {
    if (activeJob || !panel.completed) return;
    const source = panel.completed;
    if (!panel.localAudioFile && source.sink.fileAvailable === false && !source.saved) return startDownload(panel, source.maxDuration, 'video');
    if (!panel.localAudioFile && source.sink.fileAvailable === false) {
      panel.status.textContent = '视频缓存已清理，请选择已保存的视频后再次点击保存。'; panel.audioInput.click(); return;
    }
    const job = activeJob = new AbortController();
    for (const item of panels) item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = true;
    panel.cancel.hidden = false;
    try {
      await FileOutput.prepareDestination();job.signal.throwIfAborted();
      const save = async file => {const output=await offerFile(file, source.filename, job.signal);if(output?.type==='directory')source.sink=output;};
      if (panel.localAudioFile) await save(panel.localAudioFile); else await source.sink.withFile(save);
      source.saved = true; panel.status.textContent = '视频已交给浏览器保存。'; updateSavedButtons(panel);
    } catch (error) { panel.status.textContent = '视频保存失败：' + errorMessage(error); }
    finally { activeJob = null; panel.cancel.hidden = true; for (const item of panels) item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = false; }
  }

  function errorMessage(error) {
    if ([401, 403].includes(error.status)) return '登录态已失效，请重新登录、播放视频后重试。';
    if (error.name === 'QuotaExceededError') return '浏览器临时存储空间不足，请释放空间或在 Chrome / Edge 独立标签页中选择保存位置。';
    if (['SecurityError', 'NotAllowedError'].includes(error.name)) return '浏览器拒绝存储或文件访问，请允许站点权限，或在独立标签页中重试。';
    if (error.name === 'TimeoutError') return '视频服务器连续超时，请检查校园网 / VPN 后重试。';
    if (error.name === 'OperationError') return '视频分片解密失败，请重新登录并播放视频后重试。';
    return error.message || '发生未知错误，请重新下载。';
  }

  async function startDownload(panel, maxDuration, overrideContent) {
    if (activeJob) return;
    if (!panel.url.value.trim()) { panel.status.textContent = '请先播放视频，或在播放地址设置中填入 .m3u8 地址。'; panel.settings.open = true; return; }
    let url;
    try { url = Core.networkURL(panel.url.value.trim(), location.href); }
    catch (error) { panel.status.textContent = errorMessage(error); return; }
    const content = overrideContent || panel.content.value, wantsAudio = content !== 'video', saveVideoFile = content !== 'audio';
    const format = saveVideoFile ? panel.format.value : 'mp4';
    const title = (observedTitles.get(url) || document.title || document.querySelector('.course-info__header')?.textContent || '录播').replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim().slice(0, 100) || '录播';
    const filename = `${panel.rename.checked ? title : '录播'}${maxDuration ? '-5min-test' : ''}${format === 'fmp4' ? '-fMP4' : ''}.${format === 'ts' ? 'ts' : 'mp4'}`;
    const previous = panel.completed?.filename === filename && panel.completed.url === url ? panel.completed : null;
    activeJob = new AbortController();
    const job = activeJob;
    let sink, wakeLock, committed = false, stopSink, handoffUrl, estimateTimer, releaseSource;
    for (const item of panels) item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = true;
    panel.content.disabled = panel.audioformat.disabled = panel.retention.disabled = true;
    panel.url.disabled = panel.sources.disabled = panel.format.disabled = panel.rename.disabled = true;
    panel.cancel.hidden = false; panel.save.hidden = true; panel.progress.value = 0;
    panel.completed = null; panel.localAudioFile = null; panel.audioTools.hidden = panel.audioNote.hidden = true;
    panel.percent.textContent = '0%'; panel.status.dataset.state = 'active';
    panel.metrics.textContent = '0 MB · 速度 — · 剩余时间 —';
    panel.status.textContent = '请选择保存位置…';
    const estimator = ProgressEstimate.createEstimate();
    let downloaded = 0;
    const updateMetrics = () => {
      const {speed, remaining} = estimator.read();
      panel.metrics.textContent = `${(downloaded / 1048576).toFixed(1)} MB · ${speed === null ? '—' : (speed / 1048576).toFixed(2)} MB/s · 剩余约 ${formatTime(remaining)}`;
    };
    onRetry = ({ attempt, delay }) => { panel.status.textContent = `请求失败，${Math.ceil(delay / 1000)} 秒后重试（第 ${attempt}/8 次）；可取消下载。`; };
    try {
      await FileOutput.prepareDestination();job.signal.throwIfAborted();
      sink = await FileOutput.createHlsOutput(filename, format, job.signal, link => {
        if (link) { handoffUrl = link; panel.save.href = link; panel.save.download = filename; }
        else if (panel.save.href === handoffUrl) panel.save.hidden = true;
      }, {browserDownload: wantsAudio, cacheOnly: !saveVideoFile, retentionMs: Number(panel.retention.value)});
      stopSink = () => { void sink.abort().catch(error => console.warn('[PKU-Replay-Saver] 文件回收待重试', error)); };
      job.signal.addEventListener('abort', stopSink, { once: true });
      job.signal.throwIfAborted();
      panel.status.textContent = '正在读取播放列表并验证登录态…';
      try { wakeLock = await navigator.wakeLock?.request('screen'); } catch { /* Optional. */ }
      estimateTimer = setInterval(updateMetrics, 1000);
      await Core.download({ url, request, sink, muxjs, mp4Writer, format, maxDuration, signal: job.signal,
        onProgress({ done, total, bytes }) {
          panel.progress.max = 1; panel.progress.value = done / total * (wantsAudio ? .85 : 1);
          panel.percent.textContent = `${(100 * panel.progress.value).toFixed(1)}%`;
          downloaded = bytes; estimator.note(done / total, bytes); updateMetrics();
          panel.status.textContent = `正在下载视频分片 ${done}/${total}…`;
        },
      });
      job.signal.throwIfAborted();
      panel.status.textContent = '正在保存文件…';
      await sink.close(); committed = true;
      panel.completed = {sink, filename, url, saved: saveVideoFile || Boolean(previous?.saved), maxDuration, audio: previous?.audio || {}}; panel.audioTools.hidden = panel.audioNote.hidden = false;
      updateSavedButtons(panel);
      if (wantsAudio && sink.holdHandoff) releaseSource = sink.holdHandoff();
      const description = maxDuration ? '前 5 分钟测试片段' : '完整录播';
      panel.status.dataset.state = 'success';
      panel.status.textContent = !saveVideoFile ? '正在准备提取音频…' : sink.type !== 'browser-download' ? `${description}已保存。` : `${description}已交给浏览器保存，请查看下载列表；${cacheText(panel)}。`;
    } catch (caughtError) {
      let error = job.signal.aborted ? job.signal.reason || caughtError : caughtError;
      if (caughtError.cleanupFailed && error !== caughtError) {
        error = FileOutput.withCleanupFailure(error, caughtError.cleanupError, caughtError.cleanupRecovery);
      }
      if (sink && !committed) {
        try { await sink.abort(); }
        catch (cleanupError) { error = FileOutput.withCleanupFailure(error, cleanupError, sink.type === 'browser-download'); }
      }
      const cleanup = error.cleanupFailed ? (error.cleanupRecovery
        ? '临时文件暂未清理完成，页面恢复后将自动重试。'
        : '浏览器未能撤销文件写入，请关闭页面并检查所选文件。')
        : '本次下载产生的临时文件已清理。';
      panel.status.dataset.state = error.name === 'AbortError' ? 'neutral' : 'error';
      panel.status.textContent = `${error.name === 'AbortError' ? '下载已取消。' : '下载失败：' + errorMessage(error)} ${cleanup}`;
    } finally {
      clearInterval(estimateTimer);
      job.signal.removeEventListener('abort', stopSink);
      void wakeLock?.release().catch(() => {});
      onRetry = () => {}; activeJob = null;
      panel.url.disabled = panel.sources.disabled = panel.format.disabled = panel.rename.disabled = false;
      panel.content.disabled = panel.retention.disabled = committed && wantsAudio; updateFormatControls(panel);
      panel.cancel.hidden = true;
      for (const item of panels) { item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = committed && wantsAudio; updateStartLabel(item); }
    }
    try { if (committed && wantsAudio && !job.signal.aborted) await saveAudio(panel, true); }
    finally {
      if (releaseSource) try { await releaseSource(); } catch (error) { panel.status.textContent += ' 缓存保留时间更新失败。'; }
      if(committed && !saveVideoFile && FileOutput.destinationInfo().selected)try{await sink.dispose();}catch(error){panel.status.textContent+=' 临时源文件待清理，页面恢复后重试。';}
      if(committed&&wantsAudio){activeJob=null;panel.content.disabled=panel.retention.disabled=false;updateFormatControls(panel);panel.cancel.hidden=true;for(const item of panels)item.start.disabled=item.sample.disabled=item.audio.disabled=item.video.disabled=false;}
    }
  }

  async function saveAudio(panel, automatic = false) {
    if (activeJob || !panel.completed) return;
    const source = panel.completed;
    const format = panel.audioformat.value, cached = source.audio?.[format];
    if (!cached?.sink.fileAvailable && !panel.localAudioFile && (source.needsFile || source.sink.fileAvailable === false)) {
      if (!source.saved) return startDownload(panel, source.maxDuration, 'audio');
      panel.status.textContent = '视频临时副本已清理，请选择已经保存的视频，再点击“保存音频”。';
      panel.audioInput.click(); return;
    }
    const filename = source.filename.replace(/(?:-fMP4)?\.(?:mp4|ts)$/i, '') + (format === 'aac' ? '.m4a' : '.mp3');
    const job = activeJob = new AbortController();
    let sink, committed = false, stopSink, handoffUrl, estimateTimer;
    for (const item of panels) item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = true;
    panel.content.disabled = panel.retention.disabled = true;
    panel.audioformat.disabled = panel.format.disabled = true; panel.cancel.hidden = false; panel.status.dataset.state = 'active';
    panel.audiosave.hidden = true; panel.progress.max = 1; panel.progress.value = automatic ? .85 : 0; panel.percent.textContent = automatic ? '85%' : '0%';
    panel.metrics.textContent = '已处理 0 个音频包 · 剩余约 —';
    panel.status.textContent = '请选择音频保存位置…';
    const diagnostics = [];
    panel.audioDebug.hidden = false; panel.audioDebug.open = false;
    const recordDiagnostic = value => {
      diagnostics.push(value);
      if (diagnostics.length > 100) diagnostics.splice(30, diagnostics.length - 100);
      panel.audioDebugText.value = JSON.stringify({script: 'PKU-Replay-Saver', version: '1.8.3-debug', events: diagnostics}, null, 2);
    };
    recordDiagnostic({stage: 'browser', userAgent: navigator.userAgent, selectedFormat: format,
      sandboxAudioDecoder: typeof globalThis.AudioDecoder, pageAudioDecoder: typeof page.AudioDecoder,
      sandboxAudioContext: typeof globalThis.AudioContext, pageAudioContext: typeof page.AudioContext,
      sameDecoder: globalThis.AudioDecoder === page.AudioDecoder, sameAudioContext: globalThis.AudioContext === page.AudioContext,
      Worker: typeof globalThis.Worker, source: panel.localAudioFile ? 'selected-file' : source.sink.type});
    const estimator = ProgressEstimate.createEstimate();
    let processedPackets = 0;
    const updateMetrics = () => { panel.metrics.textContent = `已处理 ${processedPackets} 个音频包 · 剩余约 ${formatTime(estimator.read().remaining)}`; };
    try {
      await FileOutput.prepareDestination();job.signal.throwIfAborted();
      if (cached?.sink.fileAvailable) {
        try{
          await cached.sink.withFile(file => offerFile(file, filename, job.signal));
          panel.progress.value = 1; panel.percent.textContent = '100%'; panel.status.dataset.state = 'success';
          panel.status.textContent = FileOutput.destinationInfo().selected?'音频已再次保存至所选目录。':'音频已再次交给浏览器保存。'; return;
        }catch(error){if(error.name!=='NotFoundError')throw error;delete source.audio[format];}
      }
      // Open the output from the user's click before any asynchronous file reads.
      sink = await FileOutput.createHlsOutput(filename, format, job.signal, link => {
        if (link) { handoffUrl = link; panel.audiosave.href = link; panel.audiosave.download = filename; }
        else if (panel.audiosave.href === handoffUrl) panel.audiosave.hidden = true;
      }, {browserDownload: automatic, retentionMs: Number(panel.retention.value)});
      stopSink = () => { void sink.abort().catch(error => console.warn('[PKU-Replay-Saver] 音频文件回收待重试', error)); };
      job.signal.addEventListener('abort', stopSink, {once: true}); job.signal.throwIfAborted();
      estimateTimer = setInterval(updateMetrics, 1000);
      const convert = file => AudioExport.convert({file, format, sink, muxjs, mp4Writer,
        reader: AudioReader, encoderFactory: mp3EncoderFactory, signal: job.signal, onDiagnostic: recordDiagnostic,
        onProgress({progress, packets}) {
          panel.progress.value = automatic ? .85 + progress * .15 : progress; panel.percent.textContent = `${(panel.progress.value * 100).toFixed(1)}%`;
          panel.status.textContent = format === 'aac' ? '正在提取 AAC 音频，无需重新编码…' : '正在转换为 MP3…';
          processedPackets = packets; estimator.note(progress); updateMetrics();
        },
      });
      if (panel.localAudioFile) await convert(panel.localAudioFile);
      else await source.sink.withFile(convert);
      job.signal.throwIfAborted(); panel.status.textContent = '正在保存音频…';
      await sink.close(); committed = true;
      (source.audio ||= {})[format] = {sink, filename}; updateSavedButtons(panel);
      panel.status.dataset.state = 'success';
      panel.status.textContent = sink.type !== 'browser-download' ? `${format === 'aac' ? 'AAC' : 'MP3'} 音频已保存。` : `音频已交给浏览器保存；${cacheText(panel)}。`;
    } catch (caughtError) {
      let error = job.signal.aborted ? job.signal.reason || caughtError : caughtError;
      if (caughtError.cleanupFailed && error !== caughtError) error = FileOutput.withCleanupFailure(error, caughtError.cleanupError, caughtError.cleanupRecovery);
      panel.audioDebug.open = true; recordDiagnostic({stage: 'ui-failure', error: AudioExport.errorDetails(caughtError)});
      if (caughtError.name === 'NotFoundError') source.needsFile = true;
      if (sink && !committed) {
        try { await sink.abort(); } catch (cleanupError) { error = FileOutput.withCleanupFailure(error, cleanupError, sink.type === 'browser-download'); }
      }
      const cleanup = error.cleanupFailed ? (error.cleanupRecovery ? '音频临时文件暂未清理完成，页面恢复后将自动重试。' : '浏览器未能撤销音频写入，请检查所选文件。') : '本次转换产生的临时文件已清理。';
      panel.status.dataset.state = error.name === 'AbortError' ? 'neutral' : 'error';
      panel.status.textContent = `${error.name === 'AbortError' ? '音频转换已取消。' : caughtError.name === 'NotFoundError' ? '原视频已移除，请再次点击“保存音频”选择已保存的视频。' : '音频保存失败：' + errorMessage(error)} ${cleanup}`;
    } finally {
      clearInterval(estimateTimer);
      job.signal.removeEventListener('abort', stopSink); activeJob = automatic ? job : null;
      panel.content.disabled = panel.retention.disabled = automatic; updateFormatControls(panel); panel.cancel.hidden = true;
      for (const item of panels) item.start.disabled = item.sample.disabled = item.audio.disabled = item.video.disabled = automatic;
    }
  }

  function outsideScrollContainer(element) {
    let anchor = element;
    for (let parent = element; parent && parent !== document.body && parent !== document.documentElement; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (/(auto|scroll)/.test(style.overflowY || style.overflow || '') || parent.classList?.contains('el-scrollbar')) anchor = parent;
    }
    return anchor;
  }

  function injectPanels() {
    if (listPage) {
      if (!listUI) {
        listSource = ListSource.create({document, location, validateURL: Core.networkURL});
        listUI = ListPage.create({document, location, Core, FileOutput, AudioExport, AudioReader, muxjs, mp4Writer,
          encoderFactory: mp3EncoderFactory, request, errorMessage,
          onJob(controller, retry) { activeJob = controller; onRetry = retry || (() => {}); },
          async resolveSource(entry, signal) {
            const source = await listSource.resolve(entry, signal);
            observedContexts.set(new URL(source.url).origin, {referer: source.referrer, origin: source.origin});
            if (source.kind === 'mp4' && typeof GM_xmlhttpRequest === 'function') preferGM.add(new URL(source.url).origin);
            captureHeaders(source.url, source.headers); return source;
          }});
      }
      listUI.refresh(); return;
    }
    if (backgroundProbe) for (const video of document.querySelectorAll('video')) { video.muted = true; video.pause?.(); }
    if (outerCourse) {
      for (const frame of document.querySelectorAll('iframe')) {
        let url;
        try { url = new URL(frame.src || frame.getAttribute('src'), location.href); } catch { continue; }
        if (!['onlineroomse.pku.edu.cn', 'yjapise.pku.edu.cn'].includes(url.hostname) && !/streammedia|replay|player/i.test(url.pathname)) continue;
        const anchor = outsideScrollContainer(frame);
        const existing = injected.get(frame) || anchorPanels.get(anchor);
        const panel = existing?.host.isConnected ? existing : createPanel(anchor);
        positionHost(panel.host, anchor); injected.set(frame, panel); anchorPanels.set(anchor, panel);
        frame.contentWindow?.postMessage({ type: bridgeType + '_REQUEST' }, 'https://onlineroomse.pku.edu.cn');
        if (!frame.dataset.replayBridge) {
          frame.dataset.replayBridge = '1';
          frame.addEventListener('load', () => frame.contentWindow?.postMessage({ type: bridgeType + '_REQUEST' }, 'https://onlineroomse.pku.edu.cn'));
        }
      }
    }
    if (embeddedInCourse) return;
    for (const video of document.querySelectorAll('video')) {
      // The school's course body contains the complete video box, including wrappers
      // which may use flex layout. Put downloads outside that entire area.
      const anchor = video.closest('.course-info__body')
        || video.closest('#cmcPlayer_container')
        || video.closest('.cmc-main, .video-js, .plyr, .jwplayer') || video;
      const outer = outsideScrollContainer(anchor);
      const existing = injected.get(video) || anchorPanels.get(outer);
      const panel = existing?.host.isConnected ? existing : createPanel(outer);
      positionHost(panel.host, outer); injected.set(video, panel); anchorPanels.set(outer, panel);
      const source = video.currentSrc || video.src;
      if (looksLikePlaylist(source)) remember(source);
      for (const item of video.querySelectorAll('source[src]')) if (looksLikePlaylist(item.src)) remember(item.src);
    }
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (!scheduled) { scheduled = true; setTimeout(() => { scheduled = false; injectPanels(); }, 100); }
  });
  observer.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPanels, { once: true });
  else injectPanels();
  if (!listPage && typeof GM_registerMenuCommand === 'function') GM_registerMenuCommand('打开录播下载面板', showPanel);
  window.addEventListener('resize', injectPanels);
  window.addEventListener('load', injectPanels);
  FileOutput.startHlsTempCleanup();
  window.addEventListener('pagehide', () => activeJob?.abort());
  window.addEventListener('beforeunload', () => activeJob?.abort());
})();

})();
