"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavbarSignIn() {
    const { data, status } = useSession();
    return (
        status === "authenticated" ? (
            <li>
                <Link href="/auth/signout">Sign Out</Link>
            </li>
        ) : (
            <li>
                <Link href="/auth/signin">Sign in</Link>
            </li>
        )
    );
}
