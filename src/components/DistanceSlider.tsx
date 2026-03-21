interface DistanceSliderProps {
  value: number;
  onChange: (radius: number) => void;
}

export const DistanceSlider = ({ value, onChange }: DistanceSliderProps) => {
  const distances = [5, 10, 20, 50, 100];

  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-4 border border-purple-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">📏 Szerokość zasięgu</h3>
        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{value} km</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max={distances.length - 1}
        value={distances.indexOf(value)}
        onChange={(e) => {
          const index = parseInt(e.target.value);
          onChange(distances[index]);
        }}
        className="w-full h-3 bg-purple-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
      />

      {/* Szybkie opcje */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {distances.map((dist) => (
          <button
            key={dist}
            onClick={() => onChange(dist)}
            className={`py-2 px-1 rounded-lg font-medium transition text-sm ${
              value === dist
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-purple-300 dark:border-gray-500 hover:border-purple-500'
            }`}
          >
            {dist}km
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        ℹ️ Pokazujemy tylko szkoły w promieniu {value} km od Ciebie
      </p>
    </div>
  );
};
