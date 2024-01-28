"use server"
import ProductView from '@/app/components/server/ProductView';
import ProductViewSkeleton from '@/app/components/server/ProductViewSkeleton';
import { Suspense } from 'react';


export default async function Page({params}: {params: {id: number}}) {
    return (
        <section className="flex justify-center">
            <Suspense fallback={<ProductViewSkeleton/>}>
                <ProductView params={params}/>
            </Suspense>
        </section>
    )
}