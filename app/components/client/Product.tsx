"use client";
import { ProductType, CartItemType } from "../../schemas";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SetImage from "./SetImage";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyProvider";

export default function Product({product}: { product: ProductType}) {
    const currency = useContext(CurrencyContext)
    
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

    return (
        <motion.li className="border-2 border-black border-solid rounded w-80 h-72"
        initial={{opacity:0}}
        animate={{opacity:1}}>
            <SetImage uuid={product.image} name={product.name} width={330} height={220}/>
            <h2 className="text-lg antialiased font-semibold line-clamp-1 pl-1">{product.name}</h2>
            <div className='flex content-center justify-between px-0.5'>
                <h3 className="text-base antialiased font-bold text-sky-950 pl-1">{product.price}{currency}</h3>
                <div className="flex flex-col">
                    <motion.button
                    onClick={addItem}
                    whileHover={{scale:1.2}}>
                        <AddShoppingCartIcon className="text-sky-600"/>
                    </motion.button>
                    <h4 className="text-xs antialised font-normal text-sky-600">
                    {product.amount > 0 ?
                    "In stock":
                    "Out of stock"
                }
                    </h4>
                </div>
            </div>
        </motion.li>
    )
}