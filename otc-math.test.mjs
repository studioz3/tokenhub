import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./otc-math.js',import.meta.url),'utf8');
const {calculateOtc}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.deepEqual(calculateOtc(100,'pay',500,100),{pay:100,gross:500,cost:5,net:495,rate:5});
assert.deepEqual(calculateOtc(100,'pay',100,500),{pay:100,gross:20,cost:.2,net:19.8,rate:.2});
for(const prices of [[500,100],[100,500]])for(const desired of [1,19.8,100,495,1500,18500]){const q=calculateOtc(desired,'receive',...prices);assert.ok(q.net>=desired);assert.ok(Math.abs(q.gross-q.cost-q.net)<1e-8);assert.ok(q.cost>=q.gross*.01-1e-8);const again=calculateOtc(q.pay,'pay',...prices);assert.deepEqual(q,again);}
assert.equal(calculateOtc(0,'pay',500,100).net,0);
for(const value of [NaN,Infinity,-1,1000001,1.001])assert.equal(calculateOtc(value,'pay',500,100),null);
assert.equal(calculateOtc(10,'pay',500,0),null);
assert.equal(calculateOtc(1500,'pay',500,100).net,7425);
assert.equal(calculateOtc(18500,'pay',100,500).net,3663);
console.log('OTC: conversão nos dois sentidos, taxa, arredondamento, limites e valores inválidos aprovados.');
