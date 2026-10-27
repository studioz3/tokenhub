const groups=[
 ['Acompanhar',[['grid','Visão geral','/app'],['wallet','Minha carteira','/app/carteira'],['bank','Conta digital','/app/conta-digital'],['doc','Informe de rendimentos','/app/informe']]],
 ['Investir',[['layers','Oportunidades','/app/oportunidades'],['swap','Marketplace','/app/marketplace'],['chart','Mesa OTC','/app/otc']]],
 ['Minha conta',[['user','Meu perfil','/app/perfil'],['gift','Indicações','/app/indicacoes']]]
];
export function renderAppNavigation({route,logo,icon}){
 const link=([i,title,path])=>{const active=route===path||(path==='/app/oportunidades'&&route.startsWith('/app/oferta/'))||(path==='/app/marketplace'&&route.startsWith(path+'/'));return `<a href="#${path}" class="nav-item ${active?'active':''}" ${active?'aria-current="page"':''}>${icon(i)}<span>${title}</span></a>`;};
 return `<button class="app-mobile-overlay" data-action="close-app-menu" aria-label="Fechar navegação" tabindex="-1" aria-hidden="true"></button><aside class="sidebar" id="sidebar" aria-label="Navegação da plataforma"><div class="sidebar-head">${logo}<button class="sidebar-close" type="button" data-action="close-app-menu" aria-label="Fechar menu"><span aria-hidden="true">×</span></button></div><nav class="sidebar-nav" aria-label="Plataforma">${groups.map(([label,links],i)=>`<section class="sidebar-group" aria-labelledby="nav-group-${i}"><h2 id="nav-group-${i}" class="sidebar-group-title">${label}</h2><div class="sidebar-links">${links.map(link).join('')}</div></section>`).join('')}</nav><div class="sidebar-bottom">${link(['info','Central de ajuda','/faq'])}${link(['logout','Voltar ao site','/'])}<p class="sidebar-note">Uma nova forma de investir.</p></div></aside>`;
}
export function mountAppNavigation(root){
 const sidebar=root.querySelector('#sidebar'),main=root.querySelector('.app-main'),trigger=root.querySelector('[data-action="app-menu"]'),overlay=root.querySelector('.app-mobile-overlay');if(!sidebar||!main||!trigger||!overlay)return ()=>{};
 const media=matchMedia('(max-width: 760px)'),controller=new AbortController(),{signal}=controller;let opened=false;
 const controls=()=>[...sidebar.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length>0);
 function setOpen(value,restore=false){opened=media.matches&&value;sidebar.classList.toggle('open',opened);overlay.classList.toggle('open',opened);trigger.setAttribute('aria-expanded',String(opened));sidebar.inert=media.matches&&!opened;main.inert=opened;document.documentElement.classList.toggle('app-nav-open',opened);if(opened){sidebar.setAttribute('role','dialog');sidebar.setAttribute('aria-modal','true');controls()[0]?.focus({preventScroll:true});}else{sidebar.removeAttribute('role');sidebar.removeAttribute('aria-modal');if(restore)trigger.focus({preventScroll:true});}}
 root.addEventListener('click',e=>{const control=e.target.closest('[data-action]');if(control?.dataset.action==='app-menu')setOpen(true);if(control?.dataset.action==='close-app-menu')setOpen(false,true);if(opened&&e.target.closest('#sidebar a[href]'))setOpen(false);},{signal});
 document.addEventListener('keydown',e=>{if(!opened)return;if(e.key==='Escape'){e.preventDefault();setOpen(false,true);}if(e.key==='Tab'){const list=controls(),first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}},{signal});
 media.addEventListener('change',()=>setOpen(false),{signal});setOpen(false);
 return ()=>{controller.abort();sidebar.inert=false;main.inert=false;document.documentElement.classList.remove('app-nav-open');};
}
