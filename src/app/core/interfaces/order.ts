import { CartItem } from "./cart-item"

export interface Order {
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    cartItems: CartItem[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
  
}
