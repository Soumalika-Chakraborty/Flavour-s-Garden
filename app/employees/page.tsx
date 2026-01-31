"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Eye, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    email: "rajesh@flavours.com",
    phone: "+91-9876543210",
    role: "Manager",
    outlet: "Mumbai - Central",
    status: "active",
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    email: "priya@flavours.com",
    phone: "+91-9876543211",
    role: "Chef",
    outlet: "Mumbai - Central",
    status: "active",
  },
  {
    id: "EMP003",
    name: "Amit Patel",
    email: "amit@flavours.com",
    phone: "+91-9876543212",
    role: "Inventory Staff",
    outlet: "Delhi - North",
    status: "active",
  },
  {
    id: "EMP004",
    name: "Sneha Gupta",
    email: "sneha@flavours.com",
    phone: "+91-9876543213",
    role: "Cashier",
    outlet: "Bangalore - South",
    status: "inactive",
  },
  {
    id: "EMP005",
    name: "Vikram Singh",
    email: "vikram@flavours.com",
    phone: "+91-9876543214",
    role: "Kitchen Staff",
    outlet: "Mumbai - Central",
    status: "active",
  },
]

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Outlet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium">{emp.id}</TableCell>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell className="text-sm">{emp.email}</TableCell>
                      <TableCell className="text-sm">{emp.phone}</TableCell>
                      <TableCell>{emp.role}</TableCell>
                      <TableCell className="text-sm">{emp.outlet}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${emp.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive hover:text-destructive bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
