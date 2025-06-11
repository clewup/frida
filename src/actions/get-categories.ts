"use server"

import prisma from "@/lib/prisma";
import {auth} from "@/auth";

export default async function getCategories() {
    return prisma.category.findMany({
        include: {
            subcategories: true
        }
    })
}