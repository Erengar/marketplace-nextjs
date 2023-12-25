"use client";
import {ProductType} from "../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";

export default function ProductManger({product, setNeedRerender}: {product: ProductType, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteProduct(){
        setIsDeleting(true);
        await fetch(`/api/products/id/${product.id}`, {
            method: 'DELETE',
        })
        setIsDeleting(false);
        setNeedRerender((prev) => !prev);
    }
    return (
        <li className="border-black flex justify-between">
            {isDeleting && <LoadingModal text="Deleting Product"/>}
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.amount}</span>
            <span>{product.category.name}</span>
            <button onClick={deleteProduct} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </li>
    )
}