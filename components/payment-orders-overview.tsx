import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PaymentOrdersOverview() {
  const paymentOrders = [
    {
      id: "1",
      poNumber: "PO-2024-001",
      vendor: "Fresh Farms Ltd.",
      date: "2024-01-15",
      deliveryDate: "2024-01-25",
      dueDate: "2024-01-30",
      amount: 23000,
      paidAmount: 0,
      status: "Pending",
    },
    {
      id: "2",
      poNumber: "PO-2024-002",
      vendor: "Dairy Delights Co.",
      date: "2024-01-18",
      deliveryDate: "2024-01-28",
      dueDate: "2024-02-02",
      amount: 18500,
      paidAmount: 0,
      status: "In Review",
    },
    {
      id: "3",
      poNumber: "PO-2024-003",
      vendor: "Spice Merchants Inc.",
      date: "2024-01-20",
      deliveryDate: "2024-01-30",
      dueDate: "2024-02-04",
      amount: 12750,
      paidAmount: 0,
      status: "Approved",
    },
    {
      id: "4",
      poNumber: "PO-2024-004",
      vendor: "Veggie World Supplies",
      date: "2024-01-22",
      deliveryDate: "2024-02-01",
      dueDate: "2024-02-06",
      amount: 15600,
      paidAmount: 15600,
      status: "Paid",
    },
    {
      id: "5",
      poNumber: "PO-2023-112",
      vendor: "Meat Master Ltd.",
      date: "2023-12-15",
      deliveryDate: "2023-12-28",
      dueDate: "2024-01-05",
      amount: 38900,
      paidAmount: 38900,
      status: "Paid",
    },
    {
      id: "6",
      poNumber: "PO-2023-098",
      vendor: "Beverages Plus",
      date: "2023-12-10",
      deliveryDate: "2023-12-22",
      dueDate: "2023-12-30",
      amount: 28300,
      paidAmount: 28300,
      status: "Paid",
    },
    {
      id: "7",
      poNumber: "PO-2024-005",
      vendor: "Meat Master Ltd.",
      date: "2024-01-24",
      deliveryDate: "2024-02-03",
      dueDate: "2024-02-08",
      amount: 42500,
      paidAmount: 0,
      status: "Pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "In Review":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Approved":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const totalPending = paymentOrders
    .filter((po) => po.status === "Pending" || po.status === "In Review")
    .reduce((sum, po) => sum + po.amount, 0)

  const totalApproved = paymentOrders.filter((po) => po.status === "Approved").reduce((sum, po) => sum + po.amount, 0)

  const totalPaid = paymentOrders.filter((po) => po.status === "Paid").reduce((sum, po) => sum + po.paidAmount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Purchase Payment</h1>
        <p className="text-muted-foreground">Track and manage all vendor payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paymentOrders.filter((po) => po.status === "Pending" || po.status === "In Review").length} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹{totalApproved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paymentOrders.filter((po) => po.status === "Approved").length} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paymentOrders.filter((po) => po.status === "Paid").length} orders
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Purchase Payments</CardTitle>
              <CardDescription>Complete payment history and pending approvals</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Order Amount</TableHead>
                <TableHead className="text-right">Paid Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.poNumber}</TableCell>
                  <TableCell>{po.vendor}</TableCell>
                  <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(po.deliveryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(po.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-semibold">₹{po.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {po.paidAmount > 0 ? `₹${po.paidAmount.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(po.status)}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
