"use client";
import { ProductType } from "../../schemas";

export default function Product(props: { product: ProductType, loading: boolean }) {
    return (
        <li className="border-4 border-black border-solid rounded w-80 h-80">
            <h2>{props.product.name}</h2>
            <h3>{props.product.price}</h3>
            {props.product.amount > 0 ? <p>In stock</p> : <p>Out of stock</p>}
        </li>
    )
}