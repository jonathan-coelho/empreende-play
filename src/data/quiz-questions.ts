import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'capital',
    question: 'Quanto capital você tem disponível para investir?',
    description: 'Considere apenas o valor que você pode investir sem comprometer suas necessidades básicas.',
    type: 'single',
    category: 'capital',
    options: [
      { id: 'low', text: 'Até R$ 5.000', value: 1, description: 'Ideal para MEI e serviços básicos' },
      { id: 'medium-low', text: 'R$ 5.000 - R$ 25.000', value: 2, description: 'Pequenos comércios e serviços locais' },
      { id: 'medium', text: 'R$ 25.000 - R$ 50.000', value: 3, description: 'Franquias pequenas e negócios digitais' },
      { id: 'medium-high', text: 'R$ 50.000 - R$ 100.000', value: 4, description: 'Franquias médias e tecnologia' },
      { id: 'high', text: 'Mais de R$ 100.000', value: 5, description: 'Negócios escaláveis e franquias premium' }
    ]
  },
  {
    id: 'time',
    question: 'Quanto tempo semanal você pode dedicar ao negócio?',
    description: 'Seja realista sobre sua disponibilidade atual.',
    type: 'single',
    category: 'time',
    options: [
      { id: 'part-time', text: '10-20 horas/semana', value: 1, description: 'Negócio como renda extra' },
      { id: 'medium', text: '20-40 horas/semana', value: 2, description: 'Transição gradual' },
      { id: 'full-time', text: '40+ horas/semana', value: 3, description: 'Dedicação integral' }
    ]
  },
  {
    id: 'risk',
    question: 'Como você se sente em relação a riscos financeiros?',
    description: 'O Brasil tem 51,8% das pessoas com medo de fracassar no empreendedorismo.',
    type: 'scale',
    category: 'risk',
    min: 1,
    max: 5,
  },
  {
    id: 'skills',
    question: 'Quais habilidades você já possui?',
    description: 'Selecione todas que se aplicam ao seu perfil atual.',
    type: 'multiple',
    category: 'skills',
    options: [
      { id: 'sales', text: 'Vendas', value: 2, description: 'Capacidade de persuasão e negociação' },
      { id: 'marketing', text: 'Marketing Digital', value: 2, description: 'Redes sociais, publicidade online' },
      { id: 'tech', text: 'Tecnologia', value: 3, description: 'Programação, sistemas, automação' },
      { id: 'management', text: 'Gestão', value: 2, description: 'Liderança, organização, planejamento' },
      { id: 'finance', text: 'Financeiro', value: 2, description: 'Controle financeiro, contabilidade' },
      { id: 'customer', text: 'Atendimento', value: 1, description: 'Relacionamento com clientes' },
      { id: 'operations', text: 'Operações', value: 1, description: 'Logística, processos, qualidade' },
      { id: 'creative', text: 'Criatividade', value: 2, description: 'Design, conteúdo, inovação' }
    ]
  },
  {
    id: 'motivation',
    question: 'O que mais te motiva a empreender?',
    description: 'Baseado na pesquisa GEM 2024, identifique suas principais motivações.',
    type: 'multiple',
    category: 'motivation',
    options: [
      { id: 'opportunity', text: 'Oportunidade de mercado', value: 3, description: '18,8% dos empreendedores (principal gatilho)' },
      { id: 'autonomy', text: 'Realização profissional', value: 2, description: '16,5% buscam autonomia e satisfação' },
      { id: 'independence', text: 'Independência financeira', value: 2, description: '15,8% querem ter o próprio negócio' },
      { id: 'necessity', text: 'Necessidade de renda', value: 1, description: '66% consideram muito importante o retorno financeiro' },
      { id: 'impact', text: 'Impacto social', value: 2, description: 'Gerar valor para a sociedade' },
      { id: 'lifestyle', text: 'Flexibilidade de horários', value: 1, description: 'Equilibrar vida pessoal e profissional' }
    ]
  },
  {
    id: 'experience',
    question: 'Qual é sua experiência prévia?',
    description: 'Experiência no setor aumenta a taxa de sucesso em 51%.',
    type: 'single',
    category: 'experience',
    options: [
      { id: 'none', text: 'Nenhuma experiência em negócios', value: 0, description: 'Primeiro empreendimento' },
      { id: 'employee', text: 'Trabalhei no setor que pretendo empreender', value: 2, description: 'Conhecimento do mercado' },
      { id: 'side', text: 'Já tive negócios paralelos', value: 1, description: 'Experiência básica' },
      { id: 'failed', text: 'Já empreendi mas não deu certo', value: 1, description: 'Aprendizado com erros' },
      { id: 'successful', text: 'Já tive negócios bem-sucedidos', value: 3, description: 'Experiência comprovada' }
    ]
  },
  {
    id: 'sector',
    question: 'Em qual setor você tem mais interesse ou conhecimento?',
    description: 'No Brasil, 61% dos negócios são de Serviços e 25,6% de Comércio.',
    type: 'single',
    category: 'experience',
    options: [
      { id: 'services', text: 'Serviços', value: 1, description: 'Consultoria, educação, saúde, beleza' },
      { id: 'commerce', text: 'Comércio', value: 1, description: 'Varejo, e-commerce, alimentação' },
      { id: 'technology', text: 'Tecnologia', value: 3, description: 'Apps, software, automação' },
      { id: 'industry', text: 'Indústria', value: 2, description: 'Produção, manufatura' },
      { id: 'agriculture', text: 'Agronegócio', value: 2, description: 'Agricultura, pecuária' },
      { id: 'creative', text: 'Economia Criativa', value: 2, description: 'Arte, design, entretenimento' }
    ]
  }
];