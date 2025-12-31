"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, TrendingUp, ArrowLeft, Search, Download, Plus, RefreshCw, Calendar, Box } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryDashboardProps {
  selectedOutlet: string
  onBack: () => void
}

interface InventoryItem {
  id: number
  itemId: string
  name: string
  category: string
  currentStock: number
  unit: string
  minStock: number
  reorderLevel: number
  status: "Normal" | "Low Stock" | "Critical" | "Out of Stock"
  lastUpdated: string
}

interface FinishedProduct {
  id: number
  itemId: string
  name: string
  type: string
  currentQty: number
  minDisplayQty: number
  status: "Normal" | "Low Stock" | "Critical" | "Out of Stock"
  lastRestocked: string
}

interface Issue {
  issueNo: string
  issueDate: string
  requisitionNo: string
  requisitionDate: string
  item: string
  requisitionQuantity: number
  deliveredQuantity: number
  unit: string
}

export function InventoryDashboard({ selectedOutlet, onBack }: InventoryDashboardProps) {
  const issueRecords: Issue[] = [
    {
      issueNo: "ISS-001",
      issueDate: "2024-01-26",
      requisitionNo: "REQ-101",
      requisitionDate: "2024-01-25",
      item: "Tomatoes",
      requisitionQuantity: 50,
      deliveredQuantity: 50,
      unit: "kg",
    },
    {
      issueNo: "ISS-002",
      issueDate: "2024-01-26",
      requisitionNo: "REQ-102",
      requisitionDate: "2024-01-25",
      item: "Milk",
      requisitionQuantity: 80,
      deliveredQuantity: 30,
      unit: "L",
    },
    {
      issueNo: "ISS-003",
      issueDate: "2024-01-25",
      requisitionNo: "REQ-103",
      requisitionDate: "2024-01-24",
      item: "Chicken Breast",
      requisitionQuantity: 25,
      deliveredQuantity: 25,
      unit: "kg",
    },
    {
      issueNo: "ISS-004",
      issueDate: "2024-01-25",
      requisitionNo: "REQ-104",
      requisitionDate: "2024-01-24",
      item: "Cheddar Cheese",
      requisitionQuantity: 30,
      deliveredQuantity: 15,
      unit: "kg",
    },
    {
      issueNo: "ISS-005",
      issueDate: "2024-01-24",
      requisitionNo: "REQ-105",
      requisitionDate: "2024-01-23",
      item: "Mayonnaise",
      requisitionQuantity: 10,
      deliveredQuantity: 18,
      unit: "bottles",
    },
  ]

  const [searchRaw, setSearchRaw] = useState("")
  const [searchFinished, setSearchFinished] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deliveredQuantities, setDeliveredQuantities] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {}
    issueRecords.forEach((issue) => {
      initial[issue.issueNo] = issue.deliveredQuantity
    })
    return initial
  })

  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      itemId: "RM-001",
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 45.5,
      unit: "kg",
      minStock: 20,
      reorderLevel: 45.5 - 20, // 25.5
      lastUpdated: "2024-01-20",
      status: "Normal" as const,
    },
    {
      id: 2,
      itemId: "RM-002",
      name: "Onions",
      category: "Vegetables",
      currentStock: 12.0,
      unit: "kg",
      minStock: 15,
      reorderLevel: 12.0 - 15, // -3
      lastUpdated: "2024-01-19",
      status: "Critical" as const,
    },
    {
      id: 3,
      itemId: "RM-003",
      name: "Chicken Breast",
      category: "Meat",
      currentStock: 8.5,
      unit: "kg",
      minStock: 10,
      reorderLevel: 8.5 - 10, // -1.5
      lastUpdated: "2024-01-20",
      status: "Critical" as const,
    },
    {
      id: 4,
      itemId: "RM-004",
      name: "Potatoes",
      category: "Vegetables",
      currentStock: 50.0,
      unit: "kg",
      minStock: 25,
      reorderLevel: 50.0 - 25, // 25
      lastUpdated: "2024-01-21",
      status: "Normal" as const,
    },
    {
      id: 5,
      itemId: "RM-005",
      name: "Milk",
      category: "Dairy",
      currentStock: 0,
      unit: "L",
      minStock: 30,
      reorderLevel: 0 - 30, // -30
      lastUpdated: "2024-01-20",
      status: "Out of Stock" as const,
    },
  ])

  const [finishedProducts, setFinishedProducts] = useState([
    {
      id: 1,
      itemId: "FP-001",
      name: "Cheddar Cheese",
      type: "Cheese",
      currentQty: 15,
      minDisplayQty: 10,
      status: "Normal",
      lastRestocked: "2024-01-18",
    },
    {
      id: 2,
      itemId: "FP-002",
      name: "Tomato Sauce",
      type: "Sauce",
      currentQty: 5,
      minDisplayQty: 8,
      status: "Low Stock",
      lastRestocked: "2024-01-17",
    },
    {
      id: 3,
      itemId: "FP-003",
      name: "BBQ Sauce",
      type: "Sauce",
      currentQty: 20,
      minDisplayQty: 12,
      status: "Normal",
      lastRestocked: "2024-01-20",
    },
    {
      id: 4,
      itemId: "FP-004",
      name: "Mozzarella Cheese",
      type: "Cheese",
      currentQty: 3,
      minDisplayQty: 5,
      status: "Critical",
      lastRestocked: "2024-01-16",
    },
    {
      id: 5,
      itemId: "FP-005",
      name: "Mayonnaise",
      type: "Sauce",
      currentQty: 18,
      minDisplayQty: 10,
      status: "Normal",
      lastRestocked: "2024-01-19",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-700 border-green-300"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Critical":
        return "bg-red-100 text-red-700 border-red-300"
      case "Out of Stock":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const totalRawMaterials = rawMaterials.length
  const totalFinishedProducts = finishedProducts.length
  const lowStockItems = [...rawMaterials, ...finishedProducts].filter((item) => item.status === "Low Stock").length
  const criticalStockItems = [...rawMaterials, ...finishedProducts].filter((item) => item.status === "Critical").length
  const upcomingRestock = 5

  const handleDeliveredQuantityChange = (issueNo: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setDeliveredQuantities((prev) => ({
        ...prev,
        [issueNo]: numValue,
      }))
    }
  }

  const handleRawMaterialStockChange = (id: number, newStock: number) => {
    setRawMaterials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Calculate reorder level as (Current Stock - Min Required)
          const reorderLevel = newStock - item.minStock

          // Determine status based on reorder level
          let status: "Normal" | "Low Stock" | "Critical" | "Out of Stock"
          if (newStock === 0) {
            status = "Out of Stock"
          } else if (reorderLevel <= 0) {
            status = "Critical"
          } else if (reorderLevel < item.minStock * 0.5) {
            status = "Low Stock"
          } else {
            status = "Normal"
          }

          return {
            ...item,
            currentStock: newStock,
            reorderLevel,
            status,
          }
        }
        return item
      }),
    )
  }

  const handleFinishedProductQtyChange = (id: number, newQty: number) => {
    setFinishedProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              currentQty: newQty,
              status:
                newQty === 0
                  ? "Out of Stock"
                  : newQty < item.minDisplayQty * 0.5
                    ? "Critical"
                    : newQty < item.minDisplayQty
                      ? "Low Stock"
                      : "Normal",
            }
          : item,
      ),
    )
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1600px] px-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-semibold text-foreground">Inventory Dashboard</h1>
            <p className="text-muted-foreground">{selectedOutlet}</p>
          </div>
          <div className="w-10" /> {/* Spacer for symmetry */}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Raw Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalRawMaterials}</div>
              <p className="text-xs text-muted-foreground mt-1">Active items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Finished Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalFinishedProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to sell</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Items Running Low</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{criticalStockItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Urgent restock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Restock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{upcomingRestock}</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Raw Material Inventory */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Raw Material Inventory</CardTitle>
                <CardDescription>Monitor and manage raw material stock levels</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchRaw}
                    onChange={(e) => setSearchRaw(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Item ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Item Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Current Stock</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Unit</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Min Required</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Reorder Level</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Last Updated</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rawMaterials
                    .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
                    .filter((item) => item.name.toLowerCase().includes(searchRaw.toLowerCase()))
                    .map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.itemId}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Input
                            type="number"
                            value={item.currentStock}
                            onChange={(e) => {
                              const newStock = Number.parseFloat(e.target.value) || 0
                              handleRawMaterialStockChange(item.id, newStock)
                            }}
                            className="w-24 text-right font-bold text-black bg-orange-50 border-2 border-orange-400 focus:border-orange-600 focus:bg-white"
                            min="0"
                            step="0.1"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">{item.unit}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">{item.minStock}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                          {item.reorderLevel.toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">{item.lastUpdated}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <div className="flex items-center justify-center gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                              Update
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs">
                              Trend
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Finished Products Inventory */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Finished Product Inventory</CardTitle>
                <CardDescription>Track ready-to-sell products and customer demand</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchFinished}
                  onChange={(e) => setSearchFinished(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Item ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Current Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Min Display Qty</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Stock Health</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Last Restocked</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {finishedProducts
                    .filter((item) => item.name.toLowerCase().includes(searchFinished.toLowerCase()))
                    .map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.itemId}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.type}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Input
                            type="number"
                            value={item.currentQty}
                            onChange={(e) => {
                              const newQty = Number.parseInt(e.target.value) || 0
                              handleFinishedProductQtyChange(item.id, newQty)
                            }}
                            className="w-24 text-right font-bold text-black bg-orange-50 border-2 border-orange-400 focus:border-orange-600 focus:bg-white"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">{item.minDisplayQty}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">{item.lastRestocked}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <div className="flex items-center justify-center gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                              Adjust
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs">
                              History
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Minimum Stock Requirement Summary */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-xl text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Minimum Stock Requirement Summary
            </CardTitle>
            <CardDescription>Items that need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-red-200 overflow-hidden bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-red-900">Item Name</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-red-900">Current Stock</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-red-900">Required Minimum</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-red-900">Shortage Amount</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-red-900">
                      Est. Days to Out-of-Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Milk</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">30 L</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">20 L</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">-10 L</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge variant="destructive">2 days</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Cheddar Cheese</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">15 kg</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">10 kg</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">-5 kg</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge variant="destructive">1 day</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Tomato Sauce</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">5 bottles</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">8 bottles</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">-3 bottles</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge variant="destructive">3 days</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Issue Table */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Issue Table
                </CardTitle>
                <CardDescription>Track raw material issues from Inventory to Kitchen</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-orange-200 overflow-hidden bg-white">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0">
                    <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <th className="px-4 py-3 text-left text-sm font-semibold">ISSUE_NO</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">ISSUE_DATE</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">REQUISITION_NO</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">REQUISITION_DATE</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">ITEM</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">REQUISITION_QUANTITY</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">DELIVERED_QUANTITY</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">STATUS</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueRecords.map((issue, index) => {
                      const deliveredQty = deliveredQuantities[issue.issueNo] ?? issue.deliveredQuantity
                      const isPartialIssue = deliveredQty < issue.requisitionQuantity
                      const isFullyIssued = deliveredQty === issue.requisitionQuantity

                      return (
                        <tr
                          key={issue.issueNo}
                          className={`border-b ${
                            isPartialIssue
                              ? "bg-yellow-50 hover:bg-yellow-100"
                              : isFullyIssued
                                ? "bg-green-50 hover:bg-green-100"
                                : index % 2 === 0
                                  ? "bg-gray-50 hover:bg-gray-100"
                                  : "bg-white hover:bg-gray-50"
                          } transition-colors`}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{issue.issueNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{issue.issueDate}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{issue.requisitionNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{issue.requisitionDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{issue.item}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">
                            {issue.requisitionQuantity} {issue.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={deliveredQty}
                              onChange={(e) => handleDeliveredQuantityChange(issue.issueNo, e.target.value)}
                              className="w-20 px-2 py-1 text-right font-semibold text-gray-900 bg-white border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <span className="ml-1 text-gray-600">{issue.unit}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {isPartialIssue ? (
                              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Partial</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700 border-green-300">Complete</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs bg-orange-500 text-white border-orange-600 hover:bg-orange-600"
                              >
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs bg-red-500 text-white border-red-600 hover:bg-red-600"
                              >
                                Requisition
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span>Complete</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span>Partial Issue</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700">Critical: Milk</p>
                    <p className="text-xs text-red-600">Only 30 L remaining - Restock urgently</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-700">Consumption Spike: Tomato Sauce</p>
                    <p className="text-xs text-yellow-600">30% increase in usage - Consider early reorder</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-orange-200">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-700">Forecasted Shortage: Chicken Breast</p>
                    <p className="text-xs text-orange-600">Estimated to run out in 5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-4 h-4" />
                Add New Raw Material
              </Button>
              <Button className="w-full justify-start gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Box className="w-4 h-4" />
                Add New Finished Product
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <RefreshCw className="w-4 h-4" />
                Update Stock Levels
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download Inventory Report (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download Inventory Report (Excel)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
