"use server";

import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartBuble from "../client/ShoppingCartBuble";

const navbarItems = ["Home"];

export default async function Navbar() {
    return (
        <nav
            className="h-7 bg-sky-100 pt-1 dark:bg-slate-700
        md:h-14
        md:pt-3"
        >
            <ul className="flex flex-row justify-center gap-10 text-xs font-bold text-sky-900 md:text-base">
                {navbarItems.map(
                    (item: string): JSX.Element =>
                        item === "Home" ? (
                            <li key={item}>
                                <Link href="/">
                                    <h3>{item}</h3>
                                </Link>
                            </li>
                        ) : (
                            <li key={item}>
                                <Link href={`/${item.toLowerCase()}`}>
                                    <h3>{item}</h3>
                                </Link>
                            </li>
                        ),
                )}
                <li key="admin">
                    <Link href="/admin/categories">Admin</Link>
                </li>
                <li key="cart">
                    <Link href="/shoppingcart" className="relative">
                        <ShoppingCartBuble/>
                        <h3>
                            <ShoppingCartIcon />
                        </h3>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
