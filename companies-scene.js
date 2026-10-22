import * as THREE from './vendor/three/three.module.min.js';

// A readable visual story: physical asset -> branded digital right -> connected holders.
export function createCompanyScene(host){
 let disposed=false,paused=false,visible=true,hidden=document.hidden,frame=0,last=0,time=0,progress=0;
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{return {setPaused(){},setVisible(){},setProgress(){},dispose(){}};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(max-width:760px)').matches?1.25:1.5));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,50);camera.position.set(0,.5,10.5);camera.lookAt(0,0,0);
 const environmentImages=Array.from({length:6},(_,i)=>{const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');const gradient=ctx.createLinearGradient(0,0,64,64);gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.3,i%2?'#bdd0db':'#263b49');gradient.addColorStop(.55,'#f6fbff');gradient.addColorStop(1,'#203541');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);return c;});
 const envCube=new THREE.CubeTexture(environmentImages);envCube.needsUpdate=true;const pmrem=new THREE.PMREMGenerator(renderer);const envTarget=pmrem.fromCubemap(envCube);scene.environment=envTarget.texture;
 scene.add(new THREE.HemisphereLight(0xffffff,0x071d2b,2));const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(-2,4,6);scene.add(key);const rim=new THREE.DirectionalLight(0x00a2d4,2.5);rim.position.set(3,-1,3);scene.add(rim);
 const world=new THREE.Group();scene.add(world);
 const silver=new THREE.MeshPhysicalMaterial({color:0xd7e3e8,metalness:.78,roughness:.2,clearcoat:1});
 const edge=new THREE.MeshStandardMaterial({color:0x415c6a,metalness:.8,roughness:.22});
 const navy=new THREE.MeshStandardMaterial({color:0x07364e,metalness:.45,roughness:.3});
 const brand=new THREE.MeshStandardMaterial({color:0x00a2d4,emissive:0x00a2d4,emissiveIntensity:.26,metalness:.4,roughness:.2});
 const trailMaterial=new THREE.LineBasicMaterial({color:0x00a2d4,transparent:true,opacity:.55});
 const mesh=(geometry,material,parent,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;};
 const makeToken=(radius=1)=>{const token=new THREE.Group();const disc=mesh(new THREE.CylinderGeometry(radius,radius,.22,80),[edge,silver,silver],token);disc.rotation.x=Math.PI/2;mesh(new THREE.TorusGeometry(radius*.94,.022,8,80),brand,token,0,0,.124);mesh(new THREE.TorusGeometry(radius*.82,.008,6,80),edge,token,0,0,.127);const symbol=new THREE.Group();symbol.scale.setScalar(radius);token.add(symbol);mesh(new THREE.TorusGeometry(.33,.053,12,64),brand,symbol,0,0,.16);for(const direction of [-1,1]){const bar=mesh(new THREE.BoxGeometry(.11,.36,.045),brand,symbol,direction*.205,direction*.36,.16);bar.rotation.z=-Math.PI/6;}return token;};
 const token=makeToken(1.22);token.position.set(.12,.05,.3);token.rotation.set(.1,-.26,-.12);world.add(token);
 // Architectural asset, not an abstract pile of blocks.
 const building=new THREE.Group();building.position.set(-2.65,-.05,-.25);building.rotation.y=-.3;world.add(building);
 mesh(new THREE.BoxGeometry(1.02,1.9,.7),silver,building,0,0,0);mesh(new THREE.BoxGeometry(1.16,.07,.82),edge,building,0,.99,0);mesh(new THREE.BoxGeometry(.72,.3,.54),silver,building,0,1.17,0);mesh(new THREE.BoxGeometry(1.3,.09,.98),navy,building,0,-1.04,0);
 for(let row=0;row<5;row++)for(let col=0;col<3;col++)mesh(new THREE.BoxGeometry(.17,.19,.035),(row+col)%4===0?brand:navy,building,(col-1)*.29,.7-row*.32,.37);
 const holders=[];for(const [i,x,y,z] of [[0,2.65,1.55,-.25],[1,3,0,.1],[2,2.65,-1.6,-.2]]){const group=makeToken(.4);group.position.set(x,y,z);group.rotation.set(.15,-.3,.12*(i-1));world.add(group);holders.push({group,x,y,z});const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(1.25,.05,0),new THREE.Vector3(1.9,y*.7,-.25),new THREE.Vector3(x,y,z)]);world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),trailMaterial));}
 const bridges=[];for(let i=0;i<3;i++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-2.1,.45-i*.4,0),new THREE.Vector3(-1.6,.65-i*.5,.2),new THREE.Vector3(-1.07,.3-i*.3,.25)]);world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),trailMaterial));const particle=mesh(new THREE.SphereGeometry(.028,8,8),brand,world);bridges.push({curve,particle,offset:i/3});}
 // Faint circuit plane anchors the composition; no free-floating orbit rings.
 const circuit=new THREE.Group();circuit.rotation.x=-Math.PI/2.35;circuit.position.set(0,-1.9,-1.2);world.add(circuit);const circuitMaterial=new THREE.LineBasicMaterial({color:0x00a2d4,transparent:true,opacity:.1});for(let i=-4;i<=4;i++){circuit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i,-2,0),new THREE.Vector3(i,2,0)]),circuitMaterial));circuit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4,i*.5,0),new THREE.Vector3(4,i*.5,0)]),circuitMaterial));}
 const draw=()=>{world.rotation.y=Math.sin(time*.18)*.04+progress*.12;token.rotation.y=-.26+Math.sin(time*.35)*.13;token.position.y=.05+Math.sin(time*.7)*.06;building.position.y=-.05+Math.sin(time*.7+.8)*.035;holders.forEach((h,i)=>{h.group.position.y=h.y+Math.sin(time*.6+i)*.045;h.group.rotation.y=-.3+Math.sin(time*.4+i)*.12;});for(const bridge of bridges)bridge.particle.position.copy(bridge.curve.getPoint((time*.18+bridge.offset)%1));renderer.render(scene,camera);};
 const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=camera.aspect<1.1?12.8:10.5;camera.updateProjectionMatrix();draw();};
 const tick=now=>{frame=0;if(disposed||paused||!visible||hidden)return;if(now-last>32){time+=Math.min((now-last)/1000,.06);last=now;draw();}frame=requestAnimationFrame(tick);};
 const schedule=()=>{if(!frame&&!disposed&&!paused&&visible&&!hidden){last=performance.now();frame=requestAnimationFrame(tick);}};
 const stop=()=>{cancelAnimationFrame(frame);frame=0;};
 const onVisibility=()=>{hidden=document.hidden;if(hidden)stop();else schedule();};document.addEventListener('visibilitychange',onVisibility);
 const observer=new ResizeObserver(resize);observer.observe(host);host.append(canvas);host.dataset.scene='ready';resize();schedule();
 const onContextLoss=e=>{e.preventDefault();stop();canvas.style.display='none';delete host.dataset.scene;};canvas.addEventListener('webglcontextlost',onContextLoss);
 return {setPaused(value){paused=value;if(paused)stop();else schedule();},setVisible(value){visible=value;if(visible)schedule();else stop();},setProgress(value){progress=value;if(!paused&&!hidden)draw();},dispose(){if(disposed)return;disposed=true;stop();observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);canvas.removeEventListener('webglcontextlost',onContextLoss);const resources=new Set();scene.traverse(o=>{if(o.geometry)resources.add(o.geometry);if(o.material)for(const material of Array.isArray(o.material)?o.material:[o.material])resources.add(material);});for(const resource of resources)resource.dispose();envTarget.dispose();envCube.dispose();pmrem.dispose();renderer.dispose();canvas.remove();delete host.dataset.scene;}};
}
