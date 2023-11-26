import { Metadata } from 'next';

export async function generateMetadata({params, searchParams}:
    {params: {category: string}, searchParams: URLSearchParams}):
    Promise<Metadata> {
    return {
        title: `${params.category} | Market`
    }

}

export default function Page({params} : {params : { category : string }}){
    return (
        <section >
            <p>Category: `${params.category}`</p>
        </section>
    );
}