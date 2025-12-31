import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, FileText, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Purchase Orders",
      value: "28",
      change: "+5 this month",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Active Payment Orders",
      value: "12",
      change: "3 pending approval",
      icon: CreditCard,
      color: "text-orange-600",
    },
    {
      title: "GRN Processed",
      value: "156",
      change: "+18 this month",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Pending Verifications",
      value: "5",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "GRN Verified",
      description: "PO-2024-003 - Spice Merchants Inc.",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: "2",
      type: "Challan Submitted",
      description: "PO-2024-002 - Dairy Delights Co.",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: "3",
      type: "Payment Approved",
      description: "PO-2024-004 - Veggie World Supplies",
      time: "1 day ago",
      status: "success",
    },
    {
      id: "4",
      type: "PO Created",
      description: "PO-2024-005 - Meat Master Ltd.",
      time: "2 days ago",
      status: "info",
    },
    {
      id: "5",
      type: "Invoice Generated",
      description: "PO-2024-003 - Spice Merchants Inc.",
      time: "3 days ago",
      status: "success",
    },
  ]

  const pendingApprovals = [
    { id: "1", poNumber: "PO-2024-001", vendor: "Fresh Farms Ltd.", amount: 23000, daysWaiting: 3 },
    { id: "2", poNumber: "PO-2024-002", vendor: "Dairy Delights Co.", amount: 18500, daysWaiting: 1 },
    { id: "3", poNumber: "PO-2024-005", vendor: "Meat Master Ltd.", amount: 42500, daysWaiting: 5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your restaurant procurement system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from the GRN workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="mt-0.5">
                    {activity.status === "success" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {activity.status === "pending" && <Clock className="w-5 h-5 text-orange-600" />}
                    {activity.status === "info" && <FileText className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{activity.type}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Payment orders requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{item.poNumber}</p>
                    <p className="text-sm text-muted-foreground">{item.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">₹{item.amount.toLocaleString()}</p>
                    <Badge variant={item.daysWaiting > 3 ? "destructive" : "secondary"} className="mt-1">
                      {item.daysWaiting}d waiting
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
