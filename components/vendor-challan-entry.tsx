"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { OrderItem, ChallanData } from "@/components/grn-dashboard"

interface VendorChallanEntryProps {
  items: OrderItem[]
  challanData: ChallanData
  onChallanDataChange: (data: ChallanData) => void
}

export function VendorChallanEntry({ items, challanData, onChallanDataChange }: VendorChallanEntryProps) {
  const handleQuantityChange = (itemId: string, value: string) => {
    const qty = Number.parseFloat(value) || 0
    onChallanDataChange({
      ...challanData,
      receivedItems: {
        ...challanData.receivedItems,
        [itemId]: qty,
      },
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChallanDataChange({
        ...challanData,
        document: file,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Challan Entry</CardTitle>
        <CardDescription>Enter received quantities from vendor challan (prices are from PO)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Raw Material Name</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ordered Qty</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Received Qty</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="py-3 px-4 text-sm">{item.name}</td>
                  <td className="py-3 px-4 text-sm text-right text-muted-foreground">{item.orderedQty}</td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={challanData.receivedItems[item.id] || ""}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="max-w-32 ml-auto text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            id="challan-upload"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
          <label htmlFor="challan-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm font-medium mb-1">Upload Challan Document</div>
            <div className="text-xs text-muted-foreground">
              {challanData.document ? challanData.document.name : "PDF, JPG, or PNG (Max 5MB)"}
            </div>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent" type="button">
              Choose File
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
