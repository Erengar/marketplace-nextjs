"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingHorizontal() {
    const [width, setWidth] = useState<number>(1980);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
        }
    }, []);
    return (
        <div className={`flex h-0.5 w-full bg-slate-100`}>
            <motion.div
                className="h-full w-8 bg-blue-500 md:w-16"
                animate={{ x: [-100, width] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeIn",
                }}
            />
        </div>
    );
}
