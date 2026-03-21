// Script to generate corrected coordinates for all schools based on city centers
const cityCoordinates = {
  'Rzeszów': { lat: 50.04132, lon: 21.99901 },
  'Mielec': { lat: 50.28709, lon: 21.4239 },
  'Krosno': { lat: 49.68866, lon: 21.77058 },
  'Przemyśl': { lat: 49.78498, lon: 22.76728 },
  'Jarosław': { lat: 50.01, lon: 22.67 },
  'Sanok': { lat: 49.55573, lon: 22.2056 },
  'Dębica': { lat: 50.05146, lon: 21.41141 },
  'Łańcut': { lat: 50.06871, lon: 22.22912 },
  'Ropczyce': { lat: 50.05229, lon: 21.60891 },
  'Jasło': { lat: 49.74506, lon: 21.47252 },
  'Tarnobrzeg': { lat: 50.57304, lon: 21.67937 },
  'Stalowa Wola': { lat: 50.58286, lon: 22.05334 },
  'Leżajsk': { lat: 50.26257, lon: 22.41932 },
  'Przeworsk': { lat: 50.05912, lon: 22.49408 },
  'Lubaczów': { lat: 50.157, lon: 23.12339 },
  'Lesko': { lat: 49.4701, lon: 22.33042 },
  'Kolbuszowa': { lat: 50.2441, lon: 21.7761 },
};

// Generate random offsets within ~1km radius
function generateCoordinatesForCity(city, schoolIndex, totalSchoolsInCity) {
  const center = cityCoordinates[city];
  if (!center) return { latitude: 50, longitude: 22 }; // fallback
  
  // Distribute schools in a circle around city center
  const angle = (schoolIndex / totalSchoolsInCity) * Math.PI * 2;
  const radius = 0.007; // ~0.7km in degrees (rough)
  const randomRadius = Math.random() * radius * 0.7;
  
  return {
    latitude: parseFloat((center.lat + randomRadius * Math.cos(angle)).toFixed(5)),
    longitude: parseFloat((center.lon + randomRadius * Math.sin(angle)).toFixed(5)),
  };
}

// Sample usage
console.log('City Centers from Open-Meteo:');
Object.entries(cityCoordinates).forEach(([city, coords]) => {
  console.log(`${city}: ${coords.lat}, ${coords.lon}`);
});

console.log('\nSample school coordinates for Rzeszów:');
for (let i = 0; i < 13; i++) {
  const coords = generateCoordinatesForCity('Rzeszów', i, 13);
  console.log(`School ${i + 1}: ${coords.latitude}, ${coords.longitude}`);
}
