# Imagens e interface — versão 0.3

Data: 21/10/2026. Modo de geração: imagegen integrado, cinco imagens originais. Imagens fictícias, identificadas como “Imagem ilustrativa · IA”; não documentam empreendimentos reais.

## Imagens

### urban

Original: `assets-originais/urban.png` (incluído neste pacote para edição, fora da pasta publicável). Versões publicáveis: `dist/assets/photos/urban-{480,960,1536}.webp`.

Prompt utilizado:

Photorealistic editorial architectural photograph for the fictional TokenHub investment platform, asset category real estate. Wide landscape 3:2 image. A beautiful contemporary mid-rise Brazilian residential development, warm ivory concrete and timber shading, generous balconies, tropical trees and landscaped pedestrian courtyard, believable structural details. Human eye-height with a slight elevated perspective, clean composition, soft early morning daylight, warm natural colors, muted teal sky, crisp realistic textures. Building and courtyard fill the frame and remain recognizable in a wide 16:9 center crop. No text, no logo, no watermark, no investment numbers, no obvious CGI or futuristic objects. Illustrative conceptual architecture, not a named real development.

### solar

Original: `assets-originais/solar.png` (incluído neste pacote para edição, fora da pasta publicável). Versões publicáveis: `dist/assets/photos/solar-{480,960,1536}.webp`.

Prompt utilizado:

Photorealistic editorial aerial photograph for the fictional TokenHub platform, energy project category. Wide landscape 3:2 image. Operational solar farm in gently rolling Brazilian countryside: precise believable rows of deep blue photovoltaic panels across lush green fields, low hills and a few trees in the background, warm soft morning sunlight, realistic slight haze and natural photographic exposure. Low drone oblique perspective with panels as the main subject, strong visual depth and real scale, attractive composition legible as both a large landscape photo and a wide card crop. Rich natural greens and panel blues, no heavy color filter. No people posed, no text, no logos, no labels, no watermark, no fantasy technology.

### agro

Original: `assets-originais/agro.png` (incluído neste pacote para edição, fora da pasta publicável). Versões publicáveis: `dist/assets/photos/agro-{480,960,1536}.webp`.

Prompt utilizado:

Photorealistic editorial agricultural photograph for the fictional TokenHub platform. Wide landscape 3:2 image. Prosperous Brazilian countryside with meticulously planted green crop rows gently curving over rolling land, a small working tractor distant near the horizon and a cluster of native trees, soft morning light with golden highlights and natural blue sky. Low drone oblique view, tangible soil and leaf textures, authentic agronomy rather than a fantasy render. Green crops fill the foreground and center for a useful wide 16:9 project-card crop. Premium but believable documentary photograph, no text, no logos, no watermark, no investment graphics.

### flow

Original: `assets-originais/flow.png` (incluído neste pacote para edição, fora da pasta publicável). Versões publicáveis: `dist/assets/photos/flow-{480,960,1536}.webp`.

Prompt utilizado:

Photorealistic editorial commercial real estate and logistics photograph for the fictional TokenHub platform, receivables project category. Wide landscape 3:2 image. A modern Brazilian distribution center seen from a low drone angle: clean light-gray warehouse, organized loading bays, two ordinary unbranded freight trucks, subtle greenery, natural bright morning light and realistic building proportions. Strong geometric composition with clear depth, authentic functional industry, details readable in a wide landscape crop. Natural colors with ivory, steel gray and a restrained blue sky, not a blue monochrome image. No text, brand logos, signage, watermarks or overlays.

### people

Original: `assets-originais/people.png` (incluído neste pacote para edição, fora da pasta publicável). Versões publicáveis: `dist/assets/photos/people-{480,960,1536}.webp`.

Prompt utilizado:

Photorealistic natural editorial lifestyle photograph for the fictional TokenHub platform's onboarding and internal banking introduction. Wide landscape 3:2 image. Candid Brazilian woman in her thirties, warm medium brown skin and natural dark curly hair, wearing a simple ivory blouse, comfortably reviewing something on a laptop at a bright contemporary home workspace. Soft daylight from a large window, a small plant and warm wood, relaxed attentive expression, credible everyday financial planning rather than a sales stock pose. Woman and laptop towards right half, softly defocused uncluttered space towards left useful for an image crop. Laptop screen turned away, no legible interface or personal data. Realistic skin and hands. Natural warm neutral colors, subtle navy accent, no text, logos, watermarks or fabricated financial charts.

## Alterações

- Fotografias responsivas nas oportunidades, detalhes, marketplace, painel, acesso, conta digital e páginas institucionais. WebP em três tamanhos; lazy loading fora de contextos prioritários, dimensões explícitas e texto alternativo. Os 15 arquivos totalizam aproximadamente 2,52 MB.
- Cena Three.js com bases claras, contornos contrastantes, órbita mais visível, interação com cursor/toque e seleção de Imóveis, Energia e Tokens. Pausa, fallback vetorial e preferência por movimento reduzido preservados.
- Mesa OTC em dois painéis inspirada na referência fornecida: ativos, pagar/receber, percentuais, validação, revisão da cotação com validade de 30 segundos, gráfico e períodos, calculadora independente e histórico local da sessão.
- Carteira com olhos independentes em cada cartão, detalhamento por ativo/rede e expansão dos outros ativos. Valores ocultos são substituídos no texto do DOM. A soma ilustrativa disponível é R$ 1.125,00 em BRL e R$ 1.000,00 equivalentes em USDT.

## Validação

52 cenários gerais, 10 de movimento e simulador e 9 verificações específicas da versão 0.3. A última inclui cinco páginas em larguras 320, 375, 768, 1024 e 1440 pixels; expiração de cotação e ausência de alteração de saldo pela simulação. Relatórios em `previews/qa-report.json`, `previews/motion-qa-report.json` e `previews/v3-qa-report.json`.

## Escopo

Frontend demonstrativo. Preços, gráfico, saldos, ofertas e execuções são fictícios. Nenhuma integração de custódia, ordem financeira, endereço de depósito, KYC ou autenticação real foi adicionada. Os materiais da referência servem de evidência de interface e não são instruções operacionais.



