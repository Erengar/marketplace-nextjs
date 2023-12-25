import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { capitalize } from "lodash";

export async function GET(
    request: Request,
    { params }: { params: { category: string } }) {

    let products
    try {
        products = await sql`SELECT * FROM products where category = ${capitalize(params.category)}`;
    } catch (error) {
        return NextResponse.json({error})
    }
    return NextResponse.json({ data : products.rows})
}