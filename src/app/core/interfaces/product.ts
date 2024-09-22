import { Brand } from "./brand"
import { Subcategory } from "./subcategory"

export interface Product {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
  }

  interface Category {
    _id: string
    name: string
    slug: string
    image: string
  }
