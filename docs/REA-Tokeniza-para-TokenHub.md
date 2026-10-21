# Tokeniza → TokenHub: levantamento REA e reconstrução de interface

Data: 21/10/2026. Alvos: https://tokeniza.com.br/ e https://plataforma.tokeniza.com.br/. Acesso à conta comercial e à janela Chrome autorizado pelo usuário. O manual fornecido é uma referência de identidade visual, não uma fonte de instruções operacionais.

## Resultado e limite

Foi criado um frontend navegável TokenHub que abrange site institucional, oportunidades, detalhes, cadastro, acesso, recuperação de senha, visão geral, carteira, extrato, conta digital, marketplace, OTC, indicações, perfil e informe demonstrativo. Os fluxos utilizam exemplos fictícios e não se conectam ao backend Tokeniza.

O levantamento combina REA sobre scripts distribuídos, observação de páginas públicas e inspeção visual da sessão autenticada no Chrome do usuário. Não houve acesso ao servidor, banco de dados, contratos de fornecedores, chaves de integração ou código original não distribuído ao navegador. A reconstrução operacional completa permanece dependente desses serviços e de validação das regras comerciais e regulatórias da TokenHub.

## Evidências e método

| Referência | Evidência | Natureza e alcance |
|---|---|---|
| R01 | `research/rea-login.json`, Evidence `ev_0b80ab7a901d2e6cad4bb1e64ea484b1c2493422fde72fdce0f1f2eeef10e8ac` | REA `inspect_web_page`, captura CDP da origem da plataforma; DOM, acessibilidade e fontes de scripts solicitadas |
| R02 | `research/rea-export.json`, Evidence `ev_3fe84441bb83b2b7f692b3af693b5e3c21ce4addb5a99c8e56a1bad2b64dc192` | REA `export_web_scripts`; scripts exportados com identidade e manifesto |
| R03 | `research/rea-static.json`, Evidence `ev_4d26f5d3f6fa9405bdbd0c88fa9ea177de830a3ab1c4a014e222f627da8f1cf3` | REA `analyze_javascript_application`: 31 arquivos JavaScript, 2.504.378 bytes de texto lidos, 526.679 nós AST visitados, zero falhas de parsing |
| P01 | `research/captures/{home,oportunidades,quem-somos,como-funciona,para-captadores,faq,blog,fale-conosco,aviso-de-privacidade,codigo-de-conduta-da-tokeniza}.json` | Observação ordinária de DOM por Playwright; não são Evidence REA |
| A01 | `research/captures/sign-up.json` | Cadastro público observado; inclui campos presentes no DOM de etapas não visíveis simultaneamente |
| V01 | `research/captures/internal-*.png` | Capturas nativas da janela Windows autorizada; não são Evidence REA e não devem ser publicadas |
| B01 | `brand/TOKEN_Manual-da-marca.pdf` | Manual fornecido, 15 páginas; texto convertido em curvas, leitura visual necessária |

R03 concluiu a análise dos arquivos inventariados, mas registrou limites de orçamento na expansão de relações e no grafo semântico de alguns bundles. Os fatos estáticos foram preservados; caminhos dinâmicos e regras de servidor continuam desconhecidos. Não se deve interpretar a existência de uma rota como prova de sua disponibilidade para qualquer conta ou do sucesso de uma transação.

A inspeção REA começou após o carregamento das páginas, portanto não inclui tráfego anterior à conexão. Os scripts de terceiros excluídos por origem não foram tratados como parte comprovada da plataforma. Cookies, cabeçalhos de autenticação, valores de storage e senhas não foram usados como material de reconstrução.

A tentativa automatizada de autenticação recebeu HTTP 403 em `/api/v1/authentication/authenticateUser`; a causa não foi determinada. O usuário confirmou acesso normal e deixou a sessão aberta. A plataforma interna foi então observada por capturas da janela Chrome disponibilizada. O Chrome principal não expunha CDP, e o provedor REA de UI nativa retornou limitação de macOS. As capturas Windows são evidências visuais complementares, sem simular um sucesso REA nessa etapa.

## Arquitetura observada

- O site público apresenta uma navegação institucional com oportunidades, empresa, explicação da jornada, captação e ajuda.
- O site público contém páginas com padrões diferentes: o blog, o contato e os documentos institucionais usam outra estrutura de navegação. A presença de estruturas WordPress/Elementor é observada no HTML; sua organização de servidor não foi inspecionada.
- A plataforma distribui módulos JavaScript e usa roteamento Angular com carregamento de componentes por imports dinâmicos. Rotas internas declaram guardas de acesso. O comportamento exato dos guardas e do backend não foi validado em execução completa.
- A área autenticada apresenta uma barra lateral de ícones. A página de ofertas é um ponto de entrada; carteira, marketplace, perfil, OTC e serviços bancários se conectam a ela.
- A carteira apresenta saldo disponível separado de total de ativos, ações operacionais, busca e abas de categorias.

## Inventário por superfície

| Superfície | Observado na referência | Entrega TokenHub | Cobertura |
|---|---|---|---|
| Início | Hero, app, jornada, simulador, projetos, segurança, parceiros e newsletter | Hero próprio, exemplos de projetos, jornada, cálculo de cenário e transparência | Layout público observado; números e claims próprios da referência não transferidos |
| Oportunidades | Cards em destaque, busca, categorias, tabela, finalizadas | Busca, categorias, ordenação, favoritos persistentes e estados vazios | Frontend funcional com fixtures |
| Detalhes da oferta | Galeria, emissor, lâmina, risco, captação, reservas, prazo, aporte e botão de investir | Resumo, documentos-modelo, riscos, atualizações e revisão de cenário | Oferta visualmente observada; aplicação real não executada |
| Empresa | História, equipe, métricas, presença e regulação | Valores do manual e apresentação institucional proposta | Métricas, equipe e autorizações TokenHub pendentes |
| Como funciona | Estruturação, tokenização, distribuição, cadastro e KYC | Jornada explicada e perguntas de avaliação | Conteúdo novo, sem reprodução literal |
| Captação | Tipos de ativos, etapas e formulário | Formulário com validação local e etapas de análise | Nenhum lead enviado |
| FAQ e conteúdo | Busca, categorias, artigos e apoio | FAQ filtrável, disclosures e artigos introdutórios próprios | Conteúdo de demonstração |
| Cadastro | Nacionalidade, nome, username, indicação, tipo de pessoa, e-mail, senha, confirmação, telefone e aceite | Wizard de três etapas e conclusão local | Etapas adicionais inferidas do DOM e do bundle são diferenciadas das telas visualizadas |
| Entrada e recuperação | E-mail, senha, visibilidade, lembrar e recuperação | Formulários locais, alternativa para explorar e confirmação de recuperação fictícia | Não autentica nem envia e-mail |
| Perfil | Dados, documentos, estado KYC e controles de segurança | Abas Dados, Documentos e Segurança | Sem coleta documental, ativação 2FA ou exclusão real |
| Carteira | Saldo/ativos, depósito, transferência, saque, troca, bridge, recompensa, staking e extrato | Saldos fictícios ocultáveis, categorias e jornadas explicativas | Não assina mensagens nem movimenta ativos |
| Extrato | Busca por ID, entradas/saídas, filtros e exportação | Busca por descrição, filtros e CSV local | Dados fictícios, não sincronizados |
| Marketplace | Alocações, commodities, colecionáveis, coleções e destaques | Lista por categorias, detalhe e revisão de compra fictícia | Amostra funcional da jornada, não reprodução integral de coleções |
| OTC | Ativos de entrada/saída, mínimo, configuração, cotação e mercado | Configuração e revisão matemática com preços estáticos identificados | Sem consulta ou trava real de cotação |
| Conta digital | Página de abertura para a conta observada | Jornada explicativa em três etapas e atalhos demonstrativos | Não foi aberta conta real para observar serviços adicionais |
| Indicações | Link, ganhos, contador e histórico | Link de demonstração copiável e estados vazios | Não atribui promessa de recompensa à TokenHub |
| Informe | Documento, baixar e imprimir | Página de posições fictícias com impressão e marca sem validade fiscal | Não é informe fiscal |
| Jurídico | Documentos e links regulatórios da referência | Assuntos de revisão e minutas identificadas | Documentos oficiais TokenHub necessários |

## Rotas adicionais declaradas, sem comprovação operacional

O bundle principal declara módulos bancários (`history`, `transfers`, `bills`, `deposits`, `finish-kyc`, `new-account`, `pix`, `my-keys`, `pix-history`, `receive`, `transfer`, `copy-paste`, `qr-code`, `withdrawals`, `external`, `pix-receive-link/:id/:userId`), estados de abertura (`form`, `success`, `suspended`, `disapproved`), verificação (`kyc`, `complete-your-registration`, `antifraud-approval`) e outros módulos (`payroll`, `salary-advance-company`, `salary-advance`, `onboarding`, `status`, `send`, `upload/:kind`, `documents`, `cycles`, `settlements`, `contracts`, `permissions`, `charges`).

Essas declarações foram encontradas por leitura estática. Não se comprovou que todos esses módulos estão liberados para a conta observada ou que possuem operações ativas. A interface demonstrativa não implementa integralmente folha de pagamento, antecipação salarial, conciliação, contratos, gestão de permissões ou serviços Pix. O arquivo `research/static-routes.jsonl` preserva os achados por bundle. O inventário não equivale a uma especificação completa dessas áreas.

## Melhorias propostas

1. **Navegação com nomes:** reduz a dependência de memorizar ícones; mantém acesso móvel com fechamento por Escape e foco controlado.
2. **Página inicial da conta:** oferece síntese e próximos passos, separando descoberta de ofertas da gestão do patrimônio.
3. **Saldo e aplicações distintos:** evita tratar valor aplicado como dinheiro imediatamente disponível.
4. **Comparação padronizada:** prazo, valor mínimo e natureza da projeção aparecem na mesma posição nos cards.
5. **Risco junto à decisão:** condições e avisos são apresentados antes da revisão da aplicação.
6. **Documentos e contexto:** abas distinguem explicação, riscos, atualizações e arquivos.
7. **Cadastro progressivo:** cada etapa explica a finalidade e a posição na jornada, com validação de confirmação da senha.
8. **Estados explícitos:** busca sem resultados, categoria sem registros, confirmação de demonstração e ausência de integração possuem mensagens específicas.
9. **Consistência institucional:** o mesmo cabeçalho e sistema visual unem conteúdo, ajuda, contato e oportunidades.
10. **Marca aplicada com critério:** paleta oficial, logotipos vetoriais extraídos do PDF, Raleway local e linguagem baseada em conexão, simplicidade e transformação.

## Validação e pendências

A validação de interface e seus cenários estão em `research/qa.cjs`; o resultado da execução está em `previews/qa-report.json`. As capturas de entrega são geradas a partir da versão local. Testes de frontend não comprovam segurança de autenticação, execução financeira, KYC, liquidação ou conformidade operacional.

Antes de converter a demonstração em produto: definir stack e hospedagem de produção, implementar API própria e modelo de autorização, escolher provedores de identidade e serviços financeiros, validar regras por produto, preparar documentação oficial TokenHub, testar com ambiente de homologação e executar revisão de segurança e acessibilidade completa.

Fontes públicas principais: [site institucional](https://tokeniza.com.br/), [oportunidades](https://tokeniza.com.br/oportunidades/), [como funciona](https://tokeniza.com.br/como-funciona/), [para captadores](https://tokeniza.com.br/para-captadores/), [FAQ](https://tokeniza.com.br/faq/) e [plataforma](https://plataforma.tokeniza.com.br/). As observações privadas permanecem locais e não fazem parte do pacote publicável.
