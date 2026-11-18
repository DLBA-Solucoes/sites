# Moldes por segmento

Um molde é a **estrutura** que se repete num segmento: páginas, tipo de dado, busca, ação principal.
O visual não faz parte do molde; cada cliente ganha o seu.

| Molde | Segmento | Páginas típicas | Ação principal | O que tem de especial |
|---|---|---|---|---|
| A | Indústria e B2B | home, catálogo, produto, aplicações/culturas, empresa, contato | orçamento por WhatsApp/telefone | ficha técnica comparável, PDF, idiomas para exportação |
| B | Comércio local | home, o que vende, sobre, como chegar | WhatsApp e mapa | horário, endereço e WhatsApp sempre visíveis |
| C | Serviços de confiança (advocacia, contabilidade, saúde, educação) | home, áreas de atuação, equipe, contato | agendar conversa | sóbrio, autoridade, equipe com nome e foto real |
| D | Comida e hospedagem | home, quartos/cardápio, eventos, localização | reservar (motor de reserva do cliente) ou WhatsApp | fotos grandes, mapa, reserva sem atrito |
| E | Estoque (imóveis, veículos) | home, busca, item | WhatsApp do item | depende de feed/API do sistema do cliente; deixar para depois |

## Status dos clientes

Sem contatos aqui (repo público). Contatos ficam na lista do Arturo.

| Cliente | Lista | Molde | Status | Prévia |
|---|---|---|---|---|
| SC Máquinas e Implementos Agrícolas | CDL 1 | A | publicado | `/sites/sc-maquinas/` |
| Arte Laje | CDL 3 | A | publicado | `/sites/arte-laje/` |
| Hotel Kayros | CDL 9 | D | recomendado | |
| Hotel Itajara | CDL 2 | D | site fora do ar em 18/11/2026; mesmo template do Kayros | |

## Aprendizados por molde

- **A (SC):** a biblioteca de mídia do WordPress tinha fotos melhores que as páginas. Fichas técnicas
  em tabelas do JetEngine (`tr.jet-listing-dynamic-repeater__item`). Erros de digitação do site antigo
  quebram a comparação de fichas: normalizar chaves em `src/lib/dados.ts`.
- **A (Arte Laje):** site estático em PHP (coletor `tools/coletar-estatico.mjs`), fotos de só ~560 px: o visual não pode depender de foto grande. A peça central virou um desenho técnico interativo (corte da laje em SVG) montado a partir do texto deles. Os banners de obra têm degradê branco embutido: cortar na importação. Só português, 10 páginas.
