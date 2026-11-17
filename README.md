# sites-cdl

Redesign de sites de associados da CDL / ACIJS de Jaraguá do Sul. Cada cliente é um site Astro estático em `sites/<cliente>/`; o que for comum entre clientes vai para `packages/base/`.

## Rodar

```powershell
npm install
npm run dev:sc        # SC Máquinas em http://localhost:4321
npm run build:sc      # gera sites/sc-maquinas/dist
```

## Estrutura de um cliente (molde Indústria)

```
sites/sc-maquinas/
  _original/                 coleta do site antigo (imagens brutas fora do git)
  scripts/importar-conteudo.mjs   puxa conteúdo real do WordPress antigo e otimiza imagens
  src/data/                  dados gerados (maquinas.json, campo.json, posts.json) + empresa.ts (contato e textos)
  src/lib/                   i18n (PT/EN/ES), dados, rotas
  src/views/                 páginas (Home, Maquinas, Maquina, Culturas, Empresa, Contato, Blog, Post)
  src/components/            peças reaproveitáveis (Busca, IndiceCatalogo, FaixaCampo, BlocoContato...)
  PRODUCT.md                 fatos do cliente (o que pode e o que não pode ser dito)
```

Para atualizar o conteúdo a partir do site antigo: `npm run conteudo -w sc-maquinas`.

## Antes / depois

Imagens prontas para a apresentação ao cliente em `apresentacao/<cliente>/`.
