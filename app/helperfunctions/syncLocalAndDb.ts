"use server"
import { users } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { CartItemType } from "../schemas";
import { eq } from "drizzle-orm";

/**
 * Take the local storage shoppingCart and sync it with the user's cart in the database
 * @param local local storage shoppingCart, stringified CartItemType[]
 * @param email email address of the user
 */
export default async function syncLocalAndDb(local: string, email: string) {
    const obj: CartItemType[] = JSON.parse(local)
    const db = drizzle(sql)
    await db.update(users).set({cart: obj}).where(eq(users.email, email))
}