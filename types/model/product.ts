export interface ImageProduct {
  name: string;
  description?: string;
  url: string;
  source?: string;
}

/**
 * Model Food tối thiểu theo response BE (bạn có thể move sang /types/model/food.ts sau)
 */
export interface Food {
  id: number;
  name: string;
  slug: string;
  productTypeId: number;
  type: string;
  description: string;
  basePrice: string; // BE trả dạng "65000.00"
  price: string; // BE trả dạng "95000.00"
  amount: number;
  size: string;
  image: string;
  images: string[];
  status: string;
}
