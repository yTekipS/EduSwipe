// Script to fetch correct coordinates from Open-Meteo for all cities
const cities = [
  'Rzeszów',
  'Mielec',
  'Krosno',
  'Przemyśl',
  'Jarosław',
  'Sanok',
  'Dębica',
  'Łańcut',
  'Ropczyce',
  'Jasło',
  'Tarnobrzeg',
  'Stalowa Wola',
  'Leżajsk',
  'Przeworsk',
  'Lubaczów',
  'Lesko',
  'Kolbuszowa',
];

const fetchCityCoordinates = async (city) => {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        city,
        latitude: result.latitude,
        longitude: result.longitude,
      };
    }
    return { city, error: 'No results' };
  } catch (error) {
    return { city, error: error.message };
  }
};

const main = async () => {
  console.log('Fetching coordinates from Open-Meteo...\n');
  
  for (const city of cities) {
    const result = await fetchCityCoordinates(city);
    if (result.error) {
      console.log(`❌ ${result.city}: ${result.error}`);
    } else {
      console.log(`✅ ${result.city}: ${result.latitude}, ${result.longitude}`);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

main();
