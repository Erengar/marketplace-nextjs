"use client";
import { CartItemType } from "../../schemas";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SetImage from "./SetImage";
import { useState } from "react";
import PriceTag from "./PriceTag";

export default function CartProduct({product, setRemovingItem}: { product: CartItemType, setRemovingItem: (a : CartItemType | null) => void }) {
    const [buttonAddPressed, setButtonAddPressed] = useState(false)
    const [buttonRemovePressed, setButtonRemovePressed] = useState(false)

    // This function adds the item to the shopping cart
    async function addItem(){
        //This is to add a little animation to the button
        setButtonAddPressed(true)
        setTimeout(() => setButtonAddPressed(false), 100)

        const shoppingCart = localStorage.getItem('shoppingCart')
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : []
        const item = cartItems.find((item: CartItemType) => item.product.id === product.product.id)
        if (item) {
            item.orderedAmount += 1
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems))
        window.dispatchEvent(new Event('storage'))
    }

    // This function removes the item from the shopping cart
    async function removeItem(){
        //This is to add a little animation to the button
        setButtonRemovePressed(true)
        setTimeout(() => setButtonRemovePressed(false), 100)

        const shoppingCart = localStorage.getItem('shoppingCart')
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : []
        const item = cartItems.find((item: CartItemType) => item.product.id === product.product.id)
        // If the item is the last one in the cart, the modal is opened
        if (item.orderedAmount === 1) {
            setRemovingItem(item)
        } else {
            if (item) {
                item.orderedAmount -= 1
            }
            if (item.orderedAmount === 0) {
                const index = cartItems.indexOf(item)
                cartItems.splice(index, 1)
            }
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems))
            window.dispatchEvent(new Event('storage'))
        }
    }
    return (
        <li className="border-black w-full xl:w-4/5 h-30 flex flex-row items-center place-content-between p-2">
            <div className="flex flex-row gap-2 md:gap-6 w-6/12">
                <SetImage uuid={product.product.image!} name={product.product.name} width={100} height={100} crop={true}/>
                <h2 className="text-sm md:text-lg antialiased font-semibold line-clamp-1 self-center">{product.product.name}</h2>
            </div>
            <PriceTag price={product.product.price} className="text-xs md:text-base font-bold text-sky-950"/>
            <div className="flex gap-2 md:gap-6">
                <h3 className="text-xs md:text-base antialiased font-bold text-sky-600 col-span1 self-center">{product.orderedAmount}x</h3>
                <div className="flex flex-col bg-slate-200 w-fit rounded border-solid border-black border-2 divide-y-2 divide-black">
                    <button className={`antialiased font-semibold hover:bg-slate-400 shadow-black ${buttonAddPressed? "shadow-inner" : "shadow-none"}`} onClick={addItem}><AddIcon /></button>
                    <button className={`antialiased font-semibold hover:bg-slate-400 shadow-black ${buttonRemovePressed? "shadow-inner" : "shadow-none"}`} onClick={removeItem}><RemoveIcon /></button>
                </div>
            </div>
        </li>
    )
}