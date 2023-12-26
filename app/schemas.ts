export interface CategoryType {
    name: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    amount: number;
    image: string;
    description: string;
    category: string;
}

export interface CartItemType {
    product: ProductType;
    orderedAmount: number;
}