"use server";

import { users } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { CartItemType } from "../schemas";

export default async function updateCartServer(cart: CartItemType[], email: string) {
    const db = drizzle(sql);
    await db.update(users).set({ cart: cart }).where(eq(users.email, email));
}
