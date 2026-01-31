# MySQL Integration Setup Guide

## Quick Start

### 1. Add Environment Variables

Create a `.env.local` file in your project root with your MySQL database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=restaurant_db
```

### 2. Install MySQL Package

The project uses `mysql2/promise` for database connectivity. It's already configured in the connection file.

### 3. Database Connection

The database connection is configured in `/lib/db/connection.ts`. It uses a connection pool for optimal performance with up to 10 concurrent connections.

---

## API Routes Structure

All API routes follow RESTful conventions:

- **GET** `/api/{entity}` - Fetch all records
- **POST** `/api/{entity}` - Create a new record
- **GET** `/api/{entity}/[id]` - Fetch a single record
- **PUT** `/api/{entity}/[id]` - Update a record
- **DELETE** `/api/{entity}/[id]` - Delete a record

### Available Endpoints

```
/api/employees         - Employee management
/api/products          - Product management
/api/inventory         - Inventory management
/api/vendors           - Vendor management
/api/purchase-orders   - Purchase order management
/api/grn               - Goods Received Note management
/api/kitchen           - Kitchen order management
/api/audit             - Audit logs
/api/stock-logs        - Stock logs
```

---

## Using Data in Components

### Method 1: Using Hooks (Recommended)

Import and use the provided hooks in your components:

```tsx
'use client';

import { useEmployees, useProducts } from '@/lib/hooks/useEntities';

export default function EmployeeList() {
  const { data: employees, isLoading, error } = useEmployees();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <ul>
      {employees.map((emp) => (
        <li key={emp.Employee_ID}>{emp.First_Name} {emp.Last_Name}</li>
      ))}
    </ul>
  );
}
```

### Method 2: Using CRUD Operations

For creating, updating, or deleting records:

```tsx
import { createEntity, updateEntity, deleteEntity } from '@/lib/hooks/useEntities';

// Create
const newEmployee = await createEntity('/api/employees', {
  Employee_ID: 'EMP123',
  First_Name: 'John',
  Last_Name: 'Doe',
  Role: 'Chef',
  Outlet_ID: 'OUT001',
  // ... other fields
});

// Update
await updateEntity('/api/employees', 'EMP123', {
  First_Name: 'Jane',
});

// Delete
await deleteEntity('/api/employees', 'EMP123');
```

---

## Entity Types

All entity types are defined in `/lib/entities/types.ts` with full TypeScript support:

```typescript
interface Employee {
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

// ... more entity types
```

---

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": [
    { /* entity data */ }
  ]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## Database Tables Reference

The following tables are available in your MySQL database:

- `tblEmployees` - Employee information
- `tblProduct` - Product/Menu items
- `tblInventory` - Inventory/Raw materials
- `tblVendor_Details` - Vendor information
- `tblPurchase_Order_HDR` - Purchase orders
- `tblGRN` - Goods received notes
- `tblSales_Order_Details` - Sales order items
- `tblStockLog` - Stock transaction logs
- `tblOutlet` - Restaurant outlets
- `tblConsumer` - Consumer/Customer data

---

## Example: Building a Complete CRUD Page

```tsx
'use client';

import { useState } from 'react';
import { useEmployees, createEntity, updateEntity, deleteEntity } from '@/lib/hooks/useEntities';
import type { Employee } from '@/lib/entities/types';

export default function EmployeesPage() {
  const { data: employees, mutate } = useEmployees();
  const [formData, setFormData] = useState<Partial<Employee>>({});

  const handleCreate = async () => {
    const result = await createEntity('/api/employees', formData);
    if (result.success) {
      mutate(); // Revalidate data
      setFormData({});
    }
  };

  const handleUpdate = async (id: string) => {
    await updateEntity('/api/employees', id, formData);
    mutate();
  };

  const handleDelete = async (id: string) => {
    await deleteEntity('/api/employees', id);
    mutate();
  };

  return (
    <div>
      {/* Form for creating/updating */}
      {/* List of employees */}
      {employees.map((emp) => (
        <div key={emp.Employee_ID}>
          <p>{emp.First_Name} {emp.Last_Name}</p>
          <button onClick={() => handleDelete(emp.Employee_ID)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## Troubleshooting

### Database Connection Issues

1. **Check credentials**: Verify DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
2. **Check MySQL service**: Ensure MySQL is running
3. **Check port**: Default is 3306, adjust if different
4. **Check permissions**: Ensure user has access to the database

### API Errors

- Check browser console for detailed error messages
- Verify table names match your database schema
- Ensure all required fields are provided in POST/PUT requests

---

## Database Schema Documentation

For detailed information about each table's columns and relationships, refer to the SQL schema file provided with your project.
