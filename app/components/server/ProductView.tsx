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
            className={`bg-slate-100 ${modal ? null : "md:w-3/4"} grid grid-cols-1 rounded lg:grid-cols-2`}
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
                <div className="flex h-1/2 w-full flex-col place-items-center justify-around rounded border bg-slate-100">
                    <h1 className="font-bold md:text-xl">{product.name}</h1>
                    <PriceTag
                        price={product.price}
                        className="font-semibold md:text-xl"
                    />
                    <AddToCart product={product} className="md:text-xl" />
                </div>
                {product.description ? (
                    <p className="text-xs md:text-base">product.description</p>
                ) : (
                    <LoremIpsum p={1} avgSentencesPerParagraph={10} />
                )}
            </div>
        </div>
    );
}
