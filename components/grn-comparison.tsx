import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { OrderItem } from "@/components/grn-dashboard"
import { cn } from "@/lib/utils"

interface GRNComparisonProps {
  items: OrderItem[]
  receivedItems: Record<string, number>
}

export function GRNComparison({ items, receivedItems }: GRNComparisonProps) {
  const hasDiscrepancy = items.some((item) => {
    const received = receivedItems[item.id] || 0
    return received !== item.orderedQty
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>GRN Comparison & Gap Analysis</CardTitle>
        <CardDescription>Compare ordered vs received quantities</CardDescription>
      </CardHeader>
      <CardContent>
        {hasDiscrepancy && (
          <Alert className="mb-4 border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning">
              <strong>Warning:</strong> Quantity mismatch detected. Review discrepancies before approval.
            </AlertDescription>
          </Alert>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item Name</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ordered Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Received Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Difference</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variance %</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const received = receivedItems[item.id] || 0
                const difference = received - item.orderedQty
                const variance = item.orderedQty > 0 ? ((difference / item.orderedQty) * 100).toFixed(1) : "0"
                const hasShortage = difference < 0

                return (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-3 px-4 text-sm">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-right">{item.orderedQty}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium">{received}</td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right font-semibold",
                        hasShortage && "text-destructive",
                        difference > 0 && "text-success",
                        difference === 0 && "text-muted-foreground",
                      )}
                    >
                      {difference > 0 ? "+" : ""}
                      {difference}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right",
                        hasShortage && "text-destructive",
                        difference > 0 && "text-success",
                        difference === 0 && "text-muted-foreground",
                      )}
                    >
                      {variance > 0 ? "+" : ""}
                      {variance}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
