import AddProduct from "../../components/client/AddProduct";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Products | Admin",
};

export default async function Page() {
    return <AddProduct />;
}
