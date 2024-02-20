"use server";

import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartBuble from "../client/ShoppingCartBuble";
import NavbarSignIn from "../client/NavbarSignIn";
import { ThemeSwitcher } from "../client/ThemeSwitcher";
import AdminLink from "./AdminLink";
import {Tabs, Tab } from "@mui/material";

export default async function Navbar() {
    return (
        <nav
            className="h-7 dark:bg-blue-300
        md:h-14"
        >
            <Tabs centered value={1}>
                <Link href="/">
                    <Tab label="Home" className="font-semibold text-sky-900 opacity-100"/>
                </Link>
                <div>
                    <AdminLink />
                </div>
                <NavbarSignIn />
                <Link href="/shoppingcart" className="relative">
                    <ShoppingCartBuble />
                    <Tab icon={<ShoppingCartIcon />} className="font-semibold text-sky-900 opacity-100"/>
                </Link>
            </Tabs>
        </nav>
    );
}
