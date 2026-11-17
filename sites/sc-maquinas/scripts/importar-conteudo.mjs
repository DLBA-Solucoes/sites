// Importa o conteúdo real do site antigo (scmaquinas.com) para os dados deste site.
// Lê as páginas de produto ao vivo, liga as versões PT/EN/ES de cada máquina,
// extrai ficha técnica, galeria e PDF, e gera imagens otimizadas em src/assets.
//
// Uso: npm run conteudo   (precisa de internet; roda uma vez por atualização)
import * as cheerio from 'cheerio';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIG = path.join(ROOT, '_original');
const DATA = path.join(ROOT, 'src', 'data');
const ASSETS = path.join(ROOT, 'src', 'assets', 'maquinas');
const CAMPO = path.join(ROOT, 'src', 'assets', 'campo');
const SITE = 'https://scmaquinas.com';
const UA = { 'user-agent': 'Mozilla/5.0 (site-audit)' };
const LANGS = ['pt', 'en', 'es'];

// Cadastro das 18 máquinas: liga os registros de cada idioma (ids do WordPress).
// `codigo` vem dos nomes que a própria SC usa nas fotos (ex.: "ATS 1000", "JCB 600").
const MAQUINAS = [
  { chave: 'at-250', codigo: 'AT 250', familia: 'atomizador', ids: { pt: 1234, en: 2525, es: 2527 } },
  { chave: 'at-450', codigo: 'AT 450', familia: 'atomizador', ids: { pt: 1249, en: 2529, es: 2531 } },
  { chave: 'ata-700', codigo: 'ATA 700', familia: 'atomizador', ids: { pt: 1251, en: 2533, es: 2535 } },
  { chave: 'ata-1000', codigo: 'ATA 1000', familia: 'atomizador', ids: { pt: 1469, en: 2537, es: 2540 } },
  { chave: 'ata-2000', codigo: 'ATA 2000', familia: 'atomizador', ids: { pt: 3055, en: 3072, es: 3070 } },
  { chave: 'jcb-400', codigo: 'JCB 400', familia: 'canhao', ids: { pt: 355, en: 2464, es: 2466 } },
  { chave: 'jcb-600', codigo: 'JCB 600', familia: 'canhao', ids: { pt: 1229, en: 2473, es: 2475 } },
  { chave: 'jcc-400', codigo: 'JCC 400', familia: 'canhao', ids: { pt: 1211, en: 2450, es: 2456 } },
  { chave: 'jcc-600', codigo: 'JCC 600', familia: 'canhao', ids: { pt: 446, en: 2468, es: 2471 } },
  { chave: 'jca-1500', codigo: 'JCA 1500', familia: 'canhao', ids: { pt: 232, en: 2495, es: 2499 } },
  { chave: 'jcp-500', codigo: 'JCP 500', familia: 'canhao', ids: { pt: 1231, en: 2427, es: 2446 } },
  { chave: 'barra-pecuarista', codigo: 'BP 450', familia: 'barra', ids: { pt: 3103, en: 3171, es: 3167 } },
  { chave: 'barra-herbicida', codigo: 'BH 450', familia: 'barra', ids: { pt: 3133, en: 3202, es: 3204 } },
  { chave: 'tr-500', codigo: 'TR 500', familia: 'distribuidor', ids: { pt: 1480, en: 2542, es: 2544 } },
  { chave: 'tr-1000', codigo: 'TR 1000', familia: 'distribuidor', ids: { pt: 2396, en: 2547, es: 2549 } },
  { chave: 'adb-500', codigo: 'ADB 500', familia: 'distribuidor', ids: { pt: 1497, en: 2551, es: 2553 } },
  { chave: 'mixer-12v', codigo: 'MIX 300', familia: 'misturador', ids: { pt: 1502, en: 2557, es: 2559 } },
  { chave: 'mixer-220v', codigo: 'MIX 300', familia: 'misturador', ids: { pt: 2205, en: 2555, es: 2561 } },
];

// Fotos de campo escolhidas a dedo em _original/campo (legenda real: cultura · máquina).
const CAMPO_ESCOLHIDAS = [
  { arquivo: '2024_06_WhatsApp-Image-2023-11-20-at-18.16.45.jpeg', id: 'fumo-canhao', cultura: { pt: 'Fumo', en: 'Tobacco', es: 'Tabaco' }, familia: 'canhao' },
  { arquivo: '2024_06_WhatsApp-Image-2024-04-04-at-11.33.32-AM-1.jpeg', id: 'cafe-canhao', cultura: { pt: 'Café', en: 'Coffee', es: 'Café' }, familia: 'canhao' },
  { arquivo: '2024_06_WhatsApp-Image-2024-05-20-at-11.06.19.jpeg', id: 'cafe-encosta', cultura: { pt: 'Café', en: 'Coffee', es: 'Café' }, familia: 'canhao' },
  { arquivo: '2024_06_IMG_20240215_104154.jpg', id: 'parreira-atomizador', cultura: { pt: 'Parreiral', en: 'Vineyard', es: 'Viñedo' }, familia: 'atomizador' },
  { arquivo: '2024_06_IMG_20230623_101219-scaled.jpg', id: 'banana-canhao', cultura: { pt: 'Banana', en: 'Banana', es: 'Banano' }, familia: 'canhao' },
  { arquivo: '2024_06_Grupo-de-mascara-45.jpg', id: 'canhao-trator', cultura: null, familia: 'canhao' },
  { arquivo: '2025_06_WhatsApp-Image-2025-03-26-at-14.56.59-1.jpeg', id: 'transportador-fabrica', cultura: null, familia: 'canhao' },
  { arquivo: '2024_06_IMG_20240418_112809.jpg', id: 'cafe-atomizador', cultura: { pt: 'Café', en: 'Coffee', es: 'Café' }, familia: 'atomizador' },
  { arquivo: '2024_05_IMG_6847-1-scaled.jpg', id: 'atomizador-trator', cultura: null, familia: 'atomizador' },
  { arquivo: '2024_03_WhatsApp-Image-2025-04-08-at-12.15.58-1.jpeg', id: 'adubadeira-trator', cultura: null, familia: 'distribuidor' },
];

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
const fullSize = (u) => u.replace(/-\d+x\d+(?=\.\w+$)/, '');
const getHTML = async (u) => (await fetch(u, { headers: UA })).text();

async function getJSON(u) {
  const r = await fetch(u, { headers: UA });
  return r.json();
}

function parseProduto($) {
  const specs = [];
  $('tr.jet-listing-dynamic-repeater__item').each((_, tr) => {
    const tds = $(tr).find('td');
    const k = clean($(tds[0]).text());
    const v = clean($(tds[1]).text());
    if (k) specs.push([k, v]);
  });
  const galeria = [];
  $('.elementor-image-carousel .swiper-slide-image').each((_, img) => {
    const src = fullSize($(img).attr('src') || '');
    if (src && !galeria.includes(src)) galeria.push(src);
  });
  // Imagem de detalhe: primeira imagem avulsa logo após a descrição (comando, cabeça, peças).
  let detalhe = null;
  $('.elementor-widget-image img').each((_, img) => {
    const src = $(img).attr('src') || '';
    if (!detalhe && /uploads\//.test(src) && !/(SC-horizontal|Componente-3|AdobeStock|Fav-)/.test(src)) detalhe = fullSize(src);
  });
  const pdf = $('a[href$=".pdf"]').first().attr('href') || null;
  return { specs, galeria, detalhe, pdf };
}

const imgCache = new Map();

// Baixa, reduz e converte para WebP; detecta se o fundo é transparente, preto ou branco.
async function processarImagem(url, destDir, nome, max = 2000) {
  if (imgCache.has(url)) return imgCache.get(url);
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const out = path.join(destDir, `${nome}.webp`);
  const img = sharp(buf).rotate();
  const meta = await img.metadata();
  await img
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90 })
    .toFile(out);
  const fundo = await detectarFundo(buf);
  const info = { arquivo: path.relative(path.join(ROOT, 'src'), out).replace(/\\/g, '/'), origem: url, fundo, largura: meta.width, altura: meta.height };
  imgCache.set(url, info);
  return info;
}

async function detectarFundo(buf) {
  const { data, info } = await sharp(buf).resize(64, 64, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const i = (y * info.width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  const cantos = [px(0, 0), px(63, 0), px(0, 63), px(63, 63), px(32, 0), px(0, 32)];
  if (cantos.filter((p) => p[3] < 20).length >= 4) return 'transparente';
  const lum = cantos.map((p) => (p[0] + p[1] + p[2]) / 3);
  const media = lum.reduce((a, b) => a + b, 0) / lum.length;
  if (media < 40) return 'preto';
  if (media > 215) return 'branco';
  return 'foto';
}

async function main() {
  await fs.mkdir(DATA, { recursive: true });
  await fs.mkdir(ASSETS, { recursive: true });
  await fs.mkdir(CAMPO, { recursive: true });

  const brutos = JSON.parse(await fs.readFile(path.join(ORIG, 'produtos.json'), 'utf8'));
  const termos = JSON.parse(await fs.readFile(path.join(ORIG, 'termos.json'), 'utf8'));
  const porId = new Map(brutos.map((p) => [p.id, p]));
  const cultivoPorId = new Map(termos.cultivos.map((t) => [t.id, t]));

  const maquinas = [];
  for (const m of MAQUINAS) {
    const item = { chave: m.chave, codigo: m.codigo, familia: m.familia, i18n: {}, imagens: {} };
    for (const lang of LANGS) {
      const bruto = porId.get(m.ids[lang]);
      const html = await getHTML(bruto.link);
      const $ = cheerio.load(html);
      const p = parseProduto($);
      item.i18n[lang] = {
        slugAntigo: bruto.link.replace(SITE, ''),
        titulo: bruto.title,
        modelo: bruto.model,
        intro: bruto.intro.join(' '),
        itens: bruto.bullets,
        specs: p.specs,
        pdf: p.pdf,
        culturas: bruto.cultivos
          .map((id) => cultivoPorId.get(id))
          .filter(Boolean)
          .map((t) => ({ nome: t.name, slug: t.slug })),
      };
      if (lang === 'pt') {
        const destaque = bruto.featured ? fullSize(bruto.featured) : p.galeria[0];
        item.imagens.destaque = await processarImagem(destaque, ASSETS, `${m.chave}-destaque`);
        item.imagens.detalhe = p.detalhe ? await processarImagem(p.detalhe, ASSETS, `${m.chave}-detalhe`, 1400) : null;
        item.imagens.galeria = [];
        let n = 1;
        for (const g of p.galeria) {
          if (g === destaque) continue;
          item.imagens.galeria.push(await processarImagem(g, ASSETS, `${m.chave}-${n++}`, 1800));
        }
      }
    }
    // Potência e engate a partir da ficha em português (fonte única para o filtro).
    const spec = Object.fromEntries(item.i18n.pt.specs.map(([k, v]) => [k.toLowerCase(), v]));
    const hp = Number((spec['potência mínima do trator'] || '').match(/\d+/)?.[0] || 0) || null;
    const engateTxt = (spec['tipo de engate'] || item.i18n.pt.modelo || '').toLowerCase();
    item.hp = hp;
    item.engate = /arrasto|tração/.test(engateTxt) ? 'arrasto' : /3 pontos|acoplado/.test(engateTxt + item.i18n.pt.modelo.toLowerCase()) ? '3pontos' : null;
    item.volts = /volts/i.test(item.i18n.pt.modelo) ? item.i18n.pt.modelo : null;
    maquinas.push(item);
    console.log(`ok ${m.chave}  specs ${item.i18n.pt.specs.length}/${item.i18n.en.specs.length}/${item.i18n.es.specs.length}  galeria ${item.imagens.galeria.length}  fundo ${item.imagens.destaque.fundo}  hp ${item.hp} ${item.engate}`);
  }

  const campo = [];
  for (const c of CAMPO_ESCOLHIDAS) {
    const src = path.join(ORIG, 'campo', c.arquivo);
    const out = path.join(CAMPO, `${c.id}.webp`);
    const meta = await sharp(src).metadata();
    await sharp(src).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    campo.push({ id: c.id, arquivo: `assets/campo/${c.id}.webp`, origem: c.arquivo, cultura: c.cultura, familia: c.familia, largura: meta.width, altura: meta.height });
  }

  // Posts do blog (só existem em português): HTML limpo, só a estrutura de texto.
  const BLOG = path.join(ROOT, 'src', 'assets', 'blog');
  await fs.mkdir(BLOG, { recursive: true });
  const postsRaw = await getJSON(`${SITE}/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia`);
  const posts = [];
  for (const p of postsRaw) {
    const $ = cheerio.load(p.content.rendered);
    const blocos = [];
    $('h2,h3,h4,p,li').each((_, el) => {
      const tag = el.tagName.toLowerCase();
      const texto = clean($(el).text());
      if (!texto) return;
      blocos.push({ tipo: tag === 'li' ? 'item' : tag === 'p' ? 'p' : 'titulo', texto });
    });
    const feat = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const capa = feat ? await processarImagem(fullSize(feat), BLOG, p.slug, 1600) : null;
    posts.push({
      slug: p.slug,
      data: p.date.slice(0, 10),
      titulo: cheerio.load(`<i>${p.title.rendered}</i>`)('i').text(),
      resumo: clean(cheerio.load(p.excerpt.rendered).text()).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, '…'),
      capa,
      blocos,
    });
  }
  await fs.writeFile(path.join(DATA, 'posts.json'), JSON.stringify(posts, null, 2));

  await fs.writeFile(path.join(DATA, 'maquinas.json'), JSON.stringify(maquinas, null, 2));
  await fs.writeFile(path.join(DATA, 'campo.json'), JSON.stringify(campo, null, 2));
  console.log(`\n${maquinas.length} máquinas, ${campo.length} fotos de campo, ${posts.length} posts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
