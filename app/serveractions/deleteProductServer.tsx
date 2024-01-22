"use server";
import { UploadcareSimpleAuthSchema, deleteFile } from '@uploadcare/rest-client';
import { sql } from "@vercel/postgres";
import { type ProductType } from '../../db/schema';
import revalidateProducts from '../helperfunctions/revalidateProducts';

export async function deleteProductServer(product: ProductType) {
    const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
        secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
    });
    if (product.image) {
        deleteFile({uuid: product.image}, {authSchema:uploadcareSimpleAuthSchema});
    }
    sql`DELETE FROM products WHERE id = ${product.id}`
    await revalidateProducts()
}