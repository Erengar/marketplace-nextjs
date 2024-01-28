"use server"

import SetImage from "@/app/components/client/SetImage"
import LoremIpsum from "react-lorem-ipsum";
import AddToCart from "@/app/components/client/AddToCart";
import PriceTag from "../client/PriceTag";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductView({modal=false, params} : { modal?: boolean, params: {id: number}}) {
    const db = drizzle(sql)
    const query = await db.select().from(products).where(eq(products.id, params.id))
    const product = query[0]
    return (
        <div className={`bg-slate-100 ${modal? null: "md:w-3/4"} grid grid-cols-1 lg:grid-cols-2 rounded`}>
            <div className='col-span-1 md:p-8 flex justify-center'>
                <SetImage className="border border-black rounded" uuid={product.image} name={product.name} width={620} height={520}/>
            </div>
            <div className='col-span-1 flex flex-col justify-between h-full place-items-center gap-4 p-4 md:p-8'>
                <div className="border rounded bg-slate-100 w-full h-1/2 flex flex-col place-items-center justify-around">
                    <h1 className="md:text-xl font-bold">{product.name}</h1>
                    <PriceTag price={product.price} className="md:text-xl font-semibold"/>
                    <AddToCart product={product} className="md:text-xl"/>
                </div>
                {product.description ? <p className="text-xt md:text-base">product.description</p>: <LoremIpsum p={1} avgSentencesPerParagraph={10}/>}
            </div>
        </div>
    )
}