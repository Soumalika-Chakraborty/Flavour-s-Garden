import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblStockLog';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Sales_Order_ID,
      Product_ID,
      Product_Qty,
      Recipe_ID,
      Item_ID,
      Unit_Qty,
      Unit_of_Measurement,
    } = body;

    const query = `
      INSERT INTO tblStockLog 
      (Sales_Order_ID, Product_ID, Product_Qty, Recipe_ID, Item_ID, Unit_Qty, Unit_of_Measurement)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Sales_Order_ID,
      Product_ID,
      Product_Qty,
      Recipe_ID,
      Item_ID,
      Unit_Qty,
      Unit_of_Measurement,
    ]);

    return NextResponse.json(
      { success: true, message: 'Audit log created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create audit log' },
      { status: 500 }
    );
  }
}
