"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, AlertTriangle, CheckCircle, AlertCircle, Edit2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const allItems = [
  {
    id: 1,
    itemId: "I001",
    name: "Chicken Breast",
    category: "Raw Material",
    quantity: 15,
    unit: "kg",
    minLevel: 10,
    risk: "low",
  },
  {
    id: 2,
    itemId: "I002",
    name: "Tomato",
    category: "Raw Material",
    quantity: 5,
    unit: "kg",
    minLevel: 20,
    risk: "critical",
  },
  {
    id: 3,
    itemId: "I003",
    name: "Milk",
    category: "Raw Material",
    quantity: 30,
    unit: "liters",
    minLevel: 25,
    risk: "low",
  },
  {
    id: 4,
    itemId: "I004",
    name: "Paneer",
    category: "Raw Material",
    quantity: 8,
    unit: "kg",
    minLevel: 10,
    risk: "moderate",
  },
  {
    id: 5,
    itemId: "I005",
    name: "Onion",
    category: "Raw Material",
    quantity: 50,
    unit: "kg",
    minLevel: 30,
    risk: "low",
  },
  {
    id: 6,
    itemId: "I006",
    name: "Red Chili Powder",
    category: "Groceries",
    quantity: 2,
    unit: "kg",
    minLevel: 1,
    risk: "low",
  },
  {
    id: 7,
    itemId: "I007",
    name: "Mozzarella Cheese",
    category: "Groceries",
    quantity: 3,
    unit: "kg",
    minLevel: 5,
    risk: "critical",
  },
  {
    id: 8,
    itemId: "I008",
    name: "Soy Sauce",
    category: "Groceries",
    quantity: 4,
    unit: "liters",
    minLevel: 2,
    risk: "low",
  },
  {
    id: 9,
    itemId: "I009",
    name: "Olive Oil",
    category: "Groceries",
    quantity: 2,
    unit: "liters",
    minLevel: 3,
    risk: "moderate",
  },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical":
      return "bg-red-100 text-red-800"
    case "moderate":
      return "bg-orange-100 text-orange-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100"
  }
}

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "critical":
      return <AlertTriangle className="w-4 h-4" />
    case "moderate":
      return <AlertCircle className="w-4 h-4" />
    case "low":
      return <CheckCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = allItems.filter(
    (item) =>
      item.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground mt-2">Manage all raw materials and groceries</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Items</CardTitle>
            <CardDescription>Raw materials and groceries inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by item ID, name, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Qty</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Min Level</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm">{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.minLevel}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getRiskColor(item.risk)}`}
                        >
                          {getRiskIcon(item.risk)}
                          {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
