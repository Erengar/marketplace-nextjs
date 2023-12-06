"use client";
import { useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import {ProductType, CartItemType} from "../../schemas"

export default function ShoppingCartItems() {
    const [items, setItems] = useState<CartItemType[]>([]);
    useEffect(() => {
        const handleStorageChange = () => {
            const shoppingCart = localStorage.getItem('shoppingCart');
            setItems(shoppingCart ? JSON.parse(shoppingCart) : []);
        };
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    return (
        <ul className="flex flex-col items-center gap-px">
            {items.length === 0 ?
            <h1>Shopping cart is empty</h1>
            : items.length === 1 ?
            <CartProduct key={items[0].product.id} product={items[0]}/>
            :
            items.map((item) => (
                <CartProduct key={item.product.id} product={item}/>
                ))
            }
        </ul>
    )
}