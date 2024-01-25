import { type ProductType } from "@/db/schema";
import SetImage from "@/app/components/client/SetImage"
import LoremIpsum from "react-lorem-ipsum";
import AddToCart from "@/app/components/client/AddToCart";

export default function ProductView({product, modal=false} : {product: ProductType, modal?: boolean}) {
    return (
        <div className={`bg-slate-100 ${modal? null: "w-3/4"} grid grid-cols-2 rounded`}>
            <div className='col-span-1 p-8'>
                <SetImage className="border border-black rounded" uuid={product.image} name={product.name} width={520} height={520}/>
            </div>
            <div className='col-span-1 flex flex-col justify-between h-full place-items-center gap-4 p-8'>
                <div className="border rounded bg-slate-100 w-full h-1/2 flex flex-col place-items-center justify-around">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <h3 className="text-xl font-semibold">{product.price}€</h3>
                    <AddToCart product={product} className="text-xl"/>
                </div>
                <p className="">{product.description? product.description: <LoremIpsum/>}</p>
            </div>
        </div>
    )
}