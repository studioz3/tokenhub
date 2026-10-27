import assert from 'node:assert/strict';
import fs from 'node:fs';
let clock=1000,starts=0,allocations=0;const buffers=[];
const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}});
const node=()=>({connect(){},disconnect(){},gain:param(),frequency:param(),start(){starts++;},stop(){}});
class AudioMock{constructor(){this.state='running';this.sampleRate=48000;this.currentTime=0;this.destination={};}createGain(){return node();}createOscillator(){return node();}createBiquadFilter(){return node();}createBufferSource(){return node();}createBuffer(_channels,length){allocations++;const data=new Float32Array(length),buffer={getChannelData:()=>data};buffers.push(data);return buffer;}async resume(){this.state='running';}async suspend(){this.state='suspended';}}
globalThis.window={AudioContext:AudioMock};globalThis.document={hidden:false,querySelectorAll:()=>[]};globalThis.localStorage={getItem:()=> 'on',setItem(){}};Object.defineProperty(globalThis,'performance',{value:{now:()=>clock},configurable:true});
const source=fs.readFileSync(new URL('./interaction-sounds.js',import.meta.url),'utf8');
const url='data:text/javascript;base64,'+Buffer.from(source).toString('base64');const sound=await import(url);
await sound.playInteractionSound('confirm');clock=1200;const initial=starts;
for(let i=0;i<30;i++)sound.playNumberTick(.5);assert.equal(starts-initial,1,'Concurrent counters share one tick');
clock=1280;sound.playNumberTick(.5);assert.equal(starts-initial,1);clock=1290;sound.playNumberTick(.5);assert.equal(starts-initial,2);
const allocated=allocations;for(let i=0;i<30;i++){clock+=100;sound.playNumberTick(.5);}assert.equal(allocations,allocated,'Reuse the ten cached clicks');assert.equal(allocated,11,'One interaction buffer plus ten click variations');
const before=starts;document.hidden=true;clock+=200;sound.playNumberTick(.5);assert.equal(starts,before);document.hidden=false;sound.playNumberTick(1);assert.equal(starts,before);
assert.ok(buffers.every(data=>data.every(n=>Number.isFinite(n)&&Math.abs(n)<=1)));
localStorage.getItem=()=> 'off';const muted=await import(url+'#muted');clock+=1000;muted.playNumberTick(.5);assert.equal(starts,before);
console.log('Number audio: concurrency limit, cached ten variations, hidden/muted states and sample bounds passed.');
