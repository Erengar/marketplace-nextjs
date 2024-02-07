"use client";

import { useEffect } from "react";
import ReplayIcon from "@mui/icons-material/Replay";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <div className="flex h-[80vh] w-screen justify-center md:w-[99vw]">
            <div className="flex flex-col place-content-center gap-2">
                <h2 className="flex justify-center md:text-2xl">
                    Something went wrong!
                </h2>
                <div className="flex justify-center md:text-xl">
                    <button
                        onClick={() => {
                            reset();
                        }}
                        className="flex flex-col items-center"
                    >
                        <ReplayIcon className="scale-150 hover:text-sky-700" />
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}
