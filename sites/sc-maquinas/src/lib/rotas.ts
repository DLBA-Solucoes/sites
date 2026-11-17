import { LANGS, SEG, slugify, url, type Lang } from './i18n';
import { MAQUINAS, POSTS, culturas, slugMaquina, type Cultura, type Maquina, type Post } from './dados';

export type Pagina =
  | { tipo: 'home' }
  | { tipo: 'maquinas' }
  | { tipo: 'maquina'; maquina: Maquina }
  | { tipo: 'culturas' }
  | { tipo: 'cultura'; cultura: Cultura }
  | { tipo: 'empresa' }
  | { tipo: 'contato' }
  | { tipo: 'blog' }
  | { tipo: 'post'; post: Post };

export type Rota = { lang: Lang; caminho: string; alternativas: Partial<Record<Lang, string>>; pagina: Pagina };

const porLang = <T,>(fn: (l: Lang) => T) => Object.fromEntries(LANGS.map((l) => [l, fn(l)])) as Record<Lang, T>;

/** Tabela de todas as páginas do site, nos três idiomas. */
export function todasAsRotas(): Rota[] {
  const rotas: Rota[] = [];
  const fixas: { tipo: Exclude<Pagina['tipo'], 'maquina' | 'cultura' | 'post'>; seg?: keyof typeof SEG }[] = [
    { tipo: 'home' },
    { tipo: 'maquinas', seg: 'maquinas' },
    { tipo: 'culturas', seg: 'culturas' },
    { tipo: 'empresa', seg: 'empresa' },
    { tipo: 'contato', seg: 'contato' },
    { tipo: 'blog', seg: 'blog' },
  ];
  for (const f of fixas) {
    const alt = porLang((l) => (f.seg ? url(l, SEG[f.seg][l]) : url(l)));
    for (const lang of LANGS) rotas.push({ lang, caminho: alt[lang], alternativas: alt, pagina: { tipo: f.tipo } as Pagina });
  }
  for (const m of MAQUINAS) {
    const alt = porLang((l) => url(l, SEG.maquinas[l], slugMaquina(m)));
    for (const lang of LANGS) rotas.push({ lang, caminho: alt[lang], alternativas: alt, pagina: { tipo: 'maquina', maquina: m } });
  }
  for (const lang of LANGS) {
    for (const c of culturas(lang)) {
      // Culturas têm nomes diferentes por idioma; a alternativa aponta para o índice de culturas.
      const alt = porLang((l) => url(l, SEG.culturas[l]));
      alt[lang] = url(lang, SEG.culturas[lang], c.slug);
      rotas.push({ lang, caminho: alt[lang], alternativas: { [lang]: alt[lang] }, pagina: { tipo: 'cultura', cultura: c } });
    }
  }
  for (const p of POSTS) {
    const caminho = url('pt', 'blog', p.slug);
    rotas.push({ lang: 'pt', caminho, alternativas: { pt: caminho }, pagina: { tipo: 'post', post: p } });
  }
  return rotas;
}

export function urlCultura(lang: Lang, nome: string) {
  return url(lang, SEG.culturas[lang], slugify(nome));
}
