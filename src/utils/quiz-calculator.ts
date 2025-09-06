import { QuizAnswer, UserProfile, EntrepreneurArchetype } from '@/types/quiz';
import { entrepreneurArchetypes } from '@/data/business-types';

export const calculateUserProfile = (answers: QuizAnswer[]): UserProfile => {
  const answerMap = answers.reduce((acc, answer) => {
    acc[answer.questionId] = answer;
    return acc;
  }, {} as Record<string, QuizAnswer>);

  // Extract values from answers
  const capital = getCapitalScore(answerMap.capital?.value as number || 1);
  const timeAvailable = answerMap.time?.value as number || 1;
  const riskTolerance = answerMap.risk?.value as number || 3;
  const skills = answerMap.skills?.value as string[] || [];
  const motivation = answerMap.motivation?.value as string[] || [];
  const experience = answerMap.experience?.value as number || 0;

  // Calculate total points weighted by importance
  const totalPoints = 
    (capital * 0.3) + // Capital weight: 30%
    (timeAvailable * 0.2) + // Time weight: 20%
    (riskTolerance * 0.2) + // Risk weight: 20%
    (skills.length * 0.15) + // Skills weight: 15%
    (motivation.length * 0.1) + // Motivation weight: 10%
    (experience * 0.05); // Experience weight: 5%

  // Determine archetype
  const archetype = determineArchetype({
    capital,
    timeAvailable,
    riskTolerance,
    skillsCount: skills.length,
    motivationTypes: motivation,
    experience
  });

  return {
    capital: getCapitalRange(capital),
    timeAvailable,
    riskTolerance,
    skills,
    motivation,
    experience: getExperienceLevel(experience),
    totalPoints,
    archetype
  };
};

const getCapitalScore = (value: number): number => {
  // Convert scale 1-5 to actual capital ranges
  switch (value) {
    case 1: return 2500; // Up to R$ 5,000 -> R$ 2,500 average
    case 2: return 15000; // R$ 5,000 - R$ 25,000 -> R$ 15,000 average
    case 3: return 37500; // R$ 25,000 - R$ 50,000 -> R$ 37,500 average
    case 4: return 75000; // R$ 50,000 - R$ 100,000 -> R$ 75,000 average
    case 5: return 150000; // More than R$ 100,000 -> R$ 150,000 average
    default: return 15000;
  }
};

const getCapitalRange = (capital: number): number => {
  if (capital <= 5000) return 1;
  if (capital <= 25000) return 2;
  if (capital <= 50000) return 3;
  if (capital <= 100000) return 4;
  return 5;
};

const getExperienceLevel = (value: number): string => {
  switch (value) {
    case 0: return 'Nenhuma experiência';
    case 1: return 'Experiência básica';
    case 2: return 'Experiência no setor';
    case 3: return 'Experiência comprovada';
    default: return 'Nenhuma experiência';
  }
};

interface ArchetypeFactors {
  capital: number;
  timeAvailable: number;
  riskTolerance: number;
  skillsCount: number;
  motivationTypes: string[];
  experience: number;
}

const determineArchetype = (factors: ArchetypeFactors): EntrepreneurArchetype => {
  const {
    capital,
    timeAvailable,
    riskTolerance,
    skillsCount,
    motivationTypes,
    experience
  } = factors;

  // Score for each archetype
  const scores = {
    pragmatic: 0,
    vocational: 0,
    opportunist: 0,
    'digital-flexible': 0
  };

  // Pragmatic scoring (low risk, necessity-driven)
  if (capital <= 25000) scores.pragmatic += 3;
  if (riskTolerance <= 2) scores.pragmatic += 3;
  if (motivationTypes.includes('necessity')) scores.pragmatic += 2;
  if (experience <= 1) scores.pragmatic += 1;
  if (timeAvailable <= 2) scores.pragmatic += 1;

  // Vocational scoring (purpose-driven, moderate risk)
  if (motivationTypes.includes('autonomy')) scores.vocational += 3;
  if (motivationTypes.includes('impact')) scores.vocational += 3;
  if (riskTolerance >= 2 && riskTolerance <= 4) scores.vocational += 2;
  if (capital >= 10000 && capital <= 50000) scores.vocational += 2;
  if (skillsCount >= 3) scores.vocational += 1;

  // Opportunist scoring (high growth, high risk)
  if (motivationTypes.includes('opportunity')) scores.opportunist += 3;
  if (riskTolerance >= 4) scores.opportunist += 3;
  if (capital >= 50000) scores.opportunist += 2;
  if (timeAvailable >= 3) scores.opportunist += 2;
  if (experience >= 2) scores.opportunist += 1;

  // Digital Flexible scoring (tech-oriented, flexible)
  if (motivationTypes.includes('lifestyle')) scores['digital-flexible'] += 3;
  if (skillsCount >= 4) scores['digital-flexible'] += 2;
  if (capital <= 50000) scores['digital-flexible'] += 2;
  if (riskTolerance >= 3) scores['digital-flexible'] += 1;
  if (timeAvailable <= 2) scores['digital-flexible'] += 1;

  // Find the archetype with highest score
  const bestArchetype = Object.entries(scores).reduce((best, [key, score]) => 
    score > best.score ? { archetype: key, score } : best
  , { archetype: 'pragmatic', score: 0 });

  return entrepreneurArchetypes.find(a => a.id === bestArchetype.archetype) || entrepreneurArchetypes[0];
};

export const getPersonalizedRecommendations = (profile: UserProfile) => {
  // Get base recommendations from archetype
  let recommendations = [...profile.archetype.recommendedBusinessTypes];

  // Filter by capital availability
  recommendations = recommendations.filter(business => 
    business.initialInvestment[0] <= profile.capital * 1000 // Convert to actual currency
  );

  // Sort by suitability score
  recommendations = recommendations.sort((a, b) => {
    const scoreA = calculateBusinessSuitability(a, profile);
    const scoreB = calculateBusinessSuitability(b, profile);
    return scoreB - scoreA;
  });

  return recommendations.slice(0, 3); // Return top 3
};

const calculateBusinessSuitability = (business: any, profile: UserProfile): number => {
  let score = 0;

  // Capital compatibility
  if (business.initialInvestment[0] <= profile.capital * 1000) {
    score += 3;
  }

  // Risk compatibility
  const riskMatch = {
    low: profile.riskTolerance <= 2 ? 3 : 0,
    medium: profile.riskTolerance >= 2 && profile.riskTolerance <= 4 ? 3 : 1,
    high: profile.riskTolerance >= 4 ? 3 : 0
  };
  score += riskMatch[business.riskLevel as keyof typeof riskMatch] || 0;

  // Skills compatibility
  const matchingSkills = business.skillsRequired.filter((skill: string) => 
    profile.skills.includes(skill)
  ).length;
  score += matchingSkills;

  return score;
};