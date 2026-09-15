export interface Place {
  placeId: string;
  name: string;
  category: string;
  address: string;
  neighborhood?: string;
  coordinates: { latitude: number; longitude: number };
  photo?: string;
  rating?: number;
  isOpen?: boolean;
  openingHours?: string[];
  website?: string;
  phone?: string;
}
