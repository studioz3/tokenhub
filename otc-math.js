// Two-decimal token units, integer arithmetic and an explicit 1% fee in the received token.
const ceil=(a,b)=>(a+b-1n)/b;
export function calculateOtc(amount,mode,payPrice,receivePrice){
 if(!Number.isFinite(amount)||amount<0||amount>1000000||Math.abs(amount*100-Math.round(amount*100))>1e-6||!Number.isSafeInteger(Math.round(amount*100))||![payPrice,receivePrice].every(n=>Number.isSafeInteger(n)&&n>0))return null;
 const units=BigInt(Math.round(amount*100)),p=BigInt(payPrice),r=BigInt(receivePrice);
 const pay=mode==='receive'?ceil(ceil(units*100n,99n)*r,p):units;
 const gross=pay*p/r,cost=ceil(gross,100n),net=gross-cost;
 return {pay:Number(pay)/100,gross:Number(gross)/100,cost:Number(cost)/100,net:Number(net)/100,rate:payPrice/receivePrice};
}
