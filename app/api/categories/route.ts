import { sql } from '@vercel/postgres';
import { CategoryType } from '../../schemas';
import { NextResponse } from "next/server";

export const revalidate = 'force-cache'

export async function GET(
    request: Request){
    const {rows}  = await sql<CategoryType>`SELECT * FROM categories`
    return NextResponse.json({data: rows})
}