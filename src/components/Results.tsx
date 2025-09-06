import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign, 
  Users, 
  Lightbulb, 
  Share2, 
  Download, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";
import { UserProfile, BusinessRecommendation } from "@/types/quiz";
import { getPersonalizedRecommendations } from "@/utils/quiz-calculator";

interface ResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const Results = ({ profile, onRestart }: ResultsProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'recommendations' | 'action-plan'>('profile');
  const recommendations = getPersonalizedRecommendations(profile);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: { text: 'Baixo', color: 'bg-success' },
      medium: { text: 'Médio', color: 'bg-warning' },
      high: { text: 'Alto', color: 'bg-destructive' }
    };
    return labels[level as keyof typeof labels] || labels.medium;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success font-medium text-sm mb-4">
            <Trophy className="w-4 h-4" />
            Análise Completa
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Seu Perfil Empreendedor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Baseado nas suas respostas, identificamos o melhor caminho para o seu empreendimento
          </p>
        </div>

        {/* Archetype Card */}
        <Card className="mb-8 p-8 glass-card animate-scale-in">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile.archetype.name}</h2>
                  <Badge variant="secondary" className="mt-1">
                    Seu arquétipo empreendedor
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{profile.archetype.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {profile.archetype.characteristics.slice(0, 4).map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">{char}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round(profile.totalPoints * 20)}/100
                </div>
                <div className="text-sm text-muted-foreground">Score de Compatibilidade</div>
                <Progress value={profile.totalPoints * 20} className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div>
                  <div className="font-semibold text-primary">
                    {formatCurrency(profile.capital * 1000)}
                  </div>
                  <div className="text-muted-foreground">Capital</div>
                </div>
                <div>
                  <div className="font-semibold text-accent">
                    {profile.riskTolerance}/5
                  </div>
                  <div className="text-muted-foreground">Risco</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-muted rounded-lg">
            {[
              { id: 'profile', label: 'Seu Perfil', icon: Users },
              { id: 'recommendations', label: 'Recomendações', icon: Lightbulb },
              { id: 'action-plan', label: 'Plano de Ação', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => setActiveTab(id as any)}
                className="relative"
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'profile' && <ProfileTab profile={profile} />}
          {activeTab === 'recommendations' && <RecommendationsTab recommendations={recommendations} />}
          {activeTab === 'action-plan' && <ActionPlanTab profile={profile} recommendations={recommendations} />}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="group">
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar Resultado
            </Button>
            <Button size="lg" variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Baixar Relatório PDF
            </Button>
            <Button size="lg" variant="ghost" onClick={onRestart}>
              <RotateCcw className="w-5 h-5 mr-2" />
              Refazer Teste
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Que tal começar um curso de empreendedorismo para turbinar seus conhecimentos?
          </p>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ profile }: { profile: UserProfile }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        Recursos Disponíveis
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>Capital para Investimento</span>
            <span className="font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0
              }).format(profile.capital * 1000)}
            </span>
          </div>
          <Progress value={profile.capital * 20} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>Tempo Disponível</span>
            <span className="font-bold text-accent">
              {profile.timeAvailable === 1 ? '10-20h' : profile.timeAvailable === 2 ? '20-40h' : '40h+'}/semana
            </span>
          </div>
          <Progress value={profile.timeAvailable * 33.33} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>Tolerância ao Risco</span>
            <span className="font-bold text-warning">
              {profile.riskTolerance}/5
            </span>
          </div>
          <Progress value={profile.riskTolerance * 20} />
        </div>
      </div>
    </Card>

    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-accent" />
        Habilidades e Motivações
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Habilidades Identificadas</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.length > 0 ? profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            )) : (
              <span className="text-sm text-muted-foreground">Nenhuma habilidade específica selecionada</span>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Principais Motivações</h4>
          <div className="flex flex-wrap gap-2">
            {profile.motivation.length > 0 ? profile.motivation.map((motivation) => (
              <Badge key={motivation} variant="outline">{motivation}</Badge>
            )) : (
              <span className="text-sm text-muted-foreground">Nenhuma motivação específica selecionada</span>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Experiência</h4>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{profile.experience}</Badge>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const RecommendationsTab = ({ recommendations }: { recommendations: BusinessRecommendation[] }) => (
  <div className="space-y-6">
    {recommendations.map((business, index) => (
      <Card key={business.id} className="p-6 glass-card hover-lift">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-gradient-primary' : index === 1 ? 'bg-gradient-accent' : 'bg-secondary'
              }`}>
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold">{business.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={business.riskLevel === 'low' ? 'secondary' : business.riskLevel === 'high' ? 'destructive' : 'default'}>
                    Risco {business.riskLevel === 'low' ? 'Baixo' : business.riskLevel === 'high' ? 'Alto' : 'Médio'}
                  </Badge>
                  <Badge variant="outline">{business.timeCommitment}</Badge>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{business.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-success mb-2">Vantagens</h4>
                <ul className="space-y-1">
                  {business.pros.slice(0, 3).map((pro, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-warning mb-2">Desafios</h4>
                <ul className="space-y-1">
                  {business.cons.slice(0, 3).map((con, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-warning" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Investimento Inicial</div>
              <div className="font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(business.initialInvestment[0])} - {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(business.initialInvestment[1])}
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Potencial de Retorno</div>
              <div className="font-bold text-accent">{business.potentialReturn}</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Exemplos</div>
              <div className="flex flex-wrap gap-1">
                {business.examples.slice(0, 3).map((example, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{example}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const ActionPlanTab = ({ profile, recommendations }: { 
  profile: UserProfile; 
  recommendations: BusinessRecommendation[] 
}) => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        Próximos Passos
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
          <div>
            <h4 className="font-medium">Validação de Mercado</h4>
            <p className="text-sm text-muted-foreground">Pesquise o mercado do negócio escolhido em sua região</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
          <div>
            <h4 className="font-medium">Plano de Negócios</h4>
            <p className="text-sm text-muted-foreground">Elabore um plano detalhado com projeções financeiras</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
          <div>
            <h4 className="font-medium">Capacitação</h4>
            <p className="text-sm text-muted-foreground">Desenvolva as habilidades necessárias através de cursos</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
          <div>
            <h4 className="font-medium">Financiamento</h4>
            <p className="text-sm text-muted-foreground">Organize o capital e explore linhas de crédito</p>
          </div>
        </div>
      </div>
    </Card>

    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-accent" />
        Recursos Recomendados
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Cursos e Capacitação</h4>
          <ul className="space-y-2 text-sm">
            <li>• Curso de Empreendedorismo (Sebrae)</li>
            <li>• Gestão Financeira para PMEs</li>
            <li>• Marketing Digital</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Ferramentas Úteis</h4>
          <ul className="space-y-2 text-sm">
            <li>• Canvas de Modelo de Negócios</li>
            <li>• Planilhas de Controle Financeiro</li>
            <li>• Pesquisa de Mercado</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Mentoria e Suporte</h4>
          <ul className="space-y-2 text-sm">
            <li>• Programa de Mentoria Sebrae</li>
            <li>• Incubadoras Locais</li>
            <li>• Grupos de Networking</li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
);