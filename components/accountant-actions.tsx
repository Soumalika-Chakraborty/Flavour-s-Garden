"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, PauseCircle, AlertTriangle } from "lucide-react"

interface AccountantActionsProps {
  onApprove: () => void
  onHold: () => void
  onRaiseDiscrepancy: () => void
}

export function AccountantActions({ onApprove, onHold, onRaiseDiscrepancy }: AccountantActionsProps) {
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showHoldModal, setShowHoldModal] = useState(false)
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false)
  const [holdReason, setHoldReason] = useState("")
  const [discrepancyReason, setDiscrepancyReason] = useState("")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Accountant Actions</CardTitle>
          <CardDescription>Review and approve GRN or raise concerns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button size="lg" className="h-auto py-4 flex-col gap-2" onClick={() => setShowApproveModal(true)}>
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <div className="font-semibold">Approve GRN</div>
                <div className="text-xs font-normal opacity-90">& Release Payment</div>
              </div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              onClick={() => setShowHoldModal(true)}
            >
              <PauseCircle className="w-6 h-6" />
              <div>
                <div className="font-semibold">Hold Payment</div>
                <div className="text-xs font-normal opacity-70">Pending Review</div>
              </div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-warning text-warning hover:bg-warning/10 bg-transparent"
              onClick={() => setShowDiscrepancyModal(true)}
            >
              <AlertTriangle className="w-6 h-6" />
              <div>
                <div className="font-semibold">Raise Discrepancy</div>
                <div className="text-xs font-normal opacity-70">With Vendor</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approve Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve GRN & Release Payment</DialogTitle>
            <DialogDescription>
              This action will finalize the GRN and release payment to the vendor. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GRN Status:</span>
                <span className="font-medium">Ready for Approval</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-medium">Will be Released</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowApproveModal(false)
                onApprove()
              }}
            >
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hold Modal */}
      <Dialog open={showHoldModal} onOpenChange={setShowHoldModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hold Payment</DialogTitle>
            <DialogDescription>
              Provide a reason for holding this payment. The vendor will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter reason for holding payment..."
              value={holdReason}
              onChange={(e) => setHoldReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHoldModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (holdReason.trim()) {
                  setShowHoldModal(false)
                  onHold()
                  setHoldReason("")
                }
              }}
              disabled={!holdReason.trim()}
            >
              Hold Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discrepancy Modal */}
      <Dialog open={showDiscrepancyModal} onOpenChange={setShowDiscrepancyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise Discrepancy with Vendor</DialogTitle>
            <DialogDescription>
              Describe the issue with the delivery. The vendor will be contacted to resolve it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe the discrepancy (e.g., quantity mismatch, quality issues)..."
              value={discrepancyReason}
              onChange={(e) => setDiscrepancyReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiscrepancyModal(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              className="border-warning text-warning hover:bg-warning/10 bg-transparent"
              onClick={() => {
                if (discrepancyReason.trim()) {
                  setShowDiscrepancyModal(false)
                  onRaiseDiscrepancy()
                  setDiscrepancyReason("")
                }
              }}
              disabled={!discrepancyReason.trim()}
            >
              Raise Discrepancy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
