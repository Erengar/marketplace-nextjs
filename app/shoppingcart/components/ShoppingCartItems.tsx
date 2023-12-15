"use client";
import { useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import {ProductType, CartItemType} from "../../schemas"
import { Remove } from "@mui/icons-material";
import RemoveItemModal from "./RemoveItemModal";

export default function ShoppingCartItems() {
    // This is the state of the shopping cart
    const [items, setItems] = useState<CartItemType[]>([]);
    // This is the state of the item being removed
    const [removingItem, setRemovingItem] = useState(null as CartItemType | null);

    useEffect(() => {
        // This function is called whenever the shopping cart is updated
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
        <>
            <ul className="flex flex-col items-center gap-px divide-y-2">
                {items.length === 0 ?
                <h1>Shopping cart is empty</h1>
                : items.length === 1 ?
                <CartProduct key={items[0].product.id} product={items[0]} setRemovingItem={setRemovingItem}/>
                :
                items.map((item) => (
                    <CartProduct key={item.product.id} product={item} setRemovingItem={setRemovingItem}/>
                    ))
                }
            </ul>
            {removingItem ?
            <RemoveItemModal removingItem={removingItem} setRemovingitem={setRemovingItem}/>
            : null}
        </>
    )
}