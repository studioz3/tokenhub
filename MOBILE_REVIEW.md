# TokenHub — menu, banner e revisão mobile

Revisão de 27/10/2026. Implementação no repositório GitHub existente; sem migração de hospedagem.

## Resultado

- Menu público: uma única faixa azul acompanha os links, com posição/largura animadas e equivalência por foco de teclado. Movimento reduzido respeitado.
- Menu compacto: acesso à conta, alvos de toque de pelo menos 44 px nos controles principais, fechamento por Escape e por toque fora, foco devolvido ao botão e bloqueio de interação com o conteúdo de fundo.
- Banner: duas fotografias decorativas, transição de opacidade a cada 16 segundos, texto e ações estáveis. A imagem inicial alterna entre visitas por preferência local. A segunda foto é carregada depois, sem biblioteca adicional; a troca pausa fora de vista e com a aba oculta. Sem troca automática para movimento reduzido ou economia de dados.
- Mobile: cabeçalho com logo legível, botões claros, campos de formulário em tamanho adequado, rótulos visíveis nas ações de saldo, números completos e tabelas apresentadas por registro. O documento impresso mantém a tabela tradicional.
- Tablet: navegação lateral preservada e resumos financeiros com espaço para os valores. Desktop amplo conserva suas colunas e hierarquia.

## Verificação

32 rotas foram renderizadas com quadros de 320, 390, 430, 768, 844 e 1440 px de largura. Foram 192 combinações iniciais; a ocorrência restante de excesso de largura na carteira em tablet foi corrigida e validada novamente, junto com dashboard, extrato e informe nas larguras relevantes. Barras de rolagem do navegador podem consumir 15 px da largura disponível, tornando a checagem conservadora. Não foi um teste em aparelhos físicos iOS/Android.

Jornadas verificadas: abrir/fechar menu público e menu interno; navegação para carteira; busca do extrato com reaplicação dos rótulos; Conta Digital em três etapas com informações fictícias; preenchimento e revisão da Mesa OTC; condições e entrada da simulação do Residencial UP. Valores das carteiras e regras financeiras foram preservados.

Teste automatizado: `tests/site-experience.test.mjs` verifica a alternância inicial, correspondência das imagens desktop/mobile, carregamento adiado e fallback com armazenamento bloqueado. Verificação de sintaxe em app.js e site-experience.js. Inspeção visual do banner e da faixa no desktop e das principais jornadas mobile.

## Nova imagem

Ferramenta integrada imagegen, usando a skill imagegen. Originais preservados. Assets finais:

- `assets/photos/hero-urbano-v1.webp` — 1536 × 1024, WebP, 230.410 bytes.
- `assets/photos/mobile-urbano-v1.webp` — recorte 800 × 600, WebP, 81.836 bytes.

Fotografia ilustrativa gerada por IA; não representa uma oferta ou empreendimento específico. Os textos do banner não mudam com a fotografia.

Prompt utilizado:

> Use case: photorealistic-natural. Asset type: alternate full-width background for TokenHub real-estate investment website hero. Create a premium, believable aerial architectural editorial photograph of a Brazilian contemporary residential neighborhood in the early morning: several mid-rise modern apartment buildings in the RIGHT half, landscaped avenues, trees, distant hills, soft morning haze, convincing real-world architecture and scale. Landscape 3:2 composition designed to crop to a very wide desktop banner: left 40 percent is quieter dark tree canopy and softly shaded neighborhood, preserving negative space for white website text. Buildings and lush greenery on the right are the subject. Natural muted warm sunlight and deep navy shadows, restrained cyan-blue tint only in distant reflections; no graphic overlays, no glowing plot lines, no people close-ups, no artificial crypto visuals. Real texture, imperfect natural urban details, like a carefully shot architectural magazine photo, not a glossy CGI real estate rendering. No readable text, no logos, no watermarks. This scene should be clearly different from a rural lakeside parcel landscape.

## Rotas verificadas

Home; oportunidades; ofertas Residencial UP e Horizonte Solar; como funciona; sobre nós; para empresas; Academy e suas três aulas; contato; FAQ; termos; privacidade; riscos; conduta; material didático; entrar; cadastro; recuperar senha; visão geral; carteira; extrato; conta digital; oportunidades internas; marketplace e Residencial UP; Mesa OTC; perfil; indicações; informe.
