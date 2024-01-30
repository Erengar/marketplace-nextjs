"use server";
import { z } from 'zod';
import { sql} from "@vercel/postgres"
import { uploadFile } from '@uploadcare/upload-client';
import { UploadcareSimpleAuthSchema, deleteFile } from '@uploadcare/rest-client';
import revalidateProducts from '../helperfunctions/revalidateProducts';
import { capitalize } from 'lodash';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { products } from '@/db/schema';

const product = z.object({
    name: z.string({invalid_type_error: "Invalid name", required_error: "Name is required"}).min(3, "Name must contain at least 3 character(s)").max(50, "Name must contain at most 50 character(s)"),
    price: z.coerce.number({invalid_type_error: "Invalid price", required_error:"Price is required"}).positive('Price must be positive'),
    amount: z.coerce.number({invalid_type_error: "Invalid stock", required_error:"Amount in stock is required"}).positive('Stock must be positive').int('Stock must be an integer'),
    description: z.string({invalid_type_error: "Invalid description"}).min(0).max(1000, "Description must contain at most 1000 character(s)"),
    category: z.string({invalid_type_error: "Invalid category", required_error:"Category is required"}).min(1).max(50),
    image: z.any(),
});

export async function addProductServer(prevState:any, formData: FormData) {
    if (!formData) {
        return {
            error: "No form data",
        };
    }
    let image = null;
    let imageError  
    let maxImageSize = 10000000;

    const data = product.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        amount: formData.get('amount'),
        description: formData.get('description'),
        category: formData.get('category'),
        image: formData.get('image'),
    });

    if ((formData.get('image') as File).size > maxImageSize) {
        imageError = "Image must be less than 10MB";
    }

    if (!data.success) {
        if (imageError) {
            return {
                error: {...data.error.flatten().fieldErrors, image: imageError},
            };
        }
        return {
            error: data.error.flatten().fieldErrors,
        };
    }

    //If there is an image convert image to buffer and upload to Uploadcare
    if ((formData.get('image') as File).size > 1){
        const file = formData.get('image');
        const arrayBuffer = await (file as File).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileUpload = await uploadFile(buffer, {publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string, fileName: (file as File).name});
        image = fileUpload.uuid;
    }
    

    let {name, price, amount, description, category} = data.data;
    //Capitalize name and trim whitespace
    name = capitalize(name).trim();
    description = description.trim();
    
    try{
        const db = drizzle(sql)
        await db.insert(products).values({name: name, price: price, amount: amount, description: description, category: category, image: image})
    } catch (e: any) {
        //If product is not added to database delete image from Uploadcare
        if (image){
            const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
                publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
                secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
            });
            deleteFile({uuid: image}, {authSchema:uploadcareSimpleAuthSchema})
        }
        if (e.code === '23505') {
            return {
                error: "Product already exists",
            };
        } else {
            return {
                error: "Error adding product",
            };
        }
    }
    await revalidateProducts();
    return {
        success: "Product added successfully",
    };
}