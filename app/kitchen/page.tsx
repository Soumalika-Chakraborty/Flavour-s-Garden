"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Zap } from "lucide-react"

const orders = [
  { id: "ORD001", items: ["Butter Chicken x2", "Naan x4"], time: "2 min", status: "pending" },
  { id: "ORD002", items: ["Paneer Tikka x3", "Rice x3"], time: "5 min", status: "preparing" },
  { id: "ORD003", items: ["Grilled Fish x1", "Salad x1"], time: "8 min", status: "completed" },
  { id: "ORD004", items: ["Margherita Pizza x2"], time: "1 min", status: "pending" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-red-100 text-red-800"
    case "preparing":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Zap className="w-4 h-4" />
    case "preparing":
      return <Clock className="w-4 h-4" />
    case "completed":
      return <CheckCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function KitchenPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kitchen Queue (FIFO)</h1>
          <p className="text-muted-foreground mt-2">Live order queue sorted by time</p>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-bold">{order.id}</h3>
                      <Badge className={`${getStatusColor(order.status)} flex gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-foreground">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{order.time}</p>
                    <p className="text-xs text-muted-foreground">Time in queue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
