"use server";
import { sql } from "@vercel/postgres";
import { categories, type CategoryType } from "../../db/schema";
import revalidateCategories from "../../helperfunctions/revalidateCategories";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

export async function deleteCategoryServer(category: CategoryType) {
    const db = drizzle(sql);
    await db.delete(categories).where(eq(categories.name, category.name));
    await revalidateCategories();
}
