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
import type { PaymentOrder, GRNData, InvoiceData } from "@/components/grn-dashboard"

interface InvoiceTabProps {
  paymentOrder: PaymentOrder
  grnData: GRNData
  invoiceData: InvoiceData
  onSubmitInvoice: (invoice: InvoiceData) => void
}

export function InvoiceTab({ paymentOrder, grnData, invoiceData, onSubmitInvoice }: InvoiceTabProps) {
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState("")
  const [document, setDocument] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    onSubmitInvoice({
      invoiceNumber,
      invoiceDate,
      invoiceAmount: Number(invoiceAmount),
      document: document || undefined,
    })
  }

  const isComplete = invoiceNumber && invoiceDate && invoiceAmount && document

  // Calculate verified total
  const verifiedTotal = paymentOrder.items.reduce((total, item) => {
    const verifiedQty = grnData.verifiedItems[item.id] || 0
    return total + verifiedQty * item.unitPrice
  }, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoice Entry</CardTitle>
            <CardDescription>Enter invoice details received from vendor</CardDescription>
          </div>
          <Badge variant="outline" className="text-primary border-primary">
            {paymentOrder.vendorName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Enter the invoice details as provided by the vendor. This will be compared with the GRN-verified amount.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="grn-number">GRN Number</Label>
            <Input id="grn-number" value={grnData.grnNumber || "N/A"} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grn-date">GRN Date</Label>
            <Input id="grn-date" value={grnData.verifiedDate || "N/A"} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verified-amount">GRN Verified Amount</Label>
            <Input id="verified-amount" value={`₹${verifiedTotal.toFixed(2)}`} disabled />
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="text-lg font-medium">Invoice Details</h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number *</Label>
              <Input
                id="invoice-number"
                placeholder="INV-2024-001"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-date">Invoice Date *</Label>
              <Input
                id="invoice-date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-amount">Invoice Amount *</Label>
              <Input
                id="invoice-amount"
                type="number"
                placeholder="0.00"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
              />
            </div>
          </div>

          {invoiceAmount && Number(invoiceAmount) !== verifiedTotal && (
            <Alert variant="destructive">
              <AlertDescription>
                Warning: Invoice amount (₹{Number(invoiceAmount).toFixed(2)}) does not match GRN verified amount (₹
                {verifiedTotal.toFixed(2)}). Difference: ₹{Math.abs(Number(invoiceAmount) - verifiedTotal).toFixed(2)}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label>Upload Invoice Document *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="invoice-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="invoice-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {document ? (
                    <>
                      <FileText className="w-8 h-8 text-primary" />
                      <p className="text-sm font-medium">{document.name}</p>
                      <p className="text-xs text-muted-foreground">{(document.size / 1024).toFixed(2)} KB</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload PDF or Image</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
            Submit Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
