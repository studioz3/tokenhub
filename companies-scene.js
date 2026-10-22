import * as THREE from './vendor/three/three.module.min.js';
export function createCompanyScene(host){
 let disposed=false,paused=false,visible=true,hidden=document.hidden,frame=0,last=0,time=0,progress=0;
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{return {setPaused(){},setVisible(){},setProgress(){},dispose(){}};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,60);camera.position.set(0,.5,10);
 const world=new THREE.Group();scene.add(world);world.rotation.set(.2,-.55,.05);
 scene.add(new THREE.AmbientLight(0xffffff,1.6));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(4,5,6);scene.add(key);const blue=new THREE.PointLight(0x00a2d4,22,14);blue.position.set(-3,1,3);scene.add(blue);
 const material=new THREE.MeshPhysicalMaterial({color:0x8daab8,metalness:.48,roughness:.3,clearcoat:1});
 const accent=new THREE.MeshStandardMaterial({color:0x00a2d4,emissive:0x00a2d4,emissiveIntensity:.2,metalness:.5,roughness:.25});
 const line=new THREE.LineBasicMaterial({color:0x00a2d4,transparent:true,opacity:.45});
 const cells=[];const geometry=new THREE.BoxGeometry(.58,.58,.58),edgeGeometry=new THREE.EdgesGeometry(geometry);
 for(let x=0;x<3;x++)for(let y=0;y<4;y++)for(let z=0;z<2;z++){const group=new THREE.Group();const mesh=new THREE.Mesh(geometry,(x+y+z)%7===0?accent:material);group.add(mesh);const edges=new THREE.LineSegments(edgeGeometry,line);group.add(edges);const base=new THREE.Vector3((x-1)*.64,(y-1.5)*.64,(z-.5)*.64);group.position.copy(base);world.add(group);cells.push({group,base,x,y,z});}
 const rings=[];for(let i=0;i<3;i++){const g=new THREE.TorusGeometry(2.15+i*.23,.008,6,100);const ring=new THREE.Mesh(g,accent);ring.rotation.set(Math.PI*.5+i*.35,i*.45,i*.2);ring.position.y=-.4;world.add(ring);rings.push(ring);}
 const floor=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.9,.12,80),material);floor.position.y=-2.15;world.add(floor);
 const plate=new THREE.Mesh(new THREE.TorusGeometry(1.8,.015,8,100),accent);plate.rotation.x=Math.PI/2;plate.position.y=-2.08;world.add(plate);
 const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render();};
 const render=()=>{world.rotation.y=-.55+Math.sin(time*.17)*.14+progress*.45;world.rotation.x=.15+progress*.12;const spread=.06+progress*.3;for(const c of cells){c.group.position.copy(c.base).multiplyScalar(1+spread);c.group.position.y+=Math.sin(time*.6+c.y*.8)*.025;}rings.forEach((r,i)=>r.rotation.z=time*.06*(i%2?-1:1));renderer.render(scene,camera);};
 const tick=now=>{frame=0;if(disposed||paused||!visible||hidden)return;if(now-last>32){time+=Math.min((now-last)/1000,.05);last=now;render();}frame=requestAnimationFrame(tick);};
 const schedule=()=>{if(!frame&&!disposed&&!paused&&visible&&!hidden){last=performance.now();frame=requestAnimationFrame(tick);}};
 const stop=()=>{cancelAnimationFrame(frame);frame=0;};
 const onVisibility=()=>{hidden=document.hidden;if(hidden)stop();else schedule();};document.addEventListener('visibilitychange',onVisibility);
 const observer=new ResizeObserver(resize);observer.observe(host);host.append(canvas);host.dataset.scene='ready';resize();schedule();
 const onContextLoss=e=>{e.preventDefault();stop();canvas.style.display='none';delete host.dataset.scene;};canvas.addEventListener('webglcontextlost',onContextLoss);
 return {setPaused(value){paused=value;if(paused)stop();else schedule();},setVisible(value){visible=value;if(visible)schedule();else stop();},setProgress(value){progress=value;if(!paused&&!hidden)render();},dispose(){if(disposed)return;disposed=true;stop();observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);canvas.removeEventListener('webglcontextlost',onContextLoss);const resources=new Set();scene.traverse(o=>{if(o.geometry)resources.add(o.geometry);if(o.material)resources.add(o.material);});for(const resource of resources)resource.dispose();renderer.dispose();canvas.remove();delete host.dataset.scene;}};
}
