import { PlaceOption } from '@/app/types/common';

export const CITIES: PlaceOption[] = [
  {
    id: 'la',
    primaryText: 'Los Angeles',
    secondaryText: 'United States',
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 'nyc',
    primaryText: 'New York',
    secondaryText: 'United States',
    lat: 40.7128,
    lng: -74.006,
  },
  { id: 'ldn', primaryText: 'London', secondaryText: 'United Kingdom', lat: 51.5072, lng: -0.1276 },
  {
    id: 'sgn',
    primaryText: 'Ho Chi Minh City',
    secondaryText: 'Vietnam',
    lat: 10.8231,
    lng: 106.6297,
  },
  { id: 'hn', primaryText: 'Hanoi', secondaryText: 'Vietnam', lat: 21.0278, lng: 105.8342 },
  { id: 'tok', primaryText: 'Tokyo', secondaryText: 'Japan', lat: 35.6762, lng: 139.6503 },
];

export async function searchCities(q: string): Promise<PlaceOption[]> {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  // giả lập API chậm 200ms
  await new Promise((r) => setTimeout(r, 200));
  return CITIES.filter(
    (c) =>
      c.primaryText.toLowerCase().includes(query) ||
      (c.secondaryText ?? '').toLowerCase().includes(query)
  ).slice(0, 8);
}
