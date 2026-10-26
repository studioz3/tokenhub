// JSON contract for a future API. Units and BRL cents are integers; quotes are a sample snapshot.
export const exampleWalletData={schemaVersion:1,asOf:'2026-10-26',assets:[
{id:'tbrl',symbol:'tBRL',network:'Moonbeam',decimals:2,mark:'T$',tone:'cyan',priceCents:100},
{id:'btc',symbol:'BTC',network:'Bitcoin',decimals:8,mark:'₿',tone:'gold',priceCents:40000000},
{id:'bscusdt',symbol:'BSCUSDT',network:'BNB Smart Chain',decimals:2,mark:'T',tone:'green',priceCents:500},
{id:'brl',symbol:'BRL',network:'Saldo interno',decimals:2,mark:'R$',tone:'navy',priceCents:100},
{id:'usdt',symbol:'USDT',network:'Ethereum',decimals:2,mark:'T',tone:'green',priceCents:500},
{id:'eth',symbol:'ETH',network:'Ethereum',decimals:8,mark:'Ξ',tone:'silver',priceCents:1500000},
{id:'usdc',symbol:'USDC',network:'Polygon',decimals:2,mark:'$',tone:'cyan',priceCents:500},
{id:'tusd',symbol:'tUSD',network:'Moonbeam',decimals:2,mark:'T$',tone:'navy',priceCents:500}
],entries:[
...Object.entries({tbrl:1850000,btc:8000000,bscusdt:640000,brl:3537500,usdt:150000,eth:40000000,usdc:60000,tusd:20000}).map(([assetId,units])=>({id:'opening-'+assetId,date:'2026-10-01',kind:'deposit',assetId,units,status:'posted',name:'Saldo inicial · '+assetId.toUpperCase()})),
{id:'invest-solar',date:'2026-10-15',kind:'investment',assetId:'brl',units:-300000,projectId:'solar',status:'posted',name:'Aplicação · Horizonte Solar'},
{id:'invest-reserva',date:'2026-10-20',kind:'investment',assetId:'brl',units:-500000,projectId:'reserva',status:'posted',name:'Aplicação · Reserva Urbana'},
{id:'income-reserva',date:'2026-10-24',kind:'income',assetId:'brl',units:7500,projectId:'reserva',status:'posted',name:'Rendimento recebido · Reserva Urbana'},
{id:'income-solar',date:'2026-10-25',kind:'income',assetId:'brl',units:5000,projectId:'solar',status:'posted',name:'Rendimento recebido · Horizonte Solar'}
]};
const safeInteger=(n,label)=>{if(!Number.isSafeInteger(n))throw new Error('Inteiro inválido: '+label);return n;};
const cash=(units,asset)=>{const n=BigInt(units)*BigInt(asset.priceCents),d=10n**BigInt(asset.decimals);return safeInteger(Number(n>=0n?(n+d/2n)/d:-((-n+d/2n)/d)),'valor em centavos');};
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
export function buildWalletSnapshot(data){
 if(data?.schemaVersion!==1||!/^\d{4}-\d{2}-\d{2}$/.test(data.asOf)||!Array.isArray(data.assets)||!Array.isArray(data.entries))throw new Error('Contrato de carteira inválido');
 const definitions=new Map(),units=new Map(),projects=new Map(),ids=new Set();let incomeCents=0;
 for(const asset of data.assets){if(!asset.id||definitions.has(asset.id)||!Number.isInteger(asset.decimals)||asset.decimals<0||asset.decimals>12)throw new Error('Ativo inválido');safeInteger(asset.priceCents,'cotação');if(asset.priceCents<0)throw new Error('Cotação negativa');definitions.set(asset.id,asset);units.set(asset.id,0);}
 const entries=[...data.entries].sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));const movements=[],history=[];let investedCents=0;
 for(const e of entries){if(!e.id||ids.has(e.id)||!definitions.has(e.assetId)||!['posted','pending','failed'].includes(e.status)||!['deposit','withdrawal','investment','redemption','income'].includes(e.kind)||!/^\d{4}-\d{2}-\d{2}$/.test(e.date))throw new Error('Movimentação inválida');ids.add(e.id);safeInteger(e.units,'quantidade');const asset=definitions.get(e.assetId),amountCents=cash(e.units,asset);
  if(e.kind==='investment'||e.kind==='redemption'||e.kind==='income'){if(!e.projectId||asset.id!=='brl')throw new Error('Evento do investimento requer projeto e moeda BRL');}
  if((['deposit','income','redemption'].includes(e.kind)&&e.units<0)||(['withdrawal','investment'].includes(e.kind)&&e.units>0))throw new Error('Sinal inválido');
  if(e.date>data.asOf||e.status!=='posted')continue;
  units.set(e.assetId,safeInteger(units.get(e.assetId)+e.units,'saldo'));
  if(e.projectId&&!projects.has(e.projectId))projects.set(e.projectId,{projectId:e.projectId,principalCents:0,incomeCents:0});
  const position=projects.get(e.projectId);
  if(e.kind==='investment'){position.principalCents-=amountCents;investedCents-=amountCents;}
  if(e.kind==='redemption'){safeInteger(e.principalCents,'principal resgatado');if(e.principalCents<0||e.principalCents!==amountCents)throw new Error('Resgate inválido');position.principalCents-=e.principalCents;investedCents-=e.principalCents;}
  if(e.kind==='income'){position.incomeCents+=amountCents;incomeCents+=amountCents;}
  movements.push({...e,amountCents,amount:amountCents/100,type:amountCents<0?'Saída':'Entrada',status:'Concluída',assetSymbol:asset.symbol,assetAmount:e.units/10**asset.decimals});
  history.push({date:e.date,investedCents});
 }
 const assets=data.assets.map(a=>{const atomicUnits=units.get(a.id);if(atomicUnits<0)throw new Error('Saldo negativo');return {...a,units:atomicUnits,amount:atomicUnits/10**a.decimals,fiatCents:cash(atomicUnits,a),fiat:cash(atomicUnits,a)/100};});
 const positions=[...projects.values()].map(p=>{if(p.principalCents<0)throw new Error('Principal negativo');return {...p,amount:p.principalCents/100,income:p.incomeCents/100};});
 const availableCents=safeInteger(assets.reduce((s,a)=>s+a.fiatCents,0),'saldo total');safeInteger(investedCents,'aplicado');safeInteger(incomeCents,'rendimentos');
 return freeze({asOf:data.asOf,assets,positions,movements:movements.reverse(),history,totals:{availableCents,investedCents,incomeCents,equityCents:availableCents+investedCents,available:availableCents/100,invested:investedCents/100,income:incomeCents/100}});
}
let snapshot=buildWalletSnapshot(exampleWalletData);const listeners=new Set();
export const getWalletSnapshot=()=>snapshot;
// The API adapter should pass the complete authorized account snapshot. Invalid updates are rejected atomically.
export function replaceWalletData(data){const next=buildWalletSnapshot(data);snapshot=next;for(const notify of listeners)notify(next);return next;}
export function subscribeWallet(listener){listeners.add(listener);return ()=>listeners.delete(listener);}
