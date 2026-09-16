export type StoreFilter = 'All' | '7-Eleven' | 'Lawson' | 'FamilyMart' | 'Drug Store';

export type SurvivalProduct = {
  name: string;
  price: string;
  store: StoreFilter;
  image: string;
};

export type EmergencyCategory = {
  id: string;
  icon: string;
  title: string;
  explanation: string;
  products: SurvivalProduct[];
};

export const storeFilters: StoreFilter[] = ['All', '7-Eleven', 'Lawson', 'FamilyMart', 'Drug Store'];

export const emergencyCategories: EmergencyCategory[] = [
  {
    id: 'jet-lag', icon: '😴', title: 'Jet Lag', explanation: 'Start with hydration, a little sugar and something cold before you try to power through.',
    products: [
      { name: 'Pocari Sweat', price: '¥180', store: '7-Eleven', image: '/images/convenience/pocari-sweat.jpg' },
      { name: 'Coolish', price: '¥190', store: 'Lawson', image: '/images/convenience/coolish.jpg' },
      { name: 'Vitamin Jelly Drink', price: '¥240', store: 'FamilyMart', image: '/images/convenience/vitamin-jelly.jpg' },
    ],
  },
  {
    id: 'feet-legs', icon: '🚶', title: 'Feet & Legs Hurt', explanation: 'A quick cooling reset for the moment your itinerary starts to feel ambitious.',
    products: [
      { name: 'Kyusoku Jikan Cooling Sheets', price: '¥550', store: 'Drug Store', image: '/images/convenience/kyusoku-jikan.jpg' },
      { name: 'Salonpas', price: '¥650', store: 'Drug Store', image: '/images/convenience/salonpas.jpg' },
    ],
  },
  {
    id: 'stomach', icon: '🤢', title: 'Upset Stomach', explanation: 'Keep it plain, gentle and close by until your stomach is ready for the next discovery.',
    products: [
      { name: "Ohta's Isan", price: '¥990', store: 'Drug Store', image: '/images/convenience/ohtas-isan.jpg' },
      { name: 'Plain Onigiri', price: '¥150', store: '7-Eleven', image: '/images/convenience/egg-sandwich.jpg' },
    ],
  },
  {
    id: 'sick', icon: '😷', title: 'Getting Sick', explanation: 'Warmth, hydration and a quiet room are the best first moves when a cold is coming on.',
    products: [
      { name: 'Ryukakusan', price: '¥780', store: 'Drug Store', image: '/images/convenience/ryukakusan.jpg' },
      { name: 'Rohto Eye Drops', price: '¥780', store: 'Drug Store', image: '/images/convenience/rohto-eye-drops.jpg' },
    ],
  },
  {
    id: 'bathroom', icon: '🚽', title: 'Emergency Bathroom Kit', explanation: 'A tiny kit that keeps unexpected station, train or street moments feeling manageable.',
    products: [
      { name: 'Pocket Tissues', price: '¥110', store: '7-Eleven', image: '/images/convenience/pocket-tissues.jpg' },
      { name: 'Wet Wipes', price: '¥220', store: 'FamilyMart', image: '/images/convenience/wet-wipes.jpg' },
      { name: 'Portable Hand Sanitizer', price: '¥330', store: 'Lawson', image: '/images/convenience/wet-wipes.jpg' },
    ],
  },
];

export const firstBasket = [
  { id: 'pocari-sweat', name: 'Pocari Sweat', price: 180, image: '/images/convenience/pocari-sweat.jpg', store: '7-Eleven' },
  { id: 'egg-sandwich', name: 'Egg Sandwich', price: 260, image: '/images/convenience/egg-sandwich.jpg', store: '7-Eleven' },
  { id: 'coolish', name: 'Coolish', price: 190, image: '/images/convenience/coolish.jpg', store: 'Lawson' },
  { id: 'pocket-tissues', name: 'Pocket Tissues', price: 110, image: '/images/convenience/pocket-tissues.jpg', store: '7-Eleven' },
  { id: 'wet-wipes', name: 'Wet Wipes', price: 170, image: '/images/convenience/wet-wipes.jpg', store: 'FamilyMart' },
];