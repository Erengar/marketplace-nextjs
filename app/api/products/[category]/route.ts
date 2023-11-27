import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { capitalize } from "lodash";

export async function GET(
    request: Request,
    { params }: { params: { category: string } }) {
    const client = await db.connect();
    let products
    try {
        products = await client.query(`SELECT * FROM products where category = '${capitalize(params.category)}'`);
    } catch (error) {
        return NextResponse.json({error})
    }
    return NextResponse.json({ data : products.rows})
}