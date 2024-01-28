import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest, } from "next/server";
import { capitalize } from "lodash";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { products } from "../../../db/schema";
import { asc, desc, eq } from "drizzle-orm";
import Fuse from 'fuse.js'



export const revalidate = 0

export async function GET(
    request: NextRequest,
    response: NextResponse,) {
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
        let search : string | null
        try {
            res = request.nextUrl.searchParams
        } catch (error: any) {
            return NextResponse.json({message: error.message}, {status: 400})
        }
        
        
        try {
            search = res.get('searchQuery')
            currentPage = parseInt(res.get('currentpage')!) || 1
            itemsPerPage = parseInt(res.get('itemsperpage')!) || 10
            limit = currentPage * itemsPerPage
            category = res.get('category') || 'All'
            category = capitalize(category)
        } catch (error: any) {
            return NextResponse.json({message: error.message}, {status: 500})
        }
        
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
            return NextResponse.json({message: "Invalid sorting parameter"}, {status: 400})
        }
        
        try {
            if (search !== 'null' && search !== null) {
                result = await db.select().from(products)
                const fuse = new Fuse(result, {keys: ['name', 'category', 'description']})
                result = fuse.search(search!)
                result = result.map((item) => item.item)
                total = result.length
                result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            } else {
                
                if (category === 'All') {
                    if (sortDirection === 'ASC') {
                        result = await db.select().from(products).orderBy(asc(sort)).catch(error => {throw error})
                        total = result.length
                        result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    } else {
                        result = await db.select().from(products).orderBy(desc(sort)).catch(error => {throw error})
                        total = result.length
                        result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    }
                } else {
                    if (sortDirection === 'ASC') {
                        result = await db.select().from(products).where(eq(products.category, category)).orderBy(asc(sort)).catch(error => {throw error})
                        total = result.length
                        result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    } else {
                        result = await db.select().from(products).where(eq(products.category, category)).orderBy(desc(sort)).catch(error => {throw error})
                        total = result.length
                        result = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    }
                }
            }
        } catch {
            return NextResponse.json({message: "Invalid parameters."}, {status: 400})
        }
    return NextResponse.json({data: result, total: total}, {status: 200})
}