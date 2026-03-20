export type EducationType = 'secondary' | 'university';
export type SwipeDirection = 'left' | 'right';

export interface Interest {
  id: string;
  name: string;
  emoji: string;
}

export interface School {
  id: string;
  name: string;
  type: EducationType;
  location: string;
  region?: 'podkarpackie' | 'other';
  distanceKm?: number;
  partnerCategory?: 'school' | 'company';
  specialization: string[];
  interests: string[];
  description: string;
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
}

export interface MatchResult {
  school: School;
  matchScore: number;
}
