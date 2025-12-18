import type { ImageSourcePropType } from 'react-native';

export type PartnerStatus = 'open' | 'close';

export interface Partner {
  id: number;
  name: string;
  isVerified: boolean;
  status: PartnerStatus;

  // Location
  addressLine: string;
  cityStateZip: string;

  // Metrics
  rating: number; // 0..5
  reviewCount: number;
  distanceKm: number;

  // Delivery
  freeShipping: boolean;
  deliveryFee: number; // 0 if freeShipping
  etaMin: number;

  // Media (local asset)
  image: ImageSourcePropType;
}

export const partnersSample: Partner[] = [
  {
    id: 1,
    name: 'Subway',
    isVerified: true,
    status: 'open',
    addressLine: '24820 Ortiz Rd',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.5,
    reviewCount: 1280,
    distanceKm: 1.5,
    freeShipping: true,
    deliveryFee: 0,
    etaMin: 25,
    image: require('@/assets/images/partners/subway.png'),
  },
  {
    id: 2,
    name: 'Taco Bell',
    isVerified: true,
    status: 'close',
    addressLine: '28970 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.5,
    reviewCount: 940,
    distanceKm: 0.2,
    freeShipping: false,
    deliveryFee: 1.99,
    etaMin: 20,
    image: require('@/assets/images/partners/tacobell.png'),
  },
  // {
  //   id: 3,
  //   name: "McDonald's",
  //   isVerified: true,
  //   status: 'open',
  //   addressLine: '28945 Plaza Dr',
  //   cityStateZip: 'Santa Nella, CA 95322',
  //   rating: 4.3,
  //   reviewCount: 2100,
  //   distanceKm: 0.8,
  //   freeShipping: false,
  //   deliveryFee: 0.99,
  //   etaMin: 18,
  //   image: require('@/assets/images/partners/mcdonalds.png'),
  // },
  // {
  //   id: 4,
  //   name: 'Starbucks',
  //   isVerified: true,
  //   status: 'open',
  //   addressLine: '28970 Plaza Dr',
  //   cityStateZip: 'Santa Nella, CA 95322',
  //   rating: 4.6,
  //   reviewCount: 1560,
  //   distanceKm: 1.2,
  //   freeShipping: true,
  //   deliveryFee: 0,
  //   etaMin: 15,
  //   image: require('@/assets/images/partners/starbucks.png'),
  // },
];
