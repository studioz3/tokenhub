import assert from 'node:assert/strict';
import {lessons,renderAcademy,gradeQuiz} from '../academy.js';
import {learningVisual,visualIds,walletSegments,walletComposition} from '../academy-visuals.js';
assert.equal(visualIds.length,6);
for(const id of visualIds){
 const visual=learningVisual(id);
 assert(visual.includes(`<figure class="academy-visual" aria-labelledby="av-${id}-title">`));
 assert(visual.includes(`<h3 id="av-${id}-title">`));
 assert.equal((visual.match(/<details /g)||[]).length,1);
 assert(visual.includes('<figcaption>'));
 assert(!visual.includes('<img'));
 assert(!visual.includes('NaN'));
}
assert.equal(learningVisual('unknown'),'');
for(const lesson of lessons){
 const html=renderAcademy(lesson.id);
 assert.equal((html.match(/<figure class="academy-visual"/g)||[]).length,2,lesson.id);
 assert.equal((html.match(/<details class="academy-visual-check"/g)||[]).length,2,lesson.id);
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,'Duplicate accessible IDs');
 assert.equal(gradeQuiz(lesson,lesson.quiz.map(q=>q[2])).filter(q=>q.correct).length,3);
 for(const section of lesson.sections)assert(html.includes(`id="academy-${section[0]}"`));
}
assert.equal(walletComposition.reduce((sum,x)=>sum+x.value,0),135500);
const segments=walletSegments();
assert(Math.abs(segments.reduce((sum,x)=>sum+x.pct,0)-100)<1e-9);
assert.equal(segments[0].offset,0);
assert(Math.abs(segments[2].offset+segments[2].pct-100)<1e-9);
assert.equal(segments.map(s=>s.pct.toFixed(1)).join(','),'20.3,73.8,5.9');
assert(learningVisual('timeline').includes('Sem pagamento'));
assert(learningVisual('costs').includes('Antes de tributos'));
assert(learningVisual('credited').includes('já incluídos nesse saldo'));
console.log('PASS: six accessible vector explanations, two per lesson, six self-explanation prompts, exact chart proportions and existing quiz scoring.');
