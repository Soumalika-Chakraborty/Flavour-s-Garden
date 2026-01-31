"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Save } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const purchaseOrders = [
  {
    id: "PO001",
    vendorId: "V001",
    vendor: "Fresh Farms",
    date: "2024-01-05",
    status: "pending",
    poItems: [
      { itemId: "RM-001", name: "Chicken Breast", orderedQty: 10, unit: "kg", price: 350, receivedQty: 0 },
      { itemId: "RM-002", name: "Tomato", orderedQty: 15, unit: "kg", price: 50, receivedQty: 0 },
      { itemId: "RM-003", name: "Onion", orderedQty: 20, unit: "kg", price: 40, receivedQty: 0 },
    ],
  },
  {
    id: "PO002",
    vendorId: "V002",
    vendor: "Dairy Direct",
    date: "2024-01-04",
    status: "pending",
    poItems: [
      { itemId: "RM-004", name: "Milk", orderedQty: 50, unit: "liters", price: 50, receivedQty: 0 },
      { itemId: "RM-005", name: "Paneer", orderedQty: 10, unit: "kg", price: 400, receivedQty: 0 },
    ],
  },
  {
    id: "PO003",
    vendorId: "V003",
    vendor: "Spice King",
    date: "2024-01-03",
    status: "pending",
    poItems: [
      { itemId: "GR-001", name: "Red Chili Powder", orderedQty: 5, unit: "kg", price: 300, receivedQty: 0 },
      { itemId: "GR-002", name: "Turmeric", orderedQty: 3, unit: "kg", price: 400, receivedQty: 0 },
    ],
  },
  {
    id: "PO004",
    vendorId: "V004",
    vendor: "Meat Supplies",
    date: "2024-01-02",
    status: "pending",
    poItems: [
      { itemId: "RM-006", name: "Mutton", orderedQty: 20, unit: "kg", price: 500, receivedQty: 0 },
      { itemId: "RM-007", name: "Fish Fillet", orderedQty: 15, unit: "kg", price: 600, receivedQty: 0 },
    ],
  },
]

export default function GRNPage() {
  const [expandedPOs, setExpandedPOs] = useState<string[]>([])
  const [receivedQty, setReceivedQty] = useState<{ [key: string]: number }>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [grnRows, setGrnRows] = useState<{ id: string; poId: string | null }[]>([{ id: "grn-1", poId: null }])

  const togglePOExpand = (poId: string) => {
    setExpandedPOs((prev) => (prev.includes(poId) ? prev.filter((id) => id !== poId) : [...prev, poId]))
  }

  const handleReceivedQtyChange = (poId: string, itemId: string, qty: number) => {
    const key = `${poId}-${itemId}`
    setReceivedQty((prev) => ({ ...prev, [key]: qty }))
  }

  const addGRNRow = () => {
    const newId = `grn-${Date.now()}`
    setGrnRows((prev) => [...prev, { id: newId, poId: null }])
  }

  const removeGRNRow = (id: string) => {
    if (grnRows.length > 1) {
      setGrnRows((prev) => prev.filter((row) => row.id !== id))
    }
  }

  const updateGRNRowPO = (rowId: string, poId: string | null) => {
    setGrnRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, poId } : row)))
  }

  const handleSaveReceipt = (poId: string) => {
    console.log("[v0] GRN saved for PO:", poId, receivedQty)
    alert(`GRN saved for Purchase Order ${poId}`)
  }

  const filteredPOs = purchaseOrders.filter((po) => {
    return (
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const calculatePayment = (poId: string, items: any[]) => {
    return items.reduce((total, item) => {
      const key = `${poId}-${item.itemId}`
      const receivedAmount = receivedQty[key] || 0
      return total + receivedAmount * item.price
    }, 0)
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Goods Receipt Notes (GRN)</h1>
            <p className="text-muted-foreground mt-2">Track received goods from purchase orders and update inventory</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create GRN Records</CardTitle>
            <CardDescription>Select purchase orders to create and manage GRN entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {grnRows.map((row, index) => {
                const selectedPO = row.poId ? purchaseOrders.find((po) => po.id === row.poId) : null

                return (
                  <div key={row.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600 min-w-12">GRN {index + 1}:</span>
                      <select
                        value={row.poId || ""}
                        onChange={(e) => updateGRNRowPO(row.id, e.target.value || null)}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select Purchase Order...</option>
                        {purchaseOrders.map((po) => (
                          <option key={po.id} value={po.id}>
                            {po.id} - {po.vendor} (V: {po.vendorId})
                          </option>
                        ))}
                      </select>
                      {grnRows.length > 1 && (
                        <Button
                          onClick={() => removeGRNRow(row.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    {selectedPO && (
                      <div className="ml-12 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Order Date</p>
                            <p className="font-medium text-slate-700">{selectedPO.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">PO ID</p>
                            <p className="font-mono font-medium text-slate-700">{selectedPO.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Vendor ID</p>
                            <p className="font-mono font-medium text-slate-700">{selectedPO.vendorId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Vendor Name</p>
                            <p className="font-medium text-slate-700">{selectedPO.vendor}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <p className="text-xs text-muted-foreground font-medium mb-2">Items (Auto-fetched from PO)</p>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {selectedPO.poItems.map((item) => (
                              <div
                                key={item.itemId}
                                className="flex items-center justify-between bg-white p-2 rounded border border-slate-100 text-xs"
                              >
                                <div className="flex-1">
                                  <p className="font-mono font-semibold text-slate-700">{item.itemId}</p>
                                  <p className="text-slate-600">{item.name}</p>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-slate-600">
                                    {item.orderedQty} {item.unit}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              <Button onClick={addGRNRow} className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white gap-2">
                + Add More GRN
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Purchase Orders</CardTitle>
            <CardDescription>Receive goods and update inventory stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by PO ID, Vendor ID, or Vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              {filteredPOs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No purchase orders found</p>
                </div>
              ) : (
                filteredPOs.map((po) => (
                  <div
                    key={po.id}
                    className="rounded-lg overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div
                      className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between cursor-pointer hover:from-slate-100 hover:to-slate-150"
                      onClick={() => togglePOExpand(po.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform text-slate-600 ${expandedPOs.includes(po.id) ? "rotate-180" : ""}`}
                        />
                        <div className="grid grid-cols-4 gap-6 flex-1">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Order Date</p>
                            <p className="font-semibold text-slate-800">{po.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">PO ID</p>
                            <p className="font-mono font-semibold text-slate-800">{po.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Vendor ID</p>
                            <p className="font-mono font-semibold text-slate-800">{po.vendorId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Vendor Name</p>
                            <p className="font-semibold text-slate-800">{po.vendor}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedPOs.includes(po.id) && (
                      <div className="border-t bg-white p-4">
                        <h4 className="font-semibold mb-4 text-sm text-slate-700">Items Ordered</h4>
                        <div className="overflow-x-auto mb-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item ID</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Ordered Qty</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Received Qty</TableHead>
                                <TableHead>Line Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {po.poItems.map((item) => {
                                const key = `${po.id}-${item.itemId}`
                                const received = receivedQty[key] || 0
                                const lineTotal = received * item.price
                                return (
                                  <TableRow key={key}>
                                    <TableCell className="font-mono text-sm font-medium">{item.itemId}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.orderedQty}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>₹{item.price}</TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        max={item.orderedQty}
                                        value={received}
                                        onChange={(e) =>
                                          handleReceivedQtyChange(
                                            po.id,
                                            item.itemId,
                                            Number.parseFloat(e.target.value) || 0,
                                          )
                                        }
                                        className="w-20"
                                        placeholder="0"
                                      />
                                    </TableCell>
                                    <TableCell className="font-medium">₹{lineTotal}</TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Payment (Based on Received Qty)</p>
                            <p className="text-2xl font-bold text-orange-600">₹{calculatePayment(po.id, po.poItems)}</p>
                          </div>
                          <Button
                            onClick={() => handleSaveReceipt(po.id)}
                            className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            <Save className="w-4 h-4" />
                            Save Receipt & Update Inventory
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
