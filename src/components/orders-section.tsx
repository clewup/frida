"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Eye, Download} from "lucide-react"

const orders = [
    {
        id: "ORD-001",
        date: "2024-01-15",
        status: "delivered",
        total: "$129.99",
        items: 3,
    },
    {
        id: "ORD-002",
        date: "2024-01-10",
        status: "shipped",
        total: "$89.50",
        items: 2,
    },
    {
        id: "ORD-003",
        date: "2024-01-05",
        status: "processing",
        total: "$199.99",
        items: 1,
    },
    {
        id: "ORD-004",
        date: "2023-12-28",
        status: "delivered",
        total: "$45.00",
        items: 4,
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "delivered":
            return "bg-green-100 text-green-800"
        case "shipped":
            return "bg-blue-100 text-blue-800"
        case "processing":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export function OrdersSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your recent orders and purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(order.status)} variant="secondary">
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.items} items</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="mr-2 h-4 w-4"/>
                                                View
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Download className="mr-2 h-4 w-4"/>
                                                Invoice
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
