'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSun, LoaderCircle, Sun } from 'lucide-react';

const locations: Record<string, { latitude: number; longitude: number }> = {
  Tokyo: { latitude: 35.6762, longitude: 139.6503 }, Hakone: { latitude: 35.2324, longitude: 139.1069 }, Kanazawa: { latitude: 36.5613, longitude: 136.6562 }, Kyoto: { latitude: 35.0116, longitude: 135.7681 }, Nara: { latitude: 34.6851, longitude: 135.8048 }, Uji: { latitude: 34.8846, longitude: 135.7999 }, Osaka: { latitude: 34.6937, longitude: 135.5023 },
};

type Weather = { temperature: number; high: number; low: number; code: number };
const weatherCache = new Map<string, { expiresAt: number; value: Weather }>();
const conditionLabels: Record<number, string> = { 0: 'Açık gökyüzü', 1: 'Çoğunlukla açık', 2: 'Parçalı bulutlu', 3: 'Kapalı', 45: 'Sisli', 48: 'Kırağılı sis', 51: 'Hafif çisenti', 61: 'Hafif yağmur', 63: 'Yağmur', 65: 'Kuvvetli yağmur', 71: 'Hafif kar', 80: 'Sağanak', 95: 'Fırtına' };
function weatherIcon(code: number) { if (code === 0) return Sun; if (code <= 3) return CloudSun; if (code >= 51) return CloudRain; return Cloud; }
function conditionLabel(code: number) { return conditionLabels[code] ?? 'Değişken hava'; }

export function WeatherCard({ city }: { city: string }) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const cached = weatherCache.get(city); if (cached && cached.expiresAt > Date.now()) { setWeather(cached.value); setLoading(false); return; } const location = locations[city] ?? locations.Tokyo; const controller = new AbortController(); setLoading(true); fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`, { signal: controller.signal }).then((response) => response.json()).then((data) => { const value = { temperature: Math.round(data.current.temperature_2m), high: Math.round(data.daily.temperature_2m_max[0]), low: Math.round(data.daily.temperature_2m_min[0]), code: data.current.weather_code }; weatherCache.set(city, { expiresAt: Date.now() + 60 * 60 * 1000, value }); setWeather(value); }).catch(() => setWeather(null)).finally(() => setLoading(false)); return () => controller.abort(); }, [city]);
  const Icon = weather ? weatherIcon(weather.code) : CloudSun;
  return <section className="rounded-[24px] bg-[#e6eee3] p-5 shadow-[0_10px_30px_rgba(70,85,68,.07)]"><div className="flex items-start justify-between"><div><span className="section-kicker">TODAY&apos;S WEATHER</span><h2 className="mt-1 font-[var(--font-manrope)] text-lg font-semibold tracking-[-.04em]">{city}</h2></div><Icon className="text-[#7A9278]" size={28} /></div><div className="mt-5 flex items-end justify-between"><div>{loading ? <LoaderCircle className="animate-spin text-[#7A9278]" size={30} /> : <strong className="font-[var(--font-manrope)] text-5xl font-semibold tracking-[-.08em]">{weather?.temperature ?? '--'}°</strong>}<span className="ml-2 text-xs text-[#687864]">şu an</span></div><div className="text-right text-[11px] leading-relaxed text-[#687864]"><strong className="block text-sm text-[#3f513c]">{weather ? conditionLabel(weather.code) : 'Veri bekleniyor'}</strong><span>H {weather?.high ?? '--'}° · L {weather?.low ?? '--'}°</span></div></div></section>;
}
