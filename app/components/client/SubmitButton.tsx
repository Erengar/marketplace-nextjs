"use client";
import { useFormStatus } from "react-dom";
import LoadingModal from "./LoadingModal";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function SubmitButton({text, needRerender, setNeedRerender}: {text: string, needRerender: boolean, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    const status = useFormStatus()
    useEffect(() => {
        if (!status.pending) {
            setNeedRerender((prev) => !prev)
        }  
    }, [status.pending])

    return (
        <>
            <AnimatePresence>
            {status.pending && <LoadingModal text="Adding Product"/>}
            </AnimatePresence>
            <button type="submit" className="h-8 md:h-10 w-fit px-1 mt-4 md:mt-8 text-sm md:text-base antialiased font-bold text-sky-950 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400">{text}</button>
        </>
    )
}