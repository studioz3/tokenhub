# Contrato de design TokenHub

## Origem da marca

Manual de Identidade Visual TokenHub, 2025, fornecido pelo usuário. Páginas 6–10: logotipo, variações, símbolo, cores e construção. Página 12: tipografia. Página 5: inovação, transformação, conectividade, simplicidade e segurança.

| Papel | Valor | Aplicação |
|---|---|---|
| Azul principal | `#083650`, RGB 8/54/80 | Cabeçalho, navegação, áreas institucionais e ações de peso |
| Ciano de marca | `#00A2D4`, RGB 0/162/212 | Acentos, gráficos e CTAs com texto azul-marinho |
| Ciano para texto | `#006F92` | Derivação funcional para legibilidade em branco; não substitui a cor oficial no logotipo |
| Texto | `#102E40` | Conteúdo e títulos sobre superfícies claras |
| Secundário | `#5D707C` | Textos de apoio |
| Superfície | `#FFFFFF` e `#F3F7F9` | Cartões, formulários e fundo da plataforma |
| Linha | `#DCE5EA` | Separadores visuais sem transmitir significado sozinhos |

Amostras CMYK/Pantone constam no manual para impressão. O frontend usa os valores RGB indicados. Não se realizou conversão Pantone para inventar outra cor digital.

Os logotipos em `dist/assets/tokenhub-white.svg` e `tokenhub-navy.svg` foram extraídos das curvas da página 6, com leitura das coordenadas absolutas e composição dos vazados. Proporção e desenhos originais foram mantidos. As ilustrações de projetos são desenhos vetoriais próprios da proposta, não materiais da Tokeniza.

O manual menciona Raleway/Raleway Bold e Futura/Futura BT. Raleway é servida localmente. Nenhum arquivo Futura foi fornecido ou redistribuído; aparece apenas como fallback caso exista licenciado no dispositivo. A fonte de corpo é Raleway, com números alinhados nas áreas financeiras.

## Hierarquia por experiência

| Área | Trabalho principal | Ação dominante | Estados necessários |
|---|---|---|---|
| Site | Entender a proposta | Explorar oportunidades | Conteúdo, explicação de cenário e aviso demonstrativo |
| Oportunidades | Comparar projetos | Ver projeto | Busca, filtro, ordenação, favoritos e vazio |
| Detalhe | Entender condições e riscos | Simular aplicação | Visão geral, documentos, riscos, atualizações e revisão |
| Cadastro | Percorrer a jornada | Continuar | Etapa, erro de confirmação, aceite e conclusão |
| Visão geral | Localizar posição e próximos passos | Explorar ou ver carteira | Métricas ilustrativas e composição |
| Carteira | Acompanhar ativos | Consultar posição ou extrato | Saldos ocultos, categorias e estados vazios |
| Serviços financeiros | Entender a operação | Revisar cenário | Configuração, revisão e limites explícitos da demonstração |

## Regras de implementação

- Um único sistema visual para site, conteúdo, autenticação e plataforma.
- Layout claro na área financeira para favorecer leitura e comparação; marca azul nas áreas de navegação.
- Botões nativos, campos com labels, foco visível, abas operáveis por setas e modais com `dialog` nativo.
- Sem carrossel automático. A cena Three.js tem pausa, descarte de recursos e alternativa vetorial; `prefers-reduced-motion` impede o carregamento inicial da cena. Veja `Movimento-e-simulador-v2.md`.
- Telas revisadas em 375, 768, 1024 e 1440 px; tabelas extensas rolam dentro de seu contêiner.
- Nunca comunicar status ou risco apenas por cor. Badge sempre contém texto.
- Rentabilidade do exemplo identificada como hipótese. Evitar rankings que incentivem decisão apenas pelo maior retorno.
- Cadastro e formulários aceitam dados fictícios, não transmitem ou persistem credenciais.
- Favoritos locais são a única persistência de preferência; há ação para removê-los.
- Não atribuir à TokenHub autorizações, parceiros, clientes, retornos ou números da referência.

As skills aplicadas foram REA, Frontend UI Engineering, UI/UX Pro Max, PDF e Sites. A busca UI/UX Pro Max encontrou o padrão “Trust & Authority + Conversion” e estilo “Accessible & Ethical”. As recomendações genéricas de paleta e IBM Plex foram substituídas pela identidade fornecida pelo usuário. Não foi necessário instalar novas skills externas.
