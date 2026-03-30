import type { ImageSourcePropType } from 'react-native';
import { partnersSample } from './partner';

export type OrderStatus = 'ongoing' | 'delivered' | 'cancelled';

export interface Order {
  id: number;
  restaurantName: string;
  isVerified: boolean;
  address: string;
  price: number;
  itemCount: number;
  status: OrderStatus;
  category: string;
  image: ImageSourcePropType;
}

const MOCK_META: Pick<Order, 'price' | 'itemCount' | 'status' | 'category'>[] = [
  { price: 40, itemCount: 2, status: 'delivered', category: 'Drink' },
  { price: 25, itemCount: 1, status: 'delivered', category: 'Food' },
  { price: 55, itemCount: 3, status: 'delivered', category: 'Food' },
  { price: 18, itemCount: 1, status: 'ongoing', category: 'Drink' },
  { price: 30, itemCount: 2, status: 'ongoing', category: 'Food' },
];

export const ordersSample: Order[] = partnersSample.slice(0, 5).map((p, i) => ({
  id: p.id,
  restaurantName: p.name,
  isVerified: p.isVerified,
  address: `${p.addressLine}, ${p.cityStateZip}`,
  image: p.image,
  ...MOCK_META[i],
}));
