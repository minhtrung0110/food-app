export interface FoodCategory {
  id: number
  name: string
  slug: string
  parentId: number
  displayOrder: number
  counts: Counts
  children: FoodCategory[]
}

export interface Counts {
  children: number
  primaryProducts: number
  productLinks: number
}
