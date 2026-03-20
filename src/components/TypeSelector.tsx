import React from 'react';

interface TypeSelectorProps {
  onSelect: (type: 'secondary' | 'university') => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎓 EduSwipe</h1>
        <p className="text-xl text-gray-600 mb-2">Podkarpacki Tinder Edukacyjny</p>
        <p className="text-gray-600">
          Odkryj idealne szkoły i kierunki studiów dopasowane do Twoich pasji
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Secondary School */}
        <button
          onClick={() => onSelect('secondary')}
          className="bg-white border-2 border-primary rounded-lg p-8 text-gray-900 hover:bg-primary/5 transition-colors"
        >
          <div className="text-5xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold mb-3 text-primary">Szkoła średnia</h2>
          <p className="text-gray-700 mb-6">Szukam szkoły średniej na Podkarpaciu</p>
          <div className="text-sm text-gray-600 border-l-2 border-primary pl-3">
            Dla uczniów szukających liceum lub technikum
          </div>
        </button>

        {/* University */}
        <button
          onClick={() => onSelect('university')}
          className="bg-white border-2 border-secondary rounded-lg p-8 text-gray-900 hover:bg-secondary/5 transition-colors"
        >
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-3 text-secondary">Studia/Uniwersytet</h2>
          <p className="text-gray-700 mb-6">Szukam kierunku na uniwersytecie</p>
          <div className="text-sm text-gray-600 border-l-2 border-secondary pl-3">
            Dla uczniów planujących studia
          </div>
        </button>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded border-l-4 border-primary">
        <h3 className="font-bold text-gray-900 mb-2">💡 Jak to działa?</h3>
        <ol className="text-gray-700 space-y-1 text-sm">
          <li>1. Wybierz typ szkoły, którą szukasz</li>
          <li>2. Zaznacz swoje zainteresowania</li>
          <li>3. Swipe'uj szkoły - kciuk w górę (pasuje!) lub w lewo (nie teraz)</li>
          <li>4. Odkryj ranking szkół dopasowanych do Ciebie! 🎉</li>
        </ol>
      </div>
    </div>
  );
};
