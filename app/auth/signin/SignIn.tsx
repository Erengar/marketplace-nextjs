"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "@/app/components/client/ErrorMessage";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const search = useSearchParams()
    
    useEffect(() => {
        if (!search.get("error")) return
        if (search.get("error") === "EmailSignin") {
            setError("Something went wrong")
        }
    }, [search])
    
    const handleSignIn = () => {
        if (!email) return;
        signIn("email", {
            email: email,
            redirect: false,

        }).then((data) => {
            data?.error ? router.replace(`?error=${data.error}`) : router.push(`${data?.url!}}`);
        });
    };
    return (
        <div className="flex w-96 flex-col items-center gap-4 rounded bg-slate-200 py-4">
            {error && <ErrorMessage message={error}/>}
            <label htmlFor="email" className="font-bold">
                Email:
            </label>
            <input
                id="email"
                className={`h-10 w-80 rounded outline-none ${error && "border-red-500 border"}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="h-10 rounded-3xl bg-blue-500 px-6 font-semibold text-white hover:bg-blue-600"
                onClick={handleSignIn}
            >
                Sign In
            </button>
        </div>
    );
}
