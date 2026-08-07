import { TerminalData, MarketScenarioPreset } from '../types';

export const SAMPLE_PRESETS: MarketScenarioPreset[] = [
  {
    id: 'cenario-italac-alta',
    title: 'Cenário 1: Disputa Aguda da Italac no Sudeste & Seca',
    description: 'Avanço da estiagem reduz captação em GO/MG; Italac eleva ágio no spot para abastecer fábricas de UHT e queijos.',
    milkPointText: `A disputa por leite cru no mercado spot do Sudeste e Centro-Oeste atingiu novos patamares nesta semana. Com a acentuação da seca em Goiás e Triângulo Mineiro, a captação média nas fazendas recuou 3,4%. A Italac lidera a movimentação compradora para garantir volume nas unidades de Corumbaíba (GO) e Passos (MG), pagando ágio de até +R$ 0,22/litro sobre a média regional. Outros grandes laticínios como Piracanjuba e Lactalis também cobrem ofertas para não perder fornecedores cadastrados. No atacado de São Paulo, a muçarela subiu 2,1% e o leite longa vida (UHT) avançou para R$ 4,38/litro.`,
    cepeaText: `O indicador do leite ao produtor (CEPEA/Scot) fechou em alta acumulada de +2,8% nas principais bacias. Na B3, os contratos futuros do milho (CCM) e da soja (SFI) registraram alta diante do câmbio valorizado (Dólar a R$ 5,42), elevando o custo de suplementação com ração concentrada em 4,1%. As importações de lácteos do Mercosul apresentaram ligeira desaceleração de -2,3% devido à menor disponibilidade de leite em pó na Argentina.`
  },
  {
    id: 'cenario-safra-sul-baixa',
    title: 'Cenário 2: Pico de Safra no Sul & Pressão nos Derivados',
    description: 'Entrada da safra gaúcha e catarinense aumenta oferta; indústrias operam com cautela e deságios pontuais.',
    milkPointText: `O avanço da safra de inverno nos estados do Sul (RS, SC e PR) elevou a oferta de leite cru nas plataformas industriais. Com tanques cheios, as indústrias reduziram a busca por leite spot. A Italac ajustou o ritmo de captação em Santa Catarina, mantendo compras cadastradas em nível estável, mas evitando pagar prêmios extra-cota. A Nestlé e a Lactalis operam com estoques confortáveis para leites em pó e condensado. Varejistas no Sudeste pressionam por descontos no UHT no atacado (-1,5%).`,
    cepeaText: `Índice CEPEA aponta recuo de -1,2% na média Brasil paga ao produtor. A safrinha de milho reduziu as cotações do grão na B3 em -2,4%, aliviando parcialmente a margem do produtor rural. As importações oriundas do Uruguai voltaram a subir (+3,5%), aumentando a oferta interna.`
  },
  {
    id: 'cenario-estabilidade-graos',
    title: 'Cenário 3: Equilíbrio de Mercado & Câmbio Estável',
    description: 'Mercado spot estabilizado, estoques ajustados nas indústrias e consumo final sem sobressaltos.',
    milkPointText: `O mercado comercial de leite cru opera em ritmo de equilíbrio neste início de mês. As cotações do spot oscilam em faixa estreita (R$ 3,02 a R$ 3,06/litro). A Italac mantém estratégia de compra de manutenção, absorvendo a produção contratada sem necessidade de disputar lotes no mercado livre. Piracanjuba e Laticínios Bela Vista acompanham a estabilidade, ajustando processamento de derivados conforme a demanda semanal do grande varejo.`,
    cepeaText: `Indicador CEPEA manteve estabilidade técnica (+0,1%). Preços do milho na B3 fecharam sem variação expressiva (R$ 68,10/saca). O câmbio oscila próximo a R$ 5,38, mantendo o custo de fertilizantes e diesel sob controle.`
  }
];

export const INITIAL_TERMINAL_DATA: TerminalData = {
  todayDateFormatted: new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase()),

  aiSummary3Lines: [
    'A seca prolongada em GO e MG reduziu a captação no campo em 3,4%, forçando a Italac a cobrir prêmios no spot.',
    'A alta dos grãos na B3 (Milho +3,8%, Soja +2,4%) encarece a ração e impede reduções no preço do leite ao produtor.',
    'A demanda aquecida no atacado de UHT e queijos sustenta viés altista para as negociações dos próximos 15 dias.'
  ],

  ipml: {
    score: 82,
    statusLabel: 'PRESSÃO ALTISTA EXTREMA (82/100)',
    factors: [
      { label: 'Leite Spot em Alta (+R$ 0,22/L de ágio)', points: 18, type: 'positive', explanation: 'Disputa feroz entre laticínios por lotes de leite cru no mercado livre' },
      { label: 'Recuo na Captação Regional (-3,4% clima seco)', points: 15, type: 'positive', explanation: 'Estiagem em Goiás e Triângulo Mineiro afeta produtividade das vacas' },
      { label: 'Custos de Ração na B3 (Milho +3,8%)', points: 12, type: 'positive', explanation: 'Sustenta o piso de custo das fazendas em confinamento e semi-confinamento' },
      { label: 'Repasse no Atacado (UHT +2,1% e Muçarela +1,8%)', points: 10, type: 'positive', explanation: 'Laticínios conseguem repassar margem para os supermercados' },
      { label: 'Queda nas Importações (-2,3% Mercosul)', points: 7, type: 'positive', explanation: 'Menor entrada de leite em pó da Argentina reduz concorrência externa' },
      { label: 'Entrada de Safra Pontual no Sul', points: -6, type: 'negative', explanation: 'Início do pico de produção no RS/SC atenua levemente o apetite' }
    ]
  },

  compass: {
    marketDirection: 'comprador',
    directionBadge: '🟢 COMPRADOR (ALTA DOS PREÇOS)',
    periods: {
      d7: { label: '7 Dias', probabilityText: 'Alta Forte (84%)', direction: 'alta' },
      d15: { label: '15 Dias', probabilityText: 'Alta Moderada (76%)', direction: 'alta' },
      d30: { label: '30 Dias', probabilityText: 'Estável (58%)', direction: 'estabilidade' }
    }
  },

  drivers: [
    { id: 'drv-1', text: 'Leite Spot pressionado no Sudeste com ágio de até +R$ 0,22/litro pago pelas indústrias.', direction: 'up', impactTag: '+R$ 0,22/L Ágio Spot' },
    { id: 'drv-2', text: 'Italac acelerando captação para sustentar linhas de produção de UHT e leite condensado em GO/MG.', direction: 'up', impactTag: 'Apetite Italac Max' },
    { id: 'drv-3', text: 'Valorização dos contratos futuros do milho (CCM/B3) a R$ 68,50/saca pressiona margem dos produtores.', direction: 'up', impactTag: 'Ração Elevada B3' },
    { id: 'drv-4', text: 'Desaceleração temporária na entrada de lácteos argentinos alivia pressão nas indústrias nacionais.', direction: 'down', impactTag: 'Importação -2,3%' }
  ],

  industryHumor: {
    italac: {
      name: 'Italac',
      isMainHighlight: true,
      appetite: '🟢 COMPRANDO FORTE',
      statusType: 'buyer_strong',
      regionNote: 'Goiás, Triângulo Mineiro, São Paulo, Paraná e Rio Grande do Sul',
      spotPremium: 'Ágio Agressivo (+R$ 0,18 a +R$ 0,24 / Litro)',
      strategyText: 'Estratégia compradora ativa para garantir pleno abastecimento das unidades industriais de Corumbaíba (GO) e Passos (MG), cobrindo ofertas de concorrentes regionais.'
    },
    competitors: [
      {
        name: 'Piracanjuba',
        isMainHighlight: false,
        appetite: '🟢 Comprando Forte',
        statusType: 'buyer_strong',
        regionNote: 'GO, MG, SP',
        spotPremium: 'Ágio de +R$ 0,15 / Litro',
        strategyText: 'Disputando tanques na bacia do Centro-Oeste para proteger market share de UHT e creme de leite.'
      },
      {
        name: 'Lactalis',
        isMainHighlight: false,
        appetite: '🟡 Compras Moderadas',
        statusType: 'buyer_moderate',
        regionNote: 'RS, SC, PR, SP, MG',
        spotPremium: 'Preço de Tabela / Sem Ágio Extra',
        strategyText: 'Foco na captação do Sul com entrada da safra de inverno; mantendo compras equilibradas no Sudeste.'
      },
      {
        name: 'Nestlé',
        isMainHighlight: false,
        appetite: '🟡 Cauteloso / Seletivo',
        statusType: 'cautious',
        regionNote: 'SP, MG, GO',
        spotPremium: 'Preço Normal de Contrato',
        strategyText: 'Priorizando leite com padrão de qualidade e sustentabilidade (programa com produtores parceiros).'
      }
    ]
  },

  impactRadar: [
    {
      id: 'rad-1',
      title: 'Italac e Piracanjuba Elevam Ágios no Mercado Spot para Segurar Leite Cru',
      summary: 'A disputa acirrada entre as gigantes de laticínios no Centro-Oeste elevou a cotação do leite spot para R$ 3,10/L. Indústrias evitam ociosidade em linhas de UHT.',
      direction: 'alta',
      impactScore: 9.2,
      category: 'Mercado Spot & Disputa',
      source: 'MilkPoint / Scot',
      publishedTime: 'Hoje, 08:15'
    },
    {
      id: 'rad-2',
      title: 'Captação do Leite Recua 3,4% no Sudeste sob Efeito de Estiagem Severa',
      summary: 'A escassez de pastagens de qualidade e o custo elevado da suplementação com milho reduzem a oferta de leite nas plataformas de recepção.',
      direction: 'alta',
      impactScore: 8.7,
      category: 'Oferta no Campo',
      source: 'CEPEA / ICAP-L',
      publishedTime: 'Hoje, 07:40'
    },
    {
      id: 'rad-3',
      title: 'Contratos de Milho sobem na B3 impulsionados pelo Dólar a R$ 5,42',
      summary: 'A valorização dos grãos eleva o custo por litro produzido nas fazendas tecnificadas, inviabilizando reduções nas tabelas de pagamento ao produtor.',
      direction: 'alta',
      impactScore: 7.8,
      category: 'Insumos B3',
      source: 'Notícias Agrícolas / B3',
      publishedTime: 'Hoje, 08:50'
    },
    {
      id: 'rad-4',
      title: 'Atacado de Derivados Registra Alta de 2,1% no UHT em São Paulo',
      summary: 'Distribuidores aceitam reajuste de preços diante dos custos crescentes da matéria-prima, permitindo às indústrias sustentarem suas propostas de compra.',
      direction: 'alta',
      impactScore: 7.4,
      category: 'Atacado & Varejo',
      source: 'Canal Rural',
      publishedTime: 'Hoje, 09:10'
    }
  ],

  weeklyTimeline: [
    { day: 'Seg', dateStr: '03/Ago', eventTitle: 'Leite Spot abre a semana com alta de +1,8% no SP/GO', direction: 'alta', impactTag: '+1,8% Spot' },
    { day: 'Ter', dateStr: '04/Ago', eventTitle: 'Leilão GDT Global fecha em alta de +2,4% no leite em pó', direction: 'alta', impactTag: 'GDT +2,4%' },
    { day: 'Qua', dateStr: '05/Ago', eventTitle: 'Italac anuncia reajuste na tabela de captação em GO/MG', direction: 'alta', impactTag: 'Italac Reajuste' },
    { day: 'Qui', dateStr: '06/Ago', eventTitle: 'Milho B3 renova máxima do mês a R$ 68,50/saca', direction: 'alta', impactTag: 'Milho R$ 68,50' },
    { day: 'Sex', dateStr: '07/Ago', eventTitle: 'Boletim CEPEA confirma recuo de captação e viés comprador', direction: 'alta', impactTag: 'IPML 82/100', isToday: true }
  ],

  climateRadar: {
    summary15Days: 'A seca persistente em Goiás e Minas Gerais reduz a oferta de pastagens e pressiona a captação no Sudeste/Centro-Oeste, gerando impulso altista no preço do leite cru para os próximos 15 dias, apesar da estabilidade climática e chuvas moderadas no Sul e Mercosul.',
    nationalRegions: [
      {
        region: 'Goiás (GO)',
        condition: 'Seca Severa / Estiagem',
        weatherType: 'drought',
        impactDirection: 'alta',
        impactLabel: 'Impacto Altista (Queda de Oferta)',
        details: '🔴 Seca em GO prejudica pastos e força descarte temporário ou custo extra de silagem, reduzindo entrega nas indústrias.'
      },
      {
        region: 'Minas Gerais (MG)',
        condition: 'Estiagem no Triângulo & Norte',
        weatherType: 'drought',
        impactDirection: 'alta',
        impactLabel: 'Impacto Altista (Menor Captação)',
        details: '🔴 Estiagem na bacia de Passos e Patos de Minas eleva disputa spot pela Italac e laticínios locais.'
      },
      {
        region: 'Paraná & Sul (PR/SC/RS)',
        condition: 'Chuvas Moderadas / Frio',
        weatherType: 'rain',
        impactDirection: 'baixa',
        impactLabel: 'Impacto Baixista (Safra Estável)',
        details: '🟢 Clima favorável para pastagens de inverno no PR/RS mantém volume de produção estável no Sul.'
      }
    ],
    globalRegions: [
      {
        region: 'Nova Zelândia (Fonterra)',
        condition: 'Sol / Início de Primavera',
        weatherType: 'sun',
        impactDirection: 'neutro',
        impactLabel: 'Impacto Neutro (Volume Regular)',
        details: '🟡 Condições climáticas estáveis na Ilha do Norte mantêm projeção de embarques do leilão GDT sem choques.'
      },
      {
        region: 'Mercosul (Uruguai / Argentina)',
        condition: 'Chuvas Favoráveis no Litoral',
        weatherType: 'rain',
        impactDirection: 'baixa',
        impactLabel: 'Impacto Baixista (Oferta Exportável)',
        details: '🟢 Chuvas no Uruguai recuperam pastagens e garantem oferta de leite em pó para exportação ao Brasil.'
      }
    ]
  },

  tickers: [
    { label: 'LEITE SPOT (MÉDIA BR)', value: 'R$ 3,08 / L', change: '+2,6%', status: 'up' },
    { label: 'ITALAC SPOT PREMIUM', value: '+R$ 0,22 / L', change: 'ALTA', status: 'up' },
    { label: 'MILHO FUTURO B3', value: 'R$ 68,50 / sc', change: '+3,8%', status: 'up' },
    { label: 'SOJA FUTURO B3', value: 'R$ 134,20 / sc', change: '+2,4%', status: 'up' },
    { label: 'DÓLAR COMERCIAL', value: 'R$ 5,42', change: '+0,65%', status: 'up' },
    { label: 'UHT ATACADO (SP)', value: 'R$ 4,38 / L', change: '+2,1%', status: 'up' },
    { label: 'GDT LEITE EM PÓ', value: 'US$ 3.820 / t', change: '+2,4%', status: 'up' }
  ],

  timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
};
