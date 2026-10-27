import assert from 'node:assert/strict';
import fs from 'node:fs';
const load=async name=>import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(new URL(name,import.meta.url),'utf8')).toString('base64'));
const {createVariationBag,soundVariations}=await load('./interaction-sounds.js');
assert.equal(soundVariations.length,10);assert.equal(new Set(soundVariations.map(v=>v.cents)).size,10);
for(const random of [()=>0,()=>.999,Math.random]){const next=createVariationBag(random);let previous=null;for(let cycle=0;cycle<8;cycle++){const batch=Array.from({length:10},()=>next());assert.equal(new Set(batch).size,10);assert.notEqual(batch[0],previous);previous=batch.at(-1);}}
assert.ok(soundVariations.every(v=>v.level<=1.1&&v.duration>=.9&&v.duration<=1.1));
const {projectSimpleInterest,renderSimulator}=await load('./simulator.js');
assert.equal(projectSimpleInterest(44500,20,18),57850);assert.ok(Math.abs(projectSimpleInterest(44500,20,32)-68233.33333333)<.00001);assert.equal(projectSimpleInterest(44500,20,48),80100);
const html=renderSimulator();assert.ok(!html.includes('simulation-result-line'));assert.equal((html.match(/class="simulation-result"/g)||[]).length,3);assert.equal((html.match(/id="calc-gain-/g)||[]).length,3);
console.log('Verificados: dez variações sem repetição por ciclo, limites de intensidade e comparação dos três prazos.');
