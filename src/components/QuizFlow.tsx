import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { quizQuestions } from "@/data/quiz-questions";
import { QuizQuestion, QuizAnswer, QuizState } from "@/types/quiz";

interface QuizFlowProps {
  onComplete: (answers: QuizAnswer[]) => void;
  onBack: () => void;
}

export const QuizFlow = ({ onComplete, onBack }: QuizFlowProps) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    isComplete: false
  });

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;
  const isFirstQuestion = quizState.currentQuestionIndex === 0;

  const handleAnswer = (value: number | string | string[], points: number) => {
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      value,
      points
    };

    const newAnswers = [
      ...quizState.answers.filter(a => a.questionId !== currentQuestion.id),
      answer
    ];

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }));

    // Auto-advance for single choice questions
    if (currentQuestion.type === 'single' || currentQuestion.type === 'scale') {
      setTimeout(() => {
        if (isLastQuestion) {
          handleComplete(newAnswers);
        } else {
          handleNext();
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < quizQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const handleComplete = (answers: QuizAnswer[]) => {
    setQuizState(prev => ({ ...prev, isComplete: true }));
    onComplete(answers);
  };

  const getCurrentAnswer = () => {
    return quizState.answers.find(a => a.questionId === currentQuestion.id);
  };

  const canProceed = () => {
    const currentAnswer = getCurrentAnswer();
    return currentAnswer !== undefined;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single':
        return <SingleChoiceQuestion 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          currentAnswer={getCurrentAnswer()}
        />;
      case 'multiple':
        return <MultipleChoiceQuestion 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          currentAnswer={getCurrentAnswer()}
        />;
      case 'scale':
        return <ScaleQuestion 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          currentAnswer={getCurrentAnswer()}
        />;
      case 'slider':
        return <SliderQuestion 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          currentAnswer={getCurrentAnswer()}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl p-8 glass-card">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={isFirstQuestion ? onBack : handlePrevious}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {isFirstQuestion ? 'Voltar ao Início' : 'Anterior'}
            </Button>
            <span className="text-sm text-muted-foreground">
              {quizState.currentQuestionIndex + 1} de {quizQuestions.length}
            </span>
          </div>
          
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-muted-foreground animate-fade-in-up">
                {currentQuestion.description}
              </p>
            )}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8 animate-scale-in">
          {renderQuestion()}
        </div>

        {/* Footer */}
        {currentQuestion.type === 'multiple' && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {getCurrentAnswer() && Array.isArray(getCurrentAnswer()?.value) 
                ? `${(getCurrentAnswer()?.value as string[]).length} selecionadas`
                : 'Selecione uma ou mais opções'
              }
            </div>
            <Button 
              onClick={isLastQuestion ? () => handleComplete(quizState.answers) : handleNext}
              disabled={!canProceed()}
              variant="hero"
              className="group"
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

// Component for single choice questions
const SingleChoiceQuestion = ({ 
  question, 
  onAnswer, 
  currentAnswer 
}: { 
  question: QuizQuestion; 
  onAnswer: (value: number | string | string[], points: number) => void;
  currentAnswer?: QuizAnswer;
}) => (
  <div className="grid gap-4">
    {question.options?.map((option, index) => (
      <Card 
        key={option.id}
        className={`p-6 cursor-pointer transition-all duration-300 hover-lift border-2 ${
          currentAnswer?.value === option.value 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : 'border-border hover:border-primary/50'
        }`}
        onClick={() => onAnswer(option.value, option.value)}
      >
        <div className="flex items-start gap-4">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            currentAnswer?.value === option.value 
              ? 'border-primary bg-primary' 
              : 'border-muted-foreground'
          }`}>
            {currentAnswer?.value === option.value && (
              <CheckCircle className="w-4 h-4 text-primary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{option.text}</h3>
            {option.description && (
              <p className="text-sm text-muted-foreground">{option.description}</p>
            )}
          </div>
        </div>
      </Card>
    ))}
  </div>
);

// Component for multiple choice questions
const MultipleChoiceQuestion = ({ 
  question, 
  onAnswer, 
  currentAnswer 
}: { 
  question: QuizQuestion; 
  onAnswer: (value: number | string | string[], points: number) => void;
  currentAnswer?: QuizAnswer;
}) => {
  const selectedValues = (currentAnswer?.value as string[]) || [];
  
  const handleSelection = (optionId: string, points: number) => {
    let newValues: string[];
    let newPoints: number;
    
    if (selectedValues.includes(optionId)) {
      newValues = selectedValues.filter(id => id !== optionId);
      newPoints = (currentAnswer?.points || 0) - points;
    } else {
      newValues = [...selectedValues, optionId];
      newPoints = (currentAnswer?.points || 0) + points;
    }
    
    onAnswer(newValues, newPoints);
  };

  return (
    <div className="grid gap-4">
      {question.options?.map((option) => (
        <Card 
          key={option.id}
          className={`p-6 cursor-pointer transition-all duration-300 hover-lift border-2 ${
            selectedValues.includes(option.id)
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => handleSelection(option.id, option.value)}
        >
          <div className="flex items-start gap-4">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              selectedValues.includes(option.id)
                ? 'border-primary bg-primary' 
                : 'border-muted-foreground'
            }`}>
              {selectedValues.includes(option.id) && (
                <CheckCircle className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{option.text}</h3>
              {option.description && (
                <p className="text-sm text-muted-foreground">{option.description}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Component for scale questions
const ScaleQuestion = ({ 
  question, 
  onAnswer, 
  currentAnswer 
}: { 
  question: QuizQuestion; 
  onAnswer: (value: number | string | string[], points: number) => void;
  currentAnswer?: QuizAnswer;
}) => {
  const scaleValues = Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }, (_, i) => i + (question.min || 1));
  
  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
        <span>Muito baixo</span>
        <span>Muito alto</span>
      </div>
      <div className="flex justify-center gap-4">
        {scaleValues.map((value) => (
          <Button
            key={value}
            variant={currentAnswer?.value === value ? "hero" : "outline"}
            size="lg"
            className={`w-16 h-16 rounded-full text-lg font-bold transition-all duration-300 ${
              currentAnswer?.value === value ? 'scale-110 shadow-glow' : 'hover:scale-105'
            }`}
            onClick={() => onAnswer(value, value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Component for slider questions
const SliderQuestion = ({ 
  question, 
  onAnswer, 
  currentAnswer 
}: { 
  question: QuizQuestion; 
  onAnswer: (value: number | string | string[], points: number) => void;
  currentAnswer?: QuizAnswer;
}) => {
  const [sliderValue, setSliderValue] = useState((currentAnswer?.value as number) || question.min || 0);
  
  useEffect(() => {
    onAnswer(sliderValue, sliderValue);
  }, [sliderValue]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-3xl font-bold text-primary">
          R$ {sliderValue.toLocaleString('pt-BR')}
        </span>
      </div>
      <input
        type="range"
        min={question.min || 0}
        max={question.max || 100000}
        step={question.step || 1000}
        value={sliderValue}
        onChange={(e) => setSliderValue(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>R$ {(question.min || 0).toLocaleString('pt-BR')}</span>
        <span>R$ {(question.max || 100000).toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
};