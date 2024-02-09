"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    return (
        <div className="flex w-96 flex-col items-center gap-4 rounded border py-4">
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                className="h-10 w-80 rounded outline-none"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="h-10 w-36 rounded bg-blue-500 text-white"
                onClick={() =>
                    signIn("email", {
                        email: email,
                        callbackUrl: "/",
                    })
                }
            >
                Sign In
            </button>
        </div>
    );
}
