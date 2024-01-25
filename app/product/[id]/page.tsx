"use server"
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { products } from "../../../db/schema";
import { eq } from "drizzle-orm";
import ProductView from '@/app/components/server/ProductView';


export default async function Page({params}: {params: {id: number}}) {
    console.log(params)
    const db = drizzle(sql)
    const query = await db.select().from(products).where(eq(products.id, params.id))
    const product = query[0]
    return (
        <section className="flex justify-center">
            <ProductView product={product}/>
        </section>
    )
}