import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }) {
    try {
        await sql`DELETE FROM products WHERE id = ${params.id}`;
    } catch (error) {
        return NextResponse.json({error})
    }
    return NextResponse.json({ status: 200})
}