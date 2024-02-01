import AddCategory from "@/app/components/client/AddCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories | Admin",
};

export default async function Page() {
    return <AddCategory />;
}
