import {upPhotos} from './up.js?v=up-concept-v20';
let dispose=()=>{};
export function openUpGallery(dialog,initial=0){
 dispose();const controller=new AbortController(),{signal}=controller;const origin=document.activeElement;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let index=-1,version=0,touchX=null;
 const path=i=>'assets/photos/up/'+upPhotos[i][0];
 const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
 dialog.classList.add('up-gallery-dialog');dialog.setAttribute('data-lenis-prevent','');
 dialog.innerHTML=`<div class="ug-shell"><header class="ug-header"><div><span class="ug-eyebrow">Residencial UP · Sorocaba</span><h2 id="dialog-title">Galeria do empreendimento</h2></div><button class="ug-close" type="button" aria-label="Fechar galeria"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button></header><div class="ug-stage" aria-busy="true"><div class="ug-image-host"></div><button class="ug-arrow ug-prev" type="button" aria-label="Imagem anterior">${arrow}</button><button class="ug-arrow ug-next" type="button" aria-label="Próxima imagem">${arrow}</button></div><div class="ug-caption" aria-live="polite" aria-atomic="true"><div><span class="ug-caption-label">Um olhar mais próximo</span><p class="ug-photo-title"></p></div><span class="ug-count"></span></div><nav class="ug-thumbnails" aria-label="Escolher foto">${upPhotos.map(([name,title],i)=>`<button type="button" data-ug-index="${i}" aria-label="Foto ${i+1}: ${title}" aria-pressed="false"><img src="${path(i)}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('')}</nav><div class="ug-hint"><span>Fotografias do anúncio A12</span><span>← → para navegar · Esc para fechar</span></div></div>`;
 const host=dialog.querySelector('.ug-image-host'),stage=dialog.querySelector('.ug-stage');
 const show=async next=>{
  index=(next+upPhotos.length)%upPhotos.length;const current=index,token=++version;
  dialog.querySelector('.ug-photo-title').textContent=upPhotos[current][1];dialog.querySelector('.ug-count').innerHTML=`<strong>${String(current+1).padStart(2,'0')}</strong><span>/ ${String(upPhotos.length).padStart(2,'0')}</span>`;
  dialog.querySelectorAll('[data-ug-index]').forEach((button,i)=>{button.setAttribute('aria-pressed',String(i===current));if(i===current)button.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});});
  stage.setAttribute('aria-busy','true');const image=new Image();image.alt=upPhotos[current][1];image.src=path(current);image.decoding='async';
  try{await image.decode();}catch{}if(token!==version||signal.aborted)return;
  const previous=[...host.children];host.append(image);stage.setAttribute('aria-busy','false');
  if(!reduced.matches){const animation=image.animate([{opacity:0,transform:'scale(1.018)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});animation.finished.then(()=>previous.forEach(e=>e.remove())).catch(()=>{});}else previous.forEach(e=>e.remove());
  const preload=new Image();preload.src=path((current+1)%upPhotos.length);
 };
 const close=()=>dialog.close();
 dialog.querySelector('.ug-close').addEventListener('click',close,{signal});
 dialog.querySelector('.ug-prev').addEventListener('click',()=>show(index-1),{signal});dialog.querySelector('.ug-next').addEventListener('click',()=>show(index+1),{signal});
 dialog.querySelectorAll('[data-ug-index]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.ugIndex)),{signal}));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1));}if(e.key==='Home'){e.preventDefault();show(0);}if(e.key==='End'){e.preventDefault();show(upPhotos.length-1);}},{signal});
 stage.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true,signal});stage.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(dx)>50)show(index+(dx<0?1:-1));},{passive:true,signal});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}},{signal});
 const cleanup=()=>{controller.abort();version++;document.documentElement.classList.remove('up-gallery-open');dialog.classList.remove('up-gallery-dialog');dialog.removeAttribute('data-lenis-prevent');window.dispatchEvent(new CustomEvent('up-gallery:toggle',{detail:false}));if(origin?.isConnected)origin.focus({preventScroll:true});dispose=()=>{};};
 dialog.addEventListener('close',cleanup,{once:true,signal});window.addEventListener('hashchange',close,{once:true,signal});
 dispose=()=>{if(dialog.open)dialog.close();cleanup();};
 document.documentElement.classList.add('up-gallery-open');dialog.showModal();window.dispatchEvent(new CustomEvent('up-gallery:toggle',{detail:true}));
 if(!reduced.matches)dialog.animate([{opacity:0,transform:'translateY(16px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'});
 show(initial);dialog.querySelector('.ug-close').focus({preventScroll:true});
}
