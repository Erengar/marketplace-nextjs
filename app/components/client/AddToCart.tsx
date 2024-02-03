"use client";
import { ProductType } from "@/db/schema";
import { CartItemType } from "../../schemas";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
    // Add item to shopping cart
    const addItem = () => {
        let shoppingCart: any = localStorage.getItem("shoppingCart");
        if (shoppingCart) {
            shoppingCart = JSON.parse(shoppingCart);
            if (
                shoppingCart.some(
                    (item: CartItemType) => item.product.id === product.id,
                )
            ) {
                let index = shoppingCart.findIndex(
                    (item: CartItemType) => item.product.id === product.id,
                );
                shoppingCart[index].orderedAmount += 1;
                localStorage.setItem(
                    "shoppingCart",
                    JSON.stringify(shoppingCart),
                );
            } else {
                let newProduct: CartItemType = {
                    product: product,
                    orderedAmount: 1,
                };
                shoppingCart.push(newProduct);
                localStorage.setItem(
                    "shoppingCart",
                    JSON.stringify(shoppingCart),
                );
            }
        } else {
            let newProduct: CartItemType[] = [
                { product: product, orderedAmount: 1 },
            ];
            localStorage.setItem("shoppingCart", JSON.stringify(newProduct));
        }
        window.dispatchEvent(new Event("storage"));
    };

    if (icon) {
        return (
            <div className={`flex flex-col self-end ${className} text-sky-600 dark:text-cyan-300`}>
                <motion.button
                    onClick={addItem}
                    whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
                >
                    <AddShoppingCartIcon/>
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
