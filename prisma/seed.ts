import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const electronic = await prisma.categories.create({
        data: {
            name: 'Electronics',
            description: 'Electronic products',
        },
    })
    const fashion = await prisma.categories.create({
        data: {
            name: 'Clothing and Accessories',
            description: 'Fashion products',
        },
    })
    const book = await prisma.categories.create({
        data: {
            name: 'Books',
            description: 'Book products',
        },
    })
    const family = await prisma.categories.create({
        data: {
            name: 'Family',
            description: 'Family products',
        },
    })
    const garden = await prisma.categories.create({
        data: {
            name: 'Home and Garden',
            description: 'Garden products',
        },
    })
    const vehicles = await prisma.categories.create({
        data: {
            name: 'Vehicles',
            description: 'Vehicles',
        },
    })
    const sport = await prisma.categories.create({
        data: {
            name: 'Sport',
            description: 'Sport products',
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })