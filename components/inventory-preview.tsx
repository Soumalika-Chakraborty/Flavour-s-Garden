import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import type { OrderItem } from "@/components/grn-dashboard"

interface InventoryPreviewProps {
  items: OrderItem[]
  receivedItems: Record<string, number>
}

export function InventoryPreview({ items, receivedItems }: InventoryPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Inventory Update Preview
        </CardTitle>
        <CardDescription>Stock to be added to raw material inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => {
            const received = receivedItems[item.id] || 0
            return (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Current + Received = New Stock</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">+{received}</div>
                  <div className="text-xs text-muted-foreground">units</div>
                </div>
              </div>
            )
          })}

          {items.every((item) => !receivedItems[item.id]) && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Enter received quantities to see inventory preview
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
