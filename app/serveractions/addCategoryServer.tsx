"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import revalidateCategories from "../helperfunctions/revalidateCategories";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { categories } from "@/db/schema";
import { kebabCase } from "lodash";

const category = z.object({
    name: z
        .string({
            invalid_type_error: "Invalid name",
            required_error: "Name is required",
        })
        .min(3, "Name must contain at least 3 character(s).")
        .max(50, "Name must contain at most 50 character(s)."),
    description: z
        .string({ invalid_type_error: "Invalid description" })
        .max(1000, "Description must contain at most 1000 character(s)."),
});

export async function addCategoryServer(prevState: any, formData: FormData) {
    const data = category.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });
    if (!data.success) {
        return {
            error: data.error.flatten().fieldErrors,
        };
    } else {
        try {
            const db = drizzle(sql);
            const { name, description } = data.data;
            const slug = kebabCase(name);
            await db
                .insert(categories)
                .values({ name: name, description: description, slug: slug });
        } catch (e: any) {
            if (e.code === "23505") {
                return {
                    error: "Category already exists",
                };
            } else {
                return {
                    error: "Something went wrong",
                };
            }
        }
    }
    await revalidateCategories();
    return { success: "Category added successfully." };
}
