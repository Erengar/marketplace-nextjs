"use server";

import { Modal } from "./modal";
import ProductView from "@/app/components/server/ProductView";
import { Suspense } from "react";
import ProductViewSkeleton from "@/app/components/skeletons/SkeletonProductView";

export default async function PhotoModal({
    params,
}: {
    params: { id: string };
}) {
    return (
        <Modal>
            <Suspense fallback={<ProductViewSkeleton modal={true} />}>
                <ProductView modal={true} params={params} />
            </Suspense>
        </Modal>
    );
}
