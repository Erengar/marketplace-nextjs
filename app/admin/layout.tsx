import SelectTable from "../components/client/SelectTable";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    // If the user is not logged in, redirect to the home page
    if (!session?.user?.email) redirect("/");
    const group = await db.select({"group": users.group}).from(users).where(eq(users.email, session?.user?.email))
    // If the user is not an admin, redirect to the home page
    if (group[0.].group === "user") redirect("/");
    return (
        <>
            <SelectTable />
            {children}
        </>
    );
}
