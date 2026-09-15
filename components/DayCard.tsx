'use client';

import { ChevronDown, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ItineraryDay } from '@/types/trip';
import { DaySchedule } from './DaySchedule';

export function DayCard({ day, expanded, onToggle, onAdd }: { day: ItineraryDay; expanded: boolean; onToggle: () => void; onAdd: () => void }) {
  const dayNumber = Number(day.date.split(' ')[0]);
  const weekday = new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(new Date(2027, 4, dayNumber));
  return <motion.article layout className={`day-card ${expanded ? 'open' : ''}`} transition={{ layout: { duration: .25, ease: 'easeOut' } }}><button className="day-header" onClick={onToggle} aria-expanded={expanded}><div className="day-date-column"><strong>{dayNumber}</strong><span>Mayıs</span><small>{weekday}</small></div><div className="day-content-column"><span className="day-location"><MapPin size={13} /> {day.city}</span><strong className="day-title">{day.title}</strong><span className="day-subtitle">{day.subtitle}</span></div><motion.span className="day-chevron" animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: .2 }}><ChevronDown size={18} /></motion.span></button><AnimatePresence initial={false}>{expanded && <motion.div className="day-expanded-grid" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25, ease: 'easeOut' }}><div className="day-expanded-divider" /><DaySchedule day={day} onAdd={onAdd} /></motion.div>}</AnimatePresence></motion.article>;
}
