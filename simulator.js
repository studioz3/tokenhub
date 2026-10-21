const brl=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export const simulationPeriods=[18,32,48];

// Equivalent to the observed public simulation.js: linear, monthly prorated interest.
export function projectSimpleInterest(principal,annualRate,months){
 return principal+principal*(annualRate/100/12)*months;
}

export function renderSimulator(){
 return `<section class="return-simulator" id="simulador" aria-labelledby="simulation-heading" data-simulator>
  <div class="return-copy"><span class="eyebrow">Explore um cenário</span><h2 id="simulation-heading">Veja quanto<br><em>seu dinheiro<br> pode render.</em></h2><p>Ajuste a taxa e o valor para comparar um cenário em três prazos. Arraste os controles e veja os resultados na hora.</p><p class="simulation-disclosure">Simulação ilustrativa com juros simples. Não representa retorno garantido ou oferta da TokenHub. Valores brutos, sem impostos ou custos.</p></div>
  <div class="simulation-console"><div class="simulation-control">
   <div class="simulation-field"><label for="calc-rate-range">Rentabilidade</label><input id="calc-rate" type="text" readonly value="20,00 %" aria-label="Rentabilidade anual selecionada" tabindex="-1"></div>
   <input id="calc-rate-range" class="simulation-range" type="range" min="1" max="30" step="1" value="20" aria-labelledby="rate-label" aria-valuetext="20 por cento ao ano" style="--range-progress:65.5172%"><span class="sr-only" id="rate-label">Rentabilidade anual hipotética</span>
  </div><div class="simulation-control">
   <div class="simulation-field"><label for="calc-amount-range">Valor</label><input id="calc-amount" type="text" readonly value="R$ 10.000,00" aria-label="Capital inicial selecionado" tabindex="-1"></div>
   <input id="calc-amount-range" class="simulation-range" type="range" min="500" max="100000" step="500" value="10000" aria-labelledby="amount-label" aria-valuetext="10 mil reais" style="--range-progress:9.5477%"><span class="sr-only" id="amount-label">Valor inicial em reais</span>
  </div><div class="simulation-results" role="group" aria-label="Resultados da simulação" aria-live="polite" aria-atomic="true">${simulationPeriods.map(months=>`<div class="simulation-result" data-period="${months}"><span>Em ${months} meses você terá:</span><output id="calc-result-${months}" for="calc-rate-range calc-amount-range" class="num">${brl(projectSimpleInterest(10000,20,months))}</output><i class="simulation-result-line" aria-hidden="true" style="--gain-width:${months/48*100}%"></i></div>`).join('')}</div>
   <div class="simulation-method"><span class="simulation-live-dot" aria-hidden="true"></span><span>Taxa anual · Cálculo proporcional ao prazo</span></div>
  </div>
 </section>`;
}

export function updateSimulator(source){
 const root=document.querySelector('[data-simulator]');if(!root)return;
 const rate=root.querySelector('#calc-rate-range'),amount=root.querySelector('#calc-amount-range');
 const annualRate=Number(rate.value),principal=Number(amount.value);
 root.querySelector('#calc-rate').value=annualRate.toFixed(2).replace('.',',')+' %';
 root.querySelector('#calc-amount').value=brl(principal);
 for(const control of [rate,amount])control.style.setProperty('--range-progress',((Number(control.value)-Number(control.min))/(Number(control.max)-Number(control.min))*100)+'%');
 rate.setAttribute('aria-valuetext',annualRate+' por cento ao ano');amount.setAttribute('aria-valuetext',brl(principal));
 for(const months of simulationPeriods){const output=root.querySelector('#calc-result-'+months);output.textContent=brl(projectSimpleInterest(principal,annualRate,months));if(source&&!matchMedia('(prefers-reduced-motion: reduce)').matches){output.getAnimations().forEach(animation=>animation.cancel());output.animate([{opacity:.55,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});}}
}
