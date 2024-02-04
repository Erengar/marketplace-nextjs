"use client";
import { CategoryType } from "../../../db/schema";

type CategoriesFilterProps = {
    categories: any;
    categoriesFilter: string | null;
    setCategoriesFilter: React.Dispatch<React.SetStateAction<string | null>>;
};


export default function CategoriesFilter({ categories, categoriesFilter, setCategoriesFilter}: CategoriesFilterProps) {
    return (
        <>
            <label htmlFor="categoriesFilter" className="sr-only">
                Filter by Categories
            </label>
            <select
                id="categoriesFilter"
                value={categoriesFilter!}
                onChange={(e) => setCategoriesFilter(e.target.value)}
                className="antialised align-self-end m-2 h-8 w-fit rounded border border-sky-950 pl-2 text-xs font-semibold text-sky-950 dark:border-sky-200 dark:text-sky-200 md:m-4 md:w-20 md:text-base"
            >
                <option value="All">All</option>
                {categories.data?.data &&
                    categories.data.data.map((category: CategoryType) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
            </select>
        </>
    );
}
