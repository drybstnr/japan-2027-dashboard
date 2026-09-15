'use client';

import { Utensils } from 'lucide-react';
import type { Place } from '@/types/place';
import { PlaceSearch } from './PlaceSearch';

export function FoodPage({ onAddToDay }: { onAddToDay: (place: Place) => void }) {
  return <section className="fade-in"><div className="eyebrow"><span>YOUR TASTE MAP</span><span className="saved-count"><Utensils size={13} /> REAL PLACES</span></div><div className="page-title-row"><div><span className="section-kicker">DISCOVER YOUR TABLE</span><h1>Food</h1></div></div><p className="intro-copy">Japonya’daki gerçek restoranları,<br />kafeleri ve fırınları keşfet.</p><PlaceSearch onAddToDay={onAddToDay} /></section>;
}
