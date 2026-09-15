'use client';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import type { ItineraryDay, PlanCategory, PlanItem } from '@/types/trip';
import type { Place } from '@/types/place';

const categories: PlanCategory[] = ['Activity', 'Food', 'Reservation', 'Transport'];
type PlanDraft = { dayId: string; category: PlanCategory; title: string; time: string; notes: string };
export function AddPlanModal({ days, initialDayId, prefillPlace, onClose, onAdd }: { days: ItineraryDay[]; initialDayId?: string; prefillPlace?: Place | null; onClose: () => void; onAdd: (dayId: string, item: PlanItem) => void }) {
  const [draft, setDraft] = useLocalStorageState<PlanDraft>('japan2027-plan-draft', { dayId: initialDayId ?? days[0]?.id ?? '', category: prefillPlace ? 'Food' : 'Activity', title: prefillPlace?.name ?? '', time: '', notes: prefillPlace ? prefillPlace.address : '' });
  useEffect(() => { const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', handleKeyDown); return () => document.removeEventListener('keydown', handleKeyDown); }, [onClose]);
  const updateDraft = <K extends keyof PlanDraft>(field: K, value: PlanDraft[K]) => setDraft((current) => ({ ...current, [field]: value }));
  const submit = () => { if (!draft.title.trim() || !draft.dayId) return; onAdd(draft.dayId, { id: `plan-${Date.now()}`, title: draft.title.trim(), category: draft.category, time: draft.time || undefined, notes: draft.notes || undefined, place: prefillPlace ?? undefined }); window.localStorage.removeItem('japan2027-plan-draft'); };
  return <motion.div className="modal-backdrop" role="presentation" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-plan-title" onClick={(event) => event.stopPropagation()} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 330, damping: 30 }}><div className="modal-head"><div><span className="section-kicker">QUICK ADD</span><h2 id="add-plan-title">Planına ekle</h2></div><button type="button" className="icon-button light" onClick={onClose} aria-label="Kapat"><X size={18} /></button></div><label>Day<select value={draft.dayId} onChange={(event) => updateDraft('dayId', event.target.value)}>{days.map((day) => <option value={day.id} key={day.id}>{day.date} · {day.city}</option>)}</select></label><label>Category<select value={draft.category} onChange={(event) => updateDraft('category', event.target.value as PlanCategory)}>{categories.map((item) => <option value={item} key={item}>{item}</option>)}</select></label><label>Title<input autoFocus value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} placeholder="Örn. Fushimi Inari gün doğumu" /></label><label>Optional Time<input type="time" value={draft.time} onChange={(event) => updateDraft('time', event.target.value)} /></label><label>Notes<textarea rows={3} value={draft.notes} onChange={(event) => updateDraft('notes', event.target.value)} placeholder="Kısa bir not ekle" /></label><button type="button" className="primary-button full" disabled={!draft.title.trim()} onClick={submit}><Check size={16} /> Planı ekle</button></motion.div></motion.div>;
}
