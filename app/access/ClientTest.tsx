"use client";
import { useSession } from "next-auth/react";
import useSyncLocalAndDb from "../customhooks/useSyncLocalAndDb";

export default function ClientTest() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return <p>Signed in as {session.user?.email}</p>;
    }
    return <p>Not signed in</p>;
}
