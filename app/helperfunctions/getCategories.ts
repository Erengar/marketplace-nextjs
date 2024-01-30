import { type CategoryType } from "../../db/schema"
import { sql } from "@vercel/postgres";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { categories } from "../../db/schema";
import { eq } from "drizzle-orm";


export default async function getCategories(categorySlug?: string): Promise<CategoryType[]> {
    const db = drizzle(sql)
    let result: CategoryType[]
    if (categorySlug) {
        result = await db.select().from(categories).where(eq(categories.slug,categorySlug))
    } else {
        result = await db.select().from(categories)
    }
    return result
}