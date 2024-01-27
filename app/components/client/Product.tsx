"use client";
import { type ProductType } from "@/db/schema";
import SetImage from "./SetImage";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddToCart from "./AddToCart";
import PriceTag from "./PriceTag";

export default function Product(
    {product, currentPage, totalObjects, itemsPerPage, index}:
    { product: ProductType, currentPage:number, totalObjects: number, itemsPerPage:number, index:number}) {
    // State for width of the element
    const [width, setWidth] = useState(0)
    //State fot calculating if the element should grow
    const [grow, setGrow] = useState(false)

    const elementRef = useRef(null);
    useEffect(() => {
        // We want to turn off grow if we are on the last row and there are less than 3 items left
        setGrow(((totalObjects - ((currentPage -1)  * itemsPerPage)) - index + 1) > (totalObjects % 5 >= 3 ? 1 : 3))

        // Get width of the element to set the width of the image
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

    return (
        <motion.li ref={elementRef} className={`border-2 border-black border-solid rounded w-80 h-72 ${grow && "grow"}`}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5, ease: "easeIn"}}>
            <SetImage uuid={product.image} name={product.name} width={width} height={220}/>
            <div className='flex content-center justify-between p-1'>
                <div>
                    <Link href={`/product/${product.id}`} scroll={false}>
                        <h2 className="text-lg w-48 antialiased font-semibold overflow-hidden text-ellipsis">{product.name}</h2>
                    </Link>
                    <PriceTag price={product.price} className="text-base font-bold text-sky-950"/>
                </div>
                <AddToCart product={product} icon={true}/>
            </div>
        </motion.li>
    )
}