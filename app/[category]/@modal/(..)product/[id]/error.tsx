"use client";
import ErrorComponent from "@/app/components/errors/ErrorComponent";
import { Modal } from "./modal";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Modal>
            <ErrorComponent error={error} reset={reset} />)
        </Modal>
    );
}
