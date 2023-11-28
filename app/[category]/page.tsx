import { Metadata } from 'next';
import { capitalize } from 'lodash';
import Products from '../components/page/category/Products';
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
        <section>
            {capitalize(params.category)}
            <Products />
        </section>
    );
}