"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertTriangle, TrendingUp, ShoppingCart, Clock } from "lucide-react"

const salesData = [
  { date: "Mon", sales: 4000, revenue: 2400 },
  { date: "Tue", sales: 3000, revenue: 1398 },
  { date: "Wed", sales: 2000, revenue: 9800 },
  { date: "Thu", sales: 2780, revenue: 3908 },
  { date: "Fri", sales: 1890, revenue: 4800 },
  { date: "Sat", sales: 2390, revenue: 3800 },
  { date: "Sun", sales: 3490, revenue: 4300 },
]

const inventoryData = [
  { name: "Vegetables", value: 30 },
  { name: "Meat", value: 25 },
  { name: "Dairy", value: 20 },
  { name: "Groceries", value: 15 },
  { name: "Spices", value: 10 },
]

const COLORS = ["#ff9a3d", "#ffa75d", "#ffb87d", "#ffc99d", "#ffd9bd"]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back to Flavours' Garden Admin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Orders Today", value: "142", change: "+12%", icon: ShoppingCart },
            { title: "Revenue Today", value: "₹42,500", change: "+8%", icon: TrendingUp },
            { title: "Low Inventory", value: "8", change: "Critical", icon: AlertTriangle, color: "text-destructive" },
            { title: "Pending POs", value: "5", change: "In progress", icon: Clock },
          ].map((kpi, idx) => {
            const Icon = kpi.icon
            return (
              <Card
                key={idx}
                className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-secondary"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <Icon className={cn("h-4 w-4 text-muted-foreground", kpi.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">{kpi.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-secondary">
            <CardHeader>
              <CardTitle>Daily Sales Trend</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.94 0 0)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#ff9a3d" strokeWidth={2} />
                  <Line type="monotone" dataKey="sales" stroke="#ffa75d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-secondary">
            <CardHeader>
              <CardTitle>Inventory Usage</CardTitle>
              <CardDescription>By raw material type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={{ fontSize: 12 }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
