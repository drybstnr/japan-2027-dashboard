'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, CalendarDays, Check, ChevronDown, ChevronLeft, Clock3, ExternalLink, Heart, House, MapPin, Menu, MessageCircle, MoreHorizontal, Navigation, Plane, Plus, Search, Sparkles, Star, Utensils, X } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AddPlanModal } from '@/components/AddPlanModal';
import { BottomNavigation, type AppTab } from '@/components/BottomNavigation';
import { DayCard } from '@/components/DayCard';
import { ExperienceCard } from '@/components/ExperienceCard';
import { FoodPage } from '@/components/FoodPage';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { TripProgress } from '@/components/TripProgress';
import { WeatherCard } from '@/components/WeatherCard';
import { experiences as experienceData, experienceCities } from '@/data/experiences';
import { itineraryDays } from '@/data/itinerary';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import type { ItineraryDay, PlanCategory, PlanItem, PlanSection } from '@/types/trip';
import type { Place } from '@/types/place';

type Tab = 'Dashboard' | 'Itinerary' | 'Experiences' | 'Restaurants' | 'Suggestions';

type Experience = { title: string; description: string; city: string; image: string };
type Suggestion = { city: string; title: string; note: string; time: string };

const navItems: { label: Tab; icon: typeof House }[] = [
  { label: 'Dashboard', icon: House }, { label: 'Itinerary', icon: CalendarDays }, { label: 'Experiences', icon: Star }, { label: 'Restaurants', icon: Utensils }, { label: 'Suggestions', icon: MessageCircle },
];

const route = [
  { city: 'Tokyo', dates: '14–16 May', color: '#E78C77', note: 'Başlangıç noktası' }, { city: 'Hakone', dates: '17 May', color: '#7A9278', note: 'Ryokan gecesi' }, { city: 'Kanazawa', dates: '18 May', color: '#D39B64', note: 'Altın şehir' }, { city: 'Kyoto', dates: '19–22 May', color: '#8B8FC5', note: 'Kültür ve sakinlik' }, { city: 'Nara', dates: '22 May', color: '#B58A6B', note: 'Günübirlik' }, { city: 'Uji', dates: '23 May', color: '#87A8A0', note: 'Matcha molası' }, { city: 'Osaka', dates: '24–25 May', color: '#D98686', note: 'Son durak' }, { city: 'Tokyo', dates: '26 May', color: '#E78C77', note: 'Dönüş öncesi' },
];

const itinerary = [
  ['14 May', 'Tokyo', 'Shibuya & şehir ışıkları'], ['15 May', 'Tokyo', 'Yanaka sabahı & Ghibli'], ['16 May', 'Tokyo', 'Asakusa & teamLab'], ['17 May', 'Hakone', 'Ryokan & Onsen'], ['18 May', 'Kanazawa', 'Bahçeler & altın yaprak'], ['19 May', 'Kyoto', 'Gion akşamı'], ['20 May', 'Kyoto', 'Fushimi Inari & sake'], ['21 May', 'Kyoto', 'Arashiyama sabahı'], ['22 May', 'Nara', 'Günübirlik deer walk'], ['23 May', 'Uji', 'Matcha & Byodo-in'], ['24 May', 'Osaka', 'Dotonbori gecesi'], ['25 May', 'Osaka', 'Universal Studios'], ['26 May', 'Tokyo', 'Son alışveriş & veda'],
];

const cityExperiences: Record<string, string[]> = {
  Tokyo: ['Shibuya Sky', 'DisneySea', 'Ghibli Museum', 'teamLab Planets', 'Tsukiji Market', 'Meiji Jingu', 'Senso-ji', 'Harajuku', 'Akihabara', 'Shimokitazawa'],
  Hakone: ['Ryokan', 'Onsen', 'Ropeway', 'Lake Ashi', 'Pirate Ship', 'Owakudani', 'Open Air Museum', 'Fuji Viewpoint', 'Tea House', 'Shrine Walk'],
  Kanazawa: ['Kenroku-en', 'Higashi Chaya', 'Omicho Market', 'Samurai District', 'Gold Leaf Experience', '21st Century Museum', 'Castle Park', 'Tea House', 'Night Walk', 'Wagyu'],
  Kyoto: ['Fushimi Inari', 'Arashiyama', 'Kiyomizu-dera', 'Gion', 'Nishiki Market', 'Tea Ceremony', "Philosopher's Path", 'Yasaka Shrine', 'Ninenzaka', 'Matcha Experience'],
  Nara: ['Deer Park', 'Todai-ji', 'Kasuga Taisha', 'Mochi Show', 'Isuien Garden', 'Kofukuji', 'Naramachi', 'Tea House', 'Lantern Walk', 'Local Sweets'],
  Uji: ['Byodo-in', 'Matcha Tasting', 'Tea Ceremony', 'Riverside Walk', 'Tea Shops', 'Matcha Dessert', 'Museum', 'Bridge Walk', 'Bakery', 'Souvenir Tea'],
  Osaka: ['Universal Studios', 'Dotonbori', 'Kuromon Market', 'Shinsekai', 'Umeda Sky', 'Osaka Castle', 'Amerikamura', 'River Cruise', 'Night Food Tour', 'Botanical Garden'],
};

const photos = ['photo-1540959733332-eab4deabeeaf', 'photo-1493976040374-85c8e12f0c0e', 'photo-1528360983277-13d401cdc186', 'photo-1490806843957-31f4c9a91c65', 'photo-1524413840807-0c3cb6fa808d', 'photo-1528360983277-13d401cdc186'];
const filters = ['Tokyo', 'Kyoto', 'Osaka', 'Matcha', 'Ramen', 'Wagyu', 'Coffee'];

function daysUntilTrip() {
  const target = new Date('2027-05-13T00:00:00');
  return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000));
}

export default function Home() {
  const [activeTab, setActiveTab] = useLocalStorageState<AppTab>('japan2027-active-tab', 'Dashboard');
  const [days, setDays] = useState(daysUntilTrip());
  const [saved, setSaved] = useState<string[]>([]);
  const [expanded, setExpanded] = useLocalStorageState<string | null>('japan2027-expanded-days', '17-may');
  const [selectedCity, setSelectedCity] = useState('Tokyo');
  const [activeFilter, setActiveFilter] = useState('Tokyo');
  const [showModal, setShowModal] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [plannerDays, setPlannerDays] = useLocalStorageState<ItineraryDay[]>('japan2027-itinerary', () => itineraryDays.map((day) => ({ ...day, sections: { ...day.sections } })));
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { city: 'TOKYO', title: 'Senso-ji’yi gün doğumunda gör', note: 'Kalabalık başlamadan önce tapınak avlusu neredeyse sessiz oluyor.', time: '12 dk önce' },
    { city: 'KYOTO', title: 'Otagi Nenbutsu-ji’ye uğra', note: 'Arashiyama’nın bambu kalabalığından sonra çok iyi bir nefes.', time: 'Dün' },
    { city: 'OSAKA', title: 'Hozenji Yokocho', note: 'Dotonbori’ye çok yakın ama bambaşka bir his. Akşam git.', time: '3 gün önce' },
  ]);

  useScrollRestoration();
  useEffect(() => {
    try {
      const draft = window.localStorage.getItem('japan2027-plan-draft');
      if (draft) {
        const parsed = JSON.parse(draft) as { title?: string; notes?: string };
        if (parsed.title?.trim() || parsed.notes?.trim()) setShowModal(true);
      }
    } catch {
      // A malformed draft should not block the app from loading.
    }
  }, []);

  useEffect(() => { const timer = window.setInterval(() => setDays(daysUntilTrip()), 60000); return () => window.clearInterval(timer); }, []);
  const experiences: Experience[] = useMemo(() => cityExperiences[selectedCity].map((title, i) => ({ title, city: selectedCity, description: ['Şehrin ruhunu yakalayan sakin ve ikonik bir durak.', 'Bir öğleden sonrayı ayırmaya değer, özenle seçilmiş bir deneyim.', 'İlk kez gelenler için zamansız, özel bir rota.'][i % 3], image: `https://images.unsplash.com/${photos[i % photos.length]}?auto=format&fit=crop&w=900&q=80` })), [selectedCity]);

  const toggleSaved = (title: string) => setSaved((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);

  const addPlan = (dayId: string, item: PlanItem) => setPlannerDays((days) => days.map((day) => day.id === dayId ? { ...day, sections: { ...day.sections, [categorySection(item.category)]: [...day.sections[categorySection(item.category)], item] } } : day));
  const addToSection = (dayId: string, section: PlanSection, item: PlanItem) => setPlannerDays((days) => days.map((day) => day.id === dayId ? { ...day, sections: { ...day.sections, [section]: [...day.sections[section], item] } } : day));
  const tripCity = currentTripCity();
  const selectedExperienceData = experienceData.find((item) => item.id === selectedExperience);
  const openAddPlan = (dayId?: string) => { setSelectedDayId(dayId ?? null); setSelectedExperience(null); setShowModal(true); };

  return <main className="app-shell">
    <header className="topbar"><button className="icon-button"><Menu size={20} /></button><div className="brand-mark"><span className="brand-dot" /> <span>JAPAN <b>’27</b></span></div><button className="avatar">E</button></header>
    <AnimatePresence mode="wait" initial={false}><motion.div className={`page-content ${activeTab === 'Itinerary' ? 'itinerary-page-shell' : ''}`} key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>
      {activeTab === 'Dashboard' && <SprintDashboard days={days} city={tripCity} />}
      {activeTab === 'Itinerary' && <PlannerItinerary days={plannerDays} expanded={expanded} setExpanded={setExpanded} onAddPlan={openAddPlan} />}
      {activeTab === 'Explore' && <ExplorePage saved={saved} toggleSaved={(title) => setSaved((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])} onAddToDay={(id) => { setSelectedDayId(null); setSelectedExperience(id); setShowModal(true); }} />}
      {activeTab === 'Food' && <FoodPage onAddToDay={(place) => { setSelectedPlace(place); setSelectedExperience(null); setSelectedDayId(null); setShowModal(true); }} />}
      {activeTab === 'Community' && <Suggestions suggestions={suggestions} showModal={showModal} setShowModal={setShowModal} />}
    </motion.div></AnimatePresence>
    <BottomNavigation activeTab={activeTab} onChange={setActiveTab} />
    {(activeTab === 'Dashboard' || activeTab === 'Itinerary' || activeTab === 'Explore') && <FloatingAddButton onClick={() => openAddPlan()} />}
    <AnimatePresence>{showModal && activeTab !== 'Community' && <AddPlanModal days={plannerDays} initialDayId={selectedDayId ?? plannerDays.find((day) => day.city === selectedExperienceData?.city)?.id} prefillPlace={selectedPlace} onClose={() => { setShowModal(false); setSelectedExperience(null); setSelectedPlace(null); setSelectedDayId(null); }} onAdd={(dayId, item) => { addPlan(dayId, selectedExperienceData ? { ...item, title: selectedExperienceData.title, notes: item.notes } : item); setShowModal(false); setSelectedExperience(null); setSelectedPlace(null); setSelectedDayId(null); }} />}{showModal && activeTab === 'Community' && <SuggestionModal onClose={() => setShowModal(false)} onAdd={(suggestion) => { setSuggestions((items) => [{ ...suggestion, time: 'şimdi' }, ...items]); setShowModal(false); }} />}</AnimatePresence>
  </main>;
}

function categorySection(category: PlanCategory): PlanSection { return category === 'Food' ? 'Food' : category === 'Reservation' ? 'Reservations' : category === 'Transport' || category === 'Activity' ? 'Timeline' : 'Notes'; }
function currentTripCity() { const now = new Date(); const tripStart = new Date('2027-05-14T00:00:00'); const tripEnd = new Date('2027-05-27T00:00:00'); if (now < tripStart || now >= tripEnd) return 'Tokyo'; const dayIndex = Math.floor((now.getTime() - tripStart.getTime()) / 86400000); return itineraryDays[dayIndex]?.city ?? 'Tokyo'; }

function SprintDashboard({ days, city }: { days: number; city: string }) {
  return <section className="fade-in space-y-6 pb-4"><HeroCard days={days} /><Link href="/before-you-go" className="group flex items-center gap-4 rounded-[24px] bg-[#242821] p-4 text-white shadow-[0_12px_28px_rgba(36,40,33,.14)] transition-transform duration-200 hover:-translate-y-0.5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-[#dce6d9] text-[#52614f]"><Plane size={19} /></span><span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#b9c8b5]">PRE-TRIP KIT</span><strong className="mt-1 block font-[var(--font-manrope)] text-[16px] tracking-[-.03em]">Before You Go</strong><span className="mt-1 block text-[10px] text-[#b8beb5]">Japonya için hazırlıklarını tamamla.</span></span><ArrowRight className="text-[#dce6d9] transition-transform group-hover:translate-x-1" size={18} /></Link><section><div className="mb-3 flex items-end justify-between"><div><span className="section-kicker">TRAVEL GUIDES</span><h2 className="mt-1 font-[var(--font-manrope)] text-lg font-semibold tracking-[-.04em]">Yolculuk rehberleri</h2></div><span className="text-[10px] text-[#858a82]">EDITED PICKS</span></div><div className="grid gap-2"><Link href="/japan-finds" className="group flex items-center gap-4 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(56,59,50,.06)] transition-transform duration-200 hover:-translate-y-0.5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#f4d9b7] text-2xl">🛍️</span><span className="min-w-0 flex-1"><strong className="block font-[var(--font-manrope)] text-[16px] tracking-[-.03em]">Japan Finds</strong><span className="mt-1 block text-[11px] leading-relaxed text-[#858a82]">Curated shopping recommendations for Japan.</span></span><ArrowRight className="text-[#7a9278] transition-transform group-hover:translate-x-1" size={18} /></Link><Link href="/convenience-store-survival-guide" className="group flex items-center gap-4 rounded-[24px] bg-[#fffaf4] p-4 shadow-[0_10px_30px_rgba(56,59,50,.06)] transition-transform duration-200 hover:-translate-y-0.5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#f2d9d2] text-2xl">🩹</span><span className="min-w-0 flex-1"><strong className="block font-[var(--font-manrope)] text-[16px] tracking-[-.03em]">Convenience Store Survival Guide</strong><span className="mt-1 block text-[11px] leading-relaxed text-[#858a82]">What to buy when you need help fast.</span></span><ArrowRight className="text-[#a66f62] transition-transform group-hover:translate-x-1" size={18} /></Link></div></section><WeatherCard city={city} /><FlightCard /><section><div className="mb-3 flex items-end justify-between"><div><span className="section-kicker">UPCOMING RESERVATIONS</span><h2 className="mt-1 font-[var(--font-manrope)] text-lg font-semibold tracking-[-.04em]">Yaklaşan planlar</h2></div><span className="text-[10px] text-[#858a82]">3 PLACEHOLDERS</span></div><div className="grid gap-2 sm:grid-cols-3">{[['17 May', 'Hakone Ryokan', 'Reservation'], ['20 May', 'Tea Ceremony', 'Activity'], ['25 May', 'Universal Studios', 'Reservation']].map(([date, title, category]) => <div className="rounded-[20px] bg-white p-4 shadow-sm" key={title}><span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#E78C77]">{date}</span><strong className="mt-2 block text-sm">{title}</strong><span className="mt-2 block text-[10px] text-[#858a82]">{category} · Yakında ekle</span></div>)}</div></section><TripProgress dayNumber={1} /></section>;
}

function PlannerItinerary({ days, expanded, setExpanded, onAddPlan }: { days: ItineraryDay[]; expanded: string | null; setExpanded: (day: string | null) => void; onAddPlan: (dayId?: string) => void }) {
  return <section className="fade-in mx-auto max-w-[440px] px-5 pb-32"><div className="eyebrow"><span>14 GÜN • 13 GECE</span><span className="text-[#7A9278]">LIVE PLANNER</span></div><div className="page-title-row"><div><span className="section-kicker">YOUR JOURNEY</span><h1>Itinerary</h1></div><button className="icon-button light" aria-label="Takvimi aç"><CalendarDays size={19} /></button></div><p className="intro-copy">Her günü kendi ritmine göre planla.<br />Eklediklerin anında burada görünür.</p><div className="day-list">{days.map((day) => <DayCard key={day.id} day={day} expanded={expanded === day.id} onToggle={() => setExpanded(expanded === day.id ? null : day.id)} onAdd={() => onAddPlan(day.id)} />)}</div></section>;
}

function ExplorePage({ saved, toggleSaved, onAddToDay }: { saved: string[]; toggleSaved: (title: string) => void; onAddToDay: (id: string) => void }) {
  const [city, setCity] = useState('Tokyo'); const cityItems = experienceData.filter((item) => item.city === city);
  return <section className="fade-in"><div className="eyebrow"><span>CURATED FOR YOUR TRIP</span><span>{saved.length} kaydedildi</span></div><div className="page-title-row"><div><span className="section-kicker">DISCOVER</span><h1>Explore</h1></div><button className="icon-button light" aria-label="Ara"><Search size={19} /></button></div><div className="city-tabs">{experienceCities.map((name) => <button className={city === name ? 'city-tab active' : 'city-tab'} key={name} onClick={() => setCity(name)}>{name}</button>)}</div><div className="experience-intro"><span className="city-stamp">{city.slice(0, 1)}</span><div><h2>{city}’de yapılacaklar</h2><p>Bir plana dönüşmeyi bekleyen duraklar.</p></div></div><div className="experience-grid">{cityItems.map((item) => <ExperienceCard key={item.id} experience={item} saved={saved.includes(item.title)} onSave={() => toggleSaved(item.title)} onAddToDay={() => onAddToDay(item.id)} />)}</div></section>;
}

function HeroCard({ days }: { days: number }) {
  return <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/60 p-5 shadow-[0_20px_60px_rgba(70,85,68,0.1)] backdrop-blur-xl sm:p-7">
    <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#dce6d9]/80 blur-2xl" />
    <div className="relative flex items-start justify-between"><div><span className="section-kicker">FINAL ITINERARY</span><h1 className="mt-3 max-w-[290px] font-[var(--font-manrope)] text-[clamp(2.5rem,11vw,4.5rem)] font-semibold leading-[.94] tracking-[-.07em] text-[#242821]">Japan 2027<br /><span className="text-[#7A9278]">Travel Dashboard</span></h1></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80 text-[#7A9278] shadow-sm"><Sparkles size={18} /></span></div>
    <p className="mt-5 text-sm text-[#777c73]">14–27 Mayıs 2027 <span className="px-1 text-[#E78C77]">•</span> Tokyo’dan başlayan iki haftalık hikâye</p>
    <div className="mt-6 flex items-end justify-between rounded-[22px] bg-[#dce6d9]/75 p-4 sm:p-5"><div><span className="block font-[var(--font-manrope)] text-5xl font-semibold leading-none tracking-[-.08em] text-[#3f513c]">{days}</span><span className="mt-2 block text-[11px] font-semibold uppercase tracking-[.14em] text-[#687864]">gün kaldı</span></div><div className="max-w-[145px] text-right text-[11px] leading-relaxed text-[#687864]"><span className="mb-1 inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#7A9278]" /> CANLI GERİ SAYIM</span><strong className="block text-[#3f513c]">13 Mayıs 2027</strong> tarihinde yola çıkıyoruz.</div></div>
  </div>;
}

function FlightCard() {
  return <section><div className="mb-3 flex items-end justify-between"><div><span className="section-kicker">UÇUŞ PLANI</span><h2 className="mt-1 font-[var(--font-manrope)] text-lg font-semibold tracking-[-.04em]">Gökyüzünde başlayan rota</h2></div><span className="rounded-full bg-[#f2e8e0] px-2.5 py-1.5 text-[10px] font-bold text-[#aa725c]">TK 52</span></div><div className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(56,59,50,.06)]"><div className="flex items-center justify-between text-[10px] text-[#a3a69e]"><span>13 May • 11h 10m</span><span>Türk Hava Yolları</span></div><div className="my-6 grid grid-cols-[1fr_1.4fr_1fr] items-center"><div><b className="font-[var(--font-manrope)] text-3xl tracking-[-.06em]">IST</b><span className="mt-1 block text-[10px] text-[#969a91]">İstanbul · 23:45</span></div><div className="flex items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-[#7A9278]" /><span className="h-px w-full bg-[#d8dcd4]" /><span className="mx-2 rotate-45 text-sm text-[#E78C77]">✈</span><span className="h-px w-full bg-[#d8dcd4]" /><span className="h-1.5 w-1.5 rounded-full bg-[#7A9278]" /></div><div className="text-right"><b className="font-[var(--font-manrope)] text-3xl tracking-[-.06em]">HND</b><span className="mt-1 block text-[10px] text-[#969a91]">Haneda · 14:00 <i className="text-[#E78C77]">+1</i></span></div></div><div className="flex items-center justify-between border-t border-[#f0f0ed] pt-3 text-[11px] text-[#999c95]"><span>Dönüş</span><strong className="text-[#555a53]">27 May · 10:45 <small className="text-[#E78C77]">HND → IST</small></strong><Clock3 size={15} /></div></div></section>;
}

function StatsGrid() {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{[['13', 'Nights'], ['14', 'Days'], ['7', 'Cities'], ['3', 'Shinkansen']].map(([value, label]) => <div className="rounded-[18px] border border-white/70 bg-[#eeede8] p-4 shadow-sm" key={label}><strong className="block font-[var(--font-manrope)] text-2xl font-semibold tracking-[-.06em]">{value}</strong><span className="mt-1 block text-[10px] uppercase tracking-[.08em] text-[#858980]">{label}</span></div>)}</div>;
}

function Itinerary({ expanded, setExpanded }: { expanded: string | null; setExpanded: (day: string | null) => void }) {
  return <section className="fade-in"><div className="eyebrow"><button className="back-link"><ChevronLeft size={15} /> DASHBOARD</button></div><div className="page-title-row"><div><span className="section-kicker">14 GÜN • 13 GECE</span><h1>Itinerary</h1></div><button className="icon-button light"><CalendarDays size={19} /></button></div><p className="intro-copy">Her gün için küçük notlar, güzel duraklar<br />ve kaybolmaya açık alanlar.</p><div className="day-list">{itinerary.map(([date, city, title], i) => <div className={`day-card ${expanded === date ? 'open' : ''}`} key={date}><button className="day-header" onClick={() => setExpanded(expanded === date ? null : date)}><div className="day-number">{String(i + 1).padStart(2, '0')}</div><div className="day-meta"><span>{date} <i>•</i> {city}</span><strong>{title}</strong></div><ChevronDown size={18} /></button>{expanded === date && <div className="day-details"><DetailRow icon="↗" label="Transport" value={city === 'Tokyo' ? 'Şehir içi • Metro / yürüyüş' : 'Sabah treni • 09:20'} /><DetailRow icon="◷" label="Reservation" value={i === 3 ? 'Ryokan • Onay bekliyor' : 'Henüz eklenmedi'} /><DetailRow icon="✦" label="Notes" value="Bu güne küçük bir boşluk bırak." /><DetailRow icon="♡" label="Friend Suggestions" value="Henüz öneri yok" /></div>}</div>)}</div></section>;
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) { return <div className="detail-row"><span className="detail-icon">{icon}</span><span className="detail-label">{label}</span><span className="detail-value">{value}</span><ChevronDown size={14} /></div>; }

function Experiences({ city, setCity, experiences, saved, toggleSaved }: { city: string; setCity: (city: string) => void; experiences: Experience[]; saved: string[]; toggleSaved: (title: string) => void }) {
  return <section className="fade-in"><div className="eyebrow"><span>✦ CURATED FOR YOUR TRIP</span><span className="saved-count"><Bookmark size={13} /> {saved.length} kaydedildi</span></div><div className="page-title-row"><div><span className="section-kicker">KEŞFET</span><h1>Experiences</h1></div><button className="icon-button light"><Search size={19} /></button></div><div className="city-tabs">{Object.keys(cityExperiences).map((name) => <button className={city === name ? 'city-tab active' : 'city-tab'} key={name} onClick={() => setCity(name)}>{name}</button>)}</div><div className="experience-intro"><span className="city-stamp">{city.slice(0, 1)}</span><div><h2>{city}’de yapılacaklar</h2><p>Bu şehri senin için biraz daha özel yapanlar.</p></div></div><div className="experience-grid">{experiences.map((item, i) => <article className="experience-card" key={item.title}><div className="image-wrap"><img src={item.image} alt={item.title} /><span className="image-index">{String(i + 1).padStart(2, '0')}</span><button className={saved.includes(item.title) ? 'save-button saved' : 'save-button'} onClick={() => toggleSaved(item.title)} aria-label="Kaydet"><Bookmark size={17} fill={saved.includes(item.title) ? 'currentColor' : 'none'} /></button></div><div className="experience-copy"><span className="card-city">{city}</span><h3>{item.title}</h3><p>{item.description}</p><button className="maps-button"><MapPin size={14} /> Google Maps <ExternalLink size={12} /></button></div></article>)}</div></section>;
}

function Restaurants({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) { return <section className="fade-in"><div className="eyebrow"><span>YOUR TASTE MAP</span><span className="saved-count"><Heart size={13} /> 0 favori</span></div><div className="page-title-row"><div><span className="section-kicker">LEZZET DURAKLARI</span><h1>Restaurants</h1></div><button className="icon-button light"><Search size={19} /></button></div><p className="intro-copy">Henüz bir restoran seçmedin.<br />En güzel lokmaları birlikte bulalım.</p><div className="filter-scroll">{filters.map((filter) => <button className={activeFilter === filter ? 'filter active' : 'filter'} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="restaurant-empty"><div className="empty-bowl">🍜</div><h2>{activeFilter} için ilk keşfin</h2><p>Buraya eklediğin restoranlar<br />bu şehir rehberinin kalbi olacak.</p><button className="primary-button"><Plus size={16} /> Restoran ekle</button></div><div className="placeholder-list"><div className="skeleton-line wide" /><div className="skeleton-line" /><div className="skeleton-line short" /></div></section>; }

function Suggestions({ suggestions, showModal, setShowModal }: { suggestions: Suggestion[]; showModal: boolean; setShowModal: (show: boolean) => void }) { return <section className="fade-in"><div className="eyebrow"><span>TRAVEL NOTES</span><span className="saved-count"><MessageCircle size={13} /> {suggestions.length} öneri</span></div><div className="page-title-row"><div><span className="section-kicker">BİRLİKTE KEŞFEDİYORUZ</span><h1>Suggestions</h1></div><button className="icon-button light"><Search size={19} /></button></div><p className="intro-copy">Arkadaşlarından gelen küçük<br />ipuçları, büyük keşifler.</p><div className="suggestion-feed">{suggestions.map(({ city, title, note, time }) => <article className="suggestion-card" key={`${title}-${time}`}><div className="suggestion-head"><span className="city-badge">{city}</span><span className="suggestion-time">{time}</span></div><h2>{title}</h2><p>{note}</p><div className="suggestion-foot"><span><span className="mini-avatar">A</span> Ayşe’nin önerisi</span><button className="maps-button">Haritada aç <ExternalLink size={12} /></button></div></article>)}</div><button className="floating-add" onClick={() => setShowModal(true)}><Plus size={21} /><span>Öneri ekle</span></button></section>; }

function SuggestionModal({ onClose, onAdd }: { onClose: () => void; onAdd: (suggestion: Omit<Suggestion, 'time'>) => void }) { const [city, setCity] = useState('Tokyo'); const [title, setTitle] = useState(''); const [note, setNote] = useState(''); const [mapLink, setMapLink] = useState(''); return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="section-kicker">TRAVEL NOTES</span><h2>Bir keşif bırak</h2></div><button className="icon-button light" onClick={onClose}><X size={18} /></button></div><label>Şehir<select value={city} onChange={(e) => setCity(e.target.value)}><option>Tokyo</option><option>Kyoto</option><option>Osaka</option><option>Hakone</option></select></label><label>Başlık<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Örn. Sessiz bir kahve molası" /></label><label>Kısa not<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Neden öneriyorsun?" rows={3} /></label><label>Google Maps linki<input value={mapLink} onChange={(e) => setMapLink(e.target.value)} placeholder="https://maps.google.com/..." /></label><button className="primary-button full" disabled={!title.trim() || !note.trim()} onClick={() => onAdd({ city: city.toUpperCase(), title, note: `${note}${mapLink ? ` · ${mapLink}` : ''}` })}><Check size={16} /> Öneriyi kaydet</button></div></div>; }
