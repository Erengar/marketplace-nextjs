import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { capitalize } from "lodash";

export async function GET(
    request: Request) {

    let products
    try {
        products = await sql`SELECT * FROM products`;
    } catch (error) {
        return NextResponse.json({error})
    }
    return NextResponse.json({ data : products.rows})
}