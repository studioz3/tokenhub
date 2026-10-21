let paused=false;
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');

export function mountMotion(root){
 const controller=new AbortController(),{signal}=controller;
 const observers=[],animations=new Set();let disposeScene=()=>{},disposed=false;
 let sceneAPI,selectedAsset=-1;
 const toggle=root.querySelector('[data-motion-toggle]');
 const setButton=()=>{if(!toggle)return;const stopped=paused||preference.matches;toggle.setAttribute('aria-pressed',String(stopped));toggle.disabled=preference.matches;toggle.innerHTML=`<span aria-hidden="true">${stopped?'▷':'Ⅱ'}</span> ${preference.matches?'Movimento reduzido':paused?'Ativar movimento':'Pausar movimento'}`;root.classList.toggle('motion-paused',stopped);};
 const sceneHost=root.querySelector('[data-hero-scene]');
 let loaded=false;
 const startScene=async()=>{if(loaded||!sceneHost||preference.matches||disposed)return;loaded=true;
  try{const {createHeroScene}=await import('./scene.js');if(disposed)return;sceneAPI=createHeroScene(sceneHost,{paused});disposeScene=()=>sceneAPI.dispose();sceneAPI.setPaused(paused);if(selectedAsset>=0)sceneAPI.focusAsset?.(selectedAsset);}catch{sceneHost.dataset.sceneState='fallback';}
 };
 const stopAnimations=()=>{for(const animation of animations)animation.finish();animations.clear();};
 toggle?.addEventListener('click',()=>{paused=!paused;setButton();sceneAPI?.setPaused(paused||preference.matches);if(paused)stopAnimations();else startScene();},{signal});
 preference.addEventListener('change',()=>{setButton();sceneAPI?.setPaused(paused||preference.matches);if(preference.matches)stopAnimations();else startScene();},{signal});setButton();
 root.querySelectorAll('[data-scene-asset]').forEach(button=>button.addEventListener('click',()=>{selectedAsset=Number(button.dataset.sceneAsset);root.querySelectorAll('[data-scene-asset]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));const caption=root.querySelector('[data-scene-caption]');if(caption)caption.textContent=['Ativos imobiliários','Energia renovável','Ativos digitais'][selectedAsset];sceneAPI?.focusAsset?.(selectedAsset);},{signal}));
 if(sceneHost){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))startScene();},{rootMargin:'120px'});observer.observe(sceneHost);observers.push(observer);}

 if(!preference.matches&&!paused){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);if(paused||preference.matches)continue;const element=entry.target;const delay=Number(element.dataset.motionOrder||0)*65;
   const animation=element.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});animations.add(animation);animation.finished.finally(()=>animations.delete(animation)).catch(()=>{});
  }},{threshold:.08});
  root.querySelectorAll('.hero-copy,.hero-visual,.section-head,.step-card,.trust-point,.offer-card,.article-card,.stat,.return-copy,.simulation-console').forEach((element,i)=>{element.dataset.motionOrder=String(element.classList.contains('offer-card')?i%3:0);observer.observe(element);});observers.push(observer);
 }

 const resetCard=card=>{if(!card)return;card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');card.classList.remove('pointer-tilt');};let activeCard;
 root.addEventListener('pointermove',e=>{if(paused||preference.matches||!finePointer.matches)return;const card=e.target.closest('.offer-card');if(card!==activeCard){resetCard(activeCard);activeCard=card;}if(!card)return;const r=card.getBoundingClientRect();card.classList.add('pointer-tilt');card.style.setProperty('--tilt-y',((e.clientX-r.left)/r.width-.5)*5+'deg');card.style.setProperty('--tilt-x',-((e.clientY-r.top)/r.height-.5)*4+'deg');},{signal,passive:true});
 root.addEventListener('pointerleave',()=>{resetCard(activeCard);activeCard=null;},{signal});
 return ()=>{disposed=true;controller.abort();observers.forEach(o=>o.disconnect());for(const animation of animations)animation.cancel();animations.clear();resetCard(activeCard);disposeScene();};
}
