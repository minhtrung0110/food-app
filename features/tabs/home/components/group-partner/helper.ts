import { PartnerCard, PartnerTab } from '@/libs/seed/group-partner';

/** Helper: sort theo tab (y như UI trên) */
export const sortPartnersByTab = (tab: PartnerTab, list: PartnerCard[]) => {
  const arr = [...list];

  // ưu tiên open lên trước (tuỳ bạn bỏ nếu không cần)
  arr.sort((a, b) => (a.status === b.status ? 0 : a.status === 'open' ? -1 : 1));

  const cmp = (x: PartnerCard, y: PartnerCard) => {
    switch (tab) {
      case 'nearby':
        return x.distanceKm - y.distanceKm;
      case 'rate':
        return y.rating - x.rating || y.reviewCount - x.reviewCount;
      case 'fast':
        return x.etaMin - y.etaMin;
      case 'sales':
        return y.ordersCount - x.ordersCount;
      default:
        return 0;
    }
  };

  return arr.sort(cmp);
};
