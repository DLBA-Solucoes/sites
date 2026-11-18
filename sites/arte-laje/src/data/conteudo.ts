// Conteúdo real da Arte Laje (fonte: artelaje.com.br, coletado em 18/11/2026).
// Fotos em src/assets/fotos (geradas por `npm run imagens`).

export const EMPRESA = {
  nome: 'Arte Laje',
  slogan: 'Nosso negócio é concreto',
  telefone: { numero: '(47) 3275-2000', link: '+554732752000' },
  email: 'artelaje@artelaje.com.br',
  endereco: 'Rua Prof. Antônio E. Ayroso, 733M, Nova Brasília, Jaraguá do Sul - SC',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Arte+Laje+Rua+Professor+Ant%C3%B4nio+Estanislau+Ayroso+733+Jaragu%C3%A1+do+Sul',
  regiao: 'Norte, litoral e médio vale do Itajaí em Santa Catarina, e sul do Paraná',
};

export const REPRESENTANTES = [
  { nome: 'Edson Luis Bóries', telefones: ['(47) 99113-1011'], email: 'edson@artelaje.com.br' },
  { nome: 'Jonny Souza', telefones: ['(47) 99991-0923'], email: 'jonny@artelaje.com.br' },
  { nome: 'José Geraldo Arnecke', telefones: ['(47) 99962-2865', '(47) 99274-6926'], email: 'jose@artelaje.com.br' },
  { nome: 'Ilário Froehner', telefones: ['(47) 99199-0228', '(47) 3644-0228', '(47) 3644-6035'], email: 'ilariofroehner@hotmail.com' },
];

export const telLink = (t: string) => `+55${t.replace(/\D/g, '')}`;

export type Laje = {
  slug: 'trelicada' | 'mini-painel' | 'convencional';
  nome: string;
  subtitulo: string;
  resumo: string;
  texto: string[];
  vantagens: string[];
  vao: string;
  fotos: string[];
};

export const LAJES: Laje[] = [
  {
    slug: 'trelicada',
    nome: 'Laje treliçada',
    subtitulo: 'Unidirecional e bidirecional',
    resumo: 'Vence vãos de até 12 m e suporta paredes sobre a laje. Para casas, galpões, edifícios e estacionamentos.',
    texto: [
      'A laje treliçada é usada nas construções em geral: galpões, casas, residenciais, edifícios, estacionamentos, shopping centers, pontes e escolas.',
      'Resiste com segurança a sobrecargas maiores em grandes vãos, com menos vigas e pilares, o que favorece a estética e as manobras de veículos.',
    ],
    vantagens: [
      'Vencer grandes vãos livres',
      'Suportar grandes cargas com alturas relativamente baixas',
      'Suportar paredes sobre a laje',
      'Reduzir as reações nos apoios, pelo baixo peso próprio',
      'Reduzir colunas e vigas no sistema estrutural',
      'Reduzir o custo final da estrutura em até 40%, economizando aço, concreto, madeira, mão de obra e tempo',
    ],
    vao: 'até 12 m',
    fotos: ['laje-trelicada-1', 'laje-trelicada-2', 'laje-trelicada-3', 'laje-trelicada-4', 'laje-unidirecional', 'laje-bidirecional'],
  },
  {
    slug: 'mini-painel',
    nome: 'Laje mini painel treliçada',
    subtitulo: 'Dispensa o reboco',
    resumo: 'Parte de baixo contínua e lisa: acabamento direto com gesso, massa corrida ou só pintura.',
    texto: [
      'O painel treliçado com EPS tem as mesmas características técnicas de uma laje treliçada, com um enchimento mais leve, o que permite vencer grandes vãos pela redução do peso próprio.',
    ],
    vantagens: [
      'Parte inferior contínua, que pode eliminar chapisco, emboço e reboco',
      'Acabamento direto com gesso, massa corrida ou apenas pintura',
      'Menos escoramento que a laje maciça',
      'Montagem e concretagem mais rápidas',
    ],
    vao: 'grandes vãos',
    fotos: ['laje-mini-painel', 'laje-eps'],
  },
  {
    slug: 'convencional',
    nome: 'Laje convencional',
    subtitulo: 'Piso e forro',
    resumo: 'Vigota em T invertido com lajota cerâmica ou EPS. Grande estoque e entrega rápida.',
    texto: [
      'As vigotas têm formato de T invertido, com barras de aço por dentro, e enchimento de lajota cerâmica ou EPS (isopor).',
      'É uma laje segura, confiável e leve, com grande disponibilidade em estoque, o que permite atender rápido.',
    ],
    vantagens: [
      'Sistema mais barato: pouco uso de fôrma de madeira e de escoramento',
      'Não precisa de mão de obra especializada',
      'Montagem ágil pela facilidade de manuseio',
      'Para residências e comércio, desde que sem parede sobre a laje e com limite de vão',
    ],
    vao: 'até 5 m',
    fotos: ['laje-lajota-ceramica'],
  },
];

export const ACESSORIOS = [
  { nome: 'Lajota cerâmica', texto: 'Preenchimento da laje, sem função estrutural.', foto: 'acessorio-1' },
  { nome: 'EPS para laje comum e treliçada', texto: 'Mais leve que a lajota: reduz o peso da obra, isola calor e reduz ruído. Tem ranhuras para facilitar o reboco.', foto: 'acessorio-2' },
  { nome: 'EPS para laje bidirecional', texto: 'Bloco moldado para lajes uni e bidirecionais, com economia na concretagem.', foto: 'acessorio-3' },
  { nome: 'EPS para laje painel', texto: 'Bloco de enchimento para as lajes painel.', foto: 'acessorio-4' },
  { nome: 'Caixa de luz concretada', texto: 'Ponto de luz e distribuição dos fios elétricos.', foto: 'acessorio-5' },
  { nome: 'Eletroduto corrugado', texto: 'Passagem da fiação elétrica.', foto: 'acessorio-6' },
  { nome: 'Tela de laje', texto: 'Armadura distribuída sobre a laje.', foto: 'acessorio-7' },
  { nome: 'Haste metálica', texto: 'Fixa as telhas nos vigotes da laje, no lugar da madeira.', foto: 'acessorio-8' },
  { nome: 'Canaletas plásticas', texto: 'Formam as vigas na concretagem das lajes bidirecionais.', foto: 'acessorio-9' },
];

export const SERVICOS = [
  { titulo: 'Engenheiro civil no seu projeto', texto: 'Orientação técnica de Ricardo Emmendörfer Scheuer, engenheiro civil, CREA nº 078630-6.' },
  { titulo: 'ART: garantia da laje', texto: 'Anotação de Responsabilidade Técnica. A empresa é inscrita no CREA-SC sob o nº 055912-4.' },
  { titulo: 'Esquema de montagem na obra', texto: 'Na entrega, a Arte Laje fornece o esquema de montagem para facilitar e dar segurança à montagem.' },
  { titulo: 'Entrega na data combinada', texto: 'Estoque elevado de lajes convencionais para entregar dentro da programação da sua obra.' },
];

// Processo da fábrica: legendas reais da página "Parque fabril", na ordem das fotos.
export const FABRICA = [
  'Investimentos em tecnologia na pré-produção',
  'Análise do projeto e dimensionamento estrutural da laje',
  'Amplas instalações para produção',
  'Movimentação para agilizar o fluxo de trabalho',
  'Fôrmas proporcionando melhor acabamento',
  'Ferragens dimensionadas para cada projeto',
  'Aço em rolos CA 60 (evita emendas)',
  'Estoque de insumos garantindo a entrega',
  'Sistema mecanizado de corte de aço',
  'Automatização no processo produtivo',
  'Misturadores para melhor homogeneização do concreto',
  'Sistemas de movimentação agilizando a produção',
  'Concretagem mecanizada',
  'Otimização e garantia do processo',
  'Conferência de processo',
  'Produção de acordo com as normas',
  'Preparação para a cura do concreto',
  'Estoque de lajes convencionais regulado',
  'Lajes treliçadas de acordo com o projeto',
  'Estoque de enchimentos: EPS e lajota cerâmica',
].map((legenda, i) => ({ legenda, foto: `fabrica-${String(i + 1).padStart(2, '0')}` }));

export const OBRAS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'd1', 'd2', 'd3', 'd4', 'd5', 'e1', 'e2', 'f1'].map((id) => `obra-${id}`);
// Caminhões da Arte Laje com guindaste.
export const FROTA = ['obra-f2', 'obra-f3'];

export const HISTORIA = [
  { ano: '1977', texto: 'Os eletricistas José Gonçalves Filho e Jaime de Souza começam a fábrica de produtos de concreto, com a produção manual de postes. Logo vem o terreno no Nova Brasília, onde a fábrica está até hoje, e a laje pré-fabricada de piso e forro.' },
  { ano: '1985', texto: 'Entra no varejo de material de construção com uma loja no Nova Brasília. Até 2000 abre mais três filiais e chega a ser a segunda maior rede do segmento em Jaraguá do Sul.' },
  { ano: '2000', texto: 'Vende as lojas para se dedicar só aos produtos de concreto para a construção civil, investindo em tecnologia, treinamento, qualidade, logística e acompanhamento técnico.' },
  { ano: '2004', texto: 'Adere ao PBQP-H, o Programa Brasileiro da Qualidade e Produtividade do Habitat.' },
  { ano: '2011', texto: 'Cresce com princípios sólidos: cumprir o que promete, respeitar clientes, fornecedores, colaboradores e instituições financeiras.' },
];

export const MISSAO =
  'Ajudar o cliente na solução dos seus problemas na construção de moradia, comércio e indústrias, através dos seus produtos com tecnologia de ponta, qualidade e pessoal qualificado e em contínuo aperfeiçoamento.';

export const NUMEROS = [
  { valor: '1977', rotulo: 'pioneira em laje pré-fabricada no Vale do Itapocu' },
  { valor: '5 milhões de m²', rotulo: 'de lajes produzidas, segundo a empresa' },
  { valor: 'PBQP-H', rotulo: 'programa de qualidade desde 2004' },
];
