import React from 'react';
import { Interest } from '../types';

interface InterestSelectorProps {
  interests: Interest[];
  selectedInterests: string[];
  onToggle: (interestId: string) => void;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({
  interests,
  selectedInterests,
  onToggle,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors break-words">Wybierz swoje zainteresowania</h2>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 transition-colors">
        Kliknij na przynajmniej 3 zainteresowania, aby znaleźć idealne szkoły dla Ciebie
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => onToggle(interest.id)}
            className={`p-2 sm:p-4 rounded border-2 transition-all duration-200 text-center ${
              selectedInterests.includes(interest.id)
                ? 'border-primary bg-primary dark:border-blue-400 dark:bg-blue-600 text-white'
                : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:border-primary dark:hover:border-blue-400'
            }`}
          >
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{interest.emoji}</div>
            <div className="text-xs sm:text-sm font-medium break-words">{interest.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
