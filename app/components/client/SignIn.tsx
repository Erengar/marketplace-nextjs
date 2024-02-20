"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ErrorMessage from "@/app/components/client/ErrorMessage";
import { Button, TextField, Typography } from "@mui/material";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const search = useSearchParams();

    useEffect(() => {
        if (!search.get("error")) return;
        if (search.get("error") === "EmailSignin") {
            setError("Something went wrong");
        }
    }, [search]);

    const handleSignIn = () => {
        if (!email) return;
        signIn("email", {
            email: email,
        });
    };
    return (
        <div className="flex w-96 flex-col items-center gap-4 rounded py-4 dark:bg-gray-700">
            <Typography variant="h4" className="text-sky-900">Sign in</Typography>
            <TextField
                required
                label="Email"
                variant="outlined"
                error={!!error}
                helperText={error}
                color="primary"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-80 text-white"
            />
            <Button variant="contained" className="bg-sky-500" onClick={handleSignIn}>Sign In</Button>

        </div>
    );
}
