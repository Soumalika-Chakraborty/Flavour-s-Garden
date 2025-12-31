"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Download, ChevronDown, ChevronUp, Package, TrendingUp, AlertCircle, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PurchaseOrdersOverview() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // PO_HDR Data
  const purchaseOrderHeaders = [
    {
      poId: "PO-2024-001",
      vendorId: "V001",
      outletId: "O001",
      poDate: "2024-01-15",
      paymentDate: "2024-02-15",
      deliveryDate: "2024-01-20",
      gstAmount: 3450,
      netAmount: 23000,
      poStatus: "Delivered",
    },
    {
      poId: "PO-2024-002",
      vendorId: "V002",
      outletId: "O001",
      poDate: "2024-01-18",
      paymentDate: "2024-02-18",
      deliveryDate: "2024-01-23",
      gstAmount: 2775,
      netAmount: 18500,
      poStatus: "GRN Pending",
    },
    {
      poId: "PO-2024-003",
      vendorId: "V003",
      outletId: "O001",
      poDate: "2024-01-20",
      paymentDate: "2024-02-20",
      deliveryDate: "2024-01-25",
      gstAmount: 1912,
      netAmount: 12750,
      poStatus: "Closed",
    },
    {
      poId: "PO-2024-004",
      vendorId: "V004",
      outletId: "O001",
      poDate: "2024-01-22",
      paymentDate: "2024-02-22",
      deliveryDate: "2024-01-27",
      gstAmount: 2340,
      netAmount: 15600,
      poStatus: "Delivered",
    },
    {
      poId: "PO-2024-005",
      vendorId: "V005",
      outletId: "O001",
      poDate: "2024-01-24",
      paymentDate: "2024-02-24",
      deliveryDate: "2024-01-29",
      gstAmount: 6375,
      netAmount: 42500,
      poStatus: "Created",
    },
    {
      poId: "PO-2024-006",
      vendorId: "V006",
      outletId: "O001",
      poDate: "2024-01-25",
      paymentDate: "2024-02-25",
      deliveryDate: "2024-01-30",
      gstAmount: 4245,
      netAmount: 28300,
      poStatus: "GRN Pending",
    },
    {
      poId: "PO-2024-007",
      vendorId: "V001",
      outletId: "O001",
      poDate: "2024-01-26",
      paymentDate: "2024-01-28",
      deliveryDate: "2024-02-01",
      gstAmount: 4680,
      netAmount: 31200,
      poStatus: "Delayed",
    },
  ]

  // PO_DETAILS Data
  const purchaseOrderDetails: Record<string, any[]> = {
    "PO-2024-001": [
      {
        slNo: 1,
        itemId: "ITM-001",
        item: "Tomatoes",
        quantity: 50,
        unitPrice: 40,
        cp: 2000,
      },
      {
        slNo: 2,
        itemId: "ITM-002",
        item: "Onions",
        quantity: 40,
        unitPrice: 35,
        cp: 1400,
      },
      {
        slNo: 3,
        itemId: "ITM-003",
        item: "Potatoes",
        quantity: 60,
        unitPrice: 30,
        cp: 1800,
      },
      {
        slNo: 4,
        itemId: "ITM-004",
        item: "Carrots",
        quantity: 30,
        unitPrice: 45,
        cp: 1350,
      },
    ],
    "PO-2024-002": [
      {
        slNo: 1,
        itemId: "ITM-021",
        item: "Milk (L)",
        quantity: 100,
        unitPrice: 65,
        cp: 6500,
      },
      {
        slNo: 2,
        itemId: "ITM-022",
        item: "Cheese (Kg)",
        quantity: 15,
        unitPrice: 450,
        cp: 6750,
      },
      {
        slNo: 3,
        itemId: "ITM-023",
        item: "Butter (Kg)",
        quantity: 10,
        unitPrice: 520,
        cp: 5200,
      },
    ],
    "PO-2024-003": [
      {
        slNo: 1,
        itemId: "ITM-031",
        item: "Cumin Seeds",
        quantity: 5,
        unitPrice: 650,
        cp: 3250,
      },
      {
        slNo: 2,
        itemId: "ITM-032",
        item: "Turmeric Powder",
        quantity: 8,
        unitPrice: 420,
        cp: 3360,
      },
      {
        slNo: 3,
        itemId: "ITM-033",
        item: "Red Chilli Powder",
        quantity: 6,
        unitPrice: 580,
        cp: 3480,
      },
    ],
    "PO-2024-004": [
      {
        slNo: 1,
        itemId: "ITM-041",
        item: "Bell Peppers",
        quantity: 25,
        unitPrice: 80,
        cp: 2000,
      },
      {
        slNo: 2,
        itemId: "ITM-042",
        item: "Broccoli",
        quantity: 20,
        unitPrice: 120,
        cp: 2400,
      },
      {
        slNo: 3,
        itemId: "ITM-043",
        item: "Mushrooms",
        quantity: 15,
        unitPrice: 180,
        cp: 2700,
      },
    ],
    "PO-2024-005": [
      {
        slNo: 1,
        itemId: "ITM-051",
        item: "Chicken Breast (Kg)",
        quantity: 40,
        unitPrice: 280,
        cp: 11200,
      },
      {
        slNo: 2,
        itemId: "ITM-052",
        item: "Mutton (Kg)",
        quantity: 25,
        unitPrice: 650,
        cp: 16250,
      },
      {
        slNo: 3,
        itemId: "ITM-053",
        item: "Fish Fillet (Kg)",
        quantity: 30,
        unitPrice: 450,
        cp: 13500,
      },
    ],
    "PO-2024-006": [
      {
        slNo: 1,
        itemId: "ITM-061",
        item: "Orange Juice (L)",
        quantity: 50,
        unitPrice: 120,
        cp: 6000,
      },
      {
        slNo: 2,
        itemId: "ITM-062",
        item: "Soft Drinks (Cases)",
        quantity: 30,
        unitPrice: 450,
        cp: 13500,
      },
      {
        slNo: 3,
        itemId: "ITM-063",
        item: "Mineral Water (Cases)",
        quantity: 40,
        unitPrice: 180,
        cp: 7200,
      },
    ],
    "PO-2024-007": [
      {
        slNo: 1,
        itemId: "ITM-005",
        item: "Cabbage",
        quantity: 35,
        unitPrice: 35,
        cp: 1225,
      },
      {
        slNo: 2,
        itemId: "ITM-006",
        item: "Cauliflower",
        quantity: 30,
        unitPrice: 50,
        cp: 1500,
      },
      {
        slNo: 3,
        itemId: "ITM-007",
        item: "Green Beans",
        quantity: 25,
        unitPrice: 60,
        cp: 1500,
      },
    ],
  }

  const toggleRow = (poId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(poId)) {
      newExpanded.delete(poId)
    } else {
      newExpanded.add(poId)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Created":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "GRN Pending":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-300"
      case "Closed":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "Delayed":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const stats = [
    {
      title: "Total Active POs",
      value: purchaseOrderHeaders.filter((po) => po.poStatus !== "Closed").length,
      icon: Package,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total PO Value",
      value: `₹${purchaseOrderHeaders.reduce((sum, po) => sum + po.netAmount, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending GRN",
      value: purchaseOrderHeaders.filter((po) => po.poStatus === "GRN Pending").length,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Delayed Orders",
      value: purchaseOrderHeaders.filter((po) => po.poStatus === "Delayed").length,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage and track all purchase orders with detailed line items</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Plus className="w-4 h-4" />
            Create Purchase Order
          </Button>
        </div>
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
              <CardTitle>Purchase Order Headers (PO_HDR)</CardTitle>
              <CardDescription>High-level summary of all purchase orders - click to expand details</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search PO ID..." className="pl-9 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gradient-to-r from-orange-600 to-red-600">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 text-white"></TableHead>
                  <TableHead className="font-semibold text-white">PO ID</TableHead>
                  <TableHead className="font-semibold text-white">Vendor ID</TableHead>
                  <TableHead className="font-semibold text-white">Outlet ID</TableHead>
                  <TableHead className="font-semibold text-white">PO Date</TableHead>
                  <TableHead className="font-semibold text-white">Payment Date</TableHead>
                  <TableHead className="font-semibold text-white">Delivery Date</TableHead>
                  <TableHead className="text-right font-semibold text-white">GST Amount</TableHead>
                  <TableHead className="text-right font-semibold text-white">Net Amount</TableHead>
                  <TableHead className="font-semibold text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrderHeaders.map((po) => (
                  <>
                    <TableRow
                      key={po.poId}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleRow(po.poId)}
                    >
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {expandedRows.has(po.poId) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{po.poId}</TableCell>
                      <TableCell className="font-medium">{po.vendorId}</TableCell>
                      <TableCell>{po.outletId}</TableCell>
                      <TableCell>{new Date(po.poDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(po.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(po.deliveryDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">₹{po.gstAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">₹{po.netAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(po.poStatus)}>
                          {po.poStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(po.poId) && purchaseOrderDetails[po.poId] && (
                      <TableRow>
                        <TableCell colSpan={10} className="bg-muted/20 p-0">
                          <div className="p-4 border-t">
                            <h4 className="font-semibold mb-3 text-sm">Purchase Order Details (PO_DETAILS)</h4>
                            <Table>
                              <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="font-semibold text-white">Sl. No.</TableHead>
                                  <TableHead className="font-semibold text-white">Item ID</TableHead>
                                  <TableHead className="font-semibold text-white">Item</TableHead>
                                  <TableHead className="text-right font-semibold text-white">Quantity</TableHead>
                                  <TableHead className="text-right font-semibold text-white">Unit Price</TableHead>
                                  <TableHead className="text-right font-semibold text-white">CP (Cost Price)</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {purchaseOrderDetails[po.poId].map((detail) => (
                                  <TableRow key={`${po.poId}-${detail.slNo}`}>
                                    <TableCell>{detail.slNo}</TableCell>
                                    <TableCell className="font-mono text-sm">{detail.itemId}</TableCell>
                                    <TableCell>{detail.item}</TableCell>
                                    <TableCell className="text-right">{detail.quantity}</TableCell>
                                    <TableCell className="text-right">₹{detail.unitPrice}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                      ₹{detail.cp.toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="bg-orange-50 font-semibold">
                                  <TableCell colSpan={5} className="text-right">
                                    Subtotal (before GST):
                                  </TableCell>
                                  <TableCell className="text-right">
                                    ₹
                                    {purchaseOrderDetails[po.poId]
                                      .reduce((sum, item) => sum + item.cp, 0)
                                      .toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations for purchase management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="w-5 h-5" />
              Create Purchase Order
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Package className="w-5 h-5" />
              Go to GRN Dashboard
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <TrendingUp className="w-5 h-5" />
              View Vendor Ledger
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Download className="w-5 h-5" />
              Generate Purchase Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
