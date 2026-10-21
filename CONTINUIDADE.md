# Continuidade TokenHub

## Estado atual

Site: https://tokenhub-experiencia-2026.fancypine513.chatgpt.site/

Projeto Sites: `appgprj_6ad8b5a83c048191916065c83c5a9060`.

Último commit publicado e exportado: `bd1cf0c17aeb211b72dcf639b9a92aa81fe48477`.

A última publicação foi confirmada como concluída. Acesso privado, restrito ao proprietário. O ZIP não transfere sessões, autorização da hospedagem nem histórico de Git.

## Decisões do usuário a preservar

1. A Tokeniza serviu de referência para estrutura e jornadas, com inspeção autorizada, mas a marca e a comunicação são da TokenHub.
2. Aplicar o manual TokenHub: azul-marinho `#083650`, ciano `#00A2D4`, Raleway e logotipos vetoriais locais.
3. Manter imagens em oportunidades, detalhes, acesso, painel, institucional e conta digital. O usuário pediu retirar as legendas visíveis “Imagem ilustrativa · IA”; não recolocá-las. Os prompts e originais continuam disponíveis neste pacote.
4. Manter a animação Three.js com contraste claro, interação com ponteiro e respeito ao movimento reduzido. O usuário pediu retirar da home os botões Imóveis/Energia/Tokens e Pausar movimento; eles foram removidos. A animação continua.
5. Mesa OTC em dois painéis inspirada na referência: configurar, cotação, modos pagar/receber, percentuais, cálculo independente, gráfico ilustrativo, prazo e histórico. Não movimenta recursos.
6. Carteira com olho independente em cada um dos três cartões de saldo, detalhamento por ativo/rede e expansão de outros ativos.
7. Comunicação integrada às informações públicas TokenHub, com foco imobiliário. Sobre nós tem propósito, benefícios e identificação institucional completos.
8. Toda navegação permanece dentro do site novo. Não reintroduzir links ao domínio antigo, inclusive “Site oficial da TokenHub”. Termos, privacidade, código de conduta e material didático foram integrados a páginas locais.
9. No topo das páginas, o caminho de navegação fica em uma linha. Quebras `<br>` do título não se propagam para esse caminho; em telas estreitas ele usa reticências. O título principal preserva as quebras de composição.
10. Não alegar equivalência operacional de 100% com a Tokeniza. Serviços reais de servidor não foram implementados.

## Mapa do código

| Arquivo | Responsabilidade |
| --- | --- |
| `dist/app.js` | Rotas por hash, páginas, formulários locais, navegação e eventos |
| `dist/data.js` | Ofertas, movimentações e artigos fictícios; FAQ |
| `dist/styles.css` | Estilo base e responsividade |
| `dist/experience-v3.css` | Imagens, OTC, carteira e ajustes finais de layout |
| `dist/motion.js` | Montagem/limpeza do movimento e preferências do usuário |
| `dist/scene.js` | Cena Three.js; descarte de GPU e alternativa visual |
| `dist/simulator.js` | Simulador com juros simples e controles deslizantes |
| `dist/photos.js` | Imagens responsivas, sem legendas sobrepostas |
| `dist/wallet-details.js` | Privacidade e detalhamento dos saldos |
| `dist/otc.js` | Estado e cálculo OTC demonstrativo |
| `dist/official.js` | Dados institucionais e apresentações do ecossistema |
| `dist/documents.js` | Textos institucionais importados das páginas públicas |
| `dist/assets/` | Marca, fontes e fotografias WebP locais |
| `dist/vendor/three/` | Three.js 0.186.1 com licença e proveniência |

O site é HTML/CSS/JavaScript sem framework e sem build obrigatório. Preserve os caminhos relativos e as rotas `#/...`. Para outra hospedagem estática, publique apenas `dist/`.

## Regras de comportamento existentes

- Simulador: juros simples, `principal + principal × taxaAnual/100/12 × meses`. Com 20% a.a. e R$ 10.000,00, resultados em 18/32/48 meses: R$ 13.000,00; R$ 15.333,33; R$ 18.000,00.
- OTC: taxa estática fictícia de 5 tBRL por USDT e custo fictício de 1%; cotação com 30 segundos de validade. Expiração não é reiniciada ao navegar. Confirmar registra apenas um cenário na sessão.
- Carteira: disponível ilustrativo de R$ 2.125,00, composto por R$ 1.125,00 de BRL e equivalente fictício de R$ 1.000,00 em USDT. Capital aplicado de R$ 8.000,00 e rendimentos de R$ 125,00 são dados fictícios.
- Somente IDs de favoritos são persistidos no armazenamento local. Dados de formulários e senhas não são enviados a servidor. Os exemplos de endereço de carteira não são destinos reais de depósito.

## Fontes e limites da pesquisa

O manual está em `brand/`. Os relatórios distinguem comportamento observado, evidência de scripts públicos e inferências. A reconstrução não inclui código de servidor, contrato de integração ou acesso permanente à conta de referência.

As páginas públicas TokenHub foram consultadas em 21/10/2026. Os documentos importados refletem o conteúdo publicado nessa consulta. Não foram criadas cláusulas novas para preencher lacunas. Os relatórios antigos podem mencionar botões, legendas e links que o usuário mandou retirar depois; siga o estado atual do código e as decisões acima.

## Validação e portabilidade

Há relatórios de 52 cenários gerais, 8 verificações de movimento após remover controles, 9 verificações de imagens/carteira/OTC e 6 grupos de verificações institucionais. Estes últimos percorreram 43 rotas e 11 páginas em quatro larguras. São evidências das execuções registradas, não garantia de que um ambiente novo já foi testado.

Os scripts exportados tiveram apenas os caminhos de dependência, navegador e saída adaptados para funcionar fora do workspace original. Consulte `LEIA-PRIMEIRO.md`.

## Continuar a publicação existente

Se o usuário pedir atualizar o mesmo site e o outro chat tiver a conexão Sites, obtenha o projeto pelo ID acima e confira acesso e estado remoto atuais. Use o fluxo oficial da skill Sites para abrir o repositório, comparar o estado e enviar os arquivos alterados. Não crie um projeto duplicado nem substitua trabalho posterior no remoto. Preserve a audiência privada, salvo instrução explícita do usuário.

`deployment/hosting-existente.json` guarda a configuração, sem token. Credenciais de repositório devem ser obtidas novamente pela conexão Sites e usadas só em memória. Não há `.git`, cookies, senhas, chaves de API, sessão Chrome ou tokens de publicação neste pacote.
