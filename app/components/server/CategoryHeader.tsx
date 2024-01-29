"use server";

import getCategories from "@/app/helperfunctions/getCategories";
import { CategoryType } from "@/db/schema";
import { LoremIpsum } from 'react-lorem-ipsum';
import { capitalize } from 'lodash';

function wait(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function CategoryHead({categoryName}: {categoryName: string}) {
    const category = await getCategories(categoryName).then((categories: CategoryType[]) => categories[0]);
    await wait(1000)
    return (
        <>
        <h1 className="flex justify-center text-xl antialiased font-semibold
            text-blue-900
            md:text-4xl">
            {capitalize(category.name)}
        </h1>
        <div className='text-xs md:text-base mx-4 lg:mx-32 mt-2 mb-4'>
            {category.description ? category.description : <LoremIpsum p={1} avgSentencesPerParagraph={10}/>}
        </div>
        </>
    )
}