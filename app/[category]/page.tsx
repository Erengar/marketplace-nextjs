import { Metadata } from 'next';
import { capitalize } from 'lodash';
import Products from '../components/client/Products';
import CategoryHeader from '../components/server/CategoryHeader';
import { Suspense } from 'react';
import SkeletonCategoryHeader from '../components/skeletons/SkeletonCategoryHeader';

export async function generateMetadata({params, searchParams}:
    {params: {category: string}, searchParams: URLSearchParams}):
    Promise<Metadata> {
    return {
        title: `${capitalize(params.category)} | Market`
    }
}


export default async function Page({params} : {params : { category : string }}){
    return (
        <section className="w-full px-2">
            <Suspense fallback={<SkeletonCategoryHeader/>}>
                <CategoryHeader categoryName={params.category}/>
            </Suspense>
            <Products category={params.category}/>
        </section>
    );
}