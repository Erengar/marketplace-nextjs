"use client";
import { useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import { CartItemType} from "../../schemas"
import RemoveItemModal from "./RemoveItemModal";
import { motion } from "framer-motion";

export default function CartItems({items, setItems}: {items: CartItemType[], setItems: (items: CartItemType[]) => void}) {
    // This is the state of the item being removed
    const [removingItem, setRemovingItem] = useState<CartItemType | null>(null);

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
            <motion.ul
            className="flex flex-col items-center gap-px divide-y-2 col-span-8 xl:col-span-10"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1}}>
                {items.length === 0 ?
                <h1>Shopping cart is empty</h1>
                : items.length === 1 ?
                <CartProduct key={items[0].product.id} product={items[0]} setRemovingItem={setRemovingItem}/>
                :
                items.map((item) => (
                    <CartProduct key={item.product.id} product={item} setRemovingItem={setRemovingItem}/>
                    ))
                }
            </motion.ul>
            {removingItem ?
            <RemoveItemModal removingItem={removingItem} setRemovingitem={setRemovingItem}/>
            : null}
        </>
    )
}