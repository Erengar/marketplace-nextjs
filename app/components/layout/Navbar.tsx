"use client";

import Link from 'next/link'
import Search from './Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CartItemType} from '../../schemas'
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';

const navbarItems = ['Home']

export default function Navbar() {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [addingItem, setAddingItem] = useState<boolean>(true);

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

    useEffect(()=> {
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
    }, [items])
    return (
        <nav className="h-14 w-screen pt-3
        dark:bg-slate-700
        bg-slate-300">
            <ul className="flex flex-row justify-center gap-10 font-bold text-sky-900">
                {navbarItems.map((item: string): JSX.Element => (
                    item === 'Home' ? 
                    <li key={item}>
                        <Link href="/">
                            {item}
                        </Link>
                    </li>:
                    <li key={item}>
                        <Link href={`/${item.toLowerCase()}`}>
                            {item}
                        </Link>
                    </li>
                ))}
                <li>
                    <Search />
                </li>
                <li>
                    <Link href="/shoppingcart" className='relative'>
                        {total > 0 ? 
                        <motion.div
                        className="text-xxs text-semibold antialiased text-white inline-flex justify-center items-center
                        h-4 w-4 bg-blue-500 rounded-full
                        absolute left-3"
                        key={total}
                        animate={addingItem?{scale: [1, 1.5, 1]}:{scale: [1]}}
                        transition={{duration: 0.5}}
                        >
                        {total}</motion.div>:
                        null}
                        <ShoppingCartIcon/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}