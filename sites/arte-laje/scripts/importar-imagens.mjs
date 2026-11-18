// Converte as fotos coletadas do site antigo (_original/imagens) para WebP em src/assets/fotos.
// Os banners de obras têm um degradê branco embutido na direita: o corte tira essa faixa.
// Uso: npm run imagens
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIG = path.join(ROOT, '_original', 'imagens');
const DEST = path.join(ROOT, 'src', 'assets', 'fotos');
await fs.mkdir(DEST, { recursive: true });

const regras = [
  // [padrão do arquivo original, nome de saída, corte da direita em %]
  [/^site_img_banner_home_(\w+)\.jpg$/, (m) => `obra-${m[1]}`, 0.16],
  [/^site_img_parque_maior_(\d+)\.jpg$/, (m) => `fabrica-${m[1].padStart(2, '0')}`, 0],
  [/^site_img_produtos_maior_laje_(\w+)\.jpg$/, (m) => `laje-${m[1].replace(/_/g, '-')}`, 0],
  [/^site_img_produtos_acessorios_maior_(\d+)\.jpg$/, (m) => `acessorio-${m[1]}`, 0],
  [/^site_img_logo_2024\.png$/, () => 'logo', 0],
];

let n = 0;
for (const arq of await fs.readdir(ORIG)) {
  for (const [re, nome, corte] of regras) {
    const m = arq.match(re);
    if (!m) continue;
    const img = sharp(path.join(ORIG, arq));
    const { width, height } = await img.metadata();
    const largura = Math.round(width * (1 - corte));
    const saida = path.join(DEST, `${nome(m)}.${arq.endsWith('.png') ? 'png' : 'webp'}`);
    let p = img.extract({ left: 0, top: 0, width: largura, height });
    p = arq.endsWith('.png') ? p.png() : p.webp({ quality: 88 });
    await p.toFile(saida);
    n++;
  }
}
console.log(`${n} imagens em ${DEST}`);
