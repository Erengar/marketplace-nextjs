"use client";
import { CartItemType } from "../../schemas";
import { type ProductType } from "@/db/schema";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SetImage from "./SetImage";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrencyContext } from "../context/CurrencyProvider";
import Link from "next/link";

export default function Product(
    {product, currentPage, totalObjects, itemsPerPage, index}:
    { product: ProductType, currentPage:number, totalObjects: number, itemsPerPage:number, index:number}) {
    const currency = useContext(CurrencyContext)
    // State for width of the element
    const [width, setWidth] = useState(0)
    
    // Add item to shopping cart
    const addItem = () => {
        let shoppingCart : any = localStorage.getItem('shoppingCart')
        if (shoppingCart) {
            shoppingCart = JSON.parse(shoppingCart)
            if (shoppingCart.some((item: CartItemType) => item.product.id === product.id)){
                let index = shoppingCart.findIndex((item: CartItemType) => item.product.id === product.id)
                shoppingCart[index].orderedAmount += 1
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
            } else {
                let newProduct: CartItemType ={product: product, orderedAmount: 1}
                shoppingCart.push(newProduct)
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
            }
        }else {
            let newProduct: CartItemType[] = [{product: product, orderedAmount: 1}]
            localStorage.setItem('shoppingCart', JSON.stringify(newProduct))
        }
        window.dispatchEvent(new Event('storage'))
    }

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
                    <Link href={`product/${product.name}`}>
                        <h2 className="text-lg w-48 antialiased font-semibold line-clamp-1">{product.name}</h2>
                    </Link>
                    <h3 className="text-base antialiased font-bold text-sky-950">{product.price}{currency}</h3>
                </div>
                <div className="flex flex-col self-end">
                    <motion.button
                    onClick={addItem}
                    whileHover={{rotate:[0, 10, -10, 10, -10, 0]}}>
                        <AddShoppingCartIcon className="text-sky-600"/>
                    </motion.button>
                    <h4 className="text-xs antialised font-normal text-sky-600">
                    {product.amount > 0
                    ? "In stock"
                    : "Out of stock"
                    }
                    </h4>
                </div>
            </div>
        </motion.li>
    )
}