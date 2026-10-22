# Sobre a TokenHub — 22/10/2026

Mudanças na publicação GitHub Pages (branch gh-pages): banner contido em grid, leitura institucional sequencial, foto de equipe gerada e bloco de propósito com órbitas. Identidade: Raleway, azul-marinho e ciano.

Movimento: GSAP 3.13.0 + ScrollTrigger e Lenis 1.3.11 locais. Lenis somente para ponteiro preciso; toque permanece nativo. Preferência de movimento reduzido desliga os efeitos. A navegação desfaz timelines, eventos e suavização. Sem dependência de CDN em execução.

Referências consultadas: https://tokeniza.com.br/quem-somos/ (propósito, equipe e valores), https://www.liqi.com.br/ (proposição direta e organização por soluções), https://netspaces.org/ (narrativa de conexão entre imóveis e tecnologia). Coelho da Fonseca: https://www.coelhodafonseca.com.br/institucional/quem-somos — localizada, mas consulta direta indisponível (503); sem atribuir decisões visuais não verificadas.

Foto assets/photos/about-team-v2.webp: geração pela ferramenta integrada de imagens. Prompt: fotografia editorial natural de três colegas brasileiros de fintech sorrindo e colaborando em torno de um tablet, polos azul-marinho com pequeno emblema circular ciano, escritório contemporâneo, luz natural, sem texto. Cena ilustrativa, sem atribuição a funcionários reais. O banner mantém a imagem já aprovada, com enquadramento corrigido.

Validação: JavaScript e diff sem erros; navegador Chromium em 320, 390, 768, 1024, 1440 e 1920 px, sem overflow horizontal, imagens quebradas ou erros de JavaScript. Navegação e remontagem verificadas; 0 ScrollTriggers e sem suavização com movimento reduzido. Capturas desktop e mobile revisadas.

## Revisão do banner e órbitas

Banner substituído por assets/photos/about-hero-wide-v3.webp, 1920 × 640 px, em largura total. Imagem criada pela ferramenta integrada usando a foto anterior como referência de personagens e o exemplo de terrenos como referência de composição. Prompt: duas profissionais sorrindo com tablet à direita, polos azul-marinho e emblema ciano; espaço preto à esquerda com transição fotográfica ampla e suave; escritório até a borda direita, sem textos. Original de geração em 2172 × 724 px, redimensionado proporcionalmente para 1920 × 640 e otimizado para WebP.

Órbitas convertidas em SVG. Um modelo geométrico único atualiza a rotação das elipses e as coordenadas dos pontos e rótulos no mesmo quadro de animação. Textos permanecem na horizontal. Percursos e posições revisados para evitar colisões entre rótulos. Estado estático preservado com movimento reduzido e sem as bibliotecas.

Validação da revisão: banner de 0 a 1920 px no desktop; arquivo com dimensões 1920 × 640; pontos sobre as elipses e rótulos na horizontal em três fases de rolagem. Responsividade, carregamento de imagens, ausência de erros e limpeza de efeitos ao navegar novamente verificadas em seis larguras. Capturas desktop e mobile revisadas; título mobile sem cortes.
