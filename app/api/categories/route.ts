import { sql } from '@vercel/postgres';
import { CategoryType } from '../../schemas';
import { NextResponse } from "next/server";

export async function GET(
    request: Request){
    console.log('FETCHING')
    const {rows}  = await sql<CategoryType>`SELECT * FROM categories`
    console.log("FETCHED")
    return NextResponse.json({data: rows})
}