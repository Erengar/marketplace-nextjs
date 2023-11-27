import Category from './components/page/Category'
import './globals.css'
import { Metadata } from 'next'
import { CategoryType } from './schemas'
import getCategories from "./helperfunctions/getCategories"

export const metadata: Metadata = {
    title: 'Home',
}


export default async function Page() {

    const rows: CategoryType[] = await getCategories()
    return (
    <ul className="flex flex-row flex-wrap gap-6 m-auto mx-2 xl:mx-80 mt-12">
        {rows.map((category) => (
            <Category key={category.name} category={category} />
        ))}
    </ul>
    );
}