"use server";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Tab } from "@mui/material";

export default async function AdminLink() {
    const session = await getServerSession(authOptions);
    // If the user is not logged in, dont show the admin link
    if (!session?.user?.email) return null;
    const group = await db
        .select({ group: users.group })
        .from(users)
        .where(eq(users.email, session?.user?.email));
    // If the user is not an admin, dont show the admin link
    if (group[0].group === "user") return null;
    return (
        <Link href="/admin/categories">
            <Tab label="Admin" className="font-semibold text-sky-900 opacity-100"/>
        </Link>
    );
}
