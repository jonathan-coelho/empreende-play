import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-entrepreneurship.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Empreendedorismo e tomada de decisão" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6 animate-fade-in">
              <Target className="w-4 h-4" />
              Baseado em pesquisa GEM 2024
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up bg-gradient-hero bg-clip-text text-transparent">
              Descubra o Negócio
              <br />
              <span className="text-foreground">Ideal para Você</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl animate-fade-in-up [animation-delay:200ms]">
              Uma ferramenta inteligente que analisa seu perfil, recursos e objetivos para recomendar 
              os melhores tipos de negócio baseados em dados reais do empreendedorismo brasileiro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up [animation-delay:400ms]">
              <Button 
                size="lg" 
                variant="hero" 
                onClick={onGetStarted}
                className="group"
              >
                Começar Avaliação
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="glass">
                Ver Como Funciona
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground animate-fade-in-up [animation-delay:600ms]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>39,5% dos brasileiros querem empreender</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Medo do fracasso em queda: 51,8%</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up [animation-delay:300ms]">
            <div className="glass-card p-6 hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Oportunidade de Mercado</h3>
              <p className="text-2xl font-bold text-primary mb-1">18,8%</p>
              <p className="text-sm text-muted-foreground">Principal motivador para empreender (GEM 2024)</p>
            </div>
            
            <div className="glass-card p-6 hover-lift">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Taxa de Sucesso</h3>
              <p className="text-2xl font-bold text-accent mb-1">+51%</p>
              <p className="text-sm text-muted-foreground">Aumento com experiência no setor</p>
            </div>
            
            <div className="glass-card p-6 hover-lift sm:col-span-2">
              <h3 className="font-semibold mb-3">Principais Barreiras Identificadas</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Capital inicial</span>
                  <span className="text-sm font-medium">57%</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill w-[57%]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medo do fracasso</span>
                  <span className="text-sm font-medium">51,8%</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill w-[51.8%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/5 rounded-full animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-success/5 rounded-full animate-float [animation-delay:2s]" />
    </section>
  );
};