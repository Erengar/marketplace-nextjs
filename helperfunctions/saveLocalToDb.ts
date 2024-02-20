"use server"
import { users } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { CartItemType } from "../app/schemas";
import { eq } from "drizzle-orm";
import _ from "lodash";

/**
 * Take the local storage shoppingCart and sync it with the user's cart in the database
 * @param {CartItemType[]} local local storage shoppingCart
 * @param {string} email email address of the user
 */
export default async function saveLocalToDb(local: CartItemType[], email: string) {
    const db = drizzle(sql)
    const dbCart = await db.select({cart : users.cart}).from(users).where(eq(users.email, email)).then((res) => res[0].cart)
    // If the local storage cart is the same as the db cart, return the db cart
    if (_.isEqual(local, dbCart)) return dbCart
    // If the db cart is empty, update the db cart with the local storage cart
    if (!dbCart) {
        await db.update(users).set({cart: local}).where(eq(users.email, email))
        return
    }
    // If the db cart is not empty, merge the local storage cart with the db cart
    for (const item of local) {
        const index = dbCart.findIndex((i) => i.product.id === item.product.id)
        if (index === -1) {
            dbCart.push(item)
        } else {
            dbCart[index].orderedAmount += item.orderedAmount
        }
    }
    // Update the db cart with the merged cart
    await db.update(users).set({cart: dbCart}).where(eq(users.email, email))
    return dbCart
}