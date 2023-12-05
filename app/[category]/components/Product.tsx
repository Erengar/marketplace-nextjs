"use client";
import { ProductType } from "../../schemas";
import Image from "next/image";
import defaultProduct from "../../../public/defaultProduct.jpg";

export default function Product(props: { product: ProductType, loading: boolean }) {
    return (
        <li className="border-4 border-black border-solid rounded w-80 h-70">
            <Image src={defaultProduct} alt="Product image"/>
            <h2 className="">{props.product.name}</h2>
            <h3 className="">{props.product.price}€</h3>
            {props.product.amount > 0 ?
            <h4 className="">In stock</h4>:
            <h4 className="">Out of stock</h4>
            }
        </li>
    )
}