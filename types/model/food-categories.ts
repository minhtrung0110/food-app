export interface FoodCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  parentId: number;
  displayOrder: number;
  counts: Counts;
  children: FoodCategory[];
}

export interface Counts {
  children: number;
  primaryProducts: number;
  productLinks: number;
}
