// Page-scoped motion: remove all observers, timelines and scroll smoothing on navigation.
export function mountAboutMotion(root){
 const host=root.querySelector('.about-hero');if(!host)return ()=>{};
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let context,lenis,tick;const controller=new AbortController();
 root.querySelector('.about-vision-link')?.addEventListener('click',event=>{event.preventDefault();const target=root.querySelector('#tokenhub-visao');if(lenis)lenis.scrollTo(target,{offset:-90});else target.scrollIntoView({behavior:media.matches?'instant':'smooth'});},{signal:controller.signal});
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
  gsap.from('.about-hero-copy > *',{y:24,opacity:0,duration:.85,stagger:.09,ease:'power3.out',clearProps:'all'});
  root.querySelectorAll('[data-about-reveal]').forEach(element=>gsap.from(element,{y:36,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 92%',once:true},clearProps:'all'}));
  // The team photo has a fixed, user-approved crop; do not overwrite its CSS transform.
  gsap.to(orbitState,{progress:1,ease:'none',onUpdate:positionOrbits,scrollTrigger:{trigger:'.about-purpose',start:'top bottom',end:'bottom top',scrub:1}});
 },root);
 // Keep touch scrolling native. Smooth wheel input only on fine-pointer devices.
 if(Lenis&&matchMedia('(hover:hover) and (pointer:fine)').matches){document.documentElement.classList.add('about-smooth');lenis=new Lenis({duration:1.05,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);tick=time=>lenis?.raf(time*1000);gsap.ticker.add(tick);}
 ScrollTrigger.refresh();
 };
 const onLoad=()=>start();if(document.readyState==='complete')start();else window.addEventListener('load',onLoad,{once:true,signal:controller.signal});
 media.addEventListener('change',start,{signal:controller.signal});
 return ()=>{controller.abort();stop();};
}
