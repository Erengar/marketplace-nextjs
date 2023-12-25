"use server";
import { UploadcareSimpleAuthSchema, deleteFile } from '@uploadcare/rest-client';
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from 'next/cache';
import { ProductType } from '../schemas';

export async function deleteProductServer(product: ProductType) {
    const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
        secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
    });
    deleteFile({uuid: product.image}, {authSchema:uploadcareSimpleAuthSchema});
    sql`DELETE FROM products WHERE id = ${product.id}`
    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath(`/${product.category}`)
    revalidateTag('products')
}