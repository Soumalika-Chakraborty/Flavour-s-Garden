// ============================================
// ENTITY TYPES - MySQL Database Entities
// ============================================

// Outlet Entity
export interface Outlet {
  Outlet_ID: string;
  Outlet_Name: string;
  Outlet_Address: string;
}

// Menu Categories Entity
export interface MenuCategory {
  Menu_Category_ID: string;
  Category_Name: string;
}

// Configuration Entity
export interface Configuration {
  Change_DateTime: string;
  SGST: number;
  CGST: number;
}

// Consumer Entity
export interface Consumer {
  Consumer_ID: string;
  First_Name: string;
  Last_Name: string;
  Ph_No: number;
  Email: string;
  Password_Hash: string;
  Last_Logged_In: string;
  Default_Address: string;
  Default_Pin: number;
  Del_Address_1: string;
  Del_Pin: number;
}

// Vendor Details Entity
export interface VendorDetails {
  Vendor_ID: string;
  Vendor_Address: string;
  Vendor_Type: string;
  Vendor_Contact: number;
  Vendor_GST_No: string;
}

// Employee Entity
export interface Employee {
  Employee_ID: string;
  First_Name: string;
  Last_Name: string;
  Role: string;
  Address: string;
  Outlet_ID: string;
  Date_of_Joining: string;
  Is_Active: boolean;
  Contact_No: number;
  Email: string;
  password: string;
}

// Product Entity
export interface Product {
  Product_ID: string;
  Product_Name: string;
  Menu_Category_ID: string;
  Price_Per_Unit: number;
  Image_Url: string;
  Product_Description: string;
  Allergen: string;
  Is_Veg: string;
  Recipe_ID: string;
  Ref_Key: string;
  Is_Recommended: string;
}

// Inventory Entity
export interface Inventory {
  Item_ID: string;
  Outlet_ID: string;
  Ingredient_Name: string;
  Current_Qty: number;
  Unit_of_Measurement: string;
  Min_Stock_Level: number;
  Reorder_Level: number;
  Priority: string;
  Last_Updated: string;
}

// Address Entity
export interface Address {
  Consumer_ID: string;
  Street: string;
  City: string;
  Landmark: string;
  Pin_Code: number;
}

// Sales Order Header Entity
export interface SalesOrderHeader {
  Sales_Order_ID: string;
  Order_Date: string;
  Consumer_ID: string;
  Outlet_ID: string;
  Order_type: string;
  Total_Amount: number;
  SGST: number;
  CGST: number;
  Discount: number;
  Net_Amount: number;
  Sales_Order_Status: string;
}

// Sales Order Details Entity
export interface SalesOrderDetails {
  Sales_Order_ID: string;
  SL_NO: number;
  Product_ID: string;
  Qty: number;
  Amount: number;
}

// Purchase Order Header Entity
export interface PurchaseOrderHeader {
  PO_ID: string;
  Purchase_Order_Date: string;
  Payment_Terms: string;
  Vendor_ID: string;
  Delivery_Date: string;
  Status: string;
  Total_Amount: number;
  SGST: number;
  CGST: number;
  Discount: number;
  Net_Amount: number;
}

// Purchase Order Details Entity
export interface PurchaseOrderDetails {
  PO_ID: string;
  SL_NO: number;
  Item_ID: string;
  Qty: number;
  Unit_price: number;
  Total_Amount: number;
  Outlet_ID: string;
  Unit_Measure: string;
}

// Sales Payment Entity
export interface SalesPayment {
  Transaction_id: string;
  User_id: string;
  Sales_order_id: string;
  Mode_of_Payment: string;
  Payment_Amount: number;
  Status: string;
  Payment_date: string;
}

// Delivery Entity
export interface Delivery {
  Delivery_ID: string;
  Sales_Order_ID: string;
}

// Purchase Payment Entity
export interface PurchasePayment {
  Invoice_No: string;
  PO_ID: string;
  GRN_No: string;
  Payment_Terms: string;
  Payment_Amount: number;
  Status: string;
}

// Reference Entity
export interface Reference {
  Outlet_ID: string;
  Menu_Category_ID: string;
  Ref_Key: string;
}

// GRN Entity (Goods Received Note)
export interface GRN {
  Order_Date: string;
  PO_ID: string;
  Vendor_ID: string;
  Item_ID: string;
  Item_Name: string;
  Ordered_Qty: number;
  Received_Qty: number;
  Unit_measure: string;
}

// Recipe Entity
export interface Recipe {
  Product_ID: string;
  Recipe_ID: string;
  SL_no: number;
  Item_ID: string;
  Item_Name: string;
  Unit_measure: string;
  Unit_Qty: number;
}

// Stock Log Entity
export interface StockLog {
  Sales_Order_ID: string;
  Product_ID: string;
  Product_Qty: number;
  Recipe_ID: string;
  Item_ID: string;
  Unit_Qty: number;
  Unit_of_Measurement: string;
  Total_Qty: number;
}

// ============================================
// API Response Types
// ============================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type ApiListResponse<T> = {
  success: boolean;
  data: T[];
  total?: number;
  error?: string;
};
