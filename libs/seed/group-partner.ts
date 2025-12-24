import type { ImageSourcePropType } from 'react-native';

export type PartnerStatus = 'open' | 'close';
export type PartnerTab = 'nearby' | 'sales' | 'rate' | 'fast';

export interface GPartner {
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

/** Fields phục vụ UI như ảnh + tab */
export interface PartnerCard extends GPartner {
  cuisines: string[]; // render: Open · Burger · Rice · ...
  ordersCount: number; // Sales tab (sort theo doanh số/đơn)
}

const IMG_SUBWAY = require('@/assets/images/partners/subway.png');
const IMG_TACOBELL = require('@/assets/images/partners/tacobell.png');
const IMG_KFC = require('@/assets/images/partners/kfc.png');
const IMG_JOLIBEE = require('@/assets/images/partners/jolibee.png');
const IMG_BURGERKING = require('@/assets/images/partners/burgerking.png');
const IMG_STARBUCK = require('@/assets/images/partners/starbuck.png');
const IMG_MCDONALD = require('@/assets/images/partners/Mcdoneel.png');
const IMG_PIZZAHUT = require('@/assets/images/partners/pizzahurt.jpg');
export const partnersSampleMore: PartnerCard[] = [
  {
    id: 5,
    name: 'Burger King',
    isVerified: true,
    status: 'open',
    addressLine: '31411 Pepper St',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.8,
    reviewCount: 3560,
    distanceKm: 2.6,
    freeShipping: true,
    deliveryFee: 0,
    etaMin: 16,
    image: IMG_BURGERKING,
    cuisines: ['Burger', 'Rice', 'Spaghetti'],
    ordersCount: 18240,
  },
  {
    id: 6,
    name: "McDonald's",
    isVerified: true,
    status: 'open',
    addressLine: '29001 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.2,
    reviewCount: 5210,
    distanceKm: 0.4,
    freeShipping: false,
    deliveryFee: 1.49,
    etaMin: 14,
    image: IMG_MCDONALD,
    cuisines: ['Fastfood', 'Burger', 'Fries'],
    ordersCount: 25400,
  },
  {
    id: 7,
    name: 'Pizza Hut',
    isVerified: true,
    status: 'open',
    addressLine: '24790 Ortiz Rd',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.4,
    reviewCount: 1980,
    distanceKm: 1.1,
    freeShipping: false,
    deliveryFee: 0.99,
    etaMin: 22,
    image: IMG_PIZZAHUT,
    cuisines: ['Pizza', 'Pasta', 'Wings'],
    ordersCount: 14830,
  },
  {
    id: 8,
    name: "Domino's",
    isVerified: true,
    status: 'open',
    addressLine: '28910 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.6,
    reviewCount: 2760,
    distanceKm: 0.9,
    freeShipping: true,
    deliveryFee: 0,
    etaMin: 19,
    image: IMG_SUBWAY,
    cuisines: ['Pizza', 'Fastfood', 'Pasta'],
    ordersCount: 17320,
  },
  {
    id: 9,
    name: 'Starbucks',
    isVerified: true,
    status: 'open',
    addressLine: '28888 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.7,
    reviewCount: 4420,
    distanceKm: 0.3,
    freeShipping: false,
    deliveryFee: 1.99,
    etaMin: 12,
    image: IMG_STARBUCK,
    cuisines: ['Coffee', 'Tea', 'Bakery'],
    ordersCount: 20950,
  },
  {
    id: 10,
    name: 'Chipotle',
    isVerified: true,
    status: 'close',
    addressLine: '28940 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.5,
    reviewCount: 1680,
    distanceKm: 1.7,
    freeShipping: false,
    deliveryFee: 1.29,
    etaMin: 20,
    image: IMG_KFC,
    cuisines: ['Mexican', 'Bowl', 'Burrito'],
    ordersCount: 13210,
  },
  {
    id: 11,
    name: 'Popeyes',
    isVerified: true,
    status: 'open',
    addressLine: '28955 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.1,
    reviewCount: 3120,
    distanceKm: 2.1,
    freeShipping: true,
    deliveryFee: 0,
    etaMin: 17,
    image: IMG_KFC,
    cuisines: ['Chicken', 'Fastfood', 'Rice'],
    ordersCount: 16540,
  },
  {
    id: 12,
    name: 'Panda Express',
    isVerified: true,
    status: 'open',
    addressLine: '28972 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.3,
    reviewCount: 2870,
    distanceKm: 1.0,
    freeShipping: false,
    deliveryFee: 0.79,
    etaMin: 15,
    image: IMG_JOLIBEE,
    cuisines: ['Chinese', 'Noodles', 'Rice'],
    ordersCount: 15480,
  },
  {
    id: 13,
    name: "Dunkin'",
    isVerified: false,
    status: 'open',
    addressLine: '24810 Ortiz Rd',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.0,
    reviewCount: 980,
    distanceKm: 2.9,
    freeShipping: false,
    deliveryFee: 1.19,
    etaMin: 13,
    image: IMG_SUBWAY,
    cuisines: ['Coffee', 'Donut', 'Bakery'],
    ordersCount: 8450,
  },
  {
    id: 14,
    name: 'Jamba Juice',
    isVerified: true,
    status: 'open',
    addressLine: '28905 Plaza Dr',
    cityStateZip: 'Santa Nella, CA 95322',
    rating: 4.6,
    reviewCount: 1220,
    distanceKm: 0.6,
    freeShipping: false,
    deliveryFee: 0.99,
    etaMin: 11,
    image: IMG_TACOBELL,
    cuisines: ['Smoothie', 'Healthy', 'Juice'],
    ordersCount: 10120,
  },
];
