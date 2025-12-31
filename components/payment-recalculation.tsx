import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee } from "lucide-react"
import type { OrderItem } from "@/components/grn-dashboard"

interface PaymentRecalculationProps {
  items: OrderItem[]
  receivedItems: Record<string, number>
  originalTotal: number
}

export function PaymentRecalculation({ items, receivedItems, originalTotal }: PaymentRecalculationProps) {
  const newTotal = items.reduce((sum, item) => {
    const received = receivedItems[item.id] || 0
    return sum + received * item.unitPrice
  }, 0)

  const difference = newTotal - originalTotal
  const hasChange = difference !== 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5" />
          Payment Recalculation
        </CardTitle>
        <CardDescription>Final payable amount based on received quantity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const received = receivedItems[item.id] || 0
            const payable = received * item.unitPrice

            return (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {received} × ₹{item.unitPrice}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold">₹{payable.toLocaleString()}</div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 border-t border-border space-y-2">
            {hasChange && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Original PO Value</span>
                <span className="font-mono line-through text-muted-foreground">₹{originalTotal.toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="font-semibold">Final Payable Amount</span>
              <span className="text-2xl font-bold font-mono">₹{newTotal.toLocaleString()}</span>
            </div>

            {hasChange && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Adjustment</span>
                <span className={cn("font-mono font-semibold", difference > 0 ? "text-destructive" : "text-success")}>
                  {difference > 0 ? "+" : ""}₹{Math.abs(difference).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
