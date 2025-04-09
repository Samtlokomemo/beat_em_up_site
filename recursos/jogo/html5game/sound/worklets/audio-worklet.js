﻿AudioWorkletProcessor.prototype._V=function(){this._W=true;this.port.onmessage=(_X)=>{if(_X.data==="kill")this._W=false;};};class _Y extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._V();}process(_Z,__,parameters){const input=_Z[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _01=input[c];for(let _11=0;_11<_01.length;++_11){const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];
__[_21][c][_11]=_01[_11];}}return this._W;}}class _31 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._V();}process(_Z,__,parameters){const _41=_Z[0];const _51=_Z[1];const output=__[0];const gain=parameters.gain;for(let c=0;c<_51.length;++c){const _01=_51[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11)_61[_11]=_01[_11];}for(let c=0;c<_41.length;++c){const _01=_41[c];const _61=output[c];for(let _11=0;
_11<_01.length;++_11){const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];_61[_11]+=_01[_11]*_71;}}return this._W;}}registerProcessor("audio-bus-input",_Y);registerProcessor("audio-bus-output",_31);class _81 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100},{name:"resolution",
automationRate:"a-rate",defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _91=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._c1=new Float32Array(_b1);this._d1=new Uint32Array(_b1);}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const gain=parameters.gain;const factor=parameters.factor;
const resolution=parameters.resolution;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){_61[_11]=_01[_11];if(this._d1[c]===0)this._c1[c]=_01[_11];const _e1=(factor[_11]!==undefined)?factor[_11]:factor[0];++this._d1[c];this._d1[c]%=_e1;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];if(_21>0.0){continue;}let _f1=this._c1[c];const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];_f1*=_71;_f1=Math.max(Math.min(_f1,1.0),
-1.0);const _g1=(resolution[_11]!==undefined)?resolution[_11]:resolution[0];const max=(_f1>0.0)?_81._91[_g1]-1:_81._91[_g1];_f1=Math.round(_f1*max)/max;const _h1=(mix[_11]!==undefined)?mix[_11]:mix[0];_61[_11]*=(1.0-_h1);_61[_11]+=(_f1*_h1);}}return this._W;}}registerProcessor("bitcrusher-processor",_81);class _i1{constructor(_j1=1e-3){this.setTime(_j1);}setTime(_j1){this._k1=Math.exp(-1/(_j1*sampleRate));}process(_l1,_m1){return _l1+this._k1*(_m1-_l1);}}class _n1{constructor(_o1,_p1){this._q1=new _i1(_o1);
this._r1=new _i1(_p1);this._s1=_o1;this._t1=_p1;}_u1(_j1){if(_j1===this._s1)return;this._q1.setTime(_j1);this._s1=_j1;}_v1(_j1){if(_j1===this._t1)return;this._r1.setTime(_j1);this._t1=_j1;}process(_l1,_m1){if(_l1>_m1)return this._q1.process(_l1,_m1);else return this._r1.process(_l1,_m1);}}class _w1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0}
,{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1},{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_x1){super();this._V();const _q1=_w1.parameterDescriptors.find(_y1=>_y1.name==="attack");const _r1=_w1.parameterDescriptors.find(_y1=>_y1.name==="release");
this._z1=new _n1(_q1.defaultValue,_r1.defaultValue);this._A1=0;}process(_B1,_C1,_D1){const input=_B1[0];const output=_C1[0];const bypass=_D1.bypass;const ingain=_D1.ingain;const outgain=_D1.outgain;const threshold=_D1.threshold;const ratio=_D1.ratio;const attack=_D1.attack;const release=_D1.release;if(input.length===0)return this._W;for(let _11=0;_11<input[0].length;++_11){let frame=input.map(_E1=>_E1[_11]);output.forEach((_E1,_F1)=>{_E1[_11]=frame[_F1];});const _G1=(ingain[_11]!==undefined)?ingain[_11]:ingain[0];
frame=frame.map(_H1=>_H1*=_G1);const rect=frame.map(_H1=>Math.abs(_H1));const max=Math.max(...rect);const _I1=_J1(max);const _K1=(threshold[_11]!==undefined)?threshold[_11]:threshold[0];const _L1=_J1(_K1);const _M1=Math.max(0,_I1-_L1);const _q1=(attack[_11]!==undefined)?attack[_11]:attack[0];const _r1=(release[_11]!==undefined)?release[_11]:release[0];this._z1._u1(_q1);this._z1._v1(_r1);this._A1=this._z1.process(_M1,this._A1);const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];if(_21>0)continue;const _g1=(ratio[_11]!==undefined)?ratio[_11]:ratio[0];
const _N1=(this._A1/_g1)-this._A1;const _71=_O1(_N1);frame=frame.map(_H1=>_H1*=_71);const _P1=(outgain[_11]!==undefined)?outgain[_11]:outgain[0];frame=frame.map(_H1=>_H1*=_P1);output.forEach((_E1,_F1)=>{_E1[_11]=frame[_F1];});}return this._W;}}function _J1(_Q1){return 20*Math.log10(_Q1);}function _O1(_Q1){return Math.pow(10,_Q1/20);}registerProcessor("compressor-processor",_w1);class _R1 extends AudioWorkletProcessor{static _S1=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_R1._S1},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];const _T1=(_R1._S1*sampleRate)+1;this.buffer=new Array(_b1);this._U1=new Uint32Array(_b1);for(let c=0;c<_b1;++c)this.buffer[c]=new Float32Array(_T1);
}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){_61[_11]=_01[_11];const _K1=(time[_11]!==undefined)?time[_11]:time[0];const _V1=this._W1(c,_K1);const _e1=(feedback[_11]!==undefined)?feedback[_11]:feedback[0];const _X1=_01[_11]+(_V1*_e1);this.write(c,_X1);const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];
if(_21>0.0){continue;}const _h1=(mix[_11]!==undefined)?mix[_11]:mix[0];_61[_11]*=(1-_h1);_61[_11]+=(_V1*_h1);}}return this._W;}_W1(_Y1,_j1){const _Z1=_j1*sampleRate;let __1=(this._U1[_Y1]-~~_Z1);let _02=(__1-1);while(__1<0)__1+=this.buffer[_Y1].length;while(_02<0)_02+=this.buffer[_Y1].length;const frac=_Z1-~~_Z1;const _12=this.buffer[_Y1][__1];const _22=this.buffer[_Y1][_02];return _12+(_22-_12)*frac;}write(_Y1,_32){++this._U1[_Y1];this._U1[_Y1]%=this.buffer[_Y1].length;this.buffer[_Y1][this._U1[_Y1]]=_32;
}}registerProcessor("delay-processor",_R1);class _42 extends AudioWorkletProcessor{static get parameterDescriptors(){return [];}constructor(){super();this._V();}process(_52,_62,_72){const input=_52[0];const _82=_62[0];const _92=_62[1];for(let c=0;c<input.length;++c){const _01=input[c];const _a2=_82[c];const _b2=_92[c];for(let _11=0;_11<_01.length;++_11){_a2[_11]=_01[_11];_b2[_11]=_01[_11];}}return this._W;}}class _c2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._V();}process(_52,_62,_72){const _41=_52[0];const _51=_52[1];const output=_62[0];const bypass=_72.bypass;for(let c=0;c<_51.length;++c){const _d2=_41[c];const _e2=_51[c];const _61=output[c];for(let _11=0;_11<_d2.length;++_11){const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];if(_21>0){_61[_11]=_e2[_11];}else {_61[_11]=_d2[_11];}}}return this._W;}}registerProcessor("eq-input",_42);registerProcessor("eq-output",_c2);class _f2 extends AudioWorkletProcessor{
static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._V();}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){_61[_11]=_01[_11];const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];
if(_21>0.0){continue;}const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];_61[_11]*=_71;}}return this._W;}}registerProcessor("gain-processor",_f2);class _g2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _h2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_h2),minValue:10.0,maxValue:_h2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0}
,{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._i2=0;this._j2=0;this._k2=0;this._l2=0;this._m2=0;this._n2=new Float32Array(_b1);this._o2=new Float32Array(_b1);this._p2=new Float32Array(_b1);this._q2=new Float32Array(_b1);this._r2=-1;this._s2=-1;this._t2=-1;}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;
const _u2=(freq.length===1&&q.length===1&&gain.length===1);if(_u2)this._v2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){if(_u2===false){const _e1=(freq[_11]!==undefined)?freq[_11]:freq[0];const _w2=(q[_11]!==undefined)?q[_11]:q[0];const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];this._v2(_e1,_w2,_71);}const _x2=this._k2*_01[_11]+this._l2*this._n2[c]+this._m2*this._o2[c]-this._i2*this._p2[c]-this._j2*this._q2[c];this._o2[c]=this._n2[c];
this._n2[c]=_01[_11];this._q2[c]=this._p2[c];this._p2[c]=_x2;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];_61[_11]=(_21>0)?_01[_11]:_x2;}}return this._W;}_v2(_y2,_z2,_A2){if(_y2===this._r2&&_z2===this._s2&&_A2===this._t2)return;const _B2=2*Math.PI*_y2/sampleRate;const _C2=Math.cos(_B2);const _D2=Math.sqrt(_A2);const _E2=_D2+1;const _F2=_D2-1;const _G2=_E2*_C2;const _H2=_F2*_C2;const _I2=_E2-_H2;const _J2=_E2+_H2;const alpha=Math.sin(_B2)/(2*_z2);const _K2=(2*Math.sqrt(_D2)*alpha);const _L2=_I2+_K2;
const _i2=2*(_F2-_G2);const _j2=_I2-_K2;const _k2=_D2*(_J2+_K2);const _l2=-2*_D2*(_F2+_G2);const _m2=_D2*(_J2-_K2);this._i2=_i2/_L2;this._j2=_j2/_L2;this._k2=_k2/_L2;this._l2=_l2/_L2;this._m2=_m2/_L2;this._r2=_y2;this._s2=_z2;this._t2=_A2;}}registerProcessor("hi-shelf-processor",_g2);class _M2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _N2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(1500.0,
_N2),minValue:10.0,maxValue:_N2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._i2=0;this._j2=0;this._k2=0;this._l2=0;this._m2=0;this._n2=new Float32Array(_b1);this._o2=new Float32Array(_b1);this._p2=new Float32Array(_b1);this._q2=new Float32Array(_b1);this._O2=-1;this._s2=-1;}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;
const q=parameters.q;const _u2=(cutoff.length===1&&q.length===1);if(_u2)this._v2(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){if(_u2===false){const c=(cutoff[_11]!==undefined)?cutoff[_11]:cutoff[0];const _w2=(q[_11]!==undefined)?q[_11]:q[0];this._v2(c,_w2);}const _x2=this._k2*_01[_11]+this._l2*this._n2[c]+this._m2*this._o2[c]-this._i2*this._p2[c]-this._j2*this._q2[c];this._o2[c]=this._n2[c];this._n2[c]=_01[_11];this._q2[c]=this._p2[c];
this._p2[c]=_x2;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];_61[_11]=(_21>0)?_01[_11]:_x2;}}return this._W;}_v2(_P2,_z2){if(_P2===this._O2&&_z2===this._s2)return;const _B2=2*Math.PI*_P2/sampleRate;const alpha=Math.sin(_B2)/(2*_z2);const _C2=Math.cos(_B2);const _L2=1+alpha;const _i2=-2*_C2;const _j2=1-alpha;const _k2=(1+_C2)/2;const _l2=-1-_C2;const _m2=(1+_C2)/2;this._i2=_i2/_L2;this._j2=_j2/_L2;this._k2=_k2/_L2;this._l2=_l2/_L2;this._m2=_m2/_L2;this._O2=_P2;this._s2=_z2;}}registerProcessor("hpf2-processor",
_M2);class _Q2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _h2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_h2),minValue:10.0,maxValue:_h2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];
this._i2=0;this._j2=0;this._k2=0;this._l2=0;this._m2=0;this._n2=new Float32Array(_b1);this._o2=new Float32Array(_b1);this._p2=new Float32Array(_b1);this._q2=new Float32Array(_b1);this._r2=-1;this._s2=-1;this._t2=-1;}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _u2=(freq.length===1&&q.length===1&&gain.length===1);if(_u2)this._v2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){
const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){if(_u2===false){const _e1=(freq[_11]!==undefined)?freq[_11]:freq[0];const _w2=(q[_11]!==undefined)?q[_11]:q[0];const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];this._v2(_e1,_w2,_71);}const _x2=this._k2*_01[_11]+this._l2*this._n2[c]+this._m2*this._o2[c]-this._i2*this._p2[c]-this._j2*this._q2[c];this._o2[c]=this._n2[c];this._n2[c]=_01[_11];this._q2[c]=this._p2[c];this._p2[c]=_x2;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];
_61[_11]=(_21>0)?_01[_11]:_x2;}}return this._W;}_v2(_y2,_z2,_A2){if(_y2===this._r2&&_z2===this._s2&&_A2===this._t2)return;const _B2=2*Math.PI*_y2/sampleRate;const _C2=Math.cos(_B2);const _D2=Math.sqrt(_A2);const _E2=_D2+1;const _F2=_D2-1;const _G2=_E2*_C2;const _H2=_F2*_C2;const _I2=_E2-_H2;const _J2=_E2+_H2;const alpha=Math.sin(_B2)/(2*_z2);const _K2=(2*Math.sqrt(_D2)*alpha);const _L2=_J2+_K2;const _i2=-2*(_F2+_G2);const _j2=_J2-_K2;const _k2=_D2*(_I2+_K2);const _l2=2*_D2*(_F2-_G2);const _m2=_D2*(_I2-_K2);this._i2=_i2/_L2;
this._j2=_j2/_L2;this._k2=_k2/_L2;this._l2=_l2/_L2;this._m2=_m2/_L2;this._r2=_y2;this._s2=_z2;this._t2=_A2;}}registerProcessor("lo-shelf-processor",_Q2);class _R2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _N2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_N2),minValue:10.0,maxValue:_N2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}
];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._i2=0;this._j2=0;this._k2=0;this._l2=0;this._m2=0;this._n2=new Float32Array(_b1);this._o2=new Float32Array(_b1);this._p2=new Float32Array(_b1);this._q2=new Float32Array(_b1);this._O2=-1;this._s2=-1;}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _u2=(cutoff.length===1&&q.length===1);if(_u2)this._v2(cutoff[0],q[0]);for(let c=0;
c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){if(_u2===false){const c=(cutoff[_11]!==undefined)?cutoff[_11]:cutoff[0];const _w2=(q[_11]!==undefined)?q[_11]:q[0];this._v2(c,_w2);}const _x2=this._k2*_01[_11]+this._l2*this._n2[c]+this._m2*this._o2[c]-this._i2*this._p2[c]-this._j2*this._q2[c];this._o2[c]=this._n2[c];this._n2[c]=_01[_11];this._q2[c]=this._p2[c];this._p2[c]=_x2;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];_61[_11]=(_21>0)?_01[_11]:_x2;
}}return this._W;}_v2(_P2,_z2){if(_P2===this._O2&&_z2===this._s2)return;const _B2=2*Math.PI*_P2/sampleRate;const alpha=Math.sin(_B2)/(2*_z2);const _C2=Math.cos(_B2);const _L2=1+alpha;const _i2=-2*_C2;const _j2=1-alpha;const _k2=(1-_C2)/2;const _l2=1-_C2;const _m2=(1-_C2)/2;this._i2=_i2/_L2;this._j2=_j2/_L2;this._k2=_k2/_L2;this._l2=_l2/_L2;this._m2=_m2/_L2;this._O2=_P2;this._s2=_z2;}}registerProcessor("lpf2-processor",_R2);class _S2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _h2=sampleRate*0.45;
return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,_h2),minValue:10.0,maxValue:_h2},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._i2=0;this._j2=0;this._k2=0;this._l2=0;this._m2=0;this._n2=new Float32Array(_b1);this._o2=new Float32Array(_b1);
this._p2=new Float32Array(_b1);this._q2=new Float32Array(_b1);this._r2=-1;this._s2=-1;this._t2=-1;}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _u2=(freq.length===1&&q.length===1&&gain.length===1);if(_u2)this._v2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){if(_u2===false){const _e1=(freq[_11]!==undefined)?freq[_11]:freq[0];
const _w2=(q[_11]!==undefined)?q[_11]:q[0];const _71=(gain[_11]!==undefined)?gain[_11]:gain[0];this._v2(_e1,_w2,_71);}const _x2=this._k2*_01[_11]+this._l2*this._n2[c]+this._m2*this._o2[c]-this._i2*this._p2[c]-this._j2*this._q2[c];this._o2[c]=this._n2[c];this._n2[c]=_01[_11];this._q2[c]=this._p2[c];this._p2[c]=_x2;const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];_61[_11]=(_21>0)?_01[_11]:_x2;}}return this._W;}_v2(_y2,_z2,_A2){if(_y2===this._r2&&_z2===this._s2&&_A2===this._t2)return;const _B2=2*Math.PI*_y2/sampleRate;
const _C2=Math.cos(_B2);const _D2=Math.sqrt(_A2);const alpha=Math.sin(_B2)/(2*_z2);const _T2=alpha/_D2;const _U2=alpha*_D2;const _L2=1+_T2;const _i2=-2*_C2;const _j2=1-_T2;const _k2=1+_U2;const _l2=_i2;const _m2=1-_U2;this._i2=_i2/_L2;this._j2=_j2/_L2;this._k2=_k2/_L2;this._l2=_l2/_L2;this._m2=_m2/_L2;this._r2=_y2;this._s2=_z2;this._t2=_A2;}}registerProcessor("peak-eq-processor",_S2);class _V2{constructor(_W2){this._X2=0;this._Y2=0;this.feedback=0;this._Z2=0;this.buffer=new Float32Array(_W2);this.__2=0;}process(_32){
const out=this.buffer[this.__2];this._Z2=(this._Z2*this._X2)+(out*this._Y2);this.buffer[this.__2]=_32+(this._Z2*this.feedback);++this.__2;this.__2%=this.buffer.length;return out;}_03(_13){this.feedback=Math.min(Math.max(0,_13),1);}_23(_33){this._X2=Math.min(Math.max(0,_33),1);this._Y2=1-this._X2;}}class _43{constructor(_W2){this.feedback=0;this.buffer=new Float32Array(_W2);this.__2=0;}process(_32){const out=this.buffer[this.__2];this.buffer[this.__2]=_32+(out*this.feedback);++this.__2;this.__2%=this.buffer.length;
return(out-_32);}_03(_13){this.feedback=Math.min(Math.max(0,_13),1);}}class _53 extends AudioWorkletProcessor{static _63=8;static _73=4;static _83=0.015;static _93=0.4;static _a3=0.28;static _b3=0.7;static _c3=[1116,1188,1277,1356,1422,1491,1557,1617];static _d3=[1139,1211,1300,1379,1445,1514,1580,1640];static _e3=[556,441,341,225];static _f3=[579,464,364,248];static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",
defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._g3=-1;this._h3=-1;this._i3=new Array(_b1);this._j3=new Array(_b1);const _k3=[_53._c3,_53._d3];const _l3=[_53._e3,_53._f3];for(let c=0;c<_b1;++c){this._i3[c]=new Array(_53._63);this._j3[c]=new Array(_53._73);for(let i=0;i<_53._63;
++i)this._i3[c][i]=new _V2(_k3[c%_k3.length][i]);for(let i=0;i<_53._73;++i)this._j3[c][i]=new _43(_l3[c%_l3.length][i]);}this._m3(0.5);this._23(0.5);for(let c=0;c<_b1;++c)for(let i=0;i<_53._73;++i)this._j3[c][i]._03(0.5);}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _n3=0;_n3<_01.length;++_n3){const _11=(size[_n3]!==undefined)?size[_n3]:size[0];
const _o3=(damp[_n3]!==undefined)?damp[_n3]:damp[0];this._m3(_11);this._23(_o3);_61[_n3]=_01[_n3];let out=0;const _f1=_01[_n3]*_53._83;for(let i=0;i<_53._63;++i)out+=this._i3[c][i].process(_f1);for(let i=0;i<_53._73;++i)out=this._j3[c][i].process(out);const _21=(bypass[_n3]!==undefined)?bypass[_n3]:bypass[0];if(_21>0.0){continue;}const _h1=(mix[_n3]!==undefined)?mix[_n3]:mix[0];_61[_n3]*=(1-_h1);_61[_n3]+=(out*_h1);}}return this._W;}_m3(_W2){if(_W2===this._g3)return;const size=(_W2*_53._a3)+_53._b3;for(let c=0;
c<this._i3.length;++c)for(let i=0;i<_53._63;++i)this._i3[c][i]._03(size);this._g3=_W2;}_23(_33){if(_33===this._h3)return;const damp=_33*_53._93;for(let c=0;c<this._i3.length;++c)for(let i=0;i<_53._63;++i)this._i3[c][i]._23(damp);this._h3=_33;}}registerProcessor("reverb1-processor",_53);class _p3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,
maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_a1){super();this._V();const _b1=_a1.outputChannelCount[0];this._q3=new Array(_b1).fill(1.0);this._r3=new Array(_b1).fill(0.0);this._s3=new Array(_b1).fill(_t3._u3._v3);this._w3=new Array(_b1);for(let c=0;c<_b1;++c){this._w3[c]=new _x3();
this._w3[c]._y3(sampleRate);this._w3[c]._z3(this._q3[c]);this._w3[c]._A3(this._s3[c]);if(c%2===1){this._w3[c]._B3(this._r3[c]);}}}process(_Z,__,parameters){const input=_Z[0];const output=__[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _01=input[c];const _61=output[c];for(let _11=0;_11<_01.length;++_11){_61[_11]=_01[_11];const _g1=(rate[_11]!==undefined)?rate[_11]:rate[0];
const _C3=(offset[_11]!==undefined)?offset[_11]:offset[0];const _D3=(shape[_11]!==undefined)?shape[_11]:shape[0];this._E3(c,_g1,_C3,_D3);const _F3=this._w3[c]._W1();const _21=(bypass[_11]!==undefined)?bypass[_11]:bypass[0];if(_21>0.0){continue;}const i=(intensity[_11]!==undefined)?intensity[_11]:intensity[0];const out=_01[_11]*_F3*i;_61[_11]*=(1.0-i);_61[_11]+=out;}}return this._W;}_E3(_Y1,_G3,_H3,_I3){if(_G3!==this._q3[_Y1]){this._w3[_Y1]._z3(_G3);this._q3[_Y1]=_G3;}if(_H3!==this._r3[_Y1]){if(_Y1%2===1){
this._w3[_Y1]._B3(_H3);}this._r3[_Y1]=_H3;}if(_I3!==this._s3[_Y1]){this._w3[_Y1]._A3(_I3);this._s3[_Y1]=_I3;}}}registerProcessor("tremolo-processor",_p3);function _t3(){}_t3._u3={_v3:0,_J3:1,_K3:2,_L3:3,_M3:4,_N3:5};_t3._O3=function(_P3){return 1.0-_P3;};_t3._Q3=function(_P3){return _P3;};_t3._R3=function(_P3){return 0.5*(Math.sin((_P3*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_t3._S3=function(_P3){if(_P3<0.5){return 0.0;}return 1.0;};_t3._T3=function(_P3){if(_P3<0.5){return 2.0*_P3;}return 2.0-(2.0*_P3);};_t3._U3=[_t3._O3,
_t3._Q3,_t3._R3,_t3._S3,_t3._T3];_V3._W3=512;_V3._X3=1.0/_V3._W3;function _V3(_Y3){this.data=new Float32Array(_V3._W3);for(let i=0;i<_V3._W3;++i){this.data[i]=_Y3(i*_V3._X3);}}_V3.prototype._W1=function(_P3){_P3=Math.max(0.0,_P3);_P3=Math.min(_P3,1.0);const _Z3=_P3*_V3._W3;const __3=~~_Z3;const _04=_Z3-__3;let __1=__3;let _02=__1+1;if(__1>=_V3._W3){__1-=_V3._W3;}if(_02>=_V3._W3){_02-=_V3._W3;}const _12=this.data[__1];const _22=this.data[_02];return _12+(_22-_12)*_04;};_x3._14=[];_x3._24=false;_x3._34=0.0;_x3._h2=20.0;
function _x3(){this._44=48000;this.shape=_t3._u3._K3;this.freq=1.0;this._54=0.0;this._X3=0.0;this._64=0.0;if(_x3._24==true){return;}for(let i=0;i<_t3._u3._N3;++i){_x3._14[i]=new _V3(_t3._U3[i]);}_x3._24=true;}_x3._74=function(){return(_x3._24==true);};_x3.prototype._y3=function(_84){this._44=_84;this._94();};_x3.prototype._z3=function(_y2){_y2=Math.max(_x3._34,_y2);_y2=Math.min(_y2,_x3._h2);this.freq=_y2;this._94();};_x3.prototype._B3=function(_H3){_H3=Math.max(0.0,_H3);_H3=Math.min(_H3,1.0);const _a4=_H3-this._64;
this._64=_H3;this._54+=_a4;while(this._54>=1.0){this._54-=1.0;}while(this._54<0.0){this._54+=1.0;}};_x3.prototype._A3=function(_I3){_I3=Math.max(0,_I3);_I3=Math.min(_I3,_t3._u3._N3-1);this.shape=_I3;};_x3.prototype._W1=function(){const result=_x3._14[this.shape]._W1(this._54);this._54+=this._X3;while(this._54>=1.0){this._54-=1.0;}return result;};_x3.prototype._94=function(){this._X3=this.freq/this._44;};