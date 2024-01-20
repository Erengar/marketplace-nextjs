import { ProductType } from '../db/schema';

export interface CartItemType {
    product: ProductType;
    orderedAmount: number;
}