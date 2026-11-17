export const LANGS = ['pt', 'en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

/** Nome de cada seção do site na URL, por idioma. */
export const SEG = {
  maquinas: { pt: 'maquinas', en: 'machines', es: 'maquinas' },
  culturas: { pt: 'culturas', en: 'crops', es: 'cultivos' },
  empresa: { pt: 'empresa', en: 'company', es: 'empresa' },
  contato: { pt: 'contato', en: 'contact', es: 'contacto' },
  blog: { pt: 'blog', en: 'blog', es: 'blog' },
} as const;
export type Secao = keyof typeof SEG;

/** Caminho da página dentro do site (sem o prefixo de publicação). */
export function caminho(lang: Lang, ...partes: string[]): string {
  const base = lang === 'pt' ? '' : `/${lang}`;
  const resto = partes.filter(Boolean).join('/');
  return `${base}/${resto ? `${resto}/` : ''}`;
}

/** Prefixo de publicação (ex.: /sites-cdl/sc-maquinas no GitHub Pages; vazio no domínio próprio). */
export const PREFIXO = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL de uma página no idioma pedido, já com o prefixo de publicação. */
export function url(lang: Lang, ...partes: string[]): string {
  return PREFIXO + caminho(lang, ...partes);
}

export function secao(lang: Lang, s: Secao, ...partes: string[]) {
  return url(lang, SEG[s][lang], ...partes);
}

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const FAMILIAS = ['atomizador', 'canhao', 'barra', 'distribuidor', 'misturador'] as const;
export type Familia = (typeof FAMILIAS)[number];

export const NOME_FAMILIA: Record<Familia, Record<Lang, string>> = {
  atomizador: { pt: 'Atomizadores', en: 'Atomizers', es: 'Atomizadores' },
  canhao: { pt: 'Canhões JET', en: 'JET cannons', es: 'Cañones JET' },
  barra: { pt: 'Pulverizadores de barra', en: 'Boom sprayers', es: 'Pulverizadores de barra' },
  distribuidor: { pt: 'Distribuidores', en: 'Spreaders', es: 'Distribuidores' },
  misturador: { pt: 'Misturadores', en: 'Pre-mixers', es: 'Premezcladores' },
};

export const DESC_FAMILIA: Record<Familia, Record<Lang, string>> = {
  atomizador: {
    pt: 'Turbina e bicos BIJET para culturas perenes em terreno regular: parreirais, pomares, carreiras e estufas.',
    en: 'Fan and BIJET nozzles for perennial crops on even ground: vineyards, orchards, rows and greenhouses.',
    es: 'Turbina y boquillas BIJET para cultivos perennes en terreno regular: viñedos, huertos, hileras e invernaderos.',
  },
  canhao: {
    pt: 'A linha JET: cabeça direcionável com alcance de 25 a 40 metros sem vento, para culturas altas, terreno irregular e bordaduras.',
    en: 'The JET line: an adjustable head reaching 25 to 40 meters without wind, for tall crops, uneven ground and field borders.',
    es: 'La línea JET: cabezal orientable con alcance de 25 a 40 metros sin viento, para cultivos altos, terreno irregular y bordes.',
  },
  barra: {
    pt: 'Barras de pulverização para pastagem e herbicida, com bomba de pistão acoplada ao trator.',
    en: 'Spray booms for pasture and herbicide, with a piston pump driven by the tractor.',
    es: 'Barras de pulverización para pasturas y herbicida, con bomba de pistón accionada por el tractor.',
  },
  distribuidor: {
    pt: 'Semeadeiras e adubadeiras de prato para sementes, fertilizantes e adubos.',
    en: 'Spinner seeders and fertilizer spreaders for seeds, fertilizers and manure.',
    es: 'Sembradoras y abonadoras de plato para semillas, fertilizantes y abonos.',
  },
  misturador: {
    pt: 'Misturador de 300 litros para preparar a calda e abastecer drones e pulverizadores.',
    en: '300-liter mixer to prepare the spray mix and refill drones and sprayers.',
    es: 'Mezclador de 300 litros para preparar el caldo y abastecer drones y pulverizadores.',
  },
};

export const ENGATE: Record<'3pontos' | 'arrasto', Record<Lang, string>> = {
  '3pontos': { pt: '3 pontos', en: '3-point', es: '3 puntos' },
  arrasto: { pt: 'Arrasto', en: 'Trailed', es: 'Arrastre' },
};

const ui = {
  pt: {
    pular: 'Pular para o conteúdo',
    menu: 'Menu',
    fechar: 'Fechar',
    nav: { maquinas: 'Máquinas', culturas: 'Culturas', empresa: 'Empresa', blog: 'Blog', contato: 'Contato' },
    idioma: 'Idioma',
    heroTitulo: 'Máquinas feitas para facilitar o trabalho do agricultor',
    heroLead:
      'Atomizadores, canhões JET, pulverizadores de barra, distribuidores e misturadores, fabricados em Jaraguá do Sul (SC) desde 1995.',
    busca: {
      titulo: 'Encontre a máquina para a sua lavoura',
      cultura: 'Cultura',
      todasCulturas: 'Todas as culturas',
      trator: 'Potência do trator',
      qualquerTrator: 'Qualquer potência',
      ate: (hp: number) => `${hp} HP`,
      mais: (hp: number) => `${hp} HP ou mais`,
      engate: 'Engate',
      todos: 'Todos',
      ver: (n: number) => (n === 1 ? 'Ver 1 máquina' : `Ver ${n} máquinas`),
      nenhuma: 'Nenhuma máquina com esses filtros',
      limpar: 'Limpar filtros',
      resultado: (n: number) => (n === 1 ? '1 máquina' : `${n} máquinas`),
    },
    catalogo: 'Catálogo',
    verMaquina: 'Ver máquina',
    verTodas: 'Ver todas as máquinas',
    potenciaMin: 'Trator a partir de',
    campoTitulo: 'No campo',
    campoLead: 'Fotos reais das máquinas SC trabalhando em lavouras de clientes.',
    fabricaTitulo: 'Fábrica própria em Jaraguá do Sul',
    fabricaTexto:
      'A SC começou em 1995 como Cattoni Usinagem, uma oficina dedicada ao maquinário agrícola. Em 2013 inaugurou o parque fabril de 2.700 m² e começou a exportar. Desde 2017 é SC Máquinas e Implementos Agrícolas.',
    conhecaEmpresa: 'Conheça a empresa',
    contatoTitulo: 'Fale com a SC',
    contatoLead: 'Diga a cultura, a área e o trator que você usa. A equipe indica o modelo certo.',
    ligar: 'Ligar',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    vendas: 'Vendas e atendimento',
    exportacao: 'Exportação',
    compras: 'Compras',
    rh: 'Trabalhe conosco',
    endereco: 'Endereço',
    comoChegar: 'Como chegar',
    telefones: 'Telefones',
    ficha: 'Ficha técnica',
    caracteristica: 'Característica',
    especificacao: 'Especificação',
    comparar: 'Compare com a linha',
    compararLead: 'Mesma ficha, lado a lado. Traço quando o item não se aplica ao modelo.',
    catalogoPdf: 'Baixar catálogo (PDF)',
    culturasIndicadas: 'Culturas indicadas',
    galeria: 'Galeria',
    pedirOrcamento: 'Pedir orçamento',
    orcamentoAssunto: (m: string) => `Orçamento ${m}`,
    outrasLinha: 'Outros modelos da linha',
    semTrator: 'Elétrico, sem trator',
    culturasTitulo: 'Máquinas por cultura',
    culturasLead: 'Escolha a sua cultura e veja os implementos SC indicados para ela.',
    maquinasPara: (c: string) => `Máquinas para ${c}`,
    maquinasTitulo: 'Todas as máquinas',
    maquinasLead: 'Filtre pela cultura, pela potência do seu trator e pelo tipo de engate.',
    empresaTitulo: 'SC Máquinas e Implementos Agrícolas',
    blogTitulo: 'Blog',
    blogLead: 'Guias da SC para escolher e usar equipamentos de pulverização.',
    lerMais: 'Ler artigo',
    voltarBlog: 'Voltar ao blog',
    rodape: 'Máquinas e implementos agrícolas fabricados em Jaraguá do Sul, SC.',
    direitos: 'Todos os direitos reservados.',
    hp: 'HP',
    nao404: 'Página não encontrada',
    nao404Lead: 'O endereço mudou ou não existe. Comece pelo catálogo.',
  },
  en: {
    pular: 'Skip to content',
    menu: 'Menu',
    fechar: 'Close',
    nav: { maquinas: 'Machines', culturas: 'Crops', empresa: 'Company', blog: 'Blog', contato: 'Contact' },
    idioma: 'Language',
    heroTitulo: 'Machines built to make the farmer’s work easier',
    heroLead:
      'Atomizers, JET cannons, boom sprayers, spreaders and pre-mixers, manufactured in Jaraguá do Sul, Brazil, since 1995.',
    busca: {
      titulo: 'Find the machine for your crop',
      cultura: 'Crop',
      todasCulturas: 'All crops',
      trator: 'Tractor power',
      qualquerTrator: 'Any power',
      ate: (hp: number) => `${hp} HP`,
      mais: (hp: number) => `${hp} HP or more`,
      engate: 'Hitch',
      todos: 'All',
      ver: (n: number) => (n === 1 ? 'See 1 machine' : `See ${n} machines`),
      nenhuma: 'No machine matches these filters',
      limpar: 'Clear filters',
      resultado: (n: number) => (n === 1 ? '1 machine' : `${n} machines`),
    },
    catalogo: 'Catalog',
    verMaquina: 'See machine',
    verTodas: 'See all machines',
    potenciaMin: 'Tractor from',
    campoTitulo: 'In the field',
    campoLead: 'Real photos of SC machines working on customers’ farms.',
    fabricaTitulo: 'Our own factory in Jaraguá do Sul',
    fabricaTexto:
      'SC started in 1995 as Cattoni Usinagem, a workshop dedicated to agricultural machinery. In 2013 it opened its 2,700 m² plant and began exporting. Since 2017 it has been SC Máquinas e Implementos Agrícolas.',
    conhecaEmpresa: 'About the company',
    contatoTitulo: 'Talk to SC',
    contatoLead: 'Tell us your crop, area and tractor. Our team will point you to the right model.',
    ligar: 'Call',
    email: 'Email',
    whatsapp: 'WhatsApp',
    vendas: 'Sales',
    exportacao: 'Export',
    compras: 'Purchasing',
    rh: 'Careers',
    endereco: 'Address',
    comoChegar: 'Directions',
    telefones: 'Phones',
    ficha: 'Specifications',
    caracteristica: 'Feature',
    especificacao: 'Specification',
    comparar: 'Compare the line',
    compararLead: 'Same sheet, side by side. A dash means the item does not apply to that model.',
    catalogoPdf: 'Download catalog (PDF)',
    culturasIndicadas: 'Recommended crops',
    galeria: 'Gallery',
    pedirOrcamento: 'Request a quote',
    orcamentoAssunto: (m: string) => `Quote ${m}`,
    outrasLinha: 'Other models in this line',
    semTrator: 'Electric, no tractor',
    culturasTitulo: 'Machines by crop',
    culturasLead: 'Pick your crop and see the SC implements recommended for it.',
    maquinasPara: (c: string) => `Machines for ${c}`,
    maquinasTitulo: 'All machines',
    maquinasLead: 'Filter by crop, by your tractor’s power and by hitch type.',
    empresaTitulo: 'SC Máquinas e Implementos Agrícolas',
    blogTitulo: 'Blog',
    blogLead: 'SC guides to choosing and using spraying equipment (in Portuguese).',
    lerMais: 'Read article',
    voltarBlog: 'Back to blog',
    rodape: 'Agricultural machinery and implements manufactured in Jaraguá do Sul, Brazil.',
    direitos: 'All rights reserved.',
    hp: 'HP',
    nao404: 'Page not found',
    nao404Lead: 'This address changed or does not exist. Start with the catalog.',
  },
  es: {
    pular: 'Saltar al contenido',
    menu: 'Menú',
    fechar: 'Cerrar',
    nav: { maquinas: 'Máquinas', culturas: 'Cultivos', empresa: 'Empresa', blog: 'Blog', contato: 'Contacto' },
    idioma: 'Idioma',
    heroTitulo: 'Máquinas hechas para facilitar el trabajo del agricultor',
    heroLead:
      'Atomizadores, cañones JET, pulverizadores de barra, distribuidores y premezcladores, fabricados en Jaraguá do Sul, Brasil, desde 1995.',
    busca: {
      titulo: 'Encuentre la máquina para su cultivo',
      cultura: 'Cultivo',
      todasCulturas: 'Todos los cultivos',
      trator: 'Potencia del tractor',
      qualquerTrator: 'Cualquier potencia',
      ate: (hp: number) => `${hp} HP`,
      mais: (hp: number) => `${hp} HP o más`,
      engate: 'Enganche',
      todos: 'Todos',
      ver: (n: number) => (n === 1 ? 'Ver 1 máquina' : `Ver ${n} máquinas`),
      nenhuma: 'Ninguna máquina con estos filtros',
      limpar: 'Limpiar filtros',
      resultado: (n: number) => (n === 1 ? '1 máquina' : `${n} máquinas`),
    },
    catalogo: 'Catálogo',
    verMaquina: 'Ver máquina',
    verTodas: 'Ver todas las máquinas',
    potenciaMin: 'Tractor desde',
    campoTitulo: 'En el campo',
    campoLead: 'Fotos reales de las máquinas SC trabajando en campos de clientes.',
    fabricaTitulo: 'Fábrica propia en Jaraguá do Sul',
    fabricaTexto:
      'SC comenzó en 1995 como Cattoni Usinagem, un taller dedicado a la maquinaria agrícola. En 2013 inauguró su planta de 2.700 m² y empezó a exportar. Desde 2017 es SC Máquinas e Implementos Agrícolas.',
    conhecaEmpresa: 'Conozca la empresa',
    contatoTitulo: 'Hable con SC',
    contatoLead: 'Díganos su cultivo, el área y el tractor que usa. El equipo le indica el modelo correcto.',
    ligar: 'Llamar',
    email: 'Correo',
    whatsapp: 'WhatsApp',
    vendas: 'Ventas',
    exportacao: 'Exportación',
    compras: 'Compras',
    rh: 'Trabaje con nosotros',
    endereco: 'Dirección',
    comoChegar: 'Cómo llegar',
    telefones: 'Teléfonos',
    ficha: 'Ficha técnica',
    caracteristica: 'Característica',
    especificacao: 'Especificación',
    comparar: 'Compare la línea',
    compararLead: 'La misma ficha, lado a lado. Un guion indica que el ítem no aplica al modelo.',
    catalogoPdf: 'Descargar catálogo (PDF)',
    culturasIndicadas: 'Cultivos indicados',
    galeria: 'Galería',
    pedirOrcamento: 'Pedir cotización',
    orcamentoAssunto: (m: string) => `Cotización ${m}`,
    outrasLinha: 'Otros modelos de la línea',
    semTrator: 'Eléctrico, sin tractor',
    culturasTitulo: 'Máquinas por cultivo',
    culturasLead: 'Elija su cultivo y vea los implementos SC indicados para él.',
    maquinasPara: (c: string) => `Máquinas para ${c}`,
    maquinasTitulo: 'Todas las máquinas',
    maquinasLead: 'Filtre por cultivo, por la potencia de su tractor y por el tipo de enganche.',
    empresaTitulo: 'SC Máquinas e Implementos Agrícolas',
    blogTitulo: 'Blog',
    blogLead: 'Guías de SC para elegir y usar equipos de pulverización (en portugués).',
    lerMais: 'Leer artículo',
    voltarBlog: 'Volver al blog',
    rodape: 'Máquinas e implementos agrícolas fabricados en Jaraguá do Sul, Brasil.',
    direitos: 'Todos los derechos reservados.',
    hp: 'HP',
    nao404: 'Página no encontrada',
    nao404Lead: 'Esta dirección cambió o no existe. Empiece por el catálogo.',
  },
};

export type UI = (typeof ui)['pt'];
export function t(lang: Lang): UI {
  return ui[lang] as UI;
}
