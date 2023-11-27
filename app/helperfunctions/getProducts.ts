
export async function getProducts(category: string) {
    await fetch(`/api/products/${category}`)
    .then(res => res.json())
    .then(data => {
        return data.data
        })
    .catch(err => (err))
}