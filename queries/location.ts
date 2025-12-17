import { useQuery } from '@tanstack/react-query';
import {
  NominatimPlace,
  searchLocation,
  SearchLocationOptions,
} from '@/services/location/nominatim';

export function useSearchLocation(opts: SearchLocationOptions) {
  const q = (opts.q ?? '').trim();

  return useQuery<NominatimPlace[]>({
    queryKey: [
      'nominatim-search',
      q,
      opts.limit ?? 10,
      opts.countrycodes ?? '',
      opts.language ?? '',
      opts.email ?? '',
      opts.viewbox?.join(',') ?? '',
      opts.bounded ? 1 : 0,
      opts.addressdetails === false ? 0 : 1,
      opts.dedupe === false ? 0 : 1,
    ],
    queryFn: ({ signal }) => searchLocation({ ...opts, q }, signal),
    enabled: q.length > 0, // không search khi rỗng
    staleTime: 30_000, // basic: cache 30s (tuỳ bạn)
    gcTime: 5 * 60_000, // basic: giữ cache 5 phút (tuỳ bạn)
    retry: 0, // search thường không retry (tuỳ bạn)
  });
}
