"use client";
import { ProductType } from "../../schemas";

export default function Product(props: { product: ProductType, loading: boolean }) {
    return (
        <li>
            {props.product.name}
        </li>
    )
}