"use client";
import {CategoryType} from "../../schemas"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";
import {deleteCategoryServer} from "../../serveractions/deleteCategoryServer";
import {motion, AnimatePresence} from "framer-motion";
import { useEffect } from "react";


export default function CategoriesManager({category, setNeedRerender}: {category: CategoryType, setNeedRerender: React.Dispatch<React.SetStateAction<number>>}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteCategory() {
        setIsDeleting(true);
        await deleteCategoryServer(category);
        setIsDeleting(false);
        setNeedRerender((prev) => prev++);
    }


    return (
        <motion.li
        className="border-black flex justify-between"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}>
            <AnimatePresence>
            {isDeleting && <LoadingModal text="Deleting Category"/>}
            </AnimatePresence>
            <span>{category.name}</span>
            <button onClick={deleteCategory} className='text-red-600 hover:text-red-800'><CancelIcon/></button>
        </motion.li>
    );
}