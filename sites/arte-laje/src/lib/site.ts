import type { ImageMetadata } from 'astro';

/** Prefixo de publicação (ex.: /sites/arte-laje no GitHub Pages; vazio no domínio próprio). */
export const PREFIXO = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL de uma página do site, já com o prefixo e barra no fim. */
export function url(...partes: string[]) {
  const resto = partes.filter(Boolean).join('/');
  return `${PREFIXO}/${resto ? `${resto}/` : ''}`;
}

const fotos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.{webp,png}', { eager: true });
export function foto(nome: string): ImageMetadata {
  const mod = fotos[`../assets/fotos/${nome}.webp`] ?? fotos[`../assets/fotos/${nome}.png`];
  if (!mod) throw new Error(`Foto não encontrada: ${nome}`);
  return mod.default;
}

export const NAV = [
  { href: url('lajes'), rotulo: 'Lajes', id: 'lajes' },
  { href: url('acessorios'), rotulo: 'Acessórios', id: 'acessorios' },
  { href: url('obras'), rotulo: 'Obras', id: 'obras' },
  { href: url('empresa'), rotulo: 'Empresa', id: 'empresa' },
  { href: url('contato'), rotulo: 'Contato', id: 'contato' },
];
