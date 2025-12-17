// services/location/nominatim.ts
import { api } from '@/libs/api';

export type NominatimPlace = {
  place_id: number;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string; // Nominatim trả string
  lon: string;
  display_name: string;
  type?: string;
  class?: string;
  importance?: number;
  address?: Record<string, string>;
};

export type SearchLocationOptions = {
  q: string;
  limit?: number; // <= 40
  countrycodes?: string; // vd "vn" hoặc "vn,sg"
  language?: string; // vd "vi"
  email?: string; // nên set để nhận diện request (khi nhiều request)
  viewbox?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  bounded?: boolean; // true => filter trong viewbox
  addressdetails?: boolean; // default true
  dedupe?: boolean; // default true
};

export async function searchLocation(
  opts: SearchLocationOptions,
  signal?: AbortSignal
): Promise<NominatimPlace[]> {
  const q = opts.q.trim();
  if (!q) return [];

  const limit = Math.min(Math.max(opts.limit ?? 10, 1), 40); // docs: max 40 :contentReference[oaicite:2]{index=2}

  const params: Record<string, any> = {
    q,
    format: 'jsonv2', // default cũng là jsonv2 :contentReference[oaicite:3]{index=3}
    limit,
    addressdetails: opts.addressdetails === false ? 0 : 1,
    dedupe: opts.dedupe === false ? 0 : 1,
  };

  if (opts.countrycodes) params.countrycodes = opts.countrycodes; // filter theo countrycodes :contentReference[oaicite:4]{index=4}
  if (opts.language) params['accept-language'] = opts.language; // override header nếu muốn :contentReference[oaicite:5]{index=5}
  if (opts.email) params.email = opts.email; // param email trong docs :contentReference[oaicite:6]{index=6}

  if (opts.viewbox) {
    // Nominatim: viewbox = "<x1>,<y1>,<x2>,<y2>" (x=lon, y=lat) :contentReference[oaicite:7]{index=7}
    params.viewbox = opts.viewbox.join(',');
    if (opts.bounded) params.bounded = 1;
  }

  const res = await api.get<NominatimPlace[]>('/search', {
    params,
    signal, // axios hỗ trợ AbortSignal :contentReference[oaicite:8]{index=8}
  });

  return res.data ?? [];
}
