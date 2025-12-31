"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Plus, Eye, TrendingUp, Users, CreditCard, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VendorReportsOverview() {
  const [filterType, setFilterType] = useState<string>("all")

  // Vendor Master Data
  const vendors = [
    {
      vendorId: "V001",
      vendorName: "Fresh Farms Ltd.",
      vendorAddress: "Plot 45, Agriculture Zone, Whitefield, Bangalore - 560066",
      vendorType: "Vegetables",
      vendorContact: "+91 98765 43210",
      totalOrders: 8,
      totalValue: 184000,
      pendingPayment: 23000,
    },
    {
      vendorId: "V002",
      vendorName: "Dairy Delights Co.",
      vendorAddress: "12/3, Dairy Road, Koramangala, Bangalore - 560034",
      vendorType: "Dairy",
      vendorContact: "+91 98765 43211",
      totalOrders: 12,
      totalValue: 222000,
      pendingPayment: 18500,
    },
    {
      vendorId: "V003",
      vendorName: "Spice Merchants Inc.",
      vendorAddress: "456, Spice Market, Chickpet, Bangalore - 560053",
      vendorType: "Groceries",
      vendorContact: "+91 98765 43212",
      totalOrders: 6,
      totalValue: 76500,
      pendingPayment: 0,
    },
    {
      vendorId: "V004",
      vendorName: "Veggie World Supplies",
      vendorAddress: "78, Green Valley, Hebbal, Bangalore - 560024",
      vendorType: "Vegetables",
      vendorContact: "+91 98765 43213",
      totalOrders: 15,
      totalValue: 234000,
      pendingPayment: 15600,
    },
    {
      vendorId: "V005",
      vendorName: "Meat Master Ltd.",
      vendorAddress: "23, Market Street, Indiranagar, Bangalore - 560038",
      vendorType: "Others",
      vendorContact: "+91 98765 43214",
      totalOrders: 10,
      totalValue: 425000,
      pendingPayment: 42500,
    },
    {
      vendorId: "V006",
      vendorName: "Beverages Plus",
      vendorAddress: "89, Industrial Area, Peenya, Bangalore - 560058",
      vendorType: "Groceries",
      vendorContact: "+91 98765 43215",
      totalOrders: 7,
      totalValue: 198100,
      pendingPayment: 28300,
    },
    {
      vendorId: "V007",
      vendorName: "Premium Cheese Suppliers",
      vendorAddress: "34, Cold Storage Complex, Yelahanka, Bangalore - 560064",
      vendorType: "Dairy",
      vendorContact: "+91 98765 43216",
      totalOrders: 9,
      totalValue: 189000,
      pendingPayment: 21000,
    },
  ]

  const filteredVendors = filterType === "all" ? vendors : vendors.filter((v) => v.vendorType === filterType)

  const getVendorTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Vegetables: "bg-green-100 text-green-700 border-green-300",
      Groceries: "bg-blue-100 text-blue-700 border-blue-300",
      Dairy: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Others: "bg-purple-100 text-purple-700 border-purple-300",
    }
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-300"
  }

  const stats = [
    {
      title: "Total Active Vendors",
      value: vendors.length,
      icon: Users,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Purchase Orders This Month",
      value: vendors.reduce((sum, v) => sum + v.totalOrders, 0),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending Vendor Payments",
      value: `₹${vendors.reduce((sum, v) => sum + v.pendingPayment, 0).toLocaleString()}`,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Delayed Deliveries",
      value: 2,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Vendor Management</h1>
          <p className="text-muted-foreground">Centralized vendor master and tracking dashboard</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <Plus className="w-4 h-4" />
          Add New Vendor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vendor Master Database</CardTitle>
              <CardDescription>Complete vendor information with contact details and purchase history</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search vendor name..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gradient-to-r from-orange-600 to-red-600">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-white w-[100px]">Vendor ID</TableHead>
                  <TableHead className="font-semibold text-white w-[200px]">Vendor Name</TableHead>
                  <TableHead className="font-semibold text-white w-[280px]">Address</TableHead>
                  <TableHead className="font-semibold text-white w-[120px]">Type</TableHead>
                  <TableHead className="font-semibold text-white w-[150px]">Contact</TableHead>
                  <TableHead className="text-right font-semibold text-white w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.vendorId} className="hover:bg-muted/50">
                    <TableCell className="font-medium font-mono w-[100px]">{vendor.vendorId}</TableCell>
                    <TableCell className="font-medium w-[200px]">{vendor.vendorName}</TableCell>
                    <TableCell className="text-sm w-[280px] whitespace-normal break-words">
                      {vendor.vendorAddress}
                    </TableCell>
                    <TableCell className="w-[120px]">
                      <Badge variant="outline" className={getVendorTypeBadge(vendor.vendorType)}>
                        {vendor.vendorType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm w-[150px]">{vendor.vendorContact}</TableCell>
                    <TableCell className="text-right w-[100px]">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations for vendor management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="w-5 h-5" />
              Add New Vendor
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Eye className="w-5 h-5" />
              View Vendor Ledger
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Download className="w-5 h-5" />
              Generate Purchase Report
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <TrendingUp className="w-5 h-5" />
              Vendor Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
