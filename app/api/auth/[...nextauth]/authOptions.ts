import { DrizzleAdapter } from "@auth/drizzle-adapter"
import EmailProvider from "next-auth/providers/email";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import type { NextAuthOptions } from 'next-auth'
import { Adapter } from "next-auth/adapters";

const db = drizzle(sql);

export const authOptions: NextAuthOptions ={
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [
        EmailProvider({
            type: "email",
            server: {
                host: process.env.EMAIL_SERVER,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    //Database is not supported with the credentials provider
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    //This is where you add your database connection
    callbacks: {
        async signIn({ user, account, profile, email, credentials}) {
            return true
        }
    },
};