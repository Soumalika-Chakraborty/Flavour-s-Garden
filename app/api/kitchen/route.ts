import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = `
      SELECT sod.*, so.Sales_Order_ID, so.Order_Date
      FROM tblSales_Order_Details sod
      JOIN tblSales_Order_Header so ON sod.Sales_Order_ID = so.Sales_Order_ID
      ORDER BY so.Order_Date DESC
    `;
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching kitchen orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch kitchen orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Sales_Order_ID, Product_ID, Qty, Amount } = body;

    const query = `
      INSERT INTO tblSales_Order_Details (Sales_Order_ID, Product_ID, Qty, Amount)
      VALUES (?, ?, ?, ?)
    `;

    await executeQuery(query, [Sales_Order_ID, Product_ID, Qty, Amount]);

    return NextResponse.json(
      { success: true, message: 'Kitchen order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating kitchen order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create kitchen order' },
      { status: 500 }
    );
  }
}
