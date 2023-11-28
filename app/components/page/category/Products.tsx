"use client";
import { useState, useEffect } from "react";
import { ProductType } from "../../../schemas";
import Product from "./Product";

export default function Products({params} : {params : { category : string }} | any) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)

    console.log('RENDERING UP')
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

    useEffect(() => {
        console.log('RENDERING DOWN')
        getProducts(params.category)
    },[params.category])

    return (
        <ul>
            {loading && <p>Loading...</p>}
            {products.map((product: ProductType) => (
            <Product key={product.id} product={product} loading={loading}/>
            ))}
        </ul>
    )
}