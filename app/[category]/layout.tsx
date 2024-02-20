import Sidebar from "../components/client/Sidebar";
import React from "react";
import ExpandableSidebar from "../components/client/ExpandableSidebar";
import getCategories from "../../helperfunctions/getCategories";

export default async function Layout({
    params,
    children,
    modal,
}: {
    params: { category: string };
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    const categories = await getCategories();
    return (
        <main className="flex gap-2">
            <div
                id="sidebar"
                className="fixed -left-32 flex flex-row md:static"
            >
                <Sidebar categories={categories} />
                <ExpandableSidebar />
            </div>
            {children}
            {modal}
        </main>
    );
}
