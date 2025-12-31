"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Eye, Edit, Power, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Employee {
  employeeId: string
  firstName: string
  lastName: string
  role: string
  outletId: string
  dateOfJoining: string
  isActive: boolean
  contactNo: string
  email: string
  address: string
}

export function EmployeesOverview() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      employeeId: "EMP-001",
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Manager",
      outletId: "OUT-001",
      dateOfJoining: "2023-01-15",
      isActive: true,
      contactNo: "+91 98765 43210",
      email: "rahul.sharma@flavorsgarden.com",
      address: "123 MG Road, Bangalore, Karnataka 560001",
    },
    {
      employeeId: "EMP-002",
      firstName: "Priya",
      lastName: "Patel",
      role: "Chef",
      outletId: "OUT-001",
      dateOfJoining: "2023-03-20",
      isActive: true,
      contactNo: "+91 98765 43211",
      email: "priya.patel@flavorsgarden.com",
      address: "456 Brigade Road, Bangalore, Karnataka 560025",
    },
    {
      employeeId: "EMP-003",
      firstName: "Amit",
      lastName: "Kumar",
      role: "Accountant",
      outletId: "OUT-002",
      dateOfJoining: "2023-02-10",
      isActive: true,
      contactNo: "+91 98765 43212",
      email: "amit.kumar@flavorsgarden.com",
      address: "789 Whitefield, Bangalore, Karnataka 560066",
    },
    {
      employeeId: "EMP-004",
      firstName: "Sneha",
      lastName: "Reddy",
      role: "Server",
      outletId: "OUT-001",
      dateOfJoining: "2023-04-05",
      isActive: true,
      contactNo: "+91 98765 43213",
      email: "sneha.reddy@flavorsgarden.com",
      address: "321 Indiranagar, Bangalore, Karnataka 560038",
    },
    {
      employeeId: "EMP-005",
      firstName: "Vikram",
      lastName: "Singh",
      role: "Inventory",
      outletId: "OUT-002",
      dateOfJoining: "2023-05-12",
      isActive: true,
      contactNo: "+91 98765 43214",
      email: "vikram.singh@flavorsgarden.com",
      address: "654 Koramangala, Bangalore, Karnataka 560034",
    },
    {
      employeeId: "EMP-006",
      firstName: "Anita",
      lastName: "Desai",
      role: "Kitchen",
      outletId: "OUT-003",
      dateOfJoining: "2023-06-18",
      isActive: true,
      contactNo: "+91 98765 43215",
      email: "anita.desai@flavorsgarden.com",
      address: "987 HSR Layout, Bangalore, Karnataka 560102",
    },
    {
      employeeId: "EMP-007",
      firstName: "Rajesh",
      lastName: "Gupta",
      role: "Admin",
      outletId: "OUT-001",
      dateOfJoining: "2022-12-01",
      isActive: true,
      contactNo: "+91 98765 43216",
      email: "rajesh.gupta@flavorsgarden.com",
      address: "147 Jayanagar, Bangalore, Karnataka 560041",
    },
    {
      employeeId: "EMP-008",
      firstName: "Kavita",
      lastName: "Nair",
      role: "Server",
      outletId: "OUT-002",
      dateOfJoining: "2023-07-22",
      isActive: false,
      contactNo: "+91 98765 43217",
      email: "kavita.nair@flavorsgarden.com",
      address: "258 Malleshwaram, Bangalore, Karnataka 560003",
    },
    {
      employeeId: "EMP-009",
      firstName: "Arjun",
      lastName: "Iyer",
      role: "Chef",
      outletId: "OUT-003",
      dateOfJoining: "2023-08-30",
      isActive: true,
      contactNo: "+91 98765 43218",
      email: "arjun.iyer@flavorsgarden.com",
      address: "369 Yelahanka, Bangalore, Karnataka 560064",
    },
    {
      employeeId: "EMP-010",
      firstName: "Meera",
      lastName: "Joshi",
      role: "Manager",
      outletId: "OUT-004",
      dateOfJoining: "2023-09-15",
      isActive: true,
      contactNo: "+91 98765 43219",
      email: "meera.joshi@flavorsgarden.com",
      address: "741 Banashankari, Bangalore, Karnataka 560050",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterOutlet, setFilterOutlet] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState<Employee>({
    employeeId: "",
    firstName: "",
    lastName: "",
    role: "",
    outletId: "",
    dateOfJoining: "",
    isActive: true,
    contactNo: "",
    email: "",
    address: "",
  })

  const roles = ["Admin", "Kitchen", "Inventory", "Accountant", "Manager", "Server", "Chef"]
  const outlets = ["OUT-001", "OUT-002", "OUT-003", "OUT-004"]

  const handleAddEmployee = () => {
    const newEmployee = {
      ...formData,
      employeeId: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
    }
    setEmployees([...employees, newEmployee])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.map((emp) => (emp.employeeId === selectedEmployee.employeeId ? formData : emp)))
      setIsEditDialogOpen(false)
      setSelectedEmployee(null)
      resetForm()
    }
  }

  const handleToggleStatus = (employeeId: string) => {
    setEmployees(employees.map((emp) => (emp.employeeId === employeeId ? { ...emp, isActive: !emp.isActive } : emp)))
  }

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData(employee)
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      role: "",
      outletId: "",
      dateOfJoining: "",
      isActive: true,
      contactNo: "",
      email: "",
      address: "",
    })
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || emp.role === filterRole
    const matchesOutlet = filterOutlet === "all" || emp.outletId === filterOutlet
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" ? emp.isActive : !emp.isActive)

    return matchesSearch && matchesRole && matchesOutlet && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage employees across all outlets</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Fill in the employee details below</DialogDescription>
            </DialogHeader>
            <EmployeeForm formData={formData} setFormData={setFormData} roles={roles} outlets={outlets} />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddEmployee}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Add Employee
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterOutlet} onValueChange={setFilterOutlet}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Outlet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outlets</SelectItem>
                {outlets.map((outlet) => (
                  <SelectItem key={outlet} value={outlet}>
                    {outlet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600">
          <CardTitle className="text-white">Employee</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No employees found</p>
              <p className="text-gray-400 text-sm mt-2">
                {employees.length === 0 ? "Add your first employee to get started" : "Try adjusting your filters"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Employee ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">First Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Last Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Outlet ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Date of Joining</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Contact No</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Address</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee.employeeId}
                      className={`border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-900 font-mono text-sm">{employee.employeeId}</td>
                      <td className="py-3 px-4 text-gray-900">{employee.firstName}</td>
                      <td className="py-3 px-4 text-gray-900">{employee.lastName}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                          {employee.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-mono text-sm">{employee.outletId}</td>
                      <td className="py-3 px-4 text-gray-900">{employee.dateOfJoining}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            employee.isActive
                              ? "bg-green-100 text-green-700 border-green-300"
                              : "bg-red-100 text-red-700 border-red-300"
                          }
                          variant="outline"
                        >
                          {employee.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{employee.contactNo}</td>
                      <td className="py-3 px-4 text-gray-900">{employee.email}</td>
                      <td className="py-3 px-4 text-gray-900 max-w-xs truncate">{employee.address}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openViewDialog(employee)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(employee)}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(employee.employeeId)}
                            className={
                              employee.isActive
                                ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                : "text-green-600 hover:text-green-700 hover:bg-green-50"
                            }
                          >
                            <Power className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee details</DialogDescription>
          </DialogHeader>
          <EmployeeForm formData={formData} setFormData={setFormData} roles={roles} outlets={outlets} />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditEmployee}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              Update Employee
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600">Employee ID</Label>
                <p className="font-mono font-semibold text-gray-900">{selectedEmployee.employeeId}</p>
              </div>
              <div>
                <Label className="text-gray-600">Status</Label>
                <Badge
                  className={
                    selectedEmployee.isActive
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-700 border-red-300"
                  }
                  variant="outline"
                >
                  {selectedEmployee.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <Label className="text-gray-600">First Name</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.firstName}</p>
              </div>
              <div>
                <Label className="text-gray-600">Last Name</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.lastName}</p>
              </div>
              <div>
                <Label className="text-gray-600">Role</Label>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                  {selectedEmployee.role}
                </Badge>
              </div>
              <div>
                <Label className="text-gray-600">Outlet ID</Label>
                <p className="font-mono font-semibold text-gray-900">{selectedEmployee.outletId}</p>
              </div>
              <div>
                <Label className="text-gray-600">Date of Joining</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.dateOfJoining}</p>
              </div>
              <div>
                <Label className="text-gray-600">Contact No</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.contactNo}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-gray-600">Email</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-gray-600">Address</Label>
                <p className="font-semibold text-gray-900">{selectedEmployee.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EmployeeForm({
  formData,
  setFormData,
  roles,
  outlets,
}: {
  formData: Employee
  setFormData: (data: Employee) => void
  roles: string[]
  outlets: string[]
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role *</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="outletId">Outlet ID *</Label>
        <Select value={formData.outletId} onValueChange={(value) => setFormData({ ...formData, outletId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select outlet" />
          </SelectTrigger>
          <SelectContent>
            {outlets.map((outlet) => (
              <SelectItem key={outlet} value={outlet}>
                {outlet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dateOfJoining">Date of Joining *</Label>
        <Input
          id="dateOfJoining"
          type="date"
          value={formData.dateOfJoining}
          onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="contactNo">Contact Number *</Label>
        <Input
          id="contactNo"
          type="tel"
          value={formData.contactNo}
          onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
          required
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <div className="col-span-2 flex items-center gap-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="isActive" className="cursor-pointer">
          Active Status
        </Label>
      </div>
    </div>
  )
}
