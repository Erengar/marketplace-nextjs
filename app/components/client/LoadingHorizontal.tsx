import { motion } from "framer-motion";

export default function LoadingHorizontal() {
    const width = window?.innerWidth;
    const duration = width > 768 ? 1.5 : 1.2;
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
