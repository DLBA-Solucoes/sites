import type { ImageMetadata } from 'astro';
import bruto from '../data/maquinas.json';
import campoBruto from '../data/campo.json';
import postsBruto from '../data/posts.json';
import { FAMILIAS, slugify, type Familia, type Lang } from './i18n';

type Img = { arquivo: string; fundo: string; largura: number; altura: number };
type I18nMaquina = {
  titulo: string;
  modelo: string;
  intro: string;
  itens: string[];
  specs: [string, string][];
  pdf: string | null;
  culturas: { nome: string; slug: string }[];
};
export type Maquina = {
  chave: string;
  codigo: string;
  familia: Familia;
  hp: number | null;
  engate: '3pontos' | 'arrasto' | null;
  volts: string | null;
  i18n: Record<Lang, I18nMaquina>;
  imagens: { destaque: Img; detalhe: Img | null; galeria: Img[] };
};

export const MAQUINAS = bruto as unknown as Maquina[];

// Todas as imagens otimizadas, para usar com <Image /> do Astro.
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{webp,jpg,png}', { eager: true });
export function img(caminho: string): ImageMetadata {
  const chave = `../${caminho.replace(/^\/?/, '')}`;
  const mod = arquivos[chave];
  if (!mod) throw new Error(`Imagem não encontrada: ${caminho}`);
  return mod.default;
}

/** Slug da máquina na URL: o código do modelo (igual nos 3 idiomas). */
export function slugMaquina(m: Maquina) {
  if (m.chave === 'mixer-12v') return 'mix-300-12v';
  if (m.chave === 'mixer-220v') return 'mix-300-220v';
  return slugify(m.codigo);
}

/** Recorte para o palco preto: a foto de destaque, ou a primeira da galeria com fundo transparente. */
export function palco(m: Maquina): Img {
  if (m.imagens.destaque.fundo === 'transparente') return m.imagens.destaque;
  return m.imagens.galeria.find((g) => g.fundo === 'transparente') ?? m.imagens.destaque;
}

export function porFamilia(f: Familia) {
  return MAQUINAS.filter((m) => m.familia === f);
}

/** Número de catálogo (Nº 01 a 18), na ordem das famílias. */
export const NUMERO = new Map(
  FAMILIAS.flatMap((f) => porFamilia(f)).map((m, i) => [m.chave, String(i + 1).padStart(2, '0')]),
);

export function nomeMaquina(m: Maquina, lang: Lang) {
  return tituloCaso(m.i18n[lang].titulo);
}

function tituloCaso(s: string) {
  const minusc = new Set(['de', 'da', 'do', 'em', 'para', 'con', 'con', 'with', 'for', 'y', 'e', 'and']);
  return s
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i > 0 && minusc.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
    .replace(/Quadjet/g, 'QuadJET')
    .replace(/\bJet\b/g, 'JET');
}

const normal = (s: string) =>
  slugify(s)
    .replace(/-?\(.*$/, '')
    .replace(/^(dimensoes|dimensions|dimensiones).*/, 'dimensoes')
    .replace('inclincacao', 'inclinacao')
    .replace('portaboquillass', 'portaboquillas')
    .replace(/^(peso-vazio|peso-vacio|empty-weight)$/, 'peso');

/** Ficha em "slots fixos": a mesma lista de itens para todos os modelos da família. */
export function slotsDaFamilia(f: Familia, lang: Lang) {
  const ordem: { chave: string; rotulo: string }[] = [];
  for (const m of porFamilia(f)) {
    for (const [k] of m.i18n[lang].specs) {
      const c = normal(k);
      if (c === 'ncm') continue;
      if (!ordem.some((o) => o.chave === c)) ordem.push({ chave: c, rotulo: k.replace(/\s*\(.*\)\s*$/, '') });
    }
  }
  return ordem;
}

export function valorSpec(m: Maquina, lang: Lang, chave: string) {
  const achar = (l: Lang) => m.i18n[l].specs.find(([k]) => normal(k) === chave)?.[1] || null;
  const v = achar(lang);
  if (v) return v;
  // Item ausente neste idioma: usa o de outro idioma só se for medida (número + unidade).
  for (const l of ['pt', 'en', 'es'] as Lang[]) {
    const o = l === lang ? null : achar(l);
    if (o && /^[\d.,|\sx]+(kg|mm|rpm|hp|l)?$/i.test(o)) return o;
  }
  return null;
}

/** Destaques curtos da ficha (para o índice do catálogo e para o palco). */
export function destaquesFicha(m: Maquina) {
  const pick = (re: RegExp) => m.i18n.pt.specs.find(([k]) => re.test(slugify(k)))?.[1] ?? null;
  return {
    tanque: pick(/^capacidade-(de-tanque|do-reservatorio)/) ?? pick(/^capacidade-de-carga/),
    alcance: pick(/^(faixa|raio)-de-aplicacao/),
    turbina: pick(/^turbina/),
    bicos: pick(/^porta-bicos/),
  };
}

export type Cultura = { slug: string; nome: string; maquinas: Maquina[] };

/** Culturas de um idioma, com as máquinas indicadas para cada uma. */
export function culturas(lang: Lang): Cultura[] {
  const mapa = new Map<string, Cultura>();
  for (const m of MAQUINAS) {
    for (const c of m.i18n[lang].culturas) {
      const slug = slugify(c.nome);
      if (!mapa.has(slug)) mapa.set(slug, { slug, nome: c.nome, maquinas: [] });
      const item = mapa.get(slug)!;
      if (!item.maquinas.includes(m)) item.maquinas.push(m);
    }
  }
  return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome, lang));
}

export type FotoCampo = {
  id: string;
  arquivo: string;
  cultura: Record<Lang, string> | null;
  familia: Familia;
  largura: number;
  altura: number;
};
export const CAMPO = campoBruto as unknown as FotoCampo[];
export const foto = (id: string) => CAMPO.find((c) => c.id === id)!;

export type Post = {
  slug: string;
  data: string;
  titulo: string;
  resumo: string;
  capa: Img | null;
  blocos: { tipo: 'p' | 'titulo' | 'item'; texto: string }[];
};
export const POSTS = (postsBruto as unknown as Post[]).sort((a, b) => b.data.localeCompare(a.data));

/** Dados enxutos para o filtro no navegador. */
export function dadosFiltro(lang: Lang) {
  return MAQUINAS.map((m) => ({
    s: slugMaquina(m),
    hp: m.hp,
    e: m.engate,
    c: m.i18n[lang].culturas.map((c) => slugify(c.nome)),
  }));
}
