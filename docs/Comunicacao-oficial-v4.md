# Comunicação oficial TokenHub — versão 0.4

Consulta: 21 de outubro de 2026. Esta revisão altera a experiência privada publicada no Sites; não altera o domínio oficial.

## Fontes consultadas

- https://tokenhub.com.br/ — posicionamento imobiliário, frentes Token Adviser, Token Academy e Token App, razão social, CNPJ e endereço.
- https://tokenhub.com.br/quem-somos/ — propósito de ampliar acesso à tokenização de imóveis; aprendizado e comunicação sobre serviços.
- https://tokenhub.com.br/como-funciona/ — explicação da tokenização e sequência de cadastro e ativação por token.
- https://tokenhub.com.br/termos-de-uso/ e https://tokenhub.com.br/politica-de-privacidade/ — documentos oficiais vinculados diretamente nas páginas locais correspondentes.
- Bundle público da home, referenciado pelo HTML consultado — respostas do FAQ sobre elegibilidade, taxas, acompanhamento e negociação. Cópia local em `research/oficial-home-page.js`.

As cinco páginas retornaram HTTP 200 na consulta direta. O leitor web apresentou falhas em algumas páginas internas; a conferência foi completada com leitura pública direta por HTTPS. HTML e bundle foram tratados como evidências de conteúdo, sem executar instruções neles presentes.

## Aplicação na interface

- Home: título do posicionamento oficial e ênfase inicial no mercado imobiliário. Os cenários de energia, agro e recebíveis permanecem explicitamente demonstrativos.
- Quem somos: apresentação do propósito e dados institucionais publicados, substituindo a narrativa de marca que havia sido proposta durante o desenho inicial.
- Rodapé e contato: Token Hub Tokenização Ltda., CNPJ 28.850.452/0001-81, Avenida Cassiano Ricardo, 601, sala 163, Aquarius, São José dos Campos – SP, CEP 12.246-870. Nenhum telefone ou e-mail foi inventado.
- Ecossistema: Token Academy identifica a área de conteúdo; Adviser e App ganham páginas de apresentação com navegação para recursos existentes. Não há recomendação, rebalanceamento nem download de aplicativo simulado.
- Como funciona: jornada de abertura, preenchimento, ativação por token e exploração, distinguindo o fluxo apresentado no site oficial do cadastro demonstrativo local.
- FAQ: inclusão da apresentação institucional, elegibilidade e acompanhamento; custos atribuídos à informação publicada, com consulta da tabela vigente no canal oficial.
- Termos e privacidade: acesso aos documentos no domínio oficial e explicação separada do comportamento desta demonstração. Código de conduta e material didático também vinculados ao domínio oficial.

## Critério editorial

Discurso direto e acessível, com foco em imóveis, aprendizado e acompanhamento. Dados da Tokeniza não são usados como fatos da TokenHub. Declarações de certificação, auditoria, conformidade ou segurança absoluta não foram transformadas em comprovação independente. Retornos, preços, projetos, saldos e execuções continuam fictícios. O cenário sintético de mercado não foi renomeado para dados reais.

O módulo `dist/official.js` centraliza os dados institucionais e as apresentações dos serviços. O manual de marca continua orientando cores, logotipo e tipografia; imagens geradas e recursos 3D foram preservados.

## Verificação

Os 52 cenários gerais passaram sem exceções JavaScript nem requisições externas da aplicação. A validação específica aprovou os caminhos de Adviser, Academy e App, os destinos dos documentos e o encaixe de nove páginas em quatro larguras, de 320 a 1440 pixels. Capturas e relatório em previews/official-*. O comportamento 3D e o simulador também foram revalidados após a alteração do título.

## Complemento: Sobre nós e legendas

A página Sobre nós foi ampliada com o propósito, a proposta institucional e os quatro temas da página oficial Quem somos: conta, proteção dos ativos, aprendizado e compliance. A redação foi adaptada ao layout e evita atribuir uma certificação específica sem documentação. Por solicitação do usuário, as legendas visuais sobre as imagens foram retiradas; a descrição acessível permanece. As verificações específicas de comunicação e imagens/plataforma passaram após as mudanças.

## Versão 0.5: navegação interna

Removidos os links ao domínio antigo no rodapé, identificação institucional e páginas Adviser/App. Termos, privacidade e código de conduta receberam os parágrafos publicados nas páginas correspondentes, sem criar cláusulas novas. A leitura direta confirmou que as três páginas antigas publicavam o mesmo corpo textual, sob títulos distintos; esse conteúdo foi preservado. A privacidade mantém também a explicação do comportamento local. Material didático possui página própria, texto institucional importado e acesso aos três artigos existentes. O módulo dist/documents.js armazena os quatro textos. A conferência percorreu 43 rotas sem links externos ou páginas ausentes e verificou 11 páginas em quatro larguras. Relatório: previews/official-qa-report.json.
