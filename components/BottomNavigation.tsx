'use client';

import { CalendarDays, House, MessageCircle, Star, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
export type AppTab = 'Dashboard' | 'Itinerary' | 'Explore' | 'Food' | 'Community';
const items: Array<{ label: AppTab; icon: typeof House }> = [{ label: 'Dashboard', icon: House }, { label: 'Itinerary', icon: CalendarDays }, { label: 'Explore', icon: Star }, { label: 'Food', icon: Utensils }, { label: 'Community', icon: MessageCircle }];
export function BottomNavigation({ activeTab, onChange }: { activeTab: AppTab; onChange: (tab: AppTab) => void }) { return <nav className="bottom-nav">{items.map(({ label, icon: Icon }) => <button key={label} className={activeTab === label ? 'nav-item active' : 'nav-item'} onClick={() => onChange(label)}><span className="nav-icon-wrap">{activeTab === label && <motion.span layoutId="active-tab" className="nav-active-indicator" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />}<Icon className="relative z-[1]" size={19} strokeWidth={activeTab === label ? 2.5 : 1.8} /></span><span>{label}</span></button>)}</nav>; }
