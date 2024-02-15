"use server";
import {
    UploadcareSimpleAuthSchema,
    deleteFile,
} from "@uploadcare/rest-client";
import { sql } from "@vercel/postgres";
import { products, type ProductType } from "../../db/schema";
import revalidateProducts from "../../helperfunctions/revalidateProducts";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

export async function deleteProductServer(product: ProductType) {
    const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
        secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
    });
    if (product.image) {
        deleteFile(
            { uuid: product.image },
            { authSchema: uploadcareSimpleAuthSchema },
        );
    }
    const db = drizzle(sql);
    await db.delete(products).where(eq(products.id, product.id));
    await revalidateProducts();
}
