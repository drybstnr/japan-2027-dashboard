'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, MapPin, Search, ShoppingBag } from 'lucide-react';
import { CategoryChip } from '@/components/CategoryChip';
import { FindCard } from '@/components/FindCard';
import { ShoppingProgress } from '@/components/ShoppingProgress';
import { findCategories, japanFinds, shoppingSpots, type FindCategory } from '@/data/japanFinds';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

const sections = ['Beauty Finds', 'Wellness & Jet Lag Kit', 'Konbini Must-Try', 'Food Finds', 'Gifts Under ¥1,000'];

export default function JapanFindsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FindCategory | null>(null);
  const [saved, setSaved] = useLocalStorageState<string[]>('japan2027-find-saved', []);
  const [bought, setBought] = useLocalStorageState<string[]>('japan2027-find-bought', []);
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = japanFinds.filter((find) => (!category || find.category === category) && (!normalizedQuery || `${find.name} ${find.store} ${find.category} ${find.reason}`.toLowerCase().includes(normalizedQuery)));
  const toggle = (items: string[], setItems: (value: string[] | ((current: string[]) => string[])) => void, id: string) => setItems((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return <main className="min-h-screen bg-[#F7F6F3] pb-12 text-[#242821]"><div className="mx-auto max-w-[760px] px-[22px] pb-10 pt-5 sm:px-[38px]">
    <header className="flex items-center justify-between"><Link href="/" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#4e584c] shadow-[0_4px_16px_rgba(47,51,44,.07)]" aria-label="Dashboard'a dön"><ArrowLeft size={18} /></Link><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#858a82]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#f4d9b7] text-[#a66f62]"><ShoppingBag size={14} /></span> Travel Guide</div><span className="h-10 w-10" aria-hidden="true" /></header>
    <section className="fade-in pt-10"><span className="section-kicker">CURATED FOR YOUR SUITCASE</span><h1 className="mt-3 font-[var(--font-manrope)] text-[clamp(2.8rem,12vw,4.5rem)] font-semibold leading-[.92] tracking-[-.075em]">Japan <span className="text-[#7a9278]">Finds</span></h1><p className="mt-5 max-w-[440px] text-[13px] leading-[1.55] text-[#777c73]">The internet's favorite Japanese finds, organized for your trip.</p></section>
    <div className="mt-8 flex h-13 items-center gap-3 rounded-[18px] border border-[#e2e5df] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(56,59,50,.05)]"><Search size={17} className="shrink-0 text-[#8d968b]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 border-0 bg-transparent text-[12px] outline-none placeholder:text-[#a3a9a0]" placeholder="Search products, stores or categories..." /></div>
    <div className="-mx-[22px] mt-5 flex gap-2 overflow-x-auto px-[22px] pb-1 scrollbar-none sm:-mx-[38px] sm:px-[38px]">{findCategories.map((item) => <CategoryChip key={item.value} label={item.label} active={category === item.value} onClick={() => setCategory(category === item.value ? null : item.value)} />)}</div>
    <div className="mt-8"><ShoppingProgress bought={bought.length} saved={saved.length} total={japanFinds.length} /></div>
    {query || category ? <section className="mt-10"><div className="mb-4 flex items-end justify-between"><div><span className="section-kicker">SEARCH RESULTS</span><h2 className="mt-1 font-[var(--font-manrope)] text-[22px] font-semibold tracking-[-.05em]">{filtered.length} finds</h2></div><button className="text-[10px] font-bold text-[#7a9278]" onClick={() => { setQuery(''); setCategory(null); }}>Clear</button></div>{filtered.length ? <div className="grid grid-cols-2 gap-3">{filtered.map((find) => <FindCard key={find.id} find={find} saved={saved.includes(find.id)} bought={bought.includes(find.id)} onSave={() => toggle(saved, setSaved, find.id)} onBuy={() => toggle(bought, setBought, find.id)} />)}</div> : <div className="rounded-[24px] border border-dashed border-[#d7d9d2] p-8 text-center text-[12px] text-[#858a82]">No finds match that search yet.</div>}</section> : <div className="mt-10 space-y-10">{sections.map((section) => <section key={section}><div className="mb-4 flex items-end justify-between"><div><span className="section-kicker">JAPAN EDIT</span><h2 className="mt-1 font-[var(--font-manrope)] text-[22px] font-semibold tracking-[-.05em]">{section}</h2></div><span className="text-[10px] text-[#a0a49c]">{japanFinds.filter((find) => find.section === section).length} picks</span></div><div className="grid grid-cols-2 gap-3">{japanFinds.filter((find) => find.section === section).map((find) => <FindCard key={find.id} find={find} saved={saved.includes(find.id)} bought={bought.includes(find.id)} onSave={() => toggle(saved, setSaved, find.id)} onBuy={() => toggle(bought, setBought, find.id)} />)}</div></section>)}</div>}
    <section className="mt-12"><div className="mb-4"><span className="section-kicker">THE LOCAL SHORTLIST</span><h2 className="mt-1 font-[var(--font-manrope)] text-[22px] font-semibold tracking-[-.05em]">Where to Shop</h2></div><div className="grid gap-2 rounded-[26px] bg-white p-4 shadow-[0_10px_30px_rgba(56,59,50,.06)] sm:grid-cols-2">{shoppingSpots.map((spot) => <div className="flex items-center gap-3 border-b border-[#f0f0ec] py-3 last:border-0 sm:nth-[odd]:border-b sm:nth-[5]:border-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[#f2e8e0] font-[var(--font-manrope)] text-[13px] font-bold text-[#a66f62]">{spot.mark}</span><div><strong className="block text-[12px] text-[#42483f]">{spot.name}</strong><span className="mt-1 block text-[10px] leading-[1.35] text-[#92978e]">{spot.note}</span></div><MapPin size={14} className="ml-auto shrink-0 text-[#aeb5aa]" /></div>)}</div></section>
  </div></main>;
}