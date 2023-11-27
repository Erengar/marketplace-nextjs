"use client";
import { useState, useEffect } from "react";
import { ProductType } from "../../../schemas";
import Product from "./Product";

export default function Products(props: { category: string }) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)

    async function getProducts(category: string) {
        await fetch(`/api/products/${category}`)
        .then(res => res.json())
        .then(data => {
            setProducts((prev) => prev = data.data)
            })
        .catch(err => console.log(err))
        .finally( () => {
            setLoading((prev) => prev = false);
        })
    }

    useEffect(() => {
        getProducts(props.category)
    }, [props.category])

    return (
        <ul>
            {loading && <p>Loading...</p>}
            {products.map((product: ProductType) => (
            <Product key={product.id} product={product} loading={loading}/>
            ))}
        </ul>
    )
}