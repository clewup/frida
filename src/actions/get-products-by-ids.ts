"use server"

import prisma from "@/lib/prisma";
import {sanitizeProducts} from "@/common/utils/mappers";

export default async function getProductByIds(productIds: number[]) {
    const products = await prisma.product.findMany({
        include: {category: true, subcategory: true},
        where: {id: {in: productIds}},
    })

    return sanitizeProducts(products)
}