"use client";
import { useFormStatus } from "react-dom";
import LoadingModal from "./LoadingModal";
import { useEffect } from "react";

export default function SubmitButton(props : {needRerender: boolean, setNeedRerender: (value: boolean) => void}) {
    const status = useFormStatus()
    useEffect(() => {
        if (!status.pending) {
            props.setNeedRerender(!props.needRerender)
        }  
    }, [status.pending])

    return (
        <>
            {status.pending && <LoadingModal text="Adding"/>}
            <button type="submit" className="h-10 w-20 text-base antialiased font-bold text-sky-950 border border-black border-solid rounded bg-slate-200 hover:bg-slate-400 mt-8">Add</button>
        </>
    )
}