import {sql} from '@vercel/postgres'
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    {params}: {params : {category: string}}){
    await sql`DELETE FROM categories WHERE name = ${params.category}`
    return NextResponse.json({status: 200})
}