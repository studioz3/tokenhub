# TokenHub v2 — simulador equivalente e movimento

Atualização em 21/10/2026 a partir do pedido de mais interatividade e da imagem fornecida pelo usuário.

## Status do REA e da reconstrução

O REA não está 100% completo. A implementação não possui equivalência operacional integral com a Tokeniza. Foram observados o site, o cadastro e as principais áreas da conta comercial; scripts públicos foram analisados. Não foram validados todos os estados, permissões, erros, produtos e etapas transacionais. Backend, KYC, pagamentos, custódia, liquidação e serviços bancários reais permanecem fora da demonstração.

As verificações de frontend comprovam comportamentos da demonstração, não equivalência do sistema financeiro. O relatório REA original contém o inventário das áreas observadas e das rotas apenas declaradas em scripts.

## Simulador: comportamento comprovado

Fonte: script público [simulation.js](https://tokeniza.com.br/wp-content/themes/tokeniza/tokeniza-www/assets/js/simulation.js?ver=1.0.65) e marcação da página inicial. Cópias locais em `research/simulation-reference.js` e `research/home-source.html`. Esta é observação ordinária de artefato web; não foi emitido um novo Evidence ID REA para essa inspeção.

| Propriedade | Referência observada e implementação TokenHub |
|---|---|
| Fórmula | `capital + capital × (taxa anual / 100 / 12) × meses` |
| Juros | Simples, proporcionais ao prazo |
| Taxa inicial | 20% a.a. |
| Taxa no controle | 1% a 30%, passo de 1 ponto percentual |
| Capital inicial | R$ 10.000,00 |
| Capital no controle | R$ 500,00 a R$ 100.000,00, passo de R$ 500,00 |
| Prazos | 18, 32 e 48 meses |
| Resultados iniciais | R$ 13.000,00; R$ 15.333,33; R$ 18.000,00 |
| Interação | Dois sliders, displays somente leitura formatados e três resultados sincronizados |

A versão anterior usava juros compostos e um prazo selecionável; essa implementação foi substituída. Textos e cores foram adaptados à TokenHub. A alegação de rentabilidade média da Tokeniza não foi atribuída à TokenHub. Os resultados são cenários brutos e ilustrativos, sem impostos, custos ou promessa de retorno.

## Linguagem de movimento

- **Hero em Three.js:** token tridimensional com símbolo inspirado na marca, materiais metálicos, órbita, pequenos ativos e resposta suave à posição do cursor.
- **Movimento controlável:** botão de pausa, sem dependência de hover para interromper a cena. A preferência do sistema por movimento reduzido impede o carregamento de Three.js na entrada da página.
- **Revelação por rolagem:** títulos, cartões e etapas entram quando alcançam a área visível. O conteúdo continua disponível se as animações não forem executadas.
- **Respostas à interação:** cards têm inclinação discreta em dispositivos com mouse, CTAs respondem ao hover e resultados do simulador recebem uma transição curta após alteração.
- **Troca de páginas:** transição breve nos navegadores com View Transitions; navegação convencional nos demais.
- **Desempenho:** renderização limitada a 30 quadros por segundo, resolução proporcional limitada, pausa fora da área visível e em aba oculta. Geometrias, materiais, observadores e contexto são descartados na navegação.
- **Alternativa:** a ilustração vetorial é preservada quando WebGL 2 não está disponível. O simulador e os fluxos continuam funcionando.

Three.js 0.186.1 foi obtido como módulos locais, com licença MIT e registros SHA-256 em `dist/vendor/three/provenance.json`. Não há CDN requisitada pelo site em execução. O módulo `three.core.js` contém a versão minificada com esse nome local para atender ao import relativo do módulo principal.

O [Hyperframes da HeyGen](https://github.com/heygen-com/hyperframes) é uma ferramenta para renderizar HTML e animações em vídeos. Não foi instalado nesta atualização, pois o pedido principal é interação ao vivo. Pode ser usado posteriormente para produzir peças institucionais em vídeo, se esse for um objetivo específico.

Referência técnica de ciclo de renderização e descarte: [WebGLRenderer — Three.js](https://threejs.org/docs/pages/WebGLRenderer).

## Verificação

- A suíte principal manteve 52 verificações aprovadas, incluindo os valores originais e os limites superior/inferior dos dois sliders.
- Nove cenários adicionais verificam renderização WebGL real e mudança visual entre quadros, pausa com imagem estável, parada fora da área visível, adaptação móvel, teclado nos sliders, alteração da preferência de movimento, limpeza na navegação, ausência de WebGL e não carregamento do Three.js com movimento reduzido.
- Relatórios: `previews/qa-report.json` e `previews/motion-qa-report.json`.
- Capturas: `home-motion-desktop.png`, `simulator-desktop.png` e `simulator-mobile.png`.

Não foi medida a performance de aparelhos físicos de entrada ou certificada conformidade integral de acessibilidade. Os testes usam Chrome local no Windows.
