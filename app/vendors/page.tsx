"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Phone, Mail } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialVendors = [
  {
    id: 1,
    vendorId: "V001",
    name: "Fresh Farms",
    contact: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh@freshfarms.com",
    category: "Raw Materials",
    city: "Delhi",
  },
  {
    id: 2,
    vendorId: "V002",
    name: "Dairy Direct",
    contact: "Priya Singh",
    phone: "+91 9123456789",
    email: "priya@dairydirect.com",
    category: "Dairy",
    city: "Punjab",
  },
  {
    id: 3,
    vendorId: "V003",
    name: "Spice King",
    contact: "Vikram Patel",
    phone: "+91 8765432109",
    email: "vikram@spiceking.com",
    category: "Groceries",
    city: "Mumbai",
  },
  {
    id: 4,
    vendorId: "V004",
    name: "Meat Supplies",
    contact: "Ahmed Khan",
    phone: "+91 7654321098",
    email: "ahmed@meatsupplies.com",
    category: "Meat",
    city: "Hyderabad",
  },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vendors, setVendors] = useState(initialVendors)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    vendorId: "",
    name: "",
    contact: "",
    phone: "",
    email: "",
    category: "",
    city: "",
  })

  const handleAddVendor = () => {
    if (formData.vendorId && formData.name && formData.contact) {
      setVendors([...vendors, { id: vendors.length + 1, ...formData }])
      setFormData({ vendorId: "", name: "", contact: "", phone: "", email: "", category: "", city: "" })
      setIsOpen(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
            <p className="text-muted-foreground mt-2">Manage supplier information and contacts</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>Enter vendor details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Vendor ID</Label>
                  <Input
                    value={formData.vendorId}
                    onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                    placeholder="e.g., V001"
                  />
                </div>
                <div>
                  <Label>Vendor Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Fresh Farms"
                  />
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <Input
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vendor@email.com"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Raw Materials"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <Button onClick={handleAddVendor} className="w-full">
                  Add Vendor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Vendors</CardTitle>
            <CardDescription>View and manage vendor information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor ID</TableHead>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors
                    .filter(
                      (v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.vendorId.includes(searchTerm),
                    )
                    .map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-mono text-sm font-medium">{vendor.vendorId}</TableCell>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.contact}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${vendor.phone}`}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <Phone className="w-4 h-4" />
                            {vendor.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${vendor.email}`}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <Mail className="w-4 h-4" />
                            {vendor.email}
                          </a>
                        </TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>{vendor.city}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 bg-transparent text-red-600 hover:text-red-700"
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
