# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), Tailwind CSS, small React islands only where interaction needs them. Hosted on Cloudflare Pages. Part of the `sites-cdl` monorepo, where shared pieces live in `packages/` and each client lives in `sites/<client>/`.

## Users

Primary: the rural producer (small and mid-size farms in Brazil) choosing a sprayer, atomizer, cannon, seeder, fertilizer spreader or drone pre-mixer for a specific crop (coffee, citrus, banana, cassava, vineyards, pasture, vegetables, tall crops). They usually arrive from a phone, often in the field, and decide by crop, tractor power (HP) and hitch type (3-point or trailed).
Secondary: dealers/resellers who need the technical sheet and PDF catalog; foreign buyers (export since 2013) reading in English or Spanish.

## Product Purpose

Present SC Máquinas e Implementos Agrícolas (Jaraguá do Sul, SC) as the manufacturer it is: a factory that designs and builds spraying and application equipment, and help the producer find the right machine for their crop and tractor, then call or email the company. Success: a producer finds the right model and contacts SC.

This site is also a sales demo: our team shows it to SC side by side with their current site, built with their real content.

## Positioning

A Brazilian factory (since 1995, as Cattoni Usinagem) with its own JET line of cannons and atomizers, machines sized by tractor HP, and a catalog organized by crop. Real field photography of their machines spraying in banana, cassava, coffee and pasture fields.

## Operating Context

- Contact today: phones +55 (47) 3376-1860, 3376-4209, 3273-5098; atendimento@scmaquinas.com (sales), sales@scmaquinas.com (export), compras@, rh@. Address: R. JGS 010 Waldemar Gumz, Jaraguá do Sul - SC.
- WhatsApp: +55 47 3376-4209 (same as the main landline), taken from the floating WhatsApp button on the current site. Primary action is WhatsApp, then phone and email.
- Social: Instagram and Facebook (scmaquinasagricolas), LinkedIn, YouTube.
- Product PDFs (catalogs) exist per product family.

## Capabilities and Constraints

- 18 product models in PT, each with EN and ES versions (54 records): title, model line (hitch + HP or voltage), intro, bullets, spec table, gallery, PDF catalog.
- Product families (linhas): Atomizadores (3 pontos, arrasto), Canhões (3 pontos, arrasto), Distribuidores, Misturadores, Pulverizador em Barras.
- Crops (cultivos) are many-to-many with products.
- 4 blog posts (PT).
- History timeline: 1995 Cattoni Usinagem; 1999 Cattoni Máquinas e Implementos; 2004 linha Moldecatto; 2009 linha JET; 2013 exports and new 2,700 m² plant; 2017 rename to SC Máquinas e Implementos; 2021 new implement lines; 2023 focus on the JET line.
- Mission, vision and values text exists (About page).
- Undecided: whether SC will edit content themselves (a CMS can be added later).

## Brand Commitments

- Logo: shield monogram "SC" plus wordmark "SC Máquinas e Implementos Agrícolas", navy blue and red. Keep the logo as is.
- Machines carry orange (atomizer fans) and red (cannons) in the photos; those are product colors, not necessarily brand colors.
- Voice: plain, direct Portuguese aimed at the producer; no hype.

## Evidence on Hand

All in `sites/sc-maquinas/_original/` (scraped 2026-11-17 from scmaquinas.com):
- `produtos.json`, `termos.json`, `paginas.json`, `posts.json`, `imagens.json`
- `imagens/`: 252 original images. Field drone photos (e.g. `2024_05_DRONE-IPIRA-01.png`, `2024_05_DJI_0361.png`, `2024_05_foto-DEMONSTRACAO-MANDIOCA-...png`), studio shots of machines on black or white, factory aerial (`2024_05_SCMAQUINAS-01.png`), timeline images, crop photos (some are stock).
- Testimonials: the current site has a "Depoimentos" heading but no testimonial content. Do not invent testimonials, customer names, numbers of clients, or export country lists.

## Product Principles

1. Find by crop and tractor: the producer's own terms (cultura, HP, engate) lead the navigation.
2. Show the machine working: real field photos over stock.
3. Specs are first-class: readable tables, comparable models, PDF one tap away.
4. Contact is never more than one tap away on mobile.
5. Same content in PT, EN and ES, never machine-garbled.

## Accessibility & Inclusion

WCAG 2.2 AA. Outdoor phone use: high contrast, large tap targets, readable in sunlight.
