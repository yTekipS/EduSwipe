import React from 'react';
import { EducationType } from '../types';

interface HeaderProps {
  currentStep: 'type' | 'interests' | 'swipe' | 'results' | 'analytics';
  educationType?: EducationType;
  onBack?: () => void;
  onOpenAnalytics?: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  educationType,
  onBack,
  onOpenAnalytics,
  isDarkMode,
  onToggleTheme,
}) => {
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
    <header className="bg-gradient-to-r from-primary to-blue-900 text-white shadow-lg dark:shadow-2xl transition-shadow overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
        <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {onBack && currentStep !== 'type' && (
              <button
                onClick={onBack}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors text-xs sm:text-sm"
              >
                ← Wróć
              </button>
            )}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold truncate">{getTitle()}</h1>
              <p className="text-[11px] sm:text-xs text-blue-100 truncate">Podkarpacki Tinder Edukacyjny</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onToggleTheme}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-white/15 hover:bg-white/25 rounded-lg transition-colors"
              aria-label="Przełącz motyw"
              title="Przełącz motyw"
            >
              {isDarkMode ? '☀️ Jasny' : '🌙 Ciemny'}
            </button>

            {currentStep !== 'analytics' && onOpenAnalytics && (
              <button
                onClick={onOpenAnalytics}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-primary bg-white hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              >
                <span>📊</span>
                <span className="hidden sm:inline">Panel administracyjny</span>
                <span className="sm:hidden">Panel</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white/10 rounded px-3 py-2 text-[11px] sm:text-xs">
          <p className="text-blue-100">
            📍 <span className="font-semibold">Rzeszów, Podkarpackie</span>
            <span className="hidden sm:inline"> | <span className="ml-1">Projekt wspierający edukacyjne wybory młodzieży</span></span>
          </p>
        </div>
      </div>
    </header>
  );
};
