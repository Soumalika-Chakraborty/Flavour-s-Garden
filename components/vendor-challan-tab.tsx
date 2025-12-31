"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, Info } from "lucide-react"
import type { PaymentOrder, ChallanData } from "@/components/grn-dashboard"

interface VendorChallanTabProps {
  paymentOrder: PaymentOrder
  challanData: ChallanData
  onSubmitChallan: (challan: ChallanData) => void
}

export function VendorChallanTab({ paymentOrder, challanData, onSubmitChallan }: VendorChallanTabProps) {
  const [suppliedItems, setSuppliedItems] = useState<Record<string, number>>({})
  const [document, setDocument] = useState<File | null>(null)

  const rawMaterials = paymentOrder.items.filter((item) => item.category === "raw_material")
  const finishedProducts = paymentOrder.items.filter((item) => item.category === "finished_product")

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSuppliedItems({ ...suppliedItems, [itemId]: quantity })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    onSubmitChallan({
      suppliedItems,
      document: document || undefined,
      challanNumber: `CH-${Date.now()}`,
      submittedDate: new Date().toISOString().split("T")[0],
    })
  }

  const isComplete = Object.keys(suppliedItems).length === paymentOrder.items.length && document

  return (
    <>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary">Vendor Challan Entry</CardTitle>
              <CardDescription>Enter quantities supplied by vendor for PO {paymentOrder.poNumber}</CardDescription>
            </div>
            <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-semibold">
              {paymentOrder.vendorName}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Alert className="bg-accent/10 border-accent/30">
            <Info className="h-4 w-4 text-accent" />
            <AlertDescription className="text-foreground">
              Vendor challan contains item and quantity only. Price is not included.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Raw Materials</h3>
            <div className="overflow-x-auto border-2 border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary/70">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Item ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Raw Material Name</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Ordered Qty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Supplied Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{item.itemId}</td>
                      <td className="py-3 px-4 text-sm font-medium">{item.rawMaterialName}</td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">{item.requiredQty}</td>
                      <td className="py-3 px-4">
                        <Input
                          type="number"
                          placeholder="0"
                          className="max-w-32 ml-auto border-primary/30 focus:border-primary"
                          value={suppliedItems[item.id] || ""}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                      </td>
                    </tr>
                  ))}
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
                  </tr>
                </thead>
                <tbody>
                  {finishedProducts.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{item.itemId}</td>
                      <td className="py-3 px-4 text-sm font-medium">{item.rawMaterialName}</td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">{item.requiredQty}</td>
                      <td className="py-3 px-4">
                        <Input
                          type="number"
                          placeholder="0"
                          className="max-w-32 ml-auto border-primary/30 focus:border-primary"
                          value={suppliedItems[item.id] || ""}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Upload Challan Document</Label>
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-primary/5 hover:bg-primary/10 transition-colors">
              <input
                type="file"
                id="challan-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="challan-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  {document ? (
                    <>
                      <FileText className="w-10 h-10 text-primary" />
                      <p className="text-sm font-semibold text-primary">{document.name}</p>
                      <p className="text-xs text-muted-foreground">{(document.size / 1024).toFixed(2)} KB</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-primary" />
                      <p className="text-sm font-medium text-foreground">Click to upload PDF or Image</p>
                      <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
            >
              Submit Challan
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
