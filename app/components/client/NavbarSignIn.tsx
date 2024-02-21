"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Tab from "@mui/material/Tab";

export default function NavbarSignIn() {
    const { data, status } = useSession();

    return status === "authenticated" ? (
        <Link href="/auth/signout">
            <Tab label="Sign out" sx={{fontWeight:600, opacity:1, color: "rgb(12 74 110)"}}/>
        </Link>
    ) : (
        <Link href="/auth/signin">
            <Tab label="Sign in" sx={{fontWeight:600, opacity:1, color: "rgb(12 74 110)"}}/>
        </Link>
    );
}
