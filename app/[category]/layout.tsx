import Sidebar from "../components/server/Sidebar";
import React from "react";
import ExpandableSidebar from "../components/client/ExpandableSidebar";
import getCategories from "../helperfunctions/getCategories";

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
                <section
                    className="divide flex
                w-32 max-w-xl flex-col divide-y divide-black bg-slate-300 font-semibold"
                >
                    {categories.map((category) => (
                        <Sidebar
                            key={category.name}
                            category={category}
                            selectedCategory={params.category}
                        />
                    ))}
                </section>
                <ExpandableSidebar />
            </div>
            {children}
            {modal}
        </main>
    );
}
