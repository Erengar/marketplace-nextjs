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
                className="mt-4 h-8 w-fit rounded bg-sky-500 px-1 px-2 text-sm font-semibold text-white antialiased hover:bg-sky-600 md:mt-8 md:h-10 md:text-base dark:text-gray-200"
            >
                {text}
            </button>
        </>
    );
}
