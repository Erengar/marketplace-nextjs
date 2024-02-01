"use client";

import { CartItemType } from "../../schemas";

type RemoveItemModalProps = {
    removingItem: CartItemType;
    setRemovingitem: React.Dispatch<React.SetStateAction<CartItemType | null>>;
};

export default function RemoveItemModal({
    removingItem,
    setRemovingitem,
}: RemoveItemModalProps) {
    // This function removes the item from the shopping cart
    function removeItem() {
        const shoppingCart = localStorage.getItem("shoppingCart");
        const cartItems = shoppingCart ? JSON.parse(shoppingCart) : [];
        const item = cartItems.find(
            (item: CartItemType) => item.product.id === removingItem.product.id,
        );
        if (item) {
            const index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
        }
        localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
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
            className="fixed left-0 right-0 top-0 z-10 flex h-full max-h-full w-full items-center justify-center bg-gray-500 bg-opacity-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 flex min-h-min min-w-[200px] max-w-6xl flex-col gap-y-6 rounded border border-solid border-black bg-white p-2"
            >
                <h2 className="text-base font-bold text-sky-950 antialiased">{`Are you sure you want to remove ${removingItem.product.name} from shopping cart?`}</h2>
                <div className="flex place-content-around">
                    <button
                        onClick={removeItem}
                        className="h-10 w-20 rounded border border-solid border-black bg-slate-200 text-base font-bold text-red-700 antialiased hover:bg-slate-400"
                    >
                        Yes
                    </button>
                    <button
                        onClick={removeModal}
                        className="h-10 w-20 rounded border border-solid border-black bg-slate-200 text-base font-bold text-sky-950 antialiased hover:bg-slate-400"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
