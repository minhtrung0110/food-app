// Một item trong đơn hàng

// CreateOrderDto ở backend
export interface Order {
  id: number
  guestName: string // *
  email: string // *
  phone: string // *
  guestAddress: string // *

  notes?: string | null
  totalPrice?: number

  OrderItem: OrderItem[] // mảng OrderItem

  status?: string // nếu backend dùng enum thì anh thay string = union enum
  deliveryStatus?: string

  userId?: number
  customerId?: number
  createdAt: string
  updatedAt: string

}
export interface OrderItem {
  id: number
  orderId: number
  foodProductId: number
  catalogItemId: number
  badmintonVariantId: number | null
  quantity: number
  price: string
  catalogItem: CatalogItem
}

export interface CatalogItem {
  id: number
  type: string
  name: string
  slug: string
  basePrice: string
  status: string
  isDeleted: number
  createdAt: string
  updatedAt: string
}
