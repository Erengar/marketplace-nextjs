"use client";
import { motion } from "framer-motion";

export default function AdminSkeletonProduct() {
    const numberOfSkeletons = 10;

    return (
        <>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <motion.li
                    key={index}
                    className="flex flex-row items-center justify-between pr-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="h-12 w-10 animate-pulse rounded bg-slate-300 duration-1000"></span>
                    <span className="h-4 w-2/12 animate-pulse rounded bg-slate-300 duration-1000"></span>
                    <span className="h-4 w-2/12 animate-pulse rounded bg-slate-300 duration-1000"></span>
                    <span className="h-4 w-2/12 animate-pulse rounded bg-slate-300 duration-1000"></span>
                    <span className="h-4 w-2/12 animate-pulse rounded bg-slate-300 duration-1000"></span>
                    <span className="h-4 w-2/12 animate-pulse rounded bg-slate-300 duration-1000"></span>
                </motion.li>
            ))}
        </>
    );
}
