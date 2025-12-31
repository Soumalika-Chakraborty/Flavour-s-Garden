"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface OrderItem {
  itemName: string
  itemId: string
  quantity: number
  unit: string
}

interface SalesOrder {
  outletId: string
  orderId: string
  orderType: "Delivery" | "Takeaway" | "Eat-at-Outlet"
  items: OrderItem[]
  orderStatus: "Pending" | "Confirmed" | "Preparing" | "Ready" | "Completed" | "Cancelled"
  kitchenStatus: "Pending" | "In Progress" | "Ready"
  deliveryStatus?: "Pending" | "Assigned" | "Out for Delivery" | "Delivered"
  billAmount: number
  lastUpdated: string
}

export function SalesOrders() {
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const orders: SalesOrder[] = [
    {
      outletId: "MB-001",
      orderId: "ORD-2024-1201",
      orderType: "Delivery",
      items: [
        { itemName: "Margherita Pizza", itemId: "ITM-101", quantity: 2, unit: "pcs" },
        { itemName: "Caesar Salad", itemId: "ITM-205", quantity: 1, unit: "bowl" },
      ],
      orderStatus: "Preparing",
      kitchenStatus: "In Progress",
      deliveryStatus: "Pending",
      billAmount: 1280,
      lastUpdated: "10:45 AM",
    },
    {
      outletId: "DT-002",
      orderId: "ORD-2024-1202",
      orderType: "Eat-at-Outlet",
      items: [
        { itemName: "Pasta Alfredo", itemId: "ITM-302", quantity: 1, unit: "plate" },
        { itemName: "Garlic Bread", itemId: "ITM-401", quantity: 2, unit: "pcs" },
        { itemName: "Iced Tea", itemId: "ITM-501", quantity: 2, unit: "glass" },
      ],
      orderStatus: "Confirmed",
      kitchenStatus: "Pending",
      billAmount: 890,
      lastUpdated: "10:52 AM",
    },
    {
      outletId: "MB-001",
      orderId: "ORD-2024-1203",
      orderType: "Takeaway",
      items: [
        { itemName: "Chicken Burger", itemId: "ITM-601", quantity: 3, unit: "pcs" },
        { itemName: "French Fries", itemId: "ITM-602", quantity: 3, unit: "portion" },
      ],
      orderStatus: "Ready",
      kitchenStatus: "Ready",
      billAmount: 1350,
      lastUpdated: "11:05 AM",
    },
    {
      outletId: "ML-003",
      orderId: "ORD-2024-1204",
      orderType: "Delivery",
      items: [
        { itemName: "Pepperoni Pizza", itemId: "ITM-102", quantity: 1, unit: "pcs" },
        { itemName: "Coke", itemId: "ITM-502", quantity: 2, unit: "bottle" },
      ],
      orderStatus: "Preparing",
      kitchenStatus: "In Progress",
      deliveryStatus: "Assigned",
      billAmount: 780,
      lastUpdated: "11:12 AM",
    },
    {
      outletId: "DT-002",
      orderId: "ORD-2024-1205",
      orderType: "Eat-at-Outlet",
      items: [
        { itemName: "Grilled Sandwich", itemId: "ITM-701", quantity: 2, unit: "pcs" },
        { itemName: "Coffee", itemId: "ITM-801", quantity: 2, unit: "cup" },
      ],
      orderStatus: "Completed",
      kitchenStatus: "Ready",
      billAmount: 620,
      lastUpdated: "11:18 AM",
    },
  ]

  const getOrderStatusColor = (status: SalesOrder["orderStatus"]) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Confirmed: "bg-blue-100 text-blue-800 border-blue-300",
      Preparing: "bg-orange-100 text-orange-800 border-orange-300",
      Ready: "bg-green-100 text-green-800 border-green-300",
      Completed: "bg-gray-100 text-gray-800 border-gray-300",
      Cancelled: "bg-red-100 text-red-800 border-red-300",
    }
    return colors[status]
  }

  const getKitchenStatusColor = (status: SalesOrder["kitchenStatus"]) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "In Progress": "bg-orange-100 text-orange-800 border-orange-300",
      Ready: "bg-green-100 text-green-800 border-green-300",
    }
    return colors[status]
  }

  const getDeliveryStatusColor = (status?: SalesOrder["deliveryStatus"]) => {
    if (!status) return ""
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Assigned: "bg-blue-100 text-blue-800 border-blue-300",
      "Out for Delivery": "bg-orange-100 text-orange-800 border-orange-300",
      Delivered: "bg-green-100 text-green-800 border-green-300",
    }
    return colors[status]
  }

  const handleViewDetails = (order: SalesOrder) => {
    setSelectedOrder(order)
    setShowDetailsDialog(true)
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-orange-50 via-white to-red-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Orders</h1>
          <p className="text-gray-700 mt-1 font-medium">All sales orders with actionable visibility</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-700 shadow-md">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Orders
        </Button>
      </div>

      <Card className="bg-white border-2 border-orange-200 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Outlet ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Order Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Kitchen Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Bill Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.orderId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.outletId}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.orderId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      {order.orderType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          {item.itemName} (ID: {item.itemId}) - {item.quantity} {item.unit}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="outline" className={getOrderStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="outline" className={getKitchenStatusColor(order.kitchenStatus)}>
                      {order.kitchenStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {order.deliveryStatus ? (
                      <Badge variant="outline" className={getDeliveryStatusColor(order.deliveryStatus)}>
                        {order.deliveryStatus}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{order.billAmount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.lastUpdated}</td>
                  <td className="px-4 py-3 text-sm">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Order Details</DialogTitle>
            <DialogDescription>Complete information for {selectedOrder?.orderId}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Outlet ID</p>
                  <p className="text-base font-semibold text-gray-900">{selectedOrder.outletId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Type</p>
                  <Badge variant="outline" className="border-orange-300 text-orange-700 mt-1">
                    {selectedOrder.orderType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Status</p>
                  <Badge variant="outline" className={`${getOrderStatusColor(selectedOrder.orderStatus)} mt-1`}>
                    {selectedOrder.orderStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kitchen Status</p>
                  <Badge variant="outline" className={`${getKitchenStatusColor(selectedOrder.kitchenStatus)} mt-1`}>
                    {selectedOrder.kitchenStatus}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Items Ordered</p>
                <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-900">
                        {item.itemName} <span className="text-gray-500">(ID: {item.itemId})</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total Bill Amount</span>
                <span className="text-2xl font-bold text-orange-600">₹{selectedOrder.billAmount}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
