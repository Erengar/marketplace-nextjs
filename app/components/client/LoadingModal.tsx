"use client";
import { TailSpin } from 'react-loading-icons'
import { motion } from 'framer-motion';

export default function LoadingModal({text}: {text: string}) {
    return (
        <div className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full max-h-full bg-gray-500 bg-opacity-50 z-10">
            <motion.div
            className="min-w-[200px] max-w-6xl min-h-min z-20 rounded bg-white border border-black border-solid p-2 flex flex-col place-items-center gap-y-2 "
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{duration:0.1}}>
                <TailSpin stroke="rgb(8 47 73)"/>
                <h2 className="text-base antialiased font-bold text-sky-950">{text}...</h2>
            </motion.div>
        </div>
    )
}