import { Coordinates } from '../types';

/**
 * Oblicza odległość między dwoma punktami za pomocą wzoru Haversine'a.
 * Zwraca odległość w kilometrach.
 */
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371; // Promień Ziemi w kilometrach
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Zażądaj dostępu do geolokalizacji użytkownika.
 * Zwraca Promise z współrzędnymi lub null jeśli użytkownik odmówi.
 */
export const requestGeolocation = (): Promise<Coordinates | null> => {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation nie jest dostępna w tej przeglądarce');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Błąd przy pobieraniu geolokalizacji:', error.message);
        resolve(null);
      }
    );
  });
};

/**
 * Pobierz przybliżoną lokalizację z kodu pocztowego lub miasta.
 * Używa Open-Meteo Geocoding API.
 */
export const fetchCoordinatesByCity = async (query: string): Promise<Coordinates | null> => {
  try {
    // Używamy Open-Meteo Geocoding API (bezpłatne, brak AUTH wymagane)
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pl`;
    console.log('API URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('API response:', data);

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      console.log('Znalezione miasto:', result);
      return {
        latitude: result.latitude,
        longitude: result.longitude,
      };
    }
    console.log('Brak wyników dla zapytania:', query);
    return null;
  } catch (error) {
    console.error('Błąd przy pobieraniu współrzędnych:', error);
    return null;
  }
};

/**
 * Pobierz nazwę miasta z współrzędnych (reverse geocoding).
 * Używa Open-Meteo Geocoding API.
 */
export const fetchCityByCoordinates = async (coords: Coordinates): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coords.latitude}&longitude=${coords.longitude}&language=pl`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return result.name || result.admin1 || null;
    }
    return null;
  } catch (error) {
    console.error('Błąd przy pobieraniu nazwy miasta:', error);
    return null;
  }
};

/**
 * Filtruj szkoły po odległości od użytkownika.
 */
export const filterSchoolsByDistance = (
  schools: any[],
  userLocation: Coordinates,
  radiusKm: number
): any[] => {
  console.log('filterSchoolsByDistance - input:', {
    schoolCount: schools.length,
    userLocation,
    radiusKm,
  });
  
  const filtered = schools.filter((school) => {
    if (!school.coordinates) {
      console.log(`Szkoła ${school.name} nie ma współrzędnych`);
      return true;
    }

    const distance = calculateDistance(userLocation, school.coordinates);
    const isWithinRadius = distance <= radiusKm;
    
    console.log(`${school.name}: ${distance.toFixed(2)} km - ${isWithinRadius ? 'PASUJE' : 'ZA DALEKO'}`);
    
    return isWithinRadius;
  });
  
  console.log(`filterSchoolsByDistance - output: ${filtered.length} szkół z ${schools.length}`);
  return filtered;
};

/**
 * Sortuj szkoły po odległości (najbliższe najpierw).
 */
export const sortSchoolsByDistance = (
  schools: any[],
  userLocation: Coordinates
): any[] => {
  const sorted = schools.sort((a, b) => {
    if (!a.coordinates || !b.coordinates) return 0;

    const distanceA = calculateDistance(userLocation, a.coordinates);
    const distanceB = calculateDistance(userLocation, b.coordinates);

    return distanceA - distanceB;
  });
  
  console.log('sortSchoolsByDistance - posortowane szkoły:', sorted.map(s => `${s.name} (${calculateDistance(userLocation, s.coordinates).toFixed(2)} km)`));
  return sorted;
};
