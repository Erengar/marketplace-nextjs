import { type CategoryType } from "../../db/schema"
import { sql } from "@vercel/postgres";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { categories } from "../../db/schema";
import { eq } from "drizzle-orm";
import { capitalize } from 'lodash';


export default async function getCategories(categoryName?: string): Promise<CategoryType[]> {
    const db = drizzle(sql)
    let result: CategoryType[]
    if (categoryName) {
        result = await db.select().from(categories).where(eq(categories.name,capitalize(categoryName)))
    } else {
        result = await db.select().from(categories)
    }
    return result
}