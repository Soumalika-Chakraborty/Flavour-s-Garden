"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList } from "lucide-react"

interface KitchenOrderItem {
  itemId: string
  itemName: string
  quantity: number
  unit: string // kg / litre / pcs
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

export function KitchenOrders() {
  const [kitchenOrders] = useState<KitchenOrder[]>([
    {
      id: "KO-001",
      outletId: "OUT-MB",
      orderId: "SO-2024-101",
      orderType: "Delivery",
      items: [
        { itemId: "ITEM-001", itemName: "Margherita Pizza", quantity: 2, unit: "pcs" },
        { itemId: "ITEM-015", itemName: "Garlic Bread", quantity: 1, unit: "pcs" },
      ],
      kitchenStatus: "Preparing",
      lastUpdatedTime: "2024-01-15 14:25",
    },
    {
      id: "KO-002",
      outletId: "OUT-DT",
      orderId: "SO-2024-102",
      orderType: "Eat-at-Outlet",
      items: [
        { itemId: "ITEM-003", itemName: "Chicken Biryani", quantity: 3, unit: "pcs" },
        { itemId: "ITEM-020", itemName: "Raita", quantity: 3, unit: "pcs" },
      ],
      kitchenStatus: "Pending",
      lastUpdatedTime: "2024-01-15 14:30",
    },
    {
      id: "KO-003",
      outletId: "OUT-MFC",
      orderId: "SO-2024-103",
      orderType: "Takeaway",
      items: [
        { itemId: "ITEM-008", itemName: "Paneer Tikka", quantity: 1, unit: "pcs" },
        { itemId: "ITEM-012", itemName: "Naan", quantity: 4, unit: "pcs" },
      ],
      kitchenStatus: "Awaiting Inventory",
      lastUpdatedTime: "2024-01-15 14:32",
    },
    {
      id: "KO-004",
      outletId: "OUT-MB",
      orderId: "SO-2024-104",
      orderType: "Delivery",
      items: [
        { itemId: "ITEM-005", itemName: "Butter Chicken", quantity: 2, unit: "pcs" },
        { itemId: "ITEM-006", itemName: "Dal Makhani", quantity: 1, unit: "pcs" },
        { itemId: "ITEM-012", itemName: "Naan", quantity: 6, unit: "pcs" },
      ],
      kitchenStatus: "Preparing",
      lastUpdatedTime: "2024-01-15 14:28",
    },
    {
      id: "KO-005",
      outletId: "OUT-DT",
      orderId: "SO-2024-105",
      orderType: "Eat-at-Outlet",
      items: [{ itemId: "ITEM-010", itemName: "Caesar Salad", quantity: 2, unit: "pcs" }],
      kitchenStatus: "Pending",
      lastUpdatedTime: "2024-01-15 14:35",
    },
    {
      id: "KO-006",
      outletId: "OUT-MB",
      orderId: "SO-2024-106",
      orderType: "Takeaway",
      items: [
        { itemId: "ITEM-002", itemName: "Pepperoni Pizza", quantity: 1, unit: "pcs" },
        { itemId: "ITEM-018", itemName: "Cold Drink", quantity: 2, unit: "litre" },
      ],
      kitchenStatus: "Awaiting Inventory",
      lastUpdatedTime: "2024-01-15 14:33",
    },
  ])

  // Filter orders to show only active kitchen statuses
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
    <div className="space-y-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border-2 border-orange-400 shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Kitchen</h1>
        <p className="text-gray-700 font-semibold text-lg">Active kitchen orders currently in preparation workflow</p>
      </div>

      {/* Kitchen Orders Table */}
      <Card className="border-3 border-orange-400 shadow-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header - Always visible */}
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Outlet ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-orange-400">
                  Order ID
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
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
                        <ClipboardList className="w-12 h-12 text-orange-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold text-black">No orders currently in kitchen queue</p>
                        <p className="text-sm text-gray-800 font-medium max-w-md">
                          Orders with status Pending, Awaiting Inventory, or Preparing will appear here for kitchen
                          staff to process.
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
                    <td className="px-6 py-4 text-black font-bold">{order.outletId}</td>
                    <td className="px-6 py-4 text-black font-bold">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                        {order.orderType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-black leading-relaxed">
                            <span className="font-bold">{item.itemName}</span>
                            <span className="text-gray-800 font-medium">
                              {" "}
                              • ID: {item.itemId} • {item.quantity} {item.unit}
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
                    <td className="px-6 py-4 text-black font-medium text-sm">{order.lastUpdatedTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Status Legend */}
      <Card className="p-5 bg-white border-3 border-orange-300 shadow-lg">
        <h3 className="text-base font-extrabold text-gray-900 mb-4">Kitchen Status Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-900 border-2 border-yellow-400 font-bold">
              Pending
            </Badge>
            <span className="text-sm text-gray-800 font-semibold">Order received, waiting to start</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-900 border-2 border-yellow-400 font-bold">
              Awaiting Inventory
            </Badge>
            <span className="text-sm text-gray-800 font-semibold">Waiting for ingredients</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-orange-100 text-orange-900 border-2 border-orange-400 font-bold">
              Preparing
            </Badge>
            <span className="text-sm text-gray-800 font-semibold">Currently being prepared</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
