"use client";
import { ProductType } from "../../schemas";
import Image from "next/image";
import defaultProduct from "../../../public/defaultProduct.jpg";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Product(props: { product: ProductType}) {
    const addItem = () => {
        const shoppingCart = localStorage.getItem('shoppingCart')
        if (shoppingCart) {
            const shoppingCartItems = [JSON.parse(shoppingCart)]
            shoppingCartItems.push(props.product)
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems))
        } else {
            localStorage.setItem('shoppingCart', JSON.stringify([props.product]))
        }
    }
    return (
        <li className="border-4 border-black border-solid rounded w-80 h-70">
            <Image src={defaultProduct} alt="Product image"/>
            <h2 className="text-lg antialiased font-semibold line-clamp-1">{props.product.name}</h2>
            <h3 className="text-base antialiased font-bold text-red-600">{props.product.price}€</h3>
            <div>
                <button onClick={addItem}>
                    <AddShoppingCartIcon className="text-lime-600"/>
                </button>
                <h4 className="text-xs antialised font-normal">
                {props.product.amount > 0 ?
                "In stock":
                "Out of stock"
                }
                </h4>
            </div>
        </li>
    )
}