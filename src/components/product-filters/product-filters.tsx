"use client"

import {useRouter, useSearchParams} from "next/navigation"
import {FC, useCallback} from "react"
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button"
import {X} from "lucide-react"
import {CategoryType} from "@/common/types/categoryTypes";
import {colourMap} from "@/components/product-filters/colour-map";
import cx from "classnames";

const priceRanges = [
    {id: "0-50", label: "Under £50"},
    {id: "50-100", label: "£50 - £100"},
    {id: "100-300", label: "£100 - £300"},
    {id: "300-1000", label: "£300 - £1000"},
    {id: "1000+", label: "£1000+"},
]

interface Props {
    categories: CategoryType[]
}

export const ProductFilters: FC<Props> = ({categories}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectedCategories = searchParams.get("categories")?.split(",") || []
    const selectedColours = searchParams.get("colours")?.split(",") || []
    const selectedPriceRanges = searchParams.get("price")?.split(",") || []

    const updateFilters = useCallback(
        (key: string, value: string, checked: boolean) => {
            const params = new URLSearchParams(searchParams.toString())
            const currentValues = params.get(key)?.split(",") || []

            let newValues: string[]
            if (checked) {
                newValues = [...currentValues, value]
            } else {
                newValues = currentValues.filter((v) => v !== value)
            }

            if (newValues.length > 0) {
                params.set(key, newValues.join(","))
            } else {
                params.delete(key)
            }

            // Reset to first page when filters change
            params.delete("page")

            router.push(`?${params.toString()}`)
        },
        [router, searchParams],
    )

    const clearAllFilters = useCallback(() => {
        router.push("/search")
    }, [router])

    const hasActiveFilters = selectedCategories.length > 0 || selectedColours.length > 0 || selectedPriceRanges.length > 0

    return (
        <div className="space-y-6 w-full">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold underline">filters</h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                    >
                        clear all
                        <X className="ml-1 h-3 w-3"/>
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {/* Categories */}
                <div className="space-y-3">
                    <h3 className="font-medium">categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category.id}`}
                                    checked={selectedCategories.includes(category.name)}
                                    onCheckedChange={(checked) => updateFilters("categories", category.name, checked as boolean)}
                                />
                                <Label htmlFor={`category-${category.id}`}
                                       className="text-sm font-normal cursor-pointer lowercase">
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator/>

                {/* Colours */}
                <div className="space-y-3">
                    <h3 className="font-medium">colours</h3>
                    <div className="space-y-2">
                        {Object.entries(colourMap).map(([colour, className]) => (
                            <div key={colour} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`colour-${colour}`}
                                    checked={selectedColours.includes(colour)}
                                    onCheckedChange={(checked) => updateFilters("colours", colour, checked as boolean)}
                                />
                                <Label htmlFor={`colour-${colour}`}
                                       className="text-sm font-normal cursor-pointer flex items-center lowercase gap-2">
                                    {colour}

                                    <div className={cx("w-4 h-4 aspect-square rounded-full", className)}></div>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator/>

                {/* Price Range */}
                <div className="space-y-3">
                    <h3 className="font-medium">price range</h3>
                    <div className="space-y-2">
                        {priceRanges.map((range) => (
                            <div key={range.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`price-${range.id}`}
                                    checked={selectedPriceRanges.includes(range.id)}
                                    onCheckedChange={(checked) => updateFilters("price", range.id, checked as boolean)}
                                />
                                <Label htmlFor={`price-${range.id}`}
                                       className="text-sm font-normal lowercase cursor-pointer">
                                    {range.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
