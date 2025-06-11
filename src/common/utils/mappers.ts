import {ProductType} from "@/common/types/productTypes";
import {Category, Product, Subcategory, User} from "@prisma/client";

export function sanitizeProduct(product: Product & {
    category: Category,
    subcategory: Subcategory
}): ProductType {
    return {
        ...product,
        price: product.price.toNumber()
    }
}

export function sanitizeProducts(products: (Product & {
    category: Category,
    subcategory: Subcategory
})[]): ProductType[] {
    return products.map(x => sanitizeProduct(x))
}