"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentOrderTab } from "@/components/payment-order-tab"
import { VendorChallanTab } from "@/components/vendor-challan-tab"
import { GRNVerificationTab } from "@/components/grn-verification-tab"
import { InvoiceTab } from "@/components/invoice-tab"
import { GRNRecordTab } from "@/components/grn-record-tab"
import { DashboardOverview } from "@/components/dashboard-overview"
import { PurchaseOrdersOverview } from "@/components/purchase-orders-overview"
import { PaymentOrdersOverview } from "@/components/payment-orders-overview"
import { VendorReportsOverview } from "@/components/vendor-reports-overview"
import { InventoryOutletSelection } from "@/components/inventory-outlet-selection"
import { InventoryDashboard } from "@/components/inventory-dashboard"
import { EmployeesOverview } from "@/components/employees-overview"
import { ReportsOverview } from "@/components/reports-overview"
import { SalesDashboard } from "@/components/sales-dashboard"
import { SalesOrders } from "@/components/sales-orders"
import { SalesPaymentsDelivery } from "@/components/sales-payments-delivery"
import { OrderQueue } from "@/components/order-queue"
import { StockRequisition } from "@/components/stock-requisition"

export interface PaymentOrder {
  id: string
  poNumber: string
  vendorName: string
  orderDate: string
  expectedDeliveryDate: string
  totalValue: number
  status:
    | "Created"
    | "Sent"
    | "Challan Submitted"
    | "GRN Verified"
    | "Invoice Generated"
    | "Payment Approved"
    | "Closed"
  items: POItem[]
}

export interface POItem {
  id: string
  itemId: string
  rawMaterialName: string
  category: "raw_material" | "finished_product"
  requiredQty: number
  suppliedQty?: number
  verifiedQty?: number
  unitPrice: number
}

export interface ChallanData {
  suppliedItems: Record<string, number>
  document?: File
  challanNumber?: string
  submittedDate?: string
}

export interface GRNData {
  verifiedItems: Record<string, number>
  grnNumber?: string
  verifiedDate?: string
  paymentStatus?: "Pending" | "Approved" | "Hold"
  holdReason?: string
}

export interface InvoiceData {
  invoiceNumber?: string
  invoiceDate?: string
  invoiceAmount?: number
  document?: File
}

export function GRNDashboard({ onLogout }: { onLogout?: () => void }) {
  const [activeSection, setActiveSection] = useState("grn")
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("payment-order")
  const [paymentOrders, setPaymentOrders] = useState<PaymentOrder[]>([
    {
      id: "1",
      poNumber: "PO-2024-001",
      vendorName: "Fresh Farms Ltd.",
      orderDate: "2024-01-15",
      expectedDeliveryDate: "2024-01-20",
      totalValue: 23000,
      status: "Created",
      items: [
        {
          id: "1",
          itemId: "RM-001",
          rawMaterialName: "Tomatoes (kg)",
          category: "raw_material",
          requiredQty: 50,
          unitPrice: 120,
        },
        {
          id: "2",
          itemId: "RM-002",
          rawMaterialName: "Onions (kg)",
          category: "raw_material",
          requiredQty: 100,
          unitPrice: 80,
        },
        {
          id: "3",
          itemId: "FP-001",
          rawMaterialName: "Mozzarella Cheese (kg)",
          category: "finished_product",
          requiredQty: 20,
          unitPrice: 450,
        },
        {
          id: "4",
          itemId: "FP-002",
          rawMaterialName: "Pizza Sauce (ltr)",
          category: "finished_product",
          requiredQty: 15,
          unitPrice: 200,
        },
      ],
    },
    {
      id: "2",
      poNumber: "PO-2024-002",
      vendorName: "Dairy Delights Co.",
      orderDate: "2024-01-18",
      expectedDeliveryDate: "2024-01-23",
      totalValue: 18500,
      status: "Challan Submitted",
      items: [
        {
          id: "5",
          itemId: "RM-003",
          rawMaterialName: "Fresh Milk (ltr)",
          category: "raw_material",
          requiredQty: 100,
          unitPrice: 60,
        },
        {
          id: "6",
          itemId: "RM-004",
          rawMaterialName: "Butter (kg)",
          category: "raw_material",
          requiredQty: 25,
          unitPrice: 420,
        },
        {
          id: "7",
          itemId: "FP-003",
          rawMaterialName: "Cheddar Cheese (kg)",
          category: "finished_product",
          requiredQty: 15,
          unitPrice: 500,
        },
      ],
    },
    {
      id: "3",
      poNumber: "PO-2024-003",
      vendorName: "Spice Merchants Inc.",
      orderDate: "2024-01-20",
      expectedDeliveryDate: "2024-01-25",
      totalValue: 12750,
      status: "GRN Verified",
      items: [
        {
          id: "8",
          itemId: "RM-005",
          rawMaterialName: "Black Pepper (kg)",
          category: "raw_material",
          requiredQty: 10,
          unitPrice: 850,
        },
        {
          id: "9",
          itemId: "RM-006",
          rawMaterialName: "Oregano (kg)",
          category: "raw_material",
          requiredQty: 5,
          unitPrice: 950,
        },
        {
          id: "10",
          itemId: "FP-004",
          rawMaterialName: "BBQ Sauce (ltr)",
          category: "finished_product",
          requiredQty: 20,
          unitPrice: 180,
        },
      ],
    },
    {
      id: "4",
      poNumber: "PO-2024-004",
      vendorName: "Veggie World Supplies",
      orderDate: "2024-01-22",
      expectedDeliveryDate: "2024-01-27",
      totalValue: 15600,
      status: "Payment Approved",
      items: [
        {
          id: "11",
          itemId: "RM-007",
          rawMaterialName: "Bell Peppers (kg)",
          category: "raw_material",
          requiredQty: 30,
          unitPrice: 180,
        },
        {
          id: "12",
          itemId: "RM-008",
          rawMaterialName: "Mushrooms (kg)",
          category: "raw_material",
          requiredQty: 20,
          unitPrice: 320,
        },
        {
          id: "13",
          itemId: "FP-005",
          rawMaterialName: "Pesto Sauce (ltr)",
          category: "finished_product",
          requiredQty: 12,
          unitPrice: 380,
        },
      ],
    },
    {
      id: "5",
      poNumber: "PO-2024-005",
      vendorName: "Meat Master Ltd.",
      orderDate: "2024-01-24",
      expectedDeliveryDate: "2024-01-29",
      totalValue: 42500,
      status: "Sent",
      items: [
        {
          id: "14",
          itemId: "RM-009",
          rawMaterialName: "Chicken Breast (kg)",
          category: "raw_material",
          requiredQty: 50,
          unitPrice: 380,
        },
        {
          id: "15",
          itemId: "RM-010",
          rawMaterialName: "Beef (kg)",
          category: "raw_material",
          requiredQty: 30,
          unitPrice: 650,
        },
        {
          id: "16",
          itemId: "FP-006",
          rawMaterialName: "Pepperoni Slices (kg)",
          category: "finished_product",
          requiredQty: 25,
          unitPrice: 520,
        },
      ],
    },
  ])
  const [selectedPO, setSelectedPO] = useState<PaymentOrder | null>(null)
  const [challanData, setChallanData] = useState<ChallanData>({ suppliedItems: {} })
  const [grnData, setGRNData] = useState<GRNData>({ verifiedItems: {} })
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({})

  const handleCreatePO = (newPO: PaymentOrder) => {
    setPaymentOrders([...paymentOrders, newPO])
  }

  const handleSelectPO = (po: PaymentOrder) => {
    setSelectedPO(po)
    if (po.status === "Created" || po.status === "Sent") {
      setActiveTab("vendor-challan")
    } else if (po.status === "Challan Submitted") {
      setActiveTab("grn-verification")
    } else if (po.status === "GRN Verified") {
      setActiveTab("invoice")
    } else if (po.status === "Invoice Generated" || po.status === "Payment Approved") {
      setActiveTab("grn-record")
    }
  }

  const handleSubmitChallan = (challan: ChallanData) => {
    setChallanData(challan)
    if (selectedPO) {
      const updatedPO = { ...selectedPO, status: "Challan Submitted" as const }
      setSelectedPO(updatedPO)
      setPaymentOrders(paymentOrders.map((po) => (po.id === selectedPO.id ? updatedPO : po)))
      setActiveTab("grn-verification")
    }
  }

  const handleGenerateGRN = (grn: GRNData) => {
    setGRNData(grn)
    if (selectedPO) {
      const updatedPO = { ...selectedPO, status: "GRN Verified" as const }
      setSelectedPO(updatedPO)
      setPaymentOrders(paymentOrders.map((po) => (po.id === selectedPO.id ? updatedPO : po)))
      setActiveTab("invoice")
    }
  }

  const handleSubmitInvoice = (invoice: InvoiceData) => {
    setInvoiceData(invoice)
    if (selectedPO) {
      const updatedPO = { ...selectedPO, status: "Invoice Generated" as const }
      setSelectedPO(updatedPO)
      setPaymentOrders(paymentOrders.map((po) => (po.id === selectedPO.id ? updatedPO : po)))
      setActiveTab("grn-record")
    }
  }

  const handleApprovePayment = () => {
    if (selectedPO) {
      const updatedPO = { ...selectedPO, status: "Payment Approved" as const }
      setSelectedPO(updatedPO)
      setPaymentOrders(paymentOrders.map((po) => (po.id === selectedPO.id ? updatedPO : po)))
      setGRNData({ ...grnData, paymentStatus: "Approved" })
    }
  }

  const handleHoldPayment = (reason: string) => {
    if (selectedPO) {
      setGRNData({ ...grnData, paymentStatus: "Hold", holdReason: reason })
    }
  }

  const handleSelectOutlet = (outletId: string) => {
    setSelectedOutlet(outletId)
  }

  const handleBackToOutlets = () => {
    setSelectedOutlet(null)
  }

  return (
    <div className="flex h-screen bg-background dark">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeSection === "dashboard" && <DashboardOverview />}
            {activeSection === "purchase-orders" && <PurchaseOrdersOverview />}
            {activeSection === "payment-orders" && <PaymentOrdersOverview />}
            {activeSection === "vendors" && <VendorReportsOverview />}
            {activeSection === "reports" && <ReportsOverview />}
            {activeSection === "employees" && <EmployeesOverview />}

            {activeSection === "order-queue" && <OrderQueue />}
            {activeSection === "stock-requisition" && <StockRequisition />}

            {activeSection === "sales-dashboard" && <SalesDashboard />}
            {activeSection === "sales-orders" && <SalesOrders />}
            {activeSection === "sales-payments" && <SalesPaymentsDelivery />}

            {activeSection === "inventory" && (
              <>
                {!selectedOutlet ? (
                  <InventoryOutletSelection onSelectOutlet={handleSelectOutlet} />
                ) : (
                  <InventoryDashboard outletId={selectedOutlet} onBack={handleBackToOutlets} />
                )}
              </>
            )}

            {activeSection === "grn" && (
              <>
                <div>
                  <h1 className="text-3xl font-semibold text-foreground mb-2">Goods Received Note (GRN)</h1>
                  <p className="text-muted-foreground">
                    Manage payment orders, vendor challans, and goods verification
                  </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5 bg-secondary">
                    <TabsTrigger value="payment-order">Payment Order</TabsTrigger>
                    <TabsTrigger value="vendor-challan" disabled={!selectedPO}>
                      Vendor Challan
                    </TabsTrigger>
                    <TabsTrigger
                      value="grn-verification"
                      disabled={!selectedPO || selectedPO.status === "Created" || selectedPO.status === "Sent"}
                    >
                      GRN Verification
                    </TabsTrigger>
                    <TabsTrigger value="invoice" disabled={!selectedPO || selectedPO.status !== "GRN Verified"}>
                      Invoice
                    </TabsTrigger>
                    <TabsTrigger
                      value="grn-record"
                      disabled={
                        !selectedPO ||
                        (selectedPO.status !== "Invoice Generated" && selectedPO.status !== "Payment Approved")
                      }
                    >
                      GRN Record
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment-order" className="space-y-6">
                    <PaymentOrderTab
                      paymentOrders={paymentOrders}
                      onCreatePO={handleCreatePO}
                      onSelectPO={handleSelectPO}
                      selectedPO={selectedPO}
                    />
                  </TabsContent>

                  <TabsContent value="vendor-challan" className="space-y-6">
                    {selectedPO && (
                      <VendorChallanTab
                        paymentOrder={selectedPO}
                        challanData={challanData}
                        onSubmitChallan={handleSubmitChallan}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="grn-verification" className="space-y-6">
                    {selectedPO && (
                      <GRNVerificationTab
                        paymentOrder={selectedPO}
                        challanData={challanData}
                        grnData={grnData}
                        onGenerateGRN={handleGenerateGRN}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="invoice" className="space-y-6">
                    {selectedPO && (
                      <InvoiceTab
                        paymentOrder={selectedPO}
                        grnData={grnData}
                        invoiceData={invoiceData}
                        onSubmitInvoice={handleSubmitInvoice}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="grn-record" className="space-y-6">
                    {selectedPO && (
                      <GRNRecordTab
                        paymentOrder={selectedPO}
                        challanData={challanData}
                        grnData={grnData}
                        invoiceData={invoiceData}
                        onApprovePayment={handleApprovePayment}
                        onHoldPayment={handleHoldPayment}
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
