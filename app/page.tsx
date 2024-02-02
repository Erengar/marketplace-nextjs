import Category from "./components/client/Category";
import { Metadata } from "next";
import { type CategoryType } from "../db/schema";
import getCategories from "./helperfunctions/getCategories";

export const metadata: Metadata = {
    title: "Home | Market",
    description: "",
    keywords: "",
};

export default async function Page() {
    const categories: CategoryType[] = await getCategories();
    return (
        <main>
            <ul className="m-auto mx-2 mt-12 flex flex-row flex-wrap gap-2 xl:mx-80">
                {categories.map((category) => (
                    <Category key={category.name} category={category} />
                ))}
            </ul>
        </main>
    );
}
