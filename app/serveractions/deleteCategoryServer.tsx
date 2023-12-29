"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from 'next/cache';
import { CategoryType } from '../schemas';

export async function deleteCategoryServer(category: CategoryType) {
    await sql`DELETE FROM categories WHERE name = ${category.name}`
    revalidatePath("/admin?table=category")
    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath("/api/categories")
    revalidateTag('categories')
}