'use client';

import { Check } from 'lucide-react';

export function ChecklistItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center gap-3 border-b border-[#f0f0ec] py-3.5 last:border-b-0"><input className="sr-only" type="checkbox" checked={checked} onChange={onChange} /><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${checked ? 'border-[#7a9278] bg-[#7a9278] text-white' : 'border-[#d9ddd5] bg-white text-transparent'}`} aria-hidden="true"><Check size={14} strokeWidth={3} /></span><span className={`text-[12px] transition-colors ${checked ? 'text-[#9a9f96] line-through' : 'text-[#42483f]'}`}>{label}</span></label>;
}