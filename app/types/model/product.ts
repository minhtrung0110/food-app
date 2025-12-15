import type { FormCreateFood } from '@/pages/food/data/schema'

export interface ImageProduct { name: string, description?: string, url: string, source?: string }

/**
 * Payload gửi lên API create food:
 * - Lấy từ FormCreateFood
 * - Bổ sung image + images (đang handle ngoài form)
 */
export type CreateFoodPayload = FormCreateFood & {
  image: string
  images?: string[]
}

/**
 * Model Food tối thiểu theo response BE (bạn có thể move sang /types/model/food.ts sau)
 */
export interface Food {
  id: number
  name: string
  slug: string
  productTypeId: number
  type: string
  description: string
  basePrice: string // BE trả dạng "65000.00"
  price: string // BE trả dạng "95000.00"
  amount: number
  size: string
  image: string
  images: string[]
  status: string
}
