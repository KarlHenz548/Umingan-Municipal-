export interface NewsArticle {
  id: string;
  title: string;
  category: 'Executive Order' | 'Public Advisory' | 'Infrastructure' | 'Agriculture' | 'Health & Safety' | 'Culture & Events';
  date: string;
  summary: string;
  content: string;
  author: string;
  image: string;
  featured?: boolean;
  docRef?: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  category: 'Nature & Adventure' | 'Parks & Recreation' | 'Local Dining';
  location: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  entranceFee: string;
  image: string;
  rating: number;
  travelTips: string;
  coordinates: { lat: number; lng: number };
}

export interface Barangay {
  name: string;
  captain: string;
  zone: 'Poblacion District' | 'Northern Agricultural Plains' | 'Central Plains' | 'Southern Foothills' | 'Eastern Upland' | 'Western Riverlands';
  contact: string;
  population: string;
  mainLivelihood: string;
  hallLocation: string;
}

export interface MunicipalOfficial {
  name: string;
  position: string;
  committee: string;
  officeHours: string;
  image: string;
  quote?: string;
}

export interface EmergencyContact {
  office: string;
  hotline: string;
  landline?: string;
  address: string;
  available: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  department: string;
  category: 'permits' | 'taxes' | 'civil' | 'agri' | 'social';
  processingTime: string;
  requirements: string[];
  description: string;
  onlineEligible: boolean;
  downloadableFormUrl?: string;
}

export interface CitizenFeedback {
  id?: number | string;
  reference_code: string;
  category: string;
  name: string;
  contact: string;
  barangay: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  created_at?: string;
}
