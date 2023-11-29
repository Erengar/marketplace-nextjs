"use client";
import { useState, useEffect, useCallback } from "react";
import { ProductType } from "../../schemas";
import Product from "./Product";

export default function Products(props: { category: string }) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        async function getProducts(category: string) {
            await fetch(`/api/products/${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data)
                })
            .catch(err => console.log(err))
            .finally( () => {
                setLoading(false);
            })
        }

        getProducts(props.category);
    },[props.category]);

    return (
        <ul>
            {loading && <p>Loading...</p>}
            {products.map((product: ProductType) => (
            <Product key={product.id} product={product} loading={loading}/>
            ))}
        </ul>
    )
}