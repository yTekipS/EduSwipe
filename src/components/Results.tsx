import React from 'react';
import { MatchResult } from '../types';

interface ResultsProps {
  matches: MatchResult[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ matches, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Twoje dopasowania!</h2>
        <p className="text-gray-600">
          Znaleźliśmy {matches.length} szkół, które idealnie pasują do Twoich zainteresowań
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {matches.map((result) => (
          <div
            key={result.school.id}
            className="bg-white rounded-lg border border-gray-200 p-6 border-l-4 border-l-primary"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">{result.school.name}</h3>
              <div className="bg-primary text-white px-3 py-1 rounded text-sm font-bold">
              Match: {Math.round(result.matchScore * 100)}%
              </div>
            </div>

            <p className="text-gray-600 mb-4">{result.school.description}</p>

            {result.school.datingBio && (
              <div className="mb-4 p-3 rounded bg-primary/5 border border-primary/20">
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                  Dating Bio
                </p>
                <p className="text-sm text-gray-700">{result.school.datingBio}</p>
              </div>
            )}

            {(result.school.greenFlags?.length || result.school.redFlags?.length) && (
              <div className="mb-4 grid gap-2">
                {result.school.greenFlags && result.school.greenFlags.length > 0 && (
                  <p className="text-sm text-green-700">🟢 {result.school.greenFlags.join(' • ')}</p>
                )}
                {result.school.redFlags && result.school.redFlags.length > 0 && (
                  <p className="text-sm text-red-700">🚩 {result.school.redFlags.join(' • ')}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Specjalizacje:</p>
              <div className="flex flex-wrap gap-2">
                {result.school.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span>📍</span>
              <span>{result.school.location}</span>
            </div>

            {(result.school.firstDateLink || result.school.website) && (
              <a
                href={result.school.firstDateLink || result.school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                {result.school.firstDateLabel || 'Zaproś na pierwszą randkę'} →
              </a>
            )}
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Jednak nie znaleźliśmy żadnych dopasowań. Może poszukaj szkół innego typu?
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-primary text-white rounded font-semibold hover:bg-primary/90 transition-colors"
        >
          ← Powrót do wyboru
        </button>
      </div>
    </div>
  );
};
