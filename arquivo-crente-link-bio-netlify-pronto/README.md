# Arquivo Crente — Link na Bio

Página pública do Arquivo Crente construída com React, Vite e uma Netlify Function para atualizar automaticamente os dados do YouTube.

## Estrutura

- `src/`: interface da página.
- `netlify/functions/youtube.ts`: endpoint seguro usado pelo frontend.
- `netlify/functions/youtube-core.ts`: integração e formatação dos dados do YouTube.
- `netlify.toml`: build, funções e rotas do Netlify.
- `tests/`: testes do endpoint, formatação e configuração.

## Requisitos

- Node.js 22 ou superior.
- Uma chave da YouTube Data API v3.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Para testar a função localmente com o Netlify CLI, configure `YOUTUBE_API_KEY` em um arquivo `.env` que não seja enviado ao GitHub.

## Verificações

```bash
npm test
npm run lint
npm run build
```

## Publicação

Leia [NETLIFY-PUBLICACAO.md](./NETLIFY-PUBLICACAO.md).

## Segurança

Nunca coloque o valor de `YOUTUBE_API_KEY` em arquivos do repositório. Cadastre a chave no painel do Netlify em **Project configuration → Environment variables**.
