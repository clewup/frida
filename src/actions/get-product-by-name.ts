"use server"

import prisma from "@/lib/prisma";
import {sanitizeProduct} from "@/common/utils/mappers";

export default async function getProductByName(productName: string) {
    const decodedName = decodeURIComponent(productName)

    const product = await prisma.product.findFirst({
        include: {category: true, subcategory: true},
        where: {name: decodedName},
    })

    return product ? sanitizeProduct(product) : null;
}