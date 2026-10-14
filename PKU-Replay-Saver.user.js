// ==UserScript==
// @name         PKU-Replay-Saver
// @namespace    pku-replay-saver
// @version      1.4.0
// @description  使用当前登录态下载北大录播，支持普通 MP4、fMP4 和 TS，显示进度、速度与剩余时间。
// @match        https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/*
// @match        https://onlineroomse.pku.edu.cn/player*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      *
// @license      MIT; mux.js 6.3.0 Apache-2.0
// ==/UserScript==

/*
PKU-Replay-Saver: MIT. See accompanying LICENSE.
Bundled mux.js 6.3.0: Copyright (c) Brightcove; Apache-2.0.
Source: https://github.com/videojs/mux.js/tree/6dd806f30a5db8eb9fa2c7325f6f9fada1f4f241
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
                if (record?.deleteAfter > Date.now()) return;
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

async function createHlsOutput(fileName, format, signal, onHandoff) {
    signal.throwIfAborted();
    if (window.top === window.self && typeof window.showSaveFilePicker === 'function') {
        const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [{
                description: format !== 'ts' ? 'MP4 视频' : 'MPEG-TS 视频',
                accept: format !== 'ts' ? { 'video/mp4': ['.mp4'] } : { 'video/mp2t': ['.ts'] },
            }],
        });
        signal.throwIfAborted();
        const writable = await handle.createWritable();
        let closed = false;
        let abortTask;
        let closeTask;
        const abort = () => closed ? Promise.resolve() : (abortTask ||= (async () => {
            if (closeTask) await closeTask.catch(() => {});
            if (!closed) await writable.abort();
        })());
        try { signal.throwIfAborted(); } catch (error) {
            try { await abort(); } catch (cleanupError) { throw withCleanupFailure(error, cleanupError); }
            throw error;
        }
        const write = (chunk) => {
            signal.throwIfAborted();
            if (abortTask) throw new DOMException('下载已取消', 'AbortError');
            return writable.write(chunk);
        };
        return {
            type: 'file-picker',
            write,
            writeAt: (chunk, position) => write({ type: 'write', position, data: chunk }),
            async close() {
                signal.throwIfAborted();
                if (abortTask) throw new DOMException('下载已取消', 'AbortError');
                closeTask = writable.close().then(() => { closed = true; });
                await closeTask;
            },
            abort,
        };
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
    const revokeUrl = () => {
        try { if (objectUrl) { URL.revokeObjectURL(objectUrl); onHandoff?.(null); } }
        catch (error) { console.warn('[PKU-Replay-Saver] 释放下载链接失败', error); }
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
            return writable.write(chunk);
        };
        return {
            type: 'browser-download',
            write,
            writeAt: (chunk, position) => write({ type: 'write', position, data: chunk }),
            async close() {
                signal.throwIfAborted();
                if (abortTask) throw new DOMException('下载已取消', 'AbortError');
                closeTask = writable.close().then(() => { closed = true; });
                await closeTask;
                signal.throwIfAborted();
                const file = await handle.getFile();
                signal.throwIfAborted();
                objectUrl = URL.createObjectURL(file);
                onHandoff?.(objectUrl);
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = fileName;
                link.style.display = 'none';
                localStorage.setItem(RECORD_PREFIX + name, JSON.stringify({ state: 'handoff', deleteAfter: Date.now() + HANDOFF_DELAY }));
                // Arrange cleanup before touching the DOM so handoff errors cannot strand the lock.
                cleanupTimer = setTimeout(async () => {
                    try {
                        revokeUrl();
                        await removeTempFile(root, name);
                    } catch (error) { warn(error); }
                    finally { await release(); }
                }, HANDOFF_DELAY);
                try {
                    document.body.appendChild(link);
                    link.click();
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

return { createHlsOutput, startHlsTempCleanup, withCleanupFailure };
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
/* Browser adapter and player UI. The build supplies Core and muxjs. */
(() => {
  'use strict';
  const page = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const discovered = new Map(), observedHeaders = new Map(), observedContexts = new Map(), observedTitles = new Map(), preferGM = new Set();
  const injected = new WeakMap(), anchorPanels = new WeakMap();
  const panels = new Set();
  let activeJob;
  let onRetry = () => {};
  const courseOrigin = 'https://course.pku.edu.cn';
  const outerCourse = location.origin === courseOrigin;
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
    for (const url of discovered.keys()) {
      window.top.postMessage({ type: bridgeType, url, headers: observedHeaders.get(new URL(url).origin) || {}, referrer: location.href, title: document.querySelector('.course-info__header')?.textContent || document.title }, courseOrigin);
    }
  }
  window.addEventListener('message', event => {
    if (outerCourse && event.origin === 'https://onlineroomse.pku.edu.cn' && event.data?.type === bridgeType) {
      const frame = [...document.querySelectorAll('iframe')].find(frame => frame.contentWindow === event.source);
      if (!frame) return;
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
      for (const panel of panels) { panel.host.remove(); panels.delete(panel); }
      sendSources();
    }
  });

  function looksLikePlaylist(url, contentType = '') {
    return /\.m3u8(?:[?#]|$)/i.test(url) || /(?:mpegurl|vnd\.apple\.mpegurl)/i.test(contentType);
  }

  // Observe requests in the page realm, including playlists behind blob video URLs.
  try {
    const originalFetch = page.fetch;
    if (originalFetch) page.fetch = function (...args) {
      const url = typeof args[0] === 'string' || args[0] instanceof URL ? String(args[0]) : args[0]?.url;
      captureHeaders(url, args[1]?.headers || args[0]?.headers);
      const promise = originalFetch.apply(this, args);
      promise.then(response => {
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
          finish(resolve, { data: type === 'text' ? response.responseText : response.response, url: response.finalUrl || url });
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
        return { data: type === 'text' ? await response.text() : await response.arrayBuffer(), url: response.url };
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
    button:disabled { opacity: .5; cursor: wait; }
    .panel { background: #f6f8fb; color: #18212d; border: 1px solid #dce2ea; border-radius: 10px; padding: 14px 16px; box-sizing: border-box; width: 100%; }
    p { line-height: 1.5; margin: 8px 0 0; }
    label { display: block; margin: 12px 0; } input, select { width: 100%; margin-top: 5px; padding: 8px; border: 1px solid #b4bdc8; border-radius: 6px; color: #18212d; background: #fff; }
    .toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
    .toolbar select { width: auto; margin: 0; }
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
        <select class="format" aria-label="保存格式"><option value="mp4">MP4（推荐）</option><option value="fmp4">fMP4（分片 MP4）</option><option value="ts">TS（原始分片）</option></select>
        <button class="cancel secondary" hidden>取消</button></div>
      <div class="progress-label"><span>下载进度</span><span class="percent">0%</span></div>
      <progress value="0" max="1" aria-label="下载进度"></progress>
      <p class="status" aria-live="polite">请先播放视频，检测到地址后即可下载。</p>
      <p class="metrics">0 MB · 速度 — · 剩余时间 —</p>
      <p class="notice">MP4 兼容性较好；TS / fMP4 在 QuickTime 等播放器中可能无法正常播放。下载过程中请保持页面打开。</p>
      <div class="toolbar" style="margin:10px 0 0"><button class="copy secondary">复制播放地址</button><label style="margin:0"><input class="rename" type="checkbox" checked style="width:auto;margin:0"> 使用课程名重命名</label></div>
      <a class="save" hidden>再次保存已完成的视频</a>
      <details class="settings"><summary>播放地址设置</summary>
        <label>已检测的视频<select class="sources"></select></label>
        <label>播放列表地址<input class="url" type="url" placeholder="https://…/playlist.m3u8"></label>
      </details>`;
    shadow.append(container);
    positionHost(host, anchor);
    const panel = { host };
    for (const name of ['sources', 'url', 'format', 'status', 'save', 'start', 'sample', 'cancel', 'percent', 'settings', 'metrics', 'notice', 'copy', 'rename']) panel[name] = shadow.querySelector(`.${name}`);
    panel.progress = shadow.querySelector('progress');
    panel.sources.onchange = () => { if (panel.sources.value) panel.url.value = panel.sources.value; };
    panel.start.onclick = () => startDownload(panel);
    panel.sample.onclick = () => startDownload(panel, 300);
    panel.cancel.onclick = () => activeJob?.abort();
    panel.copy.onclick = async () => {
      try { await navigator.clipboard.writeText(panel.url.value); panel.status.textContent = '播放地址已复制。'; }
      catch { panel.settings.open = true; panel.url.select?.(); panel.status.textContent = '无法自动复制，请在播放地址栏中手动复制。'; }
    };
    panel.start.disabled = panel.sample.disabled = Boolean(activeJob);
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

  function errorMessage(error) {
    if ([401, 403].includes(error.status)) return '登录态已失效，请重新登录、播放视频后重试。';
    if (error.name === 'QuotaExceededError') return '浏览器临时存储空间不足，请释放空间或在 Chrome / Edge 独立标签页中选择保存位置。';
    if (['SecurityError', 'NotAllowedError'].includes(error.name)) return '浏览器拒绝存储或文件访问，请允许站点权限，或在独立标签页中重试。';
    if (error.name === 'TimeoutError') return '视频服务器连续超时，请检查校园网 / VPN 后重试。';
    if (error.name === 'OperationError') return '视频分片解密失败，请重新登录并播放视频后重试。';
    return error.message || '发生未知错误，请重新下载。';
  }

  async function startDownload(panel, maxDuration) {
    if (activeJob) return;
    if (!panel.url.value.trim()) { panel.status.textContent = '请先播放视频，或在播放地址设置中填入 .m3u8 地址。'; panel.settings.open = true; return; }
    let url;
    try { url = Core.networkURL(panel.url.value.trim(), location.href); }
    catch (error) { panel.status.textContent = errorMessage(error); return; }
    const format = panel.format.value;
    const title = (observedTitles.get(url) || document.querySelector('.course-info__header')?.textContent || document.title || '录播').replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim().slice(0, 100) || '录播';
    const filename = `${panel.rename.checked ? title : '录播'}${maxDuration ? '-前5分钟测试' : ''}${format === 'fmp4' ? '-fMP4' : ''}.${format === 'ts' ? 'ts' : 'mp4'}`;
    activeJob = new AbortController();
    const job = activeJob;
    let sink, wakeLock, committed = false, stopSink;
    for (const item of panels) item.start.disabled = item.sample.disabled = true;
    panel.url.disabled = panel.sources.disabled = panel.format.disabled = panel.rename.disabled = true;
    panel.cancel.hidden = false; panel.save.hidden = true; panel.progress.value = 0;
    panel.percent.textContent = '0%'; panel.status.dataset.state = 'active';
    panel.metrics.textContent = '0 MB · 速度 — · 剩余时间 —';
    panel.status.textContent = '请选择保存位置…';
    const started = performance.now();
    onRetry = ({ attempt, delay }) => { panel.status.textContent = `请求失败，${Math.ceil(delay / 1000)} 秒后重试（第 ${attempt}/8 次）；可取消下载。`; };
    try {
      sink = await FileOutput.createHlsOutput(filename, format, job.signal, link => {
        panel.save.hidden = !link;
        if (link) { panel.save.href = link; panel.save.download = filename; }
      });
      stopSink = () => { void sink.abort().catch(error => console.warn('[PKU-Replay-Saver] 文件回收待重试', error)); };
      job.signal.addEventListener('abort', stopSink, { once: true });
      job.signal.throwIfAborted();
      panel.status.textContent = '正在读取播放列表并验证登录态…';
      try { wakeLock = await navigator.wakeLock?.request('screen'); } catch { /* Optional. */ }
      await Core.download({ url, request, sink, muxjs, mp4Writer, format, maxDuration, signal: job.signal,
        onProgress({ done, total, bytes }) {
          panel.progress.max = total; panel.progress.value = done;
          panel.percent.textContent = `${(100 * done / total).toFixed(1)}%`;
          const elapsed = Math.max(0.001, (performance.now() - started) / 1000);
          panel.metrics.textContent = `${(bytes / 1048576).toFixed(1)} MB · ${(bytes / elapsed / 1048576).toFixed(2)} MB/s · 剩余约 ${formatTime(elapsed * (total - done) / done)}`;
          panel.status.textContent = `正在下载视频分片 ${done}/${total}…`;
        },
      });
      job.signal.throwIfAborted();
      panel.status.textContent = '正在保存文件…';
      await sink.close(); committed = true;
      const description = maxDuration ? '前 5 分钟测试片段' : '完整录播';
      panel.status.dataset.state = 'success';
      panel.status.textContent = sink.type === 'file-picker' ? `${description}已保存。` : `${description}已交给浏览器保存，请查看下载列表；临时副本将在 5 分钟后清理。`;
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
      job.signal.removeEventListener('abort', stopSink);
      void wakeLock?.release().catch(() => {});
      onRetry = () => {}; activeJob = null;
      panel.url.disabled = panel.sources.disabled = panel.format.disabled = panel.rename.disabled = false;
      panel.cancel.hidden = true;
      for (const item of panels) { item.start.disabled = item.sample.disabled = false; item.start.textContent = '重新下载完整视频'; }
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
  if (typeof GM_registerMenuCommand === 'function') GM_registerMenuCommand('打开录播下载面板', showPanel);
  window.addEventListener('resize', injectPanels);
  window.addEventListener('load', injectPanels);
  FileOutput.startHlsTempCleanup();
  window.addEventListener('pagehide', () => activeJob?.abort());
  window.addEventListener('beforeunload', () => activeJob?.abort());
})();

})();
