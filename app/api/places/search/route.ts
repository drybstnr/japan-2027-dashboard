import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
  const query = request.nextUrl.searchParams.get('q')?.trim();
  if (!apiKey) return NextResponse.json({ configured: false, places: [] }, { status: 503 });
  if (!query) return NextResponse.json({ configured: true, places: [] });

  const params = new URLSearchParams({ query, near: 'Japan', categories: '13065,13032,13035', limit: '10', fields: 'fsq_id,name,categories,location,geocodes,rating,hours,photos,website,tel' });
  const response = await fetch(`https://places-api.foursquare.com/places/search?${params}`, {
    headers: { Authorization: apiKey, 'X-Places-Api-Version': '2025-06-17', Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    const details = await response.json().catch(() => null);
    return NextResponse.json({ configured: true, message: details?.message ?? 'Foursquare Places search failed.' }, { status: response.status });
  }
  return NextResponse.json({ configured: true, places: (await response.json()).results ?? [] });
}
