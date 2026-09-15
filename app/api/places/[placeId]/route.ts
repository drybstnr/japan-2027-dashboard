import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ placeId: string }> }) {
  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
  if (!apiKey) return NextResponse.json({ configured: false }, { status: 503 });
  const { placeId } = await params;
  const fields = 'fsq_id,name,categories,location,geocodes,rating,hours,photos,website,tel';
  const response = await fetch(`https://places-api.foursquare.com/places/${encodeURIComponent(placeId)}?fields=${fields}`, { headers: { Authorization: apiKey, 'X-Places-Api-Version': '2025-06-17', Accept: 'application/json' }, cache: 'no-store' });
  if (!response.ok) return NextResponse.json({ configured: true, message: 'Foursquare place details failed.' }, { status: response.status });
  return NextResponse.json({ configured: true, place: await response.json() });
}
