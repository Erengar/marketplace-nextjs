import { Metadata } from 'next';
import { capitalize } from 'lodash';
import Products from '../components/client/Products';
import { Suspense } from 'react';
import SkeletonProducts from '../components/server/SkeletonProducts';
import { LoremIpsum } from 'react-lorem-ipsum';
import getProducts from '../helperfunctions/getProducts';

export async function generateMetadata({params, searchParams}:
    {params: {category: string}, searchParams: URLSearchParams}):
    Promise<Metadata> {
    return {
        title: `${capitalize(params.category)} | Market`
    }
} 

export default async function Page({params} : {params : { category : string }}){
    let description
    const products = await getProducts(params.category)
    return (
        <section className="w-full px-2">
            <Suspense fallback={<SkeletonProducts/>}>
                <h1 className="flex justify-center text-xl antialiased font-semibold
                text-blue-900
                md:text-4xl">
                    {capitalize(params.category)}
                </h1>
                <div className='text-xs md:text-base mx-4 lg:mx-32 mt-2 mb-4'>
                    {description ? description : <LoremIpsum p={1} avgSentencesPerParagraph={10}/>}
                </div>
                <Products products={products} />
            </Suspense>
        </section>
    );
}