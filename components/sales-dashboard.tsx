"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ShoppingBag, Package, Clock, DollarSign } from "lucide-react"

export function SalesDashboard() {
  const [selectedOutlet, setSelectedOutlet] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  const outletSpecificData = {
    all: {
      stats: [
        { label: "Total Sales Today", value: "₹45,280", change: "+12.5%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "127", change: "+8.2%", trend: "up", icon: ShoppingBag },
        { label: "Online Orders", value: "78", change: "+15.3%", trend: "up", icon: Package },
        { label: "Dine-In Orders", value: "49", change: "-3.1%", trend: "down", icon: Clock },
      ],
      hourlyData: [
        { hour: "9 AM", sales: 2800 },
        { hour: "10 AM", sales: 3200 },
        { hour: "11 AM", sales: 4100 },
        { hour: "12 PM", sales: 5800 },
        { hour: "1 PM", sales: 6200 },
        { hour: "2 PM", sales: 5100 },
        { hour: "3 PM", sales: 3800 },
        { hour: "4 PM", sales: 3200 },
        { hour: "5 PM", sales: 4500 },
        { hour: "6 PM", sales: 5900 },
        { hour: "7 PM", sales: 7200 },
        { hour: "8 PM", sales: 6800 },
      ],
      outletData: [
        { outlet: "Main Branch", orders: 45, revenue: 18500 },
        { outlet: "Downtown", orders: 38, revenue: 15200 },
        { outlet: "Mall Food Court", orders: 44, revenue: 11580 },
      ],
      orderTypes: { online: 61, dineIn: 39 },
    },
    main: {
      stats: [
        { label: "Total Sales Today", value: "₹18,500", change: "+15.2%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "45", change: "+10.5%", trend: "up", icon: ShoppingBag },
        { label: "Online Orders", value: "28", change: "+18.7%", trend: "up", icon: Package },
        { label: "Dine-In Orders", value: "17", change: "+2.8%", trend: "up", icon: Clock },
      ],
      hourlyData: [
        { hour: "9 AM", sales: 1200 },
        { hour: "10 AM", sales: 1450 },
        { hour: "11 AM", sales: 1800 },
        { hour: "12 PM", sales: 2100 },
        { hour: "1 PM", sales: 2400 },
        { hour: "2 PM", sales: 1950 },
        { hour: "3 PM", sales: 1600 },
        { hour: "4 PM", sales: 1300 },
        { hour: "5 PM", sales: 1750 },
        { hour: "6 PM", sales: 2200 },
        { hour: "7 PM", sales: 2850 },
        { hour: "8 PM", sales: 2500 },
      ],
      outletData: [{ outlet: "Main Branch", orders: 45, revenue: 18500 }],
      orderTypes: { online: 62, dineIn: 38 },
    },
    downtown: {
      stats: [
        { label: "Total Sales Today", value: "₹15,200", change: "+8.3%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "38", change: "+5.1%", trend: "up", icon: ShoppingBag },
        { label: "Online Orders", value: "25", change: "+12.4%", trend: "up", icon: Package },
        { label: "Dine-In Orders", value: "13", change: "-4.2%", trend: "down", icon: Clock },
      ],
      hourlyData: [
        { hour: "9 AM", sales: 950 },
        { hour: "10 AM", sales: 1100 },
        { hour: "11 AM", sales: 1350 },
        { hour: "12 PM", sales: 1850 },
        { hour: "1 PM", sales: 2050 },
        { hour: "2 PM", sales: 1700 },
        { hour: "3 PM", sales: 1250 },
        { hour: "4 PM", sales: 1050 },
        { hour: "5 PM", sales: 1450 },
        { hour: "6 PM", sales: 1900 },
        { hour: "7 PM", sales: 2400 },
        { hour: "8 PM", sales: 2100 },
      ],
      outletData: [{ outlet: "Downtown", orders: 38, revenue: 15200 }],
      orderTypes: { online: 66, dineIn: 34 },
    },
    mall: {
      stats: [
        { label: "Total Sales Today", value: "₹11,580", change: "+14.1%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "44", change: "+9.8%", trend: "up", icon: ShoppingBag },
        { label: "Online Orders", value: "25", change: "+16.2%", trend: "up", icon: Package },
        { label: "Dine-In Orders", value: "19", change: "+1.5%", trend: "up", icon: Clock },
      ],
      hourlyData: [
        { hour: "9 AM", sales: 650 },
        { hour: "10 AM", sales: 750 },
        { hour: "11 AM", sales: 950 },
        { hour: "12 PM", sales: 1850 },
        { hour: "1 PM", sales: 1750 },
        { hour: "2 PM", sales: 1450 },
        { hour: "3 PM", sales: 950 },
        { hour: "4 PM", sales: 850 },
        { hour: "5 PM", sales: 1300 },
        { hour: "6 PM", sales: 1800 },
        { hour: "7 PM", sales: 1950 },
        { hour: "8 PM", sales: 2200 },
      ],
      outletData: [{ outlet: "Mall Food Court", orders: 44, revenue: 11580 }],
      orderTypes: { online: 57, dineIn: 43 },
    },
  }

  const currentData = outletSpecificData[selectedOutlet as keyof typeof outletSpecificData]
  const stats = currentData.stats
  const hourlyData = currentData.hourlyData
  const outletData = currentData.outletData
  const orderTypes = currentData.orderTypes

  const maxSales = Math.max(...hourlyData.map((d) => d.sales))
  const maxOrders = Math.max(...outletData.map((d) => d.orders))

  return (
    <div className="space-y-6 bg-gradient-to-br from-orange-50 via-white to-red-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-700 mt-1 font-medium">High-level overview of sales performance</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-40 border-gray-400 bg-white">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outlets</SelectItem>
              <SelectItem value="main">Main Branch</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="mall">Mall Food Court</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32 border-gray-400 bg-white">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-5 bg-white border-2 border-orange-200 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-semibold">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-bold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card className="p-6 bg-white border-2 border-orange-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Sales Trend (Hourly)</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-400 bg-white hover:bg-orange-50 font-semibold"
            >
              Export
            </Button>
          </div>
          <div className="space-y-3">
            {hourlyData.map((data) => (
              <div key={data.hour} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-800 w-16">{data.hour}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden border border-gray-300">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-end pr-3 shadow-inner"
                    style={{ width: `${(data.sales / maxSales) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white">₹{data.sales}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Orders by Outlet */}
        <Card className="p-6 bg-white border-2 border-orange-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Orders by Outlet</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-400 bg-white hover:bg-orange-50 font-semibold"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {outletData.map((outlet) => (
              <div key={outlet.outlet} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{outlet.outlet}</span>
                  <span className="text-sm font-bold text-gray-900">{outlet.orders} orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden border border-gray-300">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-inner"
                      style={{ width: `${(outlet.orders / maxOrders) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-orange-600">₹{outlet.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Type Distribution */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Order Type Distribution</h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">Online</span>
                  <span className="text-xs font-bold text-gray-900">{orderTypes.online}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 shadow-inner"
                    style={{ width: `${orderTypes.online}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">Dine-In</span>
                  <span className="text-xs font-bold text-gray-900">{orderTypes.dineIn}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 shadow-inner"
                    style={{ width: `${orderTypes.dineIn}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
