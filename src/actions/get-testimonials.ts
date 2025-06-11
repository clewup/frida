"use server"

import prisma from "@/lib/prisma";
import {sanitizeProduct} from "@/common/utils/mappers";

export default async function getTestimonials() {
    const PRODUCT_IDS = [5, 10, 20]

    const products = await prisma.product.findMany({
        include: {category: true, subcategory: true},
        where: {id: {in: PRODUCT_IDS}},
    })

    return Promise.resolve([
        {
            rating: 4,
            product: sanitizeProduct(products[0]),
            review: 'Finished off my living room perfectly!'
        },
        {
            rating: 5,
            product: sanitizeProduct(products[1]),
            review: 'Super comfortable and trendy.'
        },
        {
            rating: 4,
            product: sanitizeProduct(products[2]),
            review: 'Really high quality and easy to assemble.'
        }
    ])
}