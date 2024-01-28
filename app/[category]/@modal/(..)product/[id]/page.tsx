"use server"

import { Modal } from './modal';
import ProductView from '@/app/components/server/ProductView';
import { Suspense } from 'react';
import ProductViewSkeleton from '@/app/components/server/ProductViewSkeleton';


export default async function PhotoModal({params}: {params: {id: number}}) {
    return (
        <Modal>
            <Suspense fallback={<ProductViewSkeleton modal={true}/>}>
                <ProductView modal={true} params={params}/>
            </Suspense>
        </Modal>);
}
