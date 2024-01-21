import Category from './components/client/Category'
import { Metadata } from 'next'
import { type CategoryType } from '../db/schema'
import  getCategories  from './helperfunctions/getCategories'


export const metadata: Metadata = {
    title: 'Home',
}


export default async function Page() {
    const categories: CategoryType[] = await getCategories()

    return (
    <main>
        <ul className="flex flex-row flex-wrap gap-6 m-auto mx-2 xl:mx-80 mt-12">
            {categories.map((category) => (
                <Category key={category.name} category={category} />
                ))}
        </ul>
    </main>
    );
}