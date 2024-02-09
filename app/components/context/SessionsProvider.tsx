"use client"
import { SessionProvider } from "next-auth/react"
import { type Session } from "next-auth";

type SessionProviderProps= {
    children: React.ReactNode;
    session: Session | null
}

export default function SessionsProvider({ children, session }: SessionProviderProps) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}