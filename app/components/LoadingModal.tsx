"use client";
import {easeInOut, motion } from "framer-motion";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export default function LoadingModal(props: {text: string}) {
    return (
        <div className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full max-h-full bg-gray-500 bg-opacity-50 z-10">
            <div className="min-w-[200px] max-w-6xl min-h-min z-20 rounded bg-white border border-black border-solid p-2 flex flex-col place-items-center gap-y-2 ">
                <motion.div animate={{rotate:[0,180, 360]}} transition={{duration:2, repeat: Infinity, ease:easeInOut}}>
                    <HourglassBottomIcon className="text-sky-950"/>
                </motion.div>
                <h2 className="text-base antialiased font-bold text-sky-950">{props.text}...</h2>
            </div>
        </div>
    )
}