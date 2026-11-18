# Processo de um cliente novo

Tempo de referência: a SC Máquinas (18 produtos, 3 idiomas) levou uma sessão. Um cliente pequeno
(5 a 10 páginas) deve sair mais rápido reaproveitando a estrutura.

## 1. Diagnóstico (antes de escrever código)

- Abra o site atual no navegador (desktop e celular) e anote o problema real: quebrado, fora do ar,
  datado, sem conteúdo. Isso vira o argumento de venda.
- Descubra a plataforma: `/wp-json/` responde = WordPress (use a API REST, como na SC);
  `meta generator` diz Wix, Joomla etc. Site fora do ar: tente o Wayback Machine
  (`web.archive.org/web/2025*/dominio`).
- Defina o molde em [MOLDES.md](MOLDES.md).

## 2. Coleta do conteúdo real

Tudo vai para `sites/<cliente>/_original/` (as imagens brutas ficam fora do git pelo `.gitignore`).

- Textos, produtos/serviços, contatos (telefones, e-mails por setor, WhatsApp do botão flutuante,
  endereço, redes), idiomas existentes.
- Fotos: procure a **maior versão** de cada uma. No WordPress, liste a biblioteca de mídia
  (`/wp-json/wp/v2/media?per_page=100&page=N`); foi lá que apareceram as fotos de campo boas da SC,
  que nem estavam nas páginas.
- Escreva um `scripts/importar-conteudo.mjs` no site do cliente (modelo: o da SC) que gera
  `src/data/*.json` e as imagens otimizadas em `src/assets/`. Rodar de novo deve dar o mesmo resultado.

## 3. PRODUCT.md

Crie `sites/<cliente>/PRODUCT.md` (modelo: o da SC): público, objetivo, contatos, o que existe de
prova real e **o que não pode ser inventado**. É a fonte de verdade para textos.

## 4. Direção visual

- Use a skill Impeccable por dentro (contexto, direção, craft floor), sem abrir a página de decisão.
- Leve ao Arturo no chat 2 ou 3 direções em frases simples, com a recomendada primeiro. Se ele
  deixar com você, decida e siga.
- Registre o contrato da direção em `sites/<cliente>/.impeccable/surfaces/`.
- A direção nasce do mundo do cliente (o que o público dele conhece), não da categoria.
  SC = catálogo de feira agro. Hotel não é "foto de quarto com dourado".

## 5. Construção

- Copie de `sites/sc-maquinas/` a estrutura: `astro.config.mjs` (com `site`/`base` por variável de
  ambiente), `src/lib/i18n.ts` (função `url()` com prefixo), `src/lib/rotas.ts` + `src/pages/[...rota].astro`
  (uma rota gera o site todo), `Base.astro` (SEO, hreflang, noindex por `PUBLIC_NOINDEX`).
- Visual, componentes e textos são novos para cada cliente.
- Contato: botão de WhatsApp com mensagem pronta quando houver número; barra fixa no celular.
- Sem caminhos fixos começando com `/` no código: use `url()` e imports de assets, senão quebra no
  GitHub Pages.

## 6. Conferência

- `npm run build -w <cliente>` sem erro.
- Capturas em 1440 e 390 de largura: `python tools/capturas.py <url> <pasta> "/=home" "/rota/=nome"`.
  O script avisa rolagem horizontal e erros no console.
- Olhe as capturas de verdade e corrija antes de mostrar.
- Rode o detector: `impeccable detect --json <arquivos>` (skill Impeccable).

## 7. Antes/depois e publicação

- Capture o site antigo com o mesmo script e monte as imagens com
  `node tools/antes-depois.cjs <antes.png> <depois.png> <saida.png> <largura> <altura>`
  em `apresentacao/<cliente>/`.
- Adicione o cliente em `pages/index.html` e confira o nome da pasta: o workflow publica todo
  `sites/*` automaticamente em `/sites/<pasta>/`.
- Atualize o status em [MOLDES.md](MOLDES.md), commite e dê push na `main`.
