import type { ItineraryDay, PlanSection } from '@/types/trip';

const sections = (): ItineraryDay['sections'] => ({
  Timeline: [],
  Food: [],
  Reservations: [],
  Notes: [],
});

const days: Array<[string, string, string, string, string]> = [
  ['14-may', '14 Mayıs', 'Tokyo', 'Shibuya & şehir ışıkları', 'İlk gün, şehri keşfet ve atmosferi hisset.'],
  ['15-may', '15 Mayıs', 'Tokyo', 'Yanaka sabahı & Ghibli', 'Eski Tokyo sokaklarında yavaş bir sabah.'],
  ['16-may', '16 Mayıs', 'Tokyo', 'Asakusa & teamLab', 'Tapınaklar ve ışıkların arasında bir gün.'],
  ['17-may', '17 Mayıs', 'Hakone', 'Ryokan & Onsen', 'Sakinlik, sıcak su ve Fuji manzarası.'],
  ['18-may', '18 Mayıs', 'Kanazawa', 'Bahçeler & altın yaprak', 'Geleneksel Japonya’nın zarif yüzü.'],
  ['19-may', '19 Mayıs', 'Kyoto', 'Gion akşamı', 'Kyoto’nun ilk akşamında taş sokaklar.'],
  ['20-may', '20 Mayıs', 'Kyoto', 'Fushimi Inari & sake', 'Torii kapıları ve akşamın ilk kadehi.'],
  ['21-may', '21 Mayıs', 'Kyoto', 'Arashiyama sabahı', 'Bambu ormanında dingin bir başlangıç.'],
  ['22-may', '22 Mayıs', 'Nara', 'Günübirlik deer walk', 'Nara parkında yavaş ve meraklı bir gün.'],
  ['23-may', '23 Mayıs', 'Uji', 'Matcha & Byodo-in', 'Çayın doğduğu yerde küçük bir mola.'],
  ['24-may', '24 Mayıs', 'Osaka', 'Dotonbori gecesi', 'Neonlar, sokak lezzetleri ve kalabalık.'],
  ['25-may', '25 Mayıs', 'Osaka', 'Universal Studios', 'Bütün günü oyun ve kahkahayla doldur.'],
  ['26-may', '26 Mayıs', 'Tokyo', 'Son alışveriş & veda', 'Dönüşten önce şehirle son buluşma.'],
];

export const itineraryDays: ItineraryDay[] = days.map(([id, date, city, title, subtitle]) => ({ id, date, city, title, subtitle, sections: sections() }));

export const itineraryCities = Array.from(new Set(itineraryDays.map((day) => day.city)));

export function sectionLabel(section: PlanSection) {
  return section;
}
