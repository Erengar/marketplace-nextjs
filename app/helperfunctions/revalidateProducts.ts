import { revalidatePath, revalidateTag } from 'next/cache';

export default async function revalidateProducts() {
    revalidatePath("/admin"),
    revalidatePath("/[category]", 'page'),
    revalidateTag("products")
}