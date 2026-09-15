export type PlanCategory = 'Activity' | 'Food' | 'Reservation' | 'Transport';
export type PlanSection = 'Timeline' | 'Food' | 'Reservations' | 'Notes';

export interface PlanItem {
  id: string;
  title: string;
  category: PlanCategory;
  time?: string;
  notes?: string;
  place?: import('@/types/place').Place;
}

export interface ItineraryDay {
  id: string;
  date: string;
  city: string;
  title: string;
  subtitle: string;
  sections: Record<PlanSection, PlanItem[]>;
}

export interface Experience {
  id: string;
  title: string;
  city: string;
  description: string;
  image: string;
}
