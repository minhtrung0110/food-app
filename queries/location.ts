import { useQuery } from '@tanstack/react-query';
import { NominatimPlace, SearchLocationOptions } from '@/services/location/nominatim';
import { keepPreviousData } from '@tanstack/query-core';
import { searchLocationPhoton } from '@/services/location/photon';

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
    queryFn: ({ signal }) => searchLocationPhoton({ ...opts, q }, signal),
    enabled: q.length > 2,
    placeholderData: keepPreviousData,
  });
}
