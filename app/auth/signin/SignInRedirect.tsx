"use client";
import syncLocalAndDb from "@/helperfunctions/syncLocalAndDb";
import SignIn from "../../components/client/SignIn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "authenticated") {
        syncLocalAndDb(session, status);
        router.replace("/");
    } else if (status === "unauthenticated") {
        return <SignIn />;
    }
}
