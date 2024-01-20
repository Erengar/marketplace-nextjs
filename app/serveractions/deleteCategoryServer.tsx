"use server";
import { sql } from "@vercel/postgres";
import { CategoryType } from '../../db/schema';
import revalidateCategories from '../helperfunctions/revalidateCategories';

export async function deleteCategoryServer(category: CategoryType) {
    await sql`DELETE FROM categories WHERE name = ${category.name}`
    await revalidateCategories()
}