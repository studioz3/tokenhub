import assert from 'node:assert/strict';
import {nextHeroIndex,renderHomeBackdrop} from '../site-experience.js';
assert.equal(nextHeroIndex(null),0);assert.equal(nextHeroIndex('0'),1);assert.equal(nextHeroIndex('1'),0);assert.equal(nextHeroIndex('unexpected'),0);
const values=new Map();globalThis.localStorage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
const first=renderHomeBackdrop(),second=renderHomeBackdrop(),third=renderHomeBackdrop();
assert(first.includes('data-hero-start="0"'));assert(second.includes('data-hero-start="1"'));assert(third.includes('data-hero-start="0"'));
for(const html of [first,second]){assert.equal((html.match(/data-hero-frame/g)||[]).length,2);assert.equal((html.match(/fetchpriority="high"/g)||[]).length,1);assert.equal((html.match(/data-hero-src=/g)||[]).length,1);assert.equal((html.match(/data-hero-srcset=/g)||[]).length,1);assert(html.includes('aria-hidden="true"'));}
globalThis.localStorage={getItem:()=>{throw Error('Storage blocked');}};assert(renderHomeBackdrop().includes('data-hero-start="0"'));
delete globalThis.localStorage;
console.log('PASS: alternating initial scene, matching mobile/desktop assets, deferred second frame and blocked-storage fallback.');
