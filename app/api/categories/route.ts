import { sql } from '@vercel/postgres';
import { CategoryType } from '../../schemas';
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server';

export const revalidate = 0

export async function GET(
    request: NextRequest){
    //Default values
    let offset = 0
    let limit = 20

    try {
        throw new Error('Error')
        const res = request.nextUrl.searchParams
        if (res.has('offset')) {
            offset = parseInt(res.get('offset')!);
        }
        if (res.has('limit')) {
            limit = parseInt(res.get('limit')!);
        }       
        const {rows}  = await sql<CategoryType>`SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`
        return NextResponse.json(
            {
                data: rows
            },
            {
                status: 200
            })

    } catch (error: any) {
        throw new Error(error.message)
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            })
    }
}