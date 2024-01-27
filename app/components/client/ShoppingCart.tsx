"use client"
import CartItems from "./CartItems"
import CheckOut from "./CheckOut"
import { useState } from "react"
import { CartItemType } from "../../schemas"

export default function ShoppingCart(){
    //This is the state of the shopping cart
    const [items, setItems] = useState<CartItemType[]>([]);
    return (
        <section className="mt-5 sm:grid grid-cols-12">
            <CartItems items={items} setItems={setItems}/>
            <CheckOut items={items}/>
        </section>
    )
}