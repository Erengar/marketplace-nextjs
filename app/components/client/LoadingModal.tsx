"use client";
import { TailSpin } from 'react-loading-icons'
import { motion } from 'framer-motion';

export default function LoadingModal({text, backDrop=true, seeThrough=false}: {text: string, backDrop?: boolean, seeThrough?: boolean}) {
    return (
        <div className={`z-10 fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full max-h-full ${backDrop && "bg-gray-500 bg-opacity-50"}`}>
            <motion.div
            className={`${seeThrough && !text ? null : "min-w-[200px]"} max-w-6xl min-h-min z-20 rounded border border-black border-solid p-2 flex flex-col place-items-center gap-y-2 bg-white ${seeThrough && "bg-opacity-50 bg-black"}`}
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{duration:0.1}}>
                <TailSpin stroke={`${seeThrough? "rgb(255, 250, 255)" :"rgb(8 47 73)"}`}/>
                {text && <h2 className={`text-base antialiased font-bold ${seeThrough? "text-white": "text-sky-950"}`}>{text}...</h2>}
            </motion.div>
        </div>
    )
}