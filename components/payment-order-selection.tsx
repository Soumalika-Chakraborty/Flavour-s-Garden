"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PaymentOrder } from "@/components/grn-dashboard"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface PaymentOrderSelectionProps {
  paymentOrders: PaymentOrder[]
  selectedPO: PaymentOrder | null
  onSelectPO: (po: PaymentOrder) => void
}

export function PaymentOrderSelection({ paymentOrders, selectedPO, onSelectPO }: PaymentOrderSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Payment Order</CardTitle>
        <CardDescription>Choose a payment order to create GRN and process vendor delivery</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">PO Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vendor Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Qty</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentOrders.map((po) => (
                <tr
                  key={po.id}
                  onClick={() => onSelectPO(po)}
                  className={cn(
                    "border-b border-border cursor-pointer transition-colors hover:bg-secondary",
                    selectedPO?.id === po.id && "bg-secondary",
                  )}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {selectedPO?.id === po.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      <span className="font-mono text-sm">{po.poNumber}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{po.vendorName}</td>
                  <td className="py-3 px-4 text-sm">{po.orderDate}</td>
                  <td className="py-3 px-4 text-sm text-right">{po.totalQty}</td>
                  <td className="py-3 px-4 text-sm text-right font-mono">₹{po.totalValue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        po.status === "Delivered" ? "default" : po.status === "Pending" ? "secondary" : "outline"
                      }
                    >
                      {po.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
