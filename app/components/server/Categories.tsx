"use server";
import Category from "../../components/client/Category";
import { type CategoryType } from "../../../db/schema";
import getCategories from "../../helperfunctions/getCategories";

export default async function Categories() {
    const categories: CategoryType[] = await getCategories();
    return (
        <ul className="m-auto mx-2 mt-12 flex flex-row flex-wrap gap-2 xl:mx-80">
            {categories.map((category) => (
                <Category key={category.name} category={category} />
            ))}
        </ul>
    )
}