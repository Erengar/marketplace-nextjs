"use client";

import Link from 'next/link'
import Search from './Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ProductType} from '../../schemas'
import { useState,useEffect } from 'react';

const navbarItems = ['Home']

export default function Navbar() {
    const [items, setItems] = useState<ProductType[]>([]);

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
        <nav className="h-14 w-screen pt-3
        dark:bg-slate-700
        bg-slate-100">
            <ul className="flex flex-row justify-center gap-10">
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
                        {items.length > 0 ? 
                        <span className="text-xxs text-semibold antialiased text-white inline-flex justify-center items-center
                        h-3 w-3 bg-blue-900 rounded-full
                        absolute left-3">
                        {items.length}</span>:
                         null}
                        <ShoppingCartIcon/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}