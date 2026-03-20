import React from 'react';
import { EducationType } from '../types';

interface HeaderProps {
  currentStep: 'type' | 'interests' | 'swipe' | 'results' | 'analytics';
  educationType?: EducationType;
  onBack?: () => void;
  onOpenAnalytics?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, educationType, onBack, onOpenAnalytics }) => {
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
      case 'analytics':
        return 'Panel administracyjny';
      default:
        return 'EduSwipe';
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b-2 border-primary dark:border-blue-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && currentStep !== 'type' && (
            <button
              onClick={onBack}
              className="p-2 text-primary dark:text-blue-400 hover:bg-primary/10 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              ← Wróć
            </button>
          )}
          <h1 className="text-3xl font-bold text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-400">{getTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          {currentStep !== 'analytics' && onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>📊</span> Panel administracyjny
            </button>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
          </div>
        </div>
      </div>
    </header>
  );
};
