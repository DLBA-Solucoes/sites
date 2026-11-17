import type { Lang } from '../lib/i18n';

// Dados de contato da SC (fonte: site atual, conferido em 17/11/2026).
export const CONTATO = {
  telefones: [
    { numero: '+55 47 3376-4209', link: '+554733764209', principal: true },
    { numero: '+55 47 3376-1860', link: '+554733761860' },
    { numero: '+55 47 3273-5098', link: '+554732735098' },
  ],
  emails: {
    vendas: 'atendimento@scmaquinas.com',
    exportacao: 'sales@scmaquinas.com',
    compras: 'compras@scmaquinas.com',
    rh: 'rh@scmaquinas.com',
  },
  // WhatsApp do botão flutuante do site atual (o mesmo número do fixo principal).
  // Só dígitos, com DDI e DDD. Deixe vazio para esconder o botão no site todo.
  whatsapp: '554733764209' as string,
  endereco: 'R. JGS 010 Waldemar Gumz, Jaraguá do Sul - SC, Brasil',
  mapa: 'https://www.google.com/maps/search/?api=1&query=SC+M%C3%A1quinas+e+Implementos+Agr%C3%ADcolas+Jaragu%C3%A1+do+Sul',
  redes: [
    { nome: 'Instagram', url: 'https://www.instagram.com/scmaquinasagricolas/' },
    { nome: 'Facebook', url: 'https://www.facebook.com/scmaquinasagricolas/' },
  ],
};

export const EMPRESA: Record<
  Lang,
  {
    titulo: string;
    lead: string;
    historia: string[];
    missao: string;
    visao: string;
    valores: { nome: string; texto: string }[];
    marcos: { ano: string; titulo: string; texto: string }[];
  }
> = {
  pt: {
    titulo: 'Criar um agro mais ágil',
    lead: 'Liderança e inovação definem a SC Máquinas e Implementos Agrícolas. Com soluções tecnológicas avançadas, contribuímos para o crescimento sustentável do agronegócio, fortalecendo a produtividade e eficiência no campo.',
    historia: [
      'Nossa jornada começou com a fundação da Cattoni Usinagem Ltda, uma pequena, mas visionária oficina dedicada ao maquinário agrícola. Ao longo dos anos, essa visão pioneira evoluiu, levando-nos a nos tornarmos a SC Máquinas e Implementos Agrícolas, uma referência no mercado de implementos agrícolas.',
      'Hoje, somos reconhecidos pela nossa capacidade de fornecer soluções tecnologicamente avançadas e robustas, projetadas para atender às demandas crescentes do agronegócio no Brasil e no mundo.',
    ],
    missao: 'Pulverizar eficiência no agronegócio.',
    visao: 'Ser sinônimo de eficiência do agronegócio, desejado pelos clientes.',
    valores: [
      { nome: 'Comprometimento', texto: 'O vínculo que envolve responsabilidade, interesse, participação e empenho.' },
      { nome: 'Credibilidade', texto: 'Colocar em prática aquilo que, como organização, prometemos ao mercado.' },
      { nome: 'Eficiência', texto: 'Primar pela excelência, lado a lado com a tecnologia, na gestão e na fabricação.' },
      { nome: 'Ética', texto: 'A bússola do nosso desenvolvimento. Sob os seus pilares, construímos o nosso futuro.' },
      { nome: 'Lealdade', texto: 'Como o adubo na agricultura, nutre a relação entre indústria e consumidores.' },
      { nome: 'Proatividade', texto: 'A chave para superar desafios antes que se tornem obstáculos.' },
      { nome: 'Resiliência', texto: 'Essencial para superar desafios econômicos e climáticos do agronegócio.' },
    ],
    marcos: [
      { ano: '1995', titulo: 'Fundação', texto: 'Cattoni Usinagem' },
      { ano: '1999', titulo: 'Novo nome', texto: 'Cattoni Máquinas e Implementos' },
      { ano: '2004', titulo: 'Lançamento', texto: 'Linha Moldecatto' },
      { ano: '2009', titulo: 'Lançamento', texto: 'Linha JET' },
      { ano: '2013', titulo: 'Exportação', texto: 'Início das exportações e novo parque fabril de 2.700 m²' },
      { ano: '2017', titulo: 'Novo nome', texto: 'SC Máquinas e Implementos Agrícolas' },
      { ano: '2021', titulo: 'Lançamento', texto: 'Novas linhas de implementos' },
      { ano: '2023', titulo: 'Foco', texto: 'Inovação e evolução na linha JET' },
    ],
  },
  en: {
    titulo: 'Creating a more agile agribusiness',
    lead: 'Leadership and innovation define SC Máquinas e Implementos Agrícolas. With advanced technological solutions, we contribute to the sustainable growth of agribusiness, enhancing productivity and efficiency in the field.',
    historia: [
      'Our journey began with the founding of Cattoni Usinagem Ltda, a small but visionary workshop dedicated to agricultural machinery. Over the years, this pioneering vision evolved, leading us to become SC Máquinas e Implementos Agrícolas, a reference in the agricultural implements market.',
      'Today, we are recognized for our ability to provide technologically advanced and robust solutions, designed to meet the growing demands of agribusiness in Brazil and worldwide.',
    ],
    missao: 'To spread efficiency throughout agribusiness.',
    visao: 'To be synonymous with agribusiness efficiency, sought after by our clients.',
    valores: [
      { nome: 'Commitment', texto: 'The bond of responsibility, interest, participation and effort.' },
      { nome: 'Credibility', texto: 'Putting into practice what we, as an organization, promise to the market.' },
      { nome: 'Efficiency', texto: 'Striving for excellence, in step with technology, in management and manufacturing.' },
      { nome: 'Ethics', texto: 'The compass of our development. Under its pillars, we build our future.' },
      { nome: 'Loyalty', texto: 'Like fertilizer in agriculture, it nurtures the bond between industry and customers.' },
      { nome: 'Proactivity', texto: 'The key to overcoming challenges before they become obstacles.' },
      { nome: 'Resilience', texto: 'Essential to overcome the economic and climate challenges of agribusiness.' },
    ],
    marcos: [
      { ano: '1995', titulo: 'Foundation', texto: 'Cattoni Usinagem' },
      { ano: '1999', titulo: 'New name', texto: 'Cattoni Machinery and Implements' },
      { ano: '2004', titulo: 'Launch', texto: 'Moldecatto line' },
      { ano: '2009', titulo: 'Launch', texto: 'JET line' },
      { ano: '2013', titulo: 'Exports', texto: 'Exports begin and a new 2,700 m² plant opens' },
      { ano: '2017', titulo: 'New name', texto: 'SC Máquinas e Implementos Agrícolas' },
      { ano: '2021', titulo: 'Launch', texto: 'New implement lines' },
      { ano: '2023', titulo: 'Focus', texto: 'Innovation and evolution in the JET line' },
    ],
  },
  es: {
    titulo: 'Crear un agro más ágil',
    lead: 'El liderazgo y la innovación definen a SC Máquinas e Implementos Agrícolas. Con soluciones tecnológicas avanzadas, contribuimos al crecimiento sostenible del agronegocio, fortaleciendo la productividad y la eficiencia en el campo.',
    historia: [
      'Nuestro camino comenzó con la fundación de Cattoni Usinagem Ltda, un pequeño pero visionario taller dedicado a la maquinaria agrícola. Con los años, esta visión pionera evolucionó y nos convertimos en SC Máquinas e Implementos Agrícolas, una referencia en el mercado de implementos agrícolas.',
      'Hoy somos reconocidos por nuestra capacidad de ofrecer soluciones tecnológicamente avanzadas y robustas, diseñadas para atender las crecientes demandas del agronegocio en Brasil y en el mundo.',
    ],
    missao: 'Pulverizar eficiencia en el agronegocio.',
    visao: 'Ser sinónimo de eficiencia en el agronegocio, deseado por los clientes.',
    valores: [
      { nome: 'Compromiso', texto: 'El vínculo de responsabilidad, interés, participación y dedicación.' },
      { nome: 'Credibilidad', texto: 'Poner en práctica lo que, como organización, prometemos al mercado.' },
      { nome: 'Eficiencia', texto: 'Destacar por la excelencia, de la mano con la tecnología, en gestión y fabricación.' },
      { nome: 'Ética', texto: 'La brújula de nuestro desarrollo. Sobre sus pilares construimos nuestro futuro.' },
      { nome: 'Lealtad', texto: 'Como el abono en la agricultura, nutre la relación entre industria y clientes.' },
      { nome: 'Proactividad', texto: 'La clave para superar desafíos antes de que se vuelvan obstáculos.' },
      { nome: 'Resiliencia', texto: 'Esencial para superar los desafíos económicos y climáticos del agronegocio.' },
    ],
    marcos: [
      { ano: '1995', titulo: 'Fundación', texto: 'Cattoni Usinagem' },
      { ano: '1999', titulo: 'Nuevo nombre', texto: 'Cattoni Máquinas y Equipos' },
      { ano: '2004', titulo: 'Lanzamiento', texto: 'Línea Moldecatto' },
      { ano: '2009', titulo: 'Lanzamiento', texto: 'Línea JET' },
      { ano: '2013', titulo: 'Exportación', texto: 'Inicio de las exportaciones y nueva planta de 2.700 m²' },
      { ano: '2017', titulo: 'Nuevo nombre', texto: 'SC Máquinas e Implementos Agrícolas' },
      { ano: '2021', titulo: 'Lanzamiento', texto: 'Nuevas líneas de implementos' },
      { ano: '2023', titulo: 'Foco', texto: 'Innovación y evolución en la línea JET' },
    ],
  },
};
