"use client";
import { useState, useEffect } from "react";
import { ProductType } from "../schemas";
import Product from "./Product";
import LoadingProducts from "./SkeletonProducts";

export default function Products({products}: {products: ProductType[]}) {
    return (
        <ul className="flex gap-3 flex-wrap">
            {products.map((product: ProductType) => (
            <Product key={product.id} product={product}/>
            ))}
        </ul>
    )
}