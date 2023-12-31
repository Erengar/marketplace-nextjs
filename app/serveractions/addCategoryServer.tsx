"use server";
import { z } from 'zod';
import {sql} from "@vercel/postgres"
import { revalidatePath, revalidateTag } from 'next/cache';

const category = z.object({
    name: z.string({invalid_type_error: "Invalid name", required_error:"Name is required"}).min(3, "Name must contain at least 3 character(s).").max(50, "Name must contain at most 50 character(s)."),
})


export async function addCategoryServer(prevState: any, formData: FormData) {
    const data = category.safeParse({
        name: formData.get('name'),
    });
    if (!data.success) {
        return {
            message: data.error.flatten().fieldErrors,
        };
    } else {
        try{
            const {name} = data.data;
            await sql`INSERT INTO categories (name) VALUES (${name})`;
        } catch (e: any) {
            if (e.code === '23505') {
                return {
                    message: "Category already exists",
                };
            }
        }
    }
    await Promise.all([
        revalidatePath("/api/categories")
    ]);
}