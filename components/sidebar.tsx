"use client"

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Package,
  Users,
  BarChart3,
  Warehouse,
  UserCog,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  ChefHat,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  activeSection: string
  onNavigate?: (section: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "purchase-orders", label: "Purchase Orders", icon: FileText },
  { id: "payment-orders", label: "Purchase Payment", icon: CreditCard },
  { id: "grn", label: "GRN", icon: Package },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "vendors", label: "Vendors", icon: Users },
  { id: "employees", label: "Employees", icon: UserCog },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: ChefHat,
    subItems: [
      { id: "order-queue", label: "Order Queue" },
      { id: "stock-requisition", label: "Stock Requisition" },
    ],
  },
  {
    id: "sales",
    label: "Sales Detail",
    icon: ShoppingCart,
    subItems: [
      { id: "sales-dashboard", label: "Sales Dashboard" },
      { id: "sales-orders", label: "Sales Orders" },
      { id: "sales-payments", label: "Sales Payments & Delivery" },
    ],
  },
  { id: "reports", label: "Reports", icon: BarChart3 },
]

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["sales", "kitchen"])

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">FLAVORS' GARDEN</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const hasSubItems = "subItems" in item && item.subItems
            const isExpanded = expandedItems.includes(item.id)
            const isActive =
              item.id === activeSection || (hasSubItems && item.subItems?.some((sub) => sub.id === activeSection))

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpand(item.id)
                    } else {
                      onNavigate?.(item.id)
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive && !hasSubItems
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasSubItems &&
                    (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
                </button>

                {hasSubItems && isExpanded && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => {
                      const isSubActive = subItem.id === activeSection
                      return (
                        <li key={subItem.id}>
                          <button
                            onClick={() => onNavigate?.(subItem.id)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              isSubActive
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            )}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            {subItem.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">v1.0.0 • GRN Module</div>
      </div>
    </aside>
  )
}
