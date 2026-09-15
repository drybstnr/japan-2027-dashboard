import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
  const query = request.nextUrl.searchParams.get('q')?.trim();
  if (!apiKey) return NextResponse.json({ configured: false, suggestions: [] }, { status: 503 });
  if (!query) return NextResponse.json({ configured: true, suggestions: [] });
  const params = new URLSearchParams({ query, near: 'Japan', categories: '13065,13032,13035', limit: '5', fields: 'fsq_id,name,location' });
  const response = await fetch(`https://places-api.foursquare.com/places/search?${params}`, { headers: { Authorization: apiKey, 'X-Places-Api-Version': '2025-06-17', Accept: 'application/json' }, cache: 'no-store' });
  if (!response.ok) {
    const details = await response.json().catch(() => null);
    return NextResponse.json({ configured: true, message: details?.message ?? 'Foursquare Places suggestions failed.' }, { status: response.status });
  }
  const data = await response.json();
  return NextResponse.json({ configured: true, suggestions: (data.results ?? []).map((item: { fsq_id: string; name: string; location?: { formatted_address?: string } }) => ({ placeId: item.fsq_id, name: item.name, secondaryText: item.location?.formatted_address })).filter((item: { placeId?: string }) => item.placeId) });
}
