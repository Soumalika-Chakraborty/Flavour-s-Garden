// Central exports for entities and database utilities

// Types
export * from './types';

// Database connection
export { executeQuery, default as dbPool } from '@/lib/db/connection';

// Hooks
export {
  useEmployees,
  useEmployee,
  useProducts,
  useProduct,
  useInventory,
  useInventoryItem,
  useVendors,
  useVendor,
  usePurchaseOrders,
  usePurchaseOrder,
  useAuditLogs,
  useStockLogs,
  useKitchenOrders,
  useGRNRecords,
  useGRNRecord,
  createEntity,
  updateEntity,
  deleteEntity,
} from '@/lib/hooks/useEntities';

// Entity constants
export const ENTITY_ENDPOINTS = {
  EMPLOYEES: '/api/employees',
  PRODUCTS: '/api/products',
  INVENTORY: '/api/inventory',
  VENDORS: '/api/vendors',
  PURCHASE_ORDERS: '/api/purchase-orders',
  GRN: '/api/grn',
  KITCHEN: '/api/kitchen',
  AUDIT: '/api/audit',
  STOCK_LOGS: '/api/stock-logs',
} as const;

// Table names for reference
export const TABLE_NAMES = {
  EMPLOYEES: 'tblEmployees',
  PRODUCTS: 'tblProduct',
  INVENTORY: 'tblInventory',
  VENDORS: 'tblVendor_Details',
  PURCHASE_ORDER_HDR: 'tblPurchase_Order_HDR',
  PURCHASE_ORDER_DETAILS: 'tblPurchase_Order_Details',
  GRN: 'tblGRN',
  SALES_ORDER_HDR: 'tblSales_Order_Header',
  SALES_ORDER_DETAILS: 'tblSales_Order_Details',
  STOCK_LOG: 'tblStockLog',
  OUTLET: 'tblOutlet',
  CONSUMER: 'tblConsumer',
} as const;
