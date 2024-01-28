"use client";
import {type CategoryType} from "../../../db/schema"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import LoadingModal from "./LoadingModal";
import {deleteCategoryServer} from "../../serveractions/deleteCategoryServer";
import {motion, AnimatePresence} from "framer-motion";
import { mutate} from "swr";


export default function CategoriesManager({category}: {category: CategoryType}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteCategory() {
        setIsDeleting(true);
        await deleteCategoryServer(category);
        mutate('/api/categories/');
        setIsDeleting(false);
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