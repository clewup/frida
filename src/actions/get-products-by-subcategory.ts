"use server"

import prisma from "@/lib/prisma";
import {sanitizeProducts} from "@/common/utils/mappers";

export default async function getProductsBySubcategory(subcategory: string) {
    const products = await prisma.product.findMany({
        include: {category: true, subcategory: true},
        where: {subcategory: {name: subcategory}},
    })

    return sanitizeProducts(products);
}