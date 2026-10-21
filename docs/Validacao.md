# Validação da demonstração TokenHub

Execução em 21/10/2026, Chrome 155 no Windows, Playwright Core existente no workspace. Resultado: **52 verificações aprovadas**. Relatório estruturado em `previews/qa-report.json`.

## Verificações

- Dez telas em quatro larguras: 375, 768, 1024 e 1440 px. Checagem de título principal, imagens carregadas e ausência de transbordamento horizontal da página.
- Busca, categorias, limpeza de filtros, favoritos e persistência após recarregar.
- Juros simples equivalentes à referência, resultados em 18/32/48 meses e limites dos sliders de taxa e capital.
- Cadastro em etapas, erro de confirmação de senha, aceites e conclusão fictícia.
- Abas de oferta, navegação por setas e revisão de aplicação hipotética.
- Ocultar valores e revisar operação de carteira sem alterar saldo.
- Download de extrato CSV e filtro por direção da movimentação.
- Jornada explicativa de abertura bancária.
- Quantidade, total e revisão de compra fictícia no marketplace.
- Cenário matemático OTC com taxa e custo identificados como estáticos.
- Busca no FAQ e abertura das respostas.
- Validação de contato com confirmação sem envio.
- Menu móvel e fechamento por Escape.
- Ausência de exceções JavaScript e de respostas HTTP de erro no aplicativo durante a execução.

## Rede no ambiente de teste

Não houve requisições externas atribuídas ao código da aplicação. O navegador recebeu requisições injetadas (quantidade registrada no JSON de cada execução) pelo software de segurança do computador para `gc.kis.v2.scr.kaspersky-labs.com`. Essa origem foi registrada separadamente no relatório; a injeção não faz parte dos arquivos do projeto. O antivírus não foi desativado ou reconfigurado. A verificação falha caso apareça outra origem externa inesperada.

## Revisão visual

As capturas finais da home e da visão geral foram inspecionadas em desktop e celular. Durante a revisão foram corrigidos os comandos absolutos dos vetores extraídos do PDF, os vazados do logotipo, o posicionamento de conteúdo acessível em tabelas e a visibilidade do toast vazio.

Capturas finais: `home-desktop.png`, `home-mobile.png`, `dashboard-desktop.png` e `dashboard-mobile.png`. A imagem `overflow.png` é apenas diagnóstico intermediário e não pertence à entrega visual final.

## Limites

As verificações cobrem o frontend demonstrativo. Não substituem uma auditoria WCAG completa, teste com leitores de tela, teste de produção em Safari/Firefox, avaliação de segurança de backend, integração financeira ou validação de regras jurídicas e tributárias. A execução final inclui a licença da fonte e a verificação de retorno do foco após a revisão em modal.

