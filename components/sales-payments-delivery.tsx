"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Payment {
  orderId: string
  outletId: string
  paymentMode: "UPI" | "Card" | "COD"
  paymentStatus: "Pending" | "Completed" | "Failed"
  billAmount: number
  paymentDateTime: string
}

interface Delivery {
  deliveryId: string
  orderId: string
  outletId: string
  deliveryPartner: "Swiggy" | "Zomato" | "Self"
  deliveryStatus: "Assigned" | "Out for Delivery" | "Delivered" | "Cancelled"
  assignedDateTime: string
  lastUpdated: string
}

export function SalesPaymentsDelivery() {
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [outletFilter, setOutletFilter] = useState("all")

  const payments: Payment[] = [
    {
      orderId: "ORD-2024-1201",
      outletId: "MB-001",
      paymentMode: "UPI",
      paymentStatus: "Completed",
      billAmount: 1280,
      paymentDateTime: "2024-01-25 10:45 AM",
    },
    {
      orderId: "ORD-2024-1202",
      outletId: "DT-002",
      paymentMode: "Card",
      paymentStatus: "Completed",
      billAmount: 890,
      paymentDateTime: "2024-01-25 10:52 AM",
    },
    {
      orderId: "ORD-2024-1203",
      outletId: "MB-001",
      paymentMode: "COD",
      paymentStatus: "Pending",
      billAmount: 1350,
      paymentDateTime: "2024-01-25 11:05 AM",
    },
    {
      orderId: "ORD-2024-1204",
      outletId: "ML-003",
      paymentMode: "UPI",
      paymentStatus: "Completed",
      billAmount: 780,
      paymentDateTime: "2024-01-25 11:12 AM",
    },
    {
      orderId: "ORD-2024-1205",
      outletId: "DT-002",
      paymentMode: "Card",
      paymentStatus: "Failed",
      billAmount: 620,
      paymentDateTime: "2024-01-25 11:18 AM",
    },
  ]

  const deliveries: Delivery[] = [
    {
      deliveryId: "DEL-2024-801",
      orderId: "ORD-2024-1201",
      outletId: "MB-001",
      deliveryPartner: "Swiggy",
      deliveryStatus: "Out for Delivery",
      assignedDateTime: "2024-01-25 10:50 AM",
      lastUpdated: "2024-01-25 11:15 AM",
    },
    {
      deliveryId: "DEL-2024-802",
      orderId: "ORD-2024-1204",
      outletId: "ML-003",
      deliveryPartner: "Zomato",
      deliveryStatus: "Assigned",
      assignedDateTime: "2024-01-25 11:15 AM",
      lastUpdated: "2024-01-25 11:15 AM",
    },
    {
      deliveryId: "DEL-2024-803",
      orderId: "ORD-2024-1198",
      outletId: "DT-002",
      deliveryPartner: "Swiggy",
      deliveryStatus: "Delivered",
      assignedDateTime: "2024-01-25 09:30 AM",
      lastUpdated: "2024-01-25 10:25 AM",
    },
    {
      deliveryId: "DEL-2024-804",
      orderId: "ORD-2024-1199",
      outletId: "MB-001",
      deliveryPartner: "Self",
      deliveryStatus: "Delivered",
      assignedDateTime: "2024-01-25 10:10 AM",
      lastUpdated: "2024-01-25 10:45 AM",
    },
    {
      deliveryId: "DEL-2024-805",
      orderId: "ORD-2024-1200",
      outletId: "ML-003",
      deliveryPartner: "Zomato",
      deliveryStatus: "Cancelled",
      assignedDateTime: "2024-01-25 10:30 AM",
      lastUpdated: "2024-01-25 10:55 AM",
    },
  ]

  const getPaymentStatusColor = (status: Payment["paymentStatus"]) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Completed: "bg-green-100 text-green-800 border-green-300",
      Failed: "bg-red-100 text-red-800 border-red-300",
    }
    return colors[status]
  }

  const getDeliveryStatusColor = (status: Delivery["deliveryStatus"]) => {
    const colors = {
      Assigned: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Out for Delivery": "bg-orange-100 text-orange-800 border-orange-300",
      Delivered: "bg-green-100 text-green-800 border-green-300",
      Cancelled: "bg-red-100 text-red-800 border-red-300",
    }
    return colors[status]
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-orange-50 via-white to-red-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Payments & Delivery</h1>
          <p className="text-gray-700 mt-1 font-medium">Track payments and delivery fulfillment for sales orders</p>
        </div>
        <div className="flex gap-3">
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-40 border-gray-400 bg-white">
              <SelectValue placeholder="Filter Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={outletFilter} onValueChange={setOutletFilter}>
            <SelectTrigger className="w-40 border-gray-400 bg-white">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outlets</SelectItem>
              <SelectItem value="MB-001">Main Branch</SelectItem>
              <SelectItem value="DT-002">Downtown</SelectItem>
              <SelectItem value="ML-003">Mall Food Court</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="bg-white border-2 border-orange-200 shadow-lg">
        <div className="p-4 border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 to-red-100">
          <h2 className="text-lg font-bold text-gray-900">Payments</h2>
          <p className="text-sm text-gray-700 font-medium">Payment status and transaction details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Outlet ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Bill Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Payment Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment, index) => (
                <tr key={payment.orderId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.orderId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{payment.outletId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      {payment.paymentMode}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="outline" className={getPaymentStatusColor(payment.paymentStatus)}>
                      {payment.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{payment.billAmount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{payment.paymentDateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delivery Table */}
      <Card className="bg-white border-2 border-orange-200 shadow-lg">
        <div className="p-4 border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 to-red-100">
          <h2 className="text-lg font-bold text-gray-900">Delivery Tracking</h2>
          <p className="text-sm text-gray-700 font-medium">Real-time delivery status and partner information</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Order ID / Outlet ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery Partner
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Assigned Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Last Updated Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery, index) => (
                <tr key={delivery.deliveryId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.deliveryId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div>{delivery.orderId}</div>
                    <div className="text-xs text-gray-500">{delivery.outletId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      {delivery.deliveryPartner}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="outline" className={getDeliveryStatusColor(delivery.deliveryStatus)}>
                      {delivery.deliveryStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{delivery.assignedDateTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{delivery.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Color Coding Legend */}
      <Card className="p-4 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 shadow-md">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Status Color Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-700">Pending / Assigned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-gray-700">Out for Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-700">Completed / Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-700">Failed / Cancelled</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
