"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, Edit2, TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const stockLogs = [
  { id: 1, date: "2024-01-05", item: "Chicken Breast", action: "Sale", quantity: -5, reference: "ORD142", unit: "kg" },
  { id: 2, date: "2024-01-05", item: "Tomato", action: "Purchase", quantity: 20, reference: "PO001", unit: "kg" },
  { id: 3, date: "2024-01-04", item: "Milk", action: "Adjustment", quantity: -2, reference: "ADJ045", unit: "liters" },
  { id: 4, date: "2024-01-04", item: "Paneer", action: "Sale", quantity: -3, reference: "ORD141", unit: "kg" },
]

const initialAuditLogs = [
  {
    id: 1,
    itemId: "RM-001",
    date: "2024-01-05",
    item: "Chicken Breast",
    expectedStock: 20,
    actualStock: 18,
    variance: -2,
    variancePercent: -10,
  },
  {
    id: 2,
    itemId: "RM-002",
    date: "2024-01-05",
    item: "Tomato",
    expectedStock: 50,
    actualStock: 48,
    variance: -2,
    variancePercent: -4,
  },
  {
    id: 3,
    itemId: "RM-003",
    date: "2024-01-05",
    item: "Mozzarella Cheese",
    expectedStock: 8,
    actualStock: 5,
    variance: -3,
    variancePercent: -37.5,
  },
]

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ itemId: "", item: "", expectedStock: "", actualStock: "" })

  const handleAddAudit = () => {
    if (formData.itemId && formData.item && formData.expectedStock && formData.actualStock) {
      const expected = Number.parseFloat(formData.expectedStock)
      const actual = Number.parseFloat(formData.actualStock)
      const variance = actual - expected
      const variancePercent = expected !== 0 ? ((variance / expected) * 100).toFixed(2) : "0"

      const newAudit = {
        id: auditLogs.length + 1,
        itemId: formData.itemId,
        date: new Date().toISOString().split("T")[0],
        item: formData.item,
        expectedStock: expected,
        actualStock: actual,
        variance: variance,
        variancePercent: Number.parseFloat(variancePercent),
      }
      setAuditLogs([newAudit, ...auditLogs])
      setFormData({ itemId: "", item: "", expectedStock: "", actualStock: "" })
      setIsOpen(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Logs & Audit</h1>
          <p className="text-muted-foreground mt-2">Track inventory movements and variance</p>
        </div>

        <Tabs defaultValue="logs">
          <TabsList>
            <TabsTrigger value="logs">Stock Logs</TabsTrigger>
            <TabsTrigger value="audit">Audit Report</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Movement Logs</CardTitle>
                <CardDescription>All stock additions, deductions, and adjustments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search item or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Quantity Change</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell className="font-medium">{log.item}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${log.action === "Sale" ? "bg-red-100 text-red-800" : log.action === "Purchase" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell
                            className={log.quantity < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}
                          >
                            {log.quantity > 0 ? "+" : ""}
                            {log.quantity}
                          </TableCell>
                          <TableCell>{log.unit}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{log.reference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>End-of-Day Audit</CardTitle>
                    <CardDescription>
                      Enter actual stock count - variance auto-calculated (Actual - Expected)
                    </CardDescription>
                  </div>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Record Audit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record Stock Audit</DialogTitle>
                        <DialogDescription>
                          Enter item ID, expected stock from system, and actual physical count. Variance will be
                          calculated automatically as Actual - Expected.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Item ID</Label>
                          <Input
                            value={formData.itemId}
                            onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                            placeholder="e.g., RM-001"
                          />
                        </div>
                        <div>
                          <Label>Item Name</Label>
                          <Input
                            value={formData.item}
                            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                            placeholder="e.g., Chicken Breast"
                          />
                        </div>
                        <div>
                          <Label>Expected Stock (System Record)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.expectedStock}
                            onChange={(e) => setFormData({ ...formData, expectedStock: e.target.value })}
                            placeholder="Expected quantity"
                          />
                        </div>
                        <div>
                          <Label>Actual Stock (Physical Count)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.actualStock}
                            onChange={(e) => setFormData({ ...formData, actualStock: e.target.value })}
                            placeholder="Actual quantity counted physically"
                          />
                        </div>
                        <Button onClick={handleAddAudit} className="w-full">
                          Record Audit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Expected Stock</TableHead>
                        <TableHead>Actual Stock</TableHead>
                        <TableHead>Variance</TableHead>
                        <TableHead>Variance %</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id} className={log.variance !== 0 ? "bg-amber-50" : ""}>
                          <TableCell className="font-mono text-sm">{log.itemId}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell className="font-medium">{log.item}</TableCell>
                          <TableCell>{log.expectedStock}</TableCell>
                          <TableCell>{log.actualStock}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 font-medium ${log.variance < 0 ? "text-red-600" : log.variance > 0 ? "text-green-600" : ""}`}
                            >
                              {log.variance < 0 && <TrendingDown className="w-4 h-4" />}
                              {log.variance}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${Math.abs(log.variancePercent) > 10 ? "bg-red-100 text-red-800" : Math.abs(log.variancePercent) > 5 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                            >
                              {log.variancePercent > 0 ? "+" : ""}
                              {log.variancePercent}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
