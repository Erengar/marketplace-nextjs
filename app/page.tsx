import { PrismaClient } from '@prisma/client'
import Category from './components/Category'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
}


interface category {
    id: number
    name: string
    description: string | null
}

export default function Page(): JSX.Element {
    const prisma = new PrismaClient()
    const allCategories: Promise<category[]> = prisma.categories.findMany()

    return (
    <ul className="flex flex-row flex-wrap gap-6 m-auto xl:mx-80">
        {allCategories.then((categories: category[]) => categories.map((category: category): JSX.Element => (
            <Category key={category.id} category={category} />
        )))}
    </ul>
    );
}