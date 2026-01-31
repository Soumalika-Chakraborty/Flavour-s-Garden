"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, Edit2, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const purchaseOrders = [
  {
    id: "PO001",
    vendorId: "V001",
    vendor: "Fresh Farms",
    date: "2024-01-05",
    status: "pending",
    total: "₹25,000",
    items: 5,
    poItems: [
      { itemId: "RM-001", name: "Chicken Breast", qty: 10, unit: "kg", price: 350, total: 3500 },
      { itemId: "RM-002", name: "Tomato", qty: 15, unit: "kg", price: 50, total: 750 },
      { itemId: "RM-003", name: "Onion", qty: 20, unit: "kg", price: 40, total: 800 },
    ],
  },
  {
    id: "PO002",
    vendorId: "V002",
    vendor: "Dairy Direct",
    date: "2024-01-04",
    status: "received",
    total: "₹15,000",
    items: 3,
    poItems: [
      { itemId: "RM-004", name: "Milk", qty: 50, unit: "liters", price: 50, total: 2500 },
      { itemId: "RM-005", name: "Paneer", qty: 10, unit: "kg", price: 400, total: 4000 },
    ],
  },
  {
    id: "PO003",
    vendorId: "V003",
    vendor: "Spice King",
    date: "2024-01-03",
    status: "paid",
    total: "₹8,500",
    items: 2,
    poItems: [
      { itemId: "GR-001", name: "Red Chili Powder", qty: 5, unit: "kg", price: 300, total: 1500 },
      { itemId: "GR-002", name: "Turmeric", qty: 3, unit: "kg", price: 400, total: 1200 },
    ],
  },
  {
    id: "PO004",
    vendorId: "V004",
    vendor: "Meat Supplies",
    date: "2024-01-02",
    status: "pending",
    total: "₹45,000",
    items: 8,
    poItems: [
      { itemId: "RM-006", name: "Mutton", qty: 20, unit: "kg", price: 500, total: 10000 },
      { itemId: "RM-007", name: "Fish Fillet", qty: 15, unit: "kg", price: 600, total: 9000 },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "received":
      return "bg-blue-100 text-blue-800"
    case "paid":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100"
  }
}

export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedPOs, setExpandedPOs] = useState<string[]>([])

  const togglePOExpand = (poId: string) => {
    setExpandedPOs((prev) => (prev.includes(poId) ? prev.filter((id) => id !== poId) : [...prev, poId]))
  }

  const filteredOrders = purchaseOrders.filter((po) => {
    return (
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <DashboardLayout>
      <style>{`
        table thead tr {
          background-color: oklch(0.58 0.12 41);
        }
        table thead th {
          color: oklch(0.98 0 0);
          font-weight: 600;
        }
      `}</style>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
            <p className="text-muted-foreground mt-2">Manage vendor orders and deliveries</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create PO
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Purchase Orders</CardTitle>
                <CardDescription>View all orders with vendors, items, and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search PO ID or vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto space-y-3">
                  {filteredOrders.map((po) => (
                    <div key={po.id} className="border rounded-lg">
                      <div
                        className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                        onClick={() => togglePOExpand(po.id)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${expandedPOs.includes(po.id) ? "rotate-180" : ""}`}
                          />
                          <div className="flex-1 grid grid-cols-6 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">PO ID</p>
                              <p className="font-medium">{po.id}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Vendor ID</p>
                              <p className="font-medium">{po.vendorId}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Vendor</p>
                              <p className="font-medium">{po.vendor}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="font-medium">{po.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="font-medium">{po.total}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Status</p>
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(po.status)}`}
                              >
                                {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedPOs.includes(po.id) && (
                        <div className="border-t bg-gray-50 p-4">
                          <h4 className="font-semibold mb-3 text-sm">Order Details</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item ID</TableHead>
                                  <TableHead>Item Name</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Unit</TableHead>
                                  <TableHead>Unit Price</TableHead>
                                  <TableHead>Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {po.poItems.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>₹{item.price}</TableCell>
                                    <TableCell className="font-medium">₹{item.total}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>View pending orders with vendors, items, and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search PO ID or vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto space-y-3">
                  {filteredOrders
                    .filter((po) => po.status === "pending")
                    .map((po) => (
                      <div key={po.id} className="border rounded-lg">
                        <div
                          className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                          onClick={() => togglePOExpand(po.id)}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${expandedPOs.includes(po.id) ? "rotate-180" : ""}`}
                            />
                            <div className="flex-1 grid grid-cols-6 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">PO ID</p>
                                <p className="font-medium">{po.id}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor ID</p>
                                <p className="font-medium">{po.vendorId}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor</p>
                                <p className="font-medium">{po.vendor}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="font-medium">{po.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Total</p>
                                <p className="font-medium">{po.total}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(po.status)}`}
                                >
                                  {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {expandedPOs.includes(po.id) && (
                          <div className="border-t bg-gray-50 p-4">
                            <h4 className="font-semibold mb-3 text-sm">Order Details</h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item ID</TableHead>
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {po.poItems.map((item, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.qty}</TableCell>
                                      <TableCell>{item.unit}</TableCell>
                                      <TableCell>₹{item.price}</TableCell>
                                      <TableCell className="font-medium">₹{item.total}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="received" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Received Orders</CardTitle>
                <CardDescription>View received orders with vendors, items, and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search PO ID or vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto space-y-3">
                  {filteredOrders
                    .filter((po) => po.status === "received")
                    .map((po) => (
                      <div key={po.id} className="border rounded-lg">
                        <div
                          className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                          onClick={() => togglePOExpand(po.id)}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${expandedPOs.includes(po.id) ? "rotate-180" : ""}`}
                            />
                            <div className="flex-1 grid grid-cols-6 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">PO ID</p>
                                <p className="font-medium">{po.id}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor ID</p>
                                <p className="font-medium">{po.vendorId}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor</p>
                                <p className="font-medium">{po.vendor}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="font-medium">{po.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Total</p>
                                <p className="font-medium">{po.total}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(po.status)}`}
                                >
                                  {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {expandedPOs.includes(po.id) && (
                          <div className="border-t bg-gray-50 p-4">
                            <h4 className="font-semibold mb-3 text-sm">Order Details</h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item ID</TableHead>
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {po.poItems.map((item, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.qty}</TableCell>
                                      <TableCell>{item.unit}</TableCell>
                                      <TableCell>₹{item.price}</TableCell>
                                      <TableCell className="font-medium">₹{item.total}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paid Orders</CardTitle>
                <CardDescription>View paid orders with vendors, items, and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search PO ID or vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto space-y-3">
                  {filteredOrders
                    .filter((po) => po.status === "paid")
                    .map((po) => (
                      <div key={po.id} className="border rounded-lg">
                        <div
                          className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                          onClick={() => togglePOExpand(po.id)}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${expandedPOs.includes(po.id) ? "rotate-180" : ""}`}
                            />
                            <div className="flex-1 grid grid-cols-6 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">PO ID</p>
                                <p className="font-medium">{po.id}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor ID</p>
                                <p className="font-medium">{po.vendorId}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Vendor</p>
                                <p className="font-medium">{po.vendor}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="font-medium">{po.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Total</p>
                                <p className="font-medium">{po.total}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(po.status)}`}
                                >
                                  {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {expandedPOs.includes(po.id) && (
                          <div className="border-t bg-gray-50 p-4">
                            <h4 className="font-semibold mb-3 text-sm">Order Details</h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item ID</TableHead>
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {po.poItems.map((item, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.qty}</TableCell>
                                      <TableCell>{item.unit}</TableCell>
                                      <TableCell>₹{item.price}</TableCell>
                                      <TableCell className="font-medium">₹{item.total}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
