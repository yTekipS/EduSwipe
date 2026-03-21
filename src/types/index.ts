export type EducationType = 'secondary' | 'university';
export type SwipeDirection = 'left' | 'right';

export interface Interest {
  id: string;
  name: string;
  emoji: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface School {
  id: string;
  name: string;
  type: EducationType;
  location: string;
  coordinates?: Coordinates;
  distanceKm?: number;
  partnerCategory?: 'school' | 'company';
  specialization: string[];
  interests: string[];
  description: string;
  bio?: string;
  datingBio?: string;
  greenFlags?: string[];
  redFlags?: string[];
  firstDateLabel?: string;
  firstDateLink?: string;
  website?: string;
  image?: string;
}

export interface UserProfile {
  interests: string[];
  selectedType: EducationType;
  userLocation?: Coordinates;
  userCity?: string;
  distanceRadius?: number;
}

export interface MatchResult {
  school: School;
  matchScore: number;
}
