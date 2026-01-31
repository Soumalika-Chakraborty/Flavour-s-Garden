import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblGRN';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching GRN records:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch GRN records' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Order_Date,
      PO_ID,
      Vendor_ID,
      Item_ID,
      Item_Name,
      Ordered_Qty,
      Received_Qty,
      Unit_measure,
    } = body;

    const query = `
      INSERT INTO tblGRN 
      (Order_Date, PO_ID, Vendor_ID, Item_ID, Item_Name, Ordered_Qty, Received_Qty, Unit_measure)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Order_Date,
      PO_ID,
      Vendor_ID,
      Item_ID,
      Item_Name,
      Ordered_Qty,
      Received_Qty,
      Unit_measure,
    ]);

    return NextResponse.json(
      { success: true, message: 'GRN record created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating GRN record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create GRN record' },
      { status: 500 }
    );
  }
}
