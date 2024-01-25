"use client"
import { ProductType } from "@/db/schema";
import { CartItemType } from "../../schemas";
import { motion } from "framer-motion";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddToCart({product, className, icon=false}: {product: ProductType, className?: string | undefined, icon?: boolean}) {
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

    
    if (icon) {
        return (
        <div className={`flex flex-col self-end ${className}`}>
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
        )
    } else{

        return (
            <motion.button
            className={`bg-sky-500 hover:bg-sky-600 text-white rounded p-2 ${className}`}
            onClick={addItem}>
                Add to cart
            </motion.button>
            )
    }
}