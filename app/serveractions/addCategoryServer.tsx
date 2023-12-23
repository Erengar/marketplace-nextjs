"use server";
import { z } from 'zod';
import {sql} from "@vercel/postgres"
import { redirect } from 'next/navigation'

const category = z.object({
    name: z.string({invalid_type_error: "Invalid name"}).min(3).max(50),
})


export async function addCategoryServer(formData: FormData) {
    console.log(formData)
    const data = category.safeParse({
        name: formData.get('name'),
    });
    if (!data.success) {
        console.log('NO')
        return {
            message: data.error.flatten().fieldErrors,
        };
    } else {
        const {name} = data.data;
        await sql`INSERT INTO categories (name) VALUES (${name})`;
    }
    redirect("/")
}