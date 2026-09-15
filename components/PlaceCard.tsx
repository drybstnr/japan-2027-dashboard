'use client';

import { Bookmark, CalendarPlus, MapPin, Star } from 'lucide-react';
import type { Place } from '@/types/place';

export function PlaceCard({ place, saved, onSave, onOpen, onAddToDay }: { place: Place; saved: boolean; onSave: () => void; onOpen: () => void; onAddToDay: () => void }) {
  return <article className="place-card"><button className="place-card-main" onClick={onOpen}><div className="place-photo">{place.photo ? <img src={place.photo} alt="" /> : <span><MapPin size={22} /></span>}</div><div className="place-card-copy"><div className="flex items-start justify-between gap-2"><h2>{place.name}</h2><span className="place-rating"><Star size={12} fill="currentColor" /> {place.rating?.toFixed(1) ?? '—'}</span></div><p>{place.category || 'Restaurant'}{place.neighborhood ? ` · ${place.neighborhood}` : ''}</p><span className="place-address">{place.address}</span><span className={place.isOpen === false ? 'place-status closed' : 'place-status'}>{place.isOpen === false ? 'Closed' : place.isOpen === true ? 'Open now' : 'Hours unavailable'}</span></div></button><div className="place-card-actions"><button className={saved ? 'place-action saved' : 'place-action'} onClick={onSave}><Bookmark size={14} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button><button className="place-action" onClick={onAddToDay}><CalendarPlus size={14} /> Add to Day</button></div></article>;
}
