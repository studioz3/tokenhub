import * as THREE from './vendor/three/three.module.min.js';

// One decorative WebGL scene. Every observer, geometry and GPU resource is owned here.
export function createHeroScene(host,{paused=false}={}){
 let disposed=false,visible=true,hidden=document.hidden,contextLost=false,previousFrame=0,elapsed=0;
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power'});
 if(!gl){host.dataset.sceneState='fallback';return {setPaused(){},dispose(){}};}
 const renderer=new THREE.WebGLRenderer({canvas,context:gl,alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(max-width:760px)').matches?1.25:1.5));renderer.setClearColor(0x083650,0);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(37,1,.1,60);camera.position.set(0,.3,8.9);
 const world=new THREE.Group();scene.add(world);world.rotation.set(-.17,-.28,-.09);
 scene.add(new THREE.AmbientLight(0xb8e8ff,2.4));const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(-3,5,6);scene.add(key);const rim=new THREE.DirectionalLight(0x00c2ff,5);rim.position.set(4,-2,3);scene.add(rim);
 const core=new THREE.Group();world.add(core);
 const navy=new THREE.MeshPhysicalMaterial({color:0x0b4b67,metalness:.68,roughness:.23,clearcoat:1});
 const cyan=new THREE.MeshStandardMaterial({color:0x00a2d4,emissive:0x006c90,emissiveIntensity:.7,metalness:.65,roughness:.2});
 const silver=new THREE.MeshStandardMaterial({color:0xe5f6fb,metalness:.28,roughness:.34});
 const porcelain=new THREE.MeshStandardMaterial({color:0xe9f0e9,metalness:.12,roughness:.4,emissive:0x29434c,emissiveIntensity:.25});
 const panelMaterial=new THREE.MeshStandardMaterial({color:0x398ba7,metalness:.2,roughness:.35,emissive:0x164e65,emissiveIntensity:.35});
 const edgeMaterial=new THREE.LineBasicMaterial({color:0xd8f8ff,transparent:true,opacity:.95});
 const materials=new Set([navy,cyan,silver,porcelain,panelMaterial,edgeMaterial]),geometries=new Set();
 const mesh=(geometry,material,parent=core)=>{geometries.add(geometry);const object=new THREE.Mesh(geometry,material);parent.add(object);return object;};
 const disc=mesh(new THREE.CylinderGeometry(1.39,1.39,.3,72),navy);disc.rotation.x=Math.PI/2;
 for(const z of [-.15,.16]){const ring=mesh(new THREE.TorusGeometry(1.34,.025,8,72),silver);ring.position.z=z;}
 const face=mesh(new THREE.TorusGeometry(.75,.1,12,72),cyan);face.position.z=.19;
 for(const sign of [-1,1]){const slash=mesh(new THREE.BoxGeometry(.2,.53,.12),cyan);slash.position.set(sign*.42,sign*.82,.19);slash.rotation.z=-.54;}
 for(let i=0;i<48;i++){const a=i/48*Math.PI*2;const tick=mesh(new THREE.BoxGeometry(.015,.075,.015),silver);tick.position.set(Math.sin(a)*1.16,Math.cos(a)*1.16,.17);tick.rotation.z=-a;}
 const ringGroup=new THREE.Group();world.add(ringGroup);ringGroup.rotation.set(1.05,.15,.1);
 const path=new THREE.EllipseCurve(0,0,2.45,2.45,0,Math.PI*2,false,0);
 const ringGeometry=new THREE.BufferGeometry().setFromPoints(path.getPoints(160));geometries.add(ringGeometry);
 const lineMaterial=new THREE.LineDashedMaterial({color:0xadebfb,transparent:true,opacity:.82,dashSize:.045,gapSize:.075});materials.add(lineMaterial);
 const orbit=new THREE.Line(ringGeometry,lineMaterial);orbit.computeLineDistances();ringGroup.add(orbit);
 const nodeGroup=new THREE.Group();world.add(nodeGroup);const nodes=[];
 const outline=object=>{const geometry=new THREE.EdgesGeometry(object.geometry);geometries.add(geometry);object.add(new THREE.LineSegments(geometry,edgeMaterial));};
 for(let i=0;i<3;i++){const a=i/3*Math.PI*2+.3;const node=new THREE.Group();nodeGroup.add(node);node.position.set(Math.cos(a)*2.36,Math.sin(a)*1.5,.1+Math.sin(a)*.4);node.rotation.set(.4,-.1,.1);const base=mesh(new THREE.BoxGeometry(.72,.11,.54),porcelain,node);base.position.y=-.3;outline(base);
  if(i===0){for(let j=0;j<3;j++){const block=mesh(new THREE.BoxGeometry(.13,.38+j*.13,.17),j===1?cyan:silver,node);block.position.set((j-1)*.17,-.07+j*.065,0);}}
  if(i===1){for(let j=0;j<6;j++){const panel=mesh(new THREE.BoxGeometry(.17,.03,.16),panelMaterial,node);panel.position.set((j%3-1)*.19,.01,Math.floor(j/3)*.19-.095);panel.rotation.x=.85;outline(panel);}}
  if(i===2){for(let j=0;j<3;j++){const small=mesh(new THREE.CylinderGeometry(.22,.22,.075,32),j===1?cyan:silver,node);small.position.set(0,j*.09-.17,0);}}
  nodes.push({node,phase:a});
 }
 const particlesPositions=[];for(let i=0;i<32;i++){const a=i*2.399963;particlesPositions.push(Math.cos(a)*(2+i%5*.15),Math.sin(a)*(1.7+i%4*.14),-1-i%3*.25);}
 const particlesGeo=new THREE.BufferGeometry();particlesGeo.setAttribute('position',new THREE.Float32BufferAttribute(particlesPositions,3));geometries.add(particlesGeo);const particleMaterial=new THREE.PointsMaterial({color:0xa8edff,size:.032,transparent:true,opacity:.78});materials.add(particleMaterial);const particles=new THREE.Points(particlesGeo,particleMaterial);world.add(particles);
 let targetX=0,targetY=0,selected=-1,impulse=0;const controller=new AbortController(),{signal}=controller;
 const stage=host.closest('.hero-visual');
 stage.addEventListener('pointermove',event=>{if(paused||event.pointerType==='touch')return;const r=stage.getBoundingClientRect();targetX=((event.clientX-r.left)/r.width-.5)*.5;targetY=((event.clientY-r.top)/r.height-.5)*.3;},{signal,passive:true});
 stage.addEventListener('pointerleave',()=>{targetX=targetY=0;},{signal});
 stage.addEventListener('pointerdown',event=>{if(paused||event.target.closest('button'))return;impulse=.8;},{signal});
 const render=()=>{if(!disposed&&!contextLost)renderer.render(scene,camera);};
 const frame=time=>{if(time-previousFrame<1000/30)return;const delta=previousFrame?Math.min((time-previousFrame)/1000,.1):0;previousFrame=time;elapsed+=delta;
  world.rotation.y=THREE.MathUtils.lerp(world.rotation.y,-.28+targetX,.07);world.rotation.x=THREE.MathUtils.lerp(world.rotation.x,-.17+targetY,.07);
  impulse=Math.max(0,impulse-delta*1.1);core.rotation.y=Math.sin(elapsed*.4)*.23+impulse*.14;core.position.y=Math.sin(elapsed*.7)*.1;core.scale.setScalar(1+impulse*.035);ringGroup.rotation.z=elapsed*.055;particles.rotation.z=-elapsed*.025;
  for(let i=0;i<nodes.length;i++){const {node,phase}=nodes[i],angle=phase+elapsed*.1;node.position.set(Math.cos(angle)*2.36,Math.sin(angle)*1.5+Math.sin(elapsed*.8+phase)*.06,.15+Math.sin(angle)*.4+(selected===i?.3:0));node.rotation.y=Math.sin(elapsed*.55+phase)*.2;node.scale.lerp(new THREE.Vector3().setScalar(selected===i?1.4:1),.09);}render();
 };
 const updateLoop=()=>{if(disposed||contextLost)return;previousFrame=0;renderer.setAnimationLoop(paused||!visible||hidden?null:frame);host.dataset.sceneRunning=String(!paused&&visible&&!hidden);render();};
 const resize=()=>{if(disposed)return;const {width,height}=host.getBoundingClientRect();if(width<=0||height<=0)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=width<400?9.7:8.9;camera.updateProjectionMatrix();render();};
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
 const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;updateLoop();},{threshold:.02});visibilityObserver.observe(host);
 document.addEventListener('visibilitychange',()=>{hidden=document.hidden;updateLoop();},{signal});
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();contextLost=true;renderer.setAnimationLoop(null);host.dataset.sceneState='fallback';host.dataset.sceneRunning='false';},{signal});
 canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;host.dataset.sceneState='ready';resize();updateLoop();},{signal});
 host.appendChild(canvas);host.dataset.sceneState='ready';resize();updateLoop();
 return {focusAsset(index){selected=index;host.dataset.activeAsset=String(index);nodes.forEach(({node},i)=>node.scale.setScalar(i===index?1.4:1));render();},setPaused(value){paused=value;targetX=targetY=0;updateLoop();},dispose(){if(disposed)return;disposed=true;controller.abort();resizeObserver.disconnect();visibilityObserver.disconnect();renderer.setAnimationLoop(null);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();canvas.remove();}};
}
