import useSWR from 'swr';
import type {
  Employee,
  Product,
  Inventory,
  VendorDetails,
  PurchaseOrderHeader,
  GRN,
  StockLog,
  SalesOrderHeader,
} from '@/lib/entities/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Generic hook for fetching entity data
export function useEntityData<T>(endpoint: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean;
    data: T[];
  }>(`/api${endpoint}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
    mutate,
  };
}

// Employee hooks
export function useEmployees() {
  return useEntityData<Employee>('/employees');
}

export function useEmployee(id: string) {
  return useSWR<{ success: boolean; data: Employee }>(
    id ? `/api/employees/${id}` : null,
    fetcher
  );
}

// Products hook
export function useProducts() {
  return useEntityData<Product>('/products');
}

export function useProduct(id: string) {
  return useSWR<{ success: boolean; data: Product }>(
    id ? `/api/products/${id}` : null,
    fetcher
  );
}

// Inventory hook
export function useInventory() {
  return useEntityData<Inventory>('/inventory');
}

export function useInventoryItem(id: string) {
  return useSWR<{ success: boolean; data: Inventory }>(
    id ? `/api/inventory/${id}` : null,
    fetcher
  );
}

// Vendors hook
export function useVendors() {
  return useEntityData<VendorDetails>('/vendors');
}

export function useVendor(id: string) {
  return useSWR<{ success: boolean; data: VendorDetails }>(
    id ? `/api/vendors/${id}` : null,
    fetcher
  );
}

// Purchase Orders hook
export function usePurchaseOrders() {
  return useEntityData<PurchaseOrderHeader>('/purchase-orders');
}

export function usePurchaseOrder(id: string) {
  return useSWR<{ success: boolean; data: PurchaseOrderHeader }>(
    id ? `/api/purchase-orders/${id}` : null,
    fetcher
  );
}

// Audit logs hook
export function useAuditLogs() {
  return useEntityData<StockLog>('/audit');
}

// Stock logs hook
export function useStockLogs() {
  return useEntityData<StockLog>('/stock-logs');
}

// Kitchen orders hook
export function useKitchenOrders() {
  return useEntityData<SalesOrderHeader>('/kitchen');
}

// GRN records hook
export function useGRNRecords() {
  return useEntityData<GRN>('/grn');
}

export function useGRNRecord(id: string) {
  return useSWR<{ success: boolean; data: GRN }>(
    id ? `/api/grn/${id}` : null,
    fetcher
  );
}

// Generic CRUD operations
export async function createEntity(endpoint: string, data: any) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateEntity(endpoint: string, id: string, data: any) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteEntity(endpoint: string, id: string) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
