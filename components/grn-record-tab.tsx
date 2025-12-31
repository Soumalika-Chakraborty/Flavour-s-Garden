"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Clock, FileText, Package, DollarSign, AlertCircle, Receipt } from "lucide-react"
import type { PaymentOrder, ChallanData, GRNData, InvoiceData } from "@/components/grn-dashboard"
import { cn } from "@/lib/utils"

interface GRNRecordTabProps {
  paymentOrder: PaymentOrder
  challanData: ChallanData
  grnData: GRNData
  invoiceData: InvoiceData
  onApprovePayment: () => void
  onHoldPayment: (reason: string) => void
}

export function GRNRecordTab({
  paymentOrder,
  challanData,
  grnData,
  invoiceData,
  onApprovePayment,
  onHoldPayment,
}: GRNRecordTabProps) {
  const [showHoldDialog, setShowHoldDialog] = useState(false)
  const [holdReason, setHoldReason] = useState("")

  const calculatePayableAmount = () => {
    return paymentOrder.items.reduce((sum, item) => {
      const verifiedQty = grnData.verifiedItems[item.id] || 0
      return sum + verifiedQty * item.unitPrice
    }, 0)
  }

  const payableAmount = calculatePayableAmount()
  const hasAdjustment = payableAmount !== paymentOrder.totalValue
  const invoiceMismatch = invoiceData.invoiceAmount && invoiceData.invoiceAmount !== payableAmount

  const handleApprove = () => {
    onApprovePayment()
  }

  const handleHold = () => {
    if (holdReason.trim()) {
      onHoldPayment(holdReason)
      setShowHoldDialog(false)
      setHoldReason("")
    }
  }

  const statusSteps = [
    { label: "PO Created", status: "complete", icon: FileText },
    { label: "Challan Submitted", status: "complete", icon: Package },
    { label: "GRN Verified", status: "complete", icon: CheckCircle2 },
    { label: "Invoice Received", status: "complete", icon: Receipt },
    {
      label: "Payment Approved",
      status: grnData.paymentStatus === "Approved" ? "complete" : grnData.paymentStatus === "Hold" ? "hold" : "pending",
      icon: DollarSign,
    },
    { label: "GRN Closed", status: grnData.paymentStatus === "Approved" ? "complete" : "pending", icon: CheckCircle2 },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>GRN Status Timeline</CardTitle>
              <CardDescription>Track the progress of this GRN</CardDescription>
            </div>
            <Badge
              variant={
                grnData.paymentStatus === "Approved"
                  ? "default"
                  : grnData.paymentStatus === "Hold"
                    ? "destructive"
                    : "secondary"
              }
              className={cn(grnData.paymentStatus === "Approved" && "bg-success text-success-foreground")}
            >
              {grnData.paymentStatus || "Pending"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative">
            {statusSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col items-center gap-2 flex-1 relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-background z-10",
                      step.status === "complete" && "bg-success border-success text-success-foreground",
                      step.status === "pending" && "border-muted-foreground text-muted-foreground",
                      step.status === "hold" && "bg-destructive border-destructive text-destructive-foreground",
                    )}
                  >
                    {step.status === "pending" ? (
                      <Clock className="w-5 h-5" />
                    ) : step.status === "hold" ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs text-center text-muted-foreground">{step.label}</span>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-5 left-1/2 w-full h-0.5 -z-0",
                        step.status === "complete" ? "bg-success" : "bg-border",
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">PO Number:</span>
              <span className="text-sm font-mono">{paymentOrder.poNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vendor:</span>
              <span className="text-sm font-medium">{paymentOrder.vendorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order Date:</span>
              <span className="text-sm">{paymentOrder.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Original PO Value:</span>
              <span className="text-sm font-mono">₹{paymentOrder.totalValue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vendor Challan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Challan Number:</span>
              <span className="text-sm font-mono">{challanData.challanNumber || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Submitted Date:</span>
              <span className="text-sm">{challanData.submittedDate || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Document:</span>
              <span className="text-sm">{challanData.document?.name || "Uploaded"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Invoice Number:</span>
            <span className="text-sm font-mono">{invoiceData.invoiceNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Invoice Date:</span>
            <span className="text-sm">{invoiceData.invoiceDate || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Invoice Amount:</span>
            <span className="text-sm font-mono">
              ₹{invoiceData.invoiceAmount ? invoiceData.invoiceAmount.toLocaleString() : "0"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Document:</span>
            <span className="text-sm">{invoiceData.document?.name || "Uploaded"}</span>
          </div>
          {invoiceMismatch && (
            <div className="pt-2">
              <Badge variant="destructive" className="w-full justify-center">
                Invoice Amount Mismatch: ₹{Math.abs((invoiceData.invoiceAmount || 0) - payableAmount).toLocaleString()}{" "}
                difference
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GRN Summary</CardTitle>
          <CardDescription>Final verified quantities and variance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item Name</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ordered</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Supplied</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Verified</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variance</th>
                </tr>
              </thead>
              <tbody>
                {paymentOrder.items.map((item) => {
                  const ordered = item.requiredQty
                  const supplied = challanData.suppliedItems[item.id] || 0
                  const verified = grnData.verifiedItems[item.id] || 0
                  const variance = verified - ordered

                  return (
                    <tr key={item.id} className="border-b border-border">
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.itemId}</td>
                      <td className="py-3 px-4 text-sm">{item.rawMaterialName}</td>
                      <td className="py-3 px-4 text-sm text-right">{ordered}</td>
                      <td className="py-3 px-4 text-sm text-right">{supplied}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{verified}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={variance < 0 ? "destructive" : variance > 0 ? "default" : "secondary"}
                          className={cn(variance > 0 && "bg-success text-success-foreground")}
                        >
                          {variance > 0 ? "+" : ""}
                          {variance}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Recalculation</CardTitle>
          <CardDescription>Final payable amount based on verified quantities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentOrder.items.map((item) => {
            const verifiedQty = grnData.verifiedItems[item.id] || 0
            const itemTotal = verifiedQty * item.unitPrice
            return (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{item.rawMaterialName}</p>
                  <p className="text-xs text-muted-foreground">
                    {verifiedQty} × ₹{item.unitPrice}
                  </p>
                </div>
                <p className="font-mono">₹{itemTotal.toLocaleString()}</p>
              </div>
            )
          })}

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="font-semibold">Final Payable Amount (Based on GRN)</p>
              {hasAdjustment && (
                <p className="text-xs text-muted-foreground">
                  Original: <span className="line-through">₹{paymentOrder.totalValue.toLocaleString()}</span>
                </p>
              )}
            </div>
            <p className="text-2xl font-bold text-primary">₹{payableAmount.toLocaleString()}</p>
          </div>

          {invoiceData.invoiceAmount && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Invoice Amount:</p>
                <p className={cn("font-mono", invoiceMismatch && "text-destructive")}>
                  ₹{invoiceData.invoiceAmount.toLocaleString()}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {grnData.paymentStatus !== "Approved" && (
        <Card>
          <CardHeader>
            <CardTitle>Accountant Actions</CardTitle>
            <CardDescription>Approve or hold payment for this GRN</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={handleApprove} className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve GRN & Release Payment
              </Button>
              <Button onClick={() => setShowHoldDialog(true)} variant="destructive" className="flex-1">
                <AlertCircle className="w-4 h-4 mr-2" />
                Hold Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {grnData.paymentStatus === "Hold" && grnData.holdReason && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Payment on Hold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Reason:</p>
            <p className="text-sm mt-1">{grnData.holdReason}</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={showHoldDialog} onOpenChange={setShowHoldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hold Payment</DialogTitle>
            <DialogDescription>Please provide a reason for holding this payment</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="hold-reason">Reason (Mandatory)</Label>
            <Textarea
              id="hold-reason"
              placeholder="Enter reason for holding payment..."
              value={holdReason}
              onChange={(e) => setHoldReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHoldDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleHold} disabled={!holdReason.trim()} variant="destructive">
              Hold Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
