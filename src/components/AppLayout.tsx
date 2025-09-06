import { useState } from "react";
import { Hero } from "@/components/Hero";
import { QuizFlow } from "@/components/QuizFlow";
import { Results } from "@/components/Results";
import { QuizAnswer, UserProfile } from "@/types/quiz";
import { calculateUserProfile } from "@/utils/quiz-calculator";

type AppState = 'hero' | 'quiz' | 'results';

export const AppLayout = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGetStarted = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    const profile = calculateUserProfile(answers);
    setUserProfile(profile);
    setCurrentState('results');
  };

  const handleRestart = () => {
    setUserProfile(null);
    setCurrentState('hero');
  };

  const handleBackToHero = () => {
    setCurrentState('hero');
  };

  return (
    <div className="min-h-screen">
      {currentState === 'hero' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'quiz' && (
        <QuizFlow 
          onComplete={handleQuizComplete}
          onBack={handleBackToHero}
        />
      )}
      
      {currentState === 'results' && userProfile && (
        <Results 
          profile={userProfile}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};