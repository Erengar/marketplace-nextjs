import { Modal } from './modal';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductView from '@/app/components/server/ProductView';
import { Suspense } from 'react';


export default async function PhotoModal({params}: {params: {id: number}}) {
    const db = drizzle(sql)
    const query = await db.select().from(products).where(eq(products.id, params.id))
    const product = query[0]
    return (
        <Modal>
            <Suspense fallback="Loading...">
                <ProductView modal={true} product={product}/>
            </Suspense>
        </Modal>);
}
