/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: "custom"
    },
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin/categories",
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
