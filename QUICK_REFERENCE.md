# Quick Reference - Frontend/Backend Integration

## File Structure

```
/lib
  /db
    - connection.ts         # MySQL connection pool
  /entities
    - types.ts             # All TypeScript types
    - columns.ts           # Table column configs
    - index.ts             # Export all entities
  /hooks
    - useEntities.ts       # Data fetching hooks
    - useAuth.ts           # Authentication hook

/app/api
  /auth
    - login/route.ts       # Login endpoint (queries MySQL)
    - logout/route.ts      # Logout endpoint
    - verify/route.ts      # Token verification
  /employees
  /products
  /inventory
  /vendors
  /purchase-orders
  /grn
  /kitchen
  /audit
  /stock-logs

/components
  /auth
    - ProtectedRoute.tsx   # Route protection wrapper

/app/login
  - page.tsx             # Login page (fixed hydration)
```

## Common Operations

### 1. Fetch Data
```tsx
import { useEmployees } from '@/lib/hooks/useEntities'

const { data, isLoading, error } = useEmployees()
```

### 2. Check Authentication
```tsx
import { useAuth } from '@/lib/hooks/useAuth'

const { user, isLoading, logout } = useAuth()
```

### 3. Create Data
```tsx
import { createEntity } from '@/lib/hooks/useEntities'

await createEntity('/api/employees', {
  Employee_ID: 'EMP001',
  First_Name: 'John',
  // ... other fields
})
```

### 4. Update Data
```tsx
import { updateEntity } from '@/lib/hooks/useEntities'

await updateEntity('/api/employees', 'EMP001', {
  First_Name: 'Jane'
})
```

### 5. Delete Data
```tsx
import { deleteEntity } from '@/lib/hooks/useEntities'

await deleteEntity('/api/employees', 'EMP001')
```

### 6. Protect a Route
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function Page() {
  return (
    <ProtectedRoute>
      <div>Only authenticated users see this</div>
    </ProtectedRoute>
  )
}
```

## Environment Setup

Create `.env.local`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
```

## Test Credentials

- **Employee ID**: Any value from your `tblEmployees` table
- **Password**: `demo123` (default demo password)

## API Response Format

All endpoints return:
```json
{
  "success": true/false,
  "data": {},
  "error": "error message if failed",
  "message": "operation message"
}
```

## Error Handling

```tsx
try {
  const response = await createEntity('/api/employees', data)
  if (response.success) {
    console.log('Success:', response.data)
  } else {
    console.error('Error:', response.error)
  }
} catch (error) {
  console.error('Network error:', error)
}
```

## Database Tables Connected

- tblEmployees → `/api/employees`
- tblProduct → `/api/products`
- tblInventory → `/api/inventory`
- tblVendor_Details → `/api/vendors`
- tblPurchase_Order_HDR → `/api/purchase-orders`
- tblGRN → `/api/grn`
- tblSales_Order_Details → `/api/kitchen`
- tblStockLog → `/api/audit`, `/api/stock-logs`

## Login Flow

1. User submits credentials → Login Page
2. Page sends POST to `/api/auth/login`
3. API queries MySQL for employee
4. API returns token + employee info
5. Frontend stores token in localStorage
6. Frontend redirects to `/dashboard`
7. Protected routes verify token via `/api/auth/verify`

## Verification Checklist

✓ MySQL credentials in `.env.local`
✓ Database running and accessible
✓ Employee record exists in `tblEmployees`
✓ Login page shows no hydration errors
✓ Can login and get redirected
✓ API endpoints return data
✓ Token stored in localStorage
✓ Protected routes work
✓ Logout clears session
