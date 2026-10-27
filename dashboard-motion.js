import {playNumberTick} from './interaction-sounds.js?v=number-ticks-v2';
export function mountDashboardMotion(root){
 if(!root.querySelector('.client-insights'))return ()=>{};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),controller=new AbortController(),active=new Map(),queued=new Set();let disposed=false;
 const settle=()=>{for(const [el,task] of active){cancelAnimationFrame(task.frame);task.finish();}active.clear();};
 const animate=section=>{if(disposed||reduced.matches||document.hidden)return;
  const elements=section.querySelectorAll('.stat-value,.insight-total,.income-project>strong,.wealth-allocation dd strong,.wealth-allocation dd span');
  elements.forEach((el,index)=>{const final=el.textContent,value=Number(final.replace(/[^\d,-]/g,'').replace(',','.'));if(!Number.isFinite(value))return;const percent=final.includes('%'),start=performance.now()+Math.min(index*45,180),task={frame:0,finish:()=>{el.textContent=final;}};el.setAttribute('aria-label',final);active.set(el,task);
   const frame=now=>{if(disposed)return;const t=Math.max(0,Math.min(1,(now-start)/1450)),eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,current=value*eased;const next=percent?current.toLocaleString('pt-BR',{maximumFractionDigits:2})+'%':current.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});if(next!==el.textContent){el.textContent=next;playNumberTick(t);}if(t<1)task.frame=requestAnimationFrame(frame);else{task.finish();active.delete(el);}};task.frame=requestAnimationFrame(frame);
  });
  section.querySelectorAll('.insight-track i,.wealth-bar').forEach((el,index)=>{const effect=el.animate([{transform:'scaleX(0)',opacity:.5},{transform:'scaleX(1)',opacity:1}],{duration:1100,delay:index*90,easing:'cubic-bezier(.22,1,.36,1)'});const task={frame:0,finish:()=>effect.cancel()};active.set(el,task);effect.onfinish=()=>active.delete(el);});
 };
 const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);queued.delete(e.target);animate(e.target);}},{threshold:.15});
 root.querySelectorAll('.stats,.client-insight').forEach(el=>{queued.add(el);observer.observe(el);});
 reduced.addEventListener('change',()=>{if(reduced.matches)settle();},{signal:controller.signal});document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();},{signal:controller.signal});
 return ()=>{disposed=true;controller.abort();observer.disconnect();queued.clear();settle();};
}

