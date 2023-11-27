export interface CategoryType {
    name: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    amount: number;
    category: CategoryType;
}