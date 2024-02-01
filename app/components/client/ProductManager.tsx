"use client";
import { type ProductType } from "@/db/schema";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useContext } from "react";
import LoadingModal from "./LoadingModal";
import { deleteProductServer } from "../../serveractions/deleteProductServer";
import SetImage from "./SetImage";
import { motion, AnimatePresence } from "framer-motion";
import { CurrencyContext } from "../context/CurrencyProvider";

export default function ProductManger({
    product,
    mutate,
}: {
    product: ProductType;
    mutate?: any;
}) {
    const currency = useContext(CurrencyContext);
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteProduct() {
        setIsDeleting(true);
        await deleteProductServer(product);
        mutate();
        setIsDeleting(false);
    }
    return (
        <motion.li
            className="flex grid grid-cols-6 items-center text-xs md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {isDeleting && <LoadingModal text="Deleting Product" />}
            </AnimatePresence>
            <SetImage
                uuid={product.image}
                name={product.name}
                width={40}
                height={50}
            />
            <span className="mr-4 line-clamp-1 font-semibold">
                {product.name}
            </span>
            <span className="mr-4 line-clamp-1">
                {product.price}
                {currency}
            </span>
            <span className="mr-4 line-clamp-1">{product.amount}x</span>
            <span className="mr-4 line-clamp-1">{product.category}</span>
            <button
                id="product-removal"
                onClick={deleteProduct}
                className="text-red-600 hover:text-red-800"
            >
                <CancelIcon />
                <span className="sr-only">Product Removal</span>
            </button>
        </motion.li>
    );
}
