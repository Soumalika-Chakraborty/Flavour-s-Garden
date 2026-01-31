"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChefHat,
  Store,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: UtensilsCrossed, label: "Products & Menu", href: "/products" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Store, label: "Vendors", href: "/vendors" },
  { icon: ShoppingCart, label: "Purchase Orders", href: "/purchase-orders" },
  { icon: Truck, label: "GRN", href: "/grn" },
  { icon: ChefHat, label: "Kitchen", href: "/kitchen" },
  { icon: BarChart3, label: "Stock Logs & Audit", href: "/audit" },
  { icon: Users, label: "Employees", href: "/employees" },
]

export function Sidebar() {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    window.location.href = "/login"
  }

  return (
    <>
      {/* Mobile Toggle */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40" onClick={() => setOpen(!open)}>
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 shadow-lg",
          open ? "w-64" : "w-20",
          "md:static",
        )}
        style={{
          background: "linear-gradient(180deg, oklch(0.1 0 0) 0%, oklch(0.14 0 0) 100%)",
        }}
      >
        <div className="p-6 flex items-center justify-between">
          {open && <h1 className="font-bold text-lg text-pretty">Flavours' Garden</h1>}
          <div className={cn(!open && "w-full flex justify-center")}>
            <UtensilsCrossed className="w-5 h-5" />
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:shadow-md hover:bg-sidebar-border/30",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {open && <span className="text-sm font-medium">{item.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            className="w-full justify-start gap-2 bg-sidebar-primary/10 text-sidebar-foreground hover:bg-sidebar-primary/20 transition-colors shadow-sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {open && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setOpen(false)} />}
    </>
  )
}
