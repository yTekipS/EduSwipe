// Data optimization utilities

/**
 * Memoize interest lookups to O(1)
 */
export const createInterestMap = (interests: any[]) => {
  const map = new Map();
  for (const interest of interests) {
    map.set(interest.id, interest);
  }
  return map;
};

/**
 * Pre-compute school indexes for faster filtering
 */
export const createSchoolIndex = (schools: any[]) => {
  const index = new Map();
  const typeIndex = new Map();
  
  schools.forEach((school, idx) => {
    index.set(school.id, idx);
    
    const type = school.type || 'secondary';
    if (!typeIndex.has(type)) {
      typeIndex.set(type, []);
    }
    typeIndex.get(type).push(idx);
  });

  return { index, typeIndex };
};

/**
 * Batch filter and sort operations
 */
export const filterAndSortSchools = (
  schools: any[],
  filters: {
    type?: string;
    interests?: string[];
    distance?: number;
    coordinates?: any;
  }
): any[] => {
  let result = schools;

  // Filter by type
  if (filters.type) {
    result = result.filter(s => s.type === filters.type);
  }

  // Filter by interests (at least one match)
  if (filters.interests?.length) {
    const interestSet = new Set(filters.interests);
    result = result.filter(s => 
      s.interests.some((interest: string) => interestSet.has(interest))
    );
  }

  // Filter by distance
  if (filters.distance && filters.coordinates) {
    result = result.filter(s => {
      const dist = calculateDistance(s.coordinates, filters.coordinates);
      return dist <= (filters.distance || 999999);
    });
  }

  return result;
};

const calculateDistance = (coord1: any, coord2: any): number => {
  const R = 6371;
  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
