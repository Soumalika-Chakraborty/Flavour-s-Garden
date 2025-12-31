"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsOverview() {
  const [reportPeriod, setReportPeriod] = useState<string>("this-month")

  // Summary Statistics
  const summaryStats = [
    {
      title: "Total Revenue",
      value: "₹8,45,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-100 border border-green-300",
    },
    {
      title: "Total Purchases",
      value: "₹5,28,900",
      change: "+8.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-100 border border-blue-300",
    },
    {
      title: "Active Orders",
      value: "67",
      change: "-5.2%",
      trend: "down",
      icon: Package,
      color: "text-orange-400",
      bgColor: "bg-orange-100 border border-orange-300",
    },
    {
      title: "Pending Payments",
      value: "₹1,48,700",
      change: "+15.8%",
      trend: "up",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-100 border border-red-300",
    },
  ]

  // Sales Report Data
  const salesReport = [
    {
      outlet: "Koramangala",
      date: "2024-01-25",
      orders: 45,
      revenue: 125400,
      avgOrderValue: 2786,
      topItem: "Margherita Pizza",
    },
    {
      outlet: "Indiranagar",
      date: "2024-01-25",
      orders: 52,
      revenue: 148600,
      avgOrderValue: 2857,
      topItem: "Pepperoni Pizza",
    },
    {
      outlet: "Whitefield",
      date: "2024-01-25",
      orders: 38,
      revenue: 98200,
      avgOrderValue: 2584,
      topItem: "Veggie Supreme",
    },
    {
      outlet: "Koramangala",
      date: "2024-01-24",
      orders: 48,
      revenue: 132800,
      avgOrderValue: 2766,
      topItem: "BBQ Chicken Pizza",
    },
    {
      outlet: "Indiranagar",
      date: "2024-01-24",
      orders: 55,
      revenue: 156000,
      avgOrderValue: 2836,
      topItem: "Four Cheese Pizza",
    },
  ]

  // Purchase Report Data
  const purchaseReport = [
    {
      poNumber: "PO-2024-001",
      vendor: "Fresh Farms Ltd.",
      date: "2024-01-15",
      category: "Vegetables",
      amount: 23000,
      status: "Delivered",
    },
    {
      poNumber: "PO-2024-002",
      vendor: "Dairy Delights Co.",
      date: "2024-01-18",
      category: "Dairy",
      amount: 18500,
      status: "Delivered",
    },
    {
      poNumber: "PO-2024-003",
      vendor: "Spice Merchants Inc.",
      date: "2024-01-20",
      category: "Groceries",
      amount: 12750,
      status: "Delivered",
    },
    {
      poNumber: "PO-2024-004",
      vendor: "Veggie World Supplies",
      date: "2024-01-22",
      category: "Vegetables",
      amount: 15600,
      status: "In Transit",
    },
    {
      poNumber: "PO-2024-005",
      vendor: "Meat Master Ltd.",
      date: "2024-01-24",
      category: "Meat",
      amount: 42500,
      status: "Pending",
    },
  ]

  // Inventory Report Data
  const inventoryReport = [
    {
      itemId: "RM-001",
      itemName: "Tomatoes",
      category: "Raw Material",
      currentStock: 45,
      minRequired: 50,
      unit: "kg",
      status: "Low Stock",
    },
    {
      itemId: "RM-002",
      itemName: "Onions",
      category: "Raw Material",
      currentStock: 120,
      minRequired: 80,
      unit: "kg",
      status: "Optimal",
    },
    {
      itemId: "FP-001",
      itemName: "Mozzarella Cheese",
      category: "Finished Product",
      currentStock: 25,
      minRequired: 20,
      unit: "kg",
      status: "Optimal",
    },
    {
      itemId: "FP-002",
      itemName: "Pizza Sauce",
      category: "Finished Product",
      currentStock: 8,
      minRequired: 15,
      unit: "ltr",
      status: "Critical",
    },
    {
      itemId: "RM-003",
      itemName: "Fresh Milk",
      category: "Raw Material",
      currentStock: 95,
      minRequired: 60,
      unit: "ltr",
      status: "Optimal",
    },
  ]

  // Financial Summary Data
  const financialSummary = [
    {
      category: "Total Sales",
      amount: 845230,
      percentage: 100,
      color: "text-green-600",
    },
    {
      category: "Cost of Goods Sold",
      amount: 528900,
      percentage: 62.6,
      color: "text-orange-600",
    },
    {
      category: "Operating Expenses",
      amount: 185600,
      percentage: 22.0,
      color: "text-blue-600",
    },
    {
      category: "Net Profit",
      amount: 130730,
      percentage: 15.4,
      color: "text-green-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Delivered: "bg-green-100 text-green-700 border-green-300",
      "In Transit": "bg-blue-100 text-blue-700 border-blue-300",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Critical: "bg-red-100 text-red-700 border-red-300",
      "Low Stock": "bg-yellow-100 text-yellow-700 border-yellow-300",
      Optimal: "bg-green-100 text-green-700 border-green-300",
    }
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300"
  }

  return (
    <div className="space-y-6 bg-gray-900 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Reports & Analytics</h1>
          <p className="text-white font-semibold text-base">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Download className="w-4 h-4" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card
              key={index}
              className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`} />
                    <span className={stat.trend === "up" ? "text-green-400" : "text-red-400"}>{stat.change}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-white mb-1">{stat.title}</p>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sales Report */}
      <Card className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-extrabold text-white">Sales Report</CardTitle>
              <CardDescription className="text-gray-200 font-semibold">
                Daily sales performance across all outlets
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gradient-to-r from-orange-600 to-red-600">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-white">Outlet</TableHead>
                  <TableHead className="font-semibold text-white">Date</TableHead>
                  <TableHead className="text-right font-semibold text-white">Orders</TableHead>
                  <TableHead className="text-right font-semibold text-white">Revenue</TableHead>
                  <TableHead className="text-right font-semibold text-white">Avg Order Value</TableHead>
                  <TableHead className="font-semibold text-white">Top Item</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesReport.map((sale, index) => (
                  <TableRow key={index} className="hover:bg-gray-700/50 bg-gray-800/50">
                    <TableCell className="font-bold text-white">{sale.outlet}</TableCell>
                    <TableCell className="font-semibold text-white">{sale.date}</TableCell>
                    <TableCell className="text-right font-bold text-white">{sale.orders}</TableCell>
                    <TableCell className="text-right font-bold text-white">₹{sale.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-white">
                      ₹{sale.avgOrderValue.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold text-white">{sale.topItem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Report */}
      <Card className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-extrabold text-white">Purchase Report</CardTitle>
              <CardDescription className="text-gray-200 font-semibold">
                Recent purchase orders and vendor transactions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gradient-to-r from-orange-600 to-red-600">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-white">PO Number</TableHead>
                  <TableHead className="font-semibold text-white">Vendor</TableHead>
                  <TableHead className="font-semibold text-white">Date</TableHead>
                  <TableHead className="font-semibold text-white">Category</TableHead>
                  <TableHead className="text-right font-semibold text-white">Amount</TableHead>
                  <TableHead className="font-semibold text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseReport.map((purchase, index) => (
                  <TableRow key={index} className="hover:bg-gray-700/50 bg-gray-800/50">
                    <TableCell className="font-mono font-bold text-white">{purchase.poNumber}</TableCell>
                    <TableCell className="font-bold text-white">{purchase.vendor}</TableCell>
                    <TableCell className="font-semibold text-white">{purchase.date}</TableCell>
                    <TableCell className="font-semibold text-white">{purchase.category}</TableCell>
                    <TableCell className="text-right font-bold text-white">
                      ₹{purchase.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(purchase.status)}>
                        {purchase.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Report */}
        <Card className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-extrabold text-white">Inventory Status Report</CardTitle>
                <CardDescription className="text-gray-200 font-semibold">
                  Current stock levels and alerts
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gradient-to-r from-orange-600 to-red-600">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-white">Item ID</TableHead>
                    <TableHead className="font-semibold text-white">Item Name</TableHead>
                    <TableHead className="text-right font-semibold text-white">Stock</TableHead>
                    <TableHead className="font-semibold text-white">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryReport.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-700/50 bg-gray-800/50">
                      <TableCell className="font-mono text-sm font-bold text-white">{item.itemId}</TableCell>
                      <TableCell className="font-bold text-white">{item.itemName}</TableCell>
                      <TableCell className="text-right font-bold text-white">
                        {item.currentStock} {item.unit}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-extrabold text-white">Financial Summary</CardTitle>
                <CardDescription className="text-gray-200 font-semibold">Profit and loss breakdown</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
              >
                <FileText className="w-4 h-4" />
                Full Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {financialSummary.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-white">{item.category}</span>
                    <div className="text-right">
                      <span className={`text-xl font-extrabold text-white`}>₹{item.amount.toLocaleString()}</span>
                      <span className="text-sm text-white font-bold ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 border border-gray-600">
                    <div
                      className={`h-3 rounded-full ${
                        item.category === "Net Profit"
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : item.category === "Cost of Goods Sold"
                            ? "bg-gradient-to-r from-orange-500 to-red-500"
                            : item.category === "Operating Expenses"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : "bg-gradient-to-r from-gray-500 to-gray-600"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-2 border-gray-700 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-gray-700">
          <CardTitle className="text-xl font-extrabold text-white">Quick Report Actions</CardTitle>
          <CardDescription className="text-gray-200 font-semibold">
            Generate custom reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <FileText className="w-5 h-5" />
              Generate P&L Report
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent border-white text-white hover:bg-white/10"
            >
              <Package className="w-5 h-5" />
              Inventory Valuation
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent border-white text-white hover:bg-white/10"
            >
              <Users className="w-5 h-5" />
              Vendor Performance
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent border-white text-white hover:bg-white/10"
            >
              <TrendingUp className="w-5 h-5" />
              Sales Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
