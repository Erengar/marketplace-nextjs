"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItemType } from "../../schemas";
import Cart from "@/helperfunctions/cart/cart";

export default function ShoppingCartBuble() {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [addingItem, setAddingItem] = useState<boolean>(true);
    useEffect(() => {
        const handleStorageChange = () => {
            const cart = new Cart();
            setItems(cart.getProducts());
        };
        handleStorageChange();
        window.addEventListener("storage", handleStorageChange);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        let tempTotal = 0;
        for (let i = 0; i < items.length; i++) {
            tempTotal += items[i].orderedAmount;
        }
        // If the total amount of items in the cart increases, the animation is triggered
        if (tempTotal > total) {
            setAddingItem(true);
        } else {
            setAddingItem(false);
        }
        setTotal(tempTotal);
    }, [items]);

    return (
        <AnimatePresence>
            {total > 0 ? (
                <motion.div
                    className="text-xxs text-semibold absolute left-12 top-2 z-10 inline-flex h-3 w-3 items-center
                        justify-center rounded-full bg-blue-500 text-white antialiased
                        dark:bg-blue-700 md:h-4 md:w-4"
                    key={total}
                    initial={{ scale: 1 }}
                    animate={
                        addingItem ? { scale: [1, 1.5, 1] } : { scale: [1] }
                    }
                    exit={total == 1 ? { scale: 0 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {total}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
