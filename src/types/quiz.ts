export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  type: 'single' | 'multiple' | 'scale' | 'slider';
  options?: QuizOption[];
  min?: number;
  max?: number;
  step?: number;
  category: 'capital' | 'time' | 'skills' | 'risk' | 'motivation' | 'experience';
}

export interface QuizOption {
  id: string;
  text: string;
  value: number;
  description?: string;
}

export interface QuizAnswer {
  questionId: string;
  value: number | string | string[];
  points: number;
}

export interface UserProfile {
  capital: number;
  timeAvailable: number;
  riskTolerance: number;
  skills: string[];
  motivation: string[];
  experience: string;
  totalPoints: number;
  archetype: EntrepreneurArchetype;
}

export interface EntrepreneurArchetype {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  idealCapitalRange: [number, number];
  riskLevel: 'low' | 'medium' | 'high';
  recommendedBusinessTypes: BusinessRecommendation[];
}

export interface BusinessRecommendation {
  id: string;
  name: string;
  description: string;
  initialInvestment: [number, number];
  timeCommitment: string;
  riskLevel: 'low' | 'medium' | 'high';
  skillsRequired: string[];
  potentialReturn: string;
  pros: string[];
  cons: string[];
  examples: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  profile?: UserProfile;
}