# Validação do pacote de transferência

Data: 21/10/2026.

- Os 43 arquivos em `dist/` foram comparados por SHA-256 com a pasta corrente do projeto; nenhuma diferença.
- `npm run check` passou na pasta exportada.
- Os quatro scripts de testes e o adaptador de execução passaram na verificação de sintaxe.
- Os 52 cenários gerais foram executados a partir da própria pasta exportada e passaram, sem exceções JavaScript e sem requisições externas atribuídas à aplicação.
- Para essa execução foi disponibilizado o Playwright Core já instalado no computador, pelo parâmetro `TOKENHUB_PLAYWRIGHT_MODULE`. Esse caminho não foi gravado nos arquivos do pacote. O ambiente receptor deve instalar sua dependência opcional ou configurar o caminho de sua própria instalação.
- A ferramenta de segurança do computador injetou requisições no navegador; elas estão identificadas separadamente no relatório e não integram o código. O software de segurança não foi alterado.
- O pacote não contém `.git`, sessões de navegador, arquivos `.env`, tokens de publicação nem capturas da conta privada usada como referência.

Os resultados de movimento, plataforma e navegação preservados em `previews/` são das execuções anteriores documentadas. A transferência não representa uma implantação de backend ou uma nova publicação; o site hospedado foi mantido.

O manifesto lista os arquivos e seus hashes, exceto o próprio manifesto. Ele permite comparar a integridade depois de extrair o ZIP.
