import ProductView from "@/app/components/server/ProductView";
import ProductViewSkeleton from "@/app/components/skeletons/SkeletonProductView";
import { Suspense } from "react";
import { Metadata } from "next";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { products } from "@/db/schema";
import { capitalize } from "lodash";
import { eq } from "drizzle-orm";

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: URLSearchParams;
}): Promise<Metadata> {
    const db = drizzle(sql)
    const name = await db.select({name: products.name}).from(products).where(eq(products.id, params.id)).then((res) => res[0].name)
    return {
        title: `${capitalize(name)} | Product | Market`,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <section className="flex justify-center">
            <Suspense fallback={<ProductViewSkeleton />}>
                <ProductView params={params} />
            </Suspense>
        </section>
    );
}
