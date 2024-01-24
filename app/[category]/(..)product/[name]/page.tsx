import { Modal } from './modal';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import SetImage from "@/app/components/client/SetImage";

export default async function PhotoModal({params}: {params: {name: string}}) {
    const db = drizzle(sql)
    const query = await db.select().from(products).where(eq(products.name, params.name))
    const product = query[0]
    return (
        <Modal>
            <div className='bg-slate-100 w-3/4 mt-12 grid grid-cols-2'>
                <div className='col-span-1'>
                    <SetImage uuid={product.image} name={product.name} width={520} height={520}/>
                </div>
                <div className='col-span-1'>
                    <h1>{product.name}</h1>
                    <h3>{product.price}€</h3>
                </div>
            </div>
        </Modal>);
}
