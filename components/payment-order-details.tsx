import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PaymentOrder } from "@/components/grn-dashboard"

interface PaymentOrderDetailsProps {
  paymentOrder: PaymentOrder
}

export function PaymentOrderDetails({ paymentOrder }: PaymentOrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Order Details</CardTitle>
        <CardDescription>Review ordered items and vendor information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Vendor Name</div>
              <div className="font-medium">{paymentOrder.vendorName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">PO Number</div>
              <div className="font-mono">{paymentOrder.poNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Order Date</div>
              <div>{paymentOrder.orderDate}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Ordered Quantity</div>
              <div className="font-medium">{paymentOrder.totalQty} units</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Expected Total Amount</div>
              <div className="text-2xl font-semibold">₹{paymentOrder.totalValue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium mb-3">Ordered Items</div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Raw Material</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Ordered Qty</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Unit Price</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {paymentOrder.items.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-2 px-3 text-sm">{item.name}</td>
                    <td className="py-2 px-3 text-sm text-right">{item.orderedQty}</td>
                    <td className="py-2 px-3 text-sm text-right font-mono">₹{item.unitPrice}</td>
                    <td className="py-2 px-3 text-sm text-right font-mono">
                      ₹{(item.orderedQty * item.unitPrice).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
