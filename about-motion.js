// Page-scoped motion: remove all observers, timelines and scroll smoothing on navigation.
export function mountAboutMotion(root){
 const host=root.querySelector('.about-hero');if(!host)return ()=>{};
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let context,lenis,tick;const controller=new AbortController();
 root.querySelector('.about-vision-link')?.addEventListener('click',event=>{event.preventDefault();const target=root.querySelector('#tokenhub-visao');if(lenis)lenis.scrollTo(target,{offset:-90});else target.scrollIntoView({behavior:media.matches?'instant':'smooth'});},{signal:controller.signal});
 const stop=()=>{context?.revert();context=null;if(tick)window.gsap?.ticker.remove(tick);tick=null;lenis?.destroy();lenis=null;document.documentElement.classList.remove('about-smooth');};
 const start=()=>{stop();const {gsap,ScrollTrigger,Lenis}=window;if(media.matches||!gsap||!ScrollTrigger)return;
 gsap.registerPlugin(ScrollTrigger);
 context=gsap.context(()=>{
  gsap.from('.about-hero-copy > *',{y:24,opacity:0,duration:.85,stagger:.09,ease:'power3.out',clearProps:'all'});
  root.querySelectorAll('[data-about-reveal]').forEach(element=>gsap.from(element,{y:36,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 92%',once:true},clearProps:'all'}));
  gsap.to('.about-team img',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.about-team',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.to('.orbit-ring-a',{rotation:100,ease:'none',scrollTrigger:{trigger:'.about-purpose',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.to('.orbit-ring-b',{rotation:-65,ease:'none',scrollTrigger:{trigger:'.about-purpose',start:'top bottom',end:'bottom top',scrub:1}});
 },root);
 // Keep touch scrolling native. Smooth wheel input only on fine-pointer devices.
 if(Lenis&&matchMedia('(hover:hover) and (pointer:fine)').matches){document.documentElement.classList.add('about-smooth');lenis=new Lenis({duration:1.05,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);tick=time=>lenis?.raf(time*1000);gsap.ticker.add(tick);}
 ScrollTrigger.refresh();
 };
 const onLoad=()=>start();if(document.readyState==='complete')start();else window.addEventListener('load',onLoad,{once:true,signal:controller.signal});
 media.addEventListener('change',start,{signal:controller.signal});
 return ()=>{controller.abort();stop();};
}
