"use client";

import { CartItemType } from "../../schemas";
import upgradeCartServer from "@/app/serveractions/updateCartServer";
import { useSession } from "next-auth/react";
import Cart from "@/helperfunctions/cart/cart";
import { Button } from "@mui/material";

type RemoveItemModalProps = {
    removingItem: CartItemType;
    setRemovingitem: React.Dispatch<React.SetStateAction<CartItemType | null>>;
};

export default function RemoveItemModal({
    removingItem,
    setRemovingitem,
}: RemoveItemModalProps) {
    const { data: session, status } = useSession();
    // This function removes the item from the shopping cart
    async function removeItem() {
        const cart = new Cart();
        cart.removeProduct(removingItem);
        if (status === "authenticated") {
            upgradeCartServer(cart.getProducts(), session?.user?.email!);
        }
        window.dispatchEvent(new Event("storage"));
        setRemovingitem(null);
    }

    // This function removes item from the state removingItem thus closing the modal
    function removeModal() {
        setRemovingitem(null);
    }

    return (
        <div
            onClick={removeModal}
            className="fixed left-0 right-0 top-0 z-10 flex h-full max-h-full w-full items-center justify-center bg-gray-500 bg-opacity-50 dark:bg-opacity-25"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 flex h-36 min-w-[200px] max-w-6xl flex-col gap-y-6 rounded bg-slate-100 p-2 dark:bg-slate-900 justify-around"
            >
                <h2 className="text-base font-bold text-sky-950 antialiased dark:text-sky-200 text-xs md:text-base">{`Are you sure you want to remove ${removingItem.product.name} from shopping cart?`}</h2>
                <div className="flex place-content-around">
                    <Button variant="contained" color="error" className="bg-red-500 antialiased font-semibold" onClick={removeItem}>Yes</Button>
                    <Button variant="contained" className="bg-sky-500 antialised font-semibold" onClick={removeModal}>No</Button>
                </div>
            </div>
        </div>
    );
}
