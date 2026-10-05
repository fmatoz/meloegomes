# Melo & Gomes Marcenaria

Landing page responsiva com projetos reais, depoimentos identificados e orçamento pelo WhatsApp.

## Publicação

A Vercel usa a raiz deste repositório e publica a pasta `site/`, conforme `vercel.json`. Não use `source/` como Root Directory. A versão compilada está incluída para publicação sem etapa de build.

## Desenvolvimento

O código em `source/` funciona independentemente do Replit. Com Node.js 22 ou superior e pnpm:

```sh
cd source
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
```

A compilação atualiza `site/`. Envie tanto as alterações em `source/` quanto a versão compilada ao GitHub.

## Conteúdo

As fotografias, logo e textos dos depoimentos foram fornecidos. Os nomes das avaliações são Wagner Cunha, vitoria ellen e Tatiana Barbosa. A nota 4,9 é a nota geral informada; notas individuais não foram atribuídas. O link Google abre a busca da empresa pelo nome e endereço.

O formulário valida três campos e abre uma mensagem preenchida no WhatsApp. Não armazena dados. O botão flutuante abre uma conversa diretamente. Horários e regiões atendidas não confirmados não são apresentados.
