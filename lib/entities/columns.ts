// Column definitions for all entities - Use these to configure your tables
// Each entity has a COLUMNS array that you can import and use directly in page.tsx

export const EMPLOYEE_COLUMNS = {
  id: { key: "id", label: "Employee ID", type: "text" },
  name: { key: "name", label: "Name", type: "text" },
  email: { key: "email", label: "Email", type: "text" },
  phone: { key: "phone", label: "Phone", type: "text" },
  role: { key: "role", label: "Role", type: "text" },
  outlet: { key: "outlet", label: "Outlet", type: "text" },
  status: { key: "status", label: "Status", type: "badge", variants: { active: "bg-green-100 text-green-800", inactive: "bg-gray-100 text-gray-800" } },
}

export const PRODUCT_COLUMNS = {
  id: { key: "id", label: "Product Name", type: "text" },
  category: { key: "category", label: "Category", type: "text" },
  price: { key: "price", label: "Price", type: "currency" },
  type: { key: "type", label: "Type", type: "badge", variants: { "Veg": "bg-green-100 text-green-800", "Non-Veg": "bg-red-100 text-red-800" } },
  recipe: { key: "recipe", label: "Recipe", type: "text" },
}

export const INVENTORY_COLUMNS = {
  itemId: { key: "itemId", label: "Item ID", type: "text", className: "font-mono text-sm" },
  name: { key: "name", label: "Item Name", type: "text" },
  category: { key: "category", label: "Category", type: "text" },
  quantity: { key: "quantity", label: "Current Qty", type: "number" },
  unit: { key: "unit", label: "Unit", type: "text" },
  minLevel: { key: "minLevel", label: "Min Level", type: "number" },
  risk: { key: "risk", label: "Risk Level", type: "badge", variants: { critical: "bg-red-100 text-red-800", moderate: "bg-orange-100 text-orange-800", low: "bg-green-100 text-green-800" } },
}

export const VENDOR_COLUMNS = {
  vendorId: { key: "vendorId", label: "Vendor ID", type: "text", className: "font-mono text-sm" },
  name: { key: "name", label: "Vendor Name", type: "text" },
  contact: { key: "contact", label: "Contact Person", type: "text" },
  phone: { key: "phone", label: "Phone", type: "link", linkType: "tel" },
  email: { key: "email", label: "Email", type: "link", linkType: "email" },
  category: { key: "category", label: "Category", type: "text" },
  city: { key: "city", label: "City", type: "text" },
}

export const PURCHASE_ORDER_COLUMNS = {
  id: { key: "id", label: "PO ID", type: "text" },
  vendorId: { key: "vendorId", label: "Vendor ID", type: "text" },
  vendor: { key: "vendor", label: "Vendor", type: "text" },
  date: { key: "date", label: "Date", type: "text" },
  total: { key: "total", label: "Total", type: "text" },
  status: { key: "status", label: "Status", type: "badge", variants: { pending: "bg-yellow-100 text-yellow-800", received: "bg-blue-100 text-blue-800", paid: "bg-green-100 text-green-800" } },
}

export const AUDIT_COLUMNS = {
  itemId: { key: "itemId", label: "Item ID", type: "text", className: "font-mono text-sm" },
  date: { key: "date", label: "Date", type: "text" },
  item: { key: "item", label: "Item", type: "text" },
  expectedStock: { key: "expectedStock", label: "Expected Stock", type: "number" },
  actualStock: { key: "actualStock", label: "Actual Stock", type: "number" },
  variance: { key: "variance", label: "Variance", type: "number" },
  variancePercent: { key: "variancePercent", label: "Variance %", type: "badge", variants: { critical: "bg-red-100 text-red-800", warning: "bg-yellow-100 text-yellow-800", ok: "bg-green-100 text-green-800" } },
}

export const STOCK_LOG_COLUMNS = {
  date: { key: "date", label: "Date", type: "text" },
  item: { key: "item", label: "Item", type: "text" },
  action: { key: "action", label: "Action", type: "badge", variants: { Sale: "bg-red-100 text-red-800", Purchase: "bg-green-100 text-green-800", Adjustment: "bg-gray-100 text-gray-800" } },
  quantity: { key: "quantity", label: "Quantity Change", type: "number" },
  unit: { key: "unit", label: "Unit", type: "text" },
  reference: { key: "reference", label: "Reference", type: "text" },
}

export const KITCHEN_ORDER_COLUMNS = {
  id: { key: "id", label: "Order ID", type: "text" },
  items: { key: "items", label: "Items", type: "text" },
  time: { key: "time", label: "Time in Queue", type: "text" },
  status: { key: "status", label: "Status", type: "badge", variants: { pending: "bg-red-100 text-red-800", preparing: "bg-yellow-100 text-yellow-800", completed: "bg-green-100 text-green-800" } },
}

export const GRN_COLUMNS = {
  id: { key: "id", label: "GRN ID", type: "text" },
  poId: { key: "poId", label: "PO ID", type: "text" },
  vendor: { key: "vendor", label: "Vendor", type: "text" },
  date: { key: "date", label: "Date", type: "text" },
  items: { key: "items", label: "Items Count", type: "number" },
  status: { key: "status", label: "Status", type: "badge", variants: { pending: "bg-yellow-100 text-yellow-800", received: "bg-blue-100 text-blue-800", completed: "bg-green-100 text-green-800" } },
}
