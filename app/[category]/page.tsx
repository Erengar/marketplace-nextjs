import { Metadata } from 'next';
import { capitalize } from 'lodash';
import Products from './components/Products';
import { Suspense } from 'react';

export async function generateMetadata({params, searchParams}:
    {params: {category: string}, searchParams: URLSearchParams}):
    Promise<Metadata> {
    return {
        title: `${capitalize(params.category)} | Market`
    }

} 

export default function Page({params} : {params : { category : string }}){
    return (
        <section className="w-full px-2">
            <h1 className="flex justify-center text-xl antialiased font-semibold
            text-blue-900
            md:text-4xl">
                {capitalize(params.category)}
            </h1>
            <Products category={params.category} />
        </section>
    );
}