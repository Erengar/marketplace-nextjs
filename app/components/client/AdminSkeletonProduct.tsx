"use client";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function AdminSkeletonProduct() {
    const numberOfSkeletons = 10;

    return (
        <>
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
            <motion.li
            key={index}
            className="flex flex-row justify-between items-center pr-4"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.5}}>
                <span className="w-10 h-12 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
                <span className="w-2/12 h-4 bg-slate-300 rounded animate-pulse duration-1000"></span>
            </motion.li>
        ))}
        </>
    )
}