import { Product } from "./product"

export interface CartItem {
    count: number
    id: string
    product: Product
    price: number
}
