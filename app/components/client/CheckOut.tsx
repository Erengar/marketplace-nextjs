"use client"
import { useState, useEffect } from "react"
import { CartItemType } from "../../schemas"
import PriceTag from "./PriceTag"

export default function CheckOut({items}: {items: CartItemType[]}) {
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let total = 0
        items.forEach(item => {
            total += item.product.price * item.orderedAmount
        })
        setTotalPrice(total)
    }, [items])

    return (
        <div className="col-span-4 xl:col-span-2 border border-black rounded mr-2 lg:mr-12 flex flex-col">
            <h2 className="self-center font-bold text-sky-900 text-xs sm:text-sm md:text-base line-clamp-1">CheckOut</h2>
            <hr/>
            <ul>
            {items.map(item => (
                <li key={item.product.id} className="flex justify-between text-xs xl:text-sm">
                    <span className="text-sky-950 antialiased font-semibold line-clamp-1">{item.product.name}</span> <span>{item.orderedAmount}x <PriceTag price={item.product.price} inline={true}/></span></li>
                ))}
            </ul>
            <hr />
            <div className="flex justify-between text-xs sm:text-sm md:text-base">
                <span>Total:</span>
                <PriceTag price={totalPrice} inline={true}/>
            </div>
        </div>
    )
}