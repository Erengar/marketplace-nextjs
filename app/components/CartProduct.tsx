"use client";
import { ProductType, CartItemType } from "../schemas";
import Image from "next/image";
import defaultProduct from "../../public/defaultProduct.jpg";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CartProduct(props: { product: CartItemType, setRemovingItem: (a : CartItemType | null) => void }) {

    // This function adds the item to the shopping cart
    function addItem(){
        const shoppingCart = localStorage.getItem('shoppingCart')
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : []
        const item = cartItems.find((item: CartItemType) => item.product.id === props.product.product.id)
        if (item) {
            item.orderedAmount += 1
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems))
        window.dispatchEvent(new Event('storage'))
        console.log(localStorage.getItem('shoppingCart'))
    }

    // This function removes the item from the shopping cart
    function removeItem(){
        const shoppingCart = localStorage.getItem('shoppingCart')
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : []
        const item = cartItems.find((item: CartItemType) => item.product.id === props.product.product.id)
        // If the item is the last one in the cart, the modal is opened
        if (item.orderedAmount === 1) {
            props.setRemovingItem(item)
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
        <li className="border-black w-full md:w-4/5 h-30 flex flex-row items-center place-content-between p-2">
            <div className="flex flex-row gap-2 md:gap-6 w-6/12">
                <Image src={defaultProduct} alt="product image" width="100" height="100"/>
                <h2 className="text-sm md:text-lg antialiased font-semibold line-clamp-1 self-center">{props.product.product.name}</h2>
            </div>
            <h3 className="text-xs md:text-base antialiased font-bold text-sky-950">{props.product.product.price}€</h3>
            <div className="flex gap-2 md:gap-6">
                <h3 className="text-xs md:text-base antialiased font-bold text-sky-600 col-span1 self-center">{props.product.orderedAmount}x</h3>
                <div className="flex flex-col bg-slate-200 w-fit rounded border-solid border-black border-2 divide-y-2 divide-black">
                    <button className="antialiased font-semibold hover:bg-slate-400" onClick={addItem}><AddIcon /></button>
                    <button className="antialiased font-semibold hover:bg-slate-400" onClick={removeItem}><RemoveIcon /></button>
                </div>
            </div>
        </li>
    )
}