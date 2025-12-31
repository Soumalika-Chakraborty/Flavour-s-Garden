"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Package, AlertTriangle, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface OutletData {
  id: string
  name: string
  location: string
  totalItems: number
  lowStockCount: number
  criticalStockCount: number
  stockHealth: "healthy" | "warning" | "critical"
}

interface InventoryOutletSelectionProps {
  onSelectOutlet: (outletId: string) => void
}

const outlets: OutletData[] = [
  {
    id: "all",
    name: "All Outlets Overview",
    location: "System-wide",
    totalItems: 428,
    lowStockCount: 23,
    criticalStockCount: 8,
    stockHealth: "warning",
  },
  {
    id: "outlet-1",
    name: "Flavors' Garden - Downtown",
    location: "123 Main Street, Downtown",
    totalItems: 156,
    lowStockCount: 8,
    criticalStockCount: 3,
    stockHealth: "warning",
  },
  {
    id: "outlet-2",
    name: "Flavors' Garden - Uptown",
    location: "456 Park Avenue, Uptown",
    totalItems: 142,
    lowStockCount: 5,
    criticalStockCount: 2,
    stockHealth: "healthy",
  },
  {
    id: "outlet-3",
    name: "Flavors' Garden - Westside",
    location: "789 West Boulevard, Westside",
    totalItems: 130,
    lowStockCount: 10,
    criticalStockCount: 3,
    stockHealth: "critical",
  },
]

export function InventoryOutletSelection({ onSelectOutlet }: InventoryOutletSelectionProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Inventory Management</h1>
        <p className="text-muted-foreground">Select an outlet to view and manage inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outlets.map((outlet) => (
          <Card
            key={outlet.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
            onClick={() => onSelectOutlet(outlet.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    {outlet.id === "all" ? (
                      <Package className="w-6 h-6 text-white" />
                    ) : (
                      <Building2 className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{outlet.name}</CardTitle>
                    <CardDescription className="text-sm">{outlet.location}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{outlet.totalItems}</div>
                  <div className="text-xs text-muted-foreground">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{outlet.lowStockCount}</div>
                  <div className="text-xs text-muted-foreground">Low Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{outlet.criticalStockCount}</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm font-medium text-muted-foreground">Stock Health:</span>
                <Badge className={getHealthColor(outlet.stockHealth)}>
                  <span className="flex items-center gap-1">
                    {getHealthIcon(outlet.stockHealth)}
                    {outlet.stockHealth.charAt(0).toUpperCase() + outlet.stockHealth.slice(1)}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
