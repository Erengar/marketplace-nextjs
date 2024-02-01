"use client";
import Link from "next/link";
import { type CategoryType } from "@/db/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import CategoryDescription from "./CategoryDescription";

export default function Category({ category }: { category: CategoryType }) {
    const [showDescription, setShowDescription] = useState(false);
    //This is a hacky way to make sure the description is on top of the other categories
    const startHover = () => {
        setShowDescription(true);
        setTimeout(() => {
            Array.from(
                document.getElementsByClassName("category-description"),
            ).map((element) => element.classList.add("z-20"));
        }, 200);
    };
    const endHover = () => {
        Array.from(document.getElementsByClassName("category-description")).map(
            (element) => element.classList.remove("z-20"),
        );
        setShowDescription(false);
    };
    return (
        <Link
            key={category.name}
            href={`${category.slug}`}
            className="relative flex"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
        >
            <motion.li
                className={`category rotate-45 bg-slate-200 text-sky-900 dark:bg-slate-950
            dark:hover:scale-110 dark:hover:bg-slate-900 dark:active:scale-110
            dark:active:outline-1 dark:active:outline-slate-700 ${showDescription && "bg-slate-400"} max-h-sm flex h-40
            min-h-fit w-40 min-w-fit max-w-sm items-center justify-center rounded-lg border border-solid font-semibold active:scale-110 active:outline-1 active:outline-neutral-400 ${showDescription ? "z-30" : "z-10"}`}
                key={category.name}
                animate={
                    showDescription ? { rotate: [45, 0] } : { rotate: [0, 45] }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.span
                    className="mx-5"
                    animate={
                        showDescription
                            ? { rotate: [-45, 0] }
                            : { rotate: [0, -45] }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h2>{category.name}</h2>
                </motion.span>
            </motion.li>
            <AnimatePresence>
                {showDescription && <CategoryDescription />}
            </AnimatePresence>
        </Link>
    );
}
