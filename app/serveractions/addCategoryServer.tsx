"use server";
import { z } from 'zod';
import {sql} from "@vercel/postgres"
import { revalidatePath } from 'next/cache';

const category = z.object({
    name: z.string({invalid_type_error: "Invalid name"}).min(3).max(50),
})


export async function addCategoryServer(formData: FormData) {
    const data = category.safeParse({
        name: formData.get('name'),
    });
    if (!data.success) {
        return {
            message: data.error.flatten().fieldErrors,
        };
    } else {
        const {name} = data.data;
        await sql`INSERT INTO categories (name) VALUES (${name})`;
    }
    revalidatePath("/admin")
    revalidatePath("/")
}