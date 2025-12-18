// services/location/nominatim.ts
import axios from 'axios';

export type NominatimPlace = {
  place_id: number;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
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
  countrycodes?: string; // "vn" or "vn,sg"
  language?: string; // "vi"
  email?: string;
  viewbox?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  bounded?: boolean;
  addressdetails?: boolean; // default true
  dedupe?: boolean; // default true
};

const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    // Nominatim khuyến nghị client tự định danh để tránh bị chặn
    'User-Agent': 'food-app-demo/1.0 (contact: youremail@example.com)',
  },
});

export async function searchLocation(
  opts: SearchLocationOptions,
  signal?: AbortSignal
): Promise<NominatimPlace[]> {
  const q = (opts.q ?? '').trim();
  if (!q) return [];

  const limit = Math.min(Math.max(opts.limit ?? 10, 1), 40);

  const params: Record<string, any> = {
    q,
    format: 'jsonv2',
    limit,
    addressdetails: opts.addressdetails === false ? 0 : 1,
    dedupe: opts.dedupe === false ? 0 : 1,
  };

  if (opts.countrycodes) params.countrycodes = opts.countrycodes;
  if (opts.language) params['accept-language'] = opts.language;
  if (opts.email) params.email = opts.email;

  if (opts.viewbox) {
    params.viewbox = opts.viewbox.join(',');
    if (opts.bounded) params.bounded = 1;
  }

  try {
    const res = await nominatimApi.get<NominatimPlace[]>('/search', {
      params,
      signal,
    });

    console.log('[Nominatim] status:', res.status, 'len:', res.data?.length);
    return res.data ?? [];
  } catch (e: any) {
    // ignore cancel khi gõ tiếp -> React Query abort request cũ
    if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') {
      console.log('[Nominatim] canceled');
      return [];
    }

    console.log('[Nominatim] ERROR message:', e?.message);
    console.log('[Nominatim] ERROR code:', e?.code);
    console.log('[Nominatim] ERROR url:', e?.config?.baseURL, e?.config?.url);
    console.log('[Nominatim] ERROR params:', e?.config?.params);
    console.log('[Nominatim] ERROR status:', e?.response?.status);
    console.log('[Nominatim] ERROR data:', e?.response?.data);

    throw e;
  }
}
