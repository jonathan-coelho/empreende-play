import { EntrepreneurArchetype, BusinessRecommendation } from '@/types/quiz';

export const businessTypes: BusinessRecommendation[] = [
  // Negócios de baixo investimento
  {
    id: 'mei-services',
    name: 'MEI de Serviços Locais',
    description: 'Prestação de serviços como freelancer ou pequeno negócio local',
    initialInvestment: [500, 5000],
    timeCommitment: '20-40h/semana',
    riskLevel: 'low',
    skillsRequired: ['customer', 'sales'],
    potentialReturn: 'R$ 2.000 - R$ 8.000/mês',
    pros: ['Baixo investimento inicial', 'Flexibilidade de horários', 'Rápido retorno'],
    cons: ['Renda limitada', 'Dependência pessoal', 'Crescimento limitado'],
    examples: ['Consultoria', 'Aulas particulares', 'Serviços de beleza', 'Manutenção']
  },
  {
    id: 'digital-products',
    name: 'Produtos Digitais',
    description: 'Criação e venda de cursos online, e-books, aplicativos',
    initialInvestment: [1000, 10000],
    timeCommitment: '30-50h/semana',
    riskLevel: 'medium',
    skillsRequired: ['marketing', 'creative', 'tech'],
    potentialReturn: 'R$ 3.000 - R$ 50.000/mês',
    pros: ['Escalabilidade alta', 'Margem elevada', 'Trabalho remoto'],
    cons: ['Competição intensa', 'Necessita marketing constante', 'Curva de aprendizado'],
    examples: ['Cursos online', 'E-books', 'Apps mobile', 'Software SaaS']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Loja virtual com produtos próprios ou revenda',
    initialInvestment: [5000, 30000],
    timeCommitment: '40-60h/semana',
    riskLevel: 'medium',
    skillsRequired: ['marketing', 'operations', 'customer'],
    potentialReturn: 'R$ 5.000 - R$ 100.000/mês',
    pros: ['Mercado em crescimento', 'Alcance nacional', 'Automação possível'],
    cons: ['Logística complexa', 'Competição alta', 'Capital de giro necessário'],
    examples: ['Loja de roupas', 'Eletrônicos', 'Casa e decoração', 'Cosméticos']
  },
  // Franquias
  {
    id: 'micro-franchise',
    name: 'Microfranquia',
    description: 'Franquias de baixo investimento com modelo já validado',
    initialInvestment: [15000, 50000],
    timeCommitment: '40-60h/semana',
    riskLevel: 'low',
    skillsRequired: ['management', 'sales', 'operations'],
    potentialReturn: 'R$ 5.000 - R$ 25.000/mês',
    pros: ['Modelo validado', 'Suporte do franqueador', 'Marca reconhecida'],
    cons: ['Royalties mensais', 'Padronização obrigatória', 'Dependência da marca'],
    examples: ['Alimentação rápida', 'Serviços de limpeza', 'Educação infantil']
  },
  {
    id: 'medium-franchise',
    name: 'Franquia Média',
    description: 'Franquias consolidadas com maior potencial de retorno',
    initialInvestment: [50000, 200000],
    timeCommitment: '50-70h/semana',
    riskLevel: 'medium',
    skillsRequired: ['management', 'finance', 'operations'],
    potentialReturn: 'R$ 15.000 - R$ 80.000/mês',
    pros: ['Retorno mais alto', 'Suporte estruturado', 'Exclusividade territorial'],
    cons: ['Alto investimento', 'Contratos longos', 'Menos flexibilidade'],
    examples: ['Academias', 'Escolas de idiomas', 'Farmácias', 'Restaurantes']
  },
  // Negócios de tecnologia
  {
    id: 'tech-startup',
    name: 'Startup de Tecnologia',
    description: 'Negócio inovador baseado em tecnologia com potencial de escala',
    initialInvestment: [10000, 100000],
    timeCommitment: '60-80h/semana',
    riskLevel: 'high',
    skillsRequired: ['tech', 'marketing', 'management'],
    potentialReturn: 'R$ 0 - R$ 500.000+/mês',
    pros: ['Potencial de crescimento exponencial', 'Valorização alta', 'Impacto escalável'],
    cons: ['Risco muito alto', 'Necessita investimento contínuo', 'Mercado competitivo'],
    examples: ['Fintech', 'Edtech', 'Healthtech', 'Agtech']
  },
  // Serviços especializados
  {
    id: 'consulting',
    name: 'Consultoria Especializada',
    description: 'Prestação de serviços de alta complexidade baseados em expertise',
    initialInvestment: [5000, 25000],
    timeCommitment: '30-50h/semana',
    riskLevel: 'medium',
    skillsRequired: ['management', 'sales', 'finance'],
    potentialReturn: 'R$ 8.000 - R$ 50.000/mês',
    pros: ['Margem alta', 'Baseado em conhecimento', 'Flexibilidade'],
    cons: ['Dependência pessoal', 'Necessita credibilidade', 'Sazonalidade'],
    examples: ['Consultoria empresarial', 'Assessoria jurídica', 'Marketing digital']
  },
  // Negócios físicos
  {
    id: 'local-commerce',
    name: 'Comércio Local',
    description: 'Loja física atendendo comunidade local',
    initialInvestment: [20000, 80000],
    timeCommitment: '50-70h/semana',
    riskLevel: 'medium',
    skillsRequired: ['sales', 'operations', 'customer'],
    potentialReturn: 'R$ 8.000 - R$ 40.000/mês',
    pros: ['Relacionamento próximo', 'Fidelização fácil', 'Menos competição online'],
    cons: ['Área geográfica limitada', 'Custos fixos altos', 'Horário restrito'],
    examples: ['Padaria', 'Farmácia', 'Papelaria', 'Pet shop']
  }
];

export const entrepreneurArchetypes: EntrepreneurArchetype[] = [
  {
    id: 'pragmatic',
    name: 'Pragmático de Caixa',
    description: 'Busca renda e estabilidade financeira com riscos controlados',
    characteristics: [
      'Foco na necessidade de renda imediata',
      'Aversão a riscos altos',
      'Preferência por modelos validados',
      'Busca retorno rápido do investimento'
    ],
    idealCapitalRange: [5000, 25000],
    riskLevel: 'low',
    recommendedBusinessTypes: [
      businessTypes.find(b => b.id === 'mei-services')!,
      businessTypes.find(b => b.id === 'micro-franchise')!,
      businessTypes.find(b => b.id === 'local-commerce')!
    ]
  },
  {
    id: 'vocational',
    name: 'Vocacional',
    description: 'Busca realização pessoal e impacto, com foco no propósito',
    characteristics: [
      'Motivado por realização pessoal',
      'Valoriza impacto social',
      'Aceita riscos moderados',
      'Foco na qualidade sobre quantidade'
    ],
    idealCapitalRange: [10000, 50000],
    riskLevel: 'medium',
    recommendedBusinessTypes: [
      businessTypes.find(b => b.id === 'consulting')!,
      businessTypes.find(b => b.id === 'digital-products')!,
      businessTypes.find(b => b.id === 'medium-franchise')!
    ]
  },
  {
    id: 'opportunist',
    name: 'Oportunista Escalável',
    description: 'Foca em oportunidades de alto crescimento e retorno',
    characteristics: [
      'Busca oportunidades de mercado',
      'Alta tolerância a riscos',
      'Foco em escalabilidade',
      'Orientado por retorno financeiro elevado'
    ],
    idealCapitalRange: [25000, 200000],
    riskLevel: 'high',
    recommendedBusinessTypes: [
      businessTypes.find(b => b.id === 'tech-startup')!,
      businessTypes.find(b => b.id === 'medium-franchise')!,
      businessTypes.find(b => b.id === 'ecommerce')!
    ]
  },
  {
    id: 'digital-flexible',
    name: 'Digital por Flexibilidade',
    description: 'Prioriza flexibilidade e trabalho remoto com tecnologia',
    characteristics: [
      'Valoriza flexibilidade de horários',
      'Preferência por negócios digitais',
      'Risco moderado a alto',
      'Foco em automação e escalabilidade'
    ],
    idealCapitalRange: [2000, 50000],
    riskLevel: 'medium',
    recommendedBusinessTypes: [
      businessTypes.find(b => b.id === 'digital-products')!,
      businessTypes.find(b => b.id === 'ecommerce')!,
      businessTypes.find(b => b.id === 'consulting')!
    ]
  }
];