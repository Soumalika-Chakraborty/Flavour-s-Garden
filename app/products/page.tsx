"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Eye, BookOpen } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const products = [
  {
    id: 1,
    name: "Butter Chicken",
    category: "Mains",
    price: 320,
    type: "Non-Veg",
    recipe: "RC001",
    recipeItems: [
      { item: "Chicken Breast", qty: 500, unit: "g" },
      { item: "Butter", qty: 100, unit: "g" },
      { item: "Tomato Sauce", qty: 200, unit: "ml" },
    ],
  },
  {
    id: 2,
    name: "Paneer Tikka",
    category: "Starters",
    price: 280,
    type: "Veg",
    recipe: "RC002",
    recipeItems: [
      { item: "Paneer", qty: 300, unit: "g" },
      { item: "Yogurt", qty: 100, unit: "g" },
      { item: "Spice Mix", qty: 10, unit: "g" },
    ],
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 450,
    type: "Veg",
    recipe: "RC003",
    recipeItems: [
      { item: "Pizza Dough", qty: 400, unit: "g" },
      { item: "Mozzarella Cheese", qty: 150, unit: "g" },
      { item: "Tomato Sauce", qty: 150, unit: "ml" },
    ],
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products & Menu</h1>
            <p className="text-muted-foreground mt-2">Manage menu items and recipes</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>View and manage menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${product.type === "Veg" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {product.type}
                        </span>
                      </TableCell>
                      <TableCell>{product.recipe}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 bg-transparent"
                                onClick={() => setSelectedRecipe(product)}
                              >
                                <BookOpen className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Recipe: {selectedRecipe?.name}</DialogTitle>
                                <DialogDescription>Items required to prepare this dish</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Item</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead>Unit</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedRecipe?.recipeItems.map((item: any, idx: number) => (
                                      <TableRow key={idx}>
                                        <TableCell>{item.item}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Edit2 className="w-4 h-4" />
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
