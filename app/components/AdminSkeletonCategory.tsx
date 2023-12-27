"use client";
import { motion } from "framer-motion";

export default function AdminSkeletonCategory() {
    const numberOfSkeletons = 15;
    return (
        <>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <motion.li
                key={index}
                className="flex flex-row justify-between items-center border-black py-1.5 md:py-2"
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.5}}>
                    <span className="w-2/12 h-3 bg-slate-300 rounded animate-pulse duration-1000"></span>
                    <span className="w-5 h-3 bg-slate-300 rounded-full animate-pulse duration-1000"></span>
                </motion.li>
            ))}
        </>
    )
}