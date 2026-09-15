import type { Experience } from '@/types/trip';

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

export const experienceCities = Object.keys(cityExperiences);

export const experiences: Experience[] = experienceCities.flatMap((city) => cityExperiences[city].map((title, index) => ({
  id: `${city.toLowerCase()}-${index}`,
  title,
  city,
  description: ['Şehrin ruhunu yakalayan sakin ve ikonik bir durak.', 'Bir öğleden sonrayı ayırmaya değer, özenle seçilmiş bir deneyim.', 'İlk kez gelenler için zamansız, özel bir rota.'][index % 3],
  image: `https://images.unsplash.com/${photos[index % photos.length]}?auto=format&fit=crop&w=900&q=80`,
})));
