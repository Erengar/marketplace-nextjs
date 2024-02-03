import ShoppingCart from "../components/client/ShoppingCart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart",
};

export default function Page() {
    return <ShoppingCart />;
}
