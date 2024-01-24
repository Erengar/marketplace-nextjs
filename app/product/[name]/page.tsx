"use server"
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { products } from "../../../db/schema";
import { eq } from "drizzle-orm";
import SetImage from "../../components/client/SetImage";


export default async function Page({params}: {params: {name: string}}) {
    const db = drizzle(sql)
    const query = await db.select().from(products).where(eq(products.name, params.name))
    const product = query[0]
    return (
        <section className="flex justify-center">
            <div className='bg-slate-100 w-3/4 mt-12 grid grid-cols-2 p-8'>
                <div className='col-span-1'>
                    <SetImage uuid={product.image} name={product.name} width={520} height={520}/>
                </div>
                <div className='col-span-1 flex flex-col place-items-center gap-4'>
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <h3>{product.price}€</h3>
                </div>
            </div>
        </section>
    )
}