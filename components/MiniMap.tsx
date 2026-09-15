import type { Place } from '@/types/place';

export function MiniMap({ place }: { place: Place }) {
  const { latitude, longitude } = place.coordinates;
  const delta = 0.012;
  const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  return <div className="mini-map"><iframe title={`${place.name} map`} src={src} loading="lazy" /></div>;
}
