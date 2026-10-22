// Shared, dependency-free effects. Financial values always settle on their source text.
export function mountVfx(root){
 const controller=new AbortController(),{signal}=controller;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const seen=new WeakSet(),running=new Set();let disposed=false,pointerFrame=0,pointerEvent,activeCard;
 const stopped=()=>reduced.matches||root.classList.contains('motion-paused');
 const settle=()=>{for(const finish of [...running])finish();};
 const animate=(element,frames,options)=>{
  const animation=element.animate(frames,options);
  const finish=()=>{animation.cancel();running.delete(finish);};running.add(finish);
  animation.finished.then(finish,()=>running.delete(finish));
 };
 const count=(element)=>{
  // Only direct numeric text is animated; currency signs and units stay fixed.
  const node=[...element.childNodes].find(n=>n.nodeType===3&&/\d/.test(n.nodeValue));if(!node)return;
  const original=node.nodeValue,match=original.match(/\d[\d.,]*/);if(!match)return;
  const raw=match[0],value=Number(raw.replace(/\./g,'').replace(',','.'));
  if(!Number.isFinite(value)||value<=0)return;
  const decimals=raw.includes(',')?raw.split(',')[1].length:0;
  const format=new Intl.NumberFormat('pt-BR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
  const previousLabel=element.getAttribute('aria-label');element.setAttribute('aria-label',element.textContent.trim());
  const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.className='vfx-number';
  visual.textContent=original;node.replaceWith(visual);
  let frame=0,start;
  const finish=()=>{cancelAnimationFrame(frame);visual.replaceWith(node);node.nodeValue=original;if(previousLabel===null)element.removeAttribute('aria-label');else element.setAttribute('aria-label',previousLabel);running.delete(finish);};
  running.add(finish);
  const tick=time=>{if(disposed||stopped()||!element.isConnected){finish();return;}start??=time;const p=Math.min(1,(time-start)/1100),eased=1-Math.pow(1-p,3);visual.textContent=original.replace(raw,format.format(value*eased));if(p<1)frame=requestAnimationFrame(tick);else finish();};
  frame=requestAnimationFrame(tick);
 };
 const selector='.catalog-facts,.offer-metrics,.catalog-funding,.offer-card .progress,.up-fact-strip,.cta-band,.auth-form';
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;observer.unobserve(el);if(stopped())continue;
  if(el.matches('.catalog-facts,.offer-metrics,.up-fact-strip'))el.querySelectorAll('dd,.num,strong').forEach(count);
  if(el.matches('.catalog-funding')){const value=el.querySelector('strong');if(value)count(value);}
  const bar=el.matches('.progress')?el.querySelector('span'):el.querySelector('.progress>span');
  if(bar)animate(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:1300,easing:'cubic-bezier(.22,1,.36,1)'});
  if(el.matches('.cta-band,.auth-form'))animate(el,[{opacity:.4,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,easing:'cubic-bezier(.22,1,.36,1)'});
 }},{threshold:.25});
 const scan=scope=>{const elements=[...(scope.matches?.(selector)?[scope]:[]),...scope.querySelectorAll(selector)];for(const el of elements){if(seen.has(el))continue;seen.add(el);observer.observe(el);}};scan(root);
 // Re-filtered offers receive the same effects without remounting the page.
 const mutations=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1&&!node.matches('[aria-hidden="true"]'))scan(node);});
 mutations.observe(root,{childList:true,subtree:true});
 const reset=()=>{activeCard?.classList.remove('vfx-lit');activeCard?.style.removeProperty('--vfx-x');activeCard?.style.removeProperty('--vfx-y');activeCard=null;};
 root.addEventListener('pointermove',event=>{if(stopped()||!fine.matches)return;pointerEvent=event;if(pointerFrame)return;pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;const card=pointerEvent.target.closest('.catalog-card');if(card!==activeCard){reset();activeCard=card;}if(!card)return;const box=card.getBoundingClientRect();card.style.setProperty('--vfx-x',`${pointerEvent.clientX-box.left}px`);card.style.setProperty('--vfx-y',`${pointerEvent.clientY-box.top}px`);card.classList.add('vfx-lit');});},{passive:true,signal});
 root.addEventListener('pointerleave',reset,{signal});
 reduced.addEventListener('change',()=>{if(reduced.matches){settle();reset();}},{signal});
 root.querySelector('[data-motion-toggle]')?.addEventListener('click',()=>{if(stopped()){settle();reset();}},{signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();},{signal});
 return ()=>{disposed=true;controller.abort();observer.disconnect();mutations.disconnect();cancelAnimationFrame(pointerFrame);settle();reset();};
}
