"use server"

import prisma from "@/lib/prisma";
import {sanitizeProducts} from "@/common/utils/mappers";

export default async function getTrendingProducts() {
    const products = await prisma.product.findMany({
        include: {category: true, subcategory: true}
    });

    return sanitizeProducts(products);
}