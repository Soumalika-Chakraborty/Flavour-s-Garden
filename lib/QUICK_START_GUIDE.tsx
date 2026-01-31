// ============================================================================
// QUICK START GUIDE: Using Entities, Columns & APIs
// ============================================================================

/*
This guide shows you how to use the entity system to quickly build your pages
without writing repetitive code. It's designed as "fill in the blanks".

STRUCTURE:
- /lib/entities/types.ts  → Entity TypeScript types (Employee, Product, etc.)
- /lib/entities/columns.ts → Column definitions for tables
- /lib/hooks/useEntities.ts → SWR hooks for fetching data
- /app/api/[entity]/route.ts → CRUD API routes (GET, POST, PUT, DELETE)
*/

// ============================================================================
// EXAMPLE 1: Simple Table Page with Data Fetching
// ============================================================================

/*
File: app/employees/page.tsx

"use client"

import { useEmployees } from "@/lib/hooks/useEntities"
import { EMPLOYEE_COLUMNS } from "@/lib/entities/columns"
import type { Employee } from "@/lib/entities/types"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Eye, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function EmployeesPage() {
  const { data: employees, isLoading } = useEmployees()
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-2">Manage employee information and access</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>View and manage all employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by name, email or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.values(EMPLOYEE_COLUMNS).map((col) => (
                        <TableHead key={col.key}>{col.label}</TableHead>
                      ))}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((employee) => (
                      <TableRow key={employee.id}>
                        {Object.values(EMPLOYEE_COLUMNS).map((col) => (
                          <TableCell key={col.key}>
                            {col.type === "badge" ? (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${col.variants?.[employee[col.key as keyof Employee] as string]}`}>
                                {String(employee[col.key as keyof Employee])}
                              </span>
                            ) : (
                              String(employee[col.key as keyof Employee])
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
*/

// ============================================================================
// EXAMPLE 2: Create/Update Data
// ============================================================================

/*
API Call to CREATE:
const response = await fetch("/api/employees", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "EMP006",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9999999999",
    role: "Chef",
    outlet: "Delhi - North",
    status: "active"
  })
})
const result = await response.json()

API Call to UPDATE:
const response = await fetch("/api/employees/EMP001", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    role: "Senior Manager",
    status: "inactive"
  })
})

API Call to DELETE:
const response = await fetch("/api/employees/EMP001", {
  method: "DELETE"
})
*/

// ============================================================================
// EXAMPLE 3: Using Inventory with Risk Levels
// ============================================================================

/*
File: app/inventory/page.tsx

"use client"

import { useInventory } from "@/lib/hooks/useEntities"
import { INVENTORY_COLUMNS } from "@/lib/entities/columns"
import type { InventoryItem } from "@/lib/entities/types"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function InventoryPage() {
  const { data: items } = useInventory()

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "critical": return <AlertTriangle className="w-4 h-4" />
      case "moderate": return <AlertCircle className="w-4 h-4" />
      case "low": return <CheckCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.values(INVENTORY_COLUMNS).map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            {Object.values(INVENTORY_COLUMNS).map((col) => (
              <TableCell key={col.key}>
                {col.type === "badge" ? (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${col.variants?.[item[col.key as keyof InventoryItem] as string]}`}>
                    {getRiskIcon(item.risk)}
                    {String(item[col.key as keyof InventoryItem])}
                  </span>
                ) : (
                  String(item[col.key as keyof InventoryItem])
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
*/

// ============================================================================
// API ENDPOINTS REFERENCE
// ============================================================================

/*
EMPLOYEES:
  GET    /api/employees           → Get all employees
  POST   /api/employees           → Create new employee
  GET    /api/employees/[id]      → Get specific employee
  PUT    /api/employees/[id]      → Update employee
  DELETE /api/employees/[id]      → Delete employee

PRODUCTS:
  GET    /api/products            → Get all products
  POST   /api/products            → Create new product
  GET    /api/products/[id]       → Get specific product
  PUT    /api/products/[id]       → Update product
  DELETE /api/products/[id]       → Delete product

INVENTORY:
  GET    /api/inventory           → Get all items
  POST   /api/inventory           → Create new item
  GET    /api/inventory/[id]      → Get specific item
  PUT    /api/inventory/[id]      → Update item
  DELETE /api/inventory/[id]      → Delete item

VENDORS:
  GET    /api/vendors             → Get all vendors
  POST   /api/vendors             → Create new vendor
  GET    /api/vendors/[id]        → Get specific vendor
  PUT    /api/vendors/[id]        → Update vendor
  DELETE /api/vendors/[id]        → Delete vendor

PURCHASE ORDERS:
  GET    /api/purchase-orders     → Get all POs
  POST   /api/purchase-orders     → Create new PO
  GET    /api/purchase-orders/[id] → Get specific PO
  PUT    /api/purchase-orders/[id] → Update PO
  DELETE /api/purchase-orders/[id] → Delete PO

AUDIT:
  GET    /api/audit               → Get all audit logs
  POST   /api/audit               → Create audit log
  GET    /api/audit/[id]          → (same as above)

STOCK LOGS:
  GET    /api/stock-logs          → Get all stock logs
  POST   /api/stock-logs          → Create stock log

KITCHEN:
  GET    /api/kitchen             → Get all kitchen orders
  POST   /api/kitchen             → Create kitchen order

GRN:
  GET    /api/grn                 → Get all GRN records
  POST   /api/grn                 → Create GRN record
  GET    /api/grn/[id]            → Get specific GRN
  PUT    /api/grn/[id]            → Update GRN
  DELETE /api/grn/[id]            → Delete GRN
*/

// ============================================================================
// COLUMN DEFINITION STRUCTURE
// ============================================================================

/*
Each column object has:
- key: The property name in your entity
- label: Display name in table header
- type: "text" | "number" | "currency" | "badge" | "link"
- variants?: For badge type, maps values to Tailwind classes
- linkType?: For link type, "tel" | "email"
- className?: Additional Tailwind classes for the cell

Example:
{
  key: "status",
  label: "Status",
  type: "badge",
  variants: {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800"
  }
}
*/

// ============================================================================
// TO CONNECT TO A DATABASE
// ============================================================================

/*
Replace the mock data in /app/api/[entity]/route.ts with actual database calls:

Example with Supabase:
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  const { data, error } = await supabase.from("employees").select("*")
  if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
  return Response.json({ success: true, data })
}

Example with Prisma:
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const employees = await prisma.employee.findMany()
    return Response.json({ success: true, data: employees })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
*/

export {}
