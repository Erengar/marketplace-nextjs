"use server";
import { z } from 'zod';
import {sql} from "@vercel/postgres"
import { revalidatePath, revalidateTag } from 'next/cache';
import { uploadFile } from '@uploadcare/upload-client';

const product = z.object({
    name: z.string({invalid_type_error: "Invalid name"}).min(3).max(50),
    price: z.string({invalid_type_error: "Invalid price"}).min(1),
    amount: z.string({invalid_type_error: "Invalid stock"}).min(1),
    description: z.string({invalid_type_error: "Invalid description"}).min(0).max(1000),
    category: z.string({invalid_type_error: "Invalid category"}).min(1).max(50),
    image: z.string({invalid_type_error: "Invalid image"}).min(1),
});

export async function addProductServer(formData: FormData) {
    const file = formData.get('image');
    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileUpload = await uploadFile(buffer, {publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string, fileName: (file as File).name});
    formData.set('image', fileUpload.uuid);

    const data = product.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        amount: formData.get('amount'),
        description: formData.get('description'),
        category: formData.get('category'),
        image: formData.get('image'),
    });
    
    if (!data.success) {
        return {
            message: data.error.flatten().fieldErrors,
        };
    } else {
        const {name, description, category, image} = data.data;
        const price = parseFloat(data.data.price);
        const amount = parseInt(data.data.amount);
        await sql`INSERT INTO products (name, price, amount, description, category, image) VALUES (${name}, ${price}, ${amount},${description}, ${category}, ${image})`;
    }
    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath(`/${data.data.category}`)
    revalidateTag('products')
}