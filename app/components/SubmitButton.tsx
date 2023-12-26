"use client";
import { useFormStatus } from "react-dom";
import LoadingModal from "./LoadingModal";
import { useEffect } from "react";

export default function SubmitButton({text, needRerender, setNeedRerender}: {text: string, needRerender: boolean, setNeedRerender: React.Dispatch<React.SetStateAction<boolean>>}) {
    const status = useFormStatus()
    useEffect(() => {
        if (!status.pending) {
            setNeedRerender(!needRerender)
        }  
    }, [status.pending])

    return (
        <>
            {status.pending && <LoadingModal text="Adding Product"/>}
            <button type="submit" className="h-10 w-fit p-1 text-base antialiased font-bold text-sky-950 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400 mt-8">{text}</button>
        </>
    )
}