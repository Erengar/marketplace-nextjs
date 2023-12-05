"use client";
import { useState, useEffect } from "react";
import Product from "../[category]/components/Product";
import {ProductType} from "../schemas"

export default function ShoppingCartItems() {
    const [items, setItems] = useState<ProductType[]>([]);
    useEffect(() => {
        const shoppingCart = localStorage.getItem('shoppingCart')
        setItems(shoppingCart ? JSON.parse(shoppingCart) : [])
    }, [])

    const emptyCart = () => {
        localStorage.removeItem('shoppingCart')
        setItems([])
    }
    return (
        <div>
            {items.length === 0 ?
            <h1>Shopping cart is empty</h1>
            : items.length === 1 ?
            <Product key={items[0].id} product={items[0]}/>
            :
            items.map((item) => (
                <Product key={item.id} product={item}/>
                ))
            }
            <button onClick={emptyCart}>EMPTY ME</button>
        </div>
    )
}