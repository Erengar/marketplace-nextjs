"use client";

import Link from "next/link";
import Search from "../server/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItemType } from "../../schemas";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navbarItems = ["Home"];

export default function Navbar() {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [addingItem, setAddingItem] = useState<boolean>(true);

    useEffect(() => {
        const handleStorageChange = () => {
            const shoppingCart = localStorage.getItem("shoppingCart");
            setItems(shoppingCart ? JSON.parse(shoppingCart) : []);
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
        <nav
            className="h-7 bg-slate-300 pt-1 dark:bg-slate-700
        md:h-14
        md:pt-3"
        >
            <ul className="flex flex-row justify-center gap-10 text-xs font-bold text-sky-900 md:text-base">
                {navbarItems.map(
                    (item: string): JSX.Element =>
                        item === "Home" ? (
                            <li key={item}>
                                <Link href="/">
                                    <h3>{item}</h3>
                                </Link>
                            </li>
                        ) : (
                            <li key={item}>
                                <Link href={`/${item.toLowerCase()}`}>
                                    <h3>{item}</h3>
                                </Link>
                            </li>
                        ),
                )}
                <li key="admin">
                    <Link href="/admin/categories">Admin</Link>
                </li>
                <li key="cart">
                    <Link href="/shoppingcart" className="relative">
                        <AnimatePresence>
                            {total > 0 ? (
                                <motion.div
                                    className="text-xxs text-semibold absolute left-3 z-10 inline-flex h-4
                        w-4 items-center justify-center rounded-full
                        bg-blue-500 text-white antialiased"
                                    key={total}
                                    initial={{ scale: 0 }}
                                    animate={
                                        addingItem
                                            ? { scale: [1, 1.5, 1] }
                                            : { scale: [1] }
                                    }
                                    exit={
                                        total == 1 ? { scale: 0 } : { scale: 1 }
                                    }
                                    transition={{ duration: 0.5 }}
                                >
                                    {total}
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                        <h3>
                            <ShoppingCartIcon />
                        </h3>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
