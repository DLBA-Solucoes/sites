# DESIGN · SC Máquinas

Mundo: **Catálogo de Feira**. O site é o catálogo entregue no estande da SC numa feira agro: cada
máquina num palco preto, o código do modelo enorme, a ficha técnica como página de papel inserida.
Fonte da verdade dos tokens: `src/styles/global.css`.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `palco` | `#111315` | fundo principal (palco) |
| `palco-2` | `#181b1e` | faixas alternadas, rodapé |
| `aco` / `aco-2` | `#2a2e33` / `#3b4046` | regras de 1 px, bordas |
| `nevoa` | `#a3a9af` | texto secundário no escuro (7:1 no palco) |
| `papel` / `papel-2` | `#f4f4f1` / `#e7e7e1` | fichas técnicas, busca, cartão da fábrica |
| `tinta` / `tinta-2` | `#111315` / `#4a4f55` | texto no papel |
| `marinho` | `#1c3154` | azul do logo; estrutura das fichas (títulos, régua do cabeçalho) |
| `sinal` / `sinal-vivo` | `#d41920` / `#ed1c24` | única cor de ação (botões, números, marcadores) |

Laranja e vermelho das fotos são cor das máquinas, não da marca: não usar como cor de interface.

## Tipo

Archivo variável (pesos 100 a 900, largura 62 a 125%), auto-hospedada em `src/assets/fonts/`.

- `.display`: largura 64%, peso 850, maiúsculas, entrelinha 0,92. Títulos de página e códigos.
- `.titulo`: largura 72%, peso 800, maiúsculas. Títulos de seção e nomes.
- `.rotulo`: largura 88%, peso 650, 13 px, maiúsculas espaçadas. Só para rótulo de campo e metadado,
  nunca em cima de título.
- Corpo: largura 100%, 17 px, entrelinha 1,55. `.num` liga números tabulares nas fichas.

## Componentes

- **Palco:** foto recortada (fundo transparente) grande, código fantasma gigante atrás (`#262b31`),
  pontos numerados vermelhos ligados à ficha real.
- **Busca:** faixa de papel com cultura, potência do trator, engate (segmentado) e botão vermelho com
  a contagem ao vivo. Modo `ir` (home) e `filtrar` (catálogo, filtra a lista e atualiza a URL).
- **Índice do catálogo:** linhas numeradas Nº 01 a 18 por família, sem cards.
- **Ficha técnica:** papel, régua marinho, linhas de 1 px; item ausente vira traço cinza no mesmo lugar
  (slots fixos), para comparar modelos. Tabela "Compare com a linha" com coluna fixa.
- **Quadros de campo:** fotos reais em rolagem lateral, número vermelho + código de borda (cultura · linha).
- **Botões:** cantos retos, condensado em maiúsculas, `sinal` cheio ou contorno 1,5 px.
- **Barra de contato no celular:** WhatsApp, Ligar e E-mail fixos embaixo.

## Movimento

Um relógio só, na entrada: código fantasma revela por `clip-path`, a máquina entra com desfoque e
brilho, os pontos aparecem em sequência, a busca sobe. Curva `cubic-bezier(0.16, 1, 0.3, 1)`.
Tudo desligado com `prefers-reduced-motion`. Menu do celular abre com `clip-path`.
