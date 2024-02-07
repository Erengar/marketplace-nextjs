"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingHorizontal() {
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
        }
    }, []);
    const duration = width! > 768 ? 1.5 : 1.2;
    return (
        <div className={`flex h-0.5 w-full bg-slate-100`}>
            <motion.div
                className="h-full w-8 bg-blue-500 md:w-16"
                animate={{ x: [-100, width] }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeIn",
                }}
            />
        </div>
    );
}
