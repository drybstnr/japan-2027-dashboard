'use client';

import { Clock3, Heart, MapPin, Plus, Sparkles, Plane } from 'lucide-react';
import type { ItineraryDay, PlanItem } from '@/types/trip';

const rows = [
  { key: 'transport', label: 'Transport', icon: Plane, tone: 'bg-[#e9efeb] text-[#7A9278]' },
  { key: 'schedule', label: 'Schedule', icon: Clock3, tone: 'bg-[#f4ebe3] text-[#b77f62]' },
  { key: 'activities', label: 'Planned Activities', icon: Sparkles, tone: 'bg-[#eeeaf3] text-[#8b7aa8]' },
  { key: 'notes', label: 'Notes', icon: Heart, tone: 'bg-[#f4e9e7] text-[#b78378]' },
] as const;

function rowItems(day: ItineraryDay, key: typeof rows[number]['key']): PlanItem[] {
  if (key === 'transport') return day.sections.Timeline.filter((item) => item.category === 'Transport');
  if (key === 'schedule') return day.sections.Reservations;
  if (key === 'activities') return [...day.sections.Timeline.filter((item) => item.category !== 'Transport'), ...day.sections.Food];
  return day.sections.Notes;
}

export function DaySchedule({ day, onAdd }: { day: ItineraryDay; onAdd: () => void }) {
  return <div className="day-schedule">{rows.map(({ key, label, icon: Icon, tone }) => { const items = rowItems(day, key); const first = items[0]; return <div className="day-plan-row" key={key}><span className={`day-plan-icon ${tone}`}><Icon size={15} /></span><div className="day-plan-copy"><strong>{label}</strong><span>{first ? `${first.time ? `${first.time} · ` : ''}${first.title}` : 'No plans yet'}</span></div><button type="button" className="day-plan-add" onClick={onAdd} aria-label={`${label} planı ekle`}><Plus size={14} /></button></div>; })}</div>;
}
