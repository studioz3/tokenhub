// Page-scoped motion: remove all observers, timelines and scroll smoothing on navigation.
export function mountAboutMotion(root){
 const host=root.querySelector('.site-header');if(!host)return ()=>{};
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let context,lenis,tick;let selected=0;const controller=new AbortController();
 root.querySelector('.about-vision-link')?.addEventListener('click',event=>{event.preventDefault();const target=root.querySelector('#tokenhub-visao');if(lenis)lenis.scrollTo(target,{offset:-90});else target.scrollIntoView({behavior:media.matches?'instant':'smooth'});},{signal:controller.signal});
 const tabs=[...root.querySelectorAll('[data-discovery]')];
 const select=(index,focus=false)=>{if(index===selected){if(focus)tabs[index]?.focus();return;}selected=index;tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;const panel=root.querySelector(`#discovery-panel-${i}`);if(panel)panel.hidden=i!==index;});if(focus)tabs[index]?.focus();const panel=root.querySelector(`#discovery-panel-${index} .discovery-preview`);if(panel&&!media.matches)window.gsap?.fromTo(panel,{y:14,opacity:0},{y:0,opacity:1,duration:.35,clearProps:'all'});};
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>jumpDiscovery(i),{signal:controller.signal});tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();jumpDiscovery(next,true);}},{signal:controller.signal});});
 root.querySelector('[data-discovery-next]')?.addEventListener('click',()=>jumpDiscovery((selected+1)%tabs.length),{signal:controller.signal});
 root.querySelectorAll('[data-step-jump]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const target=root.querySelector(`#how-step-${link.dataset.stepJump}`);if(lenis)lenis.scrollTo(target,{offset:-115});else target?.scrollIntoView({behavior:media.matches?'instant':'smooth'});},{signal:controller.signal}));
 const discoveryLine=()=>matchMedia('(max-width:760px)').matches?Math.min(innerHeight-60,460):innerHeight*.6;
 const jumpDiscovery=(index,focus=false)=>{select(index,focus);const target=tabs[index];if(!target)return;const top=target.getBoundingClientRect().top+scrollY-discoveryLine()+20;if(lenis)lenis.scrollTo(top,{immediate:true});else window.scrollTo({top,behavior:'instant'});};
 const syncDiscovery=()=>{if(!tabs.length)return;let index=0;tabs.forEach((tab,i)=>{if(tab.getBoundingClientRect().top<=discoveryLine())index=i;});if(index!==selected)select(index);};
 const stepNodes=[...root.querySelectorAll('.how-step')],stepLinks=[...root.querySelectorAll('[data-step-jump]')];
 const activate=index=>{stepNodes.forEach((node,i)=>node.classList.toggle('is-active',i===index));stepLinks.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});};activate(0);
 // Derive the active step from current geometry, including reverse scroll and large jumps.
 const syncSteps=()=>{if(!stepNodes.length)return;const readingLine=innerHeight*.5;let index=0;stepNodes.forEach((node,i)=>{if(node.getBoundingClientRect().top<=readingLine)index=i;});activate(index);const first=stepNodes[0].getBoundingClientRect(),last=stepNodes.at(-1).getBoundingClientRect();const progress=Math.min(1,Math.max(0,(readingLine-first.top)/(last.top-first.top||1)));const bar=root.querySelector('.how-progress > span');if(bar)bar.style.transform=`scaleX(${.2+.8*progress})`;};
 let stepFrame;const queueSteps=()=>{if(stepFrame)return;stepFrame=requestAnimationFrame(()=>{stepFrame=null;syncSteps();syncDiscovery();});};
 window.addEventListener('scroll',queueSteps,{passive:true,signal:controller.signal});window.addEventListener('resize',queueSteps,{signal:controller.signal});syncSteps();syncDiscovery();
 // One geometry model drives each ellipse, its markers and its upright labels.
 const orbit=root.querySelector('.about-orbit'),orbitState={progress:0};
 const tracks={a:{rx:185,ry:112,angle:-28,travel:60},b:{rx:210,ry:130,angle:45,travel:-35}};
 const nodes=[['people','a',195],['technology','a',20],['assets','b',52]];
 const positionOrbits=()=>{
  for(const [id,track] of Object.entries(tracks)){const angle=track.angle+track.travel*orbitState.progress;orbit?.querySelector(`[data-orbit-track="${id}"]`)?.setAttribute('transform',`rotate(${angle} 260 210)`);}
  for(const [id,key,degrees] of nodes){const t=tracks[key],angle=(t.angle+t.travel*orbitState.progress)*Math.PI/180,theta=degrees*Math.PI/180;const dx=t.rx*Math.cos(theta),dy=t.ry*Math.sin(theta);const x=260+dx*Math.cos(angle)-dy*Math.sin(angle),y=210+dx*Math.sin(angle)+dy*Math.cos(angle);orbit?.querySelector(`[data-orbit-node="${id}"]`)?.setAttribute('transform',`translate(${x} ${y})`);}
 };
 positionOrbits();
 const stop=()=>{context?.revert();context=null;if(tick)window.gsap?.ticker.remove(tick);tick=null;lenis?.destroy();lenis=null;document.documentElement.classList.remove('about-smooth');orbitState.progress=0;positionOrbits();};
 const start=()=>{stop();const {gsap,ScrollTrigger,Lenis}=window;if(media.matches||!gsap||!ScrollTrigger)return;
 gsap.registerPlugin(ScrollTrigger);
 context=gsap.context(()=>{
  if(root.querySelector('.about-hero-copy'))gsap.from('.about-hero-copy > *',{y:24,opacity:0,duration:.85,stagger:.09,ease:'power3.out',clearProps:'all'});
  root.querySelectorAll('[data-about-reveal]').forEach(element=>gsap.from(element,{y:36,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 92%',once:true},clearProps:'all'}));
  const isAbout=!!root.querySelector('.about-hero');
  if(!isAbout){
   const hero=root.querySelector('.page-hero,.hero');
   if(hero)gsap.from(hero.querySelectorAll('.eyebrow,h1,p'),{y:24,opacity:0,duration:.85,stagger:.1,clearProps:'all'});
   root.querySelectorAll('#main > section:not(.page-hero):not(.hero) > .container > h2, .how-step-body, .question-bubble').forEach(element=>gsap.from(element,{y:28,opacity:0,duration:.7,clearProps:'all',scrollTrigger:{trigger:element,start:'top 93%',once:true}}));
   if(stepNodes.length)ScrollTrigger.create({trigger:'.how-step-list',start:'top bottom',end:'bottom top',onUpdate:syncSteps,onRefresh:syncSteps});
   if(matchMedia('(min-width:761px) and (pointer:fine)').matches){
    root.querySelectorAll('.page-hero-art').forEach(element=>gsap.fromTo(element,{'--hero-shift':'-15px'},{'--hero-shift':'18px',ease:'none',scrollTrigger:{trigger:element,start:'top top',end:'bottom top',scrub:1}}));
    root.querySelectorAll('[data-site-parallax] img').forEach(element=>gsap.fromTo(element,{yPercent:-6},{yPercent:0,ease:'none',scrollTrigger:{trigger:element.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
   }
  }
  // The team photo has a fixed, user-approved crop; do not overwrite its CSS transform.
  if(orbit)gsap.to(orbitState,{progress:1,ease:'none',onUpdate:positionOrbits,scrollTrigger:{trigger:'.about-purpose',start:'top bottom',end:'bottom top',scrub:1}});
 },root);
 // Keep touch scrolling native. Smooth wheel input only on fine-pointer devices.
 if(Lenis&&matchMedia('(hover:hover) and (pointer:fine)').matches){document.documentElement.classList.add('about-smooth');lenis=new Lenis({duration:1.05,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);tick=time=>lenis?.raf(time*1000);gsap.ticker.add(tick);}
 ScrollTrigger.refresh();
 };
 const refresh=()=>{window.ScrollTrigger?.refresh();queueSteps();};root.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',refresh,{signal:controller.signal}));root.querySelectorAll('img').forEach(el=>{if(!el.complete)el.addEventListener('load',refresh,{once:true,signal:controller.signal});});
 const onLoad=()=>start();if(document.readyState==='complete')start();else window.addEventListener('load',onLoad,{once:true,signal:controller.signal});
 media.addEventListener('change',start,{signal:controller.signal});
 return ()=>{controller.abort();if(stepFrame)cancelAnimationFrame(stepFrame);stop();};
}
