"use server";

import SetImage from "@/app/components/client/SetImage";
import LoremIpsum from "react-lorem-ipsum";
import AddToCart from "@/app/components/client/AddToCart";
import PriceTag from "../client/PriceTag";
import getProducts from "@/app/helperfunctions/getProducts";
import { ProductType } from "@/db/schema";

export default async function ProductView({
    modal = false,
    params,
}: {
    modal?: boolean;
    params: { id: string };
}) {
    const product = await getProducts({ id: params.id }).then(
        (products: ProductType[]) => products[0],
    );
    return (
        <div
            className={`bg-slate-100 dark:bg-slate-800 ${modal ? null : "md:w-3/4"} grid grid-cols-1 rounded lg:grid-cols-2`}
        >
            <div className="col-span-1 flex justify-center md:p-8">
                <SetImage
                    className="rounded border border-black"
                    uuid={product.image}
                    name={product.name}
                    width={620}
                    height={520}
                />
            </div>
            <div className="col-span-1 flex h-full flex-col place-items-center justify-between gap-4 p-4 md:p-8">
                <div className="flex h-1/2 w-full flex-col place-items-center justify-around rounded border">
                    <h1 className="font-bold md:text-4xl antialiased text-sky-950 dark:text-sky-200">{product.name}</h1>
                    <PriceTag
                        price={product.price}
                        className="font-semibold md:text-xl dark:text-gray-300 text-sky-950"
                    />
                    <AddToCart product={product} className="md:text-xl" />
                </div>
                {product.description ? (
                    <p className="text-xs md:text-base dark:text-gray-300">product.description</p>
                ) : (
                    <LoremIpsum p={1} avgSentencesPerParagraph={10} />
                )}
            </div>
        </div>
    );
}
