import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblStockLog ORDER BY Sales_Order_ID DESC';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching stock logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock logs' },
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
      { success: true, message: 'Stock log created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating stock log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create stock log' },
      { status: 500 }
    );
  }
}
