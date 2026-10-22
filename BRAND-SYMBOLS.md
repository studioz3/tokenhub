# Símbolos oficiais TokenHub

Fontes fornecidas pelo usuário em 22/10/2026:
- `assets/tokenhub-symbol-white.svg`: símbolo branco oficial.
- `assets/tokenhub-symbol-navy.svg`: símbolo azul-marinho oficial.

Os arquivos mantêm literalmente os caminhos `d`, os viewBox e as regras de preenchimento dos SVG enviados. Apenas a declaração/codificação de texto foi convertida de UTF-16 para UTF-8 para uso na web. Não redesenhar com círculos, traços, toros ou outras aproximações. Usar estes arquivos, preservar a proporção e evitar filtros que alterem o contorno.

Ocorrências corrigidas:
- Componente compartilhado `.brand-symbol`: órbitas em Sobre nós, telas de acesso/cadastro/recuperação e cartão da conta digital.
- Favicon: mesmo caminho oficial branco incorporado ao SVG para funcionamento sem recursos externos.
- Cena Three.js: textura carregada diretamente do SVG branco, com descarte da textura junto aos recursos da cena.
- Ilustração alternativa da moeda: imagem SVG oficial no lugar do desenho aproximado.

Logotipos completos de navegação/rodapé continuam nos arquivos vetoriais existentes `tokenhub-white.svg` e `tokenhub-navy.svg`. Ícones funcionais e símbolos de outras moedas não são símbolos da marca TokenHub.

Validação: comparação automática de caminhos e viewBox com os dois anexos: idênticos. Verificação em navegador de Sobre nós, entrar, cadastro, recuperação, conta digital e início; símbolos carregados, proporção preservada com object-fit:contain, sem erros JavaScript. Cena WebGL montada e descartada, textura SVG oficial conferida visualmente. Fotografias aprovadas mantidas.
