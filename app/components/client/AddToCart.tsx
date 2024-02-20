"use client";
import { ProductType } from "@/db/schema";
import { CartItemType } from "../../schemas";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSession } from "next-auth/react";
import updateCartServer from "@/app/serveractions/updateCartServer";
import Cart from "@/helperfunctions/cart/cart";

type AddToCartProps = {
    product: ProductType;
    className?: string;
    icon?: boolean;
};

export default function AddToCart({
    product,
    className,
    icon = false,
}: AddToCartProps) {
    const { data: session, status } = useSession();
    // Add item to shopping cart
    const addItem = async () => {
        const cart = new Cart();
        cart.addProduct(product);
        if (status === "authenticated") {
            updateCartServer(cart.getProducts(), session?.user?.email!);
        }
        window.dispatchEvent(new Event("storage"));
    };

    if (icon) {
        return (
            <div
                className={`flex flex-col self-end ${className} text-sky-600 dark:text-cyan-300`}
            >
                <motion.button
                    onClick={addItem}
                    whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
                >
                    <AddShoppingCartIcon />
                    <span className="sr-only">Add to Cart</span>
                </motion.button>
                <h4 className="antialised text-xs font-normal">
                    {product.amount > 0 ? "In stock" : "Out of stock"}
                </h4>
            </div>
        );
    } else {
        return (
            <motion.button
                className={`rounded bg-sky-500 p-2 text-white hover:bg-sky-600 ${className}`}
                onClick={addItem}
            >
                Add to cart
            </motion.button>
        );
    }
}
