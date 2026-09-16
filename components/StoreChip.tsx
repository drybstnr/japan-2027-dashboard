'use client';

export function StoreChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold transition-all duration-200 ${active ? 'border-[#7a9278] bg-[#7a9278] text-white shadow-[0_5px_12px_rgba(122,146,120,.2)]' : 'border-[#e1e3dc] bg-white/60 text-[#858a82]'}`}>{label}</button>;
}