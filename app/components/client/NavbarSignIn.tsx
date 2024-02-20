"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Tab from "@mui/material/Tab";

export default function NavbarSignIn() {
    const { data, status } = useSession();

    return status === "authenticated" ? (
        <Link href="/auth/signout">
            <Tab label="Sign out" className="font-semibold text-sky-900 opacity-100"/>
        </Link>
    ) : (
        <Link href="/auth/signin">
            <Tab label="Sign in" className="font-semibold text-sky-900 opacity-100"/>
        </Link>
    );
}
