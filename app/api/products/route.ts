import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { capitalize } from "lodash";


export const revalidate = 0

export async function GET(
    request: NextRequest) {
    const client = sql.connect();
    let products
    //Default values
    let currentPage = 1
    let limit = 10
    let sort = 'name'
    let category = 'All'


    try {
        const res = request.nextUrl.searchParams
        category = res.get('category') || 'All'
        sort = res.get('sort') || 'name'
        if (sort.includes('-')) {
            sort = sort.replace('-', '')
            console.log(`SELECT * FROM products ORDER BY ${sort} DESC;`)
            if (category === 'All') {
                products = await (await client).sql`SELECT * FROM products ORDER BY ${sort} DESC;`;
            } else {
                products = await (await client).sql`SELECT * FROM products WHERE category = ${category} ORDER BY ${sort} DESC;`;
            }
        } else{
            if (category === 'All') {
                products = await (await client).sql`SELECT * FROM products ORDER BY ${sort} ASC;`;
            } else {
                products = await (await client).sql`SELECT * FROM products WHERE category = ${category} ORDER BY ${sort} ASC;`;
            }
        }
    } catch (error) {
        (await client).release()
        return NextResponse.json({error})
    }
    (await client).release()
    return NextResponse.json({ data : products.rows, count: products.rowCount})
}