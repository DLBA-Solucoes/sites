# sites (DLBA): redesign de sites de associados

Arturo e dois sócios (DLBA Soluções) vendem redesign de site para empresas de Jaraguá do Sul e região
que têm site velho, quebrado ou fraco. A venda é um antes/depois feito com o **conteúdo real** da
empresa (textos, fotos, contatos, produtos do site atual), nunca um mockup genérico. Arturo cuida da
parte técnica e não é de front-end: explique decisões em português simples.

Lista de prospects: fora do repo (PDF/MD do Arturo, com e-mails e telefones). **Este repo é público:
nunca commitar contato de prospect, planilha da lista ou qualquer dado pessoal.**

## Antes de qualquer coisa

1. Leia [docs/PROCESSO.md](docs/PROCESSO.md) (passo a passo de um cliente novo) e
   [docs/MOLDES.md](docs/MOLDES.md) (os 5 moldes por segmento e o status de cada cliente).
2. Site de referência pronto: `sites/sc-maquinas/` (molde A, Indústria). Copie a estrutura dele,
   não o visual.

## Regras

- **Conteúdo real só.** Nada de depoimento, número de clientes, prêmio, preço ou certificação que o
  site atual não tenha. Se o site antigo tem erro de digitação no dado, corrija no código de
  normalização, não invente.
- **Cada cliente com identidade própria.** Os associados se conhecem; dois sites com a mesma cara
  queimam a venda. O molde dá a estrutura (páginas, dados, busca); cor, tipo e composição são do
  cliente.
- **Escolhas para o Arturo: no chat, 2 ou 3 opções claras.** Nunca abrir a página de decisão do
  Impeccable (cards, "sortear", re-roll). As skills de design trabalham por dentro.
- **Sem cara de IA:** nada de rótulo pequeno em cima de título (eyebrow), cards iguais em grade,
  texto com gradiente, vidro fosco decorativo, fundo creme com serifada por padrão.
- **Acabamento:** toda interação com transição (menu, filtro, galeria), `prefers-reduced-motion`
  respeitado, foco visível, alvos de toque de 44 px, sem rolagem horizontal no celular.
- **Textos do site** no idioma do cliente; código, commits e docs em português, sem travessão.
- Commits: Conventional Commits em português, só assunto, sem coautor.

## Stack

Astro (estático) + Tailwind 4, imagens otimizadas pelo `astro:assets`, ilhas de JS puro só onde
precisa. Monorepo npm: `sites/<cliente>/` e `packages/base/` (o que for comum entre clientes).
Publicação: GitHub Pages pelo workflow `.github/workflows/pages.yml`, em
`https://dlba-solucoes.github.io/sites/<cliente>/`, com `noindex` (prévia interna).

Comandos (PowerShell):

```powershell
npm install
npm run dev -w <cliente>        # http://localhost:4321
npm run build -w <cliente>
python tools/capturas.py http://localhost:4321 sites/<cliente>/.impeccable/review "/=home"
```
