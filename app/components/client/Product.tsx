"use client";
import { type ProductType } from "@/db/schema";
import SetImage from "./SetImage";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrencyContext } from "../context/CurrencyProvider";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function Product(
    {product, currentPage, totalObjects, itemsPerPage, index}:
    { product: ProductType, currentPage:number, totalObjects: number, itemsPerPage:number, index:number}) {
    const currency = useContext(CurrencyContext)
    // State for width of the element
    const [width, setWidth] = useState(0)

    // Get width of the element to set the width of the image
    const elementRef = useRef(null);
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setWidth(Math.ceil(entry.contentRect.width))
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

    // We want to turn off grow if we are on the last row and there are less than 3 items left
    const shoulYouGrow = ((totalObjects - ((currentPage -1)  * itemsPerPage)) - index + 1) > (totalObjects % 5 >= 3 ? 1 : 3)

    return (
        <motion.li ref={elementRef} className={`border-2 border-black border-solid rounded w-80 h-72 ${shoulYouGrow && "grow"}`}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5, ease: "easeIn"}}>
            <SetImage uuid={product.image} name={product.name} width={width} height={220}/>
            <div className='flex content-center justify-between p-1'>
                <div>
                    <Link href={`/product/${product.id}`} scroll={false}>
                        <h2 className="text-lg w-48 antialiased font-semibold overflow-hidden text-ellipsis">{product.name}</h2>
                    </Link>
                    <h3 className="text-base antialiased font-bold text-sky-950">{product.price}{currency}</h3>
                </div>
                <AddToCart product={product} icon={true}/>
            </div>
        </motion.li>
    )
}