"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from 'next/cache';
import { CategoryType } from '../schemas';

export async function deleteCategoryServer(category: CategoryType) {
    sql`DELETE FROM categories WHERE name = ${category.name}`
    revalidatePath("/admin")
    revalidatePath("/")
    revalidateTag('categories')
}