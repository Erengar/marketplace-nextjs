import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { capitalize } from "lodash";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { products } from "../../../db/schema";
import { asc, desc, eq } from "drizzle-orm";


export const revalidate = 0

export async function GET(
    request: NextRequest) {
    const db = drizzle(sql)
    //Default values
    let currentPage : number
    let limit
    let itemsPerPage = 10
    let sort
    let category
    let res
    let sortDirection = 'ASC'
    let result
    let total


    try {
        res = request.nextUrl.searchParams
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }

    currentPage = parseInt(res.get('currentpage')!) || 1
    itemsPerPage = parseInt(res.get('itemsperpage')!) || 10
    limit = currentPage * itemsPerPage
    
    try {
        sort = res.get('sort') || 'name'
        if (sort.includes('-')) {
            sortDirection = 'DESC'
        }
        if (sort.includes('category')) {
            sort = products.category
        } else if (sort.includes('price')) {
            sort = products.price
        } else if (sort.includes('stock')) {
            sort = products.amount
        } else  {
            sort = products.name
        } 
    } catch (error: any) {
        return NextResponse.json({error: "Invalid sorting parameter"})
    }
    

    try {
        const res = request.nextUrl.searchParams
        category = res.get('category') || 'All'
        if (category === 'All') {
            if (sortDirection === 'ASC') {
                result = await db.select().from(products).orderBy(asc(sort))
                total = result.length
                result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            } else {
                result = await db.select().from(products).orderBy(desc(sort)).limit(limit)
                total = result.length
                result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            }
        } else {
            if (sortDirection === 'ASC') {
                result = await db.select().from(products).where(eq(products.category, category)).orderBy(asc(sort))
                total = result.length
                result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            } else {
                result = await db.select().from(products).where(eq(products.category, category)).orderBy(desc(sort))
                total = result.length
                result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            }
        }
        
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
    return NextResponse.json({data: result, total: total})
}