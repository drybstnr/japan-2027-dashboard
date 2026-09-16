'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { EmergencyCategory } from '@/data/convenienceStoreGuide';

function ProductImage({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="flex aspect-[4/5] w-[88px] shrink-0 items-center justify-center rounded-[22px] bg-[#e9eee7] p-2 text-center text-[9px] font-semibold leading-tight text-[#687864]">{name}</div>;
  return <div className="relative aspect-[4/5] w-[88px] shrink-0 overflow-hidden rounded-[22px] bg-[#e9eee7]"><Image src={src} alt={name} fill sizes="88px" loading="lazy" className="object-cover" onError={() => setFailed(true)} /></div>;
}

export function EmergencyCard({ category, filter }: { category: EmergencyCategory; filter: string }) {
  const products = filter === 'All' ? category.products : category.products.filter((product) => product.store === filter);
  if (!products.length) return null;

  return <article className="rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(56,59,50,.06)] sm:p-6"><div className="flex items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-[19px] bg-[#f2e8e0] text-[28px]">{category.icon}</span><div className="min-w-0"><span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#b27b59]">WHEN YOU NEED HELP FAST</span><h2 className="mt-1 font-[var(--font-manrope)] text-[22px] font-semibold tracking-[-.05em] text-[#252a24]">{category.title}</h2><p className="mt-2 text-[12px] leading-[1.5] text-[#858a82]">{category.explanation}</p></div></div><div className="mt-5 divide-y divide-[#f0f0ec] rounded-[18px] bg-[#fafaf8] px-4"><div className="flex items-center justify-between py-2.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#a0a49c]"><span>Recommended now</span><span>Approx.</span></div>{products.map((product) => <div className="flex items-center gap-3 py-3" key={product.name}><ProductImage name={product.name} src={product.image} /><div className="min-w-0 flex-1"><span className="block text-[12px] font-semibold text-[#42483f]">{product.name}</span><span className="mt-1 block text-[9px] text-[#858a82]">{product.price}</span></div><span className="rounded-md bg-white px-2 py-1 text-[9px] font-bold text-[#a66f62] shadow-sm">{product.store}</span><ChevronRight size={14} className="text-[#c1c7bd]" /></div>)}</div></article>;
}