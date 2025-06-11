"use server"

import prisma from "@/lib/prisma";
import {sanitizeProducts} from "@/common/utils/mappers";

export default async function getLatestProducts() {
    const products = await prisma.product.findMany({
        include: {category: true, subcategory: true},
        orderBy: {id: 'desc'}
    })

    return sanitizeProducts(products);
}