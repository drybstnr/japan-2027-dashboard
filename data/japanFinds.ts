export type FindCategory = 'Viral' | 'Beauty' | 'Wellness' | 'Konbini' | 'Food' | 'Gifts' | 'Budget';

export type JapanFind = {
  id: string;
  name: string;
  store: string;
  price: string;
  reason: string;
  category: FindCategory;
  section: string;
  visual: string;
  accent: string;
};

export const findCategories: Array<{ label: string; value: FindCategory }> = [
  { label: '🔥 Viral', value: 'Viral' },
  { label: '💄 Beauty', value: 'Beauty' },
  { label: '💊 Wellness', value: 'Wellness' },
  { label: '🏪 Konbini', value: 'Konbini' },
  { label: '🍜 Food', value: 'Food' },
  { label: '🎁 Gifts', value: 'Gifts' },
  { label: '💰 Budget', value: 'Budget' },
];

export const japanFinds: JapanFind[] = [
  { id: 'melano-cc', name: 'Melano CC', store: 'Matsumoto Kiyoshi', price: '¥1,180', reason: 'The brightening vitamin C serum that keeps selling out.', category: 'Beauty', section: 'Beauty Finds', visual: 'CC', accent: '#f5c9a4' },
  { id: 'fino-hair-mask', name: 'Fino Hair Mask', store: 'Don Quijote', price: '¥980', reason: 'A glossy, salon-feel reset for travel-tired hair.', category: 'Beauty', section: 'Beauty Finds', visual: 'F', accent: '#e8b9c4' },
  { id: 'biore-uv', name: 'Biore UV Aqua Rich', store: 'Matsumoto Kiyoshi', price: '¥890', reason: 'Weightless daily SPF that disappears under makeup.', category: 'Beauty', section: 'Beauty Finds', visual: 'UV', accent: '#b8d6e9' },
  { id: 'keana-rice-mask', name: 'Keana Nadeshiko Rice Mask', store: 'Loft', price: '¥760', reason: 'A cult-favorite sheet mask for a calm, hydrated glow.', category: 'Beauty', section: 'Beauty Finds', visual: '米', accent: '#ddd0b4' },
  { id: 'kyusoku-jikan', name: 'Kyusoku Jikan', store: 'Don Quijote', price: '¥550', reason: 'Cooling leg sheets for the first night after a long flight.', category: 'Wellness', section: 'Wellness & Jet Lag Kit', visual: '休', accent: '#b8d7cf' },
  { id: 'rohto-eye-drops', name: 'Rohto Eye Drops', store: 'Matsumoto Kiyoshi', price: '¥780', reason: 'Tiny, refreshing relief when jet lag meets dry cabin air.', category: 'Wellness', section: 'Wellness & Jet Lag Kit', visual: 'R', accent: '#b4c9e5' },
  { id: 'salonpas', name: 'Salonpas', store: 'Matsumoto Kiyoshi', price: '¥650', reason: 'Your feet will thank you after day one of 20,000 steps.', category: 'Wellness', section: 'Wellness & Jet Lag Kit', visual: 'S', accent: '#d7c2af' },
  { id: 'ohta-isan', name: "Ohta's Isan", store: 'Don Quijote', price: '¥990', reason: 'A classic stomach-soothing essential for ambitious food days.', category: 'Wellness', section: 'Wellness & Jet Lag Kit', visual: '胃', accent: '#e3c8a6' },
  { id: 'egg-sandwich', name: 'Egg Sandwich', store: '7-Eleven', price: '¥260', reason: 'First stop after landing. Soft, savory, completely iconic.', category: 'Konbini', section: 'Konbini Must-Try', visual: '🥪', accent: '#f1d49a' },
  { id: 'famichiki', name: 'Famichiki', store: 'FamilyMart', price: '¥240', reason: 'The hot counter classic that deserves its own arrival ritual.', category: 'Konbini', section: 'Konbini Must-Try', visual: '🍗', accent: '#e9b17e' },
  { id: 'coolish', name: 'Coolish', store: 'Lawson', price: '¥190', reason: 'A squeezable ice cream for train platforms and sunny detours.', category: 'Konbini', section: 'Konbini Must-Try', visual: '🍦', accent: '#c4ddec' },
  { id: 'onigiri', name: 'Onigiri', store: '7-Eleven', price: '¥150', reason: 'The perfect pocket-sized breakfast before the first train.', category: 'Konbini', section: 'Konbini Must-Try', visual: '🍙', accent: '#c8d9ba' },
  { id: 'matcha-kitkat', name: 'Matcha KitKat', store: 'Don Quijote', price: '¥420', reason: 'The edible souvenir that always makes it home intact.', category: 'Food', section: 'Food Finds', visual: '抹茶', accent: '#b8ce9f' },
  { id: 'jagarico', name: 'Jagarico', store: 'FamilyMart', price: '¥180', reason: 'Crunchy, salty, and ideal for late-night hotel snacking.', category: 'Food', section: 'Food Finds', visual: 'J', accent: '#e7bd82' },
  { id: 'tokyo-banana', name: 'Tokyo Banana', store: 'Tokyo Station', price: '¥648', reason: 'A soft, cheerful gift with a very short waiting list.', category: 'Food', section: 'Food Finds', visual: '🍌', accent: '#f0d68f' },
  { id: 'instant-ramen', name: 'Premium Instant Ramen', store: 'Lawson', price: '¥398', reason: 'A surprisingly good final-night dinner in a paper bowl.', category: 'Food', section: 'Food Finds', visual: '🍜', accent: '#e2a58e' },
  { id: 'chopsticks', name: 'Travel Chopsticks', store: 'Daiso', price: '¥110', reason: 'A small, useful souvenir that makes every desk lunch better.', category: 'Gifts', section: 'Gifts Under ¥1,000', visual: '箸', accent: '#c99d7a' },
  { id: 'stationery', name: 'Japanese Stationery', store: 'Seria', price: '¥110', reason: 'The kind of pen you buy once and immediately wish you bought five.', category: 'Gifts', section: 'Gifts Under ¥1,000', visual: '✎', accent: '#bdc7dc' },
  { id: 'washi-tape', name: 'Washi Tape', store: 'Loft', price: '¥330', reason: 'Pretty, packable, and made for the friend who journals.', category: 'Gifts', section: 'Gifts Under ¥1,000', visual: '和', accent: '#e2b2b0' },
  { id: 'mini-towels', name: 'Mini Towels', store: 'Daiso', price: '¥220', reason: 'The charmingly practical Japanese gift everyone can use.', category: 'Gifts', section: 'Gifts Under ¥1,000', visual: '今治', accent: '#b6d2d0' },
];

export const shoppingSpots = [
  { name: 'Don Quijote', note: 'The everything store for late-night discovery.', mark: '驚' },
  { name: 'Matsumoto Kiyoshi', note: 'Beauty, wellness and drugstore essentials.', mark: 'M' },
  { name: 'Daiso', note: 'Smart little finds, almost all for ¥110.', mark: 'D' },
  { name: 'Seria', note: 'Design-forward stationery and home goods.', mark: 'S' },
  { name: 'GU', note: 'Easy Japanese basics with a trend-aware edge.', mark: 'GU' },
  { name: 'Uniqlo', note: 'Reliable layers and travel-ready essentials.', mark: 'U' },
];