"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package, TrendingUp } from "lucide-react"
import type { PaymentOrder, ChallanData, GRNData } from "@/components/grn-dashboard"
import { cn } from "@/lib/utils"

interface GRNVerificationTabProps {
  paymentOrder: PaymentOrder
  challanData: ChallanData
  grnData: GRNData
  onGenerateGRN: (grn: GRNData) => void
}

export function GRNVerificationTab({ paymentOrder, challanData, grnData, onGenerateGRN }: GRNVerificationTabProps) {
  const [verifiedItems, setVerifiedItems] = useState<Record<string, number>>(challanData.suppliedItems || {})

  const rawMaterials = paymentOrder.items.filter((item) => item.category === "raw_material")
  const finishedProducts = paymentOrder.items.filter((item) => item.category === "finished_product")

  const handleVerifiedQuantityChange = (itemId: string, quantity: number) => {
    setVerifiedItems({ ...verifiedItems, [itemId]: quantity })
  }

  const handleGenerateGRN = () => {
    onGenerateGRN({
      verifiedItems,
      grnNumber: `GRN-${Date.now()}`,
      verifiedDate: new Date().toISOString().split("T")[0],
      paymentStatus: "Pending",
    })
  }

  const hasMismatch = paymentOrder.items.some((item) => {
    const supplied = challanData.suppliedItems[item.id] || 0
    const verified = verifiedItems[item.id] || 0
    return supplied !== item.requiredQty || verified < supplied
  })

  const totalInventoryAddition = Object.values(verifiedItems).reduce((sum, qty) => sum + qty, 0)

  return (
    <>
      {hasMismatch && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Quantity Mismatch Detected</AlertTitle>
          <AlertDescription>
            Some items have quantity discrepancies. Please verify the received quantities carefully.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardTitle className="text-primary">GRN Verification</CardTitle>
          <CardDescription>Compare ordered, supplied, and verify received quantities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Raw Materials</h3>
            <div className="overflow-x-auto border-2 border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary/70">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Item ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Item Name</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Ordered Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Supplied Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Verified Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((item) => {
                    const ordered = item.requiredQty
                    const supplied = challanData.suppliedItems[item.id] || 0
                    const verified = verifiedItems[item.id] || 0
                    const difference = verified - ordered
                    const hasShortage = difference < 0

                    return (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{item.itemId}</td>
                        <td className="py-3 px-4 text-sm font-medium">{item.rawMaterialName}</td>
                        <td className="py-3 px-4 text-sm text-right">{ordered}</td>
                        <td className="py-3 px-4 text-sm text-right">{supplied}</td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            className="max-w-32 ml-auto border-primary/30 focus:border-primary"
                            value={verified || ""}
                            onChange={(e) => handleVerifiedQuantityChange(item.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge
                            variant={hasShortage ? "destructive" : difference > 0 ? "default" : "secondary"}
                            className={cn("font-semibold", !hasShortage && difference > 0 && "bg-success text-white")}
                          >
                            {difference > 0 ? "+" : ""}
                            {difference}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Finished Products</h3>
            <div className="overflow-x-auto border-2 border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary/70">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Item ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Product Name</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Ordered Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Supplied Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Verified Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {finishedProducts.map((item) => {
                    const ordered = item.requiredQty
                    const supplied = challanData.suppliedItems[item.id] || 0
                    const verified = verifiedItems[item.id] || 0
                    const difference = verified - ordered
                    const hasShortage = difference < 0

                    return (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{item.itemId}</td>
                        <td className="py-3 px-4 text-sm font-medium">{item.rawMaterialName}</td>
                        <td className="py-3 px-4 text-sm text-right">{ordered}</td>
                        <td className="py-3 px-4 text-sm text-right">{supplied}</td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            className="max-w-32 ml-auto border-primary/30 focus:border-primary"
                            value={verified || ""}
                            onChange={(e) => handleVerifiedQuantityChange(item.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge
                            variant={hasShortage ? "destructive" : difference > 0 ? "default" : "secondary"}
                            className={cn("font-semibold", !hasShortage && difference > 0 && "bg-success text-white")}
                          >
                            {difference > 0 ? "+" : ""}
                            {difference}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Package className="w-5 h-5" />
            Inventory Update Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Alert className="bg-accent/10 border-accent/30">
            <TrendingUp className="h-5 w-5 text-accent" />
            <AlertDescription className="text-foreground font-medium">
              Only verified quantity will be added to inventory. Total items to add: {totalInventoryAddition}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            {paymentOrder.items.map((item) => {
              const verified = verifiedItems[item.id] || 0
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 px-4 border border-border rounded-lg bg-secondary/30"
                >
                  <span className="text-sm font-medium">{item.rawMaterialName}</span>
                  <Badge variant="outline" className="font-mono font-semibold border-primary text-primary">
                    +{verified}
                  </Badge>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent border-primary text-primary hover:bg-primary/10">
              Recheck Challan
            </Button>
            <Button
              onClick={handleGenerateGRN}
              disabled={Object.keys(verifiedItems).length !== paymentOrder.items.length}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Generate GRN
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
