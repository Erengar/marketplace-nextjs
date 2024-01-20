"use client";
import { type ProductType } from "@/db/schema";
import Product from "./Product";

export default function Products({products}: {products: ProductType[]}) {
    return (
        <ul className="flex gap-3 flex-wrap">
            {products.map((product: ProductType) => (
            <Product key={product.id} product={product}/>
            ))}
        </ul>
    )
}