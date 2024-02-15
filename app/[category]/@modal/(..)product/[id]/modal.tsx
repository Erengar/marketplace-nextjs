"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

export function Modal({ children, className }: { children: React.ReactNode, className?: string }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return (
        <div className="fixed left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
            <dialog
                ref={dialogRef}
                onClose={onDismiss}
                tabIndex={-1}
                className={`${className} h-fit w-fit`}
            >
                <button onClick={onDismiss} className="absolute">
                    <CloseIcon />
                    <span className="sr-only">Close Window</span>
                </button>
                {children}
            </dialog>
        </div>
    );
}
