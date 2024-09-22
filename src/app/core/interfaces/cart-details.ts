import { CartItem } from "./cart-item";

export interface CartDetails {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    createdAt: Date;
    updatedAt: Date;
    totalCartPrice: number;
}
