"use client";
import { type ProductType } from "@/db/schema";
import SetImage from "./SetImage";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddToCart from "./AddToCart";
import PriceTag from "./PriceTag";

type ProductProps = {
    product: ProductType;
    currentPage: number;
    totalObjects: number;
    itemsPerPage: number;
    index: number;
};

export default function Product({
    product,
    currentPage,
    totalObjects,
    itemsPerPage,
    index,
}: ProductProps) {
    // State for width of the element
    const [width, setWidth] = useState(0);
    //State fot calculating if the element should grow
    const [grow, setGrow] = useState(false);

    const elementRef = useRef(null);
    useEffect(() => {
        // We want to turn off grow if we are on the last row and there are less than 3 items left
        setGrow(
            totalObjects - (currentPage - 1) * itemsPerPage - index + 1 >
                (totalObjects % 5 >= 3 ? 1 : 3) || window.innerWidth < 1136,
        );

        // Get width of the element to set the width of the image
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setWidth(Math.ceil(entry.contentRect.width));
            }
        });
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <motion.li
            ref={elementRef}
            className={`h-72 w-80 rounded border-2 border-solid border-black dark:border dark:border-sky-900 ${grow && "grow"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
        >
            <SetImage
                uuid={product.image}
                name={product.name}
                width={width}
                height={220}
            />
            <div className="flex content-center justify-between p-1">
                <div>
                    <Link href={`/product/${product.id}`} scroll={false}>
                        <h2 className="w-48 overflow-hidden text-ellipsis text-lg font-semibold antialiased dark:text-gray-300">
                            {product.name}
                        </h2>
                    </Link>
                    <PriceTag
                        price={product.price}
                        className="text-base font-bold text-sky-950 dark:text-sky-200"
                    />
                </div>
                <AddToCart product={product} icon={true} />
            </div>
        </motion.li>
    );
}
