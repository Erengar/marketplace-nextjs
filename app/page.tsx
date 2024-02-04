import { Metadata } from "next";
import Categories from "./components/server/Categories";
import { Suspense } from "react";
import SkeletonFrontPage from "./components/skeletons/SkeletonFrontPage";

export const metadata: Metadata = {
    title: "Home | Market",
    description: "",
    keywords: "",
};

export default async function Page() {
    return (
        <Suspense fallback={<SkeletonFrontPage/>}>
            <Categories />
        </Suspense>
    );
}
