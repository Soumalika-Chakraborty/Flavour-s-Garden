"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"
import type { PaymentOrder, POItem } from "@/components/grn-dashboard"
import { cn } from "@/lib/utils"

interface PaymentOrderTabProps {
  paymentOrders: PaymentOrder[]
  onCreatePO: (po: PaymentOrder) => void
  onSelectPO: (po: PaymentOrder) => void
  selectedPO: PaymentOrder | null
}

export function PaymentOrderTab({ paymentOrders, onCreatePO, onSelectPO, selectedPO }: PaymentOrderTabProps) {
  const [showForm, setShowForm] = useState(false)
  const [vendorName, setVendorName] = useState("")
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("")
  const [items, setItems] = useState<POItem[]>([{ id: "1", rawMaterialName: "", requiredQty: 0, unitPrice: 0 }])

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), rawMaterialName: "", requiredQty: 0, unitPrice: 0 }])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof POItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.requiredQty * item.unitPrice, 0)
  }

  const handleCreatePO = () => {
    const newPO: PaymentOrder = {
      id: Date.now().toString(),
      poNumber: `PO-2024-${String(paymentOrders.length + 1).padStart(3, "0")}`,
      vendorName,
      orderDate: new Date().toISOString().split("T")[0],
      expectedDeliveryDate,
      totalValue: calculateTotal(),
      status: "Created",
      items: items.filter((item) => item.rawMaterialName && item.requiredQty > 0 && item.unitPrice > 0),
    }
    onCreatePO(newPO)
    setShowForm(false)
    setVendorName("")
    setExpectedDeliveryDate("")
    setItems([{ id: "1", rawMaterialName: "", requiredQty: 0, unitPrice: 0 }])
  }

  return (
    <>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
          <div>
            <CardTitle className="text-primary">Payment Orders</CardTitle>
            <CardDescription>Create and manage payment orders for vendors</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Raise Payment Order
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">PO Number</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Items Count</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">PO Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentOrders.map((po) => (
                  <tr
                    key={po.id}
                    onClick={() => onSelectPO(po)}
                    className={cn(
                      "border-b border-border cursor-pointer transition-colors hover:bg-accent/10",
                      selectedPO?.id === po.id && "bg-primary/5",
                    )}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {selectedPO?.id === po.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        <span className="font-mono text-sm font-medium">{po.poNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{po.vendorName}</td>
                    <td className="py-3 px-4 text-sm">{po.items.length}</td>
                    <td className="py-3 px-4 text-sm text-right font-mono font-semibold">
                      ₹{po.totalValue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          po.status === "Payment Approved"
                            ? "default"
                            : po.status === "Created"
                              ? "secondary"
                              : "outline"
                        }
                        className={cn(
                          po.status === "Payment Approved" && "bg-success text-white",
                          po.status === "GRN Verified" && "bg-primary text-white",
                        )}
                      >
                        {po.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-primary">Create Payment Order</CardTitle>
            <CardDescription>Fill in the details to raise a new payment order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor Name</Label>
                <Input
                  id="vendor"
                  placeholder="Enter vendor name"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Expected Delivery Date</Label>
                <Input
                  id="delivery-date"
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Items</Label>
                <Button
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="grid md:grid-cols-4 gap-3 items-end p-4 bg-secondary/50 rounded-lg">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Raw Material Name</Label>
                    <Input
                      placeholder="e.g., Tomatoes (kg)"
                      value={item.rawMaterialName}
                      onChange={(e) => updateItem(item.id, "rawMaterialName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Required Quantity</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={item.requiredQty || ""}
                      onChange={(e) => updateItem(item.id, "requiredQty", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Price (₹)</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="0"
                        value={item.unitPrice || ""}
                        onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                      />
                      {items.length > 1 && (
                        <Button onClick={() => removeItem(item.id)} variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-primary/20">
              <div>
                <p className="text-sm text-muted-foreground">Expected Total Amount</p>
                <p className="text-3xl font-bold text-primary">₹{calculateTotal().toLocaleString()}</p>
              </div>
              <Button
                onClick={handleCreatePO}
                disabled={!vendorName || !expectedDeliveryDate || items.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Raise Payment Order
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
