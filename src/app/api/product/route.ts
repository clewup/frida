import {NextRequest, NextResponse as response} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany();

    return response.json(products)
}