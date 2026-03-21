import { useState } from 'react';
import { Coordinates } from '../types';
import { fetchCoordinatesByCity } from '../utils/geolocation';

interface LocationSelectorProps {
  onLocationChange: (location: Coordinates, city: string) => void;
}

export const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [cityName, setCityName] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!manualInput.trim()) {
      setError('Wpisz nazwę miasta');
      return;
    }

    setLoading(true);
    setError('');

    console.log('Szukanie miasta:', manualInput);
    const coords = await fetchCoordinatesByCity(manualInput);
    
    console.log('Otrzymane współrzędne:', coords);
    
    if (coords) {
      setCityName(manualInput);
      onLocationChange(coords, manualInput);
      setManualInput('');
    } else {
      setError('Nie znaleziono miasta. Spróbuj inną lokalizację.');
    }

    setLoading(false);
  };

  return (
    <div className="px-2 py-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-4 border border-blue-200 dark:border-gray-600">
      {cityName ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white"><span className="text-lg">📍</span> Twoja Lokalizacja</h3>
            <button
              onClick={() => setCityName('')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Zmień
            </button>
          </div>
          <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{cityName}</div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white"><span className="text-lg">📍</span> Wpisz Swoje Miasto</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="np. Rzeszów"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-3 sm:px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition whitespace-nowrap"
            >
              Szukaj
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
