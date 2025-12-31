"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RequisitionItem {
  itemName: string
  itemId: string
  quantity: number
  unit: string
}

interface Requisition {
  id: string
  outletId: string
  items: RequisitionItem[]
  status: "Not Raised" | "Sent" | "Partially Issued" | "Fully Issued"
  issuerName: string
  lastUpdatedTime: string
}

export function StockRequisition() {
  const { toast } = useToast()
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    {
      id: "REQ-001",
      outletId: "OUT-MB",
      items: [
        { itemName: "Tomatoes", itemId: "RM-001", quantity: 25, unit: "kg" },
        { itemName: "Onions", itemId: "RM-002", quantity: 20, unit: "kg" },
      ],
      status: "Fully Issued",
      issuerName: "Rajesh Kumar",
      lastUpdatedTime: "2024-01-15 09:30:00",
    },
    {
      id: "REQ-002",
      outletId: "OUT-DT",
      items: [{ itemName: "Chicken Breast", itemId: "RM-105", quantity: 15, unit: "kg" }],
      status: "Partially Issued",
      issuerName: "Priya Sharma",
      lastUpdatedTime: "2024-01-15 10:15:00",
    },
    {
      id: "REQ-003",
      outletId: "OUT-MFC",
      items: [
        { itemName: "Mozzarella Cheese", itemId: "FP-020", quantity: 10, unit: "kg" },
        { itemName: "Pizza Sauce", itemId: "FP-021", quantity: 5, unit: "litre" },
      ],
      status: "Sent",
      issuerName: "Amit Patel",
      lastUpdatedTime: "2024-01-15 11:00:00",
    },
    {
      id: "REQ-004",
      outletId: "OUT-MB",
      items: [{ itemName: "Basmati Rice", itemId: "RM-210", quantity: 50, unit: "kg" }],
      status: "Fully Issued",
      issuerName: "Rajesh Kumar",
      lastUpdatedTime: "2024-01-15 08:45:00",
    },
    {
      id: "REQ-005",
      outletId: "OUT-DT",
      items: [
        { itemName: "Paneer", itemId: "RM-110", quantity: 8, unit: "kg" },
        { itemName: "Cream", itemId: "RM-115", quantity: 3, unit: "litre" },
      ],
      status: "Sent",
      issuerName: "Priya Sharma",
      lastUpdatedTime: "2024-01-15 11:30:00",
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    outletId: "OUT-MB",
    itemName: "",
    itemId: "",
    quantity: "",
    unit: "kg",
    issuerName: "",
  })

  const handleSubmitRequisition = () => {
    // Validation
    if (!formData.itemName || !formData.itemId || !formData.quantity || !formData.issuerName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newRequisition: Requisition = {
      id: `REQ-${Date.now()}`,
      outletId: formData.outletId,
      items: [
        {
          itemName: formData.itemName,
          itemId: formData.itemId,
          quantity: Number(formData.quantity),
          unit: formData.unit,
        },
      ],
      status: "Sent",
      issuerName: formData.issuerName,
      lastUpdatedTime: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setRequisitions([newRequisition, ...requisitions])
    setIsModalOpen(false)

    // Reset form
    setFormData({
      outletId: "OUT-MB",
      itemName: "",
      itemId: "",
      quantity: "",
      unit: "kg",
      issuerName: "",
    })

    toast({
      title: "Requisition Sent",
      description: `Stock requisition ${newRequisition.id} has been successfully raised`,
    })
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Not Raised":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Sent":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Partially Issued":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Fully Issued":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Action Button */}
      <div className="bg-white p-6 rounded-lg border-2 border-orange-300 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Requisition</h1>
          <p className="text-gray-700 font-medium">Raise and track inventory requisitions from kitchen</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Raise Stock Requisition
        </Button>
      </div>

      {/* Requisition Status Table */}
      <Card className="border-2 border-orange-300 shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Requisition ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Outlet ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Items Requested
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Issuer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Requisition Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Last Updated Time
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
                      <p className="text-lg font-semibold text-gray-700">Loading requisitions...</p>
                    </div>
                  </td>
                </tr>
              ) : requisitions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
                        <Package className="w-10 h-10 text-orange-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold text-gray-900">No stock requisitions raised yet</p>
                        <p className="text-sm text-gray-600 font-medium max-w-md">
                          Click the "Raise Stock Requisition" button above to request inventory items from the warehouse
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                requisitions.map((req, index) => (
                  <tr
                    key={req.id}
                    className={`border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-900 font-bold">{req.id}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{req.outletId}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 max-w-xs">
                        {req.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-900 leading-relaxed">
                            <span className="font-bold">{item.itemName}</span>
                            <span className="text-gray-700 font-medium">
                              {" "}
                              (ID: {item.itemId}) • {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{req.issuerName}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={getStatusBadgeColor(req.status)}>
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium text-sm">{req.lastUpdatedTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Status Legend */}
      <Card className="p-5 bg-white border-2 border-orange-300 shadow-md">
        <h3 className="text-base font-bold text-gray-900 mb-4">Requisition Status Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-900 border-2 border-yellow-400 font-bold">
              Sent
            </Badge>
            <span className="text-sm text-gray-700 font-medium">Requisition raised, awaiting processing</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-orange-100 text-orange-900 border-2 border-orange-400 font-bold">
              Partially Issued
            </Badge>
            <span className="text-sm text-gray-700 font-medium">Some items issued, pending completion</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-100 text-green-900 border-2 border-green-400 font-bold">
              Fully Issued
            </Badge>
            <span className="text-sm text-gray-700 font-medium">All items delivered to kitchen</span>
          </div>
        </div>
      </Card>

      {/* Requisition Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Raise Stock Requisition</DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in the details below to request inventory items from the warehouse
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="outletId" className="text-gray-900 font-semibold">
                Outlet ID
              </Label>
              <Input
                id="outletId"
                value={formData.outletId}
                readOnly
                className="bg-gray-100 font-medium text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemName" className="text-gray-900 font-semibold">
                Item Name *
              </Label>
              <Input
                id="itemName"
                placeholder="e.g., Tomatoes"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                className="border-orange-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemId" className="text-gray-900 font-semibold">
                Item ID *
              </Label>
              <Input
                id="itemId"
                placeholder="e.g., RM-001"
                value={formData.itemId}
                onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                className="border-orange-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-gray-900 font-semibold">
                  Required Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="border-orange-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit" className="text-gray-900 font-semibold">
                  Unit
                </Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-orange-300 bg-white text-gray-900 font-medium"
                >
                  <option value="kg">kg</option>
                  <option value="litre">litre</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuerName" className="text-gray-900 font-semibold">
                Issuer Name (Kitchen Staff) *
              </Label>
              <Input
                id="issuerName"
                placeholder="e.g., Rajesh Kumar"
                value={formData.issuerName}
                onChange={(e) => setFormData({ ...formData, issuerName: e.target.value })}
                className="border-orange-300"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-orange-300">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRequisition}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
            >
              Submit Requisition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
