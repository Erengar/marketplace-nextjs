import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { categories } from "../../../db/schema";

export const revalidate = 0;

export async function GET(request: NextRequest) {
    const db = drizzle(sql);
    //Default values
    let offset = 0;
    let limit = 20;

    try {
        const result = await db.select().from(categories);
        return NextResponse.json(
            {
                data: result,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            },
        );
    }
}
