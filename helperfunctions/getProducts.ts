import { type ProductType } from "../db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { products } from "../db/schema";
import { eq } from "drizzle-orm";

type getProductsType = {
    currentPage?: number;
    itemsPerPage?: number;
    category?: string;
    sort?: string;
    id?: string;
};

export default async function getProducts({
    currentPage = 1,
    itemsPerPage,
    category,
    sort,
    id,
}: getProductsType): Promise<ProductType[]> {
    if (id) {
        const db = drizzle(sql);
        const result = await db
            .select()
            .from(products)
            .where(eq(products.id, id));
        return result;
    }
    const result = await fetch(
        `${process.env.DEPLOYMENT_URL}api/products/?currentpage=${currentPage}&itemsperpage=${itemsPerPage}&category=${category}&sort=${sort}`,
        { next: { tags: ["products"] } },
    )
        .then((res) => res.json())
        .then((data) => data.data as ProductType[]);
    return result;
}
