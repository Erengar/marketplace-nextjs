import { type CategoryType } from "../../db/schema"
import { sql } from "@vercel/postgres";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { categories } from "../../db/schema";


export default async function getCategories(): Promise<CategoryType[]> {
    const db = drizzle(sql)
    const result = db.select().from(categories)
    return result
}