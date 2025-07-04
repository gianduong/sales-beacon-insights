
import { useState, useEffect } from 'react';

interface OnboardingState {
  isCompleted: boolean;
  completedSteps: string[];
  lastCompletedStep: string | null;
}

export const useOnboarding = () => {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    isCompleted: false,
    completedSteps: [],
    lastCompletedStep: null
  });

  useEffect(() => {
    // Load onboarding state from localStorage
    const savedState = localStorage.getItem('analytics-onboarding');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setOnboardingState(parsedState);
      } catch (error) {
        console.error('Error loading onboarding state:', error);
      }
    }
  }, []);

  const completeOnboarding = () => {
    const newState: OnboardingState = {
      isCompleted: true,
      completedSteps: ['connect-store', 'setup-tracking', 'configure-goals', 'verify-data'],
      lastCompletedStep: 'verify-data'
    };
    
    setOnboardingState(newState);
    localStorage.setItem('analytics-onboarding', JSON.stringify(newState));
  };

  const resetOnboarding = () => {
    const newState: OnboardingState = {
      isCompleted: false,
      completedSteps: [],
      lastCompletedStep: null
    };
    
    setOnboardingState(newState);
    localStorage.removeItem('analytics-onboarding');
  };

  const completeStep = (stepId: string) => {
    const newState: OnboardingState = {
      ...onboardingState,
      completedSteps: [...onboardingState.completedSteps, stepId],
      lastCompletedStep: stepId
    };
    
    setOnboardingState(newState);
    localStorage.setItem('analytics-onboarding', JSON.stringify(newState));
  };

  return {
    isOnboardingCompleted: onboardingState.isCompleted,
    completedSteps: onboardingState.completedSteps,
    lastCompletedStep: onboardingState.lastCompletedStep,
    completeOnboarding,
    resetOnboarding,
    completeStep
  };
};
