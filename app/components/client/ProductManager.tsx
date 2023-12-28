"use client";
import {ProductType} from "../../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";
import { deleteProductServer } from "../../serveractions/deleteProductServer";
import SetImage from "./SetImage";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductManger({product, setNeedRerender}: {product: ProductType, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteProduct(){
        setIsDeleting(true);
        await deleteProductServer(product);
        setIsDeleting(false);
        setNeedRerender((prev) => !prev);
    }
    return (
        <motion.li
        className="flex items-center grid grid-cols-6 text-xs md:text-base"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}>
            <AnimatePresence>
            {isDeleting && <LoadingModal text="Deleting Product"/>}
            </AnimatePresence>
            <SetImage uuid={product.image} name={product.name} width={40} height={50}/>
            <span className="mr-4 font-semibold line-clamp-1">{product.name}</span>
            <span className="mr-4 line-clamp-1">{product.price}€</span>
            <span className="mr-4 line-clamp-1">{product.amount}x</span>
            <span className="mr-4 line-clamp-1">{product.category}</span>
            <button onClick={deleteProduct} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </motion.li>
    )
}