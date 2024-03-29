"use server";

import getCategories from "@/helperfunctions/getCategories";
import { CategoryType } from "@/db/schema";
import { LoremIpsum } from "react-lorem-ipsum";
import { capitalize } from "lodash";
import { Typography } from "@mui/material";

export default async function CategoryHead({
    categorySlug,
}: {
    categorySlug: string;
}) {
    const category = await getCategories(categorySlug).then(
        (categories: CategoryType[]) => categories[0],
    );
    return (
        <>
            <h1
                className="flex justify-center text-xl font-semibold text-blue-900 antialiased
            dark:text-gray-200
            md:text-4xl"
            >
                {capitalize(category?.name)}
            </h1>
            <div className="mx-4 mb-4 mt-2 h-20 text-xs text-gray-900 dark:text-gray-300 md:text-base lg:mx-32">
                {category?.description ? (
                    category.description
                ) : (
                    <LoremIpsum p={1} avgSentencesPerParagraph={10} />
                )}
            </div>
        </>
    );
}
