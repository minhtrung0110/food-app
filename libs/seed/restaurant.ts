import type { ImageSourcePropType } from 'react-native';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: ImageSourcePropType;
  isFavorite?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface RestaurantDetail {
  id: number;
  name: string;
  isVerified: boolean;
  status: 'open' | 'close';
  addressLine: string;
  rating: number;
  etaMin: number;
  freeShipping: boolean;
  deliveryFee: number;
  promoCode?: string;
  promoSaving?: number;
  coverImage: ImageSourcePropType;
  popularItems: MenuItem[];
  menuSections: MenuSection[];
}

export const restaurantDetailSample: RestaurantDetail = {
  id: 1,
  name: 'Burger King',
  isVerified: true,
  status: 'open',
  addressLine: '1453 W Manchester Ave Los Angeles CA 90047',
  rating: 4.5,
  etaMin: 15,
  freeShipping: true,
  deliveryFee: 0,
  promoCode: 'Total Dish',
  promoSaving: 15,
  coverImage: require('@/assets/images/partners/burgerking.png'),
  popularItems: [
    {
      id: 1,
      name: 'Extreme cheese whopper JR',
      price: 5.99,
      category: 'Burger',
      image: require('@/assets/images/products/burger.png'),
    },
    {
      id: 2,
      name: 'Singles BBQ bacon cheese burger',
      price: 7.99,
      category: 'Burger',
      image: require('@/assets/images/products/hamburger.png'),
    },
    {
      id: 3,
      name: 'Potato chip Burger cheese',
      price: 3.99,
      category: 'Coffee',
      image: require('@/assets/images/products/burger.png'),
    },
  ],
  menuSections: [
    {
      id: 'hot-burger-combo',
      title: 'Hot Burger Combo',
      items: [
        {
          id: 10,
          name: 'Combo spicy tender',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/burger.png'),
          isFavorite: true,
        },
        {
          id: 11,
          name: 'Combo Tender Grill Burger',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/hamburger.png'),
        },
        {
          id: 12,
          name: 'Combo BBQ Bacon Cheese Burger',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/burger.png'),
        },
      ],
    },
    {
      id: 'fried-chicken',
      title: 'Fried Chicken',
      items: [
        {
          id: 20,
          name: 'Chicken BBQ',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/fried-chicken.png'),
        },
        {
          id: 21,
          name: 'Combo Chicken Crispy 3pcs',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/fried-chicken.png'),
        },
        {
          id: 22,
          name: 'Combo BBQ Bacon Cheese Burger',
          price: 10.15,
          category: 'Burger combo',
          image: require('@/assets/images/products/burger.png'),
          isFavorite: true,
        },
      ],
    },
  ],
};
