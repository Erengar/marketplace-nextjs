"use client";
import { motion } from "framer-motion";

export default function AdminSkeletonCategory() {
    const numberOfSkeletons = 20;
    return (
        <>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <motion.li
                    key={index}
                    className="flex flex-row items-center justify-between border-black py-1.5 md:py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="h-3 w-2/12 animate-pulse rounded bg-slate-300 duration-1000 dark:bg-slate-600"></span>
                    <span className="h-3 w-5 animate-pulse rounded-full bg-slate-300 duration-1000 dark:bg-slate-600"></span>
                </motion.li>
            ))}
        </>
    );
}
