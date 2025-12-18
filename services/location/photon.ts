// services/location/photon.ts
import axios from 'axios';

export type PhotonOsmType = 'node' | 'way' | 'relation';

export type NominatimPlace = {
  place_id: number;
  osm_type: PhotonOsmType;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type?: string; // Photon: osm_value
  class?: string; // Photon: osm_key
  importance?: number; // Photon demo không có rõ ràng
  address?: Record<string, string>;
};

export type SearchLocationOptions = {
  q: string;
  limit?: number;
  countrycodes?: string; // Photon demo không có filter countrycodes, mình dùng để bias bbox
  language?: string; // Photon demo chỉ hỗ trợ default/en/de/fr
  email?: string; // Photon không dùng
  viewbox?: [number, number, number, number]; // Photon uses bbox=minLon,minLat,maxLon,maxLat
  bounded?: boolean; // Photon không dùng
  addressdetails?: boolean; // Photon không dùng
  dedupe?: boolean; // Photon demo không support -> bỏ
};

// Photon response types
type PhotonFeature = {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] }; // [lon, lat]
  properties: {
    name?: string;

    housenumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    countrycode?: string;

    osm_key?: string;
    osm_value?: string;
    osm_type?: 'N' | 'W' | 'R';
    osm_id?: number;
  };
};

type PhotonResponse = {
  type?: 'FeatureCollection';
  features: PhotonFeature[];
};

// VN bbox (xấp xỉ) để bias kết quả nếu bạn muốn search trong VN
// format: minLon, minLat, maxLon, maxLat
const VN_BBOX: [number, number, number, number] = [102.144, 8.179, 109.464, 23.393];

const photonApi = axios.create({
  baseURL: 'https://photon.komoot.io',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'food-app-demo/1.0 (contact: youremail@example.com)',
  },
});

function mapOsmType(t?: 'N' | 'W' | 'R'): PhotonOsmType {
  if (t === 'W') return 'way';
  if (t === 'R') return 'relation';
  return 'node';
}

function buildDisplayName(p: PhotonFeature['properties']): string {
  const parts: string[] = [];

  if (p.name) parts.push(p.name);

  const streetLine = [p.street, p.housenumber].filter(Boolean).join(' ');
  if (streetLine) parts.push(streetLine);

  if (p.city) parts.push(p.city);
  else if (p.county) parts.push(p.county);

  if (p.state) parts.push(p.state);
  if (p.postcode) parts.push(p.postcode);
  if (p.country) parts.push(p.country);

  return parts.join(', ');
}

function buildAddress(p: PhotonFeature['properties']): Record<string, string> {
  const a: Record<string, string> = {};
  if (p.housenumber) a.housenumber = p.housenumber;
  if (p.street) a.road = p.street;
  if (p.postcode) a.postcode = p.postcode;
  if (p.city) a.city = p.city;
  if (p.county) a.county = p.county;
  if (p.state) a.state = p.state;
  if (p.country) a.country = p.country;
  if (p.countrycode) a.country_code = p.countrycode;
  return a;
}

function normalizePhotonLang(language?: string): string | null {
  const lang = (language ?? '').trim().toLowerCase();

  // Photon demo server (komoot) chỉ support: default, en, de, fr
  if (lang === 'en' || lang === 'de' || lang === 'fr') return lang;

  // mọi thứ khác (vi/ja/zh/...) -> dùng default (bỏ param lang)
  return null;
}

export async function searchLocationPhoton(
  opts: SearchLocationOptions,
  signal?: AbortSignal
): Promise<NominatimPlace[]> {
  const q = (opts.q ?? '').trim();
  if (!q) return [];

  const limit = Math.min(Math.max(opts.limit ?? 10, 1), 50);

  // ✅ Allowed params (theo server trả lỗi của bạn): q, bbox, limit, lang, lon, lat, zoom, layer, ...
  const params: Record<string, any> = {
    q,
    limit,
  };

  // Language: chỉ set khi supported
  const lang = normalizePhotonLang(opts.language);
  if (lang) params.lang = lang;

  // Bias VN: nếu có viewbox thì dùng viewbox user truyền, nếu không mà countrycodes có 'vn' thì set bbox VN
  if (opts.viewbox) {
    params.bbox = opts.viewbox.join(',');
  } else {
    const cc = (opts.countrycodes ?? '').toLowerCase();
    if (
      cc
        .split(',')
        .map((s) => s.trim())
        .includes('vn')
    ) {
      params.bbox = VN_BBOX.join(',');
    }
  }

  try {
    const res = await photonApi.get<PhotonResponse>('/api', { params, signal });

    const features = res.data?.features ?? [];
    const mapped: NominatimPlace[] = features
      .map((f) => {
        const p = f.properties ?? ({} as any);
        const coords = f.geometry?.coordinates;
        if (!coords || coords.length < 2) return null;

        const [lon, lat] = coords;
        if (typeof lon !== 'number' || typeof lat !== 'number') return null;

        const osm_id = Number(p.osm_id ?? 0);
        const place_id = osm_id ? osm_id : Math.floor(Math.random() * 1e12);

        return {
          place_id,
          osm_type: mapOsmType(p.osm_type),
          osm_id,
          lat: String(lat),
          lon: String(lon),
          display_name: buildDisplayName(p),
          class: p.osm_key,
          type: p.osm_value,
          address: buildAddress(p),
        };
      })
      .filter(Boolean) as NominatimPlace[];

    console.log('[Photon] status:', res.status, 'len:', mapped.length);
    return mapped;
  } catch (e: any) {
    // ignore cancel khi gõ tiếp -> React Query abort request cũ
    if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') {
      return [];
    }

    console.log('[Photon] ERROR message:', e?.message);
    console.log('[Photon] ERROR code:', e?.code);
    console.log('[Photon] ERROR url:', e?.config?.baseURL, e?.config?.url);
    console.log('[Photon] ERROR params:', e?.config?.params);
    console.log('[Photon] ERROR status:', e?.response?.status);
    console.log('[Photon] ERROR data:', e?.response?.data);

    throw e;
  }
}
