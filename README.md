# Melo & Gomes Marcenaria

Landing page responsiva em português brasileiro, com galeria dos trabalhos enviados e pedido de orçamento pelo WhatsApp. O formulário valida os três campos obrigatórios, abre a mensagem preenchida no WhatsApp e não armazena os dados.

## Arquivos do ZIP

- `site/` — versão estática compilada, pronta para hospedagem em um servidor de arquivos estáticos.
- `source/` — arquivos-fonte usados no artefato do Replit; para recompilar, use o workspace pnpm original do projeto.

Para publicar em um domínio próprio, envie o conteúdo de `site/` para a raiz do site. O pacote foi compilado para a raiz do domínio; se a hospedagem usar um subcaminho, ajuste a base do Vite antes de recompilar e atualize também os caminhos de imagens, `og:image` e favicon.

## Marca e informações pendentes

As imagens da galeria são versões WebP otimizadas das fotos fornecidas. A logomarca oficial em PNG está incluída em `public/melo-gomes-logo.png` e aparece no cabeçalho e no rodapé; na versão escura, ela é exibida em branco para manter o contraste. O favicon continua usando o monograma compacto “M&G”, mais legível nesse tamanho.

Os cantos dos cartões, fotos, botões e formulário usam um arredondamento sutil. Horários e regiões atendidas não foram confirmados e, por isso, não aparecem como marcadores na versão pública. A localização exibida é São Paulo - SP.
