"use client";
import { TailSpin } from "react-loading-icons";
import { motion } from "framer-motion";

type LoadingModalProps = {
    text?: string;
    backDrop?: boolean;
    seeThrough?: boolean;
};

export default function LoadingModal({
    text,
    backDrop = true,
    seeThrough = false,
}: LoadingModalProps) {
    return (
        <div
            className={`fixed left-0 right-0 top-0 z-10 flex h-full max-h-full w-full items-center justify-center ${backDrop && "bg-gray-500 bg-opacity-50"}`}
        >
            <motion.div
                className={`${seeThrough && !text ? null : "min-w-[200px]"} z-20 flex min-h-min max-w-6xl flex-col place-items-center gap-y-2 rounded border border-solid border-black bg-white p-2 ${seeThrough && "bg-black bg-opacity-50"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.1 }}
            >
                <TailSpin
                    stroke={`${seeThrough ? "rgb(255, 250, 255)" : "rgb(8 47 73)"}`}
                />
                {text && (
                    <h2
                        className={`text-base font-bold antialiased ${seeThrough ? "text-white" : "text-sky-950"}`}
                    >
                        {text}...
                    </h2>
                )}
            </motion.div>
        </div>
    );
}
