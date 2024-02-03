"use client";
import { CartItemType } from "../../schemas";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SetImage from "./SetImage";
import React, { useState } from "react";
import PriceTag from "./PriceTag";

type CartProductProps = {
    product: CartItemType;
    setRemovingItem: React.Dispatch<React.SetStateAction<CartItemType | null>>;
};

export default function CartProduct({
    product,
    setRemovingItem,
}: CartProductProps) {
    const [buttonAddPressed, setButtonAddPressed] = useState(false);
    const [buttonRemovePressed, setButtonRemovePressed] = useState(false);

    // This function adds the item to the shopping cart
    async function addItem() {
        //This is to add a little animation to the button
        setButtonAddPressed(true);
        setTimeout(() => setButtonAddPressed(false), 100);

        const shoppingCart = localStorage.getItem("shoppingCart");
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : [];
        const item = cartItems.find(
            (item: CartItemType) => item.product.id === product.product.id,
        );
        if (item) {
            item.orderedAmount += 1;
        }
        localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("storage"));
    }

    // This function removes the item from the shopping cart
    async function removeItem() {
        //This is to add a little animation to the button
        setButtonRemovePressed(true);
        setTimeout(() => setButtonRemovePressed(false), 100);

        const shoppingCart = localStorage.getItem("shoppingCart");
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : [];
        const item = cartItems.find(
            (item: CartItemType) => item.product.id === product.product.id,
        );
        // If the item is the last one in the cart, the modal is opened
        if (item.orderedAmount === 1) {
            setRemovingItem(item);
        } else {
            if (item) {
                item.orderedAmount -= 1;
            }
            if (item.orderedAmount === 0) {
                const index = cartItems.indexOf(item);
                cartItems.splice(index, 1);
            }
            localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
            window.dispatchEvent(new Event("storage"));
        }
    }
    return (
        <li className="h-30 flex w-full flex-row place-content-between items-center border-black p-2 xl:w-4/5">
            <div className="flex w-6/12 flex-row gap-2 md:gap-6">
                <SetImage
                    uuid={product.product.image!}
                    name={product.product.name}
                    width={100}
                    height={100}
                    crop={true}
                />
                <h2 className="line-clamp-1 self-center text-sm font-semibold antialiased dark:text-gray-300 md:text-lg">
                    {product.product.name}
                </h2>
            </div>
            <PriceTag
                price={product.product.price}
                className="text-xs font-bold text-sky-950 antialiased dark:text-sky-200 md:text-base"
            />
            <div className="flex gap-2 md:gap-6">
                <h3 className="col-span1 self-center text-xs font-bold text-sky-600 antialiased dark:text-sky-400 md:text-base">
                    {product.orderedAmount}x
                </h3>
                <div className="flex w-fit flex-col divide-y-2 divide-black rounded border-2 border-solid border-black bg-slate-200 dark:bg-slate-500 dark:text-gray-100">
                    <button
                        className={`font-semibold antialiased shadow-black hover:bg-slate-400 dark:hover:bg-blue-300 ${buttonAddPressed ? "shadow-inner" : "shadow-none"}`}
                        onClick={addItem}
                    >
                        <AddIcon />
                        <span className="sr-only">Add Product</span>
                    </button>
                    <button
                        className={`font-semibold antialiased shadow-black hover:bg-slate-400 dark:hover:bg-blue-300 ${buttonRemovePressed ? "shadow-inner" : "shadow-none"}`}
                        onClick={removeItem}
                    >
                        <RemoveIcon />
                        <span className="sr-only">Deduct Product</span>
                    </button>
                </div>
            </div>
        </li>
    );
}
