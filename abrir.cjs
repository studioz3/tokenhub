const {spawn}=require('node:child_process');const http=require('node:http');const path=require('node:path');
const open=()=>spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--new-window','http://127.0.0.1:4188'],{detached:true,stdio:'ignore',windowsHide:false}).unref();
const req=http.get('http://127.0.0.1:4188',res=>{if(res.statusCode===200)open();else console.error('A porta 4188 está ocupada por outro serviço.');res.resume();});
req.on('error',()=>{const child=spawn(process.execPath,[path.join(__dirname,'server.cjs')],{cwd:__dirname,detached:true,stdio:'ignore',windowsHide:true});child.unref();setTimeout(open,1200);});req.setTimeout(2000,()=>req.destroy());
