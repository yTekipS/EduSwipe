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
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Wybierz swoje zainteresowania</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors">
        Kliknij na przynajmniej 3 zainteresowania, aby znaleźć idealne szkoły dla Ciebie
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => onToggle(interest.id)}
            className={`p-4 rounded border-2 transition-all duration-200 text-center ${
              selectedInterests.includes(interest.id)
                ? 'border-primary bg-primary dark:border-blue-400 dark:bg-blue-600 text-white'
                : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:border-primary dark:hover:border-blue-400'
            }`}
          >
            <div className="text-3xl mb-2">{interest.emoji}</div>
            <div className="text-sm font-medium">{interest.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
