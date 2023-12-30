"use client"
import AdminCategorySkeleton from "./AdminSkeletonCategory"
import { CategoryType } from "../../schemas"
import { motion, AnimatePresence } from "framer-motion"


export default function NewCategoriesManager({categories, setNeedRerender}: {categories: CategoryType[] | null, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <>
        {categories
        ? categories.map((category) => (
        <motion.li
        key={category.name}
        className="border-black flex justify-between"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}>
            <AnimatePresence>
            </AnimatePresence>
            <span>{category.name}</span>
        </motion.li>
        ))
        : <AdminCategorySkeleton/>}
        </>
                )
}