import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface GRNStatusTrackerProps {
  currentStatus: "po-created" | "goods-delivered" | "grn-created" | "payment-approved" | "closed"
}

const statuses = [
  { id: "po-created", label: "PO Created" },
  { id: "goods-delivered", label: "Goods Delivered" },
  { id: "grn-created", label: "GRN Created" },
  { id: "payment-approved", label: "Payment Approved" },
  { id: "closed", label: "GRN Closed" },
]

export function GRNStatusTracker({ currentStatus }: GRNStatusTrackerProps) {
  const currentIndex = statuses.findIndex((s) => s.id === currentStatus)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          {statuses.map((status, index) => {
            const isCompleted = index <= currentIndex
            const isCurrent = index === currentIndex

            return (
              <div key={status.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground",
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <div
                    className={cn(
                      "mt-2 text-xs font-medium text-center",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {status.label}
                  </div>
                </div>
                {index < statuses.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors",
                      index < currentIndex ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
