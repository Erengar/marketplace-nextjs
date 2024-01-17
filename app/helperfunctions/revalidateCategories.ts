import { revalidatePath, revalidateTag } from 'next/cache';

export default async function revalidateCategories() {
    revalidatePath('/', 'page'),
    revalidatePath("/admin"),
    revalidatePath("/[category]", 'layout'),
    revalidateTag("categories")
}