"use client";
import { useState, useEffect } from "react";
import { CartItemType } from "../../schemas";
import PriceTag from "./PriceTag";

export default function CheckOut({ items }: { items: CartItemType[] }) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        items.forEach((item) => {
            total += item.product.price * item.orderedAmount;
        });
        setTotalPrice(total);
    }, [items]);

    return (
        <div className="col-span-4 mr-2 flex flex-col rounded border border-black lg:mr-12 xl:col-span-2">
            <h2 className="line-clamp-1 self-center text-xs font-bold text-sky-900 sm:text-sm md:text-base dark:text-sky-200 antialiased">
                CheckOut
            </h2>
            <hr />
            <ul>
                {items.map((item) => (
                    <li
                        key={item.product.id}
                        className="flex justify-between px-1 text-xs xl:text-sm"
                    >
                        <span className="line-clamp-1 font-semibold text-sky-950 antialiased dark:text-gray-400">
                            {item.product.name}
                        </span>{" "}
                        <span className="dark:text-gray-200">
                            {item.orderedAmount}x{" "}
                            <PriceTag
                                price={item.product.price}
                                inline={true}
                            />
                        </span>
                    </li>
                ))}
            </ul>
            <hr />
            <div className="flex justify-between px-1 text-xs sm:text-sm md:text-base">
                <span className="dark:text-gray-400">Total:</span>
                <PriceTag price={totalPrice} inline={true} className="dark:text-gray-200"/>
            </div>
        </div>
    );
}
