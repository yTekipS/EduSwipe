import React from 'react';
import { EducationType } from '../types';

interface HeaderProps {
  currentStep: 'type' | 'interests' | 'swipe' | 'results';
  educationType?: EducationType;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, educationType, onBack }) => {
  const getTitle = () => {
    switch (currentStep) {
      case 'type':
        return 'EduSwipe';
      case 'interests':
        return 'Zainteresowania';
      case 'swipe':
        return educationType === 'secondary' ? 'Szkoły średnie' : 'Uniwersytety';
      case 'results':
        return 'Twoje dopasowania';
      default:
        return 'EduSwipe';
    }
  };

  return (
    <header className="bg-white border-b-2 border-primary">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && currentStep !== 'type' && (
            <button
              onClick={onBack}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              ← Wróć
            </button>
          )}
          <img src="/logo-full.png" alt="EduSwipe" className="h-12 w-auto object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{getTitle()}</h1>
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <img src="/logo-min.png" alt="Logo" className="h-10 w-10 object-contain" />
        </div>
      </div>
    </header>
  );
};
