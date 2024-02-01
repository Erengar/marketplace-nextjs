"use client";
import { useFormStatus } from "react-dom";
import LoadingModal from "./LoadingModal";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

type SubmitButtonProps = {
    text: string;
    mutate?: any;
};

export default function SubmitButton({ text, mutate }: SubmitButtonProps) {
    const status = useFormStatus();

    useEffect(() => {
        if (!status.pending && mutate) {
            mutate();
        }
    }, [status.pending]);

    return (
        <>
            <AnimatePresence>
                {status.pending && <LoadingModal text="Adding Product" />}
            </AnimatePresence>
            <button
                type="submit"
                className="mt-4 h-8 w-fit rounded border border-solid border-black bg-slate-200 px-1 text-sm font-bold text-sky-950 antialiased hover:bg-slate-400 md:mt-8 md:h-10 md:text-base"
            >
                {text}
            </button>
        </>
    );
}
