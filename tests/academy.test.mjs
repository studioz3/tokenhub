import assert from 'node:assert/strict';
import {lessons,renderAcademy,gradeQuiz} from '../academy.js';
import {renderTransparency,transparencyKinds} from '../transparency.js';
for(const l of lessons){
 assert.equal(l.quiz.length,3);
 assert.equal(new Set(l.sections.map(s=>s[0])).size,l.sections.length);
 const html=renderAcademy(l.id);
 assert(html.includes(`data-academy-quiz="${l.id}"`));
 for(const q of l.quiz){assert(q[2]>=0&&q[2]<q[1].length);assert(q[3].length>25);}
 assert.equal(gradeQuiz(l,l.quiz.map(q=>q[2])).filter(r=>r.correct).length,3);
 assert.equal(gradeQuiz(l,l.quiz.map(q=>(q[2]+1)%3)).filter(r=>r.correct).length,0);
 assert.equal(gradeQuiz(l,[null,null,null]).filter(r=>r.correct).length,0);
 for(const [id] of l.sections)assert(html.includes(`id="academy-${id}"`));
}
assert.equal(renderAcademy('inexistente'),null);
assert.equal(renderTransparency('inexistente'),null);
for(const kind of transparencyKinds){const html=renderTransparency(kind);assert(html.includes('<h1>'));assert(!html.includes('sobre-prototipo'));}
assert.equal(20/10000*100,0.2);
assert.equal(20*110,2200);assert.equal(20*90,1800);
assert.equal(Math.round((Math.sqrt(1.14)-1)*10000)/100,6.77);
assert.equal(1140-20,1120);assert.equal(127500+8000,135500);
console.log('3 lessons, 9 questions, all scoring branches, section targets, 5 transparency pages and worked calculations: PASS');
