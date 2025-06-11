'use client'

import {ProductCard} from '@/components/product-card'
import React, {type FC, useMemo} from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select'
import {useSearchParams} from "next/navigation";
import {ProductType} from "@/common/types/productTypes";
import {Heading} from "@/components/heading";

interface Props {
    products: ProductType[]
}

export const ProductsList: FC<Props> = ({products}) => {
    const searchParams = useSearchParams()

    const selectedCategories = searchParams.get("categories")?.split(",") || []
    const selectedColours = searchParams.get("colours")?.split(",") || []
    const selectedPriceRanges = searchParams.get("price")?.split(",") || []
    const sortBy = searchParams.get("sort") || "name"

    const filteredProducts: ProductType[] = useMemo(() => {
        let filtered = products

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) => selectedCategories.includes(product.category.name))
        }

        // Filter by colours
        if (selectedColours.length > 0) {
            filtered = filtered.filter((product) => selectedColours.includes(product.colour))
        }

        // Filter by price ranges
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter((product) => {
                return selectedPriceRanges.some((range) => {
                    if (range === "0-50") return product.price < 50
                    if (range === "50-100") return product.price >= 50 && product.price < 100
                    if (range === "100-300") return product.price >= 100 && product.price < 300
                    if (range === "300-1000") return product.price >= 300 && product.price < 1000
                    if (range === "1000+") return product.price >= 1000
                    return false
                })
            })
        }

        // Sort products
        filtered.sort((a: ProductType, b: ProductType) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "name":
                default:
                    return a.name.localeCompare(b.name)
            }
        })

        return filtered
    }, [selectedCategories, selectedColours, selectedPriceRanges, sortBy])

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "name") {
            params.delete("sort")
        } else {
            params.set("sort", value)
        }
        window.history.pushState(null, "", `?${params.toString()}`)
    }

    return (
        <div className="space-y-6">
            <h1 className="text-5xl">shop furniture</h1>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                </p>

                <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-48 bg-white">
                        <SelectValue placeholder="sort by"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">name (a-z)</SelectItem>
                        <SelectItem value="price-low">price (low to high)</SelectItem>
                        <SelectItem value="price-high">price (high to low)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products found matching your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    )
}

