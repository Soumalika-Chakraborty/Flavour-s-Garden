"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList } from "lucide-react"

interface KitchenOrderItem {
  itemId: string
  itemName: string
  quantity: number
  unit: string
}

interface KitchenOrder {
  id: string
  outletId: string
  orderId: string
  orderType: "Delivery" | "Takeaway" | "Eat-at-Outlet"
  items: KitchenOrderItem[]
  kitchenStatus: "Pending" | "Awaiting Inventory" | "Preparing"
  lastUpdatedTime: string
}

export function OrderQueue() {
  const [kitchenOrders] = useState<KitchenOrder[]>([
    {
      id: "KO-001",
      outletId: "OUT-MB",
      orderId: "SO-1023",
      orderType: "Delivery",
      items: [
        { itemId: "FP-101", itemName: "Margherita Pizza", quantity: 2, unit: "pcs" },
        { itemId: "FP-205", itemName: "Garlic Bread", quantity: 1, unit: "pcs" },
      ],
      kitchenStatus: "Pending",
      lastUpdatedTime: "2024-01-15 10:45:00",
    },
    {
      id: "KO-002",
      outletId: "OUT-DT",
      orderId: "SO-1024",
      orderType: "Eat-at-Outlet",
      items: [
        { itemId: "FP-112", itemName: "Chicken Biryani", quantity: 3, unit: "pcs" },
        { itemId: "FP-310", itemName: "Raita", quantity: 3, unit: "bowl" },
      ],
      kitchenStatus: "Preparing",
      lastUpdatedTime: "2024-01-15 10:52:00",
    },
    {
      id: "KO-003",
      outletId: "OUT-MFC",
      orderId: "SO-1025",
      orderType: "Takeaway",
      items: [
        { itemId: "FP-205", itemName: "Paneer Butter Masala", quantity: 2, unit: "pcs" },
        { itemId: "FP-501", itemName: "Naan", quantity: 4, unit: "pcs" },
        { itemId: "FP-601", itemName: "Dal Tadka", quantity: 1, unit: "bowl" },
      ],
      kitchenStatus: "Awaiting Inventory",
      lastUpdatedTime: "2024-01-15 11:05:00",
    },
    {
      id: "KO-004",
      outletId: "OUT-MB",
      orderId: "SO-1026",
      orderType: "Delivery",
      items: [
        { itemId: "FP-150", itemName: "Veg Fried Rice", quantity: 2, unit: "pcs" },
        { itemId: "FP-220", itemName: "Manchurian", quantity: 1, unit: "bowl" },
      ],
      kitchenStatus: "Preparing",
      lastUpdatedTime: "2024-01-15 11:15:00",
    },
    {
      id: "KO-005",
      outletId: "OUT-DT",
      orderId: "SO-1027",
      orderType: "Eat-at-Outlet",
      items: [
        { itemId: "FP-301", itemName: "Masala Dosa", quantity: 2, unit: "pcs" },
        { itemId: "FP-405", itemName: "Filter Coffee", quantity: 2, unit: "cup" },
      ],
      kitchenStatus: "Pending",
      lastUpdatedTime: "2024-01-15 11:22:00",
    },
  ])
  const [isLoading] = useState(false)

  // Filter orders to show only active kitchen statuses in FIFO order
  const activeOrders = kitchenOrders.filter((order) =>
    ["Pending", "Awaiting Inventory", "Preparing"].includes(order.kitchenStatus),
  )

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending":
      case "Awaiting Inventory":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Preparing":
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border-2 border-orange-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Queue</h1>
        <p className="text-gray-700 font-medium">All orders currently handled by the kitchen in FIFO queue order</p>
      </div>

      {/* Kitchen Orders Table */}
      <Card className="border-2 border-orange-300 shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header - Always visible */}
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Outlet ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Order Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Items Summary
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Kitchen Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Last Updated Time
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
                      <p className="text-lg font-semibold text-gray-700">Loading orders...</p>
                    </div>
                  </td>
                </tr>
              ) : activeOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
                        <ClipboardList className="w-10 h-10 text-orange-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold text-gray-900">No orders currently in kitchen queue</p>
                        <p className="text-sm text-gray-600 font-medium max-w-md">
                          Orders with status Pending, Awaiting Inventory, or Preparing will appear here in FIFO order
                          for kitchen staff to process.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                activeOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-900 font-bold">{order.outletId}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 font-medium">
                        {order.orderType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, idx) => (
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
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={getStatusBadgeColor(order.kitchenStatus)}>
                        {order.kitchenStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium text-sm">{order.lastUpdatedTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Status Legend */}
      <Card className="p-5 bg-white border-2 border-orange-300 shadow-md">
        <h3 className="text-base font-bold text-gray-900 mb-4">Kitchen Status Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-900 border-2 border-yellow-400 font-bold">
              Pending
            </Badge>
            <span className="text-sm text-gray-700 font-medium">Order received, waiting to start</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-900 border-2 border-yellow-400 font-bold">
              Awaiting Inventory
            </Badge>
            <span className="text-sm text-gray-700 font-medium">Waiting for ingredients</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-orange-100 text-orange-900 border-2 border-orange-400 font-bold">
              Preparing
            </Badge>
            <span className="text-sm text-gray-700 font-medium">Currently being prepared</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
