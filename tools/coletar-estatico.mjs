// Coleta um site estático (HTML/PHP sem API): percorre as páginas do mesmo domínio,
// guarda o texto de cada uma e baixa todas as imagens no tamanho original.
//
// Uso: node tools/coletar-estatico.mjs <url-inicial> <pasta-saida> [profundidade=3]
// Saída: <pasta>/paginas.json (url, título, textos, imagens, links) e <pasta>/imagens/
import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';
import path from 'node:path';

const [inicio, saida, prof = '3'] = process.argv.slice(2);
if (!inicio || !saida) {
  console.error('Uso: node tools/coletar-estatico.mjs <url-inicial> <pasta-saida> [profundidade]');
  process.exit(1);
}
const UA = { 'user-agent': 'Mozilla/5.0 (site-audit)' };
const raiz = new URL(inicio);
const mesmoSite = (u) => u.hostname.replace(/^www\./, '') === raiz.hostname.replace(/^www\./, '');
const ehPagina = (u) => !/\.(jpe?g|png|gif|webp|svg|pdf|zip|docx?|xlsx?|css|js|ico|mp4)$/i.test(u.pathname);
const limpa = (s) => (s || '').replace(/\s+/g, ' ').trim();

const visitadas = new Map();
const imagens = new Set();
const arquivos = new Set();
const fila = [[new URL(inicio).href, 0]];

while (fila.length) {
  const [url, nivel] = fila.shift();
  const chave = url.replace(/#.*$/, '');
  if (visitadas.has(chave)) continue;
  let r;
  try {
    r = await fetch(chave, { headers: UA, redirect: 'follow' });
  } catch (e) {
    visitadas.set(chave, { url: chave, erro: String(e) });
    continue;
  }
  const final = r.url.replace(/#.*$/, '');
  if (!(r.headers.get('content-type') || '').includes('html')) continue;
  const html = await r.text();
  const $ = cheerio.load(html);
  const pagina = { url: final, status: r.status, titulo: limpa($('title').text()), textos: [], imagens: [], links: [] };

  $('img[src], [style*="background"], a[href], input[type=image][src]').each((_, el) => {
    const cands = [$(el).attr('src'), $(el).attr('href'), ...(($(el).attr('style') || '').match(/url\(([^)]+)\)/g) || []).map((x) => x.slice(4, -1).replace(/['"]/g, ''))];
    for (const c of cands) {
      if (!c) continue;
      let u;
      try {
        u = new URL(c, final);
      } catch {
        continue;
      }
      if (/\.(jpe?g|png|gif|webp|svg)$/i.test(u.pathname)) {
        imagens.add(u.href);
        if (!pagina.imagens.includes(u.href)) pagina.imagens.push(u.href);
      } else if (/\.(pdf|docx?|xlsx?)$/i.test(u.pathname)) {
        arquivos.add(u.href);
      } else if (u.protocol.startsWith('http') && mesmoSite(u) && ehPagina(u)) {
        const link = u.href.replace(/#.*$/, '');
        if (!pagina.links.includes(link)) pagina.links.push(link);
        if (nivel < Number(prof)) fila.push([link, nivel + 1]);
      } else if (/^(mailto|tel):|wa\.me|whatsapp/.test(c)) {
        if (!pagina.links.includes(c)) pagina.links.push(c);
      }
    }
  });

  $('script, style, noscript').remove();
  $('h1, h2, h3, h4, p, li, td, th, dt, dd, figcaption, address, span, a, div').each((_, el) => {
    // Só o texto "folha" do elemento, para não repetir o texto dos filhos.
    const proprio = limpa($(el).clone().children().remove().end().text());
    if (proprio.length > 1 && pagina.textos.at(-1) !== proprio) pagina.textos.push(proprio);
  });
  visitadas.set(chave, pagina);
  if (final !== chave) visitadas.set(final, pagina);
  console.log(`[${nivel}] ${r.status} ${final}  textos ${pagina.textos.length} imagens ${pagina.imagens.length}`);
}

await fs.mkdir(path.join(saida, 'imagens'), { recursive: true });
await fs.mkdir(path.join(saida, 'arquivos'), { recursive: true });
const nomeLocal = (u) => decodeURIComponent(new URL(u).pathname).replace(/^\//, '').replace(/[\\/]/g, '_');
let ok = 0;
for (const u of [...imagens, ...arquivos]) {
  const destino = path.join(saida, /\.(pdf|docx?|xlsx?)$/i.test(u) ? 'arquivos' : 'imagens', nomeLocal(u));
  try {
    const r = await fetch(u, { headers: UA });
    if (!r.ok) continue;
    await fs.writeFile(destino, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch {}
}
const paginas = [...new Set(visitadas.values())].filter((p) => p.textos);
await fs.writeFile(path.join(saida, 'paginas.json'), JSON.stringify(paginas, null, 2));
console.log(`\n${paginas.length} páginas, ${ok}/${imagens.size + arquivos.size} arquivos baixados em ${saida}`);
