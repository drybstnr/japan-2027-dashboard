'use client';

import { Bookmark, CalendarPlus, MapPin } from 'lucide-react';
import type { Experience } from '@/types/trip';
export function ExperienceCard({ experience, saved, onSave, onAddToDay }: { experience: Experience; saved: boolean; onSave: () => void; onAddToDay: () => void }) { return <article className="experience-card"><div className="image-wrap"><img src={experience.image} alt={experience.title} /><button className={saved ? 'save-button saved' : 'save-button'} onClick={onSave} aria-label="Kaydet"><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="experience-copy"><span className="card-city">{experience.city}</span><h3>{experience.title}</h3><p>{experience.description}</p><div className="flex items-center justify-between gap-2"><button className="maps-button"><MapPin size={13} /> Maps</button><button className="maps-button" onClick={onAddToDay}><CalendarPlus size={13} /> Add to Day</button></div></div></article>; }
