import { 
  ServiceItem, 
  Product, 
  Appointment, 
  BudgetEstimate, 
  WorkOrder, 
  WorkshopSettings 
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-oleo-completo',
    name: 'Troca de Óleo & Kit 4 Filtros',
    category: 'oleo_filtros',
    description: 'Drenagem a vácuo/gravidade, óleo específico conforme manual do fabricante e substituição de filtro de óleo, ar do motor, combustível e ar-condicionado (cabine).',
    durationEstimate: '45 minutos',
    basePrice: 280,
    highlighted: true,
    warrantyDays: 90,
    itemsIncluded: [
      'Óleo 100% sintético homologado pela montadora',
      'Filtro de óleo blindado original/Mann',
      'Filtro de ar do motor e filtro de combustível',
      'Higienização de ar-condicionado com ozônio e filtro de cabine',
      'Checklist de 20 pontos de cortesia'
    ]
  },
  {
    id: 'srv-revisao-50',
    name: 'Revisão Preventiva Geral (50 Itens)',
    category: 'revisao',
    description: 'Diagnóstico computadorizado com scanner OBD2, inspeção minuciosa de suspensão, freios, luzes, fluidos, correias, carga de bateria e teste de rodagem.',
    durationEstimate: '2 horas',
    basePrice: 350,
    highlighted: true,
    warrantyDays: 90,
    itemsIncluded: [
      'Varredura completa de injeção eletrônica e ABS',
      'Inspeção de pastilhas, lonas, discos e fluido de freio',
      'Teste de amortecedores, pivôs, terminais e buchas',
      'Verificação do ponto de ebulição do fluido e densidade do radiador',
      'Relatório técnico digital entregue via WhatsApp'
    ]
  },
  {
    id: 'srv-freios-abs',
    name: 'Manutenção do Sistema de Freios & ABS',
    category: 'freios',
    description: 'Troca de pastilhas de cerâmica/metálica, retífica ou substituição de discos, sangria computadorizada do sistema ABS e fluido DOT 4/5.1 novo.',
    durationEstimate: '1h 30min',
    basePrice: 240,
    warrantyDays: 180,
    itemsIncluded: [
      'Substituição de pastilhas dianteiras e/ou traseiras',
      'Medição de espessura de discos com micrômetro digital',
      'Limpeza de pinças com desengraxante não-oleoso',
      'Sangria e troca total de fluido DOT 4 sintético',
      'Ajuste fino de freio de estacionamento/mão'
    ]
  },
  {
    id: 'srv-suspensao-geometria',
    name: 'Suspensão, Alinhamento 3D & Balanceamento',
    category: 'suspensao',
    description: 'Alinhamento a laser tridimensional, balanceamento dinâmico de rodas, diagnóstico de ruídos e substituição de amortecedores e batentes.',
    durationEstimate: '1h 15min',
    basePrice: 190,
    warrantyDays: 90,
    itemsIncluded: [
      'Alinhamento computadorizado 3D de alta precisão',
      'Balanceamento dinâmico nas 4 rodas',
      'Aferição de caster, cambagem e convergência',
      'Inspeção da caixa de direção e terminais axiais'
    ]
  },
  {
    id: 'srv-injecao-scanner',
    name: 'Injeção Eletrônica & Limpeza de Bicos',
    category: 'injecao_eletronica',
    description: 'Diagnóstico de falhas com scanner automotivo, teste de vazão e equalização de bicos injetores no ultrassom, limpeza de TBI (corpo de borboleta).',
    durationEstimate: '1h 45min',
    basePrice: 290,
    warrantyDays: 90,
    itemsIncluded: [
      'Limpeza ultrassônica de eletroinjetores com equalização',
      'Descarbonização de corpo de borboleta (TBI)',
      'Leitura de parâmetros da sonda lambda e sensores MAP/MAF',
      'Reset dos parâmetros autoadaptativos da centralina (ECU)'
    ]
  },
  {
    id: 'srv-arrefecimento',
    name: 'Limpeza do Sistema de Arrefecimento',
    category: 'motor_cambio',
    description: 'Esgotamento completo com máquina de circulação, aplicação de flush desincrustante, reposição de aditivo orgânico de longa duração e água desmineralizada.',
    durationEstimate: '1h 20min',
    basePrice: 260,
    warrantyDays: 180,
    itemsIncluded: [
      'Lavagem sob pressão controlada de radiador e galerias',
      'Aditivo orgânico de alta performance (concentração 50/50)',
      'Troca da tampa do reservatório e teste de estanqueidade',
      'Teste do termostato e acionamento da ventoinha em 2 velocidades'
    ]
  },
  {
    id: 'srv-correia-dentada',
    name: 'Troca de Correia Dentada & Tensor',
    category: 'motor_cambio',
    description: 'Sincronismo com ferramentas de fasagem originais, substituição de correia sincronizadora, rolamentos tensores e inspeção da bomba d\'água.',
    durationEstimate: '3 horas',
    basePrice: 480,
    warrantyDays: 180,
    itemsIncluded: [
      'Kit correia dentada Gates/Continental/Dayco',
      'Rolamento tensor com torque aferido por torquímetro',
      'Checagem de retentores de comando e virabrequim',
      'Fasagem milimétrica do comando de válvulas'
    ]
  },
  {
    id: 'srv-embreagem',
    name: 'Substituição de Kit de Embreagem',
    category: 'motor_cambio',
    description: 'Platô, disco e rolamento/atuador hidráulico novos de marcas de 1ª linha (LUK / Sachs / Valeo). Pedal leve e trocas macias.',
    durationEstimate: '4 horas',
    basePrice: 650,
    warrantyDays: 180,
    itemsIncluded: [
      'Instalação de kit embreagem novo balanceado',
      'Substituição do atuador hidráulico / cabo',
      'Inspeção do volante do motor e retentor traseiro',
      'Sangria do sistema hidráulico e teste em rampa'
    ]
  },
  {
    id: 'srv-eletrica-bateria',
    name: 'Elétrica Geral, Baterias & Alternador',
    category: 'eletrica',
    description: 'Teste eletrônico de condutância e CCA de bateria, aferição do regulador de voltagem e ponte retificadora do alternador, conserto de iluminação e travas.',
    durationEstimate: '1 hora',
    basePrice: 150,
    warrantyDays: 90,
    itemsIncluded: [
      'Teste digital de vida útil da bateria com impressão de laudo',
      'Medição de queda de tensão na partida',
      'Aferição da corrente de carga do alternador',
      'Revisão de chicotes, relés e caixas de fusíveis'
    ]
  },
  {
    id: 'srv-estetica-martelinho',
    name: 'Martelinho de Ouro & Reparo Rápido',
    category: 'estetica',
    description: 'Remoção de pequenos amassados causados por chuva de granizo, batidas de porta e pequenas colisões sem danificar a pintura original do veículo.',
    durationEstimate: '2 horas',
    basePrice: 220,
    warrantyDays: 365,
    itemsIncluded: [
      'Desamassamento artesanal com ferramentas especiais',
      'Preservação 100% da tinta de fábrica do automóvel',
      'Polimento localizado com cera de carnaúba de acabamento'
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-motul-8100-5w40',
    name: 'Óleo Motul 8100 X-cess Gen2 5W40',
    brand: 'Motul',
    category: 'oleo_motor',
    viscosity: '5W40',
    oilType: '100% Sintético',
    specification: 'API SP / ACEA A3/B4 / VW 502.00 / MB 229.5',
    volume: '1 Litro',
    price: 89.90,
    originalPrice: 104.90,
    stock: 38,
    minStock: 12,
    description: 'Lubrificante de altíssima performance para motores flex, gasolina e diesel leve. Excelente resistência térmica e proteção contra borra.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-castrol-magnatec-5w30',
    name: 'Óleo Castrol Magnatec Stop-Start 5W30',
    brand: 'Castrol',
    category: 'oleo_motor',
    viscosity: '5W30',
    oilType: '100% Sintético',
    specification: 'API SP / ILSAC GF-6 / Ford WSS-M2C946-B1',
    volume: '1 Litro',
    price: 68.50,
    originalPrice: 79.90,
    stock: 54,
    minStock: 15,
    description: 'Moléculas inteligentes que aderem às superfícies metálicas protegendo o motor desde a partida, ideal para o trânsito urbano pesado.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-mobil-super-0w20',
    name: 'Óleo Mobil Super 3000 Fórmula D1 0W20',
    brand: 'Mobil',
    category: 'oleo_motor',
    viscosity: '0W20',
    oilType: '100% Sintético',
    specification: 'API SP-RC / ILSAC GF-6A / GM dexos1 Gen3',
    volume: '1 Litro',
    price: 74.00,
    originalPrice: 85.00,
    stock: 42,
    minStock: 10,
    description: 'Especialmente formulado para motores modernos com injeção direta (GDI e TGDI) e carros japoneses (Toyota, Honda, Nissan) e GM Onix.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-shell-helix-ultra-5w30',
    name: 'Óleo Shell Helix Ultra PurePlus 5W30',
    brand: 'Shell',
    category: 'oleo_motor',
    viscosity: '5W30',
    oilType: '100% Sintético',
    specification: 'API SP / ACEA C3 / BMW LL-04 / MB 229.51',
    volume: '1 Litro',
    price: 76.90,
    originalPrice: 88.00,
    stock: 26,
    minStock: 10,
    description: 'Produzido a partir de gás natural com tecnologia Shell PurePlus. Pureza incomparável e proteção superior contra o desgaste.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-lubrax-valora-5w30',
    name: 'Óleo Lubrax Valora SN Plus 5W30',
    brand: 'Lubrax',
    category: 'oleo_motor',
    viscosity: '5W30',
    oilType: '100% Sintético',
    specification: 'API SN Plus / ILSAC GF-5 / Ford',
    volume: '1 Litro',
    price: 49.90,
    originalPrice: 58.00,
    stock: 60,
    minStock: 15,
    description: 'Excelente custo-benefício nacional de alta pureza. Combate a pré-ignição a baixas rotações (LSPI) em motores turbo.',
    featured: false,
    installAvailable: true
  },
  {
    id: 'prod-motul-4100-10w40',
    name: 'Óleo Motul 4100 Turbolight 10W40',
    brand: 'Motul',
    category: 'oleo_motor',
    viscosity: '10W40',
    oilType: 'Semi-Sintético',
    specification: 'API SN / ACEA A3/B4 / MB 229.1 / VW 501.01',
    volume: '1 Litro',
    price: 52.00,
    originalPrice: 62.00,
    stock: 18,
    minStock: 10,
    description: 'Tecnossíntese reforçada para motores aspirados e turboalimentados com alta quilometragem que demandam viscosidade 10W40.',
    featured: false,
    installAvailable: true
  },
  {
    id: 'prod-filtro-mann-w712',
    name: 'Filtro de Óleo Blindado Mann Filter',
    brand: 'Mann Filter',
    category: 'filtro',
    specification: 'Válvula anti-retorno e bypass calibrada',
    volume: 'Unidade',
    price: 38.00,
    originalPrice: 45.00,
    stock: 35,
    minStock: 15,
    description: 'Elemento filtrante de alta retenção que garante óleo limpo circulando pelo virabrequim e mancais.',
    featured: false,
    installAvailable: true
  },
  {
    id: 'prod-aditivo-radiador-tirreno',
    name: 'Aditivo Concentrado Orgânico Tirreno Long Life',
    brand: 'Tirreno',
    category: 'aditivo',
    specification: 'Norma ABNT NBR 13705 / Monoetilenoglicol',
    volume: '1 Litro',
    price: 44.90,
    originalPrice: 52.00,
    stock: 22,
    minStock: 8,
    description: 'Protege contra fervura até 128°C e previne corrosão de ligas de alumínio e ferro fundido por até 5 anos ou 240.000km.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-militec-1',
    name: 'Condicionador de Metais Militec-1 Original',
    brand: 'Militec',
    category: 'aditivo',
    specification: 'Fórmula sintética micro-adsorvida',
    volume: '200ml',
    price: 119.00,
    originalPrice: 139.00,
    stock: 14,
    minStock: 6,
    description: 'Utiliza o lubrificante apenas como condutor para fixar nos poros do metal, reduzindo atrito e aquecimento em até 70%.',
    featured: true,
    installAvailable: true
  },
  {
    id: 'prod-fluido-freio-bosch-dot4',
    name: 'Fluido de Freio Bosch DOT 4 HP de Alta Temperatura',
    brand: 'Bosch',
    category: 'fluido_freio',
    specification: 'Ponto de ebulição seco 260°C / ABNT NBR 9292',
    volume: '500ml',
    price: 36.00,
    originalPrice: 42.00,
    stock: 28,
    minStock: 10,
    description: 'Fluido sintético não-higroscópico com altíssima resposta para sistemas com freio a disco ventilado e ABS.',
    featured: false,
    installAvailable: true
  },
  {
    id: 'prod-palhetas-bosch-aerotwin',
    name: 'Par de Palhetas Bosch Aerotwin Silicone',
    brand: 'Bosch',
    category: 'manutencao',
    specification: 'Encaixe universal / Spoiler aerodinâmico',
    volume: 'Par',
    price: 110.00,
    originalPrice: 130.00,
    stock: 16,
    minStock: 5,
    description: 'Varredura silenciosa e perfeita mesmo em chuva torrencial. Borracha com tratamento de grafite para longa durabilidade.',
    featured: false,
    installAvailable: true
  },
  {
    id: 'prod-koube-perfect-clean',
    name: 'Descarbonizante Koube Perfect Clean Flex',
    brand: 'Koube',
    category: 'aditivo',
    specification: 'Aplicação direta via tanque de combustível',
    volume: '500ml',
    price: 48.00,
    originalPrice: 55.00,
    stock: 25,
    minStock: 8,
    description: 'Remove depósitos de carbono das válvulas de admissão, topo de pistão e bicos injetores. Restaura potência e economia.',
    featured: false,
    installAvailable: true
  }
];

export const INITIAL_SETTINGS: WorkshopSettings = {
  shopName: 'Oficina Mecânica Trevo Especializada',
  address: 'Alameda Imperial, nº 1.576',
  neighborhood: 'Caiçara (Entre Tv. Benjamin Constant e Tv. Irmã Adelaide)',
  city: 'Castanhal',
  state: 'PA',
  zipCode: '68744-170',
  phone: '(91) 3721-6567',
  whatsapp: '(91) 98352-0888',
  email: 'contato@oficinatrevo.com.br',
  openingHours: 'Seg a Sex: 07:30 às 17:30 | Sáb: 07:30 às 11:30',
  laborHourlyRate: 140,
  pixKey: 'contato@oficinatrevo.com.br',
  elevatorsCount: 4
};

export const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'os-101',
    protocol: 'TRV-8941',
    customerName: 'Carlos Eduardo Mendes',
    customerPhone: '(91) 98112-3344',
    vehicle: {
      brand: 'Chevrolet',
      model: 'Onix Plus Premier',
      year: '2022',
      plate: 'RTA-4B21',
      mileage: '38.450 km',
      engine: '1.0 Turbo 116cv'
    },
    mechanic: 'Mestre Roberto Silva',
    bay: 'Elevador 1 (Troca Rápida)',
    status: 'em_execucao',
    diagnosticNotes: 'Cliente relatou leve oscilação em marcha lenta com o ar ligado. Foi diagnosticado corpo de borboleta sujo e velas de ignição gastas.',
    servicesPerformed: ['Troca de Óleo & Kit 4 Filtros', 'Injeção Eletrônica & Limpeza de Bicos'],
    partsUsed: [
      { name: 'Óleo Mobil Super 0W20 Sintético (4L)', quantity: 4, unitPrice: 74.00 },
      { name: 'Filtro de Óleo Mann W712', quantity: 1, unitPrice: 38.00 },
      { name: 'Jogo de Velas Iridium NGK', quantity: 1, unitPrice: 240.00 }
    ],
    laborTotal: 320.00,
    partsTotal: 574.00,
    total: 894.00,
    entryDate: '2026-09-23T08:30:00',
    expectedDate: '2026-09-23T16:00:00',
    checklist: [
      { item: 'Nível e estado do fluido de freio', checked: true, condition: 'ok' },
      { item: 'Espessura das pastilhas de freio (8mm)', checked: true, condition: 'ok' },
      { item: 'Bateria 60Ah teste de condutância (88%)', checked: true, condition: 'ok' },
      { item: 'Correia de acessórios e tensores', checked: true, condition: 'alerta' }
    ]
  },
  {
    id: 'os-102',
    protocol: 'TRV-8942',
    customerName: 'Mariana Alencar Guimarães',
    customerPhone: '(91) 99234-5566',
    vehicle: {
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: '2021',
      plate: 'QEO-7J89',
      mileage: '54.200 km',
      engine: '2.0 Flex 166cv'
    },
    mechanic: 'Especialista André Costa',
    bay: 'Elevador 2 (Geometria & Suspensão)',
    status: 'aguardando_aprovacao',
    diagnosticNotes: 'Ruído metálico na dianteira direita em pavimentos irregulares. Identificada folga acentuada no pivô da bandeja inferior e bieleta.',
    servicesPerformed: ['Suspensão, Alinhamento 3D & Balanceamento'],
    partsUsed: [
      { name: 'Bandeja dianteira direita completa Nakata', quantity: 1, unitPrice: 420.00 },
      { name: 'Par de bieletas dianteiras Cofap', quantity: 2, unitPrice: 110.00 }
    ],
    laborTotal: 280.00,
    partsTotal: 640.00,
    total: 920.00,
    entryDate: '2026-09-23T10:15:00',
    expectedDate: '2026-09-24T12:00:00',
    checklist: [
      { item: 'Amortecedores sem vazamento', checked: true, condition: 'ok' },
      { item: 'Folga no pivô inferior direito', checked: false, condition: 'critico' },
      { item: 'Geometria 3D divergência (-1°15\')', checked: false, condition: 'alerta' }
    ]
  },
  {
    id: 'os-103',
    protocol: 'TRV-8938',
    customerName: 'Fernando Bastos Filho',
    customerPhone: '(91) 98841-7788',
    vehicle: {
      brand: 'Toyota',
      model: 'Corolla XEi 2.0',
      year: '2020',
      plate: 'OBQ-9A15',
      mileage: '62.000 km',
      engine: '2.0 Dynamic Force Direct Shift'
    },
    mechanic: 'Mestre Roberto Silva',
    bay: 'Elevador 3 (Freios)',
    status: 'pronto',
    diagnosticNotes: 'Revisão preventiva de 60.000km conforme plano de manutenção. Substituição de pastilhas dianteiras cerâmicas e sangria com fluido DOT 4 Bosch.',
    servicesPerformed: ['Revisão Preventiva Geral (50 Itens)', 'Manutenção do Sistema de Freios & ABS'],
    partsUsed: [
      { name: 'Óleo Toyota 0W20 Sintético (5L)', quantity: 5, unitPrice: 72.00 },
      { name: 'Pastilhas de freio dianteiras Fras-le Cerâmica', quantity: 1, unitPrice: 280.00 },
      { name: 'Fluido de freio Bosch DOT 4 (2 frascos)', quantity: 2, unitPrice: 36.00 }
    ],
    laborTotal: 380.00,
    partsTotal: 712.00,
    total: 1092.00,
    entryDate: '2026-09-22T14:00:00',
    expectedDate: '2026-09-23T11:00:00',
    checklist: [
      { item: 'Freios dianteiros novos instalados', checked: true, condition: 'ok' },
      { item: 'Fluido renovado com ponto de ebulição >250°C', checked: true, condition: 'ok' },
      { item: 'Alinhamento 3D conferido no padrão de fábrica', checked: true, condition: 'ok' },
      { item: 'Lavagem técnica de cortesia realizada', checked: true, condition: 'ok' }
    ]
  },
  {
    id: 'os-104',
    protocol: 'TRV-8935',
    customerName: 'Luciana Pinheiro',
    customerPhone: '(91) 99182-4411',
    vehicle: {
      brand: 'Volkswagen',
      model: 'Gol 1.6 MSI',
      year: '2019',
      plate: 'QDM-3412',
      mileage: '78.900 km',
      engine: '1.6 16V EA211'
    },
    mechanic: 'Técnico Marcos Vinicius',
    bay: 'Elevador 4 (Motor & Câmbio)',
    status: 'entregue',
    diagnosticNotes: 'Troca preventiva de correia dentada, tensor e bomba d\'água. Sistema de arrefecimento purgado com aditivo orgânico novo.',
    servicesPerformed: ['Troca de Correia Dentada & Tensor', 'Limpeza do Sistema de Arrefecimento'],
    partsUsed: [
      { name: 'Kit Correia Dentada Continental Contitech', quantity: 1, unitPrice: 380.00 },
      { name: 'Bomba d\'água Indisa rolamento duplo', quantity: 1, unitPrice: 240.00 },
      { name: 'Aditivo Tirreno Long Life (2L)', quantity: 2, unitPrice: 44.90 }
    ],
    laborTotal: 520.00,
    partsTotal: 709.80,
    total: 1229.80,
    entryDate: '2026-09-21T09:00:00',
    expectedDate: '2026-09-22T17:00:00',
    checklist: [
      { item: 'Correia e tensor novos no torque de fábrica', checked: true, condition: 'ok' },
      { item: 'Bomba d\'água sem vazamentos sob teste 1.5 bar', checked: true, condition: 'ok' },
      { item: 'Temperatura estabilizada em 90°C', checked: true, condition: 'ok' }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-201',
    protocol: 'TRV-9102',
    customerName: 'Julio Cesar Sampaio',
    customerPhone: '(91) 98711-2299',
    customerEmail: 'julio.sampaio@email.com',
    vehicle: {
      brand: 'Honda',
      model: 'Civic EXL 2.0',
      year: '2019',
      plate: 'PAZ-8819',
      mileage: '68.000 km'
    },
    serviceIds: ['srv-oleo-completo', 'srv-suspensao-geometria'],
    preferredDate: '2026-09-24',
    preferredTime: '08:30',
    notes: 'Pedir para verificar leve barulho na roda dianteira esquerda ao esterçar para a direita.',
    status: 'confirmado',
    createdAt: '2026-09-23T11:20:00',
    estimatedTotal: 470
  },
  {
    id: 'apt-202',
    protocol: 'TRV-9103',
    customerName: 'Renata Albuquerque',
    customerPhone: '(91) 99344-8822',
    customerEmail: 'renata.albuquerque@email.com',
    vehicle: {
      brand: 'Hyundai',
      model: 'Creta Prestige 2.0',
      year: '2021',
      plate: 'RTI-5E43',
      mileage: '45.100 km'
    },
    serviceIds: ['srv-revisao-50'],
    preferredDate: '2026-09-24',
    preferredTime: '14:00',
    notes: 'Revisão antes de viajar para Salinópolis no final de semana.',
    status: 'pendente',
    createdAt: '2026-09-23T14:45:00',
    estimatedTotal: 350
  },
  {
    id: 'apt-203',
    protocol: 'TRV-9104',
    customerName: 'Marcelo Vieira Rocha',
    customerPhone: '(91) 98223-4477',
    customerEmail: 'marcelo.rocha@email.com',
    vehicle: {
      brand: 'Fiat',
      model: 'Toro Volcano Diesel 4x4',
      year: '2020',
      plate: 'QEX-1B90',
      mileage: '72.000 km'
    },
    serviceIds: ['srv-freios-abs', 'srv-oleo-completo'],
    preferredDate: '2026-09-25',
    preferredTime: '09:00',
    notes: 'Luz de pastilha acendeu no painel na última viagem.',
    status: 'pendente',
    createdAt: '2026-09-23T15:10:00',
    estimatedTotal: 520
  }
];

export const INITIAL_BUDGETS: BudgetEstimate[] = [
  {
    id: 'bdg-301',
    protocol: 'TRV-ORC-401',
    customerName: 'Diego de Souza Lima',
    customerPhone: '(91) 98155-9900',
    customerEmail: 'diego.souza@gmail.com',
    vehicle: {
      brand: 'Volkswagen',
      model: 'T-Cross 1.4 TSI Highline',
      year: '2021',
      plate: 'QEA-2C44',
      mileage: '49.000 km'
    },
    serviceCategory: 'Freios e Pastilhas',
    items: [
      { description: 'Jogo de pastilhas dianteiras cerâmica Bosch', category: 'peca', quantity: 1, unitPrice: 280, totalPrice: 280 },
      { description: 'Par de discos ventilados Fremax com pintura protetora', category: 'peca', quantity: 1, unitPrice: 420, totalPrice: 420 },
      { description: 'Fluido de freio DOT 4 Bosch HP (500ml)', category: 'fluido', quantity: 2, unitPrice: 36, totalPrice: 72 },
      { description: 'Mão de obra técnica especializada em freios ABS (2h)', category: 'mao_de_obra', quantity: 2, unitPrice: 140, totalPrice: 280 }
    ],
    laborHours: 2,
    laborRate: 140,
    subtotal: 1052,
    discountPercent: 8,
    total: 967.84,
    status: 'em_analise',
    createdAt: '2026-09-23T12:00:00',
    clientNotes: 'Sinto trepidação no volante quando freio a mais de 80km/h na rodovia.'
  },
  {
    id: 'bdg-302',
    protocol: 'TRV-ORC-402',
    customerName: 'Tatiana Fagundes',
    customerPhone: '(91) 99401-2233',
    customerEmail: 'tatiana.fagundes@outlook.com',
    vehicle: {
      brand: 'Ford',
      model: 'Ka SE Plus 1.5 3Cil',
      year: '2019',
      plate: 'QDA-6671',
      mileage: '65.000 km'
    },
    serviceCategory: 'Correia e Arrefecimento',
    items: [
      { description: 'Kit Correia Dentada Banhada a Óleo Original Ford', category: 'peca', quantity: 1, unitPrice: 650, totalPrice: 650 },
      { description: 'Óleo Motorcraft 5W20 Sintético homologado (4L)', category: 'fluido', quantity: 4, unitPrice: 65, totalPrice: 260 },
      { description: 'Filtro de óleo original Ford', category: 'peca', quantity: 1, unitPrice: 45, totalPrice: 45 },
      { description: 'Mão de obra especializada em motor 3 cilindros Dragon (4h)', category: 'mao_de_obra', quantity: 4, unitPrice: 140, totalPrice: 560 }
    ],
    laborHours: 4,
    laborRate: 140,
    subtotal: 1515,
    discountPercent: 8,
    total: 1393.80,
    status: 'aprovado',
    createdAt: '2026-09-22T16:30:00',
    clientNotes: 'Troca preventiva recomendada aos 60 mil km para evitar desgaste prematuro da correia no cárter.'
  }
];

// LocalStorage Helper with fallback
export function getStoredData<T>(key: string, initialValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return initialValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}
