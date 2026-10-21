# TokenHub — pacote completo para continuar em outro chat

Versão exportada: 21/10/2026, após a correção do caminho de navegação em uma linha. Esta pasta é independente do projeto Minha Corrida.

## Executar

1. Extraia o ZIP inteiro. Preserve a estrutura de pastas.
2. Abra um terminal dentro da pasta `TokenHub`.
3. Com Node.js instalado, execute:

```sh
node server.cjs
```

Para entrar, escolha **Explorar a plataforma**. Não precisa de login real nem de instalar pacotes para usar o site. Não abra apenas `dist/index.html` por duplo clique: os módulos JavaScript precisam de um servidor HTTP.

`npm start` faz o mesmo. Se a porta estiver ocupada, configure `TOKENHUB_PORT`. No Windows, o atalho `Abrir TokenHub.cmd` é uma alternativa quando o Chrome está instalado no caminho padrão.

Se houver Python, mas não Node.js, também é possível servir apenas o frontend estático, a partir desta pasta:

```sh
python -m http.server 4188 --bind 127.0.0.1 --directory dist
```

Abra o mesmo endereço no navegador. Nesse caso os comandos `npm` continuam exigindo Node.js.

Se o outro ChatGPT não puder abrir o ZIP ou executar Node.js, ele ainda poderá orientar a execução no seu computador. Ferramentas e conexões de um chat não são transferidas pelo pacote.

## O que enviar ao outro chat

Anexe o ZIP completo e cole o texto de `PROMPT-PARA-OUTRO-CHAT.md`. Peça para ler `CONTINUIDADE.md` antes de editar. Todos os arquivos Markdown estão dentro do ZIP; não é necessário enviá-los separadamente.

## Conteúdo

- `dist/`: código completo e arquivos estáticos publicáveis; é a fonte atual da interface. Não há build pendente nem código de frontend ausente em `src/`.
- `server.cjs`, `package.json`: execução local e comandos de verificação.
- `docs/`: levantamento REA, decisões de design, integrações pendentes, imagens/prompts, comunicação e validação. São também o histórico do trabalho; decisões posteriores em `CONTINUIDADE.md` prevalecem sobre descrições antigas.
- `brand/TOKEN_Manual-da-marca.pdf`: manual fornecido pelo usuário, para consulta; não é preciso publicá-lo.
- `assets-originais/`: cinco PNGs gerados. As versões otimizadas já estão em `dist/assets/photos/`. Os originais não são necessários para executar.
- `previews/`: capturas selecionadas e relatórios de validação. Alguns registram etapas anteriores do trabalho; não são uma captura única da publicação mais recente.
- `research/`: testes opcionais portáveis. Não contém capturas privadas da conta Tokeniza.
- `deployment/hosting-existente.json`: identidade e configuração do Site existente, sem credenciais. É referência para continuidade da mesma publicação, não uma instrução para publicar automaticamente.
- `MANIFESTO-SHA256.json`: inventário dos arquivos do pacote e hashes para conferência.

## Verificar

```sh
npm run check
```

Para testes de navegador, instale separadamente `playwright-core` nesta pasta e disponibilize Chrome ou Chromium. Informe seu executável em `TOKENHUB_CHROME_PATH` se não for detectado. Depois execute `npm test`, `npm run test:motion`, `npm run test:v3` e `npm run test:official`. Essas dependências são opcionais e não fazem parte da execução normal.

Os testes exigem abrir portas locais e iniciar um navegador. Em ambientes restritos, pode ser necessária autorização do ambiente. Os relatórios são gravados em `previews/`. O teste de movimento requer WebGL 2 para verificar a cena; a interface tem alternativa vetorial quando WebGL não está disponível.

## Limite funcional

O pacote contém um frontend demonstrativo, não os serviços de servidor da Tokeniza. Cadastro, autenticação, depósitos, saques, investimentos, custódia, ordens OTC, pagamentos e documentos fiscais não são operações reais. Os dados são fictícios. Para implementar a operação real, comece por `docs/Integracoes-e-proxima-etapa.md`.
