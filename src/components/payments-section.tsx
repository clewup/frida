"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {CreditCard, Plus, Trash2} from "lucide-react"

const paymentMethods = [
    {
        id: "1",
        type: "Visa",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "2025",
        isDefault: true,
    },
    {
        id: "2",
        type: "Mastercard",
        last4: "8888",
        expiryMonth: "08",
        expiryYear: "2026",
        isDefault: false,
    },
]

export function PaymentsSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your saved payment methods and billing
                                information.</CardDescription>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4"/>
                            Add Payment Method
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                        <CreditCard className="h-5 w-5"/>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {method.type} ending in {method.last4}
                      </span>
                                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Expires {method.expiryMonth}/{method.expiryYear}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {!method.isDefault && (
                                        <Button variant="outline" size="sm">
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
